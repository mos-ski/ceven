"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Bell,
  ScanLine,
  LogIn,
  Baby,
  LayoutGrid,
  Images,
  TrendingUp,
  Pill,
  AlertTriangle,
  CalendarCheck,
  CalendarDays,
  Megaphone,
  FileText,
  Smile,
  Search,
  X,
  MessageSquare,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { QuickActionCard } from "@/components/parent/quick-action-card";
import { AnimatedRequestIcon } from "@/components/parent/animated-request-icon";
import { SafeImage } from "@/components/ui/safe-image";
import { mockParentUser, mockChild, mockAttendanceHistory } from "@/lib/parent/mock-data";
import { getFeedItems, type FeedItem } from "@/lib/shared/feed";

const ALL_ACTIONS = [
  { icon: Baby, label: "Manage Kids", href: "/parent/children", group: "My Family" },
  { icon: LayoutGrid, label: "Moments", href: "/parent/moments", group: "My Family" },
  { icon: Images, label: "Gallery", href: "/parent/gallery", group: "My Family" },
  { icon: TrendingUp, label: "Growth", href: "/parent/child/growth", group: "Health & Care", isNew: true },
  { icon: Pill, label: "Medication", href: "/parent/medication", group: "Health & Care", isNew: true },
  { icon: AlertTriangle, label: "Incidents", href: "/parent/incidents", group: "Health & Care", isNew: true },
  { icon: Search, label: "Find Creche", href: "/parent/creche", group: "Creche Life" },
  { icon: CalendarCheck, label: "Attendance", href: "/parent/attendance", group: "Creche Life", badge: 3 },
  { iconNode: <AnimatedRequestIcon />, label: "Special Requests", href: "/parent/special-requests", group: "Creche Life" },
  { icon: CalendarDays, label: "Events", href: "/parent/events", group: "Creche Life", isNew: true },
  { icon: Megaphone, label: "Announcements", href: "/parent/announcements", group: "Creche Life", isNew: true },
  { icon: FileText, label: "Enrollments", href: "/parent/enrollments", group: "Creche Life", isNew: true },
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

/* ─── Full-screen image viewer ─── */
function FullScreenViewer({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: initialIndex * scrollRef.current.clientWidth, behavior: "instant" });
    }
  }, [initialIndex]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    setIdx(Math.round(scrollLeft / clientWidth));
  }, []);

  const go = useCallback((dir: -1 | 1) => {
    if (!scrollRef.current) return;
    const next = Math.max(0, Math.min(images.length - 1, idx + dir));
    scrollRef.current.scrollTo({ left: next * scrollRef.current.clientWidth, behavior: "smooth" });
  }, [idx, images.length]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      go(dx > 0 ? -1 : 1);
    } else if (Math.abs(dy) > 80 && dy > 0) {
      onClose();
    }
    touchStart.current = null;
  }, [go, onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 z-10">
        <span className="text-sm font-semibold text-white/80">{idx + 1} / {images.length}</span>
        <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 active:bg-white/30">
          <X size={20} className="text-white" />
        </button>
      </div>

      {/* Swipeable images */}
      <div
        ref={scrollRef}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, i) => (
          <div key={i} className="w-full shrink-0 snap-center flex items-center justify-center px-2">
            <SafeImage
              src={src}
              alt={`Photo ${i + 1}`}
              className="max-h-full w-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows (desktop) */}
      {idx > 0 && (
        <button
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white active:scale-95 hidden md:flex"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {idx < images.length - 1 && (
        <button
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm text-white active:scale-95 hidden md:flex"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 pb-4 pt-2">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? "w-5 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Image Strip (horizontal scroll, consistent height) ─── */
function ImageStrip({
  images,
  title,
  onDoubleTap,
  onImageClick,
  isVideo,
}: {
  images: string[];
  title: string;
  onDoubleTap: () => void;
  onImageClick: (index: number) => void;
  isVideo?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const lastTap = useRef(0);

  const handleTap = useCallback((index: number) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      onDoubleTap();
    } else {
      onImageClick(index);
    }
    lastTap.current = now;
  }, [onDoubleTap, onImageClick]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    setIdx(Math.round(scrollLeft / clientWidth));
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
            className="shrink-0 snap-start cursor-pointer px-1"
            style={{ width: isVideo ? "85%" : "75%" }}
            onClick={() => handleTap(i)}
          >
            <div className="relative w-full h-[38vh] rounded-xl overflow-hidden">
              <SafeImage
                src={src}
                alt={`${title} — ${i + 1}`}
                className="w-full h-full object-cover"
              />
              {isVideo && i === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
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

function PostCard({
  item,
  onTagClick,
  onOpenViewer,
}: {
  item: FeedItem;
  onTagClick: (tag: string) => void;
  onOpenViewer: (images: string[], index: number) => void;
}) {
  const user = getPostUser(item.postedBy);
  const images = item.images?.length ? item.images : [];
  const [liked, setLiked] = useState(false);
  const [likeEmoji, setLikeEmoji] = useState("👍");
  const [showReactions, setShowReactions] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const caption = item.title ?? "";
  const hasParagraphs = caption.includes("\n\n");
  const isLong = caption.length > 120;

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

  const handleImageClick = useCallback((index: number) => {
    onOpenViewer(images, index);
  }, [images, onOpenViewer]);

  const renderCaption = () => {
    if (!caption) return null;

    if (hasParagraphs) {
      const parts = caption.split("\n\n");
      if (expanded) {
        return (
          <>
            {parts.map((p, i) => (
              <p key={i} className="text-sm text-gray-800 leading-relaxed mb-2">{p}</p>
            ))}
            <button onClick={() => setExpanded(false)} className="text-sm text-gray-400 font-medium">show less</button>
          </>
        );
      }
      return (
        <>
          <p className="text-sm text-gray-800 leading-relaxed">{parts[0]}</p>
          {parts.length > 1 && (
            <button onClick={() => setExpanded(true)} className="text-sm text-gray-400 font-medium mt-0.5">...see more</button>
          )}
        </>
      );
    }

    if (isLong) {
      if (expanded) {
        return (
          <>
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{caption}</p>
            <button onClick={() => setExpanded(false)} className="text-sm text-gray-400 font-medium mt-0.5">show less</button>
          </>
        );
      }
      return (
        <>
          <p className="text-sm text-gray-800 leading-relaxed">{caption.slice(0, 120)}...</p>
          <button onClick={() => setExpanded(true)} className="text-sm text-gray-400 font-medium mt-0.5">see more</button>
        </>
      );
    }

    return <p className="text-sm text-gray-800 leading-relaxed">{caption}</p>;
  };

  return (
    <div className="py-6 border-b border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: user.color }}
        >
          {user.avatar}
        </div>
        <div>
          <span className="text-sm font-bold text-gray-900">{user.name}</span>
          <p className="text-[11px] text-gray-400">{user.role} · {item.timestamp ? formatTimeAgo(item.timestamp) : "now"}</p>
        </div>
      </div>

      {/* Caption */}
      <div className="mb-3">
        {renderCaption()}
      </div>

      {/* Image strip */}
      {images.length > 0 && (
        <div className="mt-3 overflow-hidden border-b border-gray-100 relative">
          <ImageStrip
            images={images}
            title={item.title ?? ""}
            onDoubleTap={handleDoubleTap}
            onImageClick={handleImageClick}
            isVideo={item.hasVideo}
          />
          {showHeart && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-6xl animate-bounce-in drop-shadow-lg">❤️</span>
            </div>
          )}
        </div>
      )}

      {/* Tag + actions */}
      <div className="mt-3">
        {item.tag && (
          <button
            onClick={() => onTagClick(item.tag!)}
            className="inline-block rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 mb-2 active:bg-amber-100 transition-colors"
          >
            #{item.tag}
          </button>
        )}

        {images.length > 0 && (
          <div className="flex items-center gap-4">
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
                <ReactionPicker onSelect={handleReaction} onClose={() => setShowReactions(false)} />
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
          </div>
        )}
      </div>
    </div>
  );
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();

  const groups = ALL_ACTIONS.reduce<Record<string, typeof ALL_ACTIONS>>((acc, a) => {
    (acc[a.group] ??= []).push(a);
    return acc;
  }, {});

  const handleNav = useCallback((href: string) => {
    onClose();
    router.push(href);
  }, [onClose, router]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex flex-col bg-white h-full animate-slide-down origin-top">
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-lg font-bold text-gray-900">Menu</h2>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 active:bg-gray-200">
            <X size={18} className="text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          {Object.entries(groups).map(([group, actions]) => (
            <div key={group} className="mb-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{group}</p>
              <div className="grid grid-cols-4 gap-3">
                {actions.map((a) => (
                  <button
                    key={a.href}
                    onClick={() => handleNav(a.href)}
                    className="flex flex-col items-center gap-1.5 rounded-xl p-3 active:bg-gray-50 transition-colors relative"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                      {a.iconNode ? (
                        <div className="flex h-6 w-6 items-center justify-center text-cg-brand">{a.iconNode}</div>
                      ) : (
                        <a.icon size={20} className="text-cg-brand" />
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-gray-700 leading-tight text-center">{a.label}</span>
                    {a.isNew && (
                      <span className="absolute top-1 right-1 rounded-full bg-cg-brand px-1.5 py-0.5 text-[7px] font-bold text-white">New</span>
                    )}
                    {"badge" in a && a.badge && (
                      <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[8px] font-bold text-white">
                        {a.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ParentHomePage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Full-screen viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    setFeedItems(getFeedItems());
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setScrolled(scrollRef.current.scrollTop > 200);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredFeed = feedItems
    .filter((i) => i.images && i.images.length > 0)
    .filter((i) => activeTag ? i.tag === activeTag : true);

  const openViewer = useCallback((images: string[], index: number) => {
    setViewerImages(images);
    setViewerIndex(index);
    setViewerOpen(true);
  }, []);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      {/* Fixed Header */}
      <div className="shrink-0 bg-[#fffefa] px-6 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-full bg-[#f4f5f6] px-3 py-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-cg-brand text-[10px] font-bold text-white">
              {mockParentUser.avatarInitials}
            </div>
            <div>
              <p className="text-[10px] text-gray-500">Welcome Back,</p>
              <p className="text-xs font-medium text-gray-800">{mockParentUser.name}&apos;s</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/parent/mood" className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1.5">
              <Smile size={14} className="text-amber-500" />
              <span className="text-xs font-bold text-amber-700">89</span>
            </Link>
            <Link href="/parent/notifications" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f5f6]">
              <Bell size={20} className="text-gray-600" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto px-6 pb-4">
        {/* Scan CTA */}
        <Link href="/parent/scan" className="mt-3 flex items-center justify-center gap-2.5 rounded-xl bg-cg-brand px-4 py-3 text-white active:scale-[0.98] transition-transform">
          <ScanLine size={18} />
          <span className="text-sm font-semibold">Scan attendance code</span>
          <span className="inline-flex shrink-0 items-center rounded-full bg-white/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">New</span>
        </Link>

        {/* Check-in status */}
        <Link href="/parent/attendance" className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-50 px-3.5 py-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
            <LogIn size={13} />
          </span>
          <p className="flex-1 text-xs font-semibold text-emerald-800">
            {mockAttendanceHistory[0].checkInTime
              ? `${mockChild.name} checked in at ${mockAttendanceHistory[0].checkInTime}`
              : `${mockChild.name} hasn't checked in yet today`}
          </p>
          <span className="text-[10px] font-semibold text-emerald-600">Details</span>
        </Link>

        {/* Moments Feed */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-600">Moments</p>
            {activeTag && (
              <button
                onClick={() => setActiveTag(null)}
                className="flex items-center gap-1 rounded-full bg-cg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-cg-brand active:bg-cg-brand/20"
              >
                <span>#{activeTag}</span>
                <X size={12} />
              </button>
            )}
          </div>

          {filteredFeed.length > 0 ? (
            <div>
              {filteredFeed.map((item) => (
                <PostCard
                  key={item.id}
                  item={item}
                  onTagClick={setActiveTag}
                  onOpenViewer={openViewer}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10">
              <p className="text-sm font-semibold text-gray-500">No posts with this tag</p>
              <button onClick={() => setActiveTag(null)} className="mt-2 text-xs text-cg-brand font-medium">
                Clear filter
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FAB — menu or scroll-to-top */}
      <button
        onClick={scrolled ? scrollToTop : () => setMenuOpen(true)}
        aria-label={scrolled ? "Scroll to top" : "Open menu"}
        className="absolute bottom-[86px] right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-cg-brand text-white shadow-[0_12px_30px_rgba(59,37,19,0.28)] active:scale-95 transition-all duration-300"
      >
        {scrolled ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        ) : (
          <>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              3
            </span>
          </>
        )}
      </button>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Full-screen image viewer */}
      {viewerOpen && (
        <FullScreenViewer
          images={viewerImages}
          initialIndex={viewerIndex}
          onClose={() => setViewerOpen(false)}
        />
      )}

      <ParentBottomNav />
    </div>
  );
}
