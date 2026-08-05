import { TableSkeleton } from "@/components/admin-v3/skeletons";

export default function PayrollLoading() {
 return (
  <div className="flex flex-col gap-5">
   <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
     <div key={i} className="relative overflow-hidden rounded-2xl bg-[#F5EDD8]/30 p-4">
      <div className="h-3 w-20 bg-gray-100 rounded mb-2 animate-pulse" />
      <div className="h-7 w-16 bg-gray-100 rounded mb-1 animate-pulse" />
     </div>
    ))}
   </div>
   <TableSkeleton rows={5} cols={6} />
  </div>
 );
}
