"use client";

import { X, ClipboardList, FileText } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";
import { LogActivityForm } from "./log-activity-form";
import { LogReportForm } from "./log-report-form";
import { DailyReportCard } from "./daily-report-card";
import { IncidentForm } from "./incident-form";
import { mockDailyReport } from "@/lib/caregiver/mock-data";

export function LogSheet() {
  const { mode, close, openActivity, openReport } = useLogSheet();

  if (mode === "idle") return null;

  const title =
    mode === "chooser"
      ? "Log"
      : mode === "activity"
        ? "Log Activity"
        : mode === "report"
          ? "Log Report"
          : mode === "incident"
            ? "Log Incident"
            : "Daily Report";

  return (
    <>
      <div className="absolute inset-0 z-40 bg-black/40" onClick={close} />
      <div className="absolute inset-x-0 bottom-0 z-50 max-h-[90%] overflow-y-auto rounded-t-3xl bg-white">
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-t-3xl bg-white px-5 py-4 shadow-sm">
          <h3 className="text-base font-bold text-cg-brand">{title}</h3>
          <button onClick={close}>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200">
              <X size={14} className="text-gray-600" />
            </div>
          </button>
        </div>

        <div className="px-5 pb-8 pt-2">
          {mode === "chooser" && (
            <div className="flex flex-col gap-1">
              <button
                onClick={openActivity}
                className="flex items-center justify-between rounded-xl px-2 py-4 text-sm font-medium text-cg-brand hover:bg-gray-50 active:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cg-quick-action">
                    <ClipboardList size={18} className="text-cg-accent" />
                  </div>
                  Log Activity
                </div>
                <span className="text-lg text-gray-300">›</span>
              </button>

              <button
                onClick={openReport}
                className="flex items-center justify-between rounded-xl px-2 py-4 text-sm font-medium text-cg-brand hover:bg-gray-50 active:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cg-quick-action">
                    <FileText size={18} className="text-cg-accent" />
                  </div>
                  Log Daily Report
                </div>
                <span className="text-lg text-gray-300">›</span>
              </button>
            </div>
          )}

          {mode === "activity" && <LogActivityForm />}

          {mode === "report" && <LogReportForm />}

          {mode === "incident" && <IncidentForm />}

          {mode === "viewReport" && <DailyReportCard report={mockDailyReport} />}
        </div>
      </div>
    </>
  );
}
