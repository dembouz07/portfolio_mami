import { useId, useMemo, type Key, type ReactNode } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  m,
  useReducedMotion,
} from "motion/react";

import { cn } from "../../lib/cn";
import { easeOutExpo } from "../../lib/motion";
import { filterProjects } from "../../lib/projects";
import type { Project, ProjectFilter } from "../../types/portfolio";

export interface ProjectGridMotionProps<T extends Project> {
  readonly items: readonly T[];
  readonly activeFilter: ProjectFilter;
  readonly renderItem: (item: T, index: number) => ReactNode;
  readonly getKey?: (item: T) => Key;
  readonly getItemClassName?: (item: T) => string | undefined;
  readonly className?: string;
  readonly ariaLabel?: string;
}

export function ProjectGridMotion<T extends Project>({
  items,
  activeFilter,
  renderItem,
  getKey = (item) => item.title,
  getItemClassName,
  className,
  ariaLabel = "Projets filtrés",
}: ProjectGridMotionProps<T>) {
  const reduceMotion = useReducedMotion();
  const layoutGroupId = useId();
  const visibleProjects = useMemo(
    () => filterProjects(items, activeFilter),
    [activeFilter, items],
  );

  return (
    <LayoutGroup id={layoutGroupId}>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {visibleProjects.length} projet{visibleProjects.length > 1 ? "s" : ""} affiché
        {visibleProjects.length > 1 ? "s" : ""}.
      </p>
      <m.div
        className={cn("grid gap-5 md:grid-cols-2", className)}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: reduceMotion ? 0 : 0.07,
              delayChildren: reduceMotion ? 0 : 0.06,
            },
          },
        }}
        role="region"
        aria-label={ariaLabel}
      >
        <AnimatePresence initial={false} mode="sync">
          {visibleProjects.map((project, index) => (
            <m.div
              key={getKey(project)}
              className={cn(getItemClassName?.(project))}
              layout={!reduceMotion}
              layoutDependency={activeFilter}
              variants={
                reduceMotion
                  ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                  : {
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: easeOutExpo },
                      },
                    }
              }
              exit={reduceMotion ? undefined : { scale: 0.98 }}
              transition={
                reduceMotion
                  ? { duration: 0.1 }
                  : {
                      layout: { duration: 0.45, ease: easeOutExpo },
                      scale: { duration: 0.18, ease: easeOutExpo },
                      y: { duration: 0.4, ease: easeOutExpo },
                    }
              }
            >
              {renderItem(project, index)}
            </m.div>
          ))}
        </AnimatePresence>
      </m.div>
    </LayoutGroup>
  );
}

export default ProjectGridMotion;
