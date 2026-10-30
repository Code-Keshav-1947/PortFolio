"use client";

import { useRef, useState, useCallback, ReactNode } from "react";
import { LUXURY_EASE } from "@/lib/animation";

interface ProjectTiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  featured?: boolean;
}

const EASE_STRING = `cubic-bezier(${LUXURY_EASE.join(", ")})`;

export function ProjectTiltCard({
  children,
  className = "",
  maxTilt = 7,
  featured = false,
}: ProjectTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Respect accessibility & coarse touch pointers
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(pointer: coarse)").matches
      ) {
        return;
      }

      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles bounded by maxTilt
      const tiltX = -((y - centerY) / centerY) * maxTilt;
      const tiltY = ((x - centerX) / centerX) * maxTilt;

      setStyle({
        transform: `perspective(1000px) rotateX(${tiltX.toFixed(
          2
        )}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(6px)`,
        transition: "transform 0.08s ease-out",
      });

      // Specular sheen tracking
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      setGlareStyle({
        opacity: featured ? 0.22 : 0.16,
        background: `radial-gradient(circle 320px at ${percentX.toFixed(
          1
        )}% ${percentY.toFixed(1)}%, var(--primary), transparent 80%)`,
        transition: "opacity 0.2s ease-out",
      });
    },
    [maxTilt, featured]
  );

  const handlePointerLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
      transition: `transform 0.45s ${EASE_STRING}`,
    });
    setGlareStyle({
      opacity: 0,
      transition: "opacity 0.4s ease-out",
    });
  }, []);

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative will-change-transform"
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={style}
        className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      >
        {/* Dynamic Specular 3D Glare Sheen */}
        <div
          aria-hidden="true"
          style={glareStyle}
          className="pointer-events-none absolute inset-0 z-20 mix-blend-screen transition-opacity"
        />
        {/* Card Content with subtle 3D layer depth */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    </div>
  );
}
