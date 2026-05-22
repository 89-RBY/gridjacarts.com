'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

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
  ctx.font = '500 44px ui-monospace, "SF Mono", Menlo, monospace';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  const chars =
    '01{}[]()<>=+-*/&|!?.,;:_#@%$^~`abcdefghijklmnopqrstuvwxyzABCDE';
  // 64 chars guaranteed
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
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;

  // Flow displacement
  vec2 flowSeed = vec2(uv.x * 1.4, uv.y * 1.4);
  vec2 flow = vec2(
    fbm(flowSeed + vec2(u_time * 0.08, 0.0)),
    fbm(flowSeed + vec2(0.0, u_time * 0.08 + 100.0))
  ) - 0.5;
  flow *= 0.06;

  // Mouse influence
  vec2 toMouse = uv - u_mouse;
  toMouse.x *= aspect;
  float mDist = length(toMouse);
  float ripple = exp(-mDist * 6.0) * 0.05;
  vec2 mouseFlow = normalize(toMouse + 0.0001) * ripple * sin(u_time * 3.0 - mDist * 18.0);
  flow += mouseFlow * 0.4;

  vec2 distortedUV = uv - flow;

  // Cell coordinates
  vec2 cell = vec2(distortedUV.x * u_cols, distortedUV.y * u_rows);
  vec2 cellId = floor(cell);
  vec2 cellUV = fract(cell);

  // Character index per cell, changes slowly
  float charSeed = hash(cellId + floor(u_time * 0.6));
  float idx = floor(charSeed * 64.0);

  // Atlas sample
  float ax = mod(idx, 16.0);
  float ay = floor(idx / 16.0);
  vec2 atlasUV = (vec2(ax, ay) + cellUV) / vec2(16.0, 4.0);
  float charMask = texture2D(u_atlas, atlasUV).r;

  // Activity field (which cells are "lit")
  float activity = smoothstep(
    0.35, 0.65,
    fbm(cellId * 0.08 + u_time * 0.05)
  );

  // Glow near mouse
  float mouseGlow = exp(-mDist * 3.5) * 0.6;
  activity = clamp(activity + mouseGlow, 0.0, 1.2);

  // Color gradient
  vec3 cyan   = vec3(0.404, 0.910, 0.957);
  vec3 violet = vec3(0.659, 0.490, 0.984);
  vec3 base = mix(cyan, violet, smoothstep(0.0, 1.6, uv.x + uv.y * 0.5));

  // Hot spots: white-out where activity is very high
  vec3 hot = mix(base, vec3(1.0), smoothstep(0.7, 1.1, activity));

  vec3 finalColor = hot * charMask * activity * 1.15;

  // Subtle dark base so non-lit cells aren't pure black
  finalColor += vec3(0.015, 0.025, 0.05) * (1.0 - charMask * activity);

  // Vignette
  float vig = smoothstep(1.1, 0.4, length(uv - 0.5));
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
      u_cols: { value: isMobile ? 48 : 96 },
      u_rows: { value: isMobile ? 28 : 36 },
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

    // Mouse tracking
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
      // Smooth mouse follow
      uniforms.u_mouse.value.x += (mouseTarget.x - uniforms.u_mouse.value.x) * 0.08;
      uniforms.u_mouse.value.y += (mouseTarget.y - uniforms.u_mouse.value.y) * 0.08;
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
      renderer.setSize(width, height);
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
