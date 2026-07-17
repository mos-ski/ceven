"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ENROLLMENT_REQUESTS } from "@/lib/admin-v1/v1-data";

const TABS = ["Personal Information", "Medical History", "Dietary & Feeding", "Development & Behavior"] as const;
type Tab = (typeof TABS)[number];

export default function EnrollmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const child = ENROLLMENT_REQUESTS.find((r) => r.id === id);

  if (!child) {
    return <div className="p-6 text-gray-500">Child not found.</div>;
  }

  const [activeTab, setActive] = useState<Tab>("Personal Information");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button className="rounded-lg bg-[#3B2513] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4A2F18]">
          Request More Details
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6">
          <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden">
            <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-gray-400">
              {child.childName.charAt(0)}
            </div>
          </div>
          <h2 className="text-lg font-bold text-gray-800">{child.childName}</h2>
          <div className="flex w-full flex-col gap-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-left transition-colors ${
                  activeTab === tab
                    ? "bg-[#3B2513]/5 text-[#3B2513] border-r-2 border-[#3B2513]"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          {activeTab === "Personal Information" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-gray-800">Personal Information</h3>
              <InfoRow label="First Name" value={child.childName.split(" ")[0]} />
              <InfoRow label="Last Name" value={child.childName.split(" ").slice(1).join(" ")} />
              <InfoRow label="Gender" value={child.gender} />
              <InfoRow label="Parent Name" value={child.parentName} />
              <InfoRow label="Parent Email" value={child.parentEmail} />
              <InfoRow label="Emergency Contact Name" value={child.emergencyContactName} />
              <InfoRow label="Emergency Contact" value={child.emergencyContact} />
              <InfoRow label="Date of Birth" value={child.dateOfBirth} />
              <InfoRow label="Photo" value={<span className="underline cursor-pointer">View Image</span>} />
            </div>
          )}

          {activeTab === "Medical History" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-gray-800">Medical History</h3>
              <InfoRow label="Allergies" value={child.allergies} />
              <InfoRow label="Chronic Conditions" value={child.chronicConditions} />
              <InfoRow label="Blood Group" value={child.bloodGroup} />
              <InfoRow label="Medication" value={child.medication} />
              <InfoRow label="Pediatrician Full Name" value={child.pediatricianFullName} />
              <InfoRow label="Pediatrician Phone Number" value={child.pediatricianPhone} />
              <InfoRow label="Pediatrician Hospital / Clinic" value={child.pediatricianHospital} />
              <InfoRow label="Immunization History" value={child.immunizationHistory} />
            </div>
          )}

          {activeTab === "Dietary & Feeding" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-gray-800">Dietary & Feeding</h3>
              <InfoRow label="Feeding Type" value={child.feedingType} />
              <InfoRow label="Favorite Meals / Snacks" value={child.favoriteMeals} />
              <InfoRow label="Disliked Foods" value={child.dislikedFoods} />
              <InfoRow label="Dietary Restriction" value={child.dietaryRestriction} />
            </div>
          )}

          {activeTab === "Development & Behavior" && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-gray-800">Development & Behavior</h3>
              <InfoRow label="Sleep Time" value={child.sleepTime} />
              <InfoRow label="Comfort Items" value={child.comfortItems} />
              <InfoRow label="Toilet Training" value={child.toiletTraining} />
              <InfoRow label="Milestone" value={child.milestone} />
              <InfoRow label="Communication Style" value={child.communicationStyle} />
              <InfoRow label="Behavior Notes" value={child.behaviorNotes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  );
}
