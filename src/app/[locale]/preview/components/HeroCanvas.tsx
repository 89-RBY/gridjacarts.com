'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NODE_COUNT_DESKTOP = 520;
const NODE_COUNT_MOBILE = 200;
const CONNECT_DISTANCE = 1.4;
const VOLUME = { x: 9, y: 5, z: 5 };

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    // Generate node positions
    const positions = new Float32Array(nodeCount * 3);
    const baseY = new Float32Array(nodeCount);
    const phase = new Float32Array(nodeCount);

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * VOLUME.x * 2;
      const y = (Math.random() - 0.5) * VOLUME.y * 2;
      const z = (Math.random() - 0.5) * VOLUME.z * 2;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      baseY[i] = y;
      phase[i] = Math.random() * Math.PI * 2;
    }

    // Nodes
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x6ee7f0,
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    root.add(nodes);

    // Connections (computed once)
    const linkIndices: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const ax = positions[i * 3];
      const ay = positions[i * 3 + 1];
      const az = positions[i * 3 + 2];
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = positions[j * 3] - ax;
        const dy = positions[j * 3 + 1] - ay;
        const dz = positions[j * 3 + 2] - az;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECT_DISTANCE) {
          linkIndices.push(i, j);
        }
      }
    }

    const linkPositions = new Float32Array(linkIndices.length * 3);
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
    const linkMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const links = new THREE.LineSegments(linkGeo, linkMat);
    root.add(links);

    // Slow accent rotation of a few "labeled" anchors (rendered as separate larger points)
    const anchorGeo = new THREE.BufferGeometry();
    const ANCHOR_COUNT = 6;
    const anchorPos = new Float32Array(ANCHOR_COUNT * 3);
    for (let i = 0; i < ANCHOR_COUNT; i++) {
      const angle = (i / ANCHOR_COUNT) * Math.PI * 2;
      anchorPos[i * 3] = Math.cos(angle) * 4;
      anchorPos[i * 3 + 1] = Math.sin(angle * 0.7) * 1.5;
      anchorPos[i * 3 + 2] = Math.sin(angle) * 2;
    }
    anchorGeo.setAttribute('position', new THREE.BufferAttribute(anchorPos, 3));
    const anchorMat = new THREE.PointsMaterial({
      color: 0xa78bfa,
      size: 0.16,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const anchors = new THREE.Points(anchorGeo, anchorMat);
    root.add(anchors);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right;
      if (!inside) return;
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.4;
    };
    if (!isMobile) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }

    const updateLinks = (time: number) => {
      const posAttr = nodes.geometry.attributes.position as THREE.BufferAttribute;
      for (let k = 0; k < linkIndices.length; k += 2) {
        const i = linkIndices[k];
        const j = linkIndices[k + 1];
        const ki = k * 3;
        linkPositions[ki] = posAttr.getX(i);
        linkPositions[ki + 1] = posAttr.getY(i);
        linkPositions[ki + 2] = posAttr.getZ(i);
        linkPositions[ki + 3] = posAttr.getX(j);
        linkPositions[ki + 4] = posAttr.getY(j);
        linkPositions[ki + 5] = posAttr.getZ(j);
      }
      linkGeo.attributes.position.needsUpdate = true;
    };

    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const posAttr = nodes.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      // Gentle vertical drift per node
      for (let i = 0; i < nodeCount; i++) {
        arr[i * 3 + 1] = baseY[i] + Math.sin(elapsed * 0.4 + phase[i]) * 0.08;
      }
      posAttr.needsUpdate = true;

      updateLinks(elapsed);

      // Camera parallax
      mouse.x += (target.x - mouse.x) * 0.05;
      mouse.y += (target.y - mouse.y) * 0.05;
      camera.position.x = mouse.x * 1.2;
      camera.position.y = -mouse.y * 1.2;
      camera.lookAt(0, 0, 0);

      // Whole-cloud rotation
      root.rotation.y = elapsed * 0.04;
      root.rotation.x = Math.sin(elapsed * 0.07) * 0.08;

      renderer.render(scene, camera);
      if (running) rafId = requestAnimationFrame(render);
    };

    const renderOnce = () => {
      updateLinks(0);
      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      renderOnce();
    } else {
      rafId = requestAnimationFrame(render);
    }

    // Pause when tab not visible
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
      nodeGeo.dispose();
      linkGeo.dispose();
      anchorGeo.dispose();
      nodeMat.dispose();
      linkMat.dispose();
      anchorMat.dispose();
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
