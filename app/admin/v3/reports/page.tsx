"use client";

import type { LucideIcon } from "lucide-react";
import { ClipboardCheck, ShieldCheck, Banknote, HeartPulse, Users, UserCog } from "lucide-react";
import { ReportsTab } from "@/components/admin/intelligence/reports-tab";

// ── Static data ──────────────────────────────────────────────────────────────
// No v2 equivalent exists for report-generator cards or a scheduled-reports
// list, so this data is invented, the report *types* reuse
// REPORT_TYPE_OPTIONS/REPORT_REPEAT_OPTIONS/REPORT_RECIPIENT_OPTIONS from
// lib/mock-data/intelligence.ts to stay consistent with the real Reports tab.

type ReportGenerator = { type: string; icon: LucideIcon; desc: string };

const REPORT_GENERATORS: ReportGenerator[] = [
  { type: "Attendance", icon: ClipboardCheck, desc: "Daily check-in/out summary by room, with absence trends." },
  { type: "Compliance", icon: ShieldCheck, desc: "Staff certifications, DBS checks, and safeguarding audit trail." },
  { type: "Finance", icon: Banknote, desc: "Billing, collections, and outstanding balances by family." },
  { type: "Health & Welfare", icon: HeartPulse, desc: "Incidents, medication logs, and welfare flags this period." },
  { type: "Enrolment", icon: Users, desc: "Waitlist movement, new enrolments, and room capacity." },
  { type: "Staff Performance", icon: UserCog, desc: "Logging compliance and caregiver ratings by room." },
];

const SCHEDULED_REPORTS = [
  { name: "Monthly Attendance Summary", cadence: "Monthly · 1st", recipient: "All Parents", nextRun: "01 Jul 2026", active: true },
  { name: "Staff Compliance Audit", cadence: "Quarterly", recipient: "Admin Team", nextRun: "01 Sep 2026", active: true },
  { name: "Weekly Health & Incidents Digest", cadence: "Weekly · Mon", recipient: "Admin Team", nextRun: "29 Jun 2026", active: true },
  { name: "Outstanding Payments Report", cadence: "Weekly · Fri", recipient: "Finance Lead", nextRun: "26 Jun 2026", active: false },
];

export default function ReportsV3Page() {
  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
          Reports
        </h1>
        <p className="mt-1 text-sm text-[#2D1810]/50">
          Generate a report on demand, manage what runs automatically, and download what System has already produced.
        </p>
      </div>

      {/* Report generator cards */}
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">Generate a Report</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REPORT_GENERATORS.map(({ type, icon: Icon, desc }) => (
            <div key={type} className="rounded-2xl bg-[#F5EDD8]/30 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5EDD8] text-[#C47B2C]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2D1810]">
                {type}
              </p>
              <p className="mt-1 text-xs leading-5 text-[#2D1810]/50">{desc}</p>
              <button className="mt-4 rounded-lg bg-[#2D1810] px-3.5 py-2 text-xs font-bold text-[#F5EDD8] hover:opacity-90">
                Generate
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled reports */}
      <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
        <p className="mb-3 text-sm font-bold text-[#2D1810]">Scheduled Reports</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
                <th className="pb-2 pr-3 font-semibold">Report</th>
                <th className="pb-2 pr-3 font-semibold">Cadence</th>
                <th className="pb-2 pr-3 font-semibold">Recipient</th>
                <th className="pb-2 pr-3 font-semibold">Next Run</th>
                <th className="pb-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULED_REPORTS.map((r) => (
                <tr key={r.name} className={r.name.length % 2 === 0 ? "bg-white/60" : "bg-transparent"}>
                  <td className="py-2.5 pr-3 font-semibold text-[#2D1810]">{r.name}</td>
                  <td className="py-2.5 pr-3 text-[#2D1810]/70">{r.cadence}</td>
                  <td className="py-2.5 pr-3 text-[#2D1810]/70">{r.recipient}</td>
                  <td className="py-2.5 pr-3 font-mono text-[#2D1810]/70">{r.nextRun}</td>
                  <td className="py-2.5">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                        r.active
                          ? "border-[#2A8A52]/30 bg-[#2A8A52]/10 text-[#2A8A52]"
                          : "border-black/[0.1] bg-black/[0.03] text-[#2D1810]/50"
                      }`}
                    >
                      {r.active ? "Active" : "Paused"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated reports, reuse v2's ReportsTab data/logic */}
      <ReportsTab />
    </div>
  );
}
