"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

const LINKS = [
  { label: "Privacy Policy",    href: "#" },
  { label: "Terms of Service",  href: "/parent/auth/tos" },
  { label: "Open Source Licenses", href: "#" },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative overflow-hidden bg-[#5B391E] px-6 pt-14 pb-6">
        <div className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D4A67F] opacity-20" />
        <button onClick={() => router.back()} className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft size={16} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">About App</h1>
        <p className="mt-1 text-sm text-white/70">CEven — Connecting parents &amp; caregivers.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-6 py-6">
        {/* Logo block */}
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#5B391E]">
            <span className="text-2xl font-bold text-[#E0BFA0]">C</span>
          </div>
          <p className="text-lg font-bold text-gray-800">CEven</p>
          <p className="text-sm text-gray-400">Version 1.0.0 (Build 42)</p>
        </div>

        {/* Info rows */}
        <div className="mb-6 rounded-2xl border border-gray-100 overflow-hidden">
          {[
            { label: "Version",       value: "1.0.0" },
            { label: "Build",         value: "42" },
            { label: "Platform",      value: "Web (Next.js)" },
            { label: "Last Updated",  value: "July 2026" },
          ].map(({ label, value }, i, arr) => (
            <div
              key={label}
              className={`flex items-center justify-between px-4 py-3.5 ${i < arr.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-semibold text-gray-800">{value}</span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="rounded-2xl border border-gray-100 overflow-hidden">
          {LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              className={`flex items-center justify-between px-4 py-3.5 ${i < LINKS.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              <span className="text-sm text-gray-700">{label}</span>
              <ExternalLink size={14} className="text-gray-400" />
            </a>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">
          © 2026 CEven. All rights reserved.
        </p>
      </div>
    </div>
  );
}
