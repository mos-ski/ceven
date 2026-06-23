"use client";

import Link from "next/link";
import { ChevronLeft, ChevronDown, Download, FileText, Image, Search, X } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogActivityModal, type LogActivityMode } from "@/components/admin/children/log-activity-modal";
import { LogGrowthModal } from "@/components/admin/children/log-growth-modal";
import type { Child, ChildStatus } from "@/lib/mock-data/children";

// ── Types ──────────────────────────────────────────────────────────────────────

type ActiveTab =
  | "Overview"
  | "Activity Log"
  | "Health Status"
  | "Payment History"
  | "Development & Behaviour"
  | "Contact";

// ── Static data ────────────────────────────────────────────────────────────────

const activityLogRows = [
  { date: "Oct 10, 2025", mood: "Happy 😊", meals: "Ate well", nap: "1hr 20min", activity: "Active", caregiver: "Mrs. Sarah", notes: "Great day" },
  { date: "Oct 09, 2025", mood: "Calm 😌", meals: "Partial", nap: "45min", activity: "Moderate", caregiver: "Mrs. Sarah", notes: "Mild fussiness" },
  { date: "Oct 08, 2025", mood: "Happy 😊", meals: "Ate well", nap: "1hr 10min", activity: "Active", caregiver: "Mr. Tunde", notes: "Excellent mood" },
  { date: "Oct 07, 2025", mood: "Tired 😴", meals: "Ate well", nap: "2hr", activity: "Low", caregiver: "Mrs. Sarah", notes: "Napped longer" },
  { date: "Oct 06, 2025", mood: "Happy 😊", meals: "Ate well", nap: "1hr", activity: "Active", caregiver: "Mr. Tunde", notes: "Story time fav." },
];

const childPaymentRows = [
  { plan: "Monthly", boldAmount: "₦40,000", ref: "REF0292638", amount: "₦40,000", date: "10 Oct 2025", invoice: "#0123456789", status: "Successful" as const },
  { plan: "Monthly", boldAmount: "₦40,000", ref: "REF0292597", amount: "₦40,000", date: "10 Sep 2025", invoice: "#0123456788", status: "Successful" as const },
  { plan: "Monthly", boldAmount: "₦40,000", ref: "REF0292556", amount: "₦40,000", date: "10 Aug 2025", invoice: "#0123456787", status: "Successful" as const },
  { plan: "Monthly", boldAmount: "₦40,000", ref: "REF0292515", amount: "₦40,000", date: "10 Jul 2025", invoice: "#0123456786", status: "Failed" as const },
  { plan: "Monthly", boldAmount: "₦40,000", ref: "REF0292474", amount: "₦40,000", date: "10 Jun 2025", invoice: "#0123456785", status: "Successful" as const },
];

// ── Shared sub-components ──────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const STATUS_BADGE_CLASS: Record<ChildStatus, string> = {
  Present: "border-[#009061]/40 bg-[#009061]/20 text-[#4ade80]",
  Late: "border-[#f59e0b]/40 bg-[#f59e0b]/20 text-[#fbbf24]",
  Absent: "border-[#ef4444]/40 bg-[#ef4444]/20 text-[#f87171]",
};

function PaymentStatusBadge({ status }: { status: "Successful" | "Failed" }) {
  if (status === "Successful") {
    return (
      <span className="inline-flex items-center rounded-full border border-[#009061] bg-[#ecfff8] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#009061]">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-[#ef4444] bg-[#fff5f5] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#ef4444]">
      {status}
    </span>
  );
}

function FilterButton({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
      {label}
      <ChevronDown className="h-4 w-4" />
    </button>
  );
}

// ── Tab: Overview ─────────────────────────────────────────────────────────────

function OverviewTab({ child }: { child: Child }) {
  const infoCards = [
    { label: "Room", value: `${child.room} Class` },
    { label: "Subscription Plan", value: "Monthly – ₦40,000" },
    { label: "Gender", value: child.gender === "M" ? "Male" : "Female" },
    { label: "Status", value: child.status },
    { label: "Blood Group", value: child.bloodGroup },
    { label: "Guardian", value: child.parentName },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Left col (span 2) */}
      <div className="space-y-4 lg:col-span-2">
        {/* Info cards — 2 cols on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {infoCards.map((card) => (
            <div key={card.label} className="rounded-xl border border-[#e6ebf3] bg-white p-3">
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{card.label}</p>
              <p className="mt-1 font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Primary Parent card */}
        <div className="rounded-xl border border-[#e6ebf3] bg-white p-4">
          <p className="mb-3 font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">Primary Parent</p>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#edd9c0]">
              <span className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#3b2513]">
                {getInitials(child.parentName)}
              </span>
            </div>
            <div>
              <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{child.parentName}</p>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{child.parentEmail}</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 rounded-lg border border-[#d0d5dd] py-2 font-[family-name:var(--font-urbanist)] text-xs text-[#3b2513]">Message</button>
            <button className="flex-1 rounded-lg border border-[#d0d5dd] py-2 font-[family-name:var(--font-urbanist)] text-xs text-[#3b2513]">Call</button>
          </div>
        </div>
      </div>

      {/* Right sidebar col */}
      <div>
        {/* Mood Trend */}
        <div className="rounded-xl border border-[#e6ebf3] bg-white p-4">
          <p className="mb-2 font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">Mood Trend</p>
          <div className="flex h-16 items-end gap-1">
            {[3, 4, 4, 5, 4, 3, 4].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-[#c47b2c]/30"
                style={{ height: `${v * 16}px` }}
              />
            ))}
          </div>
          <p className="mt-2 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Avg 4.1 / 5 this week</p>
        </div>

        {/* Health Status */}
        <div className="mt-3 rounded-xl border border-[#e6ebf3] bg-white p-4">
          <p className="mb-2 font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">Health Status</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Allergies</span>
              <span className="font-[family-name:var(--font-nunito)] text-xs font-medium text-[#ef4444]">
                {child.healthFlag ?? "None reported"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Last Checkup</span>
              <span className="font-[family-name:var(--font-nunito)] text-xs font-medium text-[#2d1810]">Oct 5, 2025</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Health Flag</span>
              <span className="font-[family-name:var(--font-nunito)] text-xs font-medium text-[#f59e0b]">
                {child.healthFlag ? "Monitor" : "None"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab: Activity Log ─────────────────────────────────────────────────────────

function ActivityLogTab({ child }: { child: Child }) {
  const firstName = child.name.split(" ")[0];
  const todayCards = [
    { label: "Morning Mood", value: "Happy 😊", color: "#22c55e" },
    { label: "Breakfast", value: "Ate well", color: "#22c55e" },
    { label: "Nap", value: "1hr 20min", color: "#6b7280" },
    { label: "Play", value: "Active", color: "#3b82f6" },
    { label: "Afternoon Mood", value: "Calm 😌", color: "#22c55e" },
    { label: "Departure", value: "3:45 PM", color: "#6b7280" },
  ];

  return (
    <div>
      {/* Today's Log */}
      <div className="mb-4 rounded-xl border border-[#e6ebf3] bg-white p-4">
        <p className="mb-3 font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
          Today&apos;s Log — Oct 10, 2025
        </p>
        <div className="mb-4 grid grid-cols-3 gap-3">
          {todayCards.map((item) => (
            <div key={item.label} className="rounded-lg border border-[#e6ebf3] p-3">
              <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#6b7280]">{item.label}</p>
              <p
                className="mt-1 font-[family-name:var(--font-nunito)] text-sm font-semibold"
                style={{ color: item.color }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-[#e0bfa0] bg-[#fdf6e8] p-3">
          <p className="mb-1 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#2d1810]">Caregiver Note</p>
          <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
            {firstName} had a great day today! {child.gender === "M" ? "He" : "She"} participated actively in story time and showed kindness to younger children during play. Ate all {child.gender === "M" ? "his" : "her"} lunch and napped for 1hr 20min.
          </p>
          <p className="mt-1 font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">— Mrs. Sarah Okonkwo, 3:50 PM</p>
        </div>
      </div>

      {/* Log History table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex items-center gap-3 px-4 py-4">
          <h3 className="font-[family-name:var(--font-merriweather)] font-bold text-[#2d1810]">Log History</h3>
          <div className="ml-auto flex items-center gap-3">
            <FilterButton label="Filter" />
            <FilterButton label="Date" />
          </div>
        </div>
        {/* Desktop table */}
        <table className="hidden w-full border-collapse lg:table">
          <thead>
            <tr className="bg-[#edd9c0]">
              {["Date", "Mood", "Meals", "Nap", "Activity", "Caregiver", "Notes"].map((col) => (
                <th key={col} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {activityLogRows.map((row, i) => (
              <tr key={i} className="border-t border-[#eaecf0]">
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.date}</td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.mood}</td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.meals}</td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.nap}</td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.activity}</td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.caregiver}</td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {activityLogRows.map((row, i) => (
            <div key={i} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-xs font-medium text-[#2d1810]">{row.date}</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{row.caregiver}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#ecfff8] px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] text-[#009061]">{row.mood}</span>
                <span className="rounded-full bg-[#f5f5f5] px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280]">{row.meals}</span>
                <span className="rounded-full bg-[#f5f5f5] px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280]">Nap: {row.nap}</span>
                <span className="rounded-full bg-[#f5f5f5] px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280]">{row.activity}</span>
              </div>
              {row.notes && (
                <p className="mt-2 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{row.notes}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Tab: Health Status ────────────────────────────────────────────────────────

function HealthStatusTab({ child }: { child: Child }) {
  const [growthOpen, setGrowthOpen] = useState(false);

  const healthInfo: [string, string][] = [
    ["Height", "82 cm"],
    ["Weight", "11.2 kg"],
    ["Blood Group", child.bloodGroup],
    ["Allergies", child.healthFlag ?? "None reported"],
    ["Medications", "None currently"],
    ["Medical Notes", child.healthFlag ? `Monitor for ${child.healthFlag.toLowerCase()} at all times` : "No active medical concerns"],
  ];

  const docs = [
    { name: "Allergy Action Plan.pdf", date: "Oct 5, 2025" },
    { name: "Medical Clearance.pdf", date: "Aug 3, 2025" },
  ];

  return (
    <>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-[#e6ebf3] bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">Health Information</p>
          <button
            onClick={() => setGrowthOpen(true)}
            className="font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#3b2513] underline"
          >
            Log Growth
          </button>
        </div>
        <div className="space-y-3">
          {healthInfo.map(([k, v]) => (
            <div key={k} className="flex items-start justify-between border-b border-[#f3f4f6] pb-2 last:border-0">
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{k}</span>
              <span className="max-w-[180px] text-right font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#2d1810]">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#e6ebf3] bg-white p-4">
        <p className="mb-4 font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">Prescriptions &amp; Documents</p>
        <div className="space-y-2">
          {docs.map((doc) => (
            <div key={doc.name} className="flex items-center justify-between rounded-lg border border-[#e6ebf3] p-3">
              <div className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-[#edd9c0]">
                  <FileText className="size-4 text-[#3b2513]" />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#2d1810]">{doc.name}</p>
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{doc.date}</p>
                </div>
              </div>
              <button className="font-[family-name:var(--font-urbanist)] text-xs text-[#3b2513] underline">View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    {growthOpen && (
      <LogGrowthModal previousWeight="11.2" previousHeight="82" onClose={() => setGrowthOpen(false)} />
    )}
    </>
  );
}

// ── Tab: Payment History ──────────────────────────────────────────────────────

function PaymentHistoryTab() {
  return (
    <div>
      {/* Filter toolbar */}
      <div className="mb-4 flex items-center gap-3">
        <FilterButton label="Date" />
        <FilterButton label="All Status" />
        <div className="flex items-center gap-2 rounded-lg border border-[#e6ebf3] bg-[#f5edd8] px-3 py-2">
          <Search className="h-4 w-4 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Desktop table */}
        <table className="hidden w-full border-collapse lg:table">
          <thead>
            <tr className="bg-[#edd9c0]">
              {["Room Plan", "Reference ID", "Amount", "Date", "Invoice", "Status", "Action"].map((col) => (
                <th key={col} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {childPaymentRows.map((row, i) => (
              <tr key={i} className="border-t border-[#eaecf0]">
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2d1810]">{row.plan}</span>
                    <span className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{row.boldAmount}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.ref}</td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.amount}</td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.date}</td>
                <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{row.invoice}</td>
                <td className="px-4 py-3">
                  <PaymentStatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3">
                  <button className="flex items-center gap-1.5 text-[#3b2513] hover:opacity-70">
                    <Download className="h-4 w-4" />
                    <span className="font-[family-name:var(--font-urbanist)] text-xs">Receipt</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 py-4 lg:hidden">
          {childPaymentRows.map((row, i) => (
            <div key={i} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2d1810]">{row.plan}</span>
                  <span className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{row.boldAmount}</span>
                </div>
                <PaymentStatusBadge status={row.status} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{row.date} • {row.invoice}</span>
                <button className="flex items-center gap-1.5 text-[#3b2513] hover:opacity-70">
                  <Download className="h-3.5 w-3.5" />
                  <span className="font-[family-name:var(--font-urbanist)] text-[10px]">Receipt</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Tab: Development & Behaviour ──────────────────────────────────────────────

function DevelopmentTab() {
  const milestones = [
    { milestone: "Walks independently", achieved: true },
    { milestone: "Says 10+ words", achieved: true },
    { milestone: "Follows 2-step instructions", achieved: true },
    { milestone: "Stacks 6+ blocks", achieved: false },
    { milestone: "Names 3+ body parts", achieved: true },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-[#e6ebf3] bg-white p-4">
        <p className="mb-4 font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">Development Milestones</p>
        <div className="space-y-3">
          {milestones.map((m) => (
            <div key={m.milestone} className="flex items-center gap-2">
              <span className={m.achieved ? "text-[#009061]" : "text-[#9ca3af]"}>
                {m.achieved ? "✓" : "○"}
              </span>
              <span
                className={`font-[family-name:var(--font-nunito)] text-sm ${
                  m.achieved ? "text-[#2d1810]" : "text-[#9ca3af]"
                }`}
              >
                {m.milestone}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[#e6ebf3] bg-white p-4">
        <p className="mb-4 font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">Photo Gallery</p>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-lg bg-[#edd9c0]"
            >
              <Image className="size-5 text-[#c47b2c]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Tab: Contact ──────────────────────────────────────────────────────────────

function ContactTab({ child }: { child: Child }) {
  const contacts = [
    { name: child.parentName, relationship: "Parent/Guardian", phone: "+234 801 234 5678", email: child.parentEmail, access: "Primary" as const },
    { name: "Mrs Bisi Okafor", relationship: "Aunt", phone: "+234 805 111 2233", email: "bisi.okafor@gmail.com", access: "Emergency" as const },
  ];

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex items-center gap-3 px-4 py-4">
        <h3 className="font-[family-name:var(--font-merriweather)] font-bold text-[#2d1810]">Authorized Persons</h3>
        <div className="ml-auto">
          <button className="rounded-lg px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#faf2e1]" style={{ background: "linear-gradient(135deg, rgb(59,37,19) 0%, rgb(45,24,16) 100%)" }}>
            Add Contact
          </button>
        </div>
      </div>
      <table className="hidden w-full border-collapse lg:table">
        <thead>
          <tr className="bg-[#edd9c0]">
            {["Name", "Relationship", "Phone", "Email", "Access Level", "Action"].map((col) => (
              <th key={col} className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {contacts.map((c, i) => (
            <tr key={i} className="border-t border-[#eaecf0]">
              <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{c.name}</td>
              <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{c.relationship}</td>
              <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{c.phone}</td>
              <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">{c.email}</td>
              <td className="px-4 py-3">
                {c.access === "Primary" ? (
                  <span className="inline-flex items-center rounded-full bg-[#2d1810] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#faf2e1]">
                    Primary
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-[#f59e0b] bg-[#fffbeb] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#f59e0b]">
                    Emergency
                  </span>
                )}
              </td>
              <td className="px-4 py-3">
                <button className="font-[family-name:var(--font-urbanist)] text-xs text-[#3b2513] underline hover:opacity-70">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 px-4 py-4 lg:hidden">
        {contacts.map((c, i) => (
          <div key={i} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{c.name}</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{c.relationship}</span>
              </div>
              {c.access === "Primary" ? (
                <span className="inline-flex items-center rounded-full bg-[#2d1810] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#faf2e1]">
                  Primary
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-[#f59e0b] bg-[#fffbeb] px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#f59e0b]">
                  Emergency
                </span>
              )}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-xs text-[#2d1810]">{c.phone}</span>
              <button className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#3b2513] underline hover:opacity-70">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function ChildProfileView({ child }: { child: Child }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("Overview");
  const [showAiBanner, setShowAiBanner] = useState(true);
  const [logActivityMode, setLogActivityMode] = useState<LogActivityMode | null>(null);

  const tabs: ActiveTab[] = [
    "Overview",
    "Activity Log",
    "Health Status",
    "Payment History",
    "Development & Behaviour",
    "Contact",
  ];

  const firstName = child.name.split(" ")[0];

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <Link
          href="/children"
          className="flex items-center gap-2 font-[family-name:var(--font-urbanist)] text-sm text-[#3b2513]"
        >
          <ChevronLeft className="size-4" />
          Back to Children
        </Link>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex items-center gap-1.5 rounded-lg border border-[#3b2513] px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#3b2513]" />
              }
            >
              Log Activity
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLogActivityMode("daily-report")}>Log Daily Report</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLogActivityMode("media")}>New Picture/Video</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLogActivityMode("incident")}>Log Incident</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            className="rounded-lg px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm text-[#faf2e1]"
            style={{ background: "linear-gradient(135deg, rgb(30,45,74) 0%, rgb(45,24,16) 100%)" }}
          >
            ✦ AI Parent Update
          </button>
        </div>
      </div>

      {/* Profile Banner */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgb(45,24,16) 0%, rgb(61,36,24) 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 size-40 rounded-full border border-white/10" />
        <div className="absolute -right-16 -top-16 size-64 rounded-full border border-white/5" />

        {/* Mobile layout */}
        <div className="flex flex-col items-center gap-3 px-5 py-6 sm:hidden">
          {/* Avatar */}
          <div className="flex size-16 items-center justify-center rounded-full border-2 border-[#c47b2c]/40 bg-[#c47b2c]/20">
            <span className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#faf2e1]">
              {getInitials(child.name)}
            </span>
          </div>
          {/* Info */}
          <div className="text-center">
            <span className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#c78c5f]">Child ID: {child.id}</span>
            <h2 className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#f5edd8]">{child.name}</h2>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#c78c5f]">
              {child.gender === "M" ? "Male" : "Female"} • {child.age} • Blood: {child.bloodGroup}
            </p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className={`rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_BADGE_CLASS[child.status]}`}>
                {child.status}
              </span>
              <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#c78c5f]">{child.room} Room</span>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="relative hidden h-[160px] items-center sm:flex">
          {/* Avatar */}
          <div className="absolute left-10 top-1/2 flex size-24 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#c47b2c]/40 bg-[#c47b2c]/20">
            <span className="font-[family-name:var(--font-merriweather)] text-3xl font-bold text-[#faf2e1]">
              {getInitials(child.name)}
            </span>
          </div>

          {/* Info */}
          <div className="absolute left-44 top-1/2 -translate-y-1/2">
            <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#c78c5f]">Child ID: {child.id}</span>
            <h2 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#f5edd8]">{child.name}</h2>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#c78c5f]">
              {child.gender === "M" ? "Male" : "Female"} • {child.age} • Blood: {child.bloodGroup}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_BADGE_CLASS[child.status]}`}>
                {child.status}
              </span>
              <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#c78c5f]">{child.room} Room</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Observations Banner */}
      {showAiBanner && (
        <div className="flex items-start gap-3 rounded-xl border border-[#e0bfa0] bg-[#fdf6e8] px-4 py-3">
          <span className="text-[#c47b2c]">✦</span>
          <div className="flex-1">
            <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Ada AI Observations</p>
            <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {firstName} has shown improved social engagement this week. {child.gender === "M" ? "His" : "Her"} mood score is trending up at 4.2/5. Consider scheduling a parent update to share the progress.
            </p>
          </div>
          <button onClick={() => setShowAiBanner(false)} className="text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="overflow-x-auto border-b border-[#eaecf0]">
        <div className="flex items-center gap-4 sm:gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-3 font-[family-name:var(--font-urbanist)] text-sm transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-[#3b2513] text-[#3b2513]"
                  : "text-[#6b7280] hover:text-[#3b2513]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && <OverviewTab child={child} />}
      {activeTab === "Activity Log" && <ActivityLogTab child={child} />}
      {activeTab === "Health Status" && <HealthStatusTab child={child} />}
      {activeTab === "Payment History" && <PaymentHistoryTab />}
      {activeTab === "Development & Behaviour" && <DevelopmentTab />}
      {activeTab === "Contact" && <ContactTab child={child} />}

      {logActivityMode && (
        <LogActivityModal mode={logActivityMode} child={child} onClose={() => setLogActivityMode(null)} />
      )}
    </div>
  );
}
