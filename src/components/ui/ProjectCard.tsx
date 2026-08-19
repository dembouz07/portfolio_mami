import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

import type { Project } from "../../types/portfolio";

export interface ProjectCardProps {
  readonly project: Project;
  readonly visualIndex: number;
}

const visualTones = [
  "bg-[#082c26] text-[#c9ffe7]",
  "bg-[#efbb45] text-[#241800]",
  "bg-[#c9c0ff] text-[#1b1532]",
  "bg-[#ff7464] text-[#28100d]",
] as const;

const visualMasks = [
  "[clip-path:polygon(0_8%,86%_0,100%_18%,94%_100%,10%_94%)]",
  "[clip-path:polygon(7%_0,100%_7%,92%_91%,72%_100%,0_88%)]",
  "[clip-path:polygon(0_0,92%_5%,100%_78%,84%_100%,4%_93%)]",
  "[clip-path:polygon(11%_3%,100%_0,94%_92%,62%_100%,0_86%,4%_19%)]",
] as const;

const visualLabels = [
  "Santé / Organisation",
  "Suivi / Matériel",
  "Lecture / Commerce",
  "Présence / Campus",
] as const;

export function ProjectCard({ project, visualIndex }: ProjectCardProps) {
  const number = String(visualIndex + 1).padStart(2, "0");
  const reverse = visualIndex % 2 === 1;
  const tone = visualTones[visualIndex % visualTones.length];
  const mask = visualMasks[visualIndex % visualMasks.length];
  const visualLabel = visualLabels[visualIndex % visualLabels.length];

  return (
    <article
      className={`group relative border-b border-[var(--line)] py-12 sm:py-16 lg:py-24 ${
        reverse
          ? "-mx-4 bg-[var(--surface)] px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10"
          : ""
      }`}
    >
      <div className="grid min-w-0 gap-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-[clamp(3rem,7vw,8rem)]">
        <div className={`relative ${reverse ? "lg:order-2" : ""}`}>
          <div
            className={`relative isolate min-h-[19rem] overflow-hidden sm:min-h-[28rem] lg:min-h-[34rem] ${tone} ${mask}`}
            aria-hidden="true"
          >
            <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(105deg,currentColor_0_1px,transparent_1px_42px)]" />
            <div className="absolute -right-[8%] -top-[12%] size-[72%] rounded-[47%_53%_38%_62%/52%_36%_64%_48%] border border-current opacity-35 transition-transform duration-700 group-hover:-rotate-6 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none" />
            <div className="absolute bottom-[9%] left-[7%] size-[54%] rounded-[38%_62%_58%_42%/56%_38%_62%_44%] bg-current opacity-10 transition-transform duration-700 group-hover:rotate-6 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none" />

            <span className="font-display absolute -right-[0.04em] bottom-[-0.12em] text-[clamp(9rem,24vw,22rem)] font-extrabold leading-none tracking-[-0.11em] opacity-[0.16]">
              {number}
            </span>

            <div className="absolute left-[12%] top-[19%] size-[42%] rounded-full border border-current opacity-70">
              <div className="absolute inset-[16%] rounded-full border border-current opacity-70" />
              <div className="absolute left-1/2 top-[-15%] h-[130%] w-px -translate-x-1/2 rotate-[28deg] bg-current opacity-70 transition-transform duration-700 group-hover:rotate-[48deg] motion-reduce:transform-none motion-reduce:transition-none" />
              <div className="absolute left-[-8%] top-1/2 h-px w-[116%] -translate-y-1/2 bg-current opacity-70" />
            </div>

            <div className="absolute bottom-[14%] left-[11%] flex items-center gap-3 text-[0.62rem] font-extrabold uppercase tracking-[0.22em]">
              <span className="h-px w-9 bg-current" />
              {visualLabel}
            </div>
          </div>
        </div>

        <div className={`min-w-0 ${reverse ? "lg:order-1" : ""}`}>
          <div className="flex items-center gap-4 border-b border-[var(--line)] pb-4 text-[0.67rem] font-extrabold uppercase tracking-[0.18em] text-[var(--muted)]">
            <span className="text-[var(--accent)]">{number}</span>
            <span className="min-w-0 truncate">{project.type}</span>
            <span className="ml-auto shrink-0 text-right">{project.period}</span>
          </div>

          <h3 className="font-display mt-7 text-balance text-[clamp(2.45rem,5.6vw,6.2rem)] font-extrabold leading-[0.9] tracking-[-0.065em] text-[var(--text)] transition-[letter-spacing] duration-500 group-hover:tracking-[-0.05em] motion-reduce:transition-none">
            {project.title}
          </h3>

          <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
            {project.description}
          </p>

          <dl className="mt-8 border-y border-[var(--line)] text-sm">
            <div className="grid gap-1 border-b border-[var(--line)] py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-5">
              <dt className="text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-[var(--muted)]">
                Contexte
              </dt>
              <dd className="text-[var(--text)]">{project.organization}</dd>
            </div>
            <div className="grid gap-2 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-5">
              <dt className="text-[0.66rem] font-extrabold uppercase tracking-[0.14em] text-[var(--muted)]">
                Technologies
              </dt>
              <dd>
                <ul
                  className="flex flex-wrap gap-x-2 gap-y-1 text-[var(--text)]"
                  aria-label="Technologies du projet"
                >
                  {project.technologies.map((technology, index) => (
                    <li key={technology} className="inline-flex items-center gap-2">
                      <span>{technology}</span>
                      {index < project.technologies.length - 1 ? (
                        <span className="text-[var(--accent)]" aria-hidden="true">
                          /
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>

          {project.liveUrl || project.sourceUrl ? (
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex min-h-11 items-center gap-2 border-b border-[var(--text)] text-sm font-bold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Voir la démo
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
              {project.sourceUrl ? (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex min-h-11 items-center gap-2 border-b border-[var(--text)] text-sm font-bold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Voir le code
                  <SiGithub
                    className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transform-none"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
