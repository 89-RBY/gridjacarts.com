'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Two code snippets — the letters cycle between them like a real diff.
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

type Target = { char: string; x: number; y: number };

function layoutCode(text: string, charWidth: number, lineHeight: number): Target[] {
  const lines = text.split('\n');
  const totalLines = lines.length;
  const yTop = ((totalLines - 1) * lineHeight) / 2;
  const targets: Target[] = [];

  lines.forEach((line, lineIdx) => {
    const trimmedLen = line.length;
    const lineWidth = (trimmedLen - 1) * charWidth;
    const xStart = -lineWidth / 2;
    const y = yTop - lineIdx * lineHeight;

    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === ' ' || c === '\t') continue;
      targets.push({ char: c, x: xStart + i * charWidth, y });
    }
  });
  return targets;
}

function buildEnv(): THREE.Scene {
  const s = new THREE.Scene();
  s.background = new THREE.Color(0x05070d);
  const geo = new THREE.SphereGeometry(2.2, 16, 16);
  const lights: [number, [number, number, number], number][] = [
    [0x06b6d4, [-6, 3, -2], 3.0],
    [0xa78bfa, [6, -3, -2], 3.0],
    [0xec4899, [0, 5, 1], 2.0],
    [0xfbbf24, [-4, -4, 3], 1.5],
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

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

type ParticleData = {
  posA: [number, number, number]; // target for snippet A
  posB: [number, number, number]; // target for snippet B
  hasA: boolean;
  hasB: boolean;
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(buildEnv(), 0.04);
    scene.environment = envRT.texture;
    pmrem.dispose();
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    // Decorative orbiting glow lights (like variant D)
    type Orbit = {
      light: THREE.PointLight;
      glow: THREE.Mesh;
      radius: number;
      speed: number;
      phase: number;
      tilt: number;
    };
    const orbitConfigs = [
      { c: 0x06b6d4, r: 4.5, s: 0.45, p: 0.0, t: 0.3 },
      { c: 0xec4899, r: 4.0, s: 0.35, p: 2.5, t: -0.3 },
      { c: 0xfbbf24, r: 5.0, s: 0.55, p: 5.0, t: 0.5 },
    ];
    const orbits: Orbit[] = orbitConfigs.map((o) => ({
      light: new THREE.PointLight(o.c, 12, 18, 1.5),
      glow: null!,
      radius: o.r,
      speed: o.s,
      phase: o.p,
      tilt: o.t,
    }));
    const orbitGlowGeo = new THREE.SphereGeometry(0.07, 12, 12);
    orbits.forEach((o) => {
      o.glow = new THREE.Mesh(
        orbitGlowGeo,
        new THREE.MeshBasicMaterial({ color: o.light.color, transparent: true, opacity: 1 })
      );
      scene.add(o.light);
      scene.add(o.glow);
    });

    // Bloom
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(width, height);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      isMobile ? 0.55 : 0.85,
      isMobile ? 0.4 : 0.6,
      0.0
    );
    composer.addPass(bloom);

    // Mouse parallax
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
      mouseTarget.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.35;
      mouseTarget.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.22;
    };
    if (!isMobile) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }

    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;
    let cleanupFn: (() => void) | null = null;
    const charGeos: Record<string, THREE.BufferGeometry> = {};
    let material: THREE.MeshPhysicalMaterial | null = null;
    type Bucket = { mesh: THREE.InstancedMesh; data: ParticleData[] };
    const bucketsArr: Bucket[] = [];

    // Phase state machine
    // 0..1 chaos→A, 1..2 hold A, 2..3 A→chaos+chaos→B, 3..4 hold B, 4..5 B→chaos
    // total 5 seconds-units, scaled
    const PHASE_DURATIONS = [1.5, 4.5, 1.5, 2.5, 4.5, 2.5, 1.5]; // chaos, formA, holdA, A→chaos, formB, holdB, B→chaos
    const CYCLE = PHASE_DURATIONS.reduce((a, b) => a + b, 0);

    type StateSample = { aWeight: number; bWeight: number };
    function sampleState(t: number): StateSample {
      // returns aWeight (how much snippet A is showing) and bWeight (how much B)
      let cycleT = t % CYCLE;
      let acc = 0;
      const stages = [
        { dur: PHASE_DURATIONS[0], a: () => 0, b: () => 0 }, // chaos
        { dur: PHASE_DURATIONS[1], a: (k: number) => easeInOutCubic(k), b: () => 0 }, // form A
        { dur: PHASE_DURATIONS[2], a: () => 1, b: () => 0 }, // hold A
        { dur: PHASE_DURATIONS[3], a: (k: number) => 1 - easeInOutCubic(k), b: () => 0 }, // A → chaos
        { dur: PHASE_DURATIONS[4], a: () => 0, b: (k: number) => easeInOutCubic(k) }, // form B
        { dur: PHASE_DURATIONS[5], a: () => 0, b: () => 1 }, // hold B
        { dur: PHASE_DURATIONS[6], a: () => 0, b: (k: number) => 1 - easeInOutCubic(k) }, // B → chaos
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

    const render = () => {
      const t = clock.getElapsedTime();
      const { aWeight, bWeight } = sampleState(t);
      // chaos weight: 1 when neither A nor B is forming
      const chaosWeight = Math.max(0, 1 - aWeight - bWeight);

      bucketsArr.forEach(({ mesh, data }) => {
        for (let i = 0; i < data.length; i++) {
          const d = data[i];
          // Blend position: chaos / A / B
          let x = d.chaosPos[0] * chaosWeight;
          let y = d.chaosPos[1] * chaosWeight;
          let z = d.chaosPos[2] * chaosWeight;
          if (d.hasA && aWeight > 0) {
            x += d.posA[0] * aWeight;
            y += d.posA[1] * aWeight;
            z += d.posA[2] * aWeight;
          } else if (aWeight > 0) {
            // No A position — let chaos compensate
            x += d.chaosPos[0] * aWeight;
            y += d.chaosPos[1] * aWeight;
            z += d.chaosPos[2] * aWeight;
          }
          if (d.hasB && bWeight > 0) {
            x += d.posB[0] * bWeight;
            y += d.posB[1] * bWeight;
            z += d.posB[2] * bWeight;
          } else if (bWeight > 0) {
            x += d.chaosPos[0] * bWeight;
            y += d.chaosPos[1] * bWeight;
            z += d.chaosPos[2] * bWeight;
          }

          // Rotation: spinning in chaos, settled when formed
          tmpQuatChaos.setFromEuler(
            new THREE.Euler(t * d.spin[0], t * d.spin[1], t * d.spin[2])
          );
          tmpQuatRest.setFromEuler(restEuler);
          const formed = aWeight + bWeight;
          dummy.quaternion.copy(tmpQuatChaos).slerp(tmpQuatRest, formed);
          dummy.position.set(x, y, z);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      });

      // Orbit decorations
      orbits.forEach((o) => {
        const a = t * o.speed + o.phase;
        const ox = Math.cos(a) * o.radius;
        const oz = Math.sin(a) * o.radius;
        const oy = Math.sin(a * 0.8) * o.radius * o.tilt;
        o.light.position.set(ox, oy, oz);
        o.glow.position.set(ox, oy, oz);
      });

      // Mouse parallax — rotate the scene container
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;
      scene.rotation.y = mouseCurrent.x;
      scene.rotation.x = -mouseCurrent.y;

      composer.render();
      if (running) rafId = requestAnimationFrame(render);
    };

    // Async: load font, build geometries, start animation
    const fontLoader = new FontLoader();
    fontLoader.load(
      '/fonts/helvetiker_regular.typeface.json',
      (font: Font) => {
        const targetsA = layoutCode(SNIPPET_A, charWidth, lineHeight);
        const targetsB = layoutCode(SNIPPET_B, charWidth, lineHeight);

        // Union of unique chars
        const uniqueChars = new Set<string>();
        targetsA.forEach((t) => uniqueChars.add(t.char));
        targetsB.forEach((t) => uniqueChars.add(t.char));

        // Build TextGeometry per unique char
        uniqueChars.forEach((c) => {
          try {
            const g = new TextGeometry(c, {
              font,
              size: fontSize,
              depth: fontSize * 0.28,
              curveSegments: 4,
              bevelEnabled: true,
              bevelThickness: 0.012,
              bevelSize: 0.006,
              bevelSegments: 2,
            });
            g.center();
            charGeos[c] = g;
          } catch (e) {
            console.warn(`TextGeometry failed for char "${c}":`, e);
          }
        });

        material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.6,
          roughness: 0.22,
          iridescence: 1.0,
          iridescenceIOR: 1.35,
          iridescenceThicknessRange: [120, 760],
          envMapIntensity: 1.8,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
        });

        // For each unique character, allocate instances.
        // Total instances per char = max(countInA, countInB).
        // Each instance gets a posA from A (if available) and posB from B (if available).
        type CharInstanceSpec = {
          posA?: [number, number, number];
          posB?: [number, number, number];
        };
        const specsPerChar = new Map<string, CharInstanceSpec[]>();

        uniqueChars.forEach((c) => {
          const aPositions = targetsA
            .filter((t) => t.char === c)
            .map((t) => [t.x, t.y, 0] as [number, number, number]);
          const bPositions = targetsB
            .filter((t) => t.char === c)
            .map((t) => [t.x, t.y, 0] as [number, number, number]);
          const count = Math.max(aPositions.length, bPositions.length);
          const specs: CharInstanceSpec[] = [];
          for (let i = 0; i < count; i++) {
            specs.push({
              posA: aPositions[i],
              posB: bPositions[i],
            });
          }
          specsPerChar.set(c, specs);
        });

        // Build InstancedMesh per char with all its instances
        specsPerChar.forEach((specs, c) => {
          const geo = charGeos[c];
          if (!geo || specs.length === 0) return;
          const mesh = new THREE.InstancedMesh(geo, material!, specs.length);
          const data: ParticleData[] = specs.map((spec) => ({
            posA: spec.posA ?? [0, 0, 0],
            posB: spec.posB ?? [0, 0, 0],
            hasA: !!spec.posA,
            hasB: !!spec.posB,
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
          // Initial: chaos
          for (let i = 0; i < data.length; i++) {
            dummy.position.set(...data[i].chaosPos);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
          }
          mesh.instanceMatrix.needsUpdate = true;
          scene.add(mesh);
          bucketsArr.push({ mesh, data });
        });

        if (reduceMotion) {
          // Static frame at B
          bucketsArr.forEach(({ mesh, data }) => {
            for (let i = 0; i < data.length; i++) {
              const d = data[i];
              const pos = d.hasB ? d.posB : d.hasA ? d.posA : d.chaosPos;
              dummy.position.set(...pos);
              dummy.rotation.set(0, 0, 0);
              dummy.updateMatrix();
              mesh.setMatrixAt(i, dummy.matrix);
            }
            mesh.instanceMatrix.needsUpdate = true;
          });
          composer.render();
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
      composer.setSize(width, height);
      bloom.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    cleanupFn = () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      Object.values(charGeos).forEach((g) => g.dispose());
      orbitGlowGeo.dispose();
      orbits.forEach((o) => (o.glow.material as THREE.Material).dispose());
      material?.dispose();
      envRT.dispose();
      composer.dispose();
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
