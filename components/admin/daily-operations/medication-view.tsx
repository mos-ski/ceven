"use client";

import { ChevronDown, MoreVertical, Search } from "lucide-react";
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
import { TableCell, TableRow } from "@/components/ui/table";
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

function FilterDropdown({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: string[];
  onSelect?: (option: string) => void;
}) {
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
          <DropdownMenuItem key={option} onClick={() => onSelect?.(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LogMedicationModal({
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
          <DialogTitle>Log Medication</DialogTitle>
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

function ViewMedicationModal({
  entry,
  onOpenChange,
}: {
  entry: MedicationEntry | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <Dialog
      open={entry !== null}
      onOpenChange={(open) => {
        if (!open) setShowHistory(false);
        onOpenChange(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Details</DialogTitle>
        </DialogHeader>

        {entry && (
          <>
            <div className="flex items-center justify-between gap-4 bg-[#faf2e1] px-6 py-4">
              <div>
                <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-black">{entry.child}</p>
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{entry.room}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Status</span>
                <Badge variant="outline" className={STATUS_BADGE_CLASS[entry.status]}>
                  ● {entry.status}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-6 px-6 py-5">
              {[
                ["Medication", entry.medication],
                ["Dose", entry.dosage],
                ["Frequency", entry.frequency],
                ["Attended By", entry.administeredBy ?? "—"],
                ["Time", entry.scheduledTime],
                ["Additional Note", entry.note || "—"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-[52px]">
                  <p className="w-[156px] shrink-0 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#6b7280]">
                    {label}
                  </p>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#1f2937]">{value}</p>
                </div>
              ))}

              {entry.history.length > 0 && (
                <div className="flex flex-col gap-2 pt-4">
                  <button
                    onClick={() => setShowHistory((v) => !v)}
                    className="self-start font-[family-name:var(--font-urbanist)] text-xs font-medium text-black underline"
                  >
                    {showHistory ? "Close Past Medications" : "View Past Medications"}
                  </button>
                  {showHistory && (
                    <div className="overflow-hidden rounded-lg">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-[#f4f5f6]">
                            {["Date", "Time", "Medication", "Dose", "Attended by"].map((h) => (
                              <th key={h} className="px-4 py-2 text-left font-[family-name:var(--font-urbanist)] text-xs font-medium text-black">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {entry.history.map((h, i) => (
                            <tr key={i}>
                              <td className="px-4 py-2 font-[family-name:var(--font-urbanist)] text-xs text-black">{h.date}</td>
                              <td className="px-4 py-2 font-[family-name:var(--font-urbanist)] text-xs text-black">{h.time}</td>
                              <td className="px-4 py-2 font-[family-name:var(--font-urbanist)] text-xs text-black">{h.medication}</td>
                              <td className="px-4 py-2 font-[family-name:var(--font-urbanist)] text-xs text-black">{h.dosage}</td>
                              <td className="px-4 py-2 font-[family-name:var(--font-urbanist)] text-xs text-black">{h.attendedBy}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function MedicationRow({ entry, onView }: { entry: MedicationEntry; onView: (entry: MedicationEntry) => void }) {
  return (
    <TableRow onClick={() => onView(entry)} className="cursor-pointer border-table-border">
      <TableCell>
        <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
          {entry.child}
        </p>
        <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
          {entry.room}
        </p>
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {entry.medication}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {entry.dosage}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {entry.frequency}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {entry.administeredBy ?? "—"}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {entry.scheduledTime}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={STATUS_BADGE_CLASS[entry.status]}>
          ● {entry.status === "Scheduled" ? "Due Soon" : entry.status}
        </Badge>
      </TableCell>
      <TableCell>
        <button onClick={() => onView(entry)} className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
          <MoreVertical className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}

export function MedicationView() {
  const [logOpen, setLogOpen] = useState(false);
  const [viewingEntry, setViewingEntry] = useState<MedicationEntry | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredMedications = MEDICATIONS.filter((entry) => {
    if (statusFilter !== "All Status" && entry.status !== statusFilter) return false;
    const query = search.trim().toLowerCase();
    if (query && !entry.child.toLowerCase().includes(query) && !entry.medication.toLowerCase().includes(query)) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setLogOpen(true)}
          className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
        >
          Log Medication
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Medication Log
          </h2>
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Filter by:</span>
            <FilterDropdown label="Date" options={["All Dates", "Today", "This Week", "This Month"]} />
            <FilterDropdown label={statusFilter} options={["All Status", "Administered", "Scheduled", "Missed"]} onSelect={setStatusFilter} />
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search children, parents..."
                className="h-8 w-full sm:w-56 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#edd9c0]">
                {["Child", "Medication", "Dose", "Frequency", "Attended by", "Time", "Status", "Action"].map((h) => (
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
              {filteredMedications.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                    No medications match your search or filters.
                  </td>
                </tr>
              ) : (
                filteredMedications.map((entry) => (
                  <MedicationRow key={entry.id} entry={entry} onView={setViewingEntry} />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {filteredMedications.length === 0 && (
            <p className="py-6 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
              No medications match your search or filters.
            </p>
          )}
          {filteredMedications.map((entry) => (
            <div
              key={entry.id}
              onClick={() => setViewingEntry(entry)}
              className="cursor-pointer rounded-xl border border-[#eaecf0] p-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                    {entry.child}
                  </span>
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{entry.room}</p>
                </div>
                <Badge variant="outline" className={STATUS_BADGE_CLASS[entry.status]}>
                  ● {entry.status === "Scheduled" ? "Due Soon" : entry.status}
                </Badge>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{entry.medication}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{entry.dosage}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{entry.scheduledTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LogMedicationModal open={logOpen} onOpenChange={setLogOpen} />
      <ViewMedicationModal entry={viewingEntry} onOpenChange={(open) => !open && setViewingEntry(null)} />
    </div>
  );
}
