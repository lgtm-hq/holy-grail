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
 * Sanitize the base path read from the document
 *
 * Ensures the base path is a safe relative path rooted at `/` and
 * does not contain a URL scheme or protocol-relative prefix.
 */
function sanitizeBasePath(rawBase: string | null): string {
  if (!rawBase) {
    return '/';
  }

  const trimmed = rawBase.trim();

  // Disallow absolute/protocol-relative URLs like "http://", "https://", "//", "javascript:", etc.
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed) || trimmed.startsWith('//')) {
    return '/';
  }

  // Ensure path starts with a single leading slash
  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : '/' + trimmed;

  return withLeadingSlash;
}

/**
 * Get the base path from the document
 */
export function getBasePath(): string {
  const base = sanitizeBasePath(document.documentElement.getAttribute('data-base'));
  return base.endsWith('/') ? base : base + '/';
}

/**
 * Escape a string for safe use in CSS attribute selectors
 */
function escapeCssSelector(value: string): string {
  return value.replace(/["\\]/g, '\\$&');
}

/**
 * Validate and sanitize a URL for safe resource loading
 *
 * - Only allows same-origin URLs (relative paths or same origin absolute)
 * - Rejects javascript:, data:, and other dangerous schemes
 * - Returns null if the URL is invalid/unsafe
 */
function sanitizeResourceUrl(url: string): string | null {
  try {
    const resolved = new URL(url, window.location.origin);

    // Only allow same-origin resources
    if (resolved.origin !== window.location.origin) {
      return null;
    }

    // Reject dangerous schemes (only allow http/https which are same-origin)
    if (!['http:', 'https:'].includes(resolved.protocol)) {
      return null;
    }

    // Return the full URL (same-origin, safe protocol)
    return resolved.href;
  } catch {
    return null;
  }
}

/**
 * Load a CSS file dynamically
 */
export function loadCss(href: string): void {
  // Validate URL before loading to prevent loading malicious resources
  const safeHref = sanitizeResourceUrl(href);
  if (!safeHref) {
    console.error('Refused to load CSS from unsafe URL:', href);
    return;
  }

  // Use escaped selector to prevent CSS selector injection
  const escapedHref = escapeCssSelector(safeHref);
  if (document.querySelector(`link[href="${escapedHref}"]`)) return;

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = safeHref;
  document.head.appendChild(link);
}

/**
 * Load a JavaScript file dynamically
 */
export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Validate URL before loading to prevent loading malicious scripts
    const safeSrc = sanitizeResourceUrl(src);
    if (!safeSrc) {
      reject(new Error(`Refused to load script from unsafe URL: ${src}`));
      return;
    }

    // Use escaped selector to prevent CSS selector injection
    const escapedSrc = escapeCssSelector(safeSrc);
    const existingScript = document.querySelector(`script[src="${escapedSrc}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      return;
    }

    const script = document.createElement('script');
    script.src = safeSrc;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${safeSrc}`));
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
