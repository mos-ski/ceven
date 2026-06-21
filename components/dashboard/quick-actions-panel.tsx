"use client";

import {
  BarChart2,
  ClipboardList,
  FileText,
  QrCode,
  ShieldAlert,
  Sliders,
  Users,
} from "lucide-react";

export type QuickActionKey =
  | "addChild"
  | "qrStation"
  | "newLog"
  | "raiseIncident"
  | "addCaregiver"
  | "newInvoice"
  | "viewReports";

type ActionDef = {
  key: QuickActionKey;
  label: string;
  icon: typeof Users;
};

const ACTION_DEFS: Record<QuickActionKey, ActionDef> = {
  addChild: { key: "addChild", label: "Enroll New Child", icon: Users },
  qrStation: { key: "qrStation", label: "QR Check-in", icon: QrCode },
  newLog: { key: "newLog", label: "New Log", icon: ClipboardList },
  raiseIncident: { key: "raiseIncident", label: "Raise Incident", icon: ShieldAlert },
  addCaregiver: { key: "addCaregiver", label: "Add Caregiver", icon: Users },
  newInvoice: { key: "newInvoice", label: "New Invoice", icon: FileText },
  viewReports: { key: "viewReports", label: "View Reports", icon: BarChart2 },
};

type Props = {
  actions: QuickActionKey[];
  onAction: (key: QuickActionKey) => void;
  onCustomize: () => void;
};

export default function QuickActionsPanel({ actions, onAction, onCustomize }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#e0bfa0] bg-[#faf2e1] px-4 py-4 shadow-[0_12px_40px_-12px_rgba(12,12,13,0.4)]">
      <div className="flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-nunito)] text-base font-medium text-black">Quick Actions</h3>
        <button
          onClick={onCustomize}
          className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-xs font-bold text-[#3b2513] hover:opacity-70"
        >
          Customize
          <Sliders className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {actions.map((key) => {
          const def = ACTION_DEFS[key];
          if (!def) return null;
          const Icon = def.icon;
          return (
            <button
              key={key}
              onClick={() => onAction(key)}
              className="flex h-[88px] w-[112px] flex-col items-center justify-center gap-4 rounded-xl border border-[#d4a67f] bg-[#faf2e1] px-2 py-4 hover:bg-white"
            >
              <Icon className="h-6 w-6 text-[#3b2513]" />
              <span className="text-center font-[family-name:var(--font-nunito)] text-xs font-bold text-[#3b2513]">
                {def.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
