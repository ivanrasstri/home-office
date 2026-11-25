// Рендер-конвейер нагрудной камеры.
// сцена (HDR, MSAA, глубина) -> SSAO -> объёмный туман -> композит (+отражения в лужах)
// -> bloom -> автоэкспозиция -> финальный шейдер камеры (фишай, смаз, шум, компрессия) -> экран
import * as THREE from 'three';

const VS = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
const COMMON = /* glsl */`
varying vec2 vUv;
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 viewPosFromDepth(vec2 uv, float depth, mat4 projInv){ vec4 v = projInv * vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0); return v.xyz / v.w; }
`;

function rt(w, h, o = {}) {
  const t = new THREE.WebGLRenderTarget(Math.max(1, w), Math.max(1, h), {
    type: o.type ?? THREE.HalfFloatType, format: THREE.RGBAFormat,
    minFilter: o.mip ? THREE.LinearMipmapLinearFilter : (o.nearest ? THREE.NearestFilter : THREE.LinearFilter),
    magFilter: o.nearest ? THREE.NearestFilter : THREE.LinearFilter,
    depthBuffer: !!o.depth, generateMipmaps: !!o.mip, samples: o.samples || 0,
  });
  if (o.depthTexture) { t.depthTexture = new THREE.DepthTexture(w, h); t.depthTexture.type = THREE.UnsignedIntType; }
  return t;
}
function mat(frag, uniforms, defines = {}) {
  return new THREE.ShaderMaterial({ vertexShader: VS, fragmentShader: COMMON + frag, uniforms, defines, depthTest: false, depthWrite: false });
}

// ------------------------------------------------------------ шейдеры
const SSAO_FS = /* glsl */`
uniform sampler2D tDepth; uniform mat4 uProj, uProjInv; uniform vec3 uKernel[12]; uniform float uRadius, uTime;
void main(){
  float d = texture2D(tDepth, vUv).x;
  if (d >= 0.99999) { gl_FragColor = vec4(1.0); return; }
  vec3 P = viewPosFromDepth(vUv, d, uProjInv);
  if (-P.z < 0.08) { gl_FragColor = vec4(1.0); return; }
  vec3 N = normalize(cross(dFdx(P), dFdy(P)));
  float a = hash12(gl_FragCoord.xy) * 6.2831;
  vec3 rv = vec3(cos(a), sin(a), 0.0);
  vec3 T = normalize(rv - N * dot(rv, N)); vec3 B = cross(N, T);
  mat3 tbn = mat3(T, B, N);
  float occ = 0.0;
  float rad = uRadius;
  for (int i = 0; i < 12; i++) {
    vec3 S = P + tbn * uKernel[i] * rad;
    vec4 c = uProj * vec4(S, 1.0); vec2 suv = c.xy / c.w * 0.5 + 0.5;
    float sd = texture2D(tDepth, suv).x;
    vec3 SP = viewPosFromDepth(suv, sd, uProjInv);
    float range = smoothstep(0.0, 1.0, rad / abs(P.z - SP.z));
    occ += (SP.z >= S.z + 0.02 ? 1.0 : 0.0) * range;
  }
  float ao = clamp(1.0 - occ / 12.0, 0.0, 1.0);
  gl_FragColor = vec4(pow(ao, 1.5), 0.0, 0.0, 1.0);
}`;
const BLUR_AO_FS = /* glsl */`
uniform sampler2D tAO, tDepth; uniform vec2 uTexel; uniform mat4 uProjInv;
void main(){
  float d0 = texture2D(tDepth, vUv).x;
  float z0 = viewPosFromDepth(vUv, d0, uProjInv).z;
  float s = 0.0, w = 0.0;
  for (int y = -2; y <= 2; y++) for (int x = -2; x <= 2; x++) {
    vec2 o = vec2(float(x), float(y)) * uTexel;
    float z = viewPosFromDepth(vUv + o, texture2D(tDepth, vUv + o).x, uProjInv).z;
    float k = exp(-abs(z - z0) / (0.06 * abs(z0) + 0.02));
    s += texture2D(tAO, vUv + o).r * k; w += k;
  }
  gl_FragColor = vec4(s / max(w, 1e-4), 0.0, 0.0, 1.0);
}`;
const VOL_FS = /* glsl */`
#include <packing>
uniform sampler2D tDepth; uniform mat4 uProjInv, uViewInv; uniform vec3 uCamPos; uniform float uTime, uDensity, uMaxDist;
uniform vec3 uAmb;
uniform vec3 uTorchPos, uTorchDir, uTorchCol; uniform float uTorchCos, uTorchCosIn;
uniform sampler2D uTorchShadow; uniform mat4 uTorchShadowMat; uniform float uTorchHasShadow;
uniform vec3 uFlarePos, uFlareCol;
uniform vec3 uLanPos[6]; uniform vec3 uLanCol[6];
uniform vec3 uMuzPos, uMuzCol;
float h13(vec3 p){ p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float vn3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(mix(h13(i), h13(i+vec3(1,0,0)), f.x), mix(h13(i+vec3(0,1,0)), h13(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(h13(i+vec3(0,0,1)), h13(i+vec3(1,0,1)), f.x), mix(h13(i+vec3(0,1,1)), h13(i+vec3(1,1,1)), f.x), f.y), f.z); }
float torchShadow(vec3 p){
  if (uTorchHasShadow < 0.5) return 1.0;
  vec4 sc = uTorchShadowMat * vec4(p, 1.0); sc.xyz /= sc.w;
  if (sc.x < 0.0 || sc.x > 1.0 || sc.y < 0.0 || sc.y > 1.0 || sc.z > 1.0) return 1.0;
  return step(sc.z - 0.003, unpackRGBAToDepth(texture2D(uTorchShadow, sc.xy)));
}
void main(){
  float d = texture2D(tDepth, vUv).x;
  vec3 vp = viewPosFromDepth(vUv, min(d, 0.99999), uProjInv);
  float dist = d >= 0.99999 ? 1e4 : length(vp);
  vec3 dirW = normalize((uViewInv * vec4(normalize(vp), 0.0)).xyz);
  float len = min(dist, uMaxDist);
  float stepL = len / float(STEPS);
  float j = fract(hash12(gl_FragCoord.xy) + uTime * 0.618);
  vec3 scat = vec3(0.0); float T = 1.0;
  for (int i = 0; i < STEPS; i++) {
    float t = (float(i) + j) * stepL;
    vec3 p = uCamPos + dirW * t;
    float n = vn3(p * 0.22 + vec3(uTime * 0.18, uTime * 0.03, uTime * 0.07)) * 0.65 + vn3(p * 0.7 - uTime * 0.1) * 0.35;
    float dens = uDensity * (exp(-max(p.y - 0.3, 0.0) * 0.55) + 0.12) * (0.35 + 1.3 * n);
    vec3 Li = uAmb;
    vec3 tl = p - uTorchPos; float tlen = max(length(tl), 0.05); vec3 td = tl / tlen;
    float cone = smoothstep(uTorchCos, uTorchCosIn, dot(td, uTorchDir));
    cone *= smoothstep(0.5, 3.0, tlen);   // у самого фонаря рассеяние не считаем: иначе пелена на весь кадр
    if (cone > 0.001) Li += uTorchCol * cone * torchShadow(p) / (tlen * tlen + 0.25) * (0.6 + 0.4 * dot(td, dirW));
    vec3 fl = uFlarePos - p; Li += uFlareCol / (dot(fl, fl) + 4.0);
    for (int k = 0; k < 6; k++) { vec3 ll = uLanPos[k] - p; Li += uLanCol[k] / (dot(ll, ll) * 2.5 + 0.12); }
    vec3 ml = uMuzPos - p; Li += uMuzCol / (dot(ml, ml) * 2.0 + 0.1);
    float ext = dens * stepL;
    scat += T * Li * ext;
    T *= exp(-ext);
  }
  gl_FragColor = vec4(scat, T);
}`;
const COMP_FS = /* glsl */`
uniform sampler2D tScene, tDepth, tAO, tVol; uniform mat4 uProj, uProjInv, uView; uniform float uAO, uSSR, uTime; uniform vec3 uSkyRefl;
void main(){
  vec4 sc = texture2D(tScene, vUv);
  vec3 col = sc.rgb;
  float d = texture2D(tDepth, vUv).x;
  col *= mix(1.0, texture2D(tAO, vUv).r, uAO);
  float pud = clamp((1.0 - sc.a) * 1.15, 0.0, 1.0);
  if (uSSR > 0.5 && pud > 0.02 && d < 0.99999) {
    vec3 P = viewPosFromDepth(vUv, d, uProjInv);
    vec3 V = normalize(P);
    vec2 jn = vec2(hash12(vUv * 913.1 + uTime), hash12(vUv * 517.3 - uTime)) - 0.5;
    vec3 N = normalize((uView * vec4(jn.x * 0.06, 1.0, jn.y * 0.06, 0.0)).xyz);
    vec3 R = reflect(V, N);
    vec3 hit = uSkyRefl; float found = 0.0;
    vec3 Q = P; float st = 0.06;
    for (int i = 0; i < 30; i++) {
      Q += R * st; st *= 1.16;
      vec4 c = uProj * vec4(Q, 1.0); vec2 suv = c.xy / c.w * 0.5 + 0.5;
      if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) break;
      float sd = texture2D(tDepth, suv).x;
      if (sd >= 0.99999) { if (i > 3) { hit = texture2D(tScene, suv).rgb; found = 1.0; break; } continue; }
      vec3 SP = viewPosFromDepth(suv, sd, uProjInv);
      float diff = SP.z - Q.z;
      if (diff > 0.0 && diff < 0.35 + st) {
        float edge = smoothstep(0.0, 0.08, min(min(suv.x, 1.0 - suv.x), min(suv.y, 1.0 - suv.y)));
        hit = mix(uSkyRefl, texture2D(tScene, suv).rgb, edge); found = 1.0; break;
      }
    }
    float F = 0.02 + 0.98 * pow(1.0 - max(dot(-V, N), 0.0), 5.0);
    col += hit * F * pud * 0.9;
  }
  vec4 vol = texture2D(tVol, vUv);
  col = col * vol.a + vol.rgb;
  gl_FragColor = vec4(col, 1.0);
}`;
const DOWN_FS = /* glsl */`
uniform sampler2D tSrc; uniform vec2 uTexel; uniform float uPrefilter; uniform sampler2D tExp; uniform float uThreshold;
vec3 S(vec2 o){ return texture2D(tSrc, vUv + o * uTexel).rgb; }
void main(){
  vec3 a = S(vec2(-2,-2)), b = S(vec2(0,-2)), c = S(vec2(2,-2)), d = S(vec2(-1,-1)), e = S(vec2(1,-1)), f = S(vec2(-2,0)), g = S(vec2(0,0)),
       h = S(vec2(2,0)), i = S(vec2(-1,1)), j = S(vec2(1,1)), k = S(vec2(-2,2)), l = S(vec2(0,2)), m = S(vec2(2,2));
  vec3 col = (d + e + i + j) * 0.125 + (a + b + f + g) * 0.03125 + (b + c + g + h) * 0.03125 + (f + g + k + l) * 0.03125 + (g + h + l + m) * 0.03125;
  if (uPrefilter > 0.5) {
    float ex = texture2D(tExp, vec2(0.5)).r;
    vec3 ce = col * ex;
    float br = max(ce.r, max(ce.g, ce.b));
    float soft = clamp(br - uThreshold + 0.5, 0.0, 1.0); soft = soft * soft * 0.5;
    float w = max(soft, br - uThreshold) / max(br, 1e-4);
    col *= max(w, 0.0);
    col = min(col, vec3(64.0 / max(ex, 1e-3)));
  }
  gl_FragColor = vec4(col, 1.0);
}`;
const UP_FS = /* glsl */`
uniform sampler2D tSrc; uniform vec2 uTexel; uniform float uScatter;
void main(){
  vec3 s = texture2D(tSrc, vUv + vec2(-1,-1) * uTexel).rgb + texture2D(tSrc, vUv + vec2(1,-1) * uTexel).rgb
         + texture2D(tSrc, vUv + vec2(-1,1) * uTexel).rgb + texture2D(tSrc, vUv + vec2(1,1) * uTexel).rgb
         + 2.0 * (texture2D(tSrc, vUv + vec2(0,-1) * uTexel).rgb + texture2D(tSrc, vUv + vec2(0,1) * uTexel).rgb
         + texture2D(tSrc, vUv + vec2(-1,0) * uTexel).rgb + texture2D(tSrc, vUv + vec2(1,0) * uTexel).rgb)
         + 4.0 * texture2D(tSrc, vUv).rgb;
  gl_FragColor = vec4(s / 16.0 * uScatter, 1.0);
}`;
const LUM_FS = /* glsl */`
uniform sampler2D tSrc;
void main(){
  vec3 c = texture2D(tSrc, vUv).rgb;
  float l = max(dot(c, vec3(0.2126, 0.7152, 0.0722)), 0.004);
  vec2 q = vUv - 0.5;
  float w = exp(-dot(q, q) * 6.0) + 0.15;   // центровзвешенный замер, как у носимых камер
  gl_FragColor = vec4(log2(l + 1e-4) * w, w, 0.0, 1.0);
}`;
const EXP_FS = /* glsl */`
uniform sampler2D tLum, tPrev; uniform float uDt, uKey, uMin, uMax, uUp, uDown, uReset;
void main(){
  vec4 a = textureLod(tLum, vec2(0.5), 10.0);
  float avg = exp2(a.r / max(a.g, 1e-4));
  float target = clamp(uKey / max(avg, 1e-5), uMin, uMax);
  float prev = texture2D(tPrev, vec2(0.5)).r;
  if (uReset > 0.5 || prev <= 0.0) prev = target;
  float sp = target > prev ? uUp : uDown;
  float e = prev + (target - prev) * (1.0 - exp(-uDt * sp));
  gl_FragColor = vec4(e, avg, 0.0, 1.0);
}`;
const FINAL_FS = /* glsl */`
uniform sampler2D tComp, tBloom, tExp, tPrev; uniform vec2 uRes; uniform float uTime;
uniform vec2 uVel; uniform float uDist, uCA, uDmg, uGlitch, uFlash, uDead, uLowHP, uBloom, uHist, uRain;
vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
vec2 barrel(vec2 uv){ vec2 c = uv * 2.0 - 1.0; float r2 = dot(c, c); c *= (1.0 + uDist * r2 + uDist * 0.35 * r2 * r2) / (1.0 + uDist * 1.25); return c * 0.5 + 0.5; }
vec3 hdr(vec2 uv){ return texture2D(tComp, uv).rgb; }
// капли на объективе
vec3 drops(vec2 uv, float t){
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 off = vec2(0.0); float rim = 0.0;
  for (int L = 0; L < 2; L++) {
    vec2 g = uv * asp * (L == 0 ? 7.0 : 13.0);
    vec2 id = floor(g); vec2 f = fract(g) - 0.5;
    float h = hash12(id + float(L) * 17.0);
    if (h > 0.83) {
      float life = fract(t * 0.05 + h * 7.0);
      vec2 c = (vec2(hash12(id + 3.1), hash12(id + 7.7)) - 0.5) * 0.6;
      c.y -= life * life * 0.35 * step(0.93, h);       // крупные сползают
      float r = (L == 0 ? 0.18 : 0.12) * (0.6 + 0.4 * h);
      vec2 q = f - c; q.y *= 1.15;
      float dd = length(q);
      float m = smoothstep(r, r * 0.6, dd) * smoothstep(1.0, 0.7, life);
      off += q * m * (L == 0 ? 0.045 : 0.025);
      rim += smoothstep(r * 0.95, r * 0.8, dd) * smoothstep(r * 0.4, r * 0.85, dd) * m;
    }
  }
  return vec3(off, rim);
}
void main(){
  float ex = texture2D(tExp, vec2(0.5)).r;
  vec2 uv = vUv;
  uv.x += (uv.y - 0.5) * uVel.x * 0.4;                          // rolling shutter
  float g = uGlitch + uDead;
  if (g > 0.0) {
    float line = floor(uv.y * 64.0);
    float n = hash12(vec2(line, floor(uTime * 20.0)));
    if (n < g * 0.55) uv.x += (hash12(vec2(line, floor(uTime * 37.0))) - 0.5) * 0.1 * g;
  }
  vec3 dr = drops(uv, uTime) * uRain;
  uv += dr.xy;
  vec2 d = barrel(uv);
  vec2 c = d - 0.5;
  float ca = uCA * (0.3 + dot(c, c) * 4.0) * (1.0 + g * 4.0);
  vec3 col = vec3(0.0);
  for (int i = 0; i < 8; i++) {
    vec2 o = uVel * (float(i) / 7.0 - 0.5);
    vec2 p = d + o;
    col += vec3(hdr(p + c * ca).r, hdr(p).g, hdr(p - c * ca).b);
  }
  col /= 8.0;
  // свечение и горизонтальные «засветы» сенсора
  vec3 bl = texture2D(tBloom, d).rgb;
  vec3 streak = (texture2D(tBloom, d + vec2(0.03, 0.0)).rgb + texture2D(tBloom, d - vec2(0.03, 0.0)).rgb
               + texture2D(tBloom, d + vec2(0.08, 0.0)).rgb + texture2D(tBloom, d - vec2(0.08, 0.0)).rgb) * 0.25;
  col += (bl * 0.45 + streak * vec3(0.2, 0.24, 0.3)) * uBloom;
  col *= ex * (1.0 + uFlash * 0.6);
  // резкость (типичный «перешарп» носимых камер)
  vec2 px = 1.0 / uRes;
  float lc = dot(aces(hdr(d) * ex), vec3(0.299, 0.587, 0.114));
  float ln = dot(aces(hdr(d + vec2(px.x, 0.0)) * ex) + aces(hdr(d - vec2(px.x, 0.0)) * ex) + aces(hdr(d + vec2(0.0, px.y)) * ex) + aces(hdr(d - vec2(0.0, px.y)) * ex), vec3(0.299, 0.587, 0.114)) * 0.25;
  col = aces(col * 1.1);
  col += (lc - ln) * 0.9;
  col = pow(max(col, 0.0), vec3(1.0 / 2.2));
  // цвет: обесцвечено, холодные тени, жёсткие чёрные
  float l = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(l), col, 0.72 - uLowHP * 0.45);
  col = mix(col * vec3(0.93, 1.0, 1.05), col * vec3(1.04, 1.0, 0.94), smoothstep(0.25, 0.75, l));
  col = max((col - 0.025) * 1.08, 0.0);
  // компрессия: макроблоки в тёмных плоских участках
  vec2 bc = (floor(gl_FragCoord.xy / 8.0) * 8.0 + 4.0) / uRes;
  vec3 blk = pow(aces(hdr(barrel(bc)) * ex * 1.1), vec3(1.0 / 2.2));
  float dark = 1.0 - smoothstep(0.04, 0.22, l);
  col = mix(col, blk, dark * 0.35);
  // шум сенсора: сильнее, когда камера вытягивает темноту
  float gain = clamp(log2(max(ex, 1.0)) / 9.0, 0.0, 1.0);
  float n = hash12(gl_FragCoord.xy + fract(uTime * 13.7) * 977.0) - 0.5;
  vec3 cn = vec3(hash12(gl_FragCoord.xy * 1.3 + uTime), hash12(gl_FragCoord.xy * 0.7 - uTime), hash12(gl_FragCoord.xy + 31.0 + uTime)) - 0.5;
  float nAmt = (0.03 + gain * 0.07) * (1.0 - l * 0.6) + g * 0.2;
  col += n * nAmt + cn * nAmt * 0.45;
  // капли: светлый ободок
  col += dr.z * 0.06 * (0.3 + l);
  if (d.x < 0.0 || d.x > 1.0 || d.y < 0.0 || d.y > 1.0) col = vec3(0.0);
  float r = length((vUv - 0.5) * vec2(1.1, 1.0));
  col *= mix(0.3, 1.0, smoothstep(0.8, 0.28, r));
  col = mix(col, col * vec3(1.4, 0.3, 0.25) + vec3(0.12, 0.0, 0.0), clamp(uDmg, 0.0, 1.0) * smoothstep(0.15, 0.7, r + uDmg * 0.2));
  if (uDead > 0.0) col = mix(col, vec3(hash12(gl_FragCoord.xy + uTime * 60.0)) * 0.6, uDead * 0.75);
  vec3 prev = texture2D(tPrev, vUv).rgb;
  col = mix(clamp(col, 0.0, 1.0), prev, uHist * dark);
  gl_FragColor = vec4(col, 1.0);
}`;
const COPY_FS = 'uniform sampler2D tSrc; void main(){ gl_FragColor = texture2D(tSrc, vUv); }';

export class Post {
  constructor(renderer, quality) {
    this.r = renderer;
    this.q = quality;
    this.scale = quality.scale;
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.quad.frustumCulled = false;
    this.qs = new THREE.Scene(); this.qs.add(this.quad);
    this.qc = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const kernel = [];
    for (let i = 0; i < 12; i++) {
      const v = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 0.85 + 0.15).normalize();
      const s = i / 12; v.multiplyScalar(THREE.MathUtils.lerp(0.15, 1, s * s) * (0.5 + Math.random() * 0.5));
      kernel.push(v);
    }
    this.mSSAO = mat(SSAO_FS, { tDepth: { value: null }, uProj: { value: new THREE.Matrix4() }, uProjInv: { value: new THREE.Matrix4() }, uKernel: { value: kernel }, uRadius: { value: 0.55 }, uTime: { value: 0 } });
    this.mBlurAO = mat(BLUR_AO_FS, { tAO: { value: null }, tDepth: { value: null }, uTexel: { value: new THREE.Vector2() }, uProjInv: { value: new THREE.Matrix4() } });
    const v3 = () => ({ value: new THREE.Vector3() });
    this.mVol = mat(VOL_FS, {
      tDepth: { value: null }, uProjInv: { value: new THREE.Matrix4() }, uViewInv: { value: new THREE.Matrix4() }, uCamPos: v3(), uTime: { value: 0 },
      uDensity: { value: 0.07 }, uMaxDist: { value: 55 }, uAmb: v3(),
      uTorchPos: v3(), uTorchDir: v3(), uTorchCol: v3(), uTorchCos: { value: 0.88 }, uTorchCosIn: { value: 0.95 },
      uTorchShadow: { value: null }, uTorchShadowMat: { value: new THREE.Matrix4() }, uTorchHasShadow: { value: 0 },
      uFlarePos: v3(), uFlareCol: v3(),
      uLanPos: { value: Array.from({ length: 6 }, () => new THREE.Vector3(0, -100, 0)) }, uLanCol: { value: Array.from({ length: 6 }, () => new THREE.Vector3()) },
      uMuzPos: v3(), uMuzCol: v3(),
    }, { STEPS: quality.volSteps });
    this.mComp = mat(COMP_FS, { tScene: { value: null }, tDepth: { value: null }, tAO: { value: null }, tVol: { value: null }, uProj: { value: new THREE.Matrix4() }, uProjInv: { value: new THREE.Matrix4() }, uView: { value: new THREE.Matrix4() }, uAO: { value: quality.ao ? 0.75 : 0 }, uSSR: { value: quality.ssr ? 1 : 0 }, uTime: { value: 0 }, uSkyRefl: { value: new THREE.Vector3(0.004, 0.005, 0.008) } });
    this.mDown = mat(DOWN_FS, { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() }, uPrefilter: { value: 0 }, tExp: { value: null }, uThreshold: { value: 1.3 } });
    this.mUp = mat(UP_FS, { tSrc: { value: null }, uTexel: { value: new THREE.Vector2() }, uScatter: { value: 0.75 } });
    this.mUp.blending = THREE.AdditiveBlending;
    this.mLum = mat(LUM_FS, { tSrc: { value: null } });
    this.mExp = mat(EXP_FS, { tLum: { value: null }, tPrev: { value: null }, uDt: { value: 0.016 }, uKey: { value: 0.085 }, uMin: { value: 0.5 }, uMax: { value: 180 }, uUp: { value: 1.6 }, uDown: { value: 3.5 }, uReset: { value: 1 } });
    this.mFinal = mat(FINAL_FS, {
      tComp: { value: null }, tBloom: { value: null }, tExp: { value: null }, tPrev: { value: null }, uRes: { value: new THREE.Vector2() }, uTime: { value: 0 },
      uVel: { value: new THREE.Vector2() }, uDist: { value: 0.32 }, uCA: { value: 0.005 }, uDmg: { value: 0 }, uGlitch: { value: 0 }, uFlash: { value: 0 },
      uDead: { value: 0 }, uLowHP: { value: 0 }, uBloom: { value: quality.bloom ? 1 : 0 }, uHist: { value: 0.18 }, uRain: { value: 1 },
    });
    this.mCopy = mat(COPY_FS, { tSrc: { value: null } });
    this.rtLum = rt(128, 128, { mip: true });
    this.rtExp = [rt(1, 1, { nearest: true }), rt(1, 1, { nearest: true })];
    this.expIdx = 0;
    this.outIdx = 0;
    this.prevView = new THREE.Matrix4();
    this.size = new THREE.Vector2(1, 1);
  }
  setQuality(q) {
    this.q = q; this.scale = q.scale;
    this.mVol.defines.STEPS = q.volSteps; this.mVol.needsUpdate = true;
    this.mComp.uniforms.uAO.value = q.ao ? 0.75 : 0; this.mComp.uniforms.uSSR.value = q.ssr ? 1 : 0;
    this.mFinal.uniforms.uBloom.value = q.bloom ? 1 : 0;
    this.resize(this.cssW, this.cssH, this.dpr);
  }
  resize(cssW, cssH, dpr) {
    this.cssW = cssW; this.cssH = cssH; this.dpr = dpr;
    const pr = Math.min(dpr, this.q.hiDpi ? 2 : 1) * this.scale;
    const w = Math.max(16, Math.round(cssW * pr)), h = Math.max(16, Math.round(cssH * pr));
    if (this.w === w && this.h === h) return;
    this.w = w; this.h = h;
    const dispose = (t) => t && t.dispose();
    [this.rtScene, this.rtAO, this.rtAO2, this.rtVol, this.rtComp, ...(this.rtOut || []), ...(this.bloom || [])].forEach(dispose);
    this.rtScene = rt(w, h, { depth: true, depthTexture: true, samples: this.q.msaa });
    const hw = Math.ceil(w / 2), hh = Math.ceil(h / 2);
    this.rtAO = rt(hw, hh, { type: THREE.UnsignedByteType });
    this.rtAO2 = rt(hw, hh, { type: THREE.UnsignedByteType });
    this.rtVol = rt(hw, hh);
    this.rtComp = rt(w, h);
    this.rtOut = [rt(w, h, { type: THREE.UnsignedByteType }), rt(w, h, { type: THREE.UnsignedByteType })];
    this.bloom = [];
    let bw = hw, bh = hh;
    for (let i = 0; i < 6; i++) { this.bloom.push(rt(bw, bh)); bw = Math.max(1, Math.ceil(bw / 2)); bh = Math.max(1, Math.ceil(bh / 2)); }
    this.mFinal.uniforms.uRes.value.set(w, h);
    this.r.setSize(cssW, cssH, false);
    this.r.setPixelRatio(1);
    this.r.domElement.style.width = cssW + 'px'; this.r.domElement.style.height = cssH + 'px';
    this.r.setSize(cssW, cssH, false);
  }
  pass(material, target, clear = true) {
    this.quad.material = material;
    this.r.setRenderTarget(target);
    if (clear) this.r.clear();
    this.r.render(this.qs, this.qc);
  }
  render(scene, camera, p) {
    const r = this.r;
    r.autoClear = false;
    // 1. сцена
    r.setRenderTarget(this.rtScene);
    r.setClearColor(0x000000, 1);
    r.clear(true, true, true);
    r.render(scene, camera);
    const depth = this.rtScene.depthTexture;
    const projInv = camera.projectionMatrixInverse;
    // 2. SSAO
    if (this.q.ao) {
      const u = this.mSSAO.uniforms;
      u.tDepth.value = depth; u.uProj.value.copy(camera.projectionMatrix); u.uProjInv.value.copy(projInv); u.uTime.value = p.time;
      this.pass(this.mSSAO, this.rtAO);
      const b = this.mBlurAO.uniforms;
      b.tAO.value = this.rtAO.texture; b.tDepth.value = depth; b.uProjInv.value.copy(projInv); b.uTexel.value.set(1 / this.rtAO.width, 1 / this.rtAO.height);
      this.pass(this.mBlurAO, this.rtAO2);
    } else if (!this.aoCleared) {
      r.setRenderTarget(this.rtAO2); r.setClearColor(0xffffff, 1); r.clear(); r.setClearColor(0x000000, 1); this.aoCleared = true;
    }
    // 3. объёмный туман и лучи
    {
      const u = this.mVol.uniforms;
      u.tDepth.value = depth; u.uProjInv.value.copy(projInv); u.uViewInv.value.copy(camera.matrixWorld);
      u.uCamPos.value.setFromMatrixPosition(camera.matrixWorld); u.uTime.value = p.time;
      u.uDensity.value = p.fogDensity; u.uAmb.value.copy(p.fogAmb);
      const t = p.torch;
      u.uTorchPos.value.copy(t.pos); u.uTorchDir.value.copy(t.dir); u.uTorchCol.value.copy(t.col);
      u.uTorchCos.value = t.cosOut; u.uTorchCosIn.value = t.cosIn;
      if (t.shadowMap) { u.uTorchShadow.value = t.shadowMap; u.uTorchShadowMat.value.copy(t.shadowMatrix); u.uTorchHasShadow.value = 1; } else u.uTorchHasShadow.value = 0;
      u.uFlarePos.value.copy(p.flare.pos); u.uFlareCol.value.copy(p.flare.col);
      for (let i = 0; i < 6; i++) {
        const s = p.lanterns[i];
        if (s) { u.uLanPos.value[i].copy(s.pos); u.uLanCol.value[i].copy(s.col); } else { u.uLanPos.value[i].set(0, -100, 0); u.uLanCol.value[i].set(0, 0, 0); }
      }
      u.uMuzPos.value.copy(p.muzzle.pos); u.uMuzCol.value.copy(p.muzzle.col);
      this.pass(this.mVol, this.rtVol);
    }
    // 4. композит + отражения в лужах
    {
      const u = this.mComp.uniforms;
      u.tScene.value = this.rtScene.texture; u.tDepth.value = depth; u.tAO.value = this.rtAO2.texture; u.tVol.value = this.rtVol.texture;
      u.uProj.value.copy(camera.projectionMatrix); u.uProjInv.value.copy(projInv); u.uView.value.copy(camera.matrixWorldInverse); u.uTime.value = p.time;
      this.pass(this.mComp, this.rtComp);
    }
    // 5. экспозиция
    {
      this.mLum.uniforms.tSrc.value = this.rtComp.texture;
      this.pass(this.mLum, this.rtLum);
      const prev = this.rtExp[this.expIdx], next = this.rtExp[1 - this.expIdx];
      const u = this.mExp.uniforms;
      u.tLum.value = this.rtLum.texture; u.tPrev.value = prev.texture; u.uDt.value = p.dt; u.uReset.value = this.resetExp ? 1 : 0;
      this.resetExp = false;
      this.pass(this.mExp, next);
      this.expIdx = 1 - this.expIdx;
    }
    const expTex = this.rtExp[this.expIdx].texture;
    // 6. bloom
    if (this.q.bloom) {
      let src = this.rtComp;
      for (let i = 0; i < this.bloom.length; i++) {
        const u = this.mDown.uniforms;
        u.tSrc.value = src.texture; u.uTexel.value.set(1 / src.width, 1 / src.height); u.uPrefilter.value = i === 0 ? 1 : 0; u.tExp.value = expTex;
        this.pass(this.mDown, this.bloom[i]);
        src = this.bloom[i];
      }
      for (let i = this.bloom.length - 1; i > 0; i--) {
        const u = this.mUp.uniforms;
        u.tSrc.value = this.bloom[i].texture; u.uTexel.value.set(1 / this.bloom[i].width, 1 / this.bloom[i].height);
        this.pass(this.mUp, this.bloom[i - 1], false);
      }
    }
    // 7. камера
    {
      const u = this.mFinal.uniforms;
      const out = this.rtOut[this.outIdx], prev = this.rtOut[1 - this.outIdx];
      u.tComp.value = this.rtComp.texture; u.tBloom.value = this.bloom[0].texture; u.tExp.value = expTex; u.tPrev.value = prev.texture;
      u.uTime.value = p.time; u.uVel.value.copy(p.vel);
      u.uDmg.value = p.dmg; u.uGlitch.value = p.glitch; u.uFlash.value = p.flash; u.uDead.value = p.dead; u.uLowHP.value = p.lowhp; u.uRain.value = p.rain;
      this.pass(this.mFinal, out);
      this.mCopy.uniforms.tSrc.value = out.texture;
      this.pass(this.mCopy, null);
      this.outIdx = 1 - this.outIdx;
    }
  }
}
