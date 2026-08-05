"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Baby,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Search,
  Flag,
  ChevronDown,
  MoreVertical,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EnrollChildModal from "@/components/dashboard/enroll-child-modal";
import { LogActivityModal, type LogActivityMode } from "@/components/admin/children/log-activity-modal";
import {
  ChangeRoomModal,
  ContactGuardianModal,
  ReassignCaregiverModal,
} from "@/components/admin/children/child-row-actions-modals";
import { CHILDREN, CHILDREN_STATS, type Child, type ChildStatus, type FeeStatus } from "@/lib/mock-data/children";

const ROOMS = ["All Rooms", "Lion", "Panda", "Owl", "Bear"];
const STATUSES: Array<"All Status" | ChildStatus> = ["All Status", "Present", "Late", "Absent"];

// "Graduating Soon" has no v2 equivalent stat — derived here as children in the oldest
// age bracket (5 years), a reasonable proxy until a real graduation-date field exists.
const GRADUATING_SOON = CHILDREN.filter((c) => c.age === "5 years").length;

const STATUS_TEXT_CLASS: Record<ChildStatus, string> = {
  Present: "text-[#2A8A52]",
  Late: "text-[#C47B2C]",
  Absent: "text-[#D4522F]",
};

const FEE_BADGE_CLASS: Record<FeeStatus, string> = {
  Paid: "bg-[#2A8A52]/10 text-[#2A8A52]",
  Overdue: "bg-[#D4522F]/10 text-[#D4522F]",
  Pending: "bg-black/[0.06] text-[#2D1810]/60",
};

function StatCard({
  Icon,
  label,
  value,
  sub,
}: {
  Icon: typeof Baby;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">{label}</p>
      <p className="mt-1.5 font-[family-name:var(--font-merriweather)] text-[1.85rem] font-bold leading-none text-[#2D1810]">
        {value}
      </p>
      <p className="mt-1.5 text-[11px] text-[#2D1810]/60">{sub}</p>
      <Icon className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-[#2D1810]/10" />
    </div>
  );
}

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

export default function ChildrenV3Page() {
  const [search, setSearch] = useState("");
  const [roomFilter, setRoomFilter] = useState("All Rooms");
  const [statusFilter, setStatusFilter] = useState<"All Status" | ChildStatus>("All Status");
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [logTarget, setLogTarget] = useState<{ child: Child; mode: LogActivityMode } | null>(null);
  const [reassignTarget, setReassignTarget] = useState<Child | null>(null);
  const [roomTarget, setRoomTarget] = useState<Child | null>(null);
  const [contactTarget, setContactTarget] = useState<Child | null>(null);

  const filteredChildren = useMemo(() => {
    const query = search.trim().toLowerCase();
    return CHILDREN.filter((child) => {
      if (roomFilter !== "All Rooms" && child.room !== roomFilter) return false;
      if (statusFilter !== "All Status" && child.status !== statusFilter) return false;
      if (query && !child.name.toLowerCase().includes(query) && !child.parentName.toLowerCase().includes(query))
        return false;
      return true;
    });
  }, [search, roomFilter, statusFilter]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
            Children
          </h1>
          <p className="mt-1 text-sm text-[#2D1810]/60">
            Manage enrolled children, rooms, health flags and daily records.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setEnrollOpen(true)}
            className="h-10 rounded-lg border border-[#2D1810] px-4 text-sm font-semibold text-[#2D1810] hover:bg-[#2D1810]/5"
          >
            Enroll a Child
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard Icon={Baby} label="Total Enrolled" value={String(CHILDREN_STATS.totalEnrolled).padStart(2, "0")} sub="+12.5% vs last month" />
        <StatCard Icon={CheckCircle2} label="Active" value={String(CHILDREN_STATS.active).padStart(2, "0")} sub="88% attendance today" />
        <StatCard Icon={Sparkles} label="New This Month" value={String(CHILDREN_STATS.newThisMonth).padStart(2, "0")} sub="+12.5% vs last month" />
        <StatCard Icon={GraduationCap} label="Graduating Soon" value={String(GRADUATING_SOON).padStart(2, "0")} sub="Ageing out of current room" />
      </div>

      <div className="rounded-2xl border border-black/[0.07] bg-white p-5">
        <div className="flex flex-col gap-3 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2D1810]">
            Children Log
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2D1810]/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search children, parents…"
                className="h-9 w-56 rounded-lg border border-black/[0.1] bg-[#F5EDD8] pl-8 text-xs text-[#2D1810] placeholder:text-[#2D1810]/40 focus:outline-none"
              />
            </div>
            <select
              value={roomFilter}
              onChange={(e) => setRoomFilter(e.target.value)}
              className="h-9 rounded-lg border border-black/[0.1] bg-white px-2.5 text-xs font-semibold text-[#2D1810] focus:outline-none"
            >
              {ROOMS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "All Status" | ChildStatus)}
              className="h-9 rounded-lg border border-black/[0.1] bg-white px-2.5 text-xs font-semibold text-[#2D1810] focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-black/[0.08] text-left text-xs uppercase tracking-wide text-[#2D1810]/50">
                <th className="pb-2 pr-3 font-semibold">Child</th>
                <th className="pb-2 pr-3 font-semibold">Age</th>
                <th className="pb-2 pr-3 font-semibold">Room</th>
                <th className="pb-2 pr-3 font-semibold">Parent</th>
                <th className="pb-2 pr-3 font-semibold">Status</th>
                <th className="pb-2 pr-3 font-semibold">Health Flag</th>
                <th className="pb-2 pr-3 font-semibold">Fee Status</th>
                <th className="pb-2 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredChildren.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-sm text-[#2D1810]/50">
                    No children match your search or filters.
                  </td>
                </tr>
              ) : (
                filteredChildren.map((child) => (
                  <tr key={child.id} className="group border-b border-black/[0.05] last:border-0">
                    <td className="py-3 pr-3">
                      <Link href={`/admin/v3/children/${child.id}`} className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDD9C0] text-xs font-bold text-[#3B2513]">
                          {getInitials(child.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#2D1810] group-hover:underline">{child.name}</p>
                          <p className="text-[11px] text-[#2D1810]/50">{child.gender} • Blood: {child.bloodGroup}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="py-3 pr-3 text-[#2D1810]/80">{child.age}</td>
                    <td className="py-3 pr-3 text-[#2D1810]/80">{child.room}</td>
                    <td className="py-3 pr-3">
                      <p className="font-semibold text-[#2D1810]">{child.parentName}</p>
                      <p className="text-[11px] text-[#2D1810]/50">{child.parentEmail}</p>
                    </td>
                    <td className={`py-3 pr-3 font-semibold ${STATUS_TEXT_CLASS[child.status]}`}>{child.status}</td>
                    <td className="py-3 pr-3">
                      {child.healthFlag ? (
                        <span className="flex items-center gap-1.5 text-[#D4522F]">
                          <Flag className="h-3.5 w-3.5" /> {child.healthFlag}
                        </span>
                      ) : (
                        <span className="text-[#2D1810]/40">No flags</span>
                      )}
                    </td>
                    <td className="py-3 pr-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${FEE_BADGE_CLASS[child.feeStatus]}`}>
                        {child.feeStatus}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center justify-center gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <button className="flex h-8 items-center gap-1 rounded-lg border border-[#2D1810]/30 px-2.5 text-xs font-semibold text-[#2D1810] hover:bg-[#2D1810]/5" />
                            }
                          >
                            Log
                            <ChevronDown className="h-3 w-3" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setLogTarget({ child, mode: "daily-report" })}>Log Daily Report</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLogTarget({ child, mode: "media" })}>New Picture/Video</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLogTarget({ child, mode: "incident" })}>Log Incident</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#2D1810]/5" />}>
                            <MoreVertical className="h-4 w-4 text-[#2D1810]/60" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem render={<Link href={`/admin/v3/children/${child.id}`} />}>View Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setReassignTarget(child)}>Reassign Caregiver</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setRoomTarget(child)}>Change Room</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setContactTarget(child)}>Contact Guardian</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {enrollOpen && <EnrollChildModal onClose={() => setEnrollOpen(false)} />}
      {logTarget && (
        <LogActivityModal mode={logTarget.mode} child={logTarget.child} onClose={() => setLogTarget(null)} />
      )}
      {reassignTarget && <ReassignCaregiverModal child={reassignTarget} onClose={() => setReassignTarget(null)} />}
      {roomTarget && <ChangeRoomModal child={roomTarget} onClose={() => setRoomTarget(null)} />}
      {contactTarget && <ContactGuardianModal child={contactTarget} onClose={() => setContactTarget(null)} />}
    </div>
  );
}
