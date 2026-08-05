"use client";

import { useMemo, useState } from "react";
import { Search, Send, Sparkles } from "lucide-react";
import { getAdaReply } from "@/lib/ada-responses";

type InboxMessage = {
 id: number;
 name: string;
 initials: string;
 preview: string;
 time: string;
 unread: boolean;
};

const INBOX_MESSAGES: InboxMessage[] = [
 {
  id: 1,
  name: "Mrs. Chioma Johnson",
  initials: "CJ",
  preview: "Good morning! Just checking if Amara has eaten well today. She was a bit under the weather last night…",
  time: "9:12am",
  unread: true,
 },
 {
  id: 2,
  name: "Mr. Charles Okafor",
  initials: "CO",
  preview: "Hi, I'll be picking Emeka up early today at 2pm. Please let the caregiver know. Thank you.",
  time: "8:45am",
  unread: true,
 },
 {
  id: 3,
  name: "Mrs. Folake Bello",
  initials: "FB",
  preview: "Please confirm if April invoice has been sent? I haven't received it.",
  time: "Yesterday",
  unread: true,
 },
 {
  id: 4,
  name: "Mrs. Fatima Mohammed",
  initials: "FM",
  preview: "Zara will be absent tomorrow, she has a hospital appointment.",
  time: "Apr 9",
  unread: false,
 },
];

export default function MessagesV3Page() {
 const [selectedId, setSelectedId] = useState<number | null>(1);
 const [to, setTo] = useState(INBOX_MESSAGES[0].name);
 const [subject, setSubject] = useState(`Re: ${INBOX_MESSAGES[0].preview.slice(0, 28)}…`);
 const [body, setBody] = useState("");

 const selected = INBOX_MESSAGES.find((m) => m.id === selectedId) ?? null;
 const unreadCount = INBOX_MESSAGES.filter((m) => m.unread).length;

 const aiSuggestion = useMemo(() => {
  const seed = body || selected?.preview || subject || "general update";
  return getAdaReply(seed);
 }, [body, selected, subject]);

 function handleSelect(msg: InboxMessage) {
  setSelectedId(msg.id);
  setTo(msg.name);
  setSubject(`Re: ${msg.preview.slice(0, 28)}…`);
  setBody("");
 }

 return (
  <div className="flex flex-col gap-5">
   <div>
    <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">Messages</h1>
    <p className="mt-1 text-sm text-[#2D1810]/50">{unreadCount} unread · Smart responses available</p>
   </div>

   <div className="grid grid-cols-1 gap-5 lg:grid-cols-[340px_1fr]">
    {/* Inbox */}
    <div className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-5">
     <div className="mb-3 flex items-center justify-between">
      <p className="text-sm font-bold text-[#2D1810]">Inbox</p>
      <span className="rounded-full bg-[#C47B2C]/10 px-2 py-0.5 text-[11px] font-bold text-[#C47B2C]">
       {unreadCount} new
      </span>
     </div>
     <div className="relative mb-3">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#2D1810]/40" />
      <input
       type="text"
       placeholder="Search messages…"
       className="w-full rounded-lg border border-black/[0.08] bg-[#F5EDD8] py-2 pl-8 pr-3 text-sm text-[#2D1810] placeholder:text-[#2D1810]/40 focus:border-[#C47B2C] focus:outline-none"
      />
     </div>
     <div className="flex flex-col gap-1">
      {INBOX_MESSAGES.map((msg) => {
       const isSelected = msg.id === selectedId;
       return (
        <button
         key={msg.id}
         onClick={() => handleSelect(msg)}
         className={`flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
          isSelected ? "bg-[#FAF2E1]" : "hover:bg-[#F5EDD8]/60"
         }`}
        >
         <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDD9C0] text-xs font-bold text-[#3B2513]">
          {msg.initials}
         </div>
         <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
           <p className="truncate text-[13px] font-semibold text-[#2D1810]">{msg.name}</p>
           <span className="shrink-0 font-mono text-[10px] text-[#2D1810]/40">{msg.time}</span>
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs text-[#2D1810]/50">{msg.preview}</p>
         </div>
         {msg.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#C47B2C]" />}
        </button>
       );
      })}
     </div>
    </div>

    {/* Compose */}
    <div className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-5">
     <p className="mb-4 text-sm font-bold text-[#2D1810]">Compose Message</p>
     <div className="flex flex-col gap-4">
      <div>
       <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">To</label>
       <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Select recipient"
        className="w-full rounded-lg border border-black/[0.08] bg-white px-3.5 py-2.5 text-sm text-[#2D1810] focus:border-[#C47B2C] focus:outline-none"
       />
      </div>
      <div>
       <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">Subject</label>
       <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject"
        className="w-full rounded-lg border border-black/[0.08] bg-white px-3.5 py-2.5 text-sm text-[#2D1810] placeholder:text-[#2D1810]/40 focus:border-[#C47B2C] focus:outline-none"
       />
      </div>
      <div>
       <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">Message</label>
       <textarea
        rows={5}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type your message here…"
        className="w-full resize-none rounded-lg border border-black/[0.08] bg-white px-3.5 py-2.5 text-sm text-[#2D1810] placeholder:text-[#2D1810]/40 focus:border-[#C47B2C] focus:outline-none"
       />
      </div>

      {/* AI Suggested Message */}
      <div className="rounded-xl bg-[#FAF2E1] p-4">
       <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1E2D4A] to-[#2D1810] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#F5EDD8]">
        <Sparkles className="h-3 w-3 text-[#C47B2C]" /> Suggested Message
       </span>
       <p className="mt-2.5 text-xs leading-5 text-[#2D1810]/80">&ldquo;{aiSuggestion}&rdquo;</p>
       <button
        onClick={() => setBody(aiSuggestion)}
        className="mt-2.5 text-xs font-semibold text-[#BA733E] hover:opacity-70"
       >
        Use This →
       </button>
      </div>

      <div className="flex justify-end gap-2">
       <button className="rounded-lg border border-black/[0.1] px-5 py-2.5 text-sm font-semibold text-[#2D1810] hover:bg-[#F5EDD8]">
        Save Draft
       </button>
       <button className="flex items-center gap-1.5 rounded-lg bg-[#3B2513] px-5 py-2.5 text-sm font-semibold text-[#FAF2E1] hover:bg-[#2D1810]">
        <Send className="h-3.5 w-3.5" /> Send Message
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
