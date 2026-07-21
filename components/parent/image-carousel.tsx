"use client";

import { useRef, useState } from "react";
import { SafeImage } from "@/components/ui/safe-image";

export function ImageCarousel({
  images,
  alt,
  heightClass = "h-52",
}: {
  images: string[];
  alt: string;
  heightClass?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  if (images.length === 1) {
    return <SafeImage src={images[0]} alt={alt} className={`${heightClass} w-full`} />;
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.min(images.length - 1, Math.max(0, index)));
  }

  return (
    <div className={`relative ${heightClass} w-full overflow-hidden`}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((src, i) => (
          <div key={i} className="h-full w-full shrink-0 snap-center">
            <SafeImage src={src} alt={`${alt} (${i + 1}/${images.length})`} className="h-full w-full" />
          </div>
        ))}
      </div>

      <span className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white">
        {activeIndex + 1}/{images.length}
      </span>

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
