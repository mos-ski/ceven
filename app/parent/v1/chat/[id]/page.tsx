"use client";

import { useState, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Video, Send, Plus } from "lucide-react";
import { mockChatThreads, PARENT_MEMBERSHIP, TRIAL_MESSAGE_LIMIT } from "@/lib/parent/mock-data";
import { TrialGateBanner } from "@/components/parent/trial-gate-banner";

type Message = {
  id: string;
  role: "sent" | "received" | "system";
  text: string;
  time: string;
};

const INITIAL_MESSAGES: Record<string, Message[]> = {
  "thread-1": [
    { id: "1", role: "sent",     text: "Hi, Mrs Anu",                                            time: "16:48" },
    { id: "2", role: "received", text: "Good afternoon Ma, how can I help you?",                 time: "16:50" },
    { id: "3", role: "sent",     text: "Liam had a great day today! He played well with others.", time: "16:50" },
  ],
  "thread-2": [
    { id: "1", role: "received", text: "Please remember to bring extra clothes tomorrow.",        time: "Yesterday" },
  ],
};

function formatNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatConversationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const thread = mockChatThreads.find((t) => t.id === id) ?? mockChatThreads[0];
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES[id] ?? []);
  const [input, setInput] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    if (limitReached) return;
    const text = input.trim();
    if (!text) return;

    const sentCount = messages.filter((m) => m.role === "sent").length + 1;
    const sent: Message = { id: Date.now().toString(), role: "sent", text, time: formatNow() };
    setMessages((prev) => [...prev, sent]);
    setInput("");

    if (PARENT_MEMBERSHIP.status !== "active" && sentCount > TRIAL_MESSAGE_LIMIT) {
      setLimitReached(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: "system", text: "Your trial has ended. Some family features are unavailable.", time: formatNow() },
        ]);
      }, 800);
      return;
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "received", text: "Got it! I'll pass that along. 😊", time: formatNow() },
      ]);
    }, 1200);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#FFFEFA]">
      {/* Top nav */}
      <div className="shrink-0 bg-[#FAFAFA] px-4 pt-12 pb-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F7F7]"
          >
            <ArrowLeft size={16} className="text-gray-700" />
          </button>

          <div className="flex flex-1 items-center gap-2.5">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0BFA0] text-sm font-bold text-white">
                {thread.contactInitials}
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">{thread.contactName}</p>
              <p className="text-[10px] text-green-500">Online</p>
            </div>
          </div>

          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F7F7]">
            <Video size={16} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Session start badge */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-[#EDF1F5] px-3 py-1">
            <Plus size={10} className="text-gray-600" />
            <span className="text-[10px] font-medium text-gray-600">Session Start</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {messages.map((msg) => {
            if (msg.role === "system") {
              return (
                <div key={msg.id} className="flex justify-center py-1">
                  <div className="max-w-[88%]">
                    <TrialGateBanner message={msg.text} />
                  </div>
                </div>
              );
            }

            return (
            <div key={msg.id} className={`flex ${msg.role === "sent" ? "justify-end" : "justify-start"}`}>
              {msg.role === "received" ? (
                <div className="max-w-[72%]">
                  <div className="rounded-2xl rounded-tl-sm bg-[#DCE0E4] px-4 py-3">
                    <p className="text-sm text-[#2D2E2E]">{msg.text}</p>
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400">{msg.time}</p>
                </div>
              ) : (
                <div className="max-w-[72%]">
                  <div className="rounded-2xl rounded-tr-sm bg-[#0167FF] px-4 py-3">
                    <p className="text-sm text-white">{msg.text}</p>
                  </div>
                  <div className="mt-1 flex items-center justify-end gap-1">
                    <p className="text-[10px] text-gray-400">{msg.time}</p>
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5l3 3 5-7M6 5l3 3 5-7" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="shrink-0 bg-[#FAFAFA] px-4 pb-safe pt-3 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={limitReached ? "Manage your account to keep chatting" : "Type a message..."}
              disabled={limitReached}
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-60"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={limitReached}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-brand disabled:opacity-60"
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
