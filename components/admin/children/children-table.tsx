import Link from "next/link";
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

function ChildRow({ child }: { child: Child }) {
  return (
    <TableRow className="border-table-border">
      <TableCell className="w-10">
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
      <TableCell>
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
              <DropdownMenuItem>Log Daily Report</DropdownMenuItem>
              <DropdownMenuItem>New Picture/Video</DropdownMenuItem>
              <DropdownMenuItem>Log Incident</DropdownMenuItem>
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
              <DropdownMenuItem>Reassign Caregiver</DropdownMenuItem>
              <DropdownMenuItem>Change Room</DropdownMenuItem>
              <DropdownMenuItem>Contact Guardian</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ChildrenTable() {
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
              placeholder="Search children, parents…"
              className="h-8 w-full sm:w-58 rounded-lg border-[rgba(45,24,16,0.12)] bg-[#F5EDD8] pl-8 text-xs"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">
            Filter by:
          </span>
          <FilterDropdown label="All Rooms" options={ROOMS} />
          <FilterDropdown label="All Status" options={STATUSES} />
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
            {CHILDREN.map((child) => (
              <ChildRow key={child.id} child={child} />
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Mobile card list */}
      <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
        {CHILDREN.map((child) => (
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
    </div>
  );
}
