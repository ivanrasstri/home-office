// Ночное небо: тучи, подсвеченные ракетами и артиллерией, адское зарево, силуэты горизонта.
import * as THREE from 'three';
import { makeNoise } from './util.js';

export const skyUniforms = {
  uTime: { value: 0 }, uFlash: { value: 0 }, uFlashDir: { value: new THREE.Vector3(0, 0, -1) },
  uFlare: { value: 0 }, uFlareDir: { value: new THREE.Vector3(0, 1, 0) },
};

export function buildSky(scene) {
  const mat = new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    vertexShader: /* glsl */`
      varying vec3 vDir;
      void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,
    fragmentShader: /* glsl */`
      varying vec3 vDir;
      uniform float uTime, uFlash, uFlare; uniform vec3 uFlashDir, uFlareDir;
      float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
      float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.-2.*f);
        return mix(mix(h12(i), h12(i+vec2(1,0)), u.x), mix(h12(i+vec2(0,1)), h12(i+vec2(1,1)), u.x), u.y); }
      float fbm(vec2 p){ float s = 0., a = .5; for (int i = 0; i < 5; i++){ s += vn(p) * a; p = mat2(1.6, 1.2, -1.2, 1.6) * p; a *= .5; } return s; }
      void main(){
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 col = mix(vec3(0.022, 0.020, 0.024), vec3(0.003, 0.004, 0.008), smoothstep(-0.05, 0.55, h));
        float north = max(0.0, -d.z);
        float hor = pow(1.0 - clamp(h, 0.0, 1.0), 7.0);
        col += vec3(0.16, 0.035, 0.010) * hor * (0.25 + 0.75 * north * north);
        if (h > -0.02) {
          vec2 cuv = d.xz / (max(h, 0.0) + 0.09) * 0.55 + uTime * vec2(0.006, 0.002);
          float c = smoothstep(0.38, 0.78, fbm(cuv * 1.1));
          float c2 = fbm(cuv * 3.1 + 4.0);
          float dens = clamp(c * (0.65 + 0.5 * c2), 0.0, 1.0);
          vec3 cl = vec3(0.010, 0.011, 0.015) * (0.6 + c2);
          cl += vec3(0.07, 0.018, 0.006) * north * north * (1.0 - clamp(h * 2.0, 0.0, 1.0));
          cl += uFlash * vec3(0.55, 0.32, 0.16) * pow(max(dot(d, uFlashDir), 0.0), 5.0);
          cl += uFlare * vec3(0.22, 0.26, 0.21) * (0.25 + pow(max(dot(d, uFlareDir), 0.0), 3.0));
          // звёзды в разрывах туч
          vec2 sg = floor(d.xz / (h + 0.3) * 220.0);
          float star = step(0.9965, h12(sg)) * smoothstep(0.1, 0.4, h) * (0.6 + 0.4 * sin(uTime * 3.0 + h12(sg + 7.) * 40.));
          col += vec3(0.5, 0.55, 0.65) * star * (1.0 - dens) * 0.6;
          col = mix(col, cl, dens * smoothstep(-0.02, 0.12, h));
        }
        col += uFlash * vec3(0.9, 0.45, 0.2) * pow(max(dot(d, uFlashDir), 0.0), 12.0) * smoothstep(0.3, 0.0, h);
        col += uFlare * vec3(0.05, 0.06, 0.05) * smoothstep(0.4, 0.0, abs(h));
        gl_FragColor = vec4(col, 1.0);
      }`,
    side: THREE.BackSide, depthWrite: false, depthTest: true,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(450, 48, 24), mat);
  sky.frustumCulled = false; sky.renderOrder = -10;
  scene.add(sky);

  // Силуэты горизонта: холмы, руины, обломанные деревья
  const N = 720, Rr = 300, noise = makeNoise(77);
  const pos = [];
  const prof = (a) => {
    let y = 4 + noise.fbm(Math.cos(a) * 3 + 10, Math.sin(a) * 3, 4) * 14;
    const k = Math.floor(a / (Math.PI * 2) * 900);
    const r = Math.abs((Math.sin(k * 91.7) * 43758.5) % 1);
    const cl = noise.noise2(Math.cos(a) * 9, Math.sin(a) * 9);    // руины группами
    if (cl > 0.35 && r > 0.5) y += (cl - 0.35) * 18 * (0.4 + r);
    if (r < 0.012) y += 9 + r * 900;                               // обломанные стволы
    return y;
  };
  for (let i = 0; i < N; i++) {
    const a0 = (i / N) * Math.PI * 2, a1 = ((i + 1) / N) * Math.PI * 2;
    const y0 = prof(a0), y1 = prof(a1);
    const p0 = [Math.cos(a0) * Rr, Math.sin(a0) * Rr], p1 = [Math.cos(a1) * Rr, Math.sin(a1) * Rr];
    pos.push(p0[0], -40, p0[1], p1[0], -40, p1[1], p1[0], y1, p1[1]);
    pos.push(p0[0], -40, p0[1], p1[0], y1, p1[1], p0[0], y0, p0[1]);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const ring = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: new THREE.Color(0.006, 0.006, 0.007), side: THREE.DoubleSide, fog: false }));
  ring.frustumCulled = false; ring.renderOrder = -9;
  scene.add(ring);
  return { sky, ring };
}
