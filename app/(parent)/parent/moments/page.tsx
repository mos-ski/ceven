"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, MessageSquare, Bookmark, Download, Camera,
} from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { MomentCreatorSheet } from "@/components/parent/moment-creator-sheet";
import { SafeImage } from "@/components/ui/safe-image";
import { mockParentChildren } from "@/lib/parent/mock-data";
import { getFeedItems, type FeedItem } from "@/lib/shared/feed";

type Tab = "all" | "moments" | "health" | "activity" | "creche";

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "All" },
  { key: "moments", label: "Moments" },
  { key: "health", label: "Health" },
  { key: "activity", label: "Activity" },
  { key: "creche", label: "Creche" },
];

const MOCK_USERS: Record<string, { name: string; handle: string; avatar: string; color: string }> = {
  "Ms Anu": { name: "Ms Anu", handle: "@ms_anu", avatar: "MA", color: "#059669" },
  "Sarah Johnson": { name: "Sarah Miller", handle: "@sarah_m", avatar: "SM", color: "#D4A67F" },
  "James Miller": { name: "James Miller", handle: "@james_m", avatar: "JM", color: "#7A4C29" },
  "Admin": { name: "CEven Admin", handle: "@ceven_admin", avatar: "AD", color: "#6366F1" },
};

function getPostUser(name?: string) {
  return MOCK_USERS[name ?? ""] ?? { name: name ?? "CEven", handle: "@ceven", avatar: "CE", color: "#7A4C29" };
}

function PostCard({ item }: { item: FeedItem }) {
  const user = getPostUser(item.postedBy);
  const images = item.images?.length ? item.images : item.images?.length ? item.images : [];

  return (
    <div className="px-4 py-4">
      {/* Header: avatar + name + handle + time */}
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: user.color }}
        >
          {user.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-gray-900 truncate">{user.name}</span>
            <span className="text-xs text-gray-400 truncate">{user.handle}</span>
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400 shrink-0">
              {item.timestamp ? formatTimeAgo(item.timestamp) : "now"}
            </span>
          </div>
          {/* Caption */}
          <p className="mt-1 text-sm text-gray-800 leading-relaxed">{item.title}</p>
        </div>
      </div>

      {/* Image carousel */}
      {images.length > 0 && (
        <div className="mt-3 ml-13 overflow-hidden rounded-2xl border border-gray-100">
          <SafeImage
            src={images[0]}
            alt={item.title}
            className="h-64 w-full"
          />
        </div>
      )}

      {/* Action bar — only on image posts */}
      {images.length > 0 && (
        <div className="mt-3 ml-13 flex items-center gap-6">
          <button className="flex items-center gap-1.5 text-gray-400 active:text-cg-brand">
            <MessageSquare size={18} />
          </button>
          <button className="flex items-center gap-1.5 text-gray-400 active:text-cg-brand">
            <Bookmark size={18} />
          </button>
          <button className="flex items-center gap-1.5 text-gray-400 active:text-cg-brand">
            <Download size={18} />
          </button>
          <div className="flex-1" />
          {item.badge && (
            <span className="rounded-full bg-cg-brand/10 px-2.5 py-0.5 text-[10px] font-semibold text-cg-brand">
              {item.badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

export default function MomentsPage() {
  const router = useRouter();
  const [showCreator, setShowCreator] = useState(false);
  const [tab, setTab] = useState<Tab>("all");
  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    setItems(getFeedItems());
  }, []);

  const filtered = tab === "all" ? items : items.filter((i) => i.category === tab);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-gray-800">Moments</h1>
      </div>

      {/* Line tabs */}
      <div className="border-b border-gray-100 bg-white">
        <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative shrink-0 px-5 py-3 text-sm font-medium transition-colors ${
                tab === t.key ? "text-cg-brand" : "text-gray-400"
              }`}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-cg-brand" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filtered.map((item) => (
              <PostCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-sm font-semibold text-gray-500">No posts yet</p>
            <p className="mt-1 text-xs text-gray-400">Tap the camera to share a moment.</p>
          </div>
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
