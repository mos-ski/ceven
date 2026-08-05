"use client";

import { useRouter } from "next/navigation";
import { UserCog, UserCheck, UserX, Gauge, Sparkles } from "lucide-react";

import { StatCardV3 } from "@/components/admin-v3/stat-card";
import { STAFF, LEADERBOARD, STAFF_CLASS_OPTIONS, type StaffMember } from "@/lib/mock-data/staff";

// Room isn't tracked on StaffMember in the shared mock data, assigned deterministically
// from STAFF_CLASS_OPTIONS so each card has a room to display.
function roomFor(index: number) {
  return STAFF_CLASS_OPTIONS[index % STAFF_CLASS_OPTIONS.length];
}

const LOG_COMPLIANCE_BY_NAME = new Map(LEADERBOARD.map((entry) => [entry.name, entry.logCompliance]));

function initials(name: string) {
  return name
    .split(" ")
    .filter((part) => !["Mr", "Mr.", "Mrs", "Mrs.", "Ms", "Ms."].includes(part))
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_COLORS = ["#C47B2C", "#8B9E7A", "#1E2D4A", "#D4522F", "#5B4A8A"];

const ON_DUTY_STYLES: Record<StaffMember["status"], { label: string; className: string }> = {
  Active: { label: "On Duty", className: "bg-[#EAF6EE] text-[#1E7A3D]" },
  Absent: { label: "Absent", className: "bg-[#FBEAE6] text-[#D4522F]" },
  Pending: { label: "Pending", className: "bg-black/[0.04] text-[#2D1810]/60" },
  Suspended: { label: "Suspended", className: "bg-[#FBEAE6] text-[#D4522F]" },
};

function complianceColor(value: number) {
  if (value >= 80) return "#1E7A3D";
  if (value >= 50) return "#C47B2C";
  return "#D4522F";
}

export default function StaffV3Page() {
  const router = useRouter();

  const total = STAFF.length;
  const onDuty = STAFF.filter((s) => s.status === "Active").length;
  const absent = STAFF.filter((s) => s.status === "Absent").length;
  const avgCompliance = Math.round(
    LEADERBOARD.reduce((sum, e) => sum + e.logCompliance, 0) / LEADERBOARD.length,
  );

  const flagged = LEADERBOARD.filter((e) => e.logCompliance < 80).sort((a, b) => a.logCompliance - b.logCompliance);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
          Staff Directory
        </h1>
        <p className="text-sm text-[#2D1810]/50">
          {total} staff members · {onDuty} on duty today · {absent} absent
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCardV3 icon={UserCog} label="Total Staff" value={String(total)} sub="4 rooms covered" />
        <StatCardV3
          icon={UserCheck}
          label="On Duty Today"
          value={String(onDuty)}
          sub="QR verified"
          subColor="#1E7A3D"
        />
        <StatCardV3 icon={UserX} label="Absent" value={String(absent)} sub="no cover arranged" subColor="#D4522F" />
        <StatCardV3
          icon={Gauge}
          label="Avg Log Compliance"
          value={`${avgCompliance}%`}
          sub={avgCompliance >= 80 ? "above 80% target" : "below 80% target"}
          subColor={complianceColor(avgCompliance)}
        />
      </div>

      {/* AI flags */}
      {flagged.length > 0 && (
        <div className="rounded-2xl bg-[#F5EDD8]/30 p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#1E2D4A] to-[#2D1810]">
              <Sparkles className="h-3.5 w-3.5 text-[#C47B2C]" />
            </span>
            <p className="text-xs leading-5 text-[#2D1810]/70">
              <span className="font-bold text-[#2D1810]">AI flags:</span>{" "}
              {flagged
                .map((e, i) => (
                  <span key={e.name}>
                    <span className="font-semibold text-[#2D1810]">{e.name}</span> compliance at {e.logCompliance}%
                    (below 80% threshold){i < flagged.length - 1 ? " · " : ""}
                  </span>
                ))}
            </p>
          </div>
        </div>
      )}

      {/* Directory */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {STAFF.map((staff, i) => {
          const compliance = LOG_COMPLIANCE_BY_NAME.get(staff.name);
          const duty = ON_DUTY_STYLES[staff.status];
          return (
            <button
              key={staff.id}
              onClick={() => router.push(`/admin/v2/staff/${staff.id}`)}
              className="flex items-center gap-3 rounded-2xl bg-[#F5EDD8]/30 p-4 text-left transition-colors hover:bg-[#C47B2C]/10"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-merriweather)] text-sm font-bold text-white"
                style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
              >
                {initials(staff.name)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#2D1810]">{staff.name}</p>
                <p className="truncate text-xs text-[#2D1810]/50">
                  {staff.role} · {roomFor(i)}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                {compliance !== undefined && (
                  <span
                    className="text-[11px] font-bold"
                    style={{ color: complianceColor(compliance) }}
                  >
                    {compliance}% logs
                  </span>
                )}
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${duty.className}`}>
                  {duty.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
