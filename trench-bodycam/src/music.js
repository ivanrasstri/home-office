// Музыка: трек из приватной папки (assets-private/music/theme.mp3), иначе генеративный мрачный эмбиент.
import { store, clamp } from './util.js';
import { SFX } from './audio.js';

export const MUSIC = {
  vol: store.get('music', 0.55), bus: null, track: null, source: null, mode: 'none', duck: 1, started: false, timers: [],
  async init(url) {
    const c = SFX.ctx; if (!c || this.bus) return;
    this.bus = c.createGain(); this.bus.gain.value = this.vol;
    // музыка идёт мимо «микрофона камеры»: это закадровый звук, не запись
    this.bus.connect(c.destination);
    try {
      if (!url) throw new Error('нет трека');
      const r = await fetch(url, { cache: 'force-cache' });
      if (!r.ok) throw new Error(r.status);
      const buf = await c.decodeAudioData(await r.arrayBuffer());
      this.track = buf; this.mode = 'track';
    } catch (e) { this.mode = 'gen'; }
  },
  setVol(v) { this.vol = v; store.set('music', v); if (this.bus) this.bus.gain.setTargetAtTime(v * this.duck, SFX.ctx.currentTime, 0.2); },
  // приглушение в бою: 1 — тишина вокруг, 0.35 — идёт бой
  setDuck(d) { d = clamp(d, 0.2, 1); if (Math.abs(d - this.duck) < 0.02 || !this.bus) return; this.duck = d; this.bus.gain.setTargetAtTime(this.vol * d, SFX.ctx.currentTime, 0.8); },
  start() {
    if (!this.bus || this.started) return;
    this.started = true;
    if (this.mode === 'track') {
      const s = SFX.ctx.createBufferSource(); s.buffer = this.track; s.loop = true;
      const g = SFX.ctx.createGain(); g.gain.setValueAtTime(0.0001, SFX.ctx.currentTime); g.gain.exponentialRampToValueAtTime(1, SFX.ctx.currentTime + 4);
      s.connect(g); g.connect(this.bus); s.start(); this.source = s;
    } else this.generative();
  },
  stop() { if (this.source) { try { this.source.stop(); } catch (e) { /* уже остановлен */ } this.source = null; } this.timers.forEach(clearTimeout); this.timers = []; this.started = false;
    if (this.genOscs) { for (const o of this.genOscs) { try { o.stop(); } catch (e) { /* уже */ } } this.genOscs = null; }
    if (this.genOut) { this.genOut.disconnect(); this.genOut = null; } },
  generative() {
    const c = SFX.ctx, out = c.createGain(); out.gain.value = 0.9; out.connect(this.bus); this.genOut = out; const oscs = this.genOscs = [];
    const rev = c.createConvolver();
    const ir = c.createBuffer(2, c.sampleRate * 5, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2.2); }
    rev.buffer = ir; const rg = c.createGain(); rg.gain.value = 0.7; rev.connect(rg); rg.connect(out);
    // гул: две расстроенные пилы через тёмный фильтр
    const drone = c.createGain(); drone.gain.value = 0.05; drone.connect(out); drone.connect(rev);
    const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 180; lp.Q.value = 2; lp.connect(drone);
    for (const f of [36.7, 36.95, 55.0]) { const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.connect(lp); o.start(); oscs.push(o); }
    const lfo = c.createOscillator(); lfo.frequency.value = 0.03; const lg = c.createGain(); lg.gain.value = 90; lfo.connect(lg); lg.connect(lp.frequency); lfo.start(); oscs.push(lfo);
    // хоровые пэды: формантная пила, минорные созвучия
    const chords = [[146.8, 174.6, 220.0], [130.8, 155.6, 196.0], [116.5, 146.8, 174.6], [110.0, 130.8, 164.8]];
    let ci = 0;
    const pad = () => {
      const t = c.currentTime, dur = 14;
      for (const f of chords[ci % chords.length]) {
        for (const det of [-3, 3]) {
          const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = det;
          const f1 = c.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 650; f1.Q.value = 6;
          const f2 = c.createBiquadFilter(); f2.type = 'bandpass'; f2.frequency.value = 1080; f2.Q.value = 8;
          const g = c.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.022, t + 5); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
          o.connect(f1); o.connect(f2); f1.connect(g); f2.connect(g); g.connect(rev); g.connect(out);
          o.start(t); o.stop(t + dur + 0.1);
        }
      }
      ci++;
      this.timers.push(setTimeout(pad, 11000));
    };
    // далёкий колокол (FM)
    const bell = () => {
      const t = c.currentTime;
      const car = c.createOscillator(), mod = c.createOscillator(), mg = c.createGain(), g = c.createGain();
      car.frequency.value = 98; mod.frequency.value = 98 * 2.76; mg.gain.setValueAtTime(260, t); mg.gain.exponentialRampToValueAtTime(1, t + 6);
      mod.connect(mg); mg.connect(car.frequency);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 7);
      car.connect(g); g.connect(rev);
      car.start(t); mod.start(t); car.stop(t + 7.2); mod.stop(t + 7.2);
      this.timers.push(setTimeout(bell, 18000 + Math.random() * 20000));
    };
    pad(); this.timers.push(setTimeout(bell, 6000));
  },
};
