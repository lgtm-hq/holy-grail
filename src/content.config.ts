import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    order: z.number().optional().default(0),
    tags: z.array(z.string()).optional().default([]),
    // New optional fields
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    estimatedMinutes: z.number().optional(),
    relatedGuides: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { guides };
