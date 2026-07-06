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
 * Escape a value for use inside a double-quoted YAML scalar
 */
function escapeYamlValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(
      // Remaining C0 controls and DEL are invalid raw inside YAML double quotes
      // eslint-disable-next-line no-control-regex
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
      (ch) => `\\x${ch.charCodeAt(0).toString(16).padStart(2, "0")}`,
    );
}

/**
 * Build YAML frontmatter from guide metadata
 */
function buildFrontmatter(data: GuideData): string {
  const lines = [
    "---",
    `title: "${escapeYamlValue(data.title)}"`,
    `description: "${escapeYamlValue(data.description)}"`,
    `category: ${data.category}`,
  ];

  if (data.order !== undefined && data.order !== null) {
    lines.push(`order: ${data.order}`);
  }
  if (data.tags?.length) {
    lines.push(`tags: [${data.tags.map((t) => `"${escapeYamlValue(t)}"`).join(", ")}]`);
  }
  if (data.difficulty) {
    lines.push(`difficulty: ${data.difficulty}`);
  }
  if (data.estimatedMinutes) {
    lines.push(`estimatedMinutes: ${data.estimatedMinutes}`);
  }

  lines.push("---", "");
  return lines.join("\n");
}

/**
 * Convert MDX content to clean Markdown
 */
function convertMdxToMarkdown(content: string): string {
  let result = content || "";

  // Remove import statements
  result = result.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, "");

  // Convert LinkCard components to markdown links
  result = result.replace(/<LinkCard\s+([\s\S]*?)\s*\/>/g, (_, attrs) => {
    const href = attrs.match(/href="([^"]+)"/)?.[1] || "";
    const title = attrs.match(/title="([^"]+)"/)?.[1] || "";
    const description = attrs.match(/description="([^"]+)"/)?.[1] || "";
    if (href && title) {
      return description ? `- [${title}](${href}) - ${description}` : `- [${title}](${href})`;
    }
    return "";
  });

  // Convert LinkBadge to simple markdown links (for prerequisites)
  result = result.replace(
    /<LinkBadge\s+href="[^"]*\/guides\/([^/"]+)\/?"\s*\/>/g,
    "[$1](/guides/$1/)",
  );

  // Remove badge-group wrapper spans but keep inner content
  result = result.replace(/<span class="badge-group">([\s\S]*?)<\/span>/g, "$1");

  // Remove any remaining JSX-style self-closing tags we don't handle
  result = result.replace(/<[A-Z][a-zA-Z]*\s+[^>]*\/>/g, "");

  // Remove empty lines at start
  result = result.replace(/^\s*\n+/, "");

  // Clean up multiple consecutive blank lines
  result = result.replace(/\n{3,}/g, "\n\n");

  return result;
}
