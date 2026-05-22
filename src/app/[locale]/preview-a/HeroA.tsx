'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

// Two code snippets — letters cycle between them like a real diff.
const SNIPPET_A = `if (body.match('inv')) {
  return 'billing';
}`;

const SNIPPET_B = `const r = await triage(e);

if (r.score < 0.7) {
  return review(r);
}

return route(r.cat);`;

const FONT_SIZE_DESKTOP = 0.44;
const FONT_SIZE_MOBILE = 0.28;
const CHAR_WIDTH_DESKTOP = 0.32;
const CHAR_WIDTH_MOBILE = 0.20;
const LINE_HEIGHT_DESKTOP = 0.72;
const LINE_HEIGHT_MOBILE = 0.46;

type TokenType = 'kw' | 'str' | 'num' | 'punct' | 'id';

// Editor-style color palette (One Dark / VS Code blend, slightly desaturated)
const TOKEN_COLORS: Record<TokenType, THREE.Color> = {
  kw: new THREE.Color('#c084fc'),   // keywords: light purple
  str: new THREE.Color('#86efac'),  // strings: light green
  num: new THREE.Color('#fbbf24'),  // numbers: amber
  punct: new THREE.Color('#94a3b8'),// punctuation: slate
  id: new THREE.Color('#e2e8f0'),   // identifiers: near-white
};
const CHAOS_COLOR = new THREE.Color('#475569'); // slate-600 — muted neutral

const KEYWORDS = ['if', 'else', 'const', 'await', 'return', 'let', 'var', 'function', 'true', 'false', 'null'];

function tokenizeLine(line: string): TokenType[] {
  const types: TokenType[] = new Array(line.length).fill('id');
  let m: RegExpExecArray | null;

  // 1. Strings first (highest priority)
  const strRe = /'[^']*'|"[^"]*"/g;
  while ((m = strRe.exec(line)) !== null) {
    for (let i = m.index; i < m.index + m[0].length; i++) types[i] = 'str';
  }

  // 2. Keywords (word-bounded, only outside strings)
  for (const kw of KEYWORDS) {
    const kre = new RegExp(`\\b${kw}\\b`, 'g');
    while ((m = kre.exec(line)) !== null) {
      const s = m.index;
      const e = s + m[0].length;
      if (types[s] !== 'str') {
        for (let i = s; i < e; i++) if (types[i] !== 'str') types[i] = 'kw';
      }
    }
  }

  // 3. Numbers (only outside strings)
  const numRe = /\b\d+(\.\d+)?\b/g;
  while ((m = numRe.exec(line)) !== null) {
    const s = m.index;
    const e = s + m[0].length;
    if (types[s] !== 'str' && types[s] !== 'kw') {
      for (let i = s; i < e; i++) if (types[i] === 'id') types[i] = 'num';
    }
  }

  // 4. Punctuation (only what's still 'id')
  for (let i = 0; i < line.length; i++) {
    if (types[i] === 'id' && /[{}()<>=;,.+\-*\/]/.test(line[i])) {
      types[i] = 'punct';
    }
  }

  return types;
}

type Target = { char: string; x: number; y: number; type: TokenType };

function layoutCode(text: string, charWidth: number, lineHeight: number): Target[] {
  const lines = text.split('\n');
  const totalLines = lines.length;
  const yTop = ((totalLines - 1) * lineHeight) / 2;
  const targets: Target[] = [];

  lines.forEach((line, lineIdx) => {
    if (!line) return;
    const types = tokenizeLine(line);
    const lineWidth = (line.length - 1) * charWidth;
    const xStart = -lineWidth / 2;
    const y = yTop - lineIdx * lineHeight;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === ' ' || c === '\t') continue;
      targets.push({ char: c, x: xStart + i * charWidth, y, type: types[i] });
    }
  });
  return targets;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type ParticleData = {
  posA: [number, number, number];
  posB: [number, number, number];
  hasA: boolean;
  hasB: boolean;
  typeA: TokenType;
  typeB: TokenType;
  chaosPos: [number, number, number];
  spin: [number, number, number];
};

export default function HeroA() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? FONT_SIZE_MOBILE : FONT_SIZE_DESKTOP;
    const charWidth = isMobile ? CHAR_WIDTH_MOBILE : CHAR_WIDTH_DESKTOP;
    const lineHeight = isMobile ? LINE_HEIGHT_MOBILE : LINE_HEIGHT_DESKTOP;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NoToneMapping; // crisp, not cinematic
    container.appendChild(renderer.domElement);

    // Neutral studio lighting — no colored decorative lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 0.8);
    key.position.set(-2, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.35);
    fill.position.set(4, -2, 2);
    scene.add(fill);

    // Mouse parallax — subtle
    const mouseTarget = { x: 0, y: 0 };
    const mouseCurrent = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right;
      if (!inside) return;
      mouseTarget.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.22;
      mouseTarget.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.14;
    };
    if (!isMobile) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }

    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;
    let cleanupFn: (() => void) | null = null;
    const charGeos: Record<string, THREE.BufferGeometry> = {};
    let material: THREE.MeshStandardMaterial | null = null;
    type Bucket = { mesh: THREE.InstancedMesh; data: ParticleData[] };
    const bucketsArr: Bucket[] = [];

    // Phase state machine
    const PHASE_DURATIONS = [1.5, 4.5, 1.5, 2.5, 4.5, 4.5, 2.5];
    const CYCLE = PHASE_DURATIONS.reduce((a, b) => a + b, 0);

    function sampleState(t: number): { aWeight: number; bWeight: number } {
      let cycleT = t % CYCLE;
      let acc = 0;
      const stages = [
        { dur: PHASE_DURATIONS[0], a: () => 0, b: () => 0 },
        { dur: PHASE_DURATIONS[1], a: (k: number) => easeInOutCubic(k), b: () => 0 },
        { dur: PHASE_DURATIONS[2], a: () => 1, b: () => 0 },
        { dur: PHASE_DURATIONS[3], a: (k: number) => 1 - easeInOutCubic(k), b: () => 0 },
        { dur: PHASE_DURATIONS[4], a: () => 0, b: (k: number) => easeInOutCubic(k) },
        { dur: PHASE_DURATIONS[5], a: () => 0, b: () => 1 },
        { dur: PHASE_DURATIONS[6], a: () => 0, b: (k: number) => 1 - easeInOutCubic(k) },
      ];
      for (const stage of stages) {
        if (cycleT < acc + stage.dur) {
          const k = (cycleT - acc) / stage.dur;
          return { aWeight: stage.a(k), bWeight: stage.b(k) };
        }
        acc += stage.dur;
      }
      return { aWeight: 0, bWeight: 0 };
    }

    const dummy = new THREE.Object3D();
    const tmpQuatChaos = new THREE.Quaternion();
    const tmpQuatRest = new THREE.Quaternion();
    const restEuler = new THREE.Euler(0, 0, 0);
    const finalColor = new THREE.Color();

    const render = () => {
      const t = clock.getElapsedTime();
      const { aWeight, bWeight } = sampleState(t);
      const chaosWeight = Math.max(0, 1 - aWeight - bWeight);

      bucketsArr.forEach(({ mesh, data }) => {
        for (let i = 0; i < data.length; i++) {
          const d = data[i];

          // Position blend
          let x = d.chaosPos[0] * chaosWeight;
          let y = d.chaosPos[1] * chaosWeight;
          let z = d.chaosPos[2] * chaosWeight;
          if (aWeight > 0) {
            if (d.hasA) {
              x += d.posA[0] * aWeight;
              y += d.posA[1] * aWeight;
              z += d.posA[2] * aWeight;
            } else {
              x += d.chaosPos[0] * aWeight;
              y += d.chaosPos[1] * aWeight;
              z += d.chaosPos[2] * aWeight;
            }
          }
          if (bWeight > 0) {
            if (d.hasB) {
              x += d.posB[0] * bWeight;
              y += d.posB[1] * bWeight;
              z += d.posB[2] * bWeight;
            } else {
              x += d.chaosPos[0] * bWeight;
              y += d.chaosPos[1] * bWeight;
              z += d.chaosPos[2] * bWeight;
            }
          }

          // Rotation: chaotic spin in chaos, settled when formed
          tmpQuatChaos.setFromEuler(
            new THREE.Euler(t * d.spin[0], t * d.spin[1], t * d.spin[2])
          );
          tmpQuatRest.setFromEuler(restEuler);
          const formed = aWeight + bWeight;
          dummy.quaternion.copy(tmpQuatChaos).slerp(tmpQuatRest, formed);
          dummy.position.set(x, y, z);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);

          // Color blend: chaos grey ↔ token color
          const ca = TOKEN_COLORS[d.typeA];
          const cb = TOKEN_COLORS[d.typeB];
          finalColor.setRGB(
            CHAOS_COLOR.r * chaosWeight + ca.r * aWeight + cb.r * bWeight,
            CHAOS_COLOR.g * chaosWeight + ca.g * aWeight + cb.g * bWeight,
            CHAOS_COLOR.b * chaosWeight + ca.b * aWeight + cb.b * bWeight
          );
          mesh.setColorAt(i, finalColor);
        }
        mesh.instanceMatrix.needsUpdate = true;
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      });

      // Subtle mouse parallax — small rotation only
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;
      scene.rotation.y = mouseCurrent.x;
      scene.rotation.x = -mouseCurrent.y;

      renderer.render(scene, camera);
      if (running) rafId = requestAnimationFrame(render);
    };

    // Load font then build
    const fontLoader = new FontLoader();
    fontLoader.load(
      '/fonts/helvetiker_regular.typeface.json',
      (font: Font) => {
        const targetsA = layoutCode(SNIPPET_A, charWidth, lineHeight);
        const targetsB = layoutCode(SNIPPET_B, charWidth, lineHeight);

        const uniqueChars = new Set<string>();
        targetsA.forEach((t) => uniqueChars.add(t.char));
        targetsB.forEach((t) => uniqueChars.add(t.char));

        uniqueChars.forEach((c) => {
          try {
            const g = new TextGeometry(c, {
              font,
              size: fontSize,
              depth: fontSize * 0.22,
              curveSegments: 4,
              bevelEnabled: true,
              bevelThickness: 0.008,
              bevelSize: 0.004,
              bevelSegments: 1,
            });
            g.center();
            charGeos[c] = g;
          } catch (e) {
            console.warn(`TextGeometry failed for "${c}":`, e);
          }
        });

        // Matte studio material, neutral
        material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.15,
          roughness: 0.5,
        });

        // Per char, pair instances between A & B
        type CharSpec = {
          posA?: [number, number, number];
          posB?: [number, number, number];
          typeA: TokenType;
          typeB: TokenType;
        };
        const specsPerChar = new Map<string, CharSpec[]>();

        uniqueChars.forEach((c) => {
          const aMatches = targetsA.filter((t) => t.char === c);
          const bMatches = targetsB.filter((t) => t.char === c);
          const count = Math.max(aMatches.length, bMatches.length);
          const specs: CharSpec[] = [];
          for (let i = 0; i < count; i++) {
            const a = aMatches[i];
            const b = bMatches[i];
            specs.push({
              posA: a ? [a.x, a.y, 0] : undefined,
              posB: b ? [b.x, b.y, 0] : undefined,
              typeA: a ? a.type : 'id',
              typeB: b ? b.type : 'id',
            });
          }
          specsPerChar.set(c, specs);
        });

        specsPerChar.forEach((specs, c) => {
          const geo = charGeos[c];
          if (!geo || specs.length === 0) return;
          const mesh = new THREE.InstancedMesh(geo, material!, specs.length);
          // Initialize instanceColor attribute (needed for setColorAt)
          mesh.instanceColor = new THREE.InstancedBufferAttribute(
            new Float32Array(specs.length * 3),
            3
          );
          const data: ParticleData[] = specs.map((spec) => ({
            posA: spec.posA ?? [0, 0, 0],
            posB: spec.posB ?? [0, 0, 0],
            hasA: !!spec.posA,
            hasB: !!spec.posB,
            typeA: spec.typeA,
            typeB: spec.typeB,
            chaosPos: [
              (Math.random() - 0.5) * 14,
              (Math.random() - 0.5) * 7,
              (Math.random() - 0.5) * 4,
            ],
            spin: [
              (Math.random() - 0.5) * 1.6,
              (Math.random() - 0.5) * 1.6,
              (Math.random() - 0.5) * 1.6,
            ],
          }));
          for (let i = 0; i < data.length; i++) {
            dummy.position.set(...data[i].chaosPos);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
            mesh.setColorAt(i, CHAOS_COLOR);
          }
          mesh.instanceMatrix.needsUpdate = true;
          if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
          scene.add(mesh);
          bucketsArr.push({ mesh, data });
        });

        if (reduceMotion) {
          // Static frame: show snippet B
          bucketsArr.forEach(({ mesh, data }) => {
            for (let i = 0; i < data.length; i++) {
              const d = data[i];
              const pos = d.hasB ? d.posB : d.hasA ? d.posA : d.chaosPos;
              dummy.position.set(...pos);
              dummy.rotation.set(0, 0, 0);
              dummy.updateMatrix();
              mesh.setMatrixAt(i, dummy.matrix);
              mesh.setColorAt(i, TOKEN_COLORS[d.hasB ? d.typeB : d.typeA]);
            }
            mesh.instanceMatrix.needsUpdate = true;
            if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
          });
          renderer.render(scene, camera);
        } else {
          clock.start();
          rafId = requestAnimationFrame(render);
        }
      },
      undefined,
      (err) => console.error('FontLoader error:', err)
    );

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!reduceMotion && bucketsArr.length > 0) {
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

    cleanupFn = () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      Object.values(charGeos).forEach((g) => g.dispose());
      material?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };

    return () => {
      if (cleanupFn) cleanupFn();
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
