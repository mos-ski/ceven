export type NavItemSA = {
  label: string;
  href: string;
};

const BASE = "/super-admin";

export const NAV_ITEMS_SA: NavItemSA[] = [
  { label: "Dashboard", href: `${BASE}/dashboard` },
  { label: "Creche Enrollment", href: `${BASE}/enrollment` },
  { label: "Creches", href: `${BASE}/creches` },
  { label: "Subscription Mgt", href: `${BASE}/subscriptions` },
  { label: "Notifications", href: `${BASE}/notifications` },
];
