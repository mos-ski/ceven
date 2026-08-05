"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
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
import { QRDisplay } from "@/components/attendance/qr-display";
import { LiveFeed } from "@/components/attendance/live-feed";
import { AttendanceGrid } from "@/components/attendance/attendance-grid";
import { useAttendance } from "@/lib/attendance/store";
import { getRandomParent, getRandomStaff, getAuthorizedPickup } from "@/lib/attendance/mock-scan";
import { CHILDREN } from "@/lib/mock-data/children";
import { STAFF } from "@/lib/mock-data/staff";

const CHECK_IN_ACTIONS = ["Check In", "Check Out"];
const EXCEPTION_TYPES = ["Late pickup", "Unauthorized pickup", "No ID presented", "QR scanner offline", "Other"];

function ManualCheckInModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manual Check-In</DialogTitle>
          <p className="font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
            Record a check-in or check-out manually.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="checkin-action">Action</Label>
            <select
              id="checkin-action"
              defaultValue=""
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
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
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
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
              className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="outline"
                className="h-9 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]"
              />
            }
          >
            Cancel
          </DialogClose>
          <Button
            onClick={() => onOpenChange(false)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
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
          <p className="font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
            Record an attendance exception for a staff member or child.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="exception-person">Person</Label>
            <select
              id="exception-person"
              value={personType}
              onChange={(e) => setPersonType(e.target.value as "Staff" | "Child")}
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
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
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
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
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
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
              className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="outline"
                className="h-9 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]"
              />
            }
          >
            Cancel
          </DialogClose>
          <Button
            onClick={() => onOpenChange(false)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
          >
            Log Exception
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ReceptionV3Page() {
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
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Reception / QR"
        description="Live QR check-in station — track today's attendance, exceptions, and manual overrides."
        action={
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={simulateParentScan}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-lg border border-[#009061] bg-[#ecfff8] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#009061]"
            >
              <Zap className="h-4 w-4" />
              Simulate Parent Scan
            </button>
            <button
              onClick={simulateStaffScan}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-lg border border-[#c47b2c] bg-[#fffbf0] px-4 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#c47b2c]"
            >
              <Zap className="h-4 w-4" />
              Simulate Staff Scan
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
        }
      />

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left panel — real QR display (35%), incl. today's check-in/out/exception counts */}
        <div className="w-full lg:w-[35%] shrink-0">
          <QRDisplay />
        </div>

        {/* Right panel — real live feed + exceptions + attendance grid (65%) */}
        <div className="flex w-full lg:flex-1 flex-col gap-5">
          <LiveFeed />
          <AttendanceGrid />
        </div>
      </div>

      <ManualCheckInModal open={checkInOpen} onOpenChange={setCheckInOpen} />
      <LogExceptionModal open={exceptionOpen} onOpenChange={setExceptionOpen} />
    </div>
  );
}
