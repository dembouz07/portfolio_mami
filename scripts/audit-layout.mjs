import { chromium } from "@playwright/test";

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});

const page = await browser.newPage({ viewport: { width: 393, height: 851 }, isMobile: true, hasTouch: true });
const browserMessages = [];
page.on("console", (message) => browserMessages.push(`${message.type()}: ${message.text()}`));
page.on("pageerror", (error) => browserMessages.push(`pageerror: ${error.message}`));
await page.goto(process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:4173");
await page.waitForLoadState("networkidle");

const audit = await page.evaluate(() => {
  const viewportWidth = document.documentElement.clientWidth;
  const offenders = [...document.querySelectorAll("body *")]
    .map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        tag: element.tagName.toLowerCase(),
        id: element.id,
        className: typeof element.className === "string" ? element.className.slice(0, 180) : "",
        left: Math.round(rect.left * 10) / 10,
        right: Math.round(rect.right * 10) / 10,
        width: Math.round(rect.width * 10) / 10,
        scrollWidth: element.scrollWidth,
      };
    })
    .filter((item) => item.width > 0 && (item.left < -1 || item.right > viewportWidth + 1))
    .slice(0, 30);

  return {
    innerWidth: window.innerWidth,
    visualViewportWidth: window.visualViewport?.width,
    viewportWidth,
    documentScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    htmlComputedWidth: getComputedStyle(document.documentElement).width,
    bodyComputedWidth: getComputedStyle(document.body).width,
    rootRect: document.querySelector("#root")?.getBoundingClientRect().toJSON(),
    mainRect: document.querySelector("main")?.getBoundingClientRect().toJSON(),
    offenders,
  };
});

await page.getByRole("button", { name: "Desktop" }).click();
await page.waitForTimeout(1_000);
const projectAudit = await page.evaluate(() => ({
  announcement: [...document.querySelectorAll("[aria-live='polite']")].map((element) => element.textContent?.trim()),
  headings: [...document.querySelectorAll("#projets h3")].map((element) => element.textContent?.trim()),
  projectWrappers: [...document.querySelectorAll("#projets h3")].map((heading) => ({
    heading: heading.textContent?.trim(),
    wrapperStyle: heading.closest("article")?.parentElement?.getAttribute("style"),
  })),
}));

console.log(JSON.stringify({ ...audit, projectAudit, browserMessages }, null, 2));
await browser.close();
