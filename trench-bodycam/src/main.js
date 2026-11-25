// Окопная хроника — точка входа: загрузка, мир, игрок, волны, рендер.
import * as THREE from 'three';
import { CELL, GW, GH, WALL_H, CAM_H, CAM_CROUCH, PR, MAG, FOV_HIP, FOV_ADS, QUALITY, FACTIONS } from './config.js';
import { clamp, lerp, rr, damp, $, store } from './util.js';
import { generate, map, solid, cellCenter, cellOf, heightAt, rayTerrain, collide, computeFlow, flow, idx, los } from './trenchmap.js';
import { loadAll } from './assets.js';
import { buildTerrain, heightTexture, terrainUniforms } from './terrain.js';
import { buildDressing, dressing, updateRats } from './dressing.js';
import { buildSky } from './sky.js';
import { createLights, updateLights, toggleTorch, muzzleFlash, L } from './lights.js';
import { FX, fxLights } from './fx.js';
import { SFX } from './audio.js';
import { Viewmodel } from './weapon.js';
import { Enemies } from './enemies.js';
import { Post } from './post.js';

// ------------------------------------------------------------ рендерер
// качество: сохранённое, иначе по видеокарте
function guessQuality() {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    const ext = gl && gl.getExtension('WEBGL_debug_renderer_info');
    const name = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : '';
    if (/swiftshader|llvmpipe|software/i.test(name)) return 'low';
    if (/intel|mali|adreno|powervr|apple gpu/i.test(name)) return 'medium';
  } catch (e) { /* без WebGL2 игра всё равно не запустится */ }
  return 'high';
}
const qKey = store.get('quality', null) || guessQuality();
const Q = QUALITY[qKey] || QUALITY.high;
const canvas = $('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', stencil: false });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.NoToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV_HIP, 1, 0.04, 600);
camera.rotation.order = 'YXZ';
scene.add(camera);
const post = new Post(renderer, Q);

// ------------------------------------------------------------ состояние
const state = { mode: 'loading', faction: 'loyal', wave: 0, kills: 0, queue: [], spawnT: 0, breakT: 0, time: 0, clock: 4 * 3600 + 13 * 60 + 27, deadT: 0, shots: 0, hits: 0, survived: 0 };
const player = {
  x: 0, z: 0, vx: 0, vz: 0, yaw: 0, pitch: 0, camYaw: 0, camPitch: 0, hp: 100, lastHurt: -99, stamina: 1,
  crouch: 0, ads: 0, ammo: MAG, reserve: 40, cycleT: 0, reloadT: 0, reloadTotal: 1, reloadLoaded: 0, meleeT: 0, meleeHit: false,
  bobAmt: 0, stepPh: 0, shake: 0, eyeY: CAM_H, roll: 0, lastBeat: 0, sprinting: false, prevYaw: 0, prevPitch: 0,
};
const keys = {};
let mouseDown = false, rmb = false, locked = false, noLock = false;
let sens = store.get('sens', 1), showDot = store.get('showdot', false);
const fxs = { dmg: 0, glitch: 0, flash: 0, hit: 0 };
let world = null, fx = null, enemies = null, vm = null;

// ------------------------------------------------------------ загрузка и мир
async function boot() {
  $('q-label').textContent = Q.label;
  const bar = $('load-bar'), txt = $('load-txt');
  try {
    await loadAll(renderer, (p, what) => { bar.style.width = Math.round(p * 100) + '%'; txt.textContent = `Загрузка фотосканов: ${Math.round(p * 100)}%`; });
  } catch (e) {
    txt.textContent = 'Не удалось загрузить ассеты. Запустите игру через локальный сервер (play.bat / play.sh) или по ссылке.';
    console.error(e); return;
  }
  txt.textContent = 'Копаем окопы…';
  await new Promise((r) => setTimeout(r, 30));
  const seed = +(new URLSearchParams(location.search).get('seed')) || Math.floor(Math.random() * 1e6);
  generate(seed);
  buildTerrain(scene, Q);
  buildDressing(scene, Q);
  const sky = buildSky(scene);
  sky.ring.position.set(GW * CELL / 2, 0, GH * CELL / 2);
  world = { sky };
  createLights(scene, camera, Q);
  const ht = heightTexture();
  fx = new FX(scene, Q, ht);
  enemies = new Enemies(scene, {
    factionData: FACTIONS.loyal, wave: () => state.wave, audio: SFX, fx, lights: { muzzleFlash },
    onPlayerHit: hurtPlayer, onKill: () => { state.kills++; }, onHit: () => { fxs.hit = 0.12; },
  });
  player.x = cellCenter(map.spawn[0]); player.z = cellCenter(map.spawn[1]);
  computeFlow(player.x, player.z);
  // прогрев шейдеров
  resize();
  renderer.compile(scene, camera);
  state.mode = 'menu';
  $('loading').hidden = true; $('menu').hidden = false;
}

// ------------------------------------------------------------ игрок
function hurtPlayer(dmg, sx, sz, kind) {
  if (player.hp <= 0 || state.mode !== 'playing') return;
  player.hp -= dmg; player.lastHurt = state.time;
  fxs.dmg = Math.min(1, fxs.dmg + dmg / 40); fxs.glitch = Math.min(1, fxs.glitch + dmg / 45);
  player.shake = Math.min(1, player.shake + dmg / 28);
  const a = Math.atan2(sx - player.x, sz - player.z);
  player.yaw += Math.sin(a - player.camYaw) * 0.03; player.pitch += rr(0.01, 0.04);
  SFX.hurt(dmg > 19);
  if (player.hp <= 0) die();
}
const _v = new THREE.Vector3(), _d = new THREE.Vector3();
function fire() {
  const p = player;
  if (p.cycleT > 0 || p.meleeT > 0 || p.hp <= 0) return;
  if (p.reloadT > 0) { if (p.ammo > 0) p.reloadT = 0; else return; }
  if (p.ammo <= 0) { SFX.click(); p.cycleT = 0.25; showPrompt('R — перезарядка', 1.2); return; }
  p.ammo--; state.shots++;
  p.cycleT = 0.95;
  vm.fire();
  vm.muzzleWorld(_v);
  muzzleFlash(_v);
  fxs.flash = 1;
  SFX.shot(); SFX.bolt(0.38);
  const spread = lerp(0.032, 0.002, p.ads) * (1 + Math.hypot(p.vx, p.vz) * 0.25) * (1 - p.crouch * 0.3);
  const yaw = p.camYaw + rr(-1, 1) * spread, pitch = p.camPitch + rr(-1, 1) * spread;
  const dx = -Math.sin(yaw) * Math.cos(pitch), dy = Math.sin(pitch), dz = -Math.cos(yaw) * Math.cos(pitch);
  _d.set(dx, dy, dz);
  fx.muzzleSmoke(_v, _d, 1.4);
  const ox = camera.position.x, oy = camera.position.y, oz = camera.position.z;
  const w = rayTerrain(ox, oy, oz, dx, dy, dz, 150);
  const he = enemies.raycast(ox, oy, oz, dx, dy, dz, w.t);
  if (he) {
    state.hits++;
    const hx = ox + dx * he.t, hy = oy + dy * he.t, hz = oz + dz * he.t;
    enemies.damage(he.e, 110 * he.hb[4] * rr(0.9, 1.1), hx, hy, hz, dx, dz, he.hb[5]);
  } else if (w.hit) {
    const hx = ox + dx * w.t, hy = oy + dy * w.t, hz = oz + dz * w.t;
    let nx = 0, ny = 1, nz = 0;
    if (w.kind === 'wall') { nx = w.nx; ny = 0.15; nz = w.nz; }
    fx.impact(hx, hy, hz, nx, ny, nz, w.mat || 1);
    SFX.hit(hx, hz, w.mat || 1, 0.4 / (1 + w.t * 0.08));
  }
  p.pitch += rr(0.045, 0.062) * (1 - p.ads * 0.35);
  p.yaw += rr(-0.014, 0.014);
  p.shake = Math.min(1, p.shake + 0.28);
}
function reload() {
  const p = player;
  if (p.reloadT > 0 || p.ammo >= MAG || p.reserve <= 0 || p.meleeT > 0 || p.hp <= 0) return;
  p.reloadT = 0.6 + Math.min(MAG - p.ammo, p.reserve) * 0.42; p.reloadLoaded = 0; p.reloadTotal = p.reloadT;
  SFX.bolt(0); hidePrompt();
}
function melee() {
  if (player.meleeT > 0 || player.hp <= 0) return;
  player.reloadT = 0; player.meleeT = 0.55; player.meleeHit = false;
  SFX.swing();
}
function updateMelee() {
  const p = player;
  if (p.meleeHit || p.meleeT > 0.38 || p.meleeT <= 0) return;
  p.meleeHit = true;
  const fx_ = -Math.sin(p.camYaw), fz_ = -Math.cos(p.camYaw);
  let best = null, bd = 2.4;
  for (const e of enemies.list) {
    if (!e.alive) continue;
    const dx = e.x - p.x, dz = e.z - p.z, d = Math.hypot(dx, dz);
    if (d > bd || (dx * fx_ + dz * fz_) / d < 0.65) continue;
    best = e; bd = d;
  }
  if (best) {
    const hb = enemies.hitboxes(best)[2];
    enemies.damage(best, 70, hb[0], hb[1], hb[2], fx_, fz_, 'body');
    best.knock.x += fx_ * 4; best.knock.z += fz_ * 4; best.hitT = 0.7;
    p.shake = Math.min(1, p.shake + 0.3);
  }
}
function updatePlayer(dt) {
  const p = player;
  if (p.hp <= 0) { p.eyeY = lerp(p.eyeY, 0.3, damp(3, dt)); p.roll = lerp(p.roll, 1.2, damp(2, dt)); return; }
  const crouching = keys.KeyC || keys.ControlLeft;
  p.crouch = lerp(p.crouch, crouching ? 1 : 0, damp(10, dt));
  const aiming = rmb && p.reloadT <= 0 && p.meleeT <= 0;
  p.ads = lerp(p.ads, aiming ? 1 : 0, damp(11, dt));
  let ix = 0, iz = 0;
  if (keys.KeyW) iz -= 1; if (keys.KeyS) iz += 1; if (keys.KeyA) ix -= 1; if (keys.KeyD) ix += 1;
  const il = Math.hypot(ix, iz); if (il > 0) { ix /= il; iz /= il; }
  const sprint = keys.ShiftLeft && iz < 0 && p.stamina > 0.05 && !crouching && p.ads < 0.3;
  if (sprint && il > 0) p.stamina = Math.max(0, p.stamina - dt / 6); else p.stamina = Math.min(1, p.stamina + dt / 4);
  const speed = sprint ? 5.0 : crouching ? 1.5 : aiming ? 1.8 : 2.9;
  const sy = Math.sin(p.yaw), cy = Math.cos(p.yaw);
  const wx = (ix * cy + iz * sy) * speed, wz = (-ix * sy + iz * cy) * speed;
  p.vx = lerp(p.vx, wx, damp(il > 0 ? 8 : 10, dt)); p.vz = lerp(p.vz, wz, damp(il > 0 ? 8 : 10, dt));
  p.x += p.vx * dt; p.z += p.vz * dt;
  collide(p, PR);
  for (const c of dressing.colliders) {
    const cx = p.x - c.x, cz = p.z - c.z, cd = Math.hypot(cx, cz), r = c.r + PR;
    if (cd < r && cd > 1e-4) { p.x = c.x + cx / cd * r; p.z = c.z + cz / cd * r; }
  }
  for (const e of enemies.list) {
    if (!e.alive) continue;
    const dx = p.x - e.x, dz = p.z - e.z, d = Math.hypot(dx, dz);
    if (d < 0.6 && d > 1e-3) { p.x += dx / d * (0.6 - d); p.z += dz / d * (0.6 - d); }
  }
  const hs = Math.hypot(p.vx, p.vz);
  p.sprinting = sprint && hs > 3.4;
  p.bobAmt = lerp(p.bobAmt, Math.min(1.4, hs / 2.9), damp(6, dt));
  const prev = p.stepPh;
  p.stepPh += dt * (hs > 0.3 ? (sprint ? 11.5 : crouching ? 6 : 8.4) : 0);
  if (Math.floor(prev / Math.PI) !== Math.floor(p.stepPh / Math.PI) && hs > 0.5) {
    const onBoards = ((Math.floor(p.x * 1.7) + Math.floor(p.z * 1.3)) & 3) !== 0;
    onBoards ? SFX.boardStep(sprint ? 1.3 : crouching ? 0.4 : 0.9) : SFX.step(sprint ? 1.4 : crouching ? 0.4 : 0.9, 1);
  }
  // камера на теле догоняет взгляд с задержкой
  const k = damp(lerp(12, 20, p.ads), dt);
  p.camYaw = lerp(p.camYaw, p.yaw, k);
  p.camPitch = lerp(p.camPitch, p.pitch, k);
  p.eyeY = heightAt(p.x, p.z) + lerp(CAM_H, CAM_CROUCH, p.crouch);
  if (p.cycleT > 0) p.cycleT -= dt;
  if (p.meleeT > 0) { p.meleeT -= dt; updateMelee(); }
  if (p.reloadT > 0) {
    p.reloadT -= dt;
    const need = Math.min(MAG - p.ammo + p.reloadLoaded, p.reserve + p.reloadLoaded);
    const should = Math.floor(clamp((p.reloadTotal - p.reloadT - 0.3) / 0.42, 0, need));
    while (p.reloadLoaded < should && p.ammo < MAG && p.reserve > 0) { p.ammo++; p.reserve--; p.reloadLoaded++; SFX.roundIn(); }
    if (p.reloadT <= 0) { p.reloadT = 0; SFX.bolt(0); }
  }
  if (mouseDown && p.cycleT <= 0 && !p.sprinting) { fire(); mouseDown = false; }
  if (state.time - p.lastHurt > 5 && p.hp < 100) p.hp = Math.min(100, p.hp + dt * 7);
  if (p.hp < 35 && state.time - p.lastBeat > 0.95) { p.lastBeat = state.time; SFX.heartbeat(); }
  // подборы
  for (let i = enemies.drops.length - 1; i >= 0; i--) {
    const d = enemies.drops[i]; d.t += dt;
    if (Math.hypot(d.x - p.x, d.z - p.z) < 1.0) { p.reserve += 5; scene.remove(d.obj); enemies.drops.splice(i, 1); SFX.pickup(); showPrompt('+5 патронов', 1); }
    else if (d.t > 70) { scene.remove(d.obj); enemies.drops.splice(i, 1); }
  }
  for (const c of dressing.crates) {
    c.cd -= dt;
    if (c.cd <= 0 && Math.hypot(c.x - p.x, c.z - p.z) < 1.4) { p.reserve += 15; c.cd = 40; SFX.pickup(); showPrompt('Ящик с патронами: +15', 1.5); }
  }
}
function updateCamera(dt) {
  const p = player;
  const b = p.bobAmt * (1 - p.ads * 0.6), ph = p.stepPh;
  const bobY = Math.abs(Math.sin(ph)) * 0.05 * b - 0.025 * b;
  const bobX = Math.cos(ph) * 0.045 * b;
  const rollB = Math.cos(ph) * 0.02 * b;
  p.shake = Math.max(0, p.shake - dt * 2.2);
  const sh = p.shake * p.shake, t = state.time;
  const breathe = Math.sin(t * 1.3) * 0.004 + Math.sin(t * 0.71) * 0.003;
  const sy = Math.sin(p.camYaw), cy = Math.cos(p.camYaw);
  camera.position.set(p.x + cy * bobX, p.eyeY + bobY + breathe * 2, p.z - sy * bobX);
  const side = p.vx * cy - p.vz * sy;
  if (p.hp > 0) p.roll = lerp(p.roll, -side * 0.012, damp(5, dt));
  camera.rotation.set(p.camPitch + Math.sin(ph * 2) * 0.008 * b + rr(-1, 1) * sh * 0.03 + breathe,
    p.camYaw + rr(-1, 1) * sh * 0.03, p.roll + rollB + rr(-1, 1) * sh * 0.02);
  const fov = lerp(FOV_HIP, FOV_ADS, p.ads) + (p.sprinting ? 4 : 0);
  if (Math.abs(camera.fov - fov) > 0.05) { camera.fov = lerp(camera.fov, fov, damp(10, dt)); camera.updateProjectionMatrix(); }
}

// ------------------------------------------------------------ волны
function chooseSpawnCell() {
  const c = [];
  for (let z = 0; z < GH; z++) for (let x = 0; x < GW; x++) {
    if (solid(x, z)) continue;
    const d = flow[idx(x, z)];
    if (d < 12 || d > 45) continue;
    if (los(cellCenter(x), cellCenter(z), player.x, player.z)) continue;
    c.push([x, z]);
  }
  return c.length ? c[Math.floor(Math.random() * c.length)] : null;
}
function startWave() {
  state.wave++;
  const n = state.wave;
  state.queue = [];
  for (let i = 0; i < 2 + Math.ceil(n * 1.3); i++) state.queue.push('rusher');
  for (let i = 0; i < Math.floor(n * 0.8) + (n > 1 ? 1 : 0); i++) state.queue.push('shooter');
  state.queue.sort(() => Math.random() - 0.5);
  state.spawnT = 1;
  showCenter(`Волна ${n}`, n === 1 ? FACTIONS[state.faction].introSub : `${state.queue.length} врагов в тумане`, 3);
  $('wave').textContent = 'ВОЛНА ' + n;
}
function updateWaves(dt) {
  if (state.breakT > 0) { state.breakT -= dt; if (state.breakT <= 0) startWave(); return; }
  const alive = enemies.alive();
  if (state.queue.length) {
    state.spawnT -= dt;
    if (state.spawnT <= 0 && alive < 8) {
      const c = chooseSpawnCell();
      if (c) { enemies.spawn(state.queue.pop(), c[0], c[1]); state.spawnT = rr(1.2, 2.4); } else state.spawnT = 0.5;
    }
  } else if (alive === 0 && state.wave > 0) {
    state.breakT = 9;
    showCenter('Волна отбита', 'Перезарядитесь. Следующая через несколько секунд.', 3);
  }
}

// ------------------------------------------------------------ интерфейс
let msgT = 0, promptT = 0, hudAcc = 0;
function showCenter(title, sub, dur) { const el = $('center-msg'); el.textContent = title; if (sub) { const s = document.createElement('small'); s.textContent = sub; el.append(s); } el.style.opacity = 1; msgT = dur; }
function showPrompt(t, dur) { const el = $('prompt'); el.textContent = t; el.style.opacity = 1; promptT = dur; }
function hidePrompt() { $('prompt').style.opacity = 0; promptT = 0; }
function updateHud(dt) {
  if (msgT > 0) { msgT -= dt; if (msgT <= 0) $('center-msg').style.opacity = 0; }
  if (promptT > 0) { promptT -= dt; if (promptT <= 0) hidePrompt(); }
  $('hitmark').style.opacity = fxs.hit > 0 ? 1 : 0;
  hudAcc += dt; if (hudAcc < 0.1) return; hudAcc = 0;
  const t = Math.floor(state.clock), hh = String(Math.floor(t / 3600) % 24).padStart(2, '0'), mm = String(Math.floor(t / 60) % 60).padStart(2, '0'), ss = String(t % 60).padStart(2, '0');
  $('time').textContent = `25.11.1914 ${hh}:${mm}:${ss}`;
  $('rec').classList.toggle('off', Math.floor(state.time * 1.4) % 2 === 1);
  $('kills').textContent = 'УБИТО ' + state.kills;
  let a = ''; for (let i = 0; i < MAG; i++) a += `<span class="rnd${i < player.ammo ? '' : ' empty'}"></span>`;
  $('ammo').innerHTML = a; $('reserve').textContent = ' / ' + player.reserve;
  $('torch-ind').textContent = L.torchOn ? 'ФОНАРЬ ВКЛ · F' : 'ФОНАРЬ ВЫКЛ · F';
  if (player.ammo === 0 && player.reloadT <= 0 && promptT <= 0) showPrompt(player.reserve > 0 ? 'R — перезарядка' : 'Патроны кончились: V — штык, ящики в блиндажах', 0.5);
}

// ------------------------------------------------------------ поток игры
function resetRun() {
  enemies.clear(); fx.clear();
  Object.assign(player, { x: cellCenter(map.spawn[0]), z: cellCenter(map.spawn[1]), vx: 0, vz: 0, hp: 100, ammo: MAG, reserve: 40, cycleT: 0, reloadT: 0, meleeT: 0, stamina: 1, crouch: 0, ads: 0, roll: 0, lastHurt: -99, shake: 0 });
  let bestYaw = 0, bestLen = -1;
  for (const [yaw, dx, dz] of [[0, 0, -1], [Math.PI, 0, 1], [Math.PI / 2, -1, 0], [-Math.PI / 2, 1, 0]]) {
    const r = rayTerrain(player.x, 1.4, player.z, dx, 0, dz, 60); if (r.t > bestLen) { bestLen = r.t; bestYaw = yaw; }
  }
  player.yaw = player.camYaw = player.prevYaw = bestYaw; player.pitch = player.camPitch = player.prevPitch = 0; player.wYaw = player.wPitch = 0;
  for (const c of dressing.crates) c.cd = 0;
  Object.assign(state, { wave: 0, kills: 0, queue: [], breakT: 4, time: 0, deadT: 0, shots: 0, hits: 0, clock: 4 * 3600 + 13 * 60 + 27 });
  Object.assign(fxs, { dmg: 0, glitch: 0.7, flash: 0, hit: 0 });
  post.resetExp = true;
}
function startGame(faction) {
  state.faction = faction;
  const f = FACTIONS[faction];
  enemies.ctx.factionData = f;
  $('unit').textContent = f.unit; $('squad').textContent = f.squad;
  if (vm) vm.dispose(camera);
  vm = new Viewmodel(camera, f);
  resetRun();
  SFX.init();
  state.mode = 'playing';
  $('menu').hidden = true; $('dead').hidden = true; $('pause').hidden = true; $('hud').hidden = false;
  $('dot').style.display = showDot ? 'block' : 'none';
  showCenter(f.intro, 'Первая волна через несколько секунд', 3.5);
  requestLock();
}
function requestLock() {
  if (noLock) return;
  try { const r = canvas.requestPointerLock(); if (r && r.catch) r.catch(() => { noLock = true; }); } catch (e) { noLock = true; }
}
function pause() {
  if (state.mode !== 'playing') return;
  state.mode = 'paused'; $('pause').hidden = false;
  mouseDown = false; rmb = false; for (const k in keys) keys[k] = false;
}
function resume() { state.mode = 'playing'; $('pause').hidden = true; SFX.init(); requestLock(); }
function toMenu() {
  state.mode = 'menu';
  $('pause').hidden = true; $('dead').hidden = true; $('hud').hidden = true; $('menu').hidden = false;
  if (document.pointerLockElement) document.exitPointerLock();
  enemies.clear();
  if (vm) { vm.dispose(camera); vm = null; }
}
function die() {
  state.mode = 'dying'; state.deadT = 0; state.survived = state.time;
  SFX.scream(player.x, player.z, 0.3);
  setTimeout(() => {
    state.mode = 'dead';
    if (document.pointerLockElement) document.exitPointerLock();
    const acc = state.shots ? Math.round((state.hits / state.shots) * 100) : 0;
    const t = Math.floor(state.survived);
    $('stats').innerHTML = `Волна: ${state.wave}<br>Убито: ${state.kills}<br>Точность: ${acc}%<br>Продержались: ${Math.floor(t / 60)} мин ${t % 60} с`;
    $('dead').hidden = false; $('hud').hidden = true;
  }, 2300);
}

// ------------------------------------------------------------ ввод
document.addEventListener('keydown', (ev) => {
  if (ev.code === 'Escape' && noLock && state.mode === 'playing') { pause(); return; }
  if (state.mode !== 'playing') return;
  keys[ev.code] = true;
  if (ev.code === 'KeyR') reload();
  if (ev.code === 'KeyV') melee();
  if (ev.code === 'KeyF') { toggleTorch(); SFX.click(); }
  if (['Space', 'ArrowUp', 'ArrowDown'].includes(ev.code)) ev.preventDefault();
});
document.addEventListener('keyup', (ev) => { keys[ev.code] = false; });
canvas.addEventListener('mousedown', (ev) => {
  if (state.mode !== 'playing') return;
  if (!locked && !noLock) { requestLock(); return; }
  if (ev.button === 0) mouseDown = true;
  if (ev.button === 2) rmb = true;
});
document.addEventListener('mouseup', (ev) => { if (ev.button === 0) mouseDown = false; if (ev.button === 2) rmb = false; });
canvas.addEventListener('contextmenu', (ev) => ev.preventDefault());
document.addEventListener('mousemove', (ev) => {
  if (state.mode !== 'playing' || (!locked && !noLock)) return;
  const s = 0.0022 * sens * lerp(1, 0.6, player.ads);
  player.yaw -= ev.movementX * s; player.pitch -= ev.movementY * s;
  player.pitch = clamp(player.pitch, -1.35, 1.35);
});
document.addEventListener('pointerlockchange', () => { locked = document.pointerLockElement === canvas; if (!locked && state.mode === 'playing') pause(); });
document.addEventListener('pointerlockerror', () => { noLock = true; });
window.addEventListener('blur', () => { if (state.mode === 'playing') pause(); });
$('pick-loyal').addEventListener('click', () => startGame('loyal'));
$('pick-heretic').addEventListener('click', () => startGame('heretic'));
$('resume').addEventListener('click', resume);
$('quit').addEventListener('click', toMenu);
$('again').addEventListener('click', () => startGame(state.faction));
$('tomenu').addEventListener('click', toMenu);
const sensEl = $('sens'), volEl = $('vol'), dotEl = $('showdot'), qEl = $('quality');
sensEl.value = sens; volEl.value = SFX.vol; dotEl.checked = showDot; qEl.value = qKey;
sensEl.addEventListener('input', () => { sens = +sensEl.value; store.set('sens', sens); });
volEl.addEventListener('input', () => { SFX.setVol(+volEl.value); store.set('vol', +volEl.value); });
dotEl.addEventListener('change', () => { showDot = dotEl.checked; store.set('showdot', showDot); });
qEl.addEventListener('change', () => { store.set('quality', qEl.value); location.reload(); });

// ------------------------------------------------------------ рендер-параметры
const P = {
  time: 0, dt: 0.016, fogDensity: 0.055, fogAmb: new THREE.Vector3(), vel: new THREE.Vector2(), dmg: 0, glitch: 0, flash: 0, dead: 0, lowhp: 0, rain: 1,
  torch: { pos: new THREE.Vector3(), dir: new THREE.Vector3(), col: new THREE.Vector3(), cosOut: 0.88, cosIn: 0.95, shadowMap: null, shadowMatrix: null },
  flare: { pos: new THREE.Vector3(), col: new THREE.Vector3() },
  lanterns: Array.from({ length: 6 }, () => ({ pos: new THREE.Vector3(), col: new THREE.Vector3() })),
  muzzle: { pos: new THREE.Vector3(), col: new THREE.Vector3() },
};
const _t2 = new THREE.Vector3();
function gatherLights() {
  const PHASE = 0.08, FXK = 0.25, TPHASE = 0.018;
  const T = L.torch;
  T.getWorldPosition(P.torch.pos);
  T.target.getWorldPosition(_t2);
  P.torch.dir.subVectors(_t2, P.torch.pos).normalize();
  const ti = L.torchOn ? T.intensity : 0;
  P.torch.col.set(T.color.r, T.color.g, T.color.b).multiplyScalar(ti * TPHASE);
  P.torch.cosOut = Math.cos(T.angle); P.torch.cosIn = Math.cos(T.angle * (1 - T.penumbra));
  P.torch.shadowMap = T.shadow.map ? T.shadow.map.texture : null; P.torch.shadowMatrix = T.shadow.matrix;
  P.flare.pos.copy(L.flare.position); P.flare.col.set(L.flare.color.r, L.flare.color.g, L.flare.color.b).multiplyScalar(L.flare.intensity * PHASE * 0.6);
  const lanterns = [];
  for (let i = 0; i < 6; i++) {
    const p = L.pool[i];
    if (p && p.intensity > 0) { P.lanterns[i].pos.copy(p.position); P.lanterns[i].col.set(p.color.r, p.color.g, p.color.b).multiplyScalar(p.intensity * PHASE * 0.5); lanterns.push(P.lanterns[i]); }
  }
  P.lanternList = lanterns;
  const mz = L.muzzle.intensity > L.enemyMuzzle.intensity ? L.muzzle : L.enemyMuzzle;
  P.muzzle.pos.copy(mz.position); P.muzzle.col.set(mz.color.r, mz.color.g, mz.color.b).multiplyScalar(mz.intensity * PHASE * 0.3);
  const art = L.state.artFlash, fl = L.flare.intensity / 2600;
  P.fogAmb.set(0.0035, 0.0042, 0.006).multiplyScalar(1 + art * 3 + fl * 4);
  // те же источники для частиц и дождя
  fxLights.uTorchPos.value.copy(P.torch.pos); fxLights.uTorchDir.value.copy(P.torch.dir); fxLights.uTorchCol.value.copy(P.torch.col).multiplyScalar(FXK / TPHASE);
  fxLights.uTorchCos.value = P.torch.cosOut; fxLights.uTorchCosIn.value = P.torch.cosIn;
  fxLights.uFlarePos.value.copy(P.flare.pos); fxLights.uFlareCol.value.copy(P.flare.col).multiplyScalar(FXK / PHASE);
  for (let i = 0; i < 6; i++) {
    const l = lanterns[i];
    if (l) { fxLights.uLanPos.value[i].copy(l.pos); fxLights.uLanCol.value[i].copy(l.col).multiplyScalar(FXK / PHASE); }
    else { fxLights.uLanPos.value[i].set(0, -100, 0); fxLights.uLanCol.value[i].set(0, 0, 0); }
  }
  fxLights.uMuzPos.value.copy(P.muzzle.pos); fxLights.uMuzCol.value.copy(P.muzzle.col).multiplyScalar(FXK / PHASE);
  fxLights.uAmb.value.set(0.012, 0.014, 0.02).multiplyScalar(1 + art * 2 + fl * 6);
}

// ------------------------------------------------------------ цикл
let last = performance.now(), menuT = 0;
const MANUAL = new URLSearchParams(location.search).has('manual');   // для автотестов: кадры по команде
const perf = { acc: 0, n: 0, t: 0, scale: Q.scale };
function resize() {
  post.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio || 1);
  camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix();
  fx && fx.setScale(post.h / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)));
}
window.addEventListener('resize', resize);
function adaptResolution(dt) {
  perf.acc += dt; perf.n++; perf.t += dt;
  if (perf.t < 2.5) return;
  const avg = perf.acc / perf.n;
  perf.acc = 0; perf.n = 0; perf.t = 0;
  let s = post.scale;
  if (avg > 0.024 && s > 0.5) s = Math.max(0.5, s - 0.1);
  else if (avg < 0.013 && s < Q.scale) s = Math.min(Q.scale, s + 0.1);
  if (s !== post.scale) { post.scale = s; post.w = 0; resize(); }
}
function step(dt) {
  const playing = state.mode === 'playing' || state.mode === 'dying';
  if (playing) {
    state.time += dt; state.clock += dt;
    if (state.mode === 'playing') {
      updatePlayer(dt);
      if (Math.floor(state.time * 4) !== Math.floor((state.time - dt) * 4)) computeFlow(player.x, player.z);
      enemies.update(dt, player);
      updateWaves(dt);
    } else {
      state.deadT += dt; updatePlayer(dt);
      enemies.update(dt * 0.5, player);
    }
    updateCamera(dt);
    player.wYaw = lerp(player.wYaw || 0, (player.camYaw - player.prevYaw) / dt, damp(20, dt));
    player.wPitch = lerp(player.wPitch || 0, (player.camPitch - player.prevPitch) / dt, damp(20, dt));
    player.prevYaw = player.camYaw; player.prevPitch = player.camPitch;
    if (vm) vm.update(dt, { ads: player.ads, dyaw: player.yaw - player.camYaw, dpitch: player.pitch - player.camPitch, sprint: player.sprinting, stepPh: player.stepPh, bob: player.bobAmt, reload: player.reloadT, reloadTotal: player.reloadTotal, cycle: player.cycleT, melee: player.meleeT, time: state.time });
  } else if (state.mode === 'menu' || state.mode === 'loading') {
    menuT += dt;
    player.x = cellCenter(map.spawn[0]); player.z = cellCenter(map.spawn[1]);
    player.eyeY = heightAt(player.x, player.z) + CAM_H;
    camera.position.set(player.x, player.eyeY, player.z);
    player.camYaw = menuT * 0.05; player.camPitch = 0.08 + Math.sin(menuT * 0.2) * 0.05;
    camera.rotation.set(player.camPitch, player.camYaw, Math.sin(menuT * 0.3) * 0.01);
  }
  if (state.mode !== 'paused' && world) {
    SFX.listener.x = player.x; SFX.listener.z = player.z; SFX.listener.yaw = player.camYaw;
    updateLights(dt, player, SFX);
    updateRats(dt, player);
    terrainUniforms.uTime.value = performance.now() / 1000;
  }
  fxs.dmg = Math.max(0, fxs.dmg - dt * 0.9);
  fxs.flash = Math.max(0, fxs.flash - dt * 14);
  fxs.glitch = Math.max(0, fxs.glitch - dt * 1.5);
  fxs.hit = Math.max(0, fxs.hit - dt);
  updateHud(dt);
}
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (!world || MANUAL) return;
  step(dt);
  render(dt);
  if (state.mode === 'playing') adaptResolution(dt);
}
function render(dt) {
  world.sky.sky.position.copy(camera.position);
  camera.updateMatrixWorld();
  gatherLights();
  fx.update(dt, performance.now() / 1000, camera.position, heightAt);
  const fovV = THREE.MathUtils.degToRad(camera.fov), fovH = 2 * Math.atan(Math.tan(fovV / 2) * camera.aspect);
  P.vel.set(clamp(-player.wYaw / 60 / fovH, -0.05, 0.05), clamp(player.wPitch / 60 / fovV, -0.05, 0.05));
  P.time = performance.now() / 1000; P.dt = dt;
  P.dmg = fxs.dmg + (player.hp < 35 && state.mode === 'playing' ? (1 - player.hp / 35) * 0.35 * (0.8 + Math.sin(state.time * 6.5) * 0.2) : 0);
  P.glitch = fxs.glitch; P.flash = fxs.flash;
  P.dead = state.mode === 'dying' ? clamp((state.deadT - 1.2) / 1.0, 0, 1) : 0;
  P.lowhp = state.mode === 'playing' ? clamp(1 - player.hp / 50, 0, 1) : 0;
  post.render(scene, camera, P);
}

boot();
requestAnimationFrame(frame);

// для автотестов
window.__game = {
  state, player, keys, camera, scene, post, get enemies() { return enemies; }, get vm() { return vm; }, startGame, step, render, fire, reload, melee, map, L,
  setMouse(v) { mouseDown = v; }, setAim(v) { rmb = v; }, chooseSpawnCell, solid, cellCenter, CELL,
  clean() { fxs.glitch = 0; fxs.dmg = 0; fxs.flash = 0; if (vm) vm.root.visible = false; },
  look(px, py, pz, tx, ty, tz) { state.mode = 'paused'; camera.position.set(px, py, pz); camera.lookAt(tx, ty, tz); camera.updateMatrixWorld(); render(1 / 30); renderer.getContext().finish(); },
  frame(dt = 1 / 30, n = 1) { for (let i = 0; i < n; i++) step(dt); render(dt); renderer.getContext().finish(); },
  sim(dt, n) { for (let i = 0; i < n; i++) step(dt); },
};
