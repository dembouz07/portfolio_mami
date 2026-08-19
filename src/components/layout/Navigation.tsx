import { useCallback, useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { m, useReducedMotion } from "motion/react";

import { navigationItems } from "../../data/portfolio";
import { useActiveSection } from "../../hooks/useActiveSection";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MobileNavigationDialog } from "./MobileNavigationDialog";

const navigationSectionIds = navigationItems.map((item) => item.id);

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const activeSection = useActiveSection(navigationSectionIds);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktopViewport = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMenu();
      }
    };

    desktopQuery.addEventListener("change", handleDesktopViewport);
    return () => {
      desktopQuery.removeEventListener("change", handleDesktopViewport);
    };
  }, [closeMenu]);

  return (
    <>
      <a
        href="#contenu-principal"
        className="fixed left-4 top-3 z-[100] -translate-y-24 border border-[var(--text)] bg-[var(--text)] px-5 py-3 text-sm font-bold [color:var(--bg)] transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-bright)] motion-reduce:transition-none"
      >
        Aller au contenu
      </a>

      <m.header
        initial={reduceMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0.12 : 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none ${
          isScrolled
            ? "border-[var(--line)] bg-[var(--nav)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
        data-scrolled={isScrolled ? "true" : "false"}
      >
        <nav
          className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
          aria-label="Navigation principale"
        >
          <a
            href="#accueil"
            className="font-display relative z-10 inline-flex min-h-11 min-w-11 items-center justify-start text-xl font-extrabold tracking-[-0.06em] text-[var(--text)] transition-colors hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
            aria-label="Mame Fatou Faye — retour à l’accueil"
          >
            MF<span className="text-[var(--accent)]">.</span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item, index) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex min-h-11 items-baseline gap-1.5 px-2 text-[0.8125rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                    isActive
                      ? "text-[var(--text)]"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                >
                  <span
                    className={`font-display text-[0.58rem] font-extrabold tabular-nums tracking-[0.08em] ${
                      isActive ? "text-[var(--accent)]" : "text-[var(--muted)]"
                    }`}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="relative z-10">{item.label}</span>
                  {isActive ? (
                    <m.span
                      layoutId="desktop-active-navigation"
                      className="absolute inset-x-2 bottom-1 h-px bg-[var(--accent)]"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 36 }
                      }
                      aria-hidden="true"
                    />
                  ) : null}
                </a>
              );
            })}
          </div>

          <div className="hidden items-center border-l border-[var(--line)] pl-4 lg:flex">
            <ThemeToggle className="size-9 rounded-none border-0 bg-transparent hover:bg-transparent" />
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="relative z-10 inline-flex min-h-11 items-center justify-center gap-2 border-b border-[var(--line)] px-1 text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] lg:hidden"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            <span className="font-display text-xs font-extrabold uppercase tracking-[0.14em]">
              Menu
            </span>
            <Menu className="size-[1.125rem]" aria-hidden="true" />
          </button>
        </nav>
      </m.header>

      <MobileNavigationDialog
        activeSection={activeSection}
        isOpen={isMenuOpen}
        onClose={closeMenu}
        returnFocusRef={menuButtonRef}
      />
    </>
  );
}

export default Navigation;
