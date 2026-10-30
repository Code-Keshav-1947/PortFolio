"use client";

import { useRef, useCallback } from "react";
import * as THREE from "three";
import { useThreeScene, ThreeSceneContext, ThreeAnimateContext } from "@/hooks/useThreeScene";

/**
 * Contact Section 3D Beacon — "The Transmission Node"
 *
 * A restrained, slowly pulsating cryptographic beacon node.
 * Visually confirms active transmission readiness.
 */
export function ContactVisual3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const groupRef = useRef<THREE.Group | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);

  const handleSetup = useCallback(({ scene, isDark }: ThreeSceneContext) => {
    const primaryColor = isDark ? 0xf59e0b : 0xd97706;
    const accentColor = isDark ? 0x14b8a6 : 0x0d9488;

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // 1. Central Cryptographic Octahedron
    const octaGeo = new THREE.OctahedronGeometry(0.75, 0);
    const octaMat = new THREE.MeshPhysicalMaterial({
      color: primaryColor,
      metalness: 0.8,
      roughness: 0.25,
      flatShading: true,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    group.add(octaMesh);

    // 2. Glowing Wireframe Accent
    const wireGeo = new THREE.OctahedronGeometry(0.76, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    group.add(wireMesh);

    // 3. Concentric Signal Pulse Ring
    const ringGeo = new THREE.TorusGeometry(1.2, 0.015, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    ringRef.current = ring;
    group.add(ring);

    // 4. Lighting
    const light1 = new THREE.DirectionalLight(primaryColor, 2.5);
    light1.position.set(2, 2, 2);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(accentColor, 1.8);
    light2.position.set(-2, -2, -2);
    scene.add(light2);

    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    // Cleanup GPU resources on unmount
    return () => {
      octaGeo.dispose();
      octaMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  const handleAnimate = useCallback(
    ({ elapsedTime, prefersReducedMotion }: ThreeAnimateContext) => {
      const group = groupRef.current;
      const ring = ringRef.current;
      if (!group) return;

      if (!prefersReducedMotion) {
        group.rotation.y = elapsedTime * 0.7;
        group.rotation.x = Math.sin(elapsedTime * 0.5) * 0.2;
        if (ring) ring.rotation.z = -elapsedTime * 0.5;
      }
    },
    []
  );

  const { hasWebGL } = useThreeScene({
    containerRef,
    canvasRef,
    cameraFov: 45,
    cameraPosition: [0, 0, 4.2],
    maxPixelRatio: 1.5,
    powerPreference: "low-power",
    onSetup: handleSetup,
    onAnimate: handleAnimate,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-16 h-16 sm:w-20 sm:h-20 select-none pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl pointer-events-none" />
      {hasWebGL !== false ? (
        <canvas ref={canvasRef} className="w-full h-full block" />
      ) : (
        <div className="w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary" />
        </div>
      )}
    </div>
  );
}
