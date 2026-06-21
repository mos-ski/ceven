"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FieldGroup, SelectField, TextField } from "@/components/admin/children/form-fields";
import { SuccessModal } from "@/components/admin/children/success-modal";
import { ROOMS } from "@/lib/mock-data/children";

const ROOM_EMOJIS = ["🦁", "🐼", "🦉", "🐻", "🐰", "🐯", "🦋", "🐢"];
const AGE_RANGES = ["0 - 2 yrs", "2 - 3 yrs", "3 - 4 yrs", "4 - 5 yrs", "5 - 6 yrs"];

function CreateRoomModal({
  open,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
}) {
  const [icon, setIcon] = useState("🦁");
  const [waitlistEnabled, setWaitlistEnabled] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[640px]" showCloseButton={false}>
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
          <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">New Room</h2>
          <button onClick={() => onOpenChange(false)} className="text-[#6b7280] hover:text-[#2d1810]">
            <X className="size-6" />
          </button>
        </div>
        <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
          <FieldGroup label="Room Name" required>
            <div className="flex gap-2">
              <div className="flex-1">
                <TextField placeholder="e.g. Sun Flower" />
              </div>
              <div className="relative">
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="h-[52px] w-20 appearance-none rounded-lg border border-[#d0d5dd] bg-white text-center text-xl focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
                >
                  {ROOM_EMOJIS.map((emoji) => (
                    <option key={emoji} value={emoji}>
                      {emoji}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </FieldGroup>
          <FieldGroup label="Age Range" required>
            <SelectField options={AGE_RANGES} placeholder="Select age range" />
          </FieldGroup>
          <FieldGroup label="Capacity" required>
            <TextField type="number" placeholder="Max this room can take" />
          </FieldGroup>
          <FieldGroup label="Assign Caregiver">
            <SelectField options={["Mrs. Sarah Okonkwo", "Mr. Tunde Bakare", "Mrs. Ngozi Eze", "Mrs. Aisha Bello"]} placeholder="Select" />
          </FieldGroup>
          <div className="flex items-center justify-between rounded-lg border border-[#e6ebf3] p-3">
            <div>
              <p className="font-[family-name:var(--font-nunito)] text-sm font-semibold text-[#2d1810]">Enable Waitlist</p>
              <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                Allow children to be waitlisted once this room is full.
              </p>
            </div>
            <button
              onClick={() => setWaitlistEnabled((v) => !v)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                waitlistEnabled ? "bg-[#3b2513]" : "bg-[#d0d5dd]"
              }`}
            >
              <span
                className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                  waitlistEnabled ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          {waitlistEnabled && (
            <FieldGroup label="Waitlist Hold Period">
              <SelectField options={["3 days", "7 days", "14 days", "30 days"]} placeholder="Select period eg 3 days, 7 days" />
            </FieldGroup>
          )}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
          <button
            onClick={() => onOpenChange(false)}
            className="h-11 rounded-lg border border-[#d0d5dd] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="h-11 rounded-lg bg-[#3b2513] px-5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#faf2e1] hover:bg-[#2d1810]"
          >
            Create Room
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function RoomsClassesTab() {
  const [createOpen, setCreateOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-heading">
          Rooms &amp; Classes
        </h2>
        <Button
          onClick={() => setCreateOpen(true)}
          className="h-10 gap-1.5 rounded-lg bg-brand-dark px-4 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-sidebar-active-text"
        >
          <Plus className="size-4" />
          New Room
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ROOMS.map((room) => {
          const pct = Math.round((room.enrolled / room.capacity) * 100);
          return (
            <div key={room.id} className="rounded-xl border border-card-border bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#edd9c0] text-2xl">
                  {room.icon}
                </div>
                <div>
                  <p className="font-[family-name:var(--font-merriweather)] text-base font-bold text-stat-heading">
                    {room.name}
                  </p>
                  <p className="font-[family-name:var(--font-nunito)] text-xs text-muted-text">{room.ageRange}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between font-[family-name:var(--font-nunito)] text-xs text-muted-text">
                  <span>
                    {room.enrolled}/{room.capacity} enrolled
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
                  <div
                    className="h-full rounded-full bg-[#c47b2c]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              <p className="mt-3 font-[family-name:var(--font-nunito)] text-xs text-muted-text">
                Caregiver: <span className="font-semibold text-[#2d1810]">{room.caregiver}</span>
              </p>
            </div>
          );
        })}
      </div>

      <CreateRoomModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={() => {
          setCreateOpen(false);
          setSuccessOpen(true);
        }}
      />

      <SuccessModal
        open={successOpen}
        onOpenChange={setSuccessOpen}
        heading="Room Created"
        description="The new room has been added and is ready to accept enrolments."
      />
    </div>
  );
}
