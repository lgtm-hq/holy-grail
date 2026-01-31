/**
 * Tool icon configuration
 * Maps guide slugs to their icon paths or fallback emojis
 */

export interface ToolIcon {
  type: 'svg' | 'emoji';
  value: string; // Path for SVG, emoji character for emoji
  alt?: string;
}

// Tool icons mapped by guide slug
export const TOOL_ICONS: Record<string, ToolIcon> = {
  // Foundation
  'homebrew': { type: 'svg', value: '/icons/homebrew.svg', alt: 'Homebrew' },
  'zsh': { type: 'svg', value: '/icons/terminal.svg', alt: 'ZSH' },
  'sdkman': { type: 'svg', value: '/icons/sdkman.svg', alt: 'SDKMAN!' },

  // Languages
  'python': { type: 'svg', value: '/icons/python.svg', alt: 'Python' },
  'pipenv': { type: 'svg', value: '/icons/python.svg', alt: 'Pipenv' },
  'java': { type: 'svg', value: '/icons/java.svg', alt: 'Java' },
  'nodejs': { type: 'svg', value: '/icons/nodejs.svg', alt: 'Node.js' },
  'gradle': { type: 'svg', value: '/icons/gradle.svg', alt: 'Gradle' },
  'maven': { type: 'svg', value: '/icons/maven.svg', alt: 'Maven' },
  'black': { type: 'svg', value: '/icons/python.svg', alt: 'Black' },

  // IDEs
  'android-studio': { type: 'svg', value: '/icons/android-studio.svg', alt: 'Android Studio' },
  'xcode': { type: 'svg', value: '/icons/xcode.svg', alt: 'Xcode' },

  // Testing
  'appium': { type: 'svg', value: '/icons/appium.svg', alt: 'Appium' },
  'appium-inspector': { type: 'svg', value: '/icons/appium.svg', alt: 'Appium Inspector' },
  'appium-doctor': { type: 'svg', value: '/icons/appium.svg', alt: 'Appium Doctor' },
  'adb': { type: 'svg', value: '/icons/android.svg', alt: 'ADB' },
  'android-emulator': { type: 'svg', value: '/icons/android.svg', alt: 'Android Emulator' },
  'ios-deploy': { type: 'svg', value: '/icons/apple.svg', alt: 'iOS Deploy' },
  'libimobiledevice': { type: 'svg', value: '/icons/apple.svg', alt: 'libimobiledevice' },
  'carthage': { type: 'svg', value: '/icons/apple.svg', alt: 'Carthage' },
  'ideviceinstaller': { type: 'svg', value: '/icons/apple.svg', alt: 'ideviceinstaller' },
  'ios-webkit-debug-proxy': { type: 'svg', value: '/icons/apple.svg', alt: 'iOS WebKit Debug Proxy' },

  // Tools
  'schema-validation': { type: 'svg', value: '/icons/code.svg', alt: 'Schema Validation' },
  'marshmallow': { type: 'svg', value: '/icons/python.svg', alt: 'Marshmallow' },
  'pydantic': { type: 'svg', value: '/icons/python.svg', alt: 'Pydantic' },
};

// Fallback emoji icons by category
export const CATEGORY_FALLBACK_EMOJI: Record<string, string> = {
  'Foundation': '🏗️',
  'Languages': '📚',
  'IDEs': '🛠️',
  'Testing': '🧪',
  'Tools': '⚙️',
};

/**
 * Get the icon for a tool
 */
export function getToolIcon(slug: string, category?: string): ToolIcon {
  if (TOOL_ICONS[slug]) {
    return TOOL_ICONS[slug];
  }

  // Fallback to category emoji
  const emoji = category ? CATEGORY_FALLBACK_EMOJI[category] : '📄';
  return { type: 'emoji', value: emoji || '📄' };
}
