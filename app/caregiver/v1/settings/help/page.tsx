"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  BookOpen,
  Phone,
  Mail,
  Star,
  ChevronRight,
} from "lucide-react";

const HELP_ITEMS = [
  {
    icon: MessageCircle,
    label: "Chat Support",
    description: "Talk to a support agent",
  },
  {
    icon: BookOpen,
    label: "FAQs",
    description: "Browse common questions",
  },
  {
    icon: Phone,
    label: "Call Us",
    description: "+234 800 123 4567",
  },
  {
    icon: Mail,
    label: "Email Us",
    description: "support@ceven.ng",
  },
  {
    icon: Star,
    label: "Rate the App",
    description: "Leave a review on the App Store",
  },
] as const;

export default function HelpPage() {
  const router = useRouter();

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
          Help & Support
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="rounded-2xl bg-white shadow-sm">
          {HELP_ITEMS.map(({ icon: Icon, label, description }, i) => (
            <button
              key={label}
              className={`flex w-full items-center gap-4 px-4 py-4 text-left ${
                i < HELP_ITEMS.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-cg-quick-action">
                <Icon size={18} className="text-cg-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-cg-brand">{label}</p>
                <p className="text-xs text-gray-400">{description}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">CEven v1.0.0 · Made with ♥ in Lagos</p>
      </div>
    </div>
  );
}
