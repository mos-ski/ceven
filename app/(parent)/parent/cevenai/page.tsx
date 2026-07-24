"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Mic, Send, ThumbsUp, ThumbsDown, Copy, RefreshCw, Sparkles, Lock,
} from "lucide-react";
import { PARENT_MEMBERSHIP, TRIAL_MESSAGE_LIMIT } from "@/lib/parent/mock-data";

// ─── Types ────────────────────────────────────────────────────────────────────

type Message = {
  id: string;
  role: "user" | "ai" | "system";
  content: string;
};

// ─── Static data ──────────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  { icon: "📄", text: "Summarize today's report" },
  { icon: "↗", text: "Any health patterns this week?" },
  { icon: "😊", text: "How was my child's mood?" },
  { icon: "📖", text: "What learning activity was done?" },
];

const MOCK_REPLY =
  "Of course! As an AI language model, I am designed to assist with a variety of tasks. Here are some examples of what I can do:\n• Answer questions: Just ask me anything you like!\n• Generate text: I can write stories, poems, or summaries for you.";

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CEvenAIPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSend(text?: string) {
    if (limitReached) return;
    const content = text ?? input.trim();
    if (!content) return;

    const sentCount = messages.filter((m) => m.role === "user").length + 1;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    if (PARENT_MEMBERSHIP.status !== "active" && sentCount > TRIAL_MESSAGE_LIMIT) {
      setLimitReached(true);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "system",
        content: "Your trial has ended. Some family features are unavailable.",
      }]);
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: MOCK_REPLY,
      }]);
    }, 1500);
  }

  const isEmpty = messages.length === 0 && !isTyping;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      {/* Header */}
      <div className="shrink-0 flex items-center px-6 pt-4 pb-3">
        <button
          onClick={() => router.back()}
          className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-gray-200 bg-[#f4f5f6]"
        >
          <ArrowLeft size={16} className="text-gray-700" />
        </button>

        <div className="flex flex-1 items-center justify-center gap-2">
          <Sparkles size={22} className="text-cg-brand" />
          <h1 className="text-lg font-bold text-gray-800">CEvenAI</h1>
        </div>

        <div className="h-[34px] w-[34px]" aria-hidden="true" />
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {isEmpty ? (
          <div className="flex h-full flex-col">
            {/* Hero */}
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3EDE5]">
                <Sparkles size={30} className="text-cg-brand" />
              </div>
              <h2 className="mb-1 text-base font-bold text-gray-800">Hi! I&apos;m CEvenAI</h2>
              <p className="max-w-[220px] text-xs text-gray-500">
                Ask me about your child&apos;s day, health patterns, or activities.
              </p>
            </div>

            {/* Suggested prompts */}
            <div className="space-y-2 pb-2">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p.text}
                  onClick={() => handleSend(p.text)}
                  className="flex w-full items-center gap-2 rounded-xl bg-[#F3EDE5] px-4 py-3 text-left text-sm text-cg-brand"
                >
                  <span>{p.icon}</span>
                  <span>{p.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 py-2">
            {messages.map((msg) => {
              if (msg.role === "system") {
                return (
                  <div key={msg.id} className="flex justify-center py-1">
                    <div className="flex max-w-[88%] items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm">
                      <Lock size={13} className="shrink-0 text-gray-400" />
                      <p className="text-xs text-gray-600">{msg.content}</p>
                      <button
                        onClick={() => router.push("/parent/settings/account")}
                        className="shrink-0 text-xs font-semibold text-cg-brand underline underline-offset-2"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "user" ? (
                    <div className="max-w-[78%] rounded-2xl bg-cg-brand px-4 py-3 text-sm text-white">
                      {msg.content}
                    </div>
                  ) : (
                    <div className="max-w-[88%]">
                      <div className="mb-1 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-cg-brand" />
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                        {msg.content.split("\n").map((line, i) => (
                          <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
                        ))}
                      </div>
                      <div className="mt-1.5 flex items-center gap-3">
                        <button className="text-gray-300 hover:text-gray-500"><ThumbsUp size={14} /></button>
                        <button className="text-gray-300 hover:text-gray-500"><ThumbsDown size={14} /></button>
                        <button className="text-gray-300 hover:text-gray-500"><Copy size={14} /></button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-cg-brand" />
                <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="shrink-0 bg-white px-6 pb-safe pt-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
        <div className="flex items-center gap-3 pb-4">
          {messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100"
            >
              <RefreshCw size={14} className="text-gray-500" />
            </button>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={limitReached ? "Manage your account to keep chatting" : "Ask me anything..."}
            disabled={limitReached}
            className="flex-1 rounded-xl bg-[#f4f5f6] px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-60"
          />
          <button
            onClick={() => handleSend()}
            disabled={limitReached}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cg-accent-muted disabled:opacity-60"
          >
            <Send size={14} className="text-cg-brand" />
          </button>
          <button className="shrink-0" disabled={limitReached}>
            <Mic size={22} className={limitReached ? "text-gray-300" : "text-gray-500"} />
          </button>
        </div>
      </div>
    </div>
  );
}
