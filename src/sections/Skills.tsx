import { Code2 } from "lucide-react";

import { Container, SectionHeading, StaggerGroup, StaggerItem, TechnologyBadge } from "../components/common";
import { skillGroups } from "../data/portfolio";

export function Skills() {
  return (
    <section id="competences" aria-labelledby="skills-title" className="section-shell bg-[var(--bg-soft)]">
      <Container>
        <SectionHeading
          eyebrow="02 · Compétences"
          title="Une boîte à outils orientée produit"
          description="Des technologies complémentaires pour construire l’interface, la logique métier et les fondations de données d’une application."
          id="skills-title"
        />

        <StaggerGroup
          as="ol"
          className="mt-14 border-y border-[var(--line)]"
          stagger={0.1}
          ariaLabel="Inventaire des compétences"
        >
          {skillGroups.map((group, index) => (
            <StaggerItem
              key={group.title}
              as="li"
              className="grid gap-6 border-b border-[var(--line)] py-8 last:border-b-0 sm:py-10 md:grid-cols-[4.5rem_minmax(12rem,0.8fr)_minmax(0,1.2fr)] md:gap-x-8 lg:grid-cols-[5.5rem_minmax(14rem,0.75fr)_minmax(0,1.25fr)] lg:gap-x-10"
            >
              <span
                className="font-display text-4xl font-extrabold leading-none tracking-[-0.06em] text-[var(--accent)] sm:text-5xl"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <div className="flex items-center gap-3 text-[var(--accent)]">
                  <Code2 className="size-5 shrink-0" aria-hidden="true" />
                  <h3 className="font-display text-xl font-extrabold tracking-[-0.035em] text-[var(--text)] sm:text-2xl">
                    {group.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
                  {group.description}
                </p>
              </div>

              <ul
                className="grid content-start gap-x-8 sm:grid-cols-2"
                aria-label={`Technologies : ${group.title}`}
              >
                {group.items.map((technology) => (
                  <li key={technology} className="border-t border-[var(--line)] py-3">
                    <TechnologyBadge
                      technology={technology}
                      variant="plain"
                      className="w-full"
                    />
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

export default Skills;
