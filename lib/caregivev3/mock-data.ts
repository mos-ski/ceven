export type ChildProfile = {
  id: string;
  name: string;
  age: string;
  avatarInitials: string;
  avatarColor: string;
};

export type TodayMenuItem = {
  id: string;
  time: string;
  label: string;
  dishes: string[];
  ticked: boolean;
};

export type MedicineReminder = {
  id: string;
  childId: string;
  childName: string;
  medicine: string;
  dosage: string;
  time: string;
  status: "pending" | "given" | "skipped";
};

export type EventPrepItem = {
  eventId: string;
  title: string;
  date: string;
  time: string;
  icon: string;
  checklist: ChecklistItem[];
  note: string;
};

export type ChecklistItem = {
  id: string;
  label: string;
  packed: boolean;
};

export type MoneyRequest = {
  id: string;
  amount: number;
  purpose: string;
  status: "pending" | "approved" | "declined";
  requestedAt: string;
};

export type SpendingRecord = {
  id: string;
  item: string;
  amount: number;
  receiptAttached: boolean;
};

export type LowStockItem = {
  id: string;
  item: string;
  category: string;
};

export type DailyReport = {
  id: string;
  date: string;
  childSummaries: ChildReportSummary[];
  spending: SpendingRecord[];
  lowStock: LowStockItem[];
  totalApproved: number;
  totalSpent: number;
  mood: Record<string, { emoji: string; label: string }>;
  note: string;
  sent: boolean;
};

export type ChildReportSummary = {
  childId: string;
  childName: string;
  meals: { label: string; time: string; ticked: boolean }[];
  sleep: { start: string; end: string; duration: string }[];
  diapers: { time: string; type: string }[];
  medicine: { name: string; dosage: string; status: "given" | "skipped" | "pending" }[];
};

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  childIds: string[];
  icon: string;
  checklist: ChecklistItem[];
  note: string;
};

export type ChatMessage = {
  id: string;
  sender: "parent" | "caregiver";
  text: string;
  time: string;
};

export const CHILDREN: ChildProfile[] = [
  {
    id: "zara",
    name: "Zara",
    age: "4 years",
    avatarInitials: "ZA",
    avatarColor: "#C9956A",
  },
  {
    id: "tobi",
    name: "Tobi",
    age: "18 months",
    avatarInitials: "TO",
    avatarColor: "#9A6033",
  },
];

export const PARENT = {
  name: "Mrs. Adeyemi",
  avatarInitials: "MA",
  avatarColor: "#7A4C29",
};

export const TODAY_MENU: TodayMenuItem[] = [
  { id: "mon-b", time: "7:30 AM", label: "Breakfast", dishes: ["Akamu & Akara"], ticked: true },
  { id: "mon-l", time: "12:30 PM", label: "Lunch", dishes: ["Jollof Rice", "Moi-moi"], ticked: false },
  { id: "mon-s", time: "3:00 PM", label: "Snack", dishes: ["Fruit Salad", " Juice"], ticked: false },
  { id: "mon-d", time: "6:30 PM", label: "Dinner", dishes: ["Eba & Egusi Soup"], ticked: false },
];

export const MEDICINE_REMINDERS: MedicineReminder[] = [
  {
    id: "med-1",
    childId: "tobi",
    childName: "Tobi",
    medicine: "Paracetamol syrup",
    dosage: "5 ml after lunch",
    time: "1:00 PM",
    status: "given",
  },
  {
    id: "med-2",
    childId: "zara",
    childName: "Zara",
    medicine: "Vitamin C drops",
    dosage: "2 ml with breakfast",
    time: "8:00 AM",
    status: "given",
  },
  {
    id: "med-3",
    childId: "tobi",
    childName: "Tobi",
    medicine: "Crocodile syrup",
    dosage: "5 ml before dinner",
    time: "6:00 PM",
    status: "pending",
  },
];

export const EVENT_PREP: EventPrepItem[] = [
  {
    eventId: "evt-1",
    title: "Swimming Lesson",
    date: "Saturday, Aug 5",
    time: "2:00 PM",
    icon: "🏊",
    checklist: [
      { id: "ck-1", label: "Swimsuit", packed: true },
      { id: "ck-2", label: "Towel", packed: true },
      { id: "ck-3", label: "Swim cap", packed: false },
      { id: "ck-4", label: "Snacks", packed: false },
      { id: "ck-5", label: "Change of clothes", packed: false },
    ],
    note: "Leave home by 3:30 PM. Driver comes at 3:15 PM.",
  },
  {
    eventId: "evt-2",
    title: "Birthday Party — Chinwe",
    date: "Sunday, Aug 6",
    time: "12:00 PM",
    icon: "🎉",
    checklist: [
      { id: "ck-6", label: "Gift (wrapped)", packed: false },
      { id: "ck-7", label: "Party outfit", packed: false },
      { id: "ck-8", label: "Change of clothes", packed: false },
      { id: "ck-9", label: "Snacks & water", packed: false },
    ],
    note: "Venue is at Freedom Park. Bring both kids.",
  },
];

export const PENDING_MONEY_REQUEST: MoneyRequest = {
  id: "mr-1",
  amount: 5000,
  purpose: "Groceries — rice, beans, tomatoes, onions, and cooking oil",
  status: "pending",
  requestedAt: "9:15 AM",
};

export const SPENDING_RECORDS: SpendingRecord[] = [
  { id: "sp-1", item: "Rice (5kg)", amount: 1800, receiptAttached: true },
  { id: "sp-2", item: "Beans (2kg)", amount: 800, receiptAttached: true },
  { id: "sp-3", item: "Tomatoes & Onions", amount: 600, receiptAttached: false },
];

export const LOW_STOCK_ITEMS: LowStockItem[] = [
  { id: "ls-1", item: "Diapers (size 4)", category: "Baby" },
  { id: "ls-2", item: "Milk powder", category: "Food" },
  { id: "ls-3", item: "Tissue rolls", category: "Household" },
];

export const DAILY_REPORT: DailyReport = {
  id: "dr-1",
  date: "Monday, Aug 3",
  childSummaries: [
    {
      childId: "zara",
      childName: "Zara",
      meals: [
        { label: "Breakfast — Akamu & Akara", time: "7:45 AM", ticked: true },
        { label: "Lunch — Jollof Rice & Moi-moi", time: "12:45 PM", ticked: true },
        { label: "Snack — Fruit Salad & Juice", time: "3:15 PM", ticked: true },
        { label: "Dinner — Eba & Egusi Soup", time: "7:00 PM", ticked: false },
      ],
      sleep: [
        { start: "10:00 AM", end: "11:30 AM", duration: "1h 30m" },
      ],
      diapers: [],
      medicine: [
        { name: "Vitamin C drops", dosage: "2 ml", status: "given" },
      ],
    },
    {
      childId: "tobi",
      childName: "Tobi",
      meals: [
        { label: "Breakfast — Oats & Banana", time: "8:00 AM", ticked: true },
        { label: "Lunch — Jollof Rice & Moi-moi", time: "12:30 PM", ticked: true },
        { label: "Snack — Fruit Salad", time: "3:00 PM", ticked: false },
        { label: "Dinner — Eba & Egusi Soup", time: "6:30 PM", ticked: false },
      ],
      sleep: [
        { start: "10:00 AM", end: "12:00 PM", duration: "2h" },
        { start: "2:30 PM", end: "3:30 PM", duration: "1h" },
      ],
      diapers: [
        { time: "8:15 AM", type: "Wet" },
        { time: "11:00 AM", type: "Dirty" },
        { time: "2:00 PM", type: "Wet" },
      ],
      medicine: [
        { name: "Paracetamol syrup", dosage: "5 ml", status: "given" },
        { name: "Crocodile syrup", dosage: "5 ml", status: "pending" },
      ],
    },
  ],
  spending: [
    { id: "sp-1", item: "Rice (5kg)", amount: 1800, receiptAttached: true },
    { id: "sp-2", item: "Beans (2kg)", amount: 800, receiptAttached: true },
    { id: "sp-3", item: "Tomatoes & Onions", amount: 600, receiptAttached: false },
  ],
  lowStock: [
    { id: "ls-1", item: "Diapers (size 4)", category: "Baby" },
    { id: "ls-2", item: "Milk powder", category: "Food" },
    { id: "ls-3", item: "Tissue rolls", category: "Household" },
  ],
  totalApproved: 5000,
  totalSpent: 3200,
  mood: {
    zara: { emoji: "😊", label: "Happy" },
    tobi: { emoji: "😴", label: "Sleepy" },
  },
  note: "Both children were well today. Zara enjoyed her swimming lesson prep. Tobi took his medicine on time.",
  sent: false,
};

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "evt-1",
    title: "Swimming Lesson",
    date: "Saturday, Aug 5",
    time: "2:00 PM",
    childIds: ["zara"],
    icon: "🏊",
    checklist: [
      { id: "ck-1", label: "Swimsuit", packed: true },
      { id: "ck-2", label: "Towel", packed: true },
      { id: "ck-3", label: "Swim cap", packed: false },
      { id: "ck-4", label: "Snacks", packed: false },
      { id: "ck-5", label: "Change of clothes", packed: false },
    ],
    note: "Leave home by 3:30 PM. Driver comes at 3:15 PM.",
  },
  {
    id: "evt-2",
    title: "Birthday Party — Chinwe",
    date: "Sunday, Aug 6",
    time: "12:00 PM",
    childIds: ["zara", "tobi"],
    icon: "🎉",
    checklist: [
      { id: "ck-6", label: "Gift (wrapped)", packed: false },
      { id: "ck-7", label: "Party outfit", packed: false },
      { id: "ck-8", label: "Change of clothes", packed: false },
      { id: "ck-9", label: "Snacks & water", packed: false },
    ],
    note: "Venue is at Freedom Park. Bring both kids.",
  },
  {
    id: "evt-3",
    title: "Vaccination — Tobi",
    date: "Wednesday, Aug 9",
    time: "10:00 AM",
    childIds: ["tobi"],
    icon: "💉",
    checklist: [
      { id: "ck-10", label: "Health card", packed: false },
      { id: "ck-11", label: "Diaper bag", packed: false },
      { id: "ck-12", label: "Snacks for Tobi", packed: false },
    ],
    note: "Lagoon Hospital. Bring Tobi's immunization card.",
  },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  { id: "msg-1", sender: "parent", text: "Good morning! Please make sure Zara eats before her swimming lesson.", time: "7:15 AM" },
  { id: "msg-2", sender: "caregiver", text: "Good morning Ma. Zara has eaten breakfast. I'll pack her bag now.", time: "7:45 AM" },
  { id: "msg-3", sender: "parent", text: "Thank you! Don't forget the swim cap, she always forgets it.", time: "8:00 AM" },
  { id: "msg-4", sender: "caregiver", text: "Noted Ma. I've packed the cap and towel. Swimming is at 2pm right?", time: "8:05 AM" },
  { id: "msg-5", sender: "parent", text: "Yes, 2pm. Driver will come by 3:15 to take you both.", time: "8:10 AM" },
  { id: "msg-6", sender: "caregiver", text: "Thank you Ma. Tobi also took his medicine this morning.", time: "8:30 AM" },
  { id: "msg-7", sender: "parent", text: "Good. How much do you need for groceries this week?", time: "9:00 AM" },
  { id: "msg-8", sender: "caregiver", text: "₦5,000 should cover rice, beans, tomatoes and cooking oil.", time: "9:15 AM" },
];
