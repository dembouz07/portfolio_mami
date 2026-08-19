import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import { AnimatedReveal, Container } from "../components/common";
import { contact, identity } from "../data/portfolio";
import { contactSchema, type ContactFormData } from "../lib/contact";

type SubmissionState =
  | { kind: "idle"; message: "" }
  | { kind: "info" | "success" | "error"; message: string };

const contactLinks = [
  { label: "E-mail", value: identity.email, href: `mailto:${identity.email}`, icon: Mail, external: false },
  { label: "Téléphone", value: identity.phoneDisplay, href: `tel:${identity.phoneHref}`, icon: Phone, external: false },
  { label: "Localisation", value: identity.location, href: null, icon: MapPin, external: false },
  { label: "LinkedIn", value: "mame-fatou-faye", href: identity.linkedin, icon: FaLinkedinIn, external: true },
  { label: "GitHub", value: "mamylahi", href: identity.github, icon: SiGithub, external: true },
] as const;

function makeMailtoUrl(values: ContactFormData) {
  const params = new URLSearchParams({
    subject: values.subject,
    body: `Bonjour Mame Fatou,\n\n${values.message}\n\n— ${values.name}\n${values.email}`,
  });
  return `mailto:${identity.email}?${params.toString()}`;
}

export function Contact() {
  const [submission, setSubmission] = useState<SubmissionState>({ kind: "idle", message: "" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    if (values.website) {
      setSubmission({ kind: "error", message: "L’envoi n’a pas pu être traité." });
      return;
    }

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
    setSubmission({ kind: "idle", message: "" });

    if (!endpoint) {
      setSubmission({
        kind: "info",
        message: "Votre application de messagerie va s’ouvrir avec un message prérempli. Vérifiez-le avant de l’envoyer.",
      });
      window.location.assign(makeMailtoUrl(values));
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Le service de contact a répondu avec le statut ${response.status}.`);
      }

      reset();
      setSubmission({ kind: "success", message: "Votre message a bien été transmis. Merci, je vous répondrai dès que possible." });
    } catch {
      setSubmission({
        kind: "error",
        message: `Le message n’a pas pu être envoyé. Vous pouvez m’écrire directement à ${identity.email}.`,
      });
    }
  });

  return (
    <section id="contact" aria-labelledby="contact-title" className="contact-stage relative overflow-hidden">
      <div className="contact-stage__glow" aria-hidden="true" />
      <Container className="relative py-24 sm:py-32 lg:py-40">
        <AnimatedReveal className="border-t border-[var(--line)] pt-5">
          <div className="grid gap-8 lg:grid-cols-[minmax(12rem,0.3fr)_minmax(0,0.7fr)]">
            <p className="flex items-center gap-3 text-[0.67rem] font-black uppercase tracking-[0.2em] text-[var(--muted)]">
              <span className="size-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              06 / Contact
            </p>
            <div>
              <h2
                id="contact-title"
                className="font-display max-w-5xl text-[clamp(3.1rem,8.4vw,8.8rem)] font-black leading-[0.84] tracking-[-0.075em]"
              >
                Créons quelque chose de <span className="font-editorial font-normal italic text-[var(--accent)]">remarquable.</span>
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">{contact.description}</p>
            </div>
          </div>
        </AnimatedReveal>

        <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:gap-24">
          <AnimatedReveal direction="right">
            <p className="max-w-md text-xl font-bold leading-snug tracking-[-0.025em] sm:text-2xl">
              Une idée, une mission ou une opportunité à Dakar ou à distance&nbsp;? Écrivons la suite ensemble.
            </p>

            <ul className="mt-10 border-t border-[var(--line)]">
              {contactLinks.map(({ label, value, href, icon: Icon, external }) => {
                const content = (
                  <>
                    <Icon className="size-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.62rem] font-black uppercase tracking-[0.16em] text-[var(--muted)]">{label}</span>
                      <span className="mt-1 block break-words text-sm font-semibold sm:text-base">{value}</span>
                    </span>
                    {href ? (
                      <ArrowUpRight className="size-4 shrink-0 text-[var(--muted)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden="true" />
                    ) : null}
                  </>
                );

                return (
                  <li key={label} className="border-b border-[var(--line)]">
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex min-h-20 items-center gap-4 py-4 transition-colors hover:text-[var(--accent)]"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex min-h-20 items-center gap-4 py-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </AnimatedReveal>

          <AnimatedReveal direction="left" delay={0.08}>
            <form noValidate onSubmit={onSubmit} aria-label="Formulaire de contact">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Nom" id="name" error={errors.name?.message}>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Votre nom"
                    className="field-control min-h-14 py-3"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                  />
                </FormField>

                <FormField label="E-mail" id="email" error={errors.email?.message}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="vous@exemple.com"
                    className="field-control min-h-14 py-3"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                </FormField>
              </div>

              <div className="mt-5">
                <FormField label="Objet" id="subject" error={errors.subject?.message}>
                  <input
                    id="subject"
                    type="text"
                    placeholder="À propos de…"
                    className="field-control min-h-14 py-3"
                    aria-invalid={errors.subject ? "true" : "false"}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                    {...register("subject")}
                  />
                </FormField>
              </div>

              <div className="mt-5">
                <FormField label="Message" id="message" error={errors.message?.message}>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Décrivez votre projet ou votre besoin…"
                    className="field-control resize-y py-3"
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                  />
                </FormField>
              </div>

              <div className="sr-honeypot" aria-hidden="true">
                <label htmlFor="website">Ne pas remplir ce champ</label>
                <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>

              <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-[var(--muted)]">
                  Sans service configuré, votre application de messagerie sera utilisée. Aucun faux envoi n’est affiché.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 border-b-2 border-[var(--accent)] px-1 py-3 text-sm font-black uppercase tracking-[0.11em] text-[var(--text)] transition-colors hover:text-[var(--accent)] disabled:cursor-wait disabled:opacity-65"
                >
                  {isSubmitting ? <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" aria-hidden="true" />}
                  {isSubmitting ? "Envoi…" : "Envoyer le message"}
                </button>
              </div>

              <div
                className={`mt-5 min-h-6 text-sm font-semibold ${submission.kind === "error" ? "text-[#c2415d] dark:text-[#ff9caf]" : submission.kind === "success" ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}
                role={submission.kind === "error" ? "alert" : "status"}
                aria-live="polite"
                aria-atomic="true"
              >
                {submission.message}
              </div>
            </form>
          </AnimatedReveal>
        </div>
      </Container>
    </section>
  );
}

interface FormFieldProps {
  readonly id: string;
  readonly label: string;
  readonly error?: string;
  readonly children: React.ReactNode;
}

function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.67rem] font-black uppercase tracking-[0.15em] text-[var(--muted)]">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-[#b42345] dark:text-[#ff9caf]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Contact;
