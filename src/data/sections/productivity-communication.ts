import type { Section } from "../apps-types";

export const workflowSection: Section = {
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
};

export const menuBarSection: Section = {
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
};

export const communicationSection: Section = {
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
};

export const documentsCloudStorageSection: Section = {
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
};
