"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Megaphone, AlertTriangle } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { getAnnouncements, markAnnouncementRead, type Announcement } from "@/lib/shared/announcements";
import { NewBadge } from "@/components/parent/new-badge";

export default function ParentAnnouncementsPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setAnnouncements(getAnnouncements());
    const handler = () => setAnnouncements(getAnnouncements());
    window.addEventListener("ceven-announcements-updated", handler);
    return () => window.removeEventListener("ceven-announcements-updated", handler);
  }, []);

  function handleExpand(id: string) {
    setExpandedId(expandedId === id ? null : id);
    markAnnouncementRead(id, "parent-1");
    setAnnouncements(getAnnouncements());
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-5 pt-12 pb-4 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Announcements</h1>
            <NewBadge />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {announcements.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Megaphone size={24} className="text-gray-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700">No Announcements</p>
            <p className="text-xs text-gray-400">Announcements from the creche will appear here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {announcements.map((ann) => {
              const isRead = ann.readBy.includes("parent-1");
              const isExpanded = expandedId === ann.id;

              return (
                <button
                  key={ann.id}
                  onClick={() => handleExpand(ann.id)}
                  className={`rounded-2xl bg-white p-4 shadow-sm text-left transition-colors ${
                    !isRead ? "border-l-4 border-cg-brand" : ""
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {ann.priority === "urgent" ? (
                        <AlertTriangle size={16} className="shrink-0 text-red-500" />
                      ) : (
                        <Megaphone size={16} className="shrink-0 text-cg-brand" />
                      )}
                      <p className="text-sm font-bold text-gray-800">{ann.title}</p>
                    </div>
                    {!isRead && (
                      <div className="h-2 w-2 shrink-0 rounded-full bg-cg-brand" />
                    )}
                  </div>

                  <p className={`text-xs text-gray-500 leading-relaxed ${!isExpanded ? "line-clamp-2" : ""}`}>
                    {ann.body}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-[10px] text-gray-400">
                      {new Date(ann.postedAt).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" })}
                      {ann.targetRoom && ` · ${ann.targetRoom}`}
                    </p>
                    {ann.priority === "urgent" && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                        Urgent
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <ParentBottomNav />
    </div>
  );
}
