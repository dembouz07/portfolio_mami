import { ArrowDownRight, Download, Mail } from "lucide-react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import { HeroPortraitMotion, MagneticButton } from "../components/common";
import { cvAvailable, cvPath, hero, identity, portfolioStats } from "../data/portfolio";
import { usePointerFine } from "../hooks/useMediaQuery";
import { fadeUp, staggerContainer } from "../lib/motion";

const portraitSources = {
  avif: "/images/portrait-480.avif 480w, /images/portrait-768.avif 768w",
  webp: "/images/portrait-480.webp 480w, /images/portrait-768.webp 768w",
  fallback: "/images/portrait-768.webp",
} as const;

const socialLinks = [
  {
    label: "Profil LinkedIn de Mame Fatou Faye",
    shortLabel: "LinkedIn",
    href: identity.linkedin,
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "Profil GitHub de Mame Fatou Faye",
    shortLabel: "GitHub",
    href: identity.github,
    icon: SiGithub,
    external: true,
  },
  {
    label: `Écrire à ${identity.email}`,
    shortLabel: "E-mail",
    href: `mailto:${identity.email}`,
    icon: Mail,
    external: false,
  },
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const pointerFine = usePointerFine();
  const rawHaloX = useMotionValue(0);
  const rawHaloY = useMotionValue(0);
  const haloX = useSpring(rawHaloX, { stiffness: 90, damping: 22, mass: 0.7 });
  const haloY = useSpring(rawHaloY, { stiffness: 90, damping: 22, mass: 0.7 });
  const haloEnabled = pointerFine && !reduceMotion;
  const [firstName, middleName, lastName] = hero.title.split(" ");

  const resetHalo = () => {
    rawHaloX.set(0);
    rawHaloY.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!haloEnabled) {
      resetHalo();
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    rawHaloX.set(horizontal * 54);
    rawHaloY.set(vertical * 40);
  };

  return (
    <section
      id="accueil"
      aria-labelledby="hero-title"
      className="relative isolate min-h-screen overflow-hidden pb-0 pt-28 sm:pt-32 lg:pt-36"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetHalo}
      onPointerCancel={resetHalo}
    >
      <div className="technical-grid" aria-hidden="true" />
      <m.div
        className="hero-orb hero-orb--mint will-change-transform"
        style={haloEnabled ? { x: haloX, y: haloY } : undefined}
        aria-hidden="true"
      />
      <div className="hero-orb hero-orb--violet" aria-hidden="true" />

      <div className="mx-auto w-full max-w-[92rem] px-4 sm:px-6 lg:px-10">
        <m.div
          variants={reduceMotion ? undefined : staggerContainer}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-4"
        >
          <m.p variants={fadeUp} className="inline-flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--muted)] sm:text-xs">
            <span className="size-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_5px_var(--accent-soft)]" aria-hidden="true" />
            {hero.availability}
          </m.p>
          <m.p variants={fadeUp} className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--muted)] sm:text-xs">
            {identity.location}
          </m.p>
        </m.div>

        <div className="relative mt-8 grid lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:items-end">
          <m.div
            variants={reduceMotion ? undefined : staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            className="relative z-20 lg:col-span-8 lg:row-start-1"
          >
            <m.p variants={fadeUp} className="mb-5 text-sm font-semibold text-[var(--muted)] sm:text-base">
              {hero.eyebrow}
            </m.p>
            <m.h1 id="hero-title" variants={fadeUp} className="hero-name text-[var(--text)]">
              <span className="block">{firstName}</span>
              <span className="hero-name__editorial block text-[var(--accent)]">{middleName}</span>
              <span className="block sm:pl-[0.55em]">{lastName}</span>
            </m.h1>
            <m.p variants={fadeUp} className="mt-6 max-w-3xl text-balance text-xl font-bold tracking-[-0.04em] text-[var(--text)] sm:text-2xl lg:mt-8 lg:text-3xl">
              {hero.role}
            </m.p>
          </m.div>

          <HeroPortraitMotion className="hero-portrait-stage relative z-10 mx-auto mt-10 w-full max-w-[31rem] lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-2 lg:max-w-none" depth={4}>
            <svg className="hero-orbit" viewBox="0 0 260 260" aria-hidden="true">
              <defs>
                <path id="hero-orbit-path" d="M130,18a112,112 0 1,1 0,224a112,112 0 1,1 0,-224" />
              </defs>
              <text>
                <textPath href="#hero-orbit-path" startOffset="0%">
                  DÉVELOPPEUSE LOGICIEL &amp; WEB · DAKAR · INTERFACES UTILES ·
                </textPath>
              </text>
            </svg>
            <div className="portrait-shell aspect-[3/4]">
              <picture>
                <source type="image/avif" srcSet={portraitSources.avif} sizes="(max-width: 767px) 90vw, (max-width: 1023px) 480px, 38vw" />
                <source type="image/webp" srcSet={portraitSources.webp} sizes="(max-width: 767px) 90vw, (max-width: 1023px) 480px, 38vw" />
                <img
                  src={portraitSources.fallback}
                  width="768"
                  height="1024"
                  fetchPriority="high"
                  decoding="async"
                  alt={hero.portraitAlt}
                />
              </picture>
            </div>
            <p className="hero-portrait-caption">
              <span>Portrait / 01</span>
              <span>Dakar, Sénégal</span>
            </p>
          </HeroPortraitMotion>

          <m.div
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.65, delay: reduceMotion ? 0 : 0.55 }}
            className="relative z-20 mt-10 lg:col-span-5 lg:row-start-2 lg:mt-12"
          >
            <p className="max-w-xl text-pretty text-base leading-8 text-[var(--muted)] sm:text-lg">
              {hero.tagline}
            </p>

            <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:flex-wrap sm:items-center">
              <MagneticButton>
                <a href="#projets" className="group inline-flex min-h-14 items-center gap-4 font-bold text-[var(--text)]">
                  <span className="border-b border-[var(--text)] pb-1 transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">{hero.primaryCta}</span>
                  <span className="flex size-12 items-center justify-center rounded-full bg-[var(--text)] [color:var(--bg)] transition-[background-color,transform] group-hover:rotate-[-8deg] group-hover:bg-[var(--accent)] group-hover:text-[#03100c] motion-reduce:transform-none">
                    <ArrowDownRight className="size-5" aria-hidden="true" />
                  </span>
                </a>
              </MagneticButton>

              <MagneticButton>
                {cvAvailable ? (
                  <a href={cvPath} download className="inline-flex min-h-11 items-center gap-2 border-b border-[var(--line)] text-sm font-bold text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
                    <Download className="size-4" aria-hidden="true" />
                    {hero.secondaryCta}
                  </a>
                ) : (
                  <span
                    role="link"
                    aria-disabled="true"
                    aria-label={`${hero.secondaryCta} — fichier non fourni`}
                    title="Le fichier du CV n’a pas encore été fourni"
                    data-cv-path={cvPath}
                    className="inline-flex min-h-11 cursor-not-allowed items-center gap-2 border-b border-dashed border-[var(--line)] text-sm font-bold text-[var(--muted)] opacity-55"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    {hero.secondaryCta}
                  </span>
                )}
              </MagneticButton>
            </div>

            <nav aria-label="Liens sociaux" className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--line)] pt-5">
              {socialLinks.map(({ label, shortLabel, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={external ? `${label} (nouvel onglet)` : label}
                  className="group inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {shortLabel}
                </a>
              ))}
            </nav>
          </m.div>
        </div>

        <m.dl
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.6, delay: reduceMotion ? 0 : 0.8 }}
          className="mt-16 grid grid-cols-2 border-y border-[var(--line)] sm:grid-cols-3 lg:mt-24"
          aria-label="Quelques repères"
        >
          {portfolioStats.map((stat) => (
            <div key={stat.label} className="metric-divider relative py-6 pr-4 sm:px-7 sm:py-8 first:pl-0 last:pr-0">
              <dd className="font-editorial text-4xl font-medium italic tracking-[-0.05em] text-[var(--text)] sm:text-6xl">{stat.value}</dd>
              <dt className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--muted)] sm:text-xs">{stat.label}</dt>
            </div>
          ))}
        </m.dl>
      </div>
    </section>
  );
}

export default Hero;
