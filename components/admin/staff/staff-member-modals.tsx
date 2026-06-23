"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
  DEACTIVATION_REASONS,
  STAFF_PERMISSION_GROUPS,
  STAFF_ROLE_OPTIONS,
  type StaffMember,
} from "@/lib/mock-data/staff";

type PermissionLevel = "full" | "view";

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-2 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]"
    >
      {label}
      <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? "bg-[#3b2513]" : "bg-[#ccd2dc]"}`}>
        <span className={`absolute top-0.5 size-4 rounded-full bg-white transition-transform ${on ? "translate-x-[18px]" : "translate-x-0.5"}`} />
      </span>
    </button>
  );
}

export function EditMemberModal({
  member,
  onClose,
  onSave,
}: {
  member: StaffMember;
  onClose: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState(member.name);
  const [email, setEmail] = useState(member.email);
  const [phone, setPhone] = useState(member.phone);
  const [role, setRole] = useState(member.role);
  const [sendInvite, setSendInvite] = useState(true);
  const [permissions, setPermissions] = useState<Record<string, PermissionLevel>>(
    Object.fromEntries(STAFF_PERMISSION_GROUPS.map((g) => [g, "view" as PermissionLevel]))
  );

  function setPermission(group: string, level: PermissionLevel) {
    setPermissions((prev) => ({ ...prev, [group]: level }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-y-auto rounded-[20px] border-6 border-[#faf2e1] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#e6ebf3] bg-white px-6 py-5">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">Edit Profile</h2>
          <button onClick={onClose} aria-label="Close modal" className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <div className="flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Email address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Phone number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>

          <div className="h-px w-full bg-[#e6ebf3]" />

          <div className="flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Assign role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-[52px] w-full rounded-xl border border-[#dcdcdc] px-4 font-[family-name:var(--font-urbanist)] text-sm text-black outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              {STAFF_ROLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#dcdcdc] p-4">
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#666]">Set permission for this user</p>
            </div>
            <div className="h-px w-full bg-[#e6ebf3]" />
            <div className="flex flex-col gap-4">
              {STAFF_PERMISSION_GROUPS.map((group) => (
                <div key={group} className="flex items-center justify-between">
                  <p className="font-[family-name:var(--font-nunito)] text-sm text-[#252525]">{group}</p>
                  <div className="flex items-center gap-4">
                    <Toggle label="Full access" on={permissions[group] === "full"} onToggle={() => setPermission(group, "full")} />
                    <Toggle label="View only" on={permissions[group] === "view"} onToggle={() => setPermission(group, "view")} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 flex items-center justify-between gap-4 border-t border-[#e6ebf3] bg-white px-6 py-4">
          <Toggle label="Send invite:" on={sendInvite} onToggle={() => setSendInvite((v) => !v)} />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onSave();
                onClose();
              }}
              className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeactivateMemberModal({
  member,
  onClose,
  onConfirm,
}: {
  member: StaffMember;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [reason, setReason] = useState<string>(DEACTIVATION_REASONS[0]);
  const [otherReason, setOtherReason] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-[600px] flex-col overflow-y-auto rounded-[24px] border-4 border-[#dcdcdc] bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">Suspend Account</h2>
          <button onClick={onClose} aria-label="Close modal" className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-5" />
          </button>
        </div>
        <div className="mt-4 h-px w-full bg-[#e6ebf3]" />

        <div className="mt-6 flex flex-col gap-1">
          <p className="font-[family-name:var(--font-nunito)] text-base font-medium text-[#131313]">
            Why are you suspending {member.name}&apos;s account
          </p>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#7e7e7e]">
            Let the user know why their account is being suspended. The user will be notified.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {DEACTIVATION_REASONS.map((r) => (
            <label key={r} className="flex items-center justify-between gap-3">
              <span className="font-[family-name:var(--font-nunito)] text-sm text-[#2e2e2e]">{r}</span>
              <input
                type="radio"
                name="deactivation-reason"
                checked={reason === r}
                onChange={() => setReason(r)}
                className="size-[18px] accent-[#3b2513]"
              />
            </label>
          ))}
          <div className="flex flex-col gap-2">
            <p className="font-[family-name:var(--font-nunito)] text-sm text-[#2e2e2e]">Others</p>
            <textarea
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              placeholder="Type your reason"
              rows={3}
              className="resize-none rounded-xl border border-[#c7c7c7] p-4 font-[family-name:var(--font-nunito)] text-sm text-black outline-none placeholder:text-[#7e7e7e] focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-[52px] items-center justify-center rounded-xl bg-[rgba(42,35,70,0.06)] px-5 font-[family-name:var(--font-urbanist)] text-base font-semibold text-[#2a2346]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex h-[52px] items-center justify-center rounded-xl bg-[#ef4444] px-5 font-[family-name:var(--font-urbanist)] text-base font-semibold text-white"
          >
            Confirm Action
          </button>
        </div>
      </div>
    </div>
  );
}
