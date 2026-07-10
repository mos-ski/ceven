"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "My crèche isn't on CEven yet — what do I do?",
    a: "You can invite your crèche directly from the app. We'll reach out to them and help get them set up. Most crèches are live within a week.",
  },
  {
    q: "Can both parents be connected?",
    a: "Yes. Both parents or guardians can connect to the same child profile and receive all updates simultaneously.",
  },
  {
    q: "What if I'm in a meeting and can't check my phone?",
    a: "Updates are stored and timestamped in real time. You'll see everything when you're free — nothing is lost. No need to chase or call.",
  },
  {
    q: "Is my child's data private and secure?",
    a: "Absolutely. Your child's data is encrypted, never shared with third parties, and only visible to connected guardians and authorised crèche staff.",
  },
  {
    q: "Is CEven free to use?",
    a: "CEven is free to download for parents. The crèche handles the platform subscription, not you.",
  },
  {
    q: "Is CEven only for babies and toddlers?",
    a: "No. CEven supports children from infants through school age. The platform adapts to the type of care your child receives.",
  },
];

export function ParentsFAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#F5EFE4] px-12 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <div className="inline-flex items-center bg-[#EDE8E0] text-[#3B2513] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-[#D4C4B0] mb-6">
            Questions?
          </div>
          <h2 className="text-[#1A1208] text-4xl font-bold leading-[1.2]">
            Things parents<br />ask us first.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="bg-[#FFF9F0] border border-[#E8DDD0] rounded-2xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[#1A1208] text-sm font-medium pr-4">{faq.q}</span>
                <span className="text-[#9A6033] flex-shrink-0 text-xl leading-none">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-[#6B5744] text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
