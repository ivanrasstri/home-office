// Враги: скелетные модели с mocap-анимациями, IK рук, оружие, ИИ, попадания, смерть.
import * as THREE from 'three';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import { MODELS, TEX, cloneModel, addPatch, pbr } from './assets.js';
import { CELL, GW, GH } from './config.js';
import { solid, idx, cellCenter, flow, flowDir, los, collide, heightAt } from './trenchmap.js';
import { dressing } from './dressing.js';
import { clamp, lerp, rr, damp } from './util.js';

const V = () => new THREE.Vector3();
const _a = V(), _b = V(), _c = V(), _t = V(), _e = V(), _n = V(), _d1 = V(), _d2 = V();
const _q = new THREE.Quaternion(), _qw = new THREE.Quaternion(), _qp = new THREE.Quaternion(), _qi = new THREE.Quaternion();
const UP = new THREE.Vector3(0, 1, 0);
export let MASK_YAW = 0;
export function setMaskYaw(v) { MASK_YAW = v; }

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
  let d = _a.distanceTo(_t);
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
  const pos = bone.getWorldPosition(V()).add(V().set(...offset).applyQuaternion(gq));
  const q = gq.clone().multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(rot[0], rot[1], rot[2], 'YXZ')));
  _m1.compose(pos, q, V().set(scale, scale, scale));
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
function skinMaterial(kind) {
  if (kind === 'ghoul') {
    const m = pbr('leather', { color: new THREE.Color(0.16, 0.045, 0.03), env: 0.35, repeat: [4, 4], normalScale: 1.6 });
    m.roughness = 0.55;
    return addPatch(m, 'ghoulskin', (s) => {
      s.fragmentShader = s.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float vein = smoothstep(0.62, 0.7, fract(sin(dot(floor(vMapUv * 40.0), vec2(12.9898, 78.233))) * 43758.5453));
        totalEmissiveRadiance += vec3(0.35, 0.06, 0.0) * vein * 0.0;`);
    });
  }
  // кающийся: мешковина, перетянутая ремнями
  return pbr('hessian', { color: new THREE.Color(0.36, 0.3, 0.24), env: 0.2, repeat: [6, 6] });
}

// ------------------------------------------------------------ сборка моделей
const FACTION_COLORS = {
  legion: { key: 'L', metal: [0.11, 0.095, 0.09], cloth: [0.07, 0.035, 0.03], leather: [0.05, 0.035, 0.03] },
  antioch: { key: 'A', metal: [0.17, 0.17, 0.12], cloth: [0.21, 0.18, 0.12], leather: [0.12, 0.08, 0.05] },
};
const helmetGeo = {};
function brodieHelmet() {
  if (!helmetGeo.brodie) {
    const pts = [[0, 0.115], [0.06, 0.112], [0.105, 0.09], [0.13, 0.05], [0.14, 0.012], [0.175, 0.0], [0.19, -0.008], [0.188, -0.014], [0.17, -0.006], [0.0, -0.006]].map((p) => new THREE.Vector2(p[0], p[1]));
    helmetGeo.brodie = new THREE.LatheGeometry(pts, 24);
  }
  return helmetGeo.brodie;
}
function spikedHelmet() {
  if (!helmetGeo.spiked) {
    const pts = [[0, 0.14], [0.05, 0.135], [0.1, 0.11], [0.125, 0.06], [0.132, 0.0], [0.14, -0.06], [0.155, -0.1], [0.15, -0.105], [0.0, -0.1]].map((p) => new THREE.Vector2(p[0], p[1]));
    helmetGeo.spiked = new THREE.LatheGeometry(pts, 20);
  }
  return helmetGeo.spiked;
}
let rifleMesh = null;
function enemyRifle() {
  if (!rifleMesh) {
    rifleMesh = MODELS.rifle.scene.clone(true);
    rifleMesh.traverse((o) => { if (o.name === 'bolt_action_rifle_7_62_scope') o.visible = false; });
  }
  const r = rifleMesh.clone(true);
  r.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return r;
}

function buildModel(kind) {
  const src = kind === 'legion' || kind === 'antioch' ? MODELS.soldier : MODELS.xbot;
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
  if (src === MODELS.soldier) root.rotation.y = Math.PI;   // модель солдата смотрит в -z
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
  const parts = { B, extras: {} };
  if (kind === 'legion' || kind === 'antioch') {
    root.traverse((o) => { if (o.isSkinnedMesh && o.visible) o.material = armorMaterial(o.material, FACTION_COLORS[kind]); });
    // противогаз (фотоскан) на лицо
    const mask = cloneModel('gasmask');
    const holder = new THREE.Group(); holder.add(mask);
    mask.position.set(0, -0.99, 0.0);
    attachAligned(B.Head, holder, group, [0, 0.07, 0.1], [0, MASK_YAW, 0], 1.05);
    // каска
    const helm = new THREE.Mesh(kind === 'antioch' ? brodieHelmet() : spikedHelmet(), kind === 'antioch'
      ? pbr('helmet', { color: new THREE.Color(0.55, 0.58, 0.45), metal: true, env: 0.8 })
      : pbr('rust', { color: new THREE.Color(0.25, 0.2, 0.2), metal: true, env: 0.8 }));
    helm.castShadow = true;
    const hh = new THREE.Group(); hh.add(helm);
    helm.position.set(0, kind === 'antioch' ? 0.17 : 0.14, 0.0);
    if (kind === 'legion') {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.2, 6), helm.material);
      spike.position.set(0, 0.36, 0); hh.add(spike);
      for (const sx of [-1, 1]) { const s2 = new THREE.Mesh(new THREE.ConeGeometry(0.015, 0.13, 5), helm.material); s2.position.set(sx * 0.12, 0.25, -0.02); s2.rotation.z = -sx * 0.9; hh.add(s2); }
    }
    attachAligned(B.Head, hh, group, [0, 0.0, 0.0], [0, 0, 0], 1.0);
    // винтовка в руках: дуло по +z держателя
    parts.rifle = enemyRifle();
    parts.rifle.rotation.set(0, -Math.PI / 2, 0);
    const rifleHolder = new THREE.Group(); rifleHolder.add(parts.rifle);
    group.add(rifleHolder);
    parts.rifleHolder = rifleHolder;
    parts.muzzle = new THREE.Object3D(); parts.muzzle.position.set(0, 0.045, 0.64); rifleHolder.add(parts.muzzle);
    parts.grip = new THREE.Object3D(); parts.grip.position.set(0, -0.01, -0.42); rifleHolder.add(parts.grip);
    parts.fore = new THREE.Object3D(); parts.fore.position.set(0, 0.03, 0.1); rifleHolder.add(parts.fore);
  } else if (kind === 'ghoul') {
    const skin = skinMaterial('ghoul');
    root.traverse((o) => { if (o.isSkinnedMesh) o.material = o.material.name.includes('Joint') ? new THREE.MeshStandardMaterial({ color: 0x120404, roughness: 0.6 }) : skin; });
    for (const n of ['LeftArm', 'RightArm', 'LeftForeArm', 'RightForeArm']) if (B[n]) { B[n].scale.set(0.82, 1.22, 0.82); }
    for (const n of ['LeftHand', 'RightHand']) if (B[n]) B[n].scale.set(1.3, 1.5, 1.3);
    if (B.Neck) B.Neck.scale.set(0.9, 1.25, 0.9);
    // рога и глаза
    const hornMat = new THREE.MeshStandardMaterial({ color: 0x1a1210, roughness: 0.45 });
    const hg = new THREE.Group();
    for (const sx of [-1, 1]) {
      const curve = new THREE.CatmullRomCurve3([V().set(sx * 0.06, 0.12, 0.02), V().set(sx * 0.13, 0.2, -0.04), V().set(sx * 0.15, 0.3, -0.14), V().set(sx * 0.1, 0.36, -0.25)]);
      const g = new THREE.TubeGeometry(curve, 12, 0.028, 6);
      const p = g.attributes.position; // сужаем к концу
      const horn = new THREE.Mesh(g, hornMat); horn.castShadow = true; hg.add(horn);
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.016, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(9, 2.2, 0.4) }));
      eye.position.set(sx * 0.045, 0.06, 0.1); hg.add(eye);
    }
    attachAligned(B.Head, hg, group, [0, 0, 0], [0, 0, 0], 1.0);
    parts.hunch = 0.5;
  } else if (kind === 'penitent') {
    const cloth = skinMaterial('penitent');
    root.traverse((o) => { if (o.isSkinnedMesh) o.material = o.material.name.includes('Joint') ? new THREE.MeshStandardMaterial({ color: 0x1a1612, roughness: 0.9 }) : cloth; });
    // ряса до голеней
    const robe = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.36, 0.78, 14, 3, true), pbr('hessian', { color: new THREE.Color(0.26, 0.19, 0.15), env: 0.2, repeat: [3, 2], side: THREE.DoubleSide }));
    robe.castShadow = true;
    const rg = new THREE.Group(); rg.add(robe); robe.position.y = -0.36;
    attachAligned(B.Hips, rg, group, [0, 0, 0], [0, 0, 0], 1.0);
    parts.robe = rg;
    // железная маска и цепи
    const iron = pbr('rust', { color: new THREE.Color(0.35, 0.33, 0.32), metal: true, env: 0.9 });
    const mg = new THREE.Group();
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.2, 0.03), iron); plate.position.set(0, 0.07, 0.105); mg.add(plate);
    const slit = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.016, 0.04), new THREE.MeshBasicMaterial({ color: 0x000000 })); slit.position.set(0, 0.1, 0.115); mg.add(slit);
    const cross = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.16, 0.03), iron); cross.position.set(0, 0.06, 0.122); mg.add(cross);
    attachAligned(B.Head, mg, group, [0, 0, 0], [0, 0, 0], 1.0);
    const chain = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.015, 6, 20), iron);
    const cg = new THREE.Group(); cg.add(chain); chain.rotation.set(1.3, 0, 0.4);
    attachAligned(B.Spine2 || B.Spine1, cg, group, [0, 0, 0], [0, 0, 0], 1.0);
    // цеп
    const fl = new THREE.Group();
    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.02, 0.5, 6), pbr('bark', { env: 0.2 })); handle.position.y = 0.0; fl.add(handle);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), iron); ball.position.set(0, -0.42, 0.05); fl.add(ball);
    for (let i = 1; i < 5; i++) { const l = new THREE.Mesh(new THREE.TorusGeometry(0.015, 0.005, 4, 8), iron); l.position.set(0, -0.25 - i * 0.035, 0.01 * i); l.rotation.y = i * 1.4; fl.add(l); }
    fl.traverse((o) => { if (o.isMesh) o.castShadow = true; });
    attachAligned(B.RightHand, fl, group, [0, -0.08, 0.02], [0, 0, 0], 1.0);
    parts.hunch = 0.18;
  }
  return { group, root, B, mixer, actions, parts };
}

// ------------------------------------------------------------ менеджер врагов
export class Enemies {
  constructor(scene, ctx) {
    this.scene = scene; this.ctx = ctx;    // ctx: { player, faction, onPlayerHit, audio, fx, lights }
    this.list = [];
    this.drops = [];
  }
  spawn(kind, cx, cz) {
    const fc = this.ctx.factionData[kind];
    const m = buildModel(fc.model);
    const e = {
      kind, fc, m, x: cellCenter(cx) + rr(-0.4, 0.4), z: cellCenter(cz) + rr(-0.4, 0.4), yaw: 0,
      hp: fc.hp * (1 + this.ctx.wave() * 0.04), alive: true, deadT: 0, speed: fc.speed * rr(0.9, 1.1), curSpeed: 0,
      atkCd: rr(0.5, 1.5), aimT: 0, aimW: 0, attackT: 0, alert: false, voiceT: rr(1, 5), knock: V(), hitT: 0,
      strafe: Math.random() < 0.5 ? 1 : -1, strafeT: rr(1, 3), animPh: Math.random(),
    };
    m.group.position.set(e.x, heightAt(e.x, e.z), e.z);
    m.mixer.update(Math.random() * 2);
    this.scene.add(m.group);
    m.group.updateMatrixWorld(true);
    this.list.push(e);
    return e;
  }
  clear() {
    for (const e of this.list) this.scene.remove(e.m.group);
    for (const d of this.drops) this.scene.remove(d.obj);
    this.list.length = 0; this.drops.length = 0;
  }
  alive() { return this.list.filter((e) => e.alive).length; }
  hitboxes(e) {
    const B = e.m.B, out = [];
    const add = (bone, r, mult, part, bone2) => {
      if (!bone) return;
      bone.getWorldPosition(_a);
      if (bone2) { bone2.getWorldPosition(_b); _a.lerp(_b, 0.5); }
      out.push([_a.x, _a.y, _a.z, r, mult, part]);
    };
    add(B.Head, 0.13, 2.6, 'head', B.HeadTop_End);
    add(B.Neck, 0.08, 2.0, 'head');
    add(B.Spine2, 0.2, 1.1, 'body'); add(B.Spine1, 0.19, 1.0, 'body'); add(B.Spine, 0.19, 1.0, 'body'); add(B.Hips, 0.18, 0.9, 'body');
    add(B.LeftUpLeg, 0.11, 0.6, 'leg', B.LeftLeg); add(B.RightUpLeg, 0.11, 0.6, 'leg', B.RightLeg);
    add(B.LeftLeg, 0.08, 0.5, 'leg', B.LeftFoot); add(B.RightLeg, 0.08, 0.5, 'leg', B.RightFoot);
    add(B.LeftArm, 0.07, 0.5, 'arm', B.LeftForeArm); add(B.RightArm, 0.07, 0.5, 'arm', B.RightForeArm);
    add(B.LeftForeArm, 0.06, 0.5, 'arm', B.LeftHand); add(B.RightForeArm, 0.06, 0.5, 'arm', B.RightHand);
    return out;
  }
  // луч против всех врагов: ближайшее попадание
  raycast(ox, oy, oz, dx, dy, dz, maxT) {
    let best = maxT, hitE = null, hb = null;
    for (const e of this.list) {
      if (!e.alive) continue;
      const ex = e.x - ox, ez = e.z - oz;
      const along = ex * dx + ez * dz;
      if (along < -1 || along > best + 1) continue;
      if (Math.abs(ex * dz - ez * dx) > 1.2) continue;
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
  damage(e, dmg, hx, hy, hz, dx, dz, part) {
    if (!e.alive) return;
    const { audio, fx } = this.ctx;
    e.hp -= dmg; e.alert = true; e.hitT = 0.35;
    e.knock.x += dx * (part === 'head' ? 1.2 : 2.2); e.knock.z += dz * (part === 'head' ? 1.2 : 2.2);
    audio.flesh(e.x, e.z, 0.5);
    fx.blood(hx, hy, hz, dx, dz, part === 'head');
    fx.decal('blood', hx + dx * rr(0.4, 1.4), heightAt(hx + dx, hz + dz) + 0.005, hz + dz * rr(0.4, 1.4), 0, 1, 0, rr(0.4, 0.9));
    this.ctx.onHit && this.ctx.onHit(e, part);
    if (e.hp <= 0) {
      e.alive = false; e.deadT = 0;
      e.fall = { dir: Math.random() < 0.5 ? 1 : -1, side: rr(-0.4, 0.4), spin: rr(-0.6, 0.6), fwd: (dx * Math.sin(e.yaw) + dz * Math.cos(e.yaw)) > 0 ? 1 : -1 };
      e.m.mixer.stopAllAction();
      e.snap = [];
      e.m.root.traverse((o) => { if (o.isBone) e.snap.push([o, o.quaternion.clone()]); });
      if (Math.random() < 0.75) audio.scream(e.x, e.z, 0.7);
      this.ctx.onKill && this.ctx.onKill(e);
      if (Math.random() < (e.kind === 'shooter' ? 0.65 : 0.35)) this.spawnDrop(e.x, e.z);
    } else if (Math.random() < 0.4) {
      e.fc.model === 'ghoul' ? audio.growl(e.x, e.z, 0.8) : audio.shout(e.x, e.z, 0.7);
    }
  }
  spawnDrop(x, z) {
    const o = cloneModel('ammo_box');
    o.position.set(x + rr(-0.3, 0.3), heightAt(x, z) + 0.02, z + rr(-0.3, 0.3));
    o.rotation.set(0, Math.random() * 6, Math.PI / 2);
    this.scene.add(o);
    this.drops.push({ obj: o, x: o.position.x, z: o.position.z, t: 0 });
  }
  update(dt, player) {
    for (const e of this.list) this.updateOne(e, dt, player);
    for (let i = this.list.length - 1; i >= 0; i--) {
      const e = this.list[i];
      if (!e.alive && e.deadT > 40) { this.scene.remove(e.m.group); this.list.splice(i, 1); }
    }
    if (this.list.length > 30) { const i = this.list.findIndex((e) => !e.alive); if (i >= 0) { this.scene.remove(this.list[i].m.group); this.list.splice(i, 1); } }
  }
  updateOne(e, dt, player) {
    const { audio } = this.ctx;
    const m = e.m;
    if (!e.alive) { this.updateDeath(e, dt); return; }
    const dx = player.x - e.x, dz = player.z - e.z, dist = Math.hypot(dx, dz);
    const see = dist < 50 && los(e.x, e.z, player.x, player.z);
    if (see) e.alert = true;
    e.atkCd -= dt; e.voiceT -= dt; e.hitT -= dt;
    let mvx = 0, mvz = 0, faceX = dx, faceZ = dz, aiming = false;
    if (e.kind === 'rusher') {
      if (dist < 1.5 && player.hp > 0) {
        if (e.atkCd <= 0) {
          e.atkCd = 1.1; e.attackT = 0.45;
          audio.swing();
          setTimeout(() => { if (e.alive && Math.hypot(player.x - e.x, player.z - e.z) < 1.9) this.ctx.onPlayerHit(e.fc.dmg, e.x, e.z, 'melee'); }, 220);
        }
      } else if (see && dist < 9) { mvx = dx / dist; mvz = dz / dist; }
      else { [mvx, mvz] = flowDir(e.x, e.z); faceX = mvx; faceZ = mvz; }
      if (e.voiceT <= 0 && dist < 32) {
        e.voiceT = rr(2.5, 6);
        e.fc.model === 'ghoul' ? audio.growl(e.x, e.z) : audio.chant(e.x, e.z);
      }
    } else {
      if (see && dist < 36) {
        aiming = true;
        e.aimT += dt;
        e.strafeT -= dt; if (e.strafeT < 0) { e.strafe *= -1; e.strafeT = rr(1, 2.5); }
        if (dist > 15) { mvx = dx / dist * 0.55; mvz = dz / dist * 0.55; }
        else if (dist < 6) { mvx = -dx / dist * 0.5; mvz = -dz / dist * 0.5; }
        else { mvx = -dz / dist * e.strafe * 0.3; mvz = dx / dist * e.strafe * 0.3; }
        if (e.aimT > 1.0 && e.atkCd <= 0 && e.aimW > 0.8) { this.shoot(e, dist, player); e.aimT = 0; e.atkCd = rr(1.9, 3.0); }
      } else {
        e.aimT = Math.max(0, e.aimT - dt);
        if (e.alert || dist < 70) { [mvx, mvz] = flowDir(e.x, e.z); faceX = mvx; faceZ = mvz; }
      }
      if (e.voiceT <= 0 && see && dist < 30) { e.voiceT = rr(4, 9); audio.shout(e.x, e.z, 0.6); }
    }
    // расталкивание и препятствия
    for (const o of this.list) {
      if (o === e || !o.alive) continue;
      const ox = e.x - o.x, oz = e.z - o.z, od = Math.hypot(ox, oz);
      if (od < 0.7 && od > 1e-3) { mvx += (ox / od) * 0.6; mvz += (oz / od) * 0.6; }
    }
    const ml = Math.hypot(mvx, mvz);
    const sp = e.speed * (e.hitT > 0 ? 0.3 : 1) * Math.min(1, ml);
    if (ml > 1e-3) { mvx /= ml; mvz /= ml; }
    e.curSpeed = lerp(e.curSpeed, sp, damp(6, dt));
    e.x += (mvx * e.curSpeed + e.knock.x) * dt; e.z += (mvz * e.curSpeed + e.knock.z) * dt;
    e.knock.multiplyScalar(Math.pow(0.02, dt));
    collide(e, 0.3);
    for (const c of dressing.colliders) {
      const cx = e.x - c.x, cz = e.z - c.z, cd = Math.hypot(cx, cz), r = c.r + 0.28;
      if (cd < r && cd > 1e-4) { e.x = c.x + cx / cd * r; e.z = c.z + cz / cd * r; }
    }
    const targetYaw = Math.atan2(faceX, faceZ);
    let dy = targetYaw - e.yaw; while (dy > Math.PI) dy -= Math.PI * 2; while (dy < -Math.PI) dy += Math.PI * 2;
    e.yaw += dy * damp(aiming ? 10 : 7, dt);
    m.group.position.set(e.x, heightAt(e.x, e.z), e.z);
    m.group.rotation.y = e.yaw;
    // анимация: смешиваем idle/walk/run по скорости
    const s = e.curSpeed;
    const A = m.actions;
    const wIdle = clamp(1 - s / 0.8, 0, 1), wRun = clamp((s - 2.6) / 1.4, 0, 1), wWalk = clamp(1 - wIdle - wRun, 0, 1);
    if (A.idle) A.idle.setEffectiveWeight(wIdle);
    if (A.walk) { A.walk.setEffectiveWeight(wWalk); A.walk.timeScale = clamp(s / 1.5, 0.6, 1.6); }
    if (A.run) { A.run.setEffectiveWeight(wRun); A.run.timeScale = clamp(s / 3.8, 0.8, 1.5); }
    m.mixer.update(dt);
    m.group.updateMatrixWorld(true);
    e.aimW = lerp(e.aimW, aiming ? 1 : 0, damp(5, dt));
    this.pose(e, dt, player, dist);
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
      const aimPitch = Math.atan2(player.eyeY - 1.45, Math.max(dist, 1));
      const holder = P.rifleHolder;
      const w = e.aimW;
      const cy = chest.y - m.group.position.y;
      holder.position.set(lerp(-0.08, -0.16, w), lerp(cy - 0.32, cy + 0.12, w), lerp(0.34, 0.46, w));
      holder.rotation.set(lerp(-0.5, -aimPitch, w), lerp(0.8, 0.0, w), lerp(0.5, 0, w), 'YXZ');
      holder.updateMatrixWorld(true);
      const tgtR = P.grip.getWorldPosition(V()), tgtL = P.fore.getWorldPosition(V());
      const poleR = chest.clone().addScaledVector(right, 0.7).add(V().set(0, -0.6, 0)).addScaledVector(fwd, -0.2);
      const poleL = chest.clone().addScaledVector(right, -0.6).add(V().set(0, -0.7, 0)).addScaledVector(fwd, 0.3);
      ik2(B.RightArm, B.RightForeArm, B.RightHand, tgtR, poleR, 1);
      ik2(B.LeftArm, B.LeftForeArm, B.LeftHand, tgtL, poleL, 1);
    } else if (e.kind === 'rusher') {
      // гуль тянется к игроку, удар — дугой сверху вниз
      const sh = B.RightArm.getWorldPosition(V());
      const reach = clamp(1 - (dist - 1.2) / 6, 0, 1) * (e.fc.model === 'ghoul' ? 1 : 0.5);
      const at = e.attackT > 0 ? 1 - e.attackT / 0.45 : -1;
      if (e.attackT > 0) e.attackT -= dt;
      for (const side of [-1, 1]) {
        const arm = side > 0 ? B.RightArm : B.LeftArm, fore = side > 0 ? B.RightForeArm : B.LeftForeArm, hand = side > 0 ? B.RightHand : B.LeftHand;
        const s0 = arm.getWorldPosition(V());
        const tgt = s0.clone().addScaledVector(fwd, 0.55 + reach * 0.25).addScaledVector(right, side * 0.12).add(V().set(0, -0.05 + Math.sin(performance.now() / 160 + side) * 0.06, 0));
        if (at >= 0 && side > 0) {
          const ang = lerp(-1.2, 1.5, at);
          tgt.copy(s0).addScaledVector(fwd, 0.35 + Math.sin(at * Math.PI) * 0.4).add(V().set(0, Math.cos(ang) * 0.55 * (at < 0.4 ? 1 : 0.6), 0)).addScaledVector(right, 0.1);
        }
        const pole = s0.clone().addScaledVector(right, side * 0.5).add(V().set(0, -0.6, 0)).addScaledVector(fwd, -0.3);
        const blend = e.fc.model === 'ghoul' ? (reach * 0.8 + (at >= 0 && side > 0 ? 1 : 0)) : (at >= 0 && side > 0 ? 1 : 0);
        if (blend > 0.01) ik2(arm, fore, hand, tgt, pole, clamp(blend, 0, 1));
      }
      void sh;
    }
  }
  shoot(e, dist, player) {
    const { audio, fx, lights } = this.ctx;
    e.m.parts.muzzle.getWorldPosition(_a);
    lights.muzzleFlash(_a, true);
    audio.enemyShot(e.x, e.z);
    const dir = _b.set(player.x - _a.x, player.eyeY - _a.y, player.z - _a.z).normalize();
    fx.muzzleSmoke(_a, dir, 1);
    const speed = Math.hypot(player.vx, player.vz);
    let chance = 0.72 - dist * 0.014 - (speed > 2 ? 0.22 : speed > 0.5 ? 0.08 : 0) - player.crouch * 0.12;
    chance = clamp(chance, 0.1, 0.8);
    if (Math.random() < chance) this.ctx.onPlayerHit(e.fc.dmg * rr(0.85, 1.15), e.x, e.z, 'bullet');
    else {
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
    m.group.rotation.set(f.fwd * ease * 1.45, e.yaw + f.spin * ease, f.side * ease, 'YXZ');
    e.x += e.knock.x * dt; e.z += e.knock.z * dt; e.knock.multiplyScalar(Math.pow(0.05, dt));
    collide(e, 0.3);
    m.group.position.set(e.x, heightAt(e.x, e.z) + 0.02 - ease * 0.08, e.z);
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
