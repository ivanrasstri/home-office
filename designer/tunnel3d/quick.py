"""Быстрые тестовые рендеры 480×270 (24 сэмпла): quick.py name '{json overrides}' ...

Каждый аргумент: имя=JSON. Рендерит последовательно, складывает лист quick_sheet.png.
"""
import json
import subprocess
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).parent
BASE = {"width": 480, "height": 270, "samples": 24, "samplesNoDenoise": 24, "glare": 0}
outs = []
for arg in sys.argv[1:]:
    name, js = arg.split("=", 1)
    cfg = {**BASE, **json.loads(js)}
    p = HERE / f"q_{name}.json"
    p.write_text(json.dumps(cfg))
    png = HERE / f"q_{name}.png"
    subprocess.run(["blender", "-b", "--factory-startup", "-P", str(HERE / "tunnel_scene.py"), "--", str(p), str(png)],
                   cwd=HERE, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    outs.append(png)
cols = 2
rows = (len(outs) + 1) // 2
sheet = Image.new("RGB", (480 * cols, 270 * rows))
for i, p in enumerate(outs):
    sheet.paste(Image.open(p).convert("RGB"), ((i % cols) * 480, (i // cols) * 270))
sheet.save(HERE / "quick_sheet.png")
print("ok", [p.name for p in outs])
