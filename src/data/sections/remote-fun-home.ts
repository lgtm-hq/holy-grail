import type { Section } from "../apps-types";

export const remoteDesktopSection: Section = {
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
};

export const gamingStreamingSection: Section = {
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
};

export const smartHomeSection: Section = {
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
};
