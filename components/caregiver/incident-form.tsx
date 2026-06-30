"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";
import { mockChildren } from "@/lib/caregiver/mock-data";

const SEVERITY_OPTIONS = ["Minor", "Moderate", "Severe"] as const;

export function IncidentForm() {
  const [child, setChild] = useState("");
  const [severity, setSeverity] = useState("");
  const [description, setDescription] = useState("");
  const [action, setAction] = useState("");
  const [showChildDrop, setShowChildDrop] = useState(false);
  const [showSevDrop, setShowSevDrop] = useState(false);
  const { close } = useLogSheet();

  return (
    <div className="flex flex-col gap-4">
      {/* Child */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">Child <span className="text-red-500">*</span></p>
        <div className="relative">
          <button onClick={() => setShowChildDrop(!showChildDrop)} className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
            <span className={child ? "text-cg-brand" : "text-gray-400"}>{child || "Select child"}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showChildDrop && (
            <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-100 bg-white shadow-lg">
              {mockChildren.map((c) => (
                <button key={c.id} onClick={() => { setChild(c.name); setShowChildDrop(false); }} className="w-full px-4 py-3 text-left text-sm text-cg-brand hover:bg-gray-50">
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Severity */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">Severity <span className="text-red-500">*</span></p>
        <div className="relative">
          <button onClick={() => setShowSevDrop(!showSevDrop)} className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
            <span className={severity ? "text-cg-brand" : "text-gray-400"}>{severity || "Select severity"}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showSevDrop && (
            <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-100 bg-white shadow-lg">
              {SEVERITY_OPTIONS.map((s) => (
                <button key={s} onClick={() => { setSeverity(s); setShowSevDrop(false); }} className="w-full px-4 py-3 text-left text-sm text-cg-brand hover:bg-gray-50">{s}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">What happened? <span className="text-red-500">*</span></p>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the incident..." rows={3} className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none" />
      </div>

      {/* Action taken */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">Action Taken</p>
        <textarea value={action} onChange={(e) => setAction(e.target.value)} placeholder="What action was taken..." rows={2} className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none" />
      </div>

      <button onClick={close} className="w-full rounded-xl bg-red-500 py-3.5 text-sm font-semibold text-white">
        Log Incident
      </button>
    </div>
  );
}
