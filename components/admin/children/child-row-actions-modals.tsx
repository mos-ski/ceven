"use client";

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
import { Label } from "@/components/ui/label";
import SuccessModal from "@/components/dashboard/success-modal";
import { CAREGIVERS, ROOMS, type Child } from "@/lib/mock-data/children";

export function ReassignCaregiverModal({ child, onClose }: { child: Child; onClose: () => void }) {
  const [caregiverId, setCaregiverId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SuccessModal
        title="Caregiver Reassigned"
        description={`${child.name} has been reassigned to a new caregiver.`}
        onClose={onClose}
      />
    );
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reassign Caregiver</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Choose a new caregiver for {child.name}.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="reassign-caregiver">Caregiver</Label>
            <select
              id="reassign-caregiver"
              value={caregiverId}
              onChange={(e) => setCaregiverId(e.target.value)}
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Select a caregiver
              </option>
              {CAREGIVERS.map((cg) => (
                <option key={cg.id} value={cg.id}>
                  {cg.name} — {cg.room} ({cg.childrenAssigned} assigned)
                </option>
              ))}
            </select>
          </div>
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
            disabled={!caregiverId}
            onClick={() => setSubmitted(true)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reassign
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ChangeRoomModal({ child, onClose }: { child: Child; onClose: () => void }) {
  const [roomId, setRoomId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SuccessModal
        title="Room Updated"
        description={`${child.name} has been moved to a new room.`}
        onClose={onClose}
      />
    );
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Room</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Move {child.name} to a different room. Current room: {child.room}.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="change-room">New Room</Label>
            <select
              id="change-room"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            >
              <option value="" disabled>
                Select a room
              </option>
              {ROOMS.filter((r) => r.name !== child.room).map((r) => (
                <option key={r.id} value={r.id}>
                  {r.icon} {r.name} ({r.enrolled}/{r.capacity})
                </option>
              ))}
            </select>
          </div>
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
            disabled={!roomId}
            onClick={() => setSubmitted(true)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Move Child
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ContactGuardianModal({ child, onClose }: { child: Child; onClose: () => void }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <SuccessModal
        title="Message Sent"
        description={`Your message has been sent to ${child.parentName}.`}
        onClose={onClose}
      />
    );
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Guardian</DialogTitle>
          <p className="font-[family-name:var(--font-nunito)] text-sm text-[#6b7280]">
            Send a message to {child.parentName} ({child.parentEmail}).
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="contact-message">Message</Label>
            <textarea
              id="contact-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Type a message about ${child.name}...`}
              className="resize-none rounded-lg border border-[#d0d5dd] px-3.5 py-2.5 font-[family-name:var(--font-nunito)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </div>
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
            disabled={!message.trim()}
            onClick={() => setSubmitted(true)}
            className="h-9 rounded-lg bg-[#3b2513] px-4 font-[family-name:var(--font-nunito)] text-sm font-medium text-[#faf2e1] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
