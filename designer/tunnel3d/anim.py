"""Аниматик пролёта: камера влетает в сумку и разгоняется по тоннелю (3 с, 25 к/с).

python3 -I anim.py configs A|B   -> anim/cfg_<v>.json (кадры × подкадры для размытия)
python3 -I anim.py compose A|B   -> anim/frames_<v>/f_###.png + tunnel_<v>.mp4 + tunnel_<v>.gif
"""
import json
import os
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, str(Path(__file__).parent))
from frames import COMMON, VARIANTS  # noqa: E402

HERE = Path(__file__).parent
OUT = HERE / "anim"
REF = Path(os.environ.get("TUNNEL_REFS", HERE / "refs"))
FPS, SECONDS, SUB = 25, 3.0, 4
W, H = 1280, 720
Z0, Z1 = 10.7, -30.0
OPEN = (95, 43, 1822, 1010)  # проём обода в 1920×1080
CENTER = ((OPEN[0] + OPEN[2]) / 2 * W / 1920, (OPEN[1] + OPEN[3]) / 2 * H / 1080)


def cam_z(t):
    u = min(max(t / SECONDS, 0.0), 1.0)
    return Z0 + (Z1 - Z0) * u ** 1.7  # медленный старт, разгон


def times():
    n = int(FPS * SECONDS)
    for f in range(n):
        for k in range(SUB):  # затвор 180°: подкадры в первой половине интервала кадра
            yield f, (f + 0.5 * k / SUB) / FPS


def configs(v):
    OUT.mkdir(exist_ok=True)
    base = {**COMMON, **VARIANTS[v], "width": W, "height": H, "mime": "image/jpeg", "fov": 50.4, "pixelRatio": 1.5}
    out = []
    for i, (_, t) in enumerate(times()):
        z = cam_z(t)
        c = {**base, "cam": [0, 0, z], "look": [0, 0, z - 100]}
        if i:
            c["cameraOnly"] = True
        out.append(c)
    (OUT / f"cfg_{v}.json").write_text(json.dumps(out))


def rim_plate(v):
    src = REF / ("t294.png" if v == "A" else "t294_B.png")
    plate = Image.open(src).convert("RGB").resize((W, H))
    mask = Image.new("L", (W, H), 0)
    sx, sy = W / 1920, H / 1080
    box = (OPEN[0] * sx, OPEN[1] * sy, OPEN[2] * sx, OPEN[3] * sy)
    ImageDraw.Draw(mask).rounded_rectangle(box, radius=18 * sx, fill=255)
    return plate, mask.filter(ImageFilter.GaussianBlur(1.2))


def scaled(img, s, resample):
    """Масштаб s вокруг центра проёма, кадр остаётся W×H."""
    nw, nh = int(W * s), int(H * s)
    big = img.resize((nw, nh), resample)
    left, top = int(CENTER[0] * s - CENTER[0]), int(CENTER[1] * s - CENTER[1])
    return big.crop((left, top, left + W, top + H))


def compose(v):
    plate, mask = rim_plate(v)
    frames_dir = OUT / f"frames_{v}"
    frames_dir.mkdir(exist_ok=True)
    raws = sorted(OUT.glob(f"raw_{v}_*.jpg"))
    groups = {}
    for (f, t), path in zip(times(), raws):
        groups.setdefault(f, []).append((t, path))
    for f, items in groups.items():
        acc = np.zeros((H, W, 3), np.float32)
        for t, path in items:
            r = Image.open(path).convert("RGB").resize((W, H), Image.LANCZOS)
            z = cam_z(t)
            if z > 0.35:  # обод ещё перед камерой: увеличиваем его по мере приближения
                s = Z0 / z
                m = scaled(mask, s, Image.BILINEAR)
                inv = Image.eval(m, lambda p: 255 - p)
                rim = scaled(plate, s, Image.BICUBIC)
                r = Image.composite(rim, r, inv)
            acc += np.asarray(r, np.float32)
        Image.fromarray((acc / len(items)).round().astype(np.uint8)).save(frames_dir / f"f_{f:03d}.png")
    mp4 = OUT / f"tunnel_{v}.mp4"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", str(frames_dir / "f_%03d.png"),
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "16", "-movflags", "+faststart", str(mp4)], check=True)
    gif = OUT / f"tunnel_{v}.gif"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(mp4), "-vf",
                    "fps=15,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=sierra2_4a",
                    str(gif)], check=True)
    for p in raws:
        p.unlink()
    print(mp4, gif)


if __name__ == "__main__":
    {"configs": configs, "compose": compose}[sys.argv[1]](sys.argv[2])
