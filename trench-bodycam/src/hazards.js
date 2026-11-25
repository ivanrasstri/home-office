// Взрывы, гранаты, газовая атака и артобстрел.
// Правила книги: BLAST задевает только тех, кто видит точку взрыва (стр. 53) — стенка окопа спасает;
// у демонической гранаты IGNORE COVER, она бьёт сквозь стены (стр. 132). Газ кладёт маркеры крови (стр. 189).
import * as THREE from 'three';
import { cloneModel } from './assets.js';
import { GW, GH, CELL } from './config.js';
import { heightAt, normalAt, rayTerrain, solid, cellOf } from './trenchmap.js';
import { rr, clamp } from './util.js';
import { blastFlash } from './lights.js';

const _n = new THREE.Vector3(), _p = new THREE.Vector3();

export class Hazards {
  constructor(scene, ctx) {
    // ctx: { fx, audio, enemies, player, hurtPlayer, shake(amount), noise(x, z, r) }
    this.scene = scene; this.ctx = ctx;
    this.grenades = [];
    this.pending = [];          // снаряды в полёте: свист уже слышен
    this.gas = { t: 0, dur: 0, level: 0 };
    this.barrage = { t: 0, dur: 0, next: 0, rate: 2 };
  }
  clear() {
    for (const g of this.grenades) this.scene.remove(g.obj);
    this.grenades.length = 0; this.pending.length = 0;
    this.gas = { t: 0, dur: 0, level: 0 };
    this.barrage = { t: 0, dur: 0, next: 0, rate: 2 };
  }
  // ---------------------------------------------------------- гранаты
  throwGrenade(spec, origin, dir, owner = 'player') {
    const obj = cloneModel('grenade');
    obj.position.copy(origin);
    this.scene.add(obj);
    const v = new THREE.Vector3().copy(dir).multiplyScalar(13).add(new THREE.Vector3(0, 3.2, 0));
    this.grenades.push({ obj, spec, owner, v, fuse: spec.fuse, spin: new THREE.Vector3(rr(-9, 9), rr(-4, 4), rr(-9, 9)), bounced: 0 });
  }
  updateGrenades(dt) {
    for (let i = this.grenades.length - 1; i >= 0; i--) {
      const g = this.grenades[i], p = g.obj.position;
      g.fuse -= dt;
      const sub = 3, h = dt / sub;
      for (let s = 0; s < sub; s++) {
        g.v.y -= 9.8 * h;
        const nx = p.x + g.v.x * h, nz = p.z + g.v.z * h, ny = p.y + g.v.y * h;
        const ground = heightAt(nx, nz);
        if (ground > ny + 0.25 && ground > p.y - 0.05) {
          // стенка окопа: отражаем горизонтальную скорость от склона
          normalAt(nx, nz, _n); _n.y = 0; _n.normalize();
          const d = g.v.x * _n.x + g.v.z * _n.z;
          if (d < 0) { g.v.x -= 1.6 * d * _n.x; g.v.z -= 1.6 * d * _n.z; }
          g.v.x *= 0.5; g.v.z *= 0.5;
          if (g.bounced++ < 6) this.ctx.audio.thud(p.x, p.z);
        } else { p.x = nx; p.z = nz; }
        p.y = ny;
        const gh = heightAt(p.x, p.z) + 0.04;
        if (p.y < gh) {
          p.y = gh;
          if (g.v.y < -1.5 && g.bounced++ < 6) this.ctx.audio.thud(p.x, p.z);
          g.v.y = Math.abs(g.v.y) * 0.28; g.v.x *= 0.62; g.v.z *= 0.62;
          g.spin.multiplyScalar(0.6);
        }
        if (p.x < 0 || p.z < 0 || p.x > GW * CELL || p.z > GH * CELL) { g.fuse = Math.min(g.fuse, 0); break; }
      }
      g.obj.rotation.x += g.spin.x * dt; g.obj.rotation.y += g.spin.y * dt; g.obj.rotation.z += g.spin.z * dt;
      if (g.fuse <= 0) {
        this.scene.remove(g.obj); this.grenades.splice(i, 1);
        const s = g.spec;
        this.explode(p.x, p.y + 0.15, p.z, { radius: s.radius, dmg: s.dmg, owner: g.owner, los: s.los, ignoreArmour: s.ignoreArmour, holy: s.holy, color: s.color });
      }
    }
  }
  // ---------------------------------------------------------- взрыв
  explode(x, y, z, o) {
    const { fx, audio, enemies, player } = this.ctx;
    const r = o.radius || 4, col = o.color || [10, 5, 2];
    // свет, звук, грязь, дым, искры, воронка
    const lc = Math.max(col[0], col[1], col[2]);
    blastFlash(_p.set(x, y, z), [col[0] / lc, col[1] / lc, col[2] / lc], clamp(r / 5, 0.6, 1.4));
    audio.explosion(x, z, clamp(r / 5, 0.6, 1.5));
    const dirt = [0.07, 0.05, 0.035];
    for (let i = 0; i < 70; i++) {
      const a = rr(0, 6.28), s = rr(2, 11), up = rr(3, 13);
      fx.lit.emit(x, y, z, Math.cos(a) * s, up, Math.sin(a) * s, dirt[0], dirt[1], dirt[2], rr(0.02, 0.06), rr(0.8, 1.8), { grav: 9.8, drag: 0.25 });
    }
    for (let i = 0; i < 26; i++) {
      const a = rr(0, 6.28), s = rr(0.3, 2.4);
      fx.lit.emit(x + rr(-0.5, 0.5), y + rr(0, 0.8), z + rr(-0.5, 0.5), Math.cos(a) * s, rr(0.6, 2.4), Math.sin(a) * s, 0.16, 0.15, 0.14, rr(0.35, 0.7), rr(2.5, 5), { grav: -0.25, drag: 1.1, grow: rr(0.5, 1.1), alpha: 0.32 });
    }
    for (let i = 0; i < 34; i++) {
      const a = rr(0, 6.28), s = rr(4, 16);
      fx.glow.emit(x, y + 0.2, z, Math.cos(a) * s, rr(1, 9), Math.sin(a) * s, col[0], col[1], col[2], rr(0.01, 0.025), rr(0.1, 0.4), { grav: 9.8, drag: 0.4 });
    }
    for (let i = 0; i < 4; i++) fx.glow.emit(x, y + 0.4, z, rr(-1, 1), rr(0.5, 2), rr(-1, 1), col[0] * 0.5, col[1] * 0.5, col[2] * 0.5, rr(0.5, 0.9), 0.18, { grav: 0, drag: 2, grow: 2 });
    fx.decal('hole', x, heightAt(x, z), z, 0, 1, 0, r * 0.45);
    this.ctx.noise && this.ctx.noise(x, z, 45);
    // урон врагам
    const hitBy = (tx, ty, tz) => {
      const dx = tx - x, dy = ty - y, dz = tz - z, d = Math.hypot(dx, dy, dz);
      if (d > r) return 0;
      if (o.los !== false && d > 0.4) {
        const w = rayTerrain(x, y + 0.25, z, dx / d, (dy - 0.25) / d, dz / d, d);
        if (w.hit && w.t < d - 0.35) return 0;
      }
      return 1 - 0.6 * (d / r) * (d / r);
    };
    for (const e of enemies.list) {
      if (!e.alive) continue;
      enemies.chest(e, _p);
      const k = hitBy(_p.x, _p.y, _p.z);
      if (k <= 0) continue;
      const dx = e.x - x, dz = e.z - z, dl = Math.hypot(dx, dz) || 1;
      enemies.damage(e, o.dmg * k, _p.x, _p.y, _p.z, dx / dl, dz / dl, 'body', { blast: true, ignoreArmour: o.ignoreArmour, holy: o.holy, byPlayer: o.owner === 'player' });
    }
    // игрок: осколки всегда оставляют маркер крови (SHRAPNEL, стр. 55)
    if (player.hp > 0) {
      const k = hitBy(player.x, player.eyeY - 0.35, player.z);
      if (k > 0) this.ctx.hurtPlayer(o.dmg * k * (o.owner === 'player' ? 0.6 : 1), x, z, 'blast', { shrapnel: true, big: o.dmg * k > 28 });
      const d = Math.hypot(player.x - x, player.z - z);
      this.ctx.shake(clamp(1.2 - d / 18, 0, 1));
    }
  }
  // ---------------------------------------------------------- газ
  startGas(dur = 32) { this.gas.t = 0; this.gas.dur = dur; this.ctx.audio.gasAlarm(); }
  gasActive() { return this.gas.dur > 0; }
  updateGas(dt) {
    const g = this.gas;
    if (g.dur <= 0) { g.level = Math.max(0, g.level - dt * 0.2); return; }
    g.t += dt;
    const rise = clamp((g.t - 4) / 6, 0, 1), fall = clamp((g.dur - g.t) / 8, 0, 1);
    g.level = Math.min(rise, fall);
    if (g.t >= g.dur) { g.dur = 0; g.level = 0; }
  }
  // ---------------------------------------------------------- артобстрел
  startBarrage(dur = 20, rate = 1.8) { this.barrage.t = 0; this.barrage.dur = dur; this.barrage.next = 2.5; this.barrage.rate = rate; }
  barrageActive() { return this.barrage.dur > 0; }
  updateBarrage(dt) {
    const b = this.barrage, { player, audio } = this.ctx;
    if (b.dur > 0) {
      b.t += dt; b.next -= dt;
      if (b.next <= 0) {
        b.next = rr(0.6, 1.4) * b.rate;
        // снаряды ложатся вокруг игрока, иногда прямо в окоп
        for (let k = 0; k < 8; k++) {
          const a = rr(0, 6.28), d = rr(4, 30);
          const x = clamp(player.x + Math.cos(a) * d, 2, GW * CELL - 2), z = clamp(player.z + Math.sin(a) * d * 0.8, 2, GH * CELL - 2);
          if (Math.hypot(x - player.x, z - player.z) < 4) continue;   // прямое попадание в игрока — нечестно, но близкий разрыв опасен
          const t = rr(1.0, 1.3);
          audio.whistle(x, z, t);
          this.pending.push({ x, z, t });
          break;
        }
      }
      if (b.t >= b.dur) b.dur = 0;
    }
    for (let i = this.pending.length - 1; i >= 0; i--) {
      const s = this.pending[i];
      s.t -= dt;
      if (s.t <= 0) {
        this.pending.splice(i, 1);
        const inTrench = !solid(cellOf(s.x), cellOf(s.z));
        this.explode(s.x, heightAt(s.x, s.z) + 0.15, s.z, { radius: 4.5, dmg: 85, owner: 'world', los: true, color: [10, 5.5, 2.2] });
        if (!inTrench) this.ctx.shake(0.15);
      }
    }
  }
  update(dt) {
    this.updateGrenades(dt);
    this.updateGas(dt);
    this.updateBarrage(dt);
  }
}
