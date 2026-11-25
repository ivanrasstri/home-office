// Оснащение окопа: облицовка, мешки, настил, столбы, проволока, лестницы, блиндажи, реквизит.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { CELL, GW, GH, WALL_H } from './config.js';
import { solid, idx, cellCenter, DIRS, edgeType, map, heightAt, sdfAt } from './trenchmap.js';
import { pbr, patchWet, patchInstUv, cloneModel, modelParts, MODELS } from './assets.js';
import { mulberry32, lerp } from './util.js';

export const dressing = { lanterns: [], crates: [], colliders: [], fires: [], rats: [] };

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3(), _e = new THREE.Euler();

// Смещение модели так, чтобы её низ стоял на земле
const baseCache = new Map();
function baseOffset(name) {
  if (!baseCache.has(name)) { const b = new THREE.Box3().setFromObject(MODELS[name].scene); baseCache.set(name, -b.min.y); }
  return baseCache.get(name);
}
// Плоская панель вдоль грани: x — вдоль стены, y — вверх, смотрит в +z
function panelGeo(len, h, segX, segY, uLen, vLen, bulge, R) {
  const g = new THREE.PlaneGeometry(len, h, segX, segY);
  g.translate(0, h / 2, 0);
  const p = g.attributes.position, uv = g.attributes.uv;
  const u0 = R(), v0 = R();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    p.setZ(i, Math.sin((x / len + 0.5) * Math.PI) * bulge * (0.6 + 0.4 * Math.sin(y * 2.1 + u0 * 6)) + (R() - 0.5) * 0.006);
    uv.setXY(i, x / uLen + u0, y / vLen + v0);
  }
  g.computeVertexNormals();
  return g;
}
function place(geo, x, y, z, yaw, tiltX = 0, roll = 0) {
  _e.set(tiltX, yaw, roll, 'YXZ'); _q.setFromEuler(_e); _p.set(x, y, z); _s.set(1, 1, 1);
  _m.compose(_p, _q, _s);
  return geo.applyMatrix4(_m);
}
// Мешок с песком: сплющенный эллипсоид с неровностями
function sandbagGeo() {
  const g = new THREE.SphereGeometry(0.5, 10, 7);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    y = Math.sign(y) * Math.min(Math.abs(y), 0.33) * 1.2;           // плоский верх и низ
    const r = Math.hypot(x, z);
    const k = 1 + 0.06 * Math.sin(x * 9) * Math.cos(z * 7) + 0.04 * Math.sin(y * 12);
    p.setXYZ(i, x * 0.62 * k, y * 0.3, z * 0.34 * k * (1 - 0.08 * Math.abs(y)));
  }
  g.computeVertexNormals();
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 3, uv.getY(i) * 1.5);
  return g;
}

export function buildDressing(scene, quality) {
  const R = mulberry32(map.seed * 31 + 7);
  const rr = (a, b) => lerp(a, b, R());
  const plankGeos = [], ironGeos = [], walerGeos = [];
  const posts = new Map();
  const bags = [];   // [x,y,z,yaw,sx,sy,sz,shade,castShadow]
  const lanternSpots = [];

  // --------------------------------------------------- облицовка стенок
  for (let cz = 0; cz < GH; cz++) for (let cx = 0; cx < GW; cx++) {
    if (solid(cx, cz)) continue;
    for (let d = 0; d < 4; d++) {
      const type = edgeType[idx(cx, cz) * 4 + d];
      if (!type) continue;
      const [dx, dz] = DIRS[d];
      const ex = cellCenter(cx) + dx * CELL / 2, ez = cellCenter(cz) + dz * CELL / 2;
      const yaw = Math.atan2(-dx, -dz);                    // панель смотрит в окоп
      const tx = -dz, tz = dx;                             // вдоль стены
      const inset = 0.02;
      const bx = ex - dx * inset, bz = ez - dz * inset;
      if (type === 2) {
        const h = R() < 0.15 ? rr(1.3, 1.9) : rr(2.15, 2.45);
        const g = panelGeo(CELL + 0.06, h, 6, 4, 2.0, 2.0, rr(0.01, 0.05), R);
        plankGeos.push(place(g, bx, -0.12, bz, yaw, -rr(0.02, 0.08), rr(-0.015, 0.015)));
        if (h > 2) walerGeos.push(place(new THREE.CylinderGeometry(0.05, 0.055, CELL + 0.25, 7).rotateZ(Math.PI / 2), bx + dx * 0.0 - dx * 0.06, h - 0.25, bz - dz * 0.06, yaw));
        if (R() < 0.35) lanternSpots.push({ x: ex - dx * 0.14 + tx * rr(-0.5, 0.5), z: ez - dz * 0.14 + tz * rr(-0.5, 0.5), yaw, cx, cz });
      } else if (type === 3) {
        for (let k = -1; k <= 1; k += 2) {
          const h = rr(2.0, 2.45);
          const g = panelGeo(1.08, h, 4, 3, 1.6, 1.6, rr(0.015, 0.06), R);
          place(g, bx + tx * k * 0.48 - dx * (k > 0 ? 0.012 : 0), -0.12, bz + tz * k * 0.48 - dz * (k > 0 ? 0.012 : 0), yaw + rr(-0.04, 0.04), -rr(0.02, 0.1), rr(-0.03, 0.03));
          ironGeos.push(g);
        }
        if (R() < 0.25) lanternSpots.push({ x: ex - dx * 0.14, z: ez - dz * 0.14, yaw, cx, cz });
      } else if (type === 4) {
        // стенка из мешков, кладка «в перевязку» с наклоном назад
        const rows = Math.floor(rr(9, 13));
        for (let r = 0; r < rows; r++) {
          const y = -0.02 + r * 0.155;
          const back = r * 0.018;
          const off = (r % 2) * 0.32;
          for (let k = 0; k < 4; k++) {
            const along = -CELL / 2 + off + k * 0.66 - 0.05;
            if (along > CELL / 2 + 0.05 || along < -CELL / 2 - 0.25) continue;
            bags.push([ex - dx * (0.2 - back) + tx * along, y + 0.07, ez - dz * (0.2 - back) + tz * along, yaw + rr(-0.08, 0.08), rr(0.92, 1.08), rr(0.9, 1.1), rr(0.9, 1.08), R(), false]);
          }
        }
      }
      // опоры на углах облицовки
      if (type === 2 || type === 3) {
        for (const s of [-1, 1]) {
          const px = ex + tx * s * CELL / 2 - dx * 0.07, pz = ez + tz * s * CELL / 2 - dz * 0.07;
          const key = Math.round(px * 10) + ',' + Math.round(pz * 10);
          if (!posts.has(key)) posts.set(key, [px, pz, rr(-0.06, 0.06), rr(-0.06, 0.03), rr(2.5, 3.0)]);
        }
      }
      // бруствер из мешков по краю
      if (R() < 0.8) {
        const lip = sdfAt(ex + dx * 0.5, ez + dz * 0.5);
        const topY = heightAt(ex + dx * 0.55, ez + dz * 0.55);
        if (lip > 0 && topY > WALL_H - 0.3) {
          const layers = d === 3 ? 2 : 1;   // со стороны противника выше
          for (let L = 0; L < layers + (R() < 0.3 ? 1 : 0); L++) {
            for (let k = 0; k < 3; k++) {
              const along = -CELL / 2 + 0.36 + k * 0.66 + (L % 2) * 0.3 + rr(-0.05, 0.05);
              const px = ex + dx * (0.45 + L * 0.04) + tx * along, pz = ez + dz * (0.45 + L * 0.04) + tz * along;
              bags.push([px, heightAt(px, pz) + 0.07 + L * 0.15, pz, yaw + rr(-0.12, 0.12), rr(0.92, 1.1), rr(0.9, 1.15), rr(0.9, 1.1), R(), true]);
            }
          }
        }
      }
    }
  }
  const planksMat = patchWet(pbr('planks', { env: 0.25 }), 0.55, 0.9);
  const ironMat = patchWet(pbr('iron', { metal: true, env: 0.35, color: new THREE.Color(0.3, 0.33, 0.36) }), 0.45, 0.9);
  if (plankGeos.length) { const m = new THREE.Mesh(mergeGeometries(plankGeos), planksMat); m.receiveShadow = true; scene.add(m); }
  if (ironGeos.length) { const m = new THREE.Mesh(mergeGeometries(ironGeos), ironMat); m.receiveShadow = true; scene.add(m); }
  const barkMat = patchWet(pbr('bark', { env: 0.2 }), 0.5, 0.8);
  if (walerGeos.length) { const m = new THREE.Mesh(mergeGeometries(walerGeos), barkMat); m.receiveShadow = true; m.castShadow = true; scene.add(m); }
  // столбы
  const postGeo = new THREE.CylinderGeometry(0.06, 0.075, 1, 7); postGeo.translate(0, 0.5, 0);
  const postMesh = new THREE.InstancedMesh(postGeo, barkMat, posts.size);
  let pi = 0;
  for (const [px, pz, lx, lz, h] of posts.values()) {
    _e.set(lz, 0, lx); _q.setFromEuler(_e); _p.set(px, -0.25, pz); _s.set(1, h, 1);
    _m.compose(_p, _q, _s); postMesh.setMatrixAt(pi++, _m);
  }
  postMesh.castShadow = true; postMesh.receiveShadow = true;
  scene.add(postMesh);

  // --------------------------------------------------- настил (duckboards)
  const slatGeo = new THREE.BoxGeometry(0.64, 0.032, 0.1);
  { const uv = slatGeo.attributes.uv; for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 0.35, uv.getY(i) * 0.08); }
  const runnerGeo = new THREE.BoxGeometry(0.07, 0.07, CELL * 0.98);
  const slats = [], runners = [];
  for (let cz = 0; cz < GH; cz++) for (let cx = 0; cx < GW; cx++) {
    if (solid(cx, cz) || R() < 0.12) continue;
    const ew = !solid(cx + 1, cz) || !solid(cx - 1, cz), ns = !solid(cx, cz + 1) || !solid(cx, cz - 1);
    const roomy = (!solid(cx + 1, cz) && !solid(cx, cz + 1) && !solid(cx + 1, cz + 1)) || (!solid(cx - 1, cz) && !solid(cx, cz - 1) && !solid(cx - 1, cz - 1));
    if (roomy && R() < 0.6) continue;
    const alongX = ew && !ns ? true : ns && !ew ? false : R() < 0.5;
    const yaw = alongX ? Math.PI / 2 : 0;
    const c0x = cellCenter(cx) + rr(-0.1, 0.1), c0z = cellCenter(cz) + rr(-0.1, 0.1);
    const y0 = heightAt(c0x, c0z) + 0.02;
    const sink = rr(-0.03, 0.03), tilt = rr(-0.03, 0.03);
    for (const s of [-0.27, 0.27]) {
      const ox = alongX ? 0 : s, oz = alongX ? s : 0;
      runners.push([c0x + ox, y0 + 0.035 + sink, c0z + oz, yaw, tilt]);
    }
    for (let k = -4.5; k <= 4.5; k++) {
      if (R() < 0.08) continue;
      const along = k * 0.2 + rr(-0.015, 0.015);
      const ox = alongX ? along : 0, oz = alongX ? 0 : along;
      slats.push([c0x + ox, y0 + 0.085 + sink + rr(-0.008, 0.008), c0z + oz, yaw + rr(-0.05, 0.05), tilt + rr(-0.04, 0.04)]);
    }
  }
  const boardsMat = patchWet(patchInstUv(pbr('boards', { env: 0.25 })), 0.9, 0.3);
  const mkInst = (geo, mat, list, uvRand) => {
    const im = new THREE.InstancedMesh(geo, mat, list.length);
    const uvs = new Float32Array(list.length * 2);
    list.forEach((s, i) => {
      _e.set(s[4], s[3], 0, 'YXZ'); _q.setFromEuler(_e); _p.set(s[0], s[1], s[2]); _s.set(1, 1, 1);
      _m.compose(_p, _q, _s); im.setMatrixAt(i, _m);
      uvs[i * 2] = R(); uvs[i * 2 + 1] = R();
    });
    geo.setAttribute('instUv', new THREE.InstancedBufferAttribute(uvs, 2));
    im.receiveShadow = true;
    return im;
  };
  scene.add(mkInst(slatGeo, boardsMat, slats));
  scene.add(mkInst(runnerGeo, boardsMat, runners));

  // --------------------------------------------------- лестницы в огневых ячейках
  const ladderParts = [];
  for (const bay of map.bays) {
    if (R() < 0.35) continue;
    const x = cellCenter(bay.x0 + 1 + Math.floor(R() * 2)) + rr(-0.4, 0.4);
    const wallZ = bay.z * CELL;
    const lean = 0.2, len = 3.15;
    const foot = wallZ + 0.6;
    const g1 = new THREE.BoxGeometry(0.055, len, 0.045);
    for (const s of [-0.22, 0.22]) ladderParts.push(place(g1.clone().translate(0, len / 2, 0), x + s, -0.05, foot, 0, -lean));
    for (let r = 0.3; r < len - 0.1; r += 0.32) {
      const rung = new THREE.CylinderGeometry(0.018, 0.018, 0.46, 6).rotateZ(Math.PI / 2).translate(0, r, 0);
      ladderParts.push(place(rung, x, -0.05, foot, 0, -lean));
    }
  }
  if (ladderParts.length) {
    const lm = new THREE.Mesh(mergeGeometries(ladderParts), patchWet(pbr('boards', { env: 0.2, repeat: [0.3, 2] }), 0.4, 0.6));
    lm.castShadow = true; lm.receiveShadow = true; scene.add(lm);
  }

  // --------------------------------------------------- блиндажи: крыши, свет, ящики
  const roofIron = [], roofBeams = [];
  map.rooms.forEach((room, ri) => {
    const x0 = room.x * CELL, z0 = room.z * CELL, w = room.w * CELL, h = room.h * CELL;
    const roofY = WALL_H - 0.12;
    const cover = 0.72;
    const zEnd = z0 + h * cover;
    for (let bz = z0 + 0.3; bz < zEnd; bz += 0.9) {
      roofBeams.push(place(new THREE.CylinderGeometry(0.075, 0.085, w + 0.5, 8).rotateZ(Math.PI / 2), x0 + w / 2, roofY - 0.08, bz, 0));
    }
    for (let sx = x0 - 0.1; sx < x0 + w; sx += 1.0) {
      const g = panelGeo(1.06, h * cover + 0.2, 3, 3, 1.0, 1.2, 0.02, R);
      g.rotateX(Math.PI / 2);
      place(g, sx + 0.5, roofY, z0 - 0.1, 0, 0, 0);
      roofIron.push(g);
    }
    // мешки сверху
    for (let bx = x0 + 0.3; bx < x0 + w; bx += 0.66) for (let bz = z0 + 0.3; bz < zEnd; bz += 0.38) {
      if (R() < 0.25) continue;
      bags.push([bx + rr(-0.05, 0.05), roofY + 0.09, bz, rr(-0.1, 0.1), 1, 1, 1, R(), true]);
    }
    // ящик с патронами и свет
    const cx = x0 + w - 0.55, cz = z0 + 0.5;
    const crate = cloneModel('crate_mil');
    crate.position.set(cx, heightAt(cx, cz) + 0.02 + baseOffset('crate_mil'), cz); crate.rotation.y = rr(-0.2, 0.2);
    scene.add(crate);
    dressing.crates.push({ obj: crate, x: cx, z: cz, cd: 0 });
    dressing.colliders.push({ x: cx, z: cz, r: 0.55 });
    lanternSpots.push({ x: x0 + w / 2, z: z0 + 0.5, hang: roofY - 0.1, yaw: 0, forced: true });
    if (ri === 1 || ri === 4) {
      const sx = x0 + 0.6, sz = z0 + h - 0.7;
      const stove = cloneModel('stove');
      stove.position.set(sx, heightAt(sx, sz) + baseOffset('stove'), sz);
      scene.add(stove);
      dressing.fires.push({ x: sx, y: heightAt(sx, sz) + 0.9, z: sz });
      dressing.colliders.push({ x: sx, z: sz, r: 0.42 });
    }
    // мелочь
    for (let k = 0; k < 3; k++) {
      const name = ['barrel', 'crate', 'bucket', 'can'][Math.floor(R() * 4)];
      const px = lerp(x0 + 0.5, x0 + w - 0.5, R()), pz = lerp(z0 + h * 0.4, z0 + h - 0.4, R());
      const o = cloneModel(name);
      o.position.set(px, heightAt(px, pz) + baseOffset(name), pz); o.rotation.y = R() * 6;
      scene.add(o);
      if (name !== 'can') dressing.colliders.push({ x: px, z: pz, r: name === 'crate' ? 0.42 : 0.3 });
    }
  });
  if (roofIron.length) { const m = new THREE.Mesh(mergeGeometries(roofIron), ironMat.clone()); m.material.side = THREE.DoubleSide; m.castShadow = true; m.receiveShadow = true; scene.add(m); }
  if (roofBeams.length) { const m = new THREE.Mesh(mergeGeometries(roofBeams), barkMat); m.castShadow = true; m.receiveShadow = true; scene.add(m); }

  // --------------------------------------------------- мешки (один InstancedMesh на всё)
  const bagGeo = sandbagGeo();
  const bagMat = patchWet(pbr('hessian', { color: 0xa79a80, env: 0.2, normalScale: 1.2 }), 0.7, 1.2);
  for (const shadowPass of [false, true]) {
    const list = bags.filter((b) => b[8] === shadowPass);
    if (!list.length) continue;
    const im = new THREE.InstancedMesh(bagGeo, bagMat, list.length);
    const col = new THREE.Color();
    list.forEach((b, i) => {
      _e.set(0, b[3], 0); _q.setFromEuler(_e); _p.set(b[0], b[1], b[2]); _s.set(b[4], b[5], b[6]);
      _m.compose(_p, _q, _s); im.setMatrixAt(i, _m);
      const k = b[7];
      col.setRGB(lerp(0.45, 1.0, k), lerp(0.4, 0.92, k), lerp(0.32, 0.8, k));
      im.setColorAt(i, col);
    });
    im.castShadow = shadowPass; im.receiveShadow = true;
    scene.add(im);
  }

  // --------------------------------------------------- фонари
  const spots = lanternSpots.filter((s) => s.forced).concat(lanternSpots.filter((s) => !s.forced).sort(() => R() - 0.5).slice(0, 12));
  for (const s of spots) {
    const L = cloneModel('lantern', { cast: false });
    const y = s.hang ?? 1.85;
    L.position.set(s.x, y - 0.15, s.z); L.rotation.y = s.yaw + rr(-0.3, 0.3);
    L.scale.setScalar(1.15);
    // тёплое свечение стекла
    const glow = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 3.2, 1.2) }));
    glow.position.set(0, 0.11, 0); L.add(glow);
    scene.add(L);
    dressing.lanterns.push({ x: s.x, y: y - 0.02, z: s.z, obj: L, glow, ph: R() * 10 });
  }

  // --------------------------------------------------- реквизит в окопе
  const propNames = ['spade', 'barrel', 'crate', 'bucket', 'can', 'can', 'grenade', 'ammo_box', 'rock', 'crate_mil'];
  for (let cz = 0; cz < GH; cz++) for (let cx = 0; cx < GW; cx++) {
    if (solid(cx, cz) || R() > 0.13) continue;
    if (Math.abs(cx - map.spawn[0]) + Math.abs(cz - map.spawn[1]) < 2) continue;
    const walls = DIRS.map((d, i) => i).filter((i) => solid(cx + DIRS[i][0], cz + DIRS[i][1]));
    if (!walls.length) continue;
    const d = walls[Math.floor(R() * walls.length)];
    const [dx, dz] = DIRS[d];
    const name = propNames[Math.floor(R() * propNames.length)];
    const along = rr(-0.6, 0.6);
    const px = cellCenter(cx) + dx * (CELL / 2 - 0.32) + -dz * along, pz = cellCenter(cz) + dz * (CELL / 2 - 0.32) + dx * along;
    const o = cloneModel(name, { cast: !['can', 'grenade', 'ammo_box', 'rock'].includes(name) });
    o.position.set(px, heightAt(px, pz) + 0.01 + baseOffset(name), pz);
    o.rotation.y = (name.startsWith('crate') || name === 'barrel') ? Math.atan2(-dx, -dz) + rr(-0.15, 0.15) : R() * 6;
    if (name === 'spade') { o.position.set(cellCenter(cx) + dx * (CELL / 2 - 0.12) - dz * along, heightAt(px, pz) - 0.05, cellCenter(cz) + dz * (CELL / 2 - 0.12) + dx * along); o.rotation.set(0, Math.atan2(dx, dz), 0); o.rotateX(0.2); }
    if (name === 'grenade' || name === 'can') o.rotation.z = Math.PI / 2 * (R() < 0.6 ? 1 : 0);
    scene.add(o);
    if (['barrel', 'crate', 'crate_mil'].includes(name)) dressing.colliders.push({ x: px, z: pz, r: name === 'crate_mil' ? 0.5 : 0.36 });
  }
  // корни, торчащие из земляных стенок
  let roots = 0;
  for (let cz = 0; cz < GH && roots < 18; cz++) for (let cx = 0; cx < GW && roots < 18; cx++) {
    if (solid(cx, cz)) continue;
    for (let d = 0; d < 4; d++) {
      if (edgeType[idx(cx, cz) * 4 + d] !== 1 || R() > 0.3) continue;
      const [dx, dz] = DIRS[d];
      const o = cloneModel('root', { cast: true });
      const along = rr(-0.7, 0.7);
      o.position.set(cellCenter(cx) + dx * (CELL / 2 + 0.05) - dz * along, rr(1.2, 2.3), cellCenter(cz) + dz * (CELL / 2 + 0.05) + dx * along);
      o.rotation.set(rr(-0.6, 0.6), Math.atan2(-dx, -dz) + rr(-0.5, 0.5), rr(1.2, 1.9));
      o.scale.setScalar(rr(0.6, 1.0));
      scene.add(o); roots++;
    }
  }

  // --------------------------------------------------- ничейная земля: деревья, пни, бревна, проволока
  const W = GW * CELL, H = GH * CELL;
  const deco = [['dead_tree', 14], ['stump', 10], ['log', 10], ['branches', 16], ['rock', 18]];
  for (const [name, count] of deco) {
    for (let k = 0, tries = 0; k < count && tries < 400; tries++) {
      const x = rr(-50, W + 50), z = rr(-55, H + 30);
      if (sdfAt(x, z) < (name === 'dead_tree' ? 3 : 1.6)) continue;
      const o = cloneModel(name, { patch: (m) => { m.color.multiplyScalar(name === 'rock' ? 0.6 : 0.4); m.envMapIntensity = 0.2; } });
      const s = name === 'dead_tree' ? rr(0.9, 1.6) : rr(0.8, 1.3);
      o.scale.setScalar(s);
      o.rotation.y = R() * 6;
      if (name === 'dead_tree') { o.rotation.set(0, R() * 6, 0); o.rotateZ(Math.PI / 2 + rr(-0.2, 0.2)); }
      o.position.set(x, 0, z);
      o.updateMatrixWorld(true);
      const bb = new THREE.Box3().setFromObject(o);
      o.position.y = heightAt(x, z) - bb.min.y - (name === 'dead_tree' ? 0.25 : 0.06);
      scene.add(o); k++;
    }
  }
  buildWire(scene, R, rr);

  // крысы
  for (let i = 0; i < 4; i++) {
    const o = cloneModel('rat', { cast: false });
    o.visible = false; scene.add(o);
    dressing.rats.push({ obj: o, t: rr(3, 12), active: false });
  }
  return dressing;
}

// Колючая проволока перед передней линией (силуэты на фоне ракет)
function buildWire(scene, R, rr) {
  const W = GW * CELL;
  const zF = map.lines.zF * CELL;
  const pts = [];
  const pickets = [];
  const sapX = map.saps.map((s) => (s.x + 0.5) * CELL);
  for (const rowZ of [zF - 7, zF - 13]) {
    let prev = null;
    for (let x = -10; x < W + 10; x += rr(2.2, 3.0)) {
      const z = rowZ + rr(-0.6, 0.6);
      if (sapX.some((sx) => Math.abs(sx - x) < 1.6)) { prev = null; continue; }
      const y = heightAt(x, z);
      const top = rr(1.0, 1.35);
      const lean = rr(-0.12, 0.12);
      pickets.push([x, y, z, top, lean]);
      if (prev) {
        for (const hgt of [0.2, 0.5, 0.8, 1.05]) {
          const a = [prev[0] + prev[4] * hgt, prev[1] + Math.min(hgt, prev[3]), prev[2]];
          const b = [x + lean * hgt, y + Math.min(hgt, top), z];
          const n = 8;
          for (let i = 0; i < n; i++) {
            const t0 = i / n, t1 = (i + 1) / n;
            const sag = (t) => -Math.sin(t * Math.PI) * 0.08;
            pts.push(lerp(a[0], b[0], t0), lerp(a[1], b[1], t0) + sag(t0), lerp(a[2], b[2], t0));
            pts.push(lerp(a[0], b[0], t1), lerp(a[1], b[1], t1) + sag(t1), lerp(a[2], b[2], t1));
            // колючки
            const bx = lerp(a[0], b[0], t0 + 0.5 / n), by = lerp(a[1], b[1], t0 + 0.5 / n) + sag(t0 + 0.5 / n), bz = lerp(a[2], b[2], t0 + 0.5 / n);
            pts.push(bx, by - 0.025, bz - 0.02, bx, by + 0.025, bz + 0.02);
          }
        }
        // диагонали
        pts.push(prev[0], prev[1] + prev[3], prev[2], x, y + 0.15, z);
        pts.push(prev[0], prev[1] + 0.15, prev[2], x, y + top, z);
      }
      prev = [x, y, z, top, lean];
    }
  }
  // спутанные мотки
  for (let k = 0; k < 14; k++) {
    const cx = rr(-5, W + 5), cz = zF - rr(3, 18);
    if (sdfAt(cx, cz) < 1.5) continue;
    const y0 = heightAt(cx, cz);
    const len = rr(2, 5), rad = rr(0.35, 0.5), turns = len / 0.25;
    let p0 = null;
    for (let i = 0; i <= turns * 10; i++) {
      const t = i / 10, a = t * Math.PI * 2;
      const p = [cx + (t / turns - 0.5) * len, y0 + rad + Math.sin(a) * rad, cz + Math.cos(a) * rad];
      if (p0) pts.push(...p0, ...p);
      p0 = p;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const wire = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x1c140e }));
  scene.add(wire);
  const pg = new THREE.CylinderGeometry(0.012, 0.016, 1, 5); pg.translate(0, 0.5, 0);
  const pm = new THREE.InstancedMesh(pg, pbr('rust', { metal: true, env: 0.4 }), pickets.length);
  pickets.forEach(([x, y, z, top, lean], i) => {
    _e.set(0, 0, -lean); _q.setFromEuler(_e); _p.set(x, y - 0.2, z); _s.set(1, top + 0.2, 1);
    _m.compose(_p, _q, _s); pm.setMatrixAt(i, _m);
  });
  pm.castShadow = true;
  scene.add(pm);
}

// Крысы перебегают по дну окопа
export function updateRats(dt, player) {
  for (const r of dressing.rats) {
    if (!r.active) {
      r.t -= dt;
      if (r.t <= 0) {
        // старт у стены в 4–10 м от игрока
        const a = Math.random() * Math.PI * 2, d = 4 + Math.random() * 6;
        const x = player.x + Math.cos(a) * d, z = player.z + Math.sin(a) * d;
        const c = [Math.floor(x / CELL), Math.floor(z / CELL)];
        if (solid(c[0], c[1])) { r.t = 1; continue; }
        const dir = Math.random() * Math.PI * 2;
        r.x = x; r.z = z; r.dir = dir; r.life = 1.2 + Math.random() * 1.5; r.active = true; r.obj.visible = true;
      }
      continue;
    }
    r.life -= dt;
    const sp = 2.6;
    let nx = r.x + Math.cos(r.dir) * sp * dt, nz = r.z + Math.sin(r.dir) * sp * dt;
    if (solid(Math.floor(nx / CELL), Math.floor(nz / CELL))) { r.dir += Math.PI * (0.5 + Math.random()); nx = r.x; nz = r.z; }
    r.x = nx; r.z = nz;
    r.obj.position.set(r.x, heightAt(r.x, r.z) + 0.09, r.z);
    r.obj.rotation.y = -r.dir + Math.PI / 2;
    if (r.life <= 0) { r.active = false; r.obj.visible = false; r.t = 6 + Math.random() * 14; }
  }
}
