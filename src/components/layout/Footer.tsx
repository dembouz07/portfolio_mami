import { ArrowUp, ArrowUpRight } from "lucide-react";

import { identity, navigationItems } from "../../data/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(28rem,1.2fr)] lg:gap-20 lg:py-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              Portfolio
            </p>
            <a
              href="#accueil"
              className="font-display mt-3 inline-block text-[clamp(5rem,11vw,9rem)] font-extrabold leading-[0.8] tracking-[-0.09em] text-[var(--text)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              aria-label="Mame Fatou Faye — retour à l’accueil"
            >
              MF<span className="text-[var(--accent)]">.</span>
            </a>
            <p className="font-display mt-7 text-2xl font-extrabold tracking-[-0.04em] text-[var(--text)] sm:text-3xl">
              {identity.name}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--muted)] sm:text-base">
              {identity.role}<br />
              {identity.location}
            </p>
          </div>

          <nav aria-label="Navigation de pied de page">
            <ol className="border-b border-[var(--line)]">
              {navigationItems.map((item, index) => (
                <li key={item.id} className="border-t border-[var(--line)]">
                  <a
                    href={item.href}
                    className="group grid min-h-16 grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] items-center gap-2 py-2 text-[var(--text)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)] sm:min-h-20 sm:grid-cols-[3rem_minmax(0,1fr)_1.5rem]"
                  >
                    <span
                      className="font-display text-[0.65rem] font-extrabold tabular-nums tracking-[0.12em] text-[var(--muted)]"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl font-extrabold tracking-[-0.045em] sm:text-3xl">
                      {item.label}
                    </span>
                    <ArrowUpRight
                      className="size-4 justify-self-end transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="grid gap-6 border-t border-[var(--line)] py-6 text-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <a
              href={`mailto:${identity.email}`}
              className="border-b border-[var(--line)] pb-1 font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              E-mail
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-[var(--line)] pb-1 font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              aria-label="LinkedIn de Mame Fatou Faye (nouvel onglet)"
            >
              <span className="inline-flex items-center gap-1.5">
                LinkedIn
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </a>
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-[var(--line)] pb-1 font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              aria-label="GitHub de Mame Fatou Faye (nouvel onglet)"
            >
              <span className="inline-flex items-center gap-1.5">
                GitHub
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </span>
            </a>
            <a
              href="#accueil"
              className="group inline-flex items-center gap-1.5 border-b border-[var(--line)] pb-1 font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              Retour en haut
              <ArrowUp
                className="size-3.5 transition-transform group-hover:-translate-y-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </div>

          <p className="text-xs text-[var(--muted)] sm:text-right">
            © {currentYear} {identity.name}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
