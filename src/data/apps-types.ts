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
