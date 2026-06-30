"use client";

import { useEffect } from "react";
import { useLogSheet } from "@/components/caregiver/log-sheet-context";

export default function ReportPage() {
  const { openLog } = useLogSheet();

  useEffect(() => {
    openLog();
  }, [openLog]);

  return null;
}
