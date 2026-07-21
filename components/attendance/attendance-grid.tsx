"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useAttendance } from "@/lib/attendance/store";

type CardType = "IN" | "Absent" | "Pending";

function cardStyle(type: CardType) {
  if (type === "IN") return { border: "#85ffd7", bg: "#f0fff9" };
  if (type === "Absent") return { border: "#fe7171", bg: "#fff5f5" };
  return { border: "#ffd58f", bg: "#fffbf0" };
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-1.5 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
      {label}
      <ChevronDown className="h-3.5 w-3.5" />
    </button>
  );
}

export function AttendanceGrid() {
  const { state } = useAttendance();
  const [roomFilter, setRoomFilter] = useState<string>("All Rooms");

  const rooms = ["All Rooms", ...new Set(state.childStates.map((c) => c.room))];

  const filteredChildren = roomFilter === "All Rooms"
    ? state.childStates
    : state.childStates.filter((c) => c.room === roomFilter);

  const staffCards = Object.entries(state.staffStates).map(([id, s]) => {
    const names: Record<string, { name: string; initials: string; cls: string }> = {
      "staff-1": { name: "Mrs. Sarah", initials: "SO", cls: "Lion Class" },
      "staff-2": { name: "Mr. James", initials: "JA", cls: "Tiger Class" },
      "staff-3": { name: "Mrs. Ngozi", initials: "NE", cls: "Bear Class" },
      "staff-4": { name: "Mr. Chukwu", initials: "CB", cls: "Owl Class" },
      "staff-5": { name: "Mrs. Amaka", initials: "AT", cls: "Lion Class" },
    };
    const info = names[id] || { name: id, initials: "??", cls: "Unknown" };
    const type: CardType = s.signedIn ? "IN" : "Absent";
    return { ...info, type, time: s.signedInAt || "-" };
  });

  const childCards = filteredChildren.map((c) => {
    const type: CardType = c.isCheckedIn ? "IN" : "Pending";
    return {
      initials: c.avatarInitials,
      name: c.childName.split(" ")[0],
      cls: `${c.room} Room`,
      time: c.checkInTime || "-",
      type,
    };
  });

  const allCards: { initials: string; name: string; cls: string; time: string; type: CardType }[] = [...childCards, ...staffCards];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
        Attendance Grid
      </span>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f5edd8] px-3 py-1.5">
        <Search className="h-3.5 w-3.5 text-[#9ca3af]" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 bg-transparent font-[family-name:var(--font-urbanist)] text-xs text-[#2d1810] placeholder:text-[#9ca3af] focus:outline-none"
        />
      </div>

      <div className="mb-4 mt-3 flex gap-2">
        <div className="relative">
          <select
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="appearance-none rounded-lg border border-[#e6ebf3] bg-white px-3 py-1.5 pr-7 font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]"
          >
            {rooms.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9ca3af]" />
        </div>
        <FilterDropdown label="All Users" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {allCards.map((card, i) => {
          const style = cardStyle(card.type);
          return (
            <div
              key={i}
              className="flex flex-col gap-1.5 rounded-xl border p-3"
              style={{ borderColor: style.border, backgroundColor: style.bg }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#edd9c0] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#3b2513]">
                {card.initials}
              </div>
              <p className="font-[family-name:var(--font-nunito)] text-xs font-bold text-[#2d1810]">
                {card.name}
              </p>
              <p className="text-[10px] text-[#6b7280]">{card.cls}</p>
              <p className="text-[10px] text-[#9ca3af]">{card.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
