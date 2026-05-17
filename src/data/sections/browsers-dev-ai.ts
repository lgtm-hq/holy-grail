import type { Section } from "../apps-types";

export const browsersSection: Section = {
  id: "browsers",
  title: "Browsers",
  icon: "🌐",
  kind: "groups",
  groups: [
    {
      label: "Browsers",
      apps: [
        {
          name: "Firefox",
          href: "https://www.mozilla.org/firefox/",
          description: "Privacy-focused, independent engine",
          badge: "Free",
          badgeType: "free",
        },
        {
          name: "Google Chrome",
          href: "https://www.google.com/chrome/",
          description: "Most widely used, strong DevTools",
          badge: "Free",
          badgeType: "free",
        },
        {
          name: "Helium",
          href: "https://helium.computer/",
          description: "Privacy-focused browser, blocks ads and trackers by default",
          badge: "Free",
          badgeType: "free",
        },
        {
          name: "Safari",
          href: "https://www.apple.com/safari/",
          description: "Built into macOS, battery efficient",
          badge: "Free",
          badgeType: "free",
        },
        {
          name: "Vivaldi",
          href: "https://vivaldi.com/",
          description: "Customizable, privacy-focused browser for power users",
          badge: "Free",
          badgeType: "free",
        },
        {
          name: "Zen",
          href: "https://zen-browser.app/",
          description: "Privacy-focused browser built on Firefox",
          badge: "Free",
          badgeType: "free",
          dailyDriver: true,
        },
      ],
    },
    {
      label: "Browser Extensions",
      apps: [
        {
          name: "1Password / Bitwarden",
          description: "Password manager integration (Chrome, Firefox, Safari)",
          badge: "Free",
          badgeType: "free",
        },
        {
          name: "Dark Reader",
          description: "Dark mode for all websites (Chrome, Firefox, Safari)",
          badge: "Free",
          badgeType: "free",
        },
        {
          name: "uBlock Origin",
          description: "Ad and tracker blocker (Chrome, Firefox)",
          badge: "Free",
          badgeType: "free",
        },
      ],
    },
  ],
};

export const aiSection: Section = {
  id: "ai",
  title: "AI Tools",
  icon: "🤖",
  kind: "groups",
  groups: [
    {
      label: "Coding Agents",
      apps: [
        {
          name: "Claude Code",
          href: "https://www.anthropic.com/product/claude-code",
          description: "Anthropic's agentic CLI for coding with Claude",
          badge: "Paid",
          badgeType: "paid",
          dailyDriver: true,
          tags: ["AI"],
        },
        {
          name: "Codex",
          href: "https://openai.com/index/codex-now-generally-available/",
          description: "Cloud-based AI coding agent by OpenAI",
          badge: "Paid",
          badgeType: "paid",
          dailyDriver: true,
          tags: ["AI"],
        },
        {
          name: "CodexBar",
          href: "https://github.com/steipete/CodexBar",
          description: "Menu bar app monitoring AI coding assistant usage and quotas",
          badge: "Free",
          badgeType: "free",
          dailyDriver: true,
          tags: ["AI"],
        },
        {
          name: "CMux",
          href: "https://cmux.com/",
          description: "Native terminal for managing multiple AI coding agents with split panes",
          badge: "Free",
          badgeType: "free",
          tags: ["AI"],
        },
        {
          name: "Cursor",
          href: "https://cursor.com/",
          description: "AI-powered code editor, fork of VS Code",
          badge: "Freemium",
          badgeType: "freemium",
          priceBadge: "~$20/mo",
          dailyDriver: true,
          tags: ["AI"],
        },
        {
          name: "T3 Code",
          href: "https://t3.codes/",
          description:
            "Minimal web GUI for coding agents (Codex, Claude, OpenCode); open source on GitHub (pingdotgg/t3code)",
          badge: "Free",
          badgeType: "free",
          dailyDriver: true,
          tags: ["AI"],
        },
      ],
    },
    {
      label: "Voice & Transcription",
      apps: [
        {
          name: "MacWhisper",
          href: "https://goodsnooze.gumroad.com/l/macwhisper",
          description: "Audio transcription, runs locally",
          badge: "Freemium",
          badgeType: "freemium",
          tags: ["AI"],
        },
        {
          name: "SuperWhisper",
          href: "https://superwhisper.com/",
          description: "Voice-to-text powered by AI, runs locally",
          badge: "Paid",
          badgeType: "paid",
          priceBadge: "~$8/mo",
          tags: ["AI"],
        },
        {
          name: "Wispr Flow",
          href: "https://wisprflow.ai/",
          description: "AI voice dictation that turns speech into polished writing in any app",
          badge: "Freemium",
          badgeType: "freemium",
          dailyDriver: true,
          tags: ["AI"],
        },
      ],
    },
    {
      label: "Image Tools",
      apps: [
        {
          name: "Upscayl",
          href: "https://upscayl.org/",
          description: "Open-source AI image upscaler, runs locally",
          badge: "Free",
          badgeType: "free",
          tags: ["AI"],
        },
      ],
    },
  ],
};

export const developmentSection: Section = {
  id: "ides",
  title: "Development",
  icon: "✏️",
  kind: "groups",
  groups: [
    {
      label: "Editors & IDEs",
      apps: [
        {
          name: "Android Studio",
          href: "https://developer.android.com/studio",
          description: "Android development, based on IntelliJ",
          badge: "Free",
          badgeType: "free",
        },
        {
          name: "IntelliJ IDEA",
          href: "https://www.jetbrains.com/idea/",
          description: "Java, Kotlin",
          badge: "Free / Paid",
          badgeType: "freemium",
        },
        {
          name: "JetBrains Toolbox",
          href: "https://www.jetbrains.com/toolbox-app/",
          description: "Manages all JetBrains IDEs",
          badge: "Free",
          badgeType: "free",
        },
        {
          name: "PyCharm",
          href: "https://www.jetbrains.com/pycharm/",
          description: "Python",
          badge: "Free / Paid",
          badgeType: "freemium",
        },
        {
          name: "Visual Studio Code",
          href: "https://code.visualstudio.com/",
          description: "Extensible, most popular, all languages",
          badge: "Free",
          badgeType: "free",
        },
        {
          name: "Xcode",
          href: "https://developer.apple.com/xcode/",
          description: "Required for iOS/macOS development",
          badge: "Free",
          badgeType: "free",
        },
      ],
    },
    {
      label: "Terminals",
      apps: [
        {
          name: "Ghostty",
          href: "https://ghostty.org/",
          description: "GPU-accelerated terminal emulator",
          badge: "Free",
          badgeType: "free",
          dailyDriver: true,
        },
        {
          name: "iTerm2",
          href: "https://iterm2.com/",
          description: "Terminal replacement with tabs, split panes, search",
          badge: "Free",
          badgeType: "free",
        },
      ],
    },
    {
      label: "Developer Utilities",
      apps: [
        {
          name: "DevToys",
          href: "https://devtoys.app/",
          description: "Developer Swiss army knife — JSON, Base64, regex, hash tools",
          badge: "Free",
          badgeType: "free",
          dailyDriver: true,
        },
        {
          name: "GitHub Desktop",
          href: "https://desktop.github.com/",
          description: "Git GUI client",
          badge: "Free",
          badgeType: "free",
          dailyDriver: true,
        },
      ],
    },
  ],
};
