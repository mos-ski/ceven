import type { UserRole } from "./types";

export type MockScanEvent = {
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  childIds: string[];
  timestamp: string;
};

const MOCK_PARENTS = [
  { id: "parent-1", name: "Mrs Bakare", role: "parent" as UserRole, childIds: ["child-1"] },
  { id: "parent-2", name: "Mr Chukwu", role: "parent" as UserRole, childIds: ["child-2"] },
  { id: "parent-3", name: "Mrs Adewale", role: "parent" as UserRole, childIds: ["child-3"] },
  { id: "parent-4", name: "Mr Bello", role: "parent" as UserRole, childIds: ["child-4"] },
  { id: "parent-5", name: "Mrs Okafor", role: "parent" as UserRole, childIds: ["child-5"] },
];

const MOCK_STAFF = [
  { id: "staff-1", name: "Mrs Sarah Okonkwo", role: "caregiver" as UserRole, staffRole: "Caregiver" },
  { id: "staff-2", name: "Mr James Adamu", role: "caregiver" as UserRole, staffRole: "Marketer" },
  { id: "staff-3", name: "Mrs Ngozi Eze", role: "caregiver" as UserRole, staffRole: "Caregiver" },
  { id: "staff-4", name: "Mr Chukwu Emeka", role: "caregiver" as UserRole, staffRole: "Caregiver" },
  { id: "staff-5", name: "Mrs Amaka Obi", role: "caregiver" as UserRole, staffRole: "Caregiver" },
];

export function getRandomParent() {
  return MOCK_PARENTS[Math.floor(Math.random() * MOCK_PARENTS.length)];
}

export function getRandomStaff() {
  return MOCK_STAFF[Math.floor(Math.random() * MOCK_STAFF.length)];
}

export function getAuthorizedPickup(childId: string): boolean {
  return Math.random() > 0.15;
}

// Which children each parent account is enrolled to act for. A parent only
// ever sees and can drop off/pick up their own children — never the whole
// creche roster. "parent-4" (the demo's logged-in parent) has two children,
// one of which ("child-2") is shared with "parent-2" to demo the mixed-state
// picker (one co-parent may have already dropped that child off).
export const PARENT_CHILD_MAP: Record<string, string[]> = {
  "parent-1": ["child-1"],
  "parent-2": ["child-2"],
  "parent-3": ["child-3"],
  "parent-4": ["child-4", "child-2"],
  "parent-5": ["child-5"],
};

export function getChildIdsForParent(parentId: string): string[] {
  return PARENT_CHILD_MAP[parentId] ?? [];
}

export { MOCK_PARENTS, MOCK_STAFF };
