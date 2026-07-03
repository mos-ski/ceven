"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

type Props = {
  onClose: () => void;
  onSelectDate?: (date: Date) => void;
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export function CalendarPicker({ onClose, onSelectDate }: Props) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(today.getDate());
  const [showYearPicker, setShowYearPicker] = useState(false);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  }

  const years = Array.from({ length: 10 }, (_, i) => today.getFullYear() - 2 + i);

  return (
    <>
      <div className="absolute inset-0 z-[60] bg-black/50" onClick={onClose} />
      <div className="absolute inset-x-4 top-1/2 z-[70] -translate-y-1/2 rounded-3xl bg-white p-5 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-cg-brand">Calendar</h3>
          <div className="flex items-center gap-3">
            {/* Year selector */}
            <div className="relative">
              <button
                onClick={() => setShowYearPicker((v) => !v)}
                className="flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-sm font-medium text-cg-brand"
              >
                {year}
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              {showYearPicker && (
                <div className="absolute right-0 top-full z-10 mt-1 max-h-40 w-20 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-lg">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => { setYear(y); setShowYearPicker(false); }}
                      className={`w-full py-2 text-center text-sm ${y === year ? "font-bold text-cg-brand" : "text-gray-600"}`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <X size={14} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Month nav */}
        <div className="mb-4 flex items-center justify-between">
          <button onClick={prevMonth} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
          <p className="text-sm font-semibold text-cg-brand">{MONTHS[month]}</p>
          <button onClick={nextMonth} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Day headers */}
        <div className="mb-1 grid grid-cols-7 text-center">
          {DAYS.map((d) => (
            <span key={d} className="py-1 text-[10px] font-medium text-gray-400">{d}</span>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7 gap-y-1 text-center">
          {cells.map((day, i) => {
            if (!day) return <span key={i} />;
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isSel = day === selected;
            return (
              <button
                key={i}
                onClick={() => {
                  setSelected(day);
                  onSelectDate?.(new Date(year, month, day));
                }}
                className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors ${
                  isSel ? "bg-cg-brand font-bold text-white" : isToday ? "font-bold text-cg-accent" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
