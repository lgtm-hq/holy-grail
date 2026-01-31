/**
 * Path utilities for Holy Grail documentation
 *
 * Handles base path prefixing for deployment flexibility
 */

/**
 * Prepend the base URL to a path
 *
 * @param path - The path to prefix (can start with / or not)
 * @returns The full path with base URL prepended
 *
 * @example
 * // With BASE_URL="/holy-grail/"
 * withBase('/guides/') // => "/holy-grail/guides/"
 * withBase('guides/')  // => "/holy-grail/guides/"
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Ensure base ends with / for proper concatenation
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${cleanPath}`;
}

/**
 * Get the base URL without trailing slash
 */
export function getBase(): string {
  const base = import.meta.env.BASE_URL;
  return base.endsWith('/') ? base.slice(0, -1) : base;
}

/**
 * Check if a path matches the current base
 */
export function isInternalPath(path: string): boolean {
  const base = import.meta.env.BASE_URL;
  return path.startsWith(base) || path.startsWith('/');
}

/**
 * Extract guide slug from href
 * @example extractGuideSlug('/guides/java/') → 'java'
 * @example extractGuideSlug('/holy-grail/guides/appium/') → 'appium'
 */
export function extractGuideSlug(href: string): string | null {
  const match = href.match(/\/guides\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

/**
 * Check if href points to a guide
 */
export function isGuideHref(href: string): boolean {
  return href.includes('/guides/') && !href.startsWith('http');
}
