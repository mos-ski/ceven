"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, TrendingUp, Award, Plus, X } from "lucide-react";
import { mockUser, mockChildProfiles, type ChildProfile } from "@/lib/caregiver/mock-data";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import {
  getGrowthEntries,
  getMilestones,
  addGrowthEntry,
  addMilestone,
  type GrowthEntry,
  type Milestone,
} from "@/lib/shared/growth";
import { NewBadge } from "@/components/caregiver/new-badge";

export default function ChildGrowthPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const child = mockChildProfiles.find((c) => c.id === id) ?? mockChildProfiles[0];
  const [growthEntries, setGrowthEntries] = useState<GrowthEntry[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [activeTab, setActiveTab] = useState<"growth" | "milestones">("growth");
  const [showGrowthModal, setShowGrowthModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);

  useEffect(() => {
    refresh();
  }, []);

  function refresh() {
    setGrowthEntries(getGrowthEntries(id));
    setMilestones(getMilestones(id));
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-cg-bg">
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-base font-bold text-cg-brand">Growth & Milestones</h1>
            <NewBadge />
        </div>
        <button
          onClick={() => activeTab === "growth" ? setShowGrowthModal(true) : setShowMilestoneModal(true)}
          className="flex items-center gap-1 rounded-xl bg-cg-brand px-3 py-2 text-xs font-semibold text-white"
        >
          <Plus size={14} /> Log
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
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

        {activeTab === "growth" ? (
          <div className="flex flex-col gap-2">
            {growthEntries.length === 0 ? (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <TrendingUp size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-400">No growth data yet. Tap &quot;Log&quot; to add.</p>
              </div>
            ) : (
              [...growthEntries].reverse().map((entry) => (
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
              ))
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {milestones.length === 0 ? (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <Award size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-400">No milestones yet. Tap &quot;Log&quot; to add.</p>
              </div>
            ) : (
              milestones.map((m) => (
                <div key={m.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold text-cg-brand">{m.title}</p>
                    <p className="text-[10px] text-gray-400">{m.date}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{m.description}</p>
                  <p className="mt-1 text-[10px] text-gray-400">Logged by {m.recordedBy}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {showGrowthModal && (
        <GrowthModal onClose={() => { setShowGrowthModal(false); refresh(); }} childId={id} />
      )}
      {showMilestoneModal && (
        <MilestoneModal onClose={() => { setShowMilestoneModal(false); refresh(); }} childId={id} />
      )}

      <LogSheet />
      <BottomNav />
    </div>
  );
}

function GrowthModal({ onClose, childId }: { onClose: () => void; childId: string }) {
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
      recordedBy: "Ms Anu",
      notes: notes.trim() || undefined,
    });
    onClose();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">Log Growth</h3>
          <button onClick={onClose} className="text-xs text-gray-400">Close</button>
        </div>
        <div className="px-5 flex flex-col gap-4">
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
          <button onClick={handleSubmit} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white">
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
      recordedBy: "Ms Anu",
    });
    onClose();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">Log Milestone</h3>
          <button onClick={onClose} className="text-xs text-gray-400">Close</button>
        </div>
        <div className="px-5 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Milestone Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., First Steps, First Words" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Tell us about this milestone..." className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <button onClick={handleSubmit} disabled={!title.trim()} className="w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40">
            Save Milestone
          </button>
        </div>
      </div>
    </div>
  );
}
