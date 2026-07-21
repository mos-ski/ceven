import { sharedGetList, sharedSet } from "./storage";

export type SharedNotification = {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  type: "checkin" | "checkout" | "incident" | "medication" | "growth" | "milestone" | "event" | "announcement" | "application" | "fee" | "rating" | "pickup_alert";
  childId?: string;
  childName?: string;
  data?: Record<string, unknown>;
};

const STORAGE_KEY = "notifications";

export function getNotifications(childId?: string): SharedNotification[] {
  const all = sharedGetList<SharedNotification>(STORAGE_KEY);
  const sorted = all.sort((a, b) => b.timestamp - a.timestamp);
  return childId ? sorted.filter((n) => n.childId === childId) : sorted;
}

export function getUnreadCount(childId?: string): number {
  return getNotifications(childId).filter((n) => !n.read).length;
}

export function addNotification(n: Omit<SharedNotification, "id" | "timestamp" | "read">): SharedNotification {
  const all = sharedGetList<SharedNotification>(STORAGE_KEY);
  const notification: SharedNotification = {
    ...n,
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    read: false,
  };
  sharedSet(STORAGE_KEY, [...all, notification]);
  return notification;
}

export function markAsRead(id: string): void {
  const all = sharedGetList<SharedNotification>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.map((n) => (n.id === id ? { ...n, read: true } : n)));
}

export function markAllAsRead(): void {
  const all = sharedGetList<SharedNotification>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.map((n) => ({ ...n, read: true })));
}

export function deleteNotification(id: string): void {
  const all = sharedGetList<SharedNotification>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.filter((n) => n.id !== id));
}
