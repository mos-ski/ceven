"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, MessageSquare } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { mockUser } from "@/lib/caregiver/mock-data";
import {
  getRatings,
  getAverageRating,
  getRatingDistribution,
  type CaregiverRating,
} from "@/lib/shared/ratings";
import { NewBadge } from "@/components/caregiver/new-badge";

export default function CaregiverRatingsPage() {
  const router = useRouter();
  const [ratings, setRatings] = useState<CaregiverRating[]>([]);
  const [avgRating, setAvgRating] = useState({ average: 0, count: 0 });

  useEffect(() => {
    setRatings(getRatings("cg-1"));
    setAvgRating(getAverageRating("cg-1"));
  }, []);

  return (
    <div className="relative flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
          <h1 className="text-base font-bold text-cg-brand">My Ratings</h1>
            <NewBadge />
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Average rating card */}
        <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold text-cg-brand">{avgRating.average || "—"}</p>
              <div className="flex gap-0.5 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.round(avgRating.average) ? "text-amber-400" : "text-gray-200"} fill={i < Math.round(avgRating.average) ? "currentColor" : "none"} />
                ))}
              </div>
              <p className="text-[10px] text-gray-400">{avgRating.count} rating{avgRating.count !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const dist = getRatingDistribution("cg-1");
                const count = dist[star] || 0;
                const pct = avgRating.count > 0 ? (count / avgRating.count) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-gray-400 w-3">{star}</span>
                    <Star size={10} className="text-amber-400" fill="currentColor" />
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100">
                      <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] text-gray-400 w-4 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Individual ratings */}
        <p className="mb-2 text-xs font-semibold text-gray-500">Feedback from Parents</p>
        {ratings.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <Star size={24} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm text-gray-400">No ratings yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {ratings.map((r) => (
              <div key={r.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600">
                      {r.parentName.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-700">{r.parentName}</p>
                      <p className="text-[10px] text-gray-400">Parent of {r.childId.replace("child-", "Child ")}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className={i < r.rating ? "text-amber-400" : "text-gray-200"} fill={i < r.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                {r.feedback && (
                  <div className="flex items-start gap-2 rounded-xl bg-gray-50 px-3 py-2">
                    <MessageSquare size={12} className="mt-0.5 shrink-0 text-gray-400" />
                    <p className="text-xs text-gray-600">{r.feedback}</p>
                  </div>
                )}
                <p className="mt-1 text-[10px] text-gray-400">
                  {new Date(r.createdAt).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
