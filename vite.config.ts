import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { loadEnv, type Plugin } from "vite";
import { defineConfig } from "vitest/config";

const DEFAULT_SITE_URL = "https://portfolio-mami.vercel.app/";
const SITE_URL_PLACEHOLDER = "__PORTFOLIO_SITE_URL__/";

function resolveSiteUrl(value: string | undefined) {
  try {
    const url = new URL(value || DEFAULT_SITE_URL);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return DEFAULT_SITE_URL;
    }

    url.hash = "";
    url.search = "";
    url.pathname = `${url.pathname.replace(/\/+$/, "")}/`;

    return url.href;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

function injectSiteUrl(siteUrl: string): Plugin {
  return {
    name: "portfolio-site-url",
    enforce: "pre",
    transformIndexHtml: {
      order: "pre",
      handler: (html) => html.replaceAll(SITE_URL_PLACEHOLDER, siteUrl),
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const siteUrl = resolveSiteUrl(env.VITE_SITE_URL);

  return {
    plugins: [injectSiteUrl(siteUrl), react(), tailwindcss()],
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
          url: DEFAULT_SITE_URL,
        },
      },
    },
  };
});
