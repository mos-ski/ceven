"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, MessageSquare } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockChild } from "@/lib/parent/mock-data";
import {
  getParentRatings,
  addRating,
  getAverageRating,
  getRatingDistribution,
  type CaregiverRating,
} from "@/lib/shared/ratings";
import { NewBadge } from "@/components/parent/new-badge";

export default function ParentRateCaregiverPage() {
  const router = useRouter();
  const [ratings, setRatings] = useState<CaregiverRating[]>([]);
  const [avgRating, setAvgRating] = useState({ average: 0, count: 0 });
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setRatings(getParentRatings("parent-1"));
    setAvgRating(getAverageRating("cg-1"));
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center justify-between bg-white px-5 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-base font-bold text-cg-brand">Rate Caregiver</h1>
            <NewBadge />
        </div>
        <button
          onClick={() => setShowSubmitModal(true)}
          className="rounded-xl bg-cg-brand px-4 py-2 text-xs font-semibold text-white"
        >
          Rate
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Caregiver info */}
        <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cg-brand text-xl font-bold text-white">
              MA
            </div>
            <div>
              <p className="text-base font-bold text-gray-800">{mockChild.caregiver}</p>
              <p className="text-xs text-gray-400">{mockChild.room} · Assigned to {mockChild.name}</p>
            </div>
          </div>

          {avgRating.count > 0 && (
            <div className="mt-4 flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-cg-brand">{avgRating.average}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={i < Math.round(avgRating.average) ? "text-amber-400" : "text-gray-200"} fill={i < Math.round(avgRating.average) ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-[10px] text-gray-400">{avgRating.count} rating{avgRating.count > 1 ? "s" : ""}</p>
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
          )}
        </div>

        {/* My ratings */}
        <p className="mb-2 text-xs font-semibold text-gray-500">My Ratings</p>
        {ratings.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <Star size={24} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm text-gray-400">You haven&apos;t rated yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {ratings.map((r) => (
              <div key={r.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < r.rating ? "text-amber-400" : "text-gray-200"} fill={i < r.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}
                  </p>
                </div>
                {r.feedback && (
                  <div className="flex items-start gap-2 rounded-xl bg-gray-50 px-3 py-2">
                    <MessageSquare size={12} className="mt-0.5 shrink-0 text-gray-400" />
                    <p className="text-xs text-gray-600">{r.feedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Rating Modal */}
      {showSubmitModal && (
        <SubmitRatingModal
          onClose={() => setShowSubmitModal(false)}
          onSubmit={() => {
            refresh();
            setShowSubmitModal(false);
          }}
        />
      )}

      <ParentBottomNav />
    </div>
  );
}

function SubmitRatingModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: () => void }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);

  function handleSubmit() {
    if (rating === 0) return;
    addRating({
      parentId: "parent-1",
      parentName: "James Miller",
      caregiverId: "cg-1",
      caregiverName: "Ms Anu",
      childId: "child-1",
      rating,
      feedback: feedback.trim(),
    });
    onSubmit();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">Rate Ms Anu</h3>
          <button onClick={onClose} className="text-xs text-gray-400">Cancel</button>
        </div>
        <div className="px-5 flex flex-col items-center gap-4">
          {/* Star rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={36}
                  className={`transition-colors ${
                    star <= (hoveredStar || rating) ? "text-amber-400" : "text-gray-200"
                  }`}
                  fill={star <= (hoveredStar || rating) ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-xs text-gray-500">
              {rating === 1 ? "Poor" : rating === 2 ? "Fair" : rating === 3 ? "Good" : rating === 4 ? "Very Good" : "Excellent"}
            </p>
          )}

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={3}
            placeholder="Optional: Share your feedback..."
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
          />

          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
}
