"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PERMISSION_GROUPS,
  STAFF_INVITE_OPTIONS,
  type RoleTemplate,
} from "@/lib/mock-data/account-setup";

type PermissionState = Record<string, boolean>;

function buildInitialPermissionState(role: RoleTemplate | null): PermissionState {
  const state: PermissionState = {};
  for (const group of PERMISSION_GROUPS) {
    const level = role?.permissions[group.key] ?? "none";
    state[group.key] = level !== "none";
    for (const child of group.children) {
      state[`${group.key}:${child}`] = level === "full";
    }
  }
  return state;
}

export function RoleAccessModal({
  open,
  onOpenChange,
  role,
  onSave,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Pass null to create a brand new role. */
  role: RoleTemplate | null;
  onSave: (name: string, invitee: string) => void;
}) {
  const [name, setName] = useState(role?.name ?? "");
  const [invitee, setInvitee] = useState("");
  const [inviteMenuOpen, setInviteMenuOpen] = useState(false);
  const [permissions, setPermissions] = useState<PermissionState>(() =>
    buildInitialPermissionState(role)
  );

  function resetForRole(nextRole: RoleTemplate | null) {
    setName(nextRole?.name ?? "");
    setInvitee("");
    setPermissions(buildInitialPermissionState(nextRole));
  }

  function handleOpenChange(next: boolean) {
    if (next) resetForRole(role);
    onOpenChange(next);
  }

  function toggleGroup(groupKey: string, children: string[]) {
    setPermissions((prev) => {
      const next = { ...prev, [groupKey]: !prev[groupKey] };
      for (const child of children) {
        next[`${groupKey}:${child}`] = next[groupKey];
      }
      return next;
    });
  }

  function toggleChild(groupKey: string, child: string, children: string[]) {
    setPermissions((prev) => {
      const next = { ...prev, [`${groupKey}:${child}`]: !prev[`${groupKey}:${child}`] };
      next[groupKey] = children.some((c) => next[`${groupKey}:${c}`]);
      return next;
    });
  }

  function handleSave() {
    onSave(name.trim() || "Untitled Role", invitee);
    onOpenChange(false);
  }

  // Split the 7 permission groups across 3 columns, matching the Figma layout.
  const columns: typeof PERMISSION_GROUPS[] = [
    PERMISSION_GROUPS.slice(0, 2),
    PERMISSION_GROUPS.slice(2, 5),
    PERMISSION_GROUPS.slice(5, 7),
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[640px]">
        <DialogHeader>
          <DialogTitle>{role ? "Edit Role Access" : "Create New Role"}</DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[60vh] flex-col gap-6 overflow-y-auto px-6 py-5">
          {/* Role name */}
          <div className="flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm text-[#666]">
              Role Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter text here"
              className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#111] outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>

          {/* Invite staff */}
          <div className="relative flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm text-[#666]">
              Invite Staff
            </label>
            <button
              type="button"
              onClick={() => setInviteMenuOpen((v) => !v)}
              className="flex h-[52px] w-full items-center justify-between rounded-xl border border-[#dcdcdc] px-4 text-left font-[family-name:var(--font-urbanist)] text-sm text-[#111]"
            >
              <span className={invitee ? "text-[#111]" : "text-[#7e7e7e]"}>
                {invitee || "Select"}
              </span>
              <ChevronDown className="size-4 text-[#6b7280]" />
            </button>
            {inviteMenuOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-2xl bg-[#fefefe] p-2 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]">
                {STAFF_INVITE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setInvitee(opt);
                      setInviteMenuOpen(false);
                    }}
                    className="block w-full rounded-lg px-5 py-3 text-left font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#faf2e1]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-px w-full bg-[#e6ebf3]" />

          {/* Permissions matrix */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">
                Permissions
              </p>
              <button
                type="button"
                onClick={() =>
                  setPermissions((prev) => {
                    const allOn = PERMISSION_GROUPS.every((g) => prev[g.key]);
                    const next: PermissionState = {};
                    for (const group of PERMISSION_GROUPS) {
                      next[group.key] = !allOn;
                      for (const child of group.children) {
                        next[`${group.key}:${child}`] = !allOn;
                      }
                    }
                    return next;
                  })
                }
                className="flex items-center gap-2 rounded-full"
              >
                <Checkbox
                  checked={PERMISSION_GROUPS.every((g) => permissions[g.key])}
                  onCheckedChange={() => {}}
                />
                <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513]">
                  Full Access
                </span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {columns.map((col, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-6">
                  {col.map((group) => (
                    <div key={group.key} className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <Checkbox
                            checked={!!permissions[group.key]}
                            onCheckedChange={() => toggleGroup(group.key, group.children)}
                          />
                          <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">
                            {group.label}
                          </span>
                        </label>
                      </div>
                      {group.children.length > 0 && (
                        <div className="flex flex-col gap-3 pl-1">
                          {group.children.map((child) => (
                            <label key={child} className="flex items-start gap-2">
                              <Checkbox
                                checked={!!permissions[`${group.key}:${child}`]}
                                onCheckedChange={() => toggleChild(group.key, child, group.children)}
                              />
                              <span className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                                {child}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1]"
          >
            Save Changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
