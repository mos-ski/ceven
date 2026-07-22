"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, MessageSquare, Download, Camera,
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

const MOCK_USERS: Record<string, { name: string; role: string; avatar: string; color: string }> = {
  "Ms Anu": { name: "Ms Anu", role: "Caregiver", avatar: "MA", color: "#059669" },
  "Sarah Johnson": { name: "Sarah Miller", role: "Mother", avatar: "SM", color: "#D4A67F" },
  "James Miller": { name: "James Miller", role: "Father", avatar: "JM", color: "#7A4C29" },
  "Admin": { name: "CEven Admin", role: "Admin", avatar: "AD", color: "#6366F1" },
};

const REACTIONS = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Laugh" },
  { emoji: "😮", label: "Wow" },
  { emoji: "😢", label: "Cry" },
  { emoji: "🔥", label: "Fire" },
  { emoji: "🎉", label: "Celebrate" },
  { emoji: "👏", label: "Clap" },
];

function getPostUser(name?: string) {
  return MOCK_USERS[name ?? ""] ?? { name: name ?? "CEven", role: "System", avatar: "CE", color: "#7A4C29" };
}

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function Carousel({ images, title, onDoubleTap }: { images: string[]; title: string; onDoubleTap: () => void }) {
  const [idx, setIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastTap = useRef(0);

  const handleTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      onDoubleTap();
    }
    lastTap.current = now;
  }, [onDoubleTap]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const newIdx = Math.round(scrollLeft / clientWidth);
    setIdx(newIdx);
  }, []);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
        onScroll={handleScroll}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="w-full shrink-0 snap-start"
            onClick={handleTap}
          >
            <SafeImage
              src={src}
              alt={`${title} — photo ${i + 1}`}
              className="h-72 w-full object-cover"
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ReactionPicker({ onSelect, onClose }: { onSelect: (emoji: string) => void; onClose: () => void }) {
  return (
    <div className="absolute bottom-full left-0 mb-2 z-50">
      <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-xl ring-1 ring-gray-100">
        {REACTIONS.map((r) => (
          <button
            key={r.emoji}
            onClick={() => { onSelect(r.emoji); onClose(); }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl hover:bg-gray-100 active:scale-125 transition-transform"
          >
            {r.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

function PostCard({ item }: { item: FeedItem }) {
  const user = getPostUser(item.postedBy);
  const images = item.images?.length ? item.images : [];
  const [liked, setLiked] = useState(false);
  const [likeEmoji, setLikeEmoji] = useState("👍");
  const [showReactions, setShowReactions] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const handleDoubleTap = useCallback(() => {
    setLiked(true);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 800);
  }, []);

  const handleReaction = useCallback((emoji: string) => {
    setLiked(true);
    setLikeEmoji(emoji);
    setShowReactions(false);
  }, []);

  return (
    <div className="px-4 py-4">
      {/* Header: avatar + name + role + time */}
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
            <span className="text-[11px] text-gray-400 rounded-full bg-gray-100 px-1.5 py-0.5">{user.role}</span>
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
        <div className="mt-3 ml-13 overflow-hidden rounded-2xl border border-gray-100 relative">
          <Carousel images={images} title={item.title ?? ""} onDoubleTap={handleDoubleTap} />
          {/* Heart animation on double tap */}
          {showHeart && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-6xl animate-bounce-in drop-shadow-lg">❤️</span>
            </div>
          )}
        </div>
      )}

      {/* Action bar — only on image posts */}
      {images.length > 0 && (
        <div className="mt-3 ml-13 flex items-center gap-4">
          {/* Like / Reaction button */}
          <div className="relative">
            <button
              onClick={() => setShowReactions(!showReactions)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                liked ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500 active:bg-gray-200"
              }`}
            >
              <span className="text-base">{likeEmoji}</span>
              <span>{liked ? "Liked" : "Like"}</span>
            </button>
            {showReactions && (
              <ReactionPicker
                onSelect={handleReaction}
                onClose={() => setShowReactions(false)}
              />
            )}
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 active:bg-gray-200 text-sm font-medium">
            <MessageSquare size={16} />
            <span>Comment</span>
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 active:bg-gray-200 text-sm font-medium">
            <Download size={16} />
            <span>Save</span>
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

export default function MomentsPage() {
  const router = useRouter();
  const [showCreator, setShowCreator] = useState(false);
  const [tab, setTab] = useState<Tab>("all");
  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    setItems(getFeedItems());
  }, []);

  const filtered = (tab === "all" ? items : items.filter((i) => i.category === tab)).filter(
    (i) => i.images && i.images.length > 0
  );

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-white">
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
          <div>
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
