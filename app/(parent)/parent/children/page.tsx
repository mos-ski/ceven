"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Baby, HeartPulse, LineChart, Plus, UserRound } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockChild } from "@/lib/parent/mock-data";
import {
  getAcceptedIndependentCaregiverRelationships,
  type IndependentCaregiverInvite,
} from "@/lib/independent-caregiver-invites";

export default function ParentChildrenPage() {
  const router = useRouter();
  const [acceptedCaregivers, setAcceptedCaregivers] = useState<IndependentCaregiverInvite[]>(() =>
    getAcceptedIndependentCaregiverRelationships(mockChild.id)
  );

  function refreshCaregivers() {
    setAcceptedCaregivers(getAcceptedIndependentCaregiverRelationships(mockChild.id));
  }

  useEffect(() => {
    window.addEventListener("storage", refreshCaregivers);
    window.addEventListener("ceven-independent-invites-updated", refreshCaregivers);
    return () => {
      window.removeEventListener("storage", refreshCaregivers);
      window.removeEventListener("ceven-independent-invites-updated", refreshCaregivers);
    };
  }, []);

  const independentCaregiver = acceptedCaregivers[0];

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()} className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h1 className="flex-1 text-base font-bold text-cg-brand">My Children</h1>
        <Link href="/parent/child/add" className="flex h-8 w-8 items-center justify-center rounded-full bg-cg-brand text-white">
          <Plus size={16} />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-gray-400">Children ({1})</p>

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <Link href="/parent/child" className="block p-4 active:bg-gray-50">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cg-accent-muted text-xl font-bold text-cg-brand">
                {mockChild.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-bold text-cg-brand">{mockChild.name}</p>
                <p className="text-sm text-gray-400">{mockChild.age} · {mockChild.room}</p>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-cg-quick-action px-2.5 py-1 text-[11px] font-bold text-cg-accent">
                  <UserRound size={12} />
                  {independentCaregiver ? independentCaregiver.caregiverName : "No independent caregiver"}
                </div>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-3 border-t border-gray-100">
            <Link href="/parent/child/feeding" className="flex flex-col items-center gap-1 border-r border-gray-100 px-2 py-3 text-center">
              <Baby size={17} className="text-cg-brand" />
              <span className="text-[11px] font-semibold text-gray-500">Feeding</span>
            </Link>
            <Link href="/parent/child/health" className="flex flex-col items-center gap-1 border-r border-gray-100 px-2 py-3 text-center">
              <HeartPulse size={17} className="text-cg-brand" />
              <span className="text-[11px] font-semibold text-gray-500">Health</span>
            </Link>
            <Link href="/parent/child/development" className="flex flex-col items-center gap-1 px-2 py-3 text-center">
              <LineChart size={17} className="text-cg-brand" />
              <span className="text-[11px] font-semibold text-gray-500">Growth</span>
            </Link>
          </div>
        </div>

        <Link
          href="/parent/child/add"
          className="mt-4 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-cg-accent-muted py-4 text-sm font-bold text-cg-brand"
        >
          <Plus size={16} />
          Add another child
        </Link>
      </div>

      <ParentBottomNav />
    </div>
  );
}
