import { StatsRowSkeleton, TableSkeleton } from "@/components/admin-v3/skeletons";

export default function AnalyticsLoading() {
 return (
 <div className="flex flex-col gap-5">
  <StatsRowSkeleton count={4} />
  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
  <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
   <div className="h-4 w-32 bg-gray-100 rounded mb-4 animate-pulse" />
   <div className="h-48 bg-gray-50 rounded-xl" />
  </div>
  <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
   <div className="h-4 w-32 bg-gray-100 rounded mb-4 animate-pulse" />
   <div className="h-48 bg-gray-50 rounded-xl" />
  </div>
  </div>
 </div>
 );
}
