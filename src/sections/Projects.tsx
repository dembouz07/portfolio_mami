import { SlidersHorizontal } from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { useState } from "react";

import { AnimatedReveal, Container, ProjectGridMotion, SectionHeading } from "../components/common";
import { ProjectCard } from "../components/ui/ProjectCard";
import { projectFilters, projects } from "../data/portfolio";
import type { ProjectFilter } from "../types/portfolio";

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const reduceMotion = useReducedMotion();

  return (
    <section id="projets" aria-labelledby="projects-title" className="section-shell bg-[var(--bg-soft)]">
      <Container>
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading
            eyebrow="04 · Projets"
            title="Des applications web et logicielles utiles"
            description="Quatre projets académiques et professionnels où l’architecture, l’usage et la fiabilité avancent ensemble."
            id="projects-title"
          />

          <AnimatedReveal direction="left" className="min-w-0 max-w-full lg:justify-self-end">
            <div className="flex max-w-full items-center gap-2 overflow-x-auto pb-1" role="toolbar" aria-label="Filtrer les projets">
              <SlidersHorizontal className="mr-1 hidden size-4 shrink-0 text-[var(--muted)] sm:block" aria-hidden="true" />
              {projectFilters.map((filter) => {
                const active = filter.value === activeFilter;
                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`relative min-h-11 shrink-0 overflow-hidden rounded-full border px-4 text-sm font-bold transition-colors ${
                      active
                        ? "border-[var(--accent)] text-[#03120d] dark:text-[#03120d]"
                        : "border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
                    }`}
                  >
                    {active ? (
                      <m.span
                        layoutId="project-filter-active"
                        className="absolute inset-0 bg-[var(--accent)]"
                        transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className="relative z-10">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </AnimatedReveal>
        </div>

        <AnimatedReveal className="mt-11" amount={0.08}>
          <ProjectGridMotion
            items={projects}
            activeFilter={activeFilter}
            className="lg:grid-cols-2"
            getItemClassName={(project) => (project.featured ? "lg:col-span-2" : undefined)}
            renderItem={(project) => (
              <ProjectCard project={project} visualIndex={projects.indexOf(project)} />
            )}
          />
        </AnimatedReveal>
      </Container>
    </section>
  );
}

export default Projects;
