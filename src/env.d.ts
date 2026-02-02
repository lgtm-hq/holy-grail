/// <reference types="astro/client" />

// Augment ImportMeta for environments that don't support import.meta natively
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
  readonly SITE: string | undefined;
  readonly ASSETS_PREFIX: string | undefined;
}

// Type declarations for Astro virtual modules when type-checked outside Astro context
declare module "astro:content" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export interface CollectionEntry<C extends string = string> {
    id: string;
    slug: string;
    body: string;
    collection: C;
    // Use any to allow property access without type errors when running standalone tsc
    // Real types come from Astro's generated types during astro check
    data: {
      title: string;
      description: string;
      pubDate?: Date;
      updatedDate?: Date;
      category?: string;
      difficulty?: string;
      estimatedTime?: string;
      estimatedMinutes?: number;
      prerequisites?: string[];
      order?: number;
      tags?: string[];
      relatedGuides?: string[];
    };
    render: () => Promise<{ Content: unknown }>;
  }

  export function getCollection<C extends string>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => boolean,
  ): Promise<CollectionEntry<C>[]>;

  export function defineCollection(config: { loader?: unknown; schema?: unknown }): unknown;
}

declare module "astro/loaders" {
  export function glob(options: { pattern: string; base: string }): unknown;
}
