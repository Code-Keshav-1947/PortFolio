"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { useThreeScene, ThreeSceneContext, ThreeAnimateContext } from "@/hooks/useThreeScene";
import type { VisualizerMode } from "@/types";

export type { VisualizerMode };

interface TechnicalInterestVisualizerProps {
  activeMode?: VisualizerMode;
  onModeChange?: (mode: VisualizerMode) => void;
}

/**
 * 3D Analytical Workbench — Interactive domain visualizer.
 *
 * Visually articulates Keshav's technical foundations:
 * - Lattice Crypto: High-dimensional discrete lattice basis and shortest-vector key paths.
 * - Dynamical Orbit: Non-linear differential phase trajectory (Lorenz / Lagrangian system).
 * - Eigen Vector: Orthonormal vector basis, projection plane, and transformed eigenvectors.
 */
export function TechnicalInterestVisualizer({
  activeMode: controlledMode,
  onModeChange,
}: TechnicalInterestVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [internalMode, setInternalMode] = useState<VisualizerMode>("crypto");

  const mode = controlledMode || internalMode;
  const setMode = (newMode: VisualizerMode) => {
    setInternalMode(newMode);
    onModeChange?.(newMode);
  };

  const modeGroupRef = useRef<THREE.Group | null>(null);
  const interactionRef = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    rotX: 0.2,
    rotY: 0.4,
  });

  const handleSetup = useCallback(({ scene, isDark }: ThreeSceneContext) => {
    // Shared ambient and point lighting
    const primaryColor = isDark ? 0xf59e0b : 0xd97706;
    const ambient = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.2);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(primaryColor, 2.5, 20);
    pointLight.position.set(3, 4, 4);
    scene.add(pointLight);

    const modeGroup = new THREE.Group();
    modeGroupRef.current = modeGroup;
    scene.add(modeGroup);

    return () => {
      // Clean up child objects in modeGroup
      while (modeGroup.children.length > 0) {
        const obj = modeGroup.children[0] as THREE.Mesh;
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else if (obj.material) {
          obj.material.dispose();
        }
        modeGroup.remove(obj);
      }
    };
  }, []);

  const handleAnimate = useCallback(
    ({ elapsedTime, prefersReducedMotion }: ThreeAnimateContext) => {
      const modeGroup = modeGroupRef.current;
      const state = interactionRef.current;
      if (!modeGroup) return;

      if (prefersReducedMotion) {
        modeGroup.rotation.y = 0.4;
        modeGroup.rotation.x = 0.2;
        return;
      }

      if (!state.isDragging) {
        state.rotY += 0.004;
        state.rotX = 0.2 + Math.sin(elapsedTime * 0.5) * 0.05;
      }

      modeGroup.rotation.y = state.rotY;
      modeGroup.rotation.x = state.rotX;
    },
    []
  );

  const { hasWebGL } = useThreeScene({
    containerRef,
    canvasRef,
    cameraFov: 45,
    cameraPosition: [0, 0, 6.5],
    maxPixelRatio: 1.5,
    onSetup: handleSetup,
    onAnimate: handleAnimate,
  });

  // Re-build domain geometry whenever active mode changes
  useEffect(() => {
    const modeGroup = modeGroupRef.current;
    if (!modeGroup) return;

    // Dispose old geometry
    while (modeGroup.children.length > 0) {
      const obj = modeGroup.children[0] as THREE.Mesh;
      obj.geometry?.dispose();
      if (Array.isArray(obj.material)) {
        obj.material.forEach((m) => m.dispose());
      } else if (obj.material) {
        obj.material.dispose();
      }
      modeGroup.remove(obj);
    }

    const isDark = document.documentElement.classList.contains("dark");
    const primaryColor = isDark ? 0xf59e0b : 0xd97706;
    const accentColor = isDark ? 0x14b8a6 : 0x0d9488;
    const purpleColor = isDark ? 0xa855f7 : 0x7e22ce;

    if (mode === "crypto") {
      // --- Mode 1: Cryptographic Lattice (Points & Basis Vectors) ---
      const gridSize = 3;
      const spacing = 0.85;
      const points: number[] = [];

      for (let x = -gridSize; x <= gridSize; x++) {
        for (let y = -gridSize; y <= gridSize; y++) {
          for (let z = -gridSize; z <= gridSize; z++) {
            points.push(x * spacing, y * spacing, z * spacing);
          }
        }
      }

      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(points, 3)
      );
      const pMat = new THREE.PointsMaterial({
        color: accentColor,
        size: 0.075,
        transparent: true,
        opacity: isDark ? 0.85 : 0.65,
      });
      const pointsMesh = new THREE.Points(pGeo, pMat);
      modeGroup.add(pointsMesh);

      // Shortest-vector path
      const pathPoints = [
        new THREE.Vector3(-spacing * 2, -spacing, -spacing),
        new THREE.Vector3(-spacing, 0, spacing),
        new THREE.Vector3(0, spacing, 0),
        new THREE.Vector3(spacing, spacing, -spacing),
        new THREE.Vector3(spacing * 2, 0, spacing),
      ];
      const curve = new THREE.CatmullRomCurve3(pathPoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.025, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: primaryColor,
        wireframe: true,
      });
      const pathMesh = new THREE.Mesh(tubeGeo, tubeMat);
      modeGroup.add(pathMesh);

      // Center Anchor
      const centerGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const centerMat = new THREE.MeshBasicMaterial({ color: primaryColor });
      const centerNode = new THREE.Mesh(centerGeo, centerMat);
      modeGroup.add(centerNode);

    } else if (mode === "physics") {
      // --- Mode 2: Dynamical System Trajectory (Lorenz Attractor) ---
      const numPoints = 800;
      const trajectoryPoints: THREE.Vector3[] = [];
      let x = 0.1, y = 0, z = 0;
      const dt = 0.009;
      const sigma = 10, rho = 28, beta = 8 / 3;

      for (let i = 0; i < numPoints; i++) {
        const dx = sigma * (y - x) * dt;
        const dy = (x * (rho - z) - y) * dt;
        const dz = (x * y - beta * z) * dt;
        x += dx;
        y += dy;
        z += dz;
        trajectoryPoints.push(
          new THREE.Vector3(x * 0.08, y * 0.08, (z - 25) * 0.08)
        );
      }

      const curve = new THREE.CatmullRomCurve3(trajectoryPoints);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(600)
      );
      const lineMat = new THREE.LineBasicMaterial({
        color: primaryColor,
        transparent: true,
        opacity: isDark ? 0.9 : 0.7,
      });
      const orbitLine = new THREE.Line(lineGeo, lineMat);
      modeGroup.add(orbitLine);

      // Orbit test particle
      const pGeo = new THREE.SphereGeometry(0.12, 12, 12);
      const pMat = new THREE.MeshBasicMaterial({ color: accentColor });
      const particle = new THREE.Mesh(pGeo, pMat);
      particle.position.copy(trajectoryPoints[trajectoryPoints.length - 1]);
      modeGroup.add(particle);

    } else {
      // --- Mode 3: Mathematical Vector Space & Eigenplane ---
      const gridHelper = new THREE.GridHelper(3.5, 7, primaryColor, 0x555555);
      gridHelper.rotation.x = Math.PI / 2;
      (gridHelper.material as THREE.Material).transparent = true;
      (gridHelper.material as THREE.Material).opacity = isDark ? 0.35 : 0.2;
      modeGroup.add(gridHelper);

      // Basis Vectors (i, j, k)
      const axes = [
        { dir: new THREE.Vector3(1, 0, 0), color: primaryColor, len: 1.8 },
        { dir: new THREE.Vector3(0, 1, 0), color: accentColor, len: 1.8 },
        { dir: new THREE.Vector3(0, 0, 1), color: purpleColor, len: 1.8 },
      ];

      axes.forEach((axis) => {
        const arrow = new THREE.ArrowHelper(
          axis.dir,
          new THREE.Vector3(0, 0, 0),
          axis.len,
          axis.color,
          0.28,
          0.16
        );
        modeGroup.add(arrow);
      });

      // Eigenvector transformation
      const eigenDir = new THREE.Vector3(1, 1, 0.8).normalize();
      const eigenArrow = new THREE.ArrowHelper(
        eigenDir,
        new THREE.Vector3(0, 0, 0),
        2.2,
        0xffffff,
        0.3,
        0.18
      );
      modeGroup.add(eigenArrow);
    }
  }, [mode]);

  // Pointer drag interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = interactionRef.current;
    state.isDragging = true;
    state.prevX = e.clientX;
    state.prevY = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = interactionRef.current;
    if (!state.isDragging) return;
    const dx = e.clientX - state.prevX;
    const dy = e.clientY - state.prevY;
    state.prevX = e.clientX;
    state.prevY = e.clientY;
    state.rotY += dx * 0.008;
    state.rotX += dy * 0.008;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    interactionRef.current.isDragging = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full rounded-lg border border-border bg-card/40 p-4 sm:p-5 flex flex-col justify-between backdrop-blur-sm">
      {/* Workbench Header & Mode Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
            3D Analytical Workbench
          </span>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-0.5 rounded-md bg-muted/60 border border-border/80 text-[11px] font-mono">
          {(
            [
              { id: "crypto", label: "Lattice Crypto" },
              { id: "physics", label: "Dynamical Orbit" },
              { id: "math", label: "Eigen Vector" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMode(item.id)}
              className={`px-2.5 py-1 rounded transition-all duration-200 ${
                mode === item.id
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-cursor-label="ROTATE"
        className="relative w-full h-[220px] sm:h-[260px] rounded-md bg-background/50 border border-border/40 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
      >
        {hasWebGL !== false ? (
          <canvas ref={canvasRef} className="w-full h-full block" />
        ) : (
          <div className="text-center p-4">
            <span className="font-mono text-xs text-muted-foreground">
              Mathematical Coordinate Model [{mode.toUpperCase()}]
            </span>
          </div>
        )}

        <div className="absolute bottom-2 left-2 pointer-events-none font-mono text-[9px] text-muted-foreground/70 uppercase tracking-widest bg-card/60 px-2 py-0.5 rounded border border-border/40">
          Interactive WebGL // Drag to rotate
        </div>
      </div>
    </div>
  );
}
