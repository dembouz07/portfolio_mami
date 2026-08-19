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

        <StaggerGroup className="mt-12 grid gap-4 md:grid-cols-2" stagger={0.1}>
          {skillGroups.map((group) => (
            <StaggerItem key={group.title} className="skill-card rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Code2 className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold tracking-[-0.035em] text-[var(--text)]">{group.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{group.description}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5" aria-label={`Technologies : ${group.title}`}>
                {group.items.map((technology) => (
                  <TechnologyBadge key={technology} technology={technology} />
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

export default Skills;
