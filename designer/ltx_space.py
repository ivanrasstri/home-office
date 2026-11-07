"""LTX-2.5 бесплатно: официальный Space Lightricks/LTX-2.5 на Hugging Face (ZeroGPU).

Открытые веса LTX-2.5 (huggingface.co/Lightricks/LTX-2.5) Lightricks держат в демо на бесплатных
видеокартах Hugging Face. Мы зовём это демо через gradio_client.

Ограничения демо:
- длина 1–5 с (или авто до 15 с);
- сторона кадра 512–1536 px, кратно 64 (кадр 1080p не влезает — берём 832x1472);
- звук генерируется всегда;
- движения камеры параметром нет, поэтому описываем его словами в промпте;
- последнего кадра и аудио на входе нет — это есть только в платном API.

Квота дневная. Без токена Hugging Face её почти нет. С бесплатным токеном хватает на несколько
коротких роликов в день, с HF PRO квота в 8 раз больше. Токен — переменная HF_TOKEN или секрет
окружения для хоста lightricks-ltx-2-5.hf.space (заголовок x-hf-authorization, Bearer): в этом
случае прокси подставит его сам.

Важно: кадр из --image уходит в публичный Space. Клиентские материалы — только с согласия владельца.
"""

from __future__ import annotations

import logging
import os
import shutil
from pathlib import Path

from .ltx import LTXError

log = logging.getLogger("designer.ltx_space")

SPACE = os.environ.get("LTX_SPACE", "Lightricks/LTX-2.5")
MAX_SECONDS = 5.0
CAMERA_WORDS = {
    "dolly_in": "The camera slowly dollies in.",
    "dolly_out": "The camera slowly pulls back.",
    "dolly_left": "The camera slowly tracks to the left.",
    "dolly_right": "The camera slowly tracks to the right.",
    "jib_up": "The camera rises smoothly upward.",
    "jib_down": "The camera lowers smoothly downward.",
    "static": "The camera stays completely still.",
    "focus_shift": "The focus slowly shifts from the foreground to the background.",
}


def _has_token() -> bool:
    """Есть ли токен Hugging Face (HF_TOKEN или `hf auth login`); секрет окружения прокси отсюда не виден."""
    try:
        from huggingface_hub import get_token

        return bool(get_token())
    except Exception:
        return bool(os.environ.get("HF_TOKEN"))


def dims(res: str) -> tuple[int, int]:
    """Размер в терминах LTX API («1920x1080») → ближайший допустимый для демо: (высота, ширина)."""
    w, h = (int(x) for x in res.lower().split("x"))
    short = 704 if min(w, h) <= 720 else 832
    long_ = min(1536, max(short, round(short * max(w, h) / min(w, h) / 64) * 64))
    return (short, long_) if w >= h else (long_, short)


def seconds(duration: int | float | None, quiet: bool = False) -> tuple[float, bool]:
    """Длина для демо: (секунды, авто). Больше 5 с демо не умеет — обрезаем с предупреждением."""
    if duration is None:
        return MAX_SECONDS, True
    d = float(duration)
    if d > MAX_SECONDS:
        if not quiet:
                log.warning("В бесплатном демо максимум %.0f с — делаю %.0f с (длиннее — платный API или auto)",
                        MAX_SECONDS, MAX_SECONDS)
        d = MAX_SECONDS
    return max(1.0, round(d * 2) / 2), False


def generate(
    out: Path,
    prompt: str,
    image: str | None = None,
    res: str = "1920x1080",
    duration: int | float | None = 5,
    camera: str | None = None,
    seed: int | None = None,
    enhance: bool = False,
    last_frame: str | None = None,
    audio: str | None = None,
    sound: bool = True,
) -> tuple[Path, str]:
    """Сгенерировать ролик в демо. Возвращает (путь к mp4, «сколько кадров вышло»)."""
    if last_frame or audio:
        raise LTXError("Последний кадр и аудио на входе есть только в платном LTX API (--via api)")
    if not sound:
        log.warning("Демо всегда генерирует звук — --silent здесь не действует")
    try:
        from gradio_client import Client, handle_file
    except ImportError as e:
        raise LTXError("Нужен пакет gradio_client: pip install gradio_client") from e

    if camera:
        prompt = f"{prompt.rstrip()} {CAMERA_WORDS.get(camera, '')}".strip()
    height, width = dims(res)
    secs, auto = seconds(duration)
    path = None
    if image:
        path = image if image.startswith(("http://", "https://")) else str(Path(image).resolve())
        if not path.startswith("http") and not Path(path).is_file():
            raise LTXError(f"Нет файла {image}")
    log.info("Space %s: %dx%d, %s, сид %s", SPACE, width, height, "авто ≤15 с" if auto else f"{secs:g} с",
             seed if seed is not None else "случайный")
    try:
        client = Client(SPACE, verbose=False)
        video, used_prompt, used_seed, length = client.predict(
            prompt, handle_file(path) if path else None, height, width, secs,
            seed if seed is not None else 42, "conv", auto, seed is None, enhance,
            api_name="/run",
        )
    except Exception as e:  # AppError, сеть, очередь
        msg = str(e)
        if "quota" in msg.lower() or "runs limit" in msg.lower():
            if _has_token():
                raise LTXError(
                    f"Квоты Hugging Face на сегодня не хватает на этот ролик ({msg[:300]}). Возьми короче "
                    "или меньше (например --res 720p --duration 2) или подожди до завтра; с HF PRO квота "
                    "в 8 раз больше. Без лимитов — платный LTX API (--via api)."
                ) from e
            raise LTXError(
                "Без токена Hugging Face квоты нет. Нужен токен (бесплатный аккаунт → Settings → "
                "Access Tokens): переменная HF_TOKEN, `hf auth login` или секрет окружения для "
                "lightricks-ltx-2-5.hf.space. С HF PRO квота в 8 раз больше. Без лимитов — платный "
                "LTX API (--via api)."
            ) from e
        raise LTXError(f"Space {SPACE}: {msg[:500]}") from e
    src = video if isinstance(video, str) else (video or {}).get("video")
    if not src or not Path(src).is_file():
        raise LTXError(f"Space {SPACE} не вернул видео: {video!r}")
    out.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(src, out)
    log.info("Space: %s, сид %s", length, used_seed)
    return out, f"{length}, сид {int(used_seed)}"
