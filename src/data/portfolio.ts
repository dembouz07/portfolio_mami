import type {
  ContactContent,
  Education,
  Experience,
  HeroContent,
  Identity,
  NavigationItem,
  PortfolioStat,
  Project,
  ProjectFilterOption,
  SkillGroup,
} from "../types/portfolio";

export const identity = {
  name: "Mame Fatou Faye",
  role: "Développeuse logiciel & web",
  location: "Malika, Dakar, Sénégal",
  email: "mamefatouf986@gmail.com",
  phoneDisplay: "+221 77 515 39 65",
  phoneHref: "+221775153965",
  linkedin: "https://www.linkedin.com/in/mame-fatou-faye-31a1a2287",
  github: "https://github.com/mamylahi",
  website: "https://mamefatoufaye.tech/",
} as const satisfies Identity;

export const navigationItems = [
  { id: "accueil", label: "Accueil", href: "#accueil" },
  { id: "a-propos", label: "À propos", href: "#a-propos" },
  { id: "competences", label: "Compétences", href: "#competences" },
  { id: "experiences", label: "Expériences", href: "#experiences" },
  { id: "projets", label: "Projets", href: "#projets" },
  { id: "formation", label: "Formation", href: "#formation" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const satisfies readonly NavigationItem[];

/** Alias court conservé pour les composants de navigation. */
export const navItems = navigationItems;

export const hero = {
  eyebrow: "Bonjour, je suis",
  title: identity.name,
  role: identity.role,
  tagline:
    "Je conçois des applications web fiables, intuitives et centrées sur l'utilisateur, de l'interface à la logique métier.",
  availability: "Ouverte aux opportunités",
  primaryCta: "Découvrir mes projets",
  secondaryCta: "Télécharger mon CV",
  portraitAlt: "Portrait de Mame Fatou Faye",
} as const satisfies HeroContent;

export const about =
  "Passionnée par le développement de solutions technologiques utiles, je transforme des besoins concrets en interfaces claires et en applications fiables. Diplômée d'une licence professionnelle en génie logiciel, j'ai travaillé sur des projets académiques et professionnels mobilisant Angular, Laravel, Java, les API REST et les bases de données. Curieuse, rigoureuse et à l'écoute, j'accorde une attention particulière à la qualité du code et à l'expérience utilisateur.";

export const qualities = [
  "Apprentissage rapide de nouvelles technologies.",
  "Analyse et résolution de problèmes techniques.",
  "Collaboration sur des projets en équipe.",
  "Adaptabilité et communication technique.",
] as const;

export const languages = ["Français", "Anglais"] as const;

export const skillGroups = [
  {
    title: "Langages",
    description: "Les fondations de ses solutions web et logicielles.",
    items: ["JavaScript", "TypeScript", "Java", "C#", "PHP"],
  },
  {
    title: "Développement web",
    description: "Des interfaces modernes reliées à une logique métier fiable.",
    items: ["HTML5", "CSS3", "Angular", "Tailwind CSS", "Laravel", "API REST"],
  },
  {
    title: "Bases de données",
    description: "Des outils relationnels pour structurer et interroger les données.",
    items: ["PostgreSQL", "MySQL", "Oracle", "SQL"],
  },
  {
    title: "Applications desktop",
    description: "Des technologies adaptées aux applications métier de bureau.",
    items: ["JavaFX", "WinDev", ".NET"],
  },
] as const satisfies readonly SkillGroup[];

export const experiences = [
  {
    organization: "Ministère de la Formation professionnelle et technique",
    role: "Développeuse web - Stagiaire",
    period: null,
    location: "Dakar, Sénégal",
    description: "Stage en développement web au sein du ministère.",
    highlights: [],
    technologies: [],
  },
  {
    organization: "SUN TELECOM",
    role: "Développeuse Front-End - Stagiaire",
    period: "Novembre 2024 - Février 2025",
    location: "Ouest Foire, Dakar",
    description:
      "Participation à deux projets web menés dans un environnement professionnel.",
    highlights: [
      "Développement avec Angular d'une plateforme de gestion de rendez-vous pour les médecins.",
      "Participation à une application destinée à une banque de microfinance.",
    ],
    technologies: ["Angular", "TypeScript", "API REST"],
  },
] as const satisfies readonly Experience[];

export const projects = [
  {
    title: "Plateforme de gestion de rendez-vous médicaux",
    type: "Mémoire de fin de cycle",
    organization: "Institut Supérieur d'Informatique - Campus de Keur Massar",
    period: "Décembre 2025",
    description:
      "Conception d'une plateforme permettant à une clinique de planifier ses rendez-vous, d'éviter les conflits horaires et de gérer les dossiers médicaux de manière sécurisée.",
    technologies: ["Laravel", "Angular", "PostgreSQL", "JWT", "Tailwind CSS"],
    categories: ["web", "academic"],
    featured: true,
    liveUrl: null,
    sourceUrl: null,
  },
  {
    title: "Gestion des prêts de matériel informatique",
    type: "Projet académique",
    organization: "Institut Supérieur d'Informatique - Campus de Keur Massar",
    period: "Mars 2025 - Avril 2025",
    description:
      "Application de suivi des utilisateurs, des techniciens, du matériel et des prêts effectués au sein d'une organisation.",
    technologies: ["WinDev", "Base de données", "Gestion des utilisateurs"],
    categories: ["desktop", "academic"],
    featured: false,
    liveUrl: null,
    sourceUrl: null,
  },
  {
    title: "Gestion d'une librairie en ligne",
    type: "Projet web",
    organization: "Institut Supérieur d'Informatique - Campus de Keur Massar",
    period: "Février 2025 - Mars 2025",
    description:
      "Application web de gestion des livres, des auteurs, des catégories et des commandes avec suivi des opérations.",
    technologies: ["Laravel", "Tailwind CSS", "PHP", "MySQL"],
    categories: ["web", "academic"],
    featured: false,
    liveUrl: null,
    sourceUrl: null,
  },
  {
    title: "Gestion des présences des professeurs",
    type: "Projet desktop",
    organization: "Institut Supérieur d'Informatique - Campus de Keur Massar",
    period: "Février 2025 - Mars 2025",
    description:
      "Application JavaFX de gestion des professeurs, des cours et des salles, avec affichage des cours du jour pour chaque professeur connecté.",
    technologies: ["JavaFX", "Java", "Base de données"],
    categories: ["desktop", "academic"],
    featured: false,
    liveUrl: null,
    sourceUrl: null,
  },
] as const satisfies readonly Project[];

export const projectFilters = [
  { value: "all", label: "Tous" },
  { value: "web", label: "Web" },
  { value: "desktop", label: "Desktop" },
  { value: "academic", label: "Académique" },
] as const satisfies readonly ProjectFilterOption[];

export const education = [
  {
    degree: "Licence professionnelle en Génie Logiciel",
    school: "Institut Supérieur d'Informatique - Campus de Keur Massar",
    period: "2022 - Décembre 2025",
    location: "Keur Massar, Sénégal",
    status: "Obtenue",
  },
  {
    degree: "Baccalauréat S2",
    school: "Lycée Seydina Limamoulaye",
    period: "2019 - 2022",
    location: "Guédiawaye, Sénégal",
    status: "Obtenu",
  },
] as const satisfies readonly Education[];

export const contact = {
  title: "Construisons quelque chose d'utile",
  description:
    "Vous avez un projet, une opportunité ou simplement envie d'échanger ? Écrivez-moi.",
} as const satisfies ContactContent;

export const cvPath = "/cv/CV-Mame-Fatou-Faye.pdf" as const;
/** Passer à `true` uniquement après avoir ajouté le PDF réel dans `public/cv/`. */
export const cvAvailable: boolean = false;

const licenceYear = education[0].period.match(/\d{4}$/u)?.[0] ?? "";

export const portfolioStats = [
  { label: "Projets présentés", value: String(projects.length) },
  { label: "Expériences", value: String(experiences.length) },
  { label: "Licence obtenue", value: licenceYear },
] as const satisfies readonly PortfolioStat[];
