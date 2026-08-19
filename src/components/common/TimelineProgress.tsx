import { useRef, type ReactNode } from "react";
import { m, useReducedMotion, useScroll, useSpring } from "motion/react";

import { cn } from "../../lib/cn";

export interface TimelineProgressProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly lineClassName?: string;
}

export function TimelineProgress({
  children,
  className,
  lineClassName,
}: TimelineProgressProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 75%", "end 70%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    mass: 0.45,
    restDelta: 0.001,
  });

  return (
    <div ref={targetRef} className={cn("relative", className)}>
      <span
        className={cn(
          "timeline-track pointer-events-none",
          lineClassName,
        )}
        aria-hidden="true"
      >
        <m.span
          className="absolute inset-0 origin-top bg-[var(--accent)]"
          style={{ scaleY: reduceMotion ? 1 : progress }}
        />
      </span>
      {children}
    </div>
  );
}

export default TimelineProgress;
