"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Grid3X3, Folder } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockGallery } from "@/lib/parent/mock-data";
import { StoryViewer } from "@/components/gallery/story-viewer";

type Tab = "photos" | "folders";

export default function GalleryPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("photos");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const photos = mockGallery;

  const grouped = photos.reduce<Record<string, typeof photos>>(
    (acc, photo) => {
      if (!acc[photo.date]) acc[photo.date] = [];
      acc[photo.date].push(photo);
      return acc;
    },
    {}
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#fffefa]">
      <div className="flex items-center gap-3 bg-white px-5 pt-12 pb-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Gallery</h1>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b border-gray-100 bg-white px-5">
        <button
          onClick={() => setTab("photos")}
          className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
            tab === "photos" ? "border-b-2 border-cg-brand text-cg-brand" : "text-gray-400"
          }`}
        >
          <Grid3X3 size={16} />
          All Photos
        </button>
        <button
          onClick={() => setTab("folders")}
          className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
            tab === "folders" ? "border-b-2 border-cg-brand text-cg-brand" : "text-gray-400"
          }`}
        >
          <Folder size={16} />
          Folders
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {tab === "photos" ? (
          /* All Photos — 3-column grid */
          <div className="grid grid-cols-3 gap-1.5">
            {photos.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setActiveIndex(photos.findIndex((p) => p.id === photo.id))}
                className="relative aspect-square overflow-hidden rounded-lg active:scale-[0.97] transition-transform"
              >
                <img
                  src={photo.image}
                  alt={photo.caption}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
        ) : (
          /* Folders — grouped by date */
          Object.entries(grouped).map(([date, datePhotos]) => (
            <div key={date} className="mb-5">
              <p className="mb-2 text-xs font-semibold text-gray-400">{date}</p>
              <div className="grid grid-cols-2 gap-3">
                {datePhotos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => setActiveIndex(photos.findIndex((p) => p.id === photo.id))}
                    className="overflow-hidden rounded-2xl bg-white text-left shadow-sm active:scale-[0.98]"
                  >
                    <div className="relative h-32 overflow-hidden bg-cg-quick-action">
                      <img
                        src={photo.image}
                        alt={photo.caption}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                      <div className="absolute left-2 top-2 rounded-md bg-cg-brand px-2 py-0.5 text-[10px] font-semibold text-white">
                        {photo.label}
                      </div>
                    </div>
                    <div className="p-2.5">
                      <p className="leading-relaxed text-[10px] text-gray-400">{photo.caption}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <ParentBottomNav />
      {activeIndex !== null && (
        <StoryViewer
          photos={mockGallery}
          initialIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
}
