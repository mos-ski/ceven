"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { ParentBottomNav } from "@/components/parent/bottom-nav";
import { mockGallery } from "@/lib/parent/mock-data";

export default function GalleryPage() {
  const router = useRouter();

  const grouped = mockGallery.reduce<Record<string, typeof mockGallery>>(
    (acc, photo) => {
      if (!acc[photo.date]) acc[photo.date] = [];
      acc[photo.date].push(photo);
      return acc;
    },
    {}
  );

  return (
    <div className="flex flex-1 flex-col bg-cg-bg">
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
                <div key={photo.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  <div className="relative flex h-32 items-center justify-center bg-cg-quick-action">
                    <ImageIcon size={32} className="text-cg-accent-muted" />
                    <div className="absolute left-2 top-2 rounded-md bg-cg-brand px-2 py-0.5 text-[10px] font-semibold text-white">
                      {photo.label}
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="leading-relaxed text-[10px] text-gray-400">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ParentBottomNav />
    </div>
  );
}
