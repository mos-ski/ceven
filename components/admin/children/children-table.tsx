"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown, Flag, MoreVertical, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CHILDREN, type Child, type ChildStatus, type FeeStatus } from "@/lib/mock-data/children";
import { LogActivityModal, type LogActivityMode } from "@/components/admin/children/log-activity-modal";
import {
  ChangeRoomModal,
  ContactGuardianModal,
  ReassignCaregiverModal,
} from "@/components/admin/children/child-row-actions-modals";

const ROOMS = ["All Rooms", "Lion", "Panda", "Owl", "Bear"];
const STATUSES: Array<"All Status" | ChildStatus> = [
  "All Status",
  "Present",
  "Late",
  "Absent",
];

const STATUS_TEXT_CLASS: Record<ChildStatus, string> = {
  Present: "text-success-text",
  Late: "text-amber-600",
  Absent: "text-red-600",
};

const FEE_BADGE_CLASS: Record<FeeStatus, string> = {
  Paid: "border-transparent bg-badge-success-bg text-success-text",
  Overdue: "border-transparent bg-badge-warning-bg text-badge-warning-text",
  Pending: "border-transparent bg-gray-100 text-gray-600",
};

function FilterDropdown({
  label,
  options,
  onSelect,
}: {
  label: string;
  options: string[];
  onSelect: (option: string) => void;
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
          <DropdownMenuItem key={option} onClick={() => onSelect(option)}>
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ChildRow({
  child,
  onLog,
  onReassign,
  onChangeRoom,
  onContact,
}: {
  child: Child;
  onLog: (child: Child, mode: LogActivityMode) => void;
  onReassign: (child: Child) => void;
  onChangeRoom: (child: Child) => void;
  onContact: (child: Child) => void;
}) {
  const router = useRouter();

  return (
    <TableRow
      onClick={() => router.push(`/children/${child.id}`)}
      className="cursor-pointer border-table-border"
    >
      <TableCell className="w-10" onClick={(e) => e.stopPropagation()}>
        <Checkbox />
      </TableCell>
      <TableCell>
        <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
          {child.name}
        </p>
        <p className="font-[family-name:var(--font-nunito)] text-[10px] text-otp-text">
          {child.gender} • Blood: {child.bloodGroup}
        </p>
      </TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm">{child.age}</TableCell>
      <TableCell className="font-[family-name:var(--font-nunito)] text-sm">{child.room}</TableCell>
      <TableCell>
        <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#454B54]">
          {child.parentName}
        </p>
        <p className="font-[family-name:var(--font-nunito)] text-[10px] text-otp-text">
          {child.parentEmail}
        </p>
      </TableCell>
      <TableCell
        className={cn(
          "font-[family-name:var(--font-nunito)] text-sm",
          STATUS_TEXT_CLASS[child.status]
        )}
      >
        {child.status}
      </TableCell>
      <TableCell>
        {child.healthFlag ? (
          <span className="flex items-center gap-2 font-[family-name:var(--font-nunito)] text-sm">
            <Flag className="size-4 text-red-600" />
            {child.healthFlag}
          </span>
        ) : (
          <span className="font-[family-name:var(--font-nunito)] text-sm text-otp-text">
            No flags
          </span>
        )}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={FEE_BADGE_CLASS[child.feeStatus]}>
          {child.feeStatus}
        </Badge>
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  className="h-9 gap-1 rounded-lg border-brand-dark px-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-brand-dark"
                />
              }
            >
              Log
              <ChevronDown className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onLog(child, "daily-report")}>Log Daily Report</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLog(child, "media")}>New Picture/Video</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLog(child, "incident")}>Log Incident</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon" className="size-9 rounded-md" />}
            >
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem render={<Link href={`/children/${child.id}`} />}>
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onReassign(child)}>Reassign Caregiver</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onChangeRoom(child)}>Change Room</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onContact(child)}>Contact Guardian</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ChildrenTable() {
  const [search, setSearch] = useState("");
  const [roomFilter, setRoomFilter] = useState("All Rooms");
  const [statusFilter, setStatusFilter] = useState<"All Status" | ChildStatus>("All Status");

  const [logTarget, setLogTarget] = useState<{ child: Child; mode: LogActivityMode } | null>(null);
  const [reassignTarget, setReassignTarget] = useState<Child | null>(null);
  const [roomTarget, setRoomTarget] = useState<Child | null>(null);
  const [contactTarget, setContactTarget] = useState<Child | null>(null);

  const filteredChildren = useMemo(() => {
    const query = search.trim().toLowerCase();
    return CHILDREN.filter((child) => {
      if (roomFilter !== "All Rooms" && child.room !== roomFilter) return false;
      if (statusFilter !== "All Status" && child.status !== statusFilter) return false;
      if (
        query &&
        !child.name.toLowerCase().includes(query) &&
        !child.parentName.toLowerCase().includes(query)
      )
        return false;
      return true;
    });
  }, [search, roomFilter, statusFilter]);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
            Children Log
          </h2>
          <div className="relative">
            <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-text" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search children, parents…"
              className="h-8 w-full sm:w-58 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#F5EDD8] pl-8 text-xs"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">
            Filter by:
          </span>
          <FilterDropdown label={roomFilter} options={ROOMS} onSelect={setRoomFilter} />
          <FilterDropdown
            label={statusFilter}
            options={STATUSES}
            onSelect={(option) => setStatusFilter(option as "All Status" | ChildStatus)}
          />
        </div>
      </div>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-table-header-bg hover:bg-table-header-bg">
              <TableHead className="w-10">
                <Checkbox />
              </TableHead>
              <TableHead>Child</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Parent Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Health Flag</TableHead>
              <TableHead>Fee Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredChildren.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-10 text-center font-[family-name:var(--font-nunito)] text-sm text-muted-text">
                  No children match your search or filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredChildren.map((child) => (
                <ChildRow
                  key={child.id}
                  child={child}
                  onLog={(c, mode) => setLogTarget({ child: c, mode })}
                  onReassign={setReassignTarget}
                  onChangeRoom={setRoomTarget}
                  onContact={setContactTarget}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
        {filteredChildren.length === 0 && (
          <p className="py-6 text-center font-[family-name:var(--font-nunito)] text-sm text-muted-text">
            No children match your search or filters.
          </p>
        )}
        {filteredChildren.map((child) => (
          <Link
            key={child.id}
            href={`/children/${child.id}`}
            className="flex items-center justify-between rounded-xl border border-[#eaecf0] p-3 transition-colors hover:bg-[#faf9f7]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
                {child.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
                    {child.name}
                  </span>
                  <span className={cn("font-[family-name:var(--font-nunito)] text-xs", STATUS_TEXT_CLASS[child.status])}>
                    {child.status}
                  </span>
                </div>
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#858c98]">
                  {child.room} • {child.age} • {child.parentName}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant="outline" className={FEE_BADGE_CLASS[child.feeStatus]}>
                {child.feeStatus}
              </Badge>
              {child.healthFlag && (
                <span className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-[10px] text-red-600">
                  <Flag className="size-3" /> {child.healthFlag}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {logTarget && (
        <LogActivityModal
          mode={logTarget.mode}
          child={logTarget.child}
          onClose={() => setLogTarget(null)}
        />
      )}
      {reassignTarget && (
        <ReassignCaregiverModal child={reassignTarget} onClose={() => setReassignTarget(null)} />
      )}
      {roomTarget && <ChangeRoomModal child={roomTarget} onClose={() => setRoomTarget(null)} />}
      {contactTarget && (
        <ContactGuardianModal child={contactTarget} onClose={() => setContactTarget(null)} />
      )}
    </div>
  );
}
