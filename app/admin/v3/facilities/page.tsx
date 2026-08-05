"use client";

import { useState } from "react";
import { Wrench, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { FacilitiesView } from "@/components/admin/daily-operations/facilities-view";

export default function FacilitiesV3Page() {
  const [requestOpen, setRequestOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Facilities"
        description="Maintenance requests and the recurring cleaning schedule."
        action={
          <>
            <Button
              variant="outline"
              onClick={() => setScheduleOpen(true)}
              className="h-9 gap-2 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]"
            >
              <Sparkles className="h-4 w-4" />
              Schedule Cleaning
            </Button>
            <Button
              onClick={() => setRequestOpen(true)}
              className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
            >
              <Wrench className="h-4 w-4" />
              New Maintenance Request
            </Button>
          </>
        }
      />
      <FacilitiesView
        requestOpen={requestOpen}
        onRequestOpenChange={setRequestOpen}
        scheduleOpen={scheduleOpen}
        onScheduleOpenChange={setScheduleOpen}
      />
    </div>
  );
}
