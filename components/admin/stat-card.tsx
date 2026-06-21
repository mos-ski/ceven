import { TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  trendLabel: string;
  trendUp?: boolean;
};

export function StatCard({ label, value, trendLabel, trendUp }: StatCardProps) {
  return (
    <div className="min-w-0 flex-1 rounded-xl border border-card-border bg-white p-3 sm:p-4">
      <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text sm:text-sm">
        {label}
      </p>
      <p className="mt-2 font-[family-name:var(--font-merriweather)] text-xl font-bold text-stat-heading sm:text-[32px]">
        {value}
      </p>
      <p
        className={cn(
          "mt-2 flex items-center gap-1 font-[family-name:var(--font-nunito)] text-[10px]",
          trendUp ? "text-success-text" : "text-muted-text"
        )}
      >
        {trendUp && <TrendingUp className="size-3" />}
        {trendLabel}
      </p>
    </div>
  );
}
