import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiGithub } from "react-icons/si";

import { AnimatedReveal, Container, SectionHeading } from "../components/common";
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
    <section id="contact" aria-labelledby="contact-title" className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="06 · Contact"
          title={contact.title}
          description={contact.description}
          id="contact-title"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] lg:gap-8">
          <AnimatedReveal direction="right" className="rounded-3xl bg-[var(--text)] p-6 [color:var(--bg)] sm:p-8 lg:p-10">
            <p className="font-display max-w-md text-2xl font-extrabold leading-tight tracking-[-0.04em] sm:text-3xl">
              Parlons de votre prochain projet.
            </p>
            <p className="mt-4 max-w-sm text-sm leading-7 opacity-70">
              Une idée, une mission ou une opportunité à Dakar ou à distance ? Je serai ravie d’en discuter.
            </p>

            <ul className="mt-8 space-y-2">
              {contactLinks.map(({ label, value, href, icon: Icon, external }) => {
                const content = (
                  <>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--bg)_10%,transparent)]">
                      <Icon className="size-[1.1rem]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.67rem] font-bold uppercase tracking-[0.13em] opacity-60">{label}</span>
                      <span className="block break-words text-sm font-semibold">{value}</span>
                    </span>
                  </>
                );

                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex min-h-14 items-center gap-3 rounded-2xl border border-transparent p-2 transition-colors hover:border-[color-mix(in_srgb,var(--bg)_18%,transparent)] hover:bg-[color-mix(in_srgb,var(--bg)_8%,transparent)]"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex min-h-14 items-center gap-3 p-2">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </AnimatedReveal>

          <AnimatedReveal direction="left" delay={0.08} className="surface-panel rounded-3xl p-6 sm:p-8 lg:p-10">
            <form noValidate onSubmit={onSubmit} aria-label="Formulaire de contact">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Nom" id="name" error={errors.name?.message}>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Votre nom"
                    className="field-control min-h-12 px-4"
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
                    className="field-control min-h-12 px-4"
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
                    className="field-control min-h-12 px-4"
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
                    className="field-control resize-y px-4 py-3"
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

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-5 text-[var(--muted)]">
                  Sans service configuré, votre application de messagerie sera utilisée. Aucun faux envoi n’est affiché.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-bold text-[#03120d] transition-[transform,filter] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 disabled:cursor-wait disabled:opacity-65 motion-reduce:transform-none"
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
      <label htmlFor={id} className="mb-2 block text-sm font-bold text-[var(--text)]">
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
