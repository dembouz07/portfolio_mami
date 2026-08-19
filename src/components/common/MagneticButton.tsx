import type { PointerEvent, ReactNode } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { usePointerFine } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/cn";

export interface MagneticButtonProps {
  readonly children: ReactNode;
  readonly className?: string;
}

const MAX_OFFSET = 5;

function clampOffset(value: number): number {
  return Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, value));
}

export function MagneticButton({ children, className }: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const pointerFine = usePointerFine();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 420, damping: 28, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 420, damping: 28, mass: 0.35 });
  const enabled = pointerFine && !reduceMotion;

  const resetPosition = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (!enabled) {
      resetPosition();
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;

    rawX.set(clampOffset(relativeX * MAX_OFFSET * 2));
    rawY.set(clampOffset(relativeY * MAX_OFFSET * 2));
  };

  return (
    <m.span
      className={cn("inline-flex", className)}
      style={enabled ? { x, y } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      onPointerCancel={resetPosition}
    >
      {children}
    </m.span>
  );
}

export default MagneticButton;
