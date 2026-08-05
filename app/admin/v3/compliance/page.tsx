"use client";

import { useState } from "react";
import { ShieldCheck, AlertTriangle, CalendarClock, Building2 } from "lucide-react";

import { StatCardV3 } from "@/components/admin-v3/stat-card";
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

type SubTab = "DBS/Police Checks" | "Fire & Safety Drill" | "Food Hygiene" | "Risk Assessment";
const SUB_TABS: SubTab[] = ["DBS/Police Checks", "Fire & Safety Drill", "Food Hygiene", "Risk Assessment"];

const DBS_STATUS_STYLES: Record<DbsCheckStatus, string> = {
  Valid: "bg-[#EAF6EE] text-[#1E7A3D] border border-[#1E7A3D]/25",
  "Renew Soon": "bg-[#FDF1E3] text-[#C47B2C] border border-[#C47B2C]/30",
  Expired: "bg-[#FBEAE6] text-[#D4522F] border border-[#D4522F]/25",
};

const FOOD_STATUS_STYLES: Record<FoodHygieneStatus, string> = {
  Pass: "text-[#1E7A3D]",
  "Low temp": "text-[#C47B2C]",
  Nil: "text-[#2D1810]/40",
};

const RISK_LEVEL_STYLES: Record<RiskLevel, string> = {
  Low: "text-[#2D1810]/50",
  Medium: "text-[#C47B2C]",
  High: "text-[#D4522F]",
};

const RISK_ACTION_STYLES: Record<RiskActionStatus, string> = {
  Current: "bg-black/[0.04] text-[#2D1810]/60 border border-black/[0.08]",
  "Review Due": "bg-[#FDF1E3] text-[#C47B2C] border border-[#C47B2C]/30",
};

function Th({ children }: { children: React.ReactNode }) {
  return <th className="pb-2 pr-3 font-semibold">{children}</th>;
}

function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`py-2.5 pr-3 text-[#2D1810]/70 ${className}`}>{children}</td>;
}

export default function ComplianceV3Page() {
  const [subTab, setSubTab] = useState<SubTab>("DBS/Police Checks");

  const categories = Object.values(COMPLIANCE_OVERVIEW);
  const totalCompliant = categories.reduce((sum, c) => sum + c.compliantMaterials, 0);
  const totalOverdue = categories.reduce((sum, c) => sum + c.overdue, 0);
  const totalDueThisMonth = categories.reduce((sum, c) => sum + c.dueThisMonth, 0);
  const nextInspection = categories.reduce((earliest, c) => {
    const date = new Date(c.nextInspection);
    if (Number.isNaN(date.getTime())) return earliest;
    return !earliest || date < earliest.date ? { date, label: c.nextInspection } : earliest;
  }, null as { date: Date; label: string } | null);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
          Compliance &amp; Safety
        </h1>
        <p className="text-sm text-[#2D1810]/50">
          Safeguarding · risk assessments · fire drills · food hygiene · DBS records
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCardV3
          icon={ShieldCheck}
          label="Compliant"
          value={String(totalCompliant)}
          sub="up to date"
          subColor="#1E7A3D"
        />
        <StatCardV3
          icon={AlertTriangle}
          label="Overdue"
          value={String(totalOverdue)}
          sub="immediate action"
          subColor="#D4522F"
        />
        <StatCardV3
          icon={CalendarClock}
          label="Due This Month"
          value={String(totalDueThisMonth)}
          sub="food hygiene · insurance"
          subColor="#C47B2C"
        />
        <StatCardV3
          icon={Building2}
          label="Next Inspection"
          value={nextInspection?.label ?? "-"}
          sub="scheduled review"
        />
      </div>

      {/* Sub-tab nav + table card */}
      <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
        <div className="mb-4 flex overflow-x-auto border-b border-black/[0.08]">
          {SUB_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSubTab(tab)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-semibold transition-colors ${
                subTab === tab
                  ? "border-b-2 border-[#C47B2C] text-[#2D1810]"
                  : "text-[#2D1810]/40 hover:text-[#2D1810]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {subTab === "DBS/Police Checks" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/[0.08] text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
                  <Th>Staff</Th>
                  <Th>Role</Th>
                  <Th>Check Type</Th>
                  <Th>Issue Date</Th>
                  <Th>Expiry Date</Th>
                  <Th>Cert Number</Th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {DBS_POLICE_CHECKS.map((c) => (
                  <tr key={c.id} className="border-b border-black/[0.05] last:border-0">
                    <td className="py-2.5 pr-3 font-semibold text-[#2D1810]">{c.name}</td>
                    <Td>{c.role}</Td>
                    <Td>{c.checkType}</Td>
                    <Td>{c.issueDate}</Td>
                    <Td>{c.expiryDate}</Td>
                    <Td className="font-mono">{c.certNumber}</Td>
                    <td className="py-2.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${DBS_STATUS_STYLES[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {subTab === "Fire & Safety Drill" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/[0.08] text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Duration</Th>
                  <Th>All Evacuated</Th>
                  <Th>Issues Found</Th>
                  <Th>Action Taken</Th>
                  <th className="pb-2 font-semibold">Logged By</th>
                </tr>
              </thead>
              <tbody>
                {FIRE_SAFETY_DRILLS.map((d) => (
                  <tr key={d.id} className="border-b border-black/[0.05] last:border-0">
                    <td className="py-2.5 pr-3 font-semibold text-[#2D1810]">{d.date}</td>
                    <Td>{d.time}</Td>
                    <Td>{d.duration}</Td>
                    <Td className={d.allEvacuated === "Yes" ? "text-[#1E7A3D]" : "text-[#D4522F]"}>
                      {d.allEvacuated}
                    </Td>
                    <Td>{d.issuesFound}</Td>
                    <Td>{d.actionTaken}</Td>
                    <td className="py-2.5 text-[#2D1810]/70">{d.loggedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {subTab === "Food Hygiene" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/[0.08] text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
                  <Th>Date</Th>
                  <Th>Meal</Th>
                  <Th>Fridge Temp</Th>
                  <Th>Freezer Temp</Th>
                  <Th>Food Temp</Th>
                  <Th>Supply Batch</Th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Checked By</th>
                </tr>
              </thead>
              <tbody>
                {FOOD_HYGIENE_LOGS.map((f) => (
                  <tr key={f.id} className="border-b border-black/[0.05] last:border-0">
                    <td className="py-2.5 pr-3 font-semibold text-[#2D1810]">{f.date}</td>
                    <Td>{f.meal}</Td>
                    <Td>{f.fridgeTemp}</Td>
                    <Td>{f.freezerTemp}</Td>
                    <Td>{f.foodTemp}</Td>
                    <Td>{f.supplyBatch}</Td>
                    <td className={`py-2.5 pr-3 text-sm font-semibold ${FOOD_STATUS_STYLES[f.status]}`}>
                      {f.status}
                    </td>
                    <td className="py-2.5 text-[#2D1810]/70">{f.checkedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {subTab === "Risk Assessment" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-black/[0.08] text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
                  <Th>Area / Activity</Th>
                  <Th>Risk Level</Th>
                  <Th>Controls in Place</Th>
                  <Th>Date Reviewed</Th>
                  <Th>Reviewed By</Th>
                  <th className="pb-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {RISK_ASSESSMENTS.map((r) => (
                  <tr key={r.id} className="border-b border-black/[0.05] last:border-0">
                    <td className="py-2.5 pr-3 font-semibold text-[#2D1810]">{r.area}</td>
                    <td className={`py-2.5 pr-3 text-sm font-semibold ${RISK_LEVEL_STYLES[r.riskLevel]}`}>
                      ● {r.riskLevel}
                    </td>
                    <Td>{r.controlsInPlace}</Td>
                    <Td>{r.dateReviewed}</Td>
                    <Td>{r.reviewedBy}</Td>
                    <td className="py-2.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${RISK_ACTION_STYLES[r.actionTaken]}`}>
                        {r.actionTaken}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
