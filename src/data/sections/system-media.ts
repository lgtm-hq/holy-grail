import type { Section } from "../apps-types";

export const virtualizationSection: Section = {
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
};

export const filesMediaSection: Section = {
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
};

export const screenshotsSection: Section = {
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
};

export const systemMaintenanceSection: Section = {
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
          description: "Your home for Mac updates — Homebrew, App Store, Sparkle, GitHub Releases",
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
};
