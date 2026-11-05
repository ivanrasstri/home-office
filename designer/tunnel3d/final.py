"""Финальные кадры тоннеля 293/294/295 в вариантах A и B (Blender/Cycles + обод из оригинала).

python3 -I final.py configs   -> cfg_<кадр>_<вариант>.json
python3 -I final.py render    -> raw_<кадр>_<вариант>.png (B первым, он стоит в версиях)
python3 -I final.py compose   -> fin_<кадр>_<вариант>.png (шумодав NLM + обод из исходного кадра)

Исходные кадры клиента (t293.png…, t293_B.png… после recolor.py) лежат в TUNNEL_REFS (по умолчанию ./refs).
"""
import json
import os
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE))
import cv2  # noqa: E402
from PIL import Image  # noqa: E402
from rim import rim_mask_293, rim_mask_rect  # noqa: E402

REF = Path(os.environ.get("TUNNEL_REFS", HERE / "refs"))
H = 9.0
BASE = {"width": 1920, "height": 1080, "samples": 128, "samplesNoDenoise": 128, "glare": 0.12,
        "glyphs": str(HERE / "glyphs.json")}
VARIANTS = {"B": {"wall": "#5F0090", "world": "#16062E", "axisI": 9000}, "A": {"wall": "#121922"}}
FRAMES = {
    "294": {"cam": [0, -10.7, 0], "fov": 50.4},
    "293": {"cam": [0.2, -6.5, -H / 2 + 1.3], "target": [0.2, 93.5, -H / 2 + 1.3 + 44.5], "fov": 58, "roll": -0.12},
    # для кадра 295 слова сдвинуты так, чтобы по краям стояли «E» и «O», как в оригинале
    "295": {"cam": [0, 36.5, -0.15], "fov": 50, "leftShift": -15.9, "rightShift": -18.55, "motion": 1.4, "shutter": 1.0},
}
ORDER = [(f, v) for v in ("B", "A") for f in ("294", "293", "295")]


def configs():
    for f, v in ORDER:
        (HERE / f"cfg_{f}_{v}.json").write_text(json.dumps({**BASE, **VARIANTS[v], **FRAMES[f]}))


def render():
    for f, v in ORDER:
        out = HERE / f"raw_{f}_{v}.png"
        if out.exists():
            continue
        subprocess.run(["blender", "-b", "--factory-startup", "-P", str(HERE / "tunnel_scene.py"), "--",
                        str(HERE / f"cfg_{f}_{v}.json"), str(out)], cwd=HERE, check=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("rendered", out.name, flush=True)


def denoised(path):
    img = cv2.imread(str(path))
    out = path.with_name(path.stem + "_dn.png")
    cv2.imwrite(str(out), cv2.fastNlMeansDenoisingColored(img, None, 5, 5, 7, 21))
    return out


def compose():
    for f, v in ORDER:
        raw = HERE / f"raw_{f}_{v}.png"
        if not raw.exists():
            continue
        r = Image.open(denoised(raw)).convert("RGB")
        rim = REF / ({"A": "t{}.png", "B": "t{}_B.png"}[v].format(f))
        if f == "294":
            src = Image.open(rim).convert("RGB").resize(r.size)
            r = Image.composite(r, src, rim_mask_rect(r.size, (95, 43, 1822, 1010), 18))
        elif f == "293":
            src = Image.open(rim).convert("RGB").resize(r.size)
            r = Image.composite(r, src, rim_mask_293(REF / "t293.png"))
        r.save(HERE / f"fin_{f}_{v}.png")
        print("composed", f, v, flush=True)


if __name__ == "__main__":
    {"configs": configs, "render": render, "compose": compose}[sys.argv[1]]()
