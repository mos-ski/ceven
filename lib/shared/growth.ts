import { sharedGetList, sharedSet } from "./storage";
import { addNotification } from "./notifications";

export type GrowthEntry = { id: string; childId: string; date: string; height?: number; weight?: number; headCircumference?: number; recordedBy: string; notes?: string };
export type Milestone = { id: string; childId: string; date: string; title: string; description: string; photoUrl?: string; recordedBy: string; recordedAt: number };

const GROWTH_KEY = "growth_entries";
const MILESTONE_KEY = "milestones";

const MOCK_GROWTH: GrowthEntry[] = [
  { id: "ge-1", childId: "child-1", date: "2025-01-15", height: 86, weight: 11.2, headCircumference: 48, recordedBy: "Dr. Adaeze", notes: "Annual checkup" },
  { id: "ge-2", childId: "child-1", date: "2025-04-10", height: 89, weight: 11.8, headCircumference: 48.5, recordedBy: "Dr. Adaeze" },
  { id: "ge-3", childId: "child-1", date: "2025-07-20", height: 92, weight: 12.3, headCircumference: 49, recordedBy: "Ms Anu" },
  { id: "ge-4", childId: "child-1", date: "2025-10-05", height: 94, weight: 12.8, headCircumference: 49.5, recordedBy: "Dr. Adaeze" },
  { id: "ge-5", childId: "child-1", date: "2026-01-08", height: 96, weight: 13.2, headCircumference: 50, recordedBy: "Dr. Adaeze" },
];

const MOCK_MILESTONES: Milestone[] = [
  { id: "ms-1", childId: "child-1", date: "2025-02-20", title: "First Steps", description: "Liam took his first unassisted steps across the room.", recordedBy: "James Miller", recordedAt: Date.now() - 300 * 86400000 },
  { id: "ms-2", childId: "child-1", date: "2025-05-12", title: "First Words", description: "Said 'mama' clearly for the first time.", recordedBy: "Grace Miller", recordedAt: Date.now() - 200 * 86400000 },
  { id: "ms-3", childId: "child-1", date: "2025-08-01", title: "Walking Confidently", description: "Walking independently without holding onto furniture.", recordedBy: "Ms Anu", recordedAt: Date.now() - 120 * 86400000 },
  { id: "ms-4", childId: "child-1", date: "2025-11-15", title: "First Sentence", description: "Said 'I want water please' — full sentence!", recordedBy: "Grace Miller", recordedAt: Date.now() - 30 * 86400000 },
];

function init() {
  if (sharedGetList<GrowthEntry>(GROWTH_KEY).length === 0) sharedSet(GROWTH_KEY, MOCK_GROWTH);
  if (sharedGetList<Milestone>(MILESTONE_KEY).length === 0) sharedSet(MILESTONE_KEY, MOCK_MILESTONES);
}

export function getGrowthEntries(childId: string): GrowthEntry[] {
  init();
  return sharedGetList<GrowthEntry>(GROWTH_KEY).filter((e) => e.childId === childId).sort((a, b) => a.date.localeCompare(b.date));
}

export function addGrowthEntry(entry: Omit<GrowthEntry, "id">): GrowthEntry {
  init();
  const all = sharedGetList<GrowthEntry>(GROWTH_KEY);
  const newEntry: GrowthEntry = { ...entry, id: `ge-${Date.now()}` };
  sharedSet(GROWTH_KEY, [...all, newEntry]);
  addNotification({ type: "growth", title: "Growth Measurement Logged", body: `New measurements logged for child`, childId: entry.childId, data: { height: entry.height, weight: entry.weight } });
  return newEntry;
}

export function getMilestones(childId: string): Milestone[] {
  init();
  return sharedGetList<Milestone>(MILESTONE_KEY).filter((m) => m.childId === childId).sort((a, b) => a.date.localeCompare(b.date));
}

export function addMilestone(milestone: Omit<Milestone, "id" | "recordedAt">): Milestone {
  init();
  const all = sharedGetList<Milestone>(MILESTONE_KEY);
  const newMilestone: Milestone = { ...milestone, id: `ms-${Date.now()}`, recordedAt: Date.now() };
  sharedSet(MILESTONE_KEY, [...all, newMilestone]);
  addNotification({ type: "milestone", title: "New Milestone", body: `${milestone.title} — ${milestone.description}`, childId: milestone.childId, data: { milestone: milestone.title } });
  return newMilestone;
}
