import type { ElementType } from "react";
import {
  Braces,
  Code2,
  Database,
  MonitorCog,
  Users,
} from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { FaJava } from "react-icons/fa6";
import {
  SiAngular,
  SiCss,
  SiDotnet,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiPostgresql,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import { cn } from "../../lib/cn";
import { staggerItem, transitions } from "../../lib/motion";

const technologyIcons: Readonly<Record<string, ElementType>> = {
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Java: FaJava,
  JavaFX: FaJava,
  "C#": SiSharp,
  PHP: SiPhp,
  HTML5: SiHtml5,
  CSS3: SiCss,
  Angular: SiAngular,
  "Tailwind CSS": SiTailwindcss,
  Laravel: SiLaravel,
  "API REST": Braces,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Oracle: Database,
  SQL: Database,
  WinDev: MonitorCog,
  ".NET": SiDotnet,
  JWT: SiJsonwebtokens,
  "Base de données": Database,
  "Gestion des utilisateurs": Users,
};

export interface TechnologyBadgeProps {
  readonly technology: string;
  readonly className?: string;
  readonly showIcon?: boolean;
  readonly variant?: "pill" | "plain";
}

export function TechnologyBadge({
  technology,
  className,
  showIcon = true,
  variant = "pill",
}: TechnologyBadgeProps) {
  const reduceMotion = useReducedMotion();
  const Icon = technologyIcons[technology] ?? Code2;

  return (
    <m.span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)]",
        variant === "pill"
          ? "min-h-9 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 transition-[border-color,background-color,color] hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]"
          : "min-h-8 py-1 transition-colors hover:text-[var(--accent)]",
        className,
      )}
      variants={reduceMotion ? undefined : staggerItem}
      whileHover={reduceMotion ? undefined : { y: variant === "pill" ? -3 : -2 }}
      transition={transitions.spring}
    >
      {showIcon ? (
        <span
          className="flex size-4 shrink-0 items-center justify-center text-[var(--accent)]"
          aria-hidden="true"
        >
          <Icon className="size-4" />
        </span>
      ) : null}
      <span>{technology}</span>
    </m.span>
  );
}

export default TechnologyBadge;
