"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
 Check,
 Building2,
 DoorOpen,
 Users,
 Baby,
 DollarSign,
 Contact,
 ClipboardList,
 Megaphone,
 ArrowRight,
 Sparkles,
} from "lucide-react";

import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogFooter,
 DialogClose,
} from "@/components/ui/dialog";
import {
 ONBOARDING_TASKS,
 getCompletedTasks,
 markTaskComplete,
 getOnboardingProgress,
 type OnboardingTask,
} from "@/lib/mock-data/get-started";

// ── Icon map ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
 building: Building2,
 door: DoorOpen,
 users: Users,
 baby: Baby,
 dollar: DollarSign,
 contact: Contact,
 clipboard: ClipboardList,
 megaphone: Megaphone,
};

// ── Circular progress badge ───────────────────────────────────────────────────

function ProgressBadge({ percent }: { percent: number }) {
 const radius = 54;
 const stroke = 8;
 const normalizedRadius = radius - stroke;
 const circumference = normalizedRadius * 2 * Math.PI;
 const strokeDashoffset = circumference - (percent / 100) * circumference;

 return (
 <div className="relative flex items-center justify-center">
  <svg height={radius * 2} width={radius * 2} className="-rotate-90">
  <circle
   stroke="#e6ebf3"
   fill="transparent"
   strokeWidth={stroke}
   r={normalizedRadius}
   cx={radius}
   cy={radius}
  />
  <circle
   stroke="url(#progressGradient)"
   fill="transparent"
   strokeWidth={stroke}
   strokeLinecap="round"
   strokeDasharray={`${circumference} ${circumference}`}
   style={{ strokeDashoffset, transition: "stroke-dashoffset 0.6s ease" }}
   r={normalizedRadius}
   cx={radius}
   cy={radius}
  />
  <defs>
   <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
   <stop offset="0%" stopColor="#c47b2c" />
   <stop offset="100%" stopColor="#3b2513" />
   </linearGradient>
  </defs>
  </svg>
  <div className="absolute flex flex-col items-center">
  <span className="font-[family-name:var(--font-merriweather)] text-3xl font-bold text-[#2d1810]">
   {percent}%
  </span>
  <span className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Complete</span>
  </div>
 </div>
 );
}

// ── Modal forms (prefilled) ───────────────────────────────────────────────────

function CrecheProfileModal({ onComplete }: { onComplete: () => void }) {
 const [name, setName] = useState("St. Greg Creche");
 const [phone, setPhone] = useState("+234 90 9827 2738");
 const [address, setAddress] = useState("14 Adeola Odeku Street, Victoria Island, Lagos");
 const [bio, setBio] = useState("A nurturing environment where children explore, learn, and grow through play-based learning and individualised attention.");

 return (
 <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="flex flex-col gap-4 px-6 py-5">
  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Pre-filled for you, edit if needed</p>
  <Field label="Crèche Name" value={name} onChange={setName} />
  <Field label="Phone" value={phone} onChange={setPhone} />
  <Field label="Address" value={address} onChange={setAddress} />
  <div className="flex flex-col gap-1.5">
  <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Bio</label>
  <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="resize-none rounded-xl border border-[#e6ebf3] px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
  </div>
  <ModalFooter onSave="Save Profile" />
 </form>
 );
}

function RoomsModal({ onComplete }: { onComplete: () => void }) {
 const [rooms, setRooms] = useState([
 { name: "Infant Room", ageRange: "6-12 months", spots: "5" },
 { name: "Toddler Room", ageRange: "1-2 years", spots: "8" },
 { name: "Preschool Room", ageRange: "3-5 years", spots: "12" },
 ]);

 return (
 <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="flex flex-col gap-4 px-6 py-5">
  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">3 rooms pre-configured, edit as needed</p>
  {rooms.map((room, i) => (
  <div key={i} className="flex gap-2">
   <input value={room.name} onChange={(e) => { const r = [...rooms]; r[i] = { ...r[i], name: e.target.value }; setRooms(r); }} className="h-10 flex-1 rounded-xl border border-[#e6ebf3] px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
   <input value={room.ageRange} onChange={(e) => { const r = [...rooms]; r[i] = { ...r[i], ageRange: e.target.value }; setRooms(r); }} className="h-10 flex-1 rounded-xl border border-[#e6ebf3] px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
   <input value={room.spots} onChange={(e) => { const r = [...rooms]; r[i] = { ...r[i], spots: e.target.value }; setRooms(r); }} className="h-10 w-20 rounded-xl border border-[#e6ebf3] px-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
  </div>
  ))}
  <ModalFooter onSave="Save Rooms" />
 </form>
 );
}

function StaffModal({ onComplete }: { onComplete: () => void }) {
 const [name, setName] = useState("Mr. Ben Ayadi");
 const [role, setRole] = useState("Caregiver");
 const [room, setRoom] = useState("Lion");
 const [phone, setPhone] = useState("+234 801 234 5678");

 return (
 <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="flex flex-col gap-4 px-6 py-5">
  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Example staff member pre-filled</p>
  <Field label="Full Name" value={name} onChange={setName} />
  <div className="flex flex-col gap-1.5">
  <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Role</label>
  <select value={role} onChange={(e) => setRole(e.target.value)} className="h-11 rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]">
   <option>Caregiver</option><option>Receptionist</option><option>Admin</option>
  </select>
  </div>
  <div className="flex flex-col gap-1.5">
  <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Assigned Room</label>
  <select value={room} onChange={(e) => setRoom(e.target.value)} className="h-11 rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]">
   <option>Lion</option><option>Panda</option><option>Owl</option>
  </select>
  </div>
  <Field label="Phone" value={phone} onChange={setPhone} />
  <ModalFooter onSave="Add Staff" />
 </form>
 );
}

function ChildModal({ onComplete }: { onComplete: () => void }) {
 const [name, setName] = useState("Tosin Johnson");
 const [age, setAge] = useState("18 months");
 const [room, setRoom] = useState("Lion");
 const [parentName, setParentName] = useState("Mrs. Johnson");
 const [parentEmail, setParentEmail] = useState("johnson@email.com");

 return (
 <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="flex flex-col gap-4 px-6 py-5">
  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Example child enrolment pre-filled</p>
  <Field label="Child Name" value={name} onChange={setName} />
  <Field label="Age" value={age} onChange={setAge} />
  <div className="flex flex-col gap-1.5">
  <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Room</label>
  <select value={room} onChange={(e) => setRoom(e.target.value)} className="h-11 rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]">
   <option>Lion</option><option>Panda</option><option>Owl</option>
  </select>
  </div>
  <Field label="Parent Name" value={parentName} onChange={setParentName} />
  <Field label="Parent Email" value={parentEmail} onChange={setParentEmail} />
  <ModalFooter onSave="Enrol Child" />
 </form>
 );
}

function FeesModal({ onComplete }: { onComplete: () => void }) {
 const [fullDay, setFullDay] = useState("$65");
 const [halfDay, setHalfDay] = useState("$40");
 const [hourly, setHourly] = useState("$12");
 const [weekly, setWeekly] = useState("$300");

 return (
 <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="flex flex-col gap-4 px-6 py-5">
  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Default pricing pre-filled</p>
  <Field label="Full Day" value={fullDay} onChange={setFullDay} />
  <Field label="Half Day" value={halfDay} onChange={setHalfDay} />
  <Field label="Hourly Rate" value={hourly} onChange={setHourly} />
  <Field label="Weekly" value={weekly} onChange={setWeekly} />
  <ModalFooter onSave="Save Fee Plans" />
 </form>
 );
}

function ParentsModal({ onComplete }: { onComplete: () => void }) {
 const [name, setName] = useState("Mrs. Johnson");
 const [email, setEmail] = useState("johnson@email.com");
 const [phone, setPhone] = useState("+234 801 234 5678");
 const [child, setChild] = useState("Tosin Johnson");

 return (
 <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="flex flex-col gap-4 px-6 py-5">
  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Example parent contact pre-filled</p>
  <Field label="Parent Name" value={name} onChange={setName} />
  <Field label="Email" value={email} onChange={setEmail} />
  <Field label="Phone" value={phone} onChange={setPhone} />
  <Field label="Child" value={child} onChange={setChild} />
  <ModalFooter onSave="Save Contact" />
 </form>
 );
}

function DailyReportModal({ onComplete }: { onComplete: () => void }) {
 const [child] = useState("Tosin Johnson");
 const [mood, setMood] = useState("Happy");
 const [meal, setMeal] = useState("Finished all breakfast and lunch");
 const [nap, setNap] = useState("11:00am - 12:30pm");
 const [note, setNote] = useState("Settled quickly after nap, in great spirits all day.");

 return (
 <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="flex flex-col gap-4 px-6 py-5">
  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Simulated report, all fields pre-filled</p>
  <div className="rounded-xl bg-[#faf2e1] px-4 py-3">
  <p className="font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#2d1810]">{child}</p>
  <p className="font-[family-name:var(--font-urbanist)] text-[10px] text-[#6b7280]">Lion Room • Today</p>
  </div>
  <div className="flex flex-col gap-1.5">
  <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Mood</label>
  <select value={mood} onChange={(e) => setMood(e.target.value)} className="h-11 rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]">
   <option>Happy</option><option>Neutral</option><option>Fussy</option><option>Sad</option>
  </select>
  </div>
  <Field label="Meal" value={meal} onChange={setMeal} />
  <Field label="Nap Time" value={nap} onChange={setNap} />
  <div className="flex flex-col gap-1.5">
  <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Note</label>
  <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} className="resize-none rounded-xl border border-[#e6ebf3] px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
  </div>
  <ModalFooter onSave="Submit Report" />
 </form>
 );
}

function AnnouncementModal({ onComplete }: { onComplete: () => void }) {
 const [audience, setAudience] = useState("All Parents");
 const [subject, setSubject] = useState("Welcome to St. Greg Creche!");
 const [message, setMessage] = useState("We are excited to welcome all our families to a new term. Please find the updated schedule and policies on the app.");

 return (
 <form onSubmit={(e) => { e.preventDefault(); onComplete(); }} className="flex flex-col gap-4 px-6 py-5">
  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">Example announcement pre-filled</p>
  <div className="flex flex-col gap-1.5">
  <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Audience</label>
  <select value={audience} onChange={(e) => setAudience(e.target.value)} className="h-11 rounded-xl border border-[#e6ebf3] bg-white px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]">
   <option>All Parents</option><option>Lion Room Parents</option><option>Panda Room Parents</option>
  </select>
  </div>
  <Field label="Subject" value={subject} onChange={setSubject} />
  <div className="flex flex-col gap-1.5">
  <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">Message</label>
  <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="resize-none rounded-xl border border-[#e6ebf3] px-4 py-3 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
  </div>
  <ModalFooter onSave="Send Announcement" />
 </form>
 );
}

// ── Shared form helpers ───────────────────────────────────────────────────────

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
 return (
 <div className="flex flex-col gap-1.5">
  <label className="font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810]">{label}</label>
  <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="h-11 rounded-xl border border-[#e6ebf3] px-4 font-[family-name:var(--font-urbanist)] text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]" />
 </div>
 );
}

function ModalFooter({ onSave }: { onSave: string }) {
 return (
 <DialogFooter className="border-t border-[#eaecf0] px-0 pt-4">
  <DialogClose className="rounded-lg border border-[#d0d5dd] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">
  Cancel
  </DialogClose>
  <button type="submit" className="rounded-lg bg-[#3b2513] px-5 py-2.5 font-[family-name:var(--font-urbanist)] text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]">
  {onSave}
  </button>
 </DialogFooter>
 );
}

// ── Modal resolver ────────────────────────────────────────────────────────────

const MODAL_MAP: Record<string, React.FC<{ onComplete: () => void }>> = {
 "creche-profile": CrecheProfileModal,
 rooms: RoomsModal,
 staff: StaffModal,
 child: ChildModal,
 fees: FeesModal,
 parents: ParentsModal,
 "daily-report": DailyReportModal,
 announcement: AnnouncementModal,
};

// ── Task card ─────────────────────────────────────────────────────────────────

function TaskCard({
 task,
 isComplete,
 onOpen,
}: {
 task: OnboardingTask;
 isComplete: boolean;
 onOpen: () => void;
}) {
 const Icon = ICON_MAP[task.icon] ?? ClipboardList;

 return (
 <button
  onClick={() => !isComplete && onOpen()}
  disabled={isComplete}
  className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
  isComplete
   ? "border-[#009061]/20 bg-[#ecfff8]"
   : "border-[#e6ebf3] bg-white hover:border-[#c47b2c]/40 hover:"
  }`}
 >
  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
  isComplete ? "bg-[#009061]" : "bg-[#fdf6e8]"
  }`}>
  {isComplete ? (
   <Check size={20} className="text-white" />
  ) : (
   <Icon size={20} className="text-[#c47b2c]" />
  )}
  </div>
  <div className="min-w-0 flex-1">
  <p className={`font-[family-name:var(--font-urbanist)] text-sm font-semibold ${
   isComplete ? "text-[#009061] line-through opacity-70" : "text-[#2d1810]"
  }`}>
   {task.title}
  </p>
  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#6b7280]">
   {task.description}
  </p>
  </div>
  {!isComplete && (
  <ArrowRight size={16} className="shrink-0 text-[#c47b2c]" />
  )}
 </button>
 );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function GetStartedPage() {
 const router = useRouter();
 const [completed, setCompleted] = useState<string[]>(() => {
 if (typeof window === "undefined") return [];
 return getCompletedTasks();
 });
 const [loaded] = useState(true);
 const [activeModal, setActiveModal] = useState<string | null>(null);

 useEffect(() => {
 if (completed.length >= ONBOARDING_TASKS.length) {
  router.replace("/admin/v2/dashboard");
 }
 }, [completed, router]);

 const handleComplete = useCallback((taskId: string) => {
 markTaskComplete(taskId);
 const updated = getCompletedTasks();
 setCompleted(updated);
 setActiveModal(null);
 if (updated.length >= ONBOARDING_TASKS.length) {
  setTimeout(() => router.replace("/admin/v2/dashboard"), 600);
 }
 }, [router]);

 if (!loaded) return null;

 const percent = getOnboardingProgress();
 const doneCount = completed.length;
 const totalCount = ONBOARDING_TASKS.length;

 return (
 <div className="mx-auto max-w-4xl">
  {/* Header */}
  <div className="mb-8 flex flex-col items-center text-center">
  <ProgressBadge percent={percent} />
  <h1 className="mt-5 font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2d1810]">
   Welcome to CEven
  </h1>
  <p className="mt-1 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
   Complete these {totalCount} tasks to get your crèche up and running.
  </p>
  <p className="mt-0.5 font-[family-name:var(--font-urbanist)] text-xs text-[#c47b2c]">
   {doneCount} of {totalCount} completed
  </p>
  </div>

  {/* AI tip banner */}
  <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#e0bfa0] bg-[#fdf6e8] px-4 py-3">
  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#e0bfa0] px-2.5 py-1 font-[family-name:var(--font-urbanist)] text-[10px] font-medium text-[#3b2513]">
   <Sparkles size={10} /> Tip
  </span>
  <p className="font-[family-name:var(--font-urbanist)] text-xs text-[#2d1810]">
   Each task opens a quick form with pre-filled examples. Edit if needed, or just save to proceed.
  </p>
  </div>

  {/* Task grid */}
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
  {ONBOARDING_TASKS.map((task) => (
   <TaskCard
   key={task.id}
   task={task}
   isComplete={completed.includes(task.id)}
   onOpen={() => setActiveModal(task.id)}
   />
  ))}
  </div>

  {/* Skip to dashboard */}
  {doneCount > 0 && doneCount < totalCount && (
  <div className="mt-8 text-center">
   <button
   onClick={() => router.push("/admin/v2/dashboard")}
   className="font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280] underline hover:text-[#2d1810]"
   >
   Skip to dashboard for now
   </button>
  </div>
  )}

  {/* All done message */}
  {doneCount >= totalCount && (
  <div className="mt-8 flex flex-col items-center rounded-2xl border border-[#009061]/20 bg-[#ecfff8] p-8 text-center">
   <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#009061]">
   <Check size={28} className="text-white" />
   </div>
   <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
   All done!
   </h2>
   <p className="mt-1 font-[family-name:var(--font-urbanist)] text-sm text-[#6b7280]">
   Your crèche is fully set up. Redirecting to your dashboard...
   </p>
  </div>
  )}

  {/* Modals */}
  {ONBOARDING_TASKS.map((task) => {
  const ModalComponent = MODAL_MAP[task.id];
  if (!ModalComponent) return null;
  return (
   <Dialog key={task.id} open={activeModal === task.id} onOpenChange={(open) => !open && setActiveModal(null)}>
   <DialogContent>
    <DialogHeader>
    <DialogTitle>{task.title}</DialogTitle>
    </DialogHeader>
    <ModalComponent onComplete={() => handleComplete(task.id)} />
   </DialogContent>
   </Dialog>
  );
  })}
 </div>
 );
}
