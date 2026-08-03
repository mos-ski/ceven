"use client";

import { useState, useRef, useEffect } from "react";
import { ParentV3BottomNav } from "@/components/parentv3/bottom-nav";
import { CHAT_MESSAGES, CAREGIVER } from "@/lib/parentv3/mock-data";

export default function ParentV3ChatPage() {
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    setMessages((prev) => [
      ...prev,
      { id: `msg-${Date.now()}`, sender: "parent", text: input.trim(), time },
    ]);
    setInput("");
  };

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#fffefa]">
      {/* Chat header */}
      <div className="shrink-0 bg-[#f4f5f6] px-6 py-3">
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-white text-xs font-bold"
            style={{ backgroundColor: CAREGIVER.avatarColor }}
          >
            {CAREGIVER.avatarInitials}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{CAREGIVER.name}</p>
            <p className="text-[10px] text-emerald-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "parent" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${
                msg.sender === "parent"
                  ? "bg-cg-brand text-white rounded-br-md"
                  : "bg-[#f4f5f6] text-gray-700 rounded-bl-md"
              }`}
            >
              <p className="text-xs leading-relaxed">{msg.text}</p>
              <p
                className={`text-[9px] mt-1 ${
                  msg.sender === "parent" ? "text-white/60 text-right" : "text-gray-400"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="shrink-0 bg-[#f4f5f6] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message..."
            className="flex-1 rounded-full bg-white px-4 py-2.5 text-xs text-gray-700 placeholder:text-gray-400 outline-none"
          />
          <button
            onClick={send}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cg-brand text-white shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      <ParentV3BottomNav />
    </div>
  );
}
