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
    childName: "Tiara Bankole",
    gender: "F",
    age: "2 years",
    parentName: "Mrs Bankole",
    parentPhone: "+234 803 222 1199",
    parentEmail: "bankole.tiara@gmail.com",
    inquiryDate: "10 Oct 2025",
    stage: "Enquiry Received",
    notes: "Interested in the toddler room, asked about meal plans.",
  },
  {
    id: "enq-2",
    childName: "Michael Obi",
    gender: "M",
    age: "3 years",
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

export type Parent = {
  id: string;
  name: string;
  email: string;
  phone: string;
  childName: string;
  childId: string;
  relationship: string;
  feeStatus: FeeStatus;
};

export const PARENTS: Parent[] = CHILDREN.map((child, i) => ({
  id: `parent-${i + 1}`,
  name: child.parentName,
  email: child.parentEmail,
  phone: `+234 80${i} ${100 + i * 11} ${2000 + i * 7}`,
  childName: child.name,
  childId: child.id,
  relationship: "Parent/Guardian",
  feeStatus: child.feeStatus,
}));
