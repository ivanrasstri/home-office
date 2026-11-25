// Скачивает CC0-ассеты с Poly Haven и готовит их для браузера:
//   текстуры -> webp (albedo, normal, arm), модели -> .glb с webp-текстурами и упрощённой сеткой.
// Запуск: npm run assets   (результат уже лежит в assets/, запускать нужно только для пересборки)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, weld, simplify, textureCompress, flatten, join } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(ROOT, 'tools', '.cache');
const OUT = path.join(ROOT, 'assets');
const UA = { 'User-Agent': 'asset-fetch/1.0' };

// Текстуры: id Poly Haven -> [имя, разрешение, опции]
const TEXTURES = [
  ['brown_mud_03', 'mud', '2k'],               // дно окопа: мокрая жижа
  ['brown_mud_02', 'earth', '2k'],             // земляные стенки
  ['burned_ground_01', 'scorched', '2k'],      // ничейная земля
  ['weathered_planks', 'planks', '2k'],        // обшивка стен
  ['old_planks_02', 'boards', '1k'],           // настил
  ['rusty_corrugated_iron', 'iron', '1k'],     // рифлёное железо
  ['hessian_380', 'hessian', '1k'],            // мешки с песком, рясы
  ['caban', 'wool', '1k', { grey: true }],     // шинели (перекрашиваются в шейдере)
  ['brown_leather', 'leather', '1k'],          // ремни, кожа гулей
  ['green_metal_rust', 'helmet', '1k'],        // каски
  ['rusty_metal_02', 'rust', '1k'],            // колья, проволока
  ['bark_brown_02', 'bark', '1k'],             // столбы
];

// Модели: id -> [имя, цель по треугольникам (0 = не упрощать), размер текстур]
const MODELS = [
  ['bolt_action_rifle_7_62', 'rifle', 0, 2048],
  ['old_gas_mask', 'gasmask', 9000, 1024],
  ['wooden_military_crate', 'crate_mil', 6000, 1024],
  ['ammo_box', 'ammo_box', 0, 512],
  ['Lantern_01', 'lantern', 8000, 512],
  ['rusted_spade_01', 'spade', 4000, 512],
  ['dead_tree_trunk_02', 'dead_tree', 14000, 1024],
  ['dead_tree_trunk', 'log', 8000, 1024],
  ['tree_stump_01', 'stump', 8000, 1024],
  ['wooden_ladder_02', 'ladder', 0, 1024],
  ['Barrel_01', 'barrel', 0, 512],
  ['wooden_bucket_01', 'bucket', 3000, 512],
  ['can_rusted', 'can', 1500, 256],
  ['single_root', 'root', 4000, 512],
  ['rock_07', 'rock', 2000, 512],
  ['street_rat', 'rat', 4000, 512],
  ['barrel_stove', 'stove', 6000, 512],
  ['wooden_crate_01', 'crate', 0, 512],
  ['dry_branches_medium_01', 'branches', 5000, 512],
  ['stick_grenade', 'grenade', 3000, 512],
];

const HDRI = ['rogland_moonlit_night', 'night', '1k'];

async function getJSON(url) {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
}
async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return dest;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const r = await fetch(url, { headers: UA });
      if (!r.ok) throw new Error(`${r.status} ${url}`);
      fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
      return dest;
    } catch (e) {
      if (attempt === 4) throw e;
      await new Promise((res) => setTimeout(res, 1000 * 2 ** attempt));
    }
  }
}

async function doTexture([id, name, res, opt = {}]) {
  const files = await getJSON(`https://api.polyhaven.com/files/${id}`);
  const pick = (key) => files[key]?.[res]?.jpg?.url;
  const maps = { d: pick('Diffuse'), n: pick('nor_gl'), arm: pick('arm') };
  for (const [k, url] of Object.entries(maps)) {
    if (!url) { console.warn(`  нет карты ${k} у ${id}`); continue; }
    const src = await download(url, path.join(CACHE, 'tex', `${id}_${k}_${res}.jpg`));
    const dest = path.join(OUT, 'tex', `${name}_${k}.webp`);
    let img = sharp(src);
    if (k === 'd' && opt.grey) img = img.greyscale().toColourspace('srgb');
    await img.webp({ quality: k === 'n' ? 90 : 82, effort: 5 }).toFile(dest);
  }
  console.log(`текстура ${name} <- ${id} (${res})`);
}

async function doModel([id, name, targetTris, texSize]) {
  const files = await getJSON(`https://api.polyhaven.com/files/${id}`);
  const res = texSize >= 2048 ? '2k' : '1k';
  const g = files.gltf?.[res]?.gltf || files.gltf?.['1k']?.gltf;
  const dir = path.join(CACHE, 'models', id);
  const main = await download(g.url, path.join(dir, path.basename(new URL(g.url).pathname)));
  for (const [rel, f] of Object.entries(g.include || {})) await download(f.url, path.join(dir, rel));
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.simplifier': MeshoptSimplifier });
  const doc = await io.read(main);
  const before = countTris(doc);
  const steps = [dedup(), flatten(), join(), weld()];
  if (targetTris && before > targetTris) {
    await MeshoptSimplifier.ready;
    steps.push(simplify({ simplifier: MeshoptSimplifier, ratio: targetTris / before, error: 0.01, lockBorder: false }));
  }
  steps.push(prune(), textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [texSize, texSize], quality: 85 }));
  await doc.transform(...steps);
  const dest = path.join(OUT, 'models', `${name}.glb`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await io.write(dest, doc);
  console.log(`модель ${name} <- ${id}: ${before} -> ${countTris(doc)} треуг., ${(fs.statSync(dest).size / 1e6).toFixed(2)} МБ`);
}
function countTris(doc) {
  let n = 0;
  for (const mesh of doc.getRoot().listMeshes()) for (const p of mesh.listPrimitives()) {
    const idx = p.getIndices();
    n += idx ? idx.getCount() / 3 : p.getAttribute('POSITION').getCount() / 3;
  }
  return Math.round(n);
}

async function doHdri([id, name, res]) {
  const files = await getJSON(`https://api.polyhaven.com/files/${id}`);
  const url = files.hdri[res].hdr.url;
  const dest = path.join(OUT, 'hdri', `${name}.hdr`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(await download(url, path.join(CACHE, 'hdri', `${id}_${res}.hdr`)), dest);
  console.log(`hdri ${name} <- ${id}`);
}

async function pool(items, n, fn) {
  const queue = [...items];
  await Promise.all(Array.from({ length: n }, async () => { while (queue.length) await fn(queue.shift()); }));
}

fs.mkdirSync(path.join(OUT, 'tex'), { recursive: true });
const only = process.argv[2];
if (!only || only === 'tex') await pool(TEXTURES, 4, doTexture);
if (!only || only === 'models') await pool(MODELS, 3, doModel);
if (!only || only === 'hdri') await doHdri(HDRI);
fs.writeFileSync(path.join(OUT, 'CREDITS.txt'),
  'Все текстуры, модели и HDRI: Poly Haven (polyhaven.com), лицензия CC0.\n\n' +
  TEXTURES.map((t) => `${t[1]}: ${t[0]}`).join('\n') + '\n' + MODELS.map((m) => `${m[1]}: ${m[0]}`).join('\n') + `\n${HDRI[1]}: ${HDRI[0]}\n`);
console.log('готово');
