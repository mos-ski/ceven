import { sharedGetList, sharedSet } from "./storage";
import { addNotification } from "./notifications";

export type Announcement = {
  id: string; title: string; body: string; targetRoom?: string;
  postedBy: string; postedAt: number; readBy: string[]; priority: "normal" | "urgent";
};

const STORAGE_KEY = "announcements";

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: "ann-1", title: "Christmas Break Notice", body: "The creche will be closed from December 24th to January 2nd. We wish all our families a wonderful holiday season!", postedBy: "Admin", postedAt: Date.now() - 2 * 86400000, readBy: [], priority: "urgent" },
  { id: "ann-2", title: "New Menu Update", body: "We've updated our lunch menu based on parent feedback. The new menu includes more vegetarian options.", postedBy: "Admin", postedAt: Date.now() - 5 * 86400000, readBy: [], priority: "normal" },
  { id: "ann-3", title: "Picture Day", body: "Annual picture day is scheduled for next Friday. Children should wear their best outfits.", postedBy: "Admin", postedAt: Date.now() - 7 * 86400000, readBy: [], targetRoom: "All Rooms", priority: "normal" },
];

function init() {
  if (sharedGetList<Announcement>(STORAGE_KEY).length === 0) sharedSet(STORAGE_KEY, MOCK_ANNOUNCEMENTS);
}

export function getAnnouncements(room?: string): Announcement[] {
  init();
  const all = sharedGetList<Announcement>(STORAGE_KEY);
  return room ? all.filter((a) => !a.targetRoom || a.targetRoom === "All Rooms" || a.targetRoom === room) : all;
}

export function addAnnouncement(ann: Omit<Announcement, "id" | "postedAt" | "readBy">): Announcement {
  init();
  const all = sharedGetList<Announcement>(STORAGE_KEY);
  const newAnn: Announcement = { ...ann, id: `ann-${Date.now()}`, postedAt: Date.now(), readBy: [] };
  sharedSet(STORAGE_KEY, [newAnn, ...all]);
  addNotification({ type: "announcement", title: ann.priority === "urgent" ? `Urgent: ${ann.title}` : ann.title, body: ann.body.slice(0, 120) + (ann.body.length > 120 ? "..." : ""), data: { announcementId: newAnn.id, priority: ann.priority } });
  return newAnn;
}

export function markAnnouncementRead(announcementId: string, userId: string): void {
  init();
  const all = sharedGetList<Announcement>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.map((a) => a.id === announcementId && !a.readBy.includes(userId) ? { ...a, readBy: [...a.readBy, userId] } : a));
}

export function getUnreadCount(userId: string): number {
  init();
  return sharedGetList<Announcement>(STORAGE_KEY).filter((a) => !a.readBy.includes(userId)).length;
}
