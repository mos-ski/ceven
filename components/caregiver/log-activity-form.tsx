"use client";

import { useState, useRef } from "react";
import { ChevronDown, Upload, FileText, X } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";

const ACTIVITY_TAGS = [
  "Playtime",
  "Eating",
  "Sleeping",
  "Breakfast",
  "Learning Activity",
  "Music Time",
  "Creative Play",
  "Indoor Play",
];

export function LogActivityForm() {
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { close } = useLogSheet();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) setUploadedFiles((prev) => [...prev, f.name]);
    e.target.value = "";
  }

  function handleSubmit() {
    if (!tag) return;
    setShowSuccess(true);
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center gap-3 py-12">
        <p className="text-xl font-bold text-cg-brand" style={{ fontFamily: "var(--font-merriweather)" }}>
          Success
        </p>
        <p className="text-center text-sm text-gray-500">
          The child&apos;s activities have been successfully logged.
        </p>
        <button
          onClick={close}
          className="mt-4 w-full rounded-xl bg-cg-brand py-3.5 text-sm font-semibold text-white"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Activity Tag */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">
          Activity Tag <span className="text-red-500">*</span>
        </p>
        <div className="relative">
          <button
            onClick={() => setShowTagDropdown(!showTagDropdown)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
          >
            <span className={tag ? "text-cg-brand font-medium" : "text-gray-300"}>{tag || "Select activity tag"}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showTagDropdown && (
            <div className="absolute z-10 mt-1 w-1/2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
              {ACTIVITY_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTag(t); setShowTagDropdown(false); }}
                  className={`w-full px-4 py-2.5 text-left text-sm text-cg-brand hover:bg-gray-50 ${t === tag ? "bg-cg-quick-action font-semibold" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">
          Description <span className="text-red-500">*</span>
        </p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about the activity..."
          rows={4}
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
        />
      </div>

      {/* Photo */}
      <div>
        <p className="mb-1.5 text-sm font-medium text-gray-700">Photo</p>
        <input ref={fileRef} type="file" accept=".png,.jpg,.jpeg,.mp4" className="hidden" onChange={handleFileChange} />

        {uploadedFiles.length === 0 ? (
          <button
            onClick={() => fileRef.current?.click()}
            className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-gray-200 bg-gray-50 py-6"
          >
            <Upload size={20} className="text-gray-400" />
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-cg-brand">Tap to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">PNG, JPG or MP4 (max. 10mb)</p>
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            {uploadedFiles.map((name, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cg-quick-action">
                  <FileText size={16} className="text-cg-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-xs font-medium text-cg-brand">{name}</p>
                    <button onClick={() => setUploadedFiles((p) => p.filter((_, idx) => idx !== i))} className="ml-2 shrink-0">
                      <X size={14} className="text-red-400" />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400">650 KB</p>
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-full rounded-full bg-cg-brand" />
                  </div>
                </div>
                <span className="ml-1 shrink-0 text-xs text-gray-500">100%</span>
              </div>
            ))}
            <button onClick={() => fileRef.current?.click()} className="flex items-center gap-1.5 py-1 text-xs text-gray-500">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-[10px] text-gray-400">+</span>
              Add more photos
            </button>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!tag}
        className="w-full rounded-xl bg-cg-accent-muted py-3.5 text-sm font-semibold text-cg-brand disabled:opacity-40"
      >
        Log Activity
      </button>
    </div>
  );
}
