"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Button,
  Badge,
  Input,
  InputField,
  InputHint,
  Textarea,
  TextareaHint,
  Switch,
  Checkbox,
  Skeleton,
  Progress,
  ProgressLabel,
  ProgressValue,
  CircularProgress,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
  Separator,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Slider,
  Tag,
  EmptyState,
  Pagination,
  PaginationPrevious,
  PaginationNext,
  DatePicker,
  SearchBar,
  Snackbar,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  AlertBanner,
  ProgressSteps,
  FileUpload,
  CodeBlock,
  ActivityFeed,
  StatCard,
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui"
import { FeatureGrid, FeatureCard, CTABanner } from "@/components/marketing"
import { toast } from "sonner"
import {
  Plus,
  Search,
  ChevronDown,
  Sparkle,
  ChevronLeft,
  ChevronRight,
  Download,
  Check,
  Send,
  Info,
  Trash2,
  Bell,
  Eye,
  EyeOff,
  Calendar,
  Star,
  Heart,
  User,
  X,
  Home,
  Menu,
  FileText,
  BarChart3,
  Settings,
  Mail,
  Globe,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  Phone,
  Share2,
  Copy,
  Bookmark,
  Lock,
  Unlock,
  Camera,
  Mic,
  Play,
  Pause,
  Volume2,
  ImageIcon,
  MapPin,
  Edit3,
  Filter,
  RefreshCw,
  HelpCircle,
  Zap,
  Minus,
  Users,
  Upload,
  UserCheck,
  Clock,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  ThumbsUp,
  ThumbsDown,
  Video,
  Paperclip,
  SendHorizontal,
  AtSign,
} from "lucide-react"

const NAV_GROUPS = [
  {
    label: "Brand",
    items: [
      { id: "logos", label: "Logo" },
    ],
  },
  {
    label: "Application",
    items: [
      { id: "progress", label: "Progress" },
      { id: "native", label: "Native" },
      { id: "navigation", label: "Navigation" },
      { id: "cards", label: "Cards" },
      { id: "tables", label: "Tables" },
    ],
  },
  {
    label: "Brand",
    items: [
      { id: "icons", label: "Icons" },
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "text-combos", label: "Text Combos" },
    ],
  },
  {
    label: "Shared Components",
    items: [
      { id: "buttons", label: "Buttons" },
      { id: "icon-buttons", label: "Icon Buttons" },
      { id: "badges", label: "Badges" },
      { id: "labels", label: "Labels" },
      { id: "tags", label: "Tags" },
      { id: "avatars", label: "Avatars" },
      { id: "tooltips", label: "Tooltips" },
      { id: "snackbar", label: "Snackbar" },
    ],
  },
  {
    label: "Form Controls",
    items: [
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio Buttons" },
      { id: "switches", label: "Toggles & Switches" },
      { id: "sliders", label: "Sliders" },
      { id: "otp", label: "OTP Box" },
      { id: "input-fields", label: "Input Fields" },
      { id: "text-area", label: "Text Area" },
      { id: "dropdown", label: "Dropdown" },
      { id: "dropdown-list", label: "Dropdown List Item" },
      { id: "date-picker", label: "Date Picker" },
      { id: "searchbar", label: "Search Bar" },
    ],
  },
  {
    label: "Application",
    items: [
      { id: "tabs", label: "Tabs" },
      { id: "modals", label: "Modals & Dialogs" },
      { id: "alerts", label: "Alerts & Notifications" },
      { id: "empty-state", label: "Empty States" },
      { id: "pagination", label: "Pagination" },
      { id: "progress-steps", label: "Progress Steps" },
      { id: "file-upload", label: "File Upload" },
      { id: "code-blocks", label: "Code Blocks" },
      { id: "activity-feeds", label: "Activity Feeds" },
    ],
  },
  {
    label: "AI",
    items: [
      { id: "ai-chat", label: "AI Chat Interface" },
      { id: "ai-messages", label: "AI Messages" },
      { id: "ai-empty", label: "AI Empty State" },
      { id: "ai-input", label: "AI Input Bar" },
      { id: "ai-typing", label: "AI Typing Indicator" },
      { id: "ai-risk", label: "AI Risk Badge" },
    ],
  },
  {
    label: "Messaging",
    items: [
      { id: "msg-thread-list", label: "Thread List" },
      { id: "msg-1on1", label: "1-on-1 Chat" },
      { id: "msg-group", label: "Group Chat" },
      { id: "msg-bubbles", label: "Message Bubbles" },
      { id: "msg-input", label: "Chat Input" },
      { id: "msg-session", label: "Session & Trial" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { id: "marketing", label: "Marketing Sections" },
    ],
  },
]

const AGENT_PROMPT = `Reference the CEven Design System at /library for all UI decisions.

Before building any component, visit /library to see existing patterns for:
- Colors, typography, spacing, and border radius
- Buttons, badges, inputs, cards, tables, modals, alerts
- Chat/messaging components (bubbles, inputs, thread lists)
- AI components (chat interface, typing indicator, risk badge)
- Marketing sections (feature grid, CTA banner)

Reuse existing components from components/ui/ and components/marketing/.
Do not create new component variants without checking /library first.
All styling must follow the 8px grid and rounded-[8px] convention.`

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-h2 text-heading mb-4">{children}</h2>
  )
}

function SectionDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-body-sm text-muted-text mb-6">
      {children}
    </p>
  )
}

function ComponentShowcase({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="mb-20">
      {title && <h3 className="text-h5 text-heading mb-4">{title}</h3>}
      <div className="rounded-[8px] border border-border bg-white p-6">
        {children}
      </div>
    </div>
  )
}

const snackbarColors = ["success", "default", "tan", "light-success", "light-danger"] as const
const snackbarLabels = ["Success", "Default", "Tan", "Light Success", "Light Danger"] as const

function SnackbarShowcase() {
  const [visible, setVisible] = React.useState<Record<string, boolean>>(
    () => Object.fromEntries(snackbarColors.map((c) => [c, true])) as Record<string, boolean>
  )
  return (
    <div className="space-y-4 max-w-sm">
      {snackbarColors.map((variant, i) => (
        visible[variant] ? (
          <Snackbar
            key={variant}
            variant={variant}
            onClose={() => setVisible((v) => ({ ...v, [variant]: false }))}
          >
            {snackbarLabels[i]} notification
          </Snackbar>
        ) : (
          <button
            key={variant}
            onClick={() => setVisible((v) => ({ ...v, [variant]: true }))}
            className="text-xs text-muted-text underline underline-offset-2 hover:text-heading"
          >
            Show {snackbarLabels[i]} again
          </button>
        )
      ))}
    </div>
  )
}

export default function LibraryPage() {
  const [activeSection, setActiveSection] = React.useState("logos")
  const [scrollContainerRef, setScrollContainerRef] = React.useState<HTMLDivElement | null>(null)
  const [sidebarSearch, setSidebarSearch] = React.useState("")
  const [copiedPrompt, setCopiedPrompt] = React.useState(false)
  const [promptOpen, setPromptOpen] = React.useState(false)

  const [checkboxes, setCheckboxes] = React.useState({
    unchecked: false,
    checked: true,
    brand: true,
    disabled: false,
  })

  const [radioValue, setRadioValue] = React.useState("option1")
  const [switches, setSwitches] = React.useState({
    defaultOn: true,
    defaultOff: false,
    success: true,
    danger: false,
    disabled: false,
  })

  const [searchValue, setSearchValue] = React.useState("")
  const [datePickerDate, setDatePickerDate] = React.useState<Date | null>(new Date())
  const [otpValues, setOtpValues] = React.useState(["", "", "", "", "", ""])
  const [textareaValue, setTextareaValue] = React.useState("")
  const [textareaWithTags, setTextareaWithTags] = React.useState("Keep up with our newsletters for the latest updates")

  const otpRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1)
    const newValues = [...otpValues]
    newValues[index] = value
    setOtpValues(newValues)
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const [navActive, setNavActive] = React.useState("home")
  const [selectValue, setSelectValue] = React.useState("option2")
  const [multiSelectValues, setMultiSelectValues] = React.useState<string[]>(["option2", "option3"])

  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  React.useEffect(() => {
    const mainEl = document.querySelector("main")
    if (!mainEl) return

    const sectionIds = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { root: mainEl, rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="h-screen bg-[#F8F6F3]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed, internal scroll */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-60 shrink-0 border-r border-border bg-white p-4 overflow-y-auto scrollbar-thin transition-transform duration-200 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
          <div className="mb-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img src="/Logo/icon.svg" alt="CEven" className="h-8 w-8 object-contain" />
              <span style={{ fontFamily: "var(--font-mogra-import)" }} className="text-lg text-brand-dark">CEven</span>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="size-5 text-muted-text" />
            </button>
          </div>

          <div className="mb-4">
            <span className="text-overline text-muted-text">Design System</span>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 rounded-[8px] bg-gray-50 px-3 py-2">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                placeholder="Search components..."
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
              />
              {sidebarSearch && (
                <button onClick={() => setSidebarSearch("")} className="shrink-0">
                  <X size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          <nav className="space-y-4">
            {NAV_GROUPS.map((group) => {
              const filteredItems = group.items.filter((item) =>
                item.label.toLowerCase().includes(sidebarSearch.toLowerCase())
              )
              if (filteredItems.length === 0) return null
              return (
                <div key={group.label}>
                  <p className="text-ui-xs text-muted-text mb-2.5 font-semibold uppercase tracking-wider">
                    {group.label}
                  </p>
                  <ul className="space-y-0.5">
                    {filteredItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault()
                            setActiveSection(item.id)
                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                          }}
                          className={cn(
                            "flex items-center rounded-[8px] px-4 py-2 text-sm transition-colors",
                            activeSection === item.id
                              ? "bg-[#FFF3E6] font-medium text-brand-dark"
                              : "text-muted-text hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto h-screen lg:pl-60">
          {/* Mobile header */}
          <div className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-[#F8F6F3] px-4 py-4 lg:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="size-5 text-heading" />
            </button>
            <span style={{ fontFamily: "var(--font-mogra-import)" }} className="text-lg text-brand-dark">CEven</span>
          </div>

          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <div className="mb-20">
              <h1 style={{ fontFamily: "var(--font-merriweather-import)" }} className="text-[2.5rem] leading-[1.2] text-heading font-bold mb-4">
                CEven Design System
              </h1>
              <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-lg leading-[1.5] text-foreground mb-4">
                The style guide provides the foundation for all stylistic decisions across the CEven design site.
              </p>
              <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-base leading-[1.5] text-muted-text">
                Built with Next.js, Tailwind CSS, and Base UI. Every component follows the 8px grid system with 8px border radius.
              </p>
            </div>

            <div className="mb-20 rounded-[8px] border border-border bg-white">
              <button
                onClick={() => setPromptOpen(!promptOpen)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-sm font-semibold text-heading">
                  Agent Prompt
                </p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigator.clipboard.writeText(AGENT_PROMPT)
                      setCopiedPrompt(true)
                      setTimeout(() => setCopiedPrompt(false), 2000)
                    }}
                    className="flex items-center gap-1.5 rounded-[8px] bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    {copiedPrompt ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                    {copiedPrompt ? "Copied" : "Copy"}
                  </button>
                  <ChevronDown size={16} className={cn("text-gray-400 transition-transform", promptOpen && "rotate-180")} />
                </div>
              </button>
              {promptOpen && (
                <div className="px-6 pb-4">
                  <pre style={{ fontFamily: "var(--font-nunito-import)" }} className="text-xs leading-relaxed text-muted-text whitespace-pre-wrap">
                    {AGENT_PROMPT}
                  </pre>
                </div>
              )}
            </div>

            <Separator className="mb-20" />

            {/* ─── 1. Logo ─────────────────────────────────────────────── */}
            <section id="logos" className="mb-26">
              <SectionTitle>Logo</SectionTitle>
              <SectionDescription>
                The CEven logo in multiple sizes and configurations.
              </SectionDescription>
              <ComponentShowcase title="Full Logo">
                <div className="flex flex-wrap items-end gap-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-32 w-32">
                      <img src="/Logo/CEVEN APP 1.svg" alt="CEven Logo Large" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Large</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-20 w-20">
                      <img src="/Logo/CEVEN APP 1.svg" alt="CEven Logo Medium" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-12 w-12">
                      <img src="/Logo/CEVEN APP 1.svg" alt="CEven Logo Small" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Small</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-8 w-8">
                      <img src="/Logo/CEVEN APP 1.svg" alt="CEven Logo Tiny" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Tiny</span>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Icon Only">
                <div className="flex flex-wrap items-end gap-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-16 w-16">
                      <img src="/Logo/icon.svg" alt="CEven Icon Large" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Large</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-12 w-12">
                      <img src="/Logo/icon.svg" alt="CEven Icon Medium" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-8 w-8">
                      <img src="/Logo/icon.svg" alt="CEven Icon Small" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Small</span>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-6 w-6">
                      <img src="/Logo/icon.svg" alt="CEven Icon Tiny" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Tiny</span>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Favicons">
                <div className="flex flex-wrap items-end gap-8">
                  <div className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[8px] bg-white border border-border shadow-sm">
                      <Image src="/favicon.ico" alt="favicon.ico" width={32} height={32} unoptimized />
                    </div>
                    <p className="text-caption text-muted-text mt-2">favicon.ico</p>
                    <p className="text-[10px] text-muted-text">Browser tab</p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[8px] bg-white border border-border shadow-sm">
                      <Image src="/apple-touch-icon.png" alt="apple-touch-icon" width={48} height={48} unoptimized />
                    </div>
                    <p className="text-caption text-muted-text mt-2">apple-touch-icon.png</p>
                    <p className="text-[10px] text-muted-text">iOS home screen</p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[8px] bg-white border border-border shadow-sm">
                      <Image src="/favicon-32x32.png" alt="favicon-32" width={32} height={32} unoptimized />
                    </div>
                    <p className="text-caption text-muted-text mt-2">favicon-32x32.png</p>
                    <p className="text-[10px] text-muted-text">Standard</p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[8px] bg-white border border-border shadow-sm">
                      <Image src="/favicon-16x16.png" alt="favicon-16" width={16} height={16} unoptimized />
                    </div>
                    <p className="text-caption text-muted-text mt-2">favicon-16x16.png</p>
                    <p className="text-[10px] text-muted-text">Small</p>
                  </div>
                  <div className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-[8px] bg-brand-dark">
                      <Image src="/Logo/icon.svg" alt="Icon" width={40} height={40} unoptimized className="brightness-0 invert" />
                    </div>
                    <p className="text-caption text-muted-text mt-2">icon.svg</p>
                    <p className="text-[10px] text-muted-text">Icon only</p>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 2. Progress Bar ─────────────────────────────────────── */}
            <section id="progress" className="mb-26">
              <SectionTitle>Progress Bar</SectionTitle>
              <SectionDescription>
                Loading indicators in circular and linear forms.
              </SectionDescription>
              <ComponentShowcase title="Circular Progress">
                <div className="flex items-center gap-6">
                  <CircularProgress size={32} strokeWidth={3} indeterminate />
                  <CircularProgress size={36} strokeWidth={3.5} indeterminate />
                  <CircularProgress size={40} strokeWidth={4} indeterminate />
                  <CircularProgress size={44} strokeWidth={4.5} indeterminate />
                  <CircularProgress size={48} strokeWidth={5} indeterminate />
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Linear Progress">
                <div className="space-y-4 max-w-md">
                  <Progress value={20}>
                    <ProgressLabel>Uploading...</ProgressLabel>
                    <ProgressValue />
                  </Progress>
                  <Progress value={50}>
                    <ProgressLabel>Processing...</ProgressLabel>
                    <ProgressValue />
                  </Progress>
                  <Progress value={80}>
                    <ProgressLabel>Nearly done...</ProgressLabel>
                    <ProgressValue />
                  </Progress>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 3. Native ──────────────────────────────────────────── */}
            <section id="native" className="mb-26">
              <SectionTitle>Native</SectionTitle>
              <SectionDescription>
                Native iOS and Android UI elements for reference.
              </SectionDescription>
              <ComponentShowcase title="iOS Status Bar">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-full max-w-xs rounded-[8px] bg-[#F2F2F7] p-4 text-center">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>9:41</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px]">●●●●</span>
                        <span className="text-[10px]">WiFi</span>
                        <span className="text-[10px]">🔋</span>
                      </div>
                    </div>
                    <div className="mt-2 mx-auto h-[28px] w-[120px] rounded-full bg-black" />
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Android Status Bar">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-full max-w-xs rounded-[8px] bg-white p-4 text-center border border-gray-200">
                    <div className="flex items-center justify-between text-xs text-gray-800">
                      <span className="text-[10px] font-medium">9:41</span>
                      <div className="flex items-center gap-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0 1 19 12.55M5 12.55a10.94 10.94 0 0 1 5.17-2.39M10.71 5.05A16 16 0 0 1 22.56 9M1.42 9a15.91 15.91 0 0 1 4.7-2.88M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" /></svg>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2" /><line x1="23" y1="13" x2="23" y2="11" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 4. Navigation ──────────────────────────────────────── */}
            <section id="navigation" className="mb-26">
              <SectionTitle>Navigation</SectionTitle>
              <SectionDescription>
                Device status bars and mobile bottom navigation.
              </SectionDescription>
              <ComponentShowcase title="iOS Status Bar">
                <div className="space-y-4">
                  <div className="rounded-[8px] bg-[#E5E5EA] px-6 py-3 flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-black">9:41</span>
                    <div className="flex items-center gap-2">
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 3.5C9.8 3.5 11.4 4.2 12.6 5.3L14.1 3.8C12.5 2.3 10.4 1.5 8 1.5C5.6 1.5 3.5 2.3 1.9 3.8L3.4 5.3C4.6 4.2 6.2 3.5 8 3.5Z" fill="black"/><path d="M8 6.5C9.1 6.5 10.1 6.9 10.8 7.6L12.3 6.1C11.2 5.1 9.7 4.5 8 4.5C6.3 4.5 4.8 5.1 3.7 6.1L5.2 7.6C5.9 6.9 6.9 6.5 8 6.5Z" fill="black"/><path d="M8 9.5C8.6 9.5 9.1 9.7 9.5 10.1L8 11.5L6.5 10.1C6.9 9.7 7.4 9.5 8 9.5Z" fill="black"/></svg>
                      <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="2" stroke="black" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="1" fill="black"/><path d="M22 4V8C22.8 8 23.5 7.1 23.5 6C23.5 4.9 22.8 4 22 4Z" fill="black" fillOpacity="0.4"/></svg>
                    </div>
                  </div>
                  <div className="rounded-[8px] bg-white px-6 py-3 flex items-center justify-between border border-border">
                    <span className="text-[14px] font-semibold text-black">9:41</span>
                    <div className="flex items-center gap-2">
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M8 3.5C9.8 3.5 11.4 4.2 12.6 5.3L14.1 3.8C12.5 2.3 10.4 1.5 8 1.5C5.6 1.5 3.5 2.3 1.9 3.8L3.4 5.3C4.6 4.2 6.2 3.5 8 3.5Z" fill="black"/><path d="M8 6.5C9.1 6.5 10.1 6.9 10.8 7.6L12.3 6.1C11.2 5.1 9.7 4.5 8 4.5C6.3 4.5 4.8 5.1 3.7 6.1L5.2 7.6C5.9 6.9 6.9 6.5 8 6.5Z" fill="black"/><path d="M8 9.5C8.6 9.5 9.1 9.7 9.5 10.1L8 11.5L6.5 10.1C6.9 9.7 7.4 9.5 8 9.5Z" fill="black"/></svg>
                      <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="2" stroke="black" strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="1" fill="black"/><path d="M22 4V8C22.8 8 23.5 7.1 23.5 6C23.5 4.9 22.8 4 22 4Z" fill="black" fillOpacity="0.4"/></svg>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Android Status Bar">
                <div className="space-y-4">
                  <div className="rounded-[8px] bg-[#F5F5F5] px-4 py-2 flex items-center justify-between">
                    <span className="text-[12px] text-black">9:41</span>
                    <div className="flex items-center gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg>
                    </div>
                  </div>
                  <div className="rounded-[8px] bg-black px-4 py-2 flex items-center justify-between">
                    <span className="text-[12px] text-white">9:41</span>
                    <div className="flex items-center gap-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Browser Chrome">
                <div className="space-y-4">
                  <div className="rounded-[8px] border border-border bg-[#F1F3F4] px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="size-3 rounded-full bg-[#FF5F57]" />
                        <div className="size-3 rounded-full bg-[#FFBD2E]" />
                        <div className="size-3 rounded-full bg-[#28CA41]" />
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex items-center gap-1 rounded-[8px] bg-white px-3 py-1 text-[12px] text-gray-600 border border-border flex-1">
                          <img src="/Logo/icon.svg" alt="" className="size-3" />
                          ceven.app/dashboard
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[8px] border border-border bg-white px-4 py-2">
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                      <div className="flex-1 flex items-center gap-1 rounded-[8px] bg-[#F1F3F4] px-3 py-1 text-[12px] text-gray-600">
                        <img src="/Logo/icon.svg" alt="" className="size-3" />
                        ceven.app/dashboard
                      </div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Bottom Navigation">
                <div className="flex flex-col items-center gap-8">
                  {(["home", "creche", "report", "profile"] as const).map((tab) => (
                    <div key={tab} className="w-full max-w-sm">
                      <div className="flex items-center justify-around rounded-[16px] bg-white px-4 py-3 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border border-gray-100">
                        {(["home", "creche", "report", "profile"] as const).map((item) => {
                          const isActive = tab === item
                          const labels = { home: "Home", creche: "Creche", report: "Report", profile: "Profile" }
                          return (
                            <div key={item} className="flex flex-col items-center gap-1">
                              <div className={cn(
                                "flex items-center justify-center rounded-full transition-all",
                                isActive ? "bg-[#E0BFA0] px-5 py-2" : "px-5 py-2"
                              )}>
                                {item === "home" && (
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#3B2513" : "#9CA3AF"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9 22 9 12 15 12 15 22"/>
                                  </svg>
                                )}
                                {item === "creche" && (
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#3B2513" : "#9CA3AF"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"/>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                                  </svg>
                                )}
                                {item === "report" && (
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#3B2513" : "#9CA3AF"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                    <line x1="8" y1="13" x2="16" y2="13"/>
                                    <line x1="8" y1="17" x2="12" y2="17"/>
                                  </svg>
                                )}
                                {item === "profile" && (
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#3B2513" : "#9CA3AF"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                  </svg>
                                )}
                              </div>
                              <span className={cn(
                                "text-xs transition-colors",
                                isActive ? "font-bold text-brand-dark" : "text-gray-400"
                              )}>
                                {labels[item]}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                      <div className="mx-auto mt-3 h-1.5 w-32 rounded-full bg-gray-400" />
                    </div>
                  ))}
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Cards ──────────────────────────────────────────────── */}
            <section id="cards" className="mb-26">
              <SectionTitle>Cards</SectionTitle>
              <SectionDescription>Card components for displaying data and statistics.</SectionDescription>
              <ComponentShowcase title="Stat Cards">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <StatCard label="Total Children" value={128} change="+12%" changeType="positive" icon={<Users className="size-5" />} />
                  <StatCard label="Active Caregivers" value={24} change="+3" changeType="positive" icon={<UserCheck className="size-5" />} />
                  <StatCard label="Pending Requests" value={7} change="-2" changeType="negative" icon={<Clock className="size-5" />} />
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Tables ──────────────────────────────────────────────── */}
            <section id="tables" className="mb-26">
              <SectionTitle>Tables</SectionTitle>
              <SectionDescription>Data tables with sorting indicators.</SectionDescription>
              <ComponentShowcase>
                <Table>
                  <TableCaption>A list of children enrolled.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Guardian</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "Emma Johnson", age: 4, guardian: "Sarah Johnson", status: "Active" },
                      { name: "Liam Smith", age: 3, guardian: "John Smith", status: "Active" },
                      { name: "Olivia Brown", age: 5, guardian: "Mike Brown", status: "Pending" },
                    ].map((row) => (
                      <TableRow key={row.name}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell>{row.age} years</TableCell>
                        <TableCell>{row.guardian}</TableCell>
                        <TableCell className="text-right">
                          {row.status === "Active" ? (
                            <span className="inline-flex items-center rounded-full border border-[#009061]/20 bg-[#E1F5EC] px-2 py-0.5 text-xs font-medium text-[#009061]">
                              {row.status}
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full border border-[#FF9A01]/20 bg-[#F9F1E6] px-2 py-0.5 text-xs font-medium text-[#FF9A01]">
                              {row.status}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ComponentShowcase>
            </section>

            {/* ─── 5. Icons ───────────────────────────────────────────── */}
            <section id="icons" className="mb-26">
              <SectionTitle>Icons</SectionTitle>
              <SectionDescription>
                Lucide React outline icons and CEven custom filled icons.
              </SectionDescription>
              <ComponentShowcase title="AI (Custom)">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-4">
                  <div className="flex flex-col items-center gap-2 p-2">
                    <Sparkle className="size-5 text-foreground" />
                    <span className="text-[10px] text-muted-text text-center leading-tight">SparkleOutline</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-2">
                    <AiSparkleIcon size={20} className="text-foreground" />
                    <span className="text-[10px] text-muted-text text-center leading-tight">SparkleFilled</span>
                  </div>
                </div>
              </ComponentShowcase>
              <div className="space-y-4">
                {[
                  {
                    label: "Navigation & Actions",
                    icons: [
                      { Icon: ArrowLeft, name: "ArrowLeft" },
                      { Icon: ArrowRight, name: "ArrowRight" },
                      { Icon: ChevronDown, name: "ChevronDown" },
                      { Icon: ChevronRight, name: "ChevronRight" },
                      { Icon: Search, name: "Search" },
                      { Icon: Filter, name: "Filter" },
                      { Icon: RefreshCw, name: "RefreshCw" },
                      { Icon: Send, name: "Send" },
                    ],
                  },
                  {
                    label: "CRUD & Editing",
                    icons: [
                      { Icon: Plus, name: "Plus" },
                      { Icon: Edit3, name: "Edit3" },
                      { Icon: Trash2, name: "Trash2" },
                      { Icon: Copy, name: "Copy" },
                      { Icon: Download, name: "Download" },
                      { Icon: Upload, name: "Upload" },
                      { Icon: Share2, name: "Share2" },
                      { Icon: Bookmark, name: "Bookmark" },
                    ],
                  },
                  {
                    label: "Status & Feedback",
                    icons: [
                      { Icon: CheckCircle2, name: "CheckCircle2" },
                      { Icon: AlertTriangle, name: "AlertTriangle" },
                      { Icon: AlertCircle, name: "AlertCircle" },
                      { Icon: Info, name: "Info" },
                      { Icon: XCircle, name: "XCircle" },
                      { Icon: Check, name: "Check" },
                      { Icon: X, name: "X" },
                      { Icon: Minus, name: "Minus" },
                    ],
                  },
                  {
                    label: "Data & Analytics",
                    icons: [
                      { Icon: BarChart3, name: "BarChart3" },
                      { Icon: Star, name: "Star" },
                      { Icon: CreditCard, name: "CreditCard" },
                      { Icon: TrendingUp, name: "TrendingUp" },
                    ],
                  },
                  {
                    label: "People",
                    icons: [
                      { Icon: Users, name: "Users" },
                      { Icon: UserCheck, name: "UserCheck" },
                      { Icon: Heart, name: "Heart" },
                      { Icon: ShieldCheck, name: "ShieldCheck" },
                    ],
                  },
                  {
                    label: "Content & Media",
                    icons: [
                      { Icon: FileText, name: "FileText" },
                      { Icon: Camera, name: "Camera" },
                      { Icon: Calendar, name: "Calendar" },
                      { Icon: Clock, name: "Clock" },
                      { Icon: Bell, name: "Bell" },
                      { Icon: Mail, name: "Mail" },
                      { Icon: Phone, name: "Phone" },
                      { Icon: Globe, name: "Globe" },
                    ],
                  },
                  {
                    label: "App & System",
                    icons: [
                      { Icon: Settings, name: "Settings" },
                      { Icon: Eye, name: "Eye" },
                      { Icon: EyeOff, name: "EyeOff" },
                      { Icon: Lock, name: "Lock" },
                      { Icon: HelpCircle, name: "HelpCircle" },
                      { Icon: Zap, name: "Zap" },
                      { Icon: Mic, name: "Mic" },
                      { Icon: Play, name: "Play" },
                      { Icon: Pause, name: "Pause" },
                      { Icon: Volume2, name: "Volume2" },
                    ],
                  },
                ].map((group) => (
                  <ComponentShowcase key={group.label} title={group.label}>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-4">
                      {group.icons.map(({ Icon, name }) => (
                        <div key={name} className="flex flex-col items-center gap-2 p-2">
                          <Icon className="size-5 text-foreground" />
                          <span className="text-[10px] text-muted-text text-center leading-tight">{name}</span>
                        </div>
                      ))}
                    </div>
                  </ComponentShowcase>
                ))}
              </div>
            </section>

            {/* ─── Colors ─────────────────────────────────────────────── */}
            <section id="colors" className="mb-26">
              <SectionTitle>Colors</SectionTitle>
              <SectionDescription>Brand color palette used throughout the CEven design system.</SectionDescription>
              <ComponentShowcase>
                <div className="space-y-6">
                  {/* Brand Colors */}
                  <div>
                    <p className="text-ui-sm text-muted-text mb-4 font-semibold">Brand</p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { name: "Brand Dark", value: "#3B2513" },
                        { name: "Brand Accent", value: "#9A6033" },
                        { name: "Button BG", value: "#E0BFA0" },
                        { name: "Button Border", value: "#D4A67F" },
                        { name: "Content BG", value: "#FFF9F0" },
                        { name: "Table Header", value: "#EDD9C0" },
                      ].map((c) => (
                        <div key={c.name} className="flex flex-col items-center gap-2">
                          <div className="size-16 rounded-[8px] border border-border shadow-sm" style={{ backgroundColor: c.value }} />
                          <span className="text-caption text-center">{c.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{c.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Semantic Colors */}
                  <div>
                    <p className="text-ui-sm text-muted-text mb-4 font-semibold">Semantic</p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { name: "Success", value: "#009061" },
                        { name: "Success Light", value: "#E1F5EC" },
                        { name: "Warning", value: "#FF9A01" },
                        { name: "Warning Light", value: "#F9F1E6" },
                        { name: "Danger", value: "#CD3030" },
                        { name: "Danger Light", value: "#FDE8E8" },
                        { name: "Info", value: "#3B82F6" },
                        { name: "Info Light", value: "#EFF6FF" },
                      ].map((c) => (
                        <div key={c.name} className="flex flex-col items-center gap-2">
                          <div className="size-16 rounded-[8px] border border-border shadow-sm" style={{ backgroundColor: c.value }} />
                          <span className="text-caption text-center">{c.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{c.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Neutrals */}
                  <div>
                    <p className="text-ui-sm text-muted-text mb-4 font-semibold">Neutrals</p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { name: "Heading", value: "#1F2937" },
                        { name: "Muted Text", value: "#6B7280" },
                        { name: "OTP Text", value: "#858C98" },
                        { name: "Input Border", value: "#CCD2DC" },
                        { name: "Card Border", value: "#E6EBF3" },
                        { name: "Table Border", value: "#EAECF0" },
                      ].map((c) => (
                        <div key={c.name} className="flex flex-col items-center gap-2">
                          <div className="size-16 rounded-[8px] border border-border shadow-sm" style={{ backgroundColor: c.value }} />
                          <span className="text-caption text-center">{c.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{c.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Typography ──────────────────────────────────────────── */}
            <section id="typography" className="mb-26">
              <SectionTitle>Typography</SectionTitle>
              <SectionDescription>Font families and type scale used in the CEven design system.</SectionDescription>
              <ComponentShowcase title="Font Families">
                <div className="space-y-4">
                  <div><p style={{ fontFamily: "var(--font-mogra-import)" }} className="text-2xl text-heading">Mogra — Display / Logo</p></div>
                  <div><p style={{ fontFamily: "var(--font-merriweather-import)" }} className="text-xl text-heading font-bold">Merriweather — Headings</p></div>
                  <div><p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-lg text-foreground font-medium">Urbanist — UI Labels</p></div>
                  <div><p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-base text-foreground">Nunito — Body Text</p></div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Type Scale">
                <div className="space-y-3">
                  <p style={{ fontFamily: "var(--font-mogra-import)" }} className="text-5xl text-heading">Display — Mogra 400</p>
                  <p style={{ fontFamily: "var(--font-merriweather-import)" }} className="text-[2.5rem] leading-tight text-heading font-bold">Heading 1 — Merriweather 700</p>
                  <p style={{ fontFamily: "var(--font-merriweather-import)" }} className="text-[2rem] leading-tight text-heading font-bold">Heading 2 — Merriweather 700</p>
                  <p style={{ fontFamily: "var(--font-merriweather-import)" }} className="text-2xl text-heading font-bold">Heading 3 — Merriweather 700</p>
                  <p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-xl text-heading font-semibold">Heading 4 — Urbanist 600</p>
                  <p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-lg text-heading font-semibold">Heading 5 — Urbanist 600</p>
                  <p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-base text-heading font-semibold">Heading 6 — Urbanist 600</p>
                  <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-lg text-foreground">Body Large — Nunito 400</p>
                  <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-base text-foreground">Body — Nunito 400</p>
                  <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-sm text-foreground">Body Small — Nunito 400</p>
                  <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-xs text-foreground">Body Extra Small — Nunito 400</p>
                  <p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-lg text-foreground font-medium">UI Large — Urbanist 500</p>
                  <p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-base text-foreground font-medium">UI — Urbanist 500</p>
                  <p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-sm text-foreground font-medium">UI Small — Urbanist 500</p>
                  <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-xs text-muted-text">Caption — Nunito 400 (muted)</p>
                  <p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-xs text-foreground font-semibold uppercase tracking-wider">Overline — Urbanist 600 Uppercase</p>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Text Combos ───────────────────────────────────────── */}
            <section id="text-combos" className="mb-26">
              <SectionTitle>Text Combos</SectionTitle>
              <SectionDescription>Real-world typography combinations with proper line heights.</SectionDescription>
              <ComponentShowcase title="Display md + Body lg + Body">
                <div className="max-w-2xl space-y-6">
                  <p style={{ fontFamily: "var(--font-merriweather-import)" }} className="text-[2.5rem] leading-[1.2] text-heading font-bold">
                    The Outermost House by Henry Beston
                  </p>
                  <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-lg leading-[1.5] text-foreground underline decoration-2 underline-offset-4 decoration-[#9A6033]">
                    In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.
                  </p>
                  <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-base leading-[1.5] text-muted-text">
                    They are not brethren; they are not underlings; they are other nations, caught with ourselves in the net of life and time, fellow prisoners of the splendor and travail of the earth.
                  </p>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Display md + Text xl + Text lg">
                <div className="max-w-2xl space-y-6">
                  <p style={{ fontFamily: "var(--font-merriweather-import)" }} className="text-[2.5rem] leading-[1.2] text-heading font-bold">
                    The Outermost House by H. Beston
                  </p>
                  <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-xl leading-[1.5] text-foreground underline decoration-2 underline-offset-4 decoration-[#9A6033]">
                    In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.
                  </p>
                  <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-lg leading-[1.5] text-muted-text">
                    They are not brethren; they are not underlings; they are other nations, caught with ourselves in the net of life and time, fellow prisoners of the splendor and travail of the earth.
                  </p>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Heading + UI Label + Body">
                <div className="max-w-2xl space-y-3">
                  <p style={{ fontFamily: "var(--font-merriweather-import)" }} className="text-2xl text-heading font-bold">
                    Daily Activity Report
                  </p>
                  <p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-sm text-muted-text font-medium uppercase tracking-wider">
                    January 15, 2025 — Sunshine Class
                  </p>
                  <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-base leading-relaxed text-foreground">
                    All children participated in outdoor play from 10:00 AM to 11:30 AM. Emma showed great progress in sharing activities. Lunch was served at 12:00 PM — menu included grilled chicken, rice, and steamed vegetables.
                  </p>
                </div>
              </ComponentShowcase>
            </section>


            {/* ─── 6. Buttons ─────────────────────────────────────────── */}
            <section id="buttons" className="mb-26">
              <SectionTitle>Button</SectionTitle>
              <SectionDescription>
                Buttons with 8px border radius. Four variants: dark brown, outline, tan fill, and text-only.
              </SectionDescription>
              <ComponentShowcase title="Variants">
                <div className="flex flex-col gap-4 max-w-xs">
                  <Button variant="brand" className="w-full">Button CTA</Button>
                  <Button variant="outline" className="w-full border-gray-300 text-foreground">Button CTA</Button>
                  <Button variant="tan" className="w-full">Button CTA</Button>
                  <Button variant="text-only" className="w-full">Button CTA</Button>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Sizes">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="brand" size="xs">Extra Small</Button>
                  <Button variant="brand" size="sm">Small</Button>
                  <Button variant="brand" size="default">Default</Button>
                  <Button variant="brand" size="lg">Large</Button>
                  <Button variant="brand" size="xl">Extra Large</Button>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="With Icons">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="brand"><Plus className="size-4" /> Create</Button>
                  <Button variant="outline" className="border-gray-300"><Download className="size-4" /> Download</Button>
                  <Button variant="tan"><Send className="size-4" /> Send</Button>
                  <Button variant="brand" loading>Loading</Button>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Icon-Only (Back Button)">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" className="rounded-[8px] border-gray-300">
                    <ArrowLeft className="size-4" />
                  </Button>
                  <Button variant="brand" size="icon" className="rounded-[8px]">
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Applied Usage">
                <div className="space-y-8">
                  <div>
                    <p className="text-caption text-muted-text mb-2">Form Submit</p>
                    <div className="rounded-[8px] border border-border bg-white p-4">
                      <input placeholder="Child name" className="mb-4 w-full rounded-[8px] border border-border px-4 py-2 text-sm" />
                      <Button variant="brand" className="w-full">Enroll Child</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-caption text-muted-text mb-2">Card Action</p>
                    <div className="rounded-[8px] border border-border bg-white p-4">
                      <p className="text-body-sm font-medium text-heading mb-2">Daily Report</p>
                      <p className="text-caption text-muted-text mb-4">View today&apos;s activities and photos.</p>
                      <Button variant="outline" className="border-gray-300 w-full">View Report</Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-caption text-muted-text mb-2">Empty State CTA</p>
                    <div className="rounded-[8px] border border-dashed border-border p-8 text-center">
                      <p className="text-body-sm text-muted-text mb-4">No messages yet. Start a conversation with your caregiver.</p>
                      <Button variant="brand"><Plus className="size-4" /> New Message</Button>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 7. Icon Buttons ────────────────────────────────────── */}
            <section id="icon-buttons" className="mb-26">
              <SectionTitle>Icon Button</SectionTitle>
              <SectionDescription>
                Circular icon buttons in multiple colors and sizes.
              </SectionDescription>
              <ComponentShowcase>
                <div className="space-y-6">
                  {(["sm", "default", "lg"] as const).map((size) => (
                    <div key={size} className="flex items-center gap-4">
                      <span className="w-12 text-caption capitalize">{size}</span>
                      <Button variant="ghost" size={size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"} className="rounded-[8px] bg-[#009061] text-white hover:bg-[#009061]/90">
                        <Check className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
                      </Button>
                      <Button variant="ghost" size={size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"} className="rounded-[8px] bg-white border border-border text-foreground hover:bg-muted">
                        <Check className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
                      </Button>
                      <Button variant="ghost" size={size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"} className="rounded-[8px] bg-[#3B2513] text-white hover:bg-[#3B2513]/90">
                        <Check className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
                      </Button>
                      <Button variant="ghost" size={size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"} className="rounded-[8px] bg-[#E84057] text-white hover:bg-[#E84057]/90">
                        <Check className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
                      </Button>
                      <Button variant="ghost" size={size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"} className="rounded-[8px] bg-muted text-muted-foreground opacity-50 cursor-not-allowed" disabled>
                        <Check className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
                      </Button>
                    </div>
                  ))}
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 8. Badges ──────────────────────────────────────────── */}
            <section id="badges" className="mb-26">
              <SectionTitle>Badges</SectionTitle>
              <SectionDescription>
                Status badges with close buttons.
              </SectionDescription>
              <ComponentShowcase>
                <div className="flex flex-wrap gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3B2513] px-3 py-1 text-xs font-medium text-white">Default <X className="size-3 cursor-pointer opacity-70 hover:opacity-100" /></span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#6B7280] px-3 py-1 text-xs font-medium text-white">Secondary <X className="size-3 cursor-pointer opacity-70 hover:opacity-100" /></span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#009061] px-3 py-1 text-xs font-medium text-white">Success <X className="size-3 cursor-pointer opacity-70 hover:opacity-100" /></span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CD3030] px-3 py-1 text-xs font-medium text-white">Error <X className="size-3 cursor-pointer opacity-70 hover:opacity-100" /></span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#9A6033] px-3 py-1 text-xs font-medium text-white">Brand <X className="size-3 cursor-pointer opacity-70 hover:opacity-100" /></span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#059669] px-3 py-1 text-xs font-medium text-white">Active <X className="size-3 cursor-pointer opacity-70 hover:opacity-100" /></span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D97706] px-3 py-1 text-xs font-medium text-white">Warning <X className="size-3 cursor-pointer opacity-70 hover:opacity-100" /></span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DC2626] px-3 py-1 text-xs font-medium text-white">Danger <X className="size-3 cursor-pointer opacity-70 hover:opacity-100" /></span>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 9. Labels ──────────────────────────────────────────── */}
            <section id="labels" className="mb-26">
              <SectionTitle>Label</SectionTitle>
              <SectionDescription>
                Small colored label pills with close button.
              </SectionDescription>
              <ComponentShowcase>
                <div className="flex flex-wrap gap-2">
                  {[
                    { bg: "bg-white", text: "text-foreground", border: "border-border" },
                    { bg: "bg-[#E0BFA0]/30", text: "text-brand-dark", border: "border-[#D4A67F]/40" },
                    { bg: "bg-[#E1F5EC]", text: "text-[#009061]", border: "border-[#009061]/20" },
                    { bg: "bg-[#F9F1E6]", text: "text-[#FF9A01]", border: "border-[#FF9A01]/20" },
                    { bg: "bg-[#FDE8E8]", text: "text-[#CD3030]", border: "border-[#CD3030]/20" },
                  ].map((item, i) => (
                    <span key={i} className={cn("inline-flex items-center gap-2 rounded-[8px] border px-2 py-0.5 text-xs font-medium", item.bg, item.text, item.border)}>
                      <Info className="size-3" />
                      Label
                      <X className="size-3 cursor-pointer opacity-60 hover:opacity-100" />
                    </span>
                  ))}
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 10. Tags ───────────────────────────────────────────── */}
            <section id="tags" className="mb-26">
              <SectionTitle>Tags</SectionTitle>
              <SectionDescription>
                Removable tag chips with variant colors.
              </SectionDescription>
              <ComponentShowcase>
                <div className="flex flex-wrap gap-2">
                  <Tag variant="default">Default</Tag>
                  <Tag variant="brand">Brand</Tag>
                  <Tag variant="success">Success</Tag>
                  <Tag variant="warning">Warning</Tag>
                  <Tag variant="danger">Danger</Tag>
                  <Tag variant="info">Info</Tag>
                  <Tag variant="default" removable onRemove={() => toast.info("Removed")}>Removable</Tag>
                  <Tag variant="brand" removable onRemove={() => toast.info("Removed")}>Close Me</Tag>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Avatars ────────────────────────────────────────────── */}
            <section id="avatars" className="mb-26">
              <SectionTitle>Avatars</SectionTitle>
              <SectionDescription>User avatars with fallback initials, badges, and groups.</SectionDescription>
              <ComponentShowcase title="Sizes">
                <div className="flex items-center gap-4">
                  <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
                  <Avatar size="default"><AvatarFallback>DF</AvatarFallback></Avatar>
                  <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="With Badge">
                <div className="flex items-center gap-4">
                  <Avatar size="default"><AvatarFallback>JD</AvatarFallback><AvatarBadge className="bg-success" /></Avatar>
                  <Avatar size="default"><AvatarFallback>AB</AvatarFallback><AvatarBadge className="bg-danger" /></Avatar>
                  <Avatar size="lg"><AvatarFallback>CE</AvatarFallback><AvatarBadge className="bg-[#009061]" /></Avatar>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Group">
                <AvatarGroup>
                  <Avatar size="default"><AvatarFallback>A</AvatarFallback></Avatar>
                  <Avatar size="default"><AvatarFallback>B</AvatarFallback></Avatar>
                  <Avatar size="default"><AvatarFallback>C</AvatarFallback></Avatar>
                  <Avatar size="default"><AvatarFallback>D</AvatarFallback></Avatar>
                  <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>
              </ComponentShowcase>
            </section>

            {/* ─── Tooltips ───────────────────────────────────────────── */}
            <section id="tooltips" className="mb-26">
              <SectionTitle>Tooltips</SectionTitle>
              <SectionDescription>Contextual tooltips on hover.</SectionDescription>
              <ComponentShowcase>
                <div className="flex gap-4">
                  <Tooltip>
                    <TooltipTrigger render={<Button variant="outline" className="border-gray-300">Hover me</Button>} />
                    <TooltipContent>Tooltip content</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger render={<Button variant="brand">Info</Button>} />
                    <TooltipContent side="top">This is a helpful tip</TooltipContent>
                  </Tooltip>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 11. Snackbar ───────────────────────────────────────── */}
            <section id="snackbar" className="mb-26">
              <SectionTitle>Snackbar</SectionTitle>
              <SectionDescription>
                Colored toast notifications with close button. Click X to dismiss.
              </SectionDescription>
              <ComponentShowcase title="Variants">
                <SnackbarShowcase />
              </ComponentShowcase>
              <ComponentShowcase title="Interactive Toast Demo">
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" className="border-gray-300" onClick={() => toast.success("Success! Item saved.")}>Success Toast</Button>
                  <Button variant="outline" className="border-gray-300" onClick={() => toast.info("Info: Check your email.")}>Info Toast</Button>
                  <Button variant="outline" className="border-gray-300" onClick={() => toast.warning("Warning: Low stock.")}>Warning Toast</Button>
                  <Button variant="outline" className="border-gray-300" onClick={() => toast.error("Error: Something went wrong.")}>Error Toast</Button>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 12. Checkbox ───────────────────────────────────────── */}
            <section id="checkbox" className="mb-26">
              <SectionTitle>Checkbox</SectionTitle>
              <SectionDescription>
                Checkboxes with brand (brown) color variant.
              </SectionDescription>
              <ComponentShowcase>
                <div className="space-y-4">
                  <div>
                    <p className="text-ui-sm text-muted-text mb-4">Default (Primary)</p>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={checkboxes.unchecked} onCheckedChange={(v) => setCheckboxes(prev => ({ ...prev, unchecked: v === true }))} />
                        <span className="text-sm">Unchecked</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox checked={checkboxes.checked} onCheckedChange={(v) => setCheckboxes(prev => ({ ...prev, checked: v === true }))} />
                        <span className="text-sm">Checked</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox disabled />
                        <span className="text-sm text-muted-foreground">Disabled</span>
                      </label>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-ui-sm text-muted-text mb-4">Brand (Brown)</p>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox color="brand" checked={checkboxes.brand} onCheckedChange={(v) => setCheckboxes(prev => ({ ...prev, brand: v === true }))} />
                        <span className="text-sm">Brand</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox color="brand" disabled />
                        <span className="text-sm text-muted-foreground">Disabled</span>
                      </label>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 13. Radio Buttons ──────────────────────────────────── */}
            <section id="radio" className="mb-26">
              <SectionTitle>Radio Buttons</SectionTitle>
              <SectionDescription>
                Radio buttons with brand color variant.
              </SectionDescription>
              <ComponentShowcase>
                <div className="space-y-4">
                  <div>
                    <p className="text-ui-sm text-muted-text mb-4">Default</p>
                    <div className="flex flex-col gap-2">
                      {["option1", "option2", "option3"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="radio-default"
                            value={opt}
                            checked={radioValue === opt}
                            onChange={() => setRadioValue(opt)}
                            className="size-4 accent-[#3B2513]"
                          />
                          <span className="text-sm">Option {opt.slice(-1)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-ui-sm text-muted-text mb-4">Disabled</p>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
                        <input type="radio" name="radio-disabled" disabled className="size-4" />
                        <span className="text-sm">Disabled</span>
                      </label>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 14. Switches ───────────────────────────────────────── */}
            <section id="switches" className="mb-26">
              <SectionTitle>Switch</SectionTitle>
              <SectionDescription>
                Toggle switches with color variants. Off = gray track, On = colored track with checkmark.
              </SectionDescription>
              <ComponentShowcase>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-20">Default</span>
                    <Switch checked={switches.defaultOn} onCheckedChange={(v) => setSwitches(prev => ({ ...prev, defaultOn: v }))} />
                    <span className="text-caption">{switches.defaultOn ? "On" : "Off"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-20">Off</span>
                    <Switch checked={switches.defaultOff} onCheckedChange={(v) => setSwitches(prev => ({ ...prev, defaultOff: v }))} />
                    <span className="text-caption">{switches.defaultOff ? "On" : "Off"}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-20">Success</span>
                    <Switch color="success" checked={switches.success} onCheckedChange={(v) => setSwitches(prev => ({ ...prev, success: v }))} />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-20">Danger</span>
                    <Switch color="danger" checked={switches.danger} onCheckedChange={(v) => setSwitches(prev => ({ ...prev, danger: v }))} />
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-20">Small</span>
                    <Switch size="sm" checked />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-20">Disabled</span>
                    <Switch disabled checked={false} />
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Sliders ────────────────────────────────────────────── */}
            <section id="sliders" className="mb-26">
              <SectionTitle>Sliders</SectionTitle>
              <SectionDescription>Range slider inputs.</SectionDescription>
              <ComponentShowcase>
                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <p className="text-ui-sm text-muted-text">Default</p>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-ui-sm text-muted-text">Range (20-80)</p>
                    <Slider defaultValue={[20, 80]} max={100} step={1} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-ui-sm text-muted-text">Disabled</p>
                    <Slider defaultValue={[30]} max={100} step={1} disabled />
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 15. OTP Box ────────────────────────────────────────── */}
            <section id="otp" className="mb-26">
              <SectionTitle>OTP Box</SectionTitle>
              <SectionDescription>
                One-time password input with individual character fields.
              </SectionDescription>
              <ComponentShowcase>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex gap-2">
                    {otpValues.map((val, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="size-12 rounded-[8px] border border-input bg-transparent text-center text-lg font-semibold text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 transition-colors"
                      />
                    ))}
                  </div>
                  <p className="text-caption">Enter the 6-digit code sent to your phone</p>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 16. Input Fields ───────────────────────────────────── */}
            <section id="input-fields" className="mb-26">
              <SectionTitle>Input Fields</SectionTitle>
              <SectionDescription>
                Input fields with label, hint text, icons, and error states.
              </SectionDescription>
              <ComponentShowcase title="Basic Inputs">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <InputField placeholder="Placeholder" />
                    <InputHint>This is a hint text to help user</InputHint>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <InputField placeholder="Placeholder" leftIcon={<Mail className="size-4" />} />
                    <InputHint>This is a hint text to help user</InputHint>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <InputField placeholder="Placeholder" leftIcon={<Globe className="size-4" />} rightIcon={<Info className="size-4" />} />
                    <InputHint>This is a hint text to help user</InputHint>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <InputField placeholder="Card number" leftIcon={<CreditCard className="size-4" />} rightIcon={<Info className="size-4" />} />
                    <InputHint>This is a hint text to help user</InputHint>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Error States">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-red-500">Label</label>
                    <InputField placeholder="Placeholder" error leftIcon={<Mail className="size-4" />} rightIcon={<AlertCircle className="size-4" />} />
                    <InputHint error>This is a error message.</InputHint>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-red-500">Label</label>
                    <InputField placeholder="Card number" error leftIcon={<CreditCard className="size-4" />} rightIcon={<AlertCircle className="size-4" />} />
                    <InputHint error>This is a error message.</InputHint>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Disabled">
                <div className="max-w-xs space-y-2">
                  <label className="text-sm font-medium text-foreground">Label</label>
                  <InputField placeholder="Placeholder" disabled />
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 17. Text Area ──────────────────────────────────────── */}
            <section id="text-area" className="mb-26">
              <SectionTitle>Text Area</SectionTitle>
              <SectionDescription>
                Multi-line text input with character count, hint text, and error states.
              </SectionDescription>
              <ComponentShowcase title="Basic Textarea">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <Textarea
                      placeholder="Placeholder"
                      maxLength={200}
                      value={textareaValue}
                      onChange={(e) => setTextareaValue(e.target.value)}
                    />
                    <TextareaHint>This is a hint text to help user</TextareaHint>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <Textarea
                      placeholder="Enter a description..."
                    />
                    <TextareaHint>This is a hint text to help user</TextareaHint>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="With Content">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-2xl">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <Textarea
                      value={textareaWithTags}
                      onChange={(e) => setTextareaWithTags(e.target.value)}
                      maxLength={200}
                    />
                    <TextareaHint>This is a hint text to help user</TextareaHint>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <div className="rounded-[8px] border border-input p-2">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Tag variant="default" removable onRemove={() => {}}>Label</Tag>
                        <Tag variant="default" removable onRemove={() => {}}>Label</Tag>
                      </div>
                      <div className="min-h-[60px]" />
                    </div>
                    <TextareaHint>This is a hint text to help user</TextareaHint>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Error State">
                <div className="max-w-xs space-y-2">
                  <label className="text-sm font-medium text-red-500">Label</label>
                  <Textarea
                    value="Keep up with our newsletters for the latest updates"
                    maxLength={200}
                    error
                  />
                  <TextareaHint error>
                    <span className="flex items-center gap-2"><AlertCircle className="size-3" /> This is a hint text to help user</span>
                  </TextareaHint>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 18. Dropdown ───────────────────────────────────────── */}
            <section id="dropdown" className="mb-26">
              <SectionTitle>Dropdown</SectionTitle>
              <SectionDescription>
                Single select and multi-select dropdown menus with checkmarks.
              </SectionDescription>
              <ComponentShowcase title="Single Select">
                <div className="max-w-xs space-y-2">
                  <label className="text-sm font-medium text-foreground">Label</label>
                  <Select value={selectValue} onValueChange={(v) => v && setSelectValue(v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                      <SelectItem value="option4">Option 4</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputHint>This is a hint text to help user</InputHint>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Disabled">
                <div className="max-w-xs space-y-2">
                  <label className="text-sm font-medium text-foreground">Label</label>
                  <Select disabled>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Option 2" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option2">Option 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputHint>This is a hint text to help user</InputHint>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 19. Dropdown List Item ──────────────────────────────── */}
            <section id="dropdown-list" className="mb-26">
              <SectionTitle>Dropdown List Item</SectionTitle>
              <SectionDescription>
                List items with optional checkmarks and radio indicators.
              </SectionDescription>
              <ComponentShowcase>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="rounded-[8px] border border-border bg-white p-2">
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((opt) => (
                      <div key={opt} className="flex items-center justify-between rounded-[8px] px-4 py-2 text-sm hover:bg-muted cursor-pointer">
                        {opt}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-[8px] border border-border bg-white p-2">
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((opt, i) => (
                      <div key={opt} className="flex items-center justify-between rounded-[8px] px-4 py-2 text-sm hover:bg-muted cursor-pointer">
                        {opt}
                        {i === 1 && <Check className="size-4 text-foreground" />}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-[8px] border border-border bg-white p-2">
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((opt, i) => (
                      <div key={opt} className="flex items-center justify-between rounded-[8px] px-4 py-2 text-sm hover:bg-muted cursor-pointer">
                        {opt}
                        {i === 1 ? (
                          <div className="size-4 rounded-full border-2 border-[#3B2513] flex items-center justify-center">
                            <span className="size-2 rounded-full bg-[#3B2513]" />
                          </div>
                        ) : (
                          <div className="size-4 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-[8px] border border-border bg-white p-2">
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((opt, i) => (
                      <div key={opt} className="flex items-center justify-between rounded-[8px] px-4 py-2 text-sm hover:bg-muted cursor-pointer">
                        {opt}
                        <Checkbox checked={i === 1 || i === 2} />
                      </div>
                    ))}
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 20. Date Picker ────────────────────────────────────── */}
            <section id="date-picker" className="mb-26">
              <SectionTitle>Date Picker</SectionTitle>
              <SectionDescription>
                Calendar date picker with brown circle selected state.
              </SectionDescription>
              <ComponentShowcase>
                <div className="flex justify-center">
                  <DatePicker
                    selected={datePickerDate}
                    onDateSelect={setDatePickerDate}
                    showCloseButton
                  />
                </div>
                {datePickerDate && (
                  <p className="text-caption text-center mt-4">
                    Selected: {datePickerDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                )}
              </ComponentShowcase>
            </section>

            {/* ─── 21. Search Bar ─────────────────────────────────────── */}
            <section id="searchbar" className="mb-26">
              <SectionTitle>Searchbar</SectionTitle>
              <SectionDescription>
                Search input with magnifying glass icon and clear button.
              </SectionDescription>
              <ComponentShowcase>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <p className="text-ui-sm text-muted-text">Default</p>
                    <SearchBar placeholder="Placeholder" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-ui-sm text-muted-text">With Value</p>
                    <SearchBar placeholder="Placeholder" defaultValue="Search query" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-ui-sm text-muted-text">Small</p>
                    <SearchBar placeholder="Placeholder" size="sm" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-ui-sm text-muted-text">Disabled</p>
                    <SearchBar placeholder="Placeholder" disabled />
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 22. Tabs ───────────────────────────────────────────── */}
            <section id="tabs" className="mb-26">
              <SectionTitle>Tabs</SectionTitle>
              <SectionDescription>
                Tab components: pill variant for dark backgrounds and segmented control.
              </SectionDescription>
              <ComponentShowcase title="Default Tabs">
                <Tabs defaultValue="tab1" className="max-w-md">
                  <TabsList>
                    <TabsTrigger value="tab1">Text</TabsTrigger>
                    <TabsTrigger value="tab2">Text</TabsTrigger>
                    <TabsTrigger value="tab3">Text</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="p-4">Content for tab 1</TabsContent>
                  <TabsContent value="tab2" className="p-4">Content for tab 2</TabsContent>
                  <TabsContent value="tab3" className="p-4">Content for tab 3</TabsContent>
                </Tabs>
              </ComponentShowcase>
              <ComponentShowcase title="Pill Tabs (Dark Background)">
                <div className="bg-[#3D3D3D] rounded-[8px] p-6">
                  <Tabs defaultValue="pill1" className="max-w-sm">
                    <TabsList variant="pill">
                      <TabsTrigger value="pill1">Text</TabsTrigger>
                      <TabsTrigger value="pill2">Text</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Segmented Control">
                <Tabs defaultValue="seg1" className="max-w-sm">
                  <TabsList variant="segmented">
                    <TabsTrigger value="seg1">Text</TabsTrigger>
                    <TabsTrigger value="seg2">Text</TabsTrigger>
                    <TabsTrigger value="seg3">Text</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentShowcase>
              <ComponentShowcase title="Line Tabs">
                <Tabs defaultValue="line1" className="max-w-md">
                  <TabsList variant="line">
                    <TabsTrigger value="line1">Text</TabsTrigger>
                    <TabsTrigger value="line2">Text</TabsTrigger>
                    <TabsTrigger value="line3">Text</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ComponentShowcase>
            </section>

            {/* ─── Modals & Dialogs ────────────────────────────────────── */}
            <section id="modals" className="mb-26">
              <SectionTitle>Modals & Dialogs</SectionTitle>
              <SectionDescription>Modal dialogs for confirmations and forms.</SectionDescription>
              <ComponentShowcase>
                <div className="flex flex-wrap gap-4">
                  <Dialog>
                    <DialogTrigger render={<Button variant="brand">Confirm Dialog</Button>} />
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>This action cannot be undone.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose render={<Button variant="outline" className="border-gray-300">Cancel</Button>} />
                        <DialogClose render={<Button variant="brand">Confirm</Button>} />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger render={<Button variant="outline" className="border-gray-300">Form Dialog</Button>} />
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Child</DialogTitle>
                        <DialogDescription>Fill in the details below.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Name</label>
                          <Input placeholder="Enter child name" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Age</label>
                          <Input placeholder="Enter age" type="number" />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose render={<Button variant="outline" className="border-gray-300">Cancel</Button>} />
                        <DialogClose render={<Button variant="brand">Create</Button>} />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Alerts & Notifications ──────────────────────────────── */}
            <section id="alerts" className="mb-26">
              <SectionTitle>Alerts & Notifications</SectionTitle>
              <SectionDescription>Alert banners for different message types.</SectionDescription>
              <ComponentShowcase>
                <div className="space-y-4 max-w-2xl">
                  <AlertBanner variant="success" title="Enrollment Complete" icon={<CheckCircle2 className="size-4" />} dismissible onDismiss={() => {}}>
                    Child enrollment has been completed successfully.
                    <button className="ml-2 underline underline-offset-2 font-semibold hover:opacity-80">Close</button>
                  </AlertBanner>
                  <AlertBanner variant="warning" title="Reports Pending" icon={<AlertTriangle className="size-4" />}>
                    Some caregivers have not submitted their reports yet.
                    <button className="ml-2 underline underline-offset-2 font-semibold hover:opacity-80">View Reports</button>
                  </AlertBanner>
                  <AlertBanner variant="error" title="Save Failed" icon={<XCircle className="size-4" />}>
                    Failed to save changes. Please try again.
                    <button className="ml-2 underline underline-offset-2 font-semibold hover:opacity-80">Try Again</button>
                  </AlertBanner>
                  <AlertBanner variant="info" title="App Update Available" icon={<Info className="size-4" />}>
                    A new version of the app is available for update.
                    <button className="ml-2 underline underline-offset-2 font-semibold hover:opacity-80">Update Now</button>
                  </AlertBanner>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 23. Empty State ────────────────────────────────────── */}
            <section id="empty-state" className="mb-26">
              <SectionTitle>Empty State</SectionTitle>
              <SectionDescription>
                Empty state with illustration, title, subtitle, and action buttons.
              </SectionDescription>
              <ComponentShowcase title="Inline Actions">
                <EmptyState
                  icon={<FileText className="size-8" />}
                  title="Text"
                  description="Sub Text"
                  action={<Button variant="outline" className="border-gray-300">Button CTA</Button>}
                  secondaryAction={<Button variant="brand">Button CTA</Button>}
                />
              </ComponentShowcase>
              <ComponentShowcase title="Stacked Actions">
                <EmptyState
                  icon={<FileText className="size-8" />}
                  title="Text"
                  description="Sub Text"
                  layout="stacked"
                  action={<Button variant="outline" className="w-full border-gray-300">Button CTA</Button>}
                  secondaryAction={<Button variant="brand" className="w-full">Button CTA</Button>}
                />
              </ComponentShowcase>
            </section>

            {/* ─── Pagination ──────────────────────────────────────────── */}
            <section id="pagination" className="mb-26">
              <SectionTitle>Pagination</SectionTitle>
              <SectionDescription>Page navigation for lists and tables.</SectionDescription>
              <ComponentShowcase>
                <Pagination currentPage={2} totalPages={10} onPageChange={(p) => toast.info(`Page ${p}`)}>
                  <PaginationPrevious />
                  <PaginationNext />
                </Pagination>
              </ComponentShowcase>
            </section>

            {/* ─── Progress Steps ──────────────────────────────────────── */}
            <section id="progress-steps" className="mb-26">
              <SectionTitle>Progress Steps</SectionTitle>
              <SectionDescription>Step-by-step progress indicator for onboarding flows.</SectionDescription>
              <ComponentShowcase>
                <div className="space-y-6 max-w-md">
                  <ProgressSteps currentStep={1} totalSteps={4} />
                  <ProgressSteps currentStep={2} totalSteps={4} />
                  <ProgressSteps currentStep={3} totalSteps={4} />
                  <ProgressSteps currentStep={4} totalSteps={4} />
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── File Upload ─────────────────────────────────────────── */}
            <section id="file-upload" className="mb-26">
              <SectionTitle>File Upload</SectionTitle>
              <SectionDescription>Drag and drop file upload zone.</SectionDescription>
              <ComponentShowcase>
                <div className="max-w-md">
                  <FileUpload accept="image/*,.pdf" multiple onFilesSelected={(files) => toast.info(`${files.length} file(s) selected`)} />
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Code Blocks ─────────────────────────────────────────── */}
            <section id="code-blocks" className="mb-26">
              <SectionTitle>Code Blocks</SectionTitle>
              <SectionDescription>Syntax-highlighted code display.</SectionDescription>
              <ComponentShowcase>
                <div className="space-y-4">
                  <CodeBlock
                    language="typescript"
                    filename="components/button.tsx"
                    showLineNumbers
                    code={`const Button = ({ variant, children }) => {
  return (
    <button className={cn(buttonVariants({ variant }))}>
      {children}
    </button>
  )
}`}
                  />
                  <CodeBlock
                    language="bash"
                    filename="terminal"
                    code="npm install @base-ui/react"
                  />
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Activity Feeds ──────────────────────────────────────── */}
            <section id="activity-feeds" className="mb-26">
              <SectionTitle>Activity Feeds</SectionTitle>
              <SectionDescription>Timeline-style activity feed.</SectionDescription>
              <ComponentShowcase>
                <div className="max-w-lg">
                  <ActivityFeed
                    items={[
                      { id: "1", icon: <UserCheck className="size-4 text-success" />, title: "Emma enrolled", description: "New child added to Sunshine Class", timestamp: "2 hours ago" },
                      { id: "2", icon: <FileText className="size-4 text-info" />, title: "Report submitted", description: "Daily activity report for January 15", timestamp: "4 hours ago" },
                      { id: "3", icon: <Bell className="size-4 text-warning" />, title: "Payment reminder", description: "Tuition fee due in 3 days", timestamp: "1 day ago" },
                      { id: "4", icon: <CheckCircle2 className="size-4 text-success" />, title: "Task completed", description: "Health check forms collected", timestamp: "2 days ago" },
                    ]}
                  />
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── AI Chat Interface ───────────────────────────────────── */}
            <section id="ai-chat" className="mb-26">
              <SectionTitle>AI Chat Interface</SectionTitle>
              <SectionDescription>The full CEvenAI chat interface with header, messages, and input bar.</SectionDescription>
              <ComponentShowcase>
                <div className="mx-auto max-w-sm overflow-hidden rounded-[8px] border border-border bg-[#fffefa] shadow-sm">
                  {/* Header */}
                  <div className="flex items-center px-4 pt-4 pb-3">
                    <button className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-gray-200 bg-[#f4f5f6]">
                      <ArrowLeft size={16} className="text-gray-700" />
                    </button>
                    <div className="flex flex-1 items-center justify-center gap-2">
                      <AiSparkleIcon size={22} className="text-brand-dark" />
                      <h1 className="text-lg font-bold text-gray-800">CEvenAI</h1>
                    </div>
                    <div className="h-8 w-8" />
                  </div>
                  {/* Messages */}
                  <div className="space-y-3 px-4 py-4">
                    <div className="flex justify-end">
                      <div className="max-w-[78%] rounded-[8px] rounded-tr-sm bg-brand-dark px-4 py-4 text-sm text-white">
                        Summarize today&apos;s report
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-[88%]">
                        <div className="mb-2 flex items-center gap-2">
                          <AiSparkleIcon size={14} className="text-brand-dark" />
                        </div>
                        <div className="rounded-[8px] bg-white px-4 py-4 text-sm text-gray-700 shadow-sm">
                          <p>Of course! As an AI language model, I am designed to assist with a variety of tasks.</p>
                          <p className="mt-2">Here are some examples of what I can do:</p>
                          <p className="mt-2">{'\u2022'} Answer questions: Just ask me anything you like!</p>
                          <p className="mt-2">{'\u2022'} Generate text: I can write stories, poems, or summaries for you.</p>
                        </div>
                        <div className="mt-2.5 flex items-center gap-4">
                          <button className="text-gray-300 hover:text-gray-500"><ThumbsUp size={14} /></button>
                          <button className="text-gray-300 hover:text-gray-500"><ThumbsDown size={14} /></button>
                          <button className="text-gray-300 hover:text-gray-500"><Copy size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Input bar */}
                  <div className="bg-white px-4 pt-4 pb-4 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <input placeholder="Ask me anything..." className="flex-1 rounded-[8px] bg-[#f4f5f6] px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                      <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#E0BFA0]">
                        <Send size={14} className="text-brand-dark" />
                      </button>
                      <Mic size={22} className="text-gray-500" />
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── AI Messages ────────────────────────────────────────── */}
            <section id="ai-messages" className="mb-26">
              <SectionTitle>AI Messages</SectionTitle>
              <SectionDescription>User and AI message bubble styles with action buttons.</SectionDescription>
              <ComponentShowcase>
                <div className="mx-auto max-w-sm space-y-3">
                  <div className="flex justify-end">
                    <div className="max-w-[78%] rounded-[8px] rounded-tr-sm bg-brand-dark px-4 py-4 text-sm text-white">
                      Summarize today&apos;s report
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[88%]">
                      <div className="mb-2 flex items-center gap-2">
                        <AiSparkleIcon size={14} className="text-brand-dark" />
                      </div>
                      <div className="rounded-[8px] bg-white px-4 py-4 text-sm text-gray-700 shadow-sm">
                        <p>Of course! As an AI language model, I am designed to assist with a variety of tasks.</p>
                        <p className="mt-2">Here are some examples of what I can do:</p>
                        <p className="mt-2">{'\u2022'} Answer questions: Just ask me anything you like!</p>
                        <p className="mt-2">{'\u2022'} Generate text: I can write stories, poems, or summaries for you.</p>
                      </div>
                      <div className="mt-2.5 flex items-center gap-4">
                        <button className="text-gray-300 hover:text-gray-500"><ThumbsUp size={14} /></button>
                        <button className="text-gray-300 hover:text-gray-500"><ThumbsDown size={14} /></button>
                        <button className="text-gray-300 hover:text-gray-500"><Copy size={14} /></button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[78%] rounded-[8px] rounded-tr-sm bg-brand-dark px-4 py-4 text-sm text-white">
                      How was my child&apos;s mood today?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[88%]">
                      <div className="mb-2 flex items-center gap-2">
                        <AiSparkleIcon size={14} className="text-brand-dark" />
                      </div>
                      <div className="rounded-[8px] bg-white px-4 py-4 text-sm text-gray-700 shadow-sm">
                        <p>Your child was in great spirits today! Very active during playtime and socialized well with other children.</p>
                      </div>
                      <div className="mt-2.5 flex items-center gap-4">
                        <button className="text-gray-300 hover:text-gray-500"><ThumbsUp size={14} /></button>
                        <button className="text-gray-300 hover:text-gray-500"><ThumbsDown size={14} /></button>
                        <button className="text-gray-300 hover:text-gray-500"><Copy size={14} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── AI Empty State ─────────────────────────────────────── */}
            <section id="ai-empty" className="mb-26">
              <SectionTitle>AI Empty State</SectionTitle>
              <SectionDescription>Greeting screen with suggested prompt buttons.</SectionDescription>
              <ComponentShowcase>
                <div className="mx-auto max-w-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[8px] bg-[#F3EDE5]">
                      <AiSparkleIcon size={30} className="text-brand-dark" />
                    </div>
                    <h2 className="mb-2 text-base font-bold text-gray-800">Hi! I&apos;m CEvenAI</h2>
                    <p className="max-w-[220px] text-xs text-gray-500">
                      Ask me about your child&apos;s day, health patterns, or activities.
                    </p>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      { icon: "📄", text: "Summarize today's report" },
                      { icon: "↗", text: "Any health patterns this week?" },
                      { icon: "😊", text: "How was my child's mood?" },
                      { icon: "📖", text: "What learning activity was done?" },
                    ].map((p) => (
                      <button key={p.text} className="flex w-full items-center gap-2 rounded-[8px] bg-[#F3EDE5] px-4 py-4 text-left text-sm text-brand-dark">
                        <span>{p.icon}</span>
                        <span>{p.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── AI Input Bar ───────────────────────────────────────── */}
            <section id="ai-input" className="mb-26">
              <SectionTitle>AI Input Bar</SectionTitle>
              <SectionDescription>Chat input with send, mic, and refresh buttons.</SectionDescription>
              <ComponentShowcase title="Empty State">
                <div className="mx-auto max-w-sm rounded-[8px] bg-white px-4 py-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
                  <div className="flex items-center gap-4">
                    <input placeholder="Ask me anything..." className="flex-1 rounded-[8px] bg-[#f4f5f6] px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#E0BFA0]">
                      <Send size={14} className="text-brand-dark" />
                    </button>
                    <Mic size={22} className="text-gray-500" />
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="With Refresh Button">
                <div className="mx-auto max-w-sm rounded-[8px] bg-white px-4 py-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
                  <div className="flex items-center gap-4">
                    <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-gray-100">
                      <RefreshCw size={14} className="text-gray-500" />
                    </button>
                    <input placeholder="Ask me anything..." className="flex-1 rounded-[8px] bg-[#f4f5f6] px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#E0BFA0]">
                      <Send size={14} className="text-brand-dark" />
                    </button>
                    <Mic size={22} className="text-gray-500" />
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Disabled (Trial Ended)">
                <div className="mx-auto max-w-sm rounded-[8px] bg-white px-4 py-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
                  <div className="flex items-center gap-4">
                    <input placeholder="Manage your account to keep chatting" disabled className="flex-1 rounded-[8px] bg-[#f4f5f6] px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-60" />
                    <button disabled className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#E0BFA0] disabled:opacity-60">
                      <Send size={14} className="text-brand-dark" />
                    </button>
                    <Mic size={22} className="text-gray-300" />
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── AI Typing Indicator ────────────────────────────────── */}
            <section id="ai-typing" className="mb-26">
              <SectionTitle>AI Typing Indicator</SectionTitle>
              <SectionDescription>Bouncing dots animation while AI is generating a response.</SectionDescription>
              <ComponentShowcase>
                <div className="flex items-center gap-2">
                  <AiSparkleIcon size={14} className="text-brand-dark" />
                  <div className="flex items-center gap-2 rounded-[8px] bg-white px-4 py-4 shadow-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── AI Risk Badge ──────────────────────────────────────── */}
            <section id="ai-risk" className="mb-26">
              <SectionTitle>AI Risk Badge</SectionTitle>
              <SectionDescription>AI-computed risk level badges for child welfare monitoring.</SectionDescription>
              <ComponentShowcase title="Risk Levels">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-[8px] border px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "#ecfdf5", color: "#059669", borderColor: "#059669" }}>Low Risk</span>
                  <span className="inline-flex items-center rounded-[8px] border px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "#fffbeb", color: "#d97706", borderColor: "#d97706" }}>Medium Risk</span>
                  <span className="inline-flex items-center rounded-[8px] border px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "#fef2f2", color: "#dc2626", borderColor: "#dc2626" }}>High Risk</span>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Locked (Seedling Plan)">
                <div className="group relative inline-flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-[8px] border px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "#f3f4f6", color: "#9ca3af", borderColor: "#d1d5db" }}>
                    <Lock className="h-2 w-2" />
                    AI Risk
                  </span>
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="whitespace-nowrap rounded-[8px] bg-[#2d1810] px-4 py-2 text-[10px] text-white shadow-lg">
                      Upgrade to Nurture Pro to unlock AI Risk
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#2d1810]" />
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Thread List ─────────────────────────────────────────── */}
            <section id="msg-thread-list" className="mb-26">
              <SectionTitle>Thread List</SectionTitle>
              <SectionDescription>Chat thread list with search, avatars, and date grouping.</SectionDescription>
              <ComponentShowcase title="Parent Chat List">
                <div className="mx-auto max-w-sm overflow-hidden rounded-[8px] border border-border bg-white shadow-sm">
                  {/* Search */}
                  <div className="px-4 pt-3 pb-2">
                    <div className="flex items-center gap-2 rounded-[8px] bg-gray-50 px-4 py-2">
                      <Search size={16} className="text-gray-400" />
                      <input placeholder="Search" className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    </div>
                  </div>
                  {/* Today */}
                  <p className="px-4 py-2 text-xs font-medium text-gray-400">Today</p>
                  <div className="bg-white">
                    <div className="flex items-center gap-4 px-4 py-4">
                      <img src="/caregiver-avatar.png" alt="Mrs Anu" className="h-10 w-10 shrink-0 rounded-full object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-800">Mrs Anu</p>
                          <p className="text-[10px] text-gray-400">4:30 PM</p>
                        </div>
                        <p className="truncate text-xs text-gray-400">Liam had a great day today!</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 px-4 py-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200">
                        <Users size={18} className="text-gray-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-800">Liam&apos;s Family</p>
                          <p className="text-[10px] text-gray-400">2:15 PM</p>
                        </div>
                        <p className="truncate text-xs text-gray-400">Ms Anu: Liam took his first steps!</p>
                      </div>
                    </div>
                  </div>
                  {/* Yesterday */}
                  <p className="px-4 py-2 text-xs font-medium text-gray-400">Yesterday</p>
                  <div className="bg-white">
                    <div className="flex items-center gap-4 px-4 py-4">
                      <img src="/features/avatar-3.png" alt="Creche Admin" className="h-10 w-10 shrink-0 rounded-[8px] object-cover" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-800">Creche Admin</p>
                          <p className="text-[10px] text-gray-400">Yesterday</p>
                        </div>
                        <p className="truncate text-xs text-gray-400">Invoice has been sent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 1-on-1 Chat ────────────────────────────────────────── */}
            <section id="msg-1on1" className="mb-26">
              <SectionTitle>1-on-1 Chat</SectionTitle>
              <SectionDescription>Direct message conversation between parent and caregiver.</SectionDescription>
              <ComponentShowcase>
                <div className="mx-auto max-w-sm overflow-hidden rounded-[8px] border border-border bg-[#FFFEFA] shadow-sm">
                  {/* Header */}
                  <div className="flex items-center gap-4 bg-[#FAFAFA] px-4 pt-4 pb-3 shadow-sm">
                    <button className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#F7F7F7]">
                      <ArrowLeft size={16} className="text-gray-700" />
                    </button>
                    <div className="flex flex-1 items-center gap-2">
                      <div className="relative">
                        <img src="/caregiver-avatar.png" alt="Mrs Anu" className="h-10 w-10 rounded-full object-cover" />
                        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-400 ring-2 ring-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">Mrs Anu</p>
                        <p className="text-[10px] text-green-500">Online</p>
                      </div>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#F7F7F7]">
                      <Video size={16} className="text-gray-700" />
                    </button>
                  </div>
                  {/* Session badge */}
                  <div className="flex items-center justify-center gap-2 py-4">
                    <div className="flex items-center gap-2 rounded-[8px] bg-[#EDF1F5] px-4 py-2">
                      <Plus size={10} className="text-gray-600" />
                      <span className="text-[10px] font-medium text-gray-600">Session Start</span>
                    </div>
                  </div>
                  {/* Messages */}
                  <div className="space-y-3 px-4 pb-4">
                    <div className="flex justify-end">
                      <div className="max-w-[72%]">
                        <div className="rounded-[8px] rounded-tr-sm bg-brand-dark px-4 py-4">
                          <p className="text-sm text-white">Hi, Mrs Anu</p>
                        </div>
                        <div className="mt-2 flex items-center justify-end gap-2">
                          <p className="text-[10px] text-gray-400">16:48</p>
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5l3 3 5-7M6 5l3 3 5-7" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-[72%]">
                        <div className="rounded-[8px] rounded-tl-sm bg-[#DCE0E4] px-4 py-4">
                          <p className="text-sm text-[#2D2E2E]">Good afternoon Ma, how can I help you?</p>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400">16:50</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[72%]">
                        <div className="rounded-[8px] rounded-tr-sm bg-brand-dark px-4 py-4">
                          <p className="text-sm text-white">Liam had a great day today! He played well with others.</p>
                        </div>
                        <div className="mt-2 flex items-center justify-end gap-2">
                          <p className="text-[10px] text-gray-400">16:50</p>
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5l3 3 5-7M6 5l3 3 5-7" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Input */}
                  <div className="bg-[#FAFAFA] px-4 pb-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-1 items-center rounded-[8px] bg-white px-4 py-2 shadow-sm">
                        <input placeholder="Type a message..." className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                      </div>
                      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-brand-dark">
                        <Send size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Group Chat ─────────────────────────────────────────── */}
            <section id="msg-group" className="mb-26">
              <SectionTitle>Group Chat</SectionTitle>
              <SectionDescription>Family group chat with stacked avatars, role labels, topic banner, and @ mentions.</SectionDescription>
              <ComponentShowcase>
                <div className="mx-auto max-w-sm overflow-hidden rounded-[8px] border border-border bg-[#FFFEFA] shadow-sm">
                  {/* Header */}
                  <div className="flex items-center gap-4 bg-white px-4 pt-4 pb-3 shadow-sm">
                    <button className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-gray-100">
                      <ArrowLeft size={16} className="text-gray-700" />
                    </button>
                    <div className="flex flex-1 items-center gap-2">
                      <div className="flex -space-x-2">
                        <img src="/features/avatar-1.png" alt="James" className="h-8 w-8 rounded-full object-cover ring-2 ring-white" />
                        <img src="/features/avatar-4.png" alt="Sarah" className="h-8 w-8 rounded-full object-cover ring-2 ring-white" />
                        <img src="/caregiver-avatar.png" alt="Mrs Anu" className="h-8 w-8 rounded-full object-cover ring-2 ring-white" />
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-500 ring-2 ring-white">+1</div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">Liam&apos;s Family</p>
                        <div className="flex items-center gap-2">
                          <Users size={10} className="text-gray-400" />
                          <p className="text-[10px] text-gray-400">4 members</p>
                        </div>
                      </div>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-gray-100">
                      <Info size={16} className="text-gray-700" />
                    </button>
                  </div>
                  {/* Topic banner */}
                  <div className="bg-amber-50 px-4 py-2">
                    <p className="text-center text-[11px] font-medium text-amber-700">Liam took his first steps today!</p>
                  </div>
                  {/* Messages */}
                  <div className="space-y-4 px-4 py-4">
                    <div className="flex justify-start gap-2">
                      <img src="/caregiver-avatar.png" alt="Ms Anu" className="h-8 w-8 shrink-0 rounded-full object-cover mt-2" />
                      <div className="max-w-[72%]">
                        <div className="mb-0.5 flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-[#059669]">Ms Anu</span>
                          <span className="text-[9px] text-gray-400">Caregiver</span>
                        </div>
                        <div className="rounded-[8px] rounded-tl-sm bg-gray-100 px-4 py-2">
                          <p className="text-sm text-gray-800">Good morning everyone! I have amazing news about Liam!</p>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400">9:15 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start gap-2">
                      <img src="/features/avatar-4.png" alt="Sarah" className="h-8 w-8 shrink-0 rounded-full object-cover mt-2" />
                      <div className="max-w-[72%]">
                        <div className="mb-0.5 flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-[#D4A67F]">Sarah</span>
                          <span className="text-[9px] text-gray-400">Mother</span>
                        </div>
                        <div className="rounded-[8px] rounded-tl-sm bg-gray-100 px-4 py-2">
                          <p className="text-sm text-gray-800">Good morning Ms Anu! What happened?</p>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400">9:16 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start gap-2">
                      <img src="/caregiver-avatar.png" alt="Ms Anu" className="h-8 w-8 shrink-0 rounded-full object-cover mt-2" />
                      <div className="max-w-[72%]">
                        <div className="mb-0.5 flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-[#059669]">Ms Anu</span>
                          <span className="text-[9px] text-gray-400">Caregiver</span>
                        </div>
                        <div className="rounded-[8px] rounded-tl-sm bg-gray-100 px-4 py-2">
                          <p className="text-sm text-gray-800">Liam took his first steps today!! He walked from the mat to the toy shelf!</p>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400">9:16 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[72%]">
                        <div className="rounded-[8px] rounded-tr-sm bg-brand-dark px-4 py-2">
                          <p className="text-sm text-white">Oh wow!! That&apos;s incredible! Our little man is growing up so fast!</p>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400 text-right">9:17 AM</p>
                      </div>
                    </div>
                    <div className="flex justify-start gap-2">
                      <img src="/features/avatar-3.png" alt="Creche Admin" className="h-8 w-8 shrink-0 rounded-[8px] object-cover mt-2" />
                      <div className="max-w-[72%]">
                        <div className="mb-0.5 flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-indigo-500">Creche Admin</span>
                          <span className="text-[9px] text-gray-400">Admin</span>
                        </div>
                        <div className="rounded-[8px] rounded-tl-sm bg-gray-100 px-4 py-2">
                          <p className="text-sm text-gray-800">That&apos;s wonderful news! We&apos;ll update Liam&apos;s milestone record. Congrats to the family!</p>
                        </div>
                        <p className="mt-2 text-[10px] text-gray-400">9:20 AM</p>
                      </div>
                    </div>
                  </div>
                  {/* Input with @ mention */}
                  <div className="bg-white px-4 pb-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-gray-100">
                        <AtSign size={16} className="text-gray-500" />
                      </button>
                      <div className="flex flex-1 items-center rounded-[8px] bg-gray-50 px-4 py-2">
                        <input placeholder="Type a message..." className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                      </div>
                      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-brand-dark">
                        <Send size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Message Bubbles ─────────────────────────────────────── */}
            <section id="msg-bubbles" className="mb-26">
              <SectionTitle>Message Bubbles</SectionTitle>
              <SectionDescription>Sent, received, and group message bubble variants.</SectionDescription>
              <ComponentShowcase title="Sent (Parent)">
                <div className="flex justify-end">
                  <div className="max-w-[72%]">
                    <div className="rounded-[8px] rounded-tr-sm bg-brand-dark px-4 py-4">
                      <p className="text-sm text-white">Hi, Mrs Anu</p>
                    </div>
                    <div className="mt-2 flex items-center justify-end gap-2">
                      <p className="text-[10px] text-gray-400">16:48</p>
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5l3 3 5-7M6 5l3 3 5-7" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Received (Parent)">
                <div className="flex justify-start">
                  <div className="max-w-[72%]">
                    <div className="rounded-[8px] rounded-tl-sm bg-[#DCE0E4] px-4 py-4">
                      <p className="text-sm text-[#2D2E2E]">Good afternoon Ma, how can I help you?</p>
                    </div>
                    <p className="mt-2 text-[10px] text-gray-400">16:50</p>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Group (with avatar + role)">
                <div className="flex justify-start gap-2">
                  <img src="/caregiver-avatar.png" alt="Ms Anu" className="h-8 w-8 shrink-0 rounded-full object-cover mt-2" />
                  <div className="max-w-[72%]">
                    <div className="mb-0.5 flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-[#059669]">Ms Anu</span>
                      <span className="text-[9px] text-gray-400">Caregiver</span>
                    </div>
                    <div className="rounded-[8px] rounded-tl-sm bg-gray-100 px-4 py-2">
                      <p className="text-sm text-gray-800">Liam took his first steps today!!</p>
                    </div>
                    <p className="mt-2 text-[10px] text-gray-400">9:16 AM</p>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Chat Input ──────────────────────────────────────────── */}
            <section id="msg-input" className="mb-26">
              <SectionTitle>Chat Input</SectionTitle>
              <SectionDescription>Input bar variants for different chat contexts.</SectionDescription>
              <ComponentShowcase title="Default">
                <div className="mx-auto max-w-sm rounded-[8px] border border-gray-100 bg-white px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-[8px] text-gray-400">
                      <Paperclip size={20} />
                    </button>
                    <input placeholder="Type a message..." className="flex-1 rounded-[8px] border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    <button className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-brand-dark">
                      <SendHorizontal size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Disabled">
                <div className="mx-auto max-w-sm rounded-[8px] border border-gray-100 bg-white px-4 py-4 opacity-50">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[8px] text-gray-300">
                      <Paperclip size={20} />
                    </div>
                    <input disabled placeholder="Type a message..." className="flex-1 rounded-[8px] border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-400 placeholder:text-gray-300 cursor-not-allowed" />
                    <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-gray-300">
                      <SendHorizontal size={16} className="text-white" />
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="With @ Mention (Group)">
                <div className="mx-auto max-w-sm rounded-[8px] bg-white px-4 pb-4 pt-3 border border-gray-100">
                  <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-gray-100">
                      <AtSign size={16} className="text-gray-500" />
                    </button>
                    <div className="flex flex-1 items-center rounded-[8px] bg-gray-50 px-4 py-2">
                      <input placeholder="Type a message..." className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    </div>
                    <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-brand-dark">
                      <Send size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Disabled (Trial Ended)">
                <div className="mx-auto max-w-sm rounded-[8px] bg-[#FAFAFA] px-4 py-4 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-1 items-center rounded-[8px] bg-white px-4 py-2 shadow-sm">
                      <input placeholder="Manage your account to keep chatting" disabled className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-60" />
                    </div>
                    <button disabled className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-brand-dark disabled:opacity-60">
                      <Send size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Session & Trial ─────────────────────────────────────── */}
            <section id="msg-session" className="mb-26">
              <SectionTitle>Session & Trial</SectionTitle>
              <SectionDescription>Session start badges and trial gate banners.</SectionDescription>
              <ComponentShowcase title="Session Start Badge">
                <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center gap-2 rounded-[8px] bg-[#EDF1F5] px-4 py-2">
                      <Plus size={12} className="text-gray-600" />
                      <span className="text-[10px] font-medium text-gray-600">Session Start</span>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Trial Gate Banner">
                <div className="mx-auto max-w-sm">
                  <div className="flex items-center gap-2 rounded-[8px] border border-gray-100 bg-white px-4 py-2 shadow-sm">
                    <Lock size={12} className="shrink-0 text-gray-400" />
                    <p className="flex-1 text-xs text-gray-600">Your trial has ended. Some family features are unavailable.</p>
                    <button className="shrink-0 text-xs font-semibold text-brand-dark underline underline-offset-2">Manage</button>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Online Indicator">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src="/caregiver-avatar.png" alt="Mrs Anu" className="h-10 w-10 rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-400 ring-2 ring-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Mrs Anu</p>
                    <p className="text-[10px] text-green-500">Online</p>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Marketing ────────────────────────────────────────────── */}
            <section id="marketing" className="mb-26">
              <SectionTitle>Marketing Sections</SectionTitle>
              <SectionDescription>Pre-built marketing components for landing pages.</SectionDescription>
              <ComponentShowcase title="Feature Grid">
                <FeatureGrid>
                  <FeatureCard
                    icon={<ShieldCheck className="size-6 text-brand-dark" />}
                    title="Safe & Secure"
                    description="Your child's safety is our top priority with real-time monitoring."
                  />
                  <FeatureCard
                    icon={<Heart className="size-6 text-brand-dark" />}
                    title="Loving Care"
                    description="Trained caregivers who treat every child like their own."
                  />
                  <FeatureCard
                    icon={<BarChart3 className="size-6 text-brand-dark" />}
                    title="Daily Reports"
                    description="Track your child's progress with detailed daily activity reports."
                  />
                </FeatureGrid>
              </ComponentShowcase>
              <ComponentShowcase title="CTA Banner">
                <CTABanner
                  title="Ready to get started?"
                  description="Join thousands of parents who trust CEven for their child's care."
                  actions={
                    <>
                      <Button variant="brand">Get Started</Button>
                      <Button variant="outline">Learn More</Button>
                    </>
                  }
                />
              </ComponentShowcase>
            </section>

            <Separator className="mb-20" />

            <footer className="pb-10 text-center">
              <p className="text-caption">
                CEven Design System v1.0 — Built with Next.js, Tailwind CSS, and Base UI
              </p>
            </footer>
          </div>
        </main>
    </div>
  )
}

function AiSparkleIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 21.7538 21.7538" fill="none" className={className}>
      <path
        d="M18.0038 12.75C18.0057 13.0558 17.9128 13.3547 17.7379 13.6055C17.5629 13.8563 17.3146 14.0468 17.0269 14.1506L12.1913 15.9375L10.4101 20.7769C10.3046 21.0634 10.1137 21.3108 9.86327 21.4855C9.61282 21.6601 9.3148 21.7538 9.00944 21.7538C8.70407 21.7538 8.40606 21.6601 8.1556 21.4855C7.90514 21.3108 7.7143 21.0634 7.60881 20.7769L5.81631 15.9375L0.976936 14.1562C0.69037 14.0508 0.443055 13.8599 0.26836 13.6095C0.0936661 13.359 0 13.061 0 12.7556C0 12.4503 0.0936661 12.1522 0.26836 11.9018C0.443055 11.6513 0.69037 11.4605 0.976936 11.355L5.81631 9.5625L7.59756 4.72313C7.70305 4.43656 7.89389 4.18924 8.14435 4.01455C8.39481 3.83985 8.69282 3.74619 8.99819 3.74619C9.30355 3.74619 9.60157 3.83985 9.85202 4.01455C10.1025 4.18924 10.2933 4.43656 10.3988 4.72313L12.1913 9.5625L17.0307 11.3438C17.3185 11.4486 17.5667 11.6401 17.741 11.892C17.9153 12.1439 18.0072 12.4437 18.0038 12.75ZM12.7538 3.75H14.2538V5.25C14.2538 5.44891 14.3328 5.63968 14.4735 5.78033C14.6141 5.92098 14.8049 6 15.0038 6C15.2027 6 15.3935 5.92098 15.5341 5.78033C15.6748 5.63968 15.7538 5.44891 15.7538 5.25V3.75H17.2538C17.4527 3.75 17.6435 3.67098 17.7841 3.53033C17.9248 3.38968 18.0038 3.19891 18.0038 3C18.0038 2.80109 17.9248 2.61032 17.7841 2.46967C17.6435 2.32902 17.4527 2.25 17.2538 2.25H15.7538V0.75C15.7538 0.551088 15.6748 0.360322 15.5341 0.21967C15.3935 0.0790176 15.2027 0 15.0038 0C14.8049 0 14.6141 0.0790176 14.4735 0.21967C14.3328 0.360322 14.2538 0.551088 14.2538 0.75V2.25H12.7538C12.5549 2.25 12.3641 2.32902 12.2235 2.46967C12.0828 2.61032 12.0038 2.80109 12.0038 3C12.0038 3.19891 12.0828 3.38968 12.2235 3.53033C12.3641 3.67098 12.5549 3.75 12.7538 3.75ZM21.0038 6.75H20.2538V6C20.2538 5.80109 20.1748 5.61032 20.0341 5.46967C19.8935 5.32902 19.7027 5.25 19.5038 5.25C19.3049 5.25 19.1141 5.32902 18.9735 5.46967C18.8328 5.61032 18.7538 5.80109 18.7538 6V6.75H18.0038C17.8049 6.75 17.6141 6.82902 17.4735 6.96967C17.3328 7.11032 17.2538 7.30109 17.2538 7.5C17.2538 7.69891 17.3328 7.88968 17.4735 8.03033C17.6141 8.17098 17.8049 8.25 18.0038 8.25H18.7538V9C18.7538 9.19891 18.8328 9.38968 18.9735 9.53033C19.1141 9.67098 19.3049 9.75 19.5038 9.75C19.7027 9.75 19.8935 9.67098 20.0341 9.53033C20.1748 9.38968 20.2538 9.19891 20.2538 9V8.25H21.0038C21.2027 8.25 21.3935 8.17098 21.5341 8.03033C21.6748 7.88968 21.7538 7.69891 21.7538 7.5C21.7538 7.30109 21.6748 7.11032 21.5341 6.96967C21.3935 6.82902 21.2027 6.75 21.0038 6.75Z"
        fill="currentColor"
      />
    </svg>
  )
}

