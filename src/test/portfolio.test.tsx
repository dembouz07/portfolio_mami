import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ThemeToggle } from "../components/ui";
import { THEME_STORAGE_KEY } from "../hooks/useTheme";
import { Contact, Experience, Projects } from "../sections";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("thème", () => {
  it("bascule vers le thème sombre et mémorise le choix", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: "Activer le thème sombre" }));

    expect(document.documentElement).toHaveClass("dark");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(screen.getByRole("button", { name: "Activer le thème clair" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("expériences", () => {
  it("n’affiche aucun libellé de période quand la date du ministère est absente", () => {
    render(<Experience />);

    expect(
      screen.getByRole("heading", {
        name: "Ministère de l'Enseignement et de la Formation professionnelle et technique",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/à préciser|période non renseignée/i)).not.toBeInTheDocument();
    expect(screen.getByText("Novembre 2024 - Février 2025")).toBeInTheDocument();
  });
});

describe("projets", () => {
  it("filtre les projets pendant les animations de mise en page", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole("button", { name: "Desktop" }));

    expect(screen.getByRole("button", { name: "Desktop" })).toHaveAttribute("aria-pressed", "true");
    expect(await screen.findByRole("heading", { name: "Gestion des prêts de matériel informatique" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Gestion des présences des professeurs" })).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByRole("heading", { name: "Gestion d'une librairie en ligne" })).not.toBeInTheDocument();
    });
  });

  it("n’affiche aucun lien Démo ou Code lorsque les URL sont nulles", () => {
    render(<Projects />);

    expect(screen.queryByRole("link", { name: /démo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /code/i })).not.toBeInTheDocument();
  });
});

describe("formulaire de contact", () => {
  it("affiche les messages de validation français et les relie aux champs", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: "Envoyer le message" }));

    const nameError = await screen.findByText("Indiquez votre nom (2 caractères minimum).");
    expect(nameError).toHaveAttribute("id", "name-error");
    expect(screen.getByLabelText("Nom")).toHaveAttribute("aria-describedby", "name-error");
    expect(screen.getByText("Saisissez une adresse e-mail valide.")).toBeInTheDocument();
    expect(screen.getByText("Précisez l’objet de votre message.")).toBeInTheDocument();
    expect(screen.getByText("Votre message doit contenir au moins 20 caractères.")).toBeInTheDocument();
  });
});
