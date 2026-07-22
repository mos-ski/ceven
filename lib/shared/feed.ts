import { mockFeedPosts, mockChild, type FeedPost } from "@/lib/parent/mock-data";
import { getMedicationHistory } from "./medication";
import { getIncidents } from "./incidents";
import { getMilestones } from "./growth";
import { getCheckInRecords } from "./check-in";
import { getAnnouncements } from "./announcements";
import { getAllEvents } from "./events";

export type FeedCategory = "moments" | "health" | "activity" | "creche";
export type FeedItemType =
  | "moment" | "medication" | "incident" | "growth"
  | "check-in" | "check-out" | "report" | "announcement" | "event";

export type FeedItem = {
  id: string;
  type: FeedItemType;
  category: FeedCategory;
  timestamp: number;
  title: string;
  body?: string;
  images?: string[];
  hasVideo?: boolean;
  postedBy?: string;
  href?: string;
  badge?: string;
  tag?: string;
};

// 20 photo moments — mixed portrait/landscape, some with videos
const FEED_POSTS: (FeedPost & { images?: string[] })[] = [
  {
    id: "post-1", tag: "Playtime", caption: "Liam had a wonderful time playing with blocks today!", postedBy: "Ms Anu", timeAgo: "2 hours ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-2", tag: "Art & Craft", caption: "Liam's painting session — look at those colors!", postedBy: "Ms Anu", timeAgo: "5 hours ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-3", tag: "Story Time", caption: "Liam loved today's story about the little elephant!", postedBy: "Ms Anu", timeAgo: "6 hours ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-4", tag: "Outdoor Play", caption: "A whole afternoon of outdoor play — slides, sand, and sunshine!", postedBy: "Ms Anu", timeAgo: "1 day ago", hasVideo: true,
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-5", tag: "Music Time", caption: "Drumming circle — Liam loves the rhythm!", postedBy: "Ms Anu", timeAgo: "1 day ago", hasVideo: true,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "post-6", tag: "Snack Time", caption: "Healthy snacks with friends after a long morning of play", postedBy: "Sarah Johnson", timeAgo: "1 day ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "post-7", tag: "Science", caption: "Volcano experiment — the kids were amazed!", postedBy: "Ms Anu", timeAgo: "2 days ago", hasVideo: true,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-8", tag: "Dance", caption: "Dance class — Liam nailed the choreography today!", postedBy: "Ms Anu", timeAgo: "2 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "post-9", tag: "Garden", caption: "Watering the plants — Liam is becoming a little gardener!", postedBy: "Ms Anu", timeAgo: "2 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-10", tag: "Baking", caption: "Decorating cupcakes — Liam chose the sprinkles!", postedBy: "Sarah Johnson", timeAgo: "3 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1486427944544-d2c246c4df14?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-11", tag: "Construction", caption: "Building with cardboard boxes — Liam made a castle!", postedBy: "Ms Anu", timeAgo: "3 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "post-12", tag: "Sensory Play", caption: "Exploring with hands — water, sand, and rice!", postedBy: "Ms Anu", timeAgo: "3 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-13", tag: "Friends", caption: "Playing together nicely — making new friends!", postedBy: "Ms Anu", timeAgo: "4 days ago", hasVideo: true,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "post-14", tag: "Puzzles", caption: "Puzzle time — Liam finished the 24-piece one!", postedBy: "Ms Anu", timeAgo: "4 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-15", tag: "Dress Up", caption: "Pretending to be grown-ups — Liam was the doctor today!", postedBy: "Ms Anu", timeAgo: "4 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "post-16", tag: "Music", caption: "Singing along with instruments — Liam loves the xylophone!", postedBy: "Sarah Johnson", timeAgo: "5 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-17", tag: "Story Time", caption: "The Gruffalo — Liam's face when the Gruffalo appeared!", postedBy: "Ms Anu", timeAgo: "5 days ago", hasVideo: true,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-18", tag: "Playground", caption: "Swinging and sliding — pure joy!", postedBy: "Ms Anu", timeAgo: "5 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&h=900&q=80"],
  },
  {
    id: "post-19", tag: "Collage", caption: "Tissue paper collage — Liam went all in with the glue!", postedBy: "Ms Anu", timeAgo: "6 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&h=900&q=80",
    images: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?auto=format&fit=crop&w=800&q=80"],
  },
  {
    id: "post-20", tag: "Movement", caption: "Follow the leader — Liam was the leader today!", postedBy: "Ms Anu", timeAgo: "6 days ago", hasVideo: false,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
    images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&h=900&q=80", "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&h=900&q=80"],
  },
];

function timeAgoToTimestamp(timeAgo: string): number {
  const m = timeAgo.match(/(\d+)\s*(hour|day)s?\s*ago/);
  if (!m) return Date.now();
  const n = parseInt(m[1], 10);
  const ms = m[2] === "hour" ? n * 3600000 : n * 86400000;
  return Date.now() - ms;
}

function timeStringToTimestamp(dateStr: string, timeStr: string | null): number {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return Date.now();
  if (!timeStr) return date.setHours(12, 0, 0, 0);
  const m = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return date.setHours(12, 0, 0, 0);
  let hours = parseInt(m[1], 10);
  const minutes = parseInt(m[2], 10);
  if (m[3].toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (m[3].toUpperCase() === "AM" && hours === 12) hours = 0;
  return date.setHours(hours, minutes, 0, 0);
}

export function getFeedItems(): FeedItem[] {
  const items: FeedItem[] = [];

  for (const post of FEED_POSTS) {
    items.push({
      id: `moment-${post.id}`,
      type: "moment",
      category: "moments",
      timestamp: timeAgoToTimestamp(post.timeAgo),
      title: post.caption,
      images: post.images ?? [post.image],
      hasVideo: post.hasVideo,
      postedBy: post.postedBy,
      badge: post.tag,
      tag: post.tag,
    });
  }

  for (const log of getMedicationHistory(mockChild.id)) {
    if (log.status !== "administered") continue;
    items.push({
      id: `medication-${log.id}`,
      type: "medication",
      category: "health",
      timestamp: timeStringToTimestamp(log.date, log.actualTime),
      title: "Medication given",
      body: `${log.medication} ${log.dosage} administered${log.administeredBy ? ` by ${log.administeredBy}` : ""}`,
      href: "/parent/medication",
    });
  }

  for (const inc of getIncidents(mockChild.id)) {
    items.push({
      id: `incident-${inc.id}`,
      type: "incident",
      category: "health",
      timestamp: timeStringToTimestamp(inc.date, inc.time),
      title: inc.title,
      body: inc.description,
      badge: inc.severity,
      href: "/parent/incidents",
    });
  }

  for (const ms of getMilestones(mockChild.id)) {
    items.push({
      id: `growth-${ms.id}`,
      type: "growth",
      category: "health",
      timestamp: ms.recordedAt,
      title: ms.title,
      body: ms.description,
      href: "/parent/child/growth",
    });
  }

  for (const rec of getCheckInRecords(mockChild.id)) {
    if (rec.checkInTime) {
      items.push({
        id: `checkin-${rec.id}`,
        type: "check-in",
        category: "activity",
        timestamp: timeStringToTimestamp(rec.date, rec.checkInTime),
        title: `${rec.childName} checked in`,
        body: rec.checkInTime,
        href: "/parent/attendance",
      });
    }
    if (rec.checkOutTime) {
      items.push({
        id: `checkout-${rec.id}`,
        type: "check-out",
        category: "activity",
        timestamp: timeStringToTimestamp(rec.date, rec.checkOutTime),
        title: `${rec.childName} checked out`,
        body: rec.checkOutTime,
        href: "/parent/attendance",
      });
    }
  }

  items.push({
    id: "report-today",
    type: "report",
    category: "activity",
    timestamp: new Date().setHours(8, 0, 0, 0),
    title: "Daily report ready",
    body: `${mockChild.name}'s daily report for today is ready to view`,
    href: "/parent/reports",
  });

  for (const ann of getAnnouncements()) {
    items.push({
      id: `announcement-${ann.id}`,
      type: "announcement",
      category: "creche",
      timestamp: ann.postedAt,
      title: ann.title,
      body: ann.body,
      badge: ann.priority === "urgent" ? "urgent" : undefined,
      href: "/parent/announcements",
    });
  }

  for (const evt of getAllEvents()) {
    items.push({
      id: `event-${evt.id}`,
      type: "event",
      category: "creche",
      timestamp: timeStringToTimestamp(evt.date, evt.startTime),
      title: evt.title,
      body: `${evt.date} · ${evt.startTime}`,
      href: "/parent/events",
    });
  }

  return items.sort((a, b) => b.timestamp - a.timestamp);
}

export function groupByDay(items: FeedItem[]): { label: string; items: FeedItem[] }[] {
  const groups = new Map<string, FeedItem[]>();
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  for (const item of items) {
    const d = new Date(item.timestamp).toDateString();
    const label = d === today ? "Today" : d === yesterday ? "Yesterday"
      : new Date(item.timestamp).toLocaleDateString("en-NG", { month: "long", day: "numeric" });
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(item);
  }

  return Array.from(groups.entries()).map(([label, items]) => ({ label, items }));
}

export function formatRelativeTime(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffHours = Math.floor(diffMs / 3600000);
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}
