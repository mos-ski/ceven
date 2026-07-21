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
};

// Superset of mockFeedPosts with one multi-image post added, to demo the carousel.
const FEED_POSTS: (FeedPost & { images?: string[] })[] = [
  ...mockFeedPosts,
  {
    id: "post-carousel-1",
    tag: "Outdoor Play",
    caption: "A whole afternoon of outdoor play — slides, sand, and sunshine!",
    postedBy: "Ms Anu",
    timeAgo: "1 day ago",
    hasVideo: false,
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
    ],
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
