"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText, CheckCircle2, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import {
  getApplication,
  completeNextStep,
  type Application,
} from "@/lib/shared/application";
import { NewBadge } from "@/components/parent/new-badge";

const STATUS_STYLES: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  submitted: { bg: "bg-blue-100", text: "text-blue-700", icon: <FileText size={14} /> },
  under_review: { bg: "bg-amber-100", text: "text-amber-700", icon: <Clock size={14} /> },
  waitlisted: { bg: "bg-purple-100", text: "text-purple-700", icon: <Clock size={14} /> },
  accepted: { bg: "bg-emerald-100", text: "text-emerald-700", icon: <CheckCircle2 size={14} /> },
  rejected: { bg: "bg-red-100", text: "text-red-700", icon: <FileText size={14} /> },
};

const STATUS_ORDER = ["submitted", "under_review", "waitlisted", "accepted"];

export default function ParentApplicationPage() {
  const router = useRouter();
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    setApplication(getApplication());
  }, []);

  if (!application) {
    return (
      <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
        <div className="flex items-center gap-3 bg-white px-5 pt-12 pb-4 shadow-sm">
          <button onClick={() => router.back()}><ArrowLeft size={20} className="text-gray-600" /></button>
          <h1 className="text-base font-bold text-cg-brand">Application Status</h1>
            <NewBadge />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-gray-400">No application found.</p>
        </div>
      </div>
    );
  }

  const currentStatusIdx = STATUS_ORDER.indexOf(application.status);

  function handleCompleteStep(idx: number) {
    if (!application) return;
    completeNextStep(application.id, idx);
    setApplication(getApplication());
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-5 pt-12 pb-4 shadow-sm">
        <button onClick={() => router.back()}><ArrowLeft size={20} className="text-gray-600" /></button>
        <h1 className="text-base font-bold text-cg-brand">Application Status</h1>
            <NewBadge />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Application card */}
        <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-800">{application.childName}</p>
              <p className="text-xs text-gray-400">{application.crecheName}</p>
            </div>
            <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold ${STATUS_STYLES[application.status].bg} ${STATUS_STYLES[application.status].text}`}>
              {STATUS_STYLES[application.status].icon}
              {application.status.replace("_", " ")}
            </span>
          </div>

          {application.waitlistPosition && application.status === "waitlisted" && (
            <div className="mb-3 rounded-xl bg-purple-50 px-4 py-3">
              <p className="text-xs font-semibold text-purple-700">Waitlist Position: #{application.waitlistPosition}</p>
              <p className="text-[10px] text-purple-500">Your position updates as other families enroll.</p>
            </div>
          )}
        </div>

        {/* Status timeline */}
        <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
          <p className="mb-3 text-xs font-semibold text-gray-500">Status Timeline</p>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="flex flex-col gap-4">
              {application.statusHistory.map((entry, i) => {
                const style = STATUS_STYLES[entry.status];
                return (
                  <div key={i} className="relative flex gap-4 pl-10">
                    <div className={`absolute left-2.5 top-0.5 h-3 w-3 rounded-full ${i === application.statusHistory.length - 1 ? "bg-cg-brand" : "bg-gray-300"}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}>
                          {entry.status.replace("_", " ")}
                        </span>
                        <p className="text-[10px] text-gray-400">
                          {new Date(entry.timestamp).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}
                        </p>
                      </div>
                      {entry.note && <p className="mt-1 text-[11px] text-gray-500">{entry.note}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="mb-3 text-xs font-semibold text-gray-500">Next Steps</p>
          <div className="flex flex-col gap-3">
            {application.nextSteps.map((step, i) => (
              <div key={i} className={`rounded-xl p-4 ${step.completed ? "bg-emerald-50" : "bg-gray-50"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {step.completed ? (
                        <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                      ) : (
                        <div className="h-4 w-4 shrink-0 rounded-full border-2 border-gray-300" />
                      )}
                      <p className={`text-sm font-semibold ${step.completed ? "text-emerald-700 line-through" : "text-gray-800"}`}>
                        {step.title}
                      </p>
                    </div>
                    <p className="mt-1 ml-6 text-[11px] text-gray-500">{step.description}</p>
                    {step.dueDate && !step.completed && (
                      <p className="mt-1 ml-6 text-[10px] text-amber-600">
                        Due: {new Date(step.dueDate).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}
                      </p>
                    )}
                  </div>
                  {!step.completed && (
                    <button
                      onClick={() => handleCompleteStep(i)}
                      className="shrink-0 rounded-lg bg-cg-brand px-3 py-1.5 text-[10px] font-semibold text-white"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ParentBottomNav />
    </div>
  );
}
