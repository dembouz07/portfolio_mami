import { m, useReducedMotion, useScroll, useSpring } from "motion/react";

import { cn } from "../../lib/cn";

export interface ScrollProgressProps {
  readonly className?: string;
}

export function ScrollProgress({ className }: ScrollProgressProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 190,
    damping: 34,
    mass: 0.35,
    restDelta: 0.001,
  });

  return (
    <m.div
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-[var(--accent)]",
        className,
      )}
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothProgress }}
      aria-hidden="true"
    />
  );
}

export default ScrollProgress;
