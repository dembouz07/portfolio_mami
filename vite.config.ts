import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

const SITE_URL = "https://mamefatoufaye.tech/";
const SITE_URL_PLACEHOLDER = "__PORTFOLIO_SITE_URL__/";

export default defineConfig({
  plugins: [
    {
      name: "portfolio-site-url",
      enforce: "pre",
      transformIndexHtml: {
        order: "pre",
        handler: (html) => html.replaceAll(SITE_URL_PLACEHOLDER, SITE_URL),
      },
    },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    assetsInlineLimit: 4_096,
    cssCodeSplit: true,
    sourcemap: false,
  },
  server: {
    port: 5_173,
  },
  preview: {
    port: 4_173,
    strictPort: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**", "dist/**"],
    clearMocks: true,
    css: true,
    environmentOptions: {
      jsdom: {
        url: SITE_URL,
      },
    },
  },
});
