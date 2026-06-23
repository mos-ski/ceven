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
  INCIDENTS,
  INCIDENT_TYPES,
  type Incident,
  type IncidentSeverity,
  type IncidentStatus,
} from "@/lib/mock-data/daily-operations";

const SEVERITY_DOT_CLASS: Record<IncidentSeverity, string> = {
  Minor: "bg-[#2d1810]",
  Moderate: "bg-[#cc8000]",
  Severe: "bg-[#ef4444]",
};

const STATUS_BADGE_CLASS: Record<IncidentStatus, string> = {
  Open: "border-transparent bg-[#f3f4f6] text-[#2d1810]",
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

function ViewIncidentModal({
  incident,
  onOpenChange,
}: {
  incident: Incident | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={incident !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Details</DialogTitle>
        </DialogHeader>

        {incident && (
          <>
            <div className="flex items-center justify-between gap-4 bg-[#faf2e1] px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-full bg-[#edd9c0]" />
                <div>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-black">{incident.child}</p>
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{incident.childInfo}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Incident Status</span>
                <Badge variant="outline" className={STATUS_BADGE_CLASS[incident.status]}>
                  ● {incident.status}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-6 px-6 py-5">
              {[
                ["Incident Type", incident.type],
                ["Severity", incident.severity],
                ["Report Time", incident.time],
                ["Action(s) Taken", incident.actionsTaken],
                ["Raised By", incident.reportedBy],
                ["Additional Note", incident.additionalNote],
                ["Witness Present", incident.witnessPresent ?? "None"],
                ["Parent Notified", incident.parentNotified ? "Yes" : "No"],
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

function IncidentRow({ incident, onView }: { incident: Incident; onView: (incident: Incident) => void }) {
  return (
    <TableRow className="border-table-border">
      <TableCell>
        <input type="checkbox" className="h-4 w-4 accent-[#3b2513]" />
      </TableCell>
      <TableCell>
        <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
          {incident.child}
        </p>
        <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
          {incident.childInfo}
        </p>
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {incident.type}
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">
          <span className={`h-2 w-2 rounded-full ${SEVERITY_DOT_CLASS[incident.severity]}`} />
          {incident.severity}
        </span>
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {incident.time}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {incident.reportedBy}
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
        {incident.parentNotified ? "Yes" : "No"}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={STATUS_BADGE_CLASS[incident.status]}>
          ● {incident.status}
        </Badge>
      </TableCell>
      <TableCell>
        <button onClick={() => onView(incident)} className="flex items-center justify-center text-[#6b7280] hover:text-[#2d1810]">
          <MoreVertical className="h-4 w-4" />
        </button>
      </TableCell>
    </TableRow>
  );
}

const statsCards = [
  { value: String(INCIDENTS.filter((i) => i.status === "Open").length).padStart(2, "0"), title: "Open" },
  { value: "00", title: "This Month" },
  { value: String(INCIDENTS.filter((i) => i.status === "Resolved").length).padStart(2, "0"), title: "Resolved" },
  { value: "--/--", title: "Parent Notified" },
];

export function HealthIncidentsView() {
  const [reportOpen, setReportOpen] = useState(false);
  const [viewingIncident, setViewingIncident] = useState<Incident | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Button
          onClick={() => setReportOpen(true)}
          className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
        >
          Raise Incident
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4">
        {statsCards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col gap-1 rounded-xl border border-[#e6ebf3] bg-white p-4"
          >
            <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{card.title}</p>
            <p className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* AI Insights Banner */}
      <div className="flex items-center gap-3 rounded-xl border border-[#e0bfa0] bg-[#fdf6e8] px-4 py-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#e0bfa0] px-2 py-0.5 font-[family-name:var(--font-urbanist)] text-[10px] font-medium text-[#3b2513]">
          ✦ AI Insights
        </span>
        <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
          ⚠ Action required:2 open incidents have not been communicated to parents. <span className="font-bold">CEven</span> policy requires parent notification within 4 hours.
        </p>
        <button className="ml-auto text-[#9ca3af] hover:text-[#6b7280]">✕</button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
            Incident Log
          </h2>
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Filter by:</span>
            <FilterDropdown label="Severity" options={["All Severity", "Minor", "Moderate", "Severe"]} />
            <FilterDropdown label="All Status" options={["All Status", "Open", "Under Review", "Resolved"]} />
            <FilterDropdown label="Date" options={["All Dates", "Today", "This Week", "This Month"]} />
            <div className="relative">
              <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[#9ca3af]" />
              <Input
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
                <th className="w-10 px-4 py-3">
                  <input type="checkbox" className="h-4 w-4 accent-[#3b2513]" />
                </th>
                {["Child", "Type", "Severity", "Report Time", "Reported by", "Parent Notified", "Status", "Action"].map((h) => (
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
              {INCIDENTS.map((incident) => (
                <IncidentRow key={incident.id} incident={incident} onView={setViewingIncident} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card list */}
        <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
          {INCIDENTS.map((incident) => (
            <div
              key={incident.id}
              onClick={() => setViewingIncident(incident)}
              className="cursor-pointer rounded-xl border border-[#eaecf0] p-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">
                    {incident.child}
                  </span>
                  <p className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{incident.childInfo}</p>
                </div>
                <Badge variant="outline" className={STATUS_BADGE_CLASS[incident.status]}>
                  ● {incident.status}
                </Badge>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{incident.type}</span>
                <span className="text-[#d0d5dd]">•</span>
                <span className="inline-flex items-center gap-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                  <span className={`h-1.5 w-1.5 rounded-full ${SEVERITY_DOT_CLASS[incident.severity]}`} />
                  {incident.severity}
                </span>
              </div>
              <p className="mt-1 font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">
                {incident.time} • by {incident.reportedBy}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ReportIncidentModal open={reportOpen} onOpenChange={setReportOpen} />
      <ViewIncidentModal incident={viewingIncident} onOpenChange={(open) => !open && setViewingIncident(null)} />
    </div>
  );
}
