"""Маски обода сумки из исходных кадров: в кадр подставляется рендер тоннеля, обод остаётся родной."""
import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def rim_mask_rect(size, box, radius):
    """294: проём обода — скруглённый прямоугольник (x0, y0, x1, y1) в пикселях кадра."""
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle(box, radius=radius, fill=255)
    return m.filter(ImageFilter.GaussianBlur(1.5))


def rim_mask_293(ref_path):
    """293: всё выше голубого блика на верхнем крае обода (край почти прямой, строим прямую)."""
    ref = Image.open(ref_path).convert("RGB")
    hsv = np.asarray(ref.convert("HSV")).astype(np.float32) / 255
    h, s, v = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]
    cyan = (h > 175) & (h < 215) & (s > 0.35) & (v > 0.45)
    rows, cols = cyan.shape
    edge = np.full(cols, rows, dtype=np.int32)
    for x in range(cols):
        col = cyan[:, x]
        y = rows - 1
        while y > rows * 0.6 and col[y]:  # блик на нижней кромке обода пропускаем
            y -= 1
        fabric = 0
        while y > rows * 0.6 and (not col[y] or fabric < 12):  # ткань снизу вверх до верхнего блика
            fabric = fabric + 1 if not col[y] else fabric
            y -= 1
        edge[x] = y if y > rows * 0.6 else rows
    xs = np.arange(cols)
    ok = edge < rows
    a, b = np.polyfit(xs[ok], edge[ok], 1)
    ok2 = ok & (np.abs(edge - (a * xs + b)) < 25)
    a, b = np.polyfit(xs[ok2], edge[ok2], 1)
    line = a * xs + b
    mask = np.zeros((rows, cols), dtype=np.uint8)
    for x in range(cols):
        mask[: max(0, int(line[x]) - 3), x] = 255
    return Image.fromarray(mask).filter(ImageFilter.GaussianBlur(2))
