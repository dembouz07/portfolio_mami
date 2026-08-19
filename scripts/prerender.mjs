import { readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "dist");
const templatePath = path.join(outputDirectory, "index.html");
const serverEntryPath = path.join(outputDirectory, "server", "entry-server.js");

const [{ render }, template] = await Promise.all([
  import(pathToFileURL(serverEntryPath).href),
  readFile(templatePath, "utf8"),
]);

const rootPlaceholder = '<div id="root"></div>';
const appHtml = render();

if (!template.includes(rootPlaceholder)) {
  throw new Error(`Pré-rendu impossible : ${rootPlaceholder} est absent de dist/index.html.`);
}

if (!appHtml.includes("Mame Fatou Faye") || !appHtml.includes("<main")) {
  throw new Error("Pré-rendu incomplet : le contenu principal du portfolio est absent.");
}

await writeFile(
  templatePath,
  template.replace(rootPlaceholder, `<div id="root">${appHtml}</div>`),
  "utf8",
);
await rm(path.join(outputDirectory, "server"), { recursive: true, force: true });

console.log("Page d’accueil pré-rendue dans dist/index.html.");
