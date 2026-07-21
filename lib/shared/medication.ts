import { sharedGetList, sharedSet } from "./storage";
import { addNotification } from "./notifications";

export type MedicationSchedule = { type: "daily" | "interval" | "specific"; times: string[]; days?: string[]; intervalHours?: number };

export type MedicationRequest = {
  id: string; childId: string; childName: string; medication: string; dosage: string;
  schedule: MedicationSchedule; notes: string; authorizedByParent: boolean; createdAt: number; active: boolean;
};

export type MedicationLog = {
  id: string; requestId: string; childId: string; childName: string; medication: string; dosage: string;
  scheduledTime: string; actualTime: string | null; administeredBy: string | null;
  status: "scheduled" | "administered" | "missed" | "delayed"; notes: string; date: string;
};

const REQUEST_KEY = "medication_requests";
const LOG_KEY = "medication_logs";

const MOCK_REQUESTS: MedicationRequest[] = [
  { id: "mr-1", childId: "child-1", childName: "Liam Smith", medication: "Vitamin D drops", dosage: "1 drop", schedule: { type: "daily", times: ["08:30 AM"] }, notes: "Give with food", authorizedByParent: true, createdAt: Date.now() - 7 * 86400000, active: true },
  { id: "mr-2", childId: "child-1", childName: "Liam Smith", medication: "Calpol", dosage: "5ml", schedule: { type: "interval", times: [], intervalHours: 6 }, notes: "Only if temperature exceeds 38°C", authorizedByParent: true, createdAt: Date.now() - 2 * 86400000, active: true },
];

const MOCK_LOGS: MedicationLog[] = [
  { id: "ml-1", requestId: "mr-1", childId: "child-1", childName: "Liam Smith", medication: "Vitamin D drops", dosage: "1 drop", scheduledTime: "08:30 AM", actualTime: "08:32 AM", administeredBy: "Ms Anu", status: "administered", notes: "", date: new Date().toISOString().split("T")[0] },
  { id: "ml-2", requestId: "mr-1", childId: "child-1", childName: "Liam Smith", medication: "Vitamin D drops", dosage: "1 drop", scheduledTime: "08:30 AM", actualTime: "08:35 AM", administeredBy: "Ms Anu", status: "administered", notes: "", date: new Date(Date.now() - 86400000).toISOString().split("T")[0] },
  { id: "ml-3", requestId: "mr-2", childId: "child-1", childName: "Liam Smith", medication: "Calpol", dosage: "5ml", scheduledTime: "02:00 PM", actualTime: null, administeredBy: null, status: "scheduled", notes: "", date: new Date().toISOString().split("T")[0] },
];

function init() {
  if (sharedGetList<MedicationRequest>(REQUEST_KEY).length === 0) sharedSet(REQUEST_KEY, MOCK_REQUESTS);
  if (sharedGetList<MedicationLog>(LOG_KEY).length === 0) sharedSet(LOG_KEY, MOCK_LOGS);
}

export function getMedicationRequests(childId?: string): MedicationRequest[] {
  init();
  const all = sharedGetList<MedicationRequest>(REQUEST_KEY).filter((r) => r.active);
  return childId ? all.filter((r) => r.childId === childId) : all;
}

export function addMedicationRequest(req: Omit<MedicationRequest, "id" | "createdAt" | "active">): MedicationRequest {
  init();
  const all = sharedGetList<MedicationRequest>(REQUEST_KEY);
  const newReq: MedicationRequest = { ...req, id: `mr-${Date.now()}`, createdAt: Date.now(), active: true };
  sharedSet(REQUEST_KEY, [...all, newReq]);
  return newReq;
}

export function getMedicationLogs(childId: string, date?: string): MedicationLog[] {
  init();
  const all = sharedGetList<MedicationLog>(LOG_KEY);
  const targetDate = date ?? new Date().toISOString().split("T")[0];
  return all.filter((l) => l.childId === childId && l.date === targetDate).sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
}

export function getMedicationHistory(childId: string, days: number = 7): MedicationLog[] {
  init();
  const all = sharedGetList<MedicationLog>(LOG_KEY);
  const cutoff = new Date(Date.now() - days * 86400000).toISOString().split("T")[0];
  return all.filter((l) => l.childId === childId && l.date >= cutoff).sort((a, b) => b.date.localeCompare(a.date) || a.scheduledTime.localeCompare(b.scheduledTime));
}

export function administerDose(logId: string, administeredBy: string, notes: string = ""): void {
  init();
  const all = sharedGetList<MedicationLog>(LOG_KEY);
  const log = all.find((l) => l.id === logId);
  if (!log) return;
  const actualTime = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " AM";
  sharedSet(LOG_KEY, all.map((l) => (l.id === logId ? { ...l, status: "administered" as const, actualTime, administeredBy, notes } : l)));
  addNotification({ type: "medication", title: "Medication Given", body: `${log.childName} — ${log.medication} ${log.dosage} administered by ${administeredBy} at ${actualTime}`, childId: log.childId, childName: log.childName, data: { medication: log.medication, dosage: log.dosage } });
}

export function markDoseMissed(logId: string, reason: string): void {
  init();
  const all = sharedGetList<MedicationLog>(LOG_KEY);
  const log = all.find((l) => l.id === logId);
  if (!log) return;
  sharedSet(LOG_KEY, all.map((l) => (l.id === logId ? { ...l, status: "missed" as const, notes: reason } : l)));
  addNotification({ type: "medication", title: "Missed Dose", body: `Scheduled dose of ${log.medication} for ${log.childName} was missed at ${log.scheduledTime}.`, childId: log.childId, childName: log.childName, data: { medication: log.medication, reason } });
}
