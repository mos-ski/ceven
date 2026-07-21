"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Megaphone, AlertTriangle, Plus, X } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { mockUser } from "@/lib/caregiver/mock-data";
import { getAnnouncements, addAnnouncement, type Announcement } from "@/lib/shared/announcements";
import { NewBadge } from "@/components/caregiver/new-badge";

export default function CaregiverAnnouncementsPage() {
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    setAnnouncements(getAnnouncements());
    const handler = () => setAnnouncements(getAnnouncements());
    window.addEventListener("ceven-announcements-updated", handler);
    return () => window.removeEventListener("ceven-announcements-updated", handler);
  }, []);

  return (
    <div className="relative flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-base font-bold text-cg-brand">Announcements</h1>
            <NewBadge />
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1 rounded-xl bg-cg-brand px-3 py-2 text-xs font-semibold text-white"
        >
          <Plus size={14} /> Post
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {announcements.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <Megaphone size={24} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm text-gray-400">No announcements yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {announcements.map((ann) => (
              <div key={ann.id} className={`rounded-2xl bg-white p-4 shadow-sm ${ann.priority === "urgent" ? "border-l-4 border-red-500" : ""}`}>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {ann.priority === "urgent" ? (
                      <AlertTriangle size={16} className="shrink-0 text-red-500" />
                    ) : (
                      <Megaphone size={16} className="shrink-0 text-cg-brand" />
                    )}
                    <p className="text-sm font-bold text-cg-brand">{ann.title}</p>
                  </div>
                  {ann.priority === "urgent" && (
                    <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600">Urgent</span>
                  )}
                </div>
                <p className="mb-2 text-xs text-gray-500 leading-relaxed">{ann.body}</p>
                <div className="flex items-center justify-between text-[10px] text-gray-400">
                  <span>Posted by {ann.postedBy}</span>
                  <span>{new Date(ann.postedAt).toLocaleDateString("en-NG", { month: "short", day: "numeric" })}</span>
                </div>
                {ann.targetRoom && (
                  <p className="mt-1 text-[10px] text-gray-400">Target: {ann.targetRoom}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateAnnouncementModal
          onClose={() => setShowCreateModal(false)}
          onCreate={() => { setAnnouncements(getAnnouncements()); setShowCreateModal(false); }}
        />
      )}

      <LogSheet />
      <BottomNav />
    </div>
  );
}

function CreateAnnouncementModal({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [targetRoom, setTargetRoom] = useState("");
  const [priority, setPriority] = useState<"normal" | "urgent">("normal");

  function handleCreate() {
    if (!title.trim() || !body.trim()) return;
    addAnnouncement({
      title: title.trim(),
      body: body.trim(),
      targetRoom: targetRoom || undefined,
      postedBy: "Ms Anu",
      priority,
    });
    onCreate();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">Post Announcement</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement title" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Message *</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="Write your announcement..." className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Target Room</label>
            <input value={targetRoom} onChange={(e) => setTargetRoom(e.target.value)} placeholder="All Rooms" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPriority(priority === "normal" ? "urgent" : "normal")}
              className={`flex h-6 w-11 items-center rounded-full transition-colors ${priority === "urgent" ? "bg-red-500" : "bg-gray-200"}`}
            >
              <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${priority === "urgent" ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
            <span className="text-sm text-gray-700">Mark as Urgent</span>
          </div>
          <button
            onClick={handleCreate}
            disabled={!title.trim() || !body.trim()}
            className="mt-1 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
          >
            Post Announcement
          </button>
        </div>
      </div>
    </div>
  );
}
