'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const CODE_LINES: { text: string; color: string }[] = [
  { text: 'const result = await triage({', color: '#67e8f9' },
  { text: '  subject: email.subject,', color: '#cbd5e1' },
  { text: '  body: email.body,', color: '#cbd5e1' },
  { text: '  from: email.sender,', color: '#cbd5e1' },
  { text: '});', color: '#67e8f9' },
  { text: '', color: '#67e8f9' },
  { text: 'if (result.confidence < 0.7) {', color: '#c4b5fd' },
  { text: '  return human.escalate(email);', color: '#fbbf24' },
  { text: '}', color: '#c4b5fd' },
  { text: '', color: '#67e8f9' },
  { text: 'await route(email, result.category);', color: '#67e8f9' },
  { text: 'return ok(result.draft);', color: '#67e8f9' },
];

function makeCodeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const W = 1280;
  const H = 800;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, W, H);

  // Header chrome
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(56, 56, 9, 0, Math.PI * 2);
  ctx.arc(86, 56, 9, 0, Math.PI * 2);
  ctx.arc(116, 56, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 22px ui-monospace, "SF Mono", Menlo, monospace';
  ctx.fillText('triage.ts', 170, 64);

  // Code
  ctx.font = '600 36px ui-monospace, "SF Mono", Menlo, monospace';
  const startY = 150;
  const lineHeight = 50;
  CODE_LINES.forEach((line, i) => {
    if (!line.text) return;
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 80, startY + i * lineHeight);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  return tex;
}

function buildEnvScene(): THREE.Scene {
  const s = new THREE.Scene();
  s.background = new THREE.Color(0x04060c);
  const geo = new THREE.SphereGeometry(3, 24, 24);
  const lights: [number, [number, number, number], number][] = [
    [0x06b6d4, [-8, 4, -3], 4.0],
    [0xa78bfa, [8, -4, -3], 4.0],
    [0xec4899, [0, 7, 2], 2.5],
    [0xfbbf24, [-5, -6, 4], 2.0],
  ];
  lights.forEach(([c, p, i]) => {
    const m = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(i) })
    );
    m.position.set(...p);
    s.add(m);
  });
  return s;
}

const BG_VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const BG_FRAGMENT = /* glsl */ `
varying vec2 vUv;
uniform float u_time;
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float n1 = snoise(uv * 1.6 + vec2(u_time * 0.05, u_time * 0.03));
  float n2 = snoise(uv * 3.2 - vec2(u_time * 0.04, u_time * 0.07));
  float n = (n1 + n2 * 0.5) * 0.5 + 0.5;
  vec3 c1 = vec3(0.024, 0.063, 0.16);
  vec3 c2 = vec3(0.024, 0.443, 0.486);
  vec3 c3 = vec3(0.545, 0.247, 0.871);
  vec3 c4 = vec3(0.929, 0.180, 0.467);
  vec3 col = mix(c1, c2, n);
  col = mix(col, c3, smoothstep(0.45, 0.85, n));
  col = mix(col, c4, smoothstep(0.75, 1.0, n) * 0.6);
  gl_FragColor = vec4(col, 1.0);
}`;

export default function HeroB() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Env
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(buildEnvScene(), 0.04);
    scene.environment = envRT.texture;
    pmrem.dispose();

    // Background animated gradient — bigger to fill viewport
    const bgGeo = new THREE.PlaneGeometry(20, 12);
    const bgUniforms = { u_time: { value: 0 } };
    const bgMat = new THREE.ShaderMaterial({
      uniforms: bgUniforms,
      vertexShader: BG_VERTEX,
      fragmentShader: BG_FRAGMENT,
      depthWrite: false,
    });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    bg.position.z = -5;
    scene.add(bg);

    // Code texture plane — bigger
    const codeTex = makeCodeTexture();
    const codeMat = new THREE.MeshBasicMaterial({
      map: codeTex,
      transparent: true,
      opacity: 0.98,
      depthWrite: false,
    });
    const codePlane = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 3.4), codeMat);
    codePlane.position.z = -0.12;
    scene.add(codePlane);

    // Glass slab — much bigger now (dominates viewport)
    const glassGeo = new THREE.BoxGeometry(5.8, 3.7, 0.45);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.05,
      transmission: 1,
      ior: 1.5,
      thickness: 0.55,
      attenuationDistance: 2.5,
      attenuationColor: new THREE.Color(0xa5f3fc),
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 1.6,
      side: THREE.DoubleSide,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.z = 0.1;

    // Edge glow
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 4.3), glowMat);
    glow.position.z = -0.3;

    const slabGroup = new THREE.Group();
    slabGroup.add(glass);
    slabGroup.add(codePlane);
    slabGroup.add(glow);
    scene.add(slabGroup);

    // Orbiting visible light spheres + actual PointLights (like D)
    type Orbit = {
      light: THREE.PointLight;
      glow: THREE.Mesh;
      radius: number;
      speed: number;
      phase: number;
      tilt: number;
    };
    const orbitColors = [
      { c: 0x06b6d4, r: 4.5, s: 0.5, p: 0.0, t: 0.3 },
      { c: 0xec4899, r: 4.2, s: 0.4, p: 2.0, t: -0.2 },
      { c: 0xfbbf24, r: 4.8, s: 0.65, p: 4.0, t: 0.5 },
    ];
    const orbits: Orbit[] = orbitColors.map((o) => ({
      light: new THREE.PointLight(o.c, 18, 18, 1.5),
      glow: null!,
      radius: o.r,
      speed: o.s,
      phase: o.p,
      tilt: o.t,
    }));
    const orbitGlowGeo = new THREE.SphereGeometry(0.08, 12, 12);
    orbits.forEach((o) => {
      o.glow = new THREE.Mesh(
        orbitGlowGeo,
        new THREE.MeshBasicMaterial({ color: o.light.color, transparent: true, opacity: 1 })
      );
      scene.add(o.light);
      scene.add(o.glow);
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.18));
    const key = new THREE.DirectionalLight(0xffffff, 0.5);
    key.position.set(-3, 4, 5);
    scene.add(key);

    // Bloom
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(width, height);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      isMobile ? 0.5 : 0.75,
      isMobile ? 0.4 : 0.55,
      0.0
    );
    composer.addPass(bloom);

    // Mouse parallax
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right;
      if (!inside) return;
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.35;
    };
    if (!isMobile) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }

    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;

    const render = () => {
      const t = clock.getElapsedTime();
      bgUniforms.u_time.value = t;

      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      slabGroup.rotation.y = current.x + Math.sin(t * 0.35) * 0.08;
      slabGroup.rotation.x = -current.y + Math.cos(t * 0.45) * 0.05;
      slabGroup.position.y = Math.sin(t * 0.5) * 0.08;

      // Orbit lights
      orbits.forEach((o) => {
        const a = t * o.speed + o.phase;
        const x = Math.cos(a) * o.radius;
        const z = Math.sin(a) * o.radius;
        const y = Math.sin(a * 0.8) * o.radius * o.tilt;
        o.light.position.set(x, y, z);
        o.glow.position.set(x, y, z);
      });

      composer.render();
      if (running) rafId = requestAnimationFrame(render);
    };

    if (reduceMotion) {
      composer.render();
    } else {
      rafId = requestAnimationFrame(render);
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!reduceMotion) {
        running = true;
        rafId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
      bloom.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      bgGeo.dispose();
      glassGeo.dispose();
      orbitGlowGeo.dispose();
      codeTex.dispose();
      codeMat.dispose();
      glassMat.dispose();
      glowMat.dispose();
      bgMat.dispose();
      orbits.forEach((o) => (o.glow.material as THREE.Material).dispose());
      envRT.dispose();
      composer.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
