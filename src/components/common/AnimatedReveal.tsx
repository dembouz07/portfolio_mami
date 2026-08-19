import { useMemo, type ReactNode } from "react";
import { m, useReducedMotion, type HTMLMotionProps, type Variants } from "motion/react";

import { useMediaQuery } from "../../hooks/useMediaQuery";
import { cn } from "../../lib/cn";
import { easeOutExpo, getRevealOffset } from "../../lib/motion";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface AnimatedRevealProps
  extends Omit<
    HTMLMotionProps<"div">,
    "children" | "initial" | "variants" | "viewport" | "whileInView"
  > {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly direction?: RevealDirection;
  readonly amount?: number;
  readonly once?: boolean;
}

export function AnimatedReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 0.2,
  once = true,
  ...props
}: AnimatedRevealProps) {
  const reduceMotion = useReducedMotion();
  const desktopMotion = useMediaQuery("(min-width: 768px)");
  const resolvedDirection =
    !desktopMotion && (direction === "left" || direction === "right")
      ? "up"
      : direction;
  const variants = useMemo<Variants>(() => {
    if (reduceMotion) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
      };
    }

    return {
      hidden: {
        opacity: 0,
        ...getRevealOffset(resolvedDirection),
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.65,
          delay: Math.max(0, delay),
          ease: easeOutExpo,
        },
      },
    };
  }, [delay, reduceMotion, resolvedDirection]);

  return (
    <m.div
      className={cn(className)}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{
        once,
        amount: Math.min(1, Math.max(0, amount)),
        margin: "0px 0px -8% 0px",
      }}
      variants={variants}
      {...props}
    >
      {children}
    </m.div>
  );
}

export default AnimatedReveal;
