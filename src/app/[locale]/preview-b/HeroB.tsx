'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

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
  const W = 1024;
  const H = 640;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Transparent background — glass tint behind
  ctx.clearRect(0, 0, W, H);

  // Tiny window-chrome
  ctx.fillStyle = '#475569';
  ctx.beginPath();
  ctx.arc(40, 40, 7, 0, Math.PI * 2);
  ctx.arc(64, 40, 7, 0, Math.PI * 2);
  ctx.arc(88, 40, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#64748b';
  ctx.font = '500 18px ui-monospace, "SF Mono", Menlo, monospace';
  ctx.fillText('triage.ts', 130, 46);

  // Code lines
  ctx.font = '500 28px ui-monospace, "SF Mono", Menlo, monospace';
  const startY = 110;
  const lineHeight = 38;
  CODE_LINES.forEach((line, i) => {
    if (!line.text) return;
    ctx.fillStyle = line.color;
    ctx.fillText(line.text, 60, startY + i * lineHeight);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function buildEnvironmentScene(): THREE.Scene {
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x050810);

  // Colored "area lights" as mesh emitters (PMREM picks them up)
  const geo = new THREE.SphereGeometry(2.5, 24, 24);

  const cyanLight = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0x06b6d4).multiplyScalar(2.5) })
  );
  cyanLight.position.set(-6, 3, -2);
  envScene.add(cyanLight);

  const violetLight = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0x8b5cf6).multiplyScalar(2.5) })
  );
  violetLight.position.set(6, -3, -2);
  envScene.add(violetLight);

  const warmLight = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({ color: new THREE.Color(0xf59e0b).multiplyScalar(1.0) })
  );
  warmLight.position.set(0, 5, 1);
  envScene.add(warmLight);

  const topPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 10),
    new THREE.MeshBasicMaterial({ color: 0x1e293b })
  );
  topPlane.rotation.x = -Math.PI / 2;
  topPlane.position.y = 5;
  envScene.add(topPlane);

  return envScene;
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

// 2D simplex noise (Ashima)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                      -0.577350269189626, 0.024390243902439);
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
  float n2 = snoise(uv * 3.0 - vec2(u_time * 0.04, u_time * 0.07));
  float n = (n1 + n2 * 0.5) * 0.5 + 0.5;

  vec3 c1 = vec3(0.024, 0.063, 0.16);   // deep navy
  vec3 c2 = vec3(0.024, 0.443, 0.486);  // teal
  vec3 c3 = vec3(0.345, 0.247, 0.671);  // violet
  vec3 col = mix(c1, c2, n);
  col = mix(col, c3, smoothstep(0.55, 0.95, n));

  // Subtle vignette
  float vig = smoothstep(1.2, 0.3, length(uv - 0.5));
  col *= 0.55 + 0.45 * vig;

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
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Environment
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envScene = buildEnvironmentScene();
    const envRT = pmrem.fromScene(envScene, 0.04);
    scene.environment = envRT.texture;
    pmrem.dispose();

    // Animated background plane (full-screen quad)
    const bgGeo = new THREE.PlaneGeometry(16, 9);
    const bgUniforms = { u_time: { value: 0 } };
    const bgMat = new THREE.ShaderMaterial({
      uniforms: bgUniforms,
      vertexShader: BG_VERTEX,
      fragmentShader: BG_FRAGMENT,
      depthWrite: false,
    });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    bg.position.z = -4;
    scene.add(bg);

    // Code texture plane (slightly behind glass front face, for "embedded in glass" look)
    const codeTex = makeCodeTexture();
    const codeMat = new THREE.MeshBasicMaterial({
      map: codeTex,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });
    const codePlane = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.25), codeMat);
    codePlane.position.z = -0.08;
    scene.add(codePlane);

    // Glass slab (front-most). Slightly larger than code plane.
    const glassGeo = new THREE.BoxGeometry(3.9, 2.55, 0.32);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.06,
      transmission: 1,
      ior: 1.5,
      thickness: 0.45,
      attenuationDistance: 2.5,
      attenuationColor: new THREE.Color(0xa5f3fc),
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.3,
      side: THREE.DoubleSide,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.z = 0.05;
    scene.add(glass);

    // Subtle edge glow (a slightly larger transparent mesh behind glass)
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.85), glowMat);
    glow.position.z = -0.2;
    scene.add(glow);

    // Direct lights for extra sparkle
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.6);
    keyLight.position.set(-3, 4, 5);
    scene.add(keyLight);
    const cyanFill = new THREE.PointLight(0x06b6d4, 8, 12);
    cyanFill.position.set(-3, 1, 2);
    scene.add(cyanFill);
    const violetFill = new THREE.PointLight(0x8b5cf6, 8, 12);
    violetFill.position.set(3, -1, 2);
    scene.add(violetFill);

    // Group for tilt
    const slabGroup = new THREE.Group();
    slabGroup.add(glass);
    slabGroup.add(codePlane);
    slabGroup.add(glow);
    scene.add(slabGroup);

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
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.35;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.25;
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

      // Idle oscillation + mouse parallax
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;

      slabGroup.rotation.y = current.x + Math.sin(t * 0.3) * 0.05;
      slabGroup.rotation.x = -current.y + Math.cos(t * 0.4) * 0.03;
      slabGroup.position.y = Math.sin(t * 0.5) * 0.06;

      renderer.render(scene, camera);
      if (running) rafId = requestAnimationFrame(render);
    };

    if (reduceMotion) {
      renderer.render(scene, camera);
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
      codeTex.dispose();
      codeMat.dispose();
      glassMat.dispose();
      glowMat.dispose();
      bgMat.dispose();
      envRT.dispose();
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
