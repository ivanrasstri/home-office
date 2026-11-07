"""LTX-2.5 (Lightricks) через официальный API: видео со звуком из текста, кадра или аудио.

Документация: https://docs.ltx.io · ключ: https://console.ltx.io → переменная LTXV_API_KEY.
Модели: ltx-2-5-fast (дешевле, до 20 с на 720p/1080p) и ltx-2-5-pro (качественнее, 6/8/10 с).
API асинхронный: POST /v2/<endpoint> → id → опрос GET /v2/<endpoint>/<id> раз в 5–6 с →
result.video_url. Ссылка на результат быстро протухает, поэтому файл сразу скачиваем.
"""

from __future__ import annotations

import base64
import io
import logging
import os
import random
import time
from dataclasses import dataclass
from pathlib import Path

import requests

log = logging.getLogger("designer.ltx")

API = os.environ.get("LTX_API_BASE", "https://api.ltx.io").rstrip("/")
MODELS = ("ltx-2-5-fast", "ltx-2-5-pro")
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
ALL_SIZES = {s: side for side, m in SIZES.items() for s in m.values()}

# $ за секунду видео по короткой стороне кадра (docs.ltx.io/pricing); пропорция на цену не влияет
PRICE = {
    "ltx-2-5-fast": {720: 0.09, 1080: 0.13, 1440: 0.19, 2160: 0.30},
    "ltx-2-5-pro": {720: 0.12, 1080: 0.17, 1440: 0.25, 2160: 0.39},
}
IMAGE_DATA_URI_MAX = 7 * 1024 * 1024  # больше — через /v1/upload


class LTXError(RuntimeError):
    pass


@dataclass
class Job:
    endpoint: str
    id: str


def model_id(name: str) -> str:
    """«fast»/«pro» → полный id модели."""
    name = name.strip().lower()
    return name if name in MODELS else f"ltx-2-5-{name}"


def resolution(value: str, aspect: str = "16:9") -> str:
    """«1080p» + «9:16» → «1080x1920»; точный «ШxВ» проверяется по списку LTX."""
    v = value.strip().lower()
    if v in ALL_SIZES:
        return v
    side = TIERS.get(v)
    if side is None:
        raise LTXError(f"Разрешение «{value}»: 720p, 1080p, 1440p, 4k или точный размер, напр. 1920x1080")
    if aspect not in SIZES[side]:
        raise LTXError(f"Пропорция «{aspect}»: {', '.join(SIZES[side])}")
    return SIZES[side][aspect]


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


def estimate(model: str, res: str, duration: int | None, fps: int = 24) -> float:
    """Цена в $; для авто-длительности — по самому длинному варианту."""
    secs = duration or max(durations(model, res, fps))
    return round(PRICE[model][ALL_SIZES[res]] * secs, 2)


def _aspect_mismatch(image: Path, res: str) -> float:
    from PIL import Image

    w, h = Image.open(image).size
    tw, th = (int(x) for x in res.split("x"))
    return abs((w / h) / (tw / th) - 1)


class LTX:
    def __init__(self, api_key: str | None = None, timeout: float = 60) -> None:
        key = api_key if api_key is not None else os.environ.get("LTXV_API_KEY") or os.environ.get("LTX_API_KEY", "")
        self.api_key = key.strip()
        self.timeout = timeout
        self.http = requests.Session()

    @property
    def enabled(self) -> bool:
        return bool(self.api_key)

    def _headers(self) -> dict[str, str]:
        if not self.api_key:
            raise LTXError("Нужен ключ LTX API: переменная LTXV_API_KEY (console.ltx.io → API Keys)")
        return {"Authorization": f"Bearer {self.api_key}"}

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
            422: " — промпт или кадр не прошли фильтр безопасности",
        }.get(r.status_code, "")
        raise LTXError(f"LTX API {msg}{hint}")

    # -- входные файлы -------------------------------------------------------
    def upload(self, path: Path) -> str:
        """Файл → ltx://… (хранится 24 ч, до 200 МБ)."""
        r = self.http.post(f"{API}/v1/upload", headers=self._headers(), timeout=self.timeout)
        if r.status_code != 200:
            self._raise(r)
        info = r.json()
        with open(path, "rb") as f:
            put = self.http.put(info["upload_url"], data=f, headers=info.get("required_headers") or {}, timeout=300)
        if put.status_code not in (200, 201):
            raise LTXError(f"Загрузка {path.name} не удалась: {put.status_code} {put.text[:200]}")
        return info["storage_uri"]

    def media(self, src: str, kind: str = "image") -> str:
        """HTTPS/ltx:// /data: — как есть; локальная картинка → data URI (JPEG), аудио/видео → upload."""
        if src.startswith(("https://", "ltx://", "data:")):
            return src
        path = Path(src)
        if not path.is_file():
            raise LTXError(f"Нет файла {src}")
        if kind != "image":
            return self.upload(path)
        from PIL import Image

        im = Image.open(path).convert("RGB")
        buf = io.BytesIO()
        im.save(buf, "JPEG", quality=95)
        data = buf.getvalue()
        if len(data) > IMAGE_DATA_URI_MAX:
            return self.upload(path)
        return "data:image/jpeg;base64," + base64.b64encode(data).decode()

    # -- задачи --------------------------------------------------------------
    def submit(self, endpoint: str, body: dict) -> Job:
        for attempt in range(5):
            r = self.http.post(f"{API}/v2/{endpoint}", json=body, headers=self._headers(), timeout=self.timeout)
            if r.status_code == 202:
                return Job(endpoint, r.json()["id"])
            if r.status_code in (429, 500, 503, 529) and attempt < 4:
                wait = float(r.headers.get("Retry-After") or 2 ** (attempt + 1) + random.random())
                log.warning("LTX %s, повтор через %.0f с", r.status_code, wait)
                time.sleep(wait)
                continue
            self._raise(r)
        raise LTXError("LTX API: задача не поставлена")

    def status(self, job: Job) -> dict:
        r = self.http.get(f"{API}/v2/{job.endpoint}/{job.id}", headers=self._headers(), timeout=self.timeout)
        if r.status_code >= 500:
            return {"status": "retry"}
        if r.status_code != 200:
            self._raise(r)
        return r.json()

    def wait(self, job: Job, timeout: float = 1800, on_status=None) -> str:
        """Опрос до готовности (не чаще раза в 5 с, как просит документация) → ссылка на mp4."""
        start, last = time.time(), None
        while time.time() - start < timeout:
            data = self.status(job)
            st = data.get("status")
            if st != last and st != "retry":
                log.info("LTX %s: %s", job.id, st)
                if on_status:
                    on_status(st)
                last = st
            if st == "completed":
                result = data.get("result") or {}
                url = result.get("video_url") or next(iter(result.values()), None)
                if not url:
                    raise LTXError(f"Задача {job.id} завершилась без ссылки на видео: {result}")
                return url
            if st == "failed":
                err = data.get("error") or {}
                raise LTXError(f"Генерация не удалась — {err.get('type')}: {err.get('message')}")
            time.sleep(5 + random.random())
        raise LTXError(f"Задача {job.id} не завершилась за {timeout / 60:.0f} мин")

    def download(self, url: str, path: Path) -> Path:
        path.parent.mkdir(parents=True, exist_ok=True)
        with self.http.get(url, stream=True, timeout=self.timeout) as r:  # без ключа: ссылка уже подписана
            r.raise_for_status()
            with open(path, "wb") as f:
                for chunk in r.iter_content(1 << 16):
                    f.write(chunk)
        return path

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
        if audio:  # длительность задаёт само аудио (2–20 с fast 720p/1080p, иначе до 10 с)
            body: dict = {"audio_uri": self.media(audio, "audio"), "prompt": prompt, "model": model,
                          "resolution": res, "fps": fps}
            endpoint = "audio-to-video"
        else:
            validate(model, res, duration, fps, bool(last_frame))
            body = {"prompt": prompt, "model": model, "duration": duration, "resolution": res, "fps": fps,
                    "generate_audio": sound}
            endpoint = "image-to-video" if image else "text-to-video"
        if image:
            if not image.startswith(("https://", "ltx://", "data:")) and _aspect_mismatch(Path(image), res) > 0.02:
                log.warning("Пропорции кадра %s не совпадают с %s — LTX подгонит кадр сам", image, res)
            body["image_uri"] = self.media(image)
            if last_frame:
                body["last_frame_uri"] = self.media(last_frame)
        if camera:
            body["camera_motion"] = camera
        return endpoint, body

    def generate(self, out: Path, prompt: str, on_status=None, **kw) -> Path:
        endpoint, body = self.build(prompt, **kw)
        job = self.submit(endpoint, body)
        log.info("LTX задача %s (%s, %s) поставлена", job.id, endpoint, body["model"])
        return self.download(self.wait(job, on_status=on_status), out)
