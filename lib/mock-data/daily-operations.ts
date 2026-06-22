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

// ─── Inventory: Equipment Register ─────────────────────────────────────────────

export type EquipmentStatus = "Serviceable" | "Repair Needed" | "Monitoring";

export type EquipmentItem = {
  id: string;
  name: string;
  room: string;
  quantity: number;
  purchasedDate: string;
  condition: string;
  lastServiced: string;
  nextService: string;
  status: EquipmentStatus;
};

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  { id: "eq-1", name: "Changing Table", room: "Room 1", quantity: 2, purchasedDate: "10 Jan 2026", condition: "Good", lastServiced: "10 Jan", nextService: "10 Jan", status: "Serviceable" },
  { id: "eq-2", name: "Walk Chair", room: "Room 2", quantity: 0, purchasedDate: "10 Jan 2026", condition: "Fair - Partly broken", lastServiced: "10 Jan", nextService: "10 Jan", status: "Repair Needed" },
  { id: "eq-3", name: "Outdoor Play Equipment", room: "Play Room", quantity: 6, purchasedDate: "10 Jan 2026", condition: "Good", lastServiced: "15 Feb", nextService: "15 Feb", status: "Serviceable" },
  { id: "eq-4", name: "Scooter", room: "Room 3", quantity: 4, purchasedDate: "10 Jan 2026", condition: "Fair", lastServiced: "20 Feb", nextService: "20 Feb", status: "Monitoring" },
];

// ─── Inventory: Orders ─────────────────────────────────────────────────────────

export type OrderStatus = "Delivered" | "Pending";

export type SupplyOrder = {
  id: string;
  orderDate: string;
  supplier: string;
  items: string;
  quantity: string;
  totalCost: string;
  dateDelivered: string | null;
  status: OrderStatus;
};

export const SUPPLY_ORDERS: SupplyOrder[] = [
  { id: "order-1", orderDate: "10 Apr 2026", supplier: "Random", items: "Diaper", quantity: "10 unit", totalCost: "₦120,000.00", dateDelivered: "16 May", status: "Delivered" },
  { id: "order-2", orderDate: "10 Apr 2026", supplier: "Babies & Kiddies", items: "Toilet wash", quantity: "20", totalCost: "₦120,000.00", dateDelivered: null, status: "Pending" },
  { id: "order-3", orderDate: "10 Apr 2026", supplier: "Random", items: "Baby wipes", quantity: "50 packs", totalCost: "₦120,000.00", dateDelivered: "20 May", status: "Delivered" },
  { id: "order-4", orderDate: "10 Apr 2026", supplier: "—", items: "Cleaner", quantity: "20", totalCost: "—", dateDelivered: null, status: "Pending" },
];

// ─── Facilities ────────────────────────────────────────────────────────────────

export type FacilityIssueStatus = "Open" | "In Progress" | "Resolved";
export type FacilityIssuePriority = "Low" | "Medium" | "High" | "Urgent";

export type FacilityIssue = {
  id: string;
  area: string;
  description: string;
  reportedBy: string;
  assignedTo: string;
  dateReported: string;
  resolvedDate: string | null;
  priority: FacilityIssuePriority;
  status: FacilityIssueStatus;
};

export const FACILITY_ISSUES: FacilityIssue[] = [
  { id: "fac-1", area: "Lion Classroom", description: "Broken window latch", reportedBy: "Mrs. Sarah Okonkwo", assignedTo: "External artisan", dateReported: "19 Jun 2026", resolvedDate: null, priority: "Medium", status: "In Progress" },
  { id: "fac-2", area: "Playground", description: "Loose swing chain", reportedBy: "Mr. James Adamu", assignedTo: "Technician", dateReported: "20 Jun 2026", resolvedDate: null, priority: "Urgent", status: "Open" },
  { id: "fac-3", area: "Kitchen", description: "Leaking sink pipe", reportedBy: "Mrs. Ngozi Eze", assignedTo: "External artisan", dateReported: "17 Jun 2026", resolvedDate: null, priority: "High", status: "Open" },
  { id: "fac-4", area: "Main Hallway", description: "Flickering light fixture", reportedBy: "Mr. Chukwu Bello", assignedTo: "Technician", dateReported: "14 Jun 2026", resolvedDate: "16 Jun 2026", priority: "Low", status: "Resolved" },
  { id: "fac-5", area: "Bear Classroom", description: "AC unit not cooling", reportedBy: "Mrs. Amaka Taiwo", assignedTo: "External artisan", dateReported: "21 Jun 2026", resolvedDate: null, priority: "High", status: "Open" },
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

// ─── Facilities: Cleaning Schedule ─────────────────────────────────────────────

export type CleaningTaskStatus = "Done" | "Pending";

export type CleaningTask = {
  id: string;
  room: string;
  frequency: string;
  time: string;
  status: CleaningTaskStatus;
};

export const CLEANING_TASKS: CleaningTask[] = [
  { id: "clean-1", room: "Butterfly Room", frequency: "Daily (Morning - 07:00am)", time: "07:30am", status: "Done" },
  { id: "clean-2", room: "Lion Classroom", frequency: "Daily (Morning - 07:00am)", time: "07:30am", status: "Done" },
  { id: "clean-3", room: "Tiger Classroom", frequency: "Daily (Morning - 07:00am)", time: "—", status: "Pending" },
  { id: "clean-4", room: "Bear Classroom", frequency: "Daily (Afternoon - 01:00pm)", time: "—", status: "Pending" },
  { id: "clean-5", room: "Owl Classroom", frequency: "Daily (Afternoon - 01:00pm)", time: "—", status: "Pending" },
  { id: "clean-6", room: "Kitchen", frequency: "Twice Daily", time: "—", status: "Pending" },
  { id: "clean-7", room: "Playground", frequency: "Weekly (Friday)", time: "—", status: "Pending" },
  { id: "clean-8", room: "Restrooms", frequency: "Twice Daily", time: "—", status: "Pending" },
  { id: "clean-9", room: "Main Hallway", frequency: "Daily (Morning - 07:00am)", time: "—", status: "Pending" },
];

// ─── Tasks ──────────────────────────────────────────────────────────────────────

export type TaskStatus = "To Do" | "In Progress" | "Done" | "Overdue";
export type TaskPriority = "Low" | "Medium" | "High";

export type TaskSource = "AI Assigned" | "Routine" | "Manual";

export type StaffTask = {
  id: string;
  title: string;
  subtitle: string | null;
  assignedTo: string;
  room: string;
  dueDate: string;
  priority: TaskPriority;
  source: TaskSource;
  status: TaskStatus;
};

export const STAFF_TASKS: StaffTask[] = [
  { id: "task-1", title: "Notify Balogun's Parent", subtitle: "Incident - Minor fall", assignedTo: "Mr. James Adamu", room: "All Rooms", dueDate: "Today 2pm", priority: "Medium", source: "AI Assigned", status: "In Progress" },
  { id: "task-2", title: "Submit daily report", subtitle: null, assignedTo: "Mrs. Ngozi Eze", room: "Bear Class", dueDate: "21 Jun 2026", priority: "Low", source: "Routine", status: "Overdue" },
  { id: "task-3", title: "Random task", subtitle: null, assignedTo: "Mrs. Amaka Taiwo", room: "Lion Class", dueDate: "30 Jun 2026", priority: "High", source: "Manual", status: "To Do" },
  { id: "task-4", title: "Parent teachers meeting note", subtitle: null, assignedTo: "Mrs. Amaka Taiwo", room: "Lion Class", dueDate: "30 Jun 2026", priority: "Low", source: "Routine", status: "Done" },
  { id: "task-5", title: "Prepare weekly menu", subtitle: null, assignedTo: "Mrs. Sarah Okonkwo", room: "Kitchen", dueDate: "22 Jun 2026", priority: "Medium", source: "Routine", status: "In Progress" },
];

export const TASK_ASSIGNEES = [
  "Mrs. Sarah Okonkwo",
  "Mr. James Adamu",
  "Mrs. Ngozi Eze",
  "Mr. Chukwu Bello",
  "Mrs. Amaka Taiwo",
];
