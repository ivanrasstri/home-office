"""Интерактивный Telegram-бот: подборка вакансий с кнопкой «Откликнуться».

Запуск: python -m jobbot.telegram_bot  (постоянно работающий воркер, long polling).

Сценарий:
  /start  — регистрирует чат, показывает помощь.
  /search — собирает свежую подборку и присылает карточки с кнопками.
  Кнопка «✍️ Откликнуться» под вакансией → бот точечно через Claude готовит
  письмо + адаптированное резюме и присылает их прямо в чат.

Дополнительно: по будням в заданный час (UTC) бот сам присылает подборку
подписанным чатам (JOBBOT_AUTO_SEARCH=true).

Переменные окружения:
  TELEGRAM_BOT_TOKEN    — токен бота от @BotFather (обязательно).
  TELEGRAM_CHAT_ID      — разрешённые chat_id через запятую. Если задано —
                          бот реагирует только на них (рекомендуется). Если
                          пусто — доверяет первому, кто напишет /start (TOFU).
  ANTHROPIC_API_KEY     — нужен для откликов (фаза 2).
  JOBBOT_DATA_DIR       — каталог состояния (на Railway укажи Volume, напр. /data).
  JOBBOT_AUTO_SEARCH    — "true"/"false", авто-подборка по расписанию (по умолч. true).
  JOBBOT_DAILY_HOUR_UTC — час UTC для авто-подборки (по умолч. 6 ≈ 11:00 Ташкент).
"""

from __future__ import annotations

import html
import json
import logging
import os
import threading
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests

from . import config, pipeline, store
from .models import Job

log = logging.getLogger("jobbot.telegram")

API = "https://api.telegram.org/bot{token}/{method}"
SUBS_PATH = config.DATA_DIR / "telegram_chats.json"
STATE_PATH = config.DATA_DIR / "telegram_state.json"
MAX_CARDS = 15  # сколько карточек слать за одну подборку


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

    def send_document(self, chat_id: int, filename: str, content: str, caption: str = "") -> None:
        self._call(
            "sendDocument",
            data={"chat_id": chat_id, "caption": caption[:1024]},
            files={"document": (filename, content.encode("utf-8"), "text/markdown")},
        )

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
        tg.send_message(chat_id, f"🔎 Просмотрено {total}. Новых подходящих вакансий нет.")
        return
    tg.send_message(
        chat_id,
        f"🔎 Просмотрено {total}. Новых подходящих: <b>{len(fresh)}</b> "
        f"(показываю до {MAX_CARDS}). Жми «Откликнуться» под подходящей.",
    )
    for job in fresh[:MAX_CARDS]:
        text, buttons = _job_card(job)
        tg.send_message(chat_id, text, buttons)


def do_search(tg: Telegram, chat_id: int) -> None:
    tg.send_message(chat_id, "Ищу свежие вакансии… ⏳")
    try:
        fresh, total = pipeline.gather_new()
    except Exception as e:
        log.exception("Сбор упал: %s", e)
        tg.send_message(chat_id, f"Не получилось собрать вакансии: {html.escape(str(e))}")
        return
    send_shortlist(tg, chat_id, fresh, total)


def do_apply(tg: Telegram, chat_id: int, job_id: str) -> None:
    tg.send_message(chat_id, "Готовлю отклик… ✍️")
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
        tg.send_message(chat_id, "Claude не вернул текст — попробуй ещё раз позже.")


# --------------------------------------------------------------------------- #
# Обработка апдейтов
# --------------------------------------------------------------------------- #
HELP = (
    "Я ищу вакансии под твой профиль и помогаю с откликами.\n\n"
    "<b>/search</b> — собрать свежую подборку\n"
    "<b>/help</b> — помощь\n\n"
    "Под каждой вакансией есть кнопка <b>✍️ Откликнуться</b> — нажми, и я "
    "подготовлю письмо и адаптированное резюме."
)


def handle_message(tg: Telegram, msg: dict[str, Any]) -> None:
    chat_id = msg["chat"]["id"]
    text = (msg.get("text") or "").strip()

    if text.startswith("/start"):
        if not _allowed_env():
            add_subscriber(chat_id)  # TOFU, если нет явного allowlist
        if is_allowed(chat_id):
            tg.send_message(chat_id, f"Привет! 👋\n\n{HELP}")
        else:
            tg.send_message(
                chat_id,
                f"Этот чат не в списке разрешённых. Твой chat_id: <code>{chat_id}</code>.\n"
                "Добавь его в переменную TELEGRAM_CHAT_ID на сервере.",
            )
        return

    if not is_allowed(chat_id):
        tg.send_message(chat_id, f"Доступ ограничен. Твой chat_id: <code>{chat_id}</code>.")
        return

    if text.startswith("/search"):
        do_search(tg, chat_id)
    elif text.startswith("/help"):
        tg.send_message(chat_id, HELP)
    else:
        tg.send_message(chat_id, HELP)


def handle_callback(tg: Telegram, cb: dict[str, Any]) -> None:
    cb_id = cb["id"]
    data = cb.get("data", "")
    chat_id = cb["message"]["chat"]["id"]
    if not is_allowed(chat_id):
        tg.answer_callback(cb_id, "Доступ ограничен.")
        return
    if data.startswith("apply:"):
        tg.answer_callback(cb_id, "Готовлю отклик…")
        do_apply(tg, chat_id, data.split(":", 1)[1])
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

    log.info("Бот запущен. Жду сообщения…")
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
