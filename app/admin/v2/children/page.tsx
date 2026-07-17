"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { ChildrenTable } from "@/components/admin/children/children-table";
import { CaregiversTab } from "@/components/admin/children/caregivers-tab";
import { EnrolmentWaitlistTab } from "@/components/admin/children/enrolment-waitlist-tab";
import { RoomsClassesTab } from "@/components/admin/children/rooms-classes-tab";
import { ParentsTab } from "@/components/admin/children/parents-tab";
import { StatCard } from "@/components/admin/stat-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EnrollChildModal from "@/components/dashboard/enroll-child-modal";
import { LogActivityModal, type LogActivityMode } from "@/components/admin/children/log-activity-modal";
import { CHILDREN_STATS } from "@/lib/mock-data/children";

export default function ChildrenPage() {
  return (
    <Suspense fallback={null}>
      <ChildrenPageInner />
    </Suspense>
  );
}

function ChildrenPageInner() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [logActivityMode, setLogActivityMode] = useState<LogActivityMode | null>(null);

  if (tab === "enrolment-waitlist") return <EnrolmentWaitlistTab />;
  if (tab === "caregivers") return <CaregiversTab />;
  if (tab === "rooms-classes") return <RoomsClassesTab />;
  if (tab === "parents") return <ParentsTab />;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-stat-heading">
          Children
        </h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => setEnrollOpen(true)}
            className="h-11 rounded-lg border-brand-dark px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-brand-dark"
          >
            Enroll a Child
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button className="h-11 gap-2 rounded-lg bg-brand-dark px-5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-sidebar-active-text" />
              }
            >
              Log Activity
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLogActivityMode("daily-report")}>Log Daily Report</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLogActivityMode("media")}>New Picture/Video</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLogActivityMode("incident")}>Log Incident</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        <StatCard
          label="Total Enrolled"
          value={String(CHILDREN_STATS.totalEnrolled).padStart(2, "0")}
          trendLabel="+12.5% vs last month"
          trendUp
        />
        <StatCard
          label="Active"
          value={String(CHILDREN_STATS.active).padStart(2, "0")}
          trendLabel="88% attendance today"
        />
        <StatCard
          label="New This Month"
          value={String(CHILDREN_STATS.newThisMonth).padStart(2, "0")}
          trendLabel="+12.5% vs last month"
          trendUp
        />
        <StatCard
          label="Average Activity Log"
          value={CHILDREN_STATS.averageActivityLog.toFixed(1)}
          trendLabel="logs per child today"
        />
      </div>

      <ChildrenTable />

      {enrollOpen && <EnrollChildModal onClose={() => setEnrollOpen(false)} />}
      {logActivityMode && (
        <LogActivityModal mode={logActivityMode} onClose={() => setLogActivityMode(null)} />
      )}
    </div>
  );
}
