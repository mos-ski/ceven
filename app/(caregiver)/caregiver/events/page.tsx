"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Users, Plus, X } from "lucide-react";
import { BottomNav } from "@/components/caregiver/bottom-nav";
import { LogSheet } from "@/components/caregiver/log-sheet";
import { mockUser } from "@/lib/caregiver/mock-data";
import { getEvents, addEvent, updateEvent, type CrecheEvent } from "@/lib/shared/events";
import { NewBadge } from "@/components/caregiver/new-badge";

export default function CaregiverEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<CrecheEvent[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    setEvents(getEvents());
    const handler = () => setEvents(getEvents());
    window.addEventListener("ceven-events-updated", handler);
    return () => window.removeEventListener("ceven-events-updated", handler);
  }, []);

  return (
    <div className="relative flex flex-1 flex-col bg-cg-bg">
      <div className="flex items-center justify-between bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()}>
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-base font-bold text-cg-brand">Events</h1>
            <NewBadge />
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1 rounded-xl bg-cg-brand px-3 py-2 text-xs font-semibold text-white"
        >
          <Plus size={14} /> Create
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {events.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <CalendarDays size={24} className="mx-auto mb-2 text-gray-300" />
            <p className="text-sm text-gray-400">No upcoming events.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {events.map((event) => (
              <div key={event.id} className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="shrink-0 text-cg-brand" />
                    <p className="text-sm font-bold text-cg-brand">{event.title}</p>
                  </div>
                  {event.rsvpRequired && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                      RSVP
                    </span>
                  )}
                </div>
                <p className="mb-2 text-xs text-gray-500">{event.description}</p>
                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={11} /> {event.date} · {event.startTime} - {event.endTime}</span>
                  {event.room && <span className="flex items-center gap-1"><Users size={11} /> {event.room}</span>}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => { updateEvent(event.id, { cancelled: true }); setEvents(getEvents()); }}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-[10px] font-semibold text-red-600"
                  >
                    Cancel Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateEventModal
          onClose={() => setShowCreateModal(false)}
          onCreate={() => { setEvents(getEvents()); setShowCreateModal(false); }}
        />
      )}

      <LogSheet />
      <BottomNav />
    </div>
  );
}

function CreateEventModal({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [room, setRoom] = useState("");
  const [rsvpRequired, setRsvpRequired] = useState(false);

  function handleCreate() {
    if (!title.trim() || !date || !startTime) return;
    addEvent({
      title: title.trim(),
      description: description.trim(),
      date,
      startTime,
      endTime: endTime || startTime,
      room: room || undefined,
      rsvpRequired,
      addedBy: "Ms Anu",
    });
    onCreate();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30">
      <div className="w-full max-w-[430px] rounded-t-2xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <h3 className="text-base font-semibold text-gray-800">Create Event</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-5 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Title *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} placeholder="Event details..." className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Date *</label>
              <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-cg-brand focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Room</label>
              <input value={room} onChange={(e) => setRoom(e.target.value)} placeholder="All Rooms" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Start Time *</label>
              <input value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder="10:00 AM" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">End Time</label>
              <input value={endTime} onChange={(e) => setEndTime(e.target.value)} placeholder="02:00 PM" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRsvpRequired(!rsvpRequired)}
              className={`flex h-6 w-11 items-center rounded-full transition-colors ${rsvpRequired ? "bg-cg-brand" : "bg-gray-200"}`}
            >
              <div className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${rsvpRequired ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
            <span className="text-sm text-gray-700">Require RSVP</span>
          </div>
          <button
            onClick={handleCreate}
            disabled={!title.trim() || !date || !startTime}
            className="mt-1 w-full rounded-xl bg-cg-brand py-3 text-sm font-semibold text-white disabled:opacity-40"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
