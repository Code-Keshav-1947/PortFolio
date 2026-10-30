"use client";

import { useRef, useCallback } from "react";
import * as THREE from "three";
import { useThreeScene, ThreeSceneContext, ThreeAnimateContext } from "@/hooks/useThreeScene";

/**
 * About Section 3D Motif — "The Platonic Compass"
 *
 * A subtle, rotating Platonic dodecahedron with an inner coordinate nucleus.
 * Symbolizes Keshav's first-principles analytical foundation.
 */
export function AboutVisualMotif() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const groupRef = useRef<THREE.Group | null>(null);
  const innerRef = useRef<THREE.Mesh | null>(null);
  const pointerRef = useRef({ mouseX: 0, mouseY: 0 });

  const handleSetup = useCallback(({ scene, isDark }: ThreeSceneContext) => {
    const primaryColor = isDark ? 0xf59e0b : 0xd97706;
    const accentColor = isDark ? 0x14b8a6 : 0x0d9488;

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    // 1. Dodecahedral wireframe cage (Platonic solid)
    const geo = new THREE.DodecahedronGeometry(1.2, 0);
    const wireMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const dodeca = new THREE.Mesh(geo, wireMat);
    group.add(dodeca);

    // 2. Inner coordinate nucleus
    const innerGeo = new THREE.OctahedronGeometry(0.55, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: accentColor,
      metalness: 0.9,
      roughness: 0.2,
      flatShading: true,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    innerRef.current = inner;
    group.add(inner);

    // 3. Lighting
    const light = new THREE.DirectionalLight(primaryColor, 2.5);
    light.position.set(2, 3, 2);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    // Cleanup resources on unmount
    return () => {
      geo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
    };
  }, []);

  const handleAnimate = useCallback(
    ({ elapsedTime, prefersReducedMotion }: ThreeAnimateContext) => {
      const group = groupRef.current;
      const inner = innerRef.current;
      const { mouseX, mouseY } = pointerRef.current;

      if (!group) return;

      if (prefersReducedMotion) {
        group.rotation.x = 0.2;
        group.rotation.y = 0.3;
        return;
      }

      group.rotation.x = mouseY * 0.4 + Math.sin(elapsedTime * 0.4) * 0.2;
      group.rotation.y = mouseX * 0.4 + elapsedTime * 0.35;
      if (inner) inner.rotation.z = -elapsedTime * 0.5;
    },
    []
  );

  const { hasWebGL } = useThreeScene({
    containerRef,
    canvasRef,
    cameraFov: 40,
    cameraPosition: [0, 0, 5.2],
    maxPixelRatio: 1.5,
    powerPreference: "low-power",
    onSetup: handleSetup,
    onAnimate: handleAnimate,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    pointerRef.current.mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointerRef.current.mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto select-none pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute inset-4 rounded-full bg-primary/10 blur-xl pointer-events-none" />
      {hasWebGL !== false ? (
        <canvas ref={canvasRef} className="w-full h-full block" />
      ) : (
        <div className="w-16 h-16 rounded-full border border-dashed border-primary/40 flex items-center justify-center">
          <div className="w-6 h-6 border border-accent rounded-sm rotate-45" />
        </div>
      )}
    </div>
  );
}
