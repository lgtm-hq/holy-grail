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
 * Get the base path from the document
 */
export function getBasePath(): string {
  const base = document.documentElement.getAttribute('data-base') || '/';
  return base.endsWith('/') ? base : base + '/';
}

/**
 * Load a CSS file dynamically
 */
export function loadCss(href: string): void {
  if (document.querySelector(`link[href="${href}"]`)) return;

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
    const existingScript = document.querySelector(`script[src="${src}"]`);
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
