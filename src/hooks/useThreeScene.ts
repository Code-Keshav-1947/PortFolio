"use client";

import { useEffect, useSyncExternalStore, RefObject } from "react";
import * as THREE from "three";
import { isWebGLAvailable, getSafePixelRatio } from "@/lib/webgl";

const emptySubscribe = () => () => {};
const getWebGLSnapshot = () => isWebGLAvailable();
const getServerSnapshot = () => true;

export interface ThreeSceneContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  isDark: boolean;
}

export interface ThreeAnimateContext extends ThreeSceneContext {
  clock: THREE.Clock;
  elapsedTime: number;
  deltaTime: number;
  prefersReducedMotion: boolean;
}

export interface UseThreeSceneOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  cameraFov?: number;
  cameraPosition?: [number, number, number];
  maxPixelRatio?: number;
  powerPreference?: WebGLPowerPreference;
  onSetup: (ctx: ThreeSceneContext) => (() => void) | void;
  onAnimate?: (ctx: ThreeAnimateContext) => void;
  onResize?: (width: number, height: number, camera: THREE.PerspectiveCamera) => void;
}

/**
 * Reusable hook that handles Three.js canvas lifecycle, responsive sizing,
 * visibility/intersection pausing, and WebGL cleanup.
 */
export function useThreeScene({
  containerRef,
  canvasRef,
  cameraFov = 45,
  cameraPosition = [0, 0, 7],
  maxPixelRatio = 1.75,
  powerPreference = "high-performance",
  onSetup,
  onAnimate,
  onResize,
}: UseThreeSceneOptions) {
  const hasWebGL = useSyncExternalStore(
    emptySubscribe,
    getWebGLSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    // 1. Guard against environments without WebGL support
    if (!hasWebGL) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 2. Check accessibility settings
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // 3. Initialize core Three.js primitives
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      cameraFov,
      width / height,
      0.1,
      100
    );
    camera.position.set(...cameraPosition);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(getSafePixelRatio(maxPixelRatio));
      renderer.setClearColor(0x000000, 0);
    } catch {
      return;
    }

    const isDark = document.documentElement.classList.contains("dark");
    const sceneContext: ThreeSceneContext = {
      scene,
      camera,
      renderer,
      isDark,
    };

    // 4. Run component-specific scene setup
    const userCleanup = onSetup(sceneContext);

    // 5. Visibility and intersection handling
    let isVisible = true;
    let rafId = 0;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisible = entries[0].isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 6. Animation render loop
    const clock = new THREE.Clock();

    const animateLoop = () => {
      rafId = requestAnimationFrame(animateLoop);

      if (!isVisible || !renderer) return;

      const elapsedTime = clock.getElapsedTime();
      const deltaTime = clock.getDelta();

      if (onAnimate) {
        onAnimate({
          ...sceneContext,
          clock,
          elapsedTime,
          deltaTime,
          prefersReducedMotion,
        });
      }

      renderer.render(scene, camera);
    };

    animateLoop();

    // 7. Responsive resize handling
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(getSafePixelRatio(maxPixelRatio));

      onResize?.(newWidth, newHeight, camera);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. WebGL context loss recovery
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(rafId);
    };

    const handleContextRestored = () => {
      handleResize();
      animateLoop();
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, false);
    canvas.addEventListener("webglcontextrestored", handleContextRestored, false);

    // 9. Teardown and GPU resource disposal
    return () => {
      cancelAnimationFrame(rafId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);

      if (typeof userCleanup === "function") {
        userCleanup();
      }

      renderer?.dispose();
    };
  }, [
    hasWebGL,
    cameraFov,
    cameraPosition,
    maxPixelRatio,
    powerPreference,
    onSetup,
    onAnimate,
    onResize,
    canvasRef,
    containerRef,
  ]);

  return { hasWebGL };
}
