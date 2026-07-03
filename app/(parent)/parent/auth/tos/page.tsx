"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const TOS_SECTIONS = [
  {
    heading: null,
    body: "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum at. Velit posuere sit adipiscing ut nibh duis risus. Semper at quis tellus purus.\n\nNunc in lorem sit turpis interdum viverra felis id augue. Vulputate diam arcu sed faucibus est. Lacinia velit tempus ac morbi. Congue risus sed nulla nunc.",
  },
  {
    heading: "What information do we collect?",
    body: "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, feugiat viverra volutpat eget sit lorem adipiscing sed. Porttitor nisl viverra morbi nisi ut. Orci, duis commodo vel faucibus urna est purus.\n\nHabitan sem turpis consequat ornare. Erat augue bibendum ut risus. Sed laoreet hendrerit id lorem laoreet et donec enim sit.",
  },
  {
    heading: "How do we use your information?",
    body: "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, feugiat viverra volutpat eget sit lorem adipiscing sed. Porttitor nisl viverra morbi nisi ut.\n\nHabitan sem turpis consequat ornare. Erat augue bibendum ut risus. Sed laoreet hendrerit id lorem laoreet et donec enim sit.",
  },
  {
    heading: "Do we use cookies and other tracking technologies?",
    body: "Pharetra morbi libero id aliquam elit massa integer tellus. Sed augue pretium nibh ipsum commodo.",
  },
  {
    heading: "How long do we keep your information?",
    body: "Pharetra morbi libero id aliquam elit massa integer tellus. Sed augue pretium nibh ipsum commodo.",
  },
  {
    heading: "How do we keep your information safe?",
    body: "Pharetra morbi libero id aliquam elit massa integer tellus. Sed augue pretium nibh ipsum commodo.",
  },
  {
    heading: "What are your privacy rights?",
    body: "Pharetra morbi libero id aliquam elit massa integer tellus. Sed augue pretium nibh ipsum commodo.",
  },
  {
    heading: "How can you contact us about this policy?",
    body: "Sagittis et eu at elementum, quis in. Proin praesent volutpat facilisi non euismod erat nam. Ornare sit est non dolor. Dictum turpis proin orci ac. Eget id sit adipiscing sed volutpat mi etiam.",
  },
];

export default function ParentTosPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      {/* Banner */}
      <div className="bg-[#9A6033] px-6 py-5">
        <button
          onClick={() => router.back()}
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F5F6]/20"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-base font-bold text-white">We&apos;ve recently changed our T&amp;Cs!</p>
        <p className="text-sm text-white/80">Read our new policy here.</p>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* Logo + heading */}
        <div className="px-6 pt-5 pb-4">
          <div className="mb-4 flex items-center gap-1.5">
            <span className="text-xl font-bold text-cg-brand">CEven</span>
          </div>
          <p className="mb-1 text-xs font-medium text-[#9A6033]">Current as of 01 Oct 2025</p>
          <h1 className="mb-3 text-xl font-bold text-gray-800">Terms of Service</h1>
          <p className="mb-4 text-sm text-gray-500">
            By accessing our application, you are agreeing to be bound by these Terms of Service,
            all applicable laws and regulations, and agree that you are responsible for compliance
            with any applicable local laws.
          </p>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5">
            <Search size={16} className="shrink-0 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="mx-6 h-px bg-gray-100" />

        {/* Rich text sections */}
        <div className="space-y-5 px-6 py-5">
          {TOS_SECTIONS.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="mb-2 text-sm font-bold text-gray-800">{section.heading}</h2>
              )}
              <p className="text-sm leading-relaxed text-gray-500">{section.body}</p>
            </div>
          ))}
        </div>

        {/* Accept checkbox */}
        <div className="px-6 pb-8">
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-cg-brand"
            />
            <span className="text-xs text-gray-500">
              By signing up you acknowledge and agree to CEven{" "}
              <span className="font-semibold text-cg-brand underline">Terms of Service</span> and{" "}
              <span className="font-semibold text-cg-brand underline">Privacy Policy</span>
            </span>
          </label>

          {accepted && (
            <button
              onClick={() => router.back()}
              className="mt-4 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]"
            >
              Accept &amp; Continue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
