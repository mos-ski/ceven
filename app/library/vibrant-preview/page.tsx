import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
 AlertTriangle,
 Baby,
 BarChart3,
 Bell,
 CalendarDays,
 CheckCircle2,
 ClipboardList,
 HeartPulse,
 Info,
 MessageSquare,
 Plus,
 QrCode,
 ShieldCheck,
 Sparkles,
 Utensils,
 WalletCards,
 XCircle,
} from "lucide-react"

const fontDisplay = { fontFamily: "var(--font-mogra-import)" }
const fontHeading = { fontFamily: "var(--font-merriweather-import)" }

type PaletteItem = {
 name: string
 role: string
 hex: string
 text: string
}

type IconCard = {
 title: string
 detail: string
 Icon: LucideIcon
 tone: string
 surface: string
 border: string
}

const palette: PaletteItem[] = [
 { name: "Ground", role: "App shell", hex: "#3B2513", text: "text-[#FFF9F0]" },
 { name: "Paper", role: "Surface", hex: "#FFF9F0", text: "text-[#3B2513]" },
 { name: "Clay", role: "Brand action", hex: "#C9956A", text: "text-[#2D1810]" },
 { name: "Success", role: "Done / paid", hex: "#009061", text: "text-white" },
 { name: "Info", role: "Updates", hex: "#2563EB", text: "text-white" },
 { name: "Learning", role: "Activities", hex: "#7C3AED", text: "text-white" },
 { name: "Warning", role: "Needs attention", hex: "#FF9A01", text: "text-[#2D1810]" },
 { name: "Danger", role: "Blocked / overdue", hex: "#CD3030", text: "text-white" },
]

const actions: IconCard[] = [
 {
 title: "Add child",
 detail: "Enrollment",
 Icon: Baby,
 tone: "bg-[#3B2513] text-[#FFF9F0]",
 surface: "bg-[#FFF9F0]",
 border: "border-[#E0BFA0]",
 },
 {
 title: "QR station",
 detail: "Attendance",
 Icon: QrCode,
 tone: "bg-[#2563EB] text-white",
 surface: "bg-[#EFF6FF]",
 border: "border-[#BBD4FF]",
 },
 {
 title: "New log",
 detail: "Care update",
 Icon: ClipboardList,
 tone: "bg-[#009061] text-white",
 surface: "bg-[#E1F5EC]",
 border: "border-[#9DDFC6]",
 },
 {
 title: "Invoice",
 detail: "Payments",
 Icon: WalletCards,
 tone: "bg-[#FF9A01] text-[#2D1810]",
 surface: "bg-[#FFF2D8]",
 border: "border-[#FFD28A]",
 },
 {
 title: "Reports",
 detail: "Operations",
 Icon: BarChart3,
 tone: "bg-[#7C3AED] text-white",
 surface: "bg-[#F3E8FF]",
 border: "border-[#D8B4FE]",
 },
]

const metrics: IconCard[] = [
 {
 title: "Present today",
 detail: "86 children checked in",
 Icon: CheckCircle2,
 tone: "bg-[#009061] text-white",
 surface: "bg-[#FFF9F0]",
 border: "border-[#9DDFC6]",
 },
 {
 title: "Meals served",
 detail: "42 lunch logs completed",
 Icon: Utensils,
 tone: "bg-[#FF9A01] text-[#2D1810]",
 surface: "bg-[#FFF9F0]",
 border: "border-[#FFD28A]",
 },
 {
 title: "Health notes",
 detail: "3 items need review",
 Icon: HeartPulse,
 tone: "bg-[#CD3030] text-white",
 surface: "bg-[#FFF9F0]",
 border: "border-[#F3B0B0]",
 },
]

const alerts = [
 {
 title: "Daily report sent successfully",
 description: "Parents can now view meals, nap time, and activities.",
 Icon: CheckCircle2,
 className: "border-[#007A53] bg-[#002D1D] text-[#60F2B5]",
 },
 {
 title: "Pickup time changed",
 description: "Independent caregiver receives a parent approval prompt.",
 Icon: Info,
 className: "border-[#1D4ED8] bg-[#EFF6FF] text-[#1D4ED8]",
 },
 {
 title: "Invoice reminder queued",
 description: "This reminder will go out at 4:00 PM.",
 Icon: AlertTriangle,
 className: "border-[#D97706] bg-[#FFF2D8] text-[#8A4B00]",
 },
 {
 title: "Medical form missing",
 description: "Block check-in until the parent completes it.",
 Icon: XCircle,
 className: "border-[#CD3030] bg-[#FDE8E8] text-[#A92323]",
 },
]

const tableRows = [
 { child: "Maya Johnson", category: "Health", owner: "Nurse Ada", state: "Needs review", color: "bg-[#FDE8E8] text-[#A92323]" },
 { child: "Leo Martins", category: "Fees", owner: "Finance", state: "Paid", color: "bg-[#E1F5EC] text-[#006B48]" },
 { child: "Imani Cole", category: "Learning", owner: "Starfish Room", state: "Shared", color: "bg-[#F3E8FF] text-[#6D28D9]" },
]

function Swatch({ item }: { item: PaletteItem }) {
 return (
 <div className="overflow-hidden rounded-lg border border-[#DCC7AF] bg-[#FFF9F0] ">
  <div
  className={`flex h-24 items-end p-4 ${item.text}`}
  style={{ backgroundColor: item.hex }}
  >
  <span className="text-sm font-bold">{item.hex}</span>
  </div>
  <div className="p-4">
  <p className="text-sm font-bold text-[#2D1810]">{item.name}</p>
  <p className="mt-1 text-xs font-medium text-[#6B7280]">{item.role}</p>
  </div>
 </div>
 )
}

function ActionTile({ item }: { item: IconCard }) {
 const Icon = item.Icon

 return (
 <div className={`rounded-lg border ${item.border} ${item.surface} p-4 `}>
  <div className="flex items-start justify-between gap-4">
  <div>
   <p className="text-sm font-bold text-[#2D1810]">{item.title}</p>
   <p className="mt-1 text-xs font-medium text-[#6B7280]">{item.detail}</p>
  </div>
  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.tone}`}>
   <Icon className="h-5 w-5" />
  </div>
  </div>
 </div>
 )
}

function Section({
 title,
 eyebrow,
 children,
}: {
 title: string
 eyebrow: string
 children: ReactNode
}) {
 return (
 <section className="border-t border-[#E0BFA0] py-10">
  <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
  <div>
   <p className="text-xs font-bold uppercase text-[#9A6033]">{eyebrow}</p>
   <h2 className="mt-1 text-2xl font-bold text-[#2D1810]" style={fontHeading}>
   {title}
   </h2>
  </div>
  <div className="h-2 w-28 rounded-full bg-[linear-gradient(90deg,#009061,#2563EB,#7C3AED,#FF9A01,#CD3030)]" />
  </div>
  {children}
 </section>
 )
}

export default function VibrantLibraryPreviewPage() {
 return (
 <main className="min-h-screen bg-[#F5F0E8] font-[family-name:var(--font-urbanist-import)] text-[#2D1810]">
  <div className="mx-auto flex w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10">
  <header className="grid gap-6 rounded-lg border border-[#4A2F18] bg-[#3B2513] p-5 text-[#FFF9F0] lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
   <div className="flex min-h-[260px] flex-col justify-between">
   <div>
    <div className="mb-8 flex items-center gap-3">
    <span className="rounded-lg bg-[#FFF9F0] px-3 py-2 text-2xl text-[#3B2513]" style={fontDisplay}>
     CEven
    </span>
    <span className="rounded-full border border-[#E0BFA0]/50 px-3 py-1 text-xs font-bold uppercase text-[#E0BFA0]">
     Vibrant preview
    </span>
    </div>
    <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl" style={fontHeading}>
    A warmer, brighter system for admin, parent, and independent caregiver moments.
    </h1>
   </div>
   <div className="mt-8 grid gap-3 sm:grid-cols-3">
    <div className="rounded-lg border border-[#E0BFA0]/35 bg-[#4A2F18] p-4">
    <p className="text-xs font-bold uppercase text-[#E0BFA0]">Display</p>
    <p className="mt-2 text-2xl text-[#FFF9F0]" style={fontDisplay}>Mogra</p>
    </div>
    <div className="rounded-lg border border-[#E0BFA0]/35 bg-[#4A2F18] p-4">
    <p className="text-xs font-bold uppercase text-[#E0BFA0]">Heading</p>
    <p className="mt-2 text-xl font-bold text-[#FFF9F0]" style={fontHeading}>Merriweather</p>
    </div>
    <div className="rounded-lg border border-[#E0BFA0]/35 bg-[#4A2F18] p-4">
    <p className="text-xs font-bold uppercase text-[#E0BFA0]">Interface</p>
    <p className="mt-2 text-xl font-bold text-[#FFF9F0]">Urbanist</p>
    </div>
   </div>
   </div>

   <div className="rounded-lg border border-[#E0BFA0] bg-[#FFF9F0] p-4 text-[#2D1810]">
   <div className="mb-4 flex items-center justify-between">
    <div>
    <p className="text-xs font-bold uppercase text-[#9A6033]">Today</p>
    <p className="text-lg font-bold" style={fontHeading}>Care command</p>
    </div>
    <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B2513] text-[#FFF9F0]" aria-label="Add item">
    <Plus className="h-5 w-5" />
    </button>
   </div>
   <div className="space-y-3">
    {metrics.map((item) => (
    <ActionTile key={item.title} item={item} />
    ))}
   </div>
   </div>
  </header>

  <Section eyebrow="Color language" title="Warm foundation, vivid meaning">
   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
   {palette.map((item) => (
    <Swatch key={item.name} item={item} />
   ))}
   </div>
  </Section>

  <Section eyebrow="Actions" title="Quick tiles that feel alive">
   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
   {actions.map((item) => (
    <ActionTile key={item.title} item={item} />
   ))}
   </div>
  </Section>

  <Section eyebrow="Notifications" title="Colorful alerts with clean close affordances">
   <div className="grid gap-4 lg:grid-cols-2">
   {alerts.map((alert) => {
    const Icon = alert.Icon
    return (
    <div key={alert.title} className={`rounded-lg border p-4 ${alert.className}`}>
     <div className="flex items-start gap-3">
     <Icon className="mt-0.5 h-5 w-5 shrink-0" />
     <div className="min-w-0 flex-1">
      <p className="text-base font-bold">{alert.title}</p>
      <p className="mt-1 text-sm font-medium opacity-80">{alert.description}</p>
     </div>
     <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-current/30" aria-label="Dismiss alert">
      <XCircle className="h-4 w-4" />
     </button>
     </div>
    </div>
    )
   })}
   </div>
  </Section>

  <Section eyebrow="Forms" title="Friendly inputs, square selection controls">
   <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
   <div className="rounded-lg border border-[#DCC7AF] bg-[#FFF9F0] p-5 ">
    <label className="text-sm font-bold text-[#2D1810]" htmlFor="preview-child">
    Child name
    </label>
    <input
    id="preview-child"
    className="mt-2 h-11 w-full rounded-lg border border-[#C7B19B] bg-white px-3 text-sm font-medium outline-none ring-[#C9956A] placeholder:text-[#858C98] focus:ring-2"
    placeholder="Maya Johnson"
    />
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#3B2513] px-4 text-sm font-bold text-[#FFF9F0]">
     <ShieldCheck className="h-4 w-4" />
     Approve pickup
    </button>
    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#3B2513] px-4 text-sm font-bold text-[#3B2513]">
     <Bell className="h-4 w-4" />
     Notify parent
    </button>
    </div>
   </div>

   <div className="rounded-lg border border-[#DCC7AF] bg-[#FFF9F0] p-5 ">
    <p className="text-sm font-bold text-[#2D1810]">Care status</p>
    <div className="mt-3 grid gap-3 sm:grid-cols-3">
    {["Fed", "Napped", "Picked up"].map((label, index) => (
     <div key={label} className="flex items-center gap-3 rounded-lg bg-[#F5EDD8]/30 p-3">
     <span className={`flex h-5 w-5 items-center justify-center rounded border-2 ${index === 0 ? "border-[#009061] bg-[#009061]" : "border-[#9CA3AF]"}`}>
      {index === 0 ? <CheckCircle2 className="h-3.5 w-3.5 text-white" /> : null}
     </span>
     <span className="text-sm font-bold text-[#2D1810]">{label}</span>
     </div>
    ))}
    </div>
    <div className="mt-5 inline-flex rounded-lg bg-[#F5EDD8]/30 p-1">
    {["Parent", "Caregiver", "Admin"].map((item, index) => (
     <span key={item} className={`rounded-md px-4 py-2 text-sm font-bold ${index === 0 ? "bg-[#3B2513] text-[#FFF9F0]" : "text-[#3B2513]"}`}>
     {item}
     </span>
    ))}
    </div>
   </div>
   </div>
  </Section>

  <Section eyebrow="Parent and caregiver" title="Mobile surfaces with stronger care cues">
   <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
   <div className="rounded-lg border border-[#3B2513] bg-[#3B2513] p-3 ">
    <div className="rounded-lg bg-[#FFF9F0] p-4">
    <div className="mb-5 flex items-center justify-between">
     <div>
     <p className="text-xs font-bold uppercase text-[#9A6033]">Maya</p>
     <h3 className="text-xl font-bold text-[#2D1810]" style={fontHeading}>Today plan</h3>
     </div>
     <CalendarDays className="h-6 w-6 text-[#2563EB]" />
    </div>
    <div className="space-y-3">
     {[
     ["08:45", "Arrived with caregiver", "#009061"],
     ["12:10", "Lunch completed", "#FF9A01"],
     ["14:30", "Story circle", "#7C3AED"],
     ].map(([time, label, color]) => (
     <div key={label} className="flex gap-3 rounded-lg bg-[#F5EDD8]/30 p-3">
      <span className="h-10 w-1 rounded-full" style={{ backgroundColor: color }} />
      <div>
      <p className="text-xs font-bold text-[#6B7280]">{time}</p>
      <p className="text-sm font-bold text-[#2D1810]">{label}</p>
      </div>
     </div>
     ))}
    </div>
    <button className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#009061] text-sm font-bold text-white">
     <MessageSquare className="h-4 w-4" />
     Message caregiver
    </button>
    </div>
   </div>

   <div className="grid gap-4 md:grid-cols-2">
    <div className="rounded-lg border border-[#DCC7AF] bg-[#FFF9F0] p-5 ">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#F3E8FF] text-[#7C3AED]">
     <Sparkles className="h-5 w-5" />
    </div>
    <h3 className="text-lg font-bold text-[#2D1810]" style={fontHeading}>Learning moments</h3>
    <p className="mt-2 text-sm font-medium leading-6 text-[#5F5A55]">
     Activity cards can carry a vivid category color while keeping the cream surface and brown text consistent.
    </p>
    </div>
    <div className="rounded-lg border border-[#DCC7AF] bg-[#FFF9F0] p-5 ">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#E1F5EC] text-[#009061]">
     <ShieldCheck className="h-5 w-5" />
    </div>
    <h3 className="text-lg font-bold text-[#2D1810]" style={fontHeading}>Independent caregiver</h3>
    <p className="mt-2 text-sm font-medium leading-6 text-[#5F5A55]">
     Parent-invited flows should feel connected to family care without inheriting creche-only admin language.
    </p>
    </div>
   </div>
   </div>
  </Section>

  <Section eyebrow="Admin data" title="Tables and lists can carry category color">
   <div className="overflow-hidden rounded-lg border border-[#DCC7AF] bg-[#FFF9F0] ">
   <div className="grid grid-cols-4 gap-4 bg-[#EDD9C0] px-4 py-3 text-xs font-bold uppercase text-[#3B2513]">
    <span>Child</span>
    <span>Category</span>
    <span>Owner</span>
    <span>Status</span>
   </div>
   {tableRows.map((row) => (
    <div key={row.child} className="grid grid-cols-4 gap-4 border-t border-[#E9D8C6] px-4 py-4 text-sm font-medium">
    <span className="font-bold text-[#2D1810]">{row.child}</span>
    <span>{row.category}</span>
    <span className="text-[#6B7280]">{row.owner}</span>
    <span>
     <span className={`rounded-full px-3 py-1 text-xs font-bold ${row.color}`}>
     {row.state}
     </span>
    </span>
    </div>
   ))}
   </div>
  </Section>

  <footer className="pb-8 pt-2 text-sm font-medium text-[#6B7280]">
   Preview only. The live /library route has not been changed.
  </footer>
  </div>
 </main>
 )
}
