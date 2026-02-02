import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Base path configuration:
// - Default: /holy-grail (for GitHub Pages deployment)
// - Override with ASTRO_BASE env var for different deployments
// - Set ASTRO_BASE=/ for local development at root path
const base = process.env.ASTRO_BASE || "/holy-grail";

export default defineConfig({
  site: "https://lgtm-hq.github.io",
  base,
  integrations: [mdx(), sitemap()],
  output: "static",
  markdown: {
    shikiConfig: {
      // Use dual themes for light/dark mode
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      // Wrap in a class so we can control which is visible
      defaultColor: false,
    },
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: "suppress-import-warnings",
            Once(_root, { result }) {
              // Suppress @import order warnings from turbo-themes
              result.messages = result.messages.filter(
                (msg) => !msg.text?.includes("@import must precede"),
              );
            },
          },
        ],
      },
    },
  },
});
