"use client";

import { ChevronDown, MoreVertical, Pill, Search } from "lucide-react";
import { useState } from "react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MEDICATIONS,
  MEDICATION_OPTIONS,
  type MedicationEntry,
  type MedicationStatus,
} from "@/lib/mock-data/daily-operations";

const STATUS_BADGE_CLASS: Record<MedicationStatus, string> = {
  Scheduled: "border-transparent bg-[#fff6e6] text-[#cc8000]",
  Administered: "border-transparent bg-badge-success-bg text-success-text",
  Missed: "border-transparent bg-[#fde8e8] text-[#ef4444]",
};

function FilterDropdown({ label, options }: { label: string; options: string[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="h-8 gap-2 rounded-lg border-input-border bg-white px-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#454B54]"
          />
        }
      >
        {label}
        <ChevronDown className="size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LogDoseModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log Medication Dose</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Record a medication administered to a child.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="med-child">Child</Label>
            <select
              id="med-child"
              defaultValue=""
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Select a child
              </option>
              {MEDICATIONS.map((m) => (
                <option key={m.id} value={m.child}>
                  {m.child}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="med-name">Medication</Label>
              <select
                id="med-name"
                defaultValue=""
                className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              >
                <option value="" disabled>
                  Select medication
                </option>
                {MEDICATION_OPTIONS.map((med) => (
                  <option key={med} value={med}>
                    {med}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="med-dosage">Dosage</Label>
              <Input id="med-dosage" placeholder="e.g. 5ml" className="h-9" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="med-time">Time Administered</Label>
              <Input id="med-time" type="time" className="h-9" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="med-status">Status</Label>
              <select
                id="med-status"
                defaultValue="Administered"
                className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              >
                <option value="Administered">Administered</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Missed">Missed</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="med-notes">Notes</Label>
            <textarea
              id="med-notes"
              rows={3}
              placeholder="Any observations or reactions..."
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
            Save Log
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MedicationRow({ entry }: { entry: MedicationEntry }) {
  return (
    <TableRow className="border-table-border">
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
        {entry.child}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {entry.room}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {entry.medication}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {entry.dosage}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {entry.scheduledTime}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {entry.administeredBy ?? "—"}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={STATUS_BADGE_CLASS[entry.status]}>
          {entry.status}
        </Badge>
      </TableCell>
      <TableCell>
        <button className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
          <MoreVertical className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}

const statsCards = [
  { value: String(MEDICATIONS.length).padStart(2, "0"), label: "scheduled today", title: "Total Doses" },
  { value: String(MEDICATIONS.filter((m) => m.status === "Administered").length).padStart(2, "0"), label: "given on time", title: "Administered" },
  { value: String(MEDICATIONS.filter((m) => m.status === "Scheduled").length).padStart(2, "0"), label: "still due", title: "Pending" },
  { value: String(MEDICATIONS.filter((m) => m.status === "Missed").length).padStart(2, "0"), label: "need follow-up", title: "Missed" },
];

export function MedicationView() {
  const [logOpen, setLogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setLogOpen(true)}
          className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
        >
          <Pill className="h-4 w-4" />
          Log Dose
        </Button>
      </div>

      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className="min-w-[160px] snap-start flex-1 flex-col gap-1 rounded-xl border border-[#e6ebf3] bg-white p-4"
          >
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{card.title}</p>
            <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {card.value}
            </p>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Medication Schedule
          </h2>
          <div className="flex items-center gap-2">
            <FilterDropdown label="All Rooms" options={["All Rooms", "Lion Class", "Tiger Class", "Bear Class", "Owl Class"]} />
            <FilterDropdown label="All Status" options={["All Status", "Scheduled", "Administered", "Missed"]} />
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
              <Input
                placeholder="Search medications..."
                className="h-8 w-full sm:w-56 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <Table>
            <TableHeader>
              <TableRow className="border-none bg-table-header-bg hover:bg-table-header-bg">
                <TableHead>Child</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Medication</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Scheduled Time</TableHead>
                <TableHead>Administered By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MEDICATIONS.map((entry) => (
                <MedicationRow key={entry.id} entry={entry} />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {MEDICATIONS.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  {entry.child}
                </span>
                <Badge variant="outline" className={STATUS_BADGE_CLASS[entry.status]}>
                  {entry.status}
                </Badge>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{entry.medication}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{entry.dosage}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{entry.scheduledTime}</span>
              </div>
              <p className="mt-1 font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                {entry.room}{entry.administeredBy ? ` • by ${entry.administeredBy}` : ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      <LogDoseModal open={logOpen} onOpenChange={setLogOpen} />
    </div>
  );
}
