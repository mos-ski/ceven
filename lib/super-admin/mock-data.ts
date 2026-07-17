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

// ── Creche Enrollment (platform-wide creche applications) ──────────────────

export type EnrollmentStatus = "pending" | "approved" | "declined";

export type EnrollmentRequest = {
  id: string;
  requestDate: string;
  crecheName: string;
  email: string;
  phone: string;
  status: EnrollmentStatus;
  ageRange: string;
  features: string[];
  state: string;
  lga: string;
  address: string;
  bio: string;
  rooms: { name: string; pricing: Record<string, number> }[];
  schedule: Record<string, { open: string; close: string } | { closed: true }>;
  documents: { label: string; uploaded: boolean }[];
  staffScreening: boolean;
};

const STANDARD_SCHEDULE: EnrollmentRequest["schedule"] = {
  Sunday: { closed: true },
  Monday: { open: "09:00", close: "17:00" },
  Tuesday: { open: "09:00", close: "17:00" },
  Wednesday: { open: "09:00", close: "17:00" },
  Thursday: { open: "09:00", close: "17:00" },
  Friday: { open: "09:00", close: "17:00" },
  Saturday: { closed: true },
};

const STANDARD_DOCUMENTS = [
  { label: "Upload Business Registration Documents", uploaded: true },
  { label: "Upload the Government-issued ID of the Creche Owner", uploaded: true },
  { label: "Upload proof of Creche Address, such as a utility bill or Waste Management Bill", uploaded: true },
];

export const ENROLLMENT_REQUESTS: EnrollmentRequest[] = [
  {
    id: "enr-1", requestDate: "17 Jul 2026 5:25pm", crecheName: "Ringo Daycare", email: "sifid76874@luckfeed.com", phone: "09058653400", status: "pending",
    ageRange: "6 months - 12 years", features: ["Secure Environment", "Educational Curriculum", "Outdoor Play Area", "Meals Provided", "Health Monitoring"],
    state: "lagos", lga: "ikeja", address: "33 Adeshina St, Ifako-Ijaiye, Lagos 101232, Lagos",
    bio: "A safe and nurturing environment for children to learn and grow.",
    rooms: [{ name: "Heaven", pricing: { "Full day": 5000, "Half day": 1000, "Hourly Rate": 500, Weekly: 20000, Monthly: 100000 } }],
    schedule: STANDARD_SCHEDULE,
    documents: STANDARD_DOCUMENTS,
    staffScreening: true,
  },
  {
    id: "enr-2", requestDate: "16 Jul 2026 4:01pm", crecheName: "Aorthar Creche", email: "aorthardesignteam@gmail.com", phone: "09058653400", status: "approved",
    ageRange: "3 months - 10 years", features: ["Secure Environment", "Educational Curriculum", "Meals Provided"],
    state: "lagos", lga: "ikeja", address: "15 Adekunle Fajuyi Way, Ikeja, Lagos",
    bio: "Premium childcare facility with experienced staff.",
    rooms: [
      { name: "Heaven", pricing: { "Full day": 5000, "Half day": 1000, "Hourly Rate": 500, Weekly: 20000, Monthly: 100000 } },
      { name: "Grace", pricing: { "Full day": 4000, "Half day": 800, Weekly: 16000, Monthly: 80000 } },
    ],
    schedule: { ...STANDARD_SCHEDULE, Saturday: { open: "09:00", close: "14:00" } },
    documents: STANDARD_DOCUMENTS,
    staffScreening: true,
  },
  {
    id: "enr-3", requestDate: "10 Jul 2026 6:25pm", crecheName: "Mavin", email: "mavin@yopmail.com", phone: "07066370235", status: "approved",
    ageRange: "6 months - 8 years", features: ["Secure Environment", "Outdoor Play Area", "Health Monitoring"],
    state: "lagos", lga: "Lekki", address: "22 Admiralty Way, Lekki Phase 1, Lagos",
    bio: "Child-centered learning environment.",
    rooms: [{ name: "Sunshine", pricing: { "Full day": 6000, "Half day": 1500, Weekly: 25000, Monthly: 110000 } }],
    schedule: { ...STANDARD_SCHEDULE, Monday: { open: "07:30", close: "17:30" }, Tuesday: { open: "07:30", close: "17:30" }, Wednesday: { open: "07:30", close: "17:30" }, Thursday: { open: "07:30", close: "17:30" }, Friday: { open: "07:30", close: "17:30" } },
    documents: [...STANDARD_DOCUMENTS.slice(0, 2), { label: "Upload proof of Creche Address", uploaded: false }],
    staffScreening: true,
  },
  {
    id: "enr-4", requestDate: "18 Jun 2026 9:47am", crecheName: "New age kids", email: "markjll@gmailxsn.space", phone: "08012345678", status: "pending",
    ageRange: "1 year - 6 years", features: ["Educational Curriculum", "Meals Provided"],
    state: "lagos", lga: "Surulere", address: "8 Bode Thomas St, Surulere, Lagos",
    bio: "Modern crèche for the modern family.",
    rooms: [{ name: "Angels", pricing: { "Full day": 4500, "Half day": 900, Weekly: 18000, Monthly: 85000 } }],
    schedule: STANDARD_SCHEDULE,
    documents: [
      { label: "Upload Business Registration Documents", uploaded: false },
      { label: "Upload the Government-issued ID of the Creche Owner", uploaded: false },
      { label: "Upload proof of Creche Address", uploaded: false },
    ],
    staffScreening: false,
  },
  {
    id: "enr-5", requestDate: "17 Jun 2026 10:59am", crecheName: "Adedamola Adewale", email: "adedamolamoses@gmail.com", phone: "08103674006", status: "pending",
    ageRange: "6 months - 5 years", features: ["Secure Environment"],
    state: "lagos", lga: "Ikeja", address: "14 Opebi Road, Ikeja, Lagos",
    bio: "Home-based childcare with a personal touch.",
    rooms: [{ name: "Tiny Stars", pricing: { "Full day": 3500, "Half day": 700, Weekly: 14000, Monthly: 65000 } }],
    schedule: STANDARD_SCHEDULE,
    documents: [
      { label: "Upload Business Registration Documents", uploaded: true },
      { label: "Upload the Government-issued ID of the Creche Owner", uploaded: false },
      { label: "Upload proof of Creche Address", uploaded: false },
    ],
    staffScreening: false,
  },
  {
    id: "enr-6", requestDate: "8 Jun 2026 6:13pm", crecheName: "Asurabillions creche", email: "edetp653@gmail.com", phone: "08021234567", status: "pending",
    ageRange: "1 year - 5 years", features: ["Meals Provided"], state: "lagos", lga: "Ajah", address: "5 Ajah Road, Lagos",
    bio: "Community-focused creche serving the Ajah area.",
    rooms: [{ name: "Bloom", pricing: { "Full day": 4000, "Half day": 800, Weekly: 16000, Monthly: 75000 } }],
    schedule: STANDARD_SCHEDULE, documents: STANDARD_DOCUMENTS, staffScreening: false,
  },
  {
    id: "enr-7", requestDate: "5 Jun 2026 3:49pm", crecheName: "Youngenius Academy", email: "geniusapc+creche@gmail.com", phone: "08031234567", status: "pending",
    ageRange: "6 months - 6 years", features: ["Educational Curriculum", "STEM Learning"], state: "lagos", lga: "Yaba", address: "12 Herbert Macaulay Way, Yaba, Lagos",
    bio: "STEM-focused early learning academy.",
    rooms: [{ name: "Einstein", pricing: { "Full day": 5500, "Half day": 1100, Weekly: 22000, Monthly: 95000 } }],
    schedule: STANDARD_SCHEDULE, documents: STANDARD_DOCUMENTS, staffScreening: true,
  },
  {
    id: "enr-8", requestDate: "3 Jun 2026 10:06pm", crecheName: "Proident Kiddies Creche", email: "dujiqyda@yopmail.com", phone: "08041234567", status: "pending",
    ageRange: "1 year - 5 years", features: ["Secure Environment", "Meals Provided"], state: "lagos", lga: "Ikorodu", address: "3 Ikorodu Road, Lagos",
    bio: "Affordable, safe childcare for working families.",
    rooms: [{ name: "Joy", pricing: { "Full day": 3000, "Half day": 600, Weekly: 12000, Monthly: 55000 } }],
    schedule: STANDARD_SCHEDULE, documents: STANDARD_DOCUMENTS, staffScreening: false,
  },
  {
    id: "enr-9", requestDate: "3 Jun 2026 9:31pm", crecheName: "Cumque Kiddies Creche", email: "banoge@yopmail.com", phone: "08051234567", status: "pending",
    ageRange: "6 months - 4 years", features: ["Health Monitoring"], state: "lagos", lga: "Gbagada", address: "9 Gbagada Expressway, Lagos",
    bio: "Health-first childcare with on-site nurse.",
    rooms: [{ name: "Wellness", pricing: { "Full day": 4200, "Half day": 850, Weekly: 17000, Monthly: 78000 } }],
    schedule: STANDARD_SCHEDULE, documents: STANDARD_DOCUMENTS, staffScreening: true,
  },
  {
    id: "enr-10", requestDate: "3 Jun 2026 9:29pm", crecheName: "Culpa Kiddies Creche", email: "hybe@yopmail.com", phone: "08061234567", status: "pending",
    ageRange: "1 year - 6 years", features: ["Outdoor Play Area"], state: "lagos", lga: "Magodo", address: "27 Magodo Estate, Lagos",
    bio: "Spacious outdoor play area with certified caregivers.",
    rooms: [{ name: "Meadow", pricing: { "Full day": 4800, "Half day": 950, Weekly: 19000, Monthly: 88000 } }],
    schedule: STANDARD_SCHEDULE, documents: STANDARD_DOCUMENTS, staffScreening: true,
  },
];

// ── Creches (approved) ──────────────────────────────────────────────────────

export type ApprovedCreche = {
  id: string;
  requestDate: string;
  crecheName: string;
  email: string;
  phone: string;
  state: string;
  caregiversCount: number;
  status: "approved";
};

export const APPROVED_CRECHES: ApprovedCreche[] = [
  { id: "cre-1", requestDate: "16 Jul 2026 4:01pm", crecheName: "Aorthar Creche", email: "aorthardesignteam@gmail.com", phone: "09058653400", state: "lagos", caregiversCount: 1, status: "approved" },
  { id: "cre-2", requestDate: "10 Jul 2026 6:25pm", crecheName: "Mavin", email: "mavin@yopmail.com", phone: "07066370235", state: "lagos", caregiversCount: 1, status: "approved" },
  { id: "cre-3", requestDate: "20 May 2026 11:29am", crecheName: "Little Angels", email: "littleangels@yopmail.com", phone: "08078185665", state: "lagos", caregiversCount: 2, status: "approved" },
  { id: "cre-4", requestDate: "15 May 2026 12:19pm", crecheName: "primary Cheche", email: "misael@yopmail.com", phone: "08134567890", state: "Lagos", caregiversCount: 3, status: "approved" },
  { id: "cre-5", requestDate: "7 May 2026 11:21am", crecheName: "Eggshells Tots and Kiddies", email: "eggshells@yopmail.com", phone: "09000012233", state: "lagos", caregiversCount: 4, status: "approved" },
  { id: "cre-6", requestDate: "20 Apr 2026 5:18pm", crecheName: "Rubels and Angel Creche", email: "beatriceo.luwakemisola@gmail.com", phone: "08145678901", state: "Lagos", caregiversCount: 11, status: "approved" },
  { id: "cre-7", requestDate: "3 Apr 2026 8:23pm", crecheName: "Sebi Creche", email: "lolamichaelodukoya@gmail.com", phone: "08186793931", state: "lagos", caregiversCount: 2, status: "approved" },
  { id: "cre-8", requestDate: "25 Mar 2026 11:07am", crecheName: "Davida", email: "boluwatifetoluwaloju@gmail.com", phone: "07088771472", state: "lagos", caregiversCount: 2, status: "approved" },
  { id: "cre-9", requestDate: "24 Mar 2026 9:32pm", crecheName: "Lagos Creche", email: "alt.gl-eowu6qos@yopmail.com", phone: "08165084064", state: "abia", caregiversCount: 5, status: "approved" },
  { id: "cre-10", requestDate: "24 Mar 2026 9:16pm", crecheName: "Pulcehr", email: "oyinkansolababalola@gmail.com", phone: "08176543210", state: "Ogun", caregiversCount: 2, status: "approved" },
];

// ── Caregivers (per-creche staff, platform-wide view) ───────────────────────

export type Caregiver = {
  id: string;
  fullName: string;
  email: string;
  assignedChildren: number;
  phoneNumber: string;
  status: "active" | "inactive";
};

export const CAREGIVERS: Caregiver[] = [
  { id: "cg-1", fullName: "Tess Adewale", email: "adewaledamola52+@yahoo.com", assignedChildren: 1, phoneNumber: "08103674006", status: "active" },
];

// ── Assigned children (per-caregiver) ───────────────────────────────────────

export type AssignedChild = {
  id: string;
  assignedDate: string;
  parentName: string;
  childName: string;
  childAge: string;
  room: string;
};

export const ASSIGNED_CHILDREN: AssignedChild[] = [
  { id: "child-1", assignedDate: "16 Jul 2026 4:14pm", parentName: "Adedamola Adewale", childName: "Philip Adewale", childAge: "2 years", room: "Horn" },
];

// ── Child profiles ───────────────────────────────────────────────────────────

export type ChildProfile = {
  id: string;
  firstName: string;
  lastName: string;
  photo: string;
  gender: string;
  parentName: string;
  parentEmail: string;
  emergencyContactName: string;
  emergencyContact: string;
  dateOfBirth: string;
  medical: {
    allergies: string;
    chronicConditions: string;
    bloodGroup: string;
    medication: string;
    pediatricianName: string;
    pediatricianPhone: string;
    pediatricianHospital: string;
    immunizationHistory: string;
  };
  dietary: {
    feedingType: string;
    favoriteMeals: string;
    dislikedFoods: string;
    dietaryRestriction: string;
  };
  development: {
    sleepTime: string;
    comfortItems: string;
    toiletTraining: string;
    milestone: string;
    communicationStyle: string;
    behaviorNotes: string;
  };
  activityLog: { date: string; totalLogs: number }[];
};

export const CHILD_PROFILES: ChildProfile[] = [
  {
    id: "child-1", firstName: "Philip", lastName: "Adewale",
    photo: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=200&h=200&fit=crop&q=80",
    gender: "Male",
    parentName: "Adedamola Adewale", parentEmail: "adewaledamola52@yahoo.com",
    emergencyContactName: "Tess Adewale", emergencyContact: "08099818202", dateOfBirth: "25 Apr 2024",
    medical: {
      allergies: "None reported", chronicConditions: "None reported", bloodGroup: "O+", medication: "None",
      pediatricianName: "Dr. Ngozi Umeh", pediatricianPhone: "08023456789", pediatricianHospital: "St Nicholas Hospital, Lagos", immunizationHistory: "Up to date",
    },
    dietary: { feedingType: "Solid foods", favoriteMeals: "Rice, banana", dislikedFoods: "Vegetables", dietaryRestriction: "None" },
    development: { sleepTime: "1pm - 3pm", comfortItems: "Blanket", toiletTraining: "In progress", milestone: "Walking", communicationStyle: "Words and gestures", behaviorNotes: "Energetic, enjoys outdoor play." },
    activityLog: [
      { date: "16 Jul 2026 1:00am", totalLogs: 1 },
      { date: "15 Jul 2026 3:20pm", totalLogs: 3 },
      { date: "14 Jul 2026 11:05am", totalLogs: 2 },
    ],
  },
];

// ── Platform notifications ───────────────────────────────────────────────────

export type PlatformNotification = {
  id: string;
  time: string;
  title: string;
  message: string;
};

export const PLATFORM_NOTIFICATIONS: PlatformNotification[] = [
  { id: "not-1", time: "17 Jul 2026 5:30pm", title: "New Creche Enrollment", message: "Ringo Daycare submitted a new enrollment request awaiting review." },
  { id: "not-2", time: "16 Jul 2026 4:05pm", title: "Creche Approved", message: "Aorthar Creche's application was approved and is now live on the platform." },
  { id: "not-3", time: "15 Jul 2026 9:00am", title: "Payment Received", message: "Premium Test subscription payment of ₦3,000 received from a parent account." },
  { id: "not-4", time: "12 Jul 2026 2:15pm", title: "Subscription Expiring Soon", message: "8 creche subscriptions are due for renewal within the next 7 days." },
  { id: "not-5", time: "8 Jun 2026 6:20pm", title: "New Creche Enrollment", message: "Asurabillions creche submitted a new enrollment request awaiting review." },
];

// ── Subscription management ──────────────────────────────────────────────────

export type SubscriptionPlan = {
  id: string;
  dateCreated: string;
  planName: string;
  duration: string[];
  subscribers: number;
  recipient: string;
  revenue: string;
  status: "active" | "inactive";
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  { id: "plan-1", dateCreated: "24 Mar 2026 8:51am", planName: "Pro Features for Creche", duration: ["monthly", "quarterly", "yearly"], subscribers: 9, recipient: "creche admin", revenue: "₦166,500", status: "active" },
  { id: "plan-2", dateCreated: "24 Mar 2026 8:51am", planName: "Starter Features for Creche", duration: ["monthly", "quarterly", "yearly"], subscribers: 4, recipient: "creche admin", revenue: "₦38,000", status: "active" },
  { id: "plan-3", dateCreated: "24 Mar 2026 8:51am", planName: "Premium Features for Parents", duration: ["daily", "monthly", "quarterly", "yearly"], subscribers: 35, recipient: "parent", revenue: "₦149,250", status: "inactive" },
  { id: "plan-4", dateCreated: "24 Mar 2026 8:51am", planName: "Premium Test (1hr Trial)", duration: ["hourly"], subscribers: 126, recipient: "parent", revenue: "₦3,000", status: "active" },
];

export type Subscriber = {
  id: string;
  expiryDate: string;
  crecheName: string;
  enrolledChildren: number;
  revenue: string;
  payment: string;
  status: "active" | "inactive";
};

export const SUBSCRIBERS: Subscriber[] = [
  { id: "sub-1", expiryDate: "24 Aug 2026", crecheName: "Aorthar Creche", enrolledChildren: 12, revenue: "₦18,500", payment: "Card", status: "active" },
  { id: "sub-2", expiryDate: "10 Aug 2026", crecheName: "Mavin", enrolledChildren: 8, revenue: "₦18,500", payment: "Bank Transfer", status: "active" },
  { id: "sub-3", expiryDate: "3 Aug 2026", crecheName: "Little Angels", enrolledChildren: 15, revenue: "₦18,500", payment: "Card", status: "active" },
  { id: "sub-4", expiryDate: "20 Jul 2026", crecheName: "Rubels and Angel Creche", enrolledChildren: 31, revenue: "₦38,500", payment: "Card", status: "active" },
  { id: "sub-5", expiryDate: "5 Jul 2026", crecheName: "Sebi Creche", enrolledChildren: 10, revenue: "₦9,500", payment: "Bank Transfer", status: "inactive" },
];

export const SUBSCRIPTION_STATS = {
  totalCreches: 10,
  monthlyRevenue: "₦51,050",
  activeSubscriptions: 4,
  expiredOverdue: 62,
};

// ── Engagement metrics ────────────────────────────────────────────────────────

export const ENGAGEMENT_STATS = {
  daily: { parents: 18.4, caregivers: 26.7 },
  weekly: { parents: 45.2, caregivers: 52.9 },
  monthly: { parents: 83.3, caregivers: 10.8 },
};
