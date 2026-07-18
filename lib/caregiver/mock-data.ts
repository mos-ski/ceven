export type CaregiverUser = {
  name: string;
  role: "parent" | "caregiver";
  avatarInitials: string;
};

export type Alert = {
  type: "info" | "warning";
  label: string;
  detail: string;
};

export type Contact = {
  id: string;
  name: string;
  avatarInitials: string;
};

export type Classroom = {
  id: string;
  name: string;
};

export type Child = {
  id: string;
  name: string;
  age: string;
  room: string;
  alerts: Alert[];
  parentContact: Contact;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  dueTime: string;
  reminderTime: string;
  status: "pending" | "completed" | "undone";
  images?: string[];
};

export type Message = {
  id: string;
  body: string;
  sentAt: string;
  direction: "sent" | "received";
};

export type ChatThread = {
  id: string;
  contact: Contact;
  lastMessage: string;
  lastMessageTime: string;
  dateGroup: string;
  messages: Message[];
};

export type NapEntry = {
  start: string;
  end: string;
  duration: string;
};

export type Photo = {
  src: string;
  caption: string;
  label: string;
};

export type DailyReport = {
  date: string;
  mood: string[];
  meals: number;
  naps: NapEntry[];
  hygiene: string;
  healthSafety: string;
  medications: string;
  photos: Photo[];
};

export const mockUser: CaregiverUser = {
  name: "Ms Anu",
  role: "caregiver",
  avatarInitials: "MA",
};

export const mockClassrooms: Classroom[] = [
  { id: "cls-1", name: "Toddler Room" },
  { id: "cls-2", name: "Nursery Room" },
];

export const mockChildren: Child[] = [
  {
    id: "child-1",
    name: "Liam Smith",
    age: "3 Years",
    room: "Toddler",
    alerts: [{ type: "info", label: "Nap Time", detail: "Needs nap at 1:00 PM" }],
    parentContact: { id: "contact-1", name: "James Miller", avatarInitials: "JM" },
  },
  {
    id: "child-2",
    name: "Olivia Brown",
    age: "2 Years",
    room: "Toddler",
    alerts: [],
    parentContact: { id: "contact-2", name: "Sarah Brown", avatarInitials: "SB" },
  },
  {
    id: "child-3",
    name: "Noah Davies",
    age: "4 Years",
    room: "Nursery",
    alerts: [{ type: "warning", label: "Allergy", detail: "Peanut allergy — EpiPen in bag" }],
    parentContact: { id: "contact-3", name: "Tom Davies", avatarInitials: "TD" },
  },
  {
    id: "child-4",
    name: "Johnson Emma",
    age: "3 Years",
    room: "Toddler",
    alerts: [],
    parentContact: { id: "contact-4", name: "Kate Johnson", avatarInitials: "KJ" },
  },
  {
    id: "child-5",
    name: "Tosin Adeyemi",
    age: "2 Years",
    room: "Nursery",
    alerts: [{ type: "info", label: "Medication", detail: "Calpol at 10:00 AM if needed" }],
    parentContact: { id: "contact-5", name: "Mercy Itom", avatarInitials: "MI" },
  },
];

export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Give medicine to Tosin",
    description: "Lorem ipsum dolor sit amet consectetur. Sit eu interdum scelerisque velit. Diam nisi integer egestas convallis pharetra cras volutpat purus quisque. Nunc quam eu at feugiat in fringilla.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "pending",
  },
  {
    id: "task-2",
    title: "Give medicine to Tosin",
    description: "Kindly give her the prescribed medication when needed. Ensure proper dosage.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "pending",
  },
  {
    id: "task-3",
    title: "Give medicine to Tosin",
    description: "Kindly give her the prescribed medication when needed. Ensure proper dosage.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "pending",
  },
  {
    id: "task-4",
    title: "Give medicine to Tosin",
    description: "Lorem ipsum dolor sit amet consectetur. Sit eu interdum scelerisque velit. Diam nisi integer egestas convallis pharetra cras volutpat purus quisque. Nunc quam eu at feugiat in fringilla.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "completed",
    images: ["https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80"],
  },
  {
    id: "task-5",
    title: "Give medicine to Tosin",
    description: "Lorem ipsum dolor sit amet consectetur. Sit eu interdum scelerisque velit.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "undone",
  },
];

export const mockChatThreads: ChatThread[] = [
  {
    id: "thread-1",
    contact: { id: "contact-5", name: "Mercy Itom", avatarInitials: "MI" },
    lastMessage: "Good afternoon Ma, how can I help you?",
    lastMessageTime: "16:50",
    dateGroup: "October 05, 2024",
    messages: [
      { id: "m1", body: "Hi, Mrs Itom", sentAt: "16:50", direction: "sent" },
      { id: "m2", body: "Good afternoon Ma, how can I help you?", sentAt: "16:50", direction: "received" },
    ],
  },
  {
    id: "thread-2",
    contact: { id: "contact-6", name: "Mark James", avatarInitials: "MJ" },
    lastMessage: "Lorem ipsum dolor sit amet consectetur…",
    lastMessageTime: "14:30",
    dateGroup: "October 05, 2024",
    messages: [
      { id: "m3", body: "Lorem ipsum dolor sit amet consectetur", sentAt: "14:30", direction: "received" },
    ],
  },
  {
    id: "thread-3",
    contact: { id: "contact-7", name: "Jane Udenyi", avatarInitials: "JU" },
    lastMessage: "Lorem ipsum dolor sit amet consectetur…",
    lastMessageTime: "13:00",
    dateGroup: "October 05, 2024",
    messages: [],
  },
  {
    id: "thread-4",
    contact: { id: "contact-8", name: "Peace Matthew", avatarInitials: "PM" },
    lastMessage: "Lorem ipsum dolor sit amet consectetur…",
    lastMessageTime: "11:45",
    dateGroup: "October 05, 2024",
    messages: [],
  },
  {
    id: "thread-5",
    contact: { id: "contact-9", name: "Chris Irabour", avatarInitials: "CI" },
    lastMessage: "Lorem ipsum dolor sit amet consectetur…",
    lastMessageTime: "09:20",
    dateGroup: "October 12, 2024",
    messages: [],
  },
];

export const mockDailyReport: DailyReport = {
  date: "Friday, 9 January, 2026",
  mood: ["🤩 Playful", "😄 Happy"],
  meals: 3,
  naps: [
    { start: "09:00am", end: "12:35pm", duration: "3hr 35mins" },
    { start: "14:20pm", end: "15:00pm", duration: "40mins" },
  ],
  hygiene: "1 urine, 2 poop",
  healthSafety: "Nil",
  medications: "Nil",
  photos: [
    {
      src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
      caption: "Esther had a wonderful time playing with her friends today!",
      label: "Playtime",
    },
    {
      src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
      caption: "Esther explored finger painting during art time.",
      label: "Art & Craft",
    },
  ],
};

// ── Notifications ─────────────────────────────────────────────
export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "task" | "report" | "chat" | "incident" | "fee";
};

export const mockNotifications: Notification[] = [
  { id: "notif-1", title: "Task Reminder", body: "Give medicine to Tosin in 30 minutes", time: "09:30 AM", read: false, type: "task" },
  { id: "notif-2", title: "Daily Report Ready", body: "Liam's daily report for today is ready to view", time: "08:00 AM", read: false, type: "report" },
  { id: "notif-3", title: "New Message", body: "Mercy Itom sent you a message", time: "Yesterday", read: true, type: "chat" },
  { id: "notif-4", title: "Incident Logged", body: "A minor incident was logged for Noah Davies", time: "Yesterday", read: true, type: "incident" },
  { id: "notif-5", title: "Fee Due", body: "October term fees are due in 3 days", time: "2 days ago", read: true, type: "fee" },
];

// ── Fee / Invoices ─────────────────────────────────────────────
export type FeeInvoice = {
  id: string;
  term: string;
  amount: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  child: string;
};

export const mockFees: FeeInvoice[] = [
  { id: "fee-1", term: "October Term 2024", amount: "₦45,000", dueDate: "Oct 31, 2024", status: "pending", child: "Liam Smith" },
  { id: "fee-2", term: "September Term 2024", amount: "₦45,000", dueDate: "Sep 30, 2024", status: "paid", child: "Liam Smith" },
  { id: "fee-3", term: "August Term 2024", amount: "₦40,000", dueDate: "Aug 31, 2024", status: "paid", child: "Liam Smith" },
  { id: "fee-4", term: "October Term 2024", amount: "₦45,000", dueDate: "Oct 31, 2024", status: "overdue", child: "Olivia Brown" },
];

// ── Gallery ─────────────────────────────────────────────────────
export type GalleryPhoto = {
  id: string;
  label: string;
  caption: string;
  date: string;
  child: string;
  image: string;
};

export const mockGallery: GalleryPhoto[] = [
  { id: "photo-1", label: "Playtime", caption: "Liam having fun with blocks", date: "Jan 9, 2026", child: "Liam Smith", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80" },
  { id: "photo-2", label: "Art & Craft", caption: "Olivia's painting session", date: "Jan 9, 2026", child: "Olivia Brown", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80" },
  { id: "photo-3", label: "Story Time", caption: "Group story time after lunch", date: "Jan 8, 2026", child: "All", image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80" },
  { id: "photo-4", label: "Outdoor Play", caption: "Noah on the slide", date: "Jan 8, 2026", child: "Noah Davies", image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80" },
  { id: "photo-5", label: "Snack Time", caption: "Healthy snacks for all", date: "Jan 7, 2026", child: "All", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80" },
  { id: "photo-6", label: "Nap Time", caption: "Everyone resting", date: "Jan 7, 2026", child: "All", image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80" },
];

// ── Incidents ───────────────────────────────────────────────────
export type IncidentStatus = "Open" | "Under Review" | "Resolved";

export type Incident = {
  id: string;
  title: string;
  description: string;
  child: string;
  severity: "minor" | "moderate" | "severe";
  time: string;
  date: string;
  action: string;
  status: IncidentStatus;
  parentNotified: boolean;
};

export const mockIncidents: Incident[] = [
  {
    id: "inc-1",
    title: "Minor Fall",
    description: "Noah slipped near the slide during outdoor play.",
    child: "Noah Davies",
    severity: "minor",
    time: "10:30 AM",
    date: "Jan 8, 2026",
    action: "Applied cold compress. Parents informed.",
    status: "Resolved",
    parentNotified: true,
  },
  {
    id: "inc-2",
    title: "Allergic Reaction",
    description: "Tosin showed mild rash after snack time.",
    child: "Tosin Adeyemi",
    severity: "moderate",
    time: "02:00 PM",
    date: "Jan 7, 2026",
    action: "Administered antihistamine. Parents called immediately.",
    status: "Under Review",
    parentNotified: true,
  },
];

// ── Attendance ──────────────────────────────────────────────────
export type AttendanceRecord = {
  childId: string;
  childName: string;
  avatarInitials: string;
  room: string;
  status: "present" | "absent" | "late";
  checkInTime: string | null;
  checkOutTime: string | null;
  pickedUpBy: string | null;
};

export const mockAttendance: AttendanceRecord[] = [
  { childId: "child-1", childName: "Liam Smith", avatarInitials: "LS", room: "Toddler", status: "present", checkInTime: "08:05 AM", checkOutTime: null, pickedUpBy: null },
  { childId: "child-2", childName: "Olivia Brown", avatarInitials: "OB", room: "Toddler", status: "present", checkInTime: "08:20 AM", checkOutTime: null, pickedUpBy: null },
  { childId: "child-3", childName: "Noah Davies", avatarInitials: "ND", room: "Nursery", status: "late", checkInTime: "09:15 AM", checkOutTime: null, pickedUpBy: null },
  { childId: "child-4", childName: "Johnson Emma", avatarInitials: "JE", room: "Toddler", status: "absent", checkInTime: null, checkOutTime: null, pickedUpBy: null },
  { childId: "child-5", childName: "Tosin Adeyemi", avatarInitials: "TA", room: "Nursery", status: "present", checkInTime: "08:10 AM", checkOutTime: null, pickedUpBy: null },
];

// ── Medication ────────────────────────────────────────────────────
export type MedicationStatus = "scheduled" | "administered" | "missed";

export type MedicationDose = {
  id: string;
  childId: string;
  childName: string;
  medication: string;
  dosage: string;
  scheduledTime: string;
  status: MedicationStatus;
  administeredBy: string | null;
  administeredAt: string | null;
  note: string | null;
};

export const mockMedicationDoses: MedicationDose[] = [
  { id: "med-1", childId: "child-5", childName: "Tosin Adeyemi", medication: "Calpol", dosage: "5ml", scheduledTime: "10:00 AM", status: "administered", administeredBy: "Ms Anu", administeredAt: "10:05 AM", note: "Given with water, no issues." },
  { id: "med-2", childId: "child-3", childName: "Noah Davies", medication: "Antihistamine (Piriton)", dosage: "2.5ml", scheduledTime: "02:00 PM", status: "scheduled", administeredBy: null, administeredAt: null, note: null },
  { id: "med-3", childId: "child-5", childName: "Tosin Adeyemi", medication: "Calpol", dosage: "5ml", scheduledTime: "04:00 PM", status: "scheduled", administeredBy: null, administeredAt: null, note: null },
  { id: "med-4", childId: "child-1", childName: "Liam Smith", medication: "Vitamin D drops", dosage: "1 drop", scheduledTime: "08:30 AM", status: "administered", administeredBy: "Ms Anu", administeredAt: "08:32 AM", note: null },
];

// ── Child extended details (for profile page) ────────────────────
export type ChildProfile = Child & {
  gender: string;
  dob: string;
  enrollDate: string;
  bloodGroup: string;
  notes: string;
};

export const mockChildProfiles: ChildProfile[] = [
  { id: "child-1", name: "Liam Smith", age: "3 Years", room: "Toddler", gender: "Male", dob: "March 14, 2022", enrollDate: "January 10, 2024", bloodGroup: "O+", notes: "Very energetic, loves puzzles. Needs nap at 1pm.", alerts: [{ type: "info", label: "Nap Time", detail: "Needs nap at 1:00 PM" }], parentContact: { id: "contact-1", name: "James Miller", avatarInitials: "JM" } },
  { id: "child-2", name: "Olivia Brown", age: "2 Years", room: "Toddler", gender: "Female", dob: "June 22, 2022", enrollDate: "March 5, 2024", bloodGroup: "A+", notes: "Shy at first but warms up quickly. Loves painting.", alerts: [], parentContact: { id: "contact-2", name: "Sarah Brown", avatarInitials: "SB" } },
  { id: "child-3", name: "Noah Davies", age: "4 Years", room: "Nursery", gender: "Male", dob: "September 3, 2021", enrollDate: "February 1, 2024", bloodGroup: "B+", notes: "Peanut allergy — EpiPen always in his bag. Very social.", alerts: [{ type: "warning", label: "Allergy", detail: "Peanut allergy — EpiPen in bag" }], parentContact: { id: "contact-3", name: "Tom Davies", avatarInitials: "TD" } },
  { id: "child-4", name: "Johnson Emma", age: "3 Years", room: "Toddler", gender: "Female", dob: "December 11, 2021", enrollDate: "April 15, 2024", bloodGroup: "AB+", notes: "Loves storytime. Often asks for extra snacks.", alerts: [], parentContact: { id: "contact-4", name: "Kate Johnson", avatarInitials: "KJ" } },
  { id: "child-5", name: "Tosin Adeyemi", age: "2 Years", room: "Nursery", gender: "Female", dob: "January 30, 2023", enrollDate: "May 20, 2024", bloodGroup: "O-", notes: "Medication at 10am if needed. Very calm temperament.", alerts: [{ type: "info", label: "Medication", detail: "Calpol at 10:00 AM if needed" }], parentContact: { id: "contact-5", name: "Mercy Itom", avatarInitials: "MI" } },
];
