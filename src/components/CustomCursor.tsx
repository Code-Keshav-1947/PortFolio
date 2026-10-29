"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // 1. Accessibility & Hardware checks
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setIsEnabled(true);
    document.documentElement.classList.add("custom-cursor-enabled");

    // Coordinate storage (never in React state to avoid frame re-renders)
    const mouse = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let isVisible = false;
    let isClicking = false;
    let isRafRunning = false;
    let rafId = 0;

    // Interaction state
    type CursorMode = "default" | "hover" | "action" | "text-hide";
    let currentMode: CursorMode = "default";
    let currentLabel = "";

    // Magnetic target tracking
    let currentMagneticEl: HTMLElement | null = null;

    const LERP_FACTOR = 0.16; // Perfectly tuned: responsive yet with luxurious inertia

    const updateVisualStyles = (mode: CursorMode, label: string) => {
      const ringInner = ringInnerRef.current;
      const dotInner = dotInnerRef.current;
      const labelEl = labelRef.current;

      if (!ringInner || !dotInner || !labelEl) return;

      if (mode === "text-hide") {
        ringRef.current!.style.opacity = "0";
        dotRef.current!.style.opacity = "0";
        return;
      }

      if (isVisible) {
        ringRef.current!.style.opacity = "1";
        dotRef.current!.style.opacity = "1";
      }

      if (mode === "action") {
        // Expanded ring with action label
        ringInner.style.width = "72px";
        ringInner.style.height = "72px";
        ringInner.style.backgroundColor = "var(--surface-elevated)";
        ringInner.style.borderColor = "var(--primary)";
        ringInner.style.boxShadow = "0 8px 24px -4px rgba(0,0,0,0.3)";
        ringInner.style.backdropFilter = "blur(8px)";
        
        dotInner.style.opacity = "0";
        dotInner.style.transform = "scale(0)";

        labelEl.textContent = label;
        labelEl.style.opacity = "1";
      } else if (mode === "hover") {
        // Expanded hover ring
        ringInner.style.width = "50px";
        ringInner.style.height = "50px";
        ringInner.style.backgroundColor = "rgba(245, 158, 11, 0.08)";
        ringInner.style.borderColor = "var(--primary)";
        ringInner.style.boxShadow = "0 0 16px rgba(245, 158, 11, 0.15)";
        ringInner.style.backdropFilter = "none";

        dotInner.style.opacity = "0.7";
        dotInner.style.transform = isClicking ? "scale(0.7)" : "scale(0.85)";

        labelEl.textContent = "";
        labelEl.style.opacity = "0";
      } else {
        // Default state
        ringInner.style.width = isClicking ? "26px" : "34px";
        ringInner.style.height = isClicking ? "26px" : "34px";
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

    const renderLoop = () => {
      // Linear interpolation for delayed secondary circle
      const dx = mouse.x - ring.x;
      const dy = mouse.y - ring.y;
      
      ring.x += dx * LERP_FACTOR;
      ring.y += dy * LERP_FACTOR;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      // Check if settled (to pause RAF when idle)
      const distance = Math.hypot(dx, dy);
      if (distance > 0.08 || isClicking) {
        rafId = requestAnimationFrame(renderLoop);
      } else {
        // Snap exactly to target
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

    // ─── Pointer Event Handlers ───
    const handlePointerMove = (e: PointerEvent) => {
      // First move initialization
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

      // Magnetic effect calculation
      if (currentMagneticEl) {
        const rect = currentMagneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) * 0.28;
        const offsetY = (e.clientY - centerY) * 0.28;
        const maxDist = 7;
        const clampedX = Math.max(-maxDist, Math.min(maxDist, offsetX));
        const clampedY = Math.max(-maxDist, Math.min(maxDist, offsetY));
        currentMagneticEl.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;

      // 1. Check for text editing inputs (Native cursor preserved)
      const isInput = target.closest(
        'input, textarea, select, [contenteditable="true"]'
      );
      if (isInput) {
        currentMode = "text-hide";
        updateVisualStyles("text-hide", "");
        return;
      }

      // 2. Check for contextual action labels (e.g. data-cursor-label="VIEW")
      const actionEl = target.closest<HTMLElement>("[data-cursor-label]");
      if (actionEl) {
        const label = actionEl.getAttribute("data-cursor-label") || "";
        currentMode = "action";
        currentLabel = label;
        updateVisualStyles("action", label);
        startLoop();
        return;
      }

      // 3. Check for magnetic element
      const magneticEl = target.closest<HTMLElement>("[data-magnetic]");
      if (magneticEl) {
        currentMagneticEl = magneticEl;
        currentMagneticEl.style.transition = "transform 0.1s ease-out";
      }

      // 4. Check for standard clickable/interactive elements
      const isInteractive = target.closest(
        'button, a, [role="button"], summary, [data-cursor-interactive="true"]'
      );
      if (isInteractive) {
        currentMode = "hover";
        updateVisualStyles("hover", "");
        startLoop();
        return;
      }

      // 5. Default
      if (currentMode !== "default") {
        currentMode = "default";
        updateVisualStyles("default", "");
        startLoop();
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== "function") return;

      // Reset magnetic element if left
      const magneticEl = target.closest<HTMLElement>("[data-magnetic]");
      if (magneticEl && currentMagneticEl === magneticEl) {
        currentMagneticEl.style.transition =
          "transform 0.35s cubic-bezier(0.21, 0.47, 0.32, 0.98)";
        currentMagneticEl.style.transform = "translate3d(0, 0, 0)";
        currentMagneticEl = null;
      }

      // Check if leaving window entirely
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
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* ─── Secondary Trailing Ring (Smooth delayed follower) ─── */}
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
            width: "34px",
            height: "34px",
          }}
        >
          <span
            ref={labelRef}
            className="font-mono text-[9px] font-bold tracking-wider text-primary select-none opacity-0 transition-opacity duration-200 text-center px-1"
          />
        </div>
      </div>

      {/* ─── Primary Cursor Dot (Zero-latency direct follower) ─── */}
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
