"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { NotificationItem } from "@/components/caregiver/notification-item";
import { mockNotifications } from "@/lib/caregiver/mock-data";

export default function NotificationsPage() {
  const router = useRouter();
  const unread = mockNotifications.filter((n) => !n.read);
  const read = mockNotifications.filter((n) => n.read);

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Notifications</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {unread.length > 0 && (
          <div className="mt-3">
            <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">New</p>
            <div className="bg-white">
              {unread.map((n, i) => (
                <div key={n.id}>
                  <NotificationItem notification={n} />
                  {i < unread.length - 1 && <div className="mx-4 border-b border-gray-100" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {read.length > 0 && (
          <div className="mt-3">
            <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Earlier</p>
            <div className="bg-white">
              {read.map((n, i) => (
                <div key={n.id}>
                  <NotificationItem notification={n} />
                  {i < read.length - 1 && <div className="mx-4 border-b border-gray-100" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
