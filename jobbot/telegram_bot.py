"""Интерактивный Telegram-бот: подборка вакансий с кнопкой «Откликнуться».

Запуск: python -m jobbot.telegram_bot  (постоянно работающий воркер, long polling).

Сценарий:
  /start  — регистрирует чат, показывает помощь.
  /search — собирает свежую подборку и присылает карточки с кнопками.
  Кнопка «✍️ Откликнуться» под вакансией → бот точечно через Claude готовит
  письмо + адаптированное резюме и присылает их прямо в чат.
  /design — дизайнер: бриф → три стиля на выбор → готовый HTML файлом.
  /styles — поиск по библиотеке стилей (84 DESIGN.md).
  /video  — видео LTX-2.5 со звуком: из текста или из фото (подпись /video …).

Дополнительно: по будням в заданный час (UTC) бот сам присылает подборку
подписанным чатам (JOBBOT_AUTO_SEARCH=true).

Переменные окружения:
  TELEGRAM_BOT_TOKEN    — токен бота от @BotFather (обязательно).
  TELEGRAM_CHAT_ID      — разрешённые chat_id через запятую. Если задано —
                          бот реагирует только на них (рекомендуется). Если
                          пусто — доверяет первому, кто напишет /start (TOFU).
  ANTHROPIC_API_KEY     — нужен для откликов (фаза 2) и для дизайнера.
  API_KEY_21ST          — (необязательно) референсы компонентов с 21st.dev.
  LTXV_API_KEY          — (необязательно) ключ LTX API для /video (console.ltx.io).
  LTX_MODEL / LTX_RESOLUTION / LTX_DURATION — умолчания для /video (fast, 1080p, 6).
  LTX_MAX_USD           — потолок цены одного ролика в $ (по умолч. 5).
  JOBBOT_DATA_DIR       — каталог состояния (на Railway укажи Volume, напр. /data).
  JOBBOT_AUTO_SEARCH    — "true"/"false", авто-подборка по расписанию (по умолч. true).
  JOBBOT_DAILY_HOUR_UTC — час UTC для авто-подборки (по умолч. 6 ≈ 11:00 Ташкент).
"""

from __future__ import annotations

import html
import json
import logging
import os
import re
import secrets
import tempfile
import threading
import time
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests

from designer import catalog as dcatalog
from designer import ltx
from designer import studio as dstudio
from designer import twentyfirst

from . import config, pipeline, store
from .models import Job

log = logging.getLogger("jobbot.telegram")

API = "https://api.telegram.org/bot{token}/{method}"
SUBS_PATH = config.DATA_DIR / "telegram_chats.json"
STATE_PATH = config.DATA_DIR / "telegram_state.json"
MAX_CARDS = 15  # сколько карточек слать за одну подборку
NAME = "Олег Михайлович"  # персона бота — кадровик «на твоей стороне»


# --------------------------------------------------------------------------- #
# Telegram API (тонкая обёртка)
# --------------------------------------------------------------------------- #
class Telegram:
    def __init__(self, token: str) -> None:
        self.token = token
        self.s = requests.Session()

    def _call(self, method: str, **kwargs: Any) -> dict[str, Any]:
        url = API.format(token=self.token, method=method)
        try:
            r = self.s.post(url, timeout=kwargs.pop("_timeout", 35), **kwargs)
            r.raise_for_status()
            return r.json()
        except requests.RequestException as e:
            log.warning("Telegram %s не удался: %s", method, e)
            return {"ok": False}

    def get_updates(self, offset: int | None) -> list[dict[str, Any]]:
        data = self._call(
            "getUpdates",
            json={"offset": offset, "timeout": 30},
            _timeout=40,
        )
        return data.get("result", []) if data.get("ok") else []

    def send_message(self, chat_id: int, text: str, buttons: list | None = None) -> None:
        payload: dict[str, Any] = {
            "chat_id": chat_id,
            "text": text[:4096],
            "parse_mode": "HTML",
            "disable_web_page_preview": True,
        }
        if buttons:
            payload["reply_markup"] = {"inline_keyboard": buttons}
        self._call("sendMessage", json=payload)

    def send_document(
        self, chat_id: int, filename: str, content: str, caption: str = "", mime: str = "text/markdown"
    ) -> None:
        self._call(
            "sendDocument",
            data={"chat_id": chat_id, "caption": caption[:1024]},
            files={"document": (filename, content.encode("utf-8"), mime)},
            _timeout=120,
        )

    def get_file(self, file_id: str, limit: int = 20 * 1024 * 1024) -> bytes | None:
        """Скачать файл из чата (фото, документ). Bot API отдаёт файлы до 20 МБ."""
        info = self._call("getFile", json={"file_id": file_id})
        path = (info.get("result") or {}).get("file_path") if info.get("ok") else None
        if not path:
            return None
        try:
            r = self.s.get(f"https://api.telegram.org/file/bot{self.token}/{path}", timeout=60)
            r.raise_for_status()
            return r.content[:limit]
        except requests.RequestException as e:
            log.warning("Telegram getFile не удался: %s", e)
            return None

    def send_video(self, chat_id: int, path: Path, caption: str = "") -> bool:
        with open(path, "rb") as f:
            res = self._call(
                "sendVideo",
                data={"chat_id": chat_id, "caption": caption[:1024], "supports_streaming": "true"},
                files={"video": (path.name, f, "video/mp4")},
                _timeout=300,
            )
        return bool(res.get("ok"))

    def answer_callback(self, cb_id: str, text: str = "") -> None:
        self._call("answerCallbackQuery", json={"callback_query_id": cb_id, "text": text[:200]})


# --------------------------------------------------------------------------- #
# Подписчики и состояние (в DATA_DIR, переживают перезапуск при Volume)
# --------------------------------------------------------------------------- #
def _load_json(path: Path, default: Any) -> Any:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return default


def _save_json(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def _allowed_env() -> set[int]:
    raw = os.environ.get("TELEGRAM_CHAT_ID", "")
    out: set[int] = set()
    for part in raw.replace(" ", "").split(","):
        if part:
            try:
                out.add(int(part))
            except ValueError:
                pass
    return out


def subscribers() -> set[int]:
    return set(_load_json(SUBS_PATH, []))


def add_subscriber(chat_id: int) -> None:
    subs = subscribers()
    if chat_id not in subs:
        subs.add(chat_id)
        _save_json(SUBS_PATH, sorted(subs))


def is_allowed(chat_id: int) -> bool:
    env = _allowed_env()
    if env:  # явный allowlist — только он
        return chat_id in env
    return chat_id in subscribers()  # TOFU: кого добавил /start


# --------------------------------------------------------------------------- #
# Форматирование и отправка
# --------------------------------------------------------------------------- #
def _job_card(job: Job) -> tuple[str, list]:
    e = html.escape
    meta = " · ".join(filter(None, [job.source, job.location, job.salary]))
    lines = [f"<b>{e(job.title)}</b> — {e(job.company or '—')}  ·  {job.score}/100"]
    if meta:
        lines.append(f"<i>{e(meta)}</i>")
    if job.description:
        snippet = job.description[:400]
        lines.append(e(snippet) + ("…" if len(job.description) > 400 else ""))
    row = [{"text": "✍️ Откликнуться", "callback_data": f"apply:{job.id}"}]
    if job.url:
        row.append({"text": "🔗 Открыть", "url": job.url})
    return "\n".join(lines), [row]


def send_shortlist(tg: Telegram, chat_id: int, fresh: list[Job], total: int) -> None:
    if not fresh:
        tg.send_message(
            chat_id,
            f"Посмотрел {total} вакансий — ничего нового подходящего пока нет. "
            "Не переживай, загляну ещё.",
        )
        return
    tg.send_message(
        chat_id,
        f"Посмотрел {total} вакансий. Свежих подходящих: <b>{len(fresh)}</b> "
        f"(показываю до {MAX_CARDS}). Что приглянётся — жми «Откликнуться», "
        "остальное я беру на себя.",
    )
    for job in fresh[:MAX_CARDS]:
        text, buttons = _job_card(job)
        tg.send_message(chat_id, text, buttons)


def do_search(tg: Telegram, chat_id: int) -> None:
    tg.send_message(chat_id, "Так, дай-ка гляну, что на рынке… ⏳")
    try:
        fresh, total = pipeline.gather_new()
    except Exception as e:
        log.exception("Сбор упал: %s", e)
        tg.send_message(chat_id, f"Что-то не заладилось со сбором: {html.escape(str(e))}")
        return
    send_shortlist(tg, chat_id, fresh, total)


def do_apply(tg: Telegram, chat_id: int, job_id: str) -> None:
    tg.send_message(chat_id, "Понял, оформляю… ✍️")
    res = pipeline.apply_one(job_id)
    if res.get("error"):
        tg.send_message(chat_id, f"⚠️ {html.escape(res['error'])}")
        return
    job: Job = res["job"]
    if res.get("letter"):
        tg.send_message(
            chat_id,
            f"<b>Сопроводительное письмо</b>\n{html.escape(job.title)} — "
            f"{html.escape(job.company)}\n\n{html.escape(res['letter'])}",
        )
    if res.get("resume"):
        fname = f"resume-{job.id}.md"
        tg.send_document(chat_id, fname, res["resume"], caption="Адаптированное резюме")
    if not res.get("letter") and not res.get("resume"):
        tg.send_message(chat_id, "Что-то заминка вышла — давай попробуем ещё разок позже.")


# --------------------------------------------------------------------------- #
# Дизайнер: бриф → 3 стиля на выбор → HTML-файл
# --------------------------------------------------------------------------- #
DESIGN_HELP = (
    "🎨 <b>Дизайнер</b> делает макеты в стиле одной из 84 дизайн-систем "
    "(Linear, Stripe, Apple, Spotify и другие).\n\n"
    "Напиши бриф после команды:\n"
    "<code>/design лендинг для студии моушн-дизайна, дерзко и тёмно</code>\n"
    "<code>/design презентация для инвесторов: сервис аренды техники</code>\n"
    "<code>/design резюме в стиле Linear</code>\n\n"
    "Форматы: лендинг, презентация, one-pager, резюме, пост/баннер, письмо, "
    "экран интерфейса. Назови стиль сам («в стиле Stripe») или выбери из трёх, "
    "которые я предложу. Готовый HTML пришлю файлом.\n"
    "<b>/styles</b> запрос — поиск по стилям, например <code>/styles тёмный финтех</code>."
)

_PENDING: dict[str, dict[str, str]] = {}  # id → бриф, пока человек выбирает стиль
_PENDING_LOCK = threading.Lock()


def _explicit_style(brief: str) -> "dcatalog.Style | None":
    """«…в стиле Linear», «стиль: bmw m» → стиль из каталога."""
    m = re.search(r"(?:в стиле|стиль|style)[:\s]+([\w.\- ]{2,30})", brief, re.I)
    if not m:
        return None
    words = m.group(1).split()
    for n in (2, 1):
        if len(words) >= n:
            s = dcatalog.get(" ".join(words[:n]))
            if s:
                return s
    return None


def do_styles(tg: Telegram, chat_id: int, query: str) -> None:
    e = html.escape
    if not query:
        styles = dcatalog.load()
        cats = Counter(s.category for s in styles)
        lines = [f"В библиотеке <b>{len(styles)}</b> стилей:"]
        lines += [f"• {e(c)} — {n}" for c, n in cats.most_common()]
        lines.append("\nПоиск: <code>/styles тёмный финтех</code>, <code>/styles редакционный</code>")
        tg.send_message(chat_id, "\n".join(lines))
        return
    found = dcatalog.search(query, limit=10)
    if not found:
        tg.send_message(
            chat_id,
            f"По «{e(query)}» ничего не нашёл. Попробуй: тёмный, светлый, премиум, "
            "финтех, редакционный, игривый.",
        )
        return
    lines = [f"Стили по «{e(query)}»:"]
    lines += [f"• <b>{e(s.name)}</b> <code>{e(s.slug)}</code> — {e(s.tagline[:90])}" for s in found]
    lines.append("\nВзять стиль: <code>/design … в стиле " + e(found[0].name) + "</code>")
    tg.send_message(chat_id, "\n".join(lines))


def do_design(tg: Telegram, chat_id: int, brief: str) -> None:
    if not brief:
        tg.send_message(chat_id, DESIGN_HELP)
        return
    kind = dstudio.guess_kind(brief)
    style = _explicit_style(brief)
    if style:
        _start_render(tg, chat_id, brief, kind, style)
        return
    tg.send_message(chat_id, "🎨 Подбираю стили под бриф…")
    try:
        options = dstudio.Designer().suggest_styles(brief, n=3)
    except Exception as e:  # сеть / ключ — не страшно, подберём по словам
        log.warning("Подбор стилей через Claude не удался: %s", e)
        options = [(s, "") for s in dcatalog.search(brief, limit=3)] or [
            (s, "") for s in dcatalog.load()[:3]
        ]
    pid = secrets.token_hex(4)
    with _PENDING_LOCK:
        _PENDING[pid] = {"brief": brief, "kind": kind}
    lines = [f"Формат: <b>{dstudio.KINDS[kind].title}</b>. Выбери направление:"]
    buttons = []
    for i, (s, why) in enumerate(options, 1):
        theme = "тёмный" if s.theme == "dark" else "светлый"
        lines.append(f"{i}. <b>{html.escape(s.name)}</b>, {theme} — {html.escape(why or s.tagline)}")
        buttons.append([{"text": f"{i}. {s.name}", "callback_data": f"ds:{pid}:{s.slug}"[:64]}])
    tg.send_message(chat_id, "\n".join(lines), buttons)


def _start_render(tg: Telegram, chat_id: int, brief: str, kind: str, style: "dcatalog.Style") -> None:
    tg.send_message(
        chat_id,
        f"🎨 Рисую: {dstudio.KINDS[kind].title.lower()} в стиле <b>{html.escape(style.name)}</b>. "
        "Обычно это 2–5 минут, пришлю файлом.",
    )
    # Генерация долгая — в отдельном потоке, чтобы бот не замирал.
    threading.Thread(target=_render, args=(tg, chat_id, brief, kind, style), daemon=True).start()


def _render(tg: Telegram, chat_id: int, brief: str, kind: str, style: "dcatalog.Style") -> None:
    try:
        d = dstudio.Designer()
        if not d.enabled:
            tg.send_message(chat_id, "Для дизайна нужен ANTHROPIC_API_KEY на сервере.")
            return
        extra = config.load_resume() if kind == "resume" else ""
        refs, used = twentyfirst.references_for(brief, kind)
        page = d.make(brief, kind, style, extra=extra, references=refs)
    except Exception as e:
        log.exception("Дизайн не получился: %s", e)
        tg.send_message(chat_id, f"⚠️ Не получилось: {html.escape(str(e))[:300]}")
        return
    caption = f"{dstudio.KINDS[kind].title} · стиль {style.name}"
    if used:
        caption += f"\nРеференс: {used[0]}"
    caption += "\nОткрой файл в браузере."
    fname = f"{kind}-{style.slug}-{dstudio.slugify(brief, 24)}.html"
    tg.send_document(chat_id, fname, page, caption=caption, mime="text/html")


def handle_design_choice(tg: Telegram, chat_id: int, data: str) -> None:
    _, pid, slug = (data.split(":", 2) + ["", ""])[:3]
    with _PENDING_LOCK:
        job = _PENDING.pop(pid, None)
    style = dcatalog.get(slug)
    if not job or not style:
        tg.send_message(chat_id, "Этот бриф уже устарел — пришли <b>/design</b> ещё раз.")
        return
    _start_render(tg, chat_id, job["brief"], job["kind"], style)


# --------------------------------------------------------------------------- #
# Видео: LTX-2.5 (текст или фото → mp4 со звуком)
# --------------------------------------------------------------------------- #
VIDEO_HELP = (
    "🎬 <b>Видео LTX-2.5</b> — ролик со звуком по описанию или из картинки.\n\n"
    "<code>/video неоновый тоннель, камера плавно летит вперёд, гул мотора</code>\n"
    "Пришли <b>фото</b> с подписью <code>/video что происходит</code> или ответь "
    "<code>/video …</code> на фото — оживлю этот кадр.\n\n"
    "Настройки — словами в начале: <code>pro</code>, <code>720p</code>/<code>4k</code>, "
    "<code>9:16</code>, <code>10s</code> или <code>auto</code>, <code>silent</code>, "
    "камера <code>dolly_in</code>/<code>jib_up</code>/…\n"
    "Например: <code>/video pro 9:16 8s dolly_in курьер на скутере въезжает в кадр</code>\n"
    "Пиши лучше по-английски, 4–8 предложений: кадр, действие, камера, свет, звук."
)
_VIDEO_WORDS = {"silent": ("sound", False), "mute": ("sound", False), "auto": ("duration", None),
                "fast": ("model", "ltx-2-5-fast"), "pro": ("model", "ltx-2-5-pro")}


def parse_video_args(text: str) -> tuple[dict[str, Any], str]:
    """Ведущие слова-настройки («pro 9:16 8s dolly_in …») → (параметры, промпт)."""
    opts: dict[str, Any] = {}
    words = text.split()
    while words:
        lw = words[0].lower()
        if lw in _VIDEO_WORDS:
            k, v = _VIDEO_WORDS[lw]
            opts[k] = v
        elif lw in ltx.TIERS:
            opts["tier"] = lw
        elif lw in ("16:9", "9:16", "1:1", "3:2", "2:3"):
            opts["aspect"] = lw
        elif lw in ltx.CAMERA:
            opts["camera"] = lw
        elif re.fullmatch(r"\d{1,2}(s|с|сек)", lw):
            opts["duration"] = int(re.match(r"\d+", lw).group())
        else:
            break
        words.pop(0)
    return opts, " ".join(words)


def _photo_id(msg: dict[str, Any]) -> str | None:
    for m in (msg, msg.get("reply_to_message") or {}):
        if m.get("photo"):
            return m["photo"][-1]["file_id"]  # самое крупное превью
        doc = m.get("document") or {}
        if str(doc.get("mime_type", "")).startswith("image/"):
            return doc["file_id"]
    return None


def do_video(tg: Telegram, chat_id: int, text: str, msg: dict[str, Any]) -> None:
    photo = _photo_id(msg)
    opts, prompt = parse_video_args(text)
    if not prompt and not photo:
        tg.send_message(chat_id, VIDEO_HELP)
        return
    try:
        model = opts.get("model") or ltx.model_id(os.environ.get("LTX_MODEL", "fast"))
        res = ltx.resolution(opts.get("tier") or os.environ.get("LTX_RESOLUTION", "1080p"), opts.get("aspect", "16:9"))
        duration = opts["duration"] if "duration" in opts else int(os.environ.get("LTX_DURATION", "6"))
        ltx.validate(model, res, duration, 24)
        price = ltx.estimate(model, res, duration)
    except (ltx.LTXError, ValueError) as e:
        tg.send_message(chat_id, f"⚠️ {html.escape(str(e))}")
        return
    limit = float(os.environ.get("LTX_MAX_USD", "5"))
    if price > limit:
        tg.send_message(chat_id, f"Это ≈${price:.2f}, а потолок ${limit:.2f} (LTX_MAX_USD). Возьми короче или 720p.")
        return
    if not ltx.LTX().enabled:
        tg.send_message(chat_id, "Для видео нужен LTXV_API_KEY на сервере (console.ltx.io → API Keys).")
        return
    secs = "длину выберет модель" if duration is None else f"{duration} с"
    tg.send_message(
        chat_id,
        f"🎬 Снимаю {'из твоего кадра' if photo else 'по описанию'}: {res}, {secs}, "
        f"{model.removeprefix('ltx-2-5-')}, ≈${price:.2f}. Пришлю, как будет готово.",
    )
    args = (tg, chat_id, prompt or "Subtle natural motion, the camera slowly pushes in.", photo, model, res,
            duration, opts.get("sound", True), opts.get("camera"))
    threading.Thread(target=_shoot, args=args, daemon=True).start()


def _shoot(tg: Telegram, chat_id: int, prompt: str, photo: str | None, model: str, res: str,
           duration: int | None, sound: bool, camera: str | None) -> None:
    with tempfile.TemporaryDirectory() as tmp:
        image = None
        if photo:
            data = tg.get_file(photo)
            if not data:
                tg.send_message(chat_id, "⚠️ Не смог скачать фото из чата (Telegram отдаёт файлы до 20 МБ).")
                return
            image = str(Path(tmp) / "frame.jpg")
            Path(image).write_bytes(data)
        try:
            path = ltx.LTX().generate(Path(tmp) / "ltx.mp4", prompt, image=image, model=model, res=res,
                                      duration=duration, sound=sound, camera=camera)
        except Exception as e:
            log.exception("Видео не получилось: %s", e)
            tg.send_message(chat_id, f"⚠️ Не получилось: {html.escape(str(e))[:300]}")
            return
        if path.stat().st_size > 49 * 1024 * 1024:
            tg.send_message(chat_id, "Ролик больше 50 МБ — Telegram не пропустит. Попробуй 1080p или короче.")
            return
        if not tg.send_video(chat_id, path, caption=f"LTX-2.5 · {res}\n{prompt[:900]}"):
            tg.send_message(chat_id, "⚠️ Видео готово, но Telegram его не принял.")


# --------------------------------------------------------------------------- #
# Обработка апдейтов
# --------------------------------------------------------------------------- #
HELP = (
    f"Я {NAME}, твой личный кадровик — но, в отличие от заводских, работаю "
    "на <b>тебя</b> 🤝\n\n"
    "<b>/search</b> — гляну, что есть свежего по твоему профилю\n"
    "<b>/design</b> бриф — позову знакомого дизайнера: лендинг, презентация, резюме\n"
    "<b>/styles</b> — библиотека стилей для дизайна\n"
    "<b>/video</b> описание — сниму ролик со звуком (или оживлю присланное фото)\n"
    "<b>/help</b> — это сообщение\n\n"
    "Под каждой вакансией будет кнопка <b>✍️ Откликнуться</b> — жми, и я "
    "подготовлю сопроводительное письмо и подгоню резюме под вакансию."
)


def handle_message(tg: Telegram, msg: dict[str, Any]) -> None:
    chat_id = msg["chat"]["id"]
    text = (msg.get("text") or msg.get("caption") or "").strip()  # у фото команда в подписи

    if text.startswith("/start"):
        if not _allowed_env():
            add_subscriber(chat_id)  # TOFU, если нет явного allowlist
        if is_allowed(chat_id):
            tg.send_message(chat_id, f"Здравствуй! На связи {NAME} 🤝\n\n{HELP}")
        else:
            tg.send_message(
                chat_id,
                f"Я {NAME}, но тебя нет в моём списке. Твой chat_id: "
                f"<code>{chat_id}</code>.\nДобавь его в переменную TELEGRAM_CHAT_ID "
                "на сервере — и приходи снова.",
            )
        return

    if not is_allowed(chat_id):
        tg.send_message(
            chat_id,
            f"Извини, доступ только для своих. Твой chat_id: <code>{chat_id}</code>.",
        )
        return

    if text.startswith("/search"):
        do_search(tg, chat_id)
    elif text.startswith("/design"):
        do_design(tg, chat_id, text.partition(" ")[2].strip())
    elif text.startswith("/styles"):
        do_styles(tg, chat_id, text.partition(" ")[2].strip())
    elif text.startswith("/video"):
        do_video(tg, chat_id, text.partition(" ")[2].strip(), msg)
    elif text.startswith("/help"):
        tg.send_message(chat_id, HELP)
    else:
        tg.send_message(chat_id, HELP)


def handle_callback(tg: Telegram, cb: dict[str, Any]) -> None:
    cb_id = cb["id"]
    data = cb.get("data", "")
    chat_id = cb["message"]["chat"]["id"]
    if not is_allowed(chat_id):
        tg.answer_callback(cb_id, "Доступ только для своих.")
        return
    if data.startswith("apply:"):
        tg.answer_callback(cb_id, "Принял, оформляю…")
        do_apply(tg, chat_id, data.split(":", 1)[1])
    elif data.startswith("ds:"):
        tg.answer_callback(cb_id, "Принял, рисую…")
        handle_design_choice(tg, chat_id, data)
    else:
        tg.answer_callback(cb_id)


# --------------------------------------------------------------------------- #
# Планировщик авто-подборки
# --------------------------------------------------------------------------- #
def _scheduler(tg: Telegram) -> None:
    if os.environ.get("JOBBOT_AUTO_SEARCH", "true").lower() not in ("1", "true", "yes"):
        log.info("Авто-подборка выключена (JOBBOT_AUTO_SEARCH).")
        return
    hour = int(os.environ.get("JOBBOT_DAILY_HOUR_UTC", "6"))
    log.info("Авто-подборка включена: будни, %02d:00 UTC.", hour)
    while True:
        now = datetime.now(timezone.utc)
        today = now.strftime("%Y-%m-%d")
        state = _load_json(STATE_PATH, {})
        if now.weekday() < 5 and now.hour == hour and state.get("last_auto") != today:
            targets = _allowed_env() or subscribers()
            if targets:
                log.info("Авто-подборка для %d чатов.", len(targets))
                for chat_id in targets:
                    do_search(tg, chat_id)
            state["last_auto"] = today
            _save_json(STATE_PATH, state)
        time.sleep(60)


# --------------------------------------------------------------------------- #
# Главный цикл
# --------------------------------------------------------------------------- #
def main() -> int:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    if not token:
        log.error("Не задан TELEGRAM_BOT_TOKEN.")
        return 2

    tg = Telegram(token)
    config.DATA_DIR.mkdir(parents=True, exist_ok=True)

    threading.Thread(target=_scheduler, args=(tg,), daemon=True).start()

    log.info("%s на связи. Жду сообщения…", NAME)
    offset: int | None = None
    while True:
        try:
            updates = tg.get_updates(offset)
        except Exception as e:  # на всякий случай: не падаем из-за сети
            log.warning("getUpdates упал: %s", e)
            time.sleep(5)
            continue
        for upd in updates:
            offset = upd["update_id"] + 1
            try:
                if "message" in upd:
                    handle_message(tg, upd["message"])
                elif "callback_query" in upd:
                    handle_callback(tg, upd["callback_query"])
            except Exception as e:  # ошибка одного апдейта не валит бота
                log.exception("Ошибка обработки апдейта: %s", e)


if __name__ == "__main__":
    raise SystemExit(main())
