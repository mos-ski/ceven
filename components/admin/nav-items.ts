export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Child Management", href: "/children" },
  { label: "Staff Management", href: "/staff" },
  { label: "Daily Operations", href: "/daily-operations" },
  { label: "Finance", href: "/finance" },
  { label: "Communication", href: "/communication" },
  { label: "Intelligence", href: "/intelligence" },
  { label: "Account & Setup", href: "/account-setup" },
];
