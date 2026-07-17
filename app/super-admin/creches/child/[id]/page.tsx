"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ASSIGNED_CHILDREN, CHILD_PROFILES } from "@/lib/super-admin/mock-data";

const TABS = ["Personal Information", "Medical History", "Dietary & Feeding", "Development & Behavior", "Activity Log"] as const;

export default function ChildProfilePage() {
  const params = useParams();
  const childId = params.id as string;
  const assignedChild = ASSIGNED_CHILDREN.find((c) => c.id === childId);
  const profile = CHILD_PROFILES.find((p) => p.id === childId) ?? CHILD_PROFILES[0];
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Personal Information");

  const childName = assignedChild?.childName ?? `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="flex flex-col gap-4">
      <Link href="/super-admin/creches" className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
        <ArrowLeft className="size-4" /> Back to Creches
      </Link>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-card-border bg-white p-6">
            <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-[#edd9c0]">
              <span className="font-[family-name:var(--font-nunito)] text-2xl font-bold text-brand-dark">
                {profile.firstName[0]}{profile.lastName[0]}
              </span>
            </div>
            <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
              {childName}
            </p>
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

          {activeTab === "Personal Information" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoRow label="First Name" value={profile.firstName} />
              <InfoRow label="Last Name" value={profile.lastName} />
              <InfoRow label="Gender" value={profile.gender} />
              <InfoRow label="Parent Name" value={profile.parentName} />
              <InfoRow label="Parent Email" value={profile.parentEmail} />
              <InfoRow label="Emergency Contact Name" value={profile.emergencyContactName} />
              <InfoRow label="Emergency Contact" value={profile.emergencyContact} />
              <InfoRow label="Date of Birth" value={profile.dateOfBirth} />
              <div className="md:col-span-2">
                <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">Photo</p>
                <button type="button" className="mt-1 font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
                  View Image
                </button>
              </div>
            </div>
          )}

          {activeTab === "Medical History" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoRow label="Allergies" value={profile.medical.allergies} />
              <InfoRow label="Chronic Conditions" value={profile.medical.chronicConditions} />
              <InfoRow label="Blood Group" value={profile.medical.bloodGroup} />
              <InfoRow label="Medication" value={profile.medical.medication} />
              <InfoRow label="Pediatrician Full Name" value={profile.medical.pediatricianName} />
              <InfoRow label="Pediatrician Phone Number" value={profile.medical.pediatricianPhone} />
              <InfoRow label="Pediatrician Hospital / Clinic" value={profile.medical.pediatricianHospital} />
              <InfoRow label="Immunization History" value={profile.medical.immunizationHistory} />
            </div>
          )}

          {activeTab === "Dietary & Feeding" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoRow label="Feeding Type" value={profile.dietary.feedingType} />
              <InfoRow label="Favorite Meals / Snacks" value={profile.dietary.favoriteMeals} />
              <InfoRow label="Disliked Foods" value={profile.dietary.dislikedFoods} />
              <InfoRow label="Dietary Restriction" value={profile.dietary.dietaryRestriction} />
            </div>
          )}

          {activeTab === "Development & Behavior" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoRow label="Sleep Time" value={profile.development.sleepTime || "-"} />
              <InfoRow label="Comfort Items" value={profile.development.comfortItems} />
              <InfoRow label="Toilet Training" value={profile.development.toiletTraining} />
              <InfoRow label="Milestone" value={profile.development.milestone} />
              <InfoRow label="Communication Style" value={profile.development.communicationStyle} />
              <InfoRow label="Behavior Notes" value={profile.development.behaviorNotes} />
            </div>
          )}

          {activeTab === "Activity Log" && (
            <div className="flex flex-col gap-4">
              <div className="rounded-xl border border-card-border bg-white p-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-full bg-purple-50">
                    <span className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-purple-600">
                      {profile.activityLog.length}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-heading">Activity Logs</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-card-border">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-table-header-bg">
                      <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Date</th>
                      <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Total Logs</th>
                      <th className="px-4 py-3 font-[family-name:var(--font-nunito)] text-xs font-semibold text-white">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.activityLog.map((log, i) => (
                      <tr key={i} className="border-b border-table-border last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{log.date}</td>
                        <td className="px-4 py-3 font-[family-name:var(--font-nunito)] text-sm text-heading">{log.totalLogs}</td>
                        <td className="px-4 py-3">
                          <button type="button" className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-brand-accent hover:underline">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                    {profile.activityLog.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center font-[family-name:var(--font-nunito)] text-sm text-muted-text">
                          No activity logs yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
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
