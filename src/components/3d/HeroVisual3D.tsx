"use client";

import { useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useThreeScene, ThreeSceneContext, ThreeAnimateContext } from "@/hooks/useThreeScene";

/**
 * 3D Hero Centerpiece — "The Cryptographic Geodesic Monolith"
 *
 * Represents Keshav's technical identity:
 * - Faceted Amber Icosahedron (First-Principles Foundation)
 * - Outer Geodesic Lattice Cage with Glowing Nodes (Lattice Cryptography)
 * - Counter-Rotating Orbital Rings (Dynamical Physics / Euler Orbits)
 * - Discrete Vector Coordinate Points (Data Structures & Linear Algebra)
 */
export function HeroVisual3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // Group references for per-frame animation
  const mainGroupRef = useRef<THREE.Group | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const coreWireRef = useRef<THREE.Mesh | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);

  // Rotation and interaction tracking
  const interactionRef = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    mouseX: 0,
    mouseY: 0,
    currentRotX: 0.25,
    currentRotY: 0.35,
    targetRotX: 0.25,
    targetRotY: 0.35,
  });

  // Scene Assembly Callback
  const handleSetup = useCallback(({ scene, isDark }: ThreeSceneContext) => {
    const mainGroup = new THREE.Group();
    mainGroupRef.current = mainGroup;
    scene.add(mainGroup);

    // Color tokens matching the Tailwind design system
    const primaryColor = isDark ? 0xf59e0b : 0xd97706; // Amber
    const accentColor = isDark ? 0x14b8a6 : 0x0d9488;  // Teal
    const edgeColor = isDark ? 0x38bdf8 : 0x0284c7;    // Sky blue

    // 1. Faceted Central Core (Icosahedron)
    const coreGeometry = new THREE.IcosahedronGeometry(1.4, 0);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: primaryColor,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMeshRef.current = coreMesh;
    mainGroup.add(coreMesh);

    // Inner wireframe edge highlight
    const coreWireGeometry = new THREE.IcosahedronGeometry(1.41, 0);
    const coreWireMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.25 : 0.15,
    });
    const coreWire = new THREE.Mesh(coreWireGeometry, coreWireMaterial);
    coreWireRef.current = coreWire;
    mainGroup.add(coreWire);

    // 2. Outer Geodesic Lattice Cage
    const cageGeometry = new THREE.IcosahedronGeometry(2.15, 1);
    const cageWireMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.35 : 0.22,
    });
    const cageMesh = new THREE.Mesh(cageGeometry, cageWireMaterial);
    mainGroup.add(cageMesh);

    // 3. Cryptographic Lattice Node Spheres
    const posAttribute = cageGeometry.attributes.position;
    const nodeSpheresGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x5eead4 : 0x0f766e,
    });

    const uniqueVertices = new Set<string>();
    for (let i = 0; i < posAttribute.count; i++) {
      const vx = Math.round(posAttribute.getX(i) * 100) / 100;
      const vy = Math.round(posAttribute.getY(i) * 100) / 100;
      const vz = Math.round(posAttribute.getZ(i) * 100) / 100;
      const key = `${vx},${vy},${vz}`;
      if (!uniqueVertices.has(key)) {
        uniqueVertices.add(key);
        const node = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(vx, vy, vz);
        nodeSpheresGroup.add(node);
      }
    }
    mainGroup.add(nodeSpheresGroup);

    // 4. Mathematical Orbital Rings (Concentric Gyroscope)
    const ring1Geo = new THREE.TorusGeometry(2.65, 0.018, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.7 : 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    ring1Ref.current = ring1;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.95, 0.014, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: edgeColor,
      transparent: true,
      opacity: isDark ? 0.5 : 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    ring2Ref.current = ring2;
    mainGroup.add(ring2);

    // 5. Discrete Vector Coordinate Cloud
    const particleCount = 45;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.0 + Math.random() * 1.4;

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: primaryColor,
      size: 0.065,
      transparent: true,
      opacity: isDark ? 0.75 : 0.5,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // 6. Balanced Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.7 : 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(primaryColor, isDark ? 3.0 : 2.5);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(accentColor, isDark ? 2.5 : 2.0);
    rimLight.position.set(-4, -3, -3);
    scene.add(rimLight);

    // Cleanup resources when scene is destroyed
    return () => {
      coreGeometry.dispose();
      coreMaterial.dispose();
      coreWireGeometry.dispose();
      coreWireMaterial.dispose();
      cageGeometry.dispose();
      cageWireMaterial.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  // Animation Loop Callback
  const handleAnimate = useCallback(
    ({ elapsedTime, prefersReducedMotion }: ThreeAnimateContext) => {
      const mainGroup = mainGroupRef.current;
      const ring1 = ring1Ref.current;
      const ring2 = ring2Ref.current;
      const coreMesh = coreMeshRef.current;
      const coreWire = coreWireRef.current;
      const state = interactionRef.current;

      if (!mainGroup) return;

      if (prefersReducedMotion) {
        mainGroup.rotation.x = 0.25;
        mainGroup.rotation.y = 0.35;
        return;
      }

      // Smooth inertial interpolation towards target rotation
      const lerpSpeed = state.isDragging ? 0.18 : 0.06;
      state.currentRotX += (state.targetRotX - state.currentRotX) * lerpSpeed;
      state.currentRotY += (state.targetRotY - state.currentRotY) * lerpSpeed;

      const parallaxX = state.mouseX * 0.22;
      const parallaxY = -state.mouseY * 0.22;

      mainGroup.rotation.x = state.currentRotX + parallaxY;
      mainGroup.rotation.y = state.currentRotY + parallaxX;

      // Autonomous gentle spin when user is idle
      if (!state.isDragging) {
        state.targetRotY += 0.0028;
        state.targetRotX = 0.25 + Math.sin(elapsedTime * 0.4) * 0.08;
      }

      // Counter-rotating orbital rings
      if (ring1) ring1.rotation.z = elapsedTime * 0.35;
      if (ring2) ring2.rotation.y = -elapsedTime * 0.28;

      // Subtle core breath
      if (coreMesh && coreWire) {
        const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.025;
        coreMesh.scale.set(scale, scale, scale);
        coreWire.scale.set(scale, scale, scale);
      }
    },
    []
  );

  // Hook handles WebGL initialization, resize, visibility pausing & teardown
  const { hasWebGL } = useThreeScene({
    containerRef,
    canvasRef,
    cameraFov: 45,
    cameraPosition: [0, 0, 7.2],
    maxPixelRatio: 1.75,
    onSetup: handleSetup,
    onAnimate: handleAnimate,
  });

  // Pointer & Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = interactionRef.current;
    state.isDragging = true;
    state.prevX = e.clientX;
    state.prevY = e.clientY;
    setIsInteracting(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = interactionRef.current;
    if (state.isDragging) {
      const deltaX = e.clientX - state.prevX;
      const deltaY = e.clientY - state.prevY;
      state.prevX = e.clientX;
      state.prevY = e.clientY;

      state.targetRotY += deltaX * 0.007;
      state.targetRotX += deltaY * 0.007;
    } else {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      state.mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      state.mouseY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = interactionRef.current;
    state.isDragging = false;
    setIsInteracting(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      data-cursor-label={isInteracting ? "ROTATING" : "DRAG 3D"}
      className="relative w-full aspect-square max-w-[420px] lg:max-w-[480px] mx-auto select-none touch-none flex items-center justify-center cursor-grab active:cursor-grabbing group"
      aria-label="Interactive 3D mathematical sculpture representing cryptographic geometry and physical dynamical systems"
      role="img"
    >
      {/* Ambient Glow Halo */}
      <div
        className="absolute inset-8 rounded-full bg-primary/10 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-16 rounded-full bg-accent/10 blur-2xl pointer-events-none transition-opacity duration-500 opacity-40"
        aria-hidden="true"
      />

      {/* WebGL Canvas */}
      {hasWebGL !== false ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full relative z-10 block pointer-events-auto"
        />
      ) : (
        /* Accessible Non-WebGL Fallback Vector Illustration */
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
          <svg
            viewBox="0 0 200 200"
            className="w-3/4 h-3/4 stroke-primary/80 fill-none stroke-[1.2]"
            aria-hidden="true"
          >
            <circle cx="100" cy="100" r="70" className="stroke-border stroke-dashed" />
            <circle cx="100" cy="100" r="55" className="stroke-accent/40" />
            <ellipse cx="100" cy="100" rx="72" ry="28" transform="rotate(-30 100 100)" className="stroke-primary/50" />
            <ellipse cx="100" cy="100" rx="72" ry="28" transform="rotate(45 100 100)" className="stroke-sky-400/40" />
            <polygon points="100,45 145,72 145,128 100,155 55,128 55,72" className="stroke-primary fill-primary/5" />
            <polygon points="100,60 135,100 100,140 65,100" className="stroke-accent fill-accent/10" />
            <line x1="100" y1="45" x2="100" y2="155" className="stroke-primary/40" />
            <line x1="55" y1="72" x2="145" y2="128" className="stroke-primary/40" />
            <line x1="55" y1="128" x2="145" y2="72" className="stroke-primary/40" />
            <circle cx="100" cy="45" r="3" className="fill-primary stroke-none" />
            <circle cx="145" cy="72" r="3" className="fill-accent stroke-none" />
            <circle cx="145" cy="128" r="3" className="fill-primary stroke-none" />
            <circle cx="100" cy="155" r="3" className="fill-accent stroke-none" />
            <circle cx="55" cy="128" r="3" className="fill-primary stroke-none" />
            <circle cx="55" cy="72" r="3" className="fill-accent stroke-none" />
          </svg>
          <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mt-2">
            Mathematical Geodesic Structure
          </span>
        </div>
      )}

      {/* Floating HUD Badge */}
      <div className="absolute bottom-2 right-2 z-20 pointer-events-none flex items-center gap-2 px-2.5 py-1 rounded-md border border-border/80 bg-card/70 backdrop-blur-md text-[10px] font-mono text-muted-foreground shadow-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
        </span>
        <span className="tracking-wider">LATTICE // 3D</span>
      </div>
    </div>
  );
}
