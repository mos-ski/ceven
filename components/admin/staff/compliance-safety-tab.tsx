"use client";

import { useState } from "react";
import { ChevronDown, MoreVertical, X } from "lucide-react";

import {
  COMPLIANCE_OVERVIEW,
  DBS_POLICE_CHECKS,
  FIRE_SAFETY_DRILLS,
  FOOD_HYGIENE_LOGS,
  RISK_ASSESSMENTS,
  type DbsCheckStatus,
  type FoodHygieneStatus,
  type RiskActionStatus,
  type RiskLevel,
} from "@/lib/mock-data/staff";

type ComplianceSubTab = "DBS/Police Checks" | "Fire & Safety Drill" | "Food Hygiene" | "Risk Assessment";
const SUB_TABS: ComplianceSubTab[] = ["DBS/Police Checks", "Fire & Safety Drill", "Food Hygiene", "Risk Assessment"];

const DBS_STATUS_STYLES: Record<DbsCheckStatus, string> = {
  Valid: "bg-[#f3f4f6] border border-[#9ca3af] text-[#6b7280]",
  "Renew Soon": "bg-[#fff6e6] border border-[#cc8000] text-[#cc8000]",
  Expired: "bg-[#fff5f5] border border-[#ef4444] text-[#ef4444]",
};

const FOOD_STATUS_STYLES: Record<FoodHygieneStatus, string> = {
  Pass: "text-[#009061]",
  "Low temp": "text-[#cc8000]",
  Nil: "text-[#6b7280]",
};

const RISK_LEVEL_STYLES: Record<RiskLevel, string> = {
  Low: "text-[#6b7280]",
  Medium: "text-[#cc8000]",
  High: "text-[#ef4444]",
};

const RISK_ACTION_STYLES: Record<RiskActionStatus, string> = {
  Current: "bg-[#f3f4f6] border border-[#9ca3af] text-[#6b7280]",
  "Review Due": "bg-[#fff6e6] border border-[#cc8000] text-[#cc8000]",
};

function Badge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${className}`}>
      {children}
    </span>
  );
}

function RecordNewModal({ subTab, onClose }: { subTab: ComplianceSubTab; onClose: () => void }) {
  const titleBySubTab: Record<ComplianceSubTab, string> = {
    "DBS/Police Checks": "New DBS / Police Check Record",
    "Fire & Safety Drill": "New Fire & Safety Drill Log",
    "Food Hygiene": "New Food Hygiene Log",
    "Risk Assessment": "New Risk Assessment Log",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex w-full max-w-[480px] flex-col rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#eaecf0] px-6 pt-6 pb-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            {titleBySubTab[subTab]}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="flex flex-col gap-4 px-6 py-5">
          {subTab === "DBS/Police Checks" && (
            <>
              <Field label="Staff Member" placeholder="e.g. Mrs Chidi" />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Check Type" placeholder="e.g. Enhanced DBS" />
                <Field label="Cert Number" placeholder="023******3344" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Issue Date" type="date" />
                <Field label="Expiry Date" type="date" />
              </div>
            </>
          )}
          {subTab === "Fire & Safety Drill" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Date" type="date" />
                <Field label="Time" type="time" />
              </div>
              <Field label="Duration" placeholder="e.g. 1 hour 45 minutes" />
              <Field label="Issues Found" placeholder="Nil" />
              <Field label="Action Taken" placeholder="Nil" />
            </>
          )}
          {subTab === "Food Hygiene" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Date" type="date" />
                <Field label="Meal" placeholder="e.g. Breakfast" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Fridge Temp" placeholder="4.1°C" />
                <Field label="Freezer Temp" placeholder="4.1°C" />
                <Field label="Food Temp" placeholder="4.1°C" />
              </div>
              <Field label="Supply Batch" placeholder="e.g. FRESH - 010" />
            </>
          )}
          {subTab === "Risk Assessment" && (
            <>
              <Field label="Area / Activity" placeholder="e.g. Outdoor play area" />
              <Field label="Controls in Place" placeholder="Describe the controls..." />
              <Field label="Date Reviewed" type="date" />
            </>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#d0d5dd] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Save Record
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#c47b2c]"
      />
    </div>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs">
      {label}
      <ChevronDown className="size-3" />
    </button>
  );
}

function DbsPoliceChecksTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          DBS/Police Check Records
        </h2>
        <FilterDropdown label="All Class" />
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#edd9c0]">
              {["Staff", "Role", "Check Type", "Issue Date", "Expiry Date", "Cert Number", "Status", "Action"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaecf0]">
            {DBS_POLICE_CHECKS.map((c) => (
              <tr key={c.id} className="hover:bg-[#faf9f7]">
                <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{c.name}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{c.role}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{c.checkType}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{c.issueDate}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{c.expiryDate}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{c.certNumber}</td>
                <td className="px-4 py-3">
                  <Badge className={DBS_STATUS_STYLES[c.status]}>{c.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <button className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
                    <MoreVertical className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 p-4 lg:hidden">
        {DBS_POLICE_CHECKS.map((c) => (
          <div key={c.id} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{c.name}</p>
              <Badge className={DBS_STATUS_STYLES[c.status]}>{c.status}</Badge>
            </div>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {c.checkType} • Expires {c.expiryDate}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FireSafetyDrillTable() {
  const nextDrillNote = "Next drill was due April 14, 2025 (8 weeks interval).";
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Fire & Safety Drill Log
          </h2>
          <p className="mt-0.5 flex items-center gap-1.5 font-[family-name:var(--font-nunito)] text-xs text-[#cc8000]">
            ⚠ {nextDrillNote}
          </p>
        </div>
        <button className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
          Schedule New Drill
        </button>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#edd9c0]">
              {["Date", "Time", "Duration", "All Evacuated", "Issues Found", "Action Taken", "Logged by"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaecf0]">
            {FIRE_SAFETY_DRILLS.map((d) => (
              <tr key={d.id} className="hover:bg-[#faf9f7]">
                <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{d.date}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{d.time}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{d.duration}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{d.allEvacuated}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{d.issuesFound}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{d.actionTaken}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{d.loggedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 p-4 lg:hidden">
        {FIRE_SAFETY_DRILLS.map((d) => (
          <div key={d.id} className="rounded-xl border border-[#eaecf0] p-3">
            <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{d.date} • {d.time}</p>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {d.duration} • Evacuated: {d.allEvacuated}
            </p>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">by {d.loggedBy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FoodHygieneTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Food Hygiene</h2>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#edd9c0]">
              {["Date", "Meal", "Fridge Temp (°C)", "Freezer Temp (°C)", "Food Temp (°C)", "Supply Batch", "Status", "Checked by"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaecf0]">
            {FOOD_HYGIENE_LOGS.map((f) => (
              <tr key={f.id} className="hover:bg-[#faf9f7]">
                <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{f.date}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{f.meal}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{f.fridgeTemp}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{f.freezerTemp}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{f.foodTemp}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{f.supplyBatch}</td>
                <td className={`px-4 py-3 text-sm font-[family-name:var(--font-nunito)] ${FOOD_STATUS_STYLES[f.status]}`}>{f.status}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{f.checkedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 p-4 lg:hidden">
        {FOOD_HYGIENE_LOGS.map((f) => (
          <div key={f.id} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{f.meal}</p>
              <span className={`font-[family-name:var(--font-nunito)] text-xs ${FOOD_STATUS_STYLES[f.status]}`}>{f.status}</span>
            </div>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {f.date} • Fridge {f.fridgeTemp} • Food {f.foodTemp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskAssessmentTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Risk Assessment</h2>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#edd9c0]">
              {["Area/Activity", "Risk Level", "Controls in Place", "Date Reviewed", "Reviewed by", "Action Taken"].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaecf0]">
            {RISK_ASSESSMENTS.map((r) => (
              <tr key={r.id} className="hover:bg-[#faf9f7]">
                <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{r.area}</td>
                <td className={`px-4 py-3 text-sm font-[family-name:var(--font-nunito)] ${RISK_LEVEL_STYLES[r.riskLevel]}`}>● {r.riskLevel}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{r.controlsInPlace}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{r.dateReviewed}</td>
                <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{r.reviewedBy}</td>
                <td className="px-4 py-3">
                  <Badge className={RISK_ACTION_STYLES[r.actionTaken]}>{r.actionTaken}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 p-4 lg:hidden">
        {RISK_ASSESSMENTS.map((r) => (
          <div key={r.id} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{r.area}</p>
              <Badge className={RISK_ACTION_STYLES[r.actionTaken]}>{r.actionTaken}</Badge>
            </div>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{r.controlsInPlace}</p>
            <p className={`mt-1 font-[family-name:var(--font-nunito)] text-xs ${RISK_LEVEL_STYLES[r.riskLevel]}`}>● {r.riskLevel} risk</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ComplianceSafetyTab() {
  const [subTab, setSubTab] = useState<ComplianceSubTab>("DBS/Police Checks");
  const [recordOpen, setRecordOpen] = useState(false);

  const overview = COMPLIANCE_OVERVIEW[subTab];

  return (
    <>
      <div className="space-y-4">
        {/* Header action */}
        <div className="flex justify-end">
          <button
            onClick={() => setRecordOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Record New
            <ChevronDown className="size-3.5" />
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          <div className="min-w-[160px] flex-1 rounded-xl border border-[#e6ebf3] bg-white p-4">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Compliant Materials</p>
            <p className="mt-2 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {String(overview.compliantMaterials).padStart(2, "0")}
            </p>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">Up to date</p>
          </div>
          <div className="min-w-[160px] flex-1 rounded-xl border border-[#e6ebf3] bg-white p-4">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Due This Month</p>
            <p className="mt-2 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {String(overview.dueThisMonth).padStart(2, "0")}
            </p>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#cc8000]">⚠ {overview.dueThisMonthNote}</p>
          </div>
          <div className="min-w-[160px] flex-1 rounded-xl border border-[#e6ebf3] bg-white p-4">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Overdue</p>
            <p className="mt-2 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {String(overview.overdue).padStart(2, "0")}
            </p>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#ef4444]">⚠ {overview.overdueNote}</p>
          </div>
          <div className="min-w-[160px] flex-1 rounded-xl border border-[#e6ebf3] bg-white p-4">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Next Inspection</p>
            <p className="mt-2 font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
              {overview.nextInspection}
            </p>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{overview.nextInspectionNote}</p>
          </div>
        </div>

        {/* Sub-tab nav */}
        <div className="flex overflow-x-auto border-b border-[#e6ebf3]">
          {SUB_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium font-[family-name:var(--font-urbanist)] cursor-pointer ${
                subTab === tab
                  ? "border-b-2 border-[#3b2513] text-[#3b2513]"
                  : "text-[#6b7280] hover:text-[#2d1810]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {subTab === "DBS/Police Checks" && <DbsPoliceChecksTable />}
        {subTab === "Fire & Safety Drill" && <FireSafetyDrillTable />}
        {subTab === "Food Hygiene" && <FoodHygieneTable />}
        {subTab === "Risk Assessment" && <RiskAssessmentTable />}
      </div>

      {recordOpen && <RecordNewModal subTab={subTab} onClose={() => setRecordOpen(false)} />}
    </>
  );
}
