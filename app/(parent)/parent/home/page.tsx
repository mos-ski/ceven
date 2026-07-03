"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, MessageSquare, Bookmark, Play, Clock, LayoutGrid } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockParentUser, mockFeedPosts } from "@/lib/parent/mock-data";

type Tab = "moments" | "special";

export default function ParentHomePage() {
  const [tab, setTab] = useState<Tab>("moments");
  const router = useRouter();

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="shrink-0 px-6 pt-4 pb-3">
        {/* Header */}
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
          <Link
            href="/parent/notifications"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f5f6]"
          >
            <Bell size={20} className="text-gray-600" />
          </Link>
        </div>

        {/* Tab switcher */}
        <div className="mt-3 flex rounded-lg bg-[#f4f5f6] p-[3px]">
          <button
            onClick={() => setTab("moments")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-semibold transition-colors ${
              tab === "moments"
                ? "bg-cg-brand text-white"
                : "text-gray-800"
            }`}
          >
            <LayoutGrid size={14} />
            Moments
          </button>
          <button
            onClick={() => setTab("special")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
              tab === "special"
                ? "bg-cg-brand text-white"
                : "text-gray-800"
            }`}
          >
            Special Requests
            <Clock size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-4">
        {tab === "moments" ? (
          mockFeedPosts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {mockFeedPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => router.push("/parent/gallery")}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
                >
                  {/* Photo/Video placeholder */}
                  <div className="relative h-52 bg-cg-quick-action">
                    {/* Tag badge */}
                    <div className="absolute left-3 top-3 rounded-md bg-cg-brand px-2.5 py-1 text-[11px] font-semibold text-white">
                      {post.tag}
                    </div>
                    {/* Video play icon */}
                    {post.hasVideo && (
                      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80">
                        <Play size={14} className="ml-0.5 text-cg-brand" fill="currentColor" />
                      </div>
                    )}
                    {/* Placeholder image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-cg-accent-muted/40" />
                    </div>
                  </div>

                  {/* Content */}
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
          )
        ) : (
          <EmptyFeed label="No Special Requests Yet!" sub="Special requests will appear here." />
        )}
      </div>

      <ParentBottomNav />
    </div>
  );
}

function EmptyFeed({
  label = "No Feed Available Yet!",
  sub = "Feeds will appear here once data is available.",
}: {
  label?: string;
  sub?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="flex flex-col items-center gap-2 text-center">
        <ScrollIcon />
        <p className="text-base font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-gray-400">{sub}</p>
      </div>
      <Link
        href="/parent/settings/profile"
        className="flex h-11 w-full items-center justify-center rounded-lg bg-cg-brand text-sm font-semibold text-white"
      >
        Update Profile
      </Link>
    </div>
  );
}

function ScrollIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 97 97" fill="none" className="mb-1">
      <rect width="97" height="97" rx="48.5" fill="none" />
      <path
        d="M65 30H40a8 8 0 0 0-8 8v32a8 8 0 0 0 8 8h20a8 8 0 0 0 8-8V38a8 8 0 0 0-8-8z"
        fill="#1F2937"
        opacity="0.9"
      />
      <path d="M44 45h16M44 51h16M44 57h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M40 30c-4.4 0-8 3.6-8 8v2c0-4.4 3.6-8 8-8h4l-4-2z"
        fill="#1F2937"
        opacity="0.6"
      />
    </svg>
  );
}
