"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { ChildrenTable } from "@/components/admin/children/children-table";
import { StatCard } from "@/components/admin/stat-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EnrollChildModal from "@/components/dashboard/enroll-child-modal";
import { CHILDREN_STATS } from "@/lib/mock-data/children";

export default function ChildrenPage() {
  const [enrollOpen, setEnrollOpen] = useState(false);

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
              <DropdownMenuItem>Log Daily Report</DropdownMenuItem>
              <DropdownMenuItem>New Picture/Video</DropdownMenuItem>
              <DropdownMenuItem>Log Incident</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        <div className="min-w-[160px] snap-start flex-1">
        <StatCard
          label="Total Enrolled"
          value={String(CHILDREN_STATS.totalEnrolled).padStart(2, "0")}
          trendLabel="+12.5% vs last month"
          trendUp
        />
        </div>
        <div className="min-w-[160px] snap-start flex-1">
        <StatCard
          label="Active"
          value={String(CHILDREN_STATS.active).padStart(2, "0")}
          trendLabel="88% attendance today"
        />
        </div>
        <div className="min-w-[160px] snap-start flex-1">
        <StatCard
          label="New This Month"
          value={String(CHILDREN_STATS.newThisMonth).padStart(2, "0")}
          trendLabel="+12.5% vs last month"
          trendUp
        />
        </div>
        <div className="min-w-[160px] snap-start flex-1">
        <StatCard
          label="Average Activity Log"
          value={CHILDREN_STATS.averageActivityLog.toFixed(1)}
          trendLabel="logs per child today"
        />
        </div>
      </div>

      <ChildrenTable />

      {enrollOpen && <EnrollChildModal onClose={() => setEnrollOpen(false)} />}
    </div>
  );
}
