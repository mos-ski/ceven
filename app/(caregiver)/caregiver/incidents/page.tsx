"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { mockIncidents } from "@/lib/caregiver/mock-data";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { useLogSheet } from "@/components/caregiver/log-sheet-context";

const SEVERITY_STYLES = {
  minor: "bg-amber-100 text-amber-700",
  moderate: "bg-orange-100 text-orange-700",
  severe: "bg-red-100 text-red-700",
};

export default function IncidentsPage() {
  const router = useRouter();
  const { openIncident } = useLogSheet();

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-base font-bold text-cg-brand">Incidents</h1>
        </div>
        <button onClick={openIncident} className="rounded-xl bg-cg-brand px-4 py-2 text-xs font-semibold text-white">
          + Log
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {mockIncidents.map((inc) => (
          <div key={inc.id} className="rounded-2xl bg-white p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-500 shrink-0" />
                <p className="text-sm font-bold text-cg-brand">{inc.title}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${SEVERITY_STYLES[inc.severity]}`}>
                {inc.severity}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">{inc.description}</p>
            <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3">
              <span>{inc.child}</span>
              <span>·</span>
              <span>{inc.time}</span>
              <span>·</span>
              <span>{inc.date}</span>
            </div>
            <div className="rounded-xl bg-gray-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold text-gray-400 mb-1">Action Taken</p>
              <p className="text-xs text-gray-600">{inc.action}</p>
            </div>
          </div>
        ))}
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
