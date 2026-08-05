import { StatsRowSkeleton, TableSkeleton } from "@/components/admin-v3/skeletons";

export default function BillingLoading() {
  return (
    <div className="flex flex-col gap-5">
      <StatsRowSkeleton count={4} />
      <TableSkeleton rows={5} cols={7} />
    </div>
  );
}
