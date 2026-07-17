export type NavItemV1 = {
  label: string;
  href: string;
  icon: string;
};

const BASE = "/admin/v1";

export const NAV_ITEMS_V1: NavItemV1[] = [
  { label: "Dashboard", href: `${BASE}/dashboard`, icon: "home" },
  { label: "Enrollment", href: `${BASE}/enrollment`, icon: "users" },
  { label: "Caregivers", href: `${BASE}/caregivers`, icon: "heart-handshake" },
  { label: "Team Management", href: `${BASE}/team-management`, icon: "settings" },
  { label: "Notifications", href: `${BASE}/notifications`, icon: "bell" },
];
