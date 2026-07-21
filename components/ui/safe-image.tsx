"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

export function SafeImage({
  src,
  alt,
  className = "",
  fallbackClassName = "",
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {state === "loading" && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse ${fallbackClassName}`}>
          <div className="h-6 w-6 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin" />
        </div>
      )}
      {state === "error" && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-1 bg-gray-100 ${fallbackClassName}`}>
          <ImageIcon size={20} className="text-gray-300" />
          <span className="text-[10px] text-gray-400">Image unavailable</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${state === "loaded" ? "opacity-100" : "opacity-0"} transition-opacity`}
        onLoad={() => setState("loaded")}
        onError={() => setState("error")}
      />
    </div>
  );
}
