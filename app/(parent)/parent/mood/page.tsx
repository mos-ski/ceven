"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Ruler, Calendar, Shield } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockParentChildren, mockChildMoods, type ChildMoodProfile } from "@/lib/parent/mock-data";

function MoodBar({ entry, maxScore = 5 }: { entry: ChildMoodProfile["weeklyMoods"][0]; maxScore?: number }) {
  const heightPct = (entry.score / maxScore) * 100;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[10px] font-semibold text-gray-500">{entry.mood}</span>
      <div className="relative h-24 w-8 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-500"
          style={{ height: `${heightPct}%`, backgroundColor: entry.color }}
        />
      </div>
      <span className="text-[10px] font-semibold text-gray-400">{entry.date}</span>
    </div>
  );
}

function ChildMoodCard({
  profile,
  isExpanded,
  onToggle,
}: {
  profile: ChildMoodProfile;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const avgScore = profile.weeklyMoods.reduce((sum, m) => sum + m.score, 0) / profile.weeklyMoods.length;
  const dominant = profile.weeklyMoods.reduce((prev, curr) => (curr.score > prev.score ? curr : prev));

  return (
    <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3 text-left active:bg-gray-50"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cg-brand/10 text-sm font-bold text-cg-brand">
          {profile.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 truncate">{profile.name}</p>
          <p className="text-[11px] text-gray-400">{profile.room} · {profile.age}</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 items-center gap-1 rounded-full px-2.5"
            style={{ backgroundColor: `${dominant.color}20` }}
          >
            <span className="text-lg">{dominant.mood === "Happy" ? "😄" : dominant.mood === "Playful" ? "🤩" : dominant.mood === "Excited" ? "🥳" : dominant.mood === "Confident" ? "😎" : dominant.mood === "Sleepy" ? "😴" : dominant.mood === "Tired" ? "😴" : dominant.mood === "Fussy" ? "😫" : "😊"}</span>
            <span className="text-xs font-bold" style={{ color: dominant.color }}>{avgScore.toFixed(1)}</span>
          </div>
          <div
            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          >
            <svg viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-50 px-4 py-4">
          {/* Info chips */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600">
              <Ruler size={12} /> {profile.height}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-1 text-[11px] font-medium text-purple-600">
              <Calendar size={12} /> {profile.age}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
              <Shield size={12} /> {profile.health}
            </span>
          </div>

          {/* Bar chart */}
          <p className="mb-3 text-xs font-semibold text-gray-500">Weekly Mood</p>
          <div className="flex items-end justify-between gap-2">
            {profile.weeklyMoods.map(entry => (
              <MoodBar key={entry.date} entry={entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MoodPage() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(mockParentChildren[0]?.id ?? null);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Mood Tracker</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <p className="mb-3 text-xs text-gray-400">Tap a child to view their mood details</p>
        <div className="space-y-3">
          {mockParentChildren.map(child => {
            const profile = mockChildMoods[child.id];
            if (!profile) return null;
            return (
              <ChildMoodCard
                key={child.id}
                profile={profile}
                isExpanded={expandedId === child.id}
                onToggle={() => setExpandedId(expandedId === child.id ? null : child.id)}
              />
            );
          })}
        </div>
      </div>

      <ParentBottomNav />
    </div>
  );
}
