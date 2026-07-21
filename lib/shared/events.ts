import { sharedGetList, sharedSet } from "./storage";
import { addNotification } from "./notifications";

export type CrecheEvent = {
  id: string; title: string; description: string; date: string; startTime: string; endTime: string;
  room?: string; rsvpRequired: boolean; rsvpStatus?: "attending" | "not_attending" | "pending";
  addedBy: string; createdAt: number; cancelled: boolean;
};

const STORAGE_KEY = "events";

const MOCK_EVENTS: CrecheEvent[] = [
  { id: "evt-1", title: "Parent-Teacher Conference", description: "Discuss your child's progress with their caregiver.", date: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0], startTime: "09:00 AM", endTime: "12:00 PM", rsvpRequired: true, rsvpStatus: "pending", addedBy: "Admin", createdAt: Date.now() - 5 * 86400000, cancelled: false },
  { id: "evt-2", title: "Sports Day", description: "Annual creche sports day! Fun activities for all children.", date: new Date(Date.now() + 10 * 86400000).toISOString().split("T")[0], startTime: "10:00 AM", endTime: "02:00 PM", room: "All Rooms", rsvpRequired: false, addedBy: "Admin", createdAt: Date.now() - 2 * 86400000, cancelled: false },
  { id: "evt-3", title: "Christmas Party", description: "End-of-year celebration. Children will perform songs.", date: new Date(Date.now() + 20 * 86400000).toISOString().split("T")[0], startTime: "11:00 AM", endTime: "03:00 PM", rsvpRequired: true, rsvpStatus: "attending", addedBy: "Admin", createdAt: Date.now() - 1 * 86400000, cancelled: false },
];

function init() {
  if (sharedGetList<CrecheEvent>(STORAGE_KEY).length === 0) sharedSet(STORAGE_KEY, MOCK_EVENTS);
}

export function getEvents(room?: string): CrecheEvent[] {
  init();
  const all = sharedGetList<CrecheEvent>(STORAGE_KEY).filter((e) => !e.cancelled);
  return room ? all.filter((e) => !e.room || e.room === "All Rooms" || e.room === room) : all;
}

export function getAllEvents(): CrecheEvent[] {
  init();
  return sharedGetList<CrecheEvent>(STORAGE_KEY).sort((a, b) => a.date.localeCompare(b.date));
}

export function addEvent(event: Omit<CrecheEvent, "id" | "createdAt" | "cancelled">): CrecheEvent {
  init();
  const all = sharedGetList<CrecheEvent>(STORAGE_KEY);
  const newEvent: CrecheEvent = { ...event, id: `evt-${Date.now()}`, createdAt: Date.now(), cancelled: false };
  sharedSet(STORAGE_KEY, [...all, newEvent]);
  addNotification({ type: "event", title: "New Event", body: `${event.title} on ${event.date} at ${event.startTime}`, data: { eventId: newEvent.id } });
  return newEvent;
}

export function updateEvent(id: string, changes: Partial<Omit<CrecheEvent, "id" | "createdAt">>): void {
  init();
  const all = sharedGetList<CrecheEvent>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.map((e) => (e.id === id ? { ...e, ...changes } : e)));
  if (changes.cancelled || changes.date || changes.startTime) {
    const event = all.find((e) => e.id === id);
    if (event) addNotification({ type: "event", title: changes.cancelled ? "Event Cancelled" : "Event Updated", body: changes.cancelled ? `${event.title} has been cancelled.` : `${event.title} has been updated.`, data: { eventId: id } });
  }
}

export function rsvpEvent(id: string, status: "attending" | "not_attending"): void {
  init();
  const all = sharedGetList<CrecheEvent>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.map((e) => (e.id === id ? { ...e, rsvpStatus: status } : e)));
}
