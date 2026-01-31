/**
 * Code block copy-to-clipboard functionality
 *
 * Wraps code blocks and adds copy buttons that appear on hover.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

function createSvgElement(
  tag: string,
  attrs: Record<string, string>,
): SVGElement {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
}

function createCopyIcon(): SVGElement {
  const svg = createSvgElement('svg', {
    class: 'copy-icon',
    viewBox: '0 0 24 24',
    width: '16',
    height: '16',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
  });
  svg.appendChild(
    createSvgElement('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }),
  );
  svg.appendChild(
    createSvgElement('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' }),
  );
  return svg;
}

function createCheckIcon(): SVGElement {
  const svg = createSvgElement('svg', {
    class: 'check-icon',
    viewBox: '0 0 24 24',
    width: '16',
    height: '16',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    style: 'display: none;',
  });
  svg.appendChild(createSvgElement('polyline', { points: '20 6 9 17 4 12' }));
  return svg;
}

function createCopyButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-button';
  button.setAttribute('aria-label', 'Copy code to clipboard');
  button.appendChild(createCopyIcon());
  button.appendChild(createCheckIcon());
  return button;
}

async function handleCopy(button: HTMLButtonElement, pre: HTMLPreElement) {
  const code = pre.querySelector('code');
  const text = code?.textContent || pre.textContent || '';

  try {
    await navigator.clipboard.writeText(text);
    showCopySuccess(button);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}

function showCopySuccess(button: HTMLButtonElement) {
  const copyIcon = button.querySelector('.copy-icon') as HTMLElement;
  const checkIcon = button.querySelector('.check-icon') as HTMLElement;

  if (copyIcon && checkIcon) {
    copyIcon.style.display = 'none';
    checkIcon.style.display = 'block';
    button.classList.add('copied');

    setTimeout(() => {
      copyIcon.style.display = 'block';
      checkIcon.style.display = 'none';
      button.classList.remove('copied');
    }, 2000);
  }
}

function initCodeCopy() {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach((pre) => {
    // Skip if already wrapped
    if (pre.parentElement?.classList.contains('code-block-wrapper')) return;

    // Create wrapper for positioning
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';
    pre.parentNode?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    // Create and attach copy button
    const button = createCopyButton();
    wrapper.appendChild(button);

    button.addEventListener('click', () => handleCopy(button, pre));
  });
}

// Initialize on page load (handle case where DOM is already ready)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCodeCopy);
} else {
  initCodeCopy();
}

// Re-initialize after Astro page transitions
document.addEventListener('astro:after-swap', initCodeCopy);
