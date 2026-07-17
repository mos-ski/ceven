export type NavItemSA = {
  label: string;
  href: string;
};

export type NavGroupSA = {
  label: string;
  items: NavItemSA[];
};

const BASE = "/super-admin";

export const NAV_GROUPS_SA: NavGroupSA[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: `${BASE}/dashboard` }],
  },
  {
    label: "Tenants",
    items: [
      { label: "All Tenants", href: `${BASE}/tenants` },
      { label: "Onboarding Requests", href: `${BASE}/onboarding-requests` },
    ],
  },
  {
    label: "Billing",
    items: [
      { label: "Platform Billing", href: `${BASE}/platform-billing` },
      { label: "Plan Configuration", href: `${BASE}/plan-configuration` },
    ],
  },
  {
    label: "Analytics",
    items: [{ label: "Growth & Usage", href: `${BASE}/growth-usage` }],
  },
  {
    label: "Operations",
    items: [
      { label: "Support Tickets", href: `${BASE}/support-tickets` },
      { label: "Audit Log", href: `${BASE}/audit-log` },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Admin Users", href: `${BASE}/admin-users` },
      { label: "Platform Settings", href: `${BASE}/platform-settings` },
    ],
  },
];
