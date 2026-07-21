"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, TrendingUp, Award, Plus, X } from "lucide-react";
import { mockChild } from "@/lib/parent/mock-data";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import {
  getGrowthEntries,
  getMilestones,
  addGrowthEntry,
  addMilestone,
  type GrowthEntry,
  type Milestone,
} from "@/lib/shared/growth";
import { NewBadge } from "@/components/parent/new-badge";

export default function ParentGrowthPage() {
  const router = useRouter();
  const [growthEntries, setGrowthEntries] = useState<GrowthEntry[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [activeTab, setActiveTab] = useState<"growth" | "milestones">("growth");
  const [showGrowthModal, setShowGrowthModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("ceven-growth_entries-updated", handler);
    window.addEventListener("ceven-milestones-updated", handler);
    return () => {
      window.removeEventListener("ceven-growth_entries-updated", handler);
      window.removeEventListener("ceven-milestones-updated", handler);
    };
  }, []);

  function refresh() {
    setGrowthEntries(getGrowthEntries(mockChild.id));
    setMilestones(getMilestones(mockChild.id));
  }

  const latestGrowth = growthEntries[growthEntries.length - 1];

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center justify-between bg-white px-5 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-cg-brand">Growth & Milestones</h1>
            <NewBadge />
          </div>
          <p className="text-xs text-gray-400">For {mockChild.name}</p>
          </div>
        </div>
        <button
          onClick={() => activeTab === "growth" ? setShowGrowthModal(true) : setShowMilestoneModal(true)}
          className="flex items-center gap-1 rounded-xl bg-cg-brand px-3 py-2 text-xs font-semibold text-white"
        >
          <Plus size={14} /> Log
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Tabs */}
        <div className="mb-4 flex rounded-lg bg-gray-100 p-[3px]">
          {([["growth", "Growth"], ["milestones", "Milestones"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-xs font-semibold transition-colors ${
                activeTab === key ? "bg-white text-cg-brand shadow-sm" : "text-gray-500"
              }`}
            >
              {key === "growth" ? <TrendingUp size={14} /> : <Award size={14} />}
              {label}
            </button>
          ))}
        </div>

        {activeTab === "growth" && (
          <>
            {/* Latest stats */}
            {latestGrowth && (
              <div className="mb-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Height", value: `${latestGrowth.height} cm`, color: "text-blue-600" },
                  { label: "Weight", value: `${latestGrowth.weight} kg`, color: "text-emerald-600" },
                  { label: "Head", value: `${latestGrowth.headCircumference} cm`, color: "text-purple-600" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="rounded-2xl bg-white p-3 text-center shadow-sm">
                    <p className={`text-lg font-bold ${color}`}>{value}</p>
                    <p className="text-[10px] text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Growth chart (simplified ASCII-style visualization) */}
            <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-gray-500">Height Over Time</p>
              <div className="flex items-end gap-2 h-32">
                {growthEntries.map((entry, i) => {
                  const minH = Math.min(...growthEntries.map((e) => e.height ?? 0));
                  const maxH = Math.max(...growthEntries.map((e) => e.height ?? 0));
                  const range = maxH - minH || 1;
                  const height = ((entry.height ?? 0) - minH) / range;
                  return (
                    <div key={entry.id} className="flex flex-1 flex-col items-center gap-1">
                      <p className="text-[8px] text-gray-400">{entry.height}</p>
                      <div
                        className="w-full rounded-t-lg bg-blue-400 transition-all"
                        style={{ height: `${Math.max(height * 100, 10)}%` }}
                      />
                      <p className="text-[8px] text-gray-400">{entry.date.split("-")[1]}/{entry.date.split("-")[0].slice(2)}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weight chart */}
            <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
              <p className="mb-3 text-xs font-semibold text-gray-500">Weight Over Time</p>
              <div className="flex items-end gap-2 h-32">
                {growthEntries.map((entry) => {
                  const minW = Math.min(...growthEntries.map((e) => e.weight ?? 0));
                  const maxW = Math.max(...growthEntries.map((e) => e.weight ?? 0));
                  const range = maxW - minW || 1;
                  const height = ((entry.weight ?? 0) - minW) / range;
                  return (
                    <div key={entry.id} className="flex flex-1 flex-col items-center gap-1">
                      <p className="text-[8px] text-gray-400">{entry.weight}</p>
                      <div
                        className="w-full rounded-t-lg bg-emerald-400 transition-all"
                        style={{ height: `${Math.max(height * 100, 10)}%` }}
                      />
                      <p className="text-[8px] text-gray-400">{entry.date.split("-")[1]}/{entry.date.split("-")[0].slice(2)}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* History list */}
            <p className="mb-2 text-xs font-semibold text-gray-500">Measurement History</p>
            <div className="flex flex-col gap-2">
              {[...growthEntries].reverse().map((entry) => (
                <div key={entry.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-800">{entry.date}</p>
                    <p className="text-[10px] text-gray-400">by {entry.recordedBy}</p>
                  </div>
                  <div className="flex gap-4 text-xs text-gray-500">
                    {entry.height && <span>H: {entry.height}cm</span>}
                    {entry.weight && <span>W: {entry.weight}kg</span>}
                    {entry.headCircumference && <span>HC: {entry.headCircumference}cm</span>}
                  </div>
                  {entry.notes && <p className="mt-1 text-[11px] text-gray-400">{entry.notes}</p>}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "milestones" && (
          <>
            {milestones.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50">
                  <Award size={24} className="text-amber-500" />
                </div>
                <p className="text-sm font-semibold text-gray-700">No Milestones Yet</p>
                <p className="text-xs text-gray-400">Tap &quot;Log&quot; to record a milestone.</p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="flex flex-col gap-4">
                  {milestones.map((m) => (
                    <div key={m.id} className="relative flex gap-4 pl-10">
                      <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-cg-brand bg-white" />
                      <div className="rounded-2xl bg-white p-4 shadow-sm flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-bold text-cg-brand">{m.title}</p>
                          <p className="text-[10px] text-gray-400">{m.date}</p>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{m.description}</p>
                        <p className="mt-1 text-[10px] text-gray-400">Logged by {m.recordedBy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Growth Modal */}
      {showGrowthModal && (
        <GrowthModal onClose={() => setShowGrowthModal(false)} childId={mockChild.id} childName={mockChild.name} />
      )}

      {/* Add Milestone Modal */}
      {showMilestoneModal && (
        <MilestoneModal onClose={() => setShowMilestoneModal(false)} childId={mockChild.id} />
      )}

      <ParentBottomNav />
    </div>
  );
}

function GrowthModal({ onClose, childId, childName }: { onClose: () => void; childId: string; childName: string }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [headCirc, setHeadCirc] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit() {
    addGrowthEntry({
      childId,
      date: new Date().toISOString().split("T")[0],
      height: height ? parseFloat(height) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
      headCircumference: headCirc ? parseFloat(headCirc) : undefined,
      recordedBy: "James Miller",
      notes: notes.trim() || undefined,
    });
    onClose();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">Log Growth</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Height (cm)</label>
              <input value={height} onChange={(e) => setHeight(e.target.value)} type="number" placeholder="96" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input value={weight} onChange={(e) => setWeight(e.target.value)} type="number" step="0.1" placeholder="13.2" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Head Circumference (cm)</label>
            <input value={headCirc} onChange={(e) => setHeadCirc(e.target.value)} type="number" step="0.1" placeholder="50" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Optional notes..." className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <button onClick={handleSubmit} className="mt-1 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white">
            Save Measurement
          </button>
        </div>
      </div>
    </div>
  );
}

function MilestoneModal({ onClose, childId }: { onClose: () => void; childId: string }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit() {
    if (!title.trim()) return;
    addMilestone({
      childId,
      date: new Date().toISOString().split("T")[0],
      title: title.trim(),
      description: description.trim() || title.trim(),
      recordedBy: "James Miller",
    });
    onClose();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">Log Milestone</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Milestone Title <span className="text-red-500">*</span></label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., First Steps, First Words" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Tell us about this milestone..." className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <button onClick={handleSubmit} disabled={!title.trim()} className="mt-1 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40">
            Save Milestone
          </button>
        </div>
      </div>
    </div>
  );
}
