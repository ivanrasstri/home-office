// Звук, синтезированный в WebAudio, с «микрофоном нагрудной камеры»: компрессия, перегруз, срез низов.
import { clamp, rr, store } from './util.js';

export const SFX = {
  ctx: null, master: null, rev: null, noise: null, vol: store.get('vol', 0.8),
  listener: { x: 0, z: 0, yaw: 0 },
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const C = window.AudioContext || window.webkitAudioContext; if (!C) return;
    const ctx = this.ctx = new C();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -24; comp.knee.value = 8; comp.ratio.value = 12; comp.attack.value = 0.002; comp.release.value = 0.25;
    const shaper = ctx.createWaveShaper(); const curve = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) { const x = i / 512 - 1; curve[i] = Math.tanh(x * 2.0) / Math.tanh(2.0); }
    shaper.curve = curve;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 110;
    const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 9500;
    this.master = ctx.createGain(); this.master.gain.value = this.vol;
    this.master.connect(comp); comp.connect(shaper); shaper.connect(hp); hp.connect(lp); lp.connect(ctx.destination);
    const len = ctx.sampleRate * 2, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    this.noise = b;
    // реверберация узкой траншеи: короткие сильные отражения + хвост
    const ir = ctx.createBuffer(2, ctx.sampleRate * 2.2, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const dd = ir.getChannelData(ch);
      for (let i = 0; i < dd.length; i++) dd[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / dd.length, 3.5) * 0.7;
      for (const tap of [0.011, 0.019, 0.027, 0.041]) { const k = Math.floor(tap * ctx.sampleRate * (1 + ch * 0.07)); dd[k] += 0.9; }
    }
    this.rev = ctx.createConvolver(); this.rev.buffer = ir;
    const rg = ctx.createGain(); rg.gain.value = 0.42; this.rev.connect(rg); rg.connect(this.master);
    this.ambient();
  },
  setVol(v) { this.vol = v; if (this.master) this.master.gain.value = v; },
  panOf(x, z) {
    const L = this.listener, dx = x - L.x, dz = z - L.z, d = Math.hypot(dx, dz) || 1;
    return clamp((dx * Math.cos(L.yaw) - dz * Math.sin(L.yaw)) / d, -1, 1) * 0.85;
  },
  distOf(x, z) { return Math.hypot(x - this.listener.x, z - this.listener.z); },
  out(pan, rev) {
    const c = this.ctx, g = c.createGain();
    if (c.createStereoPanner) { const p = c.createStereoPanner(); p.pan.value = clamp(pan || 0, -1, 1); g.connect(p); p.connect(this.master); if (rev) { const s = c.createGain(); s.gain.value = rev; p.connect(s); s.connect(this.rev); } }
    else g.connect(this.master);
    return g;
  },
  noiseB({ dur = 0.2, type = 'lowpass', f = 1000, f1 = 0, q = 0.7, vol = 0.5, pan = 0, rev = 0.15, attack = 0.002, delay = 0 }) {
    const c = this.ctx; if (!c || vol < 0.0005) return;
    const t = c.currentTime + delay;
    const src = c.createBufferSource(); src.buffer = this.noise; src.loop = true;
    const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.setValueAtTime(f, t); if (f1) fl.frequency.exponentialRampToValueAtTime(f1, t + dur); fl.Q.value = q;
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(fl); fl.connect(g); g.connect(this.out(pan, rev));
    src.start(t, Math.random() * 1.5); src.stop(t + dur + 0.05);
  },
  tone({ type = 'sine', f = 200, f1 = 0, dur = 0.2, vol = 0.3, pan = 0, rev = 0.1, delay = 0, attack = 0.004, lp = 0 }) {
    const c = this.ctx; if (!c || vol < 0.0005) return;
    const t = c.currentTime + delay;
    const o = c.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let n = o; if (lp) { const fl = c.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = lp; o.connect(fl); n = fl; }
    n.connect(g); g.connect(this.out(pan, rev)); o.start(t); o.stop(t + dur + 0.05);
  },
  ambient() {
    const c = this.ctx;
    const loop = (type, f, q, vol, off) => {
      const s = c.createBufferSource(); s.buffer = this.noise; s.loop = true;
      const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q;
      const g = c.createGain(); g.gain.value = vol;
      s.connect(fl); fl.connect(g); g.connect(this.master); s.start(0, off);
      return g;
    };
    const wind = loop('lowpass', 360, 0.7, 0.06, 0.1);
    const lfo = c.createOscillator(); lfo.frequency.value = 0.08; const lg = c.createGain(); lg.gain.value = 0.04; lfo.connect(lg); lg.connect(wind.gain); lfo.start();
    loop('highpass', 6000, 0.7, 0.012, 0.7);     // шипение микрофона
    loop('bandpass', 2600, 0.35, 0.035, 1.1);    // дождь
    loop('bandpass', 900, 0.5, 0.02, 0.4);       // капли по доскам и железу
  },
  shot() {
    this.noiseB({ dur: 0.55, f: 8000, f1: 400, vol: 1.0, rev: 1.2 });
    this.noiseB({ dur: 0.05, type: 'highpass', f: 2600, vol: 0.95, rev: 0.4 });
    this.tone({ f: 160, f1: 30, dur: 0.38, vol: 1.0 });
    this.tone({ f: 60, f1: 25, dur: 0.6, vol: 0.6, rev: 0.4 });
  },
  enemyShot(x, z) {
    const dist = this.distOf(x, z), pan = this.panOf(x, z);
    const v = 0.9 / (1 + dist * 0.1), f = 5000 / (1 + dist * 0.06);
    this.noiseB({ dur: 0.55, f, f1: f * 0.2, vol: v, pan, rev: 1.4 });
    this.tone({ f: 110, f1: 28, dur: 0.35, vol: v * 0.7, pan });
  },
  crack(pan) { this.noiseB({ dur: 0.03, type: 'highpass', f: 3500, vol: 0.55, pan }); this.noiseB({ dur: 0.12, type: 'bandpass', f: 1800, f1: 600, q: 2, vol: 0.18, pan, delay: 0.02 }); },
  click() { this.noiseB({ dur: 0.035, type: 'bandpass', f: 3200, q: 4, vol: 0.25, rev: 0 }); },
  bolt(delay = 0) {
    this.noiseB({ dur: 0.06, type: 'bandpass', f: 2200, q: 3, vol: 0.35, delay, rev: 0.05 });
    this.noiseB({ dur: 0.05, type: 'bandpass', f: 1500, q: 3, vol: 0.28, delay: delay + 0.13 });
    this.noiseB({ dur: 0.07, type: 'bandpass', f: 1900, q: 3, vol: 0.32, delay: delay + 0.32 });
    this.noiseB({ dur: 0.05, type: 'bandpass', f: 2700, q: 3, vol: 0.34, delay: delay + 0.47 });
    this.tone({ f: 4200, f1: 3000, dur: 0.18, vol: 0.02, delay: delay + 0.2 }); // гильза
    this.noiseB({ dur: 0.08, type: 'bandpass', f: 3800, q: 6, vol: 0.06, delay: delay + 0.75 });
  },
  roundIn(delay = 0) { this.noiseB({ dur: 0.05, type: 'bandpass', f: 2800, q: 5, vol: 0.22, delay }); this.tone({ f: 2400, f1: 1800, dur: 0.05, vol: 0.03, delay }); },
  step(k = 1, wet = 1) {
    this.noiseB({ dur: 0.15, f: rr(240, 480), vol: 0.13 * k, rev: 0.05 });
    if (wet) this.noiseB({ dur: 0.12, type: 'bandpass', f: rr(650, 1050), q: 2.2, vol: 0.07 * k * wet, delay: 0.03 });
  },
  boardStep(k = 1) { this.noiseB({ dur: 0.07, type: 'bandpass', f: rr(300, 500), q: 3, vol: 0.12 * k }); this.tone({ f: rr(160, 220), f1: 120, dur: 0.08, vol: 0.05 * k }); },
  growl(x, z, vol = 1) {
    const pan = this.panOf(x, z), d = this.distOf(x, z), v = vol * 0.7 / (1 + d * 0.08);
    const f = rr(55, 85);
    this.tone({ type: 'sawtooth', f, f1: f * 0.55, dur: rr(0.7, 1.3), vol: v * 0.5, pan, rev: 0.7, lp: 650, attack: 0.08 });
    this.tone({ type: 'sawtooth', f: f * 1.51, f1: f * 0.8, dur: 0.9, vol: v * 0.25, pan, rev: 0.7, lp: 900, attack: 0.1 });
    this.noiseB({ dur: 0.8, type: 'bandpass', f: 500, q: 2, vol: v * 0.3, pan, attack: 0.1 });
  },
  chant(x, z, vol = 1) {
    const pan = this.panOf(x, z), d = this.distOf(x, z), v = vol * 0.7 / (1 + d * 0.08);
    const f = rr(105, 150);
    this.tone({ type: 'triangle', f, f1: f * 0.98, dur: 1.5, vol: v * 0.35, pan, rev: 1.1, attack: 0.2, lp: 1200 });
    this.tone({ type: 'triangle', f: f * 1.5, dur: 1.3, vol: v * 0.2, pan, rev: 1.1, attack: 0.25, lp: 1200 });
  },
  shout(x, z, vol = 1) {
    const pan = this.panOf(x, z), d = this.distOf(x, z), v = vol * 0.6 / (1 + d * 0.08);
    this.tone({ type: 'sawtooth', f: rr(150, 220), f1: rr(110, 150), dur: 0.5, vol: v * 0.35, pan, rev: 0.7, lp: 1400, attack: 0.03 });
  },
  scream(x, z, vol = 1) {
    const pan = this.panOf(x, z), d = this.distOf(x, z), v = vol * 0.7 / (1 + d * 0.06);
    this.tone({ type: 'sawtooth', f: rr(380, 520), f1: 90, dur: 0.75, vol: v * 0.45, pan, rev: 0.8, lp: 1600, attack: 0.02 });
  },
  swing() { this.noiseB({ dur: 0.22, type: 'bandpass', f: 1400, f1: 300, q: 1.5, vol: 0.35 }); },
  flesh(x, z, vol = 0.5) { const pan = this.panOf(x, z); this.noiseB({ dur: 0.1, type: 'bandpass', f: 700, q: 1.5, vol, pan }); this.tone({ f: 120, f1: 60, dur: 0.1, vol: vol * 0.5, pan }); },
  hit(x, z, mat, vol = 0.4) {
    const pan = this.panOf(x, z);
    if (mat === 3) { this.tone({ type: 'square', f: rr(900, 1400), f1: 500, dur: 0.25, vol: vol * 0.25, pan, rev: 0.6, lp: 3000 }); this.noiseB({ dur: 0.06, type: 'highpass', f: 2000, vol: vol * 0.6, pan }); }
    else if (mat === 2) { this.noiseB({ dur: 0.08, type: 'bandpass', f: 900, q: 2, vol, pan }); this.tone({ f: 300, f1: 150, dur: 0.08, vol: vol * 0.4, pan }); }
    else this.noiseB({ dur: 0.14, f: 1200, f1: 180, vol, pan, rev: 0.25 });
  },
  hurt(big) {
    this.tone({ f: 70, f1: 38, dur: 0.3, vol: 0.9 }); this.noiseB({ dur: 0.25, f: 500, vol: 0.6 });
    if (big) this.tone({ f: 3300, dur: 2.6, vol: 0.05, attack: 0.05 });
  },
  heartbeat() { this.tone({ f: 58, f1: 40, dur: 0.14, vol: 0.55, rev: 0 }); this.tone({ f: 52, f1: 38, dur: 0.14, vol: 0.4, delay: 0.2, rev: 0 }); },
  artillery(dist) {
    const v = 0.65 / (1 + dist * 0.0015);
    this.tone({ f: 46, f1: 20, dur: 2.6, vol: v, rev: 0.7, attack: 0.03 });
    this.noiseB({ dur: 3.0, f: 200, f1: 45, vol: v, rev: 0.9, attack: 0.03 });
  },
  flareLaunch(x, z) {
    const pan = this.panOf(x, z);
    this.noiseB({ dur: 0.15, type: 'bandpass', f: 800, q: 2, vol: 0.3, pan });
    this.noiseB({ dur: 1.4, type: 'bandpass', f: 2600, f1: 900, q: 1.5, vol: 0.12, pan, rev: 0.8, delay: 0.05 });
    this.noiseB({ dur: 0.25, f: 1500, vol: 0.15, pan, delay: 1.6, rev: 1 });
  },
  pickup() { this.noiseB({ dur: 0.08, type: 'bandpass', f: 2000, q: 3, vol: 0.25 }); this.noiseB({ dur: 0.08, type: 'bandpass', f: 2600, q: 3, vol: 0.2, delay: 0.1 }); },
};
