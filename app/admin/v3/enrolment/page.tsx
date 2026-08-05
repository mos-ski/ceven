"use client";

import { EnrolmentWaitlistTab } from "@/components/admin/children/enrolment-waitlist-tab";

export default function EnrolmentV3Page() {
 return (
 <div className="flex flex-col gap-5">
  <div>
  <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
   Enrolment &amp; Waitlist
  </h1>
  <p className="mt-1 text-sm text-[#2D1810]/60">
   Track enquiries through the pipeline, manage the waitlist, trial sessions and leavers.
  </p>
  </div>

  <EnrolmentWaitlistTab />
 </div>
 );
}
