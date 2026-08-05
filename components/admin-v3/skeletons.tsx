"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
 return (
  <div className="flex flex-col gap-5">
   {/* Stats row */}
   <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
     <div key={i} className="relative overflow-hidden rounded-2xl bg-[#F5EDD8]/30 p-4">
      <Skeleton className="h-3 w-20 mb-2" />
      <Skeleton className="h-7 w-16 mb-1" />
      <Skeleton className="h-3 w-24" />
     </div>
    ))}
   </div>

   {/* Quick actions */}
   <div className="flex flex-wrap gap-2">
    {Array.from({ length: 6 }).map((_, i) => (
     <Skeleton key={i} className="h-9 w-24 rounded-lg" />
    ))}
   </div>

   <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
    {/* Left column - 2 cols */}
    <div className="lg:col-span-2 flex flex-col gap-5">
     {/* Daily brief */}
     <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
      <Skeleton className="h-4 w-28 mb-4" />
      <div className="space-y-3">
       {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-[#FAF2E1]/30 p-3">
         <Skeleton className="h-2 w-2 rounded-full mt-1 shrink-0" />
         <div className="flex-1">
          <Skeleton className="h-3 w-32 mb-1" />
          <Skeleton className="h-3 w-full" />
         </div>
         <Skeleton className="h-6 w-20 rounded-md" />
        </div>
       ))}
      </div>
     </div>

     {/* Room occupancy */}
     <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
      <Skeleton className="h-4 w-32 mb-4" />
      <div className="grid grid-cols-2 gap-3">
       {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-black/[0.06] bg-[#FAF2E1]/30 p-3">
         <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-8" />
         </div>
         <Skeleton className="h-2 w-full rounded-full mb-1" />
         <Skeleton className="h-3 w-16" />
        </div>
       ))}
      </div>
     </div>
    </div>

    {/* Right column */}
    <div className="flex flex-col gap-5">
     {/* Activity feed */}
     <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
      <Skeleton className="h-4 w-24 mb-4" />
      <div className="space-y-3">
       {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-start gap-3">
         <Skeleton className="h-2 w-2 rounded-full mt-1.5 shrink-0" />
         <div className="flex-1 min-w-0">
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-2/3" />
         </div>
         <Skeleton className="h-3 w-10 shrink-0" />
        </div>
       ))}
      </div>
     </div>

     {/* Payments */}
     <div className="rounded-2xl bg-[#F5EDD8]/30 p-5">
      <Skeleton className="h-4 w-36 mb-4" />
      <div className="space-y-2">
       {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between rounded-xl border border-black/[0.06] bg-[#FAF2E1]/30 p-3">
         <div>
          <Skeleton className="h-3 w-24 mb-1" />
          <Skeleton className="h-3 w-32" />
         </div>
         <div className="text-right">
          <Skeleton className="h-3 w-16 mb-1" />
          <Skeleton className="h-3 w-12" />
         </div>
        </div>
       ))}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}

export function TableSkeleton({ rows = 5, cols = 5 }: { rows?: number; cols?: number }) {
 return (
  <div className="flex flex-col gap-5">
   <div className="flex items-center justify-between">
    <Skeleton className="h-6 w-40" />
    <Skeleton className="h-9 w-28 rounded-lg" />
   </div>
   <div className="overflow-hidden rounded-xl bg-[#F5EDD8]/30">
    <div className="border-b border-black/[0.06] bg-[#FAF2E1]/50 px-4 py-3">
     <div className="flex gap-4">
      {Array.from({ length: cols }).map((_, i) => (
       <Skeleton key={i} className="h-3 flex-1" />
      ))}
     </div>
    </div>
    {Array.from({ length: rows }).map((_, r) => (
     <div key={r} className="border-b border-black/[0.04] px-4 py-3 last:border-0">
      <div className="flex gap-4">
       {Array.from({ length: cols }).map((_, c) => (
        <Skeleton key={c} className="h-3 flex-1" />
       ))}
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}

export function CardGridSkeleton({ count = 6, cols = 3 }: { count?: number; cols?: number }) {
 return (
  <div className="flex flex-col gap-5">
   <div className="flex items-center justify-between">
    <Skeleton className="h-6 w-40" />
    <Skeleton className="h-9 w-28 rounded-lg" />
   </div>
   <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-${cols}`}>
    {Array.from({ length: count }).map((_, i) => (
     <div key={i} className="rounded-xl bg-[#F5EDD8]/30 p-4">
      <div className="flex items-center gap-3 mb-3">
       <Skeleton className="h-10 w-10 rounded-full shrink-0" />
       <div className="flex-1">
        <Skeleton className="h-4 w-28 mb-1" />
        <Skeleton className="h-3 w-20" />
       </div>
      </div>
      <div className="space-y-2">
       <Skeleton className="h-3 w-full" />
       <Skeleton className="h-3 w-3/4" />
      </div>
     </div>
    ))}
   </div>
  </div>
 );
}

export function StatsRowSkeleton({ count = 4 }: { count?: number }) {
 return (
  <div className={`grid grid-cols-2 gap-3 lg:grid-cols-${count}`}>
   {Array.from({ length: count }).map((_, i) => (
    <div key={i} className="relative overflow-hidden rounded-2xl bg-[#F5EDD8]/30 p-4">
     <Skeleton className="h-3 w-20 mb-2" />
     <Skeleton className="h-7 w-16 mb-1" />
     <Skeleton className="h-3 w-24" />
    </div>
   ))}
  </div>
 );
}
