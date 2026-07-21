import { sharedGetList, sharedSet } from "./storage";
import { addNotification } from "./notifications";

export type IncidentFollowUp = { author: string; text: string; timestamp: number };

export type SharedIncident = {
  id: string; childId: string; childName: string; title: string; description: string;
  severity: "minor" | "moderate" | "severe"; time: string; date: string;
  actionTaken: string; status: "Open" | "Monitoring" | "Resolved";
  parentNotified: boolean; parentAcknowledged: boolean;
  callbackRequested: boolean; callbackResolved: boolean;
  followUpNotes: IncidentFollowUp[]; reportedBy: string;
};

const STORAGE_KEY = "incidents";

const MOCK_INCIDENTS: SharedIncident[] = [
  { id: "inc-1", childId: "child-1", childName: "Liam Smith", title: "Minor Bump", description: "Liam bumped his knee while playing during outdoor time.", severity: "minor", time: "10:30 AM", date: "Jan 8, 2026", actionTaken: "Applied a cold compress, Liam was back to playing within minutes.", status: "Resolved", parentNotified: true, parentAcknowledged: true, callbackRequested: false, callbackResolved: false, followUpNotes: [{ author: "Ms Anu", text: "Liam was fine after the cold compress. No swelling observed.", timestamp: Date.now() - 86400000 }], reportedBy: "Ms Anu" },
  { id: "inc-2", childId: "child-1", childName: "Liam Smith", title: "Mild Fever", description: "Liam felt warm during nap time. Temperature checked at 37.8°C.", severity: "moderate", time: "01:15 PM", date: "Jan 10, 2026", actionTaken: "Administered Calpol. Parent contacted and child sent home early.", status: "Monitoring", parentNotified: true, parentAcknowledged: false, callbackRequested: true, callbackResolved: false, followUpNotes: [{ author: "Ms Anu", text: "Temperature dropped to 37.2°C after Calpol.", timestamp: Date.now() - 3600000 }], reportedBy: "Ms Anu" },
];

function init() {
  if (sharedGetList<SharedIncident>(STORAGE_KEY).length === 0) sharedSet(STORAGE_KEY, MOCK_INCIDENTS);
}

export function getIncidents(childId?: string): SharedIncident[] {
  init();
  const all = sharedGetList<SharedIncident>(STORAGE_KEY);
  return childId ? all.filter((i) => i.childId === childId) : all;
}

export function addIncident(incident: Omit<SharedIncident, "id" | "followUpNotes" | "parentAcknowledged" | "callbackRequested" | "callbackResolved">): SharedIncident {
  init();
  const all = sharedGetList<SharedIncident>(STORAGE_KEY);
  const newIncident: SharedIncident = { ...incident, id: `inc-${Date.now()}`, followUpNotes: [], parentAcknowledged: false, callbackRequested: false, callbackResolved: false };
  sharedSet(STORAGE_KEY, [...all, newIncident]);
  addNotification({ type: "incident", title: `Incident: ${incident.title}`, body: `${incident.childName} — ${incident.severity}. ${incident.description}`, childId: incident.childId, childName: incident.childName, data: { incidentId: newIncident.id, severity: incident.severity } });
  return newIncident;
}

export function addFollowUp(incidentId: string, author: string, text: string): void {
  init();
  const all = sharedGetList<SharedIncident>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.map((i) => i.id === incidentId ? { ...i, followUpNotes: [...i.followUpNotes, { author, text, timestamp: Date.now() }] } : i));
}

export function acknowledgeIncident(incidentId: string): void {
  init();
  const all = sharedGetList<SharedIncident>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.map((i) => (i.id === incidentId ? { ...i, parentAcknowledged: true } : i)));
}

export function requestCallback(incidentId: string): void {
  init();
  const all = sharedGetList<SharedIncident>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.map((i) => (i.id === incidentId ? { ...i, callbackRequested: true } : i)));
}

export function resolveCallback(incidentId: string): void {
  init();
  const all = sharedGetList<SharedIncident>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.map((i) => (i.id === incidentId ? { ...i, callbackResolved: true } : i)));
}

export function updateIncidentStatus(incidentId: string, status: SharedIncident["status"]): void {
  init();
  const all = sharedGetList<SharedIncident>(STORAGE_KEY);
  sharedSet(STORAGE_KEY, all.map((i) => (i.id === incidentId ? { ...i, status } : i)));
}
