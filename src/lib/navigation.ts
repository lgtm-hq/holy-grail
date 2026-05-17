export interface NavItem {
  path: string;
  label: string;
  icon: string;
}

export const navItems: NavItem[] = [
  { path: "", label: "Home", icon: "🏰" },
  { path: "guides/", label: "Guides", icon: "📜" },
  { path: "categories/", label: "Categories", icon: "⚔️" },
  { path: "apps/", label: "Apps", icon: "💎" },
];
