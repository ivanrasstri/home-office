"""Точка входа.

  python -m figma_export FILE_KEY                 # первая страница файла
  python -m figma_export FILE_KEY --page "Slides"  # конкретная страница
  python -m figma_export FILE_KEY --out dist --scale 2

FILE_KEY — это часть ссылки Figma: figma.com/file/FILE_KEY/... или
figma.com/design/FILE_KEY/...

Нужен токен: переменная окружения FIGMA_TOKEN или флаг --token.
Результат: OUT/FILE_KEY.pdf и OUT/FILE_KEY.pptx.
"""

from __future__ import annotations

import argparse
import logging
import os
import sys
import tempfile
from pathlib import Path

from .build import build_pdf, build_pptx
from .client import FigmaClient, FigmaError
from .frames import FramesError, list_frames, pick_page

log = logging.getLogger("figma_export")


def _gh_summary(lines: list[str]) -> None:
    path = os.environ.get("GITHUB_STEP_SUMMARY")
    if not path:
        return
    try:
        with open(path, "a", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
    except OSError:
        pass


def run_export(
    file_key: str,
    token: str,
    page: str | None,
    out_dir: Path,
    scale: float,
    order: str,
) -> dict:
    client = FigmaClient(token)

    log.info("Загружаю структуру файла %s...", file_key)
    file_json = client.get_file(file_key)
    page_json = pick_page(file_json, page)
    frames = list_frames(page_json, order=order)
    log.info("Страница «%s»: найдено слайдов — %d", page_json["name"], len(frames))

    node_ids = [f.node_id for f in frames]
    log.info("Рендерю кадры через Figma (scale=%s)...", scale)
    images = client.get_images(file_key, node_ids, fmt="png", scale=scale)

    out_dir.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        image_paths = []
        for i, f in enumerate(frames):
            url = images[f.node_id]
            content = client.download(url)
            p = Path(tmp) / f"{i:03d}.png"
            p.write_bytes(content)
            image_paths.append(p)

        pdf_path = out_dir / f"{file_key}.pdf"
        pptx_path = out_dir / f"{file_key}.pptx"
        log.info("Собираю PDF...")
        build_pdf(image_paths, pdf_path)
        log.info("Собираю PPTX...")
        build_pptx(frames, image_paths, pptx_path)

    return {
        "page": page_json["name"],
        "slides": len(frames),
        "pdf": str(pdf_path),
        "pptx": str(pptx_path),
    }


def main() -> int:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

    parser = argparse.ArgumentParser(prog="figma_export")
    parser.add_argument("file_key", help="Ключ файла Figma (из ссылки на файл).")
    parser.add_argument("--page", default=None, help="Имя страницы (по умолчанию — первая).")
    parser.add_argument("--out", default="dist", help="Папка для результата (по умолчанию dist).")
    parser.add_argument("--scale", type=float, default=2.0, help="Масштаб рендера, 1..4 (по умолчанию 2).")
    parser.add_argument(
        "--order",
        choices=["position", "name", "none"],
        default="position",
        help="Порядок слайдов: по расположению на канвасе, по имени или как в Figma.",
    )
    parser.add_argument("--token", default=os.environ.get("FIGMA_TOKEN"), help="Figma access token.")
    args = parser.parse_args()
    page = args.page or None  # workflow_dispatch присылает "" для пустого поля

    try:
        result = run_export(
            file_key=args.file_key,
            token=args.token,
            page=page,
            out_dir=Path(args.out),
            scale=args.scale,
            order=args.order,
        )
    except (FigmaError, FramesError, ValueError) as e:
        log.error(str(e))
        return 2
    except Exception as e:
        log.exception("Экспорт упал: %s", e)
        return 1

    log.info("Готово: %s, %s (%d слайдов)", result["pdf"], result["pptx"], result["slides"])
    _gh_summary([
        "## 🖼️ Figma export — PDF + PPTX",
        "",
        f"- Страница: **{result['page']}**",
        f"- Слайдов: **{result['slides']}**",
        f"- 📄 `{result['pdf']}`",
        f"- 📊 `{result['pptx']}`",
    ])
    return 0


if __name__ == "__main__":
    sys.exit(main())
