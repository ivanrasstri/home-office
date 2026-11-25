// Оружие от первого лица: фотоскан винтовки, руки, штык, анимации.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { MODELS, pbr, patchViewmodel, addPatch } from './assets.js';
import { lerp, clamp, damp } from './util.js';

// Точки прицела в координатах модели (из анализа сетки): целик и мушка, дуло по +X
const REAR = new THREE.Vector3(0.53 - 0.564, 0.1335 - 0.0596, 0.0095);
const FRONT = new THREE.Vector3(1.14 - 0.564, 0.131 - 0.0596, 0.0095);

function vmMaterial(m) {
  m = m.clone();
  patchViewmodel(m);
  // фонарь висит у самой винтовки: на ней его свет сильно ослабляем, иначе металл «выжигается»
  addPatch(m, 'vmspot', (s) => {
    s.fragmentShader = s.fragmentShader.replace('#include <lights_fragment_begin>',
      THREE.ShaderChunk.lights_fragment_begin.replace('getSpotLightInfo( spotLight, geometryPosition, directLight );',
        'getSpotLightInfo( spotLight, geometryPosition, directLight ); directLight.color *= 0.14;'));
  });
  m.envMapIntensity = 0.12;
  return m;
}

export class Viewmodel {
  constructor(camera, faction) {
    this.root = new THREE.Group();          // следует за камерой
    this.gun = new THREE.Group();
    this.root.add(this.gun);
    camera.add(this.root);
    // винтовка
    const rifle = MODELS.rifle.scene.clone(true);
    rifle.traverse((o) => {
      if (o.name === 'bolt_action_rifle_7_62_scope') o.visible = false;
      if (o.isMesh) { o.material = vmMaterial(o.material); o.castShadow = false; o.receiveShadow = true; o.frustumCulled = false; }
    });
    rifle.rotation.y = Math.PI / 2;        // дуло (+X) смотрит в -Z
    this.gun.add(rifle);
    this.rifle = rifle;
    const rot = (v) => new THREE.Vector3(v.z, v.y, -v.x);
    this.rear = rot(REAR); this.front = rot(FRONT);
    this.muzzle = new THREE.Object3D(); this.muzzle.position.set(this.front.x, this.front.y - 0.026, this.front.z - 0.03);
    this.gun.add(this.muzzle);
    // игольчатый штык
    const steel = vmMaterial(new THREE.MeshStandardMaterial({ color: 0x3a3b3d, metalness: 1, roughness: 0.35 }));
    const spike = new THREE.Mesh(new THREE.CylinderGeometry(0.0006, 0.0075, 0.43, 4), steel);
    spike.rotation.x = -Math.PI / 2;
    spike.position.set(this.front.x + 0.014, this.front.y - 0.03, this.front.z - 0.23);
    spike.frustumCulled = false;
    this.gun.add(spike);
    const sock = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.07, 10), steel);
    sock.rotation.x = Math.PI / 2; sock.position.set(this.front.x + 0.006, this.front.y - 0.03, this.front.z + 0.02); sock.frustumCulled = false;
    this.gun.add(sock);
    // руки: перчатки и рукава шинели
    const f = faction;
    const wool = vmMaterial(pbr('wool', { color: new THREE.Color(...f.sleeve), env: 0.2, repeat: [3, 3] }));
    const leather = vmMaterial(pbr('leather', { color: new THREE.Color(...f.glove), env: 0.4, repeat: [2, 2] }));
    const mk = (g, m) => { const o = new THREE.Mesh(g, m); o.castShadow = false; o.receiveShadow = true; o.frustumCulled = false; return o; };
    const hand = (side) => {
      const h = new THREE.Group();
      h.add(mk(new RoundedBoxGeometry(0.085, 0.045, 0.1, 3, 0.018), leather));            // ладонь
      for (let i = 0; i < 4; i++) {                                                        // пальцы, обхватившие ложе
        const fg = mk(new THREE.CapsuleGeometry(0.0095, 0.045, 3, 6), leather);
        fg.position.set(side * 0.03, -0.028, -0.034 + i * 0.022); fg.rotation.set(0, 0, side * 0.9);
        h.add(fg);
      }
      const th = mk(new THREE.CapsuleGeometry(0.011, 0.04, 3, 6), leather);
      th.position.set(-side * 0.035, 0.018, -0.03); th.rotation.set(0.6, 0, -side * 0.5); h.add(th);
      const cuff = mk(new THREE.CylinderGeometry(0.042, 0.045, 0.06, 12), leather);
      cuff.rotation.x = Math.PI / 2; cuff.position.set(0, 0.005, 0.07); h.add(cuff);
      return h;
    };
    const arm = (from, to, r0, r1) => {
      const dir = new THREE.Vector3().subVectors(to, from);
      const len = dir.length();
      const g = new THREE.CylinderGeometry(r1, r0, len, 14, 4);
      // складки рукава
      const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) { const y = p.getY(i); const k = 1 + Math.sin(y * 38 + p.getX(i) * 20) * 0.04; p.setX(i, p.getX(i) * k); p.setZ(i, p.getZ(i) * k); }
      g.computeVertexNormals();
      const o = mk(g, wool);
      o.position.copy(from).addScaledVector(dir, 0.5);
      o.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
      return o;
    };
    // левая рука на цевье, правая на шейке приклада
    const lh = hand(-1); lh.position.set(-0.004, 0.015, -0.05); lh.rotation.set(0, 0, -0.25); this.gun.add(lh);
    const rh = hand(1); rh.position.set(0.018, 0.005, 0.40); rh.rotation.set(0.2, 0, 0.35); this.gun.add(rh);
    this.gun.add(arm(new THREE.Vector3(-0.01, 0.0, 0.03), new THREE.Vector3(-0.3, -0.42, 0.42), 0.058, 0.05));
    this.gun.add(arm(new THREE.Vector3(0.03, -0.01, 0.47), new THREE.Vector3(0.28, -0.4, 0.62), 0.062, 0.052));
    this.lh = lh; this.rh = rh;
    // вспышка выстрела (HDR — подхватит bloom)
    const flashMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(28, 15, 6), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, map: flashTexture() });
    patchViewmodel(flashMat);
    this.flash = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const pl = new THREE.Mesh(new THREE.PlaneGeometry(i === 0 ? 0.22 : 0.09, i === 0 ? 0.22 : 0.42), flashMat);
      if (i > 0) { pl.rotation.x = Math.PI / 2; pl.rotation.y = i === 2 ? Math.PI / 2 : 0; pl.position.z = -0.16; }
      pl.frustumCulled = false;
      this.flash.add(pl);
    }
    this.flash.position.copy(this.muzzle.position);
    this.flash.visible = false;
    this.gun.add(this.flash);
    this.state = { ads: 0, recoil: 0, kick: 0, sway: new THREE.Vector2(), spr: 0, cycle: 0, reload: 0, reloadTotal: 1, melee: 0, flashT: 0, bob: 0 };
  }
  dispose(camera) { camera.remove(this.root); }
  fire() {
    const s = this.state;
    s.recoil = 1; s.kick = 1; s.flashT = 0.045;
    this.flash.visible = true; this.flash.rotation.z = Math.random() * 6.28;
    const k = 0.8 + Math.random() * 0.5; this.flash.scale.set(k, k, k);
  }
  muzzleWorld(out) { return this.muzzle.getWorldPosition(out); }
  update(dt, p) {
    const s = this.state;
    s.ads = p.ads;
    s.recoil = Math.max(0, s.recoil - dt * 6);
    s.kick = Math.max(0, s.kick - dt * 10);
    if (s.flashT > 0) { s.flashT -= dt; if (s.flashT <= 0) this.flash.visible = false; }
    s.sway.x = lerp(s.sway.x, clamp(p.dyaw, -0.25, 0.25), damp(9, dt));
    s.sway.y = lerp(s.sway.y, clamp(p.dpitch, -0.25, 0.25), damp(9, dt));
    s.spr = lerp(s.spr, p.sprint ? 1 : 0, damp(7, dt));
    const a = s.ads;
    // прицельное положение: целик и мушка на оси камеры
    const adsPos = new THREE.Vector3(-this.rear.x, -this.rear.y - 0.012, -0.42 - this.rear.z);   // глаз у гребня приклада
    const hipPos = new THREE.Vector3(0.175, -0.25, -0.26);
    const b = p.bob * (1 - a * 0.85);
    let x = lerp(hipPos.x, adsPos.x, a) + Math.cos(p.stepPh) * 0.012 * b - s.sway.x * 0.1;
    let y = lerp(hipPos.y, adsPos.y, a) - Math.abs(Math.sin(p.stepPh)) * 0.014 * b + s.sway.y * 0.08;
    let z = lerp(hipPos.z, adsPos.z, a) + s.kick * 0.075;
    let rx = s.recoil * 0.13 * (1 - a * 0.4) + s.sway.y * 0.35 + lerp(-0.13, 0.0, a);
    let ry = s.sway.x * 0.45 + lerp(0.1, 0.0, a);
    let rz = Math.cos(p.stepPh) * 0.02 * b + lerp(-0.04, 0.0, a);
    // бег: винтовка поперёк груди
    x -= s.spr * 0.06; y -= s.spr * 0.05; rx -= s.spr * 0.3; ry += s.spr * 0.75; rz += s.spr * 0.45;
    // перезарядка: винтовка на бок, рука досылает патроны
    if (p.reload > 0) {
      const k = clamp(Math.min(p.reloadTotal - p.reload, p.reload) / 0.3, 0, 1);
      rz += k * 0.6; rx += k * 0.22; y -= k * 0.035; x -= k * 0.04; z += k * 0.03;
      this.rh.position.y = 0.005 + Math.max(0, Math.sin(p.time * 15)) * 0.03 * k;
      this.rh.position.z = 0.40 - k * 0.32;
    } else if (p.cycle > 0) {
      // передёргивание затвора
      const c = clamp((0.95 - p.cycle) / 0.75, 0, 1);
      const act = c > 0.12 && c < 0.92 ? Math.sin((c - 0.12) / 0.8 * Math.PI) : 0;
      rz += act * 0.22 * (1 - a * 0.5); y -= act * 0.02; ry -= act * 0.05;
      this.rh.position.z = 0.40 - act * 0.33; this.rh.position.y = 0.005 + act * 0.05; this.rh.position.x = 0.018 + act * 0.05;
    } else {
      this.rh.position.set(lerp(this.rh.position.x, 0.018, damp(12, dt)), lerp(this.rh.position.y, 0.005, damp(12, dt)), lerp(this.rh.position.z, 0.40, damp(12, dt)));
    }
    // удар штыком
    if (p.melee > 0) {
      const m = 1 - p.melee / 0.55;
      const th = m < 0.3 ? m / 0.3 : 1 - (m - 0.3) / 0.7;
      z -= th * 0.38; y += th * 0.03; x -= th * 0.08; ry -= th * 0.12; rx -= th * 0.05;
    }
    // бросок гранаты: винтовка уходит вниз, освобождая руку
    if (p.throwT > 0) {
      const th = Math.sin(clamp(1 - p.throwT / 0.65, 0, 1) * Math.PI);
      y -= th * 0.24; x += th * 0.1; rx -= th * 0.55; rz -= th * 0.3;
    }
    // перевязка: винтовка опущена к бедру
    if (p.treat > 0) {
      const tk = clamp(Math.min(p.treat, 2.0 - p.treat) / 0.35, 0, 1);
      y -= tk * 0.2; x += tk * 0.06; rx -= tk * 0.45; ry += tk * 0.5;
    }
    this.gun.position.set(x, y, z);
    this.gun.rotation.set(rx, ry, rz);
  }
}

function flashTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.25, 'rgba(255,220,160,0.8)'); grd.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grd;
  g.save(); g.translate(64, 64);
  for (let i = 0; i < 7; i++) { g.rotate(Math.PI * 2 / 7 + Math.random() * 0.3); g.beginPath(); g.moveTo(-6, 0); g.lineTo(0, -62 * (0.5 + Math.random() * 0.5)); g.lineTo(6, 0); g.fill(); }
  g.restore();
  g.beginPath(); g.arc(64, 64, 26, 0, 7); g.fill();
  return new THREE.CanvasTexture(c);
}
