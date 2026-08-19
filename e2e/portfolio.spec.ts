import { expect, test } from "@playwright/test";

test("le portfolio charge et les parcours principaux restent utilisables", async ({ page, isMobile }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: /Mame Fatou Faye/ })).toBeVisible();
  await expect(page.getByAltText("Portrait de Mame Fatou Faye")).toBeVisible();
  await expect(page.getByRole("link", { name: "Découvrir mes projets" })).toBeVisible();

  await page.getByRole("button", { name: "Desktop" }).click();
  await expect(page.getByRole("heading", { name: "Gestion des présences des professeurs" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Gestion d'une librairie en ligne" })).toHaveCount(0);

  if (isMobile) {
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  }

  const themeButton = isMobile
    ? page.getByRole("dialog", { name: "Navigation" }).getByRole("button", { name: "Activer le thème sombre" })
    : page.getByRole("button", { name: "Activer le thème sombre" });
  await themeButton.click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
});

test("le menu mobile s’ouvre et se ferme au clavier", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Parcours réservé au projet mobile Playwright.");
  await page.goto("/");

  const openButton = page.getByRole("button", { name: "Ouvrir le menu" });
  await openButton.click();
  await expect(page.getByRole("dialog", { name: "Navigation" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Navigation" })).toHaveCount(0);
  await expect(openButton).toBeFocused();
});
