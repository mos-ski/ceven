"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Video, Paperclip, SendHorizontal } from "lucide-react";
import { MessageBubble } from "@/components/caregiver/message-bubble";
import { mockChatThreads } from "@/lib/caregiver/mock-data";
import type { Message } from "@/lib/caregiver/mock-data";

export default function ActiveChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [input, setInput] = useState("");

  const thread = mockChatThreads.find((t) => t.id === id) ?? mockChatThreads[0];
  const [messages, setMessages] = useState<Message[]>(thread.messages);

  function handleSend() {
    const body = input.trim();
    if (!body) return;
    const msg: Message = {
      id: `m${Date.now()}`,
      body,
      sentAt: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      direction: "sent",
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  }

  return (
    <div className="flex flex-1 flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-300 text-xs font-bold text-white">
            {thread.contact.avatarInitials}
          </div>
          <p className="text-sm font-semibold text-cg-brand">{thread.contact.name}</p>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <Video size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Session start */}
        <div className="mb-4 flex justify-center">
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-500">
            Session Start
          </span>
        </div>

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-100 bg-white px-3 py-3">
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400">
            <Paperclip size={20} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message…"
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-cg-brand"
          >
            <SendHorizontal size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
