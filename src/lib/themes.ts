/**
 * Theme configuration for Holy Grail documentation
 *
 * Centralizes theme definitions to eliminate duplication across components
 */

export interface Theme {
  value: string;
  label: string;
}

export interface ThemeGroup {
  label: string;
  themes: readonly Theme[];
}

export const THEME_GROUPS = {
  catppuccin: {
    label: "Catppuccin",
    themes: [
      { value: "catppuccin-mocha", label: "Mocha" },
      { value: "catppuccin-macchiato", label: "Macchiato" },
      { value: "catppuccin-frappe", label: "Frappé" },
      { value: "catppuccin-latte", label: "Latte" },
    ],
  },
  github: {
    label: "GitHub",
    themes: [
      { value: "github-dark", label: "Dark" },
      { value: "github-light", label: "Light" },
    ],
  },
  dracula: {
    label: "Dracula",
    themes: [{ value: "dracula", label: "Dracula" }],
  },
  bulma: {
    label: "Bulma",
    themes: [
      { value: "bulma-dark", label: "Dark" },
      { value: "bulma-light", label: "Light" },
    ],
  },
} as const;

export const DEFAULT_DARK_THEME = "catppuccin-mocha";
export const DEFAULT_LIGHT_THEME = "catppuccin-latte";

/**
 * Get the default theme based on user's color scheme preference
 */
export function getDefaultTheme(prefersDark: boolean): string {
  return prefersDark ? DEFAULT_DARK_THEME : DEFAULT_LIGHT_THEME;
}

/**
 * Get all available themes as a flat array
 */
export function getAllThemes(): Theme[] {
  return Object.values(THEME_GROUPS).flatMap((g) => [...g.themes]);
}

/**
 * Check if a theme value is valid
 */
export function isValidTheme(theme: string): boolean {
  return getAllThemes().some((t) => t.value === theme);
}
