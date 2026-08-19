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

        <div className="relative mt-14 grid gap-5 lg:grid-cols-2">
          {education.map((item, index) => (
            <AnimatedReveal key={item.degree} direction={index % 2 === 0 ? "right" : "left"} delay={index * 0.08}>
              <article className="group h-full rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-[border-color,transform] hover:-translate-y-1 hover:border-[var(--accent)] sm:p-8 motion-reduce:transform-none">
                <div className="flex items-start justify-between gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <GraduationCap className="size-6" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1.5 text-xs font-bold text-[var(--accent)]">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    {item.status}
                  </span>
                </div>

                <p className="font-display mt-7 text-sm font-extrabold text-[var(--accent)] transition-transform group-hover:translate-x-1 motion-reduce:transform-none">{item.period}</p>
                <h3 className="font-display mt-2 text-2xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--text)]">{item.degree}</h3>
                <p className="mt-4 leading-7 text-[var(--muted)]">{item.school}</p>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[var(--line)] pt-5 text-sm text-[var(--muted)]">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4 text-[var(--accent)]" aria-hidden="true" />
                    {item.period}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 text-[var(--accent)]" aria-hidden="true" />
                    {item.location}
                  </span>
                </div>
              </article>
            </AnimatedReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Education;
