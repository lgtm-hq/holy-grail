/**
 * RSS Feed Endpoint
 *
 * Generates an RSS 2.0 feed of all published guides.
 * Guides are sorted by order (if set) then alphabetically by title.
 *
 * @route GET /rss.xml
 *
 * @returns RSS 2.0 XML feed with:
 *   - title: Guide title
 *   - description: Guide description
 *   - link: Full URL to guide
 *   - categories: Category and tags
 *
 * @requires site must be configured in astro.config.mjs
 *
 * @example
 * // Subscribe to feed
 * <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
 */
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

// Guide data shape for standalone tsc compatibility
interface GuideData {
  title: string;
  description: string;
  category: string;
  order?: number;
  tags?: string[];
}

export async function GET(context: APIContext) {
  const guides = await getCollection("guides");

  // Sort guides by order, then by title
  // Cast for standalone tsc compatibility (Astro provides proper types at runtime)
  const sortedGuides = guides.sort((a, b) => {
    const aData = a.data as GuideData;
    const bData = b.data as GuideData;
    const aOrder = aData.order;
    const bOrder = bData.order;

    // If both have order, compare by order (with title tie-break for equal orders)
    if (aOrder !== undefined && bOrder !== undefined) {
      const orderDiff = aOrder - bOrder;
      if (orderDiff !== 0) return orderDiff;
      return aData.title.localeCompare(bData.title);
    }
    // Items with order come before items without
    if (aOrder !== undefined) return -1;
    if (bOrder !== undefined) return 1;
    // If neither has order, sort by title
    return aData.title.localeCompare(bData.title);
  });

  if (!context.site) {
    throw new Error("RSS feed requires site to be configured in astro.config.mjs");
  }

  // Get base path and ensure it has trailing slash
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return rss({
    title: "Holy Grail - Developer Guides",
    description:
      "The quest for the perfect dev environment. Installation guides for mobile testing and development tools.",
    site: context.site,
    items: sortedGuides.map((guide) => {
      const guideData = guide.data as GuideData;
      return {
        title: guideData.title,
        description: guideData.description,
        link: `${base}guides/${guide.id}/`,
        categories: [guideData.category, ...(guideData.tags || [])].filter(Boolean),
      };
    }),
    customData: `<language>en-us</language>`,
  });
}
