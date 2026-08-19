import { ArrowUp } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import { identity, navigationItems } from "../../data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-9 border-b border-[var(--line)] pb-9 md:grid-cols-[minmax(10rem,0.7fr)_minmax(20rem,1.3fr)_auto] md:items-start">
          <div>
            <a
              href="#accueil"
              className="font-display inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-2xl font-extrabold tracking-[-0.06em] text-[var(--text)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              aria-label="Mame Fatou Faye — retour à l’accueil"
            >
              MF<span className="text-[var(--accent)]">.</span>
            </a>
            <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--muted)]">
              {identity.role} à Dakar.
            </p>
          </div>

          <nav aria-label="Navigation de pied de page">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-md text-sm font-semibold text-[var(--muted)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:justify-end">
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:transform-none"
              aria-label="Profil LinkedIn de Mame Fatou Faye (nouvel onglet)"
            >
              <FaLinkedinIn className="size-[1.125rem]" aria-hidden="true" />
            </a>
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:transform-none"
              aria-label="Profil GitHub de Mame Fatou Faye (nouvel onglet)"
            >
              <SiGithub className="size-[1.125rem]" aria-hidden="true" />
            </a>
            <a
              href="#accueil"
              className="ml-2 inline-flex size-11 items-center justify-center rounded-full bg-[var(--text)] [color:var(--bg)] transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:transform-none"
              aria-label="Retour en haut de la page"
            >
              <ArrowUp className="size-[1.125rem]" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {identity.name}</p>
          <p>Conçu avec React, TypeScript et Motion</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
