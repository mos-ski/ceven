"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type StoryPhoto = {
  id: string;
  label: string;
  caption: string;
  image: string;
  date: string;
  child?: string;
};

type Props = {
  photos: StoryPhoto[];
  initialIndex: number;
  onClose: () => void;
};

const STORY_DURATION_MS = 5000;

export function StoryViewer({ photos, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const photo = photos[index];

  function goPrevious() {
    setIndex((current) => Math.max(0, current - 1));
  }

  function goNext() {
    setIndex((current) => {
      if (current >= photos.length - 1) {
        onClose();
        return current;
      }
      return current + 1;
    });
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrevious();
      if (event.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIndex((current) => {
        if (current >= photos.length - 1) {
          onClose();
          return current;
        }
        return current + 1;
      });
    }, STORY_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [index, onClose, photos.length]);

  if (!photo) return null;

  return (
    <div
      className="absolute inset-0 z-[100] flex flex-col overflow-hidden bg-black text-white"
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchStart === null) return;
        const delta = event.changedTouches[0].clientX - touchStart;
        if (delta > 48) goPrevious();
        if (delta < -48) goNext();
        setTouchStart(null);
      }}
    >
      <style>{`
        @keyframes ceven-story-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
      <div className="absolute left-0 right-0 top-0 z-20 bg-gradient-to-b from-black/70 to-transparent px-4 pb-12 pt-4">
        <div className="mb-4 flex gap-1">
          {photos.map((item, photoIndex) => (
            <div key={item.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              <div
                key={`${item.id}-${index}`}
                className={`h-full rounded-full bg-white ${photoIndex < index ? "w-full" : "w-0"}`}
                style={
                  photoIndex === index
                    ? { animation: `ceven-story-progress ${STORY_DURATION_MS}ms linear forwards` }
                    : undefined
                }
              />
            </div>
          ))}
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-white/70">{photo.date}</p>
            <p className="truncate text-lg font-bold">{photo.label}</p>
            {photo.child && <p className="text-sm font-semibold text-white/80">{photo.child}</p>}
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur"
            aria-label="Close gallery viewer"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <img src={photo.image} alt={photo.caption} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

      <button
        onClick={goPrevious}
        disabled={index === 0}
        className="absolute left-0 top-24 z-10 h-[calc(100%-12rem)] w-1/3 disabled:cursor-default"
        aria-label="Previous photo"
      />
      <button
        onClick={goNext}
        className="absolute right-0 top-24 z-10 h-[calc(100%-12rem)] w-1/3"
        aria-label="Next photo"
      />

      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/70 to-transparent px-5 pb-8 pt-16">
        <p className="text-base font-semibold leading-snug">{photo.caption}</p>
        <div className="mt-4 flex items-center justify-between text-xs font-bold text-white/70">
          <button
            onClick={goPrevious}
            disabled={index === 0}
            className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-2 disabled:opacity-30"
          >
            <ChevronLeft size={14} />
            Previous
          </button>
          <span>{index + 1} / {photos.length}</span>
          <button onClick={goNext} className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-2">
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
