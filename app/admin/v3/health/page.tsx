"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { HealthIncidentsView } from "@/components/admin/daily-operations/health-incidents-view";

export default function HealthV3Page() {
  const [reportOpen, setReportOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Health & Incidents"
        description="Track incident reports, severity, and parent notifications."
        action={
          <Button
            onClick={() => setReportOpen(true)}
            className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
          >
            <AlertTriangle className="h-4 w-4" />
            Raise Incident
          </Button>
        }
      />
      <HealthIncidentsView reportOpen={reportOpen} onReportOpenChange={setReportOpen} />
    </div>
  );
}
