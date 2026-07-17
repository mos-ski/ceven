"use client";

import { Suspense, useState } from "react";
import {
  ChevronDown,
  Search,
  MoreVertical,
  X,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { StatCard } from "@/components/admin/stat-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STAFF, type StaffMember } from "@/lib/mock-data/staff";
import { AddStaffModal } from "@/components/admin/staff/add-staff-modal";
import { DeactivateMemberModal, EditMemberModal } from "@/components/admin/staff/staff-member-modals";
import { LeaderboardTab } from "@/components/admin/staff/leaderboard-tab";
import { LeaveManagementTab } from "@/components/admin/staff/leave-management-tab";
import { ComplianceSafetyTab } from "@/components/admin/staff/compliance-safety-tab";

type Tab =
  | "Staff Members"
  | "Attendance Log"
  | "Role Management"
  | "Leaderboard"
  | "Leave Management"
  | "Compliance & Safety";

const TABS: Tab[] = [
  "Staff Members",
  "Attendance Log",
  "Role Management",
  "Leaderboard",
  "Leave Management",
  "Compliance & Safety",
];

// Maps the sidebar's `?tab=` query param values to this page's Tab union.
const TAB_QUERY_MAP: Record<string, Tab> = {
  "attendance-log": "Attendance Log",
  "role-management": "Role Management",
  leaderboard: "Leaderboard",
  "leave-management": "Leave Management",
  "compliance-safety": "Compliance & Safety",
};

// ─── Staff Members data ───────────────────────────────────────────────────────

const staffData = STAFF;

// ─── Attendance Log data ──────────────────────────────────────────────────────

const attendanceData = [
  {
    name: "Mrs. Sarah Okonkwo",
    email: "sarah.o@udebemcresh.com",
    days: [true, true, true, false, true, true],
    compliance: "83%",
  },
  {
    name: "Mr. James Adamu",
    email: "james.a@udebemcresh.com",
    days: [false, true, false, true, false, false],
    compliance: "33%",
  },
  {
    name: "Mrs. Ngozi Eze",
    email: "ngozi.e@udebemcresh.com",
    days: [true, true, true, true, true, false],
    compliance: "83%",
  },
  {
    name: "Mr. Chukwu Bello",
    email: "chukwu.b@udebemcresh.com",
    days: [true, true, false, true, true, true],
    compliance: "83%",
  },
  {
    name: "Mrs. Amaka Taiwo",
    email: "amaka.t@udebemcresh.com",
    days: [true, true, true, true, true, true],
    compliance: "100%",
  },
];

// ─── Role Management data ─────────────────────────────────────────────────────

const rolesData = [
  {
    role: "Caregiver",
    created: "01 Sep 2025",
    team: "Lion Room",
    access: "Limited",
    updated: "10 Oct 2025",
  },
  {
    role: "Admin",
    created: "15 Aug 2025",
    team: "All Rooms",
    access: "Full",
    updated: "01 Oct 2025",
  },
  {
    role: "Marketer",
    created: "20 Jul 2025",
    team: "External",
    access: "View Only",
    updated: "05 Sep 2025",
  },
  {
    role: "Nurse",
    created: "12 Jun 2025",
    team: "Medical",
    access: "Limited",
    updated: "20 Aug 2025",
  },
];

// ─── Shared sub-components ────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-[#ecfff8] border border-[#009061] text-[#009061]",
    Absent: "bg-[#fff6e6] border border-[#cc8000] text-[#cc8000]",
    Pending: "bg-[#f3f4f6] border border-[#9ca3af] text-[#6b7280]",
    Suspended: "bg-[#fde8e8] border border-[#ef4444] text-[#ef4444]",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] ?? styles.Pending}`}
    >
      {status}
    </span>
  );
}

function AccessBadge({ access }: { access: string }) {
  const styles: Record<string, string> = {
    Full: "bg-[#ecfff8] border border-[#009061] text-[#009061]",
    Limited: "bg-[#fff6e6] border border-[#cc8000] text-[#cc8000]",
    "View Only": "bg-[#f3f4f6] border border-[#9ca3af] text-[#6b7280]",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[access] ?? styles["View Only"]}`}
    >
      {access}
    </span>
  );
}

function ComplianceText({ value }: { value: string }) {
  const pct = parseInt(value, 10);
  const color =
    pct >= 80
      ? "text-[#009061]"
      : pct >= 50
        ? "text-[#f59e0b]"
        : "text-[#ef4444]";
  return (
    <span className={`font-bold font-[family-name:var(--font-nunito)] ${color}`}>
      {value}
    </span>
  );
}

// ─── Modals ───────────────────────────────────────────────────────────────────

const PERMISSIONS = [
  ["Children & Parent", "Finance", "Account & Setup"],
  ["Staff Management", "Communication", "Intelligence"],
  ["Daily Operations"],
];

function RoleFormModal({
  mode,
  roleName,
  onClose,
}: {
  mode: "create" | "edit";
  roleName: string | null;
  onClose: () => void;
}) {
  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-full sm:max-w-[600px] mx-4 bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[#eaecf0]">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
              {isEdit ? "Edit Role" : "Create New Role"}
            </h2>
            <p className="text-sm text-[#6b7280] font-[family-name:var(--font-nunito)] mt-0.5">
              {isEdit
                ? `Editing permissions for the "${roleName}" role.`
                : "Define a new role and assign permissions."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#6b7280] hover:text-[#2d1810] p-1 rounded"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 py-5 flex flex-col gap-5">
          {/* Role Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
              Role Name
            </label>
            <input
              type="text"
              defaultValue={isEdit && roleName ? roleName : ""}
              placeholder="e.g. Caregiver"
              className="border border-[#d0d5dd] rounded-lg px-3.5 py-2.5 text-sm font-[family-name:var(--font-nunito)] text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe the responsibilities of this role..."
              className="border border-[#d0d5dd] rounded-lg px-3.5 py-2.5 text-sm font-[family-name:var(--font-nunito)] text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c] resize-none"
            />
          </div>

          {/* Invite Staff */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
              Invite Staff
            </label>
            <select
              defaultValue=""
              className="border border-[#d0d5dd] rounded-lg px-3.5 py-2.5 text-sm font-[family-name:var(--font-nunito)] text-[#6b7280] outline-none focus:ring-2 focus:ring-[#c47b2c] bg-white"
            >
              <option value="" disabled>
                Select staff members
              </option>
              {staffData.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Permissions */}
          <div className="flex flex-col gap-3">
            <h3 className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
              Permissions
            </h3>
            <div className="flex flex-col gap-3">
              {PERMISSIONS.map((row, ri) => (
                <div key={ri} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {row.map((perm) => (
                    <label
                      key={perm}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="accent-[#3b2513] h-4 w-4"
                      />
                      <span className="text-sm font-[family-name:var(--font-nunito)] text-[#2d1810]">
                        {perm}
                      </span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#eaecf0] px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-[#d0d5dd] rounded-lg px-4 py-2 text-sm font-medium font-[family-name:var(--font-nunito)] text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button className="bg-[#3b2513] text-[#faf2e1] rounded-lg px-4 py-2 text-sm font-medium font-[family-name:var(--font-nunito)]">
            {isEdit ? "Save Changes" : "Confirm and Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteRoleModal({
  roleName,
  onClose,
}: {
  roleName: string | null;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-2xl flex flex-col">
        {/* Body */}
        <div className="flex flex-col items-center text-center px-8 pt-8 pb-6 gap-4">
          <AlertTriangle className="text-[#ef4444]" size={48} />
          <h2 className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#2d1810]">
            Remove Role
          </h2>
          <p className="text-sm font-[family-name:var(--font-nunito)] text-[#6b7280]">
            {roleName
              ? `This will permanently remove the "${roleName}" role and affect all staff assigned to it.`
              : "This will permanently remove the role and affect all staff assigned to it."}{" "}
            This cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t border-[#eaecf0] px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-[#d0d5dd] rounded-lg px-4 py-2 text-sm font-medium font-[family-name:var(--font-nunito)] text-[#2d1810] hover:bg-[#f9fafb]"
          >
            No, Cancel
          </button>
          <button className="bg-[#ef4444] text-white rounded-lg px-4 py-2 text-sm font-medium font-[family-name:var(--font-nunito)]">
            Yes, Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StaffPage() {
  return (
    <Suspense fallback={null}>
      <StaffPageInner />
    </Suspense>
  );
}

function StaffPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab");
  const activeTab: Tab = (tabParam && TAB_QUERY_MAP[tabParam]) || "Staff Members";

  const [showBanner, setShowBanner] = useState(true);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<StaffMember | null>(null);
  const [deactivatingMember, setDeactivatingMember] = useState<StaffMember | null>(null);
  const [staffSearch, setStaffSearch] = useState("");
  const [staffStatusFilter, setStaffStatusFilter] = useState<"All Status" | StaffMember["status"]>("All Status");
  const [staffSort, setStaffSort] = useState<"Newest First" | "Oldest First">("Newest First");
  const [attendanceSearch, setAttendanceSearch] = useState("");
  const [roleAccessFilter, setRoleAccessFilter] = useState("All Access");

  const filteredAttendance = attendanceData.filter((row) => {
    const query = attendanceSearch.trim().toLowerCase();
    if (query && !row.name.toLowerCase().includes(query) && !row.email.toLowerCase().includes(query)) return false;
    return true;
  });

  const filteredRoles = rolesData.filter((r) => roleAccessFilter === "All Access" || r.access === roleAccessFilter);

  const filteredStaff = staffData
    .filter((staff) => {
      if (staffStatusFilter !== "All Status" && staff.status !== staffStatusFilter) return false;
      const query = staffSearch.trim().toLowerCase();
      if (query && !staff.name.toLowerCase().includes(query) && !staff.email.toLowerCase().includes(query)) return false;
      return true;
    })
    .sort((a, b) => {
      const diff = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      return staffSort === "Newest First" ? -diff : diff;
    });

  // Role modal state
  const [roleModal, setRoleModal] = useState<
    "create" | "edit" | "delete" | null
  >(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  function setActiveTab(tab: Tab) {
    const query = Object.entries(TAB_QUERY_MAP).find(([, value]) => value === tab)?.[0];
    router.push(query ? `/staff?tab=${query}` : "/admin/v2/staff");
  }

  function openEdit(role: string) {
    setSelectedRole(role);
    setRoleModal("edit");
  }

  function openDelete(role: string) {
    setSelectedRole(role);
    setRoleModal("delete");
  }

  function closeModal() {
    setRoleModal(null);
    setSelectedRole(null);
  }

  return (
    <>
      <div className="space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
            Staff Management
          </h1>
          <button
            onClick={() => setAddStaffOpen(true)}
            className="rounded-lg bg-[#3b2513] px-5 py-2.5 text-sm font-medium text-[#faf2e1] font-[family-name:var(--font-urbanist)]"
          >
            Add Staff
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Staff"
            value="15"
            trendLabel="+12.5% vs last month"
            trendUp
          />
          <StatCard label="On Duty Today" value="08" trendLabel="QR Verified" />
          <StatCard label="Absent" value="07" trendLabel="this morning" />
          <StatCard
            label="Average Log Compliance"
            value="90%"
            trendLabel="84% last week ↑"
            trendUp
          />
        </div>

        {/* AI Flags Banner */}
        {showBanner && (
          <div
            className="rounded-xl border border-[#1e2d4a] p-4 mb-4"
            style={{
              background:
                "linear-gradient(177.75deg, #faf2e1 0.21%, rgba(196,123,44,0.5) 96.95%)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-block rounded-full bg-[#1e2d4a] px-2 py-0.5 text-xs text-white">
                  ✦ Ada AI Flags
                </span>
                <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  Mrs Anita — compliance at 52% (below 72% threshold)
                </p>
                <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2d1810]">
                  Mr Adamu — absent 3 of last 5 days
                </p>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="shrink-0 text-[#2d1810] hover:text-[#3b2513]"
                aria-label="Dismiss banner"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab Nav */}
        <div className="flex overflow-x-auto border-b border-[#e6ebf3] mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium font-[family-name:var(--font-urbanist)] cursor-pointer ${
                activeTab === tab
                  ? "border-b-2 border-[#3b2513] text-[#3b2513]"
                  : "text-[#6b7280] hover:text-[#2d1810]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Tab: Staff Members ─────────────────────────────────────────────── */}
        {activeTab === "Staff Members" && (
          <div className="rounded-xl bg-white shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-[family-name:var(--font-nunito)] text-[#6b7280]">
                  Filter by:
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button className="border border-[#d0d5dd] rounded-lg px-3 py-1.5 text-xs font-[family-name:var(--font-nunito)] flex items-center gap-1.5 bg-white cursor-pointer" />
                    }
                  >
                    {staffSort}
                    <ChevronDown className="size-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {(["Newest First", "Oldest First"] as const).map((option) => (
                      <DropdownMenuItem key={option} onClick={() => setStaffSort(option)}>
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button className="border border-[#d0d5dd] rounded-lg px-3 py-1.5 text-xs font-[family-name:var(--font-nunito)] flex items-center gap-1.5 bg-white cursor-pointer" />
                    }
                  >
                    {staffStatusFilter}
                    <ChevronDown className="size-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {(["All Status", "Active", "Absent", "Pending", "Suspended"] as const).map((option) => (
                      <DropdownMenuItem key={option} onClick={() => setStaffStatusFilter(option)}>
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#6b7280]" />
                <input
                  type="text"
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  placeholder="Search staff..."
                  className="bg-[#f5edd8] border border-[#d0d5dd] rounded-lg text-xs px-3 py-1.5 pl-8 outline-none focus:ring-1 focus:ring-[#3b2513] font-[family-name:var(--font-nunito)]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#edd9c0]">
                  {[
                    "Staff",
                    "Phone Number",
                    "Date Added",
                    "Role",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaecf0]">
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                      No staff match your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredStaff.map((staff) => (
                    <tr
                      key={staff.id}
                      onClick={() => router.push(`/staff/${staff.id}`)}
                      className="cursor-pointer hover:bg-[#faf9f7]"
                    >
                      <td className="px-4 py-3">
                        <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                          {staff.name}
                        </p>
                        <p className="text-[10px] text-[#858c98]">
                          {staff.email}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                        {staff.phone}
                      </td>
                      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                        {staff.dateAdded}
                      </td>
                      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                        {staff.role}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={staff.status} />
                      </td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            render={
                              <button className="text-[#6b7280] hover:text-[#2d1810] p-1 rounded" />
                            }
                          >
                            <MoreVertical className="size-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem render={<Link href={`/staff/${staff.id}`} />}>
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setEditingMember(staff)}>
                              Edit Member
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDeactivatingMember(staff)}>
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
            {/* Mobile card list */}
            <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
              {filteredStaff.length === 0 && (
                <p className="py-6 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                  No staff match your search or filters.
                </p>
              )}
              {filteredStaff.map((staff) => (
                <Link
                  key={staff.id}
                  href={`/staff/${staff.id}`}
                  className="flex items-center justify-between rounded-xl border border-[#eaecf0] p-3 transition-colors hover:bg-[#faf9f7]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
                      {staff.name.split(" ").filter(n => !n.startsWith("Mr") && !n.startsWith("Mrs") && !n.startsWith("Ms")).map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                          {staff.name}
                        </span>
                        <StatusBadge status={staff.status} />
                      </div>
                      <span className="font-[family-name:var(--font-nunito)] text-xs text-[#858c98]">
                        {staff.role} • {staff.phone}
                      </span>
                    </div>
                  </div>
                  <MoreVertical className="size-4 text-[#6b7280]" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Attendance Log ───────────────────────────────────────────── */}
        {activeTab === "Attendance Log" && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-[family-name:var(--font-nunito)] text-[#6b7280]">
                Filter by:
              </span>
              <button className="border border-[#d0d5dd] rounded-lg px-3 py-1.5 text-xs font-[family-name:var(--font-nunito)] flex items-center gap-1.5 bg-white cursor-pointer">
                Week
                <ChevronDown className="size-3" />
              </button>
              <button className="border border-[#d0d5dd] rounded-lg px-3 py-1.5 text-xs font-[family-name:var(--font-nunito)] flex items-center gap-1.5 bg-white cursor-pointer">
                All Status
                <ChevronDown className="size-3" />
              </button>
              <div className="w-px h-5 bg-[#d0d5dd] mx-1" />
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#6b7280]" />
                <input
                  type="text"
                  value={attendanceSearch}
                  onChange={(e) => setAttendanceSearch(e.target.value)}
                  placeholder="Search staff..."
                  className="bg-[#f5edd8] border border-[#d0d5dd] rounded-lg text-xs px-3 py-1.5 pl-8 outline-none focus:ring-1 focus:ring-[#3b2513] font-[family-name:var(--font-nunito)]"
                />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl bg-white shadow-sm overflow-hidden">
              <div className="hidden overflow-x-auto lg:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#edd9c0]">
                    <th className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810] w-8">
                      <input type="checkbox" className="accent-[#3b2513]" />
                    </th>
                    {["Staff", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Compliance Score"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaecf0]">
                  {filteredAttendance.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-10 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                        No staff match your search.
                      </td>
                    </tr>
                  ) : (
                  filteredAttendance.map((row) => (
                    <tr key={row.name} className="hover:bg-[#faf9f7]">
                      <td className="px-4 py-3">
                        <input type="checkbox" className="accent-[#3b2513]" />
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                          {row.name}
                        </p>
                        <p className="text-[10px] text-[#858c98]">
                          {row.email}
                        </p>
                      </td>
                      {row.days.map((present, di) => (
                        <td key={di} className="px-4 py-3">
                          {present ? (
                            <div className="h-7 w-7 rounded-full flex items-center justify-center text-sm bg-[#ecfff8] text-[#009061]">
                              ✓
                            </div>
                          ) : (
                            <div className="h-7 w-7 rounded-full flex items-center justify-center text-sm bg-[#fff5f5] text-[#ef4444]">
                              ✗
                            </div>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <ComplianceText value={row.compliance} />
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
              </div>
              {/* Mobile card list */}
              <div className="flex flex-col gap-2 p-4 lg:hidden">
                {filteredAttendance.length === 0 && (
                  <p className="py-6 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                    No staff match your search.
                  </p>
                )}
                {filteredAttendance.map((row) => (
                  <div key={row.name} className="rounded-xl border border-[#eaecf0] p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                          {row.name}
                        </span>
                        <span className="text-[10px] text-[#858c98]">{row.email}</span>
                      </div>
                      <ComplianceText value={row.compliance} />
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      {["M", "T", "W", "T", "F", "S"].map((day, di) => (
                        <div
                          key={di}
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-medium ${
                            row.days[di]
                              ? "bg-[#ecfff8] text-[#009061]"
                              : "bg-[#fff5f5] text-[#ef4444]"
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Role Management ──────────────────────────────────────────── */}
        {activeTab === "Role Management" && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
                Role Log
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-[family-name:var(--font-nunito)] text-[#6b7280]">
                  Filter by:
                </span>
                <button className="border border-[#d0d5dd] rounded-lg px-3 py-1.5 text-xs font-[family-name:var(--font-nunito)] flex items-center gap-1.5 bg-white cursor-pointer">
                  Date Created
                  <ChevronDown className="size-3" />
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <button className="border border-[#d0d5dd] rounded-lg px-3 py-1.5 text-xs font-[family-name:var(--font-nunito)] flex items-center gap-1.5 bg-white cursor-pointer" />
                    }
                  >
                    {roleAccessFilter}
                    <ChevronDown className="size-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["All Access", "Full", "Limited", "View Only"].map((option) => (
                      <DropdownMenuItem key={option} onClick={() => setRoleAccessFilter(option)}>
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <button
                  onClick={() => setRoleModal("create")}
                  className="bg-[#3b2513] text-[#faf2e1] rounded-lg px-4 py-2 text-sm font-medium font-[family-name:var(--font-nunito)]"
                >
                  Add New Role
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl bg-white shadow-sm overflow-hidden">
              <div className="hidden overflow-x-auto lg:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#edd9c0]">
                    {[
                      "Role Type",
                      "Date Created",
                      "Team",
                      "Access Level",
                      "Last Updated",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eaecf0]">
                  {filteredRoles.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                        No roles match this filter.
                      </td>
                    </tr>
                  ) : (
                  filteredRoles.map((r) => (
                    <tr key={r.role} className="hover:bg-[#faf9f7]">
                      <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                        {r.role}
                      </td>
                      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                        {r.created}
                      </td>
                      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                        {r.team}
                      </td>
                      <td className="px-4 py-3">
                        <AccessBadge access={r.access} />
                      </td>
                      <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                        {r.updated}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(r.role)}
                            className="text-[#6b7280] hover:text-[#2d1810] p-1 rounded"
                            aria-label={`Edit ${r.role}`}
                          >
                            <Pencil className="size-4" />
                          </button>
                          <button
                            onClick={() => openDelete(r.role)}
                            className="text-[#ef4444] hover:text-[#dc2626] p-1 rounded"
                            aria-label={`Delete ${r.role}`}
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
              </div>
              {/* Mobile card list */}
              <div className="flex flex-col gap-2 p-4 lg:hidden">
                {filteredRoles.length === 0 && (
                  <p className="py-6 text-center font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                    No roles match this filter.
                  </p>
                )}
                {filteredRoles.map((r) => (
                  <div key={r.role} className="flex items-center justify-between rounded-xl border border-[#eaecf0] p-3">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{r.role}</span>
                        <AccessBadge access={r.access} />
                      </div>
                      <span className="font-[family-name:var(--font-nunito)] text-xs text-[#858c98]">
                        {r.team} • Updated {r.updated}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(r.role)}
                        className="text-[#6b7280] hover:text-[#2d1810] p-1 rounded"
                        aria-label={`Edit ${r.role}`}
                      >
                        <Pencil className="size-4" />
                      </button>
                      <button
                        onClick={() => openDelete(r.role)}
                        className="text-[#ef4444] hover:text-[#dc2626] p-1 rounded"
                        aria-label={`Delete ${r.role}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Leaderboard ───────────────────────────────────────────────── */}
        {activeTab === "Leaderboard" && <LeaderboardTab />}

        {/* ── Tab: Leave Management ──────────────────────────────────────────── */}
        {activeTab === "Leave Management" && <LeaveManagementTab />}

        {/* ── Tab: Compliance & Safety ───────────────────────────────────────── */}
        {activeTab === "Compliance & Safety" && <ComplianceSafetyTab />}
      </div>

      {/* ── Modals (rendered outside the scrollable content) ─────────────────── */}
      {addStaffOpen && <AddStaffModal onClose={() => setAddStaffOpen(false)} />}
      {editingMember && (
        <EditMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={() => setEditingMember(null)}
        />
      )}
      {deactivatingMember && (
        <DeactivateMemberModal
          member={deactivatingMember}
          onClose={() => setDeactivatingMember(null)}
          onConfirm={() => setDeactivatingMember(null)}
        />
      )}
      {(roleModal === "create" || roleModal === "edit") && (
        <RoleFormModal
          mode={roleModal}
          roleName={selectedRole}
          onClose={closeModal}
        />
      )}
      {roleModal === "delete" && (
        <DeleteRoleModal roleName={selectedRole} onClose={closeModal} />
      )}
    </>
  );
}
