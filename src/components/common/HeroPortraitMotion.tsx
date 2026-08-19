import { useMemo, type PointerEvent, type ReactNode } from "react";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "motion/react";

import { usePointerFine } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/cn";
import { easeOutExpo } from "../../lib/motion";

export interface HeroPortraitMotionProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly depth?: number;
  readonly delay?: number;
}

export function HeroPortraitMotion({
  children,
  className,
  depth = 5,
  delay = 0.3,
}: HeroPortraitMotionProps) {
  const reduceMotion = useReducedMotion();
  const pointerFine = usePointerFine();
  const maxDepth = Math.min(5, Math.max(0, depth));
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 150, damping: 24, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 150, damping: 24, mass: 0.5 });
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 24, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 24, mass: 0.5 });
  const enabled = pointerFine && !reduceMotion;
  const revealVariants = useMemo<Variants>(
    () =>
      reduceMotion
        ? {
            hidden: { opacity: 1 },
            visible: { opacity: 1 },
          }
        : {
            hidden: {
              opacity: 0,
              clipPath: "inset(0 0 100% 0 round 1.75rem)",
              scale: 1.02,
            },
            visible: {
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0% round 1.75rem)",
              scale: 1,
              transition: {
                duration: 0.75,
                delay: Math.max(0, delay),
                ease: easeOutExpo,
              },
            },
          },
    [delay, reduceMotion],
  );

  const resetDepth = () => {
    rawX.set(0);
    rawY.set(0);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled) {
      resetDepth();
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    rawX.set(horizontal * maxDepth * 2);
    rawY.set(vertical * maxDepth * 2);
    rawRotateX.set(vertical * -2);
    rawRotateY.set(horizontal * 2);
  };

  return (
    <div
      className={cn("relative", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetDepth}
      onPointerCancel={resetDepth}
    >
      <m.div
        className="relative will-change-transform"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={revealVariants}
        style={
          enabled
            ? { x, y, rotateX, rotateY, transformPerspective: 900 }
            : undefined
        }
      >
        {children}
      </m.div>
    </div>
  );
}

export default HeroPortraitMotion;
