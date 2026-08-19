import { ArrowDownRight, Download, Mail } from "lucide-react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent } from "react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import {
  HeroPortraitMotion,
  MagneticButton,
} from "../components/common";
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
    href: identity.linkedin,
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: "Profil GitHub de Mame Fatou Faye",
    href: identity.github,
    icon: SiGithub,
    external: true,
  },
  {
    label: `Écrire à ${identity.email}`,
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
      className="relative isolate flex min-h-[min(58rem,100svh)] items-center overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-36"
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

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.72fr)] lg:gap-16">
          <m.div
            variants={reduceMotion ? undefined : staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            className="relative z-10"
          >
            <m.div variants={fadeUp} className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.13em] text-[var(--muted)] backdrop-blur-md">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full rounded-full bg-[var(--accent-bright)] opacity-35" />
                  <span className="relative inline-flex size-2 rounded-full bg-[var(--accent)]" />
                </span>
                {hero.availability}
              </span>
              <span className="text-sm font-semibold text-[var(--muted)]">{hero.eyebrow}</span>
            </m.div>

            <m.h1 id="hero-title" variants={fadeUp} className="max-w-3xl text-balance">
              <span className="hero-name block max-w-[9ch] text-[var(--text)]">
                {hero.title}
              </span>
              <span className="hero-role font-display mt-7 block max-w-2xl text-2xl font-bold tracking-[-0.035em] sm:text-3xl lg:text-4xl">
                {hero.role} à Dakar
              </span>
            </m.h1>

            <m.p variants={fadeUp} className="mt-6 max-w-2xl text-balance text-base leading-8 text-[var(--muted)] sm:text-lg">
              {hero.tagline}
            </m.p>

            <m.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton className="w-full sm:w-auto">
                <a
                  href="#projets"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-bold [color:var(--bg)] shadow-lg transition-colors hover:bg-[var(--accent)] hover:text-[#03100c] sm:w-auto"
                >
                  {hero.primaryCta}
                  <ArrowDownRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 motion-reduce:transform-none" aria-hidden="true" />
                </a>
              </MagneticButton>

              <MagneticButton className="w-full sm:w-auto">
                {cvAvailable ? (
                  <a
                    href={cvPath}
                    download
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-6 py-3 text-sm font-bold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:w-auto"
                  >
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
                    className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-6 py-3 text-sm font-bold text-[var(--muted)] opacity-75 sm:w-auto"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    {hero.secondaryCta}
                  </span>
                )}
              </MagneticButton>
            </m.div>

            <m.div variants={fadeUp} className="mt-8 flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={external ? `${label} (nouvel onglet)` : label}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] motion-reduce:transform-none"
                >
                  <Icon className="size-[1.1rem]" aria-hidden="true" />
                </a>
              ))}
            </m.div>
          </m.div>

          <HeroPortraitMotion className="mx-auto w-full max-w-[31rem] lg:mr-0" depth={4}>
            <div className="portrait-shell aspect-[3/4]">
              <picture>
                <source type="image/avif" srcSet={portraitSources.avif} sizes="(max-width: 767px) 88vw, (max-width: 1023px) 480px, 38vw" />
                <source type="image/webp" srcSet={portraitSources.webp} sizes="(max-width: 767px) 88vw, (max-width: 1023px) 480px, 38vw" />
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
            <div className="portrait-code" aria-hidden="true">
              <span className="portrait-code__dot" />
              <span>
                <strong className="font-display block text-xs text-[var(--text)]">Disponible</strong>
                <span className="block text-[0.69rem] text-[var(--muted)]">Dakar · Sénégal</span>
              </span>
            </div>
          </HeroPortraitMotion>
        </div>

        <m.dl
          initial={reduceMotion ? false : { y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.6, delay: reduceMotion ? 0 : 0.75 }}
          className="surface-panel mt-16 grid grid-cols-2 overflow-hidden rounded-2xl sm:grid-cols-3 lg:mt-20"
          aria-label="Quelques repères"
        >
          {portfolioStats.map((stat) => (
            <div key={stat.label} className="metric-divider relative px-4 py-5 text-center sm:px-7 sm:py-6">
              <dt className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--muted)]">{stat.label}</dt>
              <dd className="font-display mt-1 text-2xl font-extrabold tracking-[-0.04em] text-[var(--text)] sm:text-3xl">{stat.value}</dd>
            </div>
          ))}
        </m.dl>
      </div>
    </section>
  );
}

export default Hero;
