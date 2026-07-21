import { sharedGetList, sharedSet } from "./storage";
import { addNotification } from "./notifications";

export type ApplicationStatus = "submitted" | "under_review" | "waitlisted" | "accepted" | "rejected";
export type ApplicationNextStep = { title: string; description: string; completed: boolean; dueDate?: string };
export type ApplicationStatusEntry = { status: ApplicationStatus; timestamp: number; note?: string };

export type Application = {
  id: string; childName: string; crecheId: string; crecheName: string;
  status: ApplicationStatus; submittedAt: number; waitlistPosition?: number;
  lastUpdated: number; nextSteps: ApplicationNextStep[]; statusHistory: ApplicationStatusEntry[];
};

const STORAGE_KEY = "applications";

const MOCK_APPLICATION: Application = {
  id: "app-1", childName: "Liam Smith", crecheId: "creche-1", crecheName: "St. Greg Creche",
  status: "waitlisted", submittedAt: Date.now() - 30 * 86400000, waitlistPosition: 3, lastUpdated: Date.now() - 5 * 86400000,
  nextSteps: [
    { title: "Upload immunization records", description: "Upload a copy of your child's immunization card.", completed: true },
    { title: "Complete medical form", description: "Fill out the medical history form.", completed: false, dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0] },
    { title: "Pay registration fee", description: "Pay the one-time registration fee of ₦15,000.", completed: false, dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0] },
  ],
  statusHistory: [
    { status: "submitted", timestamp: Date.now() - 30 * 86400000 },
    { status: "under_review", timestamp: Date.now() - 25 * 86400000, note: "Documents under review" },
    { status: "waitlisted", timestamp: Date.now() - 20 * 86400000, note: "Added to waitlist. Position: 5" },
    { status: "waitlisted", timestamp: Date.now() - 5 * 86400000, note: "Position updated to 3" },
  ],
};

function init() {
  if (sharedGetList<Application>(STORAGE_KEY).length === 0) sharedSet(STORAGE_KEY, [MOCK_APPLICATION]);
}

export function getApplication(_parentId?: string): Application | null {
  init();
  return sharedGetList<Application>(STORAGE_KEY)[0] ?? null;
}

export function updateApplicationStatus(id: string, status: ApplicationStatus, note?: string): void {
  init();
  const all = sharedGetList<Application>(STORAGE_KEY);
  const app = all.find((a) => a.id === id);
  if (!app) return;
  const updated = { ...app, status, lastUpdated: Date.now(), statusHistory: [...app.statusHistory, { status, timestamp: Date.now(), note }] };
  sharedSet(STORAGE_KEY, all.map((a) => (a.id === id ? updated : a)));
  addNotification({ type: "application", title: "Application Status Updated", body: `Your application for ${app.childName} at ${app.crecheName} is now: ${status.replace("_", " ")}`, data: { applicationId: id, status } });
}

export function completeNextStep(applicationId: string, stepIndex: number): void {
  init();
  const all = sharedGetList<Application>(STORAGE_KEY);
  const app = all.find((a) => a.id === applicationId);
  if (!app) return;
  const nextSteps = [...app.nextSteps];
  if (nextSteps[stepIndex]) nextSteps[stepIndex] = { ...nextSteps[stepIndex], completed: true };
  sharedSet(STORAGE_KEY, all.map((a) => (a.id === applicationId ? { ...a, nextSteps, lastUpdated: Date.now() } : a)));
}
