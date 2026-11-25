// Загрузка текстур, моделей и HDRI; фабрика PBR-материалов и патчи шейдеров.
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export const BASE = (window.TRENCH_ASSET_BASE || 'assets/');
export const TEX = {};      // имя -> { d, n, arm }
export const MODELS = {};   // имя -> gltf
export const ENV = { hdr: null, pmrem: null };

const TEXSETS = ['mud', 'earth', 'scorched', 'planks', 'boards', 'iron', 'hessian', 'wool', 'leather', 'helmet', 'rust', 'bark'];
const MODELSET = ['rifle', 'gasmask', 'crate_mil', 'ammo_box', 'lantern', 'spade', 'dead_tree', 'log', 'stump', 'barrel', 'bucket', 'can', 'root', 'rock', 'rat', 'stove', 'crate', 'branches', 'grenade', 'soldier', 'xbot'];

// Бинарные файлы: обычный fetch, а в сборке для артефакта — base64-текст рядом (хостинг не отдаёт .glb/.hdr)
async function fetchBinary(url) {
  if (!window.TRENCH_B64) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(`${r.status} ${url}`);
    return r.arrayBuffer();
  }
  const r = await fetch(url + '.txt');
  if (!r.ok) throw new Error(`${r.status} ${url}.txt`);
  const bin = atob((await r.text()).trim());
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8.buffer;
}

export async function loadAll(renderer, onProgress) {
  const total = TEXSETS.length * 3 + MODELSET.length + 1;
  let done = 0;
  const tick = (what) => { done++; onProgress && onProgress(done / total, what); };
  const aniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const tl = new THREE.TextureLoader();
  const gl = new GLTFLoader();
  // текстуры внутри .glb грузим через <img>, а не fetch(blob:) — так работает и в песочнице артефакта
  gl.register((parser) => { parser.textureLoader = new THREE.TextureLoader(parser.options.manager); return { name: 'TRENCH_img_textures' }; });
  const load = (url) => new Promise((res, rej) => tl.load(url, res, undefined, rej));
  const jobs = [];
  for (const name of TEXSETS) {
    TEX[name] = {};
    for (const k of ['d', 'n', 'arm']) {
      jobs.push(load(`${BASE}tex/${name}_${k}.webp`).then((t) => {
        t.wrapS = t.wrapT = THREE.RepeatWrapping;
        t.anisotropy = aniso;
        t.colorSpace = k === 'd' ? THREE.SRGBColorSpace : THREE.NoColorSpace;
        TEX[name][k] = t; tick(name);
      }));
    }
  }
  for (const name of MODELSET) {
    jobs.push(fetchBinary(`${BASE}models/${name}.glb`)
      .then((buf) => new Promise((res, rej) => gl.parse(buf, `${BASE}models/`, res, rej)))
      .then((g) => {
        g.scene.traverse((o) => { if (o.isMesh && o.material) { o.material.envMapIntensity = 0.6; if (o.material.map) o.material.map.anisotropy = aniso; } });
        MODELS[name] = g; tick(name);
      }));
  }
  jobs.push(fetchBinary(`${BASE}hdri/night.hdr`).then((buf) => {
    const d = new RGBELoader().parse(buf);
    const t = new THREE.DataTexture(d.data, d.width, d.height, THREE.RGBAFormat, d.type);
    t.colorSpace = THREE.LinearSRGBColorSpace; t.minFilter = t.magFilter = THREE.LinearFilter; t.generateMipmaps = false; t.flipY = true; t.needsUpdate = true;
    t.mapping = THREE.EquirectangularReflectionMapping;
    ENV.hdr = t;
    const pm = new THREE.PMREMGenerator(renderer);
    ENV.pmrem = pm.fromEquirectangular(t).texture;
    pm.dispose(); tick('hdri');
  }));
  await Promise.all(jobs);
}

// ------------------------------------------------------------ патчи шейдеров
// Несколько независимых правок шейдера на одном материале.
export function addPatch(mat, key, fn) {
  mat.userData.patches = mat.userData.patches || [];
  mat.userData.patches.push([key, fn]);
  mat.onBeforeCompile = (shader, r) => { for (const [, f] of mat.userData.patches) f(shader, r); };
  mat.customProgramCacheKey = () => mat.userData.patches.map((p) => p[0]).join('|');
  mat.needsUpdate = true;
  return mat;
}
// Сдвиг UV на экземпляр (атрибут instUv) — чтобы доски и мешки не повторялись.
export function patchInstUv(mat) {
  return addPatch(mat, 'instuv', (s) => {
    s.vertexShader = s.vertexShader
      .replace('#include <uv_pars_vertex>', '#include <uv_pars_vertex>\nattribute vec2 instUv;')
      .replace('#include <uv_vertex>', '#define uv (uv + instUv)\n#include <uv_vertex>\n#undef uv');
  });
}
// Модель оружия рисуется в основной сцене, но всегда поверх стен: сжимаем её глубину к ближней плоскости.
export function patchViewmodel(mat) {
  return addPatch(mat, 'vm', (s) => {
    s.vertexShader = s.vertexShader.replace('#include <project_vertex>',
      '#include <project_vertex>\ngl_Position.z = -gl_Position.w + (gl_Position.z + gl_Position.w) * 0.04;');
  });
}
// Мокрость: темнее и глаже снизу (капли, грязь), параметры через uniforms не нужны.
export function patchWet(mat, amount = 0.6, height = 0.6) {
  return addPatch(mat, 'wet' + amount + height, (s) => {
    s.vertexShader = s.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPosW;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvWPosW = (modelMatrix * vec4(transformed, 1.0)).xyz;\n#ifdef USE_INSTANCING\nvWPosW = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;\n#endif');
    s.fragmentShader = s.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPosW;')
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
        float wetK = ${amount.toFixed(3)} * (1.0 - smoothstep(0.0, ${height.toFixed(3)}, vWPosW.y)) + ${(amount * 0.35).toFixed(3)};
        roughnessFactor = mix(roughnessFactor, 0.12, wetK * 0.8);
        diffuseColor.rgb *= 1.0 - wetK * 0.45;`);
  });
}

// ------------------------------------------------------------ PBR-материал из набора текстур
const texClones = new Map();
function repTex(t, rx, ry) {
  if (rx === 1 && ry === 1) return t;
  const key = t.uuid + rx + ',' + ry;
  if (!texClones.has(key)) { const c = t.clone(); c.repeat.set(rx, ry); c.needsUpdate = true; texClones.set(key, c); }
  return texClones.get(key);
}
export function pbr(name, o = {}) {
  const T = TEX[name];
  const rx = o.repeat ? o.repeat[0] : 1, ry = o.repeat ? o.repeat[1] : 1;
  const m = new THREE.MeshStandardMaterial({
    map: repTex(T.d, rx, ry),
    normalMap: o.noNormal ? null : repTex(T.n, rx, ry),
    roughnessMap: repTex(T.arm, rx, ry),
    aoMap: repTex(T.arm, rx, ry),
    metalnessMap: o.metal ? repTex(T.arm, rx, ry) : null,
    metalness: o.metal ? 1 : 0,
    roughness: o.roughness ?? 1,
    color: o.color !== undefined ? new THREE.Color(o.color) : new THREE.Color(1, 1, 1),
    envMapIntensity: o.env ?? 0.5,
    side: o.side ?? THREE.FrontSide,
  });
  if (o.normalScale) m.normalScale.set(o.normalScale, o.normalScale);
  m.aoMapIntensity = o.ao ?? 1;
  return m;
}

// Клон glTF-сцены с отдельными материалами (для патчей) и тенями.
export function cloneModel(name, { cast = true, receive = true, patch } = {}) {
  const src = MODELS[name].scene;
  const o = src.clone(true);
  o.traverse((c) => {
    if (c.isMesh) {
      c.castShadow = cast; c.receiveShadow = receive;
      if (patch) { c.material = c.material.clone(); patch(c.material, c); }
    }
  });
  return o;
}
// Геометрия и материалы модели как плоский список (для InstancedMesh).
export function modelParts(name) {
  const parts = [];
  const root = MODELS[name].scene;
  root.updateMatrixWorld(true);
  root.traverse((c) => {
    if (c.isMesh) {
      const g = c.geometry.clone();
      g.applyMatrix4(c.matrixWorld);
      parts.push({ geometry: g, material: c.material });
    }
  });
  return parts;
}
