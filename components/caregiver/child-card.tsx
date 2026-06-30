"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, AlertCircle, MessageSquare } from "lucide-react";
import type { Child } from "@/lib/caregiver/mock-data";

type Props = { child: Child };

export function ChildCard({ child }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Header row: name links to profile, chevron toggles expand */}
      <div className="flex w-full items-center justify-between px-4 py-3.5">
        <Link
          href={`/caregiver/children/${child.id}`}
          className="flex flex-1 items-center gap-3"
        >
          <span className="text-xl">🐻</span>
          <span className="text-sm font-semibold text-cg-brand">{child.name}</span>
        </Link>
        <button onClick={() => setExpanded(!expanded)} className="ml-2 p-1">
          {expanded ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </button>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 px-4 pb-4">
          {/* Age + Room chips */}
          <div className="mt-3 flex gap-3">
            <div className="flex-1 rounded-xl bg-gray-50 p-3">
              <p className="text-[10px] text-gray-400">Age</p>
              <p className="text-sm font-bold text-cg-brand">{child.age}</p>
            </div>
            <div className="flex-1 rounded-xl bg-cg-quick-action p-3">
              <p className="text-[10px] text-gray-400">Room</p>
              <p className="text-sm font-bold text-cg-brand">{child.room}</p>
            </div>
          </div>

          {/* Alerts */}
          {child.alerts.length > 0 && (
            <div className="mt-3">
              <p className="mb-2 text-xs font-semibold text-gray-500">Alerts &amp; Needs</p>
              {child.alerts.map((alert, i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl bg-blue-50 p-3">
                  <AlertCircle size={14} className="mt-0.5 shrink-0 text-blue-500" />
                  <div>
                    <p className="text-xs font-semibold text-blue-700">{alert.label}</p>
                    <p className="text-xs text-blue-600">{alert.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Parent contact */}
          <div className="mt-3">
            <p className="mb-1 text-xs text-gray-400">Parent Contact</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-cg-brand">{child.parentContact.name}</p>
              <Link href={`/caregiver/chat/${child.parentContact.id}`}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cg-quick-action">
                  <MessageSquare size={16} className="text-cg-brand" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
