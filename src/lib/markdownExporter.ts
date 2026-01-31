/**
 * Markdown export utilities for Holy Grail documentation
 *
 * Converts guide data to clean Markdown format
 */

export interface GuideData {
  title: string;
  description: string;
  category: string;
  order?: number;
  tags?: string[];
  difficulty?: string;
  estimatedMinutes?: number;
  content: string;
}

/**
 * Generate a complete Markdown document from guide data
 */
export function generateMarkdown(data: GuideData): string {
  const frontmatter = buildFrontmatter(data);
  const content = convertMdxToMarkdown(data.content);
  return frontmatter + content;
}

/**
 * Build YAML frontmatter from guide metadata
 */
function buildFrontmatter(data: GuideData): string {
  const lines = [
    '---',
    `title: "${data.title}"`,
    `description: "${data.description}"`,
    `category: ${data.category}`,
  ];

  if (data.order !== undefined && data.order !== null) {
    lines.push(`order: ${data.order}`);
  }
  if (data.tags?.length) {
    lines.push(`tags: [${data.tags.map((t) => `"${t}"`).join(', ')}]`);
  }
  if (data.difficulty) {
    lines.push(`difficulty: ${data.difficulty}`);
  }
  if (data.estimatedMinutes) {
    lines.push(`estimatedMinutes: ${data.estimatedMinutes}`);
  }

  lines.push('---', '');
  return lines.join('\n');
}

/**
 * Convert MDX content to clean Markdown
 */
function convertMdxToMarkdown(content: string): string {
  let result = content || '';

  // Remove import statements
  result = result.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');

  // Convert LinkCard components to markdown links
  result = result.replace(/<LinkCard\s+([\s\S]*?)\s*\/>/g, (_, attrs) => {
    const href = attrs.match(/href="([^"]+)"/)?.[1] || '';
    const title = attrs.match(/title="([^"]+)"/)?.[1] || '';
    const description = attrs.match(/description="([^"]+)"/)?.[1] || '';
    if (href && title) {
      return description ? `- [${title}](${href}) - ${description}` : `- [${title}](${href})`;
    }
    return '';
  });

  // Convert LinkBadge to simple markdown links (for prerequisites)
  result = result.replace(
    /<LinkBadge\s+href="[^"]*\/guides\/([^/"]+)\/?"\s*\/>/g,
    '[$1](/guides/$1/)',
  );

  // Remove badge-group wrapper spans but keep inner content
  result = result.replace(/<span class="badge-group">([\s\S]*?)<\/span>/g, '$1');

  // Convert Callout components to blockquotes
  result = result.replace(
    /<Callout\s+type=["'](\w+)["'](?:\s+title=["']([^"']+)["'])?\s*>([\s\S]*?)<\/Callout>/g,
    (_, type, title, inner) => {
      const prefix = title ? `**${title}:** ` : '';
      const icon =
        type === 'warning'
          ? '> [!WARNING]\n> '
          : type === 'danger'
            ? '> [!CAUTION]\n> '
            : type === 'tip'
              ? '> [!TIP]\n> '
              : '> [!NOTE]\n> ';
      return `${icon}${prefix}${inner.trim()}`;
    },
  );

  // Remove any remaining JSX-style self-closing tags we don't handle
  result = result.replace(/<[A-Z][a-zA-Z]*\s+[^>]*\/>/g, '');

  // Remove empty lines at start
  result = result.replace(/^\s*\n+/, '');

  // Clean up multiple consecutive blank lines
  result = result.replace(/\n{3,}/g, '\n\n');

  return result;
}
