"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { ENROLLMENT_REQUESTS } from "@/lib/super-admin/mock-data";

const TABS = ["Basic Information", "Rooms", "Time Schedule", "Creche Documents"] as const;

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export default function EnrollmentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const enrollment = ENROLLMENT_REQUESTS.find((e) => e.id === id);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Basic Information");
  const [pricingModal, setPricingModal] = useState<{ roomName: string; pricing: Record<string, number> } | null>(null);
  const [requestInfoOpen, setRequestInfoOpen] = useState(false);

  if (!enrollment) {
    return (
      <div className="flex flex-col items-center gap-4 py-20">
        <p className="font-[family-name:var(--font-nunito)] text-lg text-muted-text">Enrollment request not found.</p>
        <Link href="/super-admin/enrollment" className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
          ← Back to Enrollment
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link href="/super-admin/enrollment" className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
          <ArrowLeft className="size-4" /> Back to Enrollment
        </Link>
        <div className="flex gap-2">
          <button type="button" onClick={() => setRequestInfoOpen(true)} className="rounded-lg border border-brand-dark px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-brand-dark hover:bg-slate-50">
            Request More Details
          </button>
          <button type="button" className="rounded-lg bg-error px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-red-700">
            Reject
          </button>
          <button type="button" className="rounded-lg bg-success-text px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-emerald-700">
            Approve
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-card-border bg-white p-4">
            <div className="mb-3 flex items-center justify-center">
              <div className="flex h-40 w-full items-center justify-center rounded-lg bg-gradient-to-br from-brand-accent/10 to-brand-dark/10">
                <span className="font-[family-name:var(--font-nunito)] text-sm text-muted-text">Slide 1 of 1</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl border border-card-border bg-white p-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-2.5 text-left font-[family-name:var(--font-nunito)] text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "border-l-4 border-brand-dark bg-[#faf2e1] text-brand-dark"
                    : "text-muted-text hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-white p-6">
          <h2 className="mb-4 font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
            {activeTab}
          </h2>

          {activeTab === "Basic Information" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoRow label="Creche Name" value={enrollment.crecheName} />
              <InfoRow label="Email Address" value={enrollment.email} />
              <InfoRow label="Phone Number" value={enrollment.phone} />
              <InfoRow label="Age Range" value={enrollment.ageRange} />
              <div className="md:col-span-2">
                <InfoRow label="Creche Features" value={enrollment.features.join(", ")} />
              </div>
              <InfoRow label="State" value={enrollment.state} />
              <InfoRow label="LGA" value={enrollment.lga} />
              <div className="md:col-span-2">
                <InfoRow label="Address" value={enrollment.address} />
              </div>
              <div className="md:col-span-2">
                <InfoRow label="Bio" value={enrollment.bio} />
              </div>
              <div className="md:col-span-2">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">Profile Pictures</p>
                <button type="button" className="mt-1 font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
                  View Images
                </button>
              </div>
              <div className="md:col-span-2">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">Policy Document</p>
                <button type="button" className="mt-1 font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
                  View Document
                </button>
              </div>
            </div>
          )}

          {activeTab === "Rooms" && (
            <div className="flex flex-col gap-3">
              {enrollment.rooms.map((room) => (
                <div key={room.name} className="flex items-center justify-between rounded-lg border border-card-border p-4">
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">{room.name}</p>
                  <button
                    type="button"
                    onClick={() => setPricingModal({ roomName: room.name, pricing: room.pricing })}
                    className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline"
                  >
                    View Pricing
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Time Schedule" && (
            <div className="flex flex-col gap-2">
              {DAYS.map((day) => {
                const schedule = enrollment.schedule[day];
                const isClosed = schedule && "closed" in schedule && schedule.closed;
                return (
                  <div key={day} className="flex items-center justify-between rounded-lg border border-card-border p-3">
                    <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">{day}</p>
                    {isClosed ? (
                      <span className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-error">Closed</span>
                    ) : schedule && "open" in schedule ? (
                      <p className="font-[family-name:var(--font-nunito)] text-sm text-heading">
                        Opening Time: {schedule.open} | Closing Time: {schedule.close}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "Creche Documents" && (
            <div className="flex flex-col gap-4">
              {enrollment.documents.map((doc) => (
                <div key={doc.label} className="flex items-center justify-between rounded-lg border border-card-border p-3">
                  <p className="font-[family-name:var(--font-nunito)] text-sm text-heading">{doc.label}</p>
                  <button type="button" className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
                    {doc.uploaded ? "View Document" : "Not Uploaded"}
                  </button>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg border border-card-border p-3">
                <p className="font-[family-name:var(--font-nunito)] text-sm text-heading">Staff screening confirmation</p>
                <span className={`font-[family-name:var(--font-nunito)] text-sm font-semibold ${enrollment.staffScreening ? "text-success-text" : "text-error"}`}>
                  {enrollment.staffScreening ? "Yes" : "No"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {pricingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setPricingModal(null)}
              className="absolute right-3 top-3 text-muted-text hover:text-heading"
            >
              <X className="size-5" />
            </button>
            <h3 className="mb-4 font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
              {pricingModal.roomName}
            </h3>
            <div className="flex flex-col gap-2">
              {Object.entries(pricingModal.pricing).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between rounded-lg border border-card-border p-3">
                  <p className="font-[family-name:var(--font-nunito)] text-sm text-heading">{key}</p>
                  <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-stat-heading">
                    ₦{value.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {requestInfoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setRequestInfoOpen(false)}
              className="absolute right-3 top-3 text-muted-text hover:text-heading"
            >
              <X className="size-5" />
            </button>
            <div className="mb-4 flex justify-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-brand-dark">
                <span className="text-xl text-white">?</span>
              </div>
            </div>
            <h3 className="mb-1 text-center font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
              Request Additional Information
            </h3>
            <p className="mb-4 text-center font-[family-name:var(--font-nunito)] text-sm text-muted-text">
              Please indicate the exact details you&apos;d like the parent to provide.
            </p>
            <div className="mb-4">
              <label className="mb-1 block font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">
                Additional Information
              </label>
              <textarea
                placeholder="Describe the information you need"
                rows={4}
                className="w-full rounded-lg border border-input-border p-3 font-[family-name:var(--font-nunito)] text-sm text-heading placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRequestInfoOpen(false)}
                className="rounded-lg border border-card-border px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-heading hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setRequestInfoOpen(false)}
                className="rounded-lg bg-brand-dark px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-white hover:bg-brand-dark/90"
              >
                Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">{label}</p>
      <p className="mt-0.5 font-[family-name:var(--font-nunito)] text-sm font-medium text-heading">{value}</p>
    </div>
  );
}
