export const CRECHE_REQUEST_DATA = [
  { month: "Jan", pending: 0, approved: 0, declined: 0 },
  { month: "Feb", pending: 0, approved: 0, declined: 0 },
  { month: "Mar", pending: 0, approved: 0, declined: 0 },
  { month: "Apr", pending: 0, approved: 0, declined: 0 },
  { month: "May", pending: 0, approved: 0, declined: 0 },
  { month: "Jun", pending: 0, approved: 0, declined: 0 },
  { month: "Jul", pending: 0, approved: 3, declined: 0 },
  { month: "Aug", pending: 0, approved: 0, declined: 0 },
  { month: "Sep", pending: 0, approved: 0, declined: 0 },
  { month: "Oct", pending: 0, approved: 0, declined: 0 },
  { month: "Nov", pending: 0, approved: 0, declined: 0 },
  { month: "Dec", pending: 0, approved: 0, declined: 0 },
];

export const DASHBOARD_STATS_V1 = [
  { label: "Pending Request", value: 0, color: "text-blue-500", bgColor: "bg-blue-50" },
  { label: "Approved Request", value: 3, color: "text-emerald-500", bgColor: "bg-emerald-50" },
  { label: "Declined Request", value: 0, color: "text-red-500", bgColor: "bg-red-50" },
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
