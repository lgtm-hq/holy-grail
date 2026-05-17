export interface App {
  name: string;
  href?: string;
  description: string;
  badge?: string;
  badgeType?: "free" | "paid" | "freemium";
  priceBadge?: string;
  dailyDriver?: boolean;
  tags?: string[];
}

export interface SectionBase {
  id: string;
  title: string;
  icon: string;
  note?: string;
  tip?: string;
  tipIcon?: string;
}

/** Flat list of apps (no sub-groups). */
export interface AppSection extends SectionBase {
  kind: "apps";
  apps: App[];
}

/** Apps organized under labeled sub-groups. */
export interface GroupSection extends SectionBase {
  kind: "groups";
  groups: { label: string; apps: App[] }[];
}

export type Section = AppSection | GroupSection;

export const sections: Section[] = [
  {
    id: "password-managers",
    title: "Password Managers",
    icon: "🔐",
    kind: "apps",
    note: "Choose one and use it consistently across all your devices.",
    tip: "Some password managers (like 1Password) have a built-in authenticator, which can replace a separate 2FA app.",
    apps: [
      {
        name: "1Password",
        href: "https://1password.com/",
        description: "Built-in authenticator, family/team sharing",
        badge: "Paid",
        badgeType: "paid",
        priceBadge: "~$4/mo",
        dailyDriver: true,
      },
      {
        name: "Apple Keychain",
        description: "Built into macOS, syncs via iCloud",
        badge: "Free",
        badgeType: "free",
      },
      {
        name: "Bitwarden",
        href: "https://bitwarden.com/",
        description: "Open source, self-hostable",
        badge: "Free / Paid",
        badgeType: "freemium",
      },
    ],
  },
  {
    id: "authenticators",
    title: "Authenticator Apps",
    icon: "🛡️",
    kind: "apps",
    apps: [
      {
        name: "Ente Auth",
        href: "https://ente.io/auth/",
        description: "Open source, end-to-end encrypted, all platforms",
        badge: "Free",
        badgeType: "free",
        dailyDriver: true,
      },
      {
        name: "Google Authenticator",
        href: "https://apps.apple.com/app/google-authenticator/id388497605",
        description: "Cloud backup support, mobile",
        badge: "Free",
        badgeType: "free",
      },
      {
        name: "Microsoft Authenticator",
        href: "https://www.microsoft.com/en-us/security/mobile-authenticator-app",
        description: "Push notifications for Microsoft accounts, mobile",
        badge: "Free",
        badgeType: "free",
      },
    ],
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: "workflow",
    title: "Workflow & Productivity",
    icon: "⚡",
    kind: "groups",
    groups: [
      {
        label: "Launchers",
        apps: [
          {
            name: "Alfred",
            href: "https://www.alfredapp.com/",
            description: "Alternative to Raycast",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$35",
          },
          {
            name: "Raycast",
            href: "https://www.raycast.com/",
            description: "Launcher and productivity tool (replaces Spotlight)",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
        ],
      },
      {
        label: "Clipboard & Text",
        apps: [
          {
            name: "CopyClip",
            href: "https://apps.apple.com/app/copyclip-clipboard-history/id595191960",
            description: "Clipboard history manager",
            badge: "Free",
            badgeType: "free",
          },
          {
            name: "Maccy",
            href: "https://maccy.app/",
            description: "Alternative to CopyClip",
            badge: "Free",
            badgeType: "free",
          },
          {
            name: "PopClip",
            href: "https://www.popclip.app/",
            description: "Text selection actions",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$20",
          },
        ],
      },
      {
        label: "Keyboard & Link Routing",
        apps: [
          {
            name: "KeyClu",
            href: "https://github.com/Anze/KeyCluCask",
            description: "Shows keyboard shortcuts for the active app",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
          {
            name: "Velja",
            href: "https://sindresorhus.com/velja",
            description: "Browser picker for opening links",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
        ],
      },
    ],
  },
  {
    id: "menu-bar",
    title: "Window, Menu Bar & Focus",
    icon: "🎛️",
    kind: "groups",
    groups: [
      {
        label: "Window Management",
        apps: [
          {
            name: "AltTab",
            href: "https://alt-tab-macos.netlify.app/",
            description: "Windows-style alt-tab window switcher",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
          {
            name: "Magnet",
            href: "https://magnet.crowdcafe.com/",
            description: "Alternative to Rectangle",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$10",
          },
          {
            name: "Rectangle",
            href: "https://rectangleapp.com/",
            description: "Window management with keyboard shortcuts",
            badge: "Free",
            badgeType: "free",
          },
        ],
      },
      {
        label: "Menu Bar & Calendar",
        apps: [
          {
            name: "Alcove",
            href: "https://tryalcove.com/",
            description: "Enhance the MacBook notch with useful utilities",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$17",
            dailyDriver: true,
          },
          {
            name: "Bartender",
            href: "https://www.macbartender.com/",
            description: "Advanced menu bar item organization",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$20",
          },
          {
            name: "Dato",
            href: "https://sindresorhus.com/dato",
            description: "Menu bar clock with calendar, time zones, and events",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$17",
            dailyDriver: true,
          },
          {
            name: "Hidden Bar",
            href: "https://github.com/dwarvesf/hidden",
            description: "Hide menu bar items",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
          {
            name: "HiddenMe",
            href: "https://apps.apple.com/us/app/hiddenme/id467040476",
            description: "Hide desktop icons with a single click",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$2",
          },
          {
            name: "Ice",
            href: "https://github.com/jordanbaird/Ice",
            description: "Menu bar management — hide and show items",
            badge: "Free",
            badgeType: "free",
          },
          {
            name: "Itsycal",
            href: "https://www.mowglii.com/itsycal/",
            description: "Tiny menu bar calendar with events",
            badge: "Free",
            badgeType: "free",
          },
          {
            name: "Meetingbar",
            href: "https://meetingbar.app/",
            description: "Show upcoming meetings in the menu bar",
            badge: "Free",
            badgeType: "free",
          },
        ],
      },
      {
        label: "Focus & Camera",
        apps: [
          {
            name: "Hand Mirror",
            href: "https://handmirror.app/",
            description: "One-click webcam preview in menu bar",
            badge: "Freemium",
            badgeType: "freemium",
            priceBadge: "~$5",
          },
          {
            name: "Hazeover",
            href: "https://hazeover.com/",
            description: "Dim background windows to focus on the active one",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$12",
          },
          {
            name: "Lookaway",
            href: "https://lookaway.com/",
            description: "Break reminders to reduce eye strain",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$15",
          },
        ],
      },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    icon: "💬",
    kind: "groups",
    groups: [
      {
        label: "Messaging",
        apps: [
          {
            name: "Discord",
            href: "https://discord.com/",
            description: "Community and voice chat",
            badge: "Freemium",
            badgeType: "freemium",
            dailyDriver: true,
          },
          {
            name: "Slack",
            href: "https://slack.com/downloads/mac",
            description: "Team communication",
            badge: "Freemium",
            badgeType: "freemium",
            dailyDriver: true,
          },
          {
            name: "Telegram",
            href: "https://telegram.org/",
            description: "Messaging with desktop client",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
          {
            name: "WhatsApp",
            href: "https://www.whatsapp.com/",
            description: "Messaging with desktop client",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
        ],
      },
      {
        label: "Meetings & Camera",
        apps: [
          {
            name: "Camo Studio",
            href: "https://reincubate.com/camo/",
            description: "Use your phone as a high-quality webcam",
            badge: "Freemium",
            badgeType: "freemium",
            priceBadge: "~$5/mo",
          },
          {
            name: "Zoom",
            href: "https://zoom.us/download",
            description: "Video conferencing",
            badge: "Freemium",
            badgeType: "freemium",
          },
        ],
      },
    ],
  },
  {
    id: "notes-productivity",
    title: "Documents & Cloud Storage",
    icon: "📝",
    kind: "apps",
    apps: [
      {
        name: "Craft",
        href: "https://www.craft.do/",
        description: "Beautiful native document editor with blocks",
        badge: "Freemium",
        badgeType: "freemium",
      },
      {
        name: "Google Drive",
        href: "https://www.google.com/drive/download/",
        description: "Cloud storage (includes Docs, Sheets, Slides)",
        badge: "Freemium",
        badgeType: "freemium",
        dailyDriver: true,
      },
      {
        name: "PDFGear",
        href: "https://www.pdfgear.com/",
        description: "Full-featured PDF editor, reader, and converter",
        badge: "Free",
        badgeType: "free",
        dailyDriver: true,
      },
    ],
  },
  {
    id: "virtualization",
    title: "Virtualization",
    icon: "📦",
    kind: "apps",
    apps: [
      {
        name: "Docker Desktop",
        href: "https://www.docker.com/products/docker-desktop/",
        description: "Container management",
        badge: "Freemium",
        badgeType: "freemium",
        dailyDriver: true,
      },
      {
        name: "OrbStack",
        href: "https://orbstack.dev/",
        description: "Fast Docker and Linux VM alternative for macOS",
        badge: "Freemium",
        badgeType: "freemium",
      },
    ],
  },
  {
    id: "files-media",
    title: "Files & Media",
    icon: "🎬",
    kind: "groups",
    groups: [
      {
        label: "File Utilities",
        apps: [
          {
            name: "Dropover",
            href: "https://dropoverapp.com/",
            description: "Drag-and-drop shelf for files",
            badge: "Freemium",
            badgeType: "freemium",
          },
          {
            name: "Find Any File",
            href: "https://findanyfile.app/",
            description: "Search for files the way Spotlight cannot",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$6",
          },
        ],
      },
      {
        label: "Image Tools",
        apps: [
          {
            name: "ImageOptim",
            href: "https://imageoptim.com/",
            description: "Image compression and optimization",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
        ],
      },
      {
        label: "Media Players",
        apps: [
          {
            name: "IINA",
            href: "https://iina.io/",
            description: "Modern media player for macOS",
            badge: "Free",
            badgeType: "free",
          },
          {
            name: "Spotify",
            href: "https://spotify.com/",
            description: "Music and podcast streaming",
            badge: "Freemium",
            badgeType: "freemium",
            priceBadge: "~$13/mo",
            dailyDriver: true,
          },
          {
            name: "Stremio",
            href: "https://www.stremio.com/",
            description: "Media center with streaming aggregation and add-ons",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
          {
            name: "VLC",
            href: "https://www.videolan.org/",
            description: "Universal media player",
            badge: "Free",
            badgeType: "free",
          },
        ],
      },
    ],
  },
  {
    id: "screenshots",
    title: "Screenshots & Recording",
    icon: "📸",
    kind: "apps",
    apps: [
      {
        name: "Shottr",
        href: "https://shottr.cc/",
        description: "Screenshot tool with annotations",
        badge: "Free",
        badgeType: "free",
        dailyDriver: true,
      },
      {
        name: "XNIP",
        href: "https://xnipapp.com/",
        description: "Scrolling screenshot capture with annotations",
        badge: "Freemium",
        badgeType: "freemium",
      },
      {
        name: "Zappy",
        href: "https://zapier.com/zappy",
        description: "Quick screen capture and GIF recording by Zapier",
        badge: "Free",
        badgeType: "free",
      },
    ],
  },
  {
    id: "security-privacy",
    title: "Security & Privacy",
    icon: "🔒",
    kind: "apps",
    apps: [
      {
        name: "NordVPN",
        href: "https://nordvpn.com/",
        description: "VPN for privacy, security, and geo-unblocking",
        badge: "Paid",
        badgeType: "paid",
        priceBadge: "~$3/mo",
      },
      {
        name: "Tailscale",
        href: "https://tailscale.com/",
        description: "Zero-config mesh VPN built on WireGuard",
        badge: "Freemium",
        badgeType: "freemium",
        dailyDriver: true,
      },
    ],
  },
  {
    id: "system-maintenance",
    title: "System & Hardware",
    icon: "⚙️",
    kind: "groups",
    groups: [
      {
        label: "App & System Updates",
        apps: [
          {
            name: "AppCleaner",
            href: "https://freemacsoft.net/appcleaner/",
            description: "Thoroughly uninstall apps and their leftover files",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
          {
            name: "Latest",
            href: "https://max.codes/latest/",
            description: "Check for app updates",
            badge: "Free",
            badgeType: "free",
          },
          {
            name: "TinkerTool",
            href: "https://www.bresink.com/osx/TinkerTool.html",
            description: "Access hidden macOS settings",
            badge: "Free",
            badgeType: "free",
          },
          {
            name: "Updatest",
            href: "https://updatest.app/",
            description:
              "Your home for Mac updates — Homebrew, App Store, Sparkle, GitHub Releases",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
        ],
      },
      {
        label: "Battery & Devices",
        apps: [
          {
            name: "Al Dente",
            href: "https://apphousekitchen.com/",
            description: "Battery charge limiter to prolong battery health",
            badge: "Freemium",
            badgeType: "freemium",
          },
          {
            name: "Batteries",
            href: "https://www.fadel.io/batteries",
            description: "Track battery levels of all your Apple devices",
            badge: "Paid",
            badgeType: "paid",
            priceBadge: "~$9",
            dailyDriver: true,
          },
        ],
      },
      {
        label: "Displays",
        apps: [
          {
            name: "BetterDisplay",
            href: "https://github.com/waydabber/BetterDisplay",
            description: "Custom resolutions, XDR brightness, display management",
            badge: "Freemium",
            badgeType: "freemium",
            priceBadge: "~$22",
          },
          {
            name: "Display Menu",
            href: "https://apps.apple.com/us/app/display-menu/id549083868",
            description: "Quickly change display resolution from the menu bar",
            badge: "Freemium",
            badgeType: "freemium",
            priceBadge: "~$2",
          },
          {
            name: "DisplayLink Manager",
            href: "https://www.synaptics.com/products/displaylink-graphics/downloads/macos",
            description: "Driver for DisplayLink docking stations and adapters",
            badge: "Free",
            badgeType: "free",
          },
          {
            name: "MonitorControl",
            href: "https://github.com/MonitorControl/MonitorControl",
            description: "Control external monitor brightness and volume",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
        ],
      },
      {
        label: "Storage & Recovery",
        apps: [
          {
            name: "Disk Drill",
            href: "https://www.cleverfiles.com/",
            description: "Data recovery and disk health monitoring",
            badge: "Freemium",
            badgeType: "freemium",
            priceBadge: "~$89",
          },
          {
            name: "GrandPerspective",
            href: "https://grandperspectiv.sourceforge.net/",
            description: "Visualize disk usage with treemaps",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
        ],
      },
    ],
  },
  {
    id: "remote-desktop",
    title: "Remote Desktop",
    icon: "🖥️",
    kind: "apps",
    apps: [
      {
        name: "AnyDesk",
        href: "https://anydesk.com/",
        description: "Fast remote desktop with low latency",
        badge: "Freemium",
        badgeType: "freemium",
        priceBadge: "~$13/mo",
      },
      {
        name: "RustDesk",
        href: "https://rustdesk.com/",
        description: "Open-source remote desktop, self-hostable",
        badge: "Free",
        badgeType: "free",
        dailyDriver: true,
      },
    ],
  },
  {
    id: "gaming-streaming",
    title: "Gaming & Trading",
    icon: "🎮",
    kind: "apps",
    apps: [
      {
        name: "MetaTrader 5",
        href: "https://www.metatrader5.com/en/download",
        description: "Trading platform for forex and stocks",
        badge: "Free",
        badgeType: "free",
      },
      {
        name: "Steam Link",
        href: "https://apps.apple.com/us/app/steam-link/id1246969117",
        description: "Stream games from your PC to your Mac",
        badge: "Free",
        badgeType: "free",
      },
    ],
  },
  {
    id: "smart-home",
    title: "Networking, Smart Home & Self-Hosted",
    icon: "🏠",
    kind: "groups",
    groups: [
      {
        label: "Networking",
        apps: [
          {
            name: "NetSpot",
            href: "https://www.netspotapp.com/",
            description: "WiFi survey, analysis, and troubleshooting",
            badge: "Freemium",
            badgeType: "freemium",
            priceBadge: "~$149",
          },
        ],
      },
      {
        label: "Smart Home",
        apps: [
          {
            name: "Home Assistant",
            href: "https://companion.home-assistant.io/",
            description: "Open-source home automation companion app",
            badge: "Free",
            badgeType: "free",
            dailyDriver: true,
          },
        ],
      },
      {
        label: "Self-Hosted",
        apps: [
          {
            name: "DumbWare",
            href: "https://github.com/DumbWareio",
            description: "Collection of simple, open-source self-hosted tools",
            badge: "Free",
            badgeType: "free",
          },
        ],
      },
    ],
  },
];
