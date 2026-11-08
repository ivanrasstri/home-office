"""Студия LTX-2.5 на своём сервере: веб-страница с паролем, видео из текста или кадра.

Считает не сервер, а Hugging Face (бесплатное демо Lightricks на их видеокартах, дневная квота
по HF_TOKEN) или платный LTX API (LTXV_API_KEY). Поэтому студии не нужна видеокарта: она живёт
на Railway или любом маленьком сервере и открывается с телефона.

Переменные:
  STUDIO_PASSWORD  — пароль входа (обязательно: без пароля студия не запустится);
  STUDIO_USER      — логин (по умолчанию studio);
  HF_TOKEN         — токен Hugging Face для бесплатного режима;
  LTXV_API_KEY     — ключ LTX для платного режима (необязательно), LTX_MAX_USD — потолок цены ролика;
  PORT             — порт (Railway задаёт сам).

Запуск: python studio/app.py
"""

from __future__ import annotations

import logging
import os
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

import gradio as gr  # noqa: E402

from designer import ltx, ltx_space, wan_space  # noqa: E402

log = logging.getLogger("studio")

LTX = "LTX-2.5 · со звуком"
WAN = "Wan 2.2 · бесплатно, переход кадр→кадр, без звука"
FREE = "Бесплатно · Hugging Face"
PAID = "Платно · LTX API"
NO_CAMERA = "без движения камеры"
DEFAULT_PROMPT = "Subtle natural motion, the camera slowly pushes in."

INTRO = """# 🎬 Студия LTX-2.5
Видео со звуком из описания или из кадра. Пиши по-английски, 4–8 предложений:
кадр, действие по шагам, камера, свет, звук.

- **LTX-2.5** — со звуком. Бесплатно (демо Lightricks на Hugging Face): до 5 с, кадр до 832×1472.
  Платно (LTX API): 6–20 с, до 4K, переход от первого кадра к последнему.
- **Wan 2.2** — бесплатно и с переходом от первого кадра к последнему. Без звука, ~832×480, до 5 с,
  квоты тратит втрое меньше. Нужен первый кадр.

Квота Hugging Face общая: около 300 с в день, ролик LTX берёт 130–190 с, ролик Wan — 40–60 с.
"""


def paid_seconds(model: str, res: str, seconds: float) -> int:
    """Ближайшая длина, которую принимает платный API (6/8/10, у fast на 720p/1080p — до 20 с)."""
    allowed = ltx.durations(model, res, 24)
    return min(allowed, key=lambda d: (abs(d - seconds), d))


def make_video(model_name: str, prompt: str, image: str | None, last_frame: str | None, mode: str,
               seconds: float, aspect: str, quality: str, camera: str, enhance: bool) -> tuple[str, str]:
    prompt = (prompt or "").strip()
    if not prompt and not image:
        raise gr.Error("Опиши, что происходит в кадре, или загрузи первый кадр.")
    cam = None if camera == NO_CAMERA else camera
    if model_name == WAN:
        if not image:
            raise gr.Error("Wan работает от кадра: загрузи первый кадр (и последний — для перехода).")
        try:
            out = Path(tempfile.mkdtemp(prefix="studio-")) / "wan.mp4"
            path, info = wan_space.generate(out, prompt, image=image, last_frame=last_frame, duration=seconds,
                                            camera=cam)
        except ltx.LTXError as e:
            raise gr.Error(str(e)) from e
        log.info("готово: %s", info)
        return str(path), info
    try:
        res = ltx.resolution(quality, aspect)
        out = Path(tempfile.mkdtemp(prefix="studio-")) / "ltx.mp4"
        if mode == PAID:
            client = ltx.LTX()
            if not client.enabled:
                raise ltx.LTXError("Платный режим не настроен: на сервере нет LTXV_API_KEY. Выбери бесплатный.")
            model = "ltx-2-5-fast"
            dur = paid_seconds(model, res, seconds)
            price = ltx.estimate(model, res, dur)
            if price > ltx.max_usd():
                raise ltx.LTXError(f"Ролик стоит ≈${price:.2f} — дороже потолка ${ltx.max_usd():.2f} (LTX_MAX_USD).")
            path = client.generate(out, prompt or DEFAULT_PROMPT, image=image, last_frame=last_frame,
                                   model=model, duration=dur, res=res, camera=cam)
            info = f"Платно · {res} · {dur} с · ≈${price:.2f}"
        else:
            if last_frame:
                raise ltx.LTXError("Последний кадр работает только в платном режиме — убери его или переключи режим.")
            if not ltx_space._has_token():
                raise ltx.LTXError("Бесплатный режим не настроен: на сервере нет HF_TOKEN.")
            path, length = ltx_space.generate(out, prompt or DEFAULT_PROMPT, image=image, res=res,
                                              duration=seconds, camera=cam, enhance=enhance)
            h, w = ltx_space.dims(res)
            info = f"Бесплатно · {w}×{h} · {length}"
    except ltx.LTXError as e:
        raise gr.Error(str(e)) from e
    log.info("готово: %s", info)
    return str(path), info


def build() -> gr.Blocks:
    with gr.Blocks(title="Студия LTX-2.5", delete_cache=(3600, 86400)) as demo:
        gr.Markdown(INTRO)
        with gr.Row():
            with gr.Column():
                model = gr.Radio([LTX, WAN], value=LTX, label="Модель")
                prompt = gr.Textbox(label="Что происходит в кадре", lines=6,
                                    placeholder="A paper boat drifts across a calm pond at sunrise...")
                with gr.Row():
                    image = gr.Image(label="Первый кадр (необязательно)", type="filepath")
                    last_frame = gr.Image(label="Последний кадр (Wan — бесплатно, LTX — только платно)",
                                          type="filepath")
                mode = gr.Radio([FREE, PAID], value=PAID if ltx.LTX().enabled else FREE, label="Где считать")
                seconds = gr.Slider(2, 20, value=3, step=0.5, label="Длина, секунд (бесплатно — до 5)")
                with gr.Row():
                    aspect = gr.Radio(["16:9", "9:16", "1:1"], value="16:9", label="Кадр")
                    quality = gr.Radio(["720p", "1080p"], value="720p", label="Качество")
                camera = gr.Dropdown([NO_CAMERA, *ltx.CAMERA], value=NO_CAMERA, label="Камера")
                enhance = gr.Checkbox(value=False, label="Улучшить промпт моделью (бесплатный режим)")
                go = gr.Button("Сделать видео", variant="primary")
            with gr.Column():
                video = gr.Video(label="Результат", autoplay=True)
                info = gr.Markdown()
        # у Wan размер берётся от кадра, звука и платного режима нет — лишние поля прячем
        model.change(lambda m: [gr.update(visible=m == LTX)] * 4, model, [mode, aspect, quality, enhance])
        go.click(make_video, [model, prompt, image, last_frame, mode, seconds, aspect, quality, camera, enhance],
                 [video, info], concurrency_limit=1, api_name="make_video", api_visibility="undocumented")
    return demo


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")
    password = os.environ.get("STUDIO_PASSWORD", "").strip()
    if not password:
        sys.exit("STUDIO_PASSWORD не задан — без пароля студию в интернет не выпускаю.")
    user = os.environ.get("STUDIO_USER", "").strip() or "studio"
    build().queue(max_size=10).launch(
        server_name="0.0.0.0",
        server_port=int(os.environ.get("PORT", "7860")),
        auth=(user, password),
        auth_message="Студия LTX-2.5 · вход",
        footer_links=[],
        ssr_mode=False,
    )


if __name__ == "__main__":
    main()
