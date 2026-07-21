"use client";

import { useState } from "react";
import {
  X, Star, MessageSquare, AlertTriangle, Flag, ChevronRight,
} from "lucide-react";

export function CaregiverActionSheet({
  caregiverName,
  caregiverInitials,
  onClose,
}: {
  caregiverName: string;
  caregiverInitials: string;
  onClose: () => void;
}) {
  const [view, setView] = useState<"menu" | "report" | "rate">("menu");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [terminate, setTerminate] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportSent, setReportSent] = useState(false);

  function handleReport() {
    setReportSent(true);
    setTimeout(() => onClose(), 1500);
  }

  function handleRate() {
    setTimeout(() => onClose(), 800);
  }

  // ─── Report view ───────────────────────────────────────────────────────────
  if (view === "report") {
    return (
      <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
        <div className="w-full rounded-t-3xl bg-white pb-6 pt-4 animate-slide-up">
          <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-200" />
          <div className="flex items-center justify-between px-5 pb-3">
            <h2 className="text-base font-bold text-gray-800">Report Caregiver</h2>
            <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
          </div>

          {reportSent ? (
            <div className="flex flex-col items-center py-10">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">Report Submitted</p>
              <p className="mt-1 text-xs text-gray-400">The admin has been notified.</p>
            </div>
          ) : (
            <div className="px-5">
              <div className="mb-4 flex items-center gap-3 rounded-xl bg-red-50 p-3">
                <AlertTriangle size={18} className="text-red-500" />
                <p className="text-xs text-red-600">
                  This report goes directly to the admin. Please provide details below.
                </p>
              </div>

              <label className="mb-1 block text-xs font-semibold text-gray-500">Reason</label>
              <select
                value={reportReason}
                onChange={e => setReportReason(e.target.value)}
                className="mb-4 w-full appearance-none rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
              >
                <option value="">Select a reason...</option>
                <option value="negligence">Negligence / Safety concern</option>
                <option value="behavior">Unprofessional behavior</option>
                <option value="communication">Poor communication</option>
                <option value="other">Other</option>
              </select>

              <textarea
                placeholder="Describe the issue..."
                rows={3}
                className="mb-4 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />

              <label className="mb-3 flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3">
                <input
                  type="checkbox"
                  checked={terminate}
                  onChange={e => setTerminate(e.target.checked)}
                  className="h-4 w-4 rounded accent-red-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">Request termination</p>
                  <p className="text-[11px] text-gray-400">Ask admin to reassign a new caregiver</p>
                </div>
              </label>

              <button
                onClick={handleReport}
                disabled={!reportReason}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white disabled:opacity-40"
              >
                <Flag size={14} />
                Submit Report
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Rate view ─────────────────────────────────────────────────────────────
  if (view === "rate") {
    return (
      <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
        <div className="w-full rounded-t-3xl bg-white pb-6 pt-4 animate-slide-up">
          <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-200" />
          <div className="flex items-center justify-between px-5 pb-3">
            <h2 className="text-base font-bold text-gray-800">Rate Caregiver</h2>
            <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
          </div>

          <div className="px-5 pb-4">
            <div className="mb-4 flex flex-col items-center">
              <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-cg-brand/10 text-lg font-bold text-cg-brand">
                {caregiverInitials}
              </div>
              <p className="text-sm font-semibold text-gray-800">{caregiverName}</p>
            </div>

            <div className="mb-4 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                >
                  <Star
                    size={32}
                    className={`transition-colors ${
                      s <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="mb-4 text-center text-xs text-gray-400">
                {rating === 1 && "Poor"}
                {rating === 2 && "Below Average"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}

            <textarea
              placeholder="Leave a comment (optional)..."
              rows={3}
              className="mb-4 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />

            <button
              onClick={handleRate}
              disabled={rating === 0}
              className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1] disabled:opacity-40"
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Menu view ─────────────────────────────────────────────────────────────
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full rounded-t-3xl bg-white pb-6 pt-4 animate-slide-up">
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-200" />

        <div className="flex items-center gap-3 px-5 pb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cg-brand/10 text-sm font-bold text-cg-brand">
            {caregiverInitials}
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-gray-800">{caregiverName}</p>
            <p className="text-xs text-gray-400">Caregiver</p>
          </div>
          <button onClick={onClose}>
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-1 px-4">
          <button
            onClick={() => setView("rate")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-50">
              <Star size={16} className="text-amber-500" />
            </div>
            <span className="flex-1 text-sm font-medium text-gray-700">Rate Caregiver</span>
            <ChevronRight size={16} className="text-gray-300" />
          </button>

          <button
            onClick={() => setView("report")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-gray-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
              <Flag size={16} className="text-red-500" />
            </div>
            <span className="flex-1 text-sm font-medium text-gray-700">Report Caregiver</span>
            <ChevronRight size={16} className="text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
