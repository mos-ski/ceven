"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockChatThreads } from "@/lib/parent/mock-data";

export default function ChatPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = query
    ? mockChatThreads.filter((t) =>
        t.contactName.toLowerCase().includes(query.toLowerCase())
      )
    : mockChatThreads;

  const groups = filtered.reduce<Record<string, typeof mockChatThreads>>(
    (acc, thread) => {
      const g = thread.dateGroup;
      if (!acc[g]) acc[g] = [];
      acc[g].push(thread);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Search bar */}
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm">
            <Search size={16} className="text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 bg-transparent text-sm text-cg-brand placeholder:text-gray-300 focus:outline-none"
            />
          </div>
        </div>

        {/* Grouped threads */}
        {Object.entries(groups).map(([dateGroup, threads]) => (
          <div key={dateGroup}>
            <p className="px-4 py-2 text-xs font-medium text-gray-400">{dateGroup}</p>
            <div className="bg-white">
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => router.push(`/parent/chat/${thread.id}`)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cg-brand text-xs font-bold text-white">
                    {thread.contactInitials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-cg-brand">{thread.contactName}</p>
                      <p className="text-[10px] text-gray-400">{thread.lastMessageTime}</p>
                    </div>
                    <p className="truncate text-xs text-gray-400">{thread.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ParentBottomNav />
    </div>
  );
}
