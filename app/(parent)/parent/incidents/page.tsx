"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react";
import { mockChild, mockChildIncidents, type IncidentStatus } from "@/lib/parent/mock-data";
import { NewBadge } from "@/components/parent/new-badge";

const SEVERITY_STYLES: Record<string, string> = {
  minor: "bg-amber-100 text-amber-700",
  moderate: "bg-orange-100 text-orange-700",
  severe: "bg-red-100 text-red-700",
};

const STATUS_STYLES: Record<IncidentStatus, string> = {
  Open: "bg-blue-100 text-blue-700",
  "Under Review": "bg-amber-100 text-amber-700",
  Resolved: "bg-emerald-100 text-emerald-700",
};

export default function ParentIncidentsPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-5 pt-12 pb-4 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-cg-brand">Incidents</h1>
            <NewBadge />
          </div>
          <p className="text-xs text-gray-400">For {mockChild.name}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {mockChildIncidents.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 size={24} className="text-emerald-500" />
            </div>
            <p className="text-sm font-semibold text-gray-700">No Incidents Reported</p>
            <p className="text-xs text-gray-400">You&apos;ll be notified here if anything happens with {mockChild.name}.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {mockChildIncidents.map((inc) => (
              <div key={inc.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="shrink-0 text-red-500" />
                    <p className="text-sm font-bold text-gray-800">{inc.title}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${SEVERITY_STYLES[inc.severity]}`}>
                    {inc.severity}
                  </span>
                </div>
                <p className="mb-3 text-xs leading-relaxed text-gray-500">{inc.description}</p>
                <div className="mb-3 flex items-center gap-3 text-[10px] text-gray-400">
                  <span>{inc.time}</span>
                  <span>·</span>
                  <span>{inc.date}</span>
                </div>
                <div className="mb-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${STATUS_STYLES[inc.status]}`}>
                    {inc.status}
                  </span>
                </div>
                <div className="rounded-xl bg-gray-50 px-3 py-2.5">
                  <p className="mb-1 text-[10px] font-semibold text-gray-400">
                    {inc.status === "Resolved" ? "What was done" : "Action taken so far"}
                  </p>
                  <p className="text-xs text-gray-600">{inc.actionTaken}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
