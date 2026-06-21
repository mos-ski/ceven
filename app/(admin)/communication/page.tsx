"use client";

import {
  Camera,
  ChevronDown,
  MoreVertical,
  Paperclip,
  Search,
  Smile,
} from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type Message = {
  id: number;
  name: string;
  avatar: string;
  preview: string;
  time: string;
  unread: boolean;
  active: boolean;
};

type FilterOption = "All Messages" | "Read" | "Unread";

// ── Static data ───────────────────────────────────────────────────────────────

const messages: Message[] = [
  {
    id: 1,
    name: "Mrs. Johnson",
    avatar: "MJ",
    preview: "Good morning! I wanted to follow up on Zara's...",
    time: "9:14 AM",
    unread: true,
    active: true,
  },
  {
    id: 2,
    name: "Mr. Adeyemi",
    avatar: "MA",
    preview: "Hello, I'm enquiring about September intake...",
    time: "8:30 AM",
    unread: false,
    active: false,
  },
];

const filterTabs: FilterOption[] = ["All Messages", "Read", "Unread"];

const templates = [
  "Incident Report",
  "Payment Reminder",
  "Absence Notice",
  "General Update",
];

// ── Sub-components ────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810] mb-1.5">
      {children}
    </label>
  );
}

// ── Compose View ──────────────────────────────────────────────────────────────

function ComposeView() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#e6ebf3]">
        <h2 className="font-[family-name:var(--font-merriweather)] font-bold text-[#2d1810]">
          Compose Message
        </h2>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto">
        {/* Recipient */}
        <div>
          <FieldLabel>Recipient</FieldLabel>
          <select
            className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 text-sm text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
            defaultValue=""
          >
            <option value="" disabled>
              Select recipient
            </option>
            <option value="mrs-johnson">Mrs. Johnson</option>
            <option value="mr-adeyemi">Mr. Adeyemi</option>
            <option value="all-parents">All Parents</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <FieldLabel>Subject</FieldLabel>
          <input
            type="text"
            placeholder="Enter subject"
            className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 text-sm placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
          />
        </div>

        {/* Message */}
        <div>
          <FieldLabel>Message</FieldLabel>
          <textarea
            rows={5}
            placeholder="Type your message here..."
            className="w-full rounded-lg border border-[#d0d5dd] bg-white px-3.5 py-2.5 text-sm placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c] resize-none"
          />
        </div>

        {/* AI Create row */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            className="rounded-full px-4 py-2 text-sm font-medium text-white flex items-center gap-1.5"
            style={{
              background:
                "linear-gradient(135deg, rgb(30,45,74) 0%, rgb(45,24,16) 100%)",
            }}
          >
            ✦ AI Create
          </button>
          <button className="rounded-full border border-[#d0d5dd] px-3 py-1 text-xs text-[#6b7280] hover:bg-[#f9fafb]">
            Create incident message
          </button>
          <button className="rounded-full border border-[#d0d5dd] px-3 py-1 text-xs text-[#6b7280] hover:bg-[#f9fafb]">
            Create quick reminder
          </button>
          <button className="rounded-full border border-[#d0d5dd] px-3 py-1 text-xs text-[#6b7280] hover:bg-[#f9fafb]">
            Button CTA
          </button>
        </div>
      </div>

      {/* Footer buttons */}
      <div className="flex justify-end gap-3 p-4 border-t border-[#e6ebf3]">
        <button className="border border-[#d0d5dd] text-[#2d1810] px-5 py-2.5 rounded-lg text-sm font-medium font-[family-name:var(--font-urbanist)]">
          Cancel
        </button>
        <button
          disabled
          className="bg-[#e0bfa0] text-[#3b2513] px-5 py-2.5 rounded-lg text-sm font-medium font-[family-name:var(--font-urbanist)] opacity-60 cursor-not-allowed"
        >
          Send Message
        </button>
      </div>

      {/* Templates section */}
      <div className="bg-[#f9f8f6] p-4 border-t border-[#e6ebf3]">
        <p className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810] mb-3">
          Templates
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {templates.map((name) => (
            <div
              key={name}
              className="rounded-xl border border-[#e6ebf3] bg-white p-3 cursor-pointer hover:border-[#c47b2c] transition-colors"
            >
              <p className="text-sm font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                {name}
              </p>
              <p className="text-xs text-[#c47b2c] mt-1">Use template</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Conversation View ─────────────────────────────────────────────────────────

type ConversationMessage = {
  role: "received" | "sent";
  text: string;
};

function ConversationView({
  name,
  avatar,
  active,
  conversation,
}: {
  name: string;
  avatar: string;
  active: boolean;
  conversation: ConversationMessage[];
}) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#e6ebf3]">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-[#edd9c0] text-[#3b2513] text-xs font-bold flex items-center justify-center flex-shrink-0">
            {avatar}
          </div>
          <div>
            <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
              {name}
            </p>
            {active && (
              <p className="text-[10px] text-[#009061]">● Active Now</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="border border-[#d0d5dd] rounded-lg px-3 py-1.5 text-xs font-medium font-[family-name:var(--font-urbanist)] text-[#2d1810] hover:bg-[#f9fafb]">
            Contact
          </button>
          <button className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#6b7280] hover:bg-[#f9fafb]">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {conversation.map((msg, i) =>
          msg.role === "received" ? (
            <div key={i} className="flex items-start gap-2">
              <div className="h-8 w-8 rounded-full bg-[#edd9c0] text-[#3b2513] text-xs font-bold flex items-center justify-center flex-shrink-0">
                {avatar}
              </div>
              <div className="rounded-2xl rounded-tl-none bg-[#fdf6e8] border border-[#e0bfa0] px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#2d1810] max-w-[70%]">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="rounded-2xl rounded-tr-none bg-[#3b2513] text-[#faf2e1] px-4 py-3 text-sm font-[family-name:var(--font-nunito)] max-w-[70%]">
                {msg.text}
              </div>
            </div>
          )
        )}
      </div>

      {/* Reply area */}
      <div className="border-t border-[#eaeef3] p-4 bg-white">
        <textarea
          rows={2}
          placeholder="Write a message..."
          className="border border-[#e6ebf3] rounded-xl bg-[#f9f8f6] px-3 py-2.5 text-sm w-full focus:outline-none resize-none placeholder:text-[#9ca3af] font-[family-name:var(--font-nunito)]"
        />
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1">
            <button className="text-[#9ca3af] hover:text-[#6b7280] p-1">
              <Smile className="h-4 w-4" />
            </button>
            <button className="text-[#9ca3af] hover:text-[#6b7280] p-1">
              <Camera className="h-4 w-4" />
            </button>
            <button className="text-[#9ca3af] hover:text-[#6b7280] p-1">
              <Paperclip className="h-4 w-4" />
            </button>
          </div>
          <button className="bg-[#3b2513] text-[#faf2e1] px-4 py-2 rounded-lg text-sm font-medium font-[family-name:var(--font-urbanist)] hover:bg-[#2d1810]">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Conversation data ─────────────────────────────────────────────────────────

const johnsonConversation: ConversationMessage[] = [
  {
    role: "received",
    text: "Good morning! I wanted to follow up on Zara's progress this week. How is she settling in with the new routine?",
  },
  {
    role: "sent",
    text: "Good morning Mrs. Johnson! Zara has been doing wonderfully. She's really taken to the morning routine and has been very engaged during activities.",
  },
  {
    role: "received",
    text: "That's wonderful to hear! I've noticed she seems much happier when she comes home. Thank you for all your care.",
  },
];

const adeyemiConversation: ConversationMessage[] = [
  {
    role: "received",
    text: "Hello, I'm enquiring about availability in Lion Class for September intake.",
  },
  {
    role: "sent",
    text: "Hello Mr. Adeyemi! Thank you for reaching out. We do have limited spaces available for September...",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CommunicationPage() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(1);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All Messages");

  const filteredMessages = messages.filter((msg) => {
    if (activeFilter === "Read") return !msg.unread;
    if (activeFilter === "Unread") return msg.unread;
    return true;
  });

  const showNoMessages = activeFilter === "Unread" && filteredMessages.length === 0;

  return (
    <>
      {/* Page header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
          Messages
        </h1>
        <button
          onClick={() => setSelectedMessage(null)}
          className="bg-[#3b2513] text-[#faf2e1] px-5 py-2.5 rounded-lg text-sm font-medium font-[family-name:var(--font-urbanist)] hover:bg-[#2d1810]"
        >
          New Message
        </button>
      </div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[calc(100vh-160px)]">
        {/* ── LEFT PANEL ── */}
        <div className="w-full lg:w-[340px] lg:flex-shrink-0 rounded-2xl bg-white shadow-sm flex flex-col overflow-hidden">
          {/* Search + date filter */}
          <div className="p-4 flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9ca3af]" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full rounded-lg border border-[#d0d5dd] bg-[#f5edd8] px-3 py-2 text-sm pl-8 placeholder:text-[#9ca3af] focus:outline-none focus:border-[#c47b2c]"
              />
            </div>
            <button className="rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 text-sm flex items-center gap-1 text-[#6b7280] hover:bg-[#f9fafb] flex-shrink-0">
              Date
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex border-b border-[#e6ebf3] px-4">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-2 text-sm font-medium font-[family-name:var(--font-urbanist)] cursor-pointer ${
                  activeFilter === tab
                    ? "border-b-2 border-[#3b2513] text-[#3b2513]"
                    : "text-[#6b7280]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Message list */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            {showNoMessages ? (
              <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
                <p className="text-sm text-[#9ca3af] font-[family-name:var(--font-nunito)]">
                  No Message Yet
                </p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg.id)}
                    className={`cursor-pointer border-b border-[#f3f4f6] px-4 py-3 flex items-start gap-3 transition-colors ${
                      isSelected
                        ? "bg-[#faf2e1] border-l-4 border-l-[#e0bfa0]"
                        : msg.unread
                        ? "bg-white"
                        : "bg-white opacity-70"
                    }`}
                  >
                    {/* Avatar */}
                    <div className="h-9 w-9 rounded-full bg-[#edd9c0] text-[#3b2513] text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {msg.avatar}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810] truncate">
                          {msg.name}
                        </p>
                        <span className="text-[10px] text-[#9ca3af] flex-shrink-0">
                          {msg.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#6b7280] mt-0.5 line-clamp-1">
                        {msg.preview}
                      </p>
                    </div>

                    {/* Unread dot */}
                    {msg.unread && (
                      <div className="h-2 w-2 rounded-full bg-[#c47b2c] flex-shrink-0 mt-1" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="flex-1 rounded-2xl bg-white shadow-sm flex flex-col overflow-hidden">
          {selectedMessage === null && <ComposeView />}

          {selectedMessage === 1 && (
            <ConversationView
              name="Mrs. Johnson"
              avatar="MJ"
              active={true}
              conversation={johnsonConversation}
            />
          )}

          {selectedMessage === 2 && (
            <ConversationView
              name="Mr. Adeyemi"
              avatar="MA"
              active={false}
              conversation={adeyemiConversation}
            />
          )}
        </div>
      </div>
    </>
  );
}
