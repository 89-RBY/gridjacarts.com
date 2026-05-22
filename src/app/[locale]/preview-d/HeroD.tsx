'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

function displace(x: number, y: number, z: number, t: number): number {
  return (
    Math.sin(x * 1.5 + t * 0.8) * 0.4 +
    Math.sin(y * 1.7 + t * 0.6 + 1.0) * 0.4 +
    Math.sin(z * 1.3 + t * 0.4 + 2.0) * 0.4 +
    Math.sin(x * 3.0 + y * 2.0 + t * 1.0) * 0.18 +
    Math.sin(z * 4.0 - t * 0.9 + 4.0) * 0.12
  );
}

function buildEnv(): THREE.Scene {
  const s = new THREE.Scene();
  s.background = new THREE.Color(0x05070d);

  const geo = new THREE.SphereGeometry(2.2, 16, 16);
  const lights: [number, [number, number, number], number][] = [
    [0x06b6d4, [-6, 3, -2], 3.5],
    [0xec4899, [6, -3, -2], 3.5],
    [0xfbbf24, [0, 5, 1], 2.0],
    [0x8b5cf6, [-4, -4, 3], 2.0],
  ];
  lights.forEach(([color, pos, intensity]) => {
    const m = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).multiplyScalar(intensity),
      })
    );
    m.position.set(...pos);
    s.add(m);
  });

  return s;
}

export default function HeroD() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

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

    // Environment for PBR reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(buildEnv(), 0.04);
    scene.environment = envRT.texture;
    pmrem.dispose();

    // High-detail icosahedron — the protagonist
    const detail = isMobile ? 3 : 5;
    const radius = isMobile ? 1.25 : 1.5;
    const geometry = new THREE.IcosahedronGeometry(radius, detail);
    geometry.computeVertexNormals();
    const origPositions = new Float32Array(geometry.attributes.position.array);
    const origNormals = new Float32Array(geometry.attributes.normal.array);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.65,
      roughness: 0.18,
      iridescence: 1.0,
      iridescenceIOR: 1.35,
      iridescenceThicknessRange: [120, 760],
      envMapIntensity: 1.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      sheen: 0.3,
      sheenColor: new THREE.Color(0x67e8f9),
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Orbiting colored lights (visible bright bodies + the actual PointLights)
    type Orbit = {
      light: THREE.PointLight;
      glow: THREE.Mesh;
      radius: number;
      speed: number;
      phase: number;
      tilt: number;
    };
    const orbits: Orbit[] = [
      { light: new THREE.PointLight(0x06b6d4, 14, 18, 1.5), glow: null!, radius: 3.4, speed: 0.55, phase: 0, tilt: 0.2 },
      { light: new THREE.PointLight(0xec4899, 14, 18, 1.5), glow: null!, radius: 3.0, speed: 0.45, phase: 2.1, tilt: -0.3 },
      { light: new THREE.PointLight(0xfbbf24, 11, 18, 1.5), glow: null!, radius: 3.6, speed: 0.7, phase: 4.0, tilt: 0.6 },
    ];

    const glowGeo = new THREE.SphereGeometry(0.06, 12, 12);
    orbits.forEach((o) => {
      o.glow = new THREE.Mesh(
        glowGeo,
        new THREE.MeshBasicMaterial({ color: o.light.color, transparent: true, opacity: 0.95 })
      );
      scene.add(o.light);
      scene.add(o.glow);
    });

    scene.add(new THREE.AmbientLight(0xffffff, 0.18));

    // Bloom post-processing
    const composer = new EffectComposer(renderer);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(width, height);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      isMobile ? 0.7 : 1.1, // strength
      isMobile ? 0.4 : 0.6, // radius
      0.0 // threshold
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
      mouseTarget.x = ((e.clientX - rect.left) / rect.width - 0.5) * 1.2;
      mouseTarget.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
    };
    if (!isMobile) {
      window.addEventListener('pointermove', onPointer, { passive: true });
    }

    const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
    const positionArr = positionAttr.array as Float32Array;
    const clock = new THREE.Clock();
    let rafId = 0;
    let running = true;

    const render = () => {
      const t = clock.getElapsedTime();

      // Vertex displacement
      const vertCount = positionAttr.count;
      const amp = 0.22;
      for (let i = 0; i < vertCount; i++) {
        const idx = i * 3;
        const ox = origPositions[idx];
        const oy = origPositions[idx + 1];
        const oz = origPositions[idx + 2];
        const nx = origNormals[idx];
        const ny = origNormals[idx + 1];
        const nz = origNormals[idx + 2];
        const d = displace(ox, oy, oz, t) * amp;
        positionArr[idx] = ox + nx * d;
        positionArr[idx + 1] = oy + ny * d;
        positionArr[idx + 2] = oz + nz * d;
      }
      positionAttr.needsUpdate = true;
      // Recompute normals for correct lighting on the deformed surface
      geometry.computeVertexNormals();

      // Orbit lights
      orbits.forEach((o) => {
        const a = t * o.speed + o.phase;
        const x = Math.cos(a) * o.radius;
        const z = Math.sin(a) * o.radius;
        const y = Math.sin(a * 0.8) * o.radius * o.tilt;
        o.light.position.set(x, y, z);
        o.glow.position.set(x, y, z);
      });

      // Smooth mouse parallax — rotate mesh & shift camera slightly
      mouseCurrent.x += (mouseTarget.x - mouseCurrent.x) * 0.05;
      mouseCurrent.y += (mouseTarget.y - mouseCurrent.y) * 0.05;
      mesh.rotation.y = t * 0.08 + mouseCurrent.x * 0.6;
      mesh.rotation.x = mouseCurrent.y * 0.4 + Math.sin(t * 0.3) * 0.1;
      camera.position.x = mouseCurrent.x * 0.5;
      camera.position.y = -mouseCurrent.y * 0.3;
      camera.lookAt(0, 0, 0);

      composer.render();

      if (running) rafId = requestAnimationFrame(render);
    };

    const renderStatic = () => {
      // Frame-1 displacement
      const vertCount = positionAttr.count;
      for (let i = 0; i < vertCount; i++) {
        const idx = i * 3;
        const ox = origPositions[idx];
        const oy = origPositions[idx + 1];
        const oz = origPositions[idx + 2];
        const nx = origNormals[idx];
        const ny = origNormals[idx + 1];
        const nz = origNormals[idx + 2];
        const d = displace(ox, oy, oz, 0) * 0.22;
        positionArr[idx] = ox + nx * d;
        positionArr[idx + 1] = oy + ny * d;
        positionArr[idx + 2] = oz + nz * d;
      }
      positionAttr.needsUpdate = true;
      geometry.computeVertexNormals();
      orbits.forEach((o) => {
        o.light.position.set(o.radius, 0, 0);
        o.glow.position.copy(o.light.position);
      });
      composer.render();
    };

    if (reduceMotion) {
      renderStatic();
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
      geometry.dispose();
      glowGeo.dispose();
      material.dispose();
      orbits.forEach((o) => {
        (o.glow.material as THREE.Material).dispose();
      });
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
