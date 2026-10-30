"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { CursorMode } from "@/types";

const subscribePointerQuery = (callback: () => void) => {
  const mqPointer = window.matchMedia("(pointer: fine)");
  const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  mqPointer.addEventListener("change", callback);
  mqMotion.addEventListener("change", callback);
  return () => {
    mqPointer.removeEventListener("change", callback);
    mqMotion.removeEventListener("change", callback);
  };
};

const getPointerSnapshot = () => {
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  return hasFinePointer && !prefersReducedMotion;
};

const getServerPointerSnapshot = () => false;

/**
 * Custom Cursor Configuration Constants.
 * Centralized here so timing, sizes, and physics can be adjusted in one place.
 */
const CURSOR_CONFIG = {
  /** Linear interpolation factor for delayed ring follower (0.1 = heavy inertia, 0.3 = tight follow) */
  lerpFactor: 0.16,
  /** Magnetic element translation attenuation */
  magneticPull: 0.28,
  /** Maximum pixel offset for magnetic element attraction */
  magneticMaxDistance: 7,
  /** Ring dimensions across interaction modes */
  dimensions: {
    action: 72,
    hover: 50,
    default: 34,
    clicking: 26,
  },
} as const;

/**
 * CustomCursor Component
 *
 * Implements a dual-layer hardware cursor replacement:
 * 1. Primary Dot: Updates synchronously with clientX/clientY for zero-perceived latency.
 * 2. Trailing Ring: Follows with fluid exponential smoothing (LERP).
 *
 * Features:
 * - Automatically pauses RAF when mouse is idle to save battery and GPU cycles.
 * - Respects prefers-reduced-motion and coarse touch pointers (disabled on tablets/phones).
 * - Restores native I-beam cursor on text inputs and textareas automatically.
 * - Supports [data-cursor-label="XYZ"] badges and [data-magnetic] pull effects.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const isEnabled = useSyncExternalStore(
    subscribePointerQuery,
    getPointerSnapshot,
    getServerPointerSnapshot
  );

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    document.documentElement.classList.add("custom-cursor-enabled");

    // Coordinate storage (kept outside React state to avoid 60-120fps component rerenders)
    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let isVisible = false;
    let isClicking = false;
    let isRafRunning = false;
    let rafId = 0;

    let currentMode: CursorMode = "default";
    let currentLabel = "";
    let currentMagneticEl: HTMLElement | null = null;

    /**
     * Applies styling to the cursor ring and inner dot based on interaction state.
     */
    const updateVisualStyles = (mode: CursorMode, label: string) => {
      const ringInner = ringInnerRef.current;
      const dotInner = dotInnerRef.current;
      const labelEl = labelRef.current;
      const ringContainer = ringRef.current;
      const dotContainer = dotRef.current;

      if (!ringInner || !dotInner || !labelEl || !ringContainer || !dotContainer) {
        return;
      }

      if (mode === "text-hide") {
        ringContainer.style.opacity = "0";
        dotContainer.style.opacity = "0";
        return;
      }

      if (isVisible) {
        ringContainer.style.opacity = "1";
        dotContainer.style.opacity = "1";
      }

      if (mode === "action") {
        // Expanded ring with contextual text label (e.g., "DRAG 3D", "VIEW")
        ringInner.style.width = `${CURSOR_CONFIG.dimensions.action}px`;
        ringInner.style.height = `${CURSOR_CONFIG.dimensions.action}px`;
        ringInner.style.backgroundColor = "var(--surface-elevated)";
        ringInner.style.borderColor = "var(--primary)";
        ringInner.style.boxShadow = "0 8px 24px -4px rgba(0,0,0,0.3)";
        ringInner.style.backdropFilter = "blur(8px)";

        dotInner.style.opacity = "0";
        dotInner.style.transform = "scale(0)";

        labelEl.textContent = label;
        labelEl.style.opacity = "1";
      } else if (mode === "hover") {
        // Expanded interactive hover ring
        ringInner.style.width = `${CURSOR_CONFIG.dimensions.hover}px`;
        ringInner.style.height = `${CURSOR_CONFIG.dimensions.hover}px`;
        ringInner.style.backgroundColor = "rgba(245, 158, 11, 0.08)";
        ringInner.style.borderColor = "var(--primary)";
        ringInner.style.boxShadow = "0 0 16px rgba(245, 158, 11, 0.15)";
        ringInner.style.backdropFilter = "none";

        dotInner.style.opacity = "0.7";
        dotInner.style.transform = isClicking ? "scale(0.7)" : "scale(0.85)";

        labelEl.textContent = "";
        labelEl.style.opacity = "0";
      } else {
        // Default resting state
        const size = isClicking
          ? CURSOR_CONFIG.dimensions.clicking
          : CURSOR_CONFIG.dimensions.default;
        ringInner.style.width = `${size}px`;
        ringInner.style.height = `${size}px`;
        ringInner.style.backgroundColor = "transparent";
        ringInner.style.borderColor = "rgba(245, 158, 11, 0.4)";
        ringInner.style.boxShadow = "none";
        ringInner.style.backdropFilter = "none";

        dotInner.style.opacity = "1";
        dotInner.style.transform = isClicking ? "scale(0.75)" : "scale(1)";

        labelEl.textContent = "";
        labelEl.style.opacity = "0";
      }
    };

    /**
     * Animation frame loop for linear interpolation.
     */
    const renderLoop = () => {
      const dx = mouse.x - ring.x;
      const dy = mouse.y - ring.y;

      ring.x += dx * CURSOR_CONFIG.lerpFactor;
      ring.y += dy * CURSOR_CONFIG.lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      // Check if ring has caught up to mouse to pause loop when settled
      const distance = Math.hypot(dx, dy);
      if (distance > 0.08 || isClicking) {
        rafId = requestAnimationFrame(renderLoop);
      } else {
        ring.x = mouse.x;
        ring.y = mouse.y;
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
        }
        isRafRunning = false;
      }
    };

    const startLoop = () => {
      if (!isRafRunning) {
        isRafRunning = true;
        rafId = requestAnimationFrame(renderLoop);
      }
    };

    // --- Pointer Event Listeners ---
    const handlePointerMove = (e: PointerEvent) => {
      if (!isVisible) {
        isVisible = true;
        ring.x = e.clientX;
        ring.y = e.clientY;
        if (ringRef.current && dotRef.current) {
          ringRef.current.style.opacity = "1";
          dotRef.current.style.opacity = "1";
        }
      }

      mouse.x = e.clientX;
      mouse.y = e.clientY;
      startLoop();

      // Magnetic button attraction
      if (currentMagneticEl) {
        const rect = currentMagneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) * CURSOR_CONFIG.magneticPull;
        const offsetY = (e.clientY - centerY) * CURSOR_CONFIG.magneticPull;
        const maxDist = CURSOR_CONFIG.magneticMaxDistance;
        const clampedX = Math.max(-maxDist, Math.min(maxDist, offsetX));
        const clampedY = Math.max(-maxDist, Math.min(maxDist, offsetY));
        currentMagneticEl.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;

      // 1. Text input elements: hide custom cursor and restore native text/I-beam cursor
      const isInput = target.closest(
        'input, textarea, select, [contenteditable="true"]'
      );
      if (isInput) {
        currentMode = "text-hide";
        updateVisualStyles("text-hide", "");
        return;
      }

      // 2. Action badge targets (e.g., data-cursor-label="DRAG 3D")
      const actionEl = target.closest<HTMLElement>("[data-cursor-label]");
      if (actionEl) {
        const label = actionEl.getAttribute("data-cursor-label") || "";
        currentMode = "action";
        currentLabel = label;
        updateVisualStyles("action", label);
        startLoop();
        return;
      }

      // 3. Magnetic target elements
      const magneticEl = target.closest<HTMLElement>("[data-magnetic]");
      if (magneticEl) {
        currentMagneticEl = magneticEl;
        currentMagneticEl.style.transition = "transform 0.1s ease-out";
      }

      // 4. Standard interactive targets (buttons, links)
      const isInteractive = target.closest(
        'button, a, [role="button"], summary, [data-cursor-interactive="true"]'
      );
      if (isInteractive) {
        currentMode = "hover";
        updateVisualStyles("hover", "");
        startLoop();
        return;
      }

      // 5. Default canvas/background
      if (currentMode !== "default") {
        currentMode = "default";
        updateVisualStyles("default", "");
        startLoop();
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;

      const magneticEl = target.closest<HTMLElement>("[data-magnetic]");
      if (magneticEl && currentMagneticEl === magneticEl) {
        currentMagneticEl.style.transition =
          "transform 0.35s cubic-bezier(0.21, 0.47, 0.32, 0.98)";
        currentMagneticEl.style.transform = "translate3d(0, 0, 0)";
        currentMagneticEl = null;
      }

      // If pointer leaves window boundary, fade cursor out
      if (!e.relatedTarget) {
        isVisible = false;
        if (ringRef.current && dotRef.current) {
          ringRef.current.style.opacity = "0";
          dotRef.current.style.opacity = "0";
        }
      }
    };

    const handlePointerDown = () => {
      isClicking = true;
      updateVisualStyles(currentMode, currentLabel);
      startLoop();
    };

    const handlePointerUp = () => {
      isClicking = false;
      updateVisualStyles(currentMode, currentLabel);
      startLoop();
    };

    const handleWindowBlur = () => {
      isVisible = false;
      if (ringRef.current && dotRef.current) {
        ringRef.current.style.opacity = "0";
        dotRef.current.style.opacity = "0";
      }
      if (currentMagneticEl) {
        currentMagneticEl.style.transform = "translate3d(0, 0, 0)";
        currentMagneticEl = null;
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("blur", handleWindowBlur);
      cancelAnimationFrame(rafId);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Secondary Trailing Ring (Smooth LERP follower) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform flex items-center justify-center transition-opacity duration-200"
        style={{
          opacity: 0,
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
        }}
      >
        <div
          ref={ringInnerRef}
          className="flex items-center justify-center rounded-full border border-primary/40 transition-[width,height,background-color,border-color,box-shadow,transform] duration-250 ease-out"
          style={{
            width: `${CURSOR_CONFIG.dimensions.default}px`,
            height: `${CURSOR_CONFIG.dimensions.default}px`,
          }}
        >
          <span
            ref={labelRef}
            className="font-mono text-[9px] font-bold tracking-wider text-primary select-none opacity-0 transition-opacity duration-200 text-center px-1"
          />
        </div>
      </div>

      {/* Primary Cursor Dot (Zero-latency direct follower) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform flex items-center justify-center transition-opacity duration-150"
        style={{
          opacity: 0,
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
        }}
      >
        <div
          ref={dotInnerRef}
          className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(245,158,11,0.6)] transition-[transform,opacity,background-color] duration-150 ease-out"
        />
      </div>
    </>
  );
}
