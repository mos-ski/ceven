"use client";

import { Star, Sparkles } from "lucide-react";
import { useState } from "react";

import { StatCard } from "@/components/admin/stat-card";
import {
  ANALYTICS_METRICS,
  ANNOUNCEMENT_AUDIENCES,
  ANNOUNCEMENT_TYPES,
  ATTENDANCE_WEEK,
  REVENUE_MONTHLY,
  ROOM_ENGAGEMENT,
  STAFF_COMPLIANCE_RATINGS,
} from "@/lib/mock-data/intelligence";

type AnalyticsSubTab = "Overview" | "Attendance" | "Revenue" | "Staff";
const SUB_TABS: AnalyticsSubTab[] = ["Overview", "Attendance", "Revenue", "Staff"];

function AttendanceBarChart() {
  const max = Math.max(...ATTENDANCE_WEEK.map((d) => d.checkedIn));
  return (
    <div className="flex h-48 items-stretch gap-4">
      {ATTENDANCE_WEEK.map((d) => (
        <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t bg-[#edd9c0]"
              style={{ height: `${(d.checkedIn / max) * 100}%` }}
            />
          </div>
          <span className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{d.date}</span>
          <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{d.day}</span>
        </div>
      ))}
    </div>
  );
}

function RevenueBarChart() {
  const max = Math.max(...REVENUE_MONTHLY.flatMap((m) => [m.billed, m.collected]));
  return (
    <div>
      <div className="flex h-48 items-stretch gap-2">
        {REVENUE_MONTHLY.map((m) => (
          <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full flex-1 items-end justify-center gap-0.5">
              <div className="w-1/2 rounded-t bg-[#bab68d]" style={{ height: `${(m.billed / max) * 100}%` }} />
              <div className="w-1/2 rounded-t bg-[#edd9c0]" style={{ height: `${(m.collected / max) * 100}%` }} />
            </div>
            <span className="font-[family-name:var(--font-nunito)] text-[10px] text-[#9ca3af]">{m.month}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#bab68d]" />
          <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Billed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#edd9c0]" />
          <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Collected</span>
        </div>
      </div>
    </div>
  );
}

function SendAnnouncementForm() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-4 font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
        Send Announcement
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Audience</label>
          <select
            defaultValue=""
            className="rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
          >
            <option value="" disabled>
              Select
            </option>
            {ANNOUNCEMENT_AUDIENCES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Type</label>
          <select
            defaultValue="Incident"
            className="rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
          >
            {ANNOUNCEMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Subject</label>
          <input
            type="text"
            placeholder="Select child"
            className="rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#c47b2c]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Message</label>
          <textarea
            rows={5}
            placeholder="Type message here.."
            className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#c47b2c]"
          />
        </div>
        <button className="self-end rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]">
          Send Announcement
        </button>
      </div>
    </div>
  );
}

function RoomEngagementPanel() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
        Room Engagement Score
      </h2>
      <div className="flex flex-col gap-3">
        {ROOM_ENGAGEMENT.map((r) => (
          <div key={r.room} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]">{r.room}</span>
              <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{r.score}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
              <div className="h-full rounded-full bg-[#c47b2c]" style={{ width: `${r.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverviewView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {ANALYTICS_METRICS.map((m) => (
          <StatCard key={m.label} label={m.label} value={m.value} trendLabel={m.trendLabel} trendUp={m.trendUp} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
            Attendance <span className="text-sm font-normal text-[#9ca3af]">(This Week)</span>
          </h2>
          <AttendanceBarChart />
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">Revenue</h2>
          <RevenueBarChart />
        </div>
        <RoomEngagementPanel />
        <SendAnnouncementForm />
      </div>
    </div>
  );
}

function AttendanceView() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
        Attendance <span className="text-sm font-normal text-[#9ca3af]">(This Week)</span>
      </h2>
      <AttendanceBarChart />
    </div>
  );
}

function RevenueView() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <h2 className="mb-3 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">Revenue</h2>
      <RevenueBarChart />
    </div>
  );
}

function StaffComplianceView() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <h2 className="p-4 font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
        Staff Compliance &amp; Rating
      </h2>
      <div className="flex flex-col gap-px">
        {STAFF_COMPLIANCE_RATINGS.map((s) => (
          <div
            key={s.id}
            className={`flex flex-wrap items-center justify-between gap-4 p-4 ${s.highlight ? "bg-[#ecfff8]" : ""}`}
          >
            <div className="flex-1 min-w-[180px]">
              <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{s.name}</p>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                {s.role} • {s.rooms}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">{s.rating}</span>
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${i < Math.round(s.rating) ? "fill-[#c47b2c] text-[#c47b2c]" : "text-[#d0d5dd]"}`}
                  />
                ))}
              </div>
              <span className="ml-1 font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">{s.note}</span>
            </div>
            <div className="flex w-[200px] flex-col gap-1">
              <div className="h-1.5 rounded-full bg-[#e6ebf3]">
                <div className="h-full rounded-full bg-[#c47b2c]" style={{ width: `${s.compliancePct}%` }} />
              </div>
            </div>
            <div className="text-right">
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">Compliance (%)</p>
              <p className="font-[family-name:var(--font-merriweather)] text-base font-bold text-[#2d1810]">
                {s.compliancePct}/100
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AnalyticsTab() {
  const [subTab, setSubTab] = useState<AnalyticsSubTab>("Overview");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        {subTab === "Staff" ? (
          <button className="flex items-center gap-1.5 rounded-lg bg-[#edd9c0] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#3b2513]">
            <Sparkles className="size-4" />
            Refresh
          </button>
        ) : (
          <button className="rounded-lg bg-[#3b2513] px-4 py-2 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]">
            Announcement
          </button>
        )}
      </div>

      <div className="flex overflow-x-auto border-b border-[#e6ebf3]">
        {SUB_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium font-[family-name:var(--font-urbanist)] cursor-pointer ${
              subTab === tab
                ? "border-b-2 border-[#3b2513] text-[#3b2513]"
                : "text-[#6b7280] hover:text-[#2d1810]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {subTab === "Overview" && <OverviewView />}
      {subTab === "Attendance" && <AttendanceView />}
      {subTab === "Revenue" && <RevenueView />}
      {subTab === "Staff" && <StaffComplianceView />}
    </div>
  );
}
