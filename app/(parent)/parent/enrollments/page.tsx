"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, MapPin, UserRound, Calendar, X } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { formatAge } from "@/lib/shared/enrollment-children";
import {
  getEnrollments,
  withdrawEnrollment,
  type Enrollment,
  type EnrollmentStatus,
} from "@/lib/shared/enrollments";

const STATUS_STYLES: Record<EnrollmentStatus, { chip: string; label: string }> = {
  pending: { chip: "bg-amber-400 text-white", label: "Pending" },
  active: { chip: "bg-green-500 text-white", label: "Active" },
  cancelled: { chip: "bg-red-500 text-white", label: "Cancelled" },
};

function DetailsSheet({ enrollment, onClose }: { enrollment: Enrollment; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="flex max-h-[80vh] w-full max-w-[430px] flex-col rounded-t-3xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-bold text-gray-800">Enrollment Details</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cg-quick-action text-sm font-bold text-cg-brand">
              {enrollment.childAvatarInitials}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{enrollment.childName}</p>
              <p className="text-xs text-gray-400">{enrollment.crecheName} · {enrollment.roomName}</p>
            </div>
            <span className={`ml-auto rounded-full px-3 py-1 text-[10px] font-semibold ${STATUS_STYLES[enrollment.status].chip}`}>
              {STATUS_STYLES[enrollment.status].label}
            </span>
          </div>

          <div className="mb-4 flex flex-col gap-2">
            {[
              { label: "Age At Enrollment", value: formatAge(enrollment.ageAtEnrollmentMonths) },
              { label: "Location", value: enrollment.location },
              { label: "Starts", value: enrollment.startDate ?? "N/A" },
              { label: "Notes", value: enrollment.notes ?? "—" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl bg-[#F9F5EE] px-4 py-3">
                <p className="mb-0.5 text-xs font-medium text-gray-400">{label}</p>
                <p className="text-sm text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Status timeline */}
          <p className="mb-3 text-xs font-semibold text-gray-500">Status Timeline</p>
          <div className="relative pb-2">
            <div className="absolute left-[5px] top-1 bottom-1 w-0.5 bg-gray-200" />
            <div className="flex flex-col gap-4">
              {enrollment.statusHistory.map((entry, i) => (
                <div key={i} className="relative pl-6">
                  <div className={`absolute left-0 top-1 h-3 w-3 rounded-full ${
                    i === enrollment.statusHistory.length - 1 ? "bg-cg-brand" : "bg-gray-300"
                  }`} />
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLES[entry.status].chip}`}>
                      {STATUS_STYLES[entry.status].label}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {new Date(entry.timestamp).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  {entry.note && <p className="mt-1 text-[11px] text-gray-500">{entry.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnrollmentCard({
  enrollment,
  onWithdraw,
  onOpen,
}: {
  enrollment: Enrollment;
  onWithdraw: () => void;
  onOpen: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  function handleWithdrawClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (confirming) {
      onWithdraw();
      setConfirming(false);
    } else {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 2500);
    }
  }

  return (
    <div
      onClick={onOpen}
      className="cursor-pointer rounded-2xl bg-white p-4 shadow-sm active:scale-[0.99] transition-transform"
    >
      <div className="mb-2 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cg-quick-action text-sm font-bold text-cg-brand">
          {enrollment.childAvatarInitials}
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-800">{enrollment.childName}</p>
          <p className="text-xs text-gray-400">{enrollment.crecheName}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold ${STATUS_STYLES[enrollment.status].chip}`}>
          {STATUS_STYLES[enrollment.status].label}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <UserRound size={13} className="text-gray-400" />
          {enrollment.childGender} · Age At Enrollment: {formatAge(enrollment.ageAtEnrollmentMonths)}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={13} className="text-gray-400" />
          {enrollment.location}
        </span>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-gray-400" />
            Starts: {enrollment.startDate ?? "N/A"}
          </span>
          {enrollment.status !== "cancelled" && (
            <button
              onClick={handleWithdrawClick}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                confirming
                  ? "border-red-500 bg-red-500 text-white"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              {confirming ? "Tap again to confirm" : "Withdraw Child"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EnrollmentsPage() {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Enrollment | null>(null);

  useEffect(() => {
    setEnrollments(getEnrollments());
  }, []);

  function handleWithdraw(id: string) {
    withdrawEnrollment(id);
    setEnrollments(getEnrollments());
  }

  const filtered = query.trim()
    ? enrollments.filter((e) => e.childName.toLowerCase().includes(query.trim().toLowerCase()))
    : enrollments;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      {selected && <DetailsSheet enrollment={selected} onClose={() => setSelected(null)} />}

      {/* Brown header with search */}
      <div className="shrink-0 bg-[#5B391E] px-5 pb-5 pt-12">
        <button
          onClick={() => router.back()}
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-white"
        >
          <ArrowLeft size={16} className="text-gray-700" />
        </button>
        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by first and last names."
            className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />
          <Search size={16} className="text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto rounded-t-3xl bg-white px-5 py-5 -mt-3">
        <p className="mb-3 text-sm font-bold text-gray-800">Your Children Enrollment</p>

        {filtered.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filtered.map((enr) => (
              <EnrollmentCard
                key={enr.id}
                enrollment={enr}
                onWithdraw={() => handleWithdraw(enr.id)}
                onOpen={() => setSelected(enr)}
              />
            ))}
          </div>
        ) : enrollments.length > 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">No children match your search.</p>
        ) : (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="text-sm font-semibold text-gray-700">No enrollments yet</p>
            <button
              onClick={() => router.push("/parent/creche")}
              className="mt-3 rounded-xl bg-cg-brand px-5 py-2.5 text-xs font-semibold text-white"
            >
              Find a creche to get started
            </button>
          </div>
        )}
      </div>

      <ParentBottomNav />
    </div>
  );
}
