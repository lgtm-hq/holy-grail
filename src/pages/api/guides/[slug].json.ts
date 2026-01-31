/**
 * Guide JSON API Endpoint
 *
 * Returns guide data as JSON for download and programmatic access.
 *
 * @route GET /api/guides/[slug].json
 *
 * @param slug - The guide identifier (e.g., "appium", "java")
 *
 * @returns {Object} Guide data including:
 *   - id: string - Guide identifier
 *   - title: string - Guide title
 *   - description: string - Brief description
 *   - category: string - Category name
 *   - order: number | null - Display order
 *   - tags: string[] - Associated tags
 *   - difficulty: string | null - Difficulty level
 *   - estimatedMinutes: number | null - Estimated reading time
 *   - relatedGuides: string[] - Related guide IDs
 *   - content: string - Raw MDX content
 *
 * @example
 * // Fetch guide data
 * const response = await fetch('/api/guides/appium.json');
 * const data = await response.json();
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { logger } from '../../../lib/logger';

export const getStaticPaths: GetStaticPaths = async () => {
  const guides = await getCollection('guides');
  return guides.map((guide) => ({
    params: { slug: guide.id },
    props: { guide },
  }));
};

export const GET: APIRoute = async ({ props, params }) => {
  try {
    const { guide } = props as { guide: Awaited<ReturnType<typeof getCollection<'guides'>>>[number] };

    if (!guide) {
      logger.error('API', `Guide not found: ${params.slug}`);
      return new Response(
        JSON.stringify({ error: 'Guide not found', slug: params.slug }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    logger.info('API', `Serving guide: ${guide.id}`);

    const data = {
      id: guide.id,
      title: guide.data.title,
      description: guide.data.description,
      category: guide.data.category,
      order: guide.data.order ?? null,
      tags: guide.data.tags ?? [],
      difficulty: guide.data.difficulty ?? null,
      estimatedMinutes: guide.data.estimatedMinutes ?? null,
      relatedGuides: guide.data.relatedGuides ?? [],
      content: guide.body ?? '',
    };

    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    logger.error('API', `Error processing guide ${params.slug}:`, error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
