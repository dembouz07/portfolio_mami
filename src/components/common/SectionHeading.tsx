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
    <div
      className={cn(
        "grid gap-6 border-t border-[var(--line)] pt-5 md:grid-cols-[minmax(9rem,0.42fr)_minmax(0,1.58fr)] md:gap-10",
        centered && "text-center md:grid-cols-1",
        className,
      )}
    >
      <m.div
        className={cn(
          "flex items-start gap-3 pt-1",
          centered && "justify-center",
        )}
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: reduceMotion ? 0 : 0.35 }}
      >
        <span
          className="mt-[0.42rem] size-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_5px_var(--accent-soft)]"
          aria-hidden="true"
        />
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--muted)] sm:text-xs">
          {eyebrow}
        </p>
      </m.div>

      <div>
        <div className="overflow-hidden pb-2">
          <m.h2
            id={id}
            className={cn(
              "font-display text-balance text-[clamp(2.65rem,6.2vw,6rem)] font-extrabold leading-[0.96] tracking-[-0.065em] text-[var(--text)]",
              titleClassName,
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: easeOutExpo,
            }}
          >
            {title}
          </m.h2>
        </div>

        {description ? (
          <m.p
            className={cn(
              "mt-7 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg md:ml-auto md:w-3/5",
              centered && "mx-auto md:mx-auto md:w-auto",
              descriptionClassName,
            )}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
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
    </div>
  );
}

export default SectionHeading;
