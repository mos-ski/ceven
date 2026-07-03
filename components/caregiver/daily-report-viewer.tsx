"use client";

import { X, Calendar, Heart, Utensils, Moon, Droplets, AlertTriangle, Pill } from "lucide-react";
import { mockDailyReport } from "@/lib/caregiver/mock-data";

type Props = {
  onClose: () => void;
};

export function DailyReportViewer({ onClose }: Props) {
  const r = mockDailyReport;

  return (
    <>
      <div className="absolute inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 z-50 max-h-[90%] overflow-y-auto rounded-t-3xl bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h3 className="text-base font-bold text-cg-brand">Daily Report</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="px-4 pb-8 flex flex-col gap-3">
          {/* Date banner */}
          <div className="flex items-center gap-2 rounded-xl bg-cg-brand px-4 py-3">
            <Calendar size={14} className="text-cg-accent-muted" />
            <span className="text-sm font-medium text-white">{r.date}</span>
          </div>

          {/* Mood */}
          <div className="rounded-xl bg-pink-50 px-4 py-3">
            <div className="mb-1 flex items-center gap-2">
              <Heart size={14} className="text-pink-400" />
              <span className="text-xs font-semibold text-gray-500">Mood</span>
            </div>
            <p className="text-sm font-medium text-cg-brand">{r.mood.join("  ")}</p>
          </div>

          {/* Meals */}
          <div className="rounded-xl bg-amber-50 px-4 py-3">
            <div className="mb-1 flex items-center gap-2">
              <Utensils size={14} className="text-amber-500" />
              <span className="text-xs font-semibold text-gray-500">Meals</span>
            </div>
            <p className="text-sm font-medium text-cg-brand">{r.meals}</p>
          </div>

          {/* Nap Time */}
          <div className="rounded-xl bg-amber-50 px-4 py-3">
            <div className="mb-2 flex items-center gap-2">
              <Moon size={14} className="text-amber-600" />
              <span className="text-xs font-semibold text-gray-500">Nap Time</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {r.naps.map((nap, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium text-cg-brand">
                  <span>{nap.start} - {nap.end}</span>
                  <span className="text-gray-400">≈</span>
                  <span>{nap.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hygiene */}
          <div className="rounded-xl bg-teal-50 px-4 py-3">
            <div className="mb-1 flex items-center gap-2">
              <Droplets size={14} className="text-teal-500" />
              <span className="text-xs font-semibold text-gray-500">Hygiene</span>
            </div>
            <p className="text-sm font-medium text-cg-brand">{r.hygiene}</p>
          </div>

          {/* Health & Safety */}
          <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
            <div className="mb-1 flex items-center gap-2">
              <AlertTriangle size={14} className="text-amber-500" />
              <span className="text-xs font-semibold text-gray-500">Health &amp; Safety</span>
            </div>
            <p className="text-sm font-medium text-cg-brand">{r.healthSafety}</p>
          </div>

          {/* Medications */}
          <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
            <div className="mb-1 flex items-center gap-2">
              <Pill size={14} className="text-purple-400" />
              <span className="text-xs font-semibold text-gray-500">Medications</span>
            </div>
            <p className="text-sm font-medium text-cg-brand">{r.medications}</p>
          </div>

          {/* Activity photos */}
          {r.photos.map((photo, i) => (
            <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="relative">
                <div className="aspect-video w-full overflow-hidden bg-gray-200">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="h-full w-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
                <span className="absolute left-0 top-3 rounded-r-lg bg-cg-brand px-3 py-1 text-xs font-bold text-white">
                  {photo.label}
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-700">{photo.caption}</p>
                <p className="mt-1 text-xs text-gray-400">Posted by Sophia</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
