"""Wan 2.2 бесплатно: демо на Hugging Face (ZeroGPU) — кадр → видео и переход «первый кадр → последний».

- Основное демо: Upsampler/wan-2-2-14b-image-to-video (WAN_SPACE). Это форк быстрого Wan 2.2 от команды
  Hugging Face с параметром end_image: с ним — переход между двумя кадрами, без него — оживление одного кадра.
- Запасное для одного кадра: zerogpu-aoti/wan2-2-fp8da-aoti-faster (WAN_SPACE_I2V), исходная сборка команды
  Hugging Face. В ноябре 2026 она падала с ошибкой ещё до генерации, поэтому идёт второй.

Внутри Wan2.2-I2V-A14B (fp8, дистилляция lightx2v, 6 шагов).

Что выходит:
- 832×480 при 16:9 (640×640 при квадрате, 480×832 при вертикали);
- 16 кадров в секунду, 0,5–5 с, без звука.

Квоту ZeroGPU Wan просит в 3–4 раза меньше LTX: ~38 квота-с за 2 с и ~57 за 3 с, у LTX 134–194.
У бесплатного аккаунта 300 квота-с в день, они общие для LTX и Wan.

Лицензия Wan 2.2 — Apache-2.0.
Кадры уходят в публичный сервис третьей стороны: материалы клиента — только с согласия.
Токен (HF_TOKEN или вход `hf auth login`) передаётся серверу демо, поэтому держи для этого отдельный
токен только на чтение.
"""

from __future__ import annotations

import logging
import os
import shutil
import tempfile
from pathlib import Path

from .ltx import LTXError
from .ltx_space import CAMERA_WORDS

log = logging.getLogger("designer.wan_space")

SPACE_FLF = os.environ.get("WAN_SPACE", "Upsampler/wan-2-2-14b-image-to-video")
SPACE_I2V = os.environ.get("WAN_SPACE_I2V", "zerogpu-aoti/wan2-2-fp8da-aoti-faster")
MAX_SECONDS = 5.0
FPS = 16
STEPS = 6
DEFAULT_PROMPT = "make this image come alive, cinematic motion, smooth animation"


def target_size(width: int, height: int) -> tuple[int, int]:
    """Размер, к которому демо приводит кадр (длинная сторона 832, короткая не меньше 480, кратно 16)."""
    ar = width / height
    if 1 / 1.2 < ar < 1.2:
        return 640, 640
    if ar >= 1:
        short = 480 if ar >= 1.6 else max(480, round(832 / ar / 16) * 16)
        return 832, short
    short = 480 if 1 / ar >= 1.6 else max(480, round(832 * ar / 16) * 16)
    return short, 832


def prep(path: str, size: tuple[int, int], out_dir: Path) -> Path:
    """Кадр → ровно size: заполнить и обрезать по центру, чтобы демо не резало первый кадр и не сжимало последний."""
    from PIL import Image, ImageOps

    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    im = ImageOps.fit(im, size, Image.LANCZOS, centering=(0.5, 0.5))
    out = out_dir / f"{Path(path).stem}-{size[0]}x{size[1]}.png"
    im.save(out)
    return out


def frames(seconds: float) -> int:
    return 1 + min(80, max(8, round(seconds * FPS)))


def quota_seconds(seconds: float, steps: int = STEPS, size: tuple[int, int] = (832, 480)) -> int:
    """Сколько квоты ZeroGPU запросит демо: формула из app.py (с его рамками 20–150 с) ×1,5 для GPU Blackwell."""
    w, h = size
    work = frames(seconds) * w * h / (81 * 832 * 624)
    return round(int(min(max(10 + steps * 15 * work ** 1.5, 20), 150)) * 1.5)


def spaces_for(last_frame: bool) -> list[str]:
    """Демо в порядке попыток: переход — только форк с end_image; один кадр — он же, запасное — сборка HF."""
    return [SPACE_FLF] if last_frame else list(dict.fromkeys([SPACE_FLF, SPACE_I2V]))


def _is_quota(msg: str) -> bool:
    low = msg.lower()
    return "quota" in low or "runs limit" in low


def clamp_seconds(duration: float | None) -> float:
    d = float(duration or 3.0)
    if d > MAX_SECONDS:
        log.warning("Wan в бесплатном демо — максимум %.0f с; делаю %.0f с", MAX_SECONDS, MAX_SECONDS)
    return max(0.5, min(MAX_SECONDS, round(d * 2) / 2))


def generate(
    out: Path,
    prompt: str,
    image: str | None = None,
    last_frame: str | None = None,
    duration: float | None = 3.0,
    camera: str | None = None,
    seed: int | None = None,
    steps: int = STEPS,
) -> tuple[Path, str]:
    """Сгенерировать ролик Wan 2.2. С last_frame — переход от первого кадра к последнему."""
    if not image:
        raise LTXError("Wan в бесплатном демо работает только от кадра: нужен первый кадр (--image)")
    try:
        from gradio_client import Client, handle_file
    except ImportError as e:
        raise LTXError("Нужен пакет gradio_client: pip install gradio_client") from e
    for p in (image, last_frame):
        if p and not Path(p).is_file():
            raise LTXError(f"Нет файла {p}")

    from PIL import Image

    with Image.open(image) as im:
        size = target_size(*im.size)
    secs = clamp_seconds(duration)
    text = (prompt or DEFAULT_PROMPT).strip()
    if camera:
        text = f"{text} {CAMERA_WORDS.get(camera, '')}".strip()
    spaces = spaces_for(bool(last_frame))
    errors: list[str] = []
    with tempfile.TemporaryDirectory() as tmp:
        first = prep(image, size, Path(tmp))
        args = dict(input_image=handle_file(str(first)), prompt=text, steps=steps, duration_seconds=secs,
                    guidance_scale=1, guidance_scale_2=1, seed=seed if seed is not None else 42,
                    randomize_seed=seed is None)
        if last_frame:
            args["end_image"] = handle_file(str(prep(last_frame, size, Path(tmp))))
        for i, space in enumerate(spaces):
            log.info("Wan %s: %dx%d, %g с, запрос квоты ≈%d с", space, *size, secs, quota_seconds(secs, steps, size))
            try:
                client = Client(space, token=os.environ.get("HF_TOKEN") or None, verbose=False)
                video, used_seed = client.predict(**args, api_name="/generate_video")
            except Exception as e:  # квота, очередь, сеть, изменившийся или сломанный API демо
                msg = str(e)
                if _is_quota(msg):  # квота общая на аккаунт — запасное демо не поможет
                    raise LTXError(f"Квоты Hugging Face на сегодня не хватает на ролик Wan ({msg[:300]}). Возьми "
                                   "короче или подожди до завтра; с HF PRO квота в 8 раз больше.") from e
                errors.append(f"{space}: {msg[:300]}")
            else:
                src = video if isinstance(video, str) else (video or {}).get("video")
                if src and Path(src).is_file():
                    out.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copyfile(src, out)
                    seed_note = f" · сид {int(used_seed)}" if used_seed is not None else ""
                    return out, f"Wan 2.2 · {size[0]}×{size[1]} · {secs:g} с · 16 к/с · без звука{seed_note}"
                errors.append(f"{space} не вернул видео: {video!r}"[:300])
            if i + 1 < len(spaces):
                log.warning("Wan: демо %s не сработало (%s) — пробую %s", space, errors[-1][:200], spaces[i + 1])
    raise LTXError("Wan: " + "; ".join(errors))
