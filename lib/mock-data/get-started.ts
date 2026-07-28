import { sharedGet, sharedSet } from "@/lib/shared/storage";

// ── Types ─────────────────────────────────────────────────────────────────────

export type OnboardingTask = {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
};

// ── Tasks definition ──────────────────────────────────────────────────────────

export const ONBOARDING_TASKS: OnboardingTask[] = [
  {
    id: "creche-profile",
    step: 1,
    title: "Complete your crèche profile",
    description: "Add your crèche name, address, contact info, and logo so parents can find you.",
    icon: "building",
  },
  {
    id: "rooms",
    step: 2,
    title: "Set up rooms & classes",
    description: "Create rooms and assign age groups to organize your children.",
    icon: "door",
  },
  {
    id: "staff",
    step: 3,
    title: "Add staff members",
    description: "Add caregivers and assign them to rooms.",
    icon: "users",
  },
  {
    id: "child",
    step: 4,
    title: "Add your first child",
    description: "Enrol a child to get started with attendance tracking.",
    icon: "baby",
  },
  {
    id: "fees",
    step: 5,
    title: "Configure fee plans",
    description: "Set up payment plans and pricing for parents.",
    icon: "dollar",
  },
  {
    id: "parents",
    step: 6,
    title: "Set up parent contacts",
    description: "Add parent/guardian contact information.",
    icon: "contact",
  },
  {
    id: "daily-report",
    step: 7,
    title: "Log first daily report",
    description: "Submit your first daily activity report for a child.",
    icon: "clipboard",
  },
  {
    id: "announcement",
    step: 8,
    title: "Send first announcement",
    description: "Broadcast an announcement to parents.",
    icon: "megaphone",
  },
];

// ── Storage ───────────────────────────────────────────────────────────────────

const STORAGE_KEY = "ceven_get_started_completed";

export function getCompletedTasks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sharedGet<string[]>(STORAGE_KEY);
    return raw ?? [];
  } catch {
    return [];
  }
}

export function markTaskComplete(taskId: string): void {
  const current = getCompletedTasks();
  if (current.includes(taskId)) return;
  sharedSet(STORAGE_KEY, [...current, taskId]);
}

export function isAllOnboardingComplete(): boolean {
  return getCompletedTasks().length >= ONBOARDING_TASKS.length;
}

export function getOnboardingProgress(): number {
  const completed = getCompletedTasks().length;
  return Math.round((completed / ONBOARDING_TASKS.length) * 100);
}
