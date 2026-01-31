import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Base path configuration:
// - Local development: / (default)
// - Production (GitHub Pages): /holy-grail/
// Set ASTRO_BASE=/holy-grail/ for production builds (CI deploy workflow sets this)
const base = process.env.ASTRO_BASE || '/holy-grail';

export default defineConfig({
  site: 'https://lgtm-hq.github.io',
  base,
  integrations: [mdx(), sitemap()],
  output: 'static',
  markdown: {
    shikiConfig: {
      // Use dual themes for light/dark mode
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
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
            postcssPlugin: 'suppress-import-warnings',
            Once(_root, { result }) {
              // Suppress @import order warnings from turbo-themes
              result.messages = result.messages.filter(
                (msg) => !msg.text?.includes('@import must precede')
              );
            },
          },
        ],
      },
    },
  },
});
