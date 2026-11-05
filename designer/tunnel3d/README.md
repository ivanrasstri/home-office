# Тоннель TEZKOR · 3D (Blender)

Перерендер тоннеля из раскадровки Uzum Tezkor (кадры 293–295). Буквы TEZKOR — объёмные
пластины из глифов **TT Uzum ExtraBold**. Сцена собирается скриптом в Blender, рендер Cycles
под исходные кадры: свет, тонкие пластины с фаской, светящиеся голубые ряды, фиолетовый
торец, обод сумки из оригинала.

**Готовые 3D-исходники для моушна — в `export/`.** Описание файлов, масштаба, камер,
материалов и света — в `export/README_моушн.md`.

- `.blend` — сцена с камерами 293/294/295 и пролётом на 3 с.
- FBX и GLB — та же сцена.
- FBX, OBJ, GLB — набор букв.
- SVG — контуры букв.

## Скрипты

- `glyphs.json` — контуры «TEZKOR» в TT Uzum ExtraBold. Сняты в Figma: текст → Flatten →
  `vectorPaths`, кегль 1000, базовая линия 710.
- `tunnel_scene.py` — собирает сцену по JSON-конфигу и рендерит кадр. С `"noRender": true`
  только собирает:
  `blender -b --factory-startup -P tunnel_scene.py -- cfg.json out.png`
- `export_extras.py` — поверх собранной сцены делает пакет для моушна:
  - коллекции, камеры, анимацию пролёта, набор букв;
  - экспорт `.blend`, FBX, GLB, OBJ, SVG.

  Запуск: `blender -b --factory-startup -P tunnel_scene.py -P export_extras.py -- cfg.json x.png`.
  В конфиге нужны `"noRender": true` и `"exportDir": "export"`.
- `final.py` — кадры раскадровки 293/294/295 в вариантах A и B: `configs` → `render` → `compose`.
  На шаге `compose` шумодав OpenCV NLM и обод сумки из исходного кадра.
- `rim.py` — маски обода.
- `recolor.py` — перекраска исходных рендеров. Нужна для обода варианта B.
- `quick.py` — быстрые тестовые рендеры 480×270.
- `verify_export.py` — проверка `.blend`, FBX и GLB после экспорта.

Варианты стен:
- **A** — тёмные #121922;
- **B** — фиолетовые, в кадре ≈ #7000FF.

Голубой везде фирменный #00C2FF.

## Запуск

Blender ставится из репозитория Ubuntu, к нему нужен numpy для экспорта FBX. Для `final.py` нужен opencv.

```bash
sudo apt-get install -y blender python3-numpy
```

```bash
pip install opencv-python-headless
```

Исходные кадры 293–295 положить в `refs/` как t293.png, t294.png, t295.png, затем сделать варианты для обода B:

```bash
for n in 293 294 295; do python3 -I recolor.py refs/t$n.png refs/t${n}_A.png refs/t${n}_B.png; done
```

```bash
python3 -I final.py configs && python3 -I final.py render && python3 -I final.py compose
```

В сборке Blender из Ubuntu нет шумодава OIDN, поэтому кадр 1080p со 128 сэмплами считается
около 10–15 минут на 4 ядрах. С официальной сборкой blender.org (там OIDN есть) — в разы быстрее.
