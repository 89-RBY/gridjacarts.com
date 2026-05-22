'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

function makeCharAtlas(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  const ATLAS_W = 1024;
  const ATLAS_H = 256;
  const CELL = 64;
  canvas.width = ATLAS_W;
  canvas.height = ATLAS_H;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, ATLAS_W, ATLAS_H);
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.font = '700 48px ui-monospace, "SF Mono", Menlo, monospace';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  const chars = '01{}[]()<>=+-*/&|!?.,;:_#@%$^~`abcdefghijklmnopqrstuvwxyzABCDE';
  for (let i = 0; i < 64; i++) {
    const col = i % 16;
    const row = Math.floor(i / 16);
    const x = col * CELL + CELL / 2;
    const y = row * CELL + CELL / 2;
    ctx.fillText(chars[i] || '?', x, y);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.colorSpace = THREE.NoColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  return tex;
}

const VERTEX = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}`;

const FRAGMENT = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D u_atlas;
uniform float u_cols;
uniform float u_rows;

float hash(vec2 p) {
  p = fract(p * vec2(443.897, 441.423));
  p += dot(p, p.yx + 19.19);
  return fract((p.x + p.y) * p.x);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;

  // Flow field
  vec2 flowSeed = vec2(uv.x * 1.6, uv.y * 1.6);
  vec2 flow = vec2(
    fbm(flowSeed + vec2(u_time * 0.10, 0.0)),
    fbm(flowSeed + vec2(0.0, u_time * 0.10 + 100.0))
  ) - 0.5;
  flow *= 0.10;

  // Mouse: BIG influence — pull, swirl, glow
  vec2 toMouse = uv - u_mouse;
  toMouse.x *= aspect;
  float mDist = length(toMouse);
  float swirl = exp(-mDist * 2.5);
  vec2 perp = vec2(-toMouse.y, toMouse.x);
  flow += normalize(perp + 0.0001) * swirl * 0.06;
  float ripple = sin(mDist * 22.0 - u_time * 4.0) * exp(-mDist * 3.0) * 0.04;
  flow += normalize(toMouse + 0.0001) * ripple;

  vec2 distortedUV = uv - flow;

  // Larger cells
  vec2 cell = vec2(distortedUV.x * u_cols, distortedUV.y * u_rows);
  vec2 cellId = floor(cell);
  vec2 cellUV = fract(cell);

  // Character changes slowly
  float charSeed = hash(cellId + floor(u_time * 0.5));
  float idx = floor(charSeed * 64.0);

  float ax = mod(idx, 16.0);
  float ay = floor(idx / 16.0);
  vec2 atlasUV = (vec2(ax, ay) + cellUV) / vec2(16.0, 4.0);
  float charMask = texture2D(u_atlas, atlasUV).r;

  // Activity field — stronger contrast
  float activity = smoothstep(
    0.30, 0.75,
    fbm(cellId * 0.10 + u_time * 0.07)
  );

  // Mouse glow
  float mouseGlow = exp(-mDist * 2.2) * 1.4;
  activity = clamp(activity + mouseGlow, 0.0, 1.6);

  // Wave pulse from corners
  float pulseA = abs(sin(u_time * 0.7 - uv.x * 6.28 - uv.y * 3.14)) * 0.3;
  activity += pulseA * smoothstep(0.6, 1.0, fbm(cellId * 0.05));

  // Bold gradient — cyan → magenta → gold
  vec3 cyan    = vec3(0.404, 0.910, 0.957);
  vec3 magenta = vec3(0.925, 0.282, 0.600);
  vec3 gold    = vec3(0.984, 0.749, 0.141);
  float g = uv.x + sin(u_time * 0.2 + uv.y * 3.0) * 0.15;
  vec3 base = mix(cyan, magenta, smoothstep(0.0, 1.0, g));
  base = mix(base, gold, smoothstep(0.95, 1.4, g + uv.y * 0.3));

  // Hot near mouse — colour shifts
  vec3 mouseTint = mix(vec3(1.0, 0.95, 0.85), cyan, smoothstep(0.0, 0.4, mDist));
  base = mix(mouseTint, base, smoothstep(0.0, 0.5, mDist));

  vec3 finalColor = base * charMask * activity * 1.4;
  finalColor += vec3(0.02, 0.035, 0.07) * (1.0 - charMask * activity);

  float vig = smoothstep(1.2, 0.4, length(uv - 0.5));
  finalColor *= 0.55 + 0.45 * vig;

  gl_FragColor = vec4(finalColor, 1.0);
}`;

export default function HeroC() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const atlas = makeCharAtlas();
    const uniforms = {
      u_res: { value: new THREE.Vector2(width * renderer.getPixelRatio(), height * renderer.getPixelRatio()) },
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_atlas: { value: atlas },
      u_cols: { value: isMobile ? 28 : 48 },
      u_rows: { value: isMobile ? 16 : 22 },
    };

    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: false,
    });
    const quad = new THREE.Mesh(geo, mat);
    scene.add(quad);

    // Bloom for hot spots
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(width, height);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      isMobile ? 0.55 : 0.85,
      isMobile ? 0.4 : 0.65,
      0.0
    );
    composer.addPass(bloom);

    const mouseTarget = { x: 0.5, y: 0.5 };
    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right;
      if (!inside) return;
      mouseTarget.x = (e.clientX - rect.left) / rect.width;
      mouseTarget.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      const rect = container.getBoundingClientRect();
      mouseTarget.x = (touch.clientX - rect.left) / rect.width;
      mouseTarget.y = 1 - (touch.clientY - rect.top) / rect.height;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });

    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;

    const render = () => {
      const t = clock.getElapsedTime();
      uniforms.u_time.value = t;
      uniforms.u_mouse.value.x += (mouseTarget.x - uniforms.u_mouse.value.x) * 0.08;
      uniforms.u_mouse.value.y += (mouseTarget.y - uniforms.u_mouse.value.y) * 0.08;
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
      renderer.setSize(width, height);
      composer.setSize(width, height);
      bloom.setSize(width, height);
      uniforms.u_res.value.set(width * renderer.getPixelRatio(), height * renderer.getPixelRatio());
    };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('touchmove', onTouch);
      geo.dispose();
      mat.dispose();
      atlas.dispose();
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
