"use client";

import { useState } from "react";
import { Pin, PinOff, X, ArrowUp } from "lucide-react";
import { CEIcon } from "@/components/admin-v3/ce-icon";
import { getAdaReply } from "@/lib/ada-responses";
import { useAiPanel } from "@/components/admin-v3/ai-panel-context";

type Message = { role: "ai" | "user"; text: string };

const INITIAL_MESSAGES: Message[] = [
 {
  role: "ai",
  text: "Good morning, Amaka! I've reviewed overnight data. 3 things need your attention today. Want the full briefing?",
 },
 { role: "user", text: "Yes, give me the brief." },
 {
  role: "ai",
  text: "1. Zara Mohammed. Absent 3 days, welfare check needed.\n\n2. ₦480,000 outstanding. Mr. Okafor is a repeat late payer, I'd call him today.\n\n3. Ms. Tunde's logging is down to 62%. That's below your 80% standard, suggest a quick chat.",
 },
];

const QUICK_QUESTIONS = ["Who hasn't paid?", "At-risk children?", "Draft announcement"];

function MessageBubble({ message }: { message: Message }) {
 const isUser = message.role === "user";
 return (
  <div className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
   <div
    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
     isUser ? "bg-[#F5EDD8] text-[#2D1810]" : "bg-gradient-to-br from-[#1E2D4A] to-[#2D1810] text-[#F5EDD8]"
    }`}
   >
     {isUser ? "AN" : <CEIcon className="h-3.5 w-3.5" />}
   </div>
   <div
    className={`max-w-[85%] whitespace-pre-line rounded-xl px-3 py-2 text-[12.5px] leading-relaxed ${
     isUser ? "rounded-tr-sm bg-[#F5EDD8] text-[#2D1810]" : "rounded-tl-sm bg-[#F5EDD8]/60 text-[#2D1810]"
    }`}
   >
    {message.text}
   </div>
  </div>
 );
}

function AiPanelBody() {
 const { pinned, togglePin, close } = useAiPanel();
 const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
 const [inputValue, setInputValue] = useState("");

 function send(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return;
  setMessages((prev) => [...prev, { role: "user", text: trimmed }, { role: "ai", text: getAdaReply(trimmed) }]);
  setInputValue("");
 }

 return (
  <>
   <div className="flex items-center gap-2.5 border-b border-black/[0.07] px-4 py-3.5">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E2D4A] to-[#2D1810]">
       <CEIcon className="h-4 w-4 text-[#F5EDD8]" variant="thick" />
    </div>
    <div className="min-w-0 flex-1">
     <p className="text-[13px] font-bold text-[#2D1810]">Ada</p>
     <p className="text-[10.5px] text-[#2D1810]/50">Professional &amp; Warm</p>
    </div>
    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" title="Online" />
    <button
     type="button"
     onClick={togglePin}
     aria-label={pinned ? "Unpin panel" : "Pin panel"}
     aria-pressed={pinned}
     className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
      pinned ? "bg-[#C47B2C] text-white" : "text-[#2D1810]/40 hover:bg-[#F5EDD8]"
     }`}
    >
     {pinned ? <Pin className="h-3.5 w-3.5" /> : <PinOff className="h-3.5 w-3.5" />}
    </button>
    <button
     type="button"
     onClick={close}
     aria-label="Close assistant panel"
     className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#2D1810]/40 hover:bg-[#F5EDD8]"
    >
     <X className="h-3.5 w-3.5" />
    </button>
   </div>

   <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
    {messages.map((message, i) => (
     <MessageBubble key={i} message={message} />
    ))}
   </div>

   <div className="border-t border-black/[0.07] p-3">
    <div className="flex items-center gap-2 rounded-full border border-black/[0.1] bg-[#F5EDD8] px-3 py-1.5">
     <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && send(inputValue)}
      placeholder="Ask Ada anything..."
      className="min-w-0 flex-1 bg-transparent text-[12.5px] text-[#2D1810] placeholder:text-[#2D1810]/35 focus:outline-none"
     />
     <button
      type="button"
      onClick={() => send(inputValue)}
      aria-label="Send"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C47B2C] text-white hover:opacity-80"
     >
      <ArrowUp className="h-3.5 w-3.5" />
     </button>
    </div>
    <div className="mt-2 flex flex-wrap gap-1.5">
     {QUICK_QUESTIONS.map((q) => (
      <button
       key={q}
       type="button"
       onClick={() => send(q)}
       className="rounded-full border border-black/[0.1] bg-white px-2.5 py-1 text-[10.5px] text-[#2D1810]/70 hover:border-[#C47B2C] hover:text-[#2D1810]"
      >
       {q}
      </button>
     ))}
    </div>
   </div>
  </>
 );
}

export function AiPanel() {
 const { open, pinned, close } = useAiPanel();

 if (pinned) {
  return (
   <div className="hidden shrink-0 flex-col border border-black/[0.07] bg-white lg:flex lg:w-[320px]">
    <AiPanelBody />
   </div>
  );
 }

 if (!open) return null;

 return (
  <div className="fixed inset-0 z-50 flex justify-end bg-black/20" onClick={close}>
   <div
    className="flex h-full w-full max-w-[360px] flex-col border border-black/[0.07] bg-white"
    onClick={(e) => e.stopPropagation()}
   >
    <AiPanelBody />
   </div>
  </div>
 );
}
