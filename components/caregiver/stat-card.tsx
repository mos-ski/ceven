"use client";

import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  bgColor: string;
};

export function StatCard({ icon: Icon, label, value, bgColor }: Props) {
  return (
    <div
      className="flex flex-1 flex-col gap-2 rounded-2xl p-4"
      style={{ backgroundColor: bgColor }}
    >
      <Icon size={22} className="text-gray-600" />
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-cg-brand">{value}</p>
    </div>
  );
}
