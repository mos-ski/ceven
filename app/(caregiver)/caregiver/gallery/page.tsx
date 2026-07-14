"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { mockGallery } from "@/lib/caregiver/mock-data";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { StoryViewer } from "@/components/gallery/story-viewer";

export default function GalleryPage() {
  const router = useRouter();
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
    <div className="relative flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button onClick={() => router.back()}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-base font-bold text-cg-brand">Gallery</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {Object.entries(grouped).map(([date, photos]) => (
          <div key={date} className="mb-5">
            <p className="mb-2 text-xs font-semibold text-gray-400">{date}</p>
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setActiveIndex(mockGallery.findIndex((item) => item.id === photo.id))}
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
                    <p className="text-xs font-semibold text-cg-brand">{photo.child}</p>
                    <p className="leading-relaxed text-[10px] text-gray-400">{photo.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <LogSheet />
      <BottomNav />
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
