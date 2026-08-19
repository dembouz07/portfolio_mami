import { BriefcaseBusiness, CalendarDays, CheckCircle2, MapPin } from "lucide-react";

import { Container, SectionHeading, TechnologyBadge, TimelineProgress } from "../components/common";
import { TimelineItem } from "../components/ui";
import { experiences } from "../data/portfolio";

export function Experience() {
  return (
    <section id="experiences" aria-labelledby="experience-title" className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="03 · Expériences"
          title="Expériences en développement web"
          description="Des expériences centrées sur le développement d’applications web et la compréhension de besoins métier."
          id="experience-title"
        />

        <TimelineProgress
          className="relative mt-14 space-y-8 md:space-y-12"
          lineClassName="md:left-1/2"
        >
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.organization}
              index={index}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <BriefcaseBusiness className="size-5" aria-hidden="true" />
                </span>
                <span className="font-display text-sm font-extrabold text-[var(--accent)]">0{index + 1}</span>
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">{experience.role}</p>
              <h3 className="font-display mt-2 text-xl font-extrabold leading-tight tracking-[-0.035em] text-[var(--text)] sm:text-2xl">{experience.organization}</h3>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]">
                {experience.period ? (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4 text-[var(--accent)]" aria-hidden="true" />
                    {experience.period}
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-[var(--accent)]" aria-hidden="true" />
                  {experience.location}
                </span>
              </div>

              <p className="mt-5 leading-7 text-[var(--muted)]">{experience.description}</p>

              {experience.highlights.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-[var(--text)]">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {experience.technologies.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2" aria-label="Technologies utilisées">
                  {experience.technologies.map((technology) => (
                    <TechnologyBadge key={technology} technology={technology} />
                  ))}
                </div>
              ) : null}
            </TimelineItem>
          ))}
        </TimelineProgress>
      </Container>
    </section>
  );
}

export default Experience;
