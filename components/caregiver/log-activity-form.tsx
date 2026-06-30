"use client";

import { useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
import { useLogSheet } from "./log-sheet-context";

const ACTIVITY_TAGS = ["Medication", "Meal", "Nap", "Play", "Incident", "Other"];

export function LogActivityForm() {
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const { close } = useLogSheet();

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
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-400"
          >
            <span className={tag ? "text-cg-brand" : ""}>{tag || "Select activity tag"}</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          {showTagDropdown && (
            <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-100 bg-white shadow-lg">
              {ACTIVITY_TAGS.map((t) => (
                <button
                  key={t}
                  onClick={() => { setTag(t); setShowTagDropdown(false); }}
                  className="w-full px-4 py-3 text-left text-sm text-cg-brand hover:bg-gray-50"
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
          className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-cg-brand placeholder:text-gray-300 focus:border-cg-accent focus:outline-none"
        />
      </div>

      {/* Media upload */}
      <div className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-white py-6">
        <Upload size={22} className="text-gray-400" />
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-cg-brand">Tap to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-400">PNG, JPG or MP4 (max. 10mb)</p>
      </div>

      {/* Submit */}
      <button
        onClick={close}
        className="w-full rounded-xl bg-cg-accent-muted py-3.5 text-sm font-semibold text-cg-brand"
      >
        Log Activity
      </button>
    </div>
  );
}
