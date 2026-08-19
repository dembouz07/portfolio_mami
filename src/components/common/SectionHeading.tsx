import type { ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";

import { cn } from "../../lib/cn";
import { easeOutExpo } from "../../lib/motion";

export interface SectionHeadingProps {
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly align?: "left" | "center";
  readonly id?: string;
  readonly className?: string;
  readonly titleClassName?: string;
  readonly descriptionClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  const reduceMotion = useReducedMotion();
  const centered = align === "center";

  return (
    <div className={cn(centered && "text-center", className)}>
      <m.div
        className={cn(
          "mb-4 flex items-center gap-3",
          centered && "justify-center",
        )}
        initial={reduceMotion ? false : { y: 8 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
      >
        <span
          className="h-px w-8 bg-[var(--accent)]"
          aria-hidden="true"
        />
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--accent)] sm:text-sm">
          {eyebrow}
        </p>
      </m.div>

      <div className="pb-2">
        <m.h2
          id={id}
          className={cn(
            "font-display text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-[var(--text)] sm:text-4xl lg:text-5xl",
            titleClassName,
          )}
          initial={reduceMotion ? false : { y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: easeOutExpo,
          }}
        >
          {title}
        </m.h2>
      </div>

      {description ? (
        <m.p
          className={cn(
            "mt-5 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg",
            centered && "mx-auto",
            descriptionClassName,
          )}
          initial={reduceMotion ? false : { y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            delay: reduceMotion ? 0 : 0.1,
            ease: easeOutExpo,
          }}
        >
          {description}
        </m.p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
