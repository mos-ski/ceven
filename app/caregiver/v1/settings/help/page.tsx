"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
 ArrowLeft,
 MessageCircle,
 BookOpen,
 Phone,
 Mail,
 Star,
 ChevronRight,
 ChevronDown,
 Heart,
} from "lucide-react";

const FAQS = [
 {
  question: "How do I log a daily report for a child?",
  answer: "Open the Log Sheet from the home screen, choose the child, then fill in meals, naps, mood, and any notes before sending.",
 },
 {
  question: "How do I record an incident?",
  answer: "Use the Log Sheet's incident option to capture the severity, description, and action taken. The child's parent is notified automatically.",
 },
 {
  question: "Can I edit my PIN or profile details?",
  answer: "Yes. Go to Settings, then Profile or PIN, and update your details from there.",
 },
] as const;

const HELP_ITEMS = [
 {
  id: "chat",
  icon: MessageCircle,
  label: "Chat Support",
  description: "Talk to a support agent",
 },
 {
  id: "faqs",
  icon: BookOpen,
  label: "FAQs",
  description: "Browse common questions",
 },
 {
  id: "call",
  icon: Phone,
  label: "Call Us",
  description: "+234 800 123 4567",
 },
 {
  id: "email",
  icon: Mail,
  label: "Email Us",
  description: "support@ceven.ng",
 },
 {
  id: "rate",
  icon: Star,
  label: "Rate the App",
  description: "Leave a review on the App Store",
 },
] as const;

export default function HelpPage() {
 const router = useRouter();
 const [showFaqs, setShowFaqs] = useState(false);
 const [showRating, setShowRating] = useState(false);
 const [rating, setRating] = useState(0);

 function handleItemClick(id: (typeof HELP_ITEMS)[number]["id"]) {
  if (id === "chat") {
   router.push("/caregiver/chat");
  } else if (id === "faqs") {
   setShowFaqs((v) => !v);
  } else if (id === "call") {
   window.location.href = "tel:+2348001234567";
  } else if (id === "email") {
   window.location.href = "mailto:support@ceven.ng";
  } else if (id === "rate") {
   setShowRating((v) => !v);
  }
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
     Help & Support
    </h1>
   </div>

   <div className="flex-1 overflow-y-auto px-4 pb-6">
    <div className="rounded-2xl bg-[#F5EDD8]/30">
     {HELP_ITEMS.map(({ id, icon: Icon, label, description }, i) => (
      <div key={id} className={i < HELP_ITEMS.length - 1 ? "border-b border-gray-100" : ""}>
       <button
        onClick={() => handleItemClick(id)}
        className="flex w-full items-center gap-4 px-4 py-4 text-left"
       >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-cg-quick-action">
         <Icon size={18} className="text-cg-accent" />
        </div>
        <div className="flex-1">
         <p className="text-sm font-semibold text-cg-brand">{label}</p>
         <p className="text-xs text-gray-400">{description}</p>
        </div>
        {id === "faqs" || id === "rate" ? (
         <ChevronDown
          size={16}
          className={`text-gray-300 transition-transform ${
           (id === "faqs" && showFaqs) || (id === "rate" && showRating) ? "rotate-180" : ""
          }`}
         />
        ) : (
         <ChevronRight size={16} className="text-gray-300" />
        )}
       </button>

       {id === "faqs" && showFaqs && (
        <div className="flex flex-col gap-3 px-4 pb-4">
         {FAQS.map((faq) => (
          <div key={faq.question} className="rounded-xl bg-cg-bg p-3">
           <p className="text-xs font-semibold text-cg-brand">{faq.question}</p>
           <p className="mt-1 text-xs leading-relaxed text-gray-500">{faq.answer}</p>
          </div>
         ))}
        </div>
       )}

       {id === "rate" && showRating && (
        <div className="flex flex-col items-center gap-2 px-4 pb-4">
         <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
           <button key={star} onClick={() => setRating(star)}>
            <Star
             size={22}
             className={star <= rating ? "text-amber-400" : "text-gray-200"}
             fill={star <= rating ? "currentColor" : "none"}
            />
           </button>
          ))}
         </div>
         {rating > 0 && (
          <p className="text-xs font-medium text-cg-accent">Thanks for the {rating}-star rating!</p>
         )}
        </div>
       )}
      </div>
     ))}
    </div>

    <p className="mt-8 flex items-center justify-center gap-1 text-center text-xs text-gray-400">
     CEven v1.0.0 · Made with <Heart size={11} className="text-cg-accent" /> in Lagos
    </p>
   </div>
  </div>
 );
}
