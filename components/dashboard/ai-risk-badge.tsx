"use client";

import { Lock } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type RiskLevel = "high" | "medium" | "low" | "locked";

type AiRiskBadgeProps = {
  level: RiskLevel;
  /** Number of days overdue — used to calculate risk if level not provided */
  overdueDays?: number;
  /** Plan tier — "seedling" shows locked state */
  planTier?: "seedling" | "nestling-pro" | "flourish";
};

// ── Risk calculation ────────────────────────────────────────────────────────

export function calculateRisk(overdueDays: number): RiskLevel {
  if (overdueDays > 7) return "high";
  if (overdueDays > 3) return "medium";
  return "low";
}

// ── Styles ───────────────────────────────────────────────────────────────────

const RISK_STYLES: Record<RiskLevel, { bg: string; text: string; border: string; label: string }> = {
  high: {
    bg: "#fef2f2",
    text: "#dc2626",
    border: "#dc2626",
    label: "High Risk",
  },
  medium: {
    bg: "#fffbeb",
    text: "#d97706",
    border: "#d97706",
    label: "Medium Risk",
  },
  low: {
    bg: "#ecfdf5",
    text: "#059669",
    border: "#059669",
    label: "Low Risk",
  },
  locked: {
    bg: "#f3f4f6",
    text: "#9ca3af",
    border: "#d1d5db",
    label: "Locked",
  },
};

// ── Component ────────────────────────────────────────────────────────────────

export default function AiRiskBadge({ level, overdueDays, planTier = "flourish" }: AiRiskBadgeProps) {
  // Seedling tier always shows locked
  const effectiveLevel = planTier === "seedling" ? "locked" : level;
  const styles = RISK_STYLES[effectiveLevel];

  if (effectiveLevel === "locked") {
    return (
      <div className="group relative inline-flex items-center gap-1">
        <span
          className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] font-semibold"
          style={{
            backgroundColor: styles.bg,
            color: styles.text,
            borderColor: styles.border,
          }}
        >
          <Lock className="h-2.5 w-2.5" />
          AI Risk
        </span>
        {/* Tooltip */}
        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="whitespace-nowrap rounded-lg bg-[#2d1810] px-3 py-1.5 font-[family-name:var(--font-nunito)] text-[10px] text-white shadow-lg">
            Upgrade to Nestling Pro to unlock AI Risk
            <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#2d1810]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] font-semibold"
      style={{
        backgroundColor: styles.bg,
        color: styles.text,
        borderColor: styles.border,
      }}
    >
      {styles.label}
    </span>
  );
}
