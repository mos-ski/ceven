"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { mockChildren } from "@/lib/caregiver/mock-data";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { useLogSheet } from "@/components/caregiver/log-sheet-context";

const REPORT_STATUS: Record<string, { status: "pending" | "sent"; progress: [number, number] }> = {
  "child-1": { status: "sent", progress: [2, 2] },
  "child-2": { status: "sent", progress: [1, 2] },
  "child-3": { status: "pending", progress: [0, 2] },
  "child-4": { status: "pending", progress: [0, 2] },
  "child-5": { status: "sent", progress: [2, 2] },
};

const CHILD_EMOJIS: Record<string, string> = {
  "child-1": "😊",
  "child-2": "🙂",
  "child-3": "😄",
  "child-4": "😃",
  "child-5": "😀",
};

type Tab = "children" | "pending" | "sent";

export default function ReportPage() {
  const router = useRouter();
  const { openReport } = useLogSheet();
  const [activeTab, setActiveTab] = useState<Tab>("children");

  const allChildren = mockChildren;
  const pending = allChildren.filter((c) => REPORT_STATUS[c.id].status === "pending");
  const sent = allChildren.filter((c) => REPORT_STATUS[c.id].status === "sent");

  const displayed =
    activeTab === "children" ? allChildren : activeTab === "pending" ? pending : sent;

  return (
    <div className="relative flex flex-1 flex-col bg-cg-bg">
      <div className="bg-white px-4 pb-3 pt-3 shadow-sm">
        <div className="mb-0.5 flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-base font-bold text-cg-brand">Daily Reporting</h1>
        </div>
        <p className="ml-8 text-xs text-gray-400">
          Select a child to log their daily activities &amp; report.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <button className="mb-3 flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-500 shadow-sm">
          <Calendar size={14} className="text-cg-accent" />
          Filter by date
        </button>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setActiveTab("children")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "children"
                ? "bg-cg-brand text-white"
                : "border border-gray-200 bg-white text-gray-500"
            }`}
          >
            Children ({allChildren.length})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "pending"
                ? "bg-amber-400 text-white"
                : "border border-gray-200 bg-white text-gray-500"
            }`}
          >
            Pending ({pending.length})
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "sent"
                ? "bg-green-500 text-white"
                : "border border-gray-200 bg-white text-gray-500"
            }`}
          >
            Sent Report ({sent.length})
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {displayed.map((child) => {
            const rs = REPORT_STATUS[child.id];
            return (
              <button
                key={child.id}
                onClick={openReport}
                className="flex items-center justify-between rounded-2xl bg-white p-4 text-left shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-quick-action text-xl">
                    {CHILD_EMOJIS[child.id]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-cg-brand">{child.name}</p>
                    <p className="text-xs text-gray-400">
                      {rs.progress[0]}/{rs.progress[1]} report{rs.progress[1] !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                    rs.status === "sent"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {rs.status === "sent" ? "Sent" : "Pending"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
