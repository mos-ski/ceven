export type TenantOwnerType = "organization" | "individual";
export type TenantPlan = "Seedling" | "Nestling Pro" | "Flourish";
export type TenantStatus = "Active" | "Trial" | "Past Due" | "Suspended";

export type Tenant = {
  id: string;
  name: string;
  ownerType: TenantOwnerType;
  plan: TenantPlan;
  status: TenantStatus;
  childrenCount: number;
  peopleCount: number; // staff count for organizations, families count for individuals
  mrr: string;
  joinedDate: string;
  location: string;
};

export const TENANTS: Tenant[] = [
  { id: "ten-1", name: "St Gregory Creche", ownerType: "organization", plan: "Nestling Pro", status: "Active", childrenCount: 42, peopleCount: 9, mrr: "₦18,500", joinedDate: "12 Jan 2026", location: "Lagos" },
  { id: "ten-2", name: "Little Sprouts Daycare", ownerType: "organization", plan: "Flourish", status: "Active", childrenCount: 96, peopleCount: 22, mrr: "₦38,500", joinedDate: "03 Nov 2025", location: "Abuja" },
  { id: "ten-3", name: "Mrs. Adaeze Nwosu", ownerType: "individual", plan: "Seedling", status: "Trial", childrenCount: 3, peopleCount: 3, mrr: "₦0", joinedDate: "14 Jul 2026", location: "Lagos" },
  { id: "ten-4", name: "Bright Beginnings Creche", ownerType: "organization", plan: "Seedling", status: "Past Due", childrenCount: 18, peopleCount: 5, mrr: "₦9,500", joinedDate: "22 Feb 2026", location: "Port Harcourt" },
  { id: "ten-5", name: "Ms. Funmilayo Bello", ownerType: "individual", plan: "Seedling", status: "Active", childrenCount: 5, peopleCount: 5, mrr: "₦9,500", joinedDate: "01 May 2026", location: "Ibadan" },
  { id: "ten-6", name: "Tiny Tots Learning Home", ownerType: "organization", plan: "Nestling Pro", status: "Active", childrenCount: 34, peopleCount: 8, mrr: "₦18,500", joinedDate: "19 Mar 2026", location: "Lagos" },
  { id: "ten-7", name: "Mr. Chidi Okeke", ownerType: "individual", plan: "Seedling", status: "Suspended", childrenCount: 2, peopleCount: 2, mrr: "₦0", joinedDate: "09 Sep 2025", location: "Enugu" },
];

export const PLATFORM_STATS = {
  totalTenants: TENANTS.length,
  organizationTenants: TENANTS.filter((t) => t.ownerType === "organization").length,
  individualTenants: TENANTS.filter((t) => t.ownerType === "individual").length,
  activeTrials: TENANTS.filter((t) => t.status === "Trial").length,
  mrr: "₦95,000",
  mrrTrend: "+8% vs last month",
  totalChildren: TENANTS.reduce((sum, t) => sum + t.childrenCount, 0),
  pastDue: TENANTS.filter((t) => t.status === "Past Due").length,
  openTickets: 4,
};

export const GROWTH_TREND = [12, 18, 22, 27, 31, 38, 44, 52, 58, 63, 70, 78];

export type PlatformActivityEvent = {
  id: string;
  text: string;
  time: string;
};

export const PLATFORM_ACTIVITY: PlatformActivityEvent[] = [
  { id: "pa-1", text: "Ms. Funmilayo Bello upgraded from trial to Seedling", time: "12 min ago" },
  { id: "pa-2", text: "Bright Beginnings Creche's payment failed — now Past Due", time: "1 hr ago" },
  { id: "pa-3", text: "New tenant signup: Mrs. Adaeze Nwosu (independent caregiver)", time: "3 hrs ago" },
  { id: "pa-4", text: "Tiny Tots Learning Home added 3 new staff seats", time: "5 hrs ago" },
  { id: "pa-5", text: "Support ticket #482 opened by St Gregory Creche", time: "6 hrs ago" },
];
