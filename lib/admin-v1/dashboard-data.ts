import { ENROLLMENT_REQUESTS } from "@/lib/admin-v1/v1-data";

export const CRECHE_REQUEST_DATA = [
  { month: "Jan", pending: 1, approved: 2, declined: 0 },
  { month: "Feb", pending: 1, approved: 3, declined: 1 },
  { month: "Mar", pending: 2, approved: 2, declined: 0 },
  { month: "Apr", pending: 0, approved: 3, declined: 1 },
  { month: "May", pending: 2, approved: 4, declined: 0 },
  { month: "Jun", pending: 1, approved: 3, declined: 1 },
  { month: "Jul", pending: 1, approved: 2, declined: 1 },
  { month: "Aug", pending: 2, approved: 3, declined: 0 },
  { month: "Sep", pending: 1, approved: 2, declined: 1 },
  { month: "Oct", pending: 1, approved: 3, declined: 0 },
  { month: "Nov", pending: 2, approved: 2, declined: 1 },
  { month: "Dec", pending: 1, approved: 4, declined: 0 },
];

export const DASHBOARD_STATS_V1 = [
  {
    label: "Pending Request",
    value: ENROLLMENT_REQUESTS.filter((r) => r.status === "pending").length,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    label: "Approved Request",
    value: ENROLLMENT_REQUESTS.filter((r) => r.status === "active").length,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    label: "Declined Request",
    value: ENROLLMENT_REQUESTS.filter((r) => r.status === "declined").length,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
];

export const CRECHE_FEATURES = [
  "Secure Environment",
  "Educational Curriculum",
  "Outdoor Play Area",
  "Meals Provided",
  "Health Monitoring",
  "Transportation",
  "Swimming Pool",
  "Music & Dance",
  "Arts & Crafts",
  "STEM Learning",
];

export const NIGERIAN_STATES: Record<string, string[]> = {
  Lagos: ["Ikeja", "Victoria Island", "Lekki", "Surulere", "Yaba", "Ikoyi"],
  Abuja: ["Garki", "Wuse", "Maitama", "Asokoro", "Jabi"],
  Ogun: ["Abeokuta", "Sango Ota", "Ifo", "Sagamu"],
  Rivers: ["Port Harcourt", "Obio-Akpor", "Diobu"],
  Oyo: ["Ibadan", "Ogbomoso", "Oyo"],
};

export const DEFAULT_OPERATING_HOURS = [
  { day: "Sunday", opening: "", closing: "", closed: true },
  { day: "Monday", opening: "09:00", closing: "17:00", closed: false },
  { day: "Tuesday", opening: "09:00", closing: "17:00", closed: false },
  { day: "Wednesday", opening: "09:00", closing: "17:00", closed: false },
  { day: "Thursday", opening: "09:00", closing: "17:00", closed: false },
  { day: "Friday", opening: "09:00", closing: "17:00", closed: false },
  { day: "Saturday", opening: "10:00", closing: "14:00", closed: false },
];
