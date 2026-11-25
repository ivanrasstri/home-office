// Окопная хроника — точка входа: загрузка, мир, игрок, задания, рендер.
import * as THREE from 'three';
import { CELL, GW, GH, WALL_H, CAM_H, CAM_CROUCH, PR, FOV_HIP, FOV_ADS, QUALITY, FACTIONS, MISSIONS, MAX_BLOOD } from './config.js';
import { clamp, lerp, rr, damp, $, store } from './util.js';
import { generate, map, solid, cellCenter, cellOf, heightAt, rayTerrain, collide, computeFlow, flow, idx, los, DIRS } from './trenchmap.js';
import { loadAll, cloneModel } from './assets.js';
import { buildTerrain, heightTexture, terrainUniforms } from './terrain.js';
import { buildDressing, dressing, updateRats } from './dressing.js';
import { buildSky } from './sky.js';
import { createLights, updateLights, toggleTorch, muzzleFlash, L } from './lights.js';
import { FX, fxLights } from './fx.js';
import { SFX } from './audio.js';
import { Viewmodel } from './weapon.js';
import { Enemies } from './enemies.js';
import { Hazards } from './hazards.js';
import { Post } from './post.js';
import { MUSIC } from './music.js';
import { LORE } from './lore-data.js';
import { loadContent, applyMenuArt, setLoadingArt, buildCodex, tipText, musicUrl } from './content.js';

const HUD = LORE.hud || {};
const term = (k, fb) => HUD[k] || fb;

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
const CLOCK0 = 4 * 3600 + 13 * 60 + 27;
const state = {
  mode: 'loading', faction: 'loyal', mission: store.get('mission', 'hold'), wave: 0, repelled: 0, kills: 0, queue: [], spawnT: 0, breakT: 0, time: 0, clock: CLOCK0,
  deadT: 0, shots: 0, hits: 0, survived: 0, alarm: false, reinfT: 0, relic: null, extract: null, events: [], lastShot: -99, wonT: 0,
};
const player = {
  x: 0, z: 0, vx: 0, vz: 0, yaw: 0, pitch: 0, camYaw: 0, camPitch: 0, hp: 100, lastHurt: -99, stamina: 1,
  crouch: 0, ads: 0, ammo: 5, reserve: 40, cycleT: 0, reloadT: 0, reloadTotal: 1, reloadLoaded: 0, meleeT: 0, meleeHit: false,
  bobAmt: 0, stepPh: 0, shake: 0, eyeY: CAM_H, roll: 0, lastBeat: 0, sprinting: false, prevYaw: 0, prevPitch: 0,
  blood: 0, downT: 0, downAt: -99, riseT: 0, treatT: 0, mask: 0, maskOn: false, maskT: 0, gasT: 0, breathT: 0, breathPh: false, grenades: 0, throwT: 0, thrown: false, sight: 40, hasRelic: false,
};
let W = FACTIONS.loyal.weapon, G = FACTIONS.loyal.grenade;
const keys = {};
let mouseDown = false, rmb = false, locked = false, noLock = false;
let sens = store.get('sens', 1), showDot = store.get('showdot', false);
const fxs = { dmg: 0, glitch: 0, flash: 0, hit: 0 };
let world = null, fx = null, enemies = null, vm = null, hazards = null, relicObj = null, hideVm = false;

// ------------------------------------------------------------ загрузка и мир
async function boot() {
  $('q-label').textContent = Q.label;
  await loadContent();
  setLoadingArt();
  const bar = $('load-bar'), txt = $('load-txt');
  try {
    await loadAll(renderer, (p) => { bar.style.width = Math.round(p * 100) + '%'; txt.textContent = `Загрузка фотосканов: ${Math.round(p * 100)}%`; });
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
    onPlayerHit: hurtPlayer, onKill: (e, o) => { if (o.byPlayer) state.kills++; }, onHit: () => { fxs.hit = 0.12; },
    onEvent: enemyEvent, explode: (x, y, z, o) => hazards.explode(x, y, z, o),
  });
  hazards = new Hazards(scene, { fx, audio: SFX, enemies, player, hurtPlayer, shake: (k) => { player.shake = Math.min(1, player.shake + k); fxs.glitch = Math.min(1, fxs.glitch + k * 0.5); }, noise: (x, z, r) => enemies.noise(x, z, r) });
  player.x = cellCenter(map.spawn[0]); player.z = cellCenter(map.spawn[1]);
  computeFlow(player.x, player.z);
  // прогрев шейдеров
  resize();
  renderer.compile(scene, camera);
  state.mode = 'menu';
  applyMenuArt();
  buildCodex();
  $('loading').hidden = true; $('menu').hidden = false;
}

// ------------------------------------------------------------ события на экране
let evT = 0;
function showEvent(text, dur = 2.2, hot = false) {
  const el = $('event'); el.textContent = text; el.classList.toggle('hot', hot); el.style.opacity = 1; evT = dur;
}
function enemyEvent(type, e) {
  const name = e && e.u ? e.u.name : '';
  if (type === 'shaken') showEvent(`${term('shaken', 'ДРОГНУЛИ')} · ${name}`);
  else if (type === 'fled') showEvent(`${term('fled', 'ОТРЯД БЕЖАЛ')}`, 2.6);
  else if (type === 'leader_down') showEvent(`${term('leader_down', 'КОМАНДИР ПАЛ')} · ${name}`, 2.6);
  else if (type === 'tough') showEvent(`${name} встаёт`, 1.8);
  else if (type === 'alarm' && state.mission === 'raid' && !state.alarm) {
    state.alarm = true; state.reinfT = 30;
    showEvent('ТРЕВОГА · вас заметили', 3, true);
    SFX.gasAlarm();
  }
}

// ------------------------------------------------------------ игрок
// Попадание по игроку: маркеры крови, сбивание с ног, кровавая баня (стр. 19–20, 46–49)
function hurtPlayer(dmg, sx, sz, kind, opts = {}) {
  const p = player;
  if (p.hp <= 0 || state.mode !== 'playing') return;
  let bath = false;
  if (kind === 'melee' && (p.blood >= MAX_BLOOD || (p.downT > 0 && p.blood >= 3))) {
    dmg *= 1.6; p.blood -= p.downT > 0 ? 3 : MAX_BLOOD; bath = true;
    showEvent(term('bloodbath', 'КРОВАВАЯ БАНЯ'), 2, true);
  }
  if (kind === 'melee' && p.downT > 0) dmg *= 1.3;
  const raw = dmg;
  // сбивает с ног только тяжёлый удар; после подъёма три с лишним секунды на то, чтобы прийти в себя
  const knock = (opts.big || raw >= 30) && p.downT <= 0 && state.time - p.downAt > 3.4;
  dmg *= 1 + 0.06 * p.blood;
  p.hp -= dmg; p.lastHurt = state.time;
  if (!bath) p.blood = Math.min(MAX_BLOOD, p.blood + (knock ? 0 : 1) + (opts.shrapnel ? 1 : 0));
  fxs.dmg = Math.min(1, fxs.dmg + dmg / 40); fxs.glitch = Math.min(1, fxs.glitch + dmg / 45);
  p.shake = Math.min(1, p.shake + dmg / 28);
  const a = Math.atan2(sx - p.x, sz - p.z);
  p.yaw += Math.sin(a - p.camYaw) * 0.03; p.pitch += rr(0.01, 0.04);
  SFX.hurt(dmg > 19);
  if (opts.crit) showEvent(term('critical', 'КРИТ'), 1.2, true);
  if (p.hp <= 0) { die(); return; }
  if (knock) {
    if (p.throwT > 0 && !p.thrown) p.grenades++;   // граната не успела уйти — остаётся в подсумке
    p.downT = 1.4; p.downAt = state.time; p.treatT = 0; p.reloadT = 0; p.throwT = 0; p.thrown = false; p.meleeT = 0; p.meleeHit = false;
    showEvent(term('down', 'СБИТ С НОГ'), 1.6, true);
  } else if (!bath && kind !== 'gas') showEvent(term('minor_hit', 'РАНЕН'), 0.9);
}
const busy = () => player.meleeT > 0 || player.treatT > 0 || player.maskT > 0 || player.throwT > 0 || player.downT > 0;
const _v = new THREE.Vector3(), _d = new THREE.Vector3();
function fire() {
  const p = player;
  if (p.cycleT > 0 || busy() || p.hp <= 0) return;
  if (p.reloadT > 0) { if (W.bolt && p.ammo > 0) p.reloadT = 0; else return; }
  if (p.ammo <= 0) { SFX.click(); p.cycleT = 0.25; showPrompt('R — перезарядка', 1.2); return; }
  p.ammo--; state.shots++; state.lastShot = state.time;
  p.cycleT = W.interval;
  vm.fire();
  vm.muzzleWorld(_v);
  muzzleFlash(_v);
  fxs.flash = 1;
  SFX.shot(); if (W.bolt) SFX.bolt(0.38);
  enemies.noise(p.x, p.z, 42);
  const spread = lerp(W.spread, 0.002, p.ads) * (1 + Math.hypot(p.vx, p.vz) * 0.25) * (1 - p.crouch * 0.3) * (1 + p.blood * 0.08) * (p.riseT > 0 ? 1.6 : 1);
  const yaw = p.camYaw + rr(-1, 1) * spread, pitch = p.camPitch + rr(-1, 1) * spread;
  const dx = -Math.sin(yaw) * Math.cos(pitch), dy = Math.sin(pitch), dz = -Math.cos(yaw) * Math.cos(pitch);
  _d.set(dx, dy, dz);
  fx.muzzleSmoke(_v, _d, W.bolt ? 1.4 : 0.8);
  const ox = camera.position.x, oy = camera.position.y, oz = camera.position.z;
  const w = rayTerrain(ox, oy, oz, dx, dy, dz, 150);
  const he = enemies.raycast(ox, oy, oz, dx, dy, dz, w.t);
  if (he) {
    state.hits++;
    const hx = ox + dx * he.t, hy = oy + dy * he.t, hz = oz + dz * he.t;
    const r = enemies.damage(he.e, W.dmg * he.hb[4] * rr(0.9, 1.1), hx, hy, hz, dx, dz, he.hb[5], { byPlayer: true });
    if (r && r.down && !r.tough) showEvent(`${he.e.u.name}: ${term('down', 'СБИТ С НОГ').toLowerCase()}`, 1.1);
    if (he.hb[5] === 'head') fxs.hit = 0.2;
  } else if (w.hit) {
    const hx = ox + dx * w.t, hy = oy + dy * w.t, hz = oz + dz * w.t;
    let nx = 0, ny = 1, nz = 0;
    if (w.kind === 'wall') { nx = w.nx; ny = 0.15; nz = w.nz; }
    fx.impact(hx, hy, hz, nx, ny, nz, w.mat || 1);
    SFX.hit(hx, hz, w.mat || 1, 0.4 / (1 + w.t * 0.08));
  }
  p.pitch += rr(W.kick * 0.83, W.kick * 1.15) * (1 - p.ads * 0.35);
  p.yaw += rr(-0.014, 0.014);
  p.shake = Math.min(1, p.shake + (W.bolt ? 0.28 : 0.16));
}
function reload() {
  const p = player;
  if (p.reloadT > 0 || p.ammo >= W.mag || p.reserve <= 0 || busy() || p.hp <= 0) return;
  if (W.bolt) p.reloadT = 0.6 + Math.min(W.mag - p.ammo, p.reserve) * W.perRound;
  else p.reloadT = W.magReload;
  p.reloadLoaded = 0; p.reloadTotal = p.reloadT;
  SFX.bolt(0); hidePrompt();
}
function melee() {
  if (busy() || player.hp <= 0) return;
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
    // СТРАХ: по такому врагу штыком труднее попасть — окно удара уже (стр. 17, 54)
    if (d > bd || (dx * fx_ + dz * fz_) / d < (e.u.fear ? 0.82 : 0.65)) continue;
    best = e; bd = d;
  }
  if (best) {
    const hb = enemies.hitboxes(best)[2];
    enemies.damage(best, 70, hb[0], hb[1], hb[2], fx_, fz_, 'body', { melee: true, byPlayer: true });
    best.knock.x += fx_ * 4; best.knock.z += fz_ * 4; best.hitT = 0.7;
    p.shake = Math.min(1, p.shake + 0.3);
    if (best.u.fear) showEvent(term('fear', 'СТРАХ'), 0.9);
  }
}
function treat() {
  const p = player;
  if (busy() || p.hp <= 0 || p.blood <= 0) return;
  p.treatT = 2.0; p.reloadT = 0; SFX.bandage();
  showEvent(term('treat', 'ПЕРЕВЯЗКА'), 2);
}
function toggleMask() {
  const p = player;
  if (busy() || p.hp <= 0) return;
  p.maskOn = !p.maskOn; p.maskT = 1.0; SFX.maskOn();
}
function throwGrenade() {
  const p = player;
  if (busy() || p.hp <= 0 || p.grenades <= 0) return;
  p.grenades--; p.throwT = 0.65; p.thrown = false; p.reloadT = 0; SFX.pin();
}
function updatePlayer(dt) {
  const p = player;
  if (p.hp <= 0) { p.eyeY = lerp(p.eyeY, heightAt(p.x, p.z) + 0.3, damp(3, dt)); p.roll = lerp(p.roll, 1.2, damp(2, dt)); return; }
  const ground = heightAt(p.x, p.z);
  // сбит с ног: камера в грязи, ничего не сделать
  if (p.downT > 0) {
    p.downT -= dt;
    p.vx *= 0.9; p.vz *= 0.9;
    p.eyeY = lerp(p.eyeY, ground + 0.38, damp(9, dt));
    p.roll = lerp(p.roll, 0.5, damp(6, dt));
    p.camYaw = lerp(p.camYaw, p.yaw, damp(6, dt)); p.camPitch = lerp(p.camPitch, p.pitch + 0.25, damp(6, dt));
    if (p.downT <= 0) p.riseT = 0.9;
    return;
  }
  const crouching = keys.KeyC || keys.ControlLeft;
  p.crouch = lerp(p.crouch, crouching ? 1 : 0, damp(10, dt));
  const aiming = rmb && p.reloadT <= 0 && !busy();
  p.ads = lerp(p.ads, aiming ? 1 : 0, damp(p.maskOn ? 7 : 11, dt));
  let ix = 0, iz = 0;
  if (keys.KeyW) iz -= 1; if (keys.KeyS) iz += 1; if (keys.KeyA) ix -= 1; if (keys.KeyD) ix += 1;
  const il = Math.hypot(ix, iz); if (il > 0) { ix /= il; iz /= il; }
  const sprint = keys.ShiftLeft && iz < 0 && p.stamina > 0.05 && !crouching && p.ads < 0.3 && p.treatT <= 0 && p.riseT <= 0;
  if (sprint && il > 0) p.stamina = Math.max(0, p.stamina - dt / 6 * (1 + p.blood * 0.1));
  else p.stamina = Math.min(1, p.stamina + dt / 4 * (p.maskOn ? 0.6 : 1) * (1 - p.blood * 0.08));
  let speed = sprint ? 5.0 : crouching ? 1.5 : aiming ? 1.8 : 2.9;
  if (p.riseT > 0) { p.riseT -= dt; speed *= 0.5; }
  if (p.treatT > 0) speed *= 0.4;
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
    if (sprint) enemies.noise(p.x, p.z, 7);
  }
  // камера на теле догоняет взгляд с задержкой
  const k = damp(lerp(12, 20, p.ads), dt);
  p.camYaw = lerp(p.camYaw, p.yaw, k);
  p.camPitch = lerp(p.camPitch, p.pitch, k);
  const eyeT = ground + lerp(CAM_H, CAM_CROUCH, p.crouch) - (p.riseT > 0 ? p.riseT * 0.5 : 0);
  p.eyeY = lerp(p.eyeY, eyeT, damp(p.riseT > 0 ? 5 : 30, dt));
  if (p.cycleT > 0) p.cycleT -= dt;
  if (p.meleeT > 0) { p.meleeT -= dt; updateMelee(); }
  if (p.reloadT > 0) {
    p.reloadT -= dt;
    if (W.bolt) {
      const need = Math.min(W.mag - p.ammo + p.reloadLoaded, p.reserve + p.reloadLoaded);
      const should = Math.floor(clamp((p.reloadTotal - p.reloadT - 0.3) / W.perRound, 0, need));
      while (p.reloadLoaded < should && p.ammo < W.mag && p.reserve > 0) { p.ammo++; p.reserve--; p.reloadLoaded++; SFX.roundIn(); }
      if (p.reloadT <= 0) { p.reloadT = 0; SFX.bolt(0); }
    } else if (p.reloadT <= 0) {
      const n = Math.min(W.mag - p.ammo, p.reserve); p.ammo += n; p.reserve -= n; p.reloadT = 0; SFX.roundIn(); SFX.bolt(0.1);
    }
  }
  // перевязка: рискованное действие, 58 % успеха (стр. 84)
  if (p.treatT > 0) {
    p.treatT -= dt;
    if (p.treatT <= 0) {
      if (Math.random() < 0.58) { p.blood = Math.max(0, p.blood - 1); showEvent('Кровь остановлена', 1.4); }
      else showEvent('Перевязка сорвалась', 1.4, true);
    }
  }
  if (p.maskT > 0) { const prev = p.maskT; p.maskT -= dt; if (prev > 0.3 && p.maskT <= 0.3) SFX.muffle(p.maskOn); }
  p.mask = lerp(p.mask, p.maskOn && p.maskT <= 0.3 ? 1 : 0, damp(8, dt));
  if (p.maskOn) { p.breathT -= dt; if (p.breathT <= 0) { p.breathPh = !p.breathPh; p.breathT = p.breathPh ? 1.4 : 1.7; SFX.breath(p.breathPh); } }
  // граната: бросок на середине замаха
  if (p.throwT > 0) {
    p.throwT -= dt;
    if (!p.thrown && p.throwT < 0.3) {
      p.thrown = true;
      camera.getWorldDirection(_d); _d.y += 0.12; _d.normalize();
      _v.copy(camera.position).addScaledVector(_d, 0.45); _v.y -= 0.1;
      hazards.throwGrenade(G, _v, _d, 'player');
      SFX.swing();
    }
  }
  if (mouseDown && p.cycleT <= 0 && !p.sprinting) { fire(); mouseDown = false; }
  // здоровье возвращается только до предела, который задают маркеры крови
  const cap = 100 - p.blood * 8;
  if (state.time - p.lastHurt > 5 && p.hp < cap) p.hp = Math.min(cap, p.hp + dt * 6);
  if (p.hp < 35 && state.time - p.lastBeat > 0.95) { p.lastBeat = state.time; SFX.heartbeat(); }
  // газ: без противогаза каждые 2,5 с кашель и маркер крови
  const gas = hazards.gas.level;
  if (gas > 0.3 && p.mask < 0.9) {
    p.gasT -= dt;
    if (p.gasT <= 0) { p.gasT = 2.5; SFX.cough(); hurtPlayer(3, p.x, p.z, 'gas'); if (promptT <= 0) showPrompt('X — противогаз', 1.6); }
  } else p.gasT = Math.min(p.gasT, 0.8);
  // заметность для часовых: фонарь, бег, вспышка выстрела, ракета
  let sight = 14 + (L.torchOn ? 30 : 0) + (p.sprinting ? 8 : 0) - p.crouch * 5 + (state.time - state.lastShot < 1.5 ? 30 : 0);
  if (L.flare.intensity > 300) sight *= 1.5;
  p.sight = sight;
  // подборы
  for (let i = enemies.drops.length - 1; i >= 0; i--) {
    const d = enemies.drops[i]; d.t += dt;
    if (Math.hypot(d.x - p.x, d.z - p.z) < 1.0) { p.reserve += 5; scene.remove(d.obj); enemies.drops.splice(i, 1); SFX.pickup(); showPrompt('+5 патронов', 1); }
    else if (d.t > 70) { scene.remove(d.obj); enemies.drops.splice(i, 1); }
  }
  for (const c of dressing.crates) {
    c.cd -= dt;
    if (c.cd <= 0 && Math.hypot(c.x - p.x, c.z - p.z) < 1.4) {
      p.reserve += 15; c.cd = 40; SFX.pickup();
      const ng = p.grenades < G.count; if (ng) p.grenades++;
      showPrompt('Ящик: +15 патронов' + (ng ? `, +1 ${G.name.toLowerCase()}` : ''), 1.8);
    }
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
  // дыхание, а с маркерами крови — заметная раскачка
  const sway = 1 + p.blood * 0.5 + (p.mask > 0.5 ? 0.4 : 0);
  const breathe = (Math.sin(t * 1.3) * 0.004 + Math.sin(t * 0.71) * 0.003) * sway;
  const swayX = Math.sin(t * 0.83 + 1.7) * 0.0025 * p.blood;
  const sy = Math.sin(p.camYaw), cy = Math.cos(p.camYaw);
  camera.position.set(p.x + cy * bobX, p.eyeY + bobY + breathe * 2, p.z - sy * bobX);
  const side = p.vx * cy - p.vz * sy;
  if (p.hp > 0 && p.downT <= 0) p.roll = lerp(p.roll, -side * 0.012, damp(5, dt));
  camera.rotation.set(p.camPitch + Math.sin(ph * 2) * 0.008 * b + rr(-1, 1) * sh * 0.03 + breathe,
    p.camYaw + rr(-1, 1) * sh * 0.03 + swayX, p.roll + rollB + rr(-1, 1) * sh * 0.02);
  const fov = lerp(FOV_HIP, FOV_ADS, p.ads) + (p.sprinting ? 4 : 0);
  if (Math.abs(camera.fov - fov) > 0.05) { camera.fov = lerp(camera.fov, fov, damp(10, dt)); camera.updateProjectionMatrix(); }
}

// ------------------------------------------------------------ появление врагов
function openNear(cx, cz, n) {
  // n свободных клеток вокруг (cx, cz) обходом в ширину
  const out = [], seen = new Set([idx(cx, cz)]), q = [[cx, cz]];
  while (q.length && out.length < n) {
    const [x, z] = q.shift(); out.push([x, z]);
    for (const [dx, dz] of DIRS) { const nx = x + dx, nz = z + dz, k = idx(nx, nz); if (!solid(nx, nz) && !seen.has(k)) { seen.add(k); q.push([nx, nz]); } }
  }
  while (out.length < n) out.push(out[out.length - 1] || [cx, cz]);
  return out;
}
// атакующие идут с Ничьей земли: передняя линия и сапы в приоритете
function chooseSpawnCell(minF = 12, maxF = 45, front = true) {
  const c = [], cf = [];
  for (let z = 0; z < GH; z++) for (let x = 0; x < GW; x++) {
    if (solid(x, z)) continue;
    const d = flow[idx(x, z)];
    if (d < minF || d > maxF) continue;
    if (los(cellCenter(x), cellCenter(z), player.x, player.z)) continue;
    c.push([x, z]);
    if (front && z <= map.lines.zF + 1) cf.push([x, z]);
  }
  const pool = cf.length && Math.random() < 0.7 ? cf : c;
  return pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
}
function spawnSquad(def, cell, opts = {}) {
  const squad = enemies.newSquad();
  const cells = openNear(cell[0], cell[1], def.units.length);
  def.units.forEach((key, i) => {
    const [cx, cz] = cells[i];
    const o = { squad, guard: opts.guard };
    if (opts.drop) {
      // спрыгивают с бруствера: стартуем у стенки, сверху
      const nb = DIRS.find(([dx, dz]) => solid(cx + dx, cz + dz));
      if (nb) { o.x = cellCenter(cx) + nb[0] * 0.55 + rr(-0.2, 0.2); o.z = cellCenter(cz) + nb[1] * 0.55 + rr(-0.2, 0.2); o.drop = true; }
    }
    enemies.spawn(key, cx, cz, o);
  });
  return squad;
}
function buildWave(n) {
  const F = FACTIONS[state.faction];
  let budget = 4 + n * 3.2;
  const q = [];
  const avail = F.squads.filter((s) => s.from <= n);
  // в каждой волне с 4-й хотя бы один тяжёлый отряд
  if (n >= 4) { const big = avail[avail.length - 1]; q.push(big); budget -= big.cost; }
  let guard = 0;
  while (budget >= 3 && guard++ < 40) {
    const s = avail[Math.floor(Math.random() * avail.length)];
    if (s.cost <= budget + 1) { q.push(s); budget -= s.cost; }
  }
  return q.sort(() => Math.random() - 0.5);
}
function startWave() {
  state.wave++;
  const n = state.wave;
  state.queue = buildWave(n);
  state.spawnT = 1;
  state.clock += 14 * 60;
  const total = state.queue.reduce((a, s) => a + s.units.length, 0);
  const hold = state.mission === 'hold';
  showCenter(hold ? `Атака ${n} из ${MISSIONS.hold.waves}` : `Волна ${n}`, n === 1 ? FACTIONS[state.faction].introSub : `${total} врагов в тумане`, 3);
  $('wave').textContent = hold ? `АТАКА ${n}/${MISSIONS.hold.waves}` : 'ВОЛНА ' + n;
  // события ночи: газ и обстрел
  const ev = [];
  if (hold) { if (n === 3 || n === 5) ev.push(['gas', 14]); if (n === 2 || n === 4 || n === 6) ev.push(['barrage', 6]); }
  else if (n >= 3) { if (Math.random() < 0.3) ev.push(['gas', rr(10, 25)]); if (Math.random() < 0.35) ev.push(['barrage', rr(5, 20)]); }
  state.events = ev.map(([k, t]) => ({ k, t }));
}
function updateEvents(dt) {
  for (let i = state.events.length - 1; i >= 0; i--) {
    const e = state.events[i];
    e.t -= dt;
    if (e.t > 0) continue;
    state.events.splice(i, 1);
    if (e.k === 'gas') { hazards.startGas(32); showEvent(term('gas', 'ГАЗ!') + ' · X — противогаз', 4, true); }
    if (e.k === 'barrage') { hazards.startBarrage(18, 1.6); showEvent('ОБСТРЕЛ · пригнитесь в окопе', 3.5, true); }
  }
}
function updateWaves(dt) {
  if (state.breakT > 0) { state.breakT -= dt; if (state.breakT <= 0) startWave(); return; }
  updateEvents(dt);
  const alive = enemies.fighting();
  if (state.queue.length) {
    state.spawnT -= dt;
    if (state.spawnT <= 0 && alive < 10) {
      const c = chooseSpawnCell();
      if (c) {
        const def = state.queue.pop();
        spawnSquad(def, c, { drop: Math.random() < 0.4 });
        state.spawnT = rr(3, 5.5);
      } else state.spawnT = 0.5;
    }
  } else if (alive === 0 && state.wave > 0) {
    enemies.dismissFleeing();
    state.repelled++;
    if (state.mission === 'hold' && state.wave >= MISSIONS.hold.waves) { win('Рассвет', 'Окоп удержан. Ночь кончилась, вы живы.'); return; }
    state.breakT = 10;
    showCenter('Атака отбита', 'Перевяжитесь (Q) и пополните патроны.', 3);
  }
}

// ------------------------------------------------------------ рейд
function setupRaid() {
  const F = FACTIONS[state.faction];
  // вход: голова сапы со стороны Ничьей земли
  const sap = map.saps[Math.floor(Math.random() * map.saps.length)] || { x: map.spawn[0], z: map.spawn[1] };
  let sx = sap.x, sz = sap.z;
  if (solid(sx, sz)) { const c = openNear(map.spawn[0], map.spawn[1], 1)[0]; sx = c[0]; sz = c[1]; }
  player.x = cellCenter(sx); player.z = cellCenter(sz);
  state.extract = { x: player.x, z: player.z };
  computeFlow(player.x, player.z);
  // реликвия: самый дальний блиндаж
  let best = null, bf = -1;
  for (const r of map.rooms) {
    const cx = cellOf(r.cx), cz = cellOf(r.cz);
    const f = flow[idx(clamp(cx, 0, GW - 1), clamp(cz, 0, GH - 1))];
    if (f > bf) { bf = f; best = [cx, cz]; }
  }
  if (!best || solid(best[0], best[1])) best = openNear(map.spawn[0], map.spawn[1] + 6, 1)[0];
  const rx = cellCenter(best[0]), rz = cellCenter(best[1]);
  state.relic = { x: rx, z: rz, taken: false };
  relicObj = new THREE.Group();
  const box = cloneModel('crate'); box.scale.setScalar(0.35); relicObj.add(box);
  const holy = state.faction === 'heretic';
  const glow = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), new THREE.MeshBasicMaterial({ color: holy ? new THREE.Color(14, 10, 4) : new THREE.Color(16, 1.2, 0.6) }));
  glow.position.y = 0.42; relicObj.add(glow);
  relicObj.position.set(rx, heightAt(rx, rz), rz);
  scene.add(relicObj);
  // гарнизон: часовые отрядами по всей системе траншей, один отряд у реликвии
  const pool = F.squads.filter((s) => s.from <= 3);
  spawnSquad(pool[0], best, { guard: true });
  for (let i = 0; i < 5; i++) {
    const c = chooseSpawnCell(9, 70, false);
    if (c) spawnSquad(pool[Math.floor(Math.random() * pool.length)], c, { guard: true });
  }
  state.alarm = false; state.reinfT = 0;
  $('wave').textContent = 'РЕЙД';
}
function updateRaid(dt) {
  const p = player, R = state.relic;
  if (!R) return;
  if (!R.taken && Math.hypot(R.x - p.x, R.z - p.z) < 1.4) {
    R.taken = true; p.hasRelic = true; scene.remove(relicObj); SFX.pickup();
    showCenter('Реликвия у вас', 'Назад к сапе, откуда пришли', 3);
    enemies.noise(p.x, p.z, 60);
  }
  if (R.taken && Math.hypot(state.extract.x - p.x, state.extract.z - p.z) < 2.2) { win('Рейд удался', `${FACTIONS[state.faction].raidRelic} добыта. Вы ушли на Ничью землю.`); return; }
  // после тревоги подходят подкрепления из тыла
  if (state.alarm) {
    state.reinfT -= dt;
    if (state.reinfT <= 0 && enemies.alive() < 12) {
      state.reinfT = 32;
      const F = FACTIONS[state.faction];
      const c = chooseSpawnCell(15, 70, false);
      if (c) spawnSquad(F.squads[Math.floor(Math.random() * F.squads.length)], c);
    }
  }
  if (relicObj) relicObj.children[1].scale.setScalar(1 + Math.sin(state.time * 4) * 0.25);
}
function objectiveText() {
  if (state.mission !== 'raid' || !state.relic) return '';
  const p = player;
  const t = state.relic.taken ? state.extract : state.relic;
  const d = Math.round(Math.hypot(t.x - p.x, t.z - p.z));
  return state.relic.taken ? `НАЗАД К САПЕ · ${d} м` : `РЕЛИКВИЯ · ${d} м`;
}

// ------------------------------------------------------------ интерфейс
let msgT = 0, promptT = 0, hudAcc = 0;
function showCenter(title, sub, dur) { const el = $('center-msg'); el.textContent = title; if (sub) { const s = document.createElement('small'); s.textContent = sub; el.append(s); } el.style.opacity = 1; msgT = dur; }
function showPrompt(t, dur) { const el = $('prompt'); el.textContent = t; el.style.opacity = 1; promptT = dur; }
function hidePrompt() { $('prompt').style.opacity = 0; promptT = 0; }
function updateHud(dt) {
  if (msgT > 0) { msgT -= dt; if (msgT <= 0) $('center-msg').style.opacity = 0; }
  if (promptT > 0) { promptT -= dt; if (promptT <= 0) hidePrompt(); }
  if (evT > 0) { evT -= dt; if (evT <= 0) $('event').style.opacity = 0; }
  $('hitmark').style.opacity = fxs.hit > 0 ? 1 : 0;
  hudAcc += dt; if (hudAcc < 0.1) return; hudAcc = 0;
  const t = Math.floor(state.clock), hh = String(Math.floor(t / 3600) % 24).padStart(2, '0'), mm = String(Math.floor(t / 60) % 60).padStart(2, '0'), ss = String(t % 60).padStart(2, '0');
  $('time').textContent = `25.11.1914 ${hh}:${mm}:${ss}`;
  $('rec').classList.toggle('off', Math.floor(state.time * 1.4) % 2 === 1);
  $('kills').textContent = 'УБИТО ' + state.kills;
  $('objective').textContent = objectiveText();
  let a = ''; for (let i = 0; i < W.mag; i++) a += `<span class="rnd${i < player.ammo ? '' : ' empty'}"></span>`;
  $('ammo').innerHTML = a; $('reserve').textContent = ' / ' + player.reserve;
  let b = ''; for (let i = 0; i < MAX_BLOOD; i++) b += `<span class="bm${i < player.blood ? ' on' : ''}"></span>`;
  $('blood').innerHTML = `${term('blood', 'КРОВЬ')} ${b}`;
  $('nades').textContent = `${G.name.toUpperCase()} ×${player.grenades} · G`;
  $('torch-ind').textContent = (L.torchOn ? 'ФОНАРЬ ВКЛ · F' : 'ФОНАРЬ ВЫКЛ · F') + (player.maskOn ? ' · ПРОТИВОГАЗ · X' : '');
  if (player.ammo === 0 && player.reloadT <= 0 && promptT <= 0) showPrompt(player.reserve > 0 ? 'R — перезарядка' : 'Патроны кончились: V — штык, ящики в блиндажах', 0.5);
  else if (player.blood >= 3 && promptT <= 0 && state.time - player.lastHurt > 4 && player.treatT <= 0) showPrompt('Q — перевязка', 0.5);
}

// ------------------------------------------------------------ поток игры
function resetRun() {
  enemies.clear(); fx.clear(); hazards.clear();
  if (relicObj) { scene.remove(relicObj); relicObj = null; }
  Object.assign(player, {
    x: cellCenter(map.spawn[0]), z: cellCenter(map.spawn[1]), vx: 0, vz: 0, hp: 100, ammo: W.mag, reserve: W.reserve, cycleT: 0, reloadT: 0, meleeT: 0, stamina: 1, crouch: 0, ads: 0, roll: 0, lastHurt: -99, shake: 0,
    blood: 0, downT: 0, downAt: -99, riseT: 0, treatT: 0, mask: 0, maskOn: false, maskT: 0, gasT: 0, grenades: G.count, throwT: 0, hasRelic: false,
  });
  SFX.muffle(false);
  Object.assign(state, { wave: 0, repelled: 0, kills: 0, queue: [], breakT: 4, time: 0, deadT: 0, shots: 0, hits: 0, clock: CLOCK0, alarm: false, relic: null, extract: null, events: [], lastShot: -99 });
  $('wave').textContent = state.mission === 'hold' ? `АТАКА 0/${MISSIONS.hold.waves}` : 'ВОЛНА 0';
  if (state.mission === 'raid') { setupRaid(); state.breakT = 0; }
  else computeFlow(player.x, player.z);
  // смотрим вдоль самого длинного прохода
  let bestYaw = 0, bestLen = -1;
  for (const [yaw, dx, dz] of [[0, 0, -1], [Math.PI, 0, 1], [Math.PI / 2, -1, 0], [-Math.PI / 2, 1, 0]]) {
    const r = rayTerrain(player.x, heightAt(player.x, player.z) + 1.4, player.z, dx, 0, dz, 60); if (r.t > bestLen) { bestLen = r.t; bestYaw = yaw; }
  }
  player.yaw = player.camYaw = player.prevYaw = bestYaw; player.pitch = player.camPitch = player.prevPitch = 0; player.wYaw = player.wPitch = 0;
  player.eyeY = heightAt(player.x, player.z) + CAM_H;
  for (const c of dressing.crates) c.cd = 0;
  Object.assign(fxs, { dmg: 0, glitch: 0.7, flash: 0, hit: 0 });
  post.resetExp = true;
}
function startGame(faction) {
  state.faction = faction;
  const f = FACTIONS[faction];
  W = f.weapon; G = f.grenade;
  enemies.ctx.factionData = f;
  $('unit').textContent = f.unit; $('squad').textContent = f.squad;
  if (vm) vm.dispose(camera);
  vm = new Viewmodel(camera, f);
  resetRun();
  startAudio();
  state.mode = 'playing';
  $('menu').hidden = true; $('dead').hidden = true; $('pause').hidden = true; $('hud').hidden = false;
  $('dot').style.display = showDot ? 'block' : 'none';
  const M = MISSIONS[state.mission];
  if (state.mission === 'raid') showCenter(M.name, 'Найдите реликвию в дальнем блиндаже. Фонарь (F) выдаёт вас.', 4.5);
  else showCenter(f.intro, `${M.name} · первая атака через несколько секунд`, 3.5);
  requestLock();
}
function requestLock() {
  if (noLock) return;
  try { const r = canvas.requestPointerLock(); if (r && r.catch) r.catch(() => { noLock = true; }); } catch (e) { noLock = true; }
}
// звук и музыка стартуют только после действия игрока (правило браузеров)
function startAudio() {
  SFX.init();
  if (!MUSIC.bus) MUSIC.init(musicUrl()).then(() => MUSIC.start());
  else MUSIC.start();
}
function pause() {
  if (state.mode !== 'playing') return;
  state.mode = 'paused'; $('pause').hidden = false; $('pause-tip').textContent = tipText();
  mouseDown = false; rmb = false; for (const k in keys) keys[k] = false;
}
function resume() { state.mode = 'playing'; $('pause').hidden = true; SFX.init(); requestLock(); }
function toMenu() {
  state.mode = 'menu';
  $('pause').hidden = true; $('dead').hidden = true; $('hud').hidden = true; $('menu').hidden = false;
  if (document.pointerLockElement) document.exitPointerLock();
  enemies.clear(); hazards.clear(); player.maskOn = false; player.mask = 0; SFX.muffle(false);
  if (relicObj) { scene.remove(relicObj); relicObj = null; }
  if (vm) { vm.dispose(camera); vm = null; }
}
function statsHtml() {
  const acc = state.shots ? Math.round((state.hits / state.shots) * 100) : 0;
  const t = Math.floor(state.survived);
  const first = state.mission === 'raid' ? `Задание: ${MISSIONS.raid.name}` : `Атак отбито: ${state.repelled}`;
  return `${first}<br>Убито: ${state.kills}<br>Бежало: ${enemies.fled}<br>Точность: ${acc}%<br>Продержались: ${Math.floor(t / 60)} мин ${t % 60} с`;
}
function endScreen(eyebrow, title, won) {
  if (document.pointerLockElement) document.exitPointerLock();
  $('dead-eyebrow').textContent = eyebrow; $('dead-title').textContent = title;
  $('dead-title').classList.toggle('won', won);
  $('stats').innerHTML = statsHtml();
  $('dead-tip').textContent = tipText();
  $('dead').hidden = false; $('hud').hidden = true;
}
function die() {
  state.mode = 'dying'; state.deadT = 0; state.survived = state.time;
  SFX.scream(player.x, player.z, 0.3);
  setTimeout(() => { state.mode = 'dead'; endScreen('Сигнал потерян', 'Конец записи', false); }, 2300);
}
function win(title, sub) {
  if (state.mode !== 'playing' || player.hp <= 0) return;
  state.mode = 'won'; state.survived = state.time;
  showCenter(title, sub, 4);
  hazards.barrage.dur = 0; hazards.gas.dur = 0;
  setTimeout(() => { if (state.mode === 'won') endScreen(sub, title, true); }, 2600);
}

// ------------------------------------------------------------ ввод
document.addEventListener('keydown', (ev) => {
  if (ev.code === 'Escape' && noLock && state.mode === 'playing') { pause(); return; }
  if (state.mode !== 'playing') return;
  keys[ev.code] = true;
  if (ev.code === 'KeyR') reload();
  if (ev.code === 'KeyV') melee();
  if (ev.code === 'KeyF') { toggleTorch(); SFX.click(); }
  if (ev.code === 'KeyG') throwGrenade();
  if (ev.code === 'KeyQ') treat();
  if (ev.code === 'KeyX') toggleMask();
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
function setMission(m) {
  if (!MISSIONS[m]) m = 'hold';
  state.mission = m; store.set('mission', m);
  for (const b of document.querySelectorAll('.mission')) b.setAttribute('aria-pressed', String(b.dataset.m === m));
  $('mission-brief').textContent = MISSIONS[m].brief;
}
for (const b of document.querySelectorAll('.mission')) b.addEventListener('click', () => setMission(b.dataset.m));
setMission(state.mission);
const sensEl = $('sens'), volEl = $('vol'), dotEl = $('showdot'), qEl = $('quality');
sensEl.value = sens; volEl.value = SFX.vol; dotEl.checked = showDot; qEl.value = qKey;
sensEl.addEventListener('input', () => { sens = +sensEl.value; store.set('sens', sens); });
volEl.addEventListener('input', () => { SFX.setVol(+volEl.value); store.set('vol', +volEl.value); });
dotEl.addEventListener('change', () => { showDot = dotEl.checked; store.set('showdot', showDot); });
qEl.addEventListener('change', () => { store.set('quality', qEl.value); location.reload(); });
const musicEl = $('musicvol');
musicEl.value = MUSIC.vol;
musicEl.addEventListener('input', () => MUSIC.setVol(+musicEl.value));
$('open-codex').addEventListener('click', () => { startAudio(); $('menu').hidden = true; $('codex').hidden = false; });
$('close-codex').addEventListener('click', () => { $('codex').hidden = true; $('menu').hidden = false; });
document.addEventListener('keydown', (ev) => { if (ev.code === 'Escape' && !$('codex').hidden) { $('codex').hidden = true; $('menu').hidden = false; } });

// ------------------------------------------------------------ рендер-параметры
const P = {
  time: 0, dt: 0.016, fogDensity: 0.055, fogAmb: new THREE.Vector3(), vel: new THREE.Vector2(), dmg: 0, glitch: 0, flash: 0, dead: 0, lowhp: 0, rain: 1, blood: 0, gas: 0,
  torch: { pos: new THREE.Vector3(), dir: new THREE.Vector3(), col: new THREE.Vector3(), cosOut: 0.88, cosIn: 0.95, shadowMap: null, shadowMatrix: null },
  flare: { pos: new THREE.Vector3(), col: new THREE.Vector3() },
  lanterns: Array.from({ length: 6 }, () => ({ pos: new THREE.Vector3(), col: new THREE.Vector3() })),
  muzzle: { pos: new THREE.Vector3(), col: new THREE.Vector3() },
};
const _t2 = new THREE.Vector3();
const GAS_AMB = new THREE.Vector3(0.007, 0.0085, 0.0022);
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
  // в объёмный туман идёт самая яркая вспышка: выстрел, чужой выстрел или взрыв
  let mz = L.muzzle.intensity > L.enemyMuzzle.intensity ? L.muzzle : L.enemyMuzzle;
  if (L.blast.intensity * 0.3 > mz.intensity) mz = L.blast;
  const mk = mz === L.blast ? 0.3 * 0.3 : 0.3;
  P.muzzle.pos.copy(mz.position); P.muzzle.col.set(mz.color.r, mz.color.g, mz.color.b).multiplyScalar(mz.intensity * PHASE * mk);
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
  const playing = state.mode === 'playing' || state.mode === 'dying' || state.mode === 'won';
  if (playing) {
    state.time += dt; state.clock += dt;
    if (state.mode === 'playing') {
      updatePlayer(dt);
      if (Math.floor(state.time * 4) !== Math.floor((state.time - dt) * 4)) computeFlow(player.x, player.z);
      enemies.update(dt, player);
      hazards.update(dt);
      if (state.mode === 'playing') { if (state.mission === 'raid') updateRaid(dt); else updateWaves(dt); }
    } else {
      state.deadT += dt; updatePlayer(dt);
      enemies.update(dt * 0.5, player);
      hazards.update(dt);
    }
    updateCamera(dt);
    player.wYaw = lerp(player.wYaw || 0, (player.camYaw - player.prevYaw) / dt, damp(20, dt));
    player.wPitch = lerp(player.wPitch || 0, (player.camPitch - player.prevPitch) / dt, damp(20, dt));
    player.prevYaw = player.camYaw; player.prevPitch = player.camPitch;
    if (vm) {
      vm.root.visible = !hideVm && player.downT <= 0 && player.hp > 0;
      vm.update(dt, { ads: player.ads, dyaw: player.yaw - player.camYaw, dpitch: player.pitch - player.camPitch, sprint: player.sprinting, stepPh: player.stepPh, bob: player.bobAmt, reload: player.reloadT, reloadTotal: player.reloadTotal, cycle: W.bolt ? player.cycleT : 0, melee: player.meleeT, throwT: player.throwT, treat: player.treatT, time: state.time });
    }
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
  if (state.mode === 'playing' && enemies) {
    const near = enemies.list.some((e) => e.alive && e.alert && Math.hypot(e.x - player.x, e.z - player.z) < 30) || hazards.barrageActive();
    MUSIC.setDuck(near ? 0.35 : 1);
  } else MUSIC.setDuck(state.mode === 'menu' ? 1 : 0.6);
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
  const live = state.mode === 'playing';
  P.dmg = fxs.dmg + (player.hp < 35 && live ? (1 - player.hp / 35) * 0.35 * (0.8 + Math.sin(state.time * 6.5) * 0.2) : 0);
  P.glitch = fxs.glitch; P.flash = fxs.flash;
  P.dead = state.mode === 'dying' ? clamp((state.deadT - 1.2) / 1.0, 0, 1) : 0;
  P.lowhp = live ? clamp(1 - player.hp / 50, 0, 1) : 0;
  P.blood = live || state.mode === 'dying' ? player.blood / MAX_BLOOD : 0;
  // газ: туман гуще и желтеет, тяжёлое облако лежит в окопе
  const gas = hazards ? hazards.gas.level : 0;
  P.gas = gas;
  P.fogDensity = 0.055 * (1 + gas * 2.4);
  if (gas > 0) P.fogAmb.lerp(GAS_AMB, gas * 0.8);
  post.render(scene, camera, P);
}

boot();
requestAnimationFrame(frame);

// для автотестов
window.__game = {
  state, player, keys, camera, scene, post, get enemies() { return enemies; }, get vm() { return vm; }, get hazards() { return hazards; }, startGame, step, render, fire, reload, melee, treat, toggleMask, throwGrenade, map, L,
  setMouse(v) { mouseDown = v; }, setAim(v) { rmb = v; }, setMission, los, chooseSpawnCell, spawnSquad, solid, cellCenter, CELL, FACTIONS,
  clean(hide = true) { fxs.glitch = 0; fxs.dmg = 0; fxs.flash = 0; hideVm = hide; if (vm) vm.root.visible = !hide; },
  look(px, py, pz, tx, ty, tz) { state.mode = 'paused'; camera.position.set(px, py, pz); camera.lookAt(tx, ty, tz); camera.updateMatrixWorld(); render(1 / 30); renderer.getContext().finish(); },
  frame(dt = 1 / 30, n = 1) { for (let i = 0; i < n; i++) step(dt); render(dt); renderer.getContext().finish(); },
  sim(dt, n) { for (let i = 0; i < n; i++) step(dt); },
};
