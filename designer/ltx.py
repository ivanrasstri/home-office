"""LTX-2.5 (Lightricks) через официальный API: видео со звуком из текста, кадра или аудио.

Документация: https://docs.ltx.io · ключ: https://console.ltx.io → переменная LTXV_API_KEY.
Модели: ltx-2-5-fast (дешевле, до 20 с на 720p/1080p) и ltx-2-5-pro (качественнее, 6/8/10 с).
API асинхронный: POST /v2/<endpoint> → id → опрос GET /v2/<endpoint>/<id> раз в 5–6 с →
result.video_url. Ссылка на результат быстро протухает, поэтому файл сразу скачиваем.
Статус задачи хранится 24 ч: если скачивание сорвалось, видео забирается по id (resume).
"""

from __future__ import annotations

import base64
import io
import logging
import math
import os
import random
import time
import uuid
from dataclasses import dataclass
from pathlib import Path

import requests

log = logging.getLogger("designer.ltx")

API = os.environ.get("LTX_API_BASE", "https://api.ltx.io").rstrip("/")
MODELS = ("ltx-2-5-fast", "ltx-2-5-pro")
ENDPOINTS = ("text-to-video", "image-to-video", "audio-to-video")
CAMERA = ("dolly_in", "dolly_out", "dolly_left", "dolly_right", "jib_up", "jib_down", "static", "focus_shift")
FPS = (24, 25, 48, 50)

# Допустимые размеры (docs.ltx.io/models/ltx-2-5): короткая сторона → пропорция → "ШxВ"
SIZES = {
    720: {"16:9": "1280x720", "9:16": "720x1280", "1:1": "720x720", "3:2": "1080x720", "2:3": "720x1080"},
    1080: {"16:9": "1920x1080", "9:16": "1080x1920", "1:1": "1080x1080", "3:2": "1620x1080", "2:3": "1080x1620"},
    1440: {"16:9": "2560x1440", "9:16": "1440x2560", "1:1": "1440x1440", "3:2": "2160x1440", "2:3": "1440x2160"},
    2160: {"16:9": "3840x2160", "9:16": "2160x3840", "1:1": "2160x2160", "3:2": "3240x2160", "2:3": "2160x3240"},
}
TIERS = {"720p": 720, "1080p": 1080, "1440p": 1440, "2k": 1440, "4k": 2160, "2160p": 2160}
ASPECTS = {"16:9": 16 / 9, "9:16": 9 / 16, "1:1": 1.0, "3:2": 3 / 2, "2:3": 2 / 3}
ALL_SIZES = {s: side for side, m in SIZES.items() for s in m.values()}

# $ за секунду видео по короткой стороне кадра (docs.ltx.io/pricing); пропорция на цену не влияет
PRICE = {
    "ltx-2-5-fast": {720: 0.09, 1080: 0.13, 1440: 0.19, 2160: 0.30},
    "ltx-2-5-pro": {720: 0.12, 1080: 0.17, 1440: 0.25, 2160: 0.39},
}
DATA_URI_MAX = 7 * 1024 * 1024  # лимит data URI для картинок; больше — через /v1/upload
RETRY = (429, 500, 503, 529)  # docs.ltx.io/errors: остальные ошибки повторять бессмысленно


class LTXError(RuntimeError):
    pass


@dataclass
class Job:
    endpoint: str
    id: str

    def __str__(self) -> str:
        return f"{self.endpoint}/{self.id}"

    @classmethod
    def parse(cls, ref: str) -> "Job":
        """«image-to-video/abc123» → Job (для дозабора готового видео)."""
        endpoint, _, job_id = ref.strip().strip("/").rpartition("/")
        if endpoint not in ENDPOINTS or not job_id:
            raise LTXError(f"Задача «{ref}»: нужен вид <endpoint>/<id>, endpoint — {', '.join(ENDPOINTS)}")
        return cls(endpoint, job_id)


# -- настройки ----------------------------------------------------------------
def env(name: str, default: str) -> str:
    """Переменная окружения; пустая строка (так GitHub Actions передаёт неопределённые vars) = не задана."""
    return os.environ.get(name, "").strip() or default


def parse_duration(value: str | int | None) -> int | None:
    """«6» → 6, «auto» → None (длину выберет модель по действию в промпте)."""
    v = str(value).strip().lower()
    if v in ("auto", "авто", "none"):
        return None
    if not v.isdigit():
        raise LTXError(f"Длительность «{value}»: целое число секунд или auto")
    return int(v)


def usd(name: str, default: str) -> float:
    """Денежная настройка из окружения: «5», «2,5»; пустое значение — по умолчанию."""
    raw = env(name, default)
    try:
        return float(raw.replace(",", "."))
    except ValueError:
        raise LTXError(f"{name}={raw!r}: нужно число долларов, например {default}") from None


def max_usd(override: float | None = None) -> float:
    """Потолок цены одного ролика: явное значение или LTX_MAX_USD (по умолчанию $5)."""
    return override if override is not None else usd("LTX_MAX_USD", "5")


def model_id(name: str) -> str:
    """«fast»/«pro» → полный id модели."""
    name = name.strip().lower()
    full = name if name in MODELS else f"ltx-2-5-{name}"
    if full not in MODELS:
        raise LTXError(f"Модель «{name}»: fast или pro")
    return full


def resolution(value: str, aspect: str | None = None) -> str:
    """«1080p» + «9:16» → «1080x1920»; точный «ШxВ» проверяется по списку LTX и по пропорции, если она задана."""
    v = value.strip().lower()
    if v in ALL_SIZES:
        if aspect and SIZES[ALL_SIZES[v]].get(aspect) != v:
            raise LTXError(f"Размер {v} не в пропорции {aspect}: задай уровень (720p, 1080p, 4k…) вместе с пропорцией")
        return v
    side = TIERS.get(v)
    if side is None:
        raise LTXError(f"Разрешение «{value}»: 720p, 1080p, 1440p, 4k или точный размер, напр. 1920x1080")
    aspect = aspect or "16:9"
    if aspect not in SIZES[side]:
        raise LTXError(f"Пропорция «{aspect}»: {', '.join(SIZES[side])}")
    return SIZES[side][aspect]


def closest_aspect(width: int, height: int) -> str:
    """Пропорция LTX, ближайшая к картинке (по логарифму отношения сторон)."""
    r = width / height
    return min(ASPECTS, key=lambda a: abs(math.log(ASPECTS[a] / r)))


def audio_max(model: str, res: str) -> int:
    """Максимальная длина аудио для audio-to-video: 20 с у fast на 720p/1080p, иначе 10 с (fps не важен)."""
    return 20 if model == "ltx-2-5-fast" and ALL_SIZES[res] <= 1080 else 10


def durations(model: str, res: str, fps: int) -> tuple[int, ...]:
    side = ALL_SIZES[res]
    if model == "ltx-2-5-fast" and side <= 1080 and fps in (24, 25):
        return (6, 8, 10, 12, 14, 16, 18, 20)
    return (6, 8, 10)


def validate(model: str, res: str, duration: int | None, fps: int, last_frame: bool = False) -> None:
    if model not in MODELS:
        raise LTXError(f"Модель «{model}»: {', '.join(MODELS)}")
    if res not in ALL_SIZES:
        raise LTXError(f"Разрешение «{res}» LTX не принимает")
    if fps not in FPS:
        raise LTXError(f"fps {fps}: можно {', '.join(map(str, FPS))}")
    if duration is None:
        if last_frame:
            raise LTXError("Авто-длительность нельзя сочетать с последним кадром — укажи длительность")
        return
    allowed = durations(model, res, fps)
    if duration not in allowed:
        raise LTXError(f"{duration} с: для {model} {res} {fps} fps можно {', '.join(map(str, allowed))} с")


def estimate(model: str, res: str, duration: int | None, fps: int = 24, audio: bool = False) -> float:
    """Цена в $; для авто-длительности и аудио — по самому длинному допустимому варианту."""
    secs = audio_max(model, res) if audio else duration or max(durations(model, res, fps))
    return round(PRICE[model][ALL_SIZES[res]] * secs, 2)


def _jpeg(path: Path, res: str | None = None) -> bytes:
    """Любая читаемая картинка → JPEG: учитываем EXIF-поворот, прозрачность кладём на белый."""
    from PIL import Image, ImageOps, UnidentifiedImageError

    try:
        im = ImageOps.exif_transpose(Image.open(path))
    except Image.DecompressionBombError as e:
        raise LTXError(f"{path.name}: картинка слишком большая — уменьши до 4K") from e
    except (UnidentifiedImageError, OSError) as e:
        raise LTXError(f"{path.name}: не картинка или формат не читается (подойдут PNG, JPEG, WEBP)") from e
    if im.mode.startswith("I"):  # 16-битные серые (рендеры, маски): ужимаем в 8 бит, а не в белый лист
        im = im.convert("I").point(lambda v: v * (1 / 256)).convert("L")
    if max(im.size) > 4096:  # LTX выдаёт максимум 4K — больше слать незачем
        im.thumbnail((4096, 4096))
    if im.mode in ("RGBA", "LA", "PA") or (im.mode == "P" and "transparency" in im.info):
        rgba = im.convert("RGBA")
        im = Image.new("RGB", rgba.size, (255, 255, 255))
        im.paste(rgba, mask=rgba.getchannel("A"))
        log.warning("%s: прозрачный фон заменён белым", path.name)
    else:
        im = im.convert("RGB")
    if res:
        tw, th = (int(x) for x in res.split("x"))
        if abs((im.width / im.height) / (tw / th) - 1) > 0.02:
            log.warning("Пропорции %s (%dx%d) не совпадают с %s — LTX подгонит кадр сам", path.name, *im.size, res)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=95)
    return buf.getvalue()


class LTX:
    def __init__(self, api_key: str | None = None, timeout: float = 60) -> None:
        key = api_key if api_key is not None else env("LTXV_API_KEY", env("LTX_API_KEY", ""))
        self.api_key = key.strip()
        self.timeout = timeout
        self.http = requests.Session()
        self.last_url: str | None = None  # ссылка на последний готовый ролик (на случай, если файл не дошёл)

    @property
    def enabled(self) -> bool:
        return bool(self.api_key)

    def _headers(self) -> dict[str, str]:
        if not self.api_key:
            raise LTXError("Нужен ключ LTX API: переменная LTXV_API_KEY (console.ltx.io → API Keys)")
        if any(c.isspace() or ord(c) < 32 for c in self.api_key):  # иначе requests напечатает ключ в ошибке
            raise LTXError("В LTXV_API_KEY пробелы или переносы строк — скопируй ключ заново одной строкой")
        return {"Authorization": f"Bearer {self.api_key}"}

    def check(self) -> str:
        """Проверить ключ, ничего не тратя: статус несуществующей задачи → 404, если ключ принят."""
        r = self.http.get(f"{API}/v2/text-to-video/{uuid.uuid4()}", headers=self._headers(), timeout=self.timeout)
        if r.status_code == 404:
            return "Ключ LTX принят, API отвечает"
        self._raise(r)
        return f"LTX ответил {r.status_code}"

    @staticmethod
    def _raise(r: requests.Response) -> None:
        try:
            err = r.json().get("error") or {}
            msg = f"{err.get('type', r.status_code)}: {err.get('message', '')}"
        except ValueError:
            msg = f"{r.status_code}: {r.text[:300]}"
        hint = {
            401: " — проверь LTXV_API_KEY",
            402: " — на счету LTX закончились кредиты (console.ltx.io → Billing)",
            413: " — запрос больше 32 МБ, уменьши кадр",
            422: " — промпт или кадр не прошли фильтр безопасности",
        }.get(r.status_code, "")
        raise LTXError(f"LTX API {msg}{hint}")

    @staticmethod
    def _backoff(r: requests.Response, attempt: int) -> float:
        """Пауза перед повтором: Retry-After в секундах, иначе экспонента с джиттером."""
        try:
            return min(60.0, float(r.headers["Retry-After"]))
        except (KeyError, ValueError):
            return 2 ** (attempt + 1) + random.random()

    # -- входные файлы -------------------------------------------------------
    def upload(self, data: bytes) -> str:
        """Байты файла → ltx://… (хранится 24 ч, до 200 МБ). Ключ уходит только на api.ltx.io."""
        r = self.http.post(f"{API}/v1/upload", headers=self._headers(), timeout=self.timeout)
        if r.status_code != 200:
            self._raise(r)
        info = r.json()
        put = self.http.put(info["upload_url"], data=data, headers=info.get("required_headers") or {}, timeout=300)
        if put.status_code not in (200, 201):
            raise LTXError(f"Загрузка файла не удалась: {put.status_code} {put.text[:200]}")
        return info["storage_uri"]

    def media(self, src: str, kind: str = "image", res: str | None = None) -> str:
        """https:// ltx:// data: — как есть; локальная картинка → JPEG data URI (или upload, если > 7 МБ);
        аудио и видео — через upload."""
        if src.startswith(("https://", "ltx://", "data:")):
            return src
        if src.startswith("http://"):
            raise LTXError("LTX принимает только https-ссылки — скачай файл или возьми https-адрес")
        path = Path(src)
        if not path.is_file():
            raise LTXError(f"Нет файла {src}")
        if kind != "image":
            return self.upload(path.read_bytes())
        data = _jpeg(path, res)
        uri = "data:image/jpeg;base64," + base64.b64encode(data).decode()
        return uri if len(uri) <= DATA_URI_MAX else self.upload(data)

    # -- задачи --------------------------------------------------------------
    def submit(self, endpoint: str, body: dict) -> Job:
        r = None
        for attempt in range(5):
            try:
                r = self.http.post(f"{API}/v2/{endpoint}", json=body, headers=self._headers(), timeout=self.timeout)
            except requests.ConnectionError as e:  # запрос не дошёл — повтор безопасен
                if attempt == 4:
                    raise LTXError(f"LTX API недоступен: {e}") from e
                time.sleep(2 ** (attempt + 1))
                continue
            except requests.Timeout as e:  # дошёл, но ответа нет — задача могла создаться, второй раз не шлём
                raise LTXError("LTX не ответил вовремя; задача могла создаться — проверь console.ltx.io") from e
            if r.status_code == 202:
                return Job(endpoint, r.json()["id"])
            if r.status_code in RETRY and attempt < 4:
                wait = self._backoff(r, attempt)
                log.warning("LTX %s, повтор через %.0f с", r.status_code, wait)
                time.sleep(wait)
                continue
            self._raise(r)
        raise LTXError("LTX API: задача не поставлена")

    def status(self, job: Job) -> dict:
        r = self.http.get(f"{API}/v2/{job.endpoint}/{job.id}", headers=self._headers(), timeout=self.timeout)
        if r.status_code in RETRY:
            return {"status": "retry"}
        if r.status_code != 200:
            self._raise(r)
        return r.json()

    def wait(self, job: Job, timeout: float = 1800, on_status=None) -> str:
        """Опрос до готовности (не чаще раза в 5 с, как просит документация) → ссылка на mp4."""
        start, last, errors = time.time(), None, 0
        while time.time() - start < timeout:
            try:
                data = self.status(job)
                errors = 0
            except requests.RequestException as e:  # сеть моргнула — задача на стороне LTX идёт дальше
                errors += 1
                if errors >= 10:
                    raise LTXError(f"Связь с LTX пропала. Задача {job} идёт; забрать позже: --job {job}") from e
                data = {"status": "retry"}
            st = data.get("status")
            if st != last and st != "retry":
                log.info("LTX %s: %s", job, st)
                if on_status:
                    on_status(st)
                last = st
            if st == "completed":
                result = data.get("result") or {}
                url = result.get("video_url") or next(iter(result.values()), None)
                if not url:
                    raise LTXError(f"Задача {job} завершилась без ссылки на видео: {result}")
                return url
            if st == "failed":
                err = data.get("error") or {}
                raise LTXError(f"Генерация не удалась — {err.get('type')}: {err.get('message')}")
            time.sleep(5 + random.random())
        raise LTXError(f"Задача {job} не завершилась за {timeout / 60:.0f} мин; забрать позже: --job {job}")

    def download(self, url: str, path: Path) -> Path:
        """Скачать готовое видео (ссылка подписана, ключ не нужен); при сбое ссылка попадает в ошибку."""
        path.parent.mkdir(parents=True, exist_ok=True)
        part = path.with_name(path.name + ".part")
        for attempt in range(3):
            try:
                with self.http.get(url, stream=True, timeout=self.timeout) as r:
                    r.raise_for_status()
                    with open(part, "wb") as f:
                        for chunk in r.iter_content(1 << 16):
                            f.write(chunk)
                part.replace(path)
                return path
            except requests.RequestException as e:
                part.unlink(missing_ok=True)
                if attempt == 2:
                    raise LTXError(f"Видео готово, но не скачалось ({e}). Ссылка, пока не истекла: {url}") from e
                time.sleep(2 ** (attempt + 1))
        raise AssertionError("unreachable")

    # -- всё вместе ----------------------------------------------------------
    def build(
        self,
        prompt: str,
        image: str | None = None,
        last_frame: str | None = None,
        audio: str | None = None,
        model: str = "ltx-2-5-fast",
        duration: int | None = 6,
        res: str = "1920x1080",
        fps: int = 24,
        sound: bool = True,
        camera: str | None = None,
    ) -> tuple[str, dict]:
        """Собрать (endpoint, тело запроса); файлы на этом шаге уже превращены в URI."""
        if camera and camera not in CAMERA:
            raise LTXError(f"Камера «{camera}»: {', '.join(CAMERA)}")
        if last_frame and not image:
            raise LTXError("Последний кадр работает только вместе с первым (--image)")
        if audio:  # длину задаёт само аудио: 2–20 с у fast на 720p/1080p, иначе 2–10 с
            validate(model, res, None, fps)
            body: dict = {"audio_uri": self.media(audio, "audio"), "prompt": prompt, "model": model,
                          "resolution": res, "fps": fps}
            endpoint = "audio-to-video"
        else:
            validate(model, res, duration, fps, bool(last_frame))
            body = {"prompt": prompt, "model": model, "duration": duration, "resolution": res, "fps": fps,
                    "generate_audio": sound}
            endpoint = "image-to-video" if image else "text-to-video"
        if image:
            body["image_uri"] = self.media(image, res=res)
            if last_frame:
                body["last_frame_uri"] = self.media(last_frame, res=res)
        if camera:
            body["camera_motion"] = camera
        return endpoint, body

    def generate(self, out: Path, prompt: str, on_status=None, on_job=None, **kw) -> Path:
        endpoint, body = self.build(prompt, **kw)
        job = self.submit(endpoint, body)
        log.info("LTX задача %s (%s) поставлена; если что-то сорвётся: --job %s", job, body["model"], job)
        if on_job:
            on_job(job)
        return self._fetch(job, self.wait(job, on_status=on_status), out)

    def resume(self, job: Job, out: Path) -> Path:
        """Дозабрать видео по id задачи (статус хранится до 24 ч после завершения)."""
        return self._fetch(job, self.wait(job), out)

    def _fetch(self, job: Job, url: str, out: Path) -> Path:
        """Скачать результат; если ссылка уже протухла (403/404), взять свежую из статуса задачи."""
        self.last_url = url
        log.info("LTX %s готово: %s", job, url)
        try:
            return self.download(url, out)
        except LTXError:
            fresh = self.wait(job)
            if fresh == url:
                raise
            self.last_url = fresh
            return self.download(fresh, out)
