/**
 * Shared animation configurations, spring curves, and easing curves.
 * Centralizing these values ensures consistent motion cadence across the portfolio.
 */

/**
 * Custom quintic ease-out curve [0.21, 0.47, 0.32, 0.98].
 * Provides a responsive start with a luxurious, non-linear inertial deceleration.
 */
export const LUXURY_EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Standard transition durations (in seconds) for motion components.
 */
export const MOTION_DURATIONS = {
  fast: 0.25,
  standard: 0.5,
  slow: 0.75,
  ambient: 1.2,
} as const;

/**
 * Shared stagger container animation variants.
 */
export const staggerContainerVariants = (staggerDelay = 0.08) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
    },
  },
});

/**
 * Shared single-item reveal variant for staggered lists.
 */
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: LUXURY_EASE,
    },
  },
} as const;
