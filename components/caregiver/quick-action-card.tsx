"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
};

export function QuickActionCard({ icon: Icon, label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-cg-quick-action py-5 active:brightness-95"
    >
      <Icon size={24} className="text-cg-brand" />
      <span className="text-xs font-medium text-cg-brand">{label}</span>
    </button>
  );
}
