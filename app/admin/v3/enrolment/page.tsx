"use client";

import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { EnrolmentWaitlistTab } from "@/components/admin/children/enrolment-waitlist-tab";

export default function EnrolmentV3Page() {
  const [newEnquiryOpen, setNewEnquiryOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title="Enrolment & Waitlist"
        description="Track enquiries through the pipeline, manage the waitlist, trial sessions and leavers."
        action={
          <>
            <Button
              variant="outline"
              onClick={() => toast.success("Exporting enrolment data...")}
              className="h-9 gap-2 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              onClick={() => setNewEnquiryOpen(true)}
              className="h-9 gap-2 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1]"
            >
              <Plus className="h-4 w-4" />
              New Enquiry
            </Button>
          </>
        }
      />

      <EnrolmentWaitlistTab newEnquiryOpen={newEnquiryOpen} onNewEnquiryOpenChange={setNewEnquiryOpen} />
    </div>
  );
}
