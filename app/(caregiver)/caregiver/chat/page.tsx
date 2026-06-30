"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { ChatListItem } from "@/components/caregiver/chat-list-item";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { mockChatThreads } from "@/lib/caregiver/mock-data";

export default function ChatPage() {
  const [query, setQuery] = useState("");

  const filtered = query
    ? mockChatThreads.filter((t) =>
        t.contact.name.toLowerCase().includes(query.toLowerCase())
      )
    : mockChatThreads;

  // Group by dateGroup
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
                <ChatListItem key={thread.id} thread={thread} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <LogSheet />
      <BottomNav />
    </div>
  );
}
