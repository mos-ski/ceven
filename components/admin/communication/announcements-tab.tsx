"use client";

import { Calendar, Eye, Search, Sparkles, Users } from "lucide-react";
import { useState } from "react";

import {
  ANNOUNCEMENT_AUDIENCES,
  ANNOUNCEMENT_LOG,
  ANNOUNCEMENT_QUICK_PROMPTS,
  ANNOUNCEMENT_TEMPLATES,
  ANNOUNCEMENT_TYPES,
} from "@/lib/mock-data/communication";

function AnnouncementLogList() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 lg:w-[460px]">
      <div className="flex flex-col gap-3">
        <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-black">Announcement Log</p>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-2 size-4 -translate-y-1/2 text-[rgba(45,24,16,0.5)]" />
            <input
              placeholder="Search children, parents…"
              className="h-8 w-full rounded-lg border border-[rgba(45,24,16,0.12)] bg-[#f5edd8] pl-8 font-[family-name:var(--font-nunito)] text-xs text-[#2d1810] placeholder:text-[rgba(45,24,16,0.5)] outline-none"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#ccd2dc] px-3 py-2 font-[family-name:var(--font-nunito)] text-xs font-semibold text-[#454b54]">
            Date Filter
            <Calendar className="size-3" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {ANNOUNCEMENT_LOG.map((a) => (
          <div key={a.id} className="flex flex-col gap-2 rounded-lg border border-[#edd9c0] p-4">
            <div className="flex items-center justify-between">
              <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{a.title}</p>
              <span className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280]">{a.date}</span>
            </div>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{a.excerpt}</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-xs font-medium text-black">
                <Users className="size-4" />
                {a.recipientCount} Parents
              </span>
              <span className="flex items-center gap-1 font-[family-name:var(--font-nunito)] text-xs font-medium text-black">
                <Eye className="size-4" />
                {a.viewCount} Viewed
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SendAnnouncementForm() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-1 flex-col gap-6 rounded-xl bg-white p-5">
      <p className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-black">Send Announcement</p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Audience</label>
          <select
            defaultValue=""
            className="h-[52px] rounded-xl border border-[#e6ebf3] px-4 font-[family-name:var(--font-nunito)] text-sm text-[#111] outline-none focus:ring-2 focus:ring-[#c47b2c]"
          >
            <option value="" disabled>
              Select
            </option>
            {ANNOUNCEMENT_AUDIENCES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Type</label>
          <select
            defaultValue="General"
            className="h-[52px] rounded-xl border border-[#e6ebf3] px-4 font-[family-name:var(--font-nunito)] text-sm text-[#111] outline-none focus:ring-2 focus:ring-[#c47b2c]"
          >
            {ANNOUNCEMENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Subject</label>
          <input
            placeholder="Enter subject"
            className="h-[52px] rounded-xl border border-[#e6ebf3] px-4 font-[family-name:var(--font-nunito)] text-sm text-[#111] outline-none placeholder:text-[#9ca3af] focus:ring-2 focus:ring-[#c47b2c]"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type message here.."
              className="resize-none rounded-xl border border-[#e6ebf3] px-4 py-3.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="flex items-center gap-1.5 rounded-full px-3 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]"
              style={{
                backgroundImage:
                  "linear-gradient(123deg, rgba(30,45,74,0.2) 0%, rgba(45,24,16,0.2) 60%, rgba(196,123,44,0.2) 100%)",
              }}
            >
              <Sparkles className="size-3.5" />
              AI Create
            </button>
            {ANNOUNCEMENT_QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setMessage(prompt)}
                className="rounded-full border border-[#edd9c0] bg-white px-4 py-2 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#3b2513]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">Templates</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ANNOUNCEMENT_TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setMessage(t.excerpt)}
              className="flex flex-col gap-2 rounded-lg border border-[#edd9c0] p-3 text-left hover:bg-[#fdf6e8]"
            >
              <p className="font-[family-name:var(--font-nunito)] text-sm font-medium text-black">{t.label}</p>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{t.excerpt}</p>
            </button>
          ))}
        </div>
      </div>

      <button className="self-end rounded-lg bg-[#3b2513] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1]">
        Send Announcement
      </button>
    </div>
  );
}

export function AnnouncementsTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
          Announcements
        </h1>
        <button className="rounded-lg bg-[#3b2513] px-5 py-3 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1]">
          New Announcement
        </button>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <AnnouncementLogList />
        <SendAnnouncementForm />
      </div>
    </div>
  );
}
