// Враги: скелетные модели с mocap-анимациями, IK рук, оружие, ИИ по ролям из книги правил,
// броня, сбивание с ног, мораль отрядов, гарнизоны для рейда.
import * as THREE from 'three';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import { MODELS, TEX, cloneModel, addPatch, pbr } from './assets.js';
import { CELL, GW, GH, WALL_H } from './config.js';
import { solid, idx, cellOf, cellCenter, flow, flowDir, los, collide, heightAt, DIRS } from './trenchmap.js';
import { dressing } from './dressing.js';
import { clamp, lerp, rr, damp } from './util.js';

const V = () => new THREE.Vector3();
const _a = V(), _b = V(), _c = V(), _t = V(), _e = V(), _n = V(), _d1 = V(), _d2 = V();
const _q = new THREE.Quaternion(), _qw = new THREE.Quaternion(), _qp = new THREE.Quaternion(), _qi = new THREE.Quaternion();
const UP = new THREE.Vector3(0, 1, 0);
export let MASK_YAW = 0;
export function setMaskYaw(v) { MASK_YAW = v; }
const roll2d6 = (dice = 2) => { const r = Array.from({ length: dice }, () => 1 + Math.floor(Math.random() * 6)).sort((a, b) => b - a); return r[0] + r[1]; };
// бросок успеха по ступени: +DICE — лучшие два из 2+n кубиков, −DICE — худшие два (стр. 15, 24–25)
function rollStep(step) {
  step = clamp(Math.round(step), -2, 2);
  const n = 2 + Math.abs(step);
  const r = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 6)).sort((a, b) => b - a);
  return step >= 0 ? r[0] + r[1] : r[n - 1] + r[n - 2];
}

// ------------------------------------------------------------ работа с костями
function rotateBoneToward(bone, cur, des, blend = 1) {
  if (cur.lengthSq() < 1e-10 || des.lengthSq() < 1e-10) return;
  _q.setFromUnitVectors(cur.normalize(), des.normalize());
  if (blend < 1) _q.slerp(_qi.identity(), 1 - blend);
  bone.getWorldQuaternion(_qw);
  bone.parent.getWorldQuaternion(_qp);
  _qw.premultiply(_q);
  bone.quaternion.copy(_qp.invert().multiply(_qw));
  bone.updateMatrixWorld(true);
}
function rotateBoneWorld(bone, axis, angle) {
  _q.setFromAxisAngle(axis, angle);
  bone.getWorldQuaternion(_qw); bone.parent.getWorldQuaternion(_qp);
  _qw.premultiply(_q);
  bone.quaternion.copy(_qp.invert().multiply(_qw));
  bone.updateMatrixWorld(true);
}
// двухзвенный IK (плечо-предплечье-кисть) с полюсом для локтя
function ik2(arm, fore, hand, target, pole, blend = 1) {
  arm.getWorldPosition(_a); fore.getWorldPosition(_b); hand.getWorldPosition(_c);
  const l1 = _a.distanceTo(_b), l2 = _b.distanceTo(_c);
  _t.copy(target);
  const d = _a.distanceTo(_t);
  const dc = clamp(d, Math.abs(l1 - l2) + 1e-4, l1 + l2 - 1e-4);
  _d1.subVectors(_t, _a).normalize();
  _t.copy(_a).addScaledVector(_d1, dc);
  const cosA = clamp((l1 * l1 + dc * dc - l2 * l2) / (2 * l1 * dc), -1, 1);
  const ang = Math.acos(cosA);
  _n.subVectors(pole, _a).cross(_d1).normalize();         // нормаль плоскости
  _d2.crossVectors(_d1, _n).normalize();                  // к полюсу
  if (_d2.dot(_e.subVectors(pole, _a)) < 0) _d2.negate();
  _e.copy(_a).addScaledVector(_d1, Math.cos(ang) * l1).addScaledVector(_d2, Math.sin(ang) * l1);
  rotateBoneToward(arm, _c.subVectors(_b, _a), _d1.subVectors(_e, _a), blend);
  fore.getWorldPosition(_b); hand.getWorldPosition(_c);
  rotateBoneToward(fore, _a.subVectors(_c, _b), _d2.subVectors(_t, _b), blend);
}
function bones(root) {
  const b = {};
  root.traverse((o) => { if (o.isBone) b[o.name.replace('mixamorig', '')] = o; });
  return b;
}
// Крепление к кости через мировое выравнивание: offset/rot заданы в осях персонажа (+z вперёд, +y вверх)
const _m1 = new THREE.Matrix4(), _m2 = new THREE.Matrix4();
function attachAligned(bone, obj, group, offset = [0, 0, 0], rot = [0, 0, 0], scale = 1) {
  group.updateMatrixWorld(true);
  const gq = group.getWorldQuaternion(new THREE.Quaternion());
  const gs = group.getWorldScale(V()).x;
  const pos = bone.getWorldPosition(V()).add(V().set(...offset).multiplyScalar(gs).applyQuaternion(gq));
  const q = gq.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(rot[0], rot[1], rot[2], 'YXZ')));
  _m1.compose(pos, q, V().setScalar(scale * gs));
  _m2.copy(bone.matrixWorld).invert().multiply(_m1);
  _m2.decompose(obj.position, obj.quaternion, obj.scale);
  bone.add(obj);
  return obj;
}

// ------------------------------------------------------------ материалы
// Перекраска брони «Вангарда»: исходная текстура служит маской (пластины / ткань / ремни)
function armorMaterial(src, colors) {
  const m = new THREE.MeshStandardMaterial({ map: src.map, normalMap: src.normalMap, roughness: 1, metalness: 1, envMapIntensity: 0.7 });
  m.userData.skinned = true;
  return addPatch(m, 'armor' + colors.key, (s) => {
    Object.assign(s.uniforms, {
      tMetD: { value: TEX.helmet.d }, tMetA: { value: TEX.helmet.arm }, tWoolD: { value: TEX.wool.d }, tLeaD: { value: TEX.leather.d },
      uMet: { value: new THREE.Color(...colors.metal) }, uCloth: { value: new THREE.Color(...colors.cloth) }, uLea: { value: new THREE.Color(...colors.leather) },
    });
    s.fragmentShader = s.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform sampler2D tMetD, tMetA, tWoolD, tLeaD; uniform vec3 uMet, uCloth, uLea; float aMetal; float aRough;')
      .replace('#include <map_fragment>', `
        vec3 o = texture2D(map, vMapUv).rgb;
        float lum = dot(o, vec3(0.3, 0.59, 0.11));
        float plate = smoothstep(0.08, 0.16, lum) * smoothstep(0.02, 0.08, o.r - o.b);
        float strap = 1.0 - smoothstep(0.012, 0.03, lum);
        float cloth = clamp(1.0 - plate - strap, 0.0, 1.0);
        vec2 duv = vMapUv * 7.0;
        vec3 mt = texture2D(tMetD, duv).rgb;
        float ml = dot(mt, vec3(0.3, 0.59, 0.11));
        vec3 met = mix(vec3(ml), mt, 0.18) * uMet * 1.5;
        vec3 arm = texture2D(tMetA, duv).rgb;
        vec3 wool = vec3(dot(texture2D(tWoolD, duv * 1.5).rgb, vec3(0.33))) * uCloth * 1.4;
        vec3 lea = vec3(dot(texture2D(tLeaD, duv).rgb, vec3(0.33))) * uLea * 1.3;
        float shade = 0.65 + 0.7 * clamp(lum / 0.25, 0.0, 1.0);
        diffuseColor.rgb = (met * plate + wool * cloth + lea * strap) * mix(1.0, shade, 0.5);
        aMetal = plate * 0.65;
        aRough = mix(mix(0.9, 0.55, strap), arm.g, plate);`)
      .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = aRough;')
      .replace('#include <metalnessmap_fragment>', 'float metalnessFactor = aMetal;');
  });
}
const matCache = {};
const cached = (k, f) => matCache[k] || (matCache[k] = f());
const ironMat = () => cached('iron', () => { const m = pbr('rust', { color: new THREE.Color(0.24, 0.22, 0.21), metal: true, env: 0.5 }); m.metalness = 0.75; return m; });
const darkIron = () => cached('darkiron', () => { const m = pbr('rust', { color: new THREE.Color(0.11, 0.095, 0.09), metal: true, env: 0.35 }); m.metalness = 0.6; return m; });
const woodMat = () => cached('wood', () => pbr('bark', { env: 0.2 }));
const hessianMat = () => cached('hessian', () => pbr('hessian', { color: new THREE.Color(0.2, 0.16, 0.12), env: 0.2, repeat: [6, 6] }));
const fiendSkin = () => cached('fiend', () => { const m = pbr('leather', { color: new THREE.Color(0.16, 0.045, 0.03), env: 0.35, repeat: [4, 4], normalScale: 1.6 }); m.roughness = 0.55; return m; });
// Отверженные: бледная кожа в язвах (цвет из палитры артов #947f81, сильно затемнён под ночь)
const wretchedSkin = () => cached('wretched', () => { const m = pbr('leather', { color: new THREE.Color(0.17, 0.14, 0.14), env: 0.2, repeat: [5, 5], normalScale: 1.4 }); m.roughness = 0.75; return m; });
const jointMat = (c) => cached('joint' + c, () => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7 }));
const glowMat = (r, g, b) => cached(`glow${r},${g},${b}`, () => new THREE.MeshBasicMaterial({ color: new THREE.Color(r, g, b) }));

// ------------------------------------------------------------ детали моделей
const FACTION_COLORS = {
  legion: { key: 'L', metal: [0.11, 0.095, 0.09], cloth: [0.07, 0.035, 0.03], leather: [0.05, 0.035, 0.03] },
  veteran: { key: 'V', metal: [0.07, 0.06, 0.06], cloth: [0.14, 0.02, 0.02], leather: [0.04, 0.03, 0.03] },
  antioch: { key: 'A', metal: [0.17, 0.17, 0.12], cloth: [0.21, 0.18, 0.12], leather: [0.12, 0.08, 0.05] },
  shock: { key: 'S', metal: [0.12, 0.12, 0.11], cloth: [0.13, 0.12, 0.1], leather: [0.08, 0.06, 0.04] },
  priest: { key: 'P', metal: [0.15, 0.14, 0.1], cloth: [0.09, 0.07, 0.05], leather: [0.1, 0.07, 0.04] },
  communicant: { key: 'C', metal: [0.26, 0.2, 0.1], cloth: [0.16, 0.13, 0.09], leather: [0.1, 0.07, 0.04] },
};
const geo = {};
const lathe = (k, pts, seg = 20) => geo[k] || (geo[k] = new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), seg));
const brodieGeo = () => lathe('brodie', [[0, 0.115], [0.06, 0.112], [0.105, 0.09], [0.13, 0.05], [0.14, 0.012], [0.175, 0.0], [0.19, -0.008], [0.188, -0.014], [0.17, -0.006], [0.0, -0.006]], 24);
const spikedGeo = () => lathe('spiked', [[0, 0.14], [0.05, 0.135], [0.1, 0.11], [0.125, 0.06], [0.132, 0.0], [0.14, -0.06], [0.155, -0.1], [0.15, -0.105], [0.0, -0.1]]);
// железный шлем-котелок пилигрима с окулярами противогаза (по арту p021_38): тёмное ржавое железо, не ткань
const cowlGeo = () => lathe('cowl', [[0, 0.27], [0.03, 0.26], [0.08, 0.21], [0.12, 0.13], [0.14, 0.04], [0.145, -0.08], [0.15, -0.16], [0.145, -0.17], [0, -0.17]]);
// ведро-маска Отверженного
const bucketGeo = () => lathe('bucket', [[0, 0.15], [0.105, 0.15], [0.115, 0.1], [0.125, -0.06], [0.13, -0.13], [0.125, -0.135], [0, -0.135]], 16);
function horn(sx, len = 1, mat) {
  const curve = new THREE.CatmullRomCurve3([V().set(sx * 0.06, 0.12, 0.02), V().set(sx * 0.13, 0.2, -0.04).multiplyScalar(len), V().set(sx * 0.15, 0.3, -0.14).multiplyScalar(len), V().set(sx * 0.1, 0.36, -0.25).multiplyScalar(len)]);
  const g = new THREE.TubeGeometry(curve, 12, 0.028, 6);
  // сужаем к острию
  const p = g.attributes.position, n = 13;
  for (let i = 0; i < p.count; i++) {
    const ring = Math.floor(i / 7), k = 1 - (ring / n) * 0.85;
    const c = curve.getPoint(ring / 12);
    p.setXYZ(i, c.x + (p.getX(i) - c.x) * k, c.y + (p.getY(i) - c.y) * k, c.z + (p.getZ(i) - c.z) * k);
  }
  g.computeVertexNormals();
  const h = new THREE.Mesh(g, mat); h.castShadow = true;
  return h;
}
let rifleMesh = null;
function enemyRifle(scope = false) {
  if (!rifleMesh) rifleMesh = MODELS.rifle.scene.clone(true);
  const r = rifleMesh.clone(true);
  r.traverse((o) => { if (o.name === 'bolt_action_rifle_7_62_scope') o.visible = scope; if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return r;
}
const shadowed = (o) => { o.traverse((c) => { if (c.isMesh) c.castShadow = true; }); return o; };
// блик оптики: яркая точка, которую подхватывает bloom
let glintTex = null;
function glintSprite() {
  if (!glintTex) {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.2, 'rgba(255,240,210,0.6)'); grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
    g.fillRect(0, 31, 64, 2);
    glintTex = new THREE.CanvasTexture(c);
  }
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glintTex, color: new THREE.Color(0, 0, 0), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
  s.scale.set(0.25, 0.25, 1);
  return s;
}

function addRifle(parts, group, { scale = 1, scope = false, drum = false } = {}) {
  parts.rifle = enemyRifle(scope);
  parts.rifle.rotation.set(0, -Math.PI / 2, 0);
  parts.rifle.scale.setScalar(scale);
  const holder = new THREE.Group(); holder.add(parts.rifle);
  group.add(holder);
  parts.rifleHolder = holder;
  if (drum) {
    const d = new THREE.Mesh(new THREE.CylinderGeometry(0.06 * scale, 0.06 * scale, 0.05 * scale, 14), darkIron());
    d.rotation.z = Math.PI / 2; d.position.set(0, -0.02 * scale, 0.05 * scale); d.castShadow = true; holder.add(d);
  }
  parts.muzzle = new THREE.Object3D(); parts.muzzle.position.set(0, 0.045 * scale, 0.64 * scale); holder.add(parts.muzzle);
  parts.grip = new THREE.Object3D(); parts.grip.position.set(0, -0.01, -0.42 * scale); holder.add(parts.grip);
  parts.fore = new THREE.Object3D(); parts.fore.position.set(0, 0.03, 0.1 * scale); holder.add(parts.fore);
  if (scope) { parts.glint = glintSprite(); parts.glint.position.set(0, 0.11, -0.02); holder.add(parts.glint); }
}
function addGasmask(B, group) {
  const mask = cloneModel('gasmask');
  const holder = new THREE.Group(); holder.add(mask);
  mask.position.set(0, -0.99, 0.0);
  attachAligned(B.Head, holder, group, [0, 0.07, 0.1], [0, MASK_YAW, 0], 1.05);
}

function buildModel(kind) {
  const soldier = /^(legion|antioch|communicant)/.test(kind);
  const src = soldier ? MODELS.soldier : MODELS.xbot;
  const root = SkeletonUtils.clone(src.scene);
  const B = bones(root);
  const group = new THREE.Group();
  group.add(root);
  root.traverse((o) => {
    if (o.isSkinnedMesh || o.isMesh) {
      o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false;
      if (o.name.includes('visor')) o.visible = false;
    }
  });
  if (soldier) root.rotation.y = Math.PI;   // модель солдата смотрит в -z
  // анимации (до крепления аксессуаров: нужна стойка покоя)
  const mixer = new THREE.AnimationMixer(root);
  const clip = (re) => src.animations.find((a) => re.test(a.name));
  const actions = {};
  for (const [k, re] of [['idle', /^idle$/i], ['walk', /^walk$/i], ['run', /^run$/i]]) {
    const c = clip(re);
    if (c) { const a = mixer.clipAction(c); a.play(); a.setEffectiveWeight(k === 'idle' ? 1 : 0); actions[k] = a; }
  }
  mixer.update(0);
  group.updateMatrixWorld(true);
  const parts = { B, reach: 0.5 };
  if (soldier) {
    const col = { legion: 'legion', legion_gunner: 'legion', legion_veteran: 'veteran', antioch: 'antioch', antioch_shock: 'shock', antioch_sniper: 'priest', communicant: 'communicant' }[kind];
    root.traverse((o) => { if (o.isSkinnedMesh && o.visible) o.material = armorMaterial(o.material, FACTION_COLORS[col]); });
    addGasmask(B, group);
    const heretic = kind.startsWith('legion');
    // головной убор
    const hh = new THREE.Group();
    if (kind === 'antioch_sniper') {
      // капюшон и тонкий золотой нимб (арт p008_25)
      const hood = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), cached('hood', () => pbr('wool', { color: new THREE.Color(0.08, 0.065, 0.05), env: 0.2, repeat: [2, 2], side: THREE.DoubleSide })));
      hood.position.set(0, 0.11, -0.02); hood.scale.set(1, 1.15, 1.1); hh.add(hood);
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.006, 6, 40), glowMat(2.6, 1.9, 0.6));
      halo.position.set(0, 0.2, -0.14); hh.add(halo);
    } else {
      const helm = new THREE.Mesh(heretic ? spikedGeo() : brodieGeo(), heretic
        ? cached('helmL', () => pbr('rust', { color: new THREE.Color(0.25, 0.2, 0.2), metal: true, env: 0.8 }))
        : cached('helmA', () => pbr('helmet', { color: new THREE.Color(0.55, 0.58, 0.45), metal: true, env: 0.8 })));
      helm.position.set(0, heretic ? 0.14 : 0.17, 0.0); hh.add(helm);
      if (heretic) {
        // корона из трёх шипов (арт p036_68)
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.2, 6), helm.material); spike.position.set(0, 0.36, 0); hh.add(spike);
        for (const sx of [-1, 1]) { const s2 = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.13, 5), helm.material); s2.position.set(sx * 0.12, 0.25, -0.02); s2.rotation.z = -sx * 0.9; hh.add(s2); }
        if (kind === 'legion_veteran') for (const sx of [-1, 1]) { const h = horn(sx, 1.25, cached('hornV', () => new THREE.MeshStandardMaterial({ color: 0x15100d, roughness: 0.4 }))); h.position.y = 0.08; hh.add(h); }
      }
      if (kind === 'communicant') { const crest = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.08, 0.3), helm.material); crest.position.set(0, 0.29, 0); hh.add(crest); }
    }
    shadowed(hh);
    attachAligned(B.Head, hh, group, [0, 0, 0], [0, 0, 0], 1.0);
    if (kind === 'legion_veteran') {
      // топор палача: длинное древко, широкое лезвие
      const ax = new THREE.Group();
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.024, 1.1, 7), woodMat()); shaft.position.y = 0.25; ax.add(shaft);
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.26, 0.3), darkIron()); blade.position.set(0, 0.68, 0.13); ax.add(blade);
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.32, 0.04), ironMat()); edge.position.set(0, 0.68, 0.29); ax.add(edge);
      shadowed(ax);
      attachAligned(B.RightHand, ax, group, [0, -0.04, 0.03], [0, 0, 0], 1.0);
      parts.reach = 0.7;
    } else {
      const opt = { legion_gunner: { scale: 1.2, drum: true }, antioch_shock: { scale: 0.74, drum: true }, antioch_sniper: { scale: 1.05, scope: true }, communicant: { scale: 1.35 } }[kind] || {};
      addRifle(parts, group, opt);
    }
  } else {
    const xbotMat = (m) => root.traverse((o) => { if (o.isSkinnedMesh) o.material = o.material.name.includes('Joint') ? jointMat(m === fiendSkin() ? 0x120404 : 0x1a1612) : m; });
    if (kind === 'fiend') {
      xbotMat(fiendSkin());
      for (const n of ['LeftArm', 'RightArm', 'LeftForeArm', 'RightForeArm']) if (B[n]) B[n].scale.set(0.82, 1.22, 0.82);
      for (const n of ['LeftHand', 'RightHand']) if (B[n]) B[n].scale.set(1.3, 1.5, 1.3);
      if (B.Neck) B.Neck.scale.set(0.9, 1.25, 0.9);
      const hg = new THREE.Group();
      const hornMat = cached('horn', () => new THREE.MeshStandardMaterial({ color: 0x1a1210, roughness: 0.45 }));
      for (const sx of [-1, 1]) {
        hg.add(horn(sx, 1, hornMat));
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 6), glowMat(9, 2.2, 0.4)); eye.position.set(sx * 0.045, 0.06, 0.1); hg.add(eye);
      }
      // шипастый намордник (стр. 138: бесов держат в колючих намордниках)
      const muzzle = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.012, 6, 16), ironMat());
      muzzle.position.set(0, 0.0, 0.09); muzzle.scale.set(1, 0.8, 1); hg.add(muzzle);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2, sp = new THREE.Mesh(new THREE.ConeGeometry(0.008, 0.06, 4), ironMat());
        sp.position.set(Math.cos(a) * 0.08, Math.sin(a) * 0.065, 0.1); sp.rotation.set(Math.PI / 2, 0, 0); sp.lookAt(V().set(Math.cos(a) * 0.3, Math.sin(a) * 0.3, 0.2)); hg.add(sp);
      }
      for (const sx of [-1, 1]) { const strap = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.02, 0.16), cached('strap', () => pbr('leather', { color: new THREE.Color(0.06, 0.04, 0.03), env: 0.3 }))); strap.position.set(sx * 0.075, 0.02, 0.02); hg.add(strap); }
      shadowed(hg);
      attachAligned(B.Head, hg, group, [0, 0, 0], [0, 0, 0], 1.0);
      parts.hunch = 0.5; parts.reach = 1;
    } else if (kind === 'wretched') {
      xbotMat(wretchedSkin());
      const mg = new THREE.Group();
      const bucket = new THREE.Mesh(bucketGeo(), darkIron()); bucket.position.y = 0.07; mg.add(bucket);
      for (const sx of [-1, 1]) { const slit = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.012, 0.03), glowMat(0, 0, 0)); slit.position.set(sx * 0.04, 0.09, 0.12); mg.add(slit); }
      for (let i = 0; i < 6; i++) { const rv = new THREE.Mesh(new THREE.SphereGeometry(0.008, 5, 4), ironMat()); const a = -0.9 + i * 0.36; rv.position.set(Math.sin(a) * 0.123, 0.0, Math.cos(a) * 0.123); mg.add(rv); }
      const lock = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 0.02), ironMat()); lock.position.set(0, -0.07, 0.13); mg.add(lock);
      shadowed(mg);
      attachAligned(B.Head, mg, group, [0, 0, 0], [0, 0, 0], 1.0);
      const chain = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.014, 6, 18), ironMat()); chain.castShadow = true;
      const cg = new THREE.Group(); cg.add(chain); chain.rotation.set(Math.PI / 2, 0, 0);
      attachAligned(B.Neck || B.Spine2, cg, group, [0, -0.02, 0], [0, 0, 0], 1.0);
      // окопная дубинка с гвоздями
      const club = new THREE.Group();
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.018, 0.6, 7), woodMat()); stick.position.y = -0.2; club.add(stick);
      for (let i = 0; i < 9; i++) { const nl = new THREE.Mesh(new THREE.ConeGeometry(0.006, 0.05, 4), ironMat()); const a = i * 2.1; nl.position.set(Math.cos(a) * 0.03, -0.4 - (i % 3) * 0.05, Math.sin(a) * 0.03); nl.rotation.set(0, 0, Math.PI / 2); nl.lookAt(V().set(Math.cos(a), nl.position.y, Math.sin(a))); club.add(nl); }
      shadowed(club);
      attachAligned(B.RightHand, club, group, [0, -0.06, 0.02], [0, 0, 0], 1.0);
      parts.hunch = 0.3; parts.reach = 0.6;
    } else {
      // пилигримы: мешковина, ряса до голеней
      xbotMat(hessianMat());
      const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.36, kind === 'prisoner' ? 0.5 : 0.78, 14, 3, true), cached('robe', () => pbr('wool', { color: new THREE.Color(0.11, 0.06, 0.045), env: 0.2, repeat: [3, 2], side: THREE.DoubleSide })));
      robe.castShadow = true;
      const rg = new THREE.Group(); rg.add(robe); robe.position.y = kind === 'prisoner' ? -0.22 : -0.36;
      attachAligned(B.Hips, rg, group, [0, 0, 0], [0, 0, 0], 1.0);
      if (kind === 'castigator') {
        // железный колпак с окуляром противогаза (p021_38) и красная нашивка с крестом
        const cg = new THREE.Group();
        const cowl = new THREE.Mesh(cowlGeo(), darkIron()); cowl.position.y = 0.08; cg.add(cowl);
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.012, 5, 20), ironMat()); rim.rotation.x = Math.PI / 2; rim.position.y = -0.08; cg.add(rim);
        for (const sx of [-1, 1]) {
          const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.03, 12), darkIron()); ring.rotation.x = Math.PI / 2; ring.position.set(sx * 0.045, 0.08, 0.135); cg.add(ring);
          const lens = new THREE.Mesh(new THREE.CircleGeometry(0.024, 12), cached('lens', () => new THREE.MeshStandardMaterial({ color: 0x050607, roughness: 0.05, metalness: 0.9 }))); lens.position.set(sx * 0.045, 0.08, 0.152); cg.add(lens);
        }
        for (let i = 0; i < 7; i++) { const sp = new THREE.Mesh(new THREE.ConeGeometry(0.009, 0.06, 4), ironMat()); const a = i * 0.898; sp.position.set(Math.cos(a) * 0.12, 0.17, Math.sin(a) * 0.12); sp.rotation.set(Math.sin(a) * 1.1, 0, -Math.cos(a) * 1.1); cg.add(sp); }
        shadowed(cg);
        attachAligned(B.Head, cg, group, [0, 0, 0], [0, 0, 0], 1.0);
        const patch = new THREE.Group();
        const red = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.16), cached('patch', () => new THREE.MeshStandardMaterial({ color: new THREE.Color(0.32, 0.05, 0.035), roughness: 0.9, side: THREE.DoubleSide })));
        patch.add(red);
        const bar = new THREE.MeshStandardMaterial({ color: 0x050404, roughness: 0.9 });
        const v1 = new THREE.Mesh(new THREE.PlaneGeometry(0.025, 0.12), bar); v1.position.z = 0.001; patch.add(v1);
        const h1 = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.025), bar); h1.position.set(0, 0.02, 0.001); patch.add(h1);
        attachAligned(B.Spine2 || B.Spine1, patch, group, [0, 0.02, 0.16], [0, 0, 0], 1.0);
        // бич: древко и железный шар на цепи
        const fl = new THREE.Group();
        fl.add(new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.5, 6), woodMat()));
        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), ironMat()); ball.position.set(0, -0.42, 0.05); fl.add(ball);
        for (let i = 1; i < 5; i++) { const l = new THREE.Mesh(new THREE.TorusGeometry(0.015, 0.005, 4, 8), ironMat()); l.position.set(0, -0.25 - i * 0.035, 0.01 * i); l.rotation.y = i * 1.4; fl.add(l); }
        shadowed(fl);
        attachAligned(B.RightHand, fl, group, [0, -0.08, 0.02], [0, 0, 0], 1.0);
        parts.hunch = 0.18;
      } else {
        // церковный узник: ошейник, цепи и устройство мученика на груди
        const mg = new THREE.Group();
        const sack = new THREE.Mesh(new THREE.SphereGeometry(0.135, 12, 10), cached('sack', () => pbr('hessian', { color: new THREE.Color(0.22, 0.18, 0.14), env: 0.2, repeat: [2, 2] }))); sack.position.y = 0.07; sack.scale.set(1, 1.15, 1); mg.add(sack);
        const rope = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.01, 5, 16), woodMat()); rope.rotation.x = Math.PI / 2; rope.position.y = -0.04; mg.add(rope);
        shadowed(mg);
        attachAligned(B.Head, mg, group, [0, 0, 0], [0, 0, 0], 1.0);
        const collar = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.022, 6, 16), darkIron()); collar.castShadow = true;
        const cg2 = new THREE.Group(); cg2.add(collar); collar.rotation.x = Math.PI / 2;
        attachAligned(B.Neck || B.Spine2, cg2, group, [0, -0.03, 0], [0, 0, 0], 1.0);
        const bomb = new THREE.Group();
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.2, 0.12), cached('bombbox', () => pbr('planks', { color: new THREE.Color(0.35, 0.3, 0.25), env: 0.2 }))); bomb.add(box);
        for (const sy of [-0.06, 0.06]) { const band = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.02, 0.125), darkIron()); band.position.y = sy; bomb.add(band); }
        const fuse = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 6), glowMat(14, 0.6, 0.2)); fuse.position.set(0.08, 0.07, 0.065); bomb.add(fuse);
        parts.fuse = fuse;
        shadowed(bomb);
        attachAligned(B.Spine2 || B.Spine1, bomb, group, [0, 0.0, 0.17], [0, 0, 0], 1.0);
        const chain = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.015, 6, 20), ironMat());
        const ch = new THREE.Group(); ch.add(chain); chain.rotation.set(1.3, 0, 0.4); shadowed(ch);
        attachAligned(B.Spine1 || B.Spine, ch, group, [0, 0, 0], [0, 0, 0], 1.0);
        parts.hunch = 0.1; parts.reach = 0.8;
      }
    }
  }
  return { group, root, B, mixer, actions, parts };
}

// ------------------------------------------------------------ менеджер врагов
export class Enemies {
  constructor(scene, ctx) {
    // ctx: { factionData, wave, audio, fx, lights, onPlayerHit, onKill, onHit, onEvent, explode }
    this.scene = scene; this.ctx = ctx;
    this.list = [];
    this.drops = [];
    this.squads = [];
    this.blasts = [];      // отложенные взрывы (смертник рвётся через миг после смерти) — по игровому времени
    this.fled = 0;
  }
  newSquad(opts = {}) {
    const s = { id: this.squads.length, members: [], leader: null, shaken: false, fled: false, testT: 0, alerted: false, ...opts };
    this.squads.push(s);
    return s;
  }
  spawn(key, cx, cz, opts = {}) {
    const u = this.ctx.factionData.units[key];
    const m = buildModel(u.model);
    const scale = u.scale || 1;
    m.group.scale.setScalar(scale);
    const hpMul = 1;   // полосы hp по броне не растут с волной: сложность даёт состав отрядов
    const e = {
      key, u, m, scale, x: opts.x ?? cellCenter(cx) + rr(-0.4, 0.4), z: opts.z ?? cellCenter(cz) + rr(-0.4, 0.4), yaw: opts.yaw ?? rr(-3, 3),
      hp: u.hp * hpMul, maxHp: u.hp * hpMul, alive: true, deadT: 0, speed: u.speed * rr(0.9, 1.1), curSpeed: 0,
      atkCd: rr(0.5, 1.5), aimT: 0, aimW: 0, attackT: 0, alert: !opts.guard, guard: !!opts.guard, voiceT: rr(1, 5), knock: V(), hitT: 0,
      strafe: Math.random() < 0.5 ? 1 : -1, strafeT: rr(1, 3), downT: 0, downTotal: 1, toughUsed: false, burstN: 0, burstT: 0, reloadT: 0, stillT: 0, hits: [], fleeT: 0,
      fuseT: 0, fleeing: false, charge: 1, retreatCd: 0, cleaveT: 0, squad: opts.squad || null, home: null, patrolT: rr(2, 6), patrol: null, dropY: 0, dropV: 0,
    };
    if (opts.drop) { e.dropY = WALL_H + 0.3; e.dropV = 1.6; }
    e.home = { x: e.x, z: e.z };
    if (e.squad) { e.squad.members.push(e); if (u.leader && !e.squad.leader) e.squad.leader = e; }
    m.group.position.set(e.x, heightAt(e.x, e.z) + e.dropY, e.z);
    m.mixer.update(Math.random() * 2);
    this.scene.add(m.group);
    m.group.updateMatrixWorld(true);
    this.list.push(e);
    return e;
  }
  clear() {
    for (const e of this.list) { this.scene.remove(e.m.group); e.alive = false; e.gone = true; e.hits.length = 0; }
    for (const d of this.drops) this.scene.remove(d.obj);
    this.list.length = 0; this.drops.length = 0; this.squads.length = 0; this.fled = 0; this.blasts.length = 0;
  }
  alive() { return this.list.filter((e) => e.alive).length; }
  // кто ещё воюет: бегущие волну не держат
  fighting() { return this.list.filter((e) => e.alive && !e.fleeing).length; }
  // бегущие, когда воевать больше некому, уходят с поля
  dismissFleeing(player) {
    for (const e of this.list) if (e.alive && e.fleeing && e.downT <= 0 && !los(e.x, e.z, player.x, player.z)) { e.alive = false; e.gone = true; this.fled++; }
  }
  hitboxes(e) {
    const B = e.m.B, out = [], s = e.scale;
    const add = (bone, r, mult, part, bone2) => {
      if (!bone) return;
      bone.getWorldPosition(_a);
      if (bone2) { bone2.getWorldPosition(_b); _a.lerp(_b, 0.5); }
      out.push([_a.x, _a.y, _a.z, r * s, mult, part]);
    };
    add(B.Head, 0.13, 2.6, 'head', B.HeadTop_End);
    add(B.Neck, 0.08, 2.6, 'head');
    add(B.Spine2, 0.2, 1.1, 'body'); add(B.Spine1, 0.19, 1.0, 'body'); add(B.Spine, 0.19, 1.0, 'body'); add(B.Hips, 0.18, 0.9, 'body');
    add(B.LeftUpLeg, 0.11, 0.6, 'leg', B.LeftLeg); add(B.RightUpLeg, 0.11, 0.6, 'leg', B.RightLeg);
    add(B.LeftLeg, 0.08, 0.5, 'leg', B.LeftFoot); add(B.RightLeg, 0.08, 0.5, 'leg', B.RightFoot);
    add(B.LeftArm, 0.07, 0.5, 'arm', B.LeftForeArm); add(B.RightArm, 0.07, 0.5, 'arm', B.RightForeArm);
    add(B.LeftForeArm, 0.06, 0.5, 'arm', B.LeftHand); add(B.RightForeArm, 0.06, 0.5, 'arm', B.RightHand);
    return out;
  }
  chest(e, out) { return (e.m.B.Spine2 || e.m.B.Spine).getWorldPosition(out); }
  // луч против всех врагов: ближайшее попадание
  raycast(ox, oy, oz, dx, dy, dz, maxT) {
    let best = maxT, hitE = null, hb = null;
    for (const e of this.list) {
      if (!e.alive) continue;
      const ex = e.x - ox, ez = e.z - oz;
      const along = ex * dx + ez * dz;
      if (along < -1 || along > best + 1) continue;
      if (Math.abs(ex * dz - ez * dx) > 1.3 * e.scale + (e.downT > 0 ? 0.8 : 0)) continue;
      for (const h of this.hitboxes(e)) {
        const lx = h[0] - ox, ly = h[1] - oy, lz = h[2] - oz;
        const tca = lx * dx + ly * dy + lz * dz; if (tca < 0) continue;
        const d2 = lx * lx + ly * ly + lz * lz - tca * tca; if (d2 > h[3] * h[3]) continue;
        const t = tca - Math.sqrt(h[3] * h[3] - d2);
        if (t > 0 && t < best) { best = t; hitE = e; hb = h; }
      }
    }
    return hitE ? { e: hitE, t: best, hb } : null;
  }
  // шум выстрела или взрыва поднимает гарнизон в радиусе
  noise(x, z, radius) {
    for (const e of this.list) if (e.alive && !e.alert && Math.hypot(e.x - x, e.z - z) < radius) this.alertOne(e, true);
  }
  alertOne(e, loud) {
    if (e.alert) return;
    e.alert = true; e.guard = false;
    if (loud) this.ctx.audio.shout(e.x, e.z, 0.8);
    if (e.squad && !e.squad.alerted) {
      e.squad.alerted = true;
      for (const o of e.squad.members) if (o.alive && !o.alert) { o.alert = true; o.guard = false; }
      this.ctx.onEvent && this.ctx.onEvent('alarm', e);
    }
  }
  // попадание: броня, сбивание с ног, TOUGH, смерть. Возвращает итог для интерфейса.
  damage(e, dmg, hx, hy, hz, dx, dz, part, opts = {}) {
    if (!e.alive) return null;
    const { audio, fx } = this.ctx;
    const u = e.u;
    // броня уже в запасе hp (GAME_MAPPING §1.5); IGNORE ARMOUR бьёт так, будто запаса брони нет
    if (opts.ignoreArmour && (u.armour || 0) < 0) dmg *= Math.max(1, u.hp / 90);
    if (opts.melee && e.downT > 0) dmg *= 1.3;          // по лежачему (стр. 49)
    if (opts.holy && u.demonic) dmg *= 1.3;
    e.hp -= dmg; e.hitT = 0.35;
    this.alertOne(e, false);
    const kb = opts.blast ? 3.5 : part === 'head' ? 1.2 : 2.2;
    e.knock.x += dx * kb; e.knock.z += dz * kb;
    audio.flesh(e.x, e.z, 0.5);
    if (hy !== undefined) {
      fx.blood(hx, hy, hz, dx, dz, part === 'head');
      fx.decal('blood', hx + dx * rr(0.4, 1.4), heightAt(hx + dx, hz + dz) + 0.005, hz + dz * rr(0.4, 1.4), 0, 1, 0, rr(0.4, 0.9));
    }
    this.ctx.onHit && this.ctx.onHit(e, part);
    if (e.hp <= 0) {
      if (u.tough && !e.toughUsed && part !== 'head') {
        e.toughUsed = true; e.hp = e.maxHp * 0.25;
        this.knockDown(e, 2.4, dx, dz);
        this.ctx.onEvent && this.ctx.onEvent('tough', e);
        return { down: true, tough: true };
      }
      this.kill(e, dx, dz, opts);
      return { killed: true };
    }
    const downAt = e.maxHp * (0.4 - 0.1 * Math.min(0, u.armour || 0));
    if (e.downT <= 0 && dmg >= downAt && !u.steadfast) { this.knockDown(e, rr(1.6, 2.4), dx, dz); return { down: true }; }
    if (Math.random() < 0.4) (u.model === 'fiend' ? audio.growl(e.x, e.z, 0.8) : audio.shout(e.x, e.z, 0.7));
    return { hit: true };
  }
  knockDown(e, t, dx = 0, dz = 0) {
    const already = e.downT > 0;
    e.downT = t; e.downTotal = already ? t + 0.3 : t; e.burstN = 0; e.aimT = 0; e.hits.length = 0; e.cleaveT = 0;
    e.knock.multiplyScalar(0.3);
    if (!already) e.downDir = (dx * Math.sin(e.yaw) + dz * Math.cos(e.yaw)) > 0 ? 1 : -1;
    this.onIncap(e);
  }
  kill(e, dx = 0, dz = 0, opts = {}) {
    const { audio } = this.ctx;
    // добитый на земле падает дальше из той позы, в которой лежал, а не встаёт на кадр
    const wasDown = e.downT > 0, x0 = wasDown ? e.m.group.rotation.x : 0;
    e.alive = false; e.deadT = 0; e.downT = 0; e.hits.length = 0;
    const fwd = wasDown ? e.downDir : (dx * Math.sin(e.yaw) + dz * Math.cos(e.yaw)) > 0 ? 1 : -1;
    e.fall = { dir: Math.random() < 0.5 ? 1 : -1, side: wasDown ? 0 : rr(-0.4, 0.4), spin: wasDown ? 0 : rr(-0.6, 0.6), fwd, x0, y0: wasDown ? -0.05 * Math.abs(x0) / 1.35 : 0 };
    e.m.mixer.stopAllAction();
    e.snap = [];
    e.m.root.traverse((o) => { if (o.isBone) e.snap.push([o, o.quaternion.clone()]); });
    if (e.m.parts.glint) e.m.parts.glint.visible = false;
    if (Math.random() < 0.75) audio.scream(e.x, e.z, 0.7);
    this.ctx.onKill && this.ctx.onKill(e, opts);
    // смертник может рвануть и мёртвым
    if (e.u.ai === 'bomber' && !opts.noChain && Math.random() < 0.4) {
      this.blasts.push({ t: 0.35, x: e.x, z: e.z, o: { radius: e.u.blast, dmg: e.u.dmg, owner: 'enemy', los: true, credit: !!opts.byPlayer } });
    } else if (Math.random() < (e.u.ai === 'rusher' || e.u.ai === 'bomber' ? 0.35 : 0.65)) this.spawnDrop(e.x, e.z);
    if (e.squad && e.squad.leader === e) { this.ctx.onEvent && this.ctx.onEvent('leader_down', e); e.squad.testT = 0; }
    this.onIncap(e);
  }
  // мораль: когда половина отряда лежит или выбыла, отряд проверяет боевой дух (стр. 21, 50)
  onIncap(e) {
    const s = e.squad; if (!s || s.fled) return;
    const n = s.members.length;
    if (n < 2) return;
    const down = s.members.filter((m) => !m.alive || m.downT > 0 || m.fleeing).length;
    if (down * 2 >= n && s.testT <= 0) this.moraleTest(s);
  }
  moraleTest(s) {
    const L = s.leader;
    const dice = L && L.alive && L.downT <= 0 ? 3 : 2;   // живой командир даёт +1 DICE
    s.testT = 7;
    if (roll2d6(dice) >= 7) return;
    if (!s.shaken) { s.shaken = true; this.ctx.onEvent && this.ctx.onEvent('shaken', s.members.find((m) => m.alive) || s.members[0]); return; }
    s.fled = true;
    for (const m of s.members) if (m.alive) { m.fleeing = true; m.alert = true; m.guard = false; }
    this.ctx.onEvent && this.ctx.onEvent('fled', s.members.find((m) => m.alive) || s.members[0]);
  }
  spawnDrop(x, z) {
    const o = cloneModel('ammo_box');
    o.position.set(x + rr(-0.3, 0.3), heightAt(x, z) + 0.02, z + rr(-0.3, 0.3));
    o.rotation.set(0, Math.random() * 6, Math.PI / 2);
    this.scene.add(o);
    this.drops.push({ obj: o, x: o.position.x, z: o.position.z, t: 0 });
  }
  update(dt, player) {
    for (let i = this.blasts.length - 1; i >= 0; i--) {
      const b = this.blasts[i];
      if ((b.t -= dt) > 0) continue;
      this.blasts.splice(i, 1);
      this.ctx.explode && this.ctx.explode(b.x, heightAt(b.x, b.z) + 0.6, b.z, b.o);
    }
    for (const s of this.squads) {
      if (s.testT > 0) s.testT -= dt;
      else if (!s.fled && s.members.length > 1) {
        const down = s.members.filter((m) => !m.alive || m.downT > 0 || m.fleeing).length;
        if (down * 2 >= s.members.length && s.members.some((m) => m.alive)) this.moraleTest(s);
      }
    }
    for (const e of this.list) this.updateOne(e, dt, player);
    for (let i = this.list.length - 1; i >= 0; i--) {
      const e = this.list[i];
      if ((!e.alive && e.deadT > 40) || e.gone) { this.scene.remove(e.m.group); this.list.splice(i, 1); }
    }
    if (this.list.length > 34) { const i = this.list.findIndex((e) => !e.alive); if (i >= 0) { this.scene.remove(this.list[i].m.group); this.list.splice(i, 1); } }
  }
  // отброс от попаданий: не больше 0,25 м за кадр, иначе тело проскочит сквозь стенку окопа
  knockStep(e, dt) {
    let kx = e.knock.x * dt, kz = e.knock.z * dt;
    const kl = Math.hypot(kx, kz);
    if (kl > 0.25) { kx *= 0.25 / kl; kz *= 0.25 / kl; }
    e.x += kx; e.z += kz;
  }
  // куда бежать от игрока: соседняя клетка, которая дальше по полю пути
  fleeDir(e) {
    const cx = clamp(cellOf(e.x), 0, GW - 1), cz = clamp(cellOf(e.z), 0, GH - 1);
    let best = flow[idx(cx, cz)], bx = cx, bz = cz;
    for (const [ox, oz] of DIRS) {
      const nx = cx + ox, nz = cz + oz;
      if (solid(nx, nz)) continue;
      const v = flow[idx(nx, nz)];
      if (v > best) { best = v; bx = nx; bz = nz; }
    }
    if (bx === cx && bz === cz) return [0, 0];
    const tx = cellCenter(bx) - e.x, tz = cellCenter(bz) - e.z, tl = Math.hypot(tx, tz) || 1;
    return [tx / tl, tz / tl];
  }
  // видит ли враг игрока: поднятые по тревоге видят далеко, часовые — по заметности игрока и в секторе взгляда
  sees(e, player, dist) {
    if (dist > 70) return false;
    if (!e.alert) {
      const sight = player.sight ?? 40;
      if (dist > sight) return false;
      const fx = Math.sin(e.yaw), fz = Math.cos(e.yaw);
      if (dist > 4 && ((player.x - e.x) * fx + (player.z - e.z) * fz) / dist < 0.1) return false;
    }
    return los(e.x, e.z, player.x, player.z);
  }
  updateOne(e, dt, player) {
    const { audio } = this.ctx;
    const m = e.m, u = e.u;
    if (e.gone) return;                       // ушёл с поля: тела нет, убираем в конце кадра
    if (!e.alive) { this.updateDeath(e, dt); return; }
    const dx = player.x - e.x, dz = player.z - e.z, dist = Math.hypot(dx, dz);
    e.atkCd -= dt; e.voiceT -= dt; e.hitT -= dt; e.retreatCd -= dt;
    // спрыгивает в окоп с бруствера
    if (e.dropY > 0) {
      e.dropV -= 9.8 * dt; e.dropY = Math.max(0, e.dropY + e.dropV * dt);
      if (e.dropY === 0) { e.hitT = 0.35; audio.step(1.6, 1); audio.boardStep(0.8); }
    }
    // сбит с ног: лежит, потом встаёт с половинной скоростью (стр. 20, 49)
    if (e.downT > 0) {
      e.downT -= dt;
      e.knock.multiplyScalar(Math.pow(0.02, dt));
      this.animate(e, dt, 0);
      this.updateDown(e);
      return;
    }
    const see = this.sees(e, player, dist);
    if (see && !e.alert) this.alertOne(e, true);
    for (let i = e.hits.length - 1; i >= 0; i--) {
      const h = e.hits[i];
      if ((h.t -= dt) > 0) continue;
      e.hits.splice(i, 1);
      if (dist < h.r) this.ctx.onPlayerHit(h.dmg, e.x, e.z, 'melee', { unit: e });
    }
    const shaken = e.squad && e.squad.shaken;
    let mvx = 0, mvz = 0, faceX = dx, faceZ = dz, aiming = false;
    if (e.fleeing) {
      e.fleeT += dt;
      [mvx, mvz] = this.fleeDir(e); faceX = mvx || dx; faceZ = mvz || dz;
      const stuck = mvx === 0 && mvz === 0;
      if (!see && (dist > 26 || stuck || e.fleeT > 8)) { e.gone = true; e.alive = false; this.fled++; return; }
      if (stuck && see) { e.fleeing = false; e.charge = 1; }   // загнан в угол и на виду — дерётся
      if (e.voiceT <= 0) { e.voiceT = rr(2, 4); audio.scream(e.x, e.z, 0.4); }
    } else if (e.guard && !e.alert) {
      // часовой: стоит или ходит у своего поста
      e.patrolT -= dt;
      if (e.patrolT <= 0) {
        e.patrolT = rr(4, 9);
        const a = rr(0, 6.28), r = rr(0, 2.2);
        e.patrol = Math.random() < 0.55 ? { x: e.home.x + Math.cos(a) * r, z: e.home.z + Math.sin(a) * r } : null;
      }
      if (e.patrol) {
        const px = e.patrol.x - e.x, pz = e.patrol.z - e.z, pd = Math.hypot(px, pz);
        if (pd > 0.3) { mvx = px / pd * 0.35; mvz = pz / pd * 0.35; faceX = px; faceZ = pz; } else e.patrol = null;
      } else { faceX = Math.sin(e.yaw); faceZ = Math.cos(e.yaw); }
    } else if (u.ai === 'rusher' || u.ai === 'bomber') {
      [mvx, mvz, faceX, faceZ] = this.aiMelee(e, dt, player, dx, dz, dist, see, shaken);
    } else {
      [mvx, mvz, faceX, faceZ, aiming] = this.aiRanged(e, dt, player, dx, dz, dist, see, shaken);
    }
    // расталкивание и препятствия
    for (const o of this.list) {
      if (o === e || !o.alive) continue;
      const ox = e.x - o.x, oz = e.z - o.z, od = Math.hypot(ox, oz);
      if (od < 0.7 && od > 1e-3) { mvx += (ox / od) * 0.6; mvz += (oz / od) * 0.6; }
    }
    const ml = Math.hypot(mvx, mvz);
    const rising = e.riseT > 0 ? 0.5 : 1;
    if (e.riseT > 0) e.riseT -= dt;
    const sp = e.speed * e.charge * rising * (e.hitT > 0 ? 0.3 : 1) * (e.dropY > 0 ? 0 : 1) * (e.fleeing ? 1.25 : 1) * Math.min(1, ml);
    if (ml > 1e-3) { mvx /= ml; mvz /= ml; }
    e.curSpeed = lerp(e.curSpeed, sp, damp(6, dt));
    e.x += mvx * e.curSpeed * dt; e.z += mvz * e.curSpeed * dt;
    this.knockStep(e, dt);
    e.knock.multiplyScalar(Math.pow(0.02, dt));
    collide(e, 0.3);
    for (const c of dressing.colliders) {
      const cx = e.x - c.x, cz = e.z - c.z, cd = Math.hypot(cx, cz), r = c.r + 0.28;
      if (cd < r && cd > 1e-4) { e.x = c.x + cx / cd * r; e.z = c.z + cz / cd * r; }
    }
    const targetYaw = Math.atan2(faceX, faceZ);
    let dy = targetYaw - e.yaw; while (dy > Math.PI) dy -= Math.PI * 2; while (dy < -Math.PI) dy += Math.PI * 2;
    e.yaw += dy * damp(aiming ? 10 : 7, dt);
    this.animate(e, dt, e.curSpeed);
    e.aimW = lerp(e.aimW, aiming ? 1 : 0, damp(5, dt));
    this.pose(e, dt, player, dist);
    // фитиль смертника мигает, блик оптики снайпера разгорается
    if (m.parts.fuse) m.parts.fuse.visible = e.fuseT > 0 ? Math.floor(e.fuseT * 14) % 2 === 0 : Math.floor(performance.now() / 600) % 2 === 0;
    if (m.parts.glint) {
      const k = aiming && u.ai === 'sniper' ? clamp(e.aimT / u.aim, 0, 1) : 0;
      m.parts.glint.material.color.setRGB(40 * k * k, 34 * k * k, 26 * k * k);
      m.parts.glint.scale.setScalar(0.15 + k * 0.35);
    }
  }
  aiMelee(e, dt, player, dx, dz, dist, see, shaken) {
    const u = e.u, { audio } = this.ctx;
    let mvx = 0, mvz = 0, faceX = dx, faceZ = dz;
    const reach = u.reach || 1.5;
    if (u.ai === 'bomber') {
      if (e.fuseT > 0) {
        e.fuseT -= dt;
        if (Math.floor(e.fuseT * 8) !== Math.floor((e.fuseT + dt) * 8)) audio.tone({ type: 'square', f: 1900, dur: 0.05, vol: 0.12, pan: audio.panOf(e.x, e.z) });
        if (e.fuseT <= 0) {
          const x = e.x, z = e.z;
          this.kill(e, 0, 0, { noChain: true, exploded: true });
          e.m.group.visible = false; e.gone = true;
          this.ctx.explode && this.ctx.explode(x, heightAt(x, z) + 0.8, z, { radius: u.blast, dmg: u.dmg, owner: 'enemy', los: true });
          return [0, 0, dx, dz];
        }
      } else if (dist < reach && player.hp > 0) { e.fuseT = 0.75; audio.shout(e.x, e.z, 1); }
    } else if (dist < reach && player.hp > 0) {
      if (e.atkCd <= 0) this.swing(e, player);
    } else if (dist < reach + 0.5 && e.retreatCd <= 0 && player.hp > 0) {
      // отход из клинча даёт врагу бесплатный удар (стр. 37)
      const away = (player.vx * dx + player.vz * dz) / Math.max(dist, 0.01);
      if (away > 1.2) { e.retreatCd = 2.5; e.atkCd = 0; this.swing(e, player, reach + 0.6); }
    }
    if (e.cleaveT > 0) { e.cleaveT -= dt; if (e.cleaveT <= 0) this.swing(e, player, reach + 0.3, true); }
    if (dist >= reach * 0.8) {
      if (see && dist < 14) { mvx = dx / dist; mvz = dz / dist; } else { [mvx, mvz] = flowDir(e.x, e.z); faceX = mvx; faceZ = mvz; }
    }
    // атака с разбега: увидев игрока ближе 30 м, враг ускоряется (Movement + d6, стр. 36)
    if (see && dist < 30 && e.charge === 1 && !shaken) e.charge = 1 + (1 + Math.floor(Math.random() * 6)) * 0.06;
    else if (!see || dist > 34) e.charge = 1;
    if (shaken) e.charge = 0.8;
    if (e.voiceT <= 0 && dist < 32) {
      e.voiceT = rr(2.5, 6);
      u.model === 'fiend' ? audio.growl(e.x, e.z) : u.model === 'wretched' ? audio.growl(e.x, e.z, 0.6) : audio.chant(e.x, e.z);
    }
    return [mvx, mvz, faceX, faceZ];
  }
  swing(e, player, range, second = false) {
    const u = e.u, { audio } = this.ctx;
    e.atkCd = u.atkCd || 1.1; e.attackT = 0.45;
    audio.swing();
    const r = range || (u.reach || 1.5) + 0.4;
    e.hits.push({ t: 0.22, r, dmg: u.dmg * rr(0.85, 1.15) });
    if (u.cleave && !second) e.cleaveT = 0.5;   // CLEAVE 2: второй удар следом
  }
  aiRanged(e, dt, player, dx, dz, dist, see, shaken) {
    const u = e.u;
    let mvx = 0, mvz = 0, faceX = dx, faceZ = dz, aiming = false;
    if (e.burstN > 0) {
      // очередь идёт: стоим и стреляем
      aiming = true; e.burstT -= dt;
      if (e.burstT <= 0) { this.shoot(e, dist, player); e.burstN--; e.burstT = u.burstGap || 0.1; if (e.burstN === 0) { if (u.reload) e.reloadT = u.reload; e.atkCd = u.fireCd ? rr(...u.fireCd) : 0.5; } }
      if (!u.fireOnMove) return [0, 0, dx, dz, true];
    }
    if (e.reloadT > 0) e.reloadT -= dt;
    const heavy = u.ai === 'heavy', sniper = u.ai === 'sniper';
    if (see && dist < u.range) {
      aiming = e.reloadT <= 0;
      e.aimT += dt;
      e.strafeT -= dt; if (e.strafeT < 0) { e.strafe *= -1; e.strafeT = rr(1, 2.5); }
      const [near, far] = sniper ? [18, 60] : u.fireOnMove ? [7, 14] : heavy ? [10, 32] : [6, 15];
      if (sniper && dist < near) [mvx, mvz] = this.fleeDir(e);
      else if (dist > far) { mvx = dx / dist * 0.55; mvz = dz / dist * 0.55; }
      else if (!heavy && !sniper && dist < near) { mvx = -dx / dist * 0.5; mvz = -dz / dist * 0.5; }
      else if (!heavy && !sniper) { mvx = -dz / dist * e.strafe * 0.3; mvz = dx / dist * e.strafe * 0.3; }
      // HEAVY: стреляет только с места
      if (e.curSpeed < 0.35) e.stillT += dt; else e.stillT = 0;
      const ready = e.aimT > (u.aim || 1) && e.atkCd <= 0 && e.reloadT <= 0 && e.aimW > 0.8 && e.burstN === 0 && (!heavy || e.stillT > 0.45);
      if (ready) { e.burstN = u.burst || 1; e.burstT = 0; e.aimT = sniper ? 0 : e.aimT * 0.3; }
      if (shaken) { mvx *= 0.5; mvz *= 0.5; }
    } else {
      e.aimT = Math.max(0, e.aimT - dt * (sniper ? 2 : 1));
      e.stillT = 0;
      [mvx, mvz] = flowDir(e.x, e.z); faceX = mvx; faceZ = mvz;   // нет видимости — ищем позицию
    }
    if (e.voiceT <= 0 && see && dist < 30) { e.voiceT = rr(4, 9); this.ctx.audio.shout(e.x, e.z, 0.6); }
    return [mvx, mvz, faceX, faceZ, aiming];
  }
  animate(e, dt, s) {
    const m = e.m, A = m.actions;
    m.group.position.set(e.x, heightAt(e.x, e.z) + e.dropY, e.z);
    if (e.downT <= 0) m.group.rotation.set(0, e.yaw, 0);
    // смешиваем idle/walk/run по скорости
    const sc = s / e.scale;
    const wIdle = clamp(1 - sc / 0.8, 0, 1), wRun = clamp((sc - 2.6) / 1.4, 0, 1), wWalk = clamp(1 - wIdle - wRun, 0, 1);
    if (A.idle) A.idle.setEffectiveWeight(wIdle);
    if (A.walk) { A.walk.setEffectiveWeight(wWalk); A.walk.timeScale = clamp(sc / 1.5, 0.6, 1.6); }
    if (A.run) { A.run.setEffectiveWeight(wRun); A.run.timeScale = clamp(sc / 3.8, 0.8, 1.5); }
    m.mixer.update(dt);
    m.group.updateMatrixWorld(true);
  }
  // упал навзничь и поднимается: поворот всего тела у ступней
  updateDown(e) {
    const m = e.m, B = m.B;
    const t = e.downTotal - e.downT;
    const fall = clamp(t / 0.3, 0, 1), rise = clamp(e.downT / 0.7, 0, 1);
    const k = Math.min(fall * fall, rise);
    const right = V().set(-Math.cos(e.yaw), 0, Math.sin(e.yaw));
    m.group.rotation.set(e.downDir * k * 1.35, e.yaw, 0, 'YXZ');
    m.group.position.y -= k * 0.05;
    m.group.updateMatrixWorld(true);
    if (B.Spine1) rotateBoneWorld(B.Spine1, right, -e.downDir * 0.4 * k);
    if (B.LeftLeg) rotateBoneWorld(B.LeftLeg, right, 0.7 * k);
    if (e.downT <= 0) { e.riseT = 1.2; e.m.group.rotation.set(0, e.yaw, 0); }
  }
  // процедурные слои поверх анимации
  pose(e, dt, player, dist) {
    const m = e.m, B = m.B, P = m.parts;
    const fwd = _n.set(Math.sin(e.yaw), 0, Math.cos(e.yaw));
    const right = V().set(-Math.cos(e.yaw), 0, Math.sin(e.yaw));
    if (P.hunch && B.Spine) {
      rotateBoneWorld(B.Spine, right, -P.hunch * 0.5);
      if (B.Spine1) rotateBoneWorld(B.Spine1, right, -P.hunch * 0.35);
      if (B.Neck) rotateBoneWorld(B.Neck, right, P.hunch * 0.55);
    }
    if (e.hitT > 0 && B.Spine1) rotateBoneWorld(B.Spine1, right, Math.sin(e.hitT / 0.35 * Math.PI) * 0.35);
    if (P.rifleHolder) {
      // винтовка: в покое у груди наискось, при прицеливании — к плечу, на игрока
      const chest = B.Spine2.getWorldPosition(V());
      const aimPitch = Math.atan2(player.eyeY - 1.45 * e.scale - heightAt(e.x, e.z), Math.max(dist, 1));
      const holder = P.rifleHolder;
      const w = e.aimW;
      const cy = (chest.y - m.group.position.y) / e.scale;
      holder.position.set(lerp(-0.08, -0.16, w), lerp(cy - 0.32, cy + 0.12, w), lerp(0.34, 0.46, w));
      holder.rotation.set(lerp(-0.5, -aimPitch, w), lerp(0.8, 0.0, w), lerp(0.5, 0, w), 'YXZ');
      holder.updateMatrixWorld(true);
      const tgtR = P.grip.getWorldPosition(V()), tgtL = P.fore.getWorldPosition(V());
      const s = e.scale;
      const poleR = chest.clone().addScaledVector(right, 0.7 * s).add(V().set(0, -0.6 * s, 0)).addScaledVector(fwd, -0.2 * s);
      const poleL = chest.clone().addScaledVector(right, -0.6 * s).add(V().set(0, -0.7 * s, 0)).addScaledVector(fwd, 0.3 * s);
      ik2(B.RightArm, B.RightForeArm, B.RightHand, tgtR, poleR, 1);
      ik2(B.LeftArm, B.LeftForeArm, B.LeftHand, tgtL, poleL, 1);
    } else {
      // рукопашник тянется к игроку, удар — дугой сверху вниз
      const s = e.scale;
      const reach = clamp(1 - (dist - 1.2) / 6, 0, 1) * P.reach;
      const at = e.attackT > 0 ? 1 - e.attackT / 0.45 : -1;
      if (e.attackT > 0) e.attackT -= dt;
      for (const side of [-1, 1]) {
        const arm = side > 0 ? B.RightArm : B.LeftArm, fore = side > 0 ? B.RightForeArm : B.LeftForeArm, hand = side > 0 ? B.RightHand : B.LeftHand;
        const s0 = arm.getWorldPosition(V());
        const tgt = s0.clone().addScaledVector(fwd, (0.55 + reach * 0.25) * s).addScaledVector(right, side * 0.12 * s).add(V().set(0, (-0.05 + Math.sin(performance.now() / 160 + side) * 0.06) * s, 0));
        if (at >= 0 && side > 0) {
          const ang = lerp(-1.2, 1.5, at);
          tgt.copy(s0).addScaledVector(fwd, (0.35 + Math.sin(at * Math.PI) * 0.4) * s).add(V().set(0, Math.cos(ang) * 0.55 * (at < 0.4 ? 1 : 0.6) * s, 0)).addScaledVector(right, 0.1 * s);
        }
        const pole = s0.clone().addScaledVector(right, side * 0.5 * s).add(V().set(0, -0.6 * s, 0)).addScaledVector(fwd, -0.3 * s);
        const blend = (P.reach >= 1 ? reach * 0.8 : reach * 0.3) + (at >= 0 && side > 0 ? 1 : 0);
        if (blend > 0.01) ik2(arm, fore, hand, tgt, pole, clamp(blend, 0, 1));
      }
    }
  }
  shoot(e, dist, player) {
    const { audio, fx, lights } = this.ctx;
    const u = e.u;
    if (!e.m.parts.muzzle) return;
    e.m.parts.muzzle.getWorldPosition(_a);
    lights.muzzleFlash(_a, true);
    audio.enemyShot(e.x, e.z, u.ai === 'heavy' && u.burst === 1 ? 1.6 : u.ai === 'sniper' ? 1.3 : 1);
    const dir = _b.set(player.x - _a.x, player.eyeY - _a.y, player.z - _a.z).normalize();
    fx.muzzleSmoke(_a, dir, u.burst > 1 ? 0.5 : 1);
    // бросок успеха по ступеням (стр. 15–16, 43): укрытие, дальность, бег цели, дрожь отряда
    let step = u.ranged || 0;
    const tags = [];
    if (player.crouch > 0.5) { step -= 1; tags.push('cover'); }
    if (u.ai !== 'sniper' && dist > u.range * 0.5) { step -= 1; tags.push('long_range'); }
    if (Math.hypot(player.vx, player.vz) > 3.4) step -= 1;   // [допущение] бегущую цель труднее поймать
    if (e.squad && e.squad.shaken) step -= 1;
    if (e.dropY > 0.5) step += 1;                              // стрелок выше цели (стр. 43)
    const roll = rollStep(step);
    if (roll >= 7) {
      const crit = roll >= 12;
      const k = crit ? (u.critical ? 1.5 : 1.3) : 1;
      this.ctx.onPlayerHit(u.dmg * rr(0.85, 1.15) * k, e.x, e.z, 'bullet', { unit: e, crit, big: u.dmg >= 40 });
    } else {
      audio.crack(-audio.panOf(e.x, e.z));
      if (Math.random() < 0.6) {
        const mx = player.x + rr(-1.2, 1.2), mz = player.z + rr(-1.2, 1.2);
        fx.impact(mx, heightAt(mx, mz) + 0.01, mz, 0, 1, 0, 1);
      }
    }
  }
  updateDeath(e, dt) {
    const m = e.m, B = m.B, f = e.fall;
    e.deadT += dt;
    if (e.deadT > 1.2 && e.settled) return;
    for (const [b, q] of e.snap) b.quaternion.copy(q);
    const t = clamp(e.deadT / 0.75, 0, 1);
    const ease = t * t;
    // подкашиваются ноги, корпус складывается, тело падает
    m.group.rotation.set(lerp(f.x0 || 0, f.fwd * 1.45, ease), e.yaw + f.spin * ease, f.side * ease, 'YXZ');
    this.knockStep(e, dt); e.knock.multiplyScalar(Math.pow(0.05, dt));
    collide(e, 0.3);
    e.dropY = Math.max(0, e.dropY - dt * 6);
    m.group.position.set(e.x, heightAt(e.x, e.z) + 0.02 + lerp(f.y0 || 0, -0.08, ease) + e.dropY, e.z);
    m.group.updateMatrixWorld(true);
    const right = V().set(-Math.cos(e.yaw), 0, Math.sin(e.yaw)).applyAxisAngle(UP, f.spin * ease);
    const k = Math.min(1, e.deadT / 0.5);
    if (B.Spine1) rotateBoneWorld(B.Spine1, right, -f.fwd * 0.45 * k);
    if (B.LeftLeg) rotateBoneWorld(B.LeftLeg, right, 0.9 * k);
    if (B.RightLeg) rotateBoneWorld(B.RightLeg, right, 0.55 * k);
    if (B.LeftArm) rotateBoneWorld(B.LeftArm, right, -0.6 * k * f.dir);
    if (B.Head) rotateBoneWorld(B.Head, right, -0.5 * k * f.fwd);
    if (e.deadT > 1.2) e.settled = true;
  }
}
