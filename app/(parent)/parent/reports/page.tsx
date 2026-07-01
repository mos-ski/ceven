"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockDailyReports } from "@/lib/parent/mock-data";

export default function ReportsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Daily Reports</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {mockDailyReports.map((report) => (
          <div key={report.date} className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold text-gray-400">{report.date}</p>

            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm">{report.mood.join(" ")}</span>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-cg-quick-action p-2.5 text-center">
                <p className="text-[10px] text-gray-400">Meals</p>
                <p className="text-base font-bold text-cg-brand">{report.meals}</p>
              </div>
              <div className="rounded-xl bg-cg-quick-action p-2.5 text-center">
                <p className="text-[10px] text-gray-400">Nap</p>
                <p className="text-xs font-bold text-cg-brand">{report.napDuration}</p>
              </div>
              <div className="rounded-xl bg-cg-quick-action p-2.5 text-center">
                <p className="text-[10px] text-gray-400">Hygiene</p>
                <p className="text-xs font-bold text-cg-brand">{report.hygiene}</p>
              </div>
            </div>

            <p className="text-xs text-gray-500">{report.activities}</p>
          </div>
        ))}
      </div>

      <ParentBottomNav />
    </div>
  );
}
