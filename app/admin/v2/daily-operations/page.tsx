"use client";

import { Suspense, useState } from "react";
import { ChevronDown, Download, Printer, Search, Zap } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FacilitiesView } from "@/components/admin/daily-operations/facilities-view";
import { HealthIncidentsView } from "@/components/admin/daily-operations/health-incidents-view";
import { InventoryView } from "@/components/admin/daily-operations/inventory-view";
import { MedicationView } from "@/components/admin/daily-operations/medication-view";
import { TasksView } from "@/components/admin/daily-operations/tasks-view";
import { QRDisplay } from "@/components/attendance/qr-display";
import { LiveFeed } from "@/components/attendance/live-feed";
import { AttendanceGrid } from "@/components/attendance/attendance-grid";
import { useAttendance } from "@/lib/attendance/store";
import { getRandomParent, getRandomStaff, getAuthorizedPickup } from "@/lib/attendance/mock-scan";
import { CHILDREN } from "@/lib/mock-data/children";
import { STAFF } from "@/lib/mock-data/staff";

// ── Types ─────────────────────────────────────────────────────────────────────

type View = "qr" | "logs";

// ── Helpers ───────────────────────────────────────────────────────────────────

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-1.5 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
      {label}
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  );
}

// ── VIEW 1: Reception QR Station ──────────────────────────────────────────────

const CHECK_IN_ACTIONS = ["Check In", "Check Out"];
const EXCEPTION_TYPES = ["Late pickup", "Unauthorized pickup", "No ID presented", "QR scanner offline", "Other"];

function ManualCheckInModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Check-In</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Check in manually for one or 2 reasons
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="checkin-action">Action</Label>
            <select
              id="checkin-action"
              defaultValue=""
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Select
              </option>
              {CHECK_IN_ACTIONS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="checkin-name">Name</Label>
            <select
              id="checkin-name"
              defaultValue=""
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Child Name
              </option>
              {CHILDREN.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="checkin-time">Time</Label>
            <Input id="checkin-time" type="time" className="h-9" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="checkin-reason">Reason For Override</Label>
            <textarea
              id="checkin-reason"
              rows={3}
              placeholder="Why this check-in is being recorded manually..."
              className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="outline"
                className="h-9 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]"
              />
            }
          >
            Cancel
          </DialogClose>
          <Button
            onClick={() => onOpenChange(false)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Confirm and Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function LogExceptionModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [personType, setPersonType] = useState<"Staff" | "Child">("Staff");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Exception</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Check in manually for one or 2 reasons
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="exception-person">Person</Label>
            <select
              id="exception-person"
              value={personType}
              onChange={(e) => setPersonType(e.target.value as "Staff" | "Child")}
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="Staff">Staff</option>
              <option value="Child">Child</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="exception-name">Name</Label>
            <select
              id="exception-name"
              defaultValue=""
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Person&apos;s name
              </option>
              {(personType === "Staff" ? STAFF : CHILDREN).map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="exception-type">Exception Type</Label>
            <select
              id="exception-type"
              defaultValue=""
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Select
              </option>
              {EXCEPTION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="exception-time">Time</Label>
            <Input id="exception-time" type="time" className="h-9" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="exception-note">Additional Note</Label>
            <textarea
              id="exception-note"
              rows={3}
              placeholder="Describe the exception..."
              className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="outline"
                className="h-9 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]"
              />
            }
          >
            Cancel
          </DialogClose>
          <Button
            onClick={() => onOpenChange(false)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            Log Exception
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function QRStationView() {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [exceptionOpen, setExceptionOpen] = useState(false);
  const { dispatch } = useAttendance();

  function simulateParentScan() {
    const parent = getRandomParent();
    const childId = parent.childIds[Math.floor(Math.random() * parent.childIds.length)];
    const authorized = getAuthorizedPickup(childId);
    dispatch({
      type: "LOG_CHILD_ATTENDANCE",
      childId,
      actorId: parent.id,
      actorName: parent.name,
      authorizedPickup: authorized,
    });
  }

  function simulateStaffScan() {
    const staff = getRandomStaff();
    dispatch({
      type: "LOG_STAFF_ATTENDANCE",
      staffId: staff.id,
      staffName: staff.name,
      staffRole: staff.staffRole,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
        <button
          onClick={simulateParentScan}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-lg border border-[#009061] bg-[#ecfff8] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#009061]"
        >
          <Zap className="h-4 w-4" />
          Simulate Parent Scan
          <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-500 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-white">
            New
          </span>
        </button>
        <button
          onClick={simulateStaffScan}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-lg border border-[#c47b2c] bg-[#fffbf0] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#c47b2c]"
        >
          <Zap className="h-4 w-4" />
          Simulate Staff Scan
          <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-500 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-white">
            New
          </span>
        </button>
        <button
          onClick={() => setExceptionOpen(true)}
          className="flex-1 sm:flex-initial rounded-lg border border-[#3b2513] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#3b2513]"
        >
          Log Exception
        </button>
        <button
          onClick={() => setCheckInOpen(true)}
          className="flex-1 sm:flex-initial rounded-lg bg-[#3b2513] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
        >
          Manual Check-In
        </button>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left panel — real QR display */}
        <QRDisplay />

        {/* Right panel — real live feed + grid */}
        <div className="flex w-full lg:w-[400px] flex-col gap-4">
          <LiveFeed />
          <AttendanceGrid />
        </div>
      </div>

      <ManualCheckInModal open={checkInOpen} onOpenChange={setCheckInOpen} />
      <LogExceptionModal open={exceptionOpen} onOpenChange={setExceptionOpen} />
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
  napTime: string;
  hygiene: string;
  health: string;
  note: string;
  status: DailyLogStatus;
};

const dailyLogStatsCards = [
  { value: "40", title: "Submitted Today" },
  { value: "10", title: "Pending Today", subtitle: "Room 1 • Room 2 • Room 3" },
  { value: "78%", title: "Today's Compliance" },
];

const dailyLogRows: DailyLogRow[] = [
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "😊 Happy", meal: "Finished all breakfast and lunch", napTime: "11:00am • 01:20pm", hygiene: "2 nappy changes, no concerns", health: "No medication administered", note: "Settled quickly after nap, in great spirits all day.", status: "Done" },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "😊 Happy", meal: "Finished all breakfast and lunch", napTime: "11:00am • 01:20pm", hygiene: "2 nappy changes, no concerns", health: "No medication administered", note: "Settled quickly after nap, in great spirits all day.", status: "Done" },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "😊 Happy", meal: "--", napTime: "--", hygiene: "1 nappy change", health: "Vitamin D administered", note: "AI flagged: meal not logged for lunch.", status: "AI Flag" },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "😊 Happy", meal: "--", napTime: "--", hygiene: "--", health: "--", note: "Report not yet submitted.", status: "Pending" },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "--", meal: "--", napTime: "--", hygiene: "--", health: "--", note: "", status: null },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "--", meal: "--", napTime: "--", hygiene: "--", health: "--", note: "", status: null },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "--", meal: "--", napTime: "--", hygiene: "--", health: "--", note: "", status: null },
  { child: "King Andrew", childInfo: "M • 1year 2mnts", room: "Lion", caregiver: "Mr Ben Ayadi", reportTime: "08:20AM", mood: "--", meal: "--", napTime: "--", hygiene: "--", health: "--", note: "", status: null },
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

function DailyReportDetailsModal({
  row,
  onOpenChange,
}: {
  row: DailyLogRow | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={row !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Details</DialogTitle>
        </DialogHeader>

        {row && (
          <>
            <div className="flex items-center justify-between gap-4 bg-[#faf2e1] px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-full bg-[#edd9c0]" />
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-black">{row.child}</p>
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{row.childInfo}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Status</span>
                <Badge variant="outline" className="border-transparent bg-badge-success-bg text-success-text">
                  ● {row.status}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-6 px-6 py-5">
              {[
                ["Mood", row.mood],
                ["Meal", row.meal],
                ["Nap Time", row.napTime],
                ["Hygiene", row.hygiene],
                ["Health", row.health],
                ["Note", row.note || "—"],
                ["Caregiver", row.caregiver],
                ["Report Time", row.reportTime],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-[52px]">
                  <p className="w-[156px] shrink-0 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#6b7280]">
                    {label}
                  </p>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#1f2937]">{value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function DailyLogsView() {
  const [viewingRow, setViewingRow] = useState<DailyLogRow | null>(null);

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
                      <button
                        onClick={() => setViewingRow(row)}
                        className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513] underline"
                      >
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
            <div
              key={i}
              onClick={() => (row.status === "Done" || row.status === "AI Flag") && setViewingRow(row)}
              className={`rounded-xl border border-[#eaecf0] p-3 ${row.status === "Done" || row.status === "AI Flag" ? "cursor-pointer" : ""}`}
            >
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

      <DailyReportDetailsModal row={viewingRow} onOpenChange={(open) => !open && setViewingRow(null)} />
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
    router.push(next === "logs" ? "/admin/v2/daily-operations?tab=daily-logs" : "/admin/v2/daily-operations");
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
