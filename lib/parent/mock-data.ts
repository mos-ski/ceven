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
  aspect?: "square" | "landscape" | "portrait" | "tall";
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

export type MoodEntry = {
  date: string;
  mood: string;
  score: number; // 1-5
  color: string;
};

export type ChildMoodProfile = {
  childId: string;
  name: string;
  age: string;
  room: string;
  health: string;
  height: string;
  weeklyMoods: MoodEntry[];
};

export const mockChildMoods: Record<string, ChildMoodProfile> = {
  "child-1": {
    childId: "child-1",
    name: "Liam Smith",
    age: "3 Years",
    room: "Toddler Room",
    health: "Healthy, Nut Allergy",
    height: "96 cm",
    weeklyMoods: [
      { date: "Mon", mood: "Happy", score: 4, color: "#4ADE80" },
      { date: "Tue", mood: "Playful", score: 5, color: "#22C55E" },
      { date: "Wed", mood: "Good", score: 4, color: "#4ADE80" },
      { date: "Thu", mood: "Tired", score: 2, color: "#FBBF24" },
      { date: "Fri", mood: "Happy", score: 4, color: "#4ADE80" },
    ],
  },
  "child-2": {
    childId: "child-2",
    name: "Zoe Smith",
    age: "5 Years",
    room: "Prep Class",
    health: "Healthy",
    height: "108 cm",
    weeklyMoods: [
      { date: "Mon", mood: "Excited", score: 5, color: "#22C55E" },
      { date: "Tue", mood: "Happy", score: 4, color: "#4ADE80" },
      { date: "Wed", mood: "Confident", score: 5, color: "#22C55E" },
      { date: "Thu", mood: "Good", score: 4, color: "#4ADE80" },
      { date: "Fri", mood: "Playful", score: 5, color: "#22C55E" },
    ],
  },
  "child-3": {
    childId: "child-3",
    name: "Noah Smith",
    age: "18 Months",
    room: "Nursery",
    health: "Healthy",
    height: "82 cm",
    weeklyMoods: [
      { date: "Mon", mood: "Sleepy", score: 3, color: "#FB923C" },
      { date: "Tue", mood: "Happy", score: 4, color: "#4ADE80" },
      { date: "Wed", mood: "Good", score: 4, color: "#4ADE80" },
      { date: "Thu", mood: "Fussy", score: 2, color: "#FBBF24" },
      { date: "Fri", mood: "Happy", score: 4, color: "#4ADE80" },
    ],
  },
};

export const mockParentUser: ParentUser = {
  name: "James Miller",
  role: "parent",
  avatarInitials: "JM",
  childName: "Liam Smith",
};

// ─── Membership ──────────────────────────────────────────────────────────────

export type ParentMembershipStatus = "active" | "trial_ended";

/** Toggle to "active" to preview the app with all family features unlocked. */
export const PARENT_MEMBERSHIP: { status: ParentMembershipStatus } = {
  status: "trial_ended",
};

/**
 * CEvenAI and direct messaging let a trial user actually use the feature for a
 * few messages before surfacing membership status — never an upfront block.
 * The limit is enforced inline, as a reply within the conversation itself.
 */
export const TRIAL_MESSAGE_LIMIT = 5;

/** Routes that block entry outright once the trial has ended (no trial usage to offer). */
const GATED_FEATURE_HREFS: string[] = [];

export function isFeatureGated(href: string): boolean {
  return PARENT_MEMBERSHIP.status !== "active" && GATED_FEATURE_HREFS.some((h) => href.startsWith(h));
}

export const mockChild: ChildInfo = {
  id: "child-1",
  name: "Liam Smith",
  age: "3 Years",
  room: "Toddler Room",
  caregiver: "Ms Anu",
  caregiverInitials: "MA",
};

export const mockParentChildren: ChildInfo[] = [
  { id: "child-1", name: "Liam Smith", age: "3 Years", room: "Toddler Room", caregiver: "Ms Anu", caregiverInitials: "MA" },
  { id: "child-2", name: "Zoe Smith", age: "5 Years", room: "Prep Class", caregiver: "Mr Ben", caregiverInitials: "MB" },
  { id: "child-3", name: "Noah Smith", age: "18 Months", room: "Nursery", caregiver: "Mrs Ngozi", caregiverInitials: "MN" },
];

export const mockReportsByChild: Record<string, DailyReport[]> = {
  "child-1": [
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
  ],
  "child-2": [
    {
      date: "Friday, 9 January, 2026",
      mood: ["😎 Confident"],
      meals: 3,
      napStart: "1:00 PM",
      napEnd: "2:30 PM",
      napDuration: "1hr 30mins",
      hygiene: "2 urine, 1 poop",
      activities: "Reading, puzzle time, outdoor football",
      photo: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
      photoCaption: "Zoe read her first full story today!",
    },
    {
      date: "Thursday, 8 January, 2026",
      mood: ["😄 Happy", "🤩 Excited"],
      meals: 2,
      napStart: "12:30 PM",
      napEnd: "1:45 PM",
      napDuration: "1hr 15mins",
      hygiene: "2 urine, 0 poop",
      activities: "Science experiment, painting, dance",
      photo: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
      photoCaption: "Zoe loved the volcano experiment!",
    },
  ],
  "child-3": [
    {
      date: "Friday, 9 January, 2026",
      mood: ["😴 Sleepy", "😊 Good"],
      meals: 4,
      napStart: "11:30 AM",
      napEnd: "1:00 PM",
      napDuration: "1hr 30mins",
      hygiene: "4 urine, 2 poop",
      activities: "Sensory play, music shakers, crawling course",
      photo: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
      photoCaption: "Noah explored the sensory bin and loved the water play!",
    },
    {
      date: "Thursday, 8 January, 2026",
      mood: ["😄 Happy"],
      meals: 3,
      napStart: "12:00 PM",
      napEnd: "1:30 PM",
      napDuration: "1hr 30mins",
      hygiene: "3 urine, 1 poop",
      activities: "Stacking blocks, bubble play, nursery rhymes",
      photo: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=80",
      photoCaption: "Noah stacked 5 blocks all by himself!",
    },
  ],
};

export const mockFees: FeeInvoice[] = [
  { id: "fee-1", term: "January Term 2026", amount: "₦45,000", dueDate: "Jan 31, 2026", status: "pending" },
  { id: "fee-2", term: "December Term 2025", amount: "₦45,000", dueDate: "Dec 31, 2025", status: "paid" },
  { id: "fee-3", term: "November Term 2025", amount: "₦40,000", dueDate: "Nov 30, 2025", status: "paid" },
];

export const mockGallery: GalleryPhoto[] = [
  // Jan 15, 2026
  { id: "photo-1", label: "Playtime", caption: "Liam having fun with blocks", date: "Jan 15, 2026", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-2", label: "Art & Craft", caption: "Liam's painting session", date: "Jan 15, 2026", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-3", label: "Story Time", caption: "Group story time after lunch", date: "Jan 15, 2026", image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-4", label: "Outdoor Play", caption: "Liam on the slide", date: "Jan 15, 2026", image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-5", label: "Snack Time", caption: "Healthy snacks with friends", date: "Jan 15, 2026", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80" },
  // Jan 14, 2026
  { id: "photo-6", label: "Music Class", caption: "Singing along with instruments", date: "Jan 14, 2026", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-7", label: "Painting", caption: "Finger painting fun", date: "Jan 14, 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-8", label: "Building Blocks", caption: "Tower construction in progress", date: "Jan 14, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-9", label: "Garden Play", caption: "Exploring the garden", date: "Jan 14, 2026", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-10", label: "Nap Time", caption: "Sweet dreams after a busy morning", date: "Jan 14, 2026", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80" },
  // Jan 13, 2026
  { id: "photo-11", label: "Dance Party", caption: "Moving to the beat", date: "Jan 13, 2026", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-12", label: "Science Experiment", caption: "Watching colors mix", date: "Jan 13, 2026", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-13", label: "Puzzle Time", caption: "Working on a jigsaw puzzle", date: "Jan 13, 2026", image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-14", label: "Sand Play", caption: "Building sandcastles", date: "Jan 13, 2026", image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-15", label: "Drawing", caption: "Creative drawing session", date: "Jan 13, 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  // Jan 12, 2026
  { id: "photo-16", label: "Circle Time", caption: "Sitting together for morning circle", date: "Jan 12, 2026", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-17", label: "Water Play", caption: "Splashing and pouring water", date: "Jan 12, 2026", image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-18", label: "Dress Up", caption: "Costume party fun", date: "Jan 12, 2026", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-19", label: "Lunch Time", caption: "Eating together at the table", date: "Jan 12, 2026", image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-20", label: "Outdoor Run", caption: "Running around the playground", date: "Jan 12, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  // Jan 11, 2026
  { id: "photo-21", label: "Yoga", caption: "Stretching and breathing exercises", date: "Jan 11, 2026", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-22", label: "Baking", caption: "Making cookies together", date: "Jan 11, 2026", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-23", label: "Block City", caption: "Building a whole city with blocks", date: "Jan 11, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-24", label: "Leaf Collecting", caption: "Finding colorful leaves outside", date: "Jan 11, 2026", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-25", label: "Read Aloud", caption: "Listening to a story", date: "Jan 11, 2026", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
  // Jan 10, 2026
  { id: "photo-26", label: "Rainy Day", caption: "Watching the rain from inside", date: "Jan 10, 2026", image: "https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-27", label: "Craft Time", caption: "Making paper animals", date: "Jan 10, 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-28", label: "Play Dough", caption: "Squishing and shaping dough", date: "Jan 10, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-29", label: "Story Corner", caption: "Reading in the cozy corner", date: "Jan 10, 2026", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-30", label: "Group Hug", caption: "Friends hugging after class", date: "Jan 10, 2026", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  // Jan 9, 2026
  { id: "photo-31", label: "Slide", caption: "Going down the big slide", date: "Jan 9, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-32", label: "Swings", caption: "Swinging high in the sky", date: "Jan 9, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-33", label: "Sandpit", caption: "Digging for treasure", date: "Jan 9, 2026", image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-34", label: "Tricycle", caption: "Riding around the yard", date: "Jan 9, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-35", label: "Ball Pit", caption: "Jumping into the ball pit", date: "Jan 9, 2026", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80" },
  // Jan 8, 2026
  { id: "photo-36", label: "Finger Painting", caption: "Getting messy with paint", date: "Jan 8, 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-37", label: "Snack Prep", caption: "Helping prepare fruit salad", date: "Jan 8, 2026", image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-38", label: "Bubble Play", caption: "Chasing bubbles outside", date: "Jan 8, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-39", label: "Coloring", caption: "Coloring in coloring books", date: "Jan 8, 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-40", label: "Circle Dance", caption: "Holding hands in a circle", date: "Jan 8, 2026", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  // Jan 7, 2026
  { id: "photo-41", label: "Tower Build", caption: "Tallest tower wins", date: "Jan 7, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-42", label: "Face Painting", caption: "Butterflies and superheroes", date: "Jan 7, 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-43", label: "Outdoor Art", caption: "Chalk drawings on the pavement", date: "Jan 7, 2026", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-44", label: "Music Time", caption: "Shaking maracas", date: "Jan 7, 2026", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-45", label: "Storytelling", caption: "Acting out a story", date: "Jan 7, 2026", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  // Jan 6, 2026
  { id: "photo-46", label: "Climbing", caption: "Up, up, up!", date: "Jan 6, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-47", label: "Drawing", caption: "Self-portraits today", date: "Jan 6, 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-48", label: "Counting", caption: "Learning numbers with blocks", date: "Jan 6, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-49", label: "Dress Up", caption: "Wearing fancy hats", date: "Jan 6, 2026", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-50", label: "Trampoline", caption: "Bouncing with joy", date: "Jan 6, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  // Jan 5, 2026
  { id: "photo-51", label: "Cooking", caption: "Making sandwiches for lunch", date: "Jan 5, 2026", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-52", label: "Nature Walk", caption: "Finding bugs and leaves", date: "Jan 5, 2026", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-53", label: "Puppet Show", caption: "Watching the puppet show", date: "Jan 5, 2026", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-54", label: "Sorting", caption: "Sorting colors and shapes", date: "Jan 5, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-55", label: "Music", caption: "Playing the xylophone", date: "Jan 5, 2026", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80" },
  // Jan 4, 2026
  { id: "photo-56", label: "Obstacle Course", caption: "Running through the course", date: "Jan 4, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-57", label: "Collage", caption: "Gluing paper pieces", date: "Jan 4, 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-58", label: "Sensory Bin", caption: "Exploring textures", date: "Jan 4, 2026", image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-59", label: "Parachute", caption: "Waving the big parachute", date: "Jan 4, 2026", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-60", label: "Goodbye Song", caption: "Singing the goodbye song", date: "Jan 4, 2026", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80" },
  // Jan 3, 2026
  { id: "photo-61", label: "Morning Stretch", caption: "Stretching after arrival", date: "Jan 3, 2026", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-62", label: "Glitter Art", caption: "Sparkly creations", date: "Jan 3, 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-63", label: "Train Set", caption: "Choo choo!", date: "Jan 3, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-64", label: "Outdoor Run", caption: "Racing to the finish line", date: "Jan 3, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-65", label: "Snack", caption: "Apple slices and crackers", date: "Jan 3, 2026", image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=80" },
  // Jan 2, 2026
  { id: "photo-66", label: "New Year Craft", caption: "Making resolution cards", date: "Jan 2, 2026", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-67", label: "Friendship Day", caption: "Making friendship bracelets", date: "Jan 2, 2026", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-68", label: "Building", caption: "Constructing a castle", date: "Jan 2, 2026", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-69", label: "Garden", caption: "Planting seeds in the garden", date: "Jan 2, 2026", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-70", label: "Dancing", caption: "Free dance time", date: "Jan 2, 2026", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  // Jan 1, 2026
  { id: "photo-71", label: "Happy New Year", caption: "Celebrating the first day back", date: "Jan 1, 2026", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-72", label: "Party Hats", caption: "Wearing festive hats", date: "Jan 1, 2026", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-73", label: "Confetti", caption: "Throwing confetti", date: "Jan 1, 2026", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-74", label: "Music", caption: "Playing instruments", date: "Jan 1, 2026", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-75", label: "Group Photo", caption: "First day back group photo", date: "Jan 1, 2026", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  // Dec 31, 2025
  { id: "photo-76", label: "Free Play", caption: "Choosing their own activities", date: "Dec 31, 2025", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-77", label: "Story", caption: "The Very Hungry Caterpillar", date: "Dec 31, 2025", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-78", label: "Craft", caption: "Paper plate animals", date: "Dec 31, 2025", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-79", label: "Outdoor", caption: "Playing on the climbing frame", date: "Dec 31, 2025", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-80", label: "Snack", caption: "Popcorn and juice", date: "Dec 31, 2025", image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400&q=80" },
  // Dec 30, 2025
  { id: "photo-81", label: "Masks", caption: "Making animal masks", date: "Dec 30, 2025", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-82", label: "Dancing", caption: "Musical statues", date: "Dec 30, 2025", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-83", label: "Blocks", caption: "Sorting shapes", date: "Dec 30, 2025", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-84", label: "Painting", caption: "Watercolor session", date: "Dec 30, 2025", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-85", label: "Playground", caption: "Swinging and sliding", date: "Dec 30, 2025", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  // Dec 29, 2025
  { id: "photo-86", label: "Sensory Play", caption: "Exploring with hands", date: "Dec 29, 2025", image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-87", label: "Story Time", caption: "The Gruffalo", date: "Dec 29, 2025", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-88", label: "Art", caption: "Finger print art", date: "Dec 29, 2025", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-89", label: "Music", caption: "Drumming circle", date: "Dec 29, 2025", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-90", label: "Outdoor", caption: "Bug hunting", date: "Dec 29, 2025", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80" },
  // Dec 28, 2025
  { id: "photo-91", label: "Collage", caption: "Tissue paper collage", date: "Dec 28, 2025", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-92", label: "Play", caption: "Role play corner", date: "Dec 28, 2025", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-93", label: "Movement", caption: "Follow the leader", date: "Dec 28, 2025", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-94", label: "Construction", caption: "Building with cardboard boxes", date: "Dec 28, 2025", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-95", label: "Dress Up", caption: "Pretending to be grown-ups", date: "Dec 28, 2025", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80" },
  // Dec 27, 2025
  { id: "photo-96", label: "Baking", caption: "Decorating cupcakes", date: "Dec 27, 2025", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-97", label: "Science", caption: "Color mixing experiment", date: "Dec 27, 2025", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-98", label: "Garden", caption: "Watering the plants", date: "Dec 27, 2025", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-99", label: "Friends", caption: "Playing together nicely", date: "Dec 27, 2025", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80" },
  { id: "photo-100", label: "Goodbye", caption: "See you next year!", date: "Dec 27, 2025", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80" },
];

export const mockChatThreads: ChatThread[] = [
  {
    id: "family",
    contactName: "Liam's Family",
    contactInitials: "LF",
    lastMessage: "Ms Anu: He's doing so well! Every day brings something new 😊",
    lastMessageTime: "9:24 AM",
    dateGroup: "Today",
  },
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
