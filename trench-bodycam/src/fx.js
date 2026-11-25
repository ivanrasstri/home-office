// Частицы (дым, кровь, грязь, искры), дождь на GPU, брызги, декали.
import * as THREE from 'three';
import { rr } from './util.js';

// Общие «простые» источники света для частиц и дождя (заполняются каждый кадр в main)
export const fxLights = {
  uAmb: { value: new THREE.Vector3(0.02, 0.022, 0.03) },
  uTorchPos: { value: new THREE.Vector3() }, uTorchDir: { value: new THREE.Vector3(0, 0, -1) }, uTorchCol: { value: new THREE.Vector3() },
  uTorchCos: { value: 0.88 }, uTorchCosIn: { value: 0.95 },
  uLanPos: { value: Array.from({ length: 6 }, () => new THREE.Vector3(0, -100, 0)) }, uLanCol: { value: Array.from({ length: 6 }, () => new THREE.Vector3()) },
  uFlarePos: { value: new THREE.Vector3() }, uFlareCol: { value: new THREE.Vector3() },
  uMuzPos: { value: new THREE.Vector3() }, uMuzCol: { value: new THREE.Vector3() },
};
const LIGHT_GLSL = /* glsl */`
uniform vec3 uAmb, uTorchPos, uTorchDir, uTorchCol, uFlarePos, uFlareCol, uMuzPos, uMuzCol;
uniform float uTorchCos, uTorchCosIn;
uniform vec3 uLanPos[6]; uniform vec3 uLanCol[6];
vec3 simpleLight(vec3 p){
  vec3 L = uAmb;
  vec3 tl = p - uTorchPos; float tlen = max(length(tl), 0.05);
  L += uTorchCol * smoothstep(uTorchCos, uTorchCosIn, dot(tl / tlen, uTorchDir)) / (tlen * tlen + 0.3);
  vec3 fl = uFlarePos - p; L += uFlareCol / (dot(fl, fl) + 4.0);
  for (int k = 0; k < 6; k++) { vec3 ll = uLanPos[k] - p; L += uLanCol[k] / (dot(ll, ll) + 0.2); }
  vec3 ml = uMuzPos - p; L += uMuzCol / (dot(ml, ml) + 0.15);
  return L;
}`;

// ------------------------------------------------------------ частицы
class Particles {
  constructor(scene, max, additive) {
    this.max = max; this.n = 0;
    this.pos = new Float32Array(max * 3); this.vel = new Float32Array(max * 3); this.col = new Float32Array(max * 3);
    this.size = new Float32Array(max); this.alpha = new Float32Array(max); this.life = new Float32Array(max); this.life0 = new Float32Array(max);
    this.grav = new Float32Array(max); this.drag = new Float32Array(max); this.grow = new Float32Array(max); this.a0 = new Float32Array(max);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(this.col, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('size', new THREE.BufferAttribute(this.size, 1).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('alpha', new THREE.BufferAttribute(this.alpha, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo = g;
    const m = new THREE.ShaderMaterial({
      uniforms: Object.assign({ uScale: { value: 600 } }, fxLights),
      vertexShader: LIGHT_GLSL + /* glsl */`
        attribute float size; attribute float alpha; varying vec3 vCol; varying float vA;
        uniform float uScale;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = size * uScale / max(-mv.z, 0.05);
          ${additive ? 'vCol = color;' : 'vCol = color * simpleLight(position);'}
          vA = alpha;
        }`,
      fragmentShader: /* glsl */`
        varying vec3 vCol; varying float vA;
        void main(){
          vec2 q = gl_PointCoord - 0.5; float r = dot(q, q) * 4.0;
          float a = exp(-r * 2.5) * vA;
          if (a < 0.003) discard;
          gl_FragColor = vec4(vCol, a);
        }`,
      vertexColors: true, transparent: true, depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    this.mat = m;
    this.points = new THREE.Points(g, m);
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
    scene.add(this.points);
  }
  emit(x, y, z, vx, vy, vz, r, g, b, size, life, o = {}) {
    if (this.n >= this.max) return;
    const i = this.n++;
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz;
    this.col[i * 3] = r; this.col[i * 3 + 1] = g; this.col[i * 3 + 2] = b;
    this.size[i] = size; this.life[i] = this.life0[i] = life;
    this.grav[i] = o.grav ?? 9.8; this.drag[i] = o.drag ?? 0.5; this.grow[i] = o.grow ?? 0; this.a0[i] = o.alpha ?? 1;
    this.alpha[i] = this.a0[i];
  }
  update(dt, floorAt) {
    for (let i = 0; i < this.n; i++) {
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        const j = --this.n;
        for (let k = 0; k < 3; k++) { this.pos[i * 3 + k] = this.pos[j * 3 + k]; this.vel[i * 3 + k] = this.vel[j * 3 + k]; this.col[i * 3 + k] = this.col[j * 3 + k]; }
        this.size[i] = this.size[j]; this.life[i] = this.life[j]; this.life0[i] = this.life0[j]; this.grav[i] = this.grav[j]; this.drag[i] = this.drag[j]; this.grow[i] = this.grow[j]; this.a0[i] = this.a0[j];
        i--; continue;
      }
      const dr = Math.exp(-this.drag[i] * dt);
      this.vel[i * 3] *= dr; this.vel[i * 3 + 2] *= dr; this.vel[i * 3 + 1] = this.vel[i * 3 + 1] * dr - this.grav[i] * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt; this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt; this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      const fy = floorAt(this.pos[i * 3], this.pos[i * 3 + 2]) + 0.01;
      if (this.pos[i * 3 + 1] < fy) { this.pos[i * 3 + 1] = fy; this.vel[i * 3] *= 0.2; this.vel[i * 3 + 1] = 0; this.vel[i * 3 + 2] *= 0.2; }
      this.size[i] += this.grow[i] * dt;
      const t = this.life[i] / this.life0[i];
      this.alpha[i] = this.a0[i] * Math.min(1, t * 3) * (this.grow[i] > 0 ? Math.min(1, (1 - t) * 8) : 1);
    }
    this.geo.setDrawRange(0, this.n);
    for (const a of ['position', 'color', 'size', 'alpha']) this.geo.attributes[a].needsUpdate = true;
  }
  clear() { this.n = 0; }
}

// ------------------------------------------------------------ дождь
function buildRain(scene, count, heightTex) {
  const seed = new Float32Array(count * 2 * 3), tip = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    const s = [Math.random(), Math.random(), Math.random()];
    for (let k = 0; k < 2; k++) { seed.set(s, (i * 2 + k) * 3); tip[i * 2 + k] = k; }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 2 * 3), 3));
  g.setAttribute('seed', new THREE.BufferAttribute(seed, 3));
  g.setAttribute('tip', new THREE.BufferAttribute(tip, 1));
  const uniforms = Object.assign({ uCam: { value: new THREE.Vector3() }, uTime: { value: 0 }, tHeight: { value: heightTex.texture }, uHB: { value: heightTex.bounds }, uIntensity: { value: 1 } }, fxLights);
  const m = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: LIGHT_GLSL + /* glsl */`
      uniform vec3 uCam; uniform float uTime; uniform sampler2D tHeight; uniform vec4 uHB; uniform float uIntensity;
      attribute vec3 seed; attribute float tip; varying float vA; varying vec3 vC;
      void main(){
        const float B = 13.0; const float HH = 16.0;
        float speed = 8.5 + seed.z * 2.5;
        vec3 wind = vec3(1.1, 0.0, 0.45);
        float xw = seed.x * 2.0 * B, zw = fract(seed.z * 7.31 + seed.x * 3.7) * 2.0 * B;
        vec3 p;
        p.x = xw + 2.0 * B * floor((uCam.x - xw) / (2.0 * B) + 0.5);
        p.z = zw + 2.0 * B * floor((uCam.z - zw) / (2.0 * B) + 0.5);
        float fall = mod(seed.y * HH - uTime * speed, HH);
        p.y = uCam.y - 5.0 + fall;
        p.xz += wind.xz * (fall / speed);
        vec3 v = vec3(-wind.x, -speed, -wind.z);
        vec3 pos = p + v * tip * 0.024;
        float ground = texture2D(tHeight, (pos.xz - uHB.xy) / uHB.zw).r;
        float vis = step(ground, pos.y) * step(ground, p.y);
        vec3 L = simpleLight(pos);
        float br = dot(L, vec3(0.3, 0.5, 0.2));
        vA = vis * clamp(br * 0.32, 0.0, 0.7) * uIntensity * (0.4 + 0.6 * tip);
        vC = mix(vec3(0.75, 0.82, 0.95), L / max(br, 1e-3) * 0.6, 0.35);
        gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1.0);
      }`,
    fragmentShader: 'varying float vA; varying vec3 vC; void main(){ if (vA < 0.004) discard; gl_FragColor = vec4(vC * vA, vA); }',
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(g, m);
  lines.frustumCulled = false; lines.renderOrder = 6;
  scene.add(lines);
  return { lines, uniforms };
}

// брызги от капель на земле и в лужах
function buildSplashes(scene, count, heightTex) {
  const seed = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) seed[i] = Math.random();
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  g.setAttribute('seed', new THREE.BufferAttribute(seed, 3));
  const uniforms = Object.assign({ uCam: { value: new THREE.Vector3() }, uTime: { value: 0 }, tHeight: { value: heightTex.texture }, uHB: { value: heightTex.bounds }, uScale: { value: 600 } }, fxLights);
  const m = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: LIGHT_GLSL + /* glsl */`
      uniform vec3 uCam; uniform float uTime; uniform sampler2D tHeight; uniform vec4 uHB; uniform float uScale;
      attribute vec3 seed; varying float vA; varying vec3 vC;
      float h11(float n){ return fract(sin(n) * 43758.5453); }
      void main(){
        float per = 0.35 + seed.z * 0.3;
        float cyc = floor(uTime / per + seed.y * 13.0);
        float ph = fract(uTime / per + seed.y * 13.0);
        vec3 p = vec3(uCam.x + (h11(cyc * 1.7 + seed.x * 91.0) - 0.5) * 18.0, 0.0, uCam.z + (h11(cyc * 2.3 + seed.z * 57.0) - 0.5) * 18.0);
        p.y = texture2D(tHeight, (p.xz - uHB.xy) / uHB.zw).r + 0.02 + ph * 0.05;
        vec4 mv = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (0.02 + ph * 0.05) * uScale / max(-mv.z, 0.1);
        vec3 L = simpleLight(p);
        vA = (1.0 - ph) * clamp(dot(L, vec3(0.33)) * 0.8, 0.0, 0.8);
        vC = vec3(0.85, 0.9, 1.0);
      }`,
    fragmentShader: 'varying float vA; varying vec3 vC; void main(){ vec2 q = gl_PointCoord - 0.5; float r = length(q) * 2.0; float a = smoothstep(1.0, 0.6, r) * smoothstep(0.2, 0.6, r) * vA; if (a < 0.003) discard; gl_FragColor = vec4(vC * a, a); }',
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const pts = new THREE.Points(g, m);
  pts.frustumCulled = false;
  scene.add(pts);
  return { pts, uniforms };
}

// ------------------------------------------------------------ декали
function splatTexture(kind) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = '#000'; g.fillRect(0, 0, 128, 128);
  if (kind === 'blood') {
    g.fillStyle = '#fff';
    for (let i = 0; i < 26; i++) { const a = Math.random() * 7, d = Math.pow(Math.random(), 1.6) * 52, r = rr(2, 16) * (1 - d / 70); g.beginPath(); g.arc(64 + Math.cos(a) * d, 64 + Math.sin(a) * d, Math.max(1, r), 0, 7); g.fill(); }
  } else {
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 60);
    grd.addColorStop(0, '#fff'); grd.addColorStop(0.18, '#fff'); grd.addColorStop(0.32, '#777'); grd.addColorStop(1, '#000');
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  }
  const t = new THREE.CanvasTexture(c);
  return t;
}

export class FX {
  constructor(scene, quality, heightTex) {
    this.scene = scene;
    this.lit = new Particles(scene, 1400, false);
    this.glow = new Particles(scene, 400, true);
    this.rain = buildRain(scene, quality.rain, heightTex);
    this.splash = buildSplashes(scene, Math.round(quality.rain / 8), heightTex);
    this.decals = [];
    this.decalGeo = new THREE.PlaneGeometry(1, 1);
    this.bloodMat = new THREE.MeshStandardMaterial({ color: 0x1e0202, alphaMap: splatTexture('blood'), transparent: true, roughness: 0.18, metalness: 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, envMapIntensity: 0.6 });
    this.holeMat = new THREE.MeshStandardMaterial({ color: 0x050403, alphaMap: splatTexture('hole'), transparent: true, roughness: 0.9, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 });
  }
  setScale(px) { this.lit.mat.uniforms.uScale.value = px; this.glow.mat.uniforms.uScale.value = px; this.splash.uniforms.uScale.value = px; }
  decal(kind, x, y, z, nx, ny, nz, size) {
    const d = new THREE.Mesh(this.decalGeo, kind === 'blood' ? this.bloodMat : this.holeMat);
    d.position.set(x + nx * 0.01, y + ny * 0.01, z + nz * 0.01);
    d.lookAt(x + nx, y + ny, z + nz);
    d.rotateZ(Math.random() * 6.28);
    d.scale.set(size, size, 1);
    d.receiveShadow = true;
    this.scene.add(d); this.decals.push(d);
    if (this.decals.length > 120) this.scene.remove(this.decals.shift());
  }
  // попадание в землю/доски/железо
  impact(x, y, z, nx, ny, nz, mat) {
    const n = mat === 3 ? 6 : 14;
    const base = mat === 2 ? [0.16, 0.11, 0.07] : mat === 4 ? [0.2, 0.17, 0.12] : [0.07, 0.05, 0.035];
    for (let i = 0; i < n; i++) {
      const s = rr(1.5, 4.5);
      this.lit.emit(x, y, z, nx * s + rr(-1.2, 1.2), ny * s + rr(0.5, 2.5), nz * s + rr(-1.2, 1.2), base[0], base[1], base[2], rr(0.012, 0.03), rr(0.4, 0.9), { grav: 9.8, drag: 0.3 });
    }
    for (let i = 0; i < 5; i++) this.lit.emit(x + nx * 0.05, y + ny * 0.05, z + nz * 0.05, nx * rr(0.2, 0.8) + rr(-0.3, 0.3), rr(0.1, 0.5), nz * rr(0.2, 0.8) + rr(-0.3, 0.3), base[0] * 1.6, base[1] * 1.6, base[2] * 1.6, rr(0.1, 0.25), rr(0.8, 1.8), { grav: -0.15, drag: 1.5, grow: 0.5, alpha: 0.35 });
    if (mat === 3) for (let i = 0; i < 8; i++) this.glow.emit(x, y, z, nx * rr(1, 4) + rr(-2, 2), rr(0.5, 3), nz * rr(1, 4) + rr(-2, 2), 8, 4.5, 1.6, rr(0.006, 0.012), rr(0.08, 0.25), { grav: 9.8, drag: 0.2 });
    this.decal('hole', x, y, z, nx, ny, nz, mat === 4 ? rr(0.05, 0.08) : rr(0.04, 0.07));
  }
  blood(x, y, z, dx, dz, heavy) {
    for (let i = 0; i < (heavy ? 30 : 16); i++) {
      const s = rr(1, 4);
      this.lit.emit(x, y, z, dx * s + rr(-0.8, 0.8), rr(-0.2, 1.8), dz * s + rr(-0.8, 0.8), rr(0.1, 0.16), 0.006, 0.004, rr(0.01, 0.03), rr(0.4, 0.9), { grav: 9.8, drag: 0.4 });
    }
    for (let i = 0; i < 4; i++) this.lit.emit(x, y, z, dx * rr(0.3, 1), rr(-0.1, 0.3), dz * rr(0.3, 1), 0.1, 0.008, 0.005, rr(0.08, 0.18), rr(0.3, 0.6), { grav: 0.5, drag: 2, grow: 0.4, alpha: 0.5 });
  }
  muzzleSmoke(p, dir, heavy = 1) {
    for (let i = 0; i < 10 * heavy; i++) {
      const s = rr(0.3, 2.5);
      this.lit.emit(p.x + dir.x * 0.05, p.y, p.z + dir.z * 0.05, dir.x * s + rr(-0.25, 0.25), dir.y * s + rr(0.05, 0.4), dir.z * s + rr(-0.25, 0.25), 0.55, 0.55, 0.56, rr(0.06, 0.14), rr(1.2, 2.8), { grav: -0.12, drag: 1.4, grow: rr(0.25, 0.6), alpha: 0.22 });
    }
    for (let i = 0; i < 6; i++) this.glow.emit(p.x, p.y, p.z, dir.x * rr(4, 12) + rr(-1.5, 1.5), dir.y * rr(4, 12) + rr(-1, 1.5), dir.z * rr(4, 12) + rr(-1.5, 1.5), 9, 5, 1.8, rr(0.005, 0.012), rr(0.04, 0.14), { grav: 4, drag: 0.5 });
  }
  update(dt, time, camPos, floorAt) {
    this.lit.update(dt, floorAt); this.glow.update(dt, floorAt);
    this.rain.uniforms.uCam.value.copy(camPos); this.rain.uniforms.uTime.value = time;
    this.splash.uniforms.uCam.value.copy(camPos); this.splash.uniforms.uTime.value = time;
  }
  clear() {
    this.lit.clear(); this.glow.clear();
    for (const d of this.decals) this.scene.remove(d);
    this.decals.length = 0;
  }
}
