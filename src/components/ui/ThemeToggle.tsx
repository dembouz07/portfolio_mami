import { Moon, Sun } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

import { useTheme } from "../../hooks/useTheme";
import { cn } from "../../lib/cn";

export interface ThemeToggleProps {
  readonly className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const label = isDark ? "Activer le thème clair" : "Activer le thème sombre";

  return (
    <m.button
      type="button"
      className={cn(
        "relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] transition-[border-color,background-color,color] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
        className,
      )}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      onClick={toggleTheme}
    >
      <AnimatePresence initial={false} mode="wait">
        <m.span
          key={isDark ? "moon" : "sun"}
          className="absolute inset-0 flex items-center justify-center"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, rotate: -25, scale: 0.75 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 25, scale: 0.75 }}
          transition={{ duration: reduceMotion ? 0.08 : 0.2 }}
          aria-hidden="true"
        >
          {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </m.span>
      </AnimatePresence>
    </m.button>
  );
}

export default ThemeToggle;
