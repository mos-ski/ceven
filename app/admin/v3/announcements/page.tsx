"use client";

import { useMemo, useState } from "react";
import { Eye, Sparkles, Users } from "lucide-react";
import { getAdaReply } from "@/lib/ada-responses";
import {
  ANNOUNCEMENT_AUDIENCES,
  ANNOUNCEMENT_LOG,
  ANNOUNCEMENT_QUICK_PROMPTS,
  ANNOUNCEMENT_TEMPLATES,
  ANNOUNCEMENT_TYPES,
} from "@/lib/mock-data/communication";

export default function AnnouncementsV3Page() {
  const [audience, setAudience] = useState(ANNOUNCEMENT_AUDIENCES[0]);
  const [type, setType] = useState(ANNOUNCEMENT_TYPES[0]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const canSend = subject.trim().length > 0 && message.trim().length > 0;

  const aiDraft = useMemo(() => getAdaReply(subject || "general update"), [subject]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
          Announcements
        </h1>
        <p className="mt-1 text-sm text-[#2D1810]/50">Broadcast to all parents or specific rooms</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Send Announcement form */}
        <div className="flex flex-col gap-4 rounded-2xl border border-black/[0.07] bg-white p-5">
          <p className="text-sm font-bold text-[#2D1810]">Send Announcement</p>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">
              Audience
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full rounded-lg border border-black/[0.08] bg-white px-3.5 py-2.5 text-sm text-[#2D1810] focus:border-[#C47B2C] focus:outline-none"
            >
              {ANNOUNCEMENT_AUDIENCES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as typeof type)}
              className="w-full rounded-lg border border-black/[0.08] bg-white px-3.5 py-2.5 text-sm text-[#2D1810] focus:border-[#C47B2C] focus:outline-none"
            >
              {ANNOUNCEMENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">
              Subject
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
              className="w-full rounded-lg border border-black/[0.08] bg-white px-3.5 py-2.5 text-sm text-[#2D1810] placeholder:text-[#2D1810]/40 focus:border-[#C47B2C] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">
              Message
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message here…"
              className="w-full resize-none rounded-lg border border-black/[0.08] bg-white px-3.5 py-2.5 text-sm text-[#2D1810] placeholder:text-[#2D1810]/40 focus:border-[#C47B2C] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setMessage(aiDraft)}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1E2D4A] to-[#2D1810] px-3.5 py-2 text-xs font-bold text-[#F5EDD8] hover:opacity-90"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#C47B2C]" /> Auto-Create
            </button>
            {ANNOUNCEMENT_QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setMessage(prompt)}
                className="rounded-full border border-black/[0.08] bg-white px-3.5 py-2 text-xs font-semibold text-[#3B2513] hover:bg-[#F5EDD8]"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">Templates</p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {ANNOUNCEMENT_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSubject(t.label);
                    setMessage(t.excerpt);
                  }}
                  className="flex flex-col gap-1 rounded-xl border border-black/[0.08] p-3 text-left hover:border-[#C47B2C] hover:bg-[#FAF2E1]"
                >
                  <p className="text-sm font-semibold text-[#2D1810]">{t.label}</p>
                  <p className="line-clamp-2 text-xs text-[#2D1810]/50">{t.excerpt}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!canSend}
            className="self-end rounded-lg bg-[#3B2513] px-5 py-2.5 text-sm font-semibold text-[#FAF2E1] hover:bg-[#2D1810] disabled:cursor-not-allowed disabled:bg-[#3B2513]/30"
          >
            Send Announcement
          </button>
        </div>

        {/* Sent history */}
        <div className="flex flex-col gap-4 rounded-2xl border border-black/[0.07] bg-white p-5">
          <p className="text-sm font-bold text-[#2D1810]">Sent Announcements</p>
          <div className="flex flex-col gap-3">
            {ANNOUNCEMENT_LOG.map((a) => (
              <div key={a.id} className="rounded-xl border border-black/[0.08] p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-[#2D1810]">{a.title}</p>
                  <span className="shrink-0 font-mono text-[10px] text-[#2D1810]/40">{a.date}</span>
                </div>
                <p className="mt-1.5 text-xs text-[#2D1810]/50">{a.excerpt}</p>
                <div className="mt-3 flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#2D1810]">
                    <Users className="h-3.5 w-3.5" />
                    {a.recipientCount} delivered
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#2D1810]">
                    <Eye className="h-3.5 w-3.5" />
                    {a.viewCount} read
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
