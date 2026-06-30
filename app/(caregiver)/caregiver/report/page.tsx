"use client";

import { useEffect } from "react";
import { useLogSheet } from "@/components/caregiver/log-sheet-context";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { BottomNav } from "@/components/caregiver/bottom-nav";

export default function ReportPage() {
  const { openLog } = useLogSheet();

  useEffect(() => {
    openLog();
  }, [openLog]);

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <LogSheet />
      <BottomNav />
    </div>
  );
}
