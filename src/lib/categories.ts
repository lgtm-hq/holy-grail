/**
 * Centralized category configuration for Holy Grail documentation
 *
 * Single source of truth for category colors, icons, and metadata
 */

export const CATEGORIES = {
  foundation: {
    name: "Foundation",
    color: "#a6e3a1",
    icon: "🏗️",
    cardIcon: "🏰",
    description: "Essential tools: Homebrew, ZSH, SDKMAN",
  },
  languages: {
    name: "Languages",
    color: "#89b4fa",
    icon: "📚",
    cardIcon: "📜",
    description: "Python, Java, NodeJS setup guides",
  },
  ides: {
    name: "IDEs",
    color: "#f9e2af",
    icon: "🛠️",
    cardIcon: "⚔️",
    description: "Android Studio, XCode configuration",
  },
  testing: {
    name: "Testing",
    color: "#f38ba8",
    icon: "🧪",
    cardIcon: "🛡️",
    description: "Appium, UI Testing frameworks",
  },
  tools: {
    name: "Tools",
    color: "#cba6f7",
    icon: "⚙️",
    cardIcon: "🔧",
    description: "Utilities and development tools",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
export type Category = (typeof CATEGORIES)[CategoryKey];

/**
 * Get category configuration by key (case-insensitive)
 */
export function getCategory(key: string): Category | undefined {
  const normalizedKey = key.toLowerCase() as CategoryKey;
  return CATEGORIES[normalizedKey];
}

/**
 * Get category color, with fallback to gold for unknown categories
 */
export function getCategoryColor(key: string): string {
  return getCategory(key)?.color ?? "var(--grail-gold)";
}

/**
 * Get category icon for headers/badges
 */
export function getCategoryIcon(key: string): string {
  return getCategory(key)?.icon ?? "📜";
}

/**
 * Get category icon for cards
 */
export function getCategoryCardIcon(key: string): string {
  return getCategory(key)?.cardIcon ?? "📄";
}

/**
 * Get all categories as an array for iteration
 */
export function getAllCategories() {
  return Object.entries(CATEGORIES).map(([slug, data]) => ({
    slug,
    ...data,
  }));
}

/**
 * Check if a string is a valid category key
 */
export function isValidCategory(key: string): key is CategoryKey {
  const normalizedKey = key.toLowerCase();
  return Object.prototype.hasOwnProperty.call(CATEGORIES, normalizedKey);
}

/**
 * Get canonical category slug from display name or slug
 * Handles both slug (e.g., "ides") and display name (e.g., "IDEs")
 */
export function getCategorySlug(category: string): string {
  const normalized = category.toLowerCase();
  // Direct match on slug
  if (Object.prototype.hasOwnProperty.call(CATEGORIES, normalized)) {
    return normalized;
  }
  // Match on display name
  for (const [slug, data] of Object.entries(CATEGORIES)) {
    if (data.name.toLowerCase() === normalized) {
      return slug;
    }
  }
  // Fallback to normalized input
  return normalized;
}
