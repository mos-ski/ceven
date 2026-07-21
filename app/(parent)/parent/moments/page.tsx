"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, MessageSquare, Bookmark, Play, Camera, ChevronRight,
  Pill, AlertTriangle, TrendingUp, LogIn, LogOut, FileText, Megaphone, CalendarDays,
  type LucideIcon,
} from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { MomentCreatorSheet } from "@/components/parent/moment-creator-sheet";
import { ImageCarousel } from "@/components/parent/image-carousel";
import { mockParentChildren } from "@/lib/parent/mock-data";
import { getFeedItems, groupByDay, formatRelativeTime, type FeedItem, type FeedCategory } from "@/lib/shared/feed";

const FILTERS: { key: FeedCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "moments", label: "Moments" },
  { key: "health", label: "Health" },
  { key: "activity", label: "Activity" },
  { key: "creche", label: "Creche" },
];

const TYPE_STYLE: Record<string, { icon: LucideIcon; tint: string; iconColor: string }> = {
  medication: { icon: Pill, tint: "bg-blue-50", iconColor: "text-blue-500" },
  incident: { icon: AlertTriangle, tint: "bg-amber-50", iconColor: "text-amber-500" },
  growth: { icon: TrendingUp, tint: "bg-purple-50", iconColor: "text-purple-500" },
  "check-in": { icon: LogIn, tint: "bg-green-50", iconColor: "text-green-500" },
  "check-out": { icon: LogOut, tint: "bg-gray-100", iconColor: "text-gray-500" },
  report: { icon: FileText, tint: "bg-amber-50", iconColor: "text-cg-brand" },
  announcement: { icon: Megaphone, tint: "bg-rose-50", iconColor: "text-rose-500" },
  event: { icon: CalendarDays, tint: "bg-teal-50", iconColor: "text-teal-500" },
};

function MomentCard({ item }: { item: FeedItem }) {
  const router = useRouter();
  const images = item.images ?? [];

  return (
    <div
      onClick={() => router.push("/parent/gallery")}
      className="overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="relative h-52 overflow-hidden bg-cg-quick-action">
        <ImageCarousel images={images} alt={item.title} heightClass="h-52" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        {item.badge && (
          <div className="absolute left-3 top-3 rounded-md bg-cg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
            {item.badge}
          </div>
        )}
        {item.hasVideo && (
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80">
            <Play size={14} className="ml-0.5 text-cg-brand" fill="currentColor" />
          </div>
        )}
      </div>

      <div className="px-4 py-3">
        <p className="mb-2 text-sm font-medium text-gray-800 leading-snug">{item.title}</p>
        <div className="mb-3 flex items-center gap-1">
          <span className="text-xs text-gray-400">{formatRelativeTime(item.timestamp)}</span>
          {item.postedBy && (
            <>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-400">Posted by {item.postedBy}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-gray-50 pt-2" onClick={(e) => e.stopPropagation()}>
          <button className="flex items-center gap-1.5 text-xs text-gray-400">
            <MessageSquare size={14} />
            Comment
          </button>
          <button className="flex items-center gap-1.5 text-xs text-gray-400">
            <Bookmark size={14} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function CompactCard({ item }: { item: FeedItem }) {
  const router = useRouter();
  const style = TYPE_STYLE[item.type];
  const Icon = style?.icon ?? FileText;

  return (
    <button
      onClick={() => item.href && router.push(item.href)}
      className="flex w-full items-center gap-3 rounded-2xl bg-white p-3.5 text-left shadow-sm active:scale-[0.98] transition-transform"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${style?.tint ?? "bg-gray-100"}`}>
        <Icon size={18} className={style?.iconColor ?? "text-gray-500"} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-gray-800">{item.title}</p>
          {item.badge && (
            <span className="shrink-0 rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-semibold uppercase text-red-500">
              {item.badge}
            </span>
          )}
        </div>
        {item.body && <p className="truncate text-xs text-gray-400">{item.body}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-[10px] text-gray-400">{formatRelativeTime(item.timestamp)}</span>
        <ChevronRight size={14} className="text-gray-300" />
      </div>
    </button>
  );
}

export default function MomentsPage() {
  const router = useRouter();
  const [showCreator, setShowCreator] = useState(false);
  const [filter, setFilter] = useState<FeedCategory | "all">("all");
  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    setItems(getFeedItems());
  }, []);

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);
  const grouped = groupByDay(filtered);

  const emptyLabel = filter === "all" ? "updates" : FILTERS.find((f) => f.key === filter)?.label.toLowerCase();

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Moments</h1>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto border-b border-gray-50 bg-white px-4 py-3 [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === f.key ? "bg-cg-brand text-white" : "bg-[#f4f5f6] text-gray-600"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {grouped.length > 0 ? (
          <div className="flex flex-col gap-5">
            {grouped.map(({ label, items: dayItems }) => (
              <div key={label}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
                <div className="flex flex-col gap-3">
                  {dayItems.map((item) =>
                    item.type === "moment" ? (
                      <MomentCard key={item.id} item={item} />
                    ) : (
                      <CompactCard key={item.id} item={item} />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyFeed label={emptyLabel ?? "updates"} />
        )}
      </div>

      {/* Camera FAB */}
      <button
        onClick={() => setShowCreator(true)}
        className="absolute bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-cg-brand shadow-lg shadow-cg-brand/30 active:scale-95 transition-transform"
      >
        <Camera size={22} className="text-white" />
      </button>

      {showCreator && (
        <MomentCreatorSheet
          children={mockParentChildren}
          onClose={() => setShowCreator(false)}
        />
      )}

      <ParentBottomNav />
    </div>
  );
}

function EmptyFeed({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="flex flex-col items-center gap-2 text-center">
        <ScrollIcon />
        <p className="text-base font-semibold text-gray-800">No {label} yet!</p>
        <p className="text-sm text-gray-400">Updates will appear here once there's activity.</p>
      </div>
    </div>
  );
}

function ScrollIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 97 97" fill="none" className="mb-1">
      <rect width="97" height="97" rx="48.5" fill="none" />
      <path d="M65 30H40a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h20a8 8 0 0 0 8-8V38a8 8 0 0 0-8-8z" fill="#1F2937" opacity="0.9" />
      <path d="M44 45h16M44 51h16M44 57h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 30c-4.4 0-8 3.6-8 8v2c0-4.4 3.6-8 8-8h4l-4-2z" fill="#1F2937" opacity="0.6" />
    </svg>
  );
}
