import { BrainCircuit, Languages as LanguagesIcon, MessagesSquare, RefreshCw, UsersRound } from "lucide-react";

import { AnimatedReveal, Container, SectionHeading, StaggerGroup, StaggerItem } from "../components/common";
import { about, languages, qualities } from "../data/portfolio";

const qualityIcons = [RefreshCw, BrainCircuit, UsersRound, MessagesSquare] as const;

export function About() {
  return (
    <section id="a-propos" aria-labelledby="about-title" className="section-shell">
      <Container>
        <SectionHeading eyebrow="01 · À propos" title="Transformer les besoins en solutions claires" id="about-title" />

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <AnimatedReveal className="lg:col-span-9 lg:col-start-3">
            <p className="font-editorial max-w-5xl text-balance text-[clamp(1.9rem,4.2vw,4.35rem)] font-medium leading-[1.05] tracking-[-0.035em] text-[var(--text)]">
              {about}
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-[var(--line)] py-5" aria-label="Langues parlées">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
                <LanguagesIcon className="size-4 text-[var(--accent)]" aria-hidden="true" />
                Langues de travail
              </span>
              <span className="font-display text-lg font-bold tracking-[-0.025em] text-[var(--text)]">
                {languages.join(" / ")}
              </span>
            </div>
          </AnimatedReveal>

          <StaggerGroup as="ul" className="border-t border-[var(--line)] lg:col-span-10 lg:col-start-2">
            {qualities.map((quality, index) => {
              const Icon = qualityIcons[index];
              return (
                <StaggerItem key={quality} as="li" className="group grid min-h-24 grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-[var(--line)] py-5 transition-[padding,color] duration-300 hover:px-3 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:py-7 motion-reduce:transition-none">
                  <span className="font-editorial text-2xl italic text-[var(--accent)]">
                    0{index + 1}
                  </span>
                  <span className="font-display text-base font-bold leading-6 tracking-[-0.02em] text-[var(--text)] sm:text-xl">{quality}</span>
                  <Icon className="size-5 text-[var(--muted)] transition-[color,transform] duration-300 group-hover:rotate-6 group-hover:text-[var(--accent)] motion-reduce:transform-none" aria-hidden="true" />
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
