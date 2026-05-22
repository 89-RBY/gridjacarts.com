'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

type NodeDef = {
  id: string;
  label: string;
  pos: [number, number, number];
  particles: number;
};

const CHARS = '{}[]()=+-/<>:;.*';
const NODES: NodeDef[] = [
  { id: 'api', label: 'API Gateway', pos: [-5.0, 1.8, 0], particles: 22 },
  { id: 'inbox', label: 'Inbox', pos: [-1.8, 1.8, 0], particles: 22 },
  { id: 'triage', label: 'Claude · Triage', pos: [1.3, 2.8, 0.3], particles: 26 },
  { id: 'worker', label: 'Worker', pos: [-0.6, -1.8, 0], particles: 22 },
  { id: 'router', label: 'Router', pos: [3.2, 1.6, 0], particles: 22 },
  { id: 'db', label: 'Postgres', pos: [2.8, -1.7, 0], particles: 22 },
  { id: 'logs', label: 'Observability', pos: [5.2, -0.2, 0.2], particles: 18 },
];
const EDGES: [string, string][] = [
  ['api', 'inbox'],
  ['inbox', 'triage'],
  ['inbox', 'worker'],
  ['triage', 'router'],
  ['worker', 'db'],
  ['router', 'db'],
  ['db', 'logs'],
];

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

type ParticleData = {
  archPos: [number, number, number];
  chaosPos: [number, number, number];
  spin: [number, number, number];
  archRot: [number, number, number];
};

export default function HeroA() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const labelsContainer = labelsRef.current;
    if (!container || !labelsContainer) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

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

    // Bloom post-processing
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

    // Edges
    const nodeMap = new Map(NODES.map((n) => [n.id, n.pos]));
    const edgePositions = new Float32Array(EDGES.length * 2 * 3);
    for (let i = 0; i < EDGES.length; i++) {
      const a = nodeMap.get(EDGES[i][0])!;
      const b = nodeMap.get(EDGES[i][1])!;
      edgePositions[i * 6] = a[0];
      edgePositions[i * 6 + 1] = a[1];
      edgePositions[i * 6 + 2] = a[2];
      edgePositions[i * 6 + 3] = b[0];
      edgePositions[i * 6 + 4] = b[1];
      edgePositions[i * 6 + 5] = b[2];
    }
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edges);

    // Pulses
    const pulsePositions = new Float32Array(EDGES.length * 3);
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.22,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulses = new THREE.Points(pulseGeo, pulseMat);
    scene.add(pulses);

    // Build node labels (HTML overlay)
    const labelEls: HTMLDivElement[] = [];
    NODES.forEach((node) => {
      const el = document.createElement('div');
      el.textContent = node.label;
      el.style.cssText = [
        'position: absolute',
        'top: 0',
        'left: 0',
        'transform: translate(-50%, -200%)',
        'font-family: ui-monospace, SFMono-Regular, Menlo, monospace',
        'font-size: 10px',
        'letter-spacing: 0.12em',
        'text-transform: uppercase',
        'padding: 5px 10px',
        'border: 1px solid rgba(167, 139, 250, 0.5)',
        'background: rgba(15, 23, 42, 0.85)',
        'color: rgb(216, 180, 254)',
        'border-radius: 4px',
        'opacity: 0',
        'pointer-events: none',
        'white-space: nowrap',
        'backdrop-filter: blur(8px)',
        'box-shadow: 0 4px 24px rgba(139, 92, 246, 0.25)',
      ].join(';');
      labelsContainer.appendChild(el);
      labelEls.push(el);
    });

    // Mouse parallax (set up before async font load so refs exist)
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
      mouseTarget.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.5;
      mouseTarget.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
    };
    if (!isMobile) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }

    // Animation state
    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;
    let cleanupFn: (() => void) | null = null;
    let charGeos: Record<string, THREE.BufferGeometry> = {};
    let material: THREE.MeshPhysicalMaterial | null = null;
    let bucketsArr: Array<{
      mesh: THREE.InstancedMesh;
      data: ParticleData[];
    }> = [];

    const CYCLE = 16;
    const computePhase = (t: number): number => {
      const c = t % CYCLE;
      if (c < 1.5) return 0;
      if (c < 6) return easeInOutCubic((c - 1.5) / 4.5);
      if (c < 10) return 1;
      if (c < 14) return 1 - easeInOutCubic((c - 10) / 4);
      return 0;
    };

    const dummy = new THREE.Object3D();
    const projectVec = new THREE.Vector3();
    const tmpQuatA = new THREE.Quaternion();
    const tmpQuatB = new THREE.Quaternion();

    const render = () => {
      const t = clock.getElapsedTime();
      const phase = computePhase(t);

      bucketsArr.forEach(({ mesh, data }) => {
        for (let i = 0; i < data.length; i++) {
          const d = data[i];
          const x = d.chaosPos[0] + (d.archPos[0] - d.chaosPos[0]) * phase;
          const y = d.chaosPos[1] + (d.archPos[1] - d.chaosPos[1]) * phase;
          const z = d.chaosPos[2] + (d.archPos[2] - d.chaosPos[2]) * phase;

          // Chaos rotation: free spin. Arch rotation: settled angle.
          // Interpolate between them via phase.
          tmpQuatA.setFromEuler(
            new THREE.Euler(t * d.spin[0], t * d.spin[1], t * d.spin[2])
          );
          tmpQuatB.setFromEuler(
            new THREE.Euler(d.archRot[0], d.archRot[1], d.archRot[2])
          );
          dummy.quaternion.copy(tmpQuatA).slerp(tmpQuatB, phase);
          dummy.position.set(x, y, z);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      });

      edgeMat.opacity = phase * 0.55;
      pulseMat.opacity = phase * 0.95;
      if (phase > 0.4) {
        const pulseArr = pulses.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < EDGES.length; i++) {
          const a = nodeMap.get(EDGES[i][0])!;
          const b = nodeMap.get(EDGES[i][1])!;
          const param = (t * 0.4 + i * 0.13) % 1;
          pulseArr[i * 3] = a[0] + (b[0] - a[0]) * param;
          pulseArr[i * 3 + 1] = a[1] + (b[1] - a[1]) * param;
          pulseArr[i * 3 + 2] = a[2] + (b[2] - a[2]) * param;
        }
        pulses.geometry.attributes.position.needsUpdate = true;
      }

      // Mouse parallax — rotate scene
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;
      scene.rotation.y = mouseCurrent.x;
      scene.rotation.x = -mouseCurrent.y;

      composer.render();

      // Labels
      const labelOpacity = Math.max(0, (phase - 0.65) / 0.35);
      for (let i = 0; i < NODES.length; i++) {
        projectVec.set(NODES[i].pos[0], NODES[i].pos[1], NODES[i].pos[2]);
        projectVec.applyEuler(scene.rotation);
        projectVec.project(camera);
        const x = (projectVec.x + 1) * 0.5 * width;
        const y = (-projectVec.y + 1) * 0.5 * height;
        const el = labelEls[i];
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -200%)`;
        el.style.opacity = String(labelOpacity);
      }

      if (running) rafId = requestAnimationFrame(render);
    };

    // Load font then build letter geometries
    const fontLoader = new FontLoader();
    fontLoader.load(
      '/fonts/helvetiker_regular.typeface.json',
      (font: Font) => {
        // Build geometry per character
        const charsArr = CHARS.split('');
        charsArr.forEach((c) => {
          const g = new TextGeometry(c, {
            font,
            size: isMobile ? 0.32 : 0.42,
            depth: isMobile ? 0.08 : 0.12,
            curveSegments: 4,
            bevelEnabled: true,
            bevelThickness: 0.012,
            bevelSize: 0.006,
            bevelSegments: 2,
          });
          g.center();
          charGeos[c] = g;
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

        // Bucket particles per character
        const buckets: Record<string, ParticleData[]> = {};
        charsArr.forEach((c) => (buckets[c] = []));

        NODES.forEach((node) => {
          for (let i = 0; i < node.particles; i++) {
            const c = charsArr[Math.floor(Math.random() * charsArr.length)];
            const r = Math.random() * 0.75;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const archX = node.pos[0] + r * Math.sin(phi) * Math.cos(theta);
            const archY = node.pos[1] + r * Math.sin(phi) * Math.sin(theta);
            const archZ = node.pos[2] + r * Math.cos(phi) * 0.5;
            const chaosX = (Math.random() - 0.5) * 14;
            const chaosY = (Math.random() - 0.5) * 7;
            const chaosZ = (Math.random() - 0.5) * 4;
            buckets[c].push({
              archPos: [archX, archY, archZ],
              chaosPos: [chaosX, chaosY, chaosZ],
              spin: [
                (Math.random() - 0.5) * 1.6,
                (Math.random() - 0.5) * 1.6,
                (Math.random() - 0.5) * 1.6,
              ],
              archRot: [
                (Math.random() - 0.5) * 0.4,
                (Math.random() - 0.5) * 0.4,
                (Math.random() - 0.5) * 0.4,
              ],
            });
          }
        });

        // Build InstancedMesh per character
        charsArr.forEach((c) => {
          const data = buckets[c];
          if (data.length === 0) return;
          const mesh = new THREE.InstancedMesh(charGeos[c], material!, data.length);
          // Initial state: chaos
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
          // Render single architecture frame
          bucketsArr.forEach(({ mesh, data }) => {
            for (let i = 0; i < data.length; i++) {
              const d = data[i];
              dummy.position.set(...d.archPos);
              dummy.rotation.set(...d.archRot);
              dummy.updateMatrix();
              mesh.setMatrixAt(i, dummy.matrix);
            }
            mesh.instanceMatrix.needsUpdate = true;
          });
          edgeMat.opacity = 0.55;
          for (let i = 0; i < NODES.length; i++) {
            projectVec.set(NODES[i].pos[0], NODES[i].pos[1], NODES[i].pos[2]);
            projectVec.project(camera);
            const x = (projectVec.x + 1) * 0.5 * width;
            const y = (-projectVec.y + 1) * 0.5 * height;
            labelEls[i].style.transform = `translate(${x}px, ${y}px) translate(-50%, -200%)`;
            labelEls[i].style.opacity = '1';
          }
          composer.render();
        } else {
          clock.start();
          rafId = requestAnimationFrame(render);
        }
      },
      undefined,
      (err) => {
        console.error('FontLoader error:', err);
      }
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
      labelEls.forEach((el) => {
        if (el.parentNode === labelsContainer) labelsContainer.removeChild(el);
      });
      Object.values(charGeos).forEach((g) => g.dispose());
      edgeGeo.dispose();
      pulseGeo.dispose();
      material?.dispose();
      edgeMat.dispose();
      pulseMat.dispose();
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
    <>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div
        ref={labelsRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10"
      />
    </>
  );
}
