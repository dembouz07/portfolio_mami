import { Building2, CalendarDays, ExternalLink } from "lucide-react";
import { type PointerEvent as ReactPointerEvent } from "react";
import { SiGithub } from "react-icons/si";

import type { Project } from "../../types/portfolio";
import { TechnologyBadge } from "../common/TechnologyBadge";

export interface ProjectCardProps {
  readonly project: Project;
  readonly visualIndex: number;
}

export function ProjectCard({ project, visualIndex }: ProjectCardProps) {
  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <article
      className={`project-card group relative h-full overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] transition-[border-color,box-shadow] hover:border-[color-mix(in_srgb,var(--accent)_48%,transparent)] hover:shadow-[var(--shadow)] ${
        project.featured ? "lg:grid lg:grid-cols-[1.08fr_0.92fr]" : ""
      }`}
      onPointerMove={handlePointerMove}
    >
      <div className="project-pointer-glow" aria-hidden="true" />

      <div
        className={`project-visual overflow-hidden ${project.featured ? "lg:min-h-[28rem]" : ""}`}
        data-project={visualIndex}
        aria-hidden="true"
      >
        <div className="absolute left-[31%] top-[38%] z-[3] h-2 w-[38%] rounded-full bg-[var(--accent)] opacity-70 shadow-[0_1.8rem_0_color-mix(in_srgb,var(--accent)_38%,transparent)] transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none" />
        <span className="font-display absolute bottom-5 left-5 z-[5] text-[0.67rem] font-extrabold uppercase tracking-[0.16em] text-[var(--muted)]">
          Étude · Conception · Développement
        </span>
      </div>

      <div className="relative z-[5] flex flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[var(--accent)]">
            {project.type}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)]">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {project.period}
          </span>
        </div>

        <h3 className={`font-display mt-6 text-balance font-extrabold leading-[1.1] tracking-[-0.045em] text-[var(--text)] ${project.featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
          {project.title}
        </h3>

        <p className="mt-5 leading-7 text-[var(--muted)]">{project.description}</p>

        <p className="mt-5 flex items-start gap-2 border-t border-[var(--line)] pt-5 text-sm leading-6 text-[var(--muted)]">
          <Building2 className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
          <span>{project.organization}</span>
        </p>

        <div className="mt-5 flex flex-wrap gap-2" aria-label="Technologies du projet">
          {project.technologies.map((technology) => (
            <TechnologyBadge key={technology} technology={technology} showIcon={false} />
          ))}
        </div>

        {project.liveUrl || project.sourceUrl ? (
          <div className="mt-7 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-bold text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Voir la démo
                <ExternalLink className="size-4 transition-transform group-hover/link:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
              </a>
            ) : null}
            {project.sourceUrl ? (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--line)] px-4 text-sm font-bold text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                Voir le code
                <SiGithub className="size-4 transition-transform group-hover/link:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default ProjectCard;
