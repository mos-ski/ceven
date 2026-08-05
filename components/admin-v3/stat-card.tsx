import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatCardV3({
  icon: Icon,
  label,
  value,
  sub,
  subColor,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  subColor?: string;
}) {
  return (
    <Card padding="compact" className="relative overflow-hidden">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">{label}</p>
      <p className="mt-1.5 font-[family-name:var(--font-merriweather)] text-[1.85rem] font-bold leading-none text-[#2D1810]">
        {value}
      </p>
      {sub && (
        <p className="mt-1.5 text-[11px]" style={{ color: subColor ?? "#2D1810" }}>
          {sub}
        </p>
      )}
      <Icon className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-[#2D1810]/10" />
    </Card>
  );
}
