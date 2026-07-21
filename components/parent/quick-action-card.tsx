"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isNew?: boolean;
};

export function QuickActionCard({ icon: Icon, label, onClick, isNew }: Props) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-2 rounded-2xl bg-cg-quick-action py-5 active:brightness-95"
    >
      {isNew && (
        <span className="absolute right-2 top-2 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">
          New
        </span>
      )}
      <Icon size={24} className="text-cg-brand" />
      <span className="text-xs font-medium text-cg-brand">{label}</span>
    </button>
  );
}
