import { useMemo, type ReactNode } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";

import { cn } from "../../lib/cn";
import { staggerItem } from "../../lib/motion";

export interface StaggerGroupProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "div" | "ul" | "ol";
  readonly id?: string;
  readonly role?: string;
  readonly ariaLabel?: string;
  readonly stagger?: number;
  readonly delayChildren?: number;
  readonly amount?: number;
  readonly once?: boolean;
}

export function StaggerGroup({
  children,
  className,
  as = "div",
  id,
  role,
  ariaLabel,
  stagger = 0.08,
  delayChildren = 0.08,
  amount = 0.15,
  once = true,
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion();
  const variants = useMemo<Variants>(
    () => ({
      hidden: {},
      visible: {
        transition: reduceMotion
          ? { staggerChildren: 0, delayChildren: 0 }
          : {
              staggerChildren: Math.max(0, stagger),
              delayChildren: Math.max(0, delayChildren),
            },
      },
    }),
    [delayChildren, reduceMotion, stagger],
  );
  const motionProps = {
    id,
    role,
    "aria-label": ariaLabel,
    className: cn(className),
    initial: reduceMotion ? (false as const) : ("hidden" as const),
    whileInView: "visible" as const,
    viewport: {
      once,
      amount: Math.min(1, Math.max(0, amount)),
      margin: "0px 0px -8% 0px" as const,
    },
    variants,
  };

  if (as === "ul") {
    return <m.ul {...motionProps}>{children}</m.ul>;
  }

  if (as === "ol") {
    return <m.ol {...motionProps}>{children}</m.ol>;
  }

  return <m.div {...motionProps}>{children}</m.div>;
}

export interface StaggerItemProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: "div" | "li";
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const variants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : staggerItem;

  if (as === "li") {
    return (
      <m.li className={cn(className)} variants={variants}>
        {children}
      </m.li>
    );
  }

  return (
    <m.div className={cn(className)} variants={variants}>
      {children}
    </m.div>
  );
}

export default StaggerGroup;
