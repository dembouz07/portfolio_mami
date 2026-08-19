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
          title="Des contextes professionnels concrets"
          description="Des expériences centrées sur le développement d’applications web et la compréhension de besoins métier."
          id="experience-title"
        />

        <TimelineProgress
          className="relative mt-14"
          lineClassName="!left-3 md:!left-[10.25rem]"
        >
          {experiences.map((experience, index) => (
            <TimelineItem
              key={experience.organization}
              index={index}
            >
              <div className="flex items-center gap-3">
                <BriefcaseBusiness
                  className="size-5 shrink-0 text-[var(--accent)]"
                  aria-hidden="true"
                />
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
                  {experience.role}
                </p>
              </div>

              <h3 className="font-display mt-3 max-w-3xl text-2xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--text)] sm:text-3xl">
                {experience.organization}
              </h3>

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
                <ul
                  className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--line)] pt-5"
                  aria-label="Technologies utilisées"
                >
                  {experience.technologies.map((technology) => (
                    <li key={technology}>
                      <TechnologyBadge technology={technology} variant="plain" />
                    </li>
                  ))}
                </ul>
              ) : null}
            </TimelineItem>
          ))}
        </TimelineProgress>
      </Container>
    </section>
  );
}

export default Experience;
