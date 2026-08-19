# Portfolio de Mame Fatou Faye

Portfolio professionnel monopage de **Mame Fatou Faye**, développeuse logiciel et web basée à Dakar. Le site présente son parcours, ses compétences, ses expériences et ses projets dans une interface responsive, accessible et animée avec mesure.

URL canonique de production : <https://mamefatoufaye.tech/>.

## Stack

- React 19 et TypeScript strict
- Vite 8 et Tailwind CSS 4 via `@tailwindcss/vite`
- Motion for React (`motion/react`)
- React Hook Form et Zod
- Lucide React et React Icons
- Polices variables Manrope et DM Sans auto-hébergées
- Vitest, Testing Library et Playwright
- ESLint en configuration plate

## Prérequis

- Node.js `20.19+` ou `22.12+`
- pnpm 10 recommandé (ou npm récent fourni avec Node.js)

## Installation

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Sous PowerShell, la copie de l’environnement peut être effectuée avec :

```powershell
Copy-Item .env.example .env.local
```

Le serveur de développement est ensuite disponible sur `http://localhost:5173`.

## Variables d’environnement

Toutes les variables préfixées par `VITE_` sont publiques et intégrées au bundle client. Aucun secret ne doit y être placé.

| Variable | Obligatoire | Usage |
| --- | --- | --- |
| `VITE_CONTACT_ENDPOINT` | Non | Endpoint HTTPS recevant le formulaire en JSON. Sans cette valeur, le formulaire ouvre un e-mail prérempli vers l’adresse de Mame Fatou Faye. |

Le domaine canonique est volontairement fixé à `https://mamefatoufaye.tech/` dans la configuration de build afin qu’une ancienne variable Vercel ne puisse pas produire de métadonnées contradictoires.

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Lance Vite en développement. |
| `npm run build` | Vérifie TypeScript, construit les bundles puis pré-rend la page dans `dist/`. |
| `npm run check:seo` | Contrôle le domaine canonique, le sitemap, le JSON-LD et le HTML pré-rendu. |
| `npm run preview` | Sert localement le build de production. |
| `npm run typecheck` | Vérifie les types sans produire de fichiers. |
| `npm run lint` | Analyse le dépôt avec ESLint. |
| `npm run test` | Exécute les tests Vitest une fois. |
| `npm run test:watch` | Relance les tests unitaires à chaque changement. |
| `npm run test:e2e` | Exécute les tests de fumée Playwright. |
| `npm run check` | Enchaîne lint, types, tests et build. |
| `npm run assets:generate` | Régénère les portraits optimisés, l’image Open Graph et les icônes PNG. |
| `npm run audit:responsive` | Vérifie les largeurs 320, 375, 768, 1024 et 1440 px sur une prévisualisation active. |

Pour le premier lancement de Playwright, installer uniquement le navigateur nécessaire :

```bash
npx playwright install chromium
npm run test:e2e
```

## Organisation du projet

```text
src/
  components/common/   Composants transverses
  components/layout/   Navigation et pied de page
  components/ui/       Primitives d’interface et d’animation
  data/portfolio.ts    Source unique des contenus
  hooks/               Thème, média et section active
  lib/                 Classes, filtres et variantes Motion
  sections/            Sections de la page
  styles/index.css     Tokens, thèmes et styles globaux
  test/setup.ts        Environnement de tests DOM
  App.tsx
  main.tsx
public/
  mami.png              Portrait source local
  images/               Portraits AVIF et WebP optimisés
  cv/                   CV téléchargeable
  icons/                Favicon et icônes installables
  og/                   Image de partage 1200 × 630
```

Les grandes chaînes de contenu et les coordonnées sont centralisées dans `src/data/portfolio.ts`. Les composants ne doivent pas dupliquer ces informations.

## Assets

- Portrait source : `public/mami.png`.
- Portraits optimisés : variantes AVIF et WebP dans `public/images/`, servies avec `srcSet`, dimensions et tailles responsives.
- Image sociale : `public/og/mame-fatou-faye-og.jpg` en 1200 × 630.
- Favicon : `public/icons/favicon.svg`.
- Manifest : `public/site.webmanifest`.
- CV : `public/cv/CV-Mame-Fatou-Faye.pdf`.

Le CV source n’étant pas présent dans le dépôt initial, il ne doit jamais être remplacé par un document factice. Ajouter le fichier réel au chemin ci-dessus, puis passer `cvAvailable` à `true` dans `src/data/portfolio.ts`. Tant que ce n’est pas fait, le CTA reste clairement désactivé et ne crée aucun lien cassé.

Après remplacement du portrait source, exécuter `pnpm assets:generate` pour reconstruire les quatre formats responsives, l’image Open Graph 1200 × 630 et les icônes installables.

## Qualité et accessibilité

Le projet prévoit notamment :

- le respect de `prefers-reduced-motion` dans Motion et dans les effets CSS ;
- un thème système au premier chargement, puis persisté dans `localStorage` ;
- une navigation au clavier, des focus visibles et une hiérarchie HTML sémantique ;
- des tests ciblés du thème, des filtres, du formulaire et des contenus conditionnels ;
- un environnement de test qui simule `matchMedia`, `IntersectionObserver` et `ResizeObserver` ;
- des métadonnées SEO en français, une URL canonique, un schéma JSON-LD `ProfilePage`/`Person`/`WebSite` et un HTML pré-rendu.

## Déploiement sur Vercel

1. Importer le dépôt dans Vercel.
2. Sélectionner le preset **Vite**.
3. Utiliser `pnpm build` comme commande de build (Vercel détecte `pnpm-lock.yaml`).
4. Utiliser `dist` comme dossier de sortie.
5. Définir `VITE_CONTACT_ENDPOINT` uniquement si un service réel de traitement du formulaire est disponible.
6. Déployer, puis vérifier `/robots.txt`, `/sitemap.xml`, `/site.webmanifest`, l’image Open Graph et la présence du contenu dans le code source HTML.

## Informations volontairement non inventées

La période, les missions détaillées et les technologies du stage au **Ministère de la Formation professionnelle et technique** n’ont pas été fournies. L’interface masque donc ces champs lorsqu’ils sont absents. Ils pourront être ajoutés à la source de données après confirmation par Mame Fatou Faye.

De même, aucun lien de démonstration ou de dépôt n’est affiché pour un projet tant qu’une URL réelle n’a pas été communiquée.
