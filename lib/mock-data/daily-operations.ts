// ─── Health & Incidents ────────────────────────────────────────────────────────

export type IncidentSeverity = "Minor" | "Moderate" | "Severe";
export type IncidentStatus = "Open" | "Under Review" | "Resolved";

export type Incident = {
  id: string;
  child: string;
  room: string;
  type: string;
  severity: IncidentSeverity;
  reportedBy: string;
  time: string;
  status: IncidentStatus;
};

export const INCIDENTS: Incident[] = [
  { id: "inc-1", child: "Amara Okafor", room: "Lion Class", type: "Minor Fall", severity: "Minor", reportedBy: "Mrs. Sarah Okonkwo", time: "9:45 AM", status: "Resolved" },
  { id: "inc-2", child: "Leo Adamu", room: "Tiger Class", type: "Allergic Reaction", severity: "Severe", reportedBy: "Mr. James Adamu", time: "10:20 AM", status: "Under Review" },
  { id: "inc-3", child: "Zara Mohammed", room: "Bear Class", type: "Fever", severity: "Moderate", reportedBy: "Mrs. Ngozi Eze", time: "11:05 AM", status: "Open" },
  { id: "inc-4", child: "Ade Bello", room: "Owl Class", type: "Bump on Head", severity: "Minor", reportedBy: "Mr. Chukwu Bello", time: "1:15 PM", status: "Resolved" },
  { id: "inc-5", child: "Mia Taiwo", room: "Lion Class", type: "Choking Hazard", severity: "Severe", reportedBy: "Mrs. Amaka Taiwo", time: "2:40 PM", status: "Open" },
];

export const INCIDENT_TYPES = [
  "Minor Fall",
  "Allergic Reaction",
  "Fever",
  "Bump on Head",
  "Choking Hazard",
  "Bite/Scratch",
  "Other",
];

// ─── Medication ────────────────────────────────────────────────────────────────

export type MedicationStatus = "Scheduled" | "Administered" | "Missed";

export type MedicationEntry = {
  id: string;
  child: string;
  room: string;
  medication: string;
  dosage: string;
  scheduledTime: string;
  administeredBy: string | null;
  status: MedicationStatus;
};

export const MEDICATIONS: MedicationEntry[] = [
  { id: "med-1", child: "Amara Okafor", room: "Lion Class", medication: "Paracetamol Syrup", dosage: "5ml", scheduledTime: "10:00 AM", administeredBy: "Mrs. Sarah Okonkwo", status: "Administered" },
  { id: "med-2", child: "Leo Adamu", room: "Tiger Class", medication: "Antihistamine", dosage: "2.5ml", scheduledTime: "12:30 PM", administeredBy: null, status: "Scheduled" },
  { id: "med-3", child: "Zara Mohammed", room: "Bear Class", medication: "Asthma Inhaler", dosage: "2 puffs", scheduledTime: "9:00 AM", administeredBy: null, status: "Missed" },
  { id: "med-4", child: "Ade Bello", room: "Owl Class", medication: "Vitamin Drops", dosage: "1ml", scheduledTime: "8:30 AM", administeredBy: "Mr. Chukwu Bello", status: "Administered" },
  { id: "med-5", child: "Mia Taiwo", room: "Lion Class", medication: "Eczema Cream", dosage: "Apply thin layer", scheduledTime: "2:00 PM", administeredBy: null, status: "Scheduled" },
];

export const MEDICATION_OPTIONS = [
  "Paracetamol Syrup",
  "Antihistamine",
  "Asthma Inhaler",
  "Vitamin Drops",
  "Eczema Cream",
  "Other",
];

// ─── Inventory & Supplies ──────────────────────────────────────────────────────

export type InventoryStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  lastRestocked: string;
  status: InventoryStatus;
};

export const INVENTORY_ITEMS: InventoryItem[] = [
  { id: "inv-1", name: "Diapers (Size 3)", category: "Hygiene", quantity: 240, unit: "pcs", reorderLevel: 100, lastRestocked: "18 Jun 2026", status: "In Stock" },
  { id: "inv-2", name: "Hand Sanitizer", category: "Hygiene", quantity: 12, unit: "bottles", reorderLevel: 15, lastRestocked: "10 Jun 2026", status: "Low Stock" },
  { id: "inv-3", name: "Wet Wipes", category: "Hygiene", quantity: 0, unit: "packs", reorderLevel: 20, lastRestocked: "02 Jun 2026", status: "Out of Stock" },
  { id: "inv-4", name: "Crayons", category: "Learning Supplies", quantity: 85, unit: "boxes", reorderLevel: 20, lastRestocked: "15 Jun 2026", status: "In Stock" },
  { id: "inv-5", name: "First Aid Kits", category: "Medical", quantity: 4, unit: "kits", reorderLevel: 5, lastRestocked: "01 Jun 2026", status: "Low Stock" },
  { id: "inv-6", name: "Paper Towels", category: "Hygiene", quantity: 30, unit: "rolls", reorderLevel: 10, lastRestocked: "12 Jun 2026", status: "In Stock" },
];

export const INVENTORY_CATEGORIES = [
  "Hygiene",
  "Learning Supplies",
  "Medical",
  "Kitchen",
  "Office",
  "Other",
];

// ─── Facilities ────────────────────────────────────────────────────────────────

export type FacilityIssueStatus = "Open" | "In Progress" | "Resolved";
export type FacilityIssuePriority = "Low" | "Medium" | "High" | "Urgent";

export type FacilityIssue = {
  id: string;
  area: string;
  description: string;
  reportedBy: string;
  dateReported: string;
  priority: FacilityIssuePriority;
  status: FacilityIssueStatus;
};

export const FACILITY_ISSUES: FacilityIssue[] = [
  { id: "fac-1", area: "Lion Classroom", description: "Broken window latch", reportedBy: "Mrs. Sarah Okonkwo", dateReported: "19 Jun 2026", priority: "Medium", status: "In Progress" },
  { id: "fac-2", area: "Playground", description: "Loose swing chain", reportedBy: "Mr. James Adamu", dateReported: "20 Jun 2026", priority: "Urgent", status: "Open" },
  { id: "fac-3", area: "Kitchen", description: "Leaking sink pipe", reportedBy: "Mrs. Ngozi Eze", dateReported: "17 Jun 2026", priority: "High", status: "Open" },
  { id: "fac-4", area: "Main Hallway", description: "Flickering light fixture", reportedBy: "Mr. Chukwu Bello", dateReported: "14 Jun 2026", priority: "Low", status: "Resolved" },
  { id: "fac-5", area: "Bear Classroom", description: "AC unit not cooling", reportedBy: "Mrs. Amaka Taiwo", dateReported: "21 Jun 2026", priority: "High", status: "Open" },
];

export const FACILITY_AREAS = [
  "Lion Classroom",
  "Tiger Classroom",
  "Bear Classroom",
  "Owl Classroom",
  "Playground",
  "Kitchen",
  "Main Hallway",
  "Restrooms",
  "Other",
];

// ─── Tasks ──────────────────────────────────────────────────────────────────────

export type TaskStatus = "To Do" | "In Progress" | "Done" | "Overdue";
export type TaskPriority = "Low" | "Medium" | "High";

export type StaffTask = {
  id: string;
  title: string;
  assignedTo: string;
  room: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
};

export const STAFF_TASKS: StaffTask[] = [
  { id: "task-1", title: "Prepare weekly menu", assignedTo: "Mrs. Sarah Okonkwo", room: "Kitchen", dueDate: "22 Jun 2026", priority: "Medium", status: "In Progress" },
  { id: "task-2", title: "Restock first aid kits", assignedTo: "Mr. James Adamu", room: "All Rooms", dueDate: "21 Jun 2026", priority: "High", status: "Overdue" },
  { id: "task-3", title: "Update attendance register", assignedTo: "Mrs. Ngozi Eze", room: "Bear Class", dueDate: "23 Jun 2026", priority: "Low", status: "To Do" },
  { id: "task-4", title: "Sanitize toy bins", assignedTo: "Mr. Chukwu Bello", room: "Owl Class", dueDate: "20 Jun 2026", priority: "Medium", status: "Done" },
  { id: "task-5", title: "Schedule parent-teacher call", assignedTo: "Mrs. Amaka Taiwo", room: "Lion Class", dueDate: "24 Jun 2026", priority: "High", status: "To Do" },
];

export const TASK_ASSIGNEES = [
  "Mrs. Sarah Okonkwo",
  "Mr. James Adamu",
  "Mrs. Ngozi Eze",
  "Mr. Chukwu Bello",
  "Mrs. Amaka Taiwo",
];
