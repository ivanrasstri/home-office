// Рельеф: сетка высот с земляными стенками окопа, triplanar PBR, лужи с рябью.
import * as THREE from 'three';
import { CELL, GW, GH, WALL_H } from './config.js';
import { heightAt, map } from './trenchmap.js';
import { TEX, addPatch } from './assets.js';

export const terrainUniforms = { uTime: { value: 0 }, uRain: { value: 1 } };

const GLSL_COMMON = /* glsl */`
varying vec3 vTPos;
varying vec3 vTNrm;
uniform float uTime;
uniform float uRain;
float tPuddle;
vec3 tAlbedo; vec3 tNormalW; float tRough; float tAO;
float th12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float tvn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3. - 2. * f);
  return mix(mix(th12(i), th12(i + vec2(1, 0)), u.x), mix(th12(i + vec2(0, 1)), th12(i + vec2(1, 1)), u.x), u.y); }
vec3 tUnpack(vec4 t){ return t.xyz * 2.0 - 1.0; }
// круги от капель дождя на воде
vec2 tRipples(vec2 p, float t) {
  vec2 n = vec2(0.0);
  for (int i = 0; i < 3; i++) {
    vec2 q = p * 2.8 + float(i) * 7.31;
    vec2 id = floor(q); vec2 f = fract(q) - 0.5;
    float h = th12(id + float(i) * 3.1);
    f -= (vec2(th12(id + 1.7), th12(id + 5.3)) - 0.5) * 0.5;
    float ph = fract(t * (0.7 + h * 0.6) + h);
    float rad = ph * 0.48;
    float r = length(f);
    float ring = sin((r - rad) * 60.0) * smoothstep(rad + 0.05, rad, r) * smoothstep(rad - 0.14, rad, r) * (1.0 - ph);
    n += f / max(r, 1e-3) * ring;
  }
  return n * 0.3;
}
`;

const GLSL_TERRAIN = /* glsl */`
uniform sampler2D tMudD, tMudN, tMudA, tEarD, tEarN, tEarA, tTopD, tTopN, tTopA;
vec3 tBlendW(vec3 n){ vec3 b = pow(abs(n), vec3(4.0)); return b / (b.x + b.y + b.z); }
void tTri(sampler2D D, sampler2D N, sampler2D A, vec3 p, vec3 nrm, float sc, out vec3 alb, out vec3 wn, out vec3 arm) {
  vec3 bw = tBlendW(nrm);
  vec3 s = sign(nrm);
  vec2 uvX = p.zy * sc; vec2 uvY = p.xz * sc; vec2 uvZ = p.xy * sc;
  uvX.x *= s.x; uvY.x *= s.y; uvZ.x *= -s.z;
  alb = texture2D(D, uvX).rgb * bw.x + texture2D(D, uvY).rgb * bw.y + texture2D(D, uvZ).rgb * bw.z;
  arm = texture2D(A, uvX).rgb * bw.x + texture2D(A, uvY).rgb * bw.y + texture2D(A, uvZ).rgb * bw.z;
  vec3 nX = tUnpack(texture2D(N, uvX)), nY = tUnpack(texture2D(N, uvY)), nZ = tUnpack(texture2D(N, uvZ));
  nX.x *= s.x; nY.x *= s.y; nZ.x *= -s.z;
  nX = vec3(nX.xy + nrm.zy, abs(nX.z) * nrm.x);
  nY = vec3(nY.xy + nrm.xz, abs(nY.z) * nrm.y);
  nZ = vec3(nZ.xy + nrm.xy, abs(nZ.z) * nrm.z);
  wn = normalize(nX.zyx * bw.x + nY.xzy * bw.y + nZ.xyz * bw.z);
}
void tTop(sampler2D D, sampler2D N, sampler2D A, vec2 uv, vec3 nrm, out vec3 alb, out vec3 wn, out vec3 arm) {
  alb = texture2D(D, uv).rgb; arm = texture2D(A, uv).rgb;
  vec3 tn = tUnpack(texture2D(N, uv));
  tn = vec3(tn.xy + nrm.xz, abs(tn.z) * nrm.y);
  wn = normalize(tn.xzy);
}
void terrainSample() {
  vec3 p = vTPos; vec3 g = normalize(vTNrm);
  float h = p.y;
  // дно: грязь, две шкалы против повторов
  vec3 aF, nF, mF, aF2, nF2, mF2;
  tTop(tMudD, tMudN, tMudA, p.xz * 0.6, g, aF, nF, mF);
  tTop(tMudD, tMudN, tMudA, mat2(0.8, -0.6, 0.6, 0.8) * p.xz * 0.27 + 0.37, g, aF2, nF2, mF2);
  float ab = smoothstep(0.3, 0.7, tvn(p.xz * 0.3));
  aF = mix(aF, aF2, ab); nF = normalize(mix(nF, nF2, ab)); mF = mix(mF, mF2, ab);
  // стенки: земля triplanar
  vec3 aW, nW, mW;
  tTri(tEarD, tEarN, tEarA, p, g, 0.55, aW, nW, mW);
  // поверхность: выжженная земля
  vec3 aT, nT, mT;
  tTop(tTopD, tTopN, tTopA, p.xz * 0.3, g, aT, nT, mT);
  vec3 aT2, nT2, mT2;
  tTop(tTopD, tTopN, tTopA, mat2(0.6, 0.8, -0.8, 0.6) * p.xz * 0.11, g, aT2, nT2, mT2);
  float tb = smoothstep(0.35, 0.65, tvn(p.xz * 0.08 + 3.0));
  aT = mix(aT, aT2, tb); nT = normalize(mix(nT, nT2, tb)); mT = mix(mT, mT2, tb);
  aT *= vec3(0.42, 0.37, 0.32);   // пепел + грязь: темнее и теплее, иначе в лунном свете похоже на иней
  // веса слоёв с учётом «высоты» текстуры
  float hn = (mW.r - 0.5) * 0.25;
  float wF = 1.0 - smoothstep(0.06, 0.32, h + hn);
  float wT = smoothstep(${(WALL_H - 0.45).toFixed(2)}, ${(WALL_H - 0.1).toFixed(2)}, h - hn) * smoothstep(0.4, 0.75, g.y);
  wT = max(wT, smoothstep(${(WALL_H + 0.3).toFixed(2)}, ${(WALL_H + 0.6).toFixed(2)}, h));
  float wWall = clamp(1.0 - wF - wT, 0.0, 1.0);
  float sum = wF + wT + wWall;
  wF /= sum; wT /= sum; wWall /= sum;
  vec3 alb = aF * wF + aW * wWall + aT * wT;
  vec3 wn = normalize(nF * wF + nW * wWall + nT * wT);
  vec3 arm = mF * wF + mW * wWall + mT * wT;
  // крупные пятна цвета и сырости
  float macro = tvn(p.xz * 0.12) * 0.6 + tvn(p.xz * 0.5) * 0.4;
  alb *= mix(0.78, 1.12, macro);
  float wet = clamp(wF * 0.85 + (1.0 - smoothstep(0.0, 1.4, h)) * 0.45 + 0.22 * uRain + (macro - 0.5) * 0.3, 0.0, 1.0);
  wet *= 1.0 - smoothstep(${(WALL_H + 0.2).toFixed(2)}, ${(WALL_H + 1.5).toFixed(2)}, h) * 0.6;
  // лужи в низинах дна
  float pud = wF * smoothstep(0.052, 0.07, -h + (mF.r - 0.6) * 0.03 + (tvn(p.xz * 0.7) - 0.5) * 0.03);
  alb *= mix(1.0, 0.58, wet);
  alb = mix(alb, alb * 0.22 + vec3(0.006, 0.005, 0.004), pud);
  float rough = mix(arm.g, arm.g * 0.42 + 0.08, wet);
  rough = mix(rough, 0.03, pud);
  vec2 rip = tRipples(p.xz, uTime) * uRain;
  vec3 wN = normalize(vec3(rip.x, 1.0, rip.y));
  tNormalW = normalize(mix(wn, wN, pud));
  tAlbedo = alb;
  tRough = clamp(rough, 0.02, 1.0);
  tAO = mix(arm.r, 1.0, pud);
  tPuddle = pud;
}
`;

function patchTerrain(mat) {
  return addPatch(mat, 'terrain', (s) => {
    Object.assign(s.uniforms, terrainUniforms, {
      tMudD: { value: TEX.mud.d }, tMudN: { value: TEX.mud.n }, tMudA: { value: TEX.mud.arm },
      tEarD: { value: TEX.earth.d }, tEarN: { value: TEX.earth.n }, tEarA: { value: TEX.earth.arm },
      tTopD: { value: TEX.scorched.d }, tTopN: { value: TEX.scorched.n }, tTopA: { value: TEX.scorched.arm },
    });
    s.vertexShader = s.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vTPos;\nvarying vec3 vTNrm;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvTPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvTNrm = normalize(mat3(modelMatrix) * objectNormal);');
    s.fragmentShader = s.fragmentShader
      .replace('#include <common>', '#include <common>\n' + GLSL_COMMON + GLSL_TERRAIN)
      .replace('#include <map_fragment>', 'terrainSample();\ndiffuseColor.rgb *= tAlbedo;')
      .replace('#include <roughnessmap_fragment>', 'float roughnessFactor = tRough;')
      .replace('#include <metalnessmap_fragment>', 'float metalnessFactor = 0.0;')
      .replace('#include <normal_fragment_maps>', 'normal = normalize((viewMatrix * vec4(tNormalW, 0.0)).xyz);')
      .replace('#include <aomap_fragment>', 'reflectedLight.indirectDiffuse *= tAO;\nreflectedLight.indirectSpecular *= mix(tAO, 1.0, 0.4);')
      .replace('#include <opaque_fragment>', 'gl_FragColor = vec4(outgoingLight, 1.0 - tPuddle * 0.85);');
  });
}

// Вода в воронках: тёмная, гладкая, с рябью, помечена для экранных отражений
export function waterMaterial() {
  const m = new THREE.MeshStandardMaterial({ color: 0x17120c, roughness: 0.04, metalness: 0, envMapIntensity: 1.0 });
  return addPatch(m, 'water', (s) => {
    Object.assign(s.uniforms, terrainUniforms);
    s.vertexShader = s.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vTPos;\nvarying vec3 vTNrm;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvTPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvTNrm = vec3(0.0, 1.0, 0.0);');
    s.fragmentShader = s.fragmentShader
      .replace('#include <common>', '#include <common>\n' + GLSL_COMMON)
      .replace('#include <normal_fragment_maps>', 'vec2 rip = tRipples(vTPos.xz, uTime) * uRain;\nnormal = normalize((viewMatrix * vec4(normalize(vec3(rip.x, 1.0, rip.y)), 0.0)).xyz);')
      .replace('#include <opaque_fragment>', 'gl_FragColor = vec4(outgoingLight, 0.12);');
  });
}

function gridGeometry(x0, z0, x1, z1, res, skip, sampler) {
  const nx = Math.ceil((x1 - x0) / res) + 1, nz = Math.ceil((z1 - z0) / res) + 1;
  const dx = (x1 - x0) / (nx - 1), dz = (z1 - z0) / (nz - 1);
  const hs = new Float32Array(nx * nz);
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) hs[j * nx + i] = sampler(x0 + i * dx, z0 + j * dz);
  const pos = new Float32Array(nx * nz * 3), nrm = new Float32Array(nx * nz * 3);
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const k = j * nx + i;
    pos[k * 3] = x0 + i * dx; pos[k * 3 + 1] = hs[k]; pos[k * 3 + 2] = z0 + j * dz;
    const hl = hs[j * nx + Math.max(0, i - 1)], hr = hs[j * nx + Math.min(nx - 1, i + 1)];
    const hd = hs[Math.max(0, j - 1) * nx + i], hu = hs[Math.min(nz - 1, j + 1) * nx + i];
    const gx = (hr - hl) / (2 * dx), gz = (hu - hd) / (2 * dz);
    const l = Math.hypot(gx, 1, gz);
    nrm[k * 3] = -gx / l; nrm[k * 3 + 1] = 1 / l; nrm[k * 3 + 2] = -gz / l;
  }
  const index = [];
  for (let j = 0; j < nz - 1; j++) for (let i = 0; i < nx - 1; i++) {
    const cx = x0 + (i + 0.5) * dx, cz = z0 + (j + 0.5) * dz;
    if (skip && skip(cx, cz)) continue;
    const a = j * nx + i, b = a + 1, c = a + nx, d = c + 1;
    // диагональ по наклону, чтобы стенки не шли «лесенкой»
    if (Math.abs(hs[a] - hs[d]) < Math.abs(hs[b] - hs[c])) index.push(a, c, d, a, d, b);
    else index.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
  g.setIndex(new THREE.BufferAttribute(nx * nz > 65535 ? new Uint32Array(index) : new Uint16Array(index), 1));
  g.computeBoundingSphere(); g.computeBoundingBox();
  return g;
}

export function buildTerrain(scene, quality) {
  const W = GW * CELL, H = GH * CELL;
  const mat = patchTerrain(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0, envMapIntensity: 0.35 }));
  const ix0 = -4, iz0 = -4, ix1 = W + 4, iz1 = H + 4;
  const inner = new THREE.Mesh(gridGeometry(ix0, iz0, ix1, iz1, quality.terrainRes, null, heightAt), mat);
  inner.receiveShadow = true; inner.castShadow = true;
  scene.add(inner);
  const outerMat = mat.clone();
  outerMat.onBeforeCompile = mat.onBeforeCompile; outerMat.customProgramCacheKey = mat.customProgramCacheKey; outerMat.userData = mat.userData;
  outerMat.polygonOffset = true; outerMat.polygonOffsetFactor = 2; outerMat.polygonOffsetUnits = 2;
  const outer = new THREE.Mesh(gridGeometry(-110, -120, W + 110, H + 90, 1.0,
    (x, z) => x > ix0 + 0.6 && x < ix1 - 0.6 && z > iz0 + 0.6 && z < iz1 - 0.6, heightAt), outerMat);
  outer.receiveShadow = true;
  scene.add(outer);
  // вода в глубоких воронках
  const wmat = waterMaterial();
  const disc = new THREE.CircleGeometry(1, 28); disc.rotateX(-Math.PI / 2);
  for (const c of map.craters) {
    if (c.d < 0.55) continue;
    const bottom = heightAt(c.x, c.z);
    const w = new THREE.Mesh(disc, wmat);
    const rw = c.r * 0.62;
    w.scale.set(rw, 1, rw);
    w.position.set(c.x, bottom + c.d * 0.28, c.z);
    w.receiveShadow = true;
    scene.add(w);
  }
  return { inner, outer, mat };
}

// Карта высот для GPU-эффектов (брызги дождя, капли): 1 тексель ≈ 0.25 м
export function heightTexture() {
  const W = GW * CELL, H = GH * CELL;
  const nx = 384, nz = 288, x0 = -8, z0 = -8, x1 = W + 8, z1 = H + 8;
  const data = new Float32Array(nx * nz);
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) data[j * nx + i] = heightAt(x0 + (i + 0.5) / nx * (x1 - x0), z0 + (j + 0.5) / nz * (z1 - z0));
  const t = new THREE.DataTexture(data, nx, nz, THREE.RedFormat, THREE.FloatType);
  t.minFilter = t.magFilter = THREE.LinearFilter; t.needsUpdate = true;
  return { texture: t, bounds: new THREE.Vector4(x0, z0, x1 - x0, z1 - z0) };
}
