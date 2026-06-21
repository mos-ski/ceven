"use client";

import {
  BarChart2,
  ClipboardList,
  FileText,
  GripVertical,
  MinusCircle,
  Plus,
  PlusCircle,
  QrCode,
  ShieldAlert,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import type { QuickActionKey } from "@/components/dashboard/quick-actions-panel";

type Props = {
  selected: QuickActionKey[];
  onSave: (next: QuickActionKey[]) => void;
  onClose: () => void;
};

type ActionDef = {
  key: QuickActionKey;
  label: string;
  icon: typeof Plus;
};

const ALL_ACTIONS: ActionDef[] = [
  { key: "addChild", label: "Add Child", icon: Users },
  { key: "qrStation", label: "QR Station", icon: QrCode },
  { key: "newLog", label: "New Log", icon: ClipboardList },
  { key: "raiseIncident", label: "Raise Incident", icon: ShieldAlert },
  { key: "addCaregiver", label: "Add Caregiver", icon: Users },
  { key: "newInvoice", label: "New Invoice", icon: FileText },
  { key: "viewReports", label: "View Reports", icon: BarChart2 },
];

const MAX_SELECTED = 12;

export default function CustomizeQuickActionsModal({ selected, onSave, onClose }: Props) {
  const [draft, setDraft] = useState<QuickActionKey[]>(selected);

  const selectedActions = draft
    .map((key) => ALL_ACTIONS.find((a) => a.key === key))
    .filter((a): a is ActionDef => Boolean(a));
  const availableActions = ALL_ACTIONS.filter((a) => !draft.includes(a.key));

  const remove = (key: QuickActionKey) => setDraft((prev) => prev.filter((k) => k !== key));
  const add = (key: QuickActionKey) => {
    if (draft.length >= MAX_SELECTED) return;
    setDraft((prev) => [...prev, key]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex max-h-[90vh] w-full max-w-full mx-2 sm:mx-4 sm:max-w-[680px] flex-col overflow-hidden rounded-2xl border-6 border-[#faf2e1] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e6ebf3] px-6 py-5">
          <div>
            <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#171f26]">
              Customize Quick Actions
            </h2>
            <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
              Complete all required fields. You can add more details from the childs profile after enrolment
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center text-[#6b7280] hover:text-[#2d1810]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex items-center gap-2 text-black">
            <GripVertical className="h-4 w-4 text-[#6b7280]" />
            <p className="font-[family-name:var(--font-nunito)] text-xs">
              Drag and drop to rearrange view order
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-[family-name:var(--font-nunito)] text-xs text-black">
              Selected (<span className="font-semibold">Max of {MAX_SELECTED}</span>)
            </p>
            <div className="flex flex-wrap gap-4">
              {selectedActions.map(({ key, label, icon: Icon }) => (
                <div
                  key={key}
                  className="relative flex w-[calc(50%-8px)] sm:w-[140px] flex-col items-center gap-4 rounded-xl border border-[#d4a67f] bg-[#faf2e1] px-5 py-6"
                >
                  <Icon className="h-6 w-6 text-[#3b2513]" />
                  <div className="flex items-center gap-1">
                    <span className="font-[family-name:var(--font-nunito)] text-xs font-bold text-[#3b2513]">
                      {label}
                    </span>
                  </div>
                  <button
                    onClick={() => remove(key)}
                    className="absolute right-2 top-1.5 text-[#cd3030] hover:opacity-70"
                    aria-label={`Remove ${label}`}
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>
                </div>
              ))}
              {selectedActions.length === 0 && (
                <p className="font-[family-name:var(--font-nunito)] text-sm text-[#9ca3af]">
                  No quick actions selected yet.
                </p>
              )}
            </div>
          </div>

          {availableActions.length > 0 && (
            <div className="flex flex-col gap-4">
              <p className="font-[family-name:var(--font-nunito)] text-xs text-black">Add actions from below</p>
              <div className="flex flex-wrap gap-4">
                {availableActions.map(({ key, label, icon: Icon }) => (
                  <div
                    key={key}
                    className="relative flex w-[calc(50%-8px)] sm:w-[140px] flex-col items-center gap-4 rounded-xl border border-[#ccd2dc] px-5 py-6"
                  >
                    <Icon className="h-6 w-6 text-[#3b2513]" />
                    <div className="flex items-center gap-1">
                      <span className="font-[family-name:var(--font-nunito)] text-xs font-bold text-[#3b2513]">
                        {label}
                      </span>
                    </div>
                    <button
                      onClick={() => add(key)}
                      className="absolute right-2 top-1.5 text-[#3b2513] hover:opacity-70"
                      aria-label={`Add ${label}`}
                    >
                      <PlusCircle className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#e6ebf3] px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-[#3b2513] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(draft)}
            className="w-[160px] rounded-lg bg-[#3b2513] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
