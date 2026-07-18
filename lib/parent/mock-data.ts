export type ParentUser = {
  name: string;
  role: "parent";
  avatarInitials: string;
  childName: string;
};

export type ChildInfo = {
  id: string;
  name: string;
  age: string;
  room: string;
  caregiver: string;
  caregiverInitials: string;
};

export type DailyReport = {
  date: string;
  mood: string[];
  meals: number;
  napStart: string;
  napEnd: string;
  napDuration: string;
  hygiene: string;
  activities: string;
  photo: string;
  photoCaption: string;
};

export type FeeInvoice = {
  id: string;
  term: string;
  amount: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
};

export type GalleryPhoto = {
  id: string;
  label: string;
  caption: string;
  date: string;
  image: string;
};

export type ChatThread = {
  id: string;
  contactName: string;
  contactInitials: string;
  lastMessage: string;
  lastMessageTime: string;
  dateGroup: string;
};

export type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "report" | "fee" | "chat" | "incident";
};

export const mockParentUser: ParentUser = {
  name: "James Miller",
  role: "parent",
  avatarInitials: "JM",
  childName: "Liam Smith",
};

export const mockChild: ChildInfo = {
  id: "child-1",
  name: "Liam Smith",
  age: "3 Years",
  room: "Toddler Room",
  caregiver: "Ms Anu",
  caregiverInitials: "MA",
};

export const mockDailyReports: DailyReport[] = [
  {
    date: "Friday, 9 January, 2026",
    mood: ["🤩 Playful", "😄 Happy"],
    meals: 3,
    napStart: "12:30 PM",
    napEnd: "2:00 PM",
    napDuration: "1hr 30mins",
    hygiene: "2 urine, 1 poop",
    activities: "Block building, outdoor play, story time",
    photo: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
    photoCaption: "Liam had a wonderful time playing with blocks today!",
  },
  {
    date: "Thursday, 8 January, 2026",
    mood: ["😊 Good"],
    meals: 3,
    napStart: "12:45 PM",
    napEnd: "2:15 PM",
    napDuration: "1hr 30mins",
    hygiene: "3 urine, 1 poop",
    activities: "Art & craft, music time, outdoor play",
    photo: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    photoCaption: "Liam enjoyed painting during art time.",
  },
];

export const mockFees: FeeInvoice[] = [
  { id: "fee-1", term: "January Term 2026", amount: "₦45,000", dueDate: "Jan 31, 2026", status: "pending" },
  { id: "fee-2", term: "December Term 2025", amount: "₦45,000", dueDate: "Dec 31, 2025", status: "paid" },
  { id: "fee-3", term: "November Term 2025", amount: "₦40,000", dueDate: "Nov 30, 2025", status: "paid" },
];

export const mockGallery: GalleryPhoto[] = [
  { id: "photo-1", label: "Playtime", caption: "Liam having fun with blocks", date: "Jan 9, 2026", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80" },
  { id: "photo-2", label: "Art & Craft", caption: "Liam's painting session", date: "Jan 9, 2026", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80" },
  { id: "photo-3", label: "Story Time", caption: "Group story time after lunch", date: "Jan 8, 2026", image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=80" },
  { id: "photo-4", label: "Outdoor Play", caption: "Liam on the slide", date: "Jan 8, 2026", image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=80" },
  { id: "photo-5", label: "Snack Time", caption: "Healthy snacks with friends", date: "Jan 7, 2026", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=80" },
];

export const mockChatThreads: ChatThread[] = [
  {
    id: "thread-1",
    contactName: "Ms Anu",
    contactInitials: "MA",
    lastMessage: "Liam had a great day today! He played well with others.",
    lastMessageTime: "16:50",
    dateGroup: "Today",
  },
  {
    id: "thread-2",
    contactName: "Ms Anu",
    contactInitials: "MA",
    lastMessage: "Please remember to bring extra clothes tomorrow.",
    lastMessageTime: "Yesterday",
    dateGroup: "Yesterday",
  },
];

export type FeedPost = {
  id: string;
  tag: string;
  caption: string;
  postedBy: string;
  timeAgo: string;
  hasVideo: boolean;
  image: string;
};

export type AiMessage = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export const mockFeedPosts: FeedPost[] = [
  {
    id: "post-1",
    tag: "Playtime",
    caption: "Esther had a wonderful time playing with her friends today!",
    postedBy: "Sarah Johnson",
    timeAgo: "2 hours ago",
    hasVideo: false,
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "post-2",
    tag: "Art & Craft",
    caption: "Art session: Esther created a beautiful, painting!",
    postedBy: "Sarah Johnson",
    timeAgo: "2 hours ago",
    hasVideo: true,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "post-3",
    tag: "Story Time",
    caption: "Esther loved today's story about the little elephant!",
    postedBy: "Ms Anu",
    timeAgo: "5 hours ago",
    hasVideo: false,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
  },
];

export const mockAiMessages: AiMessage[] = [
  { id: "ai-1", role: "user", content: "Can you summarize today's report for my child?" },
  { id: "ai-2", role: "ai", content: "Hello! How may I assist you today?" },
  { id: "ai-3", role: "user", content: "Show me what you can do" },
  {
    id: "ai-4",
    role: "ai",
    content:
      "Of course! As an AI language model, I am designed to assist with a variety of tasks. Here are some examples of what I can do:\n• Answer questions: Just ask me anything you like!\n• Generate text: I can write |",
  },
];

export const mockNotifications: Notification[] = [
  { id: "notif-1", title: "Daily Report Ready", body: "Liam's daily report for today is ready to view", time: "08:00 AM", read: false, type: "report" },
  { id: "notif-2", title: "Fee Due", body: "January term fees are due in 5 days", time: "2 days ago", read: true, type: "fee" },
  { id: "notif-3", title: "New Message", body: "Ms Anu sent you a message", time: "Yesterday", read: true, type: "chat" },
];

// ─── Attendance (check-in / check-out) ──────────────────────────────────────
export type AttendanceStatus = "present" | "absent" | "late";

export type AttendanceEvent = {
  date: string;
  shortDate: string;
  status: AttendanceStatus;
  checkInTime: string | null;
  checkOutTime: string | null;
  pickedUpBy: string | null;
  exception: string | null;
};

export const mockAttendanceHistory: AttendanceEvent[] = [
  { date: "Today", shortDate: "Jan 9", status: "present", checkInTime: "08:05 AM", checkOutTime: null, pickedUpBy: null, exception: null },
  { date: "Yesterday", shortDate: "Jan 8", status: "present", checkInTime: "08:12 AM", checkOutTime: "04:20 PM", pickedUpBy: "James Miller (Dad)", exception: null },
  { date: "Wed, Jan 7", shortDate: "Jan 7", status: "present", checkInTime: "07:58 AM", checkOutTime: "05:45 PM", pickedUpBy: "Aunty Bisi (authorized)", exception: null },
  { date: "Tue, Jan 6", shortDate: "Jan 6", status: "late", checkInTime: "09:20 AM", checkOutTime: "04:15 PM", pickedUpBy: "James Miller (Dad)", exception: null },
  { date: "Mon, Jan 5", shortDate: "Jan 5", status: "present", checkInTime: "08:00 AM", checkOutTime: "06:10 PM", pickedUpBy: "Unrecognized pickup", exception: "Pickup attempted by someone not on the authorized list — front desk verified ID and contacted parent before release." },
  { date: "Fri, Jan 2", shortDate: "Jan 2", status: "absent", checkInTime: null, checkOutTime: null, pickedUpBy: null, exception: null },
];

// ─── Incidents ───────────────────────────────────────────────────────────────
export type IncidentStatus = "Open" | "Under Review" | "Resolved";

export type ChildIncident = {
  id: string;
  title: string;
  description: string;
  severity: "minor" | "moderate" | "severe";
  time: string;
  date: string;
  status: IncidentStatus;
  actionTaken: string;
};

export const mockChildIncidents: ChildIncident[] = [
  {
    id: "inc-1",
    title: "Minor Bump",
    description: "Liam bumped his knee while playing during outdoor time.",
    severity: "minor",
    time: "10:30 AM",
    date: "Jan 8, 2026",
    status: "Resolved",
    actionTaken: "Applied a cold compress, Liam was back to playing within minutes. No further action needed.",
  },
];

// ─── Medication ────────────────────────────────────────────────────────────
export type MedicationDoseStatus = "scheduled" | "administered" | "missed";

export type ChildMedicationDose = {
  id: string;
  medication: string;
  dosage: string;
  scheduledTime: string;
  status: MedicationDoseStatus;
  administeredBy: string | null;
  administeredAt: string | null;
  date: string;
};

export const mockChildMedication: ChildMedicationDose[] = [
  { id: "med-1", medication: "Vitamin D drops", dosage: "1 drop", scheduledTime: "08:30 AM", status: "administered", administeredBy: "Ms Anu", administeredAt: "08:32 AM", date: "Today" },
  { id: "med-2", medication: "Vitamin D drops", dosage: "1 drop", scheduledTime: "08:30 AM", status: "administered", administeredBy: "Ms Anu", administeredAt: "08:35 AM", date: "Yesterday" },
];

// ─── Rich Notifications ────────────────────────────────────────────────────────
export type NotifIcon = "video" | "photo" | "alert" | "clock" | "videocam" | "report" | "chat" | "fee" | "checkin" | "medication";

export type RichNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  icon: NotifIcon;
  day: string;
};

export const mockRichNotifications: RichNotification[] = [
  { id: "rn-checkin-1", title: "Checked In", body: "Liam checked in at 08:05 AM", time: "08:05 AM", read: false, icon: "checkin", day: "Today" },
  { id: "rn-med-1", title: "Medication Given", body: "Vitamin D drops administered by Ms Anu at 08:32 AM", time: "08:32 AM", read: false, icon: "medication", day: "Today" },
  { id: "rn-1", title: "Art & Craft", body: "Art session: Esther created a beautiful painting! 🎨", time: "09:30 AM", read: false, icon: "video", day: "Today" },
  { id: "rn-2", title: "Playtime", body: "Esther had a wonderful time playing with her friends today!", time: "08:25 AM", read: false, icon: "photo", day: "Today" },
  { id: "rn-3", title: "Emergency Contact", body: "Lorem ipsum dolor sit amet consectetur. Morbi imperdiet vitae id felis in volutpat justo ut ut.", time: "09:30 AM", read: true, icon: "alert", day: "Today" },
  { id: "rn-pickup-exception", title: "Unrecognized Pickup Attempt", body: "Someone not on your authorized pickup list attempted to collect Liam. Front desk verified ID before release.", time: "06:10 PM", read: true, icon: "alert", day: "Yesterday" },
  { id: "rn-4", title: "Screen Time Limit Reac...", body: "Ethan has reached the 2-hour screen time limit you set today.", time: "09:30 AM", read: false, icon: "clock", day: "Yesterday" },
  { id: "rn-5", title: "Video Call", body: "Ava installed \"TikTok\" on her device for entertainment", time: "09:30 AM", read: false, icon: "videocam", day: "Yesterday" },
  { id: "rn-6", title: "Emergency Signal Sent", body: "An emergency signal was sent from Ethan's device.", time: "09:30 AM", read: true, icon: "alert", day: "Yesterday" },
  { id: "rn-7", title: "Daily Report Ready", body: "Liam's daily report for today is ready to view", time: "08:00 AM", read: true, icon: "report", day: "Yesterday" },
];

// ─── Creche Data ───────────────────────────────────────────────────────────────
export type CrecheRoom = {
  id: string;
  name: string;
  ageRange: string;
  spots: number;
  pricing: { label: string; amount: string; unit: string }[];
};

export type Creche = {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  spots: number;
  phone: string;
  description: string;
  ageRange: string;
  features: string[];
  hours: string;
  isOpen: boolean;
  address: string;
  careFromPrice: string;
  rooms: CrecheRoom[];
  policies: string[];
};

const STANDARD_PRICING = [
  { label: "Full Day", amount: "$65", unit: "Day" },
  { label: "Half Day", amount: "$40", unit: "Day" },
  { label: "Hourly Rate", amount: "$12", unit: "Hour" },
  { label: "Weekly", amount: "$300", unit: "Week" },
  { label: "Monthly", amount: "$1,100", unit: "Month" },
];

const STANDARD_POLICIES = [
  "Operating hours: 6:30 AM – 6:30 PM. Late pickup fee: $2 per minute after 6:30 PM.",
  "Health requirements: Current immunization records and annual health exams required.",
  "Illness policy: Children must be symptom-free for 24 hours before returning.",
  "Tuition is non-refundable and due weekly by Friday for the following week.",
  "30-day written notice required for enrolment changes.",
  "We provide all meals and snacks following USDA guidelines.",
  "Classroom parties limited to birthdays and major holidays.",
];

export const mockCreches: Creche[] = [
  {
    id: "creche-1",
    name: "St. Greg Creche",
    location: "Victoria Island, Lagos",
    distance: "0.7 km",
    rating: 4.0,
    spots: 5,
    phone: "+23452268769",
    description: "A nurturing environment where children explore, learn, and grow through play-based learning and individualised attention.",
    ageRange: "Ages 6months - 5years",
    features: ["Montessori certified", "Security cameras", "Daily report via app"],
    hours: "9 AM - 10 PM",
    isOpen: true,
    address: "Block A25, 1004...",
    careFromPrice: "$12",
    rooms: [
      { id: "r-1", name: "Infant Room", ageRange: "6-12 months", spots: 5, pricing: STANDARD_PRICING },
      { id: "r-2", name: "Toddler Room", ageRange: "1-2 years", spots: 5, pricing: STANDARD_PRICING },
      { id: "r-3", name: "Preschool Room", ageRange: "3-5 years", spots: 10, pricing: STANDARD_PRICING },
    ],
    policies: STANDARD_POLICIES,
  },
  {
    id: "creche-2",
    name: "Favor Creche",
    location: "Lekki, Lagos",
    distance: "1.2 km",
    rating: 4.5,
    spots: 25,
    phone: "+23452268799",
    description: "A warm and welcoming space where every child thrives through structured play, creative arts, and individualised care.",
    ageRange: "Ages 3months - 4years",
    features: ["Outdoor playground", "CCTV monitoring", "Daily report via app"],
    hours: "7 AM - 7 PM",
    isOpen: true,
    address: "12 Admiralty Way, Lekki Phase 1",
    careFromPrice: "$10",
    rooms: [
      { id: "r-4", name: "Infant Room", ageRange: "3-12 months", spots: 8, pricing: STANDARD_PRICING },
      { id: "r-5", name: "Toddler Room", ageRange: "1-2 years", spots: 12, pricing: STANDARD_PRICING },
      { id: "r-6", name: "Pre-K Room", ageRange: "3-4 years", spots: 15, pricing: STANDARD_PRICING },
    ],
    policies: STANDARD_POLICIES,
  },
  {
    id: "creche-3",
    name: "Gracious Creche",
    location: "Lekki, Lagos",
    distance: "1.5 km",
    rating: 3.5,
    spots: 7,
    phone: "+23452268811",
    description: "A safe and stimulating environment for early learners, with a focus on holistic child development and parental engagement.",
    ageRange: "Ages 6months - 5years",
    features: ["Qualified caregivers", "Nutritious meals", "Daily report via app"],
    hours: "7:30 AM - 6 PM",
    isOpen: true,
    address: "45 Freedom Way, Lekki Phase 2",
    careFromPrice: "$8",
    rooms: [
      { id: "r-7", name: "Infant Room", ageRange: "6-12 months", spots: 3, pricing: STANDARD_PRICING },
      { id: "r-8", name: "Toddler Room", ageRange: "1-2 years", spots: 4, pricing: STANDARD_PRICING },
    ],
    policies: STANDARD_POLICIES,
  },
  {
    id: "creche-4",
    name: "TT Creche",
    location: "Lekki, Lagos",
    distance: "1.8 km",
    rating: 4.0,
    spots: 2,
    phone: "+23452268822",
    description: "Small-group, relationship-focused care with a gentle approach to early childhood education.",
    ageRange: "Ages 3months - 3years",
    features: ["Low child-to-caregiver ratio", "Weekly parent updates", "Daily report via app"],
    hours: "8 AM - 6 PM",
    isOpen: false,
    address: "7 Orchid Road, Lekki",
    careFromPrice: "$11",
    rooms: [
      { id: "r-9", name: "Infant Room", ageRange: "3-12 months", spots: 2, pricing: STANDARD_PRICING },
      { id: "r-10", name: "Toddler Room", ageRange: "1-3 years", spots: 4, pricing: STANDARD_PRICING },
    ],
    policies: STANDARD_POLICIES,
  },
];
