/**
 * Theme switcher initialization
 *
 * Syncs the theme selector dropdown with stored theme preference
 * and handles theme changes.
 */

function initThemeSwitcher() {
  const selector = document.querySelector('.flavor-selector') as HTMLSelectElement;
  if (!selector) return;

  // Set initial value from stored theme
  const stored = localStorage.getItem('turbo-theme');
  if (stored) {
    selector.value = stored;
  }

  // Handle theme changes
  selector.addEventListener('change', (e) => {
    const target = e.target as HTMLSelectElement;
    const theme = target.value;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('turbo-theme', theme);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initThemeSwitcher);

// Re-initialize after Astro page transitions
document.addEventListener('astro:after-swap', initThemeSwitcher);
