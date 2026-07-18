import { describe, expect, it } from "bun:test";

import { generateMarkdown, type GuideData } from "../../src/lib/markdownExporter";

function baseGuide(overrides: Partial<GuideData> = {}): GuideData {
  return {
    title: "Sample Guide",
    description: "A sample description",
    category: "Foundation",
    content: "",
    ...overrides,
  };
}

describe("generateMarkdown", () => {
  describe("frontmatter", () => {
    it("emits required fields wrapped in a YAML fence", () => {
      const output = generateMarkdown(baseGuide());

      expect(output).toStartWith("---\n");
      expect(output).toContain('title: "Sample Guide"');
      expect(output).toContain('description: "A sample description"');
      expect(output).toContain("category: Foundation");
      expect(output).toContain("---\n");
    });

    it("omits optional fields when not provided", () => {
      const output = generateMarkdown(baseGuide());

      expect(output).not.toContain("order:");
      expect(output).not.toContain("tags:");
      expect(output).not.toContain("difficulty:");
      expect(output).not.toContain("estimatedMinutes:");
    });

    it("includes optional fields when provided", () => {
      const output = generateMarkdown(
        baseGuide({
          order: 3,
          tags: ["macos", "package-manager"],
          difficulty: "beginner",
          estimatedMinutes: 10,
        }),
      );

      expect(output).toContain("order: 3");
      expect(output).toContain('tags: ["macos", "package-manager"]');
      expect(output).toContain("difficulty: beginner");
      expect(output).toContain("estimatedMinutes: 10");
    });

    it("emits order: 0 rather than skipping it", () => {
      const output = generateMarkdown(baseGuide({ order: 0 }));
      expect(output).toContain("order: 0");
    });

    it("escapes double quotes and backslashes in title/description", () => {
      const output = generateMarkdown(
        baseGuide({
          title: 'Guide with "quotes" and \\backslash',
          description: 'Line "one"',
        }),
      );

      expect(output).toContain('title: "Guide with \\"quotes\\" and \\\\backslash"');
      expect(output).toContain('description: "Line \\"one\\""');
    });

    it("escapes newline characters inside quoted YAML scalars", () => {
      const output = generateMarkdown(baseGuide({ description: "first line\nsecond line" }));
      expect(output).toContain('description: "first line\\nsecond line"');
    });
  });

  describe("content transformation", () => {
    it("removes MDX import statements", () => {
      const output = generateMarkdown(
        baseGuide({
          content: [
            "import LinkCard from '../../components/LinkCard.astro';",
            "",
            "## Heading",
            "",
            "body text",
          ].join("\n"),
        }),
      );

      expect(output).not.toContain("import LinkCard");
      expect(output).toContain("## Heading");
      expect(output).toContain("body text");
    });

    it("converts self-closing <LinkCard /> to a markdown link with description", () => {
      const output = generateMarkdown(
        baseGuide({
          content: '<LinkCard href="/guides/java/" title="Java" description="Setup Java" />',
        }),
      );
      expect(output).toContain("- [Java](/guides/java/) - Setup Java");
    });

    it("omits the description suffix when a <LinkCard /> has none", () => {
      const output = generateMarkdown(
        baseGuide({
          content: '<LinkCard href="/guides/java/" title="Java" />',
        }),
      );
      expect(output).toContain("- [Java](/guides/java/)");
      expect(output).not.toContain(" - \n");
    });

    it("converts <LinkBadge> to a markdown link using the guide slug", () => {
      const output = generateMarkdown(
        baseGuide({ content: '<LinkBadge href="/guides/homebrew/" />' }),
      );
      expect(output).toContain("[homebrew](/guides/homebrew/)");
    });

    it('unwraps <span class="badge-group"> and keeps its inner content', () => {
      const output = generateMarkdown(
        baseGuide({ content: '<span class="badge-group">inner text</span>' }),
      );
      expect(output).toContain("inner text");
      expect(output).not.toContain("badge-group");
    });

    it("collapses more than two consecutive blank lines", () => {
      const output = generateMarkdown(baseGuide({ content: "para one\n\n\n\npara two" }));
      expect(output).toContain("para one\n\npara two");
      expect(output).not.toMatch(/\n{3,}/);
    });

    it("tolerates empty guide content", () => {
      const output = generateMarkdown(baseGuide({ content: "" }));
      expect(output).toStartWith("---\n");
      expect(output).toContain("category: Foundation");
    });
  });
});
