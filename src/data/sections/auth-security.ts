import type { Section } from "../apps-types";

export const passwordManagersSection: Section = {
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
};

export const authenticatorsSection: Section = {
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
};

export const securityPrivacySection: Section = {
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
};
