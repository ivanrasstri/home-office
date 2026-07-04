"""Экспорт презентаций из Figma сразу в PDF и PPTX.

  python -m figma_export FILE_KEY --page "Slides" --out dist

Один вызов Figma API на рендер кадров -> из тех же PNG собираются оба файла,
так что PDF и PPTX всегда выглядят одинаково.
"""
