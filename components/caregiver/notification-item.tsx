import type { Notification } from "@/lib/caregiver/mock-data";
import { ClipboardList, FileText, MessageSquare, AlertTriangle, CreditCard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<Notification["type"], LucideIcon> = {
  task: ClipboardList,
  report: FileText,
  chat: MessageSquare,
  incident: AlertTriangle,
  fee: CreditCard,
};

const COLORS: Record<Notification["type"], string> = {
  task: "bg-amber-100 text-amber-600",
  report: "bg-teal-100 text-teal-600",
  chat: "bg-blue-100 text-blue-600",
  incident: "bg-red-100 text-red-600",
  fee: "bg-purple-100 text-purple-600",
};

type Props = { notification: Notification };

export function NotificationItem({ notification }: Props) {
  const Icon = ICONS[notification.type];
  const color = COLORS[notification.type];
  return (
    <div className={`flex items-start gap-3 px-4 py-4 ${notification.read ? "opacity-60" : ""}`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-cg-brand">{notification.title}</p>
          <span className="shrink-0 text-[10px] text-gray-400">{notification.time}</span>
        </div>
        <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{notification.body}</p>
      </div>
      {!notification.read && (
        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cg-accent" />
      )}
    </div>
  );
}
