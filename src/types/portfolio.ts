export type Theme = "light" | "dark";

export type SectionId =
  | "accueil"
  | "a-propos"
  | "competences"
  | "experiences"
  | "projets"
  | "formation"
  | "contact";

export interface NavigationItem {
  readonly id: SectionId;
  readonly label: string;
  readonly href: `#${SectionId}`;
}

export interface Identity {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly email: string;
  readonly phoneDisplay: string;
  readonly phoneHref: string;
  readonly linkedin: string;
  readonly github: string;
  readonly website: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly role: string;
  readonly tagline: string;
  readonly availability: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly portraitAlt: string;
}

export interface SkillGroup {
  readonly title: string;
  readonly description: string;
  readonly items: readonly string[];
}

export interface Experience {
  readonly organization: string;
  readonly role: string;
  readonly period?: string | null;
  readonly location: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly technologies: readonly string[];
}

export type ProjectCategory = "web" | "desktop" | "academic";
export type ProjectFilter = "all" | ProjectCategory;

export interface Project {
  readonly title: string;
  readonly type: string;
  readonly organization: string;
  readonly period: string;
  readonly description: string;
  readonly technologies: readonly string[];
  readonly categories: readonly ProjectCategory[];
  readonly featured: boolean;
  readonly liveUrl?: string | null;
  readonly sourceUrl?: string | null;
}

export interface ProjectFilterOption {
  readonly value: ProjectFilter;
  readonly label: string;
}

export interface Education {
  readonly degree: string;
  readonly school: string;
  readonly period: string;
  readonly location: string;
  readonly status: string;
}

export interface PortfolioStat {
  readonly label: string;
  readonly value: string;
}

export interface ContactContent {
  readonly title: string;
  readonly description: string;
}

export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly website?: string;
}
