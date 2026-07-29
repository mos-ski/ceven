"use client"

import * as React from "react"
import Link from "next/link"
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
      { id: "badges", label: "Badges & Status" },
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
      { id: "input-fields", label: "Input Fields" },
      { id: "text-area", label: "Text Area" },
      { id: "dropdown", label: "Dropdown" },
      { id: "dropdown-list", label: "Dropdown List Item" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio Buttons" },
      { id: "switches", label: "Toggles & Switches" },
      { id: "sliders", label: "Sliders" },
      { id: "otp", label: "OTP Box" },
      { id: "date-picker", label: "Date Picker" },
      { id: "searchbar", label: "Search Bar" },
    ],
  },
  {
    label: "Application Components",
    items: [
      { id: "cards", label: "Cards" },
      { id: "tables", label: "Tables" },
      { id: "navigation", label: "Navigation" },
      { id: "tabs", label: "Tabs" },
      { id: "progress", label: "Progress" },
      { id: "modals", label: "Modals & Dialogs" },
      { id: "alerts", label: "Alerts & Notifications" },
      { id: "pagination", label: "Pagination" },
      { id: "empty-state", label: "Empty States" },
      { id: "progress-steps", label: "Progress Steps" },
      { id: "file-upload", label: "File Upload" },
      { id: "code-blocks", label: "Code Blocks" },
      { id: "activity-feeds", label: "Activity Feeds" },
      { id: "native", label: "Native" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { id: "marketing", label: "Marketing Sections" },
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
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-h2 text-heading mb-1">{children}</h2>
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
    <div className="mb-10">
      {title && <h3 className="text-h5 text-heading mb-4">{title}</h3>}
      <div className="rounded-[8px] border border-border bg-white p-6">
        {children}
      </div>
    </div>
  )
}

export default function LibraryPage() {
  const [activeSection, setActiveSection] = React.useState("logos")
  const [scrollContainerRef, setScrollContainerRef] = React.useState<HTMLDivElement | null>(null)

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
              <div className="relative h-8 w-auto">
                <img src="/Logo/CEVEN APP 1.svg" alt="CEven" className="h-8 w-auto object-contain" />
              </div>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="size-5 text-muted-text" />
            </button>
          </div>

          <div className="mb-4">
            <span className="text-overline text-muted-text">Design System</span>
          </div>

          <nav className="space-y-4">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <p className="text-ui-xs text-muted-text mb-1.5 font-semibold uppercase tracking-wider">
                  {group.label}
                </p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveSection(item.id)
                          document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                        }}
                        className={cn(
                          "flex items-center rounded-lg px-3 py-1.5 text-sm transition-colors",
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
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto h-screen lg:pl-60">
          {/* Mobile header */}
          <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-[#F8F6F3] px-4 py-3 lg:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="size-5 text-heading" />
            </button>
            <span style={{ fontFamily: "var(--font-mogra-import)" }} className="text-lg text-brand-dark">CEven</span>
          </div>

          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <div className="mb-10">
              <h1 className="text-display text-heading mb-2" style={{ fontFamily: "var(--font-mogra-import)" }}>
                CEven Design System
              </h1>
              <p className="text-body text-muted-text">
                The style guide provides to change stylistic for your design site.
              </p>
            </div>

            <Separator className="mb-10" />

            {/* ─── 1. Logo ─────────────────────────────────────────────── */}
            <section id="logos" className="mb-16">
              <SectionTitle>Logo</SectionTitle>
              <SectionDescription>
                The CEven logo in multiple sizes and configurations.
              </SectionDescription>
              <ComponentShowcase>
                <div className="flex flex-wrap items-end gap-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative h-32 w-32">
                      <img src="/Logo/CEVEN APP 1.svg" alt="CEven Logo Large" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Large</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative h-20 w-20">
                      <img src="/Logo/CEVEN APP 1.svg" alt="CEven Logo Medium" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative h-12 w-12">
                      <img src="/Logo/CEVEN APP 1.svg" alt="CEven Logo Small" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Small</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative h-8 w-8">
                      <img src="/Logo/CEVEN APP 1.svg" alt="CEven Logo Tiny" className="h-full w-full object-contain" />
                    </div>
                    <span className="text-caption">Tiny</span>
                  </div>
                </div>

              </ComponentShowcase>
            </section>

            {/* ─── 2. Progress Bar ─────────────────────────────────────── */}
            <section id="progress" className="mb-16">
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
            <section id="native" className="mb-16">
              <SectionTitle>Native</SectionTitle>
              <SectionDescription>
                Native iOS UI elements for reference.
              </SectionDescription>
              <ComponentShowcase>
                <div className="flex flex-col items-center gap-6">
                  <div className="w-full max-w-xs rounded-2xl bg-[#F2F2F7] p-4 text-center">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px]">●●●●</span>
                        <span className="text-[10px]">WiFi</span>
                        <span className="text-[10px]">🔋</span>
                      </div>
                    </div>
                    <div className="mt-2 mx-auto h-1 w-28 rounded-full bg-black" />
                  </div>
                  <p className="text-caption">Status Bar — Light & Dark</p>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 4. Navigation ──────────────────────────────────────── */}
            <section id="navigation" className="mb-16">
              <SectionTitle>Navigation</SectionTitle>
              <SectionDescription>
                Mobile bottom navigation with pill-shaped active state.
              </SectionDescription>
              <ComponentShowcase>
                <div className="flex flex-col items-center gap-6">
                  {(["home", "creche", "report", "profile"] as const).map((tab) => (
                    <div key={tab} className="w-full max-w-xs">
                      <div className="flex items-center justify-around rounded-2xl bg-white px-4 py-3 shadow-sm border border-border">
                        {(["home", "creche", "report", "profile"] as const).map((item) => {
                          const icons = { home: Home, creche: Search, report: FileText, profile: User }
                          const Icon = icons[item]
                          const isActive = tab === item
                          return (
                            <button
                              key={item}
                              className={cn(
                                "flex flex-col items-center gap-1 px-4 py-1.5 rounded-full transition-all",
                                isActive && "bg-[#E0BFA0]"
                              )}
                            >
                              <Icon className={cn("size-5", isActive ? "text-brand-dark" : "text-gray-400")} />
                              <span className={cn("text-[10px] font-medium", isActive ? "text-brand-dark" : "text-gray-400")}>
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                      <p className="text-caption text-center mt-2">Active: {tab.charAt(0).toUpperCase() + tab.slice(1)}</p>
                    </div>
                  ))}
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Cards ──────────────────────────────────────────────── */}
            <section id="cards" className="mb-16">
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
            <section id="tables" className="mb-16">
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
                          <Badge variant={row.status === "Active" ? "outline" : "secondary"}>
                            {row.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ComponentShowcase>
            </section>

            {/* ─── 5. Icons ───────────────────────────────────────────── */}
            <section id="icons" className="mb-16">
              <SectionTitle>Icons</SectionTitle>
              <SectionDescription>
                Lucide React icons used across the CEven platform.
              </SectionDescription>
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
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
                      {group.icons.map(({ Icon, name }) => (
                        <div key={name} className="flex flex-col items-center gap-1.5 p-2">
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
            <section id="colors" className="mb-16">
              <SectionTitle>Colors</SectionTitle>
              <SectionDescription>Brand color palette used throughout the CEven design system.</SectionDescription>
              <ComponentShowcase>
                <div className="space-y-6">
                  {/* Brand Colors */}
                  <div>
                    <p className="text-ui-sm text-muted-text mb-3 font-semibold">Brand</p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { name: "Brand Dark", value: "#3B2513" },
                        { name: "Brand Accent", value: "#9A6033" },
                        { name: "Button BG", value: "#E0BFA0" },
                        { name: "Button Border", value: "#D4A67F" },
                        { name: "Content BG", value: "#FFF9F0" },
                        { name: "Table Header", value: "#EDD9C0" },
                      ].map((c) => (
                        <div key={c.name} className="flex flex-col items-center gap-1.5">
                          <div className="size-16 rounded-lg border border-border shadow-sm" style={{ backgroundColor: c.value }} />
                          <span className="text-caption text-center">{c.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{c.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Semantic Colors */}
                  <div>
                    <p className="text-ui-sm text-muted-text mb-3 font-semibold">Semantic</p>
                    <div className="flex flex-wrap gap-3">
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
                        <div key={c.name} className="flex flex-col items-center gap-1.5">
                          <div className="size-16 rounded-lg border border-border shadow-sm" style={{ backgroundColor: c.value }} />
                          <span className="text-caption text-center">{c.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono">{c.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Neutrals */}
                  <div>
                    <p className="text-ui-sm text-muted-text mb-3 font-semibold">Neutrals</p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { name: "Heading", value: "#1F2937" },
                        { name: "Muted Text", value: "#6B7280" },
                        { name: "OTP Text", value: "#858C98" },
                        { name: "Input Border", value: "#CCD2DC" },
                        { name: "Card Border", value: "#E6EBF3" },
                        { name: "Table Border", value: "#EAECF0" },
                      ].map((c) => (
                        <div key={c.name} className="flex flex-col items-center gap-1.5">
                          <div className="size-16 rounded-lg border border-border shadow-sm" style={{ backgroundColor: c.value }} />
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
            <section id="typography" className="mb-16">
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
            <section id="text-combos" className="mb-16">
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
            <section id="buttons" className="mb-16">
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
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="brand" size="xs">Extra Small</Button>
                  <Button variant="brand" size="sm">Small</Button>
                  <Button variant="brand" size="default">Default</Button>
                  <Button variant="brand" size="lg">Large</Button>
                  <Button variant="brand" size="xl">Extra Large</Button>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="With Icons">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="brand"><Plus className="size-4" /> Create</Button>
                  <Button variant="outline" className="border-gray-300"><Download className="size-4" /> Download</Button>
                  <Button variant="tan"><Send className="size-4" /> Send</Button>
                  <Button variant="brand" loading>Loading</Button>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Icon-Only (Back Button)">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" className="rounded-full border-gray-300">
                    <ArrowLeft className="size-4" />
                  </Button>
                  <Button variant="brand" size="icon" className="rounded-full">
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 7. Icon Buttons ────────────────────────────────────── */}
            <section id="icon-buttons" className="mb-16">
              <SectionTitle>Icon Button</SectionTitle>
              <SectionDescription>
                Circular icon buttons in multiple colors and sizes.
              </SectionDescription>
              <ComponentShowcase>
                <div className="space-y-6">
                  {(["sm", "default", "lg"] as const).map((size) => (
                    <div key={size} className="flex items-center gap-4">
                      <span className="w-12 text-caption capitalize">{size}</span>
                      <Button variant="ghost" size={size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"} className="rounded-full bg-[#009061] text-white hover:bg-[#009061]/90">
                        <Check className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
                      </Button>
                      <Button variant="ghost" size={size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"} className="rounded-full bg-white border border-border text-foreground hover:bg-muted">
                        <Check className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
                      </Button>
                      <Button variant="ghost" size={size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"} className="rounded-full bg-[#3B2513] text-white hover:bg-[#3B2513]/90">
                        <Check className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
                      </Button>
                      <Button variant="ghost" size={size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"} className="rounded-full bg-[#E84057] text-white hover:bg-[#E84057]/90">
                        <Check className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
                      </Button>
                      <Button variant="ghost" size={size === "sm" ? "icon-sm" : size === "lg" ? "icon-lg" : "icon"} className="rounded-full bg-muted text-muted-foreground opacity-50 cursor-not-allowed" disabled>
                        <Check className={cn(size === "sm" ? "size-3" : size === "lg" ? "size-5" : "size-4")} />
                      </Button>
                    </div>
                  ))}
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 8. Badges ──────────────────────────────────────────── */}
            <section id="badges" className="mb-16">
              <SectionTitle>Badges</SectionTitle>
              <SectionDescription>
                Status badges with close buttons.
              </SectionDescription>
              <ComponentShowcase>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="default">Default <X className="size-3 ml-1 cursor-pointer" /></Badge>
                  <Badge variant="secondary">Secondary <X className="size-3 ml-1 cursor-pointer" /></Badge>
                  <Badge variant="outline">Success <X className="size-3 ml-1 cursor-pointer" /></Badge>
                  <Badge variant="destructive">Error <X className="size-3 ml-1 cursor-pointer" /></Badge>
                  <Badge className="bg-[#E0BFA0] text-brand-dark border-[#D4A67F]">Brand <X className="size-3 ml-1 cursor-pointer" /></Badge>
                  <Badge className="bg-[#E1F5EC] text-[#009061] border-[#009061]/20">Active <X className="size-3 ml-1 cursor-pointer" /></Badge>
                  <Badge className="bg-[#F9F1E6] text-[#FF9A01] border-[#FF9A01]/20">Warning <X className="size-3 ml-1 cursor-pointer" /></Badge>
                  <Badge className="bg-[#FDE8E8] text-[#CD3030] border-[#CD3030]/20">Danger <X className="size-3 ml-1 cursor-pointer" /></Badge>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 9. Labels ──────────────────────────────────────────── */}
            <section id="labels" className="mb-16">
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
                    <span key={i} className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", item.bg, item.text, item.border)}>
                      <Info className="size-3" />
                      Label
                      <X className="size-3 cursor-pointer opacity-60 hover:opacity-100" />
                    </span>
                  ))}
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 10. Tags ───────────────────────────────────────────── */}
            <section id="tags" className="mb-16">
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
            <section id="avatars" className="mb-16">
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
            <section id="tooltips" className="mb-16">
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
            <section id="snackbar" className="mb-16">
              <SectionTitle>Snackbar</SectionTitle>
              <SectionDescription>
                Colored toast notifications with close button.
              </SectionDescription>
              <ComponentShowcase>
                <div className="space-y-3 max-w-sm">
                  <Snackbar variant="success">This is snack bar</Snackbar>
                  <Snackbar variant="default">This is snack bar</Snackbar>
                  <Snackbar variant="tan">This is snack bar</Snackbar>
                  <Snackbar variant="light-success">This is snack bar</Snackbar>
                  <Snackbar variant="light-danger">This is snack bar</Snackbar>
                </div>
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
            <section id="checkbox" className="mb-16">
              <SectionTitle>Checkbox</SectionTitle>
              <SectionDescription>
                Checkboxes with brand (brown) color variant.
              </SectionDescription>
              <ComponentShowcase>
                <div className="space-y-4">
                  <div>
                    <p className="text-ui-sm text-muted-text mb-3">Default (Primary)</p>
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
                    <p className="text-ui-sm text-muted-text mb-3">Brand (Brown)</p>
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
            <section id="radio" className="mb-16">
              <SectionTitle>Radio Buttons</SectionTitle>
              <SectionDescription>
                Radio buttons with brand color variant.
              </SectionDescription>
              <ComponentShowcase>
                <div className="space-y-4">
                  <div>
                    <p className="text-ui-sm text-muted-text mb-3">Default</p>
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
                    <p className="text-ui-sm text-muted-text mb-3">Disabled</p>
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
            <section id="switches" className="mb-16">
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
            <section id="sliders" className="mb-16">
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
            <section id="otp" className="mb-16">
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
                        className="size-12 rounded-[8px] border border-input bg-transparent text-center text-lg font-semibold text-foreground outline-none focus:border-ring focus:ring-3 focus:ring-ring/50 transition-colors"
                      />
                    ))}
                  </div>
                  <p className="text-caption">Enter the 6-digit code sent to your phone</p>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 16. Input Fields ───────────────────────────────────── */}
            <section id="input-fields" className="mb-16">
              <SectionTitle>Input Fields</SectionTitle>
              <SectionDescription>
                Input fields with label, hint text, icons, and error states.
              </SectionDescription>
              <ComponentShowcase title="Basic Inputs">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-2xl">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <InputField placeholder="Placeholder" />
                    <InputHint>This is a hint text to help user</InputHint>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <InputField placeholder="Placeholder" leftIcon={<Mail className="size-4" />} />
                    <InputHint>This is a hint text to help user</InputHint>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <InputField placeholder="Placeholder" leftIcon={<Globe className="size-4" />} rightIcon={<Info className="size-4" />} />
                    <InputHint>This is a hint text to help user</InputHint>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <InputField placeholder="Card number" leftIcon={<CreditCard className="size-4" />} rightIcon={<Info className="size-4" />} />
                    <InputHint>This is a hint text to help user</InputHint>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Error States">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-2xl">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-red-500">Label</label>
                    <InputField placeholder="Placeholder" error leftIcon={<Mail className="size-4" />} rightIcon={<AlertCircle className="size-4" />} />
                    <InputHint error>This is a error message.</InputHint>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-red-500">Label</label>
                    <InputField placeholder="Card number" error leftIcon={<CreditCard className="size-4" />} rightIcon={<AlertCircle className="size-4" />} />
                    <InputHint error>This is a error message.</InputHint>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Disabled">
                <div className="max-w-xs space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Label</label>
                  <InputField placeholder="Placeholder" disabled />
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 17. Text Area ──────────────────────────────────────── */}
            <section id="text-area" className="mb-16">
              <SectionTitle>Text Area</SectionTitle>
              <SectionDescription>
                Multi-line text input with character count, hint text, and error states.
              </SectionDescription>
              <ComponentShowcase title="Basic Textarea">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-2xl">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <Textarea
                      placeholder="Placeholder"
                      maxLength={200}
                      value={textareaValue}
                      onChange={(e) => setTextareaValue(e.target.value)}
                    />
                    <TextareaHint>This is a hint text to help user</TextareaHint>
                  </div>
                  <div className="space-y-1.5">
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
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <Textarea
                      value={textareaWithTags}
                      onChange={(e) => setTextareaWithTags(e.target.value)}
                      maxLength={200}
                    />
                    <TextareaHint>This is a hint text to help user</TextareaHint>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Label</label>
                    <div className="rounded-[8px] border border-input p-2">
                      <div className="flex flex-wrap gap-1 mb-2">
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
                <div className="max-w-xs space-y-1.5">
                  <label className="text-sm font-medium text-red-500">Label</label>
                  <Textarea
                    value="Keep up with our newsletters for the latest updates"
                    maxLength={200}
                    error
                  />
                  <TextareaHint error>
                    <span className="flex items-center gap-1"><AlertCircle className="size-3" /> This is a hint text to help user</span>
                  </TextareaHint>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 18. Dropdown ───────────────────────────────────────── */}
            <section id="dropdown" className="mb-16">
              <SectionTitle>Dropdown</SectionTitle>
              <SectionDescription>
                Single select and multi-select dropdown menus with checkmarks.
              </SectionDescription>
              <ComponentShowcase title="Single Select">
                <div className="max-w-xs space-y-1.5">
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
                <div className="max-w-xs space-y-1.5">
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
            <section id="dropdown-list" className="mb-16">
              <SectionTitle>Dropdown List Item</SectionTitle>
              <SectionDescription>
                List items with optional checkmarks and radio indicators.
              </SectionDescription>
              <ComponentShowcase>
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="rounded-lg border border-border bg-white p-1">
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((opt) => (
                      <div key={opt} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted cursor-pointer">
                        {opt}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-border bg-white p-1">
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((opt, i) => (
                      <div key={opt} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted cursor-pointer">
                        {opt}
                        {i === 1 && <Check className="size-4 text-foreground" />}
                      </div>
                    ))}
                  </div>
                  <div className="rounded-lg border border-border bg-white p-1">
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((opt, i) => (
                      <div key={opt} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted cursor-pointer">
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
                  <div className="rounded-lg border border-border bg-white p-1">
                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((opt, i) => (
                      <div key={opt} className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted cursor-pointer">
                        {opt}
                        <Checkbox checked={i === 1 || i === 2} />
                      </div>
                    ))}
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 20. Date Picker ────────────────────────────────────── */}
            <section id="date-picker" className="mb-16">
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
            <section id="searchbar" className="mb-16">
              <SectionTitle>Searchbar</SectionTitle>
              <SectionDescription>
                Search input with magnifying glass icon and clear button.
              </SectionDescription>
              <ComponentShowcase>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-1.5">
                    <p className="text-ui-sm text-muted-text">Default</p>
                    <SearchBar placeholder="Placeholder" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-ui-sm text-muted-text">With Value</p>
                    <SearchBar placeholder="Placeholder" defaultValue="Search query" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-ui-sm text-muted-text">Small</p>
                    <SearchBar placeholder="Placeholder" size="sm" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-ui-sm text-muted-text">Disabled</p>
                    <SearchBar placeholder="Placeholder" disabled />
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 22. Tabs ───────────────────────────────────────────── */}
            <section id="tabs" className="mb-16">
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
                <div className="bg-[#3D3D3D] rounded-xl p-6">
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
            <section id="modals" className="mb-16">
              <SectionTitle>Modals & Dialogs</SectionTitle>
              <SectionDescription>Modal dialogs for confirmations and forms.</SectionDescription>
              <ComponentShowcase>
                <div className="flex flex-wrap gap-3">
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
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium">Name</label>
                          <Input placeholder="Enter child name" />
                        </div>
                        <div className="space-y-1.5">
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
            <section id="alerts" className="mb-16">
              <SectionTitle>Alerts & Notifications</SectionTitle>
              <SectionDescription>Alert banners for different message types.</SectionDescription>
              <ComponentShowcase>
                <div className="space-y-4 max-w-2xl">
                  <AlertBanner variant="success" title="Success" icon={<CheckCircle2 className="size-4" />}>
                    Child enrollment has been completed successfully.
                  </AlertBanner>
                  <AlertBanner variant="warning" title="Warning" icon={<AlertTriangle className="size-4" />}>
                    Some caregivers have not submitted their reports yet.
                  </AlertBanner>
                  <AlertBanner variant="error" title="Error" icon={<XCircle className="size-4" />}>
                    Failed to save changes. Please try again.
                  </AlertBanner>
                  <AlertBanner variant="info" title="Info" icon={<Info className="size-4" />}>
                    A new version of the app is available for update.
                  </AlertBanner>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 23. Empty State ────────────────────────────────────── */}
            <section id="empty-state" className="mb-16">
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
            <section id="pagination" className="mb-16">
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
            <section id="progress-steps" className="mb-16">
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
            <section id="file-upload" className="mb-16">
              <SectionTitle>File Upload</SectionTitle>
              <SectionDescription>Drag and drop file upload zone.</SectionDescription>
              <ComponentShowcase>
                <div className="max-w-md">
                  <FileUpload accept="image/*,.pdf" multiple onFilesSelected={(files) => toast.info(`${files.length} file(s) selected`)} />
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Code Blocks ─────────────────────────────────────────── */}
            <section id="code-blocks" className="mb-16">
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
            <section id="activity-feeds" className="mb-16">
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
            <section id="ai-chat" className="mb-16">
              <SectionTitle>AI Chat Interface</SectionTitle>
              <SectionDescription>The full CEvenAI chat interface with header, messages, and input bar.</SectionDescription>
              <ComponentShowcase title="Full Chat (Empty State)">
                <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-[#fffefa] shadow-sm">
                  {/* Header */}
                  <div className="flex items-center px-4 pt-4 pb-3">
                    <button className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-gray-200 bg-[#f4f5f6]">
                      <ArrowLeft size={16} className="text-gray-700" />
                    </button>
                    <div className="flex flex-1 items-center justify-center gap-2">
                      <AiSparkleIcon size={22} className="text-brand-dark" />
                      <h1 className="text-lg font-bold text-gray-800">CEvenAI</h1>
                    </div>
                    <div className="h-[34px] w-[34px]" />
                  </div>
                  {/* Empty chat area */}
                  <div className="flex h-[300px] flex-col items-center justify-center px-6 text-center">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3EDE5]">
                      <AiSparkleIcon size={30} className="text-brand-dark" />
                    </div>
                    <h2 className="mb-1 text-base font-bold text-gray-800">Hi! I&apos;m CEvenAI</h2>
                    <p className="max-w-[220px] text-xs text-gray-500">
                      Ask me about your child&apos;s day, health patterns, or activities.
                    </p>
                    <div className="mt-4 space-y-2">
                      {["Summarize today's report", "Any health patterns this week?", "How was my child's mood?", "What learning activity was done?"].map((p) => (
                        <button key={p} className="flex w-full items-center gap-2 rounded-xl bg-[#F3EDE5] px-4 py-3 text-left text-sm text-brand-dark">
                          <span>{p}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Input bar */}
                  <div className="shrink-0 bg-white px-4 pt-4 pb-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
                    <div className="flex items-center gap-3">
                      <input placeholder="Ask me anything..." className="flex-1 rounded-xl bg-[#f4f5f6] px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                      <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E0BFA0]">
                        <Send size={14} className="text-brand-dark" />
                      </button>
                      <Mic size={22} className="text-gray-500" />
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── AI Messages ────────────────────────────────────────── */}
            <section id="ai-messages" className="mb-16">
              <SectionTitle>AI Messages</SectionTitle>
              <SectionDescription>User and AI message bubble styles with action buttons.</SectionDescription>
              <ComponentShowcase title="User Message">
                <div className="flex justify-end">
                  <div className="max-w-[78%] rounded-2xl bg-brand-dark px-4 py-3 text-sm text-white">
                    Summarize today&apos;s report
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="AI Message">
                <div className="flex justify-start">
                  <div className="max-w-[88%]">
                    <div className="mb-1 flex items-center gap-1.5">
                      <AiSparkleIcon size={14} className="text-brand-dark" />
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                      <p>Of course! As an AI language model, I am designed to assist with a variety of tasks.</p>
                      <p className="mt-1">Here are some examples of what I can do:</p>
                      <p className="mt-1">• Answer questions: Just ask me anything you like!</p>
                      <p className="mt-1">• Generate text: I can write stories, poems, or summaries for you.</p>
                    </div>
                    <div className="mt-1.5 flex items-center gap-3">
                      <button className="text-gray-300 hover:text-gray-500"><ThumbsUp size={14} /></button>
                      <button className="text-gray-300 hover:text-gray-500"><ThumbsDown size={14} /></button>
                      <button className="text-gray-300 hover:text-gray-500"><Copy size={14} /></button>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Conversation Flow">
                <div className="mx-auto max-w-sm space-y-3">
                  <div className="flex justify-end">
                    <div className="max-w-[78%] rounded-2xl bg-brand-dark px-4 py-3 text-sm text-white">
                      Summarize today&apos;s report
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[88%]">
                      <div className="mb-1 flex items-center gap-1.5">
                        <AiSparkleIcon size={14} className="text-brand-dark" />
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
                        <p>Of course! As an AI language model, I am designed to assist with a variety of tasks. Here are some examples of what I can do:</p>
                        <p className="mt-1">• Answer questions: Just ask me anything you like!</p>
                        <p className="mt-1">• Generate text: I can write stories, poems, or summaries for you.</p>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3">
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
            <section id="ai-empty" className="mb-16">
              <SectionTitle>AI Empty State</SectionTitle>
              <SectionDescription>Greeting screen with suggested prompt buttons.</SectionDescription>
              <ComponentShowcase>
                <div className="mx-auto max-w-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3EDE5]">
                      <AiSparkleIcon size={30} className="text-brand-dark" />
                    </div>
                    <h2 className="mb-1 text-base font-bold text-gray-800">Hi! I&apos;m CEvenAI</h2>
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
                      <button key={p.text} className="flex w-full items-center gap-2 rounded-xl bg-[#F3EDE5] px-4 py-3 text-left text-sm text-brand-dark">
                        <span>{p.icon}</span>
                        <span>{p.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── AI Input Bar ───────────────────────────────────────── */}
            <section id="ai-input" className="mb-16">
              <SectionTitle>AI Input Bar</SectionTitle>
              <SectionDescription>Chat input with send, mic, and refresh buttons.</SectionDescription>
              <ComponentShowcase title="Empty State">
                <div className="mx-auto max-w-sm rounded-xl bg-white px-4 py-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
                  <div className="flex items-center gap-3">
                    <input placeholder="Ask me anything..." className="flex-1 rounded-xl bg-[#f4f5f6] px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E0BFA0]">
                      <Send size={14} className="text-brand-dark" />
                    </button>
                    <Mic size={22} className="text-gray-500" />
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="With Refresh Button">
                <div className="mx-auto max-w-sm rounded-xl bg-white px-4 py-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
                  <div className="flex items-center gap-3">
                    <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <RefreshCw size={14} className="text-gray-500" />
                    </button>
                    <input placeholder="Ask me anything..." className="flex-1 rounded-xl bg-[#f4f5f6] px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E0BFA0]">
                      <Send size={14} className="text-brand-dark" />
                    </button>
                    <Mic size={22} className="text-gray-500" />
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Disabled (Trial Ended)">
                <div className="mx-auto max-w-sm rounded-xl bg-white px-4 py-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
                  <div className="flex items-center gap-3">
                    <input placeholder="Manage your account to keep chatting" disabled className="flex-1 rounded-xl bg-[#f4f5f6] px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-60" />
                    <button disabled className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E0BFA0] disabled:opacity-60">
                      <Send size={14} className="text-brand-dark" />
                    </button>
                    <Mic size={22} className="text-gray-300" />
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── AI Typing Indicator ────────────────────────────────── */}
            <section id="ai-typing" className="mb-16">
              <SectionTitle>AI Typing Indicator</SectionTitle>
              <SectionDescription>Bouncing dots animation while AI is generating a response.</SectionDescription>
              <ComponentShowcase>
                <div className="flex items-center gap-2">
                  <AiSparkleIcon size={14} className="text-brand-dark" />
                  <div className="flex items-center gap-1 rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── AI Risk Badge ──────────────────────────────────────── */}
            <section id="ai-risk" className="mb-16">
              <SectionTitle>AI Risk Badge</SectionTitle>
              <SectionDescription>AI-computed risk level badges for child welfare monitoring.</SectionDescription>
              <ComponentShowcase title="Risk Levels">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "#ecfdf5", color: "#059669", borderColor: "#059669" }}>Low Risk</span>
                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "#fffbeb", color: "#d97706", borderColor: "#d97706" }}>Medium Risk</span>
                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "#fef2f2", color: "#dc2626", borderColor: "#dc2626" }}>High Risk</span>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Locked (Seedling Plan)">
                <div className="group relative inline-flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold" style={{ backgroundColor: "#f3f4f6", color: "#9ca3af", borderColor: "#d1d5db" }}>
                    <Lock className="h-2.5 w-2.5" />
                    AI Risk
                  </span>
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="whitespace-nowrap rounded-lg bg-[#2d1810] px-3 py-1.5 text-[10px] text-white shadow-lg">
                      Upgrade to Nurture Pro to unlock AI Risk
                      <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#2d1810]" />
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Thread List ─────────────────────────────────────────── */}
            <section id="msg-thread-list" className="mb-16">
              <SectionTitle>Thread List</SectionTitle>
              <SectionDescription>Chat thread list with search, avatars, and date grouping.</SectionDescription>
              <ComponentShowcase title="Parent Chat List">
                <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  {/* Search */}
                  <div className="px-4 pt-3 pb-2">
                    <div className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-2.5">
                      <Search size={16} className="text-gray-400" />
                      <input placeholder="Search" className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    </div>
                  </div>
                  {/* Today */}
                  <p className="px-4 py-2 text-xs font-medium text-gray-400">Today</p>
                  <div className="bg-white">
                    {[
                      { initials: "MA", name: "Mrs Anu", last: "Liam had a great day today!", time: "4:30 PM", color: "bg-brand-dark" },
                      { initials: "SM", name: "Sarah (Mother)", last: "Don't forget the parent meeting", time: "2:15 PM", color: "bg-[#D4A67F]" },
                    ].map((t) => (
                      <div key={t.name} className="flex items-center gap-3 px-4 py-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${t.color}`}>
                          {t.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                            <p className="text-[10px] text-gray-400">{t.time}</p>
                          </div>
                          <p className="truncate text-xs text-gray-400">{t.last}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Yesterday */}
                  <p className="px-4 py-2 text-xs font-medium text-gray-400">Yesterday</p>
                  <div className="bg-white">
                    {[
                      { initials: "AD", name: "Creche Admin", last: "Invoice has been sent", time: "Yesterday", color: "bg-indigo-500" },
                    ].map((t) => (
                      <div key={t.name} className="flex items-center gap-3 px-4 py-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${t.color}`}>
                          {t.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                            <p className="text-[10px] text-gray-400">{t.time}</p>
                          </div>
                          <p className="truncate text-xs text-gray-400">{t.last}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Family Group Thread">
                <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7A4C29] to-[#D4A67F] text-xs font-bold text-white">
                      LF
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-800">Liam&apos;s Family</p>
                        <p className="text-[10px] text-gray-400">9:24 AM</p>
                      </div>
                      <p className="truncate text-xs text-gray-400">James: Perfect, we&apos;ll be there. Thanks everyone!</p>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── 1-on-1 Chat ────────────────────────────────────────── */}
            <section id="msg-1on1" className="mb-16">
              <SectionTitle>1-on-1 Chat</SectionTitle>
              <SectionDescription>Direct message conversation between parent and caregiver.</SectionDescription>
              <ComponentShowcase title="Chat View">
                <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-[#FFFEFA] shadow-sm">
                  {/* Header */}
                  <div className="flex items-center gap-3 bg-[#FAFAFA] px-4 pt-4 pb-3 shadow-sm">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F7F7]">
                      <ArrowLeft size={16} className="text-gray-700" />
                    </button>
                    <div className="flex flex-1 items-center gap-2.5">
                      <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0BFA0] text-sm font-bold text-white">MA</div>
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">Mrs Anu</p>
                        <p className="text-[10px] text-green-500">Online</p>
                      </div>
                    </div>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F7F7]">
                      <Video size={16} className="text-gray-700" />
                    </button>
                  </div>
                  {/* Messages */}
                  <div className="space-y-3 px-4 py-4">
                    <div className="flex justify-end">
                      <div className="max-w-[72%]">
                        <div className="rounded-2xl rounded-tr-sm bg-[#0167FF] px-4 py-3">
                          <p className="text-sm text-white">Hi, Mrs Anu</p>
                        </div>
                        <div className="mt-1 flex items-center justify-end gap-1">
                          <p className="text-[10px] text-gray-400">16:48</p>
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5l3 3 5-7M6 5l3 3 5-7" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-[72%]">
                        <div className="rounded-2xl rounded-tl-sm bg-[#DCE0E4] px-4 py-3">
                          <p className="text-sm text-[#2D2E2E]">Good afternoon Ma, how can I help you?</p>
                        </div>
                        <p className="mt-1 text-[10px] text-gray-400">16:50</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[72%]">
                        <div className="rounded-2xl rounded-tr-sm bg-[#0167FF] px-4 py-3">
                          <p className="text-sm text-white">Liam had a great day today! He played well with others.</p>
                        </div>
                        <div className="mt-1 flex items-center justify-end gap-1">
                          <p className="text-[10px] text-gray-400">16:50</p>
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5l3 3 5-7M6 5l3 3 5-7" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Input */}
                  <div className="bg-[#FAFAFA] px-4 pb-4 pt-3 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-1 items-center rounded-full bg-white px-4 py-2.5 shadow-sm">
                        <input placeholder="Type a message..." className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                      </div>
                      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark">
                        <Send size={14} className="text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Group Chat ─────────────────────────────────────────── */}
            <section id="msg-group" className="mb-16">
              <SectionTitle>Group Chat</SectionTitle>
              <SectionDescription>Family group chat with stacked avatars, role labels, topic banner, and @ mentions.</SectionDescription>
              <ComponentShowcase title="Group Header">
                <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                  <div className="flex items-center gap-3 px-4 pt-4 pb-3 shadow-sm">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                      <ArrowLeft size={16} className="text-gray-700" />
                    </button>
                    <div className="flex flex-1 items-center gap-2.5">
                      <div className="flex -space-x-2">
                        {[
                          { initials: "JM", color: "#7A4C29" },
                          { initials: "SM", color: "#D4A67F" },
                          { initials: "MA", color: "#059669" },
                        ].map((a) => (
                          <div key={a.initials} className="flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-white" style={{ backgroundColor: a.color }}>
                            {a.initials}
                          </div>
                        ))}
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-500 ring-2 ring-white">+1</div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">Liam&apos;s Family</p>
                        <div className="flex items-center gap-1">
                          <Users size={10} className="text-gray-400" />
                          <p className="text-[10px] text-gray-400">4 members</p>
                        </div>
                      </div>
                    </div>
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                      <Info size={16} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="bg-amber-50 px-4 py-2">
                    <p className="text-center text-[11px] font-medium text-amber-700">Liam took his first steps today!</p>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Group Messages">
                <div className="mx-auto max-w-sm space-y-4">
                  {[
                    { sender: "Ms Anu", role: "Caregiver", initials: "MA", color: "#059669", text: "Good morning everyone! I have amazing news about Liam!", time: "9:15 AM", own: false },
                    { sender: "Sarah", role: "Mother", initials: "SM", color: "#D4A67F", text: "Good morning Ms Anu! What happened?", time: "9:16 AM", own: false },
                    { sender: "Ms Anu", role: "Caregiver", initials: "MA", color: "#059669", text: "Liam took his first steps today!! He walked from the mat to the toy shelf!", time: "9:16 AM", own: false },
                    { sender: "James", role: "Father", initials: "JM", color: "#7A4C29", text: "Oh wow!! That's incredible! Our little man is growing up so fast!", time: "9:17 AM", own: true },
                  ].map((m, i) => (
                    <div key={i} className={`flex ${m.own ? "justify-end" : "justify-start gap-2"}`}>
                      {!m.own && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white mt-1" style={{ backgroundColor: m.color }}>
                          {m.initials}
                        </div>
                      )}
                      <div className={`max-w-[72%] ${m.own ? "" : ""}`}>
                        {!m.own && (
                          <div className="mb-0.5 flex items-center gap-1.5">
                            <span className="text-[11px] font-semibold" style={{ color: m.color }}>{m.sender}</span>
                            <span className="text-[9px] text-gray-400">{m.role}</span>
                          </div>
                        )}
                        <div className={`rounded-2xl px-4 py-2.5 ${m.own ? "rounded-tr-sm bg-brand-dark text-white" : "rounded-tl-sm bg-gray-100 text-gray-800"}`}>
                          <p className="text-sm whitespace-pre-line">{m.text}</p>
                        </div>
                        <p className={`mt-0.5 text-[10px] text-gray-400 ${m.own ? "text-right" : ""}`}>{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="@ Mention Popup">
                <div className="mx-auto max-w-sm">
                  <div className="rounded-2xl bg-white p-2 shadow-lg border border-gray-100">
                    <p className="px-2 pb-1 text-[10px] font-semibold text-gray-400">Mention someone</p>
                    {[
                      { initials: "SM", name: "Sarah", role: "Mother", color: "#D4A67F" },
                      { initials: "MA", name: "Ms Anu", role: "Caregiver", color: "#059669" },
                      { initials: "AD", name: "Admin", role: "Creche Admin", color: "#6366F1" },
                    ].map((p) => (
                      <div key={p.name} className="flex items-center gap-2.5 rounded-xl px-2 py-2 hover:bg-gray-50">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: p.color }}>
                          {p.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{p.name}</p>
                          <p className="text-[10px] text-gray-400">{p.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Message Bubbles ─────────────────────────────────────── */}
            <section id="msg-bubbles" className="mb-16">
              <SectionTitle>Message Bubbles</SectionTitle>
              <SectionDescription>Sent, received, and group message bubble variants.</SectionDescription>
              <ComponentShowcase title="Sent (Parent)">
                <div className="flex justify-end">
                  <div className="max-w-[72%]">
                    <div className="rounded-2xl rounded-tr-sm bg-[#0167FF] px-4 py-3">
                      <p className="text-sm text-white">Hi, Mrs Anu</p>
                    </div>
                    <div className="mt-1 flex items-center justify-end gap-1">
                      <p className="text-[10px] text-gray-400">16:48</p>
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5l3 3 5-7M6 5l3 3 5-7" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Received (Parent)">
                <div className="flex justify-start">
                  <div className="max-w-[72%]">
                    <div className="rounded-2xl rounded-tl-sm bg-[#DCE0E4] px-4 py-3">
                      <p className="text-sm text-[#2D2E2E]">Good afternoon Ma, how can I help you?</p>
                    </div>
                    <p className="mt-1 text-[10px] text-gray-400">16:50</p>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Caregiver Sent">
                <div className="flex justify-end">
                  <div className="max-w-[75%]">
                    <div className="rounded-2xl rounded-tr-sm bg-brand-dark px-4 py-2.5">
                      <p className="text-sm text-white">Liam had a great day today!</p>
                    </div>
                    <div className="mt-0.5 flex items-center justify-end gap-1">
                      <span className="text-[10px] text-gray-400">4:30 PM</span>
                      <span className="text-[10px] text-blue-400">{'\u2713\u2713'}</span>
                    </div>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Caregiver Received">
                <div className="flex justify-start">
                  <div className="max-w-[75%]">
                    <div className="rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 shadow-sm">
                      <p className="text-sm text-gray-800">Please remember to bring extra clothes tomorrow.</p>
                    </div>
                    <p className="mt-0.5 text-[10px] text-gray-400">Yesterday</p>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Group (with avatar + role)">
                <div className="flex justify-start gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#059669] text-[10px] font-bold text-white mt-1">MA</div>
                  <div className="max-w-[72%]">
                    <div className="mb-0.5 flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-[#059669]">Ms Anu</span>
                      <span className="text-[9px] text-gray-400">Caregiver</span>
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-2.5">
                      <p className="text-sm text-gray-800">Liam took his first steps today!!</p>
                    </div>
                    <p className="mt-0.5 text-[10px] text-gray-400">9:16 AM</p>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Chat Input ──────────────────────────────────────────── */}
            <section id="msg-input" className="mb-16">
              <SectionTitle>Chat Input</SectionTitle>
              <SectionDescription>Input bar variants for different chat contexts.</SectionDescription>
              <ComponentShowcase title="Standard (Parent)">
                <div className="mx-auto max-w-sm rounded-xl bg-[#FAFAFA] px-4 py-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-1 items-center rounded-full bg-white px-4 py-2.5 shadow-sm">
                      <input placeholder="Type a message..." className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    </div>
                    <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark">
                      <Send size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="With Attachment (Caregiver)">
                <div className="mx-auto max-w-sm rounded-xl border-t border-gray-100 bg-white px-3 py-3">
                  <div className="flex items-center gap-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400">
                      <Paperclip size={20} />
                    </button>
                    <input placeholder="Type a message..." className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    <button className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-dark">
                      <SendHorizontal size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="With @ Mention (Group)">
                <div className="mx-auto max-w-sm rounded-xl bg-white px-4 pb-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <AtSign size={16} className="text-gray-500" />
                    </button>
                    <div className="flex flex-1 items-center rounded-full bg-gray-50 px-4 py-2.5">
                      <input placeholder="Type a message..." className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none" />
                    </div>
                    <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark">
                      <Send size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Disabled (Trial Ended)">
                <div className="mx-auto max-w-sm rounded-xl bg-[#FAFAFA] px-4 py-4 shadow-[0px_-4px_12px_4px_rgba(46,46,46,0.04)]">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-1 items-center rounded-full bg-white px-4 py-2.5 shadow-sm">
                      <input placeholder="Manage your account to keep chatting" disabled className="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-60" />
                    </div>
                    <button disabled className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark disabled:opacity-60">
                      <Send size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Session & Trial ─────────────────────────────────────── */}
            <section id="msg-session" className="mb-16">
              <SectionTitle>Session & Trial</SectionTitle>
              <SectionDescription>Session start badges and trial gate banners.</SectionDescription>
              <ComponentShowcase title="Session Start Badge">
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full bg-[#EDF1F5] px-3 py-1">
                    <Plus size={10} className="text-gray-600" />
                    <span className="text-[10px] font-medium text-gray-600">Session Start</span>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Trial Gate Banner">
                <div className="mx-auto max-w-sm">
                  <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm">
                    <Lock size={13} className="shrink-0 text-gray-400" />
                    <p className="flex-1 text-xs text-gray-600">Your trial has ended. Some family features are unavailable.</p>
                    <button className="shrink-0 text-xs font-semibold text-brand-dark underline underline-offset-2">Manage</button>
                  </div>
                </div>
              </ComponentShowcase>
              <ComponentShowcase title="Online Indicator">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E0BFA0] text-sm font-bold text-white">MA</div>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Mrs Anu</p>
                    <p className="text-[10px] text-green-500">Online</p>
                  </div>
                </div>
              </ComponentShowcase>
            </section>

            {/* ─── Marketing ────────────────────────────────────────────── */}
            <section id="marketing" className="mb-16">
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
                  actions={<Button variant="brand">Get Started</Button>}
                />
              </ComponentShowcase>
            </section>

            <Separator className="mb-10" />

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

