"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, MessageSquare, Bookmark, Play, Camera } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { MomentCreatorSheet } from "@/components/parent/moment-creator-sheet";
import { SafeImage } from "@/components/ui/safe-image";
import { mockFeedPosts, mockParentChildren } from "@/lib/parent/mock-data";

export default function MomentsPage() {
  const router = useRouter();
  const [showCreator, setShowCreator] = useState(false);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Moments</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {mockFeedPosts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {mockFeedPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => router.push("/parent/gallery")}
                className="overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
              >
                <div className="relative h-52 overflow-hidden bg-cg-quick-action">
                  <SafeImage
                    src={post.image}
                    alt={post.caption}
                    className="h-full w-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 rounded-md bg-cg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
                    {post.tag}
                  </div>
                  {post.hasVideo && (
                    <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80">
                      <Play size={14} className="ml-0.5 text-cg-brand" fill="currentColor" />
                    </div>
                  )}
                </div>

                <div className="px-4 py-3">
                  <p className="mb-2 text-sm font-medium text-gray-800 leading-snug">{post.caption}</p>
                  <div className="mb-3 flex items-center gap-1">
                    <span className="text-xs text-gray-400">{post.timeAgo}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">Posted by {post.postedBy}</span>
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
            ))}
          </div>
        ) : (
          <EmptyFeed />
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

function EmptyFeed() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="flex flex-col items-center gap-2 text-center">
        <ScrollIcon />
        <p className="text-base font-semibold text-gray-800">No Moments Yet!</p>
        <p className="text-sm text-gray-400">Tap the camera button to share a moment.</p>
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
