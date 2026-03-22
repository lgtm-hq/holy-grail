/**
 * Theme switcher powered by turbo-themes selector
 *
 * Bridges a gap: turbo-themes selector sets a class (theme-{id}) on <html>,
 * but the bundled CSS uses [data-theme="..."] attribute selectors.
 * This script syncs class → attribute and updates the trigger label.
 */

import { initTheme, wireFlavorSelector } from "@lgtm-hq/turbo-themes/selector";

// The import triggers auto-init on DOMContentLoaded (module-level code in selector).

let selectorCleanup: (() => void) | null = null;
let classObserver: MutationObserver | null = null;

/** Extract theme ID from the html element's class list (e.g. "theme-catppuccin-mocha" → "catppuccin-mocha") */
function getThemeFromClass(): string | null {
  for (const cls of document.documentElement.classList) {
    if (cls.startsWith("theme-")) {
      return cls.substring(6);
    }
  }
  return null;
}

/** Extract the short display name from a theme ID (e.g. "catppuccin-mocha" → "Mocha") */
function getThemeLabel(themeId: string): string {
  const parts = themeId.split("-");
  const variant = parts[parts.length - 1];
  return variant.charAt(0).toUpperCase() + variant.slice(1);
}

/** Sync the theme class to data-theme attribute and update trigger label */
function syncTheme() {
  const themeId = getThemeFromClass();
  if (!themeId) return;

  // Sync class → attribute (the bundled CSS uses [data-theme="..."] selectors)
  const current = document.documentElement.getAttribute("data-theme");
  if (current !== themeId) {
    document.documentElement.setAttribute("data-theme", themeId);
  }

  // Update trigger label
  const label = document.getElementById("theme-trigger-label");
  if (label) {
    label.textContent = getThemeLabel(themeId);
  }
}

/** Watch for class changes on <html> to detect theme switches by turbo-themes selector */
function observeClassChanges() {
  if (classObserver) {
    classObserver.disconnect();
  }

  classObserver = new MutationObserver(() => syncTheme());
  classObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

async function initSelector() {
  if (selectorCleanup) {
    selectorCleanup();
    selectorCleanup = null;
  }

  try {
    await initTheme(document, window);
    const { cleanup } = await wireFlavorSelector(document, window);
    selectorCleanup = cleanup;
  } catch (e) {
    console.error("[theme-switcher]", e);
  }

  syncTheme();
  observeClassChanges();
}

// On first load, the auto-init handles the selector.
// We just need to start observing and sync the initial state.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    syncTheme();
    observeClassChanges();
  });
} else {
  syncTheme();
  observeClassChanges();
}

// Re-initialize after Astro view transitions
document.addEventListener("astro:after-swap", initSelector);
