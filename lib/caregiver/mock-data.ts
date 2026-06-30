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
  status: "pending" | "completed";
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
    description: "Kindly give her the drugs when needed.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "pending",
  },
  {
    id: "task-2",
    title: "Give medicine to Tosin",
    description: "Kindly give her the drugs when needed.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "pending",
  },
  {
    id: "task-3",
    title: "Give medicine to Tosin",
    description: "Kindly give her the drugs when needed.",
    dueTime: "10:00am",
    reminderTime: "09:00am",
    status: "pending",
  },
  {
    id: "task-4",
    title: "Give medicine to Tosin",
    description: "Kindly give her the drugs when needed.",
    dueTime: "10:30am",
    reminderTime: "09:30am",
    status: "completed",
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
      src: "/caregiver/placeholder-playtime.jpg",
      caption: "Esther had a wonderful time playing with her friends today!",
      label: "Playtime",
    },
  ],
};
