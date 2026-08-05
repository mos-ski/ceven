"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Search, Send, Users, Hash, ChevronDown, Paperclip, Image, Smile } from "lucide-react";
import { CEIcon } from "@/components/admin-v3/ce-icon";
import { PageHeader } from "@/components/ui/page-header";

type FamilyChannel = {
  id: string;
  familyName: string;
  crecheName: string;
  childName: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
};

type ChatParticipant = {
  id: string;
  name: string;
  initials: string;
  role: "parent" | "caregiver" | "admin";
  color: string;
};

type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  time: string;
  date?: string;
  isNew?: boolean;
  attachment?: { type: "image" | "file"; name: string };
};

const FAMILY_CHANNELS: FamilyChannel[] = [
  {
    id: "ch-1",
    familyName: "Ayadi",
    crecheName: "Sunshine Creche",
    childName: "K Andrew",
    lastMessage: "Thank you for the update!",
    lastMessageTime: "9:12 AM",
    unread: 2,
    online: true,
  },
  {
    id: "ch-2",
    familyName: "Okafor",
    crecheName: "Sunshine Creche",
    childName: "Emeka",
    lastMessage: "I'll be picking up early today at 2pm",
    lastMessageTime: "8:45 AM",
    unread: 1,
    online: true,
  },
  {
    id: "ch-3",
    familyName: "Bello",
    crecheName: "Rainbow House",
    childName: "Zainab",
    lastMessage: "Please confirm if April invoice has been sent?",
    lastMessageTime: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "ch-4",
    familyName: "Mohammed",
    crecheName: "Rainbow House",
    childName: "Zara",
    lastMessage: "Zara will be absent tomorrow",
    lastMessageTime: "Apr 9",
    unread: 0,
    online: true,
  },
  {
    id: "ch-5",
    familyName: "Adeyemi",
    crecheName: "Sunshine Creche",
    childName: "Tunde",
    lastMessage: "Can we schedule a parent-teacher meeting?",
    lastMessageTime: "Apr 8",
    unread: 0,
    online: false,
  },
  {
    id: "ch-6",
    familyName: "Nwosu",
    crecheName: "Rainbow House",
    childName: "Chidera",
    lastMessage: "Great progress today!",
    lastMessageTime: "Apr 7",
    unread: 0,
    online: true,
  },
];

const FAMILY_PARTICIPANTS: Record<string, ChatParticipant[]> = {
  "ch-1": [
    { id: "p-mr-ayadi", name: "Mr Ben Ayadi", initials: "BA", role: "parent", color: "#7A4C29" },
    { id: "p-mrs-ayadi", name: "Mrs Ayadi", initials: "AA", role: "parent", color: "#D4A67F" },
    { id: "cg-ms-anu", name: "Ms Anu", initials: "MA", role: "caregiver", color: "#059669" },
    { id: "admin", name: "Admin", initials: "AD", role: "admin", color: "#6366F1" },
  ],
  "ch-2": [
    { id: "p-charles", name: "Mr Charles Okafor", initials: "CO", role: "parent", color: "#7A4C29" },
    { id: "p-ngozi", name: "Mrs Ngozi Okafor", initials: "NO", role: "parent", color: "#D4A67F" },
    { id: "cg-blessing", name: "Ms Blessing", initials: "BL", role: "caregiver", color: "#059669" },
  ],
  "ch-3": [
    { id: "p-folake", name: "Mrs Folake Bello", initials: "FB", role: "parent", color: "#7A4C29" },
    { id: "cg-ama", name: "Ms Ama", initials: "AM", role: "caregiver", color: "#059669" },
  ],
  "ch-4": [
    { id: "p-fatima", name: "Mrs Fatima Mohammed", initials: "FM", role: "parent", color: "#7A4C29" },
    { id: "cg-ama", name: "Ms Ama", initials: "AM", role: "caregiver", color: "#059669" },
  ],
  "ch-5": [
    { id: "p-deji", name: "Mr Deji Adeyemi", initials: "DA", role: "parent", color: "#7A4C29" },
    { id: "cg-ms-anu", name: "Ms Anu", initials: "MA", role: "caregiver", color: "#059669" },
  ],
  "ch-6": [
    { id: "p-ife", name: "Mrs Ife Nwosu", initials: "IN", role: "parent", color: "#7A4C29" },
    { id: "cg-blessing", name: "Ms Blessing", initials: "BL", role: "caregiver", color: "#059669" },
  ],
};

const FAMILY_CONVERSATIONS: Record<string, ChatMessage[]> = {
  "ch-1": [
    { id: "c1-1", senderId: "cg-ms-anu", text: "Good morning Mr and Mrs Ayadi! K Andrew had a great morning session. He participated well in circle time.", time: "8:30 AM", date: "Today" },
    { id: "c1-2", senderId: "p-mr-ayadi", text: "Good morning Ms Anu! That's great to hear. How was his appetite today?", time: "8:35 AM" },
    { id: "c1-3", senderId: "cg-ms-anu", text: "He ate well! Had his full portion of rice and beans, and even asked for more fruit. 💪", time: "8:38 AM" },
    { id: "c1-4", senderId: "p-mrs-ayadi", text: "That's wonderful! He's been picky at home lately. Thanks for the update!", time: "8:42 AM" },
    { id: "c1-5", senderId: "cg-ms-anu", text: "No problem! Also, he made a beautiful painting today. I'll send a photo during rest time.", time: "8:45 AM" },
    { id: "c1-6", senderId: "p-mr-ayadi", text: "We'd love to see it! Will you be uploading to the gallery?", time: "9:00 AM" },
    { id: "c1-7", senderId: "cg-ms-anu", text: "Yes! It'll be up by 2pm. He used his favourite colours - blue and green.", time: "9:05 AM" },
    { id: "c1-8", senderId: "p-mrs-ayadi", text: "Thank you for the update!", time: "9:12 AM" },
  ],
  "ch-2": [
    { id: "c2-1", senderId: "p-charles", text: "Hi, I'll be picking Emeka up early today at 2pm. Please let the caregiver know.", time: "8:40 AM", date: "Today" },
    { id: "c2-2", senderId: "cg-blessing", text: "Noted Mr Okafor! I'll make sure Emeka is ready by 2pm. Is everything okay?", time: "8:43 AM" },
    { id: "c2-3", senderId: "p-charles", text: "Yes, just a dental appointment. Nothing to worry about.", time: "8:45 AM" },
  ],
  "ch-3": [
    { id: "c3-1", senderId: "p-folake", text: "Please confirm if April invoice has been sent? I haven't received it.", time: "Yesterday", date: "Yesterday" },
    { id: "c3-2", senderId: "cg-ama", text: "Let me check with the admin team and get back to you shortly.", time: "Yesterday" },
    { id: "c3-3", senderId: "admin", text: "Hi Mrs Bello, the April invoice was sent on April 5th. Please check your spam folder. I'll resend it now.", time: "Yesterday" },
  ],
  "ch-4": [
    { id: "c4-1", senderId: "p-fatima", text: "Zara will be absent tomorrow, she has a hospital appointment.", time: "Apr 9", date: "Apr 9" },
    { id: "c4-2", senderId: "cg-ama", text: "Noted, thank you for letting us know. We hope she's okay! 💕", time: "Apr 9" },
  ],
  "ch-5": [
    { id: "c5-1", senderId: "p-deji", text: "Can we schedule a parent-teacher meeting to discuss Tunde's progress?", time: "Apr 8", date: "Apr 8" },
    { id: "c5-2", senderId: "cg-ms-anu", text: "Of course! I'm available on Thursday afternoon or Friday morning. Which works better?", time: "Apr 8" },
    { id: "c5-3", senderId: "p-deji", text: "Thursday at 3pm would be perfect.", time: "Apr 8" },
    { id: "c5-4", senderId: "cg-ms-anu", text: "It's set! I'll prepare Tunde's progress report. Looking forward to it.", time: "Apr 8" },
  ],
  "ch-6": [
    { id: "c6-1", senderId: "cg-blessing", text: "Great progress today! Chidera completed her first puzzle all by herself! 🧩", time: "Apr 7", date: "Apr 7" },
    { id: "c6-2", senderId: "p-ife", text: "Wow! She's been working on that for weeks. Thank you so much for encouraging her!", time: "Apr 7" },
  ],
};

function MessageBubble({ msg, sender, isOwn }: { msg: ChatMessage; sender?: ChatParticipant; isOwn: boolean }) {
  if (isOwn) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[70%]">
          <div className="rounded-2xl rounded-tr-sm bg-[#3B2513] px-4 py-2.5">
            <p className="text-sm text-[#FAF2E1] whitespace-pre-line">{msg.text}</p>
          </div>
          <p className="mt-0.5 text-right text-[10px] text-[#2D1810]/40">{msg.time}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-2">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white mt-1"
        style={{ backgroundColor: sender?.color ?? "#9CA3AF" }}
      >
        {sender?.initials ?? "?"}
      </div>
      <div className="max-w-[70%]">
        <div className="mb-0.5 flex items-center gap-1.5">
          <span className="text-[11px] font-semibold" style={{ color: sender?.color }}>{sender?.name}</span>
          <span className="text-[9px] uppercase tracking-wide text-[#2D1810]/35 bg-[#F5EDD8] px-1.5 py-0.5 rounded">{sender?.role}</span>
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-[#F5EDD8]/60 px-4 py-2.5">
          <p className="text-sm text-[#2D1810] whitespace-pre-line">{msg.text}</p>
        </div>
        <p className="mt-0.5 text-[10px] text-[#2D1810]/40">{msg.time}</p>
      </div>
    </div>
  );
}

export default function MessagesV3Page() {
  const [selectedChannelId, setSelectedChannelId] = useState<string>("ch-1");
  const [channelFilter, setChannelFilter] = useState("");
  const [showChannels, setShowChannels] = useState(true);
  const [messages, setMessages] = useState(FAMILY_CONVERSATIONS);
  const [input, setInput] = useState("");
  const [showParticipants, setShowParticipants] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedChannel = FAMILY_CHANNELS.find((ch) => ch.id === selectedChannelId) ?? FAMILY_CHANNELS[0];
  const participants = FAMILY_PARTICIPANTS[selectedChannelId] ?? [];
  const conversation = messages[selectedChannelId] ?? [];

  const totalUnread = FAMILY_CHANNELS.reduce((sum, ch) => sum + ch.unread, 0);

  const filteredChannels = useMemo(() => {
    if (!channelFilter) return FAMILY_CHANNELS;
    const q = channelFilter.toLowerCase();
    return FAMILY_CHANNELS.filter(
      (ch) =>
        ch.familyName.toLowerCase().includes(q) ||
        ch.childName.toLowerCase().includes(q) ||
        ch.crecheName.toLowerCase().includes(q)
    );
  }, [channelFilter]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.length]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    const newMsg: ChatMessage = {
      id: `admin-${Date.now()}`,
      senderId: "admin",
      text,
      time,
      isNew: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChannelId]: [...(prev[selectedChannelId] ?? []), newMsg],
    }));
    setInput("");
    inputRef.current?.focus();
  }

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col">
      <div className="mb-4">
        <PageHeader title="Messages" description={`${totalUnread} unread across ${FAMILY_CHANNELS.length} families`} />
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
        {/* Left: Family Channels */}
        <div className={`flex w-full flex-col border-r border-black/[0.07] md:w-[320px] ${showChannels ? "flex" : "hidden md:flex"}`}>
          {/* Search */}
          <div className="border-b border-black/[0.07] p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#2D1810]/40" />
              <input
                type="text"
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                placeholder="Search families…"
                className="w-full rounded-lg border border-black/[0.08] bg-[#F5EDD8]/60 py-2 pl-8 pr-3 text-sm text-[#2D1810] placeholder:text-[#2D1810]/40 focus:border-[#C47B2C] focus:outline-none"
              />
            </div>
          </div>

          {/* Channel List */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-3 pt-3 pb-1">
              <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-[#2D1810]/40">Families</p>
            </div>
            {filteredChannels.map((channel) => {
              const isSelected = channel.id === selectedChannelId;
              return (
                <button
                  key={channel.id}
                  onClick={() => {
                    setSelectedChannelId(channel.id);
                    setShowChannels(false);
                  }}
                  className={`flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors ${
                    isSelected ? "bg-[#C47B2C]/10" : "hover:bg-[#F5EDD8]/40"
                  }`}
                >
                  <div className="relative mt-0.5">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${
                      isSelected ? "bg-[#C47B2C]" : "bg-[#3B2513]"
                    }`}>
                      {channel.familyName[0]}
                    </div>
                    {channel.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`truncate text-[13px] font-semibold ${isSelected ? "text-[#C47B2C]" : "text-[#2D1810]"}`}>
                        {channel.familyName} <span className="font-normal text-[#2D1810]/40">•</span> <span className="font-normal text-[#2D1810]/50">{channel.crecheName}</span>
                      </p>
                      <span className="shrink-0 text-[10px] text-[#2D1810]/40">{channel.lastMessageTime}</span>
                    </div>
                    <div className="mt-0.5 flex items-center justify-between">
                      <p className="truncate text-xs text-[#2D1810]/45">{channel.lastMessage}</p>
                      {channel.unread > 0 && (
                        <span className="ml-2 flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-[#C47B2C] px-1 text-[9px] font-bold text-white">
                          {channel.unread}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[10px] text-[#2D1810]/30">Child: {channel.childName}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Conversation */}
        <div className={`flex min-w-0 flex-1 flex-col ${showChannels ? "hidden md:flex" : "flex"}`}>
          {/* Conversation Header */}
          <div className="flex items-center gap-3 border-b border-black/[0.07] px-4 py-3">
            <button
              onClick={() => setShowChannels(true)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5EDD8] md:hidden"
            >
              <ChevronDown className="h-4 w-4 rotate-90 text-[#2D1810]" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3B2513] text-xs font-bold text-white">
              {selectedChannel.familyName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#2D1810]">
                {selectedChannel.familyName} Family <span className="font-normal text-[#2D1810]/40">•</span> <span className="font-normal text-[#2D1810]/50">{selectedChannel.childName}</span>
              </p>
              <p className="text-[11px] text-[#2D1810]/40">{selectedChannel.crecheName} • {participants.length} members</p>
            </div>
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${showParticipants ? "bg-[#C47B2C]/15 text-[#C47B2C]" : "bg-[#F5EDD8] text-[#2D1810]/50"}`}
            >
              <Users className="h-4 w-4" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1">
            {/* Messages Area */}
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="flex flex-col gap-4">
                  {/* Date separator */}
                  {conversation[0]?.date && (
                    <div className="flex items-center gap-3 py-2">
                      <div className="h-px flex-1 bg-black/[0.07]" />
                      <span className="text-[10px] font-semibold text-[#2D1810]/35 bg-[#F5EDD8] px-2 py-0.5 rounded">{conversation[0].date}</span>
                      <div className="h-px flex-1 bg-black/[0.07]" />
                    </div>
                  )}
                  {conversation.map((msg) => {
                    const sender = participants.find((p) => p.id === msg.senderId);
                    const isOwn = msg.senderId === "admin";
                    return <MessageBubble key={msg.id} msg={msg} sender={sender} isOwn={isOwn} />;
                  })}
                  <div ref={bottomRef} />
                </div>
              </div>

              {/* Input Bar */}
              <div className="border-t border-black/[0.07] px-4 py-3">
                <div className="flex items-center gap-2">
                  <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5EDD8] text-[#2D1810]/50 hover:bg-[#EDD9C0]">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5EDD8] text-[#2D1810]/50 hover:bg-[#EDD9C0]">
                    <Image className="h-4 w-4" />
                  </button>
                  <div className="flex flex-1 items-center gap-2 rounded-xl bg-[#F5EDD8]/60 px-4 py-2.5">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                      }}
                      placeholder={`Message ${selectedChannel.familyName} family…`}
                      className="flex-1 bg-transparent text-sm text-[#2D1810] placeholder:text-[#2D1810]/40 focus:outline-none"
                    />
                  </div>
                  <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F5EDD8] text-[#2D1810]/50 hover:bg-[#EDD9C0]">
                    <Smile className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#3B2513] text-[#FAF2E1] hover:bg-[#2D1810] disabled:opacity-40"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Participants Sidebar */}
            {showParticipants && (
              <div className="hidden w-[220px] shrink-0 border-l border-black/[0.07] p-3 overflow-y-auto lg:block">
                <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#2D1810]/40">
                  Participants ({participants.length})
                </p>
                <div className="flex flex-col gap-1">
                  {participants.map((p) => (
                    <div key={p.id} className="flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-[#F5EDD8]/40">
                      <div className="relative">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ backgroundColor: p.color }}
                        >
                          {p.initials}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-2 border-white bg-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-semibold text-[#2D1810]">{p.name}</p>
                        <p className="text-[10px] capitalize text-[#2D1810]/40">{p.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
