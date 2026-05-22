'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type NodeDef = { id: string; label: string; pos: [number, number, number] };

const NODES: NodeDef[] = [
  { id: 'api', label: 'API Gateway', pos: [-4.2, 1.6, 0] },
  { id: 'inbox', label: 'Inbox', pos: [-1.6, 1.6, 0] },
  { id: 'triage', label: 'Claude · Triage', pos: [0.8, 2.4, 0.2] },
  { id: 'worker', label: 'Worker', pos: [-0.5, -1.4, 0] },
  { id: 'router', label: 'Router', pos: [2.6, 1.4, 0] },
  { id: 'db', label: 'Postgres', pos: [2.4, -1.4, 0] },
  { id: 'logs', label: 'Observability', pos: [4.5, -0.2, 0.2] },
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

const PARTICLES_PER_NODE_DESKTOP = 36;
const PARTICLES_PER_NODE_MOBILE = 14;
const CLUSTER_RADIUS = 0.55;
const CHAOS_VOLUME = { x: 11, y: 5.5, z: 4 };

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function HeroA() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const labelsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const labelsContainer = labelsRef.current;
    if (!container || !labelsContainer) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const perNode = isMobile ? PARTICLES_PER_NODE_MOBILE : PARTICLES_PER_NODE_DESKTOP;
    const total = perNode * NODES.length;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Build particle target & chaos positions
    const targetPos = new Float32Array(total * 3);
    const chaosPos = new Float32Array(total * 3);
    const currentPos = new Float32Array(total * 3);
    const sizes = new Float32Array(total);

    for (let n = 0; n < NODES.length; n++) {
      const [cx, cy, cz] = NODES[n].pos;
      for (let i = 0; i < perNode; i++) {
        const idx = (n * perNode + i) * 3;
        // Target: jitter around node center
        const r = Math.random() * CLUSTER_RADIUS;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        targetPos[idx] = cx + r * Math.sin(phi) * Math.cos(theta);
        targetPos[idx + 1] = cy + r * Math.sin(phi) * Math.sin(theta);
        targetPos[idx + 2] = cz + r * Math.cos(phi) * 0.5;

        // Chaos: random in larger volume
        chaosPos[idx] = (Math.random() - 0.5) * CHAOS_VOLUME.x * 2;
        chaosPos[idx + 1] = (Math.random() - 0.5) * CHAOS_VOLUME.y * 2;
        chaosPos[idx + 2] = (Math.random() - 0.5) * CHAOS_VOLUME.z * 2;

        currentPos[idx] = chaosPos[idx];
        currentPos[idx + 1] = chaosPos[idx + 1];
        currentPos[idx + 2] = chaosPos[idx + 2];

        sizes[perNode * n + i] = 0.05 + Math.random() * 0.03;
      }
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(currentPos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.07,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Edges
    const edgePositions = new Float32Array(EDGES.length * 2 * 3);
    const nodeMap = new Map(NODES.map((n) => [n.id, n.pos]));
    for (let i = 0; i < EDGES.length; i++) {
      const [a, b] = EDGES[i];
      const pa = nodeMap.get(a)!;
      const pb = nodeMap.get(b)!;
      edgePositions[i * 6] = pa[0];
      edgePositions[i * 6 + 1] = pa[1];
      edgePositions[i * 6 + 2] = pa[2];
      edgePositions[i * 6 + 3] = pb[0];
      edgePositions[i * 6 + 4] = pb[1];
      edgePositions[i * 6 + 5] = pb[2];
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

    // Pulses traveling along edges (one Points cloud, position recomputed each frame)
    const pulsePositions = new Float32Array(EDGES.length * 3);
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.18,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulses = new THREE.Points(pulseGeo, pulseMat);
    scene.add(pulses);

    // Build label DOM
    const labelEls: HTMLDivElement[] = [];
    NODES.forEach((node) => {
      const el = document.createElement('div');
      el.textContent = node.label;
      el.style.cssText = [
        'position: absolute',
        'top: 0',
        'left: 0',
        'transform: translate(-50%, -150%)',
        'font-family: ui-monospace, SFMono-Regular, Menlo, monospace',
        'font-size: 10px',
        'letter-spacing: 0.08em',
        'text-transform: uppercase',
        'padding: 4px 8px',
        'border: 1px solid rgba(167, 139, 250, 0.4)',
        'background: rgba(15, 23, 42, 0.85)',
        'color: rgb(196, 181, 253)',
        'border-radius: 4px',
        'opacity: 0',
        'pointer-events: none',
        'white-space: nowrap',
        'backdrop-filter: blur(4px)',
        'transition: none',
      ].join(';');
      labelsContainer.appendChild(el);
      labelEls.push(el);
    });

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
      mouseTarget.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.4;
      mouseTarget.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.3;
    };
    if (!isMobile) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }

    // Animation loop
    const CYCLE = 16; // seconds per full loop
    const projectVec = new THREE.Vector3();
    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;

    const computePhase = (t: number): number => {
      // 0..16: chaos→arch→hold→arch→chaos
      const cycle = t % CYCLE;
      if (cycle < 2) return 0; // chaos
      if (cycle < 6) return easeInOutCubic((cycle - 2) / 4); // morph in
      if (cycle < 10) return 1; // hold architecture
      if (cycle < 14) return 1 - easeInOutCubic((cycle - 10) / 4); // morph out
      return 0;
    };

    const render = () => {
      const t = clock.getElapsedTime();
      const phase = computePhase(t);

      // Update particle positions
      const posAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < total; i++) {
        const idx = i * 3;
        // Add tiny ambient drift in architecture state
        const drift = phase * 0.04 * Math.sin(t * 0.7 + i);
        arr[idx] = chaosPos[idx] + (targetPos[idx] - chaosPos[idx]) * phase + drift;
        arr[idx + 1] =
          chaosPos[idx + 1] + (targetPos[idx + 1] - chaosPos[idx + 1]) * phase + drift * 0.5;
        arr[idx + 2] = chaosPos[idx + 2] + (targetPos[idx + 2] - chaosPos[idx + 2]) * phase;
      }
      posAttr.needsUpdate = true;

      // Edges & pulses
      edgeMat.opacity = phase * 0.55;
      pulseMat.opacity = phase * 0.95;
      if (phase > 0.4) {
        const pulseArr = pulses.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < EDGES.length; i++) {
          const [a, b] = EDGES[i];
          const pa = nodeMap.get(a)!;
          const pb = nodeMap.get(b)!;
          // travel param 0..1 oscillating
          const param = ((t * 0.4 + i * 0.13) % 1);
          pulseArr[i * 3] = pa[0] + (pb[0] - pa[0]) * param;
          pulseArr[i * 3 + 1] = pa[1] + (pb[1] - pa[1]) * param;
          pulseArr[i * 3 + 2] = pa[2] + (pb[2] - pa[2]) * param;
        }
        pulses.geometry.attributes.position.needsUpdate = true;
      }

      // Mouse parallax
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;
      scene.rotation.y = mouseCurrent.x;
      scene.rotation.x = -mouseCurrent.y;

      renderer.render(scene, camera);

      // Update labels (projection)
      const labelOpacity = Math.max(0, (phase - 0.55) / 0.45);
      for (let i = 0; i < NODES.length; i++) {
        projectVec.set(NODES[i].pos[0], NODES[i].pos[1], NODES[i].pos[2]);
        // Apply same scene rotation as visual
        projectVec.applyEuler(scene.rotation);
        projectVec.project(camera);
        const x = (projectVec.x + 1) * 0.5 * width;
        const y = (-projectVec.y + 1) * 0.5 * height;
        const el = labelEls[i];
        el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -150%)`;
        el.style.opacity = String(labelOpacity);
      }

      if (running) rafId = requestAnimationFrame(render);
    };

    if (reduceMotion) {
      // Render the architecture state once, no animation
      const posAttr = particles.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      for (let i = 0; i < total * 3; i++) arr[i] = targetPos[i];
      posAttr.needsUpdate = true;
      edgeMat.opacity = 0.55;
      // Set labels to fully visible
      for (let i = 0; i < NODES.length; i++) {
        projectVec.set(NODES[i].pos[0], NODES[i].pos[1], NODES[i].pos[2]);
        projectVec.project(camera);
        const x = (projectVec.x + 1) * 0.5 * width;
        const y = (-projectVec.y + 1) * 0.5 * height;
        labelEls[i].style.transform = `translate(${x}px, ${y}px) translate(-50%, -150%)`;
        labelEls[i].style.opacity = '1';
      }
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
      labelEls.forEach((el) => labelsContainer.removeChild(el));
      particleGeo.dispose();
      edgeGeo.dispose();
      pulseGeo.dispose();
      particleMat.dispose();
      edgeMat.dispose();
      pulseMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
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
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      />
    </>
  );
}
