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
        <div className="fixed inset-0 z-[70] lg:hidden">
          <m.button
            key="mobile-menu-backdrop"
            type="button"
            tabIndex={-1}
            aria-label="Fermer le menu"
            className="absolute inset-0 size-full cursor-default bg-[var(--bg)]/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
          />

          <m.div
            key="mobile-menu-panel"
            ref={panelRef}
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-mobile-title"
            className="absolute inset-y-0 right-0 flex w-[min(88vw,24rem)] flex-col border-l border-[var(--line)] bg-[var(--surface-solid)] p-5 shadow-[var(--shadow)]"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
            transition={{
              duration: reduceMotion ? 0.12 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <p
                id="menu-mobile-title"
                className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[var(--muted)]"
              >
                Navigation
              </p>
              <button
                ref={closeButtonRef}
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--line)] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                aria-label="Fermer le menu"
                onClick={onClose}
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              className="mt-8 flex flex-1 flex-col gap-1 overflow-y-auto"
              aria-label="Navigation mobile"
            >
              {navigationItems.map((item, index) => {
                const isActive = activeSection === item.id;

                return (
                  <m.a
                    key={item.id}
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`font-display group flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 text-base font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                      isActive
                        ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]"
                        : "border-transparent text-[var(--muted)] hover:border-[var(--line)] hover:bg-[var(--bg-soft)] hover:text-[var(--text)]"
                    }`}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: reduceMotion ? 0.1 : 0.28,
                      delay: reduceMotion ? 0 : 0.04 + index * 0.025,
                    }}
                    onClick={onClose}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive
                          ? "bg-[var(--accent)]"
                          : "bg-[var(--line)] group-hover:bg-[var(--accent)]"
                      }`}
                      aria-hidden="true"
                    />
                  </m.a>
                );
              })}
            </nav>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
              <span className="text-sm font-medium text-[var(--muted)]">
                Thème du site
              </span>
              <ThemeToggle />
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export default MobileNavigationDialog;
