export type ChildStatus = "Present" | "Absent" | "Late";
export type FeeStatus = "Paid" | "Overdue" | "Pending";

export type Child = {
  id: string;
  name: string;
  gender: "M" | "F";
  bloodGroup: string;
  age: string;
  room: string;
  parentName: string;
  parentEmail: string;
  status: ChildStatus;
  healthFlag: string | null;
  feeStatus: FeeStatus;
};

export const CHILDREN: Child[] = [
  {
    id: "child-1",
    name: "King Andrew",
    gender: "M",
    bloodGroup: "0+",
    age: "4 years",
    room: "Lion",
    parentName: "Mrs Bakare",
    parentEmail: "bakareolatuji@gmail.com",
    status: "Present",
    healthFlag: "Nut Allergy",
    feeStatus: "Overdue",
  },
  {
    id: "child-2",
    name: "Amara Chukwu",
    gender: "F",
    bloodGroup: "A+",
    age: "3 years",
    room: "Panda",
    parentName: "Mr & Mrs Chukwu",
    parentEmail: "chukwufamily@gmail.com",
    status: "Present",
    healthFlag: null,
    feeStatus: "Paid",
  },
  {
    id: "child-3",
    name: "Tobi Adewale",
    gender: "M",
    bloodGroup: "B+",
    age: "5 years",
    room: "Owl",
    parentName: "Mrs Adewale",
    parentEmail: "adewale.funke@gmail.com",
    status: "Absent",
    healthFlag: "Asthma",
    feeStatus: "Pending",
  },
  {
    id: "child-4",
    name: "Zainab Bello",
    gender: "F",
    bloodGroup: "O-",
    age: "2 years",
    room: "Bear",
    parentName: "Mr Bello",
    parentEmail: "bello.ibrahim@gmail.com",
    status: "Present",
    healthFlag: null,
    feeStatus: "Paid",
  },
  {
    id: "child-5",
    name: "Daniel Okafor",
    gender: "M",
    bloodGroup: "AB+",
    age: "4 years",
    room: "Lion",
    parentName: "Mrs Okafor",
    parentEmail: "okaforchidinma@gmail.com",
    status: "Late",
    healthFlag: null,
    feeStatus: "Paid",
  },
  {
    id: "child-6",
    name: "Faith Eze",
    gender: "F",
    bloodGroup: "A-",
    age: "3 years",
    room: "Panda",
    parentName: "Mr & Mrs Eze",
    parentEmail: "ezefamily01@gmail.com",
    status: "Present",
    healthFlag: "Egg Allergy",
    feeStatus: "Overdue",
  },
  {
    id: "child-7",
    name: "Hassan Yusuf",
    gender: "M",
    bloodGroup: "O+",
    age: "5 years",
    room: "Owl",
    parentName: "Mrs Yusuf",
    parentEmail: "yusuf.aisha@gmail.com",
    status: "Present",
    healthFlag: null,
    feeStatus: "Pending",
  },
  {
    id: "child-8",
    name: "Ireti Olawale",
    gender: "F",
    bloodGroup: "B-",
    age: "2 years",
    room: "Bear",
    parentName: "Mr Olawale",
    parentEmail: "olawale.tunde@gmail.com",
    status: "Present",
    healthFlag: null,
    feeStatus: "Paid",
  },
];

export const CHILDREN_STATS = {
  totalEnrolled: CHILDREN.length,
  active: CHILDREN.filter((c) => c.status !== "Absent").length,
  newThisMonth: 3,
  averageActivityLog: 5.2,
};

// ── Enrolment & Waitlist ─────────────────────────────────────────────────────

export type EnquiryStage =
  | "Enquiry Received"
  | "Visit Scheduled"
  | "Trial Booked"
  | "Offer Made"
  | "Enrolled"
  | "Declined";

export type Enquiry = {
  id: string;
  childName: string;
  gender: "M" | "F";
  age: string;
  preferredRoom: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  inquiryDate: string;
  stage: EnquiryStage;
  visitDate?: string;
  visitTime?: string;
  trialDate?: string;
  trialTime?: string;
  offerPlan?: string;
  offerStartDate?: string;
  notes?: string;
};

export const ENQUIRIES: Enquiry[] = [
  {
    id: "enq-1",
    childName: "Adunola Martins",
    gender: "F",
    age: "9 months",
    preferredRoom: "Sunflower",
    parentName: "Mrs Bankole",
    parentPhone: "+234 803 222 1199",
    parentEmail: "bankole.tiara@gmail.com",
    inquiryDate: "Apr 10",
    stage: "Enquiry Received",
    notes: "Interested in the toddler room, asked about meal plans.",
  },
  {
    id: "enq-7",
    childName: "Adunola Martins",
    gender: "F",
    age: "9 months",
    preferredRoom: "Sunflower",
    parentName: "Mrs Bankole",
    parentPhone: "+234 803 222 1199",
    parentEmail: "bankole.tiara@gmail.com",
    inquiryDate: "Apr 10",
    stage: "Enquiry Received",
    notes: "Sibling already enrolled — flagged as high priority.",
  },
  {
    id: "enq-2",
    childName: "Michael Obi",
    gender: "M",
    age: "3 years",
    preferredRoom: "Lion",
    parentName: "Mr Obi",
    parentPhone: "+234 802 555 7890",
    parentEmail: "obi.michael@gmail.com",
    inquiryDate: "08 Oct 2025",
    stage: "Visit Scheduled",
    visitDate: "15 Oct 2025",
    visitTime: "10:00 am",
  },
  {
    id: "enq-3",
    childName: "Halima Sani",
    gender: "F",
    age: "4 years",
    preferredRoom: "Butterfly",
    parentName: "Mrs Sani",
    parentPhone: "+234 805 444 3322",
    parentEmail: "sani.halima@gmail.com",
    inquiryDate: "05 Oct 2025",
    stage: "Trial Booked",
    trialDate: "20 Oct 2025",
    trialTime: "9:00 am",
  },
  {
    id: "enq-4",
    childName: "Emeka Nwosu",
    gender: "M",
    age: "2 years",
    preferredRoom: "Dolphin",
    parentName: "Mr & Mrs Nwosu",
    parentPhone: "+234 807 111 2244",
    parentEmail: "nwosu.family@gmail.com",
    inquiryDate: "01 Oct 2025",
    stage: "Offer Made",
    offerPlan: "Monthly – ₦40,000",
    offerStartDate: "01 Nov 2025",
  },
  {
    id: "enq-5",
    childName: "Grace Effiong",
    gender: "F",
    age: "3 years",
    preferredRoom: "Lion",
    parentName: "Mrs Effiong",
    parentPhone: "+234 809 333 8877",
    parentEmail: "effiong.grace@gmail.com",
    inquiryDate: "28 Sep 2025",
    stage: "Enrolled",
  },
  {
    id: "enq-6",
    childName: "David Oyelaran",
    gender: "M",
    age: "5 years",
    preferredRoom: "Owl",
    parentName: "Mr Oyelaran",
    parentPhone: "+234 806 999 4455",
    parentEmail: "oyelaran.d@gmail.com",
    inquiryDate: "20 Sep 2025",
    stage: "Declined",
    notes: "No vacancy in requested age group.",
  },
];

export const ENQUIRY_STATS = {
  newEnquiries: ENQUIRIES.filter((e) => e.stage === "Enquiry Received").length,
  visitsScheduled: ENQUIRIES.filter((e) => e.stage === "Visit Scheduled").length,
  trialsBooked: ENQUIRIES.filter((e) => e.stage === "Trial Booked").length,
  conversionRate: 64,
};

export type EnquiryUrgency = "overdue" | "high-priority";

export const ENQUIRY_URGENCY: Record<string, { label: string; level: EnquiryUrgency }> = {
  "enq-1": { label: "6 days overdue", level: "overdue" },
  "enq-7": { label: "High priority", level: "high-priority" },
};

// ── Enrolment & Waitlist overview ───────────────────────────────────────────

export const ENROLMENT_WAITLIST_OVERVIEW = {
  activeEnquiries: 24,
  activeEnquiriesTrend: "3% From last month",
  waitlisted: 3,
  waitlistedByRoom: "Lion (2) • Butterfly (1)",
  totalEnrolled: 40,
  totalEnrolledTrend: "12% From last month",
  leavers: 0,
};

export const AI_PREDICTS_NOTES = [
  "2 of 3 waitlisted families are likely to convert this term.",
  "Butterfly Class has 2 spots opening when current children age up in June.",
];

export type EnrolmentStatus = "Overdue" | "Approved" | "Declined" | "Pending" | "Info Requested";

export type EnrolmentRecord = {
  id: string;
  dateTime: string;
  parentName: string;
  childName: string;
  age: string;
  room: string;
  status: EnrolmentStatus;
};

export const ENROLMENT_RECORDS: EnrolmentRecord[] = [
  { id: "enr-1", dateTime: "20 Oct 2026 08:30am", parentName: "Mr Ben Ayadi", childName: "King Andrew", age: "4 years", room: "Lion", status: "Overdue" },
  { id: "enr-2", dateTime: "20 Oct 2026 08:30am", parentName: "Mr Ben Ayadi", childName: "King Andrew", age: "4 years", room: "Lion", status: "Approved" },
  { id: "enr-3", dateTime: "20 Oct 2026 08:30am", parentName: "Mr Ben Ayadi", childName: "King Andrew", age: "4 years", room: "Lion", status: "Declined" },
  { id: "enr-4", dateTime: "20 Oct 2026 08:30am", parentName: "Mr Ben Ayadi", childName: "King Andrew", age: "4 years", room: "Lion", status: "Pending" },
  { id: "enr-5", dateTime: "20 Oct 2026 08:30am", parentName: "Mr Ben Ayadi", childName: "King Andrew", age: "4 years", room: "Lion", status: "Info Requested" },
  { id: "enr-6", dateTime: "20 Oct 2026 08:30am", parentName: "Mr Ben Ayadi", childName: "King Andrew", age: "4 years", room: "Lion", status: "Approved" },
  { id: "enr-7", dateTime: "20 Oct 2026 08:30am", parentName: "Mr Ben Ayadi", childName: "King Andrew", age: "4 years", room: "Lion", status: "Approved" },
];

// ── Waitlist ─────────────────────────────────────────────────────────────────

export type WaitlistStatus = "Waiting" | "Offered" | "Expired";

export type WaitlistEntry = {
  id: string;
  childName: string;
  gender: "M" | "F";
  bloodGroup: string;
  roomRequested: string;
  dateAdded: string;
  waitDays: number;
  enrolledSiblings: string;
  status: WaitlistStatus;
};

export const WAITLIST: WaitlistEntry[] = [
  { id: "wl-1", childName: "King Andrew", gender: "M", bloodGroup: "0+", roomRequested: "Butterfly", dateAdded: "10 Oct, 2025", waitDays: 13, enrolledSiblings: "No", status: "Waiting" },
  { id: "wl-2", childName: "King Andrew", gender: "M", bloodGroup: "0+", roomRequested: "Butterfly", dateAdded: "10 Oct, 2025", waitDays: 24, enrolledSiblings: "Yes - Emeka", status: "Waiting" },
  { id: "wl-3", childName: "King Andrew", gender: "M", bloodGroup: "0+", roomRequested: "Butterfly", dateAdded: "10 Oct, 2025", waitDays: 13, enrolledSiblings: "No", status: "Waiting" },
];

// ── Trial Sessions ───────────────────────────────────────────────────────────

export type TrialSessionStatus = "Upcoming" | "Successful" | "Not Suitable" | "No Show" | "Rescheduled";

export type TrialSession = {
  id: string;
  childName: string;
  gender: "M" | "F";
  bloodGroup: string;
  room: string;
  trialDate: string;
  period: string;
  assignedTo: string;
  status: TrialSessionStatus;
  notes: string;
};

export const TRIAL_SESSIONS: TrialSession[] = [
  { id: "trial-1", childName: "King Andrew", gender: "M", bloodGroup: "0+", room: "Sunflower", trialDate: "10 Oct, 2025", period: "2 hours", assignedTo: "Ms. Nkechi", status: "Upcoming", notes: "Parent attending too" },
  { id: "trial-2", childName: "King Andrew", gender: "M", bloodGroup: "0+", room: "Dolphin", trialDate: "10 Oct, 2025", period: "1 hour", assignedTo: "Mr. Seun", status: "Successful", notes: "Settled very well" },
  { id: "trial-3", childName: "King Andrew", gender: "M", bloodGroup: "0+", room: "Dolphin", trialDate: "10 Oct, 2025", period: "1 day", assignedTo: "Mr. Seun", status: "Successful", notes: "Settled very well" },
  { id: "trial-4", childName: "King Andrew", gender: "M", bloodGroup: "0+", room: "Dolphin", trialDate: "10 Oct, 2025", period: "1 hour", assignedTo: "Mr. Seun", status: "Not Suitable", notes: "Advice to hold" },
  { id: "trial-5", childName: "King Andrew", gender: "M", bloodGroup: "0+", room: "Dolphin", trialDate: "10 Oct, 2025", period: "1 hour", assignedTo: "Mr. Seun", status: "No Show", notes: "--" },
  { id: "trial-6", childName: "King Andrew", gender: "M", bloodGroup: "0+", room: "Sunflower", trialDate: "10 Oct, 2025", period: "1 hour", assignedTo: "Mr. Seun", status: "Rescheduled", notes: "Fix another date" },
];

// ── Leavers ──────────────────────────────────────────────────────────────────

export type ExitSurveyStatus = "Completed" | "Pending" | "Not Sent";
export type DataArchivedStatus = "Successful" | "Pending" | "Failed";

export type LeaverRecord = {
  id: string;
  childName: string;
  gender: "M" | "F";
  bloodGroup: string;
  room: string;
  roomIcon: string;
  reason: string;
  lastDay: string;
  noticeGiven: string;
  exitSurvey: ExitSurveyStatus;
  dataArchived: DataArchivedStatus;
};

export const LEAVERS: LeaverRecord[] = [
  { id: "leaver-1", childName: "King Andrew", gender: "M", bloodGroup: "0+", room: "Sunflower", roomIcon: "🌻", reason: "Graduated to school", lastDay: "10 Oct, 2025", noticeGiven: "4 Weeks", exitSurvey: "Completed", dataArchived: "Successful" },
  { id: "leaver-2", childName: "King Andrew", gender: "M", bloodGroup: "0+", room: "Dolphin", roomIcon: "🐬", reason: "Relocated - Abuja", lastDay: "10 Oct, 2025", noticeGiven: "2 Weeks", exitSurvey: "Completed", dataArchived: "Successful" },
];

// ── Caregivers ────────────────────────────────────────────────────────────────

export type Caregiver = {
  id: string;
  name: string;
  email: string;
  phone: string;
  room: string;
  childrenAssigned: number;
  status: "Active" | "On Leave";
};

export const CAREGIVERS: Caregiver[] = [
  {
    id: "cg-1",
    name: "Mrs. Sarah Okonkwo",
    email: "sarah.o@udebemcresh.com",
    phone: "+234 90 9827 2738",
    room: "Lion",
    childrenAssigned: 8,
    status: "Active",
  },
  {
    id: "cg-2",
    name: "Mr. Tunde Bakare",
    email: "tunde.b@udebemcresh.com",
    phone: "+234 81 2345 6789",
    room: "Panda",
    childrenAssigned: 6,
    status: "Active",
  },
  {
    id: "cg-3",
    name: "Mrs. Ngozi Eze",
    email: "ngozi.e@udebemcresh.com",
    phone: "+234 70 3456 7890",
    room: "Owl",
    childrenAssigned: 5,
    status: "On Leave",
  },
  {
    id: "cg-4",
    name: "Mrs. Aisha Bello",
    email: "aisha.b@udebemcresh.com",
    phone: "+234 80 1122 3344",
    room: "Bear",
    childrenAssigned: 7,
    status: "Active",
  },
];

// ── Rooms & Classes ───────────────────────────────────────────────────────────

export type Room = {
  id: string;
  name: string;
  icon: string;
  ageRange: string;
  capacity: number;
  enrolled: number;
  caregiver: string;
};

export const ROOMS: Room[] = [
  { id: "room-1", name: "Lion", icon: "🦁", ageRange: "3 - 4 yrs", capacity: 12, enrolled: 9, caregiver: "Mrs. Sarah Okonkwo" },
  { id: "room-2", name: "Panda", icon: "🐼", ageRange: "2 - 3 yrs", capacity: 10, enrolled: 8, caregiver: "Mr. Tunde Bakare" },
  { id: "room-3", name: "Owl", icon: "🦉", ageRange: "4 - 5 yrs", capacity: 12, enrolled: 7, caregiver: "Mrs. Ngozi Eze" },
  { id: "room-4", name: "Bear", icon: "🐻", ageRange: "0 - 2 yrs", capacity: 8, enrolled: 6, caregiver: "Mrs. Aisha Bello" },
];

// ── Parents ───────────────────────────────────────────────────────────────────

export type AppStatus = "Installed" | "Not Installed";

export type Parent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  childName: string;
  childId: string;
  class: string;
  caregiver: string;
  relationship: string;
  feeStatus: FeeStatus;
  appStatus: AppStatus;
  dueAmount: string | null;
  joinedDate: string;
  enrolledDate: string;
};

export const PARENTS: Parent[] = CHILDREN.map((child, i) => ({
  id: `parent-${i + 1}`,
  name: child.parentName,
  email: child.parentEmail,
  phone: `+234 80${i} ${100 + i * 11} ${2000 + i * 7}`,
  childName: child.name,
  childId: child.id,
  class: child.room,
  caregiver: ROOMS.find((r) => r.name === child.room)?.caregiver ?? "Unassigned",
  relationship: "Parent/Guardian",
  feeStatus: child.feeStatus,
  appStatus: i % 3 === 1 ? "Installed" : "Not Installed",
  dueAmount: child.feeStatus === "Paid" ? null : "₦40,000",
  joinedDate: `Aug ${3 + i}, 2025`,
  enrolledDate: `24 July, 2025`,
}));
