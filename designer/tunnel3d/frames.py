"""Конфиги кадров 293/294/295 для вариантов A и B + сборка (обод, размытие движения).

python3 -I frames.py configs  -> пишет cfg_<кадр>_<вариант>.json
python3 -I frames.py compose  -> собирает итоговые n<кадр>_<вариант>.png из сырых рендеров
"""
import json
import os
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = Path(__file__).parent
# исходные кадры клиента (t293.png…, t293_B.png… после recolor.py) в репозиторий не кладём
REF = Path(os.environ.get("TUNNEL_REFS", HERE / "refs"))

VARIANTS = {
    "A": {"wall": "#0E131B", "haze": "#1F1840", "hazeDensity": 0.0025},
    "B": {"wall": "#4C00BE", "haze": "#5A1FE0", "hazeDensity": 0.003},
}
COMMON = {  # scene2.html: физические материалы, AO, свет из глубины
    "glow": "#7A2BFF", "bloom": 0.12, "bloomRadius": 0.3, "bloomThreshold": 0.97,
    "whiteEmissive": 0.06, "cyanEmissive": 0.5, "endI": 380, "midI": 40, "fillI": 0.8,
    "envI": 0.45, "exposure": 0.95, "pixelRatio": 2, "wallFill": 0.88, "wallStart": -0.8,
    "rowStart": 0, "L": 182,
}
H = 9
BLUR_STEPS = 16


def frame_cfgs(frame, v):
    base = {**COMMON, **VARIANTS[v]}
    if frame == "294":
        return [{**base, "fov": 50.4, "cam": [0, 0, 10.7], "look": [0, 0, -100]}]
    if frame == "293":  # низко у нижнего края сумки, взгляд чуть вверх, лёгкий крен
        y = -H / 2 + 1.3
        return [{**base, "fov": 58, "cam": [0.2, y, 6.5], "look": [0.2, y + 38, -93.5], "roll": -0.05}]
    if frame == "295":  # глубоко внутри, кадры на ходу камеры для размытия движения
        out = []
        for i in range(BLUR_STEPS):
            z = -28 - 0.9 * i / (BLUR_STEPS - 1)
            c = {**base, "fov": 64, "cam": [0, -0.15, z], "look": [0, -0.15, z - 100], "pixelRatio": 1.5}
            if i:
                c["cameraOnly"] = True
            out.append(c)
        return out
    raise ValueError(frame)


def configs():
    for frame in ("293", "294", "295"):
        for v in VARIANTS:
            (HERE / f"cfg_{frame}_{v}.json").write_text(json.dumps(frame_cfgs(frame, v)))


def rim_mask_rect(size, box, radius):
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle(box, radius=radius, fill=255)
    return m.filter(ImageFilter.GaussianBlur(1.5))


def rim_mask_293(ref_path):
    """Маска «тоннель» для 293: всё выше голубого блика на верхнем крае обода."""
    ref = Image.open(ref_path).convert("RGB")
    hsv = np.asarray(ref.convert("HSV")).astype(np.float32) / 255
    h, s, v = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]
    cyan = (h > 175) & (h < 215) & (s > 0.35) & (v > 0.45)
    H_, W_ = cyan.shape
    edge = np.full(W_, H_, dtype=np.int32)
    for x in range(W_):
        col = cyan[:, x]
        y = H_ - 1
        while y > H_ * 0.6 and col[y]:  # блик на нижней кромке обода пропускаем
            y -= 1
        fabric = 0
        while y > H_ * 0.6 and (not col[y] or fabric < 12):  # ткань снизу вверх до верхнего блика
            fabric = fabric + 1 if not col[y] else fabric
            y -= 1
        edge[x] = y if y > H_ * 0.6 else H_
    # край обода почти прямой: строим прямую по надёжно найденным столбцам
    xs = np.arange(W_)
    ok = edge < H_
    a, b = np.polyfit(xs[ok], edge[ok], 1)
    resid = np.abs(edge - (a * xs + b))
    ok2 = ok & (resid < 25)
    a, b = np.polyfit(xs[ok2], edge[ok2], 1)
    edge_s = a * xs + b
    mask = np.zeros((H_, W_), dtype=np.uint8)
    for x in range(W_):
        mask[: max(0, int(edge_s[x]) - 3), x] = 255
    return Image.fromarray(mask).filter(ImageFilter.GaussianBlur(2))


def finished(path):
    """4K/2.8K рендер → 1080p + виньетка и зерно (post.finish)."""
    if str(HERE) not in sys.path:
        sys.path.insert(0, str(HERE))
    from post import finish
    out = path.with_name(path.stem + "_fin.png")
    finish(path, out)
    return out


def compose():
    for v in VARIANTS:
        rim_src = {"A": REF / "t{}.png", "B": REF / "t{}_B.png"}[v]
        # 294: проём обода
        r = Image.open(finished(HERE / f"raw_294_{v}.png")).convert("RGB")
        src = Image.open(str(rim_src).format("294")).convert("RGB").resize(r.size)
        Image.composite(r, src, rim_mask_rect(r.size, (95, 43, 1822, 1010), 18)).save(HERE / f"n294_{v}.png")
        # 293: обод внизу кадра
        r = Image.open(finished(HERE / f"raw_293_{v}.png")).convert("RGB")
        src = Image.open(str(rim_src).format("293")).convert("RGB").resize(r.size)
        Image.composite(r, src, rim_mask_293(REF / "t293.png")).save(HERE / f"n293_{v}.png")
        # 295: среднее по кадрам движения
        subs = sorted(p for p in HERE.glob(f"raw_295_{v}_*.png") if not p.stem.endswith("_fin"))
        acc = np.mean([np.asarray(Image.open(p).convert("RGB").resize((1920, 1080), Image.LANCZOS)).astype(np.float32) for p in subs], axis=0)
        blurred = HERE / f"raw_295_{v}_mb.png"
        Image.fromarray(acc.round().astype(np.uint8)).save(blurred)
        Image.open(finished(blurred)).save(HERE / f"n295_{v}.png")


if __name__ == "__main__":
    {"configs": configs, "compose": compose}[sys.argv[1]]()
