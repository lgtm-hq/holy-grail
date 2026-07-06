import { readdirSync } from "node:fs";
import { join } from "node:path";
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { CATEGORY_NAMES } from "./lib/categories";

const GUIDES_DIR = "./src/content/guides";

/**
 * Recursively collect guide entry ids under a directory, mirroring how the
 * glob loader derives ids: POSIX-style path relative to the base directory
 * with the extension stripped (e.g. "adb", "foo/bar").
 */
function collectGuideIds(dir: string, prefix = ""): string[] {
  const ids: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      ids.push(...collectGuideIds(join(dir, entry.name), `${prefix}${entry.name}/`));
    } else if (/\.mdx?$/.test(entry.name)) {
      ids.push(`${prefix}${entry.name.replace(/\.mdx?$/, "")}`);
    }
  }
  return ids;
}

/**
 * Ids of all existing guide files, used to validate relatedGuides entries
 * at build time. Read once when the config is evaluated.
 */
const existingGuideSlugs = new Set(collectGuideIds(GUIDES_DIR));

const guides = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: GUIDES_DIR }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORY_NAMES),
    order: z.number().optional().default(0),
    tags: z.array(z.string()).optional().default([]),
    // New optional fields
    difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
    estimatedMinutes: z.number().optional(),
    relatedGuides: z
      .array(z.string())
      .optional()
      .default([])
      .superRefine((slugs, ctx) => {
        for (const [index, slug] of slugs.entries()) {
          if (!existingGuideSlugs.has(slug)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: [index],
              message: `relatedGuides entry "${slug}" does not match any guide file in ${GUIDES_DIR}`,
            });
          }
        }
      }),
    heroImage: z.string().optional(),
  }),
});

export const collections = { guides };
