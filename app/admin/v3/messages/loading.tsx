import { TableSkeleton } from "@/components/admin-v3/skeletons";

export default function MessagesLoading() {
 return (
  <div className="flex gap-5">
   <div className="w-80 shrink-0 rounded-xl bg-[#F5EDD8]/30 p-3">
    <div className="h-9 w-full bg-gray-100 rounded-lg mb-3 animate-pulse" />
    {Array.from({ length: 6 }).map((_, i) => (
     <div key={i} className="flex items-center gap-3 py-2.5 border-b border-black/[0.04] last:border-0">
      <div className="h-9 w-9 rounded-full bg-gray-100 animate-pulse" />
      <div className="flex-1">
       <div className="h-3 w-24 bg-gray-100 rounded mb-1 animate-pulse" />
       <div className="h-3 w-32 bg-gray-50 rounded animate-pulse" />
      </div>
     </div>
    ))}
   </div>
   <div className="flex-1 rounded-xl bg-[#F5EDD8]/30 p-4">
    <div className="h-12 w-full bg-gray-50 rounded-xl mb-4 animate-pulse" />
    <div className="space-y-3">
     {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
       <div className={`h-10 ${i % 2 === 0 ? "w-48" : "w-36"} bg-gray-100 rounded-2xl animate-pulse`} />
      </div>
     ))}
    </div>
   </div>
  </div>
 );
}
