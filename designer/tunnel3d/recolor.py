"""Перекраска рендеров тоннеля TEZKOR: голубые буквы → фирменный #00C2FF,
чёрные стены и обод → фирменный #7000FF (вариант B). Объём и тени сохраняются:
меняем тон и насыщенность, яркость берём из исходника."""
import sys
import numpy as np
from PIL import Image

BRAND_CYAN_H = 194.3 / 360   # #00C2FF
BRAND_PURPLE_H = 266.4 / 360  # #7000FF


def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def to_hsv(img):
    return np.asarray(img.convert("HSV")).astype(np.float32) / 255


def from_hsv(hsv):
    arr = (np.clip(hsv, 0, 1) * 255).round().astype(np.uint8)
    return np.asarray(Image.fromarray(arr, "HSV").convert("RGB")).astype(np.float32) / 255


def recolor(path, out_a, out_b):
    img = Image.open(path).convert("RGB")
    rgb = np.asarray(img).astype(np.float32) / 255
    hsv = to_hsv(img)
    H, S, V = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]

    # 1) голубые буквы: окно по тону 170–225°, заметная насыщенность и яркость
    hue_w = smooth(168, 180, H) * (1 - smooth(215, 228, H))
    w_blue = hue_w * smooth(0.12, 0.28, S) * smooth(0.3, 0.46, V)
    cyan = hsv.copy()
    cyan[..., 0] = BRAND_CYAN_H
    cyan[..., 1] = np.clip(S * 1.9 + 0.05, 0, 1)
    rgb_cyan = from_hsv(cyan)
    a = rgb * (1 - w_blue[..., None]) + rgb_cyan * w_blue[..., None]

    # 2) тёмные стены/обод → фиолетовый; яркие и голубые пиксели не трогаем
    w_dark = (1 - smooth(0.3, 0.5, V)) * (1 - w_blue)
    # уже фиолетовое свечение в конце тоннеля оставляем как есть
    is_purple = smooth(240, 252, H) * (1 - smooth(290, 300, H)) * smooth(0.3, 0.5, S)
    w_dark = w_dark * (1 - is_purple)
    purp = hsv.copy()
    purp[..., 0] = BRAND_PURPLE_H
    purp[..., 1] = 0.97
    purp[..., 2] = np.clip(0.32 + V * 2.6, 0, 1)
    rgb_purp = from_hsv(purp)
    b = a * (1 - w_dark[..., None]) + rgb_purp * w_dark[..., None]

    Image.fromarray((np.clip(a, 0, 1) * 255).round().astype(np.uint8)).save(out_a, optimize=True)
    Image.fromarray((np.clip(b, 0, 1) * 255).round().astype(np.uint8)).save(out_b, optimize=True)


if __name__ == "__main__":
    recolor(*sys.argv[1:4])
