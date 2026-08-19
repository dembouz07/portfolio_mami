import type { ReactNode } from "react";

import { AnimatedReveal } from "../common/AnimatedReveal";
import { cn } from "../../lib/cn";

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
      direction={index % 2 === 0 ? "right" : "left"}
      className={cn(
        "relative pl-12 md:grid md:grid-cols-2 md:pl-0",
        index % 2 === 0
          ? "md:pr-[calc(50%+2.75rem)]"
          : "md:pl-[calc(50%+2.75rem)]",
        className,
      )}
    >
      <span
        className="absolute left-[0.55rem] top-8 z-10 flex size-4 items-center justify-center rounded-full border-[3px] border-[var(--bg)] bg-[var(--accent)] shadow-[0_0_0_5px_var(--accent-soft)] md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      />

      <article
        className={cn(
          "surface-panel rounded-3xl p-6 sm:p-8 md:col-span-2",
          articleClassName,
        )}
      >
        {children}
      </article>
    </AnimatedReveal>
  );
}

export default TimelineItem;
