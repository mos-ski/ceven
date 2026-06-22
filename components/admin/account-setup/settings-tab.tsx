"use client";

import { Pencil, Plus } from "lucide-react";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { RoleAccessModal } from "@/components/admin/account-setup/role-access-modal";
import {
  INITIAL_NOTIFICATION_PREFS,
  MOCK_CRECHE_PROFILE,
  ROLE_TEMPLATES,
  type NotificationPref,
  type RoleStatus,
  type RoleTemplate,
} from "@/lib/mock-data/account-setup";

const STATUS_BADGE_CLASS: Record<RoleStatus, string> = {
  Active: "border-[#009061] bg-[#ecfff8] text-[#009061]",
  Disabled: "border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]",
};

function TeamAndRolesSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleTemplate | null>(null);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Team & Roles</p>
        <button
          onClick={() => {
            setEditingRole(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-1.5 rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
        >
          <Plus className="size-3.5" />
          Add Role
        </button>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#edd9c0]">
              {["Role", "Description", "Staff", "Status", "Action"].map((h) => (
                <th key={h} className="px-5 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaecf0]">
            {ROLE_TEMPLATES.map((role) => (
              <tr key={role.id} className="hover:bg-[#faf9f7]">
                <td className="px-5 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{role.name}</td>
                <td className="max-w-[360px] px-5 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{role.description}</td>
                <td className="px-5 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{role.staffCount}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_BADGE_CLASS[role.status]}`}>
                    {role.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => {
                      setEditingRole(role);
                      setModalOpen(true);
                    }}
                    aria-label={`Edit ${role.name}`}
                    className="text-[#6b7280] hover:text-[#2d1810]"
                  >
                    <Pencil className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile cards */}
      <div className="flex flex-col gap-2 p-4 lg:hidden">
        {ROLE_TEMPLATES.map((role) => (
          <div key={role.id} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2d1810]">{role.name}</span>
              <span className={`rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${STATUS_BADGE_CLASS[role.status]}`}>
                {role.status}
              </span>
            </div>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{role.description}</p>
          </div>
        ))}
      </div>

      <RoleAccessModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        role={editingRole}
        onSave={() => setModalOpen(false)}
      />
    </div>
  );
}

function CrecheProfileSection() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5">
      <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Creche Profile</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Creche Name</label>
          <input
            defaultValue={MOCK_CRECHE_PROFILE.name}
            className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Email</label>
          <input
            defaultValue={MOCK_CRECHE_PROFILE.email}
            className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Phone</label>
          <input
            defaultValue={MOCK_CRECHE_PROFILE.phone}
            className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Address</label>
          <input
            defaultValue={MOCK_CRECHE_PROFILE.address}
            className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
          />
        </div>
      </div>
      <button className="self-end rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]">
        Save Changes
      </button>
    </div>
  );
}

function NotificationPreferencesSection() {
  const [prefs, setPrefs] = useState<NotificationPref[]>(INITIAL_NOTIFICATION_PREFS);

  function toggle(id: string, channel: "email" | "sms") {
    setPrefs((prev) => prev.map((p) => (p.id === id ? { ...p, [channel]: !p[channel] } : p)));
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5">
      <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
        Notification Preferences
      </p>
      <div className="flex flex-col divide-y divide-[#eaecf0]">
        {prefs.map((pref) => (
          <div key={pref.id} className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{pref.label}</p>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{pref.description}</p>
            </div>
            <div className="flex shrink-0 gap-4">
              <label className="flex items-center gap-2 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                <Checkbox checked={pref.email} onCheckedChange={() => toggle(pref.id, "email")} />
                Email
              </label>
              <label className="flex items-center gap-2 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                <Checkbox checked={pref.sms} onCheckedChange={() => toggle(pref.id, "sms")} />
                SMS
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsTab() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">Settings</h1>
      <TeamAndRolesSection />
      <CrecheProfileSection />
      <NotificationPreferencesSection />
    </div>
  );
}
