"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, MapPin, Star, Users, Phone, Clock, ChevronDown,
  Shield, Tv, FileText, LayoutGrid, DollarSign, X, CheckCircle2, UserRound,
} from "lucide-react";
import { mockCreches, type Creche, type CrecheRoom } from "@/lib/parent/mock-data";
import {
  getEnrollmentChildren, getAgeInMonths, formatAge, parseAgeRange,
  type EnrollmentChild,
} from "@/lib/shared/enrollment-children";
import { createEnrollment } from "@/lib/shared/enrollments";

type Tab = "overview" | "rooms" | "pricing" | "policies";
type PricingAge = "Infant" | "Toddler" | "Preschool";

// ─── Room Detail Modal ─────────────────────────────────────────────────────────
function RoomModal({ room, onClose }: { room: CrecheRoom; onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/30 sm:items-center">
      <div className="w-full max-w-[375px] rounded-t-2xl bg-white px-5 pb-8 pt-5 sm:rounded-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-800">Rooms</h3>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-xl bg-gray-50 p-4">
          <div>
            <p className="font-bold text-gray-800">{room.name}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <div className="h-3.5 w-3.5 rounded-full border border-gray-400" />
              <span>Age Range: {room.ageRange}</span>
            </div>
          </div>
          <span className="rounded-full bg-cg-accent px-2.5 py-1 text-xs font-semibold text-white">
            {room.spots} spots available
          </span>
        </div>

        <div className="rounded-xl border border-gray-100">
          {room.pricing.map((p, i) => (
            <div
              key={p.label}
              className={`flex items-center justify-between px-4 py-3 ${i < room.pricing.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <span className="text-sm text-gray-600">{p.label}</span>
              <span className="text-sm font-semibold text-gray-800">
                {p.amount} / {p.unit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Enrollment Wizard ─────────────────────────────────────────────────────────
type WizardStep = "child" | "room" | "details";

function EnrollmentWizard({
  creche,
  onClose,
  onSuccess,
}: {
  creche: Creche;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<WizardStep>("child");
  const [child, setChild] = useState<EnrollmentChild | null>(null);
  const [room, setRoom] = useState<CrecheRoom | null>(null);
  const [startDate, setStartDate] = useState("");
  const [notes, setNotes] = useState("");

  const children = getEnrollmentChildren();

  const ageMonths = child ? getAgeInMonths(child.birthDate) : 0;
  const range = room ? parseAgeRange(room.ageRange) : null;
  // Fail open when the range string is unparseable.
  const tooYoung = !!(child && room && range && ageMonths < range.minMonths);
  const tooOld = !!(child && room && range && ageMonths > range.maxMonths);
  const ageInvalid = tooYoung || tooOld;

  function handleBack() {
    if (step === "details") setStep("room");
    else if (step === "room") setStep("child");
    else onClose();
  }

  function handleEnroll() {
    if (!child || !room || ageInvalid) return;
    createEnrollment({
      childId: child.id,
      childName: child.name,
      childGender: child.gender,
      childAvatarInitials: child.avatarInitials,
      ageAtEnrollmentMonths: ageMonths,
      crecheId: creche.id,
      crecheName: creche.name,
      location: creche.location,
      roomId: room.id,
      roomName: room.name,
      startDate: startDate || undefined,
      notes: notes.trim() || undefined,
    });
    onSuccess();
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="flex max-h-[85vh] w-full max-w-[430px] flex-col rounded-t-3xl bg-white pb-8 pt-5">
        <div className="mb-4 flex items-center justify-between px-5">
          <div className="flex items-center gap-2">
            {step !== "child" && (
              <button onClick={handleBack} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                <ArrowLeft size={14} className="text-gray-600" />
              </button>
            )}
            <h3 className="text-base font-bold text-gray-800">
              {step === "child" ? "Select Child Profile" : step === "room" ? "Select Room" : "Enrollment Details"}
            </h3>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
            <X size={14} className="text-gray-500" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5">
          {step === "child" && (
            <div className="flex flex-col gap-3">
              {children.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setChild(c)}
                  className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-colors ${
                    child?.id === c.id ? "border-cg-accent" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cg-quick-action text-sm font-bold text-cg-brand">
                      {c.avatarInitials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{c.name}</p>
                      {c.nickname && <p className="text-xs text-gray-400">{c.nickname}</p>}
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <UserRound size={13} className="text-gray-400" />
                      {c.gender} · Age: {formatAge(getAgeInMonths(c.birthDate))}
                    </span>
                    <span className="rounded-lg border border-cg-accent px-3 py-1.5 text-xs font-medium text-cg-accent">
                      Edit complete profile
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === "room" && (
            <div className="flex flex-col gap-3">
              {creche.rooms.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRoom(r)}
                  className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-colors ${
                    room?.id === r.id ? "border-cg-accent" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-800">{r.name}</p>
                    <span className="rounded-full bg-cg-accent px-2.5 py-1 text-xs font-semibold text-white">
                      {r.spots} spots available
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                    <UserRound size={13} className="text-gray-400" />
                    Age Range: {r.ageRange}
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === "details" && (
            <div className="flex flex-col gap-4">
              {ageInvalid && child && room && range && (
                <p className="text-sm leading-relaxed text-red-500">
                  Child is too {tooYoung ? "young" : "old"} for this room. Room age range is {room.ageRange}.
                  Child is {formatAge(ageMonths).toLowerCase()} old.
                </p>
              )}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Preferred Start Date (Optional)</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-cg-brand focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Additional Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes or special requirements."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm placeholder:text-gray-300 focus:border-cg-brand focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        <div className="px-5 pt-4">
          {step === "child" && (
            <button
              onClick={() => child && setStep("room")}
              disabled={!child}
              className="w-full rounded-xl bg-cg-brand py-3.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              Select Room
            </button>
          )}
          {step === "room" && (
            <button
              onClick={() => room && setStep("details")}
              disabled={!room}
              className="w-full rounded-xl bg-cg-brand py-3.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              Continue
            </button>
          )}
          {step === "details" && (
            <button
              onClick={handleEnroll}
              disabled={ageInvalid}
              className="w-full rounded-xl bg-cg-brand py-3.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              Enroll Child
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Success Modal ─────────────────────────────────────────────────────────────
function SuccessModal({ onClose, onViewEnrollments }: { onClose: () => void; onViewEnrollments: () => void }) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="relative w-full max-w-[430px] rounded-t-3xl bg-white px-6 pb-10 pt-6">
        <div className="mb-2 flex justify-end">
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200">
            <X size={16} className="text-gray-400" />
          </button>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
            <CheckCircle2 size={32} className="text-white" />
          </div>
          <h2 className="mb-2 text-lg font-bold text-gray-800" style={{ fontFamily: "var(--font-merriweather)" }}>
            Successful
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Enrollment Successful! Your child has been enrolled in the creche.
          </p>
          <button
            onClick={onViewEnrollments}
            className="w-full rounded-xl bg-cg-brand py-3.5 text-sm font-semibold text-white"
          >
            View Enrollments
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Feature icon helper ───────────────────────────────────────────────────────
function FeatureIcon({ label }: { label: string }) {
  if (label.toLowerCase().includes("montessori") || label.toLowerCase().includes("certified")) return <Shield size={12} />;
  if (label.toLowerCase().includes("camera") || label.toLowerCase().includes("cctv")) return <Tv size={12} />;
  return <FileText size={12} />;
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function CrecheDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const creche = mockCreches.find((c) => c.id === id) ?? mockCreches[0];

  const [tab, setTab] = useState<Tab>("overview");
  const [pricingAge, setPricingAge] = useState<PricingAge>("Infant");
  const [selectedRoom, setSelectedRoom] = useState<CrecheRoom | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const pricingRoom = creche.rooms.find((r) =>
    r.name.toLowerCase().includes(pricingAge.toLowerCase())
  ) ?? creche.rooms[0];

  const TABS: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "rooms", label: "Rooms" },
    { key: "pricing", label: "Pricing" },
    { key: "policies", label: "Policies" },
  ];

  return (
    <>
      {selectedRoom && <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />}
      {showWizard && (
        <EnrollmentWizard
          creche={creche}
          onClose={() => setShowWizard(false)}
          onSuccess={() => { setShowWizard(false); setShowSuccess(true); }}
        />
      )}
      {showSuccess && (
        <SuccessModal
          onClose={() => setShowSuccess(false)}
          onViewEnrollments={() => router.push("/parent/enrollments")}
        />
      )}

      <div className="relative flex min-h-0 flex-1 flex-col bg-white">
        {/* Photo header */}
        <div className="relative shrink-0 h-52 bg-cg-quick-action">
          <button
            onClick={() => router.back()}
            className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm z-10"
          >
            <ArrowLeft size={16} className="text-gray-700" />
          </button>
          {/* Placeholder image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-cg-accent-muted/50" />
          </div>
          {/* Carousel dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div className="shrink-0 border-b border-gray-100 px-6">
          <div className="flex">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  tab === key
                    ? "border-b-2 border-cg-brand text-cg-brand"
                    : "text-gray-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {tab === "overview" && (
            <div className="px-6 pt-4">
              {/* Name + price */}
              <div className="mb-1 flex items-start justify-between gap-2">
                <h1 className="text-lg font-bold text-gray-800 leading-tight">{creche.name}</h1>
                <p className="shrink-0 text-sm font-semibold text-cg-accent">
                  Care from {creche.careFromPrice} / hour
                </p>
              </div>

              {/* Location + rating + phone */}
              <div className="mb-3 flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin size={11} className="text-rose-400" fill="currentColor" />
                  {creche.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={11} className="text-amber-400" fill="currentColor" />
                  {creche.rating.toFixed(1)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} className="text-rose-400" />
                  {creche.phone}
                </span>
              </div>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{creche.description}</p>

              {/* Age range */}
              <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Users size={14} className="text-gray-400" />
                <span className="text-sm text-gray-700">{creche.ageRange}</span>
              </div>

              {/* Spots */}
              <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Users size={14} className="text-gray-400" />
                <span className="text-sm text-gray-700">{creche.spots} spots available</span>
              </div>

              {/* Feature chips */}
              <div className="mb-3 flex flex-wrap gap-2 border-b border-gray-100 pb-3">
                {creche.features.map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600"
                  >
                    <FeatureIcon label={f} />
                    {f}
                  </span>
                ))}
              </div>

              {/* Hours */}
              <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-3">
                <Clock size={14} className="text-gray-400" />
                <span className={`text-xs font-semibold ${creche.isOpen ? "text-green-500" : "text-red-500"}`}>
                  {creche.isOpen ? "OPEN" : "CLOSED"}
                </span>
                <span className="text-sm text-gray-700">· {creche.hours}</span>
                <ChevronDown size={14} className="ml-auto text-gray-400" />
              </div>

              {/* Address */}
              <div className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0 text-gray-400" />
                <span className="text-sm text-gray-700">{creche.address}</span>
                <button className="ml-1 shrink-0 text-xs font-semibold text-cg-accent">
                  Open Location
                </button>
              </div>
            </div>
          )}

          {tab === "rooms" && (
            <div className="px-6 pt-4">
              <h2 className="mb-4 text-base font-bold text-gray-800">Rooms &amp; Capacity</h2>
              <div className="flex flex-col gap-3">
                {creche.rooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className="w-full rounded-xl border border-gray-100 bg-gray-50 p-4 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800">{room.name}</p>
                      <span className="rounded-full bg-cg-accent px-2.5 py-1 text-xs font-semibold text-white">
                        {room.spots} spots available
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                      <div className="h-3 w-3 rounded-full border border-gray-400" />
                      <span>Age Range: {room.ageRange}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === "pricing" && (
            <div className="px-6 pt-4">
              <h2 className="text-base font-bold text-gray-800">Tuition &amp; Fees</h2>
              <p className="mb-4 mt-0.5 text-xs text-gray-400">All prices are in USD and subject to change</p>

              {/* Age sub-tabs */}
              <div className="mb-5 flex gap-2">
                {(["Infant", "Toddler", "Preschool"] as PricingAge[]).map((age) => (
                  <button
                    key={age}
                    onClick={() => setPricingAge(age)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                      pricingAge === age
                        ? "border-cg-accent text-cg-accent"
                        : "border-gray-200 text-gray-400"
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>

              {/* Price list */}
              <div className="flex flex-col">
                {pricingRoom.pricing.map((p, i) => (
                  <div
                    key={p.label}
                    className={`py-3 ${i < pricingRoom.pricing.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <p className="text-xs text-gray-400">{p.label}</p>
                    <p className="mt-0.5 text-lg font-bold text-gray-800">
                      {p.amount} / {p.unit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "policies" && (
            <div className="px-6 pt-4">
              <h2 className="text-base font-bold text-gray-800">Important Policies &amp; Information</h2>
              <p className="mb-4 mt-0.5 text-xs text-gray-400">Please read these policies carefully before enrolment</p>
              <ol className="flex flex-col gap-3">
                {creche.policies.map((policy, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="shrink-0 font-semibold text-gray-400">{i + 1}.</span>
                    <span className="leading-relaxed">{policy}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Sticky Enrol Now button */}
        <div className="shrink-0 border-t border-gray-100 bg-white px-6 pb-safe pt-4 pb-6">
          <button
            onClick={() => setShowWizard(true)}
            className="w-full rounded-xl bg-cg-brand py-4 text-sm font-semibold text-white"
          >
            Enrol Now
          </button>
        </div>
      </div>
    </>
  );
}
