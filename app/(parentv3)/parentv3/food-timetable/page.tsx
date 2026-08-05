"use client";

import { useState } from "react";
import { ParentV3BottomNav } from "@/components/parentv3/bottom-nav";
import { WEEKLY_MENU } from "@/lib/parentv3/mock-data";

export default function ParentV3FoodTimetablePage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [menu, setMenu] = useState(WEEKLY_MENU);
  const [sharedAll, setSharedAll] = useState(false);

  const currentDay = menu[selectedDay];

  const toggleShare = (mealId: string) => {
    setMenu((prev) =>
      prev.map((day, i) =>
        i === selectedDay
          ? {
              ...day,
              meals: day.meals.map((m) =>
                m.id === mealId ? { ...m, shared: !m.shared } : m
              ),
            }
          : day
      )
    );
  };

  const shareAll = () => {
    setMenu((prev) =>
      prev.map((day, i) =>
        i === selectedDay
          ? {
              ...day,
              meals: day.meals.map((m) => ({ ...m, shared: true })),
            }
          : day
      )
    );
    setSharedAll(true);
    setTimeout(() => setSharedAll(false), 2000);
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#fffefa]">
      <div className="flex-1 overflow-y-auto scrollbar-thin px-6 pb-4">
        {/* Top bar */}
        <div className="flex items-center justify-between pt-4 pb-2">
          <div>
            <h1 className="text-base font-bold text-gray-800" style={{ fontFamily: "var(--font-merriweather)" }}>Food Timetable</h1>
            <p className="text-[10px] text-gray-500">Plan meals for the week</p>
          </div>
          <button
            onClick={shareAll}
            className="rounded-full bg-cg-accent px-3 py-1.5 text-[10px] font-semibold text-white"
          >
            {sharedAll ? "✓ Shared!" : "Share Week"}
          </button>
        </div>

        {/* Day selector — pill style like v2 tabs */}
        <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
          {menu.map((day, i) => (
            <button
              key={day.shortDay}
              onClick={() => setSelectedDay(i)}
              className={`flex-shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                i === selectedDay
                  ? "bg-cg-brand text-white"
                  : "bg-[#f4f5f6] text-gray-600"
              }`}
            >
              {day.shortDay}
            </button>
          ))}
        </div>

        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-800">{currentDay.day}</h2>
          <button
            onClick={shareAll}
            className="rounded-full bg-white border border-gray-200 px-3 py-1.5 text-[10px] font-semibold text-gray-600"
          >
            {sharedAll ? "✓ Shared!" : "Share Day"}
          </button>
        </div>

        <div className="space-y-2.5">
          {currentDay.meals.map((meal) => (
            <div key={meal.id} className="rounded-2xl bg-[#f4f5f6] p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[10px] text-gray-400">{meal.time}</p>
                  <p className="text-sm font-semibold text-gray-800">{meal.label}</p>
                </div>
                <button
                  onClick={() => toggleShare(meal.id)}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${
                    meal.shared
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-white text-gray-500 border border-gray-200"
                  }`}
                >
                  {meal.shared ? "✓ Shared" : "Share"}
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {meal.dishes.map((dish) => (
                  <span
                    key={dish}
                    className="rounded-full bg-white px-2.5 py-1 text-xs text-gray-700"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ParentV3BottomNav />
    </div>
  );
}
