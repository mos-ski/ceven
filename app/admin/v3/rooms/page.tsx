"use client";

import { RoomsClassesTab } from "@/components/admin/children/rooms-classes-tab";

export default function RoomsV3Page() {
 return (
 <div className="flex flex-col gap-5">
  <div>
  <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
   Rooms &amp; Classes
  </h1>
  <p className="mt-1 text-sm text-[#2D1810]/60">
   Occupancy, capacity and lead caregivers across every room.
  </p>
  </div>

  <RoomsClassesTab />
 </div>
 );
}
