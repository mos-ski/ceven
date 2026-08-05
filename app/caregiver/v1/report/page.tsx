"use client";

import { useState } from "react";
import { Calendar, Users, Clock, FileText } from "lucide-react";
import { mockChildren } from "@/lib/caregiver/mock-data";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { DailyReportViewer } from "@/components/caregiver/daily-report-viewer";
import { CalendarPicker } from "@/components/caregiver/calendar-picker";
import { useLogSheet } from "@/components/caregiver/log-sheet-context";

const REPORT_STATUS: Record<string, { status: "pending" | "sent"; progress: [number, number] }> = {
  "child-1": { status: "sent",    progress: [2, 2] },
  "child-2": { status: "sent",    progress: [2, 2] },
  "child-3": { status: "pending", progress: [1, 2] },
  "child-4": { status: "pending", progress: [0, 2] },
  "child-5": { status: "sent",    progress: [2, 2] },
};

const CHILD_EMOJI = "🐻";

type Tab = "children" | "pending" | "sent";

export default function ReportPage() {
  const { openReport } = useLogSheet();
  const [activeTab, setActiveTab] = useState<Tab>("children");
  const [showViewer, setShowViewer] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const pendingList = mockChildren.filter((c) => REPORT_STATUS[c.id].status === "pending");
  const sentList    = mockChildren.filter((c) => REPORT_STATUS[c.id].status === "sent");
  const displayed   =
    activeTab === "children" ? mockChildren :
    activeTab === "pending"  ? pendingList  : sentList;

  function handleChildTap(childId: string) {
    if (REPORT_STATUS[childId].status === "sent") {
      setShowViewer(true);
    } else {
      openReport();
    }
  }

  const TABS: { id: Tab; label: string; count: number; icon: React.ElementType; activeBg: string }[] = [
    { id: "children", label: "Children",    count: mockChildren.length, icon: Users,    activeBg: "bg-cg-brand" },
    { id: "pending",  label: "Pending",     count: pendingList.length,  icon: Clock,    activeBg: "bg-amber-400" },
    { id: "sent",     label: "Sent Report", count: sentList.length,     icon: FileText, activeBg: "bg-emerald-600" },
  ];

  return (
    <div className="relative flex flex-1 flex-col bg-cg-bg">
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        {/* Title */}
        <h1 className="text-lg font-bold text-cg-brand" style={{ fontFamily: "var(--font-merriweather)" }}>
          Daily Reporting
        </h1>
        <p className="mb-3 text-xs text-gray-400">Select a child to log their daily activities &amp; report.</p>

        {/* Filter by date */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setShowCalendar(true)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500"
          >
            <Calendar size={14} className="text-cg-accent" />
            Filter by date
          </button>
        </div>

        {/* Stat chips */}
        <div className="mb-5 flex gap-2">
          {TABS.map(({ id, label, count, icon: Icon, activeBg }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-2xl border-2 py-3 transition-all ${
                  isActive
                    ? `${activeBg} border-transparent text-white`
                    : "border-gray-200 bg-white text-gray-500"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white/80" : "text-gray-400"} />
                <span className="text-[10px] font-medium leading-none">{label}</span>
                <span className="text-base font-bold leading-none">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Child list */}
        <div className="flex flex-col gap-3">
          {displayed.map((child) => {
            const rs = REPORT_STATUS[child.id];
            const isSent = rs.status === "sent";
            return (
              <button
                key={child.id}
                onClick={() => handleChildTap(child.id)}
                className="flex items-center justify-between rounded-2xl bg-white p-4 text-left shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-quick-action text-lg">
                    {CHILD_EMOJI}
                  </div>
                  <p className="text-sm font-semibold text-cg-brand">{child.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!isSent && (
                    <span className="text-[10px] text-gray-400">
                      {rs.progress[0]}/{rs.progress[1]}
                    </span>
                  )}
                  {isSent && rs.progress[0] > 0 && (
                    <span className="text-lg">💬</span>
                  )}
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                      isSent
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {isSent ? "Sent" : "Pending"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showViewer && <DailyReportViewer onClose={() => setShowViewer(false)} />}
      {showCalendar && <CalendarPicker onClose={() => setShowCalendar(false)} />}
      <LogSheet />
      <BottomNav />
    </div>
  );
}
