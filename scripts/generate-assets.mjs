import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public", "mami.png");
const imagesDirectory = path.join(root, "public", "images");
const ogDirectory = path.join(root, "public", "og");
const iconsDirectory = path.join(root, "public", "icons");

await Promise.all([
  mkdir(imagesDirectory, { recursive: true }),
  mkdir(ogDirectory, { recursive: true }),
  mkdir(iconsDirectory, { recursive: true }),
]);

for (const width of [480, 768]) {
  const height = Math.round((width * 4) / 3);
  const base = sharp(source).resize(width, height, {
    fit: "cover",
    position: "centre",
    withoutEnlargement: true,
  });

  await Promise.all([
    base
      .clone()
      .webp({ quality: 84, smartSubsample: true })
      .toFile(path.join(imagesDirectory, `portrait-${width}.webp`)),
    base
      .clone()
      .avif({ quality: 56, effort: 7, chromaSubsampling: "4:4:4" })
      .toFile(path.join(imagesDirectory, `portrait-${width}.avif`)),
  ]);
}

const portraitWidth = 410;
const portraitHeight = 548;
const portrait = await sharp(source)
  .resize(portraitWidth, portraitHeight, { fit: "cover", position: "centre" })
  .composite([
    {
      input: Buffer.from(
        `<svg width="${portraitWidth}" height="${portraitHeight}"><rect width="100%" height="100%" rx="40" fill="#fff"/></svg>`,
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

const ogBackground = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mint" cx="0" cy="0" r="1" gradientTransform="translate(930 90) rotate(120) scale(520)">
        <stop stop-color="#68edbb" stop-opacity=".28"/>
        <stop offset="1" stop-color="#68edbb" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="violet" cx="0" cy="0" r="1" gradientTransform="translate(120 610) rotate(-45) scale(430)">
        <stop stop-color="#9e8aff" stop-opacity=".18"/>
        <stop offset="1" stop-color="#9e8aff" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
        <path d="M48 0H0V48" fill="none" stroke="#ddecf6" stroke-opacity=".055"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="#05090d"/>
    <rect width="1200" height="630" fill="url(#grid)"/>
    <rect width="1200" height="630" fill="url(#mint)"/>
    <rect width="1200" height="630" fill="url(#violet)"/>
    <rect x="64" y="64" width="1072" height="502" rx="44" fill="#0e1720" fill-opacity=".62" stroke="#ddecf6" stroke-opacity=".12"/>
    <circle cx="99" cy="103" r="7" fill="#68edbb"/>
    <text x="120" y="111" fill="#96a7b2" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="2">PORTFOLIO · DAKAR</text>
    <text x="104" y="250" fill="#f2f6f8" font-family="Arial, sans-serif" font-size="67" font-weight="800" letter-spacing="-3">Mame Fatou</text>
    <text x="104" y="326" fill="#f2f6f8" font-family="Arial, sans-serif" font-size="67" font-weight="800" letter-spacing="-3">Faye</text>
    <text x="108" y="391" fill="#68edbb" font-family="Arial, sans-serif" font-size="27" font-weight="700">Développeuse logiciel &amp; web</text>
    <text x="108" y="450" fill="#96a7b2" font-family="Arial, sans-serif" font-size="21">Interfaces claires · Applications fiables</text>
    <rect x="106" y="493" width="168" height="42" rx="21" fill="#68edbb" fill-opacity=".12" stroke="#68edbb" stroke-opacity=".5"/>
    <text x="131" y="520" fill="#68edbb" font-family="Arial, sans-serif" font-size="15" font-weight="700">Dakar, Sénégal</text>
    <rect x="747" y="58" width="423" height="564" rx="48" fill="#68edbb" fill-opacity=".08" stroke="#68edbb" stroke-opacity=".22"/>
  </svg>
`);

await sharp(ogBackground)
  .composite([{ input: portrait, left: 754, top: 70 }])
  .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
  .toFile(path.join(ogDirectory, "mame-fatou-faye-og.jpg"));

const iconSvg = Buffer.from(`
  <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iconBg" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#0e1720"/>
        <stop offset="1" stop-color="#05090d"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="112" fill="url(#iconBg)"/>
    <rect x="24" y="24" width="464" height="464" rx="92" fill="none" stroke="#68edbb" stroke-opacity=".3" stroke-width="4"/>
    <text x="256" y="315" text-anchor="middle" fill="#f2f6f8" font-family="Arial, sans-serif" font-size="178" font-weight="800" letter-spacing="-14">MF<tspan fill="#68edbb">.</tspan></text>
  </svg>
`);

await Promise.all([
  sharp(iconSvg).resize(180, 180).png().toFile(path.join(iconsDirectory, "apple-touch-icon.png")),
  sharp(iconSvg).resize(192, 192).png().toFile(path.join(iconsDirectory, "icon-192.png")),
  sharp(iconSvg).resize(512, 512).png().toFile(path.join(iconsDirectory, "icon-512.png")),
]);

console.log("Portraits WebP/AVIF, image Open Graph et icônes générés.");
