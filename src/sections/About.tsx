import { BrainCircuit, Languages as LanguagesIcon, MessagesSquare, RefreshCw, UsersRound } from "lucide-react";

import { AnimatedReveal, Container, SectionHeading, StaggerGroup, StaggerItem } from "../components/common";
import { about, languages, qualities } from "../data/portfolio";

const qualityIcons = [RefreshCw, BrainCircuit, UsersRound, MessagesSquare] as const;

export function About() {
  return (
    <section id="a-propos" aria-labelledby="about-title" className="section-shell">
      <Container>
        <SectionHeading eyebrow="01 · À propos" title="Développeuse web à Dakar, du besoin à la solution" id="about-title" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:gap-16">
          <AnimatedReveal>
            <p className="max-w-3xl text-balance text-xl leading-[1.75] tracking-[-0.015em] text-[var(--text)] sm:text-2xl">
              {about}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-[var(--line)] pt-7" aria-label="Langues parlées">
              <span className="mr-2 inline-flex items-center gap-2 text-sm font-bold text-[var(--text)]">
                <LanguagesIcon className="size-4 text-[var(--accent)]" aria-hidden="true" />
                Langues
              </span>
              {languages.map((language) => (
                <span key={language} className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--muted)]">
                  {language}
                </span>
              ))}
            </div>
          </AnimatedReveal>

          <StaggerGroup as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {qualities.map((quality, index) => {
              const Icon = qualityIcons[index];
              return (
                <StaggerItem key={quality} as="li" className="quality-item flex min-h-24 items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-bold leading-6 text-[var(--text)]">{quality}</span>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </Container>
    </section>
  );
}

export default About;
