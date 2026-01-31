/**
 * Theme switcher initialization
 *
 * Syncs the theme selector dropdown with stored theme preference
 * and handles theme changes.
 */

function initThemeSwitcher() {
  const selector = document.querySelector('.flavor-selector') as HTMLSelectElement;
  if (!selector) return;

  // Set initial value from stored theme and apply to document
  const stored = localStorage.getItem('turbo-theme');
  if (stored) {
    selector.value = stored;
    document.documentElement.setAttribute('data-theme', stored);
  }

  // Handle theme changes (use onchange to avoid duplicate listeners on re-init)
  selector.onchange = (e) => {
    const target = e.target as HTMLSelectElement;
    const theme = target.value;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('turbo-theme', theme);
  };
}

// Initialize on page load (handle case where DOM is already ready)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeSwitcher);
} else {
  initThemeSwitcher();
}

// Re-initialize after Astro page transitions
document.addEventListener('astro:after-swap', initThemeSwitcher);
