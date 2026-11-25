// Свет: луна, нагрудный фонарь, осветительные ракеты, фонари в окопе, вспышки выстрелов, артиллерия.
import * as THREE from 'three';
import { WALL_H } from './config.js';
import { ENV } from './assets.js';
import { dressing } from './dressing.js';
import { skyUniforms } from './sky.js';
import { lerp, rr, clamp } from './util.js';

export const L = {};

function cookieTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, 256, 256);
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0.0, '#ffffff'); grd.addColorStop(0.12, '#f4f0e8'); grd.addColorStop(0.2, '#9a968e');
  grd.addColorStop(0.32, '#b8b2a8'); grd.addColorStop(0.42, '#6a665e'); grd.addColorStop(0.7, '#2c2a26');
  grd.addColorStop(0.95, '#0b0a09'); grd.addColorStop(1.0, '#000');
  g.fillStyle = grd; g.fillRect(0, 0, 256, 256);
  // кольца отражателя и пылинки на стекле
  g.globalCompositeOperation = 'multiply';
  for (let i = 0; i < 6; i++) { g.strokeStyle = `rgba(0,0,0,${0.08 + Math.random() * 0.1})`; g.lineWidth = 2 + Math.random() * 4; g.beginPath(); g.arc(128 + Math.random() * 4 - 2, 128 + Math.random() * 4 - 2, 30 + i * 14 + Math.random() * 6, 0, 7); g.stroke(); }
  for (let i = 0; i < 40; i++) { g.fillStyle = `rgba(0,0,0,${Math.random() * 0.25})`; g.beginPath(); g.arc(Math.random() * 256, Math.random() * 256, Math.random() * 6, 0, 7); g.fill(); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createLights(scene, camera, quality) {
  scene.environment = ENV.pmrem;
  L.hemi = new THREE.HemisphereLight(0x7d8cad, 0x2a2018, 0.22);
  scene.add(L.hemi);

  L.moon = new THREE.DirectionalLight(0x9fb2d8, 0.5);
  L.moonDir = new THREE.Vector3(-0.45, 0.62, 0.35).normalize();
  if (quality.moonShadow) {
    L.moon.castShadow = true;
    L.moon.shadow.mapSize.set(quality.shadowSize * 2, quality.shadowSize * 2);
    const sc = L.moon.shadow.camera; sc.left = -28; sc.right = 28; sc.top = 28; sc.bottom = -28; sc.near = 1; sc.far = 220;
    L.moon.shadow.bias = -0.0004; L.moon.shadow.normalBias = 0.04;
    L.moon.shadow.autoUpdate = false;
  }
  scene.add(L.moon); scene.add(L.moon.target);

  L.torch = new THREE.SpotLight(0xfff0dc, 38, 40, 0.56, 0.5, 2);
  L.torch.castShadow = true;
  L.torch.shadow.mapSize.set(quality.shadowSize, quality.shadowSize);
  L.torch.shadow.camera.near = 0.15; L.torch.shadow.camera.far = 40;
  L.torch.shadow.bias = -0.0003; L.torch.shadow.normalBias = 0.02;
  L.torch.map = cookieTexture();
  L.torch.position.set(0.16, -0.14, 0.02);
  camera.add(L.torch);
  L.torch.target.position.set(0.06, -0.12, -2);
  camera.add(L.torch.target);
  L.torchOn = true;

  L.flare = new THREE.PointLight(0xeaffe2, 0, 0, 2);
  if (quality.flareShadow) {
    L.flare.castShadow = true;
    L.flare.shadow.mapSize.set(512, 512);
    L.flare.shadow.camera.near = 0.5; L.flare.shadow.camera.far = 160;
    L.flare.shadow.bias = -0.003;
    L.flare.shadow.autoUpdate = false;
  }
  scene.add(L.flare);
  L.flareSprite = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(60, 70, 60) }));
  L.flareSprite.visible = false;
  scene.add(L.flareSprite);

  L.pool = [];
  for (let i = 0; i < quality.lanterns; i++) {
    const p = new THREE.PointLight(0xff9a48, 0, 11, 2);
    scene.add(p); L.pool.push(p);
  }
  L.muzzle = new THREE.PointLight(0xffb468, 0, 20, 2); scene.add(L.muzzle);
  L.enemyMuzzle = new THREE.PointLight(0xffa858, 0, 20, 2); scene.add(L.enemyMuzzle);
  L.state = { poolT: 0, flareT: 7, flare: null, artT: 3, artFlash: 0, enemyFlashT: 0, sources: [], frame: 0, moonAt: new THREE.Vector3(1e9, 0, 0) };
  return L;
}

export function toggleTorch() { L.torchOn = !L.torchOn; L.torch.intensity = L.torchOn ? 38 : 0; return L.torchOn; }

// события звука от атмосферы отдаются наружу
export function updateLights(dt, player, audio) {
  const S = L.state;
  // луна и её тени следуют за игроком
  S.frame++;
  // тени луны пересчитываем, когда игрок ушёл на 1.5 м, тени ракеты — через кадр
  if (Math.hypot(player.x - S.moonAt.x, player.z - S.moonAt.z) > 1.5 || S.frame % 30 === 0) {
    S.moonAt.set(player.x, 0, player.z);
    L.moon.target.position.set(player.x, 0, player.z);
    L.moon.position.set(player.x + L.moonDir.x * 90, L.moonDir.y * 90, player.z + L.moonDir.z * 90);
    L.moon.shadow.needsUpdate = true;
  }
  if (L.flare.castShadow && L.flare.intensity > 0 && S.frame % 2 === 0) L.flare.shadow.needsUpdate = true;

  // ближайшие фонари и печки получают свет из пула
  S.poolT -= dt;
  if (S.poolT <= 0) {
    S.poolT = 0.3;
    const src = dressing.lanterns.map((l) => ({ l, fire: false, d: Math.hypot(l.x - player.x, l.z - player.z) }))
      .concat(dressing.fires.map((f) => ({ l: f, fire: true, d: Math.hypot(f.x - player.x, f.z - player.z) })));
    src.sort((a, b) => a.d - b.d);
    S.sources = src.slice(0, L.pool.length);
    S.sources.forEach((s, i) => {
      const p = L.pool[i];
      p.position.set(s.l.x, s.l.y, s.l.z);
      p.color.set(s.fire ? 0xff7a2a : 0xffa04c);
      p.distance = s.fire ? 9 : 11;
      p.userData.base = s.fire ? 9 : 5.5;
      p.userData.fire = s.fire;
      p.userData.ph = s.l.ph || 0;
    });
    for (let i = S.sources.length; i < L.pool.length; i++) L.pool[i].intensity = 0;
  }
  const t = performance.now() / 1000;
  S.sources.forEach((s, i) => {
    const p = L.pool[i];
    const f = p.userData.fire
      ? 0.75 + Math.sin(t * 13 + i) * 0.1 + Math.sin(t * 27.3) * 0.08 + Math.random() * 0.12
      : 0.92 + Math.sin(t * 9 + p.userData.ph) * 0.03 + Math.sin(t * 23.7 + i) * 0.03 + (Math.random() < 0.015 ? -0.35 : 0);
    p.intensity = p.userData.base * f;
  });

  // осветительная ракета
  S.flareT -= dt;
  if (S.flareT <= 0 && !S.flare) {
    S.flareT = rr(16, 30);
    const a = rr(-2.6, -0.5), r = rr(10, 32);   // чаще со стороны противника
    S.flare = { x: player.x + Math.cos(a) * r, z: player.z + Math.sin(a) * r, y: WALL_H + 1.5, vy: 20, t: 0, life: rr(13, 18), dx: rr(-0.5, 0.5), dz: rr(-0.4, 0.4) };
    audio && audio.flareLaunch(S.flare.x, S.flare.z);
  }
  if (S.flare) {
    const f = S.flare; f.t += dt;
    if (f.vy > 0) { f.y += f.vy * dt; f.vy -= 10 * dt; } else { f.y -= 0.75 * dt; f.x += Math.sin(f.t * 0.7) * 0.35 * dt + f.dx * dt; f.z += f.dz * dt; }
    const ignite = clamp((f.t - 1.6) / 0.6, 0, 1);
    const fade = ignite * clamp((f.life - f.t) / 2.5, 0, 1);
    const flick = 0.82 + Math.random() * 0.22 + Math.sin(f.t * 31) * 0.05;
    L.flare.position.set(f.x, f.y, f.z);
    L.flare.intensity = 2600 * fade * flick;
    L.flareSprite.visible = fade > 0.01; L.flareSprite.position.copy(L.flare.position);
    L.flareSprite.material.color.setRGB(60 * fade * flick, 70 * fade * flick, 60 * fade * flick);
    skyUniforms.uFlare.value = fade * flick;
    skyUniforms.uFlareDir.value.set(f.x - player.x, f.y - 1.5, f.z - player.z).normalize();
    if (f.t > f.life) { S.flare = null; L.flare.intensity = 0; L.flareSprite.visible = false; skyUniforms.uFlare.value = 0; }
  }

  // далёкая артиллерия: вспышка у горизонта, гром позже
  S.artT -= dt;
  if (S.artT <= 0) {
    S.artT = rr(4, 13);
    const a = rr(-Math.PI * 0.95, -Math.PI * 0.05);
    skyUniforms.uFlashDir.value.set(Math.cos(a), 0.05, Math.sin(a)).normalize();
    S.artFlash = rr(0.6, 1.3);
    const dist = rr(400, 2500);
    audio && setTimeout(() => audio.artillery(dist), Math.min(4000, dist / 340 * 1000 * 0.35));
  }
  S.artFlash = Math.max(0, S.artFlash - dt * 2.2);
  const af = S.artFlash * (0.55 + Math.random() * 0.45);
  skyUniforms.uFlash.value = af;
  L.hemi.intensity = 0.22 + af * 0.5 + skyUniforms.uFlare.value * 0.25;

  // вспышки выстрелов
  L.muzzle.intensity = Math.max(0, L.muzzle.intensity - dt * 9000);
  if (S.enemyFlashT > 0) { S.enemyFlashT -= dt; if (S.enemyFlashT <= 0) L.enemyMuzzle.intensity = 0; }
  skyUniforms.uTime.value = t;
}

export function muzzleFlash(pos, enemy = false) {
  if (enemy) { L.enemyMuzzle.position.copy(pos); L.enemyMuzzle.intensity = 400; L.state.enemyFlashT = 0.05; }
  else { L.muzzle.position.copy(pos); L.muzzle.intensity = 450; }
}
