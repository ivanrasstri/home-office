// Схема траншей на сетке, поле расстояний, карта высот, лучи, столкновения, поиск пути.
import { CELL, GW, GH, WALL_H } from './config.js';
import { clamp, lerp, mulberry32, makeNoise, smoothstep } from './util.js';

export const grid = new Uint8Array(GW * GH);          // 1 = земля, 0 = траншея
export const idx = (x, z) => z * GW + x;
export const solid = (x, z) => x < 0 || z < 0 || x >= GW || z >= GH || grid[idx(x, z)] === 1;
export const cellOf = (w) => Math.floor(w / CELL);
export const cellCenter = (c) => (c + 0.5) * CELL;
export const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
// Тип облицовки на каждой грани открытой клетки: 0 нет стены, 1 земля, 2 доски, 3 железо, 4 мешки
export const edgeType = new Uint8Array(GW * GH * 4);
export const map = { rooms: [], bays: [], saps: [], dugouts: [], spawn: [22, 14], craters: [], lines: {}, seed: 1 };
let noise = makeNoise(1);

// ------------------------------------------------------------ генерация схемы
export function generate(seed) {
  map.seed = seed;
  noise = makeNoise(seed);
  const R = mulberry32(seed);
  grid.fill(1);
  const open = (x, z) => { if (x > 0 && z > 0 && x < GW - 1 && z < GH - 1) grid[idx(x, z)] = 0; };
  const zF = 6, zS = 14, zR = 22;
  map.lines = { zF, zS, zR };
  map.bays = []; map.rooms = []; map.saps = []; map.dugouts = [];

  // Передняя линия: огневые ячейки и траверсы («зубцы»)
  for (let a = 3; a <= GW - 8; a += 6) {
    for (let x = a; x <= a + 3; x++) open(x, zF);
    map.bays.push({ x0: a, x1: a + 3, z: zF });
    for (let x = a + 3; x <= a + 6; x++) open(x, zF + 1);
    open(a + 6, zF);
  }
  // Линия поддержки: пологий зигзаг
  let zz = zS;
  for (let x = 3; x <= GW - 4; x++) {
    open(x, zz);
    if ((x - 3) % 5 === 4 && x < GW - 4) { const nz = zz === zS ? zS + 1 : zS; open(x, nz); zz = nz; }
  }
  // Резервная линия с изломами
  zz = zR;
  for (let x = 4; x <= GW - 5; x++) {
    open(x, zz);
    if (R() < 0.12 && x < GW - 6) { const nz = clamp(zz + (R() < 0.5 ? -1 : 1), zR - 1, zR + 1); open(x, nz); zz = nz; }
  }
  // Ходы сообщения: зигзагом от передней линии к резервной
  const commX = [6, 15, 24, 33, 40].map((x) => clamp(x + Math.floor(R() * 3) - 1, 4, GW - 5));
  for (const cx0 of commX) {
    let x = cx0;
    for (let z = zF + 1; z <= zR; z++) {
      open(x, z);
      if ((z - zF) % 3 === 0 && z < zR - 1) { const nx = clamp(x + (R() < 0.5 ? -1 : 1), 3, GW - 4); open(nx, z); x = nx; }
    }
  }
  // Сапы вперёд, к постам подслушивания
  const sapCount = 3;
  for (let i = 0; i < sapCount; i++) {
    const bay = map.bays[1 + Math.floor(R() * (map.bays.length - 2))];
    const x = bay.x0 + 1 + Math.floor(R() * 2);
    for (let z = zF - 1; z >= 3; z--) open(x, z);
    open(x + 1, 2); open(x, 2); open(x + 1, 3);
    map.saps.push({ x, z: 2 });
  }
  // Блиндажи за линиями поддержки и резерва
  const rooms = [];
  const tryRoom = (x, z, w, h) => {
    for (let dz = 0; dz < h; dz++) for (let dx = 0; dx < w; dx++) if (x + dx <= 0 || z + dz <= 0 || x + dx >= GW - 1 || z + dz >= GH - 1) return false;
    for (let dz = 0; dz < h; dz++) for (let dx = 0; dx < w; dx++) open(x + dx, z + dz);
    rooms.push({ x, z, w, h, cx: (x + w / 2) * CELL, cz: (z + h / 2) * CELL });
    return true;
  };
  for (let i = 0; i < 4; i++) tryRoom(5 + i * 9 + Math.floor(R() * 3), zS + 2, 2, 2);
  for (let i = 0; i < 3; i++) tryRoom(8 + i * 12 + Math.floor(R() * 3), zR + 1, 2 + (i === 1 ? 1 : 0), 2);
  map.rooms = rooms;
  // Старый обвалившийся отрезок между линиями
  for (let x = 10; x <= 18; x++) open(x, 10);
  for (let z = 10; z <= 11; z++) open(18, z);

  // Связность: оставляем только то, что достижимо от точки старта
  map.spawn = [Math.floor(GW / 2), zS];
  while (solid(map.spawn[0], map.spawn[1])) map.spawn[0]++;
  computeFlow(cellCenter(map.spawn[0]), cellCenter(map.spawn[1]));
  for (let i = 0; i < GW * GH; i++) if (grid[i] === 0 && flow[i] < 0) grid[i] = 1;

  // Облицовка стенок: длинные участки одного типа
  edgeType.fill(0);
  const sectionType = (x, z) => {
    const n = noise.noise2(x * 0.21 + 3.1, z * 0.21 - 1.7);
    if (n > 0.28) return 4;            // мешки
    if (n > -0.05) return 2;           // доски
    if (n > -0.35) return 3;           // рифлёное железо
    return 1;                          // голая земля
  };
  for (let z = 0; z < GH; z++) for (let x = 0; x < GW; x++) {
    if (solid(x, z)) continue;
    for (let d = 0; d < 4; d++) {
      const [dx, dz] = DIRS[d];
      if (!solid(x + dx, z + dz)) continue;
      let t = sectionType(x, z);
      if (R() < 0.08) t = 1;           // обвалы и прорехи
      edgeType[idx(x, z) * 4 + d] = t;
    }
  }

  // Воронки на ничейной земле и между линиями
  map.craters = [];
  const W = GW * CELL, H = GH * CELL;
  buildDistanceField();
  for (let i = 0; i < 260 && map.craters.length < 110; i++) {
    const x = lerp(-60, W + 60, R()), z = lerp(-60, H + 40, R());
    const r = lerp(1.0, 3.6, Math.pow(R(), 1.6));
    if (sdfAt(x, z) < r + 1.4) continue;
    if (map.craters.some((c) => Math.hypot(c.x - x, c.z - z) < (c.r + r) * 0.8)) continue;
    const front = z < map.lines.zF * CELL ? 1 : 0.45;       // ничейная земля изрыта сильнее
    if (R() > front) continue;
    map.craters.push({ x, z, r, d: r * lerp(0.28, 0.42, R()) });
  }
  buildCraterHash();
  return map;
}

// ------------------------------------------------------------ поле расстояний (EDT)
const RES = 0.1;
const SW = Math.round(GW * CELL / RES), SH = Math.round(GH * CELL / RES);
const sd = new Float32Array(SW * SH);
function edt1d(f, n, d, v, z) {
  let k = 0; v[0] = 0; z[0] = -1e20; z[1] = 1e20;
  for (let q = 1; q < n; q++) {
    let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
    k++; v[k] = q; z[k] = s; z[k + 1] = 1e20;
  }
  k = 0;
  for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) * (q - v[k]) + f[v[k]]; }
}
function edt2d(f) {
  const n = Math.max(SW, SH);
  const col = new Float64Array(n), d = new Float64Array(n), v = new Int32Array(n), z = new Float64Array(n + 1);
  for (let x = 0; x < SW; x++) {
    for (let y = 0; y < SH; y++) col[y] = f[y * SW + x];
    edt1d(col, SH, d, v, z);
    for (let y = 0; y < SH; y++) f[y * SW + x] = d[y];
  }
  for (let y = 0; y < SH; y++) {
    for (let x = 0; x < SW; x++) col[x] = f[y * SW + x];
    edt1d(col, SW, d, v, z);
    for (let x = 0; x < SW; x++) f[y * SW + x] = d[x];
  }
}
function buildDistanceField() {
  const toOpen = new Float64Array(SW * SH), toSolid = new Float64Array(SW * SH);
  for (let y = 0; y < SH; y++) for (let x = 0; x < SW; x++) {
    const o = !solid(Math.floor(x * RES / CELL), Math.floor(y * RES / CELL));
    toOpen[y * SW + x] = o ? 0 : 1e20;
    toSolid[y * SW + x] = o ? 1e20 : 0;
  }
  edt2d(toOpen); edt2d(toSolid);
  for (let i = 0; i < SW * SH; i++) {
    const a = Math.sqrt(toOpen[i]), b = Math.sqrt(toSolid[i]);
    sd[i] = (a > 0 ? a - 0.5 : -(b - 0.5)) * RES;
  }
}
// знаковое расстояние до края траншеи: < 0 внутри окопа
export function sdfAt(x, z) {
  const fx = x / RES - 0.5, fz = z / RES - 0.5;
  const cx = clamp(fx, 0, SW - 1.001), cz = clamp(fz, 0, SH - 1.001);
  const x0 = Math.floor(cx), z0 = Math.floor(cz), tx = cx - x0, tz = cz - z0;
  const i = z0 * SW + x0;
  const v = lerp(lerp(sd[i], sd[i + 1], tx), lerp(sd[i + SW], sd[i + SW + 1], tx), tz);
  const out = Math.hypot(Math.max(0, Math.abs(fx - cx)), Math.max(0, Math.abs(fz - cz))) * RES;
  return v + out;
}

// ------------------------------------------------------------ воронки
let craterHash = new Map();
const CH = 10;
function buildCraterHash() {
  craterHash = new Map();
  for (const c of map.craters) {
    const r = c.r * 1.6;
    for (let gx = Math.floor((c.x - r) / CH); gx <= Math.floor((c.x + r) / CH); gx++)
      for (let gz = Math.floor((c.z - r) / CH); gz <= Math.floor((c.z + r) / CH); gz++) {
        const k = gx * 1000 + gz;
        if (!craterHash.has(k)) craterHash.set(k, []);
        craterHash.get(k).push(c);
      }
  }
}
function craterOffset(x, z) {
  const list = craterHash.get(Math.floor(x / CH) * 1000 + Math.floor(z / CH));
  if (!list) return 0;
  let h = 0;
  for (const c of list) {
    const r = Math.hypot(x - c.x, z - c.z) / c.r;
    if (r > 1.6) continue;
    if (r < 1) h -= c.d * Math.pow(1 - r * r, 1.3);
    h += c.d * 0.32 * Math.exp(-(((r - 1) / 0.28) ** 2));
  }
  return h;
}

// ------------------------------------------------------------ карта высот
const WALL_RUN = 0.38;
function floorH(x, z, dd) {
  let h = -0.035 + noise.noise2(x * 0.55, z * 0.55) * 0.03 + noise.noise2(x * 2.1 + 5, z * 2.1) * 0.012;
  h -= Math.min(0.045, -dd * 0.05);  // дренажная канавка посередине
  return h;
}
export function topH(x, z, d) {
  let h = WALL_H;
  h += 0.42 * Math.exp(-(((d - 1.25) / 0.8) ** 2)) * (0.65 + 0.35 * noise.noise2(x * 0.4, z * 0.4));   // бруствер
  h += noise.fbm(x * 0.045, z * 0.045, 3) * 0.9 * smoothstep(2, 10, d);
  h += noise.fbm(x * 0.35 + 11, z * 0.35, 3) * 0.16 + noise.noise2(x * 2.2, z * 2.2) * 0.035;
  h += craterOffset(x, z) * smoothstep(0.6, 2.0, d);
  return h;
}
export function heightAt(x, z) {
  const d = sdfAt(x, z);
  const n1 = noise.noise2(x * 0.85, z * 0.85) * 0.5 + 0.5;
  const n2 = noise.noise2(x * 3.3 + 7, z * 3.3) * 0.5 + 0.5;
  const dd = d - (0.03 + n1 * 0.12 + n2 * 0.04);   // неровный край отодвигаем в землю
  if (dd <= 0) return floorH(x, z, dd);
  const run = WALL_RUN * (0.75 + 0.55 * n2);
  const top = topH(x, z, d);
  if (dd >= run) return top;
  const t = dd / run;
  const s = 0.5 - 0.5 * Math.cos(Math.PI * t);
  return lerp(floorH(x, z, 0), top, s) + noise.noise2(x * 5.5, z * 5.5 + 13) * 0.035 * Math.sin(Math.PI * t);
}
export function normalAt(x, z, out) {
  const e = 0.05;
  const hx = heightAt(x + e, z) - heightAt(x - e, z), hz = heightAt(x, z + e) - heightAt(x, z - e);
  const l = Math.hypot(hx, 2 * e, hz);
  out.x = -hx / l; out.y = 2 * e / l; out.z = -hz / l;
  return out;
}

// ------------------------------------------------------------ лучи
// Возвращает первое пересечение луча с окопом: стенка (облицовка или земля), дно или бруствер.
export function rayTerrain(ox, oy, oz, dx, dy, dz, maxT) {
  let cx = cellOf(ox), cz = cellOf(oz);
  const sx = dx > 0 ? 1 : -1, sz = dz > 0 ? 1 : -1;
  const adx = Math.abs(dx), adz = Math.abs(dz);
  const tdx = adx < 1e-9 ? Infinity : CELL / adx, tdz = adz < 1e-9 ? Infinity : CELL / adz;
  let tmx = adx < 1e-9 ? Infinity : (dx > 0 ? (cx + 1) * CELL - ox : ox - cx * CELL) / adx;
  let tmz = adz < 1e-9 ? Infinity : (dz > 0 ? (cz + 1) * CELL - oz : oz - cz * CELL) / adz;
  let tPrev = 0;
  const refine = (t0, t1) => {          // марш по карте высот на отрезке
    const step = 0.03;
    for (let t = Math.max(0, t0); t <= t1; t += step) {
      const x = ox + dx * t, y = oy + dy * t, z = oz + dz * t;
      if (y < heightAt(x, z)) {
        let a = t - step, b = t;
        for (let k = 0; k < 6; k++) { const m = (a + b) / 2; if (oy + dy * m < heightAt(ox + dx * m, oz + dz * m)) b = m; else a = m; }
        return b;
      }
    }
    return -1;
  };
  for (let i = 0; i < 200; i++) {
    let t, d;
    if (tmx < tmz) { t = tmx; tmx += tdx; d = sx > 0 ? 0 : 1; } else { t = tmz; tmz += tdz; d = sz > 0 ? 2 : 3; }
    // дно на пройденном отрезке
    if (dy < 0) {
      const tf = (oy - 0.0) / -dy;
      if (tf < Math.min(t, maxT) + 0.3 && tf > tPrev - 0.3) {
        const r = refine(tf - 0.35, Math.min(t, maxT) + 0.05);
        if (r > 0) return { t: r, hit: true, kind: 'floor' };
      }
    }
    if (t > maxT) break;
    const ncx = cx + DIRS[d][0], ncz = cz + DIRS[d][1];
    const y = oy + dy * t;
    if (!solid(cx, cz) && solid(ncx, ncz) && y < WALL_H + 0.6) {
      const type = edgeType[idx(clamp(cx, 0, GW - 1), clamp(cz, 0, GH - 1)) * 4 + d];
      const panelTop = type === 4 ? 1.9 : 2.4;
      if (type >= 2 && y > 0 && y < panelTop) return { t, hit: true, kind: 'wall', mat: type, nx: -DIRS[d][0], nz: -DIRS[d][1] };
      const r = refine(t - 0.05, t + 1.4);
      if (r > 0) return { t: r, hit: true, kind: 'wall', mat: 1, nx: -DIRS[d][0], nz: -DIRS[d][1] };
    }
    if (cx < -3 || cz < -3 || cx > GW + 2 || cz > GH + 2) break;
    cx = ncx; cz = ncz; tPrev = t;
  }
  return { t: maxT, hit: false };
}
export function los(ax, az, bx, bz, h = 1.4) {
  const dx = bx - ax, dz = bz - az, d = Math.hypot(dx, dz);
  if (d < 0.01) return true;
  let cx = cellOf(ax), cz = cellOf(az);
  const ux = dx / d, uz = dz / d;
  const sx = ux > 0 ? 1 : -1, sz = uz > 0 ? 1 : -1;
  const tdx = Math.abs(ux) < 1e-9 ? Infinity : CELL / Math.abs(ux), tdz = Math.abs(uz) < 1e-9 ? Infinity : CELL / Math.abs(uz);
  let tmx = Math.abs(ux) < 1e-9 ? Infinity : (ux > 0 ? (cx + 1) * CELL - ax : ax - cx * CELL) / Math.abs(ux);
  let tmz = Math.abs(uz) < 1e-9 ? Infinity : (uz > 0 ? (cz + 1) * CELL - az : az - cz * CELL) / Math.abs(uz);
  for (let i = 0; i < 200; i++) {
    let t;
    if (tmx < tmz) { t = tmx; tmx += tdx; cx += sx; } else { t = tmz; tmz += tdz; cz += sz; }
    if (t >= d) return true;
    if (solid(cx, cz)) return false;
  }
  return true;
}

// ------------------------------------------------------------ столкновения
export function collide(p, r) {
  for (let it = 0; it < 2; it++) {
    const cx = cellOf(p.x), cz = cellOf(p.z);
    for (let dz = -1; dz <= 1; dz++) for (let dx = -1; dx <= 1; dx++) {
      const x = cx + dx, z = cz + dz;
      if (!solid(x, z)) continue;
      const minX = x * CELL, maxX = minX + CELL, minZ = z * CELL, maxZ = minZ + CELL;
      const qx = clamp(p.x, minX, maxX), qz = clamp(p.z, minZ, maxZ);
      const ex = p.x - qx, ez = p.z - qz, d = Math.hypot(ex, ez);
      if (d < r) {
        if (d > 1e-5) { p.x += (ex / d) * (r - d); p.z += (ez / d) * (r - d); }
        else { p.x = cellCenter(cx); p.z = cellCenter(cz); }
      }
    }
  }
}

// ------------------------------------------------------------ поле пути до игрока (BFS)
export const flow = new Int16Array(GW * GH);
const bfsQ = new Int32Array(GW * GH);
export function computeFlow(px, pz) {
  flow.fill(-1);
  const sx = clamp(cellOf(px), 0, GW - 1), sz = clamp(cellOf(pz), 0, GH - 1);
  if (solid(sx, sz)) return;
  let h = 0, t = 0; const s = idx(sx, sz);
  flow[s] = 0; bfsQ[t++] = s;
  while (h < t) {
    const c = bfsQ[h++], x = c % GW, z = (c / GW) | 0;
    for (let k = 0; k < 4; k++) {
      const nx = x + DIRS[k][0], nz = z + DIRS[k][1];
      if (solid(nx, nz)) continue;
      const n = idx(nx, nz);
      if (flow[n] < 0) { flow[n] = flow[c] + 1; bfsQ[t++] = n; }
    }
  }
}
// направление к игроку по полю пути
export function flowDir(x, z) {
  const cx = clamp(cellOf(x), 0, GW - 1), cz = clamp(cellOf(z), 0, GH - 1);
  let best = flow[idx(cx, cz)], bx = cx, bz = cz;
  for (const [ox, oz] of DIRS) {
    const nx = cx + ox, nz = cz + oz;
    if (solid(nx, nz)) continue;
    const v = flow[idx(nx, nz)];
    if (v >= 0 && (best < 0 || v < best)) { best = v; bx = nx; bz = nz; }
  }
  const tx = cellCenter(bx) - x, tz = cellCenter(bz) - z, tl = Math.hypot(tx, tz) || 1;
  return [tx / tl, tz / tl];
}
