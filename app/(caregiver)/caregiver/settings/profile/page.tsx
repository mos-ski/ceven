"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { mockUser } from "@/lib/caregiver/mock-data";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState("adeola.johnson@email.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <h1
          className="text-lg font-bold text-cg-brand"
          style={{ fontFamily: "var(--font-merriweather)" }}
        >
          Edit Profile
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {/* Avatar */}
        <div className="mb-6 flex flex-col items-center gap-2 pt-2">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cg-brand text-2xl font-bold text-white">
            {mockUser.avatarInitials}
          </div>
          <button className="text-xs font-semibold text-cg-accent">Change Photo</button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand outline-none focus:border-cg-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand outline-none focus:border-cg-accent"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand outline-none focus:border-cg-accent"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-cg-brand py-3.5 text-sm font-bold text-white"
        >
          {saved ? (
            <>
              <Check size={16} />
              Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}
