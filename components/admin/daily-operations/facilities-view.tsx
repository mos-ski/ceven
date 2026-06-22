"use client";

import { ChevronDown, MoreVertical, Wrench, Sparkles } from "lucide-react";
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
  CLEANING_TASKS,
  FACILITY_AREAS,
  FACILITY_ISSUES,
  type CleaningTask,
  type FacilityIssue,
  type FacilityIssuePriority,
  type FacilityIssueStatus,
} from "@/lib/mock-data/daily-operations";

const PRIORITY_BADGE_CLASS: Record<FacilityIssuePriority, string> = {
  Low: "border-transparent bg-[#f3f4f6] text-[#454B54]",
  Medium: "border-transparent bg-[#fff6e6] text-[#cc8000]",
  High: "border-transparent bg-[#fde8e8] text-[#ef4444]",
  Urgent: "border-transparent bg-[#fde8e8] text-[#ef4444]",
};

const STATUS_BADGE_CLASS: Record<FacilityIssueStatus, string> = {
  Open: "border-transparent bg-[#fde8e8] text-[#ef4444]",
  "In Progress": "border-transparent bg-[#fff6e6] text-[#cc8000]",
  Resolved: "border-transparent bg-badge-success-bg text-success-text",
};

type FacilitiesSubTab = "Maintenance" | "Cleaning Schedule";
const SUB_TABS: FacilitiesSubTab[] = ["Maintenance", "Cleaning Schedule"];

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

function NewMaintenanceRequestModal({
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
          <DialogTitle>New Maintenance Request</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Report a facility issue that needs attention.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fac-area">Area</Label>
            <select
              id="fac-area"
              defaultValue=""
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Select area
              </option>
              {FACILITY_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fac-description">Issue Description</Label>
            <textarea
              id="fac-description"
              rows={3}
              placeholder="Describe the issue..."
              className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fac-priority">Priority</Label>
              <select
                id="fac-priority"
                defaultValue="Medium"
                className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fac-assigned">Assigned To</Label>
              <Input id="fac-assigned" placeholder="e.g. External artisan" className="h-9" />
            </div>
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
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ScheduleCleaningModal({
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
          <DialogTitle>Schedule Cleaning</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Add a room to the recurring cleaning schedule.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clean-room">Room / Area</Label>
            <select
              id="clean-room"
              defaultValue=""
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Select room
              </option>
              {FACILITY_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="clean-frequency">Frequency</Label>
            <Input id="clean-frequency" placeholder="e.g. Daily (Morning - 07:00am)" className="h-9" />
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
            Save Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MaintenanceRow({ issue }: { issue: FacilityIssue }) {
  return (
    <TableRow className="border-table-border">
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
        {issue.dateReported}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{issue.area}</TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {issue.description}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={PRIORITY_BADGE_CLASS[issue.priority]}>
          {issue.priority}
        </Badge>
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {issue.reportedBy}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {issue.assignedTo}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={STATUS_BADGE_CLASS[issue.status]}>
          {issue.status}
        </Badge>
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {issue.resolvedDate ?? "—"}
      </TableCell>
      <TableCell>
        <button className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
          <MoreVertical className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}

function MaintenanceTable() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Maintenance
        </h2>
        <div className="flex items-center gap-2">
          <FilterDropdown label="All Priority" options={["All Priority", "Low", "Medium", "High", "Urgent"]} />
          <FilterDropdown label="All Status" options={["All Status", "Open", "In Progress", "Resolved"]} />
        </div>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-table-header-bg hover:bg-table-header-bg">
              <TableHead>Request Date</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Reported By</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Resolved Date</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FACILITY_ISSUES.map((issue) => (
              <MaintenanceRow key={issue.id} issue={issue} />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card list */}
      <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
        {FACILITY_ISSUES.map((issue) => (
          <div key={issue.id} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                {issue.area}
              </span>
              <Badge variant="outline" className={STATUS_BADGE_CLASS[issue.status]}>
                {issue.status}
              </Badge>
            </div>
            <p className="mt-1.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {issue.description}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <Badge variant="outline" className={PRIORITY_BADGE_CLASS[issue.priority]}>
                {issue.priority}
              </Badge>
              <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                {issue.dateReported}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CleaningCard({ task }: { task: CleaningTask }) {
  const isDone = task.status === "Done";
  return (
    <label
      className={`flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-3 ${
        isDone ? "border-[#3b2513] bg-[#fdf7ed]" : "border-[#eaecf0] bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <input type="checkbox" defaultChecked={isDone} className="mt-0.5 h-4 w-4 accent-[#3b2513]" />
        <div>
          <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{task.room}</p>
          <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{task.frequency}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge
          variant="outline"
          className={
            isDone
              ? "border-transparent bg-badge-success-bg text-success-text"
              : "border-transparent bg-[#fff6e6] text-[#cc8000]"
          }
        >
          {task.status}
        </Badge>
        {isDone && <span className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{task.time}</span>}
      </div>
    </label>
  );
}

function CleaningScheduleGrid() {
  return (
    <div className="overflow-hidden rounded-xl bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Cleaning Schedule
        </h2>
        <FilterDropdown label="All Status" options={["All Status", "Done", "Pending"]} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CLEANING_TASKS.map((task) => (
          <CleaningCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

const facilitiesStatsCards = [
  { value: String(FACILITY_ISSUES.filter((i) => i.status !== "Resolved").length).padStart(2, "0"), label: "need attention", title: "Open Request" },
  { value: String(FACILITY_ISSUES.filter((i) => i.status === "Resolved").length).padStart(2, "0"), label: "this month", title: "Resolved This Month" },
  { value: String(FACILITY_ISSUES.filter((i) => i.status === "In Progress").length).padStart(2, "0"), label: "in progress", title: "Ongoing Maintenance" },
  { value: "00", label: "scheduled", title: "Next Planned Services" },
];

export function FacilitiesView() {
  const [subTab, setSubTab] = useState<FacilitiesSubTab>("Maintenance");
  const [requestOpen, setRequestOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        {subTab === "Maintenance" ? (
          <Button
            onClick={() => setRequestOpen(true)}
            className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
          >
            <Wrench className="h-4 w-4" />
            New Maintenance Request
          </Button>
        ) : (
          <Button
            onClick={() => setScheduleOpen(true)}
            className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
          >
            <Sparkles className="h-4 w-4" />
            Schedule Cleaning
          </Button>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {facilitiesStatsCards.map((card) => (
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

      {subTab === "Maintenance" ? <MaintenanceTable /> : <CleaningScheduleGrid />}

      <NewMaintenanceRequestModal open={requestOpen} onOpenChange={setRequestOpen} />
      <ScheduleCleaningModal open={scheduleOpen} onOpenChange={setScheduleOpen} />
    </div>
  );
}
