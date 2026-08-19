import { CalendarDays, CheckCircle2, GraduationCap, MapPin } from "lucide-react";

import { AnimatedReveal, Container, SectionHeading } from "../components/common";
import { education } from "../data/portfolio";

export function Education() {
  return (
    <section id="formation" aria-labelledby="education-title" className="section-shell bg-[var(--bg-soft)]">
      <Container>
        <SectionHeading
          eyebrow="05 · Formation"
          title="Un parcours ancré dans le génie logiciel"
          description="Des bases scientifiques puis une spécialisation professionnelle pour concevoir des logiciels utiles et robustes."
          id="education-title"
        />

        <div className="relative mt-14 border-y border-[var(--line)]">
          {education.map((item, index) => (
            <AnimatedReveal
              key={item.degree}
              direction="up"
              delay={index * 0.08}
              className="border-b border-[var(--line)] last:border-b-0"
            >
              <article className="grid gap-7 py-9 sm:py-11 md:grid-cols-[minmax(12rem,0.7fr)_minmax(0,1.3fr)] md:gap-x-10 lg:grid-cols-[minmax(15rem,0.8fr)_minmax(0,1.4fr)_auto] lg:gap-x-12 lg:py-14">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    <span>Période</span>
                  </div>
                  <p className="font-display mt-4 text-4xl font-extrabold leading-[0.98] tracking-[-0.06em] text-[var(--text)] sm:text-5xl lg:text-6xl">
                    {item.period}
                  </p>
                </div>

                <div>
                  <div className="flex items-start gap-3">
                    <GraduationCap
                      className="mt-1 size-6 shrink-0 text-[var(--accent)]"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--text)] sm:text-3xl">
                        {item.degree}
                      </h3>
                      <p className="mt-4 leading-7 text-[var(--muted)]">{item.school}</p>
                    </div>
                  </div>

                  <p className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
                    <MapPin className="size-4 text-[var(--accent)]" aria-hidden="true" />
                    {item.location}
                  </p>
                </div>

                <p className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] md:col-start-2 lg:col-start-3 lg:row-start-1 lg:justify-self-end">
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                  {item.status}
                </p>
              </article>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Education;
