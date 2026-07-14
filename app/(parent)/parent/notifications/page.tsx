"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, Play, Image, AlertTriangle, Clock, Video, FileText } from "lucide-react";
import { mockChild, mockRichNotifications, type NotifIcon, type RichNotification } from "@/lib/parent/mock-data";
import { getAcceptedIndependentCaregiverRelationships } from "@/lib/independent-caregiver-invites";

// ─── Icon map ─────────────────────────────────────────────────────────────────
function NotifIconBadge({ icon }: { icon: NotifIcon }) {
  const map: Record<NotifIcon, { bg: string; el: React.ReactNode }> = {
    video:    { bg: "bg-blue-50",   el: <Play size={14} className="text-blue-500" /> },
    photo:    { bg: "bg-purple-50", el: <Image size={14} className="text-purple-500" /> },
    alert:    { bg: "bg-amber-50",  el: <AlertTriangle size={14} className="text-amber-500" /> },
    clock:    { bg: "bg-teal-50",   el: <Clock size={14} className="text-teal-500" /> },
    videocam: { bg: "bg-blue-50",   el: <Video size={14} className="text-blue-500" /> },
    report:   { bg: "bg-cg-quick-action", el: <FileText size={14} className="text-cg-brand" /> },
    chat:     { bg: "bg-green-50",  el: <Bell size={14} className="text-green-500" /> },
    fee:      { bg: "bg-orange-50", el: <FileText size={14} className="text-orange-500" /> },
  };
  const { bg, el } = map[icon] ?? map.report;
  return (
    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}>
      {el}
    </div>
  );
}

export default function NotificationsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"all" | "unread">("all");
  const [inviteNotifications, setInviteNotifications] = useState<RichNotification[]>(() =>
    getAcceptedIndependentCaregiverRelationships(mockChild.id).map((invite) => ({
      id: `invite-accepted-${invite.code}`,
      title: "Caregiver accepted",
      body: `${invite.caregiverName} accepted your invite for ${invite.childName}.`,
      time: "Now",
      read: false,
      icon: "chat",
      day: "Today",
    }))
  );

  function refreshInviteNotifications() {
    setInviteNotifications(
      getAcceptedIndependentCaregiverRelationships(mockChild.id).map((invite) => ({
        id: `invite-accepted-${invite.code}`,
        title: "Caregiver accepted",
        body: `${invite.caregiverName} accepted your invite for ${invite.childName}.`,
        time: "Now",
        read: false,
        icon: "chat",
        day: "Today",
      }))
    );
  }

  useEffect(() => {
    window.addEventListener("storage", refreshInviteNotifications);
    window.addEventListener("ceven-independent-invites-updated", refreshInviteNotifications);
    return () => {
      window.removeEventListener("storage", refreshInviteNotifications);
      window.removeEventListener("ceven-independent-invites-updated", refreshInviteNotifications);
    };
  }, []);

  const allNotifs = [...inviteNotifications, ...mockRichNotifications];
  const unread = allNotifs.filter((n) => !n.read);

  const displayed = tab === "all" ? allNotifs : unread;

  // Group by day
  const grouped = displayed.reduce<Record<string, typeof displayed>>((acc, n) => {
    if (!acc[n.day]) acc[n.day] = [];
    acc[n.day].push(n);
    return acc;
  }, {});

  const dayOrder = ["Today", "Yesterday"];
  const sortedDays = [
    ...dayOrder.filter((d) => grouped[d]),
    ...Object.keys(grouped).filter((d) => !dayOrder.includes(d)),
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#f4f5f6]">
      {/* Header */}
      <div className="shrink-0 bg-white px-6 pb-4 pt-4">
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
          >
            <ArrowLeft size={16} className="text-gray-600" />
          </button>
          <h1
            className="flex-1 text-center text-lg font-bold text-gray-800 pr-8"
            style={{ fontFamily: "var(--font-merriweather)" }}
          >
            Notifications
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setTab("all")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              tab === "all"
                ? "bg-cg-brand text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            All ({allNotifs.length})
          </button>
          <button
            onClick={() => setTab("unread")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              tab === "unread"
                ? "bg-cg-brand text-white"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            Unread ({unread.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {displayed.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-3">
            {sortedDays.map((day) => (
              <div key={day}>
                <p className="mb-2 px-1 text-xs font-semibold text-gray-400">{day}</p>
                <div className="flex flex-col gap-2">
                  {grouped[day].map((n) => (
                    <div
                      key={n.id}
                      className="flex items-start gap-3 rounded-xl bg-white p-4"
                    >
                      {/* Icon with unread dot */}
                      <div className="relative shrink-0">
                        <NotifIconBadge icon={n.icon} />
                        {!n.read && (
                          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-semibold leading-tight ${n.read ? "text-gray-600" : "text-gray-800"}`}>
                            {n.title}
                          </p>
                          <p className="shrink-0 text-[11px] text-gray-400">{n.time}</p>
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{n.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <Bell size={28} className="text-gray-500" />
      </div>
      <div>
        <p className="text-base font-bold text-gray-800">No Notifications Yet!</p>
        <p className="mt-1 max-w-[240px] text-sm text-gray-400">
          We&apos;ll notify you about important updates regarding your child&apos;s safety, screen time, and location.
        </p>
      </div>
    </div>
  );
}
