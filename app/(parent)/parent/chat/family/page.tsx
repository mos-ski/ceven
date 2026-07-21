"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, AtSign, Users, Info } from "lucide-react";

type Participant = {
  id: string;
  name: string;
  initials: string;
  role: string;
  color: string;
};

const PARTICIPANTS: Participant[] = [
  { id: "james", name: "James", initials: "JM", role: "Father", color: "#7A4C29" },
  { id: "sarah", name: "Sarah", initials: "SM", role: "Mother", color: "#D4A67F" },
  { id: "ms-anu", name: "Ms Anu", initials: "MA", role: "Caregiver", color: "#059669" },
  { id: "admin", name: "Admin", initials: "AD", role: "Creche Admin", color: "#6366F1" },
];

type ChatMessage = {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isNew?: boolean;
};

const CONVERSATION: ChatMessage[] = [
  { id: "c1", senderId: "ms-anu", text: "Good morning everyone! 🎉 I have amazing news about Liam!", time: "9:15 AM" },
  { id: "c2", senderId: "sarah", text: "Good morning Ms Anu! What happened? 😊", time: "9:16 AM" },
  { id: "c3", senderId: "ms-anu", text: "Liam took his first steps today!! He walked from the mat to the toy shelf all by himself! 🚶‍♂️", time: "9:16 AM" },
  { id: "c4", senderId: "james", text: "Oh wow!! That's incredible! Our little man is growing up so fast! 😭❤️", time: "9:17 AM" },
  { id: "c5", senderId: "sarah", text: "I can't believe it! I wish I was there to see it 😢 Can you send photos?", time: "9:17 AM" },
  { id: "c6", senderId: "ms-anu", text: "Already on it! I captured a video and some photos. He was so proud of himself, clapping after each step 😄", time: "9:18 AM" },
  { id: "c7", senderId: "admin", text: "This is wonderful news! Milestone moments like these are what we love to see. I'll update Liam's developmental record 📋", time: "9:19 AM" },
  { id: "c8", senderId: "james", text: "Thanks @Ms Anu! You're doing an amazing job with him. @Sarah should we celebrate tonight? 🎂", time: "9:20 AM" },
  { id: "c9", senderId: "sarah", text: "Absolutely! @James I'll pick up a small cake on the way home. @Ms Anu does he need any special shoes now that he's walking?", time: "9:21 AM" },
  { id: "c10", senderId: "ms-anu", text: "Not yet, he's still building strength. Soft-soled shoes are perfect for now. I can recommend some good ones if you like 👟", time: "9:22 AM" },
  { id: "c11", senderId: "admin", text: "Just a reminder — we have the parent-teacher meeting next Tuesday. We can discuss Liam's progress there too 📅", time: "9:23 AM" },
  { id: "c12", senderId: "james", text: "Perfect, we'll be there. Thanks everyone! This is the best start to the morning ☀️", time: "9:24 AM" },
];

const AUTO_REPLIES: Record<string, string[]> = {
  "ms-anu": [
    "He's doing so well! Every day brings something new 😊",
    "I'll make sure to capture more milestones today!",
    "Don't forget to practice at home too — he loves holding onto the couch!",
  ],
  "sarah": [
    "This is why I love this creche! 💕",
    "I'm definitely crying happy tears right now 😭",
    "Can we video call during lunch to see him walk?",
  ],
  "james": [
    "Best dad moment ever! 🥹",
    "I need to baby-proof the house now!",
    "Let's get him some new shoes this weekend!",
  ],
  "admin": [
    "We're so proud of Liam's progress!",
    "Feel free to share this with family members.",
    "Developmental milestones are tracked in the app 📊",
  ],
};

function MessageBubble({ msg, sender, isOwn }: { msg: ChatMessage; sender?: Participant; isOwn: boolean }) {
  if (isOwn) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%]">
          <div className="rounded-2xl rounded-tr-sm bg-cg-brand px-4 py-2.5">
            <p className="text-sm text-white whitespace-pre-line">{msg.text}</p>
          </div>
          <p className="mt-0.5 text-right text-[10px] text-gray-400">{msg.time}</p>
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
      <div className="max-w-[72%]">
        <div className="mb-0.5 flex items-center gap-1.5">
          <span className="text-[11px] font-semibold" style={{ color: sender?.color }}>{sender?.name}</span>
          <span className="text-[9px] text-gray-400">{sender?.role}</span>
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-2.5">
          <p className="text-sm text-gray-800 whitespace-pre-line">{msg.text}</p>
        </div>
        <p className="mt-0.5 text-[10px] text-gray-400">{msg.time}</p>
      </div>
    </div>
  );
}

export default function FamilyChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(CONVERSATION);
  const [input, setInput] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [replyIndex, setReplyIndex] = useState<Record<string, number>>({});
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function getAutoReply(senderId: string): string {
    const replies = AUTO_REPLIES[senderId] ?? ["Thanks for sharing!"];
    const idx = replyIndex[senderId] ?? 0;
    const reply = replies[idx % replies.length];
    setReplyIndex(prev => ({ ...prev, [senderId]: idx + 1 }));
    return reply;
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: "james",
      text,
      time,
      isNew: true,
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setShowMentions(false);

    // Simulate 2-3 participants replying after delays
    const repliers = ["ms-anu", "sarah"];
    repliers.forEach((replier, i) => {
      setTimeout(() => {
        const replyText = getAutoReply(replier);
        setMessages(prev => [
          ...prev,
          {
            id: `auto-${Date.now()}-${i}`,
            senderId: replier,
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            isNew: true,
          },
        ]);
      }, 1500 + i * 1200);
    });
  }

  function insertMention(name: string) {
    setInput(prev => prev + `@${name} `);
    setShowMentions(false);
    inputRef.current?.focus();
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#FFFEFA]">
      {/* Header */}
      <div className="shrink-0 bg-white px-4 pt-12 pb-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <ArrowLeft size={16} className="text-gray-700" />
          </button>
          <div className="flex flex-1 items-center gap-2.5">
            <div className="flex -space-x-2">
              {PARTICIPANTS.slice(0, 3).map(p => (
                <div
                  key={p.id}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.initials}
                </div>
              ))}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-500 ring-2 ring-white">
                +{PARTICIPANTS.length - 3}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Liam&apos;s Family</p>
              <div className="flex items-center gap-1">
                <Users size={10} className="text-gray-400" />
                <p className="text-[10px] text-gray-400">{PARTICIPANTS.length} members</p>
              </div>
            </div>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <Info size={16} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Topic banner */}
      <div className="bg-amber-50 px-4 py-2">
        <p className="text-center text-[11px] font-medium text-amber-700">🎉 Liam took his first steps today!</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          {messages.map(msg => {
            const sender = PARTICIPANTS.find(p => p.id === msg.senderId);
            const isOwn = msg.senderId === "james";
            return <MessageBubble key={msg.id} msg={msg} sender={sender} isOwn={isOwn} />;
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Mention popup */}
      {showMentions && (
        <div className="absolute bottom-20 left-4 right-4 z-40 rounded-2xl bg-white shadow-lg border border-gray-100 p-2">
          <p className="px-2 pb-1 text-[10px] font-semibold text-gray-400">Mention someone</p>
          {PARTICIPANTS.filter(p => p.id !== "james").map(p => (
            <button
              key={p.id}
              onClick={() => insertMention(p.name)}
              className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left hover:bg-gray-50"
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: p.color }}
              >
                {p.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{p.name}</p>
                <p className="text-[10px] text-gray-400">{p.role}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="shrink-0 bg-white px-4 pb-safe pt-3 pb-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMentions(!showMentions)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100"
          >
            <AtSign size={16} className="text-gray-500" />
          </button>
          <div className="flex flex-1 items-center gap-2 rounded-full bg-gray-50 px-4 py-2.5">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") handleSend();
                if (e.key === "@") setShowMentions(true);
              }}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-brand disabled:opacity-40"
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
