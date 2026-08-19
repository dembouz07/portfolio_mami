import { mkdir } from "node:fs/promises";
import path from "node:path";

import { chromium } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4173";
const outputDirectory = path.resolve("test-results", "responsive");
const requestedWidths = process.env.RESPONSIVE_WIDTHS
  ?.split(",")
  .map((value) => Number.parseInt(value.trim(), 10))
  .filter((value) => Number.isFinite(value) && value >= 320);
const widths = requestedWidths?.length ? requestedWidths : [320, 375, 768, 1024, 1440];
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});

await mkdir(outputDirectory, { recursive: true });

const results = [];
for (const width of widths) {
  const height = width < 768 ? 812 : 900;
  const page = await browser.newPage({ viewport: { width, height } });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(baseURL);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(1_100);
  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    h1Count: document.querySelectorAll("h1").length,
    hasMain: Boolean(document.querySelector("main#contenu-principal")),
    primaryCta: (() => {
      const element = document.querySelector("main a[href='#projets']");
      if (!element) return null;
      const style = getComputedStyle(element);
      return {
        text: element.textContent?.trim(),
        color: style.color,
        backgroundColor: style.backgroundColor,
        opacity: style.opacity,
      };
    })(),
  }));

  let haloMoved = null;
  if (width === 1440) {
    const halo = page.locator(".hero-orb--mint");
    const before = await halo.getAttribute("style");
    await page.mouse.move(width * 0.18, height * 0.35);
    await page.waitForTimeout(450);
    const after = await halo.getAttribute("style");
    haloMoved = before !== after;
  }

  if (width === 375 || width === 1440) {
    await page.screenshot({
      path: path.join(outputDirectory, `hero-${width}.png`),
      fullPage: false,
    });

    for (const sectionId of ["a-propos", "competences", "experiences", "projets", "formation", "contact"]) {
      await page.evaluate((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "instant" });
        }
      }, sectionId);
      await page.waitForTimeout(350);
      await page.screenshot({
        path: path.join(outputDirectory, `${sectionId}-${width}.png`),
        fullPage: false,
      });
    }

    await page.evaluate(() => {
      const footer = document.querySelector("footer");
      if (footer) {
        const top = footer.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "instant" });
      }
    });
    await page.waitForTimeout(350);
    await page.screenshot({
      path: path.join(outputDirectory, `footer-${width}.png`),
      fullPage: false,
    });
  }

  let darkTheme = null;
  if (width === 375 || width === 1440) {
    await page.evaluate(() => {
      window.localStorage.setItem("mame-fatou-faye-theme", "dark");
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(500);
    darkTheme = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      return {
        enabled: document.documentElement.classList.contains("dark"),
        background: style.getPropertyValue("--bg").trim(),
        foreground: style.getPropertyValue("--text").trim(),
        colorScheme: style.colorScheme,
      };
    });
    await page.screenshot({
      path: path.join(outputDirectory, `hero-dark-${width}.png`),
      fullPage: false,
    });
  }

  results.push({ width, ...metrics, haloMoved, darkTheme, pageErrors });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));

const failed = results.some(
  (result) =>
    result.scrollWidth !== result.clientWidth ||
    result.h1Count !== 1 ||
    !result.hasMain ||
    !result.primaryCta ||
    !result.primaryCta.text ||
    result.primaryCta.color === result.primaryCta.backgroundColor ||
    (result.width === 1440 && !result.haloMoved) ||
    (result.darkTheme &&
      (!result.darkTheme.enabled ||
        result.darkTheme.background === result.darkTheme.foreground ||
        result.darkTheme.colorScheme !== "dark")) ||
    result.pageErrors.length > 0,
);

if (failed) {
  process.exitCode = 1;
}
