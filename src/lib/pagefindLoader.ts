/**
 * Pagefind loader utilities for Holy Grail documentation
 *
 * Handles dynamic loading of Pagefind search assets
 */

declare global {
  interface Window {
    PagefindUI: new (options: PagefindUIOptions) => void;
  }
}

export interface PagefindUIOptions {
  element: string;
  showSubResults?: boolean;
  showImages?: boolean;
  excerptLength?: number;
  resetStyles?: boolean;
  baseUrl?: string;
}

/**
 * Sanitize a base path to prevent XSS attacks
 *
 * - Rejects absolute URLs, protocol-relative URLs, and dangerous schemes
 * - Normalizes to a safe relative path under the current origin
 * - Returns '/' if the value is invalid
 */
function sanitizeBasePath(rawBase: string | null): string {
  if (!rawBase) return '/';

  const trimmed = rawBase.trim();

  // Reject protocol-relative URLs (//example.com)
  if (trimmed.startsWith('//')) return '/';

  // Reject URLs with schemes (http:, javascript:, data:, etc.)
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/i.test(trimmed)) return '/';

  // Reject values with dangerous characters (quotes, whitespace that could break out)
  if (/[\s"'<>]/.test(trimmed)) return '/';

  // Use URL constructor to resolve against current origin and extract only the pathname
  try {
    const url = new URL(trimmed, window.location.origin);
    // Only keep the pathname, discarding any scheme/host changes
    const pathname = url.pathname;
    // Ensure it starts with /
    return pathname.startsWith('/') ? pathname : '/' + pathname;
  } catch {
    // If URL parsing fails, return safe default
    return '/';
  }
}

/**
 * Get the base path from the document
 */
export function getBasePath(): string {
  const rawBase = document.documentElement.getAttribute('data-base');
  const base = sanitizeBasePath(rawBase);
  return base.endsWith('/') ? base : base + '/';
}

/**
 * Escape a string for safe use in CSS attribute selectors
 */
function escapeCssSelector(value: string): string {
  return value.replace(/["\\]/g, '\\$&');
}

/**
 * Load a CSS file dynamically
 */
export function loadCss(href: string): void {
  // Use escaped selector to prevent CSS selector injection
  const escapedHref = escapeCssSelector(href);
  if (document.querySelector(`link[href="${escapedHref}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Load a JavaScript file dynamically
 */
export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Use escaped selector to prevent CSS selector injection
    const escapedSrc = escapeCssSelector(src);
    const existingScript = document.querySelector(`script[src="${escapedSrc}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

/**
 * Initialize PagefindUI
 */
export function initPagefindUI(options: PagefindUIOptions): boolean {
  if (!window.PagefindUI) return false;

  new window.PagefindUI(options);
  return true;
}

/**
 * Load and initialize Pagefind for search
 */
export async function loadPagefind(
  containerId: string,
  onError?: (message: string) => void,
): Promise<boolean> {
  const basePath = getBasePath();
  const cssPath = `${basePath}pagefind/pagefind-ui.css`;
  const jsPath = `${basePath}pagefind/pagefind-ui.js`;

  // Load CSS
  loadCss(cssPath);

  // Check if already loaded
  if (window.PagefindUI) {
    return initPagefindUI({
      element: `#${containerId}`,
      showSubResults: true,
      showImages: false,
      excerptLength: 15,
      resetStyles: false,
      baseUrl: basePath,
    });
  }

  // Load JS
  try {
    await loadScript(jsPath);
    return initPagefindUI({
      element: `#${containerId}`,
      showSubResults: true,
      showImages: false,
      excerptLength: 15,
      resetStyles: false,
      baseUrl: basePath,
    });
  } catch {
    onError?.('Search unavailable. Run <code>bun run build</code> first.');
    return false;
  }
}
