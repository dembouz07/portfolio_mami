import { useEffect, useRef, type RefObject } from "react";
import { X } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { navigationItems } from "../../data/portfolio";
import { ThemeToggle } from "../ui/ThemeToggle";

const focusableElementsSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

interface MobileNavigationDialogProps {
  readonly activeSection: string;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly returnFocusRef: RefObject<HTMLButtonElement | null>;
}

export function MobileNavigationDialog({
  activeSection,
  isOpen,
  onClose,
  returnFocusRef,
}: MobileNavigationDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previouslyFocused = returnFocusRef.current ??
      (document.activeElement as HTMLElement | null);
    const previousOverflow = document.body.style.overflow;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableElementsSelector),
      ).filter((element) => !element.hasAttribute("disabled"));
      const firstElement = focusableElements.at(0);
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose, returnFocusRef]);

  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <m.div
          key="mobile-menu-panel"
          ref={panelRef}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-mobile-title"
          className="fixed inset-0 z-[70] overflow-y-auto bg-[var(--surface-solid)] lg:hidden"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{
            duration: reduceMotion ? 0.1 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 sm:px-6">
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-[var(--line)]">
              <span className="font-display text-xl font-extrabold tracking-[-0.06em] text-[var(--text)]">
                MF<span className="text-[var(--accent)]">.</span>
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex min-h-11 items-center gap-2 border-b border-[var(--line)] px-1 text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                aria-label="Fermer le menu"
                onClick={onClose}
              >
                <span className="font-display text-xs font-extrabold uppercase tracking-[0.14em]">
                  Fermer
                </span>
                <X className="size-[1.125rem]" aria-hidden="true" />
              </button>
            </div>

            <div className="grid flex-1 content-start gap-5 py-6 sm:grid-cols-[minmax(8rem,0.35fr)_minmax(0,1fr)] sm:gap-10 sm:py-10">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                  Navigation principale
                </p>
                <h2
                  id="menu-mobile-title"
                  className="font-display mt-2 text-3xl font-extrabold tracking-[-0.05em] text-[var(--text)] sm:text-4xl"
                >
                  Sommaire
                </h2>
              </div>

              <nav aria-label="Navigation mobile">
                <ol className="border-b border-[var(--line)]">
                  {navigationItems.map((item, index) => {
                    const isActive = activeSection === item.id;

                    return (
                      <li key={item.id} className="border-t border-[var(--line)]">
                        <m.a
                          href={item.href}
                          aria-current={isActive ? "true" : undefined}
                          className={`font-display group grid min-h-16 grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-2 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)] sm:min-h-20 sm:grid-cols-[3rem_minmax(0,1fr)_auto] ${
                            isActive
                              ? "text-[var(--text)]"
                              : "text-[var(--muted)] hover:text-[var(--text)]"
                          }`}
                          initial={
                            reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: reduceMotion ? 0.08 : 0.3,
                            delay: reduceMotion ? 0 : 0.035 + index * 0.025,
                          }}
                          onClick={onClose}
                        >
                          <span
                            className={`text-xs font-extrabold tabular-nums tracking-[0.12em] ${
                              isActive ? "text-[var(--accent)]" : "text-[var(--muted)]"
                            }`}
                            aria-hidden="true"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[clamp(1.55rem,7vw,2.5rem)] font-extrabold leading-none tracking-[-0.045em]">
                            {item.label}
                          </span>
                          <span
                            className={`text-[0.6rem] font-bold uppercase tracking-[0.12em] ${
                              isActive
                                ? "text-[var(--accent)]"
                                : "opacity-0 transition-opacity group-hover:opacity-100"
                            }`}
                            aria-hidden="true"
                          >
                            {isActive ? "Actuel" : "Ouvrir"}
                          </span>
                        </m.a>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>

            <div className="flex min-h-16 shrink-0 items-center justify-between border-t border-[var(--line)] py-3">
              <span className="text-sm font-medium text-[var(--muted)]">
                Apparence
              </span>
              <ThemeToggle className="size-9 rounded-none border-0 bg-transparent hover:bg-transparent" />
            </div>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

export default MobileNavigationDialog;
