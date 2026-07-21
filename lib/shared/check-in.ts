import { sharedGetList, sharedSet } from "./storage";
import { addNotification } from "./notifications";

export type CheckInRecord = {
  id: string;
  childId: string;
  childName: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  checkedInBy: string | null;
  pickedUpBy: string | null;
  isAuthorizedPickup: boolean | null;
  status: "not_arrived" | "present" | "checked_out" | "late";
};

export type AuthorizedPickup = {
  id: string;
  name: string;
  phone: string;
  relationship: string;
};

const STORAGE_KEY = "check_in_records";
const PICKUP_KEY = "authorized_pickups";

const MOCK_CHECK_IN_RECORDS: CheckInRecord[] = [
  { id: "ci-1", childId: "child-1", childName: "Liam Smith", date: new Date().toISOString().split("T")[0], checkInTime: "08:05 AM", checkOutTime: null, checkedInBy: "Ms Anu", pickedUpBy: null, isAuthorizedPickup: null, status: "present" },
  { id: "ci-2", childId: "child-1", childName: "Liam Smith", date: new Date(Date.now() - 86400000).toISOString().split("T")[0], checkInTime: "08:12 AM", checkOutTime: "04:20 PM", checkedInBy: "Ms Anu", pickedUpBy: "James Miller (Dad)", isAuthorizedPickup: true, status: "checked_out" },
  { id: "ci-3", childId: "child-1", childName: "Liam Smith", date: new Date(Date.now() - 2 * 86400000).toISOString().split("T")[0], checkInTime: "07:58 AM", checkOutTime: "05:45 PM", checkedInBy: "Ms Anu", pickedUpBy: "Aunty Bisi", isAuthorizedPickup: true, status: "checked_out" },
  { id: "ci-4", childId: "child-1", childName: "Liam Smith", date: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0], checkInTime: "09:20 AM", checkOutTime: "04:15 PM", checkedInBy: "Ms Anu", pickedUpBy: "James Miller (Dad)", isAuthorizedPickup: true, status: "late" },
  { id: "ci-5", childId: "child-1", childName: "Liam Smith", date: new Date(Date.now() - 4 * 86400000).toISOString().split("T")[0], checkInTime: "08:00 AM", checkOutTime: "06:10 PM", checkedInBy: "Ms Anu", pickedUpBy: "Unrecognized", isAuthorizedPickup: false, status: "checked_out" },
];

const MOCK_AUTHORIZED_PICKUPS: AuthorizedPickup[] = [
  { id: "ap-1", name: "James Miller", phone: "+2348012345678", relationship: "Father" },
  { id: "ap-2", name: "Grace Miller", phone: "+2348012345679", relationship: "Mother" },
  { id: "ap-3", name: "Bisi Adeyemi", phone: "+2348012345680", relationship: "Aunt" },
];

function init() {
  if (sharedGetList<CheckInRecord>(STORAGE_KEY).length === 0) {
    sharedSet(STORAGE_KEY, MOCK_CHECK_IN_RECORDS);
  }
  if (sharedGetList<AuthorizedPickup>(PICKUP_KEY).length === 0) {
    sharedSet(PICKUP_KEY, MOCK_AUTHORIZED_PICKUPS);
  }
}

export function getCheckInRecords(childId: string, days: number = 30): CheckInRecord[] {
  init();
  const cutoff = Date.now() - days * 86400000;
  return sharedGetList<CheckInRecord>(STORAGE_KEY)
    .filter((r) => r.childId === childId)
    .filter((r) => new Date(r.date).getTime() >= cutoff)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getTodayCheckIn(childId: string): CheckInRecord | null {
  init();
  const today = new Date().toISOString().split("T")[0];
  return sharedGetList<CheckInRecord>(STORAGE_KEY).find((r) => r.childId === childId && r.date === today) ?? null;
}

export function logCheckIn(childId: string, childName: string, by: string): CheckInRecord {
  init();
  const records = sharedGetList<CheckInRecord>(STORAGE_KEY);
  const today = new Date().toISOString().split("T")[0];
  const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " AM";
  const existing = records.find((r) => r.childId === childId && r.date === today);
  let updated: CheckInRecord;
  if (existing) {
    updated = { ...existing, checkInTime: time, checkedInBy: by, status: "present" };
  } else {
    updated = { id: `ci-${Date.now()}`, childId, childName, date: today, checkInTime: time, checkOutTime: null, checkedInBy: by, pickedUpBy: null, isAuthorizedPickup: null, status: "present" };
  }
  const newRecords = existing ? records.map((r) => (r.id === existing.id ? updated : r)) : [...records, updated];
  sharedSet(STORAGE_KEY, newRecords);
  addNotification({ type: "checkin", title: "Checked In", body: `${childName} checked in at ${time}`, childId, childName });
  return updated;
}

export function logCheckOut(childId: string, childName: string, pickedUpBy: string, isAuthorized: boolean): CheckInRecord | null {
  init();
  const records = sharedGetList<CheckInRecord>(STORAGE_KEY);
  const today = new Date().toISOString().split("T")[0];
  const record = records.find((r) => r.childId === childId && r.date === today);
  if (!record) return null;
  const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " PM";
  const updated: CheckInRecord = { ...record, checkOutTime: time, pickedUpBy, isAuthorizedPickup: isAuthorized, status: "checked_out" };
  sharedSet(STORAGE_KEY, records.map((r) => (r.id === record.id ? updated : r)));
  addNotification({ type: "checkout", title: "Checked Out", body: `${childName} picked up by ${pickedUpBy} at ${time}`, childId, childName, data: { pickedUpBy, isAuthorized } });
  if (!isAuthorized) {
    addNotification({ type: "pickup_alert", title: "Unauthorized Pickup Attempt", body: `Someone not on the authorized list attempted to pick up ${childName}. Please verify immediately.`, childId, childName, data: { pickedUpBy } });
  }
  return updated;
}

export function getAuthorizedPickups(): AuthorizedPickup[] {
  init();
  return sharedGetList<AuthorizedPickup>(PICKUP_KEY);
}

export function addAuthorizedPickup(pickup: Omit<AuthorizedPickup, "id">): AuthorizedPickup {
  init();
  const pickups = sharedGetList<AuthorizedPickup>(PICKUP_KEY);
  const newPickup: AuthorizedPickup = { ...pickup, id: `ap-${Date.now()}` };
  sharedSet(PICKUP_KEY, [...pickups, newPickup]);
  return newPickup;
}

export function removeAuthorizedPickup(id: string): void {
  init();
  const pickups = sharedGetList<AuthorizedPickup>(PICKUP_KEY);
  sharedSet(PICKUP_KEY, pickups.filter((p) => p.id !== id));
}
