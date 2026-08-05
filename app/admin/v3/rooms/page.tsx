"use client";

import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { RoomsClassesTab } from "@/components/admin/children/rooms-classes-tab";
import { ROOMS } from "@/lib/mock-data/children";
import { exportRowsToCsv } from "@/lib/super-admin/export-csv";

export default function RoomsV3Page() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Rooms & Classes"
        description="Occupancy, capacity and lead caregivers across every room."
        action={
          <>
            <Button
              variant="outline"
              onClick={() =>
                exportRowsToCsv(
                  "rooms.csv",
                  ["Room", "Age Range", "Capacity", "Enrolled", "Caregiver"],
                  ROOMS.map((r) => [r.name, r.ageRange, r.capacity, r.enrolled, r.caregiver]),
                )
              }
              className="h-9 gap-2 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              onClick={() => setCreateOpen(true)}
              className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
            >
              <Plus className="h-4 w-4" />
              New Room
            </Button>
          </>
        }
      />

      <RoomsClassesTab createOpen={createOpen} onCreateOpenChange={setCreateOpen} />
    </div>
  );
}
