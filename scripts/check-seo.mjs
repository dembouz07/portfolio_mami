import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = "https://mamefatoufaye.tech/";

const [html, robots, sitemap] = await Promise.all([
  readFile(path.join(root, "dist", "index.html"), "utf8"),
  readFile(path.join(root, "dist", "robots.txt"), "utf8"),
  readFile(path.join(root, "dist", "sitemap.xml"), "utf8"),
]);

const checks = [
  [html.includes(`<link rel="canonical" href="${siteUrl}"`), "URL canonique absente ou incorrecte"],
  [html.includes(`<meta property="og:url" content="${siteUrl}"`), "URL Open Graph incorrecte"],
  [/<meta\s+name="robots"/u.test(html), "balise robots absente"],
  [html.includes('<script type="application/ld+json">'), "JSON-LD absent"],
  [html.includes('"@type": "ProfilePage"'), "schéma ProfilePage absent"],
  [html.includes('"@type": "Person"'), "schéma Person absent"],
  [html.includes('<main id="contenu-principal"'), "contenu principal non pré-rendu"],
  [html.includes('<h1'), "H1 non pré-rendu"],
  [robots.includes(`Sitemap: ${siteUrl}sitemap.xml`), "robots.txt pointe vers un mauvais sitemap"],
  [sitemap.includes(`<loc>${siteUrl}</loc>`), "sitemap.xml pointe vers une mauvaise URL"],
  [!html.includes("portfolio-mami.vercel.app"), "ancienne URL Vercel encore présente dans le HTML"],
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);

if (failures.length > 0) {
  throw new Error(`Contrôle SEO échoué :\n- ${failures.join("\n- ")}`);
}

const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/u);
if (!jsonLdMatch?.[1]) {
  throw new Error("Bloc JSON-LD introuvable.");
}
JSON.parse(jsonLdMatch[1]);

console.log("Contrôle SEO réussi : domaine, métadonnées, JSON-LD et HTML pré-rendu sont cohérents.");
