"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell, ChevronLeft, ChevronRight, Calendar, Sparkles, Send, X,
} from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";

// ─── Report data ──────────────────────────────────────────────────────────────

const REPORTS = [
  {
    date: "Friday, January 24, 2025",
    shortDate: "Jan 24",
    mood: "😄 Happy",
    moodLabel: "Mood",
    meals: 3,
    nap: "1hr 30mins",
    activities: "Block building, outdoor play, story time",
    hygiene: "2 urine, 1 poop",
    photoCaption: "Esther had a wonderful time playing with her friends today!",
    photoTag: "Playtime",
    photo: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80",
  },
  {
    date: "Thursday, January 23, 2025",
    shortDate: "Jan 23",
    mood: "🤩 Playful",
    moodLabel: "Mood",
    meals: 2,
    nap: "2hrs",
    activities: "Art & craft, music time",
    hygiene: "3 urine, 2 poop",
    photoCaption: "Esther enjoyed painting during art time.",
    photoTag: "Art & Craft",
    photo: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
  },
];

// ─── Calendar Modal ───────────────────────────────────────────────────────────

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function CalendarModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (label: string) => void;
}) {
  const now = new Date(2025, 0, 1);
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState<number | null>(24);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-[430px] rounded-t-3xl bg-white pb-6">
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-base font-semibold text-gray-800">Select Date</span>
          <button onClick={onClose}><X size={20} className="text-gray-500" /></button>
        </div>

        {/* Month nav */}
        <div className="flex items-center justify-between px-5 pb-3">
          <button onClick={prevMonth} className="rounded-full p-1.5 hover:bg-gray-100">
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
          <span className="text-sm font-semibold text-gray-800">{MONTHS[month]} {year}</span>
          <button onClick={nextMonth} className="rounded-full p-1.5 hover:bg-gray-100">
            <ChevronRight size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 px-4 pb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-1">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 px-4">
          {cells.map((day, i) => (
            <button
              key={i}
              onClick={() => day && setSelected(day)}
              className={`flex h-9 w-9 mx-auto items-center justify-center rounded-full text-sm font-medium transition-colors ${
                !day ? "invisible" :
                day === selected
                  ? "bg-cg-brand text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="px-5 pt-4">
          <button
            onClick={() => {
              onSelect(`${MONTHS[month].slice(0, 3)} ${selected}`);
              onClose();
            }}
            className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Moment photo ─────────────────────────────────────────────────────────────

function MomentPhoto({ tag, src, caption }: { tag: string; src: string; caption: string }) {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-amber-100">
      <img src={src} alt={caption} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      <div className="absolute left-3 top-3">
        <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
          {tag}
        </span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const router = useRouter();
  const [reportIndex, setReportIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [comment, setComment] = useState("");

  const report = REPORTS[reportIndex];
  const total = REPORTS.length;

  const progress = ((reportIndex + 1) / total) * 100;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#F9F5F0]">
      {/* AppBar */}
      <div className="shrink-0 bg-white px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-800">Daily Report</h1>
          <button className="relative">
            <Bell size={22} className="text-gray-700" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>

        {/* Date row + Ask CEvenAI */}
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => setShowCalendar(true)}
            className="flex items-center gap-2 rounded-xl bg-[#F3EDE5] px-3 py-2"
          >
            <Calendar size={14} className="text-cg-brand" />
            <span className="text-xs font-medium text-gray-700">{report.date}</span>
            <ChevronRight size={12} className="text-gray-400" />
          </button>

          <button
            onClick={() => router.push("/parent/cevenai")}
            className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2"
          >
            <Sparkles size={14} className="text-amber-600" />
            <span className="text-xs font-semibold text-amber-700">Ask CEvenAI</span>
          </button>
        </div>
      </div>

      {/* Main scroll area */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-4">

        {/* Progress + navigation */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Progress ring */}
            <div className="relative h-10 w-10">
              <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#EDE8E0" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none"
                  stroke="#3B2513" strokeWidth="3"
                  strokeDasharray={`${(2 * Math.PI * 15 * progress) / 100} ${2 * Math.PI * 15 * (100 - progress) / 100}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-cg-brand">
                {reportIndex + 1}/{total}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Daily Report</p>
              <p className="text-xs text-gray-400">Report {reportIndex + 1} of {total}</p>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setReportIndex(i => Math.max(0, i - 1))}
              disabled={reportIndex === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm disabled:opacity-40"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => setReportIndex(i => Math.min(total - 1, i + 1))}
              disabled={reportIndex === total - 1}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm disabled:opacity-40"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stat boxes */}
        <div className="mb-3 grid grid-cols-2 gap-3">
          {/* Mood — pink */}
          <div className="rounded-2xl bg-[#FFF0F3] p-4">
            <p className="mb-1 text-xs font-semibold text-[#FF6B8A]">Mood</p>
            <p className="text-xl">{report.mood.split(" ")[0]}</p>
            <p className="mt-0.5 text-sm font-semibold text-[#D63A5E]">
              {report.mood.split(" ").slice(1).join(" ")}
            </p>
          </div>

          {/* Meals — orange */}
          <div className="rounded-2xl bg-[#FFF4E5] p-4">
            <p className="mb-1 text-xs font-semibold text-[#F59E0B]">Meals</p>
            <p className="text-2xl font-bold text-[#D97706]">{report.meals}</p>
            <p className="mt-0.5 text-xs text-[#92400E]">meals today</p>
          </div>

          {/* Nap — purple */}
          <div className="rounded-2xl bg-[#F3F0FF] p-4">
            <p className="mb-1 text-xs font-semibold text-[#7C3AED]">Nap</p>
            <p className="text-sm font-bold text-[#5B21B6]">{report.nap}</p>
            <p className="mt-0.5 text-xs text-[#7C3AED]">duration</p>
          </div>

          {/* Activities — teal */}
          <div className="rounded-2xl bg-[#E8FAF4] p-4">
            <p className="mb-1 text-xs font-semibold text-[#059669]">Activities</p>
            <p className="text-xs font-semibold leading-relaxed text-[#065F46]">{report.activities}</p>
          </div>
        </div>

        {/* Hygiene */}
        <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-lg">
            🚿
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400">Hygiene</p>
            <p className="text-sm font-medium text-gray-700">{report.hygiene}</p>
          </div>
        </div>

        {/* Photo carousel */}
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-gray-800">Today&apos;s Moments</p>
          <MomentPhoto tag={report.photoTag} src={report.photo} caption={report.photoCaption} />

          {/* Dots */}
          <div className="mt-3 flex justify-center gap-1.5">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-4 bg-cg-brand" : "w-1.5 bg-gray-200"}`}
              />
            ))}
          </div>

          {/* Caption */}
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{report.photoCaption}</p>
        </div>

        {/* Comment */}
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-gray-800">Leave a comment</p>
          <div className="flex items-end gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5">
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="flex-1 resize-none bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />
            <button
              onClick={() => setComment("")}
              disabled={!comment.trim()}
              className="shrink-0 rounded-full bg-cg-brand p-2 disabled:opacity-40"
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {showCalendar && (
        <CalendarModal
          onClose={() => setShowCalendar(false)}
          onSelect={() => setShowCalendar(false)}
        />
      )}

      <ParentBottomNav />
    </div>
  );
}
