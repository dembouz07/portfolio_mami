import { m, useReducedMotion } from "motion/react";
import { useState } from "react";

import { AnimatedReveal, Container, ProjectGridMotion } from "../components/common";
import { ProjectCard } from "../components/ui/ProjectCard";
import { projectFilters, projects } from "../data/portfolio";
import type { ProjectFilter } from "../types/portfolio";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const reduceMotion = useReducedMotion();

  return (
    <section id="projets" aria-labelledby="projects-title" className="section-shell bg-[var(--bg-soft)]">
      <Container>
        <div className="border-b border-[var(--line)] pb-9 sm:pb-12">
          <AnimatedReveal>
            <div className="grid gap-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)] lg:items-end">
              <div>
                <p className="font-display text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--accent)]">
                  04 / Projets sélectionnés
                </p>
                <h2
                  id="projects-title"
                  className="font-display mt-5 max-w-5xl text-balance text-[clamp(3rem,7.4vw,7.8rem)] font-extrabold leading-[0.86] tracking-[-0.075em] text-[var(--text)]"
                >
                  Du code,
                  <span className="block [font-family:'Newsreader_Variable',Georgia,serif] font-normal italic tracking-[-0.055em] text-[var(--accent)]">
                    des usages.
                  </span>
                </h2>
              </div>

              <p className="max-w-md text-pretty text-base leading-7 text-[var(--muted)] lg:justify-self-end lg:pb-2">
                Quatre systèmes conçus à partir de besoins concrets — de l’idée à une solution fiable et utilisable.
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal direction="left" className="mt-8 min-w-0 max-w-full sm:mt-10">
            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-1"
              role="toolbar"
              aria-label="Filtrer les projets"
            >
              <span className="mr-2 py-3 text-[0.67rem] font-extrabold uppercase tracking-[0.2em] text-[var(--muted)]">
                Afficher
              </span>
              {projectFilters.map((filter) => {
                const active = filter.value === activeFilter;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`group/filter relative min-h-11 px-0.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg-soft)] ${
                      active
                        ? "text-[var(--text)]"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    <span>{filter.label}</span>
                    {active ? (
                      <m.span
                        layoutId="project-filter-active"
                        className="absolute inset-x-0 bottom-1 h-px bg-[var(--accent)]"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 34 }
                        }
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-[var(--text)] transition-transform duration-300 group-hover/filter:scale-x-100 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </AnimatedReveal>
        </div>

        <ProjectGridMotion
          items={projects}
          activeFilter={activeFilter}
          className="!grid-cols-1 !gap-0"
          renderItem={(project) => (
            <ProjectCard project={project} visualIndex={projects.indexOf(project)} />
          )}
        />
      </Container>
    </section>
  );
}

export default Projects;
