"use client";

import { Upload } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SuccessModal from "@/components/dashboard/success-modal";
import { CHILDREN, type Child } from "@/lib/mock-data/children";
import { INCIDENT_TYPES } from "@/lib/mock-data/daily-operations";

export type LogActivityMode = "daily-report" | "media" | "incident";

const MODE_COPY: Record<LogActivityMode, { title: string; description: string; submitLabel: string; successTitle: string; successDescription: string }> = {
  "daily-report": {
    title: "Log Daily Report",
    description: "Record today's mood, meals, nap and activity for this child.",
    submitLabel: "Save Daily Report",
    successTitle: "Daily Report Logged",
    successDescription: "The daily report has been saved and is visible in the child's Activity Log.",
  },
  media: {
    title: "New Picture/Video",
    description: "Upload a photo or video to this child's activity log.",
    submitLabel: "Upload",
    successTitle: "Media Uploaded",
    successDescription: "The picture/video has been added to the child's Activity Log.",
  },
  incident: {
    title: "Log Incident",
    description: "Log a health or safety incident involving a child.",
    submitLabel: "Submit Report",
    successTitle: "Incident Logged",
    successDescription: "The incident has been recorded and the relevant staff notified.",
  },
};

function ChildSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="log-activity-child">Child</Label>
      <select
        id="log-activity-child"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
      >
        <option value="" disabled>
          Select a child
        </option>
        {CHILDREN.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function LogActivityModal({
  mode,
  child,
  onClose,
}: {
  mode: LogActivityMode;
  child?: Child;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedChild, setSelectedChild] = useState(child?.name ?? "");
  const copy = MODE_COPY[mode];

  if (submitted) {
    return (
      <SuccessModal title={copy.successTitle} description={copy.successDescription} onClose={onClose} />
    );
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">{copy.description}</p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          {!child && <ChildSelect value={selectedChild} onChange={setSelectedChild} />}

          {mode === "daily-report" && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dr-mood">Mood</Label>
                  <select
                    id="dr-mood"
                    defaultValue=""
                    className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
                  >
                    <option value="" disabled>
                      Select mood
                    </option>
                    {["Happy, Energetic", "Calm", "Sad", "Fussy", "Tired"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dr-breakfast">Breakfast</Label>
                  <select
                    id="dr-breakfast"
                    defaultValue=""
                    className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {["Ate all", "Ate some", "Didn't finish", "Refused"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dr-nap">Nap Duration</Label>
                  <Input id="dr-nap" placeholder="e.g. 2 hrs 20 minutes" className="h-9" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dr-lunch">Lunch</Label>
                  <select
                    id="dr-lunch"
                    defaultValue=""
                    className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {["Ate all", "Ate some", "Didn't finish", "Refused"].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dr-activity">Activity</Label>
                  <Input id="dr-activity" placeholder="e.g. Had lots of fun" className="h-9" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dr-diaper">Diaper Changes</Label>
                  <Input id="dr-diaper" placeholder="e.g. Twice" className="h-9" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="dr-note">Caregiver Note</Label>
                <textarea
                  id="dr-note"
                  rows={3}
                  placeholder="Additional note for parents..."
                  className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
                />
              </div>
            </>
          )}

          {mode === "media" && (
            <>
              <div className="rounded-lg border-2 border-dashed border-[#d0d5dd] p-6 text-center">
                <Upload className="mx-auto mb-2 size-6 text-[#9ca3af]" />
                <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
                  Drop a photo or video here or{" "}
                  <span className="cursor-pointer text-[#3b2513] underline">browse</span>
                </p>
                <p className="mt-1 font-[family-name:var(--font-nunito)] text-xs text-[#9ca3af]">
                  JPEG, PNG, MP4. Max 25 MB
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="media-caption">Caption</Label>
                <textarea
                  id="media-caption"
                  rows={3}
                  placeholder="Describe what's happening in this picture/video..."
                  className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
                />
              </div>
            </>
          )}

          {mode === "incident" && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="inc-type">Incident Type</Label>
                  <select
                    id="inc-type"
                    defaultValue=""
                    className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {INCIDENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="inc-severity">Severity</Label>
                  <select
                    id="inc-severity"
                    defaultValue="Minor"
                    className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
                  >
                    <option value="Minor">Minor</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="inc-time">Time of Incident</Label>
                <Input id="inc-time" type="time" className="h-9" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="inc-description">Description</Label>
                <textarea
                  id="inc-description"
                  rows={4}
                  placeholder="Describe what happened, actions taken, and any follow-up required..."
                  className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="inc-notify" className="h-4 w-4 accent-[#3b2513]" />
                <Label htmlFor="inc-notify" className="font-[family-name:var(--font-nunito)] text-sm font-normal text-[#2d1810]">
                  Notify parent/guardian immediately
                </Label>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="outline"
                className="h-9 rounded-lg border-[#d0d5dd] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#2d1810]"
              />
            }
          >
            Cancel
          </DialogClose>
          <Button
            onClick={() => setSubmitted(true)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1]"
          >
            {copy.submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
