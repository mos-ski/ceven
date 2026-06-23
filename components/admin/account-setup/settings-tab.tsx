"use client";

import { Pencil, Plus, X } from "lucide-react";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { RoleAccessModal } from "@/components/admin/account-setup/role-access-modal";
import {
  ADMISSION_FORM_STEPS,
  AI_ALERT_FREQUENCIES,
  AI_FEATURE_CONTROLS,
  AI_GRADIENT_OPTIONS,
  AI_TONE_OPTIONS,
  FEE_PLANS,
  FEE_PLAN_DURATIONS,
  INITIAL_NOTIFICATION_PREFS,
  MOCK_CRECHE_PROFILE,
  MOCK_SECURITY_PROFILE,
  OTHER_APPS,
  ROLE_TEMPLATES,
  type FeePlanCycle,
  type NotificationPref,
  type RoleStatus,
  type RoleTemplate,
} from "@/lib/mock-data/account-setup";

const SETTINGS_TABS = [
  "Branch Profile",
  "Notification",
  "Security",
  "Fee Plans",
  "Admissions",
  "Role Access",
  "AI Settings",
  "Other Apps",
] as const;

type SettingsSubTab = (typeof SETTINGS_TABS)[number];

const STATUS_BADGE_CLASS: Record<RoleStatus, string> = {
  Active: "border-[#009061] bg-[#ecfff8] text-[#009061]",
  Disabled: "border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]",
};

function RoleAccessSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleTemplate | null>(null);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Role & Access</p>
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

function BranchProfileSection() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5">
      <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Branch Profile</p>
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

function NotificationSection() {
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

function SecuritySection() {
  const [activityVisible, setActivityVisible] = useState(MOCK_SECURITY_PROFILE.activityStatusVisible);

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-5">
      <div>
        <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Security</p>
        <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
          Keep your personal information up to date and secure
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <p className="font-[family-name:var(--font-nunito)] text-base font-semibold text-[#1f2937]">Password</p>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Change password access to this creche platform</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Branch Name</label>
            <input
              defaultValue={MOCK_SECURITY_PROFILE.branchName}
              className="rounded-xl border border-[#e6ebf3] px-3.5 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#111] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Email Address</label>
            <input
              defaultValue={MOCK_SECURITY_PROFILE.email}
              className="rounded-xl border border-[#e6ebf3] px-3.5 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#111] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Phone Number</label>
            <input
              defaultValue={MOCK_SECURITY_PROFILE.phone}
              className="rounded-xl border border-[#e6ebf3] px-3.5 py-3 font-[family-name:var(--font-nunito)] text-sm text-[#111] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <button className="self-end rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]">
            Save Changes
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-[#eaecf0]" />
      <div className="flex flex-col gap-3">
        <p className="font-[family-name:var(--font-nunito)] text-base font-semibold text-[#1f2937]">Activity Privacy</p>
        <label className="flex items-center gap-4">
          <Checkbox checked={activityVisible} onCheckedChange={(v) => setActivityVisible(Boolean(v))} />
          <div>
            <p className="font-[family-name:var(--font-nunito)] text-base font-semibold text-[#1f2937]">Activity Status</p>
            <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Let all active members show active status</p>
          </div>
        </label>
      </div>
    </div>
  );
}

function NewPlanModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (plan: { name: string; amount: string; cycle: FeePlanCycle }) => void;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [cycle, setCycle] = useState<FeePlanCycle>("Daily");

  const canSubmit = name.trim() !== "" && amount.trim() !== "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-y-auto rounded-[20px] border-6 border-[#faf2e1] bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#e6ebf3] bg-white px-6 py-5">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">New Plan</h2>
          <button onClick={onClose} aria-label="Close modal" className="rounded p-1 text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <div className="flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Plan Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Daily"
              className="h-[52px] w-full rounded-xl border border-[#e6ebf3] px-4 font-[family-name:var(--font-nunito)] text-sm text-[#111] outline-none placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₦"
              className="h-[52px] w-full rounded-xl border border-[#e6ebf3] px-4 font-[family-name:var(--font-nunito)] text-sm text-[#111] outline-none placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Duration</label>
            <select
              value={cycle}
              onChange={(e) => setCycle(e.target.value as FeePlanCycle)}
              className="h-[52px] w-full rounded-xl border border-[#e6ebf3] px-4 font-[family-name:var(--font-nunito)] text-sm text-[#111] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              {FEE_PLAN_DURATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-4 border-t border-[#e6ebf3] bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="flex h-11 items-center justify-center rounded-lg border border-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]"
          >
            Cancel
          </button>
          <button
            disabled={!canSubmit}
            onClick={() => {
              onCreate({ name, amount, cycle });
              onClose();
            }}
            className="flex h-11 w-40 items-center justify-center rounded-lg bg-[#3b2513] font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] disabled:cursor-not-allowed disabled:bg-[#e0bfa0]"
          >
            Create Plan
          </button>
        </div>
      </div>
    </div>
  );
}

function FeePlansSection() {
  const [plans, setPlans] = useState(FEE_PLANS);
  const [newPlanOpen, setNewPlanOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Fee Plans</p>
        <button
          onClick={() => setNewPlanOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
        >
          <Plus className="size-3.5" />
          Add Plan
        </button>
      </div>
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#edd9c0]">
              {["Plan", "Amount", "Billing Cycle", "Applies To", "Status"].map((h) => (
                <th key={h} className="px-5 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaecf0]">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-[#faf9f7]">
                <td className="px-5 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">{plan.name}</td>
                <td className="px-5 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{plan.amount}</td>
                <td className="px-5 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{plan.cycle}</td>
                <td className="px-5 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">{plan.appliesTo}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${
                      plan.status === "Active" ? "border-[#009061] bg-[#ecfff8] text-[#009061]" : "border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]"
                    }`}
                  >
                    {plan.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-2 p-4 lg:hidden">
        {plans.map((plan) => (
          <div key={plan.id} className="rounded-xl border border-[#eaecf0] p-3">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2d1810]">{plan.name}</span>
              <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{plan.amount}</span>
            </div>
            <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              {plan.cycle} • {plan.appliesTo}
            </p>
          </div>
        ))}
      </div>

      {newPlanOpen && (
        <NewPlanModal
          onClose={() => setNewPlanOpen(false)}
          onCreate={({ name, amount, cycle }) =>
            setPlans((prev) => [
              ...prev,
              {
                id: `fee-${prev.length + 1}`,
                name,
                amount: amount.startsWith("₦") ? amount : `₦${amount}`,
                cycle,
                appliesTo: "All Rooms",
                status: "Draft",
              },
            ])
          }
        />
      )}
    </div>
  );
}

function AdmissionsSection() {
  const [steps, setSteps] = useState(ADMISSION_FORM_STEPS);

  function toggleField(stepId: string, fieldId: string) {
    setSteps((prev) =>
      prev.map((step) =>
        step.id !== stepId
          ? step
          : { ...step, fields: step.fields.map((f) => (f.id === fieldId ? { ...f, enabled: !f.enabled } : f)) }
      )
    );
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">New Child Enrollment</p>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">Enrollment form requirements</p>
        </div>
        <button className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]">
          Add Form
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col gap-3 rounded-xl border border-[#e6ebf3] p-4">
            <p className="font-[family-name:var(--font-nunito)] text-base font-semibold text-[#1f2937]">{step.title}</p>
            {step.fields.map((field) => (
              <div key={field.id} className="flex items-center gap-4 rounded-lg border border-[#ccd2dc] px-3 py-3">
                <button
                  onClick={() => toggleField(step.id, field.id)}
                  role="switch"
                  aria-checked={field.enabled}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${field.enabled ? "bg-[#3b2513]" : "bg-[#ccd2dc]"}`}
                >
                  <span className={`absolute top-0.5 size-4 rounded-full bg-white transition-transform ${field.enabled ? "translate-x-[18px]" : "translate-x-0.5"}`} />
                </button>
                <div className="flex-1">
                  <p className="font-[family-name:var(--font-nunito)] text-sm text-[#1f2937]">{field.label}</p>
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{field.description}</p>
                </div>
                {field.required && (
                  <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Required</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function AiSettingsSection() {
  const [tone, setTone] = useState(AI_TONE_OPTIONS[0].id);
  const [gradient, setGradient] = useState(0);
  const [frequency, setFrequency] = useState(AI_ALERT_FREQUENCIES[0]);
  const [features, setFeatures] = useState(AI_FEATURE_CONTROLS);

  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-5">
      <div
        className="flex items-center gap-4 rounded-xl p-5"
        style={{ backgroundImage: "linear-gradient(132deg, rgb(45,24,16) 0%, rgb(61,36,24) 70%, rgb(61,36,24) 100%)" }}
      >
        <div className="flex size-16 items-center justify-center rounded-full bg-[#c4c4c4] font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#3b2513]">
          A
        </div>
        <div>
          <p className="font-[family-name:var(--font-nunito)] text-xs text-[#c78c5f]">AI Name</p>
          <p className="font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#f5edd8]">Ada</p>
          <p className="font-[family-name:var(--font-urbanist)] text-sm text-[#faf2e1]">Always on creche intelligence</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-[family-name:var(--font-nunito)] text-base font-semibold text-black">Personality & Tone</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {AI_TONE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setTone(opt.id)}
              className={`flex flex-col gap-1 rounded-lg border px-4 py-3 text-left ${
                tone === opt.id ? "border-[#3b2513] bg-[#fdf6e8]" : "border-[#e6ebf3]"
              }`}
            >
              <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">{opt.label}</p>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#707070]">{opt.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-[family-name:var(--font-nunito)] text-base font-semibold text-black">Display Gradient</p>
        <div className="flex gap-3">
          {AI_GRADIENT_OPTIONS.map((color, i) => (
            <button
              key={color}
              onClick={() => setGradient(i)}
              style={{ backgroundColor: color }}
              className={`h-10 w-24 rounded-full border-2 ${gradient === i ? "border-[#3b2513]" : "border-transparent"}`}
              aria-label={`Gradient ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-[family-name:var(--font-nunito)] text-base font-semibold text-black">Alert Frequency</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AI_ALERT_FREQUENCIES.map((freq) => (
            <button
              key={freq}
              onClick={() => setFrequency(freq)}
              className={`rounded-lg border px-3 py-3 text-left font-[family-name:var(--font-nunito)] text-sm font-semibold ${
                frequency === freq ? "border-[#3b2513] bg-[#fdf6e8] text-[#3b2513]" : "border-[#e6ebf3] text-black"
              }`}
            >
              {freq}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="font-[family-name:var(--font-nunito)] text-base font-semibold text-black">AI Feature Controls</p>
        <div className="flex flex-col gap-3">
          {features.map((feat) => (
            <div key={feat.id} className="flex items-center gap-4 rounded-lg border border-[#e6ebf3] px-4 py-3">
              <button
                onClick={() => setFeatures((prev) => prev.map((f) => (f.id === feat.id ? { ...f, enabled: !f.enabled } : f)))}
                role="switch"
                aria-checked={feat.enabled}
                className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${feat.enabled ? "bg-[#3b2513]" : "bg-[#ccd2dc]"}`}
              >
                <span className={`absolute top-0.5 size-4 rounded-full bg-white transition-transform ${feat.enabled ? "translate-x-[18px]" : "translate-x-0.5"}`} />
              </button>
              <div>
                <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-black">{feat.label}</p>
                <p className="font-[family-name:var(--font-nunito)] text-xs text-[#707070]">{feat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OtherAppsSection() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5">
      <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">Other Apps</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {OTHER_APPS.map((app) => (
          <div key={app.id} className="flex flex-col gap-3 rounded-lg border border-[#e6ebf3] p-4">
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-nunito)] text-sm font-bold text-[#2d1810]">{app.name}</p>
              <span
                className={`rounded-full border px-2.5 py-0.5 font-[family-name:var(--font-urbanist)] text-xs ${
                  app.status === "Connected" ? "border-[#009061] bg-[#ecfff8] text-[#009061]" : "border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]"
                }`}
              >
                {app.status}
              </span>
            </div>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{app.description}</p>
            <button
              className={`self-start rounded-lg px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium ${
                app.status === "Connected" ? "border border-[#d0d5dd] text-[#2d1810]" : "bg-[#3b2513] text-[#faf2e1]"
              }`}
            >
              {app.status === "Connected" ? "Manage" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SettingsTab() {
  const [activeTab, setActiveTab] = useState<SettingsSubTab>("Branch Profile");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">Settings</h1>
      <div className="flex gap-1 overflow-x-auto border-b border-[#dcdcdc]">
        {SETTINGS_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 whitespace-nowrap px-3 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold ${
              activeTab === tab ? "border-b-[1.5px] border-[#3b2513] text-[#3b2513]" : "text-[#7e7e7e]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Branch Profile" && <BranchProfileSection />}
      {activeTab === "Notification" && <NotificationSection />}
      {activeTab === "Security" && <SecuritySection />}
      {activeTab === "Fee Plans" && <FeePlansSection />}
      {activeTab === "Admissions" && <AdmissionsSection />}
      {activeTab === "Role Access" && <RoleAccessSection />}
      {activeTab === "AI Settings" && <AiSettingsSection />}
      {activeTab === "Other Apps" && <OtherAppsSection />}
    </div>
  );
}
