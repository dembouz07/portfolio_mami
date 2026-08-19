import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom (2 caractères minimum)."),
  email: z.string().trim().email("Saisissez une adresse e-mail valide."),
  subject: z.string().trim().min(3, "Précisez l’objet de votre message."),
  message: z.string().trim().min(20, "Votre message doit contenir au moins 20 caractères."),
  website: z.string().max(0, "Envoi impossible.").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
