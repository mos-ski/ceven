"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pill, Clock, CheckCircle2, XCircle, Plus, X, Calendar } from "lucide-react";
import { mockChild } from "@/lib/parent/mock-data";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import {
  getMedicationRequests,
  getMedicationLogs,
  getMedicationHistory,
  addMedicationRequest,
  type MedicationRequest,
  type MedicationLog,
} from "@/lib/shared/medication";
import { NewBadge } from "@/components/parent/new-badge";

const STATUS_STYLES: Record<string, string> = {
  scheduled: "bg-blue-50 text-blue-700",
  administered: "bg-emerald-50 text-emerald-700",
  missed: "bg-red-50 text-red-700",
  delayed: "bg-amber-50 text-amber-700",
};

export default function ParentMedicationPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<MedicationRequest[]>([]);
  const [todayLogs, setTodayLogs] = useState<MedicationLog[]>([]);
  const [history, setHistory] = useState<MedicationLog[]>([]);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"today" | "history" | "requests">("today");

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("ceven-medication_requests-updated", handler);
    window.addEventListener("ceven-medication_logs-updated", handler);
    return () => {
      window.removeEventListener("ceven-medication_requests-updated", handler);
      window.removeEventListener("ceven-medication_logs-updated", handler);
    };
  }, []);

  function refresh() {
    setRequests(getMedicationRequests(mockChild.id));
    setTodayLogs(getMedicationLogs(mockChild.id));
    setHistory(getMedicationHistory(mockChild.id, 7));
  }

  const administered = todayLogs.filter((l) => l.status === "administered").length;
  const missed = todayLogs.filter((l) => l.status === "missed").length;
  const scheduled = todayLogs.filter((l) => l.status === "scheduled").length;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center justify-between bg-white px-5 pt-12 pb-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-cg-brand">Medication</h1>
              <NewBadge />
            </div>
            <p className="text-xs text-gray-400">For {mockChild.name}</p>
          </div>
        </div>
        <button
          onClick={() => setShowRequestModal(true)}
          className="flex items-center gap-1 rounded-xl bg-cg-brand px-3 py-2 text-xs font-semibold text-white"
        >
          <Plus size={14} /> Request
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Summary */}
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

        {/* Tabs */}
        <div className="mb-4 flex rounded-lg bg-gray-100 p-[3px]">
          {([["today", "Today"], ["history", "History"], ["requests", "Active Meds"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex flex-1 items-center justify-center rounded-md py-2 text-xs font-semibold transition-colors ${
                activeTab === key ? "bg-white text-cg-brand shadow-sm" : "text-gray-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "today" && (
          <div className="flex flex-col gap-2">
            {todayLogs.length === 0 ? (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <Pill size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-400">No medication scheduled today.</p>
              </div>
            ) : (
              todayLogs.map((log) => (
                <div key={log.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cg-quick-action text-cg-brand">
                        <Pill size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-cg-brand">{log.medication}</p>
                        <p className="text-xs text-gray-500">{log.dosage}</p>
                      </div>
                    </div>
                    <span className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${STATUS_STYLES[log.status]}`}>
                      {log.status === "administered" ? <CheckCircle2 size={12} /> : log.status === "missed" ? <XCircle size={12} /> : <Clock size={12} />}
                      {log.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Scheduled: {log.scheduledTime}
                    {log.actualTime && ` · Given at ${log.actualTime}`}
                    {log.administeredBy && ` by ${log.administeredBy}`}
                  </p>
                  {log.notes && (
                    <div className="mt-2 rounded-xl bg-gray-50 px-3 py-2">
                      <p className="text-[11px] text-gray-500">{log.notes}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="flex flex-col gap-2">
            {history.length === 0 ? (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <Calendar size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-400">No medication history.</p>
              </div>
            ) : (
              history.map((log) => (
                <div key={log.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-800">{log.medication} · {log.dosage}</p>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${STATUS_STYLES[log.status]}`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    {log.date} · {log.scheduledTime}
                    {log.actualTime && ` · Given at ${log.actualTime}`}
                    {log.administeredBy && ` by ${log.administeredBy}`}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "requests" && (
          <div className="flex flex-col gap-2">
            {requests.length === 0 ? (
              <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <Pill size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-400">No active medication requests.</p>
              </div>
            ) : (
              requests.map((req) => (
                <div key={req.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-cg-brand">{req.medication}</p>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">Dosage: {req.dosage}</p>
                  <p className="text-xs text-gray-500 mb-1">
                    Schedule: {req.schedule.type === "daily" ? `Daily at ${req.schedule.times.join(", ")}` : req.schedule.type === "interval" ? `Every ${req.schedule.intervalHours}h` : "Custom"}
                  </p>
                  {req.notes && <p className="text-[11px] text-gray-400 mt-1">Note: {req.notes}</p>}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Medication Request Modal */}
      {showRequestModal && (
        <MedicationRequestModal
          onClose={() => setShowRequestModal(false)}
          onSubmit={(data) => {
            addMedicationRequest({ ...data, childId: mockChild.id, childName: mockChild.name, authorizedByParent: true });
            refresh();
            setShowRequestModal(false);
          }}
        />
      )}

      <ParentBottomNav />
    </div>
  );
}

function MedicationRequestModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: { medication: string; dosage: string; schedule: { type: "daily" | "interval" | "specific"; times: string[]; intervalHours?: number }; notes: string }) => void;
}) {
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [scheduleType, setScheduleType] = useState<"daily" | "interval" | "specific">("daily");
  const [time, setTime] = useState("08:30 AM");
  const [interval, setInterval] = useState("6");
  const [notes, setNotes] = useState("");

  function handleSubmit() {
    if (!medication.trim() || !dosage.trim()) return;
    onSubmit({
      medication: medication.trim(),
      dosage: dosage.trim(),
      schedule: {
        type: scheduleType,
        times: scheduleType === "daily" ? [time] : [],
        intervalHours: scheduleType === "interval" ? parseInt(interval) : undefined,
      },
      notes: notes.trim(),
    });
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">Medication Request</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Medication Name <span className="text-red-500">*</span></label>
            <input value={medication} onChange={(e) => setMedication(e.target.value)} placeholder="e.g., Calpol, Vitamin D" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Dosage <span className="text-red-500">*</span></label>
            <input value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g., 5ml, 1 drop" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Schedule Type</label>
            <div className="flex gap-2">
              {([["daily", "Daily"], ["interval", "Interval"], ["specific", "Specific Days"]] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setScheduleType(val)}
                  className={`flex-1 rounded-lg py-2.5 text-xs font-semibold transition-colors ${
                    scheduleType === val ? "bg-cg-brand text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {scheduleType === "daily" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Time</label>
              <input value={time} onChange={(e) => setTime(e.target.value)} placeholder="08:30 AM" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
            </div>
          )}
          {scheduleType === "interval" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Every how many hours?</label>
              <input value={interval} onChange={(e) => setInterval(e.target.value)} type="number" placeholder="6" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Any special instructions..." className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!medication.trim() || !dosage.trim()}
            className="mt-1 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
