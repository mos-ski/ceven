"use client";

import { useState, useRef } from "react";
import {
  Camera, Video, Image as ImageIcon, X, Send, ChevronDown,
} from "lucide-react";
import type { ChildInfo } from "@/lib/parent/mock-data";

export function MomentCreatorSheet({
  children,
  onClose,
}: {
  children: ChildInfo[];
  onClose: () => void;
}) {
  const [caption, setCaption] = useState("");
  const [selectedChildId, setSelectedChildId] = useState<string>(children[0]?.id ?? "");
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"photo" | "video" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const selectedChild = children.find(c => c.id === selectedChildId);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>, type: "photo" | "video") {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setMediaPreview(url);
    setMediaType(type);
  }

  function handlePost() {
    // In a real app this would upload to a server
    onClose();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-[430px] rounded-t-3xl bg-white pb-6 animate-slide-up">
        {/* Handle */}
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-gray-200" />

        <div className="flex items-center justify-between px-5 pb-3">
          <h2 className="text-base font-bold text-gray-800">New Moment</h2>
          <button onClick={onClose}>
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Child selector */}
        <div className="px-5 pb-3">
          <label className="mb-1 block text-xs font-semibold text-gray-400">Posting as</label>
          <div className="relative">
            <select
              value={selectedChildId}
              onChange={e => setSelectedChildId(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:border-cg-brand focus:outline-none"
            >
              {children.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Media area */}
        <div className="px-5 pb-3">
          {mediaPreview ? (
            <div className="relative overflow-hidden rounded-2xl bg-gray-100">
              {mediaType === "video" ? (
                <video src={mediaPreview} className="h-48 w-full object-cover" controls />
              ) : (
                <img src={mediaPreview} alt="Preview" className="h-48 w-full object-cover" />
              )}
              <button
                onClick={() => { setMediaPreview(null); setMediaType(null); }}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50"
              >
                <X size={14} className="text-white" />
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => cameraInputRef.current?.click()}
                className="flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-6 transition-colors hover:border-cg-brand hover:bg-cg-brand/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                  <Camera size={22} className="text-blue-500" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Camera</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-6 transition-colors hover:border-cg-brand hover:bg-cg-brand/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50">
                  <ImageIcon size={22} className="text-purple-500" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Gallery</span>
              </button>
              <button
                onClick={() => videoInputRef.current?.click()}
                className="flex flex-1 flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-6 transition-colors hover:border-cg-brand hover:bg-cg-brand/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
                  <Video size={22} className="text-red-500" />
                </div>
                <span className="text-xs font-semibold text-gray-500">Video</span>
              </button>
            </div>
          )}

          {/* Hidden file inputs */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={e => handleFileSelect(e, "photo")}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => handleFileSelect(e, "photo")}
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            capture="environment"
            className="hidden"
            onChange={e => handleFileSelect(e, "video")}
          />
        </div>

        {/* Caption */}
        <div className="px-5 pb-4">
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Add a caption..."
            rows={3}
            className="w-full resize-none rounded-xl border border-gray-100 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-cg-brand focus:outline-none"
          />
        </div>

        {/* Post button */}
        <div className="px-5">
          <button
            onClick={handlePost}
            disabled={!mediaPreview || !caption.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cg-brand py-3 text-sm font-semibold text-[#FAF2E1] disabled:opacity-40"
          >
            <Send size={14} />
            Post Moment
          </button>
        </div>
      </div>
    </div>
  );
}
