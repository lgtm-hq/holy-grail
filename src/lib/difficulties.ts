/**
 * Difficulty level configuration for Holy Grail guides
 *
 * Centralizes difficulty definitions to eliminate duplication
 */

export interface Difficulty {
  label: string;
  icon: string;
  color: string;
}

export const DIFFICULTIES = {
  beginner: {
    label: "Beginner",
    icon: "🌱",
    color: "#a6e3a1",
  },
  intermediate: {
    label: "Intermediate",
    icon: "🌿",
    color: "#f9e2af",
  },
  advanced: {
    label: "Advanced",
    icon: "🌳",
    color: "#f38ba8",
  },
} as const;

export type DifficultyKey = keyof typeof DIFFICULTIES;

/**
 * Get difficulty configuration by key
 */
export function getDifficulty(key: string): Difficulty | null {
  return DIFFICULTIES[key as DifficultyKey] || null;
}

/**
 * Get all difficulties as an array for filter UI
 */
export function getAllDifficulties() {
  return [
    { value: "all", label: "All Levels", icon: "⚔️" },
    ...Object.entries(DIFFICULTIES).map(([value, config]) => ({
      value,
      label: config.label,
      icon: config.icon,
    })),
  ];
}

/**
 * Check if a difficulty key is valid
 */
export function isValidDifficulty(key: string): key is DifficultyKey {
  return key in DIFFICULTIES;
}
