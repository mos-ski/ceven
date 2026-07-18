"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pill, CheckCircle2, XCircle, Clock } from "lucide-react";
import { mockMedicationDoses, mockUser, type MedicationDose, type MedicationStatus } from "@/lib/caregiver/mock-data";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";

const STATUS_STYLES: Record<MedicationStatus, string> = {
  scheduled: "bg-blue-50 text-blue-700",
  administered: "bg-emerald-50 text-emerald-700",
  missed: "bg-red-50 text-red-700",
};

const STATUS_ICONS: Record<MedicationStatus, React.ReactNode> = {
  scheduled: <Clock size={13} />,
  administered: <CheckCircle2 size={13} />,
  missed: <XCircle size={13} />,
};

function nowTime(suffix: "AM" | "PM") {
  return (
    new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + ` ${suffix}`
  );
}

export default function MedicationPage() {
  const router = useRouter();
  const [doses, setDoses] = useState<MedicationDose[]>(mockMedicationDoses);
  const [noteDraftId, setNoteDraftId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");

  function markAdministered(id: string) {
    setDoses((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "administered", administeredBy: mockUser.name, administeredAt: nowTime("AM") }
          : d
      )
    );
  }

  function markMissed(id: string) {
    setNoteDraftId(id);
    setNoteDraft("");
  }

  function confirmMissed() {
    if (!noteDraftId) return;
    setDoses((prev) =>
      prev.map((d) =>
        d.id === noteDraftId
          ? { ...d, status: "missed", administeredBy: null, administeredAt: null, note: noteDraft || "No reason given." }
          : d
      )
    );
    setNoteDraftId(null);
  }

  const scheduled = doses.filter((d) => d.status === "scheduled").length;
  const administered = doses.filter((d) => d.status === "administered").length;
  const missed = doses.filter((d) => d.status === "missed").length;

  return (
    <div className="relative flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Medication</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4 flex gap-3">
          {[
            { label: "Scheduled", count: scheduled, color: "text-blue-600" },
            { label: "Given", count: administered, color: "text-emerald-600" },
            { label: "Missed", count: missed, color: "text-red-600" },
          ].map(({ label, count, color }) => (
            <div key={label} className="flex-1 rounded-2xl bg-white p-3 text-center shadow-sm">
              <p className={`text-xl font-bold ${color}`}>{count}</p>
              <p className="text-[10px] text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {doses.map((dose) => (
            <div key={dose.id} className="rounded-2xl bg-white p-4">
              <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cg-quick-action text-cg-brand">
                    <Pill size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-cg-brand">{dose.childName}</p>
                    <p className="text-xs text-gray-500">{dose.medication} · {dose.dosage}</p>
                  </div>
                </div>
                <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${STATUS_STYLES[dose.status]}`}>
                  {STATUS_ICONS[dose.status]}
                  {dose.status}
                </span>
              </div>

              <p className="mb-3 text-[11px] text-gray-400">
                Scheduled for {dose.scheduledTime}
                {dose.status === "administered" && dose.administeredAt && ` · Given at ${dose.administeredAt} by ${dose.administeredBy}`}
              </p>

              {dose.note && (
                <div className="mb-3 rounded-xl bg-gray-50 px-3 py-2.5">
                  <p className="text-[10px] font-semibold text-gray-400 mb-1">Note</p>
                  <p className="text-xs text-gray-600">{dose.note}</p>
                </div>
              )}

              {dose.status === "scheduled" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => markAdministered(dose.id)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-500 py-2.5 text-xs font-semibold text-white"
                  >
                    <CheckCircle2 size={14} /> Administered
                  </button>
                  <button
                    onClick={() => markMissed(dose.id)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-200 py-2.5 text-xs font-semibold text-red-600"
                  >
                    <XCircle size={14} /> Missed
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {noteDraftId && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
          <div className="w-full max-w-[430px] rounded-t-2xl bg-white p-5 pb-8">
            <h3 className="mb-3 text-base font-semibold text-gray-800">Why was the dose missed?</h3>
            <textarea
              value={noteDraft}
              onChange={(e) => setNoteDraft(e.target.value)}
              rows={3}
              placeholder="E.g., child was asleep, parent said to hold off..."
              className="mb-3 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
            />
            <div className="flex gap-2">
              <button onClick={() => setNoteDraftId(null)} className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600">
                Cancel
              </button>
              <button onClick={confirmMissed} className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white">
                Confirm Missed
              </button>
            </div>
          </div>
        </div>
      )}

      <LogSheet />
      <BottomNav />
    </div>
  );
}
