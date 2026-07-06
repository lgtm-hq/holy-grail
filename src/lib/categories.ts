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
  "build-tools": {
    name: "Build Tools",
    color: "#fab387",
    icon: "🔨",
    cardIcon: "⚒️",
    description: "Maven, Gradle, and build automation tools",
  },
  "android-tools": {
    name: "Android Tools",
    color: "#a6e3a1",
    icon: "🤖",
    cardIcon: "🤖",
    description: "ADB, Android Emulator, and Android device utilities",
  },
  "ios-tools": {
    name: "iOS Tools",
    color: "#94e2d5",
    icon: "📱",
    cardIcon: "📲",
    description: "Carthage, ios-deploy, ideviceinstaller, and iOS device utilities",
  },
  infrastructure: {
    name: "Infrastructure",
    color: "#74c7ec",
    icon: "🔒",
    cardIcon: "🏗️",
    description: "SSH, networking, dotfiles, and server hardening",
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
export type CategoryName = Category["name"];

/**
 * All category display names, derived from CATEGORIES.
 *
 * Single source of truth for schema validation (guide frontmatter uses
 * display names such as "Android Tools", "Build Tools", "iOS Tools").
 */
// Assertion is safe: CATEGORIES is a non-empty `as const` object, so every
// mapped name is a CategoryName and the array is non-empty.
export const CATEGORY_NAMES = Object.values(CATEGORIES).map((category) => category.name) as [
  CategoryName,
  ...CategoryName[],
];

/**
 * Get category configuration by key (case-insensitive)
 */
export function getCategory(key: string): Category | undefined {
  const normalizedKey = key.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(CATEGORIES, normalizedKey)) {
    return CATEGORIES[normalizedKey as CategoryKey];
  }
  return undefined;
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
export function getCategorySlug(category: string): string | undefined {
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
  return undefined;
}
