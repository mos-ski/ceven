"use client";

import { PageHeader } from "@/components/ui/page-header";
import { RoomsClassesTab } from "@/components/admin/children/rooms-classes-tab";

export default function RoomsV3Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Rooms & Classes"
        description="Occupancy, capacity and lead caregivers across every room."
      />

      <RoomsClassesTab />
    </div>
  );
}
