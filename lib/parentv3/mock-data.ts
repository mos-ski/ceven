export type ChildProfile = {
  id: string;
  name: string;
  age: string;
  avatarInitials: string;
  avatarColor: string;
};

export type MealSlot = {
  id: string;
  time: string;
  label: string;
  dishes: string[];
  shared: boolean;
};

export type DayMenu = {
  day: string;
  shortDay: string;
  meals: MealSlot[];
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

export type DailyReportSummary = {
  id: string;
  caregiverName: string;
  date: string;
  sentAt: string;
  childSummaries: {
    childId: string;
    mood: string;
    moodLabel: string;
  }[];
};

export type ActivityFeedItem = {
  id: string;
  type: "meal" | "nap" | "medicine" | "event" | "money" | "mood" | "diaper";
  description: string;
  time: string;
  childId?: string;
  icon: string;
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

export const CAREGIVER = {
  name: "Aunty Blessing",
  avatarInitials: "AB",
  avatarColor: "#7A4C29",
};

export const WEEKLY_MENU: DayMenu[] = [
  {
    day: "Monday",
    shortDay: "Mon",
    meals: [
      { id: "mon-b", time: "7:30 AM", label: "Breakfast", dishes: ["Akamu & Akara"], shared: true },
      { id: "mon-l", time: "12:30 PM", label: "Lunch", dishes: ["Jollof Rice", "Moi-moi"], shared: true },
      { id: "mon-s", time: "3:00 PM", label: "Snack", dishes: ["Fruit Salad", " Juice"], shared: true },
      { id: "mon-d", time: "6:30 PM", label: "Dinner", dishes: ["Eba & Egusi Soup"], shared: true },
    ],
  },
  {
    day: "Tuesday",
    shortDay: "Tue",
    meals: [
      { id: "tue-b", time: "7:30 AM", label: "Breakfast", dishes: ["Bread & Eggs", " Tea"], shared: true },
      { id: "tue-l", time: "12:30 PM", label: "Lunch", dishes: ["Fried Rice", "Chicken Stew"], shared: true },
      { id: "tue-s", time: "3:00 PM", label: "Snack", dishes: ["Chin Chin", " Coke"], shared: false },
      { id: "tue-d", time: "6:30 PM", label: "Dinner", dishes: ["Amala & Ewedu"], shared: false },
    ],
  },
  {
    day: "Wednesday",
    shortDay: "Wed",
    meals: [
      { id: "wed-b", time: "7:30 AM", label: "Breakfast", dishes: ["Oats & Banana"], shared: false },
      { id: "wed-l", time: "12:30 PM", label: "Lunch", dishes: ["Ofada Rice", "Ayamase Stew"], shared: false },
      { id: "wed-s", time: "3:00 PM", label: "Snack", dishes: ["Puff Puff", " Juice"], shared: false },
      { id: "wed-d", time: "6:30 PM", label: "Dinner", dishes: ["Suya & Yam"], shared: false },
    ],
  },
  {
    day: "Thursday",
    shortDay: "Thu",
    meals: [
      { id: "thu-b", time: "7:30 AM", label: "Breakfast", dishes: ["Masa & Wara"], shared: false },
      { id: "thu-l", time: "12:30 PM", label: "Lunch", dishes: ["Rice & Beans", "Stew"], shared: false },
      { id: "thu-s", time: "3:00 PM", label: "Snack", dishes: ["Groundnuts", " Fruit"], shared: false },
      { id: "thu-d", time: "6:30 PM", label: "Dinner", dishes: ["Spaghetti & Chicken"], shared: false },
    ],
  },
  {
    day: "Friday",
    shortDay: "Fri",
    meals: [
      { id: "fri-b", time: "7:30 AM", label: "Breakfast", dishes: ["Yam & Egg Sauce"], shared: false },
      { id: "fri-l", time: "12:30 PM", label: "Lunch", dishes: ["Jollof Spaghetti", "Salad"], shared: false },
      { id: "fri-s", time: "3:00 PM", label: "Snack", dishes: ["Biscuits", " Milk"], shared: false },
      { id: "fri-d", time: "6:30 PM", label: "Dinner", dishes: ["Pepper Soup", " Rice"], shared: false },
    ],
  },
  {
    day: "Saturday",
    shortDay: "Sat",
    meals: [
      { id: "sat-b", time: "8:00 AM", label: "Breakfast", dishes: ["Pancakes", " Juice"], shared: false },
      { id: "sat-l", time: "1:00 PM", label: "Lunch", dishes: ["Fried Rice", " Plantain", " Chicken"], shared: false },
      { id: "sat-s", time: "3:30 PM", label: "Snack", dishes: ["Chops & Drinks"], shared: false },
      { id: "sat-d", time: "7:00 PM", label: "Dinner", dishes: ["Indomie & Eggs"], shared: false },
    ],
  },
  {
    day: "Sunday",
    shortDay: "Sun",
    meals: [
      { id: "sun-b", time: "8:00 AM", label: "Breakfast", dishes: ["Beans & Plantain"], shared: false },
      { id: "sun-l", time: "1:00 PM", label: "Lunch", dishes: ["Ofada Rice", " Ayamase"], shared: false },
      { id: "sun-s", time: "3:30 PM", label: "Snack", dishes: ["Chin Chin", " Zobo"], shared: false },
      { id: "sun-d", time: "7:00 PM", label: "Dinner", dishes: ["Light Soup & Fufu"], shared: false },
    ],
  },
];

export const UPCOMING_EVENTS: CalendarEvent[] = [
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
    note: "Lagoon Hospital, 3:15 PM pickup. Bring Tobi's immunization card.",
  },
];

export const PENDING_MONEY_REQUEST: MoneyRequest = {
  id: "mr-1",
  amount: 5000,
  purpose: "Groceries — rice, beans, tomatoes, onions, and cooking oil",
  status: "pending",
  requestedAt: "9:15 AM",
};

export const DAILY_REPORT: DailyReportSummary = {
  id: "dr-1",
  caregiverName: "Aunty Blessing",
  date: "Today",
  sentAt: "6:45 PM",
  childSummaries: [
    { childId: "zara", mood: "😊", moodLabel: "Happy" },
    { childId: "tobi", mood: "😴", moodLabel: "Sleepy" },
  ],
};

export const ACTIVITY_FEED: ActivityFeedItem[] = [
  { id: "af-1", type: "meal", description: "Zara had breakfast — Akamu & Akara", time: "7:45 AM", childId: "zara", icon: "🍽️" },
  { id: "af-2", type: "meal", description: "Tobi had breakfast — Oats & Banana", time: "8:00 AM", childId: "tobi", icon: "🍽️" },
  { id: "af-3", type: "medicine", description: "Tobi given Paracetamol syrup (5 ml)", time: "8:30 AM", childId: "tobi", icon: "💊" },
  { id: "af-4", type: "nap", description: "Tobi fell asleep", time: "10:00 AM", childId: "tobi", icon: "😴" },
  { id: "af-5", type: "meal", description: "Zara had lunch — Jollof Rice & Moi-moi", time: "12:45 PM", childId: "zara", icon: "🍽️" },
  { id: "af-6", type: "event", description: "Swim bag item packed — Swimsuit", time: "1:30 PM", icon: "🎒" },
  { id: "af-7", type: "event", description: "Swim bag item packed — Towel", time: "1:32 PM", icon: "🎒" },
  { id: "af-8", type: "diaper", description: "Tobi's diaper changed", time: "2:00 PM", childId: "tobi", icon: "🧒" },
  { id: "af-9", type: "meal", description: "Snack served — Fruit Salad & Juice", time: "3:15 PM", childId: "zara", icon: "🍽️" },
  { id: "af-10", type: "money", description: "Market money request — ₦5,000", time: "9:15 AM", icon: "💰" },
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
