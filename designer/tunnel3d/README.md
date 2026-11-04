# Тоннель TEZKOR · 3D-рендер

Перерендер тоннеля из раскадровки Uzum Tezkor (кадры 293–295). Сцена собрана заново
в three.js: буквы TEZKOR — объёмные, из глифов **TT Uzum ExtraBold**, цвета фирменные.
Рендер идёт в headless Chromium, без 3D-пакетов.

- `glyphs.json` — контуры «TEZKOR» в TT Uzum ExtraBold. Сняты в Figma: текст → Flatten →
  `vectorPaths`, кегль 1000, базовая линия 710.
- `scene.html` — сцена:
  - стены из слов TEZKOR, на полу и потолке ряды «TEZ», в конце светящийся торец;
  - физические материалы, свет из глубины, GTAO, мягкое свечение, тонмаппинг Neutral;
  - параметры кадра передаются в `window.renderFrame(cfg)`.
- `render.js` — рендер списка конфигов в PNG или JPEG:
  `node render.js cfg.json out.png` (сцену можно подменить через `SCENE=...`).
- `frames.py` — кадры 293/294/295 в вариантах A и B:
  - `configs` пишет конфиги;
  - `compose` собирает итог: сжатие 4K → 1080p, виньетка, зерно, обод сумки из исходного
    кадра и размытие движения в 295 (среднее по подкадрам).
- `anim.py` — аниматик пролёта (3 с, 25 к/с): MP4 и GIF.
- `post.py` — финиш кадра.
- `recolor.py` — перекраска исходных рендеров. Нужна, чтобы получить обод для варианта B.

Варианты:
- **A** — тёмные стены, голубой #00C2FF;
- **B** — стены и обод #7000FF, голубой #00C2FF.

## Запуск

```bash
cd designer/tunnel3d && npm install
```

```bash
mkdir -p refs   # сюда положить исходные кадры 293–295 как t293.png, t294.png, t295.png
```

```bash
for n in 293 294 295; do python3 -I recolor.py refs/t$n.png refs/t${n}_A.png refs/t${n}_B.png; done
```

```bash
python3 -I frames.py configs && for f in 293 294 295; do for v in A B; do node render.js cfg_${f}_${v}.json raw_${f}_${v}.png; done; done && python3 -I frames.py compose
```

```bash
for v in A B; do python3 -I anim.py configs $v && node render.js anim/cfg_$v.json anim/raw_$v.jpg && python3 -I anim.py compose $v; done
```

Исходные кадры клиента и результаты рендера в репозиторий не коммитятся (`refs/`, `raw_*`,
`n29*`, `anim/` в `.gitignore`).
