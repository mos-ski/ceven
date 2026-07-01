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
    photo: "/parent/placeholder-playtime.jpg",
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
    photo: "/parent/placeholder-art.jpg",
    photoCaption: "Liam enjoyed painting during art time.",
  },
];

export const mockFees: FeeInvoice[] = [
  { id: "fee-1", term: "January Term 2026", amount: "₦45,000", dueDate: "Jan 31, 2026", status: "pending" },
  { id: "fee-2", term: "December Term 2025", amount: "₦45,000", dueDate: "Dec 31, 2025", status: "paid" },
  { id: "fee-3", term: "November Term 2025", amount: "₦40,000", dueDate: "Nov 30, 2025", status: "paid" },
];

export const mockGallery: GalleryPhoto[] = [
  { id: "photo-1", label: "Playtime", caption: "Liam having fun with blocks", date: "Jan 9, 2026" },
  { id: "photo-2", label: "Art & Craft", caption: "Liam's painting session", date: "Jan 9, 2026" },
  { id: "photo-3", label: "Story Time", caption: "Group story time after lunch", date: "Jan 8, 2026" },
  { id: "photo-4", label: "Outdoor Play", caption: "Liam on the slide", date: "Jan 8, 2026" },
  { id: "photo-5", label: "Snack Time", caption: "Healthy snacks with friends", date: "Jan 7, 2026" },
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

export const mockNotifications: Notification[] = [
  { id: "notif-1", title: "Daily Report Ready", body: "Liam's daily report for today is ready to view", time: "08:00 AM", read: false, type: "report" },
  { id: "notif-2", title: "Fee Due", body: "January term fees are due in 5 days", time: "2 days ago", read: true, type: "fee" },
  { id: "notif-3", title: "New Message", body: "Ms Anu sent you a message", time: "Yesterday", read: true, type: "chat" },
];
