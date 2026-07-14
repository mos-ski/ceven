"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, AlertTriangle, Info } from "lucide-react";
import Link from "next/link";
import { mockChildProfiles, type ChildProfile } from "@/lib/caregiver/mock-data";
import { getAcceptedCaregiverChildren } from "@/lib/independent-caregiver-invites";

export default function ChildProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const familyChild = getAcceptedCaregiverChildren().find((c) => c.id === id);
  const child: ChildProfile = mockChildProfiles.find((c) => c.id === id) ?? {
    ...(familyChild ?? mockChildProfiles[0]),
    gender: "Not specified",
    dob: "Shared by parent",
    enrollDate: "Accepted invite",
    bloodGroup: "Not specified",
    notes: familyChild
      ? "This child was added through a parent-invited independent caregiver relationship."
      : mockChildProfiles[0].notes,
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-cg-bg">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Child Profile</h1>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 pb-8 pt-4">
        {/* Avatar + name */}
        <div className="flex flex-col items-center gap-2 py-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cg-brand text-2xl font-bold text-white">
            {child.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <p className="text-lg font-bold text-cg-brand">{child.name}</p>
          <span className="rounded-full bg-cg-quick-action px-3 py-1 text-xs font-semibold text-cg-accent">{child.room} Room</span>
        </div>

        {/* Details card */}
        <div className="rounded-2xl bg-white p-4 flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Details</p>
          {[
            { label: "Age", value: child.age },
            { label: "Gender", value: child.gender },
            { label: "Date of Birth", value: child.dob },
            { label: "Blood Group", value: child.bloodGroup },
            { label: "Enrolled", value: child.enrollDate },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0">
              <span className="text-xs text-gray-400">{label}</span>
              <span className="text-xs font-semibold text-cg-brand">{value}</span>
            </div>
          ))}
        </div>

        {/* Notes */}
        {child.notes && (
          <div className="rounded-2xl bg-white p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Notes</p>
            <p className="text-sm text-gray-600 leading-relaxed">{child.notes}</p>
          </div>
        )}

        {/* Alerts */}
        {child.alerts.length > 0 && (
          <div className="rounded-2xl bg-white p-4 flex flex-col gap-2">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Alerts &amp; Needs</p>
            {child.alerts.map((alert, i) => (
              <div key={i} className={`flex items-start gap-3 rounded-xl p-3 ${alert.type === "warning" ? "bg-red-50" : "bg-amber-50"}`}>
                {alert.type === "warning"
                  ? <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-500" />
                  : <Info size={16} className="mt-0.5 shrink-0 text-amber-500" />}
                <div>
                  <p className="text-xs font-semibold text-cg-brand">{alert.label}</p>
                  <p className="text-xs text-gray-500">{alert.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Parent contact */}
        <div className="rounded-2xl bg-white p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Parent Contact</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
                {child.parentContact.avatarInitials}
              </div>
              <p className="text-sm font-semibold text-cg-brand">{child.parentContact.name}</p>
            </div>
            <Link
              href={`/caregiver/chat/${child.parentContact.id}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cg-quick-action"
            >
              <MessageSquare size={16} className="text-cg-accent" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
