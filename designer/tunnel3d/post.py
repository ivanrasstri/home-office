"""Финиш кадра: сжатие 4K → 1080p, мягкая виньетка, мелкое зерно (убирает CG-бандинг).

post.py in.png out.png [vignette=0.14] [grain=1.6]
"""
import sys

import numpy as np
from PIL import Image


def finish(src, dst, vignette=0.14, grain=1.6, size=(1920, 1080), seed=7):
    im = Image.open(src).convert("RGB")
    if im.size != size:
        im = im.resize(size, Image.LANCZOS)
    a = np.asarray(im).astype(np.float32)
    h, w = a.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w]
    r = np.sqrt(((xx - w / 2) / (w / 2)) ** 2 + ((yy - h / 2) / (h / 2)) ** 2) / np.sqrt(2)
    a *= (1 - vignette * np.clip(r, 0, 1) ** 2.2)[..., None]
    if grain:
        rng = np.random.default_rng(seed)
        a += rng.normal(0, grain, a.shape[:2])[..., None]
    Image.fromarray(np.clip(a, 0, 255).round().astype(np.uint8)).save(dst)


if __name__ == "__main__":
    args = sys.argv[1:]
    finish(args[0], args[1], *(float(x) for x in args[2:4]))
