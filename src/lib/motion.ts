import type { Transition, Variants } from "motion/react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeStandard = [0.22, 1, 0.36, 1] as const;

export const transitions = {
  quick: { duration: 0.25, ease: easeStandard },
  standard: { duration: 0.45, ease: easeStandard },
  reveal: { duration: 0.65, ease: easeOutExpo },
  spring: { type: "spring", stiffness: 360, damping: 28, mass: 0.55 },
} as const satisfies Record<string, Transition>;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.standard,
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

export const reducedFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;

export function getRevealOffset(
  direction: "up" | "down" | "left" | "right" | "none",
  distance = 28,
): { x?: number; y?: number } {
  switch (direction) {
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    case "none":
      return {};
    case "up":
    default:
      return { y: distance };
  }
}
