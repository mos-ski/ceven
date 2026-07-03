"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, MessageSquare } from "lucide-react";

const FAQS = [
  {
    q: "How do I connect to my child's creche?",
    a: "Go to Settings → Find Creche. Browse available creches near you, view their details, and tap 'Enrol Now' to send an enrolment request. The creche will review and accept your request.",
  },
  {
    q: "How do I read my child's daily report?",
    a: "Tap 'Report' in the bottom navigation. The daily report shows your child's mood, meals, nap time, activities, hygiene, and photos from the day.",
  },
  {
    q: "Can I message my child's caregiver?",
    a: "Yes! Tap 'Chat' in the bottom navigation to see your message threads with caregivers. You can send and receive messages in real time.",
  },
  {
    q: "What is CEvenAI?",
    a: "CEvenAI is your AI-powered parenting assistant. It can summarize your child's daily reports, identify health patterns, answer questions about your child's development, and much more.",
  },
  {
    q: "How do I update my profile?",
    a: "Go to Settings → View Profile → Update Profile. You can change your name, relationship, language preference, and timezone.",
  },
  {
    q: "How do I change my password?",
    a: "Go to Settings → Change Password. Enter your current password, then set a new one. Your new password must be at least 8 characters with one uppercase letter and one number.",
  },
  {
    q: "How is my billing handled?",
    a: "Billing is processed securely via Paystack. You can view your invoice history under Settings → Billing History.",
  },
  {
    q: "How do I cancel my Premium subscription?",
    a: "Tap the 'Upgrade' button at the top of CEvenAI, then manage your subscription. You can cancel at any time and retain access until the end of your billing period.",
  },
];

export default function HelpPage() {
  const router = useRouter();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="relative overflow-hidden bg-[#5B391E] px-6 pt-14 pb-6">
        <div className="pointer-events-none absolute top-0 right-0 h-[220px] w-[220px] rounded-full bg-[#D4A67F] opacity-20" />
        <button onClick={() => router.back()} className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <ArrowLeft size={16} className="text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">FAQs &amp; Help</h1>
        <p className="mt-1 text-sm text-white/70">Find answers to common questions.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-white px-6 py-5">
        <div className="mb-5 rounded-2xl border border-gray-100 overflow-hidden">
          {FAQS.map((faq, i) => (
            <div key={i} className={i < FAQS.length - 1 ? "border-b border-gray-50" : ""}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
              >
                <span className="text-sm font-semibold text-gray-800">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-gray-400 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm leading-relaxed text-gray-500">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact support */}
        <div className="rounded-2xl bg-[#F9F5EE] p-4">
          <p className="mb-1 text-sm font-semibold text-gray-800">Still need help?</p>
          <p className="mb-3 text-xs text-gray-500">Our support team is available Mon–Fri, 8am–6pm.</p>
          <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1]">
            <MessageSquare size={15} />
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
