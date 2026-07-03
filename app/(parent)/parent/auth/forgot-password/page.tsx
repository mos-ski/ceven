"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function ParentForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const isActive = email.trim().length > 0;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#FAFAFA]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-[352px] w-[352px] rounded-full bg-[#C78C5F] opacity-20" />
      <div className="pointer-events-none absolute -top-12 -right-12 h-[269px] w-[269px] rounded-full bg-[#C78C5F] opacity-25" />
      <div className="pointer-events-none absolute top-0 right-0 h-[192px] w-[192px] rounded-full bg-[#C78C5F] opacity-30" />

      <div className="flex flex-1 flex-col px-6 pt-14">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F5F6]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#31363E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Header */}
        <h1 className="mb-1 text-[22px] font-bold text-gray-800">Password Reset</h1>
        <p className="mb-8 text-sm text-gray-500">
          Enter your email or phone number to get an OTP and reset your password.
        </p>

        {/* Email / Phone */}
        <div className="mb-8">
          <p className="mb-1.5 text-sm font-medium text-gray-800">Email / Phone Number</p>
          <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-3 shadow-sm">
            <div className="flex shrink-0 items-center gap-1">
              <span className="text-base leading-none">🇳🇬</span>
              <ChevronDown size={12} className="text-gray-500" />
            </div>
            <div className="mx-1 h-4 w-px bg-gray-200" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email / phone number"
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">This is a hint text to help user</p>
        </div>

        {/* Continue button */}
        <button
          onClick={() => isActive && router.push("/parent/auth/forgot-password/verify")}
          className={`w-full rounded-xl py-3 text-sm font-semibold transition-colors ${
            isActive
              ? "bg-cg-brand text-[#FAF2E1]"
              : "bg-[#E0BFA0] text-[#FAF2E1] cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
