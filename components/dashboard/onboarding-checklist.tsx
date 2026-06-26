"use client";

import { Check, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// ── Types ─────────────────────────────────────────────────────────────────────

type OnboardingStep = {
  id: number;
  title: string;
  description: string;
  cta: string;
  route: string;
  modal?: string;
};

// ── 8 Onboarding Steps ──────────────────────────────────────────────────────

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: "Add your first child",
    description: "Enrol a child to get started with attendance tracking",
    cta: "Add Child",
    route: "/children",
    modal: "enroll",
  },
  {
    id: 2,
    title: "Set up rooms & classes",
    description: "Create rooms and assign age groups",
    cta: "Set Up Rooms",
    route: "/children?tab=rooms-classes",
  },
  {
    id: 3,
    title: "Add staff members",
    description: "Add caregivers and assign them to rooms",
    cta: "Add Staff",
    route: "/staff",
  },
  {
    id: 4,
    title: "Configure fee plans",
    description: "Set up payment plans and pricing",
    cta: "Configure Fees",
    route: "/finance",
  },
  {
    id: 5,
    title: "Set up parent contacts",
    description: "Add parent/guardian contact information",
    cta: "Add Contacts",
    route: "/communication",
  },
  {
    id: 6,
    title: "Complete crèche profile",
    description: "Add your crèche details in Settings",
    cta: "Complete Profile",
    route: "/settings",
  },
  {
    id: 7,
    title: "Log first daily report",
    description: "Submit your first daily activity report",
    cta: "Log Report",
    route: "/daily-operations",
  },
  {
    id: 8,
    title: "Send first announcement",
    description: "Broadcast an announcement to parents",
    cta: "Send Announcement",
    route: "/communication",
    modal: "announcement",
  },
];

const STORAGE_KEY = "ceven-onboarding-checklist";
const DISMISS_KEY = "ceven-onboarding-dismissed";

// ── Persistence helpers ─────────────────────────────────────────────────────

function getCompletedSteps(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCompletedSteps(steps: number[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(steps));
}

function isDismissed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(DISMISS_KEY) === "true";
}

function dismissChecklist() {
  if (typeof window === "undefined") return;
  localStorage.setItem(DISMISS_KEY, "true");
}

// ── Component ────────────────────────────────────────────────────────────────

export default function OnboardingChecklist() {
  const router = useRouter();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [dismissed, setDismissed] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCompletedSteps(getCompletedSteps());
    setDismissed(isDismissed());
    setLoaded(true);
  }, []);

  const completedCount = completedSteps.length;
  const totalSteps = ONBOARDING_STEPS.length;
  const progressPct = Math.round((completedCount / totalSteps) * 100);
  const allComplete = completedCount === totalSteps;

  // Mark a step as complete
  function markComplete(stepId: number) {
    if (completedSteps.includes(stepId)) return;
    const updated = [...completedSteps, stepId];
    setCompletedSteps(updated);
    saveCompletedSteps(updated);
  }

  // Handle CTA click
  function handleStepCta(step: OnboardingStep) {
    markComplete(step.id);
    if (step.modal === "enroll") {
      // Open enroll modal — parent will handle this
      router.push(step.route);
    } else if (step.modal === "announcement") {
      router.push(step.route);
    } else {
      router.push(step.route);
    }
  }

  // Don't render until loaded from localStorage
  if (!loaded) return null;

  // Hide if dismissed or all complete
  if (dismissed || allComplete) return null;

  return (
    <div className="rounded-2xl border border-[#e6ebf3] bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
            Complete Your Setup
          </h3>
          <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
            {completedCount} of {totalSteps} steps completed
          </p>
        </div>
        <button
          onClick={() => {
            setDismissed(true);
            dismissChecklist();
          }}
          className="rounded p-1 text-[#9ca3af] hover:text-[#2d1810]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-[family-name:var(--font-urbanist)] text-xs font-semibold text-[#3b2513]">
            {progressPct}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#c47b2c] to-[#3b2513] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Steps list */}
      <div className="mt-4 flex flex-col gap-2">
        {ONBOARDING_STEPS.map((step) => {
          const isComplete = completedSteps.includes(step.id);
          return (
            <div
              key={step.id}
              className={`flex items-center justify-between rounded-xl border p-3 transition-colors ${
                isComplete
                  ? "border-[#009061]/20 bg-[#ecfff8]"
                  : "border-[#e6ebf3] bg-[#faf9f7] hover:border-[#c47b2c]/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    isComplete ? "bg-[#009061]" : "border-2 border-[#d4d9e2] bg-white"
                  }`}
                >
                  {isComplete ? (
                    <Check className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <span className="font-[family-name:var(--font-urbanist)] text-[10px] font-bold text-[#9ca3af]">
                      {step.id}
                    </span>
                  )}
                </div>
                <div>
                  <p
                    className={`font-[family-name:var(--font-nunito)] text-sm font-medium ${
                      isComplete ? "text-[#009061] line-through opacity-70" : "text-[#2d1810]"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">
                    {step.description}
                  </p>
                </div>
              </div>
              {!isComplete && (
                <button
                  onClick={() => handleStepCta(step)}
                  className="flex shrink-0 items-center gap-1 rounded-lg bg-[#3b2513] px-3 py-1.5 font-[family-name:var(--font-urbanist)] text-[10px] font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
                >
                  {step.cta}
                  <ChevronRight className="h-3 w-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
