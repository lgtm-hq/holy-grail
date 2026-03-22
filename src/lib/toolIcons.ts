/**
 * Tool icon configuration
 * Maps guide slugs to their icon paths or fallback emojis
 */

export interface ToolIcon {
  type: "svg" | "emoji";
  value: string; // Path for SVG, emoji character for emoji
  alt?: string;
}

// Tool icons mapped by guide slug
export const TOOL_ICONS: Record<string, ToolIcon> = {
  // Foundation
  homebrew: { type: "svg", value: "/icons/homebrew.svg", alt: "Homebrew" },
  zsh: { type: "svg", value: "/icons/terminal.svg", alt: "ZSH" },
  "macos-tweaks": { type: "svg", value: "/icons/apple.svg", alt: "macOS Tweaks" },
  sdkman: { type: "svg", value: "/icons/sdkman.svg", alt: "SDKMAN!" },

  // Languages
  python: { type: "svg", value: "/icons/python.svg", alt: "Python" },
  pipenv: { type: "svg", value: "/icons/python.svg", alt: "Pipenv" },
  java: { type: "svg", value: "/icons/java.svg", alt: "Java" },
  ruby: { type: "svg", value: "/icons/ruby.svg", alt: "Ruby" },
  nodejs: { type: "svg", value: "/icons/nodejs.svg", alt: "Node.js" },
  gradle: { type: "svg", value: "/icons/gradle.svg", alt: "Gradle" },
  maven: { type: "svg", value: "/icons/maven.svg", alt: "Maven" },

  // IDEs
  "android-studio": { type: "svg", value: "/icons/android-studio.svg", alt: "Android Studio" },
  xcode: { type: "svg", value: "/icons/xcode.svg", alt: "Xcode" },

  // Testing
  appium: { type: "svg", value: "/icons/appium.svg", alt: "Appium" },
  "appium-inspector": { type: "svg", value: "/icons/appium.svg", alt: "Appium Inspector" },
  "appium-doctor": { type: "svg", value: "/icons/appium.svg", alt: "Appium Doctor" },
  adb: { type: "svg", value: "/icons/android.svg", alt: "ADB" },
  "android-emulator": { type: "svg", value: "/icons/android.svg", alt: "Android Emulator" },
  "ios-device-tools": { type: "svg", value: "/icons/apple.svg", alt: "iOS Device Tools" },
  "configure-ios-drivers": {
    type: "svg",
    value: "/icons/ios-driver.svg",
    alt: "Configure iOS Drivers",
  },
  "prepare-ios-project": { type: "svg", value: "/icons/xcode.svg", alt: "Prepare iOS Project" },
  "page-object-model": { type: "svg", value: "/icons/layers.svg", alt: "Page Object Model" },
  "desired-capabilities": { type: "svg", value: "/icons/sliders.svg", alt: "Desired Capabilities" },
  "driver-instantiation": { type: "svg", value: "/icons/plug.svg", alt: "Driver Instantiation" },
  "locator-strategy": { type: "svg", value: "/icons/crosshair.svg", alt: "Locator Strategy" },
  "wait-strategies": { type: "svg", value: "/icons/timer.svg", alt: "Wait Strategies" },

  // Infrastructure
  ssh: { type: "svg", value: "/icons/1password.svg", alt: "SSH with 1Password" },
  "ssh-server-hardening": { type: "svg", value: "/icons/shield.svg", alt: "SSH Server Hardening" },
  "cloudflare-tunnels": { type: "svg", value: "/icons/cloudflare.svg", alt: "Cloudflare Tunnels" },
  dotfiles: { type: "svg", value: "/icons/dotfiles.svg", alt: "Dotfiles" },
  stow: { type: "svg", value: "/icons/stow.svg", alt: "GNU Stow" },
  just: { type: "svg", value: "/icons/just.svg", alt: "Just" },
  ghostty: { type: "svg", value: "/icons/ghostty.svg", alt: "Ghostty" },
  starship: { type: "svg", value: "/icons/starship.svg", alt: "Starship" },

  // Tools
  "schema-validation": { type: "svg", value: "/icons/code.svg", alt: "Schema Validation" },
  marshmallow: { type: "svg", value: "/icons/python.svg", alt: "Marshmallow" },
  pydantic: { type: "svg", value: "/icons/python.svg", alt: "Pydantic" },
};

// Fallback emoji icons by category
export const CATEGORY_FALLBACK_EMOJI: Record<string, string> = {
  Foundation: "🏗️",
  Languages: "📚",
  IDEs: "🛠️",
  Testing: "🧪",
  "Android Tools": "🤖",
  Infrastructure: "🔒",
  Tools: "⚙️",
};

/**
 * Get the icon for a tool
 */
export function getToolIcon(slug: string, category?: string): ToolIcon {
  if (TOOL_ICONS[slug]) {
    return TOOL_ICONS[slug];
  }

  // Fallback to category emoji
  const emoji = category ? CATEGORY_FALLBACK_EMOJI[category] : "📄";
  return { type: "emoji", value: emoji || "📄" };
}
