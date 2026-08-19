import type { ReactNode } from "react";

import { cn } from "../../lib/cn";
import { AnimatedReveal } from "../common/AnimatedReveal";

export interface TimelineItemProps {
  readonly children: ReactNode;
  readonly index: number;
  readonly className?: string;
  readonly articleClassName?: string;
}

export function TimelineItem({
  children,
  index,
  className,
  articleClassName,
}: TimelineItemProps) {
  return (
    <AnimatedReveal
      direction="up"
      delay={index * 0.06}
      className={cn(
        "relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-5 border-b border-[var(--line)] py-9 sm:py-11 md:grid-cols-[8rem_1.5rem_minmax(0,1fr)] md:gap-x-6",
        index === 0 && "border-t",
        className,
      )}
    >
      <span
        className="font-display col-start-1 row-start-1 hidden text-right text-5xl font-extrabold leading-none tracking-[-0.06em] text-[var(--text)] opacity-20 md:block"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className="relative z-10 col-start-1 row-start-1 mt-1.5 size-3 justify-self-center rounded-full border-2 border-[var(--bg)] bg-[var(--accent)] shadow-[0_0_0_4px_var(--accent-soft)] md:col-start-2"
        aria-hidden="true"
      />

      <article
        className={cn(
          "col-start-2 row-start-1 min-w-0 md:col-start-3",
          articleClassName,
        )}
      >
        <span
          className="font-display mb-4 block text-xs font-extrabold tracking-[0.14em] text-[var(--accent)] md:hidden"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {children}
      </article>
    </AnimatedReveal>
  );
}

export default TimelineItem;
