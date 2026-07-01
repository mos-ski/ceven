"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockNotifications } from "@/lib/parent/mock-data";

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
                  <div className="flex items-start gap-3 px-4 py-3">
                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-cg-brand" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-cg-brand">{n.title}</p>
                      <p className="text-xs text-gray-400">{n.body}</p>
                      <p className="mt-1 text-[10px] text-gray-300">{n.time}</p>
                    </div>
                  </div>
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
                  <div className="flex items-start gap-3 px-4 py-3">
                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gray-300" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-600">{n.title}</p>
                      <p className="text-xs text-gray-400">{n.body}</p>
                      <p className="mt-1 text-[10px] text-gray-300">{n.time}</p>
                    </div>
                  </div>
                  {i < read.length - 1 && <div className="mx-4 border-b border-gray-100" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ParentBottomNav />
    </div>
  );
}
