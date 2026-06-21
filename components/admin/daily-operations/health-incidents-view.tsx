"use client";

import { AlertTriangle, ChevronDown, MoreVertical, Search } from "lucide-react";
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
  INCIDENTS,
  INCIDENT_TYPES,
  type Incident,
  type IncidentSeverity,
  type IncidentStatus,
} from "@/lib/mock-data/daily-operations";

const SEVERITY_BADGE_CLASS: Record<IncidentSeverity, string> = {
  Minor: "border-transparent bg-[#fff6e6] text-[#cc8000]",
  Moderate: "border-transparent bg-[#fff0e6] text-[#e2622a]",
  Severe: "border-transparent bg-[#fde8e8] text-[#ef4444]",
};

const STATUS_BADGE_CLASS: Record<IncidentStatus, string> = {
  Open: "border-transparent bg-[#fde8e8] text-[#ef4444]",
  "Under Review": "border-transparent bg-[#fff6e6] text-[#cc8000]",
  Resolved: "border-transparent bg-badge-success-bg text-success-text",
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

function ReportIncidentModal({
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
          <DialogTitle>Report Incident</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Log a health or safety incident involving a child.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="incident-child">Child</Label>
            <select
              id="incident-child"
              defaultValue=""
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Select a child
              </option>
              {INCIDENTS.map((inc) => (
                <option key={inc.id} value={inc.child}>
                  {inc.child}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="incident-type">Incident Type</Label>
              <select
                id="incident-type"
                defaultValue=""
                className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              >
                <option value="" disabled>
                  Select type
                </option>
                {INCIDENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="incident-severity">Severity</Label>
              <select
                id="incident-severity"
                defaultValue="Minor"
                className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
              >
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="incident-time">Time of Incident</Label>
            <Input id="incident-time" type="time" className="h-9" />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="incident-description">Description</Label>
            <textarea
              id="incident-description"
              rows={4}
              placeholder="Describe what happened, actions taken, and any follow-up required..."
              className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="incident-notify" className="h-4 w-4 accent-[#3b2513]" />
            <Label htmlFor="incident-notify" className="font-[family-name:var(--font-nunito)] text-sm font-normal text-[#2d1810]">
              Notify parent/guardian immediately
            </Label>
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
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function IncidentRow({ incident }: { incident: Incident }) {
  return (
    <TableRow className="border-table-border">
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
        {incident.child}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {incident.room}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {incident.type}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={SEVERITY_BADGE_CLASS[incident.severity]}>
          {incident.severity}
        </Badge>
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {incident.reportedBy}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {incident.time}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={STATUS_BADGE_CLASS[incident.status]}>
          {incident.status}
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
  { value: String(INCIDENTS.length).padStart(2, "0"), label: "logged this week", title: "Total Incidents" },
  { value: String(INCIDENTS.filter((i) => i.status === "Open").length).padStart(2, "0"), label: "need attention", title: "Open Cases" },
  { value: String(INCIDENTS.filter((i) => i.severity === "Severe").length).padStart(2, "0"), label: "high priority", title: "Severe Cases" },
  { value: String(INCIDENTS.filter((i) => i.status === "Resolved").length).padStart(2, "0"), label: "closed out", title: "Resolved" },
];

export function HealthIncidentsView() {
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setReportOpen(true)}
          className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
        >
          <AlertTriangle className="h-4 w-4" />
          Report Incident
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
            Health & Incidents Log
          </h2>
          <div className="flex items-center gap-2">
            <FilterDropdown label="All Severity" options={["All Severity", "Minor", "Moderate", "Severe"]} />
            <FilterDropdown label="All Status" options={["All Status", "Open", "Under Review", "Resolved"]} />
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
              <Input
                placeholder="Search incidents..."
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
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INCIDENTS.map((incident) => (
                <IncidentRow key={incident.id} incident={incident} />
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {INCIDENTS.map((incident) => (
            <div key={incident.id} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                  {incident.child}
                </span>
                <Badge variant="outline" className={STATUS_BADGE_CLASS[incident.status]}>
                  {incident.status}
                </Badge>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{incident.type}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{incident.room}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{incident.time}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <Badge variant="outline" className={SEVERITY_BADGE_CLASS[incident.severity]}>
                  {incident.severity}
                </Badge>
                <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                  by {incident.reportedBy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ReportIncidentModal open={reportOpen} onOpenChange={setReportOpen} />
    </div>
  );
}
