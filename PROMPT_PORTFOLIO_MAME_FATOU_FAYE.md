# Prompt complet - Portfolio moderne de Mame Fatou Faye

## Rôle et mission

Tu es un développeur front-end senior, UI/UX designer et spécialiste des interfaces React animées. Tu dois concevoir et implémenter de bout en bout un portfolio professionnel premium pour **Mame Fatou Faye**, développeuse logiciel et web basée à Dakar.

Ne t'arrête pas à une maquette, à un plan ou à des extraits de code. Inspecte d'abord le dépôt existant, puis réalise l'application complète, lance les tests et corrige les erreurs jusqu'à obtenir un résultat réellement prêt à être déployé sur Vercel.

Si le dépôt contient déjà une application, améliore-la proprement sans supprimer les contenus ou fichiers utiles. S'il est vide, initialise le projet avec Vite, React et TypeScript.

## Sources à exploiter

- CV fourni : `CV Mame Fatou_FAYE.pdf (1).pdf` - adapter le chemin réel dans le dépôt.
- Ancien portfolio : <https://portfolio-mami.vercel.app/>
- Référence de palette uniquement : <https://ousseynoufaye.dev/>
- Portrait actuellement utilisé sur l'ancien portfolio : <https://image.noelshack.com/fichiers/2026/05/6/1769872654-photo-2026-01-31-15-17-10.jpg>

Utilise les informations consolidées ci-dessous comme source de vérité. L'ancien portfolio sert à récupérer les contenus et les assets utiles, mais il ne faut pas reproduire son design. Le portfolio d'Ousseynou sert uniquement de référence pour les couleurs et l'ambiance clair/sombre, pas pour copier la mise en page.

## Contraintes absolues

1. Tout le contenu visible doit être en français correct et naturel.
2. Utiliser systématiquement le féminin : « développeuse », jamais « développeur » pour parler de Mame Fatou.
3. Ne rien inventer : aucune fausse entreprise, aucun faux chiffre, aucun faux témoignage, aucun faux diplôme, aucune fausse date, aucun faux lien de démonstration et aucun faux dépôt GitHub.
4. Ne pas afficher de pourcentages arbitraires pour les compétences.
5. Ne pas utiliser d'emojis comme icônes, de caractères Unicode décoratifs ou de faux logos dessinés approximativement.
6. Utiliser de vraies icônes SVG avec Lucide React pour l'interface et Simple Icons via `react-icons/si` pour les technologies et les marques.
7. Ne pas utiliser de photos de stock génériques. Utiliser le vrai portrait fourni par l'ancien portfolio, le télécharger, l'optimiser et le servir localement.
8. Le résultat doit être original, moderne, haut de gamme, lisible et crédible pour une candidature professionnelle.
9. Les animations doivent enrichir l'expérience sans ralentir le site ni fatiguer l'utilisateur.
10. Respecter `prefers-reduced-motion` et rendre toutes les interactions utilisables au clavier.

## Stack technique imposée

- React 19 avec TypeScript en mode strict.
- Vite, avec la dernière version stable compatible avec le projet.
- Tailwind CSS v4 avec le plugin officiel `@tailwindcss/vite`.
- Motion for React via le package `motion` et les imports depuis `motion/react` ; ne pas installer l'ancien package `framer-motion` dans un nouveau projet.
- `lucide-react` pour toutes les icônes d'interface.
- `react-icons/si` pour les logos technologiques officiels et `react-icons/fa6` uniquement lorsque Simple Icons ne fournit pas le logo nécessaire, par exemple Java.
- `react-hook-form`, `zod` et `@hookform/resolvers` pour le formulaire de contact.
- `clsx` et `tailwind-merge` pour composer proprement les classes.
- Polices locales avec `@fontsource-variable/manrope` pour les titres et `@fontsource-variable/dm-sans` pour les textes.
- ESLint, TypeScript, Vitest et Testing Library. Ajouter un test Playwright de fumée si l'environnement le permet.

N'ajoute pas React Router pour ce portfolio monopage. Utilise des ancres sémantiques et un défilement fluide correctement compensé par la hauteur de la navigation.

## Direction artistique

Créer une identité **tech éditoriale, élégante et féminine sans clichés** : grandes respirations, grille nette, surfaces translucides légères, typographie expressive, bordures fines, profondeur subtile et accent vert menthe. Éviter le rose automatique, les cartes partout, les énormes titres illisibles et l'effet « template générique ».

Le site doit proposer un thème clair et un thème sombre. Au premier chargement, respecter le thème du système. Ajouter ensuite un bouton de bascule clair/sombre et mémoriser le choix dans `localStorage`.

### Palette obligatoire inspirée du portfolio d'Ousseynou

Définir les couleurs comme des design tokens CSS, puis les utiliser partout. Ne pas disperser des couleurs codées en dur dans les composants.

```css
:root {
  --bg: #f5f7f9;
  --bg-soft: #edf1f4;
  --surface: rgba(255, 255, 255, 0.76);
  --surface-solid: #ffffff;
  --surface-strong: #e4eaf0;
  --text: #111b23;
  --muted: #60707b;
  --line: rgba(17, 27, 35, 0.12);
  --accent: #0b7b64;
  --accent-bright: #5ee6b2;
  --accent-soft: rgba(11, 123, 100, 0.1);
  --violet: #7856ff;
  --shadow: 0 24px 70px rgba(24, 38, 49, 0.11);
  --nav: rgba(245, 247, 249, 0.82);
}

.dark {
  --bg: #05090d;
  --bg-soft: #09111a;
  --surface: rgba(14, 23, 32, 0.74);
  --surface-solid: #0e1720;
  --surface-strong: #17232e;
  --text: #f2f6f8;
  --muted: #96a7b2;
  --line: rgba(221, 236, 246, 0.11);
  --accent: #68edbb;
  --accent-bright: #a0ffd5;
  --accent-soft: rgba(104, 237, 187, 0.1);
  --violet: #9e8aff;
  --shadow: 0 28px 80px rgba(0, 0, 0, 0.32);
  --nav: rgba(5, 9, 13, 0.84);
}
```

Le vert est la couleur d'action principale. Le violet ne sert qu'en accent secondaire très mesuré. Garantir un contraste WCAG AA pour tous les textes, boutons, liens et états de focus.

## Architecture de la page

Construire la page dans cet ordre :

1. Navigation fixe.
2. Hero.
3. À propos.
4. Compétences.
5. Expériences professionnelles.
6. Projets sélectionnés.
7. Formation.
8. Contact.
9. Footer.

Navigation : **Accueil, À propos, Compétences, Expériences, Projets, Formation, Contact**.

La navigation doit :

- être transparente en haut puis devenir légèrement vitrée au défilement ;
- afficher un monogramme texte simple `MF.` ;
- indiquer automatiquement la section active avec `aria-current="true"` ;
- comporter le bouton de thème ;
- proposer un menu mobile animé, accessible, fermé avec Échap et après sélection d'un lien ;
- contenir un lien d'évitement « Aller au contenu » visible au focus.

## Contenu exact à intégrer

Centraliser toutes les données dans `src/data/portfolio.ts`. Les composants ne doivent pas contenir de grandes chaînes de contenu dupliquées.

### Identité et contact

```ts
export const identity = {
  name: "Mame Fatou Faye",
  role: "Développeuse logiciel & web",
  location: "Malika, Dakar, Sénégal",
  email: "mamefatouf986@gmail.com",
  phoneDisplay: "+221 77 515 39 65",
  phoneHref: "+221775153965",
  linkedin: "https://www.linkedin.com/in/mame-fatou-faye-31a1a2287",
  github: "https://github.com/mamylahi",
  website: "https://portfolio-mami.vercel.app/",
};
```

Utiliser l'adresse e-mail du CV ci-dessus. Ne pas réintroduire l'ancienne adresse `lahiimami@gmail.com` présente sur l'ancien site.

### Hero

- Surtitre : `Bonjour, je suis`
- Titre : `Mame Fatou Faye`
- Métier : `Développeuse logiciel & web`
- Accroche : `Je conçois des applications web fiables, intuitives et centrées sur l'utilisateur, de l'interface à la logique métier.`
- Badge discret : `Ouverte aux opportunités`
- CTA principal : `Découvrir mes projets`
- CTA secondaire : `Télécharger mon CV`
- Liens icônes : LinkedIn, GitHub et e-mail, avec libellés accessibles.

Le portrait doit être présent dans le hero avec une composition asymétrique originale. Télécharger l'image distante, la recadrer proprement sans déformer le visage et produire au minimum des versions WebP et AVIF. La servir depuis `src/assets` ou `public/images` avec `width`, `height`, `srcSet`, `sizes` et un texte alternatif utile : `Portrait de Mame Fatou Faye`.

Ajouter sous le hero trois indicateurs calculés depuis les données, sans chiffres inventés : nombre de projets présentés, nombre d'expériences et année d'obtention de la licence. Ne pas écrire de nombre d'années d'expérience.

### À propos

Utiliser ce texte, avec seulement de légers ajustements typographiques si nécessaire :

> Passionnée par le développement de solutions technologiques utiles, je transforme des besoins concrets en interfaces claires et en applications fiables. Diplômée d'une licence professionnelle en génie logiciel, j'ai travaillé sur des projets académiques et professionnels mobilisant Angular, Laravel, Java, les API REST et les bases de données. Curieuse, rigoureuse et à l'écoute, j'accorde une attention particulière à la qualité du code et à l'expérience utilisateur.

Ajouter les qualités suivantes sous forme de petites cartes ou de lignes illustrées :

- Apprentissage rapide de nouvelles technologies.
- Analyse et résolution de problèmes techniques.
- Collaboration sur des projets en équipe.
- Adaptabilité et communication technique.

Langues : `Français` et `Anglais`. Ne pas afficher de niveau C1, B1 ou autre niveau non confirmé.

### Compétences

Présenter les compétences en groupes, avec de vrais logos, un libellé et une courte phrase. Ne pas utiliser de jauges ni de pourcentages.

```ts
export const skillGroups = [
  {
    title: "Langages",
    items: ["JavaScript", "TypeScript", "Java", "C#", "PHP"],
  },
  {
    title: "Développement web",
    items: ["HTML5", "CSS3", "Angular", "Tailwind CSS", "Laravel", "API REST"],
  },
  {
    title: "Bases de données",
    items: ["PostgreSQL", "MySQL", "Oracle", "SQL"],
  },
  {
    title: "Applications desktop",
    items: ["JavaFX", "WinDev", ".NET"],
  },
];
```

Pour une technologie sans logo officiel disponible dans les bibliothèques choisies, utiliser une icône Lucide générique cohérente avec son libellé. Ne jamais inventer un logo de marque.

### Expériences professionnelles

Afficher une timeline élégante et responsive. Séparer clairement les expériences professionnelles des projets académiques.

```ts
export const experiences = [
  {
    organization: "Ministère de l'Enseignement et de la Formation professionnelle et technique",
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
    description: "Participation à deux projets web menés dans un environnement professionnel.",
    highlights: [
      "Développement avec Angular d'une plateforme de gestion de rendez-vous pour les médecins.",
      "Participation à une application destinée à une banque de microfinance.",
    ],
    technologies: ["Angular", "TypeScript", "API REST"],
  },
];
```

La période du stage au ministère n'a pas été fournie. Le type `Experience` doit donc accepter `period?: string | null` et l'interface ne doit afficher ni champ vide ni texte « À préciser ». Ne jamais inventer la date. Même règle pour les missions et technologies : ne pas en ajouter sans nouvelle information.

### Projets sélectionnés

Créer quatre grandes cartes de projets. Chaque carte doit contenir : type, titre, période, contexte, description, technologies et une composition visuelle abstraite produite en CSS à partir des couleurs du projet. Ne pas utiliser de photo de stock. Ne pas afficher de bouton « Démo » ou « Code » tant qu'une URL réelle n'est pas fournie.

```ts
export const projects = [
  {
    title: "Plateforme de gestion de rendez-vous médicaux",
    type: "Mémoire de fin de cycle",
    organization: "Institut Supérieur d'Informatique - Campus de Keur Massar",
    period: "Décembre 2025",
    description:
      "Conception d'une plateforme permettant à une clinique de planifier ses rendez-vous, d'éviter les conflits horaires et de gérer les dossiers médicaux de manière sécurisée.",
    technologies: ["Laravel", "Angular", "PostgreSQL", "JWT", "Tailwind CSS"],
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
    featured: false,
    liveUrl: null,
    sourceUrl: null,
  },
];
```

Ajouter des filtres accessibles `Tous`, `Web`, `Desktop` et `Académique`. Les filtres doivent animer la réorganisation des cartes avec les layout animations de Motion. Le projet de fin de cycle doit avoir une mise en avant visuelle plus grande sur desktop, sans casser la lecture sur mobile.

### Formation

```ts
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
];
```

Ne pas ajouter le collège : cette information n'est pas nécessaire dans un portfolio professionnel moderne.

### Contact

Créer une section de contact claire avec :

- un titre direct : `Construisons quelque chose d'utile` ;
- l'e-mail, le téléphone, la localisation, LinkedIn et GitHub ;
- des liens réellement cliquables avec les bons protocoles ;
- un formulaire comprenant `Nom`, `E-mail`, `Objet` et `Message` ;
- validation Zod en français ;
- messages d'erreur liés aux champs via `aria-describedby` ;
- zone `aria-live` pour le succès ou l'échec.

Le formulaire ne doit jamais afficher un faux succès. Prévoir `VITE_CONTACT_ENDPOINT` :

- si la variable est définie, envoyer les données avec `fetch` et gérer explicitement les états chargement, succès et erreur ;
- si elle n'est pas définie, ouvrir un `mailto:` prérempli vers `mamefatouf986@gmail.com` et expliquer clairement à l'utilisateur que son application de messagerie va s'ouvrir.

Créer `.env.example` sans secret. Ajouter un champ honeypot invisible pour réduire le spam.

### Footer

Inclure le monogramme `MF.`, les liens principaux, LinkedIn, GitHub, la mention `Conçu avec React, TypeScript et Motion`, puis l'année courante calculée en JavaScript. Ne pas écrire « Tous droits réservés » si cela surcharge visuellement le footer.

## Système d'animations - implémentation obligatoire

Les animations doivent être remarquables par leur précision, pas par leur quantité.

Cette partie n'est ni facultative ni une simple suggestion de design. Les animations doivent être réellement développées dans les composants, visibles dans la prévisualisation finale et vérifiées sur desktop comme sur mobile. Ne pas livrer une page statique en affirmant que Motion est installé.

1. Encapsuler l'application dans `MotionConfig` avec `reducedMotion="user"`.
2. Utiliser `LazyMotion` et `domAnimation` afin de limiter le poids du bundle.
3. Ajouter une barre de progression de lecture très fine en haut de la page avec `useScroll` et `useSpring`.
4. Hero : apparition séquencée du surtitre, du nom, du rôle, du texte et des CTA ; révélation du portrait par masque ; légère profondeur au mouvement du pointeur uniquement sur les appareils `pointer: fine`.
5. Fond du hero : grille technique très discrète, halo menthe et halo violet lents. Les halos doivent être décoratifs, peu opaques et désactivés en mode réduction des mouvements.
6. Titres de section : révélation verticale avec masque et petit indicateur de section.
7. Sections : `whileInView` avec déclenchement unique, translation de 20 à 32 px maximum et durée entre 0,45 et 0,75 seconde.
8. Timeline : dessiner progressivement la ligne verticale et révéler chaque étape avec un léger décalage.
9. Compétences : apparition en stagger ; au survol, élévation de 2 à 4 px et éclairage de la bordure, sans rotation excessive.
10. Projets : layout animations pour les filtres, image/aperçu avec zoom maximum de 1,03, flèche qui se décale de quelques pixels et halo suivant le pointeur sur desktop.
11. Boutons : micro-interactions `hover`, `tap` et focus, avec ressort court et contrôlé.
12. Changement de thème : transition douce des couleurs et animation courte de l'icône soleil/lune.

Utiliser principalement `transform` et `opacity`. Éviter les animations continues coûteuses, le canvas, WebGL, Three.js, les particules nombreuses, les mouvements permanents, les énormes parallaxes et tout effet qui réduit la lisibilité. Toute animation infinie doit être lente, décorative, pausée lorsque l'onglet n'est pas visible et supprimée avec `prefers-reduced-motion`.

### Storyboard d'animation attendu

| Zone | Animation d'entrée | Interaction | Comportement avec réduction des mouvements |
| --- | --- | --- | --- |
| Navigation | Descente de 16 px avec fondu, 350 ms | Fond vitré au scroll et indicateur actif glissant | Affichage instantané sans translation |
| Hero | Révélation séquencée du texte, puis masque du portrait | Parallaxe très légère du portrait et halo suivant le pointeur | Fondu court uniquement, aucun parallaxe |
| À propos | Texte et qualités révélés en deux colonnes | Bordure des qualités éclairée au survol | Contenu affiché directement |
| Compétences | Stagger des groupes puis des logos | Élévation de 2 à 4 px et changement de bordure | Aucun stagger, état final immédiat |
| Expériences | Ligne verticale dessinée au scroll | Point actif et carte légèrement mise en avant | Timeline complète immédiatement visible |
| Projets | Cartes révélées en cascade | Réorganisation fluide des filtres, zoom 1,03 et halo discret | Filtrage instantané avec fondu très court |
| Formation | Étapes révélées alternativement | Accent sur l'année au survol/focus | Aucun déplacement latéral |
| Contact | Carte et formulaire révélés avec léger décalage | Bouton d'envoi avec état chargement/succès/erreur animé | Changement d'état sans translation |
| Footer | Fondu simple | Flèche de retour en haut animée au survol | Aucun mouvement continu |

### Variantes Motion centralisées

Créer `src/lib/motion.ts` et y centraliser les courbes, durées et variantes afin d'éviter des valeurs incohérentes dans chaque composant. Utiliser cette base ou une implémentation TypeScript équivalente :

```ts
import type { Variants } from "motion/react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeStandard = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: easeStandard },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;
```

Avec `useReducedMotion`, remplacer les variantes de translation, rotation, parallaxe ou mise à l'échelle par un simple fondu, ou afficher directement l'état final. Ne pas se contenter d'une règle CSS globale si des animations sont pilotées en JavaScript.

### Composants d'animation attendus

Créer et utiliser réellement les éléments suivants :

- `ScrollProgress` : barre de progression avec `useScroll`, `useSpring` et `scaleX`.
- `AnimatedReveal` : wrapper réutilisable acceptant `delay`, `direction`, `amount` et `once`.
- `StaggerGroup` : conteneur pour les compétences, qualités et listes courtes.
- `HeroPortraitMotion` : masque de révélation et parallaxe limitée au hero.
- `TimelineProgress` : ligne de progression reliée au défilement de la section Expériences.
- `ProjectGridMotion` : `LayoutGroup`, `layout`, `AnimatePresence` et clés stables pour les filtres.
- `MagneticButton` : effet magnétique extrêmement léger réservé aux deux CTA du hero, actif uniquement avec une souris précise et désactivé avec réduction des mouvements.

Le composant magnétique ne doit jamais déplacer le bouton de plus de 5 px. Le tilt des cartes ne doit pas dépasser 2 degrés. Les animations de contenu ne doivent normalement pas dépasser 800 ms.

### Validation spécifique des animations

En plus des tests fonctionnels, vérifier obligatoirement :

- qu'aucune section ne reste invisible si JavaScript d'animation rencontre une erreur ;
- que les animations d'entrée ne se rejouent pas à chaque petit mouvement de scroll ;
- que le filtrage des projets conserve une mise en page stable et des clés React uniques ;
- que le menu mobile et le changement de thème restent utilisables pendant les transitions ;
- que `prefers-reduced-motion: reduce` supprime parallaxe, tilt, effet magnétique et animations infinies ;
- qu'il n'existe aucun défilement horizontal provoqué par une translation ;
- que les animations restent fluides sur un mobile de milieu de gamme et ne provoquent pas de baisse visible de fluidité ;
- que les halos décoratifs n'interceptent jamais les clics grâce à `pointer-events: none`.

Ajouter au moins un test simulant `prefers-reduced-motion: reduce` et un test vérifiant que les filtres de projets fonctionnent pendant les layout animations.

## Icônes réelles

Utiliser notamment les icônes Lucide suivantes selon le contexte :

- `ArrowUpRight`, `Download`, `Mail`, `Phone`, `MapPin`, `CalendarDays` ;
- `BriefcaseBusiness`, `GraduationCap`, `Code2`, `Database`, `ExternalLink` ;
- `Sun`, `Moon`, `Menu`, `X`, `CheckCircle2`, `Send`, `Languages` ;
- `Github` et `Linkedin` pour les liens sociaux.

Pour les technologies, utiliser les composants officiels disponibles tels que `SiAngular`, `SiLaravel`, `SiTypescript`, `SiJavascript`, `SiTailwindcss`, `SiPostgresql`, `SiMysql`, `SiOracle`, `SiPhp`, `SiDotnet`, `SiHtml5` et `SiCss3`. Utiliser `FaJava` pour Java si nécessaire.

Les boutons uniquement composés d'une icône doivent avoir un `aria-label`. Les icônes purement décoratives doivent avoir `aria-hidden="true"`.

## Architecture de code attendue

```text
src/
  assets/
    images/
  components/
    common/
    layout/
    ui/
  sections/
    Hero.tsx
    About.tsx
    Skills.tsx
    Experience.tsx
    Projects.tsx
    Education.tsx
    Contact.tsx
  data/
    portfolio.ts
  hooks/
    useActiveSection.ts
    useTheme.ts
  lib/
    cn.ts
    motion.ts
  types/
    portfolio.ts
  styles/
    index.css
  App.tsx
  main.tsx
public/
  cv/
  icons/
  og/
```

Créer de petits composants réutilisables : `SectionHeading`, `IconButton`, `TechnologyBadge`, `ProjectCard`, `TimelineItem`, `ThemeToggle`, `Container` et `AnimatedReveal`. Éviter le composant géant de plusieurs centaines de lignes et éviter aussi la sur-abstraction inutile.

Copier le CV fourni vers `public/cv/CV-Mame-Fatou-Faye.pdf`. Si le fichier joint n'est pas disponible dans l'environnement, ne pas fabriquer de PDF : signaler précisément l'asset manquant et conserver un chemin centralisé facile à renseigner.

## Responsive, accessibilité et qualité UX

- Mobile-first, sans débordement horizontal à partir de 320 px.
- Vérifier au minimum les largeurs 320, 375, 768, 1024 et 1440 px.
- Taille minimale de 44 x 44 px pour les principales cibles tactiles.
- HTML sémantique : `header`, `nav`, `main`, `section`, `article`, `footer`.
- Un seul `h1`, puis une hiérarchie de titres logique.
- Focus visible et contrasté sur tous les éléments interactifs.
- Menu, filtres, boutons, formulaire et changement de thème entièrement utilisables au clavier.
- Aucun texte important uniquement révélé au survol.
- Aucun changement de mise en page brutal lors du chargement des images ou des polices.
- Liens externes ouverts avec `target="_blank"` et `rel="noopener noreferrer"` lorsqu'ils quittent le site.
- Afficher les liens uniquement lorsqu'une URL réelle existe.

## Performance

- Optimiser et localiser le portrait ; ne pas laisser de hotlink vers Noelshack en production.
- Précharger uniquement l'image principale du hero et les polices indispensables.
- Charger paresseusement les assets sous la ligne de flottaison.
- Définir les dimensions de toutes les images.
- Limiter le JavaScript et les dépendances ; ne pas ajouter une bibliothèque pour une fonction triviale.
- Utiliser les imports d'icônes à l'unité afin de préserver le tree-shaking.
- Éviter les ombres floues excessives sur mobile.
- Viser au minimum 95/100 sur Lighthouse pour Performance, Accessibilité, Bonnes pratiques et SEO sur une exécution de production réaliste.

## SEO et partage

- `<html lang="fr-SN">`.
- Titre : `Mame Fatou Faye | Développeuse logiciel & web à Dakar`.
- Méta-description : `Portfolio de Mame Fatou Faye, développeuse logiciel et web à Dakar, spécialisée en Angular, Laravel, Java, API REST et bases de données.`
- URL canonique provenant d'une constante d'environnement, avec `https://portfolio-mami.vercel.app/` comme valeur actuelle.
- Balises Open Graph et Twitter Card cohérentes.
- Créer une image Open Graph locale 1200 x 630 reprenant le portrait, le nom, le métier et la palette du site.
- JSON-LD `Person` avec nom, métier, ville et liens `sameAs` vers LinkedIn et GitHub.
- `robots.txt`, `sitemap.xml`, favicon et manifest minimal.
- Ne pas ajouter de système d'analytics ou de cookies sans demande explicite.

## Tests et validation obligatoires

Ajouter des tests ciblés pour au moins :

- le changement de thème et sa persistance ;
- l'affichage conditionnel de la période du ministère ;
- le filtrage des projets ;
- la validation du formulaire ;
- l'absence de boutons Démo/Code lorsque les URL sont nulles.

Avant de terminer :

1. Lancer l'installation des dépendances.
2. Lancer le lint.
3. Lancer le contrôle TypeScript sans émission.
4. Lancer les tests.
5. Lancer le build de production.
6. Ouvrir la version de prévisualisation et vérifier visuellement desktop et mobile.
7. Corriger toutes les erreurs console, liens cassés, débordements, contrastes faibles et animations saccadées.

Prévoir les scripts suivants dans `package.json` :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "test": "vitest run"
  }
}
```

## Livrables

À la fin, fournir :

- tous les fichiers complets du portfolio dans le dépôt ;
- un `README.md` professionnel avec installation, scripts, variables d'environnement, remplacement des assets et déploiement Vercel ;
- un `.env.example` sans secret ;
- la liste concise des fichiers créés ou modifiés ;
- le résultat exact de `npm run lint`, `npm run typecheck`, `npm run test` et `npm run build` ;
- les éventuelles informations encore manquantes, notamment les dates et missions du stage au ministère ;
- aucune affirmation de réussite si un test n'a pas réellement été exécuté.

## Critères de réussite finale

Le travail est terminé uniquement si :

- le portfolio semble conçu spécialement pour Mame Fatou Faye et non généré depuis un template générique ;
- la palette reprend fidèlement l'identité colorée d'Ousseynou sans copier sa mise en page ;
- le stage au Ministère de l'Enseignement et de la Formation professionnelle et technique est visible sans date inventée ;
- l'expérience SUN TELECOM est claire et non dupliquée ;
- les projets sont séparés des expériences professionnelles ;
- les icônes et logos sont réels, cohérents et accessibles ;
- les animations sont fluides, élégantes et respectueuses de la réduction des mouvements ;
- le site est parfaitement responsive et utilisable au clavier ;
- le CV est téléchargeable lorsqu'il est disponible ;
- aucun contenu factice, lien cassé, placeholder, erreur TypeScript, erreur de build ou erreur console ne subsiste.
