"use client";

import { Suspense } from "react";
import { ChevronDown, Download, Printer, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { FacilitiesView } from "@/components/admin/daily-operations/facilities-view";
import { HealthIncidentsView } from "@/components/admin/daily-operations/health-incidents-view";
import { InventoryView } from "@/components/admin/daily-operations/inventory-view";
import { MedicationView } from "@/components/admin/daily-operations/medication-view";
import { TasksView } from "@/components/admin/daily-operations/tasks-view";

// ── Types ─────────────────────────────────────────────────────────────────────

type View = "qr" | "logs";

type FeedRow = {
  initials: string;
  name: string;
  role: string;
  time: string;
  status: "IN" | "OUT";
};

type GridCard = {
  initials: string;
  name: string;
  cls: string;
  time: string;
  type: "IN" | "Absent" | "Pending";
};

// ── Static data ───────────────────────────────────────────────────────────────

const feedRows: FeedRow[] = [
  { initials: "SO", name: "Mrs. Sarah Okonkwo", role: "Caregiver", time: "9:14 AM", status: "IN" },
  { initials: "JA", name: "Mr. James Adamu", role: "Marketer", time: "9:02 AM", status: "IN" },
  { initials: "NE", name: "Mrs. Ngozi Eze", role: "Caregiver", time: "8:55 AM", status: "OUT" },
];

const gridCards: GridCard[] = [
  { initials: "SO", name: "Mrs. Sarah", cls: "Lion Class", time: "9:14 AM", type: "IN" },
  { initials: "JA", name: "Mr. James", cls: "Tiger Class", time: "9:02 AM", type: "IN" },
  { initials: "NE", name: "Mrs. Ngozi", cls: "Bear Class", time: "-", type: "Absent" },
  { initials: "CB", name: "Mr. Chukwu", cls: "Owl Class", time: "-", type: "Pending" },
  { initials: "AT", name: "Mrs. Amaka", cls: "Lion Class", time: "8:45 AM", type: "IN" },
  { initials: "FK", name: "Mr. Femi", cls: "Tiger Class", time: "-", type: "Absent" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function cardStyle(type: GridCard["type"]) {
  if (type === "IN") return { border: "#85ffd7", bg: "#f0fff9" };
  if (type === "Absent") return { border: "#fe7171", bg: "#fff5f5" };
  return { border: "#ffd58f", bg: "#fffbf0" };
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-1.5 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
      {label}
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  );
}

// ── VIEW 1: Reception QR Station ──────────────────────────────────────────────

function QRStationView() {
  return (
    <div className="flex flex-col gap-4">
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
        <button className="flex-1 sm:flex-initial rounded-lg border border-[#3b2513] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513]">
          Log Exception
        </button>
        <button className="flex-1 sm:flex-initial rounded-lg bg-[#3b2513] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]">
          Manual Check-In
        </button>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left panel */}
        <div className="flex flex-1 flex-col gap-6 rounded-2xl bg-[#3b2513] p-6">
          {/* Creche name row */}
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#faf2e1]">
              Udebem Cresh
            </span>
            <span className="rounded-full border border-[#009061] bg-[#ecfff8] px-2 py-0.5 text-xs text-[#009061]">
              Active
            </span>
          </div>

          {/* QR code placeholder */}
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-xl bg-white p-4">
            <div className="flex h-[120px] w-[120px] items-center justify-center rounded bg-[#e0e0e0]">
              <span className="text-center text-xs text-[#9ca3af]">QR Code</span>
            </div>
          </div>

          {/* Download / Print */}
          <div className="flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#bab68d] px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513]">
              <Download className="h-4 w-4" />
              Download
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#faf2e1]/40 px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]">
              <Printer className="h-4 w-4" />
              Print
            </button>
          </div>

          {/* Help text */}
          <p className="text-center text-sm text-[#faf2e1]/60">
            Scan QR code with your phone or enter login code
          </p>

          {/* Activity bar */}
          <div className="flex justify-around rounded-xl bg-[#5b391e] p-4">
            {[
              { label: "CHECK-INs", value: "02" },
              { label: "CHECK-OUTs", value: "00" },
              { label: "EXCEPTIONS", value: "00" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <span className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#faf2e1]">
                  {item.value}
                </span>
                <span className="text-xs text-[#faf2e1]/60">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex w-full lg:w-[400px] flex-col gap-4">
          {/* Live Feed card */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
                Live Scanned Feed
              </span>
              <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] text-red-500">
                ● Live
              </span>
            </div>

            <div className="flex flex-col">
              {feedRows.map((row, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-[#f3f4f6] py-2.5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
                      {row.initials}
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#2d1810]">
                        {row.name}
                      </p>
                      <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280]">
                        {row.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#9ca3af]">
                      {row.time}
                    </span>
                    <span className="rounded-full bg-[#edd9c0] px-3 py-1 font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#3b2513]">
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Grid card */}
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
              Attendance Grid
            </span>

            {/* Search bar */}
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f5edd8] px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent font-[family-name:var(--font-urbanist)] text-xs text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none"
              />
            </div>

            {/* Filter bar */}
            <div className="mb-4 mt-3 flex gap-2">
              <FilterDropdown label="All Rooms" />
              <FilterDropdown label="All Users" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {gridCards.map((card, i) => {
                const style = cardStyle(card.type);
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-1.5 rounded-xl border p-3"
                    style={{ borderColor: style.border, backgroundColor: style.bg }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
                      {card.initials}
                    </div>
                    <p className="font-[family-name:var(--font-nunito)] text-xs font-bold text-[#2d1810]">
                      {card.name}
                    </p>
                    <p className="text-[10px] text-[#6b7280]">{card.cls}</p>
                    <p className="text-[10px] text-[#9ca3af]">{card.time}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── VIEW 2: Daily Logs ────────────────────────────────────────────────────────

type DailyLogStatus = "Done" | "AI Flag" | "Pending" | null;

type DailyLogRow = {
  child: string;
  childInfo: string;
  room: string;
  caregiver: string;
  reportTime: string;
  mood: string;
  meal: string;
  status: DailyLogStatus;
};

const dailyLogStatsCards = [
  { value: "40", title: "Submitted Today" },
  { value: "10", title: "Pending Today", subtitle: "Room 1 • Room 2 • Room 3" },
  { value: "78%", title: "Today's Compliance" },
];

const dailyLogRows: DailyLogRow[] = [
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "😊 Happy", meal: "Finished all breakfast and lunch", status: "Done" },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "😊 Happy", meal: "Finished all breakfast and lunch", status: "Done" },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "😊 Happy", meal: "--", status: "AI Flag" },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "😊 Happy", meal: "--", status: "Pending" },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "--", meal: "--", status: null },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "--", meal: "--", status: null },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "--", meal: "--", status: null },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "--", meal: "--", status: null },
];

function DailyLogStatusBadge({ status }: { status: DailyLogStatus }) {
  if (status === "Done")
    return <span className="inline-flex items-center gap-1 rounded-full bg-[#e6f9ee] px-2.5 py-1 font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#009061]">● Done</span>;
  if (status === "AI Flag")
    return <span className="inline-flex items-center gap-1 rounded-full bg-[#f3f4f6] px-2.5 py-1 font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#454B54]">● AI Flag</span>;
  if (status === "Pending")
    return <span className="inline-flex items-center gap-1 rounded-full bg-[#fff6e6] px-2.5 py-1 font-[family-name:var(--font-urbanist)] text-xs font-medium text-[#cc8000]">● Pending</span>;
  return <span className="text-[#9ca3af]">--</span>;
}

function DailyLogsView() {
  return (
    <div className="flex flex-col gap-4">
      {/* Remind button */}
      <div className="flex justify-end">
        <button className="rounded-lg border border-[#3b2513] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513] hover:bg-[#3b2513]/5">
          Remind Caregivers
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-3 lg:gap-4 lg:grid-cols-3">
        {dailyLogStatsCards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col gap-1 rounded-xl border border-[#e6ebf3] bg-white p-4"
          >
            <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{card.title}</p>
            <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {card.value}
            </p>
            {card.subtitle && (
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{card.subtitle}</p>
            )}
          </div>
        ))}
      </div>

      {/* AI Insights Banner */}
      <div className="flex items-center gap-3 rounded-xl border border-[#e0bfa0] bg-[#fdf6e8] px-4 py-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#e0bfa0] px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] font-medium text-[#3b2513]">
          ✦ AI Insights
        </span>
        <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
          ⚠ Lion and Dolphin rooms have not submitted today. AI has notified caregivers.
        </p>
        <button className="ml-auto text-[#9ca3af] hover:text-[#6b7280]">✕</button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4">
          <span className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
            Today&apos;s Report Status
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Filter by:</span>
            <FilterDropdown label="All Status" />
            <FilterDropdown label="All Room" />
            <FilterDropdown label="Date" />
            <div className="flex items-center gap-2 rounded-lg border border-[#e6ebf3] bg-white px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search children, parents..."
                className="font-[family-name:var(--font-urbanist)] text-xs text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="h-4 w-4 accent-[#3b2513]" />
                </th>
                {["Child", "Room", "Caregiver", "Report Time", "Mood", "Meal", "Status", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-normal text-black"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {dailyLogRows.map((row, i) => (
                <tr key={i} className="border-t border-[#eaecf0]">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 accent-[#3b2513]" />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{row.child}</p>
                    <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{row.childInfo}</p>
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    {row.room}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    {row.caregiver}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    {row.reportTime}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    {row.mood}
                  </td>
                  <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                    {row.meal}
                  </td>
                  <td className="px-4 py-3">
                    <DailyLogStatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3">
                    {row.status === "Done" || row.status === "AI Flag" ? (
                      <button className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513] underline">
                        View
                      </button>
                    ) : row.status === "Pending" ? (
                      <button className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513] underline">
                        Log Now
                      </button>
                    ) : (
                      <button className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513] underline">
                        Log Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {dailyLogRows.map((row, i) => (
            <div key={i} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{row.child}</span>
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{row.childInfo}</p>
                </div>
                <DailyLogStatusBadge status={row.status} />
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{row.room}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{row.caregiver}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{row.reportTime}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#eaecf0] px-4 py-3">
          <button className="flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-sm text-[#9ca3af] hover:text-[#2d1810]">
            ← Previous
          </button>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 8, 9, 10].map((p, i) => (
              <button
                key={i}
                className={`h-8 w-8 rounded-lg text-sm font-medium font-[family-name:var(--font-urbanist)] ${
                  p === 1
                    ? "bg-[#3b2513] text-[#faf2e1]"
                    : "text-[#6b7280] hover:bg-[#f3f4f6]"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1 font-[family-name:var(--font-urbanist)] text-sm text-[#3b2513] font-medium hover:opacity-80">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const SECTION_TITLES: Record<string, string> = {
  "health-incidents": "Health & Incidents",
  medication: "Medications",
  "inventory-supplies": "Inventory & Supplies",
  facilities: "Facilities",
  tasks: "Tasks",
};

function DailyOperationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const view: View = tab === "daily-logs" ? "logs" : "qr";

  function setView(next: View) {
    router.push(next === "logs" ? "/daily-operations?tab=daily-logs" : "/daily-operations");
  }

  if (tab && tab in SECTION_TITLES) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
          {SECTION_TITLES[tab]}
        </h1>
        {tab === "health-incidents" && <HealthIncidentsView />}
        {tab === "medication" && <MedicationView />}
        {tab === "inventory-supplies" && <InventoryView />}
        {tab === "facilities" && <FacilitiesView />}
        {tab === "tasks" && <TasksView />}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
          Daily Operations
        </h1>

        {/* View toggle pill group */}
        <div className="flex gap-1 rounded-xl bg-[#f5edd8] p-1">
          <button
            onClick={() => setView("qr")}
            className={`flex-1 rounded-lg px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium ${
              view === "qr"
                ? "bg-[#3b2513] text-[#faf2e1]"
                : "border border-[#e6ebf3] bg-white text-[#6b7280]"
            }`}
          >
            Reception QR Station
          </button>
          <button
            onClick={() => setView("logs")}
            className={`flex-1 rounded-lg px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium ${
              view === "logs"
                ? "bg-[#3b2513] text-[#faf2e1]"
                : "border border-[#e6ebf3] bg-white text-[#6b7280]"
            }`}
          >
            Daily Logs
          </button>
        </div>
      </div>

      {/* View content */}
      {view === "qr" ? <QRStationView /> : <DailyLogsView />}
    </div>
  );
}

export default function DailyOperationsPage() {
  return (
    <Suspense>
      <DailyOperationsContent />
    </Suspense>
  );
}
