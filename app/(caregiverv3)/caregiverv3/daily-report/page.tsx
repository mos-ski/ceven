"use client";

import { useState } from "react";
import { CaregiverV3BottomNav } from "@/components/caregivev3/bottom-nav";
import {
  DAILY_REPORT,
  CHILDREN,
  SPENDING_RECORDS,
  LOW_STOCK_ITEMS,
} from "@/lib/caregivev3/mock-data";

function Avatar({
  initials,
  color,
  size = 36,
}: {
  initials: string;
  color: string;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-bold"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  );
}

function ChildSection({
  summary,
}: {
  summary: (typeof DAILY_REPORT.childSummaries)[0];
}) {
  const child = CHILDREN.find((c) => c.id === summary.childId)!;
  const mood = DAILY_REPORT.mood[summary.childId];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <Avatar initials={child.avatarInitials} color={child.avatarColor} size={28} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{summary.childName}</p>
        </div>
        {mood && (
          <div className="flex items-center gap-1 rounded-full bg-[#f4f5f6] px-2 py-1">
            <span className="text-sm">{mood.emoji}</span>
            <span className="text-[10px] text-gray-500">{mood.label}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1.5">Feeding</p>
          <div className="space-y-1">
            {summary.meals.map((meal, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${meal.ticked ? "bg-emerald-500" : "bg-gray-300"}`} />
                <span className={`text-[11px] ${meal.ticked ? "text-gray-700" : "text-gray-400"}`}>
                  {meal.label}
                </span>
                <span className="text-[9px] text-gray-400 ml-auto">{meal.time}</span>
              </div>
            ))}
          </div>
        </div>

        {summary.sleep.length > 0 && (
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1.5">Sleep</p>
            <div className="space-y-1">
              {summary.sleep.map((nap, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs">😴</span>
                  <span className="text-[11px] text-gray-600">
                    {nap.start} – {nap.end} ({nap.duration})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {summary.diapers.length > 0 && (
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1.5">Diapers</p>
            <div className="flex flex-wrap gap-1.5">
              {summary.diapers.map((d, i) => (
                <span key={i} className="rounded-full bg-[#f4f5f6] px-2 py-0.5 text-[10px] text-gray-600">
                  {d.time} — {d.type}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1.5">Medicine</p>
          <div className="space-y-1">
            {summary.medicine.map((med, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${med.status === "given" ? "bg-emerald-500" : med.status === "skipped" ? "bg-red-400" : "bg-amber-400"}`} />
                <span className="text-[11px] text-gray-600">
                  {med.name} ({med.dosage}) — {med.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpendingSection() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-3">💰 Spending</h3>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 rounded-xl bg-emerald-50 p-2.5 text-center">
          <p className="text-[9px] text-gray-400">Approved</p>
          <p className="text-sm font-bold text-emerald-700">₦{DAILY_REPORT.totalApproved.toLocaleString()}</p>
        </div>
        <div className="flex-1 rounded-xl bg-amber-50 p-2.5 text-center">
          <p className="text-[9px] text-gray-400">Spent</p>
          <p className="text-sm font-bold text-amber-700">₦{DAILY_REPORT.totalSpent.toLocaleString()}</p>
        </div>
      </div>
      <div className="space-y-1.5">
        {SPENDING_RECORDS.map((record) => (
          <div key={record.id} className="flex items-center gap-2 rounded-xl bg-[#f4f5f6] px-3 py-2">
            <span className="text-xs">🧾</span>
            <span className="flex-1 text-[11px] text-gray-600">{record.item}</span>
            <span className="text-[11px] font-semibold text-gray-800">₦{record.amount.toLocaleString()}</span>
            {record.receiptAttached ? (
              <span className="text-[9px] text-emerald-600">✓ Receipt</span>
            ) : (
              <span className="text-[9px] text-gray-400">No receipt</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LowStockSection() {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-3">📦 Running Low</h3>
      <div className="flex flex-wrap gap-1.5">
        {LOW_STOCK_ITEMS.map((item) => (
          <span key={item.id} className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] text-red-700">
            {item.item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MoodAndNote() {
  const [mood, setMood] = useState<Record<string, string>>({
    zara: "😊",
    tobi: "😴",
  });
  const [note, setNote] = useState(DAILY_REPORT.note);

  const moods = ["😊", "😌", "😫", "😴"];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-3">Mood & Note</h3>
      <div className="space-y-3 mb-3">
        {CHILDREN.map((child) => (
          <div key={child.id}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Avatar initials={child.avatarInitials} color={child.avatarColor} size={18} />
              <span className="text-[11px] font-medium text-gray-600">{child.name}</span>
            </div>
            <div className="flex gap-1.5">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood((prev) => ({ ...prev, [child.id]: m }))}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg transition-all ${
                    mood[child.id] === m ? "bg-cg-brand scale-110" : "bg-[#f4f5f6]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note about the day..."
        className="w-full rounded-xl bg-[#f4f5f6] p-3 text-xs text-gray-700 placeholder:text-gray-400 outline-none resize-none"
        rows={3}
      />
    </div>
  );
}

export default function CaregiverV3DailyReportPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-cg-bg">
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 pt-2 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-base font-bold text-gray-800">Daily Report</h1>
            <p className="text-[10px] text-gray-500">{DAILY_REPORT.date}</p>
          </div>
          {sent && (
            <div className="rounded-full bg-emerald-50 px-2.5 py-1">
              <span className="text-[10px] text-emerald-700 font-semibold">✓ Sent</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {DAILY_REPORT.childSummaries.map((summary) => (
            <ChildSection key={summary.childId} summary={summary} />
          ))}
          <SpendingSection />
          <LowStockSection />
          <MoodAndNote />
        </div>
      </div>

      <div className="shrink-0 bg-white px-4 py-3 border-t border-gray-100">
        <button
          onClick={() => setSent(true)}
          disabled={sent}
          className={`w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
            sent
              ? "bg-gray-100 text-gray-400"
              : "bg-cg-brand text-white active:bg-[#2A1A0D]"
          }`}
        >
          {sent ? "Report Sent ✓" : "Send Report to Mrs. Adeyemi"}
        </button>
      </div>

      <CaregiverV3BottomNav />
    </div>
  );
}
