"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Button,
  Badge,
  Input,
  Textarea,
  Switch,
  Checkbox,
  Skeleton,
  Progress,
  ProgressLabel,
  ProgressValue,
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
  ProgressSteps,
  StatCard,
  AlertBanner,
  EmptyState,
  Pagination,
  PaginationPrevious,
  PaginationNext,
  CodeBlock,
  ActivityFeed,
  FileUpload,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui"
import {
  FeatureGrid,
  FeatureCard,
  PricingCard,
  PricingGrid,
  TestimonialCard,
  TestimonialGrid,
  CTABanner,
  MetricRow,
} from "@/components/marketing"
import { toast } from "sonner"
import {
  Plus,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Download,
  Printer,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  FileText,
  Check,
  Upload,
  Send,
  Sparkles,
  MessageSquare,
  LogIn,
  Info,
  Trash2,
  Bell,
  CreditCard,
  Eye,
  EyeOff,
  Calendar,
  Star,
  ShieldCheck,
  TrendingUp,
  Pill,
  Heart,
  UserCheck,
  XCircle,
  Copy,
  AlertCircle,
  ArrowLeft,
  X,
  Loader2,
  TrendingDown,
  ArrowUpRight,
  Wallet,
  DollarSign,
  BarChart3,
  Settings2,
  Bot,
  QrCode,
  UserPlus,
  Baby,
  HeartPulse,
  Moon,
  Droplets,
  Wrench,
  Megaphone,
  MapPin,
  Image,
  Mail,
  LogOut,
  Smartphone,
  Landmark,
  Building2,
  Award,
  Camera,
  Key,
  Pencil,
  Rocket,
  ClipboardList,
  Headphones,
  Trophy,
  HelpCircle,
  ExternalLink,
  Lock,
  Zap,
  Layers,
  Play,
  Flag,
  Activity,
} from "lucide-react"

const NAV_GROUPS = [
  {
    group: "Foundations",
    items: [
      { id: "logos", label: "Logos & Wordmark" },
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "icons", label: "Icons" },
    ],
  },
  {
    group: "Shared Components",
    items: [
      { id: "buttons", label: "Buttons" },
      { id: "badges", label: "Badges & Status" },
      { id: "tags", label: "Tags" },
      { id: "avatars", label: "Avatars" },
      { id: "tooltips", label: "Tooltips" },
    ],
  },
  {
    group: "Form Controls",
    items: [
      { id: "forms", label: "Inputs & Selects" },
      { id: "toggles", label: "Toggles & Switches" },
      { id: "checkboxes", label: "Checkboxes" },
      { id: "sliders", label: "Sliders" },
      { id: "progress", label: "Progress" },
    ],
  },
  {
    group: "Application Components",
    items: [
      { id: "cards", label: "Cards" },
      { id: "tables", label: "Tables" },
      { id: "navigation", label: "Navigation" },
      { id: "tabs", label: "Tabs" },
      { id: "modals", label: "Modals & Dialogs" },
      { id: "alerts", label: "Alerts & Notifications" },
      { id: "pagination", label: "Pagination" },
      { id: "empty-states", label: "Empty States" },
      { id: "progress-steps", label: "Progress Steps" },
      { id: "file-upload", label: "File Upload" },
      { id: "code-blocks", label: "Code Blocks" },
      { id: "activity-feeds", label: "Activity Feeds" },
    ],
  },
  {
    group: "Marketing",
    items: [
      { id: "marketing", label: "Marketing Sections" },
    ],
  },
] as const

/* ────────────────────────────────────────────────────────────────────────────
   Logo Showcase
   ──────────────────────────────────────────────────────────────────────────── */
function LogoShowcase() {
  return (
    <section id="logos" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="font-merriweather text-2xl sm:text-3xl font-bold text-heading border-b border-[#E8DFD0] pb-4 mb-6">Logos & Wordmark</h2>
        <p className="text-body-sm text-muted-text mt-1">
          The CEven logo is an SVG with decorative circles and the wordmark.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Dark on light */}
        <div className="border border-card-border bg-white p-8 flex flex-col items-center justify-center gap-3">
          <img src="/Logo/CEVEN APP 1.svg" alt="CEven Logo" className="h-12 w-auto" />
          <p className="text-caption">On light background — default</p>
        </div>

        {/* Light on dark */}
        <div className="border border-card-border bg-brand-dark p-8 flex flex-col items-center justify-center gap-3">
          <img src="/Logo/CEVEN APP 1-white.svg" alt="CEven Logo" className="h-12 w-auto" />
          <p className="text-caption text-white/60">On dark background</p>
        </div>

        {/* With subtitle */}
        <div className="border border-card-border bg-white p-8 flex flex-col items-center justify-center gap-1">
          <img src="/Logo/CEVEN APP 1.svg" alt="CEven Logo" className="h-10 w-auto" />
          <span className="font-urbanist text-[10px] font-medium text-brand-accent">
            Main Admin
          </span>
          <p className="text-caption mt-2">With role subtitle</p>
        </div>

        {/* Sidebar variant */}
        <div className="border border-card-border bg-sidebar-bg p-8 flex flex-col items-center justify-center gap-1">
          <img src="/Logo/CEVEN APP 1-white.svg" alt="CEven Logo" className="h-10 w-auto" />
          <span className="font-urbanist text-[10px] font-medium text-white/50">
            Admin Portal
          </span>
          <p className="text-caption text-white/40 mt-2">On sidebar background</p>
        </div>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Button Showcase
   ──────────────────────────────────────────────────────────────────────────── */
function ButtonShowcase() {
  return (
    <section id="buttons" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="font-merriweather text-2xl sm:text-3xl font-bold text-heading border-b border-[#E8DFD0] pb-4 mb-6">Buttons</h2>
        <p className="text-body-sm text-muted-text mt-1">
          Action elements matching the admin/parent app patterns.
        </p>
      </div>

      <div className="space-y-4">
        {/* Primary — dark brown fill (most common in app) */}
        <Showcase label="Primary — dark brown fill (admin modals, CTAs)">
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-lg bg-[#3b2513] px-5 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]">
              Add Caregiver
            </button>
            <button className="h-9 rounded-lg bg-[#3b2513] px-4 font-urbanist text-xs font-semibold text-[#faf2e1] hover:bg-[#2d1810]">
              Add Staff
            </button>
            <button className="h-11 rounded-lg bg-[#3b2513] px-5 font-urbanist text-sm font-medium text-[#faf2e1] hover:bg-[#2d1810]">
              Add Invoice
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-[#3b2513] px-4 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]">
              <Plus className="size-4" />
              Enroll Child
            </button>
          </div>
        </Showcase>

        {/* Brand — tan/peach fill (auth, landing) */}
        <Showcase label="Brand — tan fill (auth pages, landing CTAs)">
          <div className="flex flex-wrap items-center gap-2">
            <button className="h-11 w-full max-w-[320px] rounded-lg border border-button-primary-border bg-button-primary-bg font-urbanist text-sm font-semibold text-white hover:bg-button-primary-bg/90">
              Log in
            </button>
            <button className="h-11 w-full max-w-[320px] rounded-lg border border-button-primary-border bg-button-primary-bg font-urbanist text-sm font-semibold text-white hover:bg-button-primary-bg/90">
              Get Started
            </button>
          </div>
        </Showcase>

        {/* Secondary / Outline */}
        <Showcase label="Secondary — outline (cancel, secondary actions)">
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-lg border border-[#d0d5dd] px-5 py-2.5 font-urbanist text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">
              Cancel
            </button>
            <button className="h-11 rounded-lg border border-[#d0d5dd] px-5 font-urbanist text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">
              Cancel
            </button>
          </div>
        </Showcase>

        {/* Filter buttons */}
        <Showcase label="Filter buttons — dropdowns, toolbar">
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-urbanist text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
              Fee Status
              <ChevronDown className="size-3.5" />
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-urbanist text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
              Room
              <ChevronDown className="size-3.5" />
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-urbanist text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
              <Filter className="size-3.5" />
              Filter
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-urbanist text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
              <Download className="size-3.5" />
              Export as
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-brand-dark px-3 py-2 font-nunito text-xs font-semibold text-brand-dark">
              Log
              <ChevronDown className="size-3" />
            </button>
          </div>
        </Showcase>

        {/* Ghost / icon-only */}
        <Showcase label="Ghost — icon-only, overflow menus">
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex size-9 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]">
              <MoreVertical className="size-4" />
            </button>
            <button className="flex size-7 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]">
              <Search className="size-4" />
            </button>
            <button className="flex size-6 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]">
              <X className="size-3" />
            </button>
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-nunito text-sm font-medium text-[#3b2513] underline">
              Forgot Password?
            </button>
          </div>
        </Showcase>

        {/* Tab active / inactive */}
        <Showcase label="Tab buttons">
          <div className="flex border-b border-[#e6ebf3]">
            <button className="whitespace-nowrap border-b-2 border-[#3b2513] px-4 py-2 text-sm font-medium font-urbanist text-[#3b2513]">
              Children
            </button>
            <button className="whitespace-nowrap px-4 py-2 text-sm font-medium font-urbanist text-[#6b7280] hover:text-[#2d1810]">
              Staff
            </button>
            <button className="whitespace-nowrap px-4 py-2 text-sm font-medium font-urbanist text-[#6b7280] hover:text-[#2d1810]">
              Finance
            </button>
          </div>
        </Showcase>

        {/* View toggle pill */}
        <Showcase label="View toggle pill — daily operations">
          <div className="flex w-fit gap-1 rounded-xl bg-[#f5edd8] p-1">
            <button className="rounded-lg px-4 py-2.5 font-urbanist text-sm font-medium bg-[#3b2513] text-[#faf2e1]">
              QR Station
            </button>
            <button className="rounded-lg px-4 py-2.5 font-urbanist text-sm font-medium border border-[#e6ebf3] bg-white text-[#6b7280]">
              Daily Logs
            </button>
            <button className="rounded-lg px-4 py-2.5 font-urbanist text-sm font-medium border border-[#e6ebf3] bg-white text-[#6b7280]">
              History
            </button>
          </div>
        </Showcase>

        {/* Destructive */}
        <Showcase label="Destructive — danger actions">
          <div className="flex flex-wrap items-center gap-2">
            <button className="rounded-lg bg-[#ef4444] px-4 py-2 text-sm font-medium font-nunito text-white hover:bg-[#dc2626]">
              Disable Account
            </button>
            <button className="rounded-lg bg-[#ef4444] px-4 py-2 text-sm font-medium font-nunito text-white hover:bg-[#dc2626]">
              Yes, Remove
            </button>
          </div>
        </Showcase>

        {/* Loading */}
        <Showcase label="Loading state">
          <div className="flex flex-wrap items-center gap-2">
            <button className="flex h-11 w-full max-w-[320px] items-center justify-center gap-2 rounded-lg border border-button-primary-border bg-button-primary-bg font-urbanist text-sm font-semibold text-white">
              <Loader2 className="size-4 animate-spin" />
              Logging in...
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-[#3b2513] px-4 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1]">
              <Loader2 className="size-4 animate-spin" />
              Saving
            </button>
          </div>
        </Showcase>

        {/* Pagination buttons */}
        <Showcase label="Pagination">
          <div className="flex items-center gap-1">
            <button className="flex size-8 items-center justify-center rounded-lg text-sm font-medium font-urbanist text-[#6b7280] hover:bg-[#f3f4f6]">
              <ChevronLeft className="size-4" />
            </button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className={`flex size-8 items-center justify-center rounded-lg text-sm font-medium font-urbanist ${
                  p === 3
                    ? "bg-[#3b2513] text-[#faf2e1]"
                    : "text-[#6b7280] hover:bg-[#f3f4f6]"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="flex size-8 items-center justify-center rounded-lg text-sm font-medium font-urbanist text-[#6b7280] hover:bg-[#f3f4f6]">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </Showcase>

        {/* Button states */}
        <Showcase label="States — default / hover / active / disabled">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-20 text-caption text-muted-text shrink-0">Primary</span>
              <button className="rounded-lg bg-[#3b2513] px-5 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1]">Default</button>
              <button className="rounded-lg bg-[#2d1810] px-5 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1]">Hover</button>
              <button className="rounded-lg bg-[#1f0f09] px-5 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1] ring-2 ring-[#c47b2c] ring-offset-1">Active (focus)</button>
              <button className="rounded-lg bg-[#3b2513] px-5 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1]/50 cursor-not-allowed" disabled>Disabled</button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-20 text-caption text-muted-text shrink-0">Brand</span>
              <button className="rounded-lg border border-button-primary-border bg-button-primary-bg px-5 py-2.5 font-urbanist text-sm font-semibold text-brand-dark">Default</button>
              <button className="rounded-lg border border-button-primary-border bg-button-primary-border/80 px-5 py-2.5 font-urbanist text-sm font-semibold text-brand-dark">Hover</button>
              <button className="rounded-lg border-2 border-[#c47b2c] bg-button-primary-bg px-5 py-2.5 font-urbanist text-sm font-semibold text-brand-dark ring-1 ring-[#c47b2c]/30">Active (focus)</button>
              <button className="rounded-lg border border-button-primary-border bg-button-primary-bg px-5 py-2.5 font-urbanist text-sm font-semibold text-brand-dark/50 cursor-not-allowed" disabled>Disabled</button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-20 text-caption text-muted-text shrink-0">Outline</span>
              <button className="rounded-lg border border-[#d0d5dd] bg-white px-5 py-2.5 font-urbanist text-sm font-medium text-[#2d1810]">Default</button>
              <button className="rounded-lg border border-[#3b2513] bg-[#f5edd8] px-5 py-2.5 font-urbanist text-sm font-medium text-[#3b2513]">Hover</button>
              <button className="rounded-lg border-2 border-[#3b2513] bg-white px-5 py-2.5 font-urbanist text-sm font-medium text-[#3b2513] ring-1 ring-[#3b2513]/20">Active (focus)</button>
              <button className="rounded-lg border border-[#d0d5dd] bg-white px-5 py-2.5 font-urbanist text-sm font-medium text-[#2d1810]/40 cursor-not-allowed" disabled>Disabled</button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-20 text-caption text-muted-text shrink-0">Danger</span>
              <button className="rounded-lg bg-[#ef4444] px-5 py-2.5 font-urbanist text-sm font-semibold text-white">Default</button>
              <button className="rounded-lg bg-[#dc2626] px-5 py-2.5 font-urbanist text-sm font-semibold text-white">Hover</button>
              <button className="rounded-lg bg-[#b91c1c] px-5 py-2.5 font-urbanist text-sm font-semibold text-white ring-2 ring-[#ef4444] ring-offset-1">Active (focus)</button>
              <button className="rounded-lg bg-[#ef4444] px-5 py-2.5 font-urbanist text-sm font-semibold text-white/50 cursor-not-allowed" disabled>Disabled</button>
            </div>
          </div>
        </Showcase>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Icon Showcase
   ──────────────────────────────────────────────────────────────────────────── */
function IconShowcase() {
  const iconGroups = [
    {
      label: "Navigation & Actions",
      icons: [
        { Icon: ArrowLeft, name: "ArrowLeft" },
        { Icon: ArrowUpRight, name: "ArrowUpRight" },
        { Icon: ChevronLeft, name: "ChevronLeft" },
        { Icon: ChevronRight, name: "ChevronRight" },
        { Icon: ChevronDown, name: "ChevronDown" },
        { Icon: ExternalLink, name: "ExternalLink" },
        { Icon: LogIn, name: "LogIn" },
        { Icon: LogOut, name: "LogOut" },
      ],
    },
    {
      label: " CRUD & Editing",
      icons: [
        { Icon: Plus, name: "Plus" },
        { Icon: Pencil, name: "Pencil" },
        { Icon: Trash2, name: "Trash2" },
        { Icon: Copy, name: "Copy" },
        { Icon: Download, name: "Download" },
        { Icon: Upload, name: "Upload" },
        { Icon: Printer, name: "Printer" },
        { Icon: Send, name: "Send" },
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
        { Icon: Loader2, name: "Loader2" },
      ],
    },
    {
      label: "Data & Analytics",
      icons: [
        { Icon: TrendingUp, name: "TrendingUp" },
        { Icon: TrendingDown, name: "TrendingDown" },
        { Icon: BarChart3, name: "BarChart3" },
        { Icon: DollarSign, name: "DollarSign" },
        { Icon: Wallet, name: "Wallet" },
        { Icon: CreditCard, name: "CreditCard" },
        { Icon: Activity, name: "Activity" },
        { Icon: Star, name: "Star" },
      ],
    },
    {
      label: "People & Children",
      icons: [
        { Icon: Users, name: "Users" },
        { Icon: UserPlus, name: "UserPlus" },
        { Icon: UserCheck, name: "UserCheck" },
        { Icon: Baby, name: "Baby" },
        { Icon: HeartPulse, name: "HeartPulse" },
        { Icon: Heart, name: "Heart" },
        { Icon: ShieldCheck, name: "ShieldCheck" },
        { Icon: Award, name: "Award" },
      ],
    },
    {
      label: "Content & Media",
      icons: [
        { Icon: FileText, name: "FileText" },
        { Icon: Image, name: "Image" },
        { Icon: Camera, name: "Camera" },
        { Icon: Calendar, name: "Calendar" },
        { Icon: Clock, name: "Clock" },
        { Icon: Bell, name: "Bell" },
        { Icon: MessageSquare, name: "MessageSquare" },
        { Icon: Mail, name: "Mail" },
      ],
    },
    {
      label: "App & System",
      icons: [
        { Icon: Search, name: "Search" },
        { Icon: Filter, name: "Filter" },
        { Icon: ArrowUpDown, name: "ArrowUpDown" },
        { Icon: Settings2, name: "Settings2" },
        { Icon: MoreVertical, name: "MoreVertical" },
        { Icon: Eye, name: "Eye" },
        { Icon: EyeOff, name: "EyeOff" },
        { Icon: Lock, name: "Lock" },
      ],
    },
    {
      label: "Domain — Healthcare",
      icons: [
        { Icon: Pill, name: "Pill" },
        { Icon: Moon, name: "Moon" },
        { Icon: Droplets, name: "Droplets" },
        { Icon: Flag, name: "Flag" },
        { Icon: HeartPulse, name: "HeartPulse" },
        { Icon: Smile, name: "Smile" },
      ],
    },
    {
      label: "Domain — Operations",
      icons: [
        { Icon: ClipboardList, name: "ClipboardList" },
        { Icon: Wrench, name: "Wrench" },
        { Icon: PackagePlus, name: "PackagePlus" },
        { Icon: Megaphone, name: "Megaphone" },
        { Icon: MapPin, name: "MapPin" },
        { Icon: Building2, name: "Building2" },
        { Icon: QrCode, name: "QrCode" },
        { Icon: ScanLine, name: "ScanLine" },
      ],
    },
    {
      label: "Domain — AI & Support",
      icons: [
        { Icon: Sparkles, name: "Sparkles" },
        { Icon: Bot, name: "Bot" },
        { Icon: Zap, name: "Zap" },
        { Icon: Rocket, name: "Rocket" },
        { Icon: Headphones, name: "Headphones" },
        { Icon: HelpCircle, name: "HelpCircle" },
        { Icon: Trophy, name: "Trophy" },
        { Icon: Layers, name: "Layers" },
      ],
    },
  ]

  return (
    <section id="icons" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="font-merriweather text-2xl sm:text-3xl font-bold text-heading border-b border-[#E8DFD0] pb-4 mb-6">Icons</h2>
        <p className="text-body-sm text-muted-text mt-1">
          Lucide React icons used across the CEven platform. ~90+ unique icons.
        </p>
      </div>

      <div className="space-y-4">
        {iconGroups.map((group) => (
          <Showcase key={group.label} label={group.label}>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
              {group.icons.map(({ Icon, name }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-1.5 p-2"
                >
                  <Icon className="size-5 text-heading" />
                  <span className="text-[10px] text-muted-text text-center leading-tight">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </Showcase>
        ))}
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Badges & Status Showcase
   ──────────────────────────────────────────────────────────────────────────── */
function BadgeShowcase() {
  return (
    <section id="badges" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="font-merriweather text-2xl sm:text-3xl font-bold text-heading border-b border-[#E8DFD0] pb-4 mb-6">Badges & Status</h2>
        <p className="text-body-sm text-muted-text mt-1">
          Status labels use colored border + background + text pills. Always <code className="text-xs bg-muted px-1 py-0.5">variant=&quot;outline&quot;</code> with className overrides.
        </p>
      </div>

      <div className="space-y-4">
        {/* Fee status — real pattern from children table */}
        <Showcase label="Fee Status — children table">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-[#009061] bg-[#ecfff8] px-2.5 py-0.5 font-urbanist text-xs text-[#009061]">
              Paid
            </span>
            <span className="inline-flex items-center rounded-full border border-[#cc8000] bg-[#fff6e6] px-2.5 py-0.5 font-urbanist text-xs text-[#cc8000]">
              Overdue
            </span>
            <span className="inline-flex items-center rounded-full border border-[#9ca3af] bg-[#f3f4f6] px-2.5 py-0.5 font-urbanist text-xs text-[#6b7280]">
              Pending
            </span>
          </div>
        </Showcase>

        {/* Task status — daily operations */}
        <Showcase label="Task Status — daily operations">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-[#9ca3af] bg-[#f3f4f6] px-2.5 py-0.5 font-urbanist text-xs text-[#6b7280]">
              To Do
            </span>
            <span className="inline-flex items-center rounded-full border border-[#cc8000] bg-[#fff6e6] px-2.5 py-0.5 font-urbanist text-xs text-[#cc8000]">
              In Progress
            </span>
            <span className="inline-flex items-center rounded-full border border-[#009061] bg-[#ecfff8] px-2.5 py-0.5 font-urbanist text-xs text-[#009061]">
              Done
            </span>
            <span className="inline-flex items-center rounded-full border border-[#ef4444] bg-[#fff5f5] px-2.5 py-0.5 font-urbanist text-xs text-[#ef4444]">
              Overdue
            </span>
            <span className="inline-flex items-center rounded-full border border-[#9ca3af] bg-[#f3f4f6] px-2.5 py-0.5 font-urbanist text-xs text-[#2d1810]">
              Not Started
            </span>
          </div>
        </Showcase>

        {/* Staff status — staff page */}
        <Showcase label="Staff Status — staff page">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-[#009061] bg-[#ecfff8] px-2.5 py-0.5 font-urbanist text-xs text-[#009061]">
              Active
            </span>
            <span className="inline-flex items-center rounded-full border border-[#cc8000] bg-[#fff6e6] px-2.5 py-0.5 font-urbanist text-xs text-[#cc8000]">
              Absent
            </span>
            <span className="inline-flex items-center rounded-full border border-[#9ca3af] bg-[#f3f4f6] px-2.5 py-0.5 font-urbanist text-xs text-[#6b7280]">
              Pending
            </span>
            <span className="inline-flex items-center rounded-full border border-[#ef4444] bg-[#fff5f5] px-2.5 py-0.5 font-urbanist text-xs text-[#ef4444]">
              Suspended
            </span>
          </div>
        </Showcase>

        {/* Compliance / DBS */}
        <Showcase label="Compliance & DBS">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-[#9ca3af] bg-[#f3f4f6] px-2.5 py-0.5 font-urbanist text-xs text-[#6b7280]">
              Valid
            </span>
            <span className="inline-flex items-center rounded-full border border-[#cc8000] bg-[#fff6e6] px-2.5 py-0.5 font-urbanist text-xs text-[#cc8000]">
              Renew Soon
            </span>
            <span className="inline-flex items-center rounded-full border border-[#ef4444] bg-[#fff5f5] px-2.5 py-0.5 font-urbanist text-xs text-[#ef4444]">
              Expired
            </span>
          </div>
        </Showcase>

        {/* Facility issues */}
        <Showcase label="Facility Issues">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-[#ef4444] bg-[#fff5f5] px-2.5 py-0.5 font-urbanist text-xs text-[#ef4444]">
              Open
            </span>
            <span className="inline-flex items-center rounded-full border border-[#cc8000] bg-[#fff6e6] px-2.5 py-0.5 font-urbanist text-xs text-[#cc8000]">
              In Progress
            </span>
            <span className="inline-flex items-center rounded-full border border-[#009061] bg-[#ecfff8] px-2.5 py-0.5 font-urbanist text-xs text-[#009061]">
              Resolved
            </span>
          </div>
        </Showcase>

        {/* Tags */}
        <Showcase label="Tags — removable">
          <div className="flex flex-wrap items-center gap-2">
            <Tag variant="default">Default</Tag>
            <Tag variant="brand">Brand</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="danger">Danger</Tag>
            <Tag variant="info">Info</Tag>
            <Tag variant="default" removable onRemove={() => {}}>
              Removable
            </Tag>
          </div>
        </Showcase>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Form Controls Showcase
   ──────────────────────────────────────────────────────────────────────────── */
function FormShowcase() {
  const [switchOn, setSwitchOn] = React.useState(false)
  const [sliderValue, setSliderValue] = React.useState<number[]>([50])
  const [toggleValue, setToggleValue] = React.useState("daily")

  return (
    <section id="forms" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="font-merriweather text-2xl sm:text-3xl font-bold text-heading border-b border-[#E8DFD0] pb-4 mb-6">Form Controls</h2>
        <p className="text-body-sm text-muted-text mt-1">
          Inputs, selects, textareas, switches, checkboxes, sliders, and toggles.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Interactive Search */}
          <Showcase label="Search — interactive filter">
            <SearchInteractive />
          </Showcase>

          {/* Standard input — h-[52px] */}
          <Showcase label="Text input — h-[52px], gold focus ring">
            <input
              type="text"
              placeholder="Enter child's full name"
              className="h-[52px] w-full rounded-lg border border-[#d0d5dd] bg-white px-4 font-nunito text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
            />
          </Showcase>

          {/* Small input — h-9 */}
          <Showcase label="Small input — h-9 (table filters)">
            <input
              type="text"
              placeholder="Filter..."
              className="h-9 rounded-lg border border-[#d0d5dd] bg-white px-3 font-nunito text-sm text-[#2d1810] outline-none focus:ring-2 focus:ring-[#c47b2c]"
            />
          </Showcase>

          {/* Disabled input */}
          <Showcase label="Disabled input">
            <input
              type="text"
              disabled
              placeholder="Disabled input"
              className="h-[52px] w-full rounded-lg border border-[#d0d5dd] bg-[#f9fafb] px-4 font-nunito text-sm text-[#9ca3af] cursor-not-allowed"
            />
          </Showcase>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Textarea */}
          <Showcase label="Textarea">
            <textarea
              rows={3}
              placeholder="Type your message..."
              className="w-full resize-none rounded-lg border border-[#d0d5dd] bg-white px-4 py-3 font-nunito text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]"
            />
          </Showcase>

          {/* Select */}
          <Showcase label="Select dropdown">
            <select className="h-[52px] w-full appearance-none rounded-lg border border-[#d0d5dd] bg-white px-4 pr-10 font-nunito text-sm text-[#2d1810] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]">
              <option>Sunshine Class</option>
              <option>Rainbow Class</option>
              <option>Butterfly Class</option>
            </select>
          </Showcase>

          {/* Switch */}
          <Showcase label="Switch">
            <div className="flex items-center gap-3">
              <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
              <span className="text-sm font-nunito text-[#6b7280]">
                {switchOn ? "Enabled" : "Disabled"}
              </span>
            </div>
          </Showcase>

          {/* Checkbox */}
          <Showcase label="Checkbox">
            <div className="flex flex-col gap-2.5">
              <label className="flex items-center gap-2 text-sm font-nunito text-[#2d1810] cursor-pointer">
                <Checkbox defaultChecked /> Send notifications to parents
              </label>
              <label className="flex items-center gap-2 text-sm font-nunito text-[#2d1810] cursor-pointer">
                <Checkbox /> Enable auto-report
              </label>
              <label className="flex items-center gap-2 text-sm font-nunito text-[#9ca3af] cursor-pointer">
                <Checkbox disabled /> Locked option
              </label>
            </div>
          </Showcase>
        </div>

        {/* Slider */}
        <Showcase label="Slider">
          <Slider
            value={sliderValue}
            onValueChange={(v: number | readonly number[]) => {
              setSliderValue(Array.isArray(v) ? [...v] : [v])
            }}
          />
          <p className="text-caption mt-2">Value: {sliderValue[0]}</p>
        </Showcase>

        {/* Toggle pill */}
        <Showcase label="View toggle pill — daily operations">
          <div className="flex w-fit gap-1 rounded-xl bg-[#f5edd8] p-1">
            {["qr", "daily", "history"].map((val) => (
              <button
                key={val}
                onClick={() => setToggleValue(val)}
                className={`rounded-lg px-4 py-2.5 font-urbanist text-sm font-medium transition-colors ${
                  toggleValue === val
                    ? "bg-[#3b2513] text-[#faf2e1]"
                    : "border border-[#e6ebf3] bg-white text-[#6b7280]"
                }`}
              >
                {val === "qr" ? "QR Station" : val === "daily" ? "Daily Logs" : "History"}
              </button>
            ))}
          </div>
          <p className="text-caption mt-2">Selected: {toggleValue}</p>
        </Showcase>

        {/* Progress */}
        <Showcase label="Progress bars — gold fill">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-nunito text-[#2d1810]">Loading...</span>
                <span className="text-sm font-nunito text-[#6b7280]">65%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
                <div className="h-full rounded-full bg-[#c47b2c]" style={{ width: "65%" }} />
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
              <div className="h-full rounded-full bg-[#009061]" style={{ width: "30%" }} />
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#f3f4f6]">
              <div className="h-full rounded-full bg-[#c47b2c]" style={{ width: "85%" }} />
            </div>
          </div>
        </Showcase>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Card Showcase
   ──────────────────────────────────────────────────────────────────────────── */
function CardShowcase() {
  return (
    <section id="cards" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="font-merriweather text-2xl sm:text-3xl font-bold text-heading border-b border-[#E8DFD0] pb-4 mb-6">Cards</h2>
        <p className="text-body-sm text-muted-text mt-1">
          Card patterns used in the admin dashboard and content areas.
        </p>
      </div>

      <div className="space-y-4">
        {/* Stat cards — real admin dashboard pattern */}
        <Showcase label="Stat Cards — admin dashboard (rounded-xl, Merriweather values)">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Children", value: "1,234", trend: "+12%", up: true },
              { label: "Revenue", value: "$45,678", trend: "+8%", up: true },
              { label: "Pending Fees", value: "$2,345", trend: "-3%", up: false },
              { label: "Staff Active", value: "56", trend: "No change", up: null },
            ].map((card) => (
              <div key={card.label} className="flex flex-col gap-2 rounded-xl border border-[#e6ebf3] bg-white px-4 py-5">
                <p className="font-nunito text-sm text-[#6f7682]">
                  {card.label}
                </p>
                <p className="font-merriweather text-2xl lg:text-[32px] font-bold leading-none text-[#2d1810]">
                  {card.value}
                </p>
                <p className={`flex items-center gap-1 font-nunito text-[10px] ${
                  card.up === true ? "text-[#009061]" : card.up === false ? "text-[#ef4444]" : "text-[#6b7280]"
                }`}>
                  {card.up === true && <TrendingUp className="size-3" />}
                  {card.up === false && <TrendingDown className="size-3" />}
                  {card.trend} this month
                </p>
              </div>
            ))}
          </div>
        </Showcase>

        {/* Content card */}
        <Showcase label="Content card — rounded-xl with shadow-sm">
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#eaecf0] px-5 py-3">
              <h3 className="font-urbanist text-sm font-semibold text-[#2d1810]">
                Recent Activity
              </h3>
              <button className="font-nunito text-sm font-medium text-[#3b2513] underline">
                View All
              </button>
            </div>
            <div className="p-5 space-y-3">
              {[
                { icon: CheckCircle2, color: "bg-[#ecfff8] text-[#009061]", title: "Enrollment approved", sub: "2 minutes ago" },
                { icon: Clock, color: "bg-[#fff6e6] text-[#cc8000]", title: "Payment pending", sub: "1 hour ago" },
                { icon: AlertTriangle, color: "bg-[#fff5f5] text-[#ef4444]", title: "DBS check expiring", sub: "3 hours ago" },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className={`flex size-8 items-center justify-center rounded-full ${item.color}`}>
                    <item.icon className="size-4" />
                  </div>
                  <div>
                    <p className="font-nunito text-sm font-semibold text-[#2d1810]">
                      {item.title}
                    </p>
                    <p className="font-nunito text-[10px] text-[#858c98]">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Showcase>

        {/* Quick actions — dashboard pattern */}
        <Showcase label="Quick Actions — dashboard grid">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Baby, label: "Add Child" },
              { icon: UserPlus, label: "Add Staff" },
              { icon: ClipboardList, label: "Daily Log" },
              { icon: Megaphone, label: "Announce" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex shrink-0 flex-col items-center gap-1.5 rounded-xl border border-[#edd9c0] bg-white px-4 py-3 hover:shadow-sm cursor-pointer">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#fdf6e8]">
                  <Icon className="size-5 text-[#3b2513]" />
                </div>
                <span className="font-urbanist text-xs font-medium text-[#2d1810]">
                  {label}
                </span>
              </div>
            ))}
            <div className="flex shrink-0 flex-col items-center gap-1.5 rounded-xl border border-dashed border-[#d4a67f] bg-white px-4 py-3 cursor-pointer hover:shadow-sm">
              <span className="text-[#3b2513] text-lg">+</span>
              <span className="font-urbanist text-xs font-medium text-[#3b2513]">
                Customize
              </span>
            </div>
          </div>
        </Showcase>

        {/* AI Chat Panel */}
        <Showcase label="AI Chat Panel — Ada assistant">
          <div className="mx-auto max-w-sm rounded-2xl border-l-4 border-[#c47b2c] bg-[#fffcf4] p-4">
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-sm"
                style={{ background: "linear-gradient(135deg, #1e2d4a 0%, #3b2513 100%)", color: "#ffd58f" }}
              >
                ✦
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-[#fdf6e8] px-4 py-2.5 text-sm text-[#2d1810]">
                Hi! I&apos;m Ada, your AI assistant. How can I help you today?
              </div>
            </div>
            <div className="flex items-start gap-3 mb-3 flex-row-reverse">
              <div className="rounded-2xl rounded-tr-sm bg-[#c47b2c] px-4 py-2.5 text-sm text-white">
                Show me this week&apos;s attendance summary
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["Check attendance", "Generate report", "Send reminder"].map((prompt) => (
                <button
                  key={prompt}
                  className="rounded-full border border-[#edd9c0] bg-white px-3 py-1 font-urbanist text-[10px] text-[#6b7280] hover:border-[#c47b2c] hover:text-[#c47b2c]"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask Ada anything..."
                className="flex-1 rounded-full border border-[#edd9c0] bg-white px-4 py-2 font-nunito text-xs text-[#2d1810] outline-none"
              />
              <button className="flex size-8 items-center justify-center rounded-full bg-[#3b2513] text-[#faf2e1]">
                <Send className="size-3.5" />
              </button>
            </div>
          </div>
        </Showcase>

        {/* Greeting Banner */}
        <Showcase label="Greeting Banner — dashboard hero">
          <div
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
            style={{ background: "linear-gradient(138.9deg, #2d1810 0%, #3d2418 70%, #3d2418 100%)", minHeight: 140 }}
          >
            <p className="font-nunito text-xs font-medium text-[#ffd58f]">
              Tuesday, 29 July 2026
            </p>
            <h2 className="mt-2 font-merriweather text-lg sm:text-2xl font-bold text-[#f5edd8]">
              Good morning, Admin 👋
            </h2>
            <p className="mt-2 font-nunito text-sm font-semibold text-[#27e2a4] underline decoration-solid">
              12 children checked in today
            </p>
          </div>
        </Showcase>

        {/* Empty state */}
        <Showcase label="Empty state card">
          <div className="rounded-xl border border-[#e6ebf3] bg-white">
            <EmptyState
              icon={
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              }
              title="No children enrolled"
              description="Get started by enrolling your first child."
              action={
                <button className="flex items-center gap-1.5 rounded-lg bg-[#3b2513] px-4 py-2.5 font-urbanist text-xs font-semibold text-[#faf2e1] hover:bg-[#2d1810]">
                  <Plus className="size-3" />
                  Enroll Child
                </button>
              }
            />
          </div>
        </Showcase>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Table Showcase
   ──────────────────────────────────────────────────────────────────────────── */
function TableShowcase() {
  return (
    <section id="tables" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="font-merriweather text-2xl sm:text-3xl font-bold text-heading border-b border-[#E8DFD0] pb-4 mb-6">Tables</h2>
        <p className="text-body-sm text-muted-text mt-1">
          Data tables with tan header, sortable columns, responsive mobile cards.
        </p>
      </div>

      <Showcase>
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-[#eaecf0] px-3 sm:px-5 py-3">
            <div className="relative flex-1 min-w-0 sm:max-w-md">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search children..."
                className="h-10 w-full rounded-lg border border-[#d0d5dd] bg-[#f5edd8] pl-10 pr-4 text-xs font-nunito text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-1 focus:ring-[#3b2513]"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-urbanist text-xs sm:text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
              <Filter className="size-3.5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-urbanist text-xs sm:text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
              <Download className="size-3.5" />
              <span className="hidden sm:inline">Export as</span>
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-[#e6ebf3] bg-white px-3 py-2 font-urbanist text-xs sm:text-sm text-[#6b7280] hover:border-[#3b2513] hover:text-[#3b2513]">
              <Printer className="size-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#edd9c0]">
                  <th className="w-10 px-4 py-3"><Checkbox /></th>
                  <th className="px-4 py-3 text-left font-nunito text-sm font-normal text-black">Child</th>
                  <th className="px-4 py-3 text-left font-nunito text-sm font-normal text-black">Room</th>
                  <th className="px-4 py-3 text-left font-nunito text-sm font-normal text-black">Age</th>
                  <th className="px-4 py-3 text-left font-nunito text-sm font-normal text-black">Fee Status</th>
                  <th className="w-10 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Emma Thompson", room: "Sunshine", age: "3y 2m", fee: "Paid", initials: "ET", gender: "F", blood: "A+" },
                  { name: "Liam Chen", room: "Rainbow", age: "4y 7m", fee: "Pending", initials: "LC", gender: "M", blood: "O+" },
                  { name: "Sophia Patel", room: "Butterfly", age: "2y 11m", fee: "Overdue", initials: "SP", gender: "F", blood: "B+" },
                ].map((row) => (
                  <tr key={row.name} className="border-t border-[#eaecf0] cursor-pointer hover:bg-[#faf9f7]">
                    <td className="px-4 py-3"><Checkbox /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-urbanist text-xs font-bold text-[#3b2513]">
                          {row.initials}
                        </div>
                        <div>
                          <p className="font-nunito text-sm font-semibold text-black">
                            {row.name}
                          </p>
                          <p className="font-nunito text-[10px] text-[#858c98]">
                            {row.gender} • Blood: {row.blood}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-nunito text-sm text-[#2d1810]">{row.room}</td>
                    <td className="px-4 py-3 font-nunito text-sm text-[#2d1810]">{row.age}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-urbanist text-xs ${
                        row.fee === "Paid"
                          ? "border-[#009061] bg-[#ecfff8] text-[#009061]"
                          : row.fee === "Pending"
                          ? "border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]"
                          : "border-[#cc8000] bg-[#fff6e6] text-[#cc8000]"
                      }`}>
                        {row.fee}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="flex size-9 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]">
                        <MoreVertical className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="flex flex-col gap-2 px-4 pb-4 lg:hidden">
            {[
              { name: "Emma Thompson", room: "Sunshine", age: "3y 2m", fee: "Paid", initials: "ET" },
              { name: "Liam Chen", room: "Rainbow", age: "4y 7m", fee: "Pending", initials: "LC" },
              { name: "Sophia Patel", room: "Butterfly", age: "2y 11m", fee: "Overdue", initials: "SP" },
            ].map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between rounded-xl border border-[#eaecf0] p-3 transition-colors hover:bg-[#faf9f7]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edd9c0] font-urbanist text-xs font-bold text-[#3b2513]">
                    {row.initials}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-nunito text-sm font-semibold text-black">
                      {row.name}
                    </span>
                    <span className="font-nunito text-xs text-[#858c98]">
                      {row.room} • {row.age}
                    </span>
                  </div>
                </div>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-urbanist text-xs ${
                  row.fee === "Paid"
                    ? "border-[#009061] bg-[#ecfff8] text-[#009061]"
                    : row.fee === "Pending"
                    ? "border-[#9ca3af] bg-[#f3f4f6] text-[#6b7280]"
                    : "border-[#cc8000] bg-[#fff6e6] text-[#cc8000]"
                }`}>
                  {row.fee}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Showcase>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Navigation Showcase
   ──────────────────────────────────────────────────────────────────────────── */
function NavigationShowcase() {
  return (
    <section id="navigation" className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="font-merriweather text-2xl sm:text-3xl font-bold text-heading border-b border-[#E8DFD0] pb-4 mb-6">Navigation</h2>
        <p className="text-body-sm text-muted-text mt-1">
          Sidebar, topbar, bottom nav, and breadcrumb patterns.
        </p>
      </div>

      <div className="space-y-4">
        {/* Mini sidebar */}
        <Showcase label="Sidebar — admin pattern">
          <div className="mx-auto max-w-[240px] overflow-x-auto">
            <div className="min-w-[240px] rounded-xl border border-card-border bg-white shadow-sm overflow-hidden">
              <div className="px-4 py-4 border-b border-card-border">
                <img src="/Logo/CEVEN APP 1.svg" alt="CEven" className="h-7 w-auto" />
                <span className="block font-urbanist text-[10px] font-medium text-brand-accent">
                  Main Admin
                </span>
              </div>
              <nav className="p-2">
                {["Dashboard", "Children", "Staff", "Daily Operations", "Finance"].map((item, i) => (
                  <div
                    key={item}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-nunito text-sm font-semibold",
                      i === 0
                        ? "bg-brand-dark text-sidebar-active-text"
                        : "text-sidebar-inactive-text hover:text-brand-dark"
                    )}
                  >
                    <div className="size-4 rounded bg-current/10" />
                    {item}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </Showcase>

        {/* Topbar */}
        <Showcase label="Topbar — admin pattern">
          <div className="rounded-xl border border-card-border bg-content-bg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-input-border">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon-sm" className="rounded-full border border-input-border bg-white lg:hidden">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
                <div className="hidden lg:flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search children, staff..."
                      className="h-10 w-64 rounded-full border border-input-border bg-white pl-10 pr-4 text-sm font-nunito text-heading outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" className="rounded-full border border-input-border bg-white">
                  <Bell className="size-4 text-muted-text" />
                </Button>
                <Button className="size-9 rounded-full bg-heading text-white">
                  <Sparkles className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </Showcase>

        {/* Breadcrumb */}
        <Showcase label="Breadcrumb — path navigation">
          <div className="flex flex-wrap items-center gap-1.5 text-sm font-nunito">
            <a href="#" className="text-muted-text hover:text-heading">Home</a>
            <span className="text-muted-text">/</span>
            <a href="#" className="text-muted-text hover:text-heading">Admin</a>
            <span className="text-muted-text">/</span>
            <span className="font-medium text-heading">Dashboard</span>
          </div>
        </Showcase>

        {/* Mobile bottom nav */}
        <Showcase label="Bottom Nav — parent/caregiver mobile">
          <div className="mx-auto max-w-xs rounded-2xl border border-card-border bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-around px-2 py-2">
              {[
                { label: "Home", icon: HomeIcon, active: true },
                { label: "CEvenAI", icon: SparklesIcon, active: false },
                { label: "Report", icon: ReportIcon, active: false },
                { label: "Chat", icon: ChatIcon, active: false },
                { label: "Settings", icon: SettingsIcon, active: false },
              ].map(({ label, icon: Icon, active }) => (
                <div
                  key={label}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl",
                    active && "bg-[#FAF2E1]"
                  )}
                >
                  <Icon className={cn("size-5", active ? "text-cg-brand" : "text-[#6b7280]")} />
                  <span className={cn(
                    "text-[10px]",
                    active
                      ? "font-merriweather font-semibold text-cg-brand"
                      : "font-urbanist text-[#6b7280]"
                  )}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Showcase>

        {/* Tabs */}
        <Showcase label="Tabs — line and default variants">
          <div className="space-y-4">
            <Tabs defaultValue="tab-1">
              <TabsList>
                <TabsTrigger value="tab-1">Overview</TabsTrigger>
                <TabsTrigger value="tab-2">Details</TabsTrigger>
                <TabsTrigger value="tab-3">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1" className="p-4 text-body-sm">
                Overview content goes here.
              </TabsContent>
              <TabsContent value="tab-2" className="p-4 text-body-sm">
                Detailed information.
              </TabsContent>
              <TabsContent value="tab-3" className="p-4 text-body-sm">
                Configuration options.
              </TabsContent>
            </Tabs>
            <Tabs defaultValue="tab-1">
              <TabsList variant="line">
                <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1" className="p-4 text-body-sm">Line variant content.</TabsContent>
              <TabsContent value="tab-2" className="p-4 text-body-sm">Content 2.</TabsContent>
              <TabsContent value="tab-3" className="p-4 text-body-sm">Content 3.</TabsContent>
            </Tabs>
          </div>
        </Showcase>

        {/* Progress Steps */}
        <Showcase label="Progress Steps — multi-step wizard">
          <div className="space-y-6">
            <ProgressSteps currentStep={1} totalSteps={4} />
            <ProgressSteps currentStep={2} totalSteps={4} />
            <ProgressSteps currentStep={4} totalSteps={4} />
          </div>
        </Showcase>

        {/* Pagination */}
        <Showcase label="Pagination">
          <div className="flex items-center gap-2 overflow-x-auto">
            <PaginationPrevious />
            <Pagination currentPage={3} totalPages={10} onPageChange={() => {}} />
            <PaginationNext />
          </div>
        </Showcase>
      </div>
    </section>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Helper Components
   ──────────────────────────────────────────────────────────────────────────── */
function Showcase({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div>
      {label && <p className="text-ui-sm font-medium text-muted-text mb-3">{label}</p>}
      <div className="border border-card-border bg-card p-4 sm:p-6">{children}</div>
    </div>
  )
}

function SidebarNav() {
  const [active, setActive] = React.useState("logos")

  React.useEffect(() => {
    const allIds = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id))
    const observers: IntersectionObserver[] = []
    allIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(entry.target.id)
          }
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto self-start scrollbar-thin">
      {NAV_GROUPS.map(({ group, items }) => (
        <div key={group} className="mb-4">
          <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-text/60">
            {group}
          </p>
          <div className="space-y-0.5">
            {items.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                }}
                className={cn(
                  "block px-3 py-1.5 text-[13px] transition-colors",
                  active === id
                    ? "bg-button-primary-bg/20 font-medium text-brand-dark"
                    : "text-muted-text hover:bg-muted/50 hover:text-heading"
                )}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Custom Lucide icon wrappers for bottom nav (matching parent app)
   ──────────────────────────────────────────────────────────────────────────── */
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955a1.126 1.126 0 0 1 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}

function SparklesIcon({ className }: { className?: string }) {
  return <Sparkles className={className} />
}

function ReportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  )
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  )
}

function Smile({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
  )
}

function PackagePlus({ className }: { className?: string }) {
  return <Plus className={className} />
}

function ScanLine({ className }: { className?: string }) {
  return <QrCode className={className} />
}

/* ────────────────────────────────────────────────────────────────────────────
   Interactive Demo Components
   ──────────────────────────────────────────────────────────────────────────── */
function TagsInteractive() {
  const [tags, setTags] = React.useState([
    { id: 1, label: "Sunshine", variant: "brand" as const },
    { id: 2, label: "Paid", variant: "success" as const },
    { id: 3, label: "Overdue", variant: "warning" as const },
    { id: 4, label: "Urgent", variant: "danger" as const },
    { id: 5, label: "Info", variant: "info" as const },
  ])
  const nextId = React.useRef(6)

  function addTag() {
    const variants = ["brand", "success", "warning", "danger", "info"] as const
    const labels = ["New", "Draft", "Active", "Pending", "Review", "Sent"]
    setTags([...tags, {
      id: nextId.current++,
      label: labels[Math.floor(Math.random() * labels.length)],
      variant: variants[Math.floor(Math.random() * variants.length)],
    }])
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag.id} variant={tag.variant} removable onRemove={() => setTags(tags.filter((t) => t.id !== tag.id))}>
            {tag.label}
          </Tag>
        ))}
      </div>
      <button onClick={addTag} className="flex items-center gap-1.5 rounded-lg border border-dashed border-[#d4a67f] px-3 py-1.5 font-urbanist text-xs text-[#3b2513] hover:bg-[#fdf6e8]">
        <Plus className="size-3" /> Add tag
      </button>
    </div>
  )
}

function TogglesInteractive() {
  const [a, setA] = React.useState(true)
  const [b, setB] = React.useState(false)
  const [view, setView] = React.useState("list")

  return (
    <div className="space-y-4">
      <Showcase label="Switches — click to toggle">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <Switch checked={a} onCheckedChange={setA} />
            <span className="text-sm font-nunito text-[#6b7280]">
              {a ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={b} onCheckedChange={setB} />
            <span className="text-sm font-nunito text-[#6b7280]">
              {b ? "On" : "Off"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Switch disabled />
            <span className="text-sm font-nunito text-[#9ca3af]">Locked</span>
          </div>
        </div>
      </Showcase>
      <Showcase label="Toggle group — click to switch">
        <ToggleGroup type="single" value={view} onValueChange={(v) => { if (v && typeof v === "string") setView(v) }}>
          <ToggleGroupItem value="list">List</ToggleGroupItem>
          <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
          <ToggleGroupItem value="calendar">Calendar</ToggleGroupItem>
        </ToggleGroup>
        <p className="text-caption mt-2">Selected: {view}</p>
      </Showcase>
    </div>
  )
}

function CheckboxesInteractive() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({
    notifications: true,
    autoReport: false,
    locked: false,
  })

  function toggle(key: string) {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Showcase label="States — click to toggle">
      <div className="flex flex-col gap-2.5">
        <label className="flex items-center gap-2 text-sm font-nunito text-[#2d1810] cursor-pointer">
          <Checkbox checked={checked.notifications} onCheckedChange={() => toggle("notifications")} /> Send notifications to parents
        </label>
        <label className="flex items-center gap-2 text-sm font-nunito text-[#2d1810] cursor-pointer">
          <Checkbox checked={checked.autoReport} onCheckedChange={() => toggle("autoReport")} /> Enable auto-report
        </label>
        <label className="flex items-center gap-2 text-sm font-nunito text-[#9ca3af] cursor-pointer">
          <Checkbox disabled /> Locked option
        </label>
      </div>
      <p className="text-caption mt-3">
        Notifications: {checked.notifications ? "ON" : "OFF"} · Auto-report: {checked.autoReport ? "ON" : "OFF"}
      </p>
    </Showcase>
  )
}

function ModalsInteractive() {
  const [active, setActive] = React.useState<string | null>(null)
  const [result, setResult] = React.useState<string | null>(null)

  function close(r?: string) {
    setActive(null)
    if (r) setResult(r)
  }

  return (
    <div className="space-y-4">
      <Showcase label="Dialog types — click to open each">
        <div className="flex flex-wrap gap-3">
          <button onClick={() => { setActive("confirm"); setResult(null) }} className="rounded-lg bg-[#3b2513] px-4 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]">
            Confirm Delete
          </button>
          <button onClick={() => { setActive("form"); setResult(null) }} className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2.5 font-urbanist text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">
            Form Dialog
          </button>
          <button onClick={() => { setActive("info"); setResult(null) }} className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2.5 font-urbanist text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">
            Info Dialog
          </button>
          <button onClick={() => { setActive("success"); setResult(null) }} className="rounded-lg border border-[#009061] bg-[#ecfff8] px-4 py-2.5 font-urbanist text-sm font-medium text-[#009061] hover:bg-[#d4f5e9]">
            Success Dialog
          </button>
        </div>
        {result && <p className="text-caption mt-3 text-[#009061]">Last result: {result}</p>}
      </Showcase>

      {active === "confirm" && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => close("Cancelled")} />
          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-[#e6ebf3] bg-white p-6 shadow-xl">
            <button onClick={() => close("Cancelled")} className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]"><X className="size-4" /></button>
            <div className="flex size-10 items-center justify-center rounded-full bg-[#fff5f5] mx-auto mb-4"><AlertTriangle className="size-5 text-[#ef4444]" /></div>
            <h3 className="font-merriweather text-lg font-bold text-[#2d1810] text-center">Delete Child Record?</h3>
            <p className="font-nunito text-sm text-[#6b7280] text-center mt-2">This action cannot be undone. All data will be permanently removed.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => close("Cancelled")} className="flex-1 rounded-lg border border-[#d0d5dd] px-4 py-2.5 font-urbanist text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">Cancel</button>
              <button onClick={() => close("Record deleted")} className="flex-1 rounded-lg bg-[#ef4444] px-4 py-2.5 font-urbanist text-sm font-semibold text-white hover:bg-[#dc2626]">Delete</button>
            </div>
          </div>
        </div>
      )}

      {active === "form" && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => close()} />
          <div className="relative mx-auto w-full max-w-md rounded-2xl border border-[#e6ebf3] bg-white p-6 shadow-xl">
            <button onClick={() => close()} className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]"><X className="size-4" /></button>
            <h3 className="font-merriweather text-lg font-bold text-[#2d1810]">Add New Child</h3>
            <p className="font-nunito text-sm text-[#6b7280] mt-1">Fill in the details below to enroll a new child.</p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="font-urbanist text-xs font-semibold text-[#454B54] mb-1 block">Full Name</label>
                <input type="text" placeholder="e.g. Emma Thompson" className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-4 font-nunito text-sm text-[#2d1810] placeholder:text-[#9ca3af] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]" />
              </div>
              <div>
                <label className="font-urbanist text-xs font-semibold text-[#454B54] mb-1 block">Date of Birth</label>
                <input type="date" className="h-11 w-full rounded-lg border border-[#d0d5dd] bg-white px-4 font-nunito text-sm text-[#2d1810] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]" />
              </div>
              <div>
                <label className="font-urbanist text-xs font-semibold text-[#454B54] mb-1 block">Class</label>
                <select className="h-11 w-full appearance-none rounded-lg border border-[#d0d5dd] bg-white px-4 font-nunito text-sm text-[#2d1810] focus:border-[#c47b2c] focus:outline-none focus:ring-1 focus:ring-[#c47b2c]">
                  <option>Sunshine</option>
                  <option>Rainbow</option>
                  <option>Butterfly</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => close("Cancelled")} className="flex-1 rounded-lg border border-[#d0d5dd] px-4 py-2.5 font-urbanist text-sm font-medium text-[#2d1810] hover:bg-[#f9fafb]">Cancel</button>
              <button onClick={() => close("Child enrolled!")} className="flex-1 rounded-lg bg-[#3b2513] px-4 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]">Enroll Child</button>
            </div>
          </div>
        </div>
      )}

      {active === "info" && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => close("Dismissed")} />
          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-[#e6ebf3] bg-white p-6 shadow-xl">
            <button onClick={() => close("Dismissed")} className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]"><X className="size-4" /></button>
            <div className="flex size-10 items-center justify-center rounded-full bg-[#e6ebf3] mx-auto mb-4"><Info className="size-5 text-[#6b7280]" /></div>
            <h3 className="font-merriweather text-lg font-bold text-[#2d1810] text-center">Scheduled Maintenance</h3>
            <p className="font-nunito text-sm text-[#6b7280] text-center mt-2">The system will be undergoing maintenance on Saturday from 2:00 AM to 4:00 AM GMT. Some features may be temporarily unavailable.</p>
            <button onClick={() => close("Acknowledged")} className="w-full mt-6 rounded-lg bg-[#3b2513] px-4 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]">Got it</button>
          </div>
        </div>
      )}

      {active === "success" && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => close("Dismissed")} />
          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-[#e6ebf3] bg-white p-6 shadow-xl">
            <button onClick={() => close("Dismissed")} className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-md text-[#6b7280] hover:bg-[#f3f4f6]"><X className="size-4" /></button>
            <div className="flex size-10 items-center justify-center rounded-full bg-[#ecfff8] mx-auto mb-4"><CheckCircle2 className="size-5 text-[#009061]" /></div>
            <h3 className="font-merriweather text-lg font-bold text-[#2d1810] text-center">Enrollment Complete!</h3>
            <p className="font-nunito text-sm text-[#6b7280] text-center mt-2">Emma Thompson has been successfully enrolled in Sunshine class. A confirmation email has been sent to the parents.</p>
            <button onClick={() => close("Done")} className="w-full mt-6 rounded-lg bg-[#009061] px-4 py-2.5 font-urbanist text-sm font-semibold text-white hover:bg-[#007a53]">Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

function AlertsInteractive() {
  const [visible, setVisible] = React.useState({
    success: true,
    warning: true,
    error: true,
    info: true,
  })

  function dismiss(key: keyof typeof visible) {
    setVisible((prev) => ({ ...prev, [key]: false }))
  }

  function reset() {
    setVisible({ success: true, warning: true, error: true, info: true })
  }

  return (
    <div className="space-y-3">
      <Showcase label="Alert banners — click ✕ to dismiss">
        {visible.success && (
          <AlertBanner variant="success" title="Enrollment approved" dismissible onDismiss={() => dismiss("success")}>
            Emma Thompson has been enrolled in Sunshine class.
          </AlertBanner>
        )}
        {visible.warning && (
          <AlertBanner variant="warning" title="Payment overdue" dismissible onDismiss={() => dismiss("warning")}>
            Invoice #1042 for Liam Chen is 7 days overdue.
          </AlertBanner>
        )}
        {visible.error && (
          <AlertBanner variant="error" title="DBS check expiring" dismissible onDismiss={() => dismiss("error")}>
            3 staff members have DBS checks expiring this month.
          </AlertBanner>
        )}
        {visible.info && (
          <AlertBanner variant="info" title="System update" dismissible onDismiss={() => dismiss("info")}>
            Scheduled maintenance on Saturday 2am-4am GMT.
          </AlertBanner>
        )}
      </Showcase>
      <button onClick={reset} className="rounded-lg border border-[#d0d5dd] px-3 py-1.5 font-urbanist text-xs text-[#6b7280] hover:bg-[#f9fafb]">
        Reset all alerts
      </button>
    </div>
  )
}

function PaginationInteractive() {
  const [page, setPage] = React.useState(3)

  return (
    <div className="space-y-3">
      <Showcase label="Click to change page">
        <div className="flex items-center gap-2 overflow-x-auto">
          <PaginationPrevious />
          <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
          <PaginationNext />
        </div>
      </Showcase>
      <p className="text-caption">Current page: {page} of 10</p>
    </div>
  )
}

function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => toast("Record saved", { description: "Child profile has been updated." })}
        className="rounded-lg bg-[#3b2513] px-4 py-2.5 font-urbanist text-sm font-semibold text-[#faf2e1] hover:bg-[#2d1810]"
      >
        Default Toast
      </button>
      <button
        onClick={() => toast.success("Enrollment complete", { description: "Emma has been added to Sunshine class." })}
        className="rounded-lg border border-[#009061] bg-[#ecfff8] px-4 py-2.5 font-urbanist text-sm font-medium text-[#009061] hover:bg-[#d4f5e9]"
      >
        Success Toast
      </button>
      <button
        onClick={() => toast.warning("Low attendance", { description: "Only 3 children checked in today." })}
        className="rounded-lg border border-[#FF9A01] bg-[#fff8e6] px-4 py-2.5 font-urbanist text-sm font-medium text-[#b36b00] hover:bg-[#fff0cc]"
      >
        Warning Toast
      </button>
      <button
        onClick={() => toast.error("Upload failed", { description: "File exceeds the 10 MB limit." })}
        className="rounded-lg border border-[#CD3030] bg-[#fff5f5] px-4 py-2.5 font-urbanist text-sm font-medium text-[#CD3030] hover:bg-[#ffe8e8]"
      >
        Error Toast
      </button>
      <button
        onClick={() => toast.info("Tip", { description: "Use Ctrl+K for quick search." })}
        className="rounded-lg border border-[#6b7280] bg-[#f3f4f6] px-4 py-2.5 font-urbanist text-sm font-medium text-[#6b7280] hover:bg-[#e5e7eb]"
      >
        Info Toast
      </button>
      <button
        onClick={() => toast("Action needed", {
          description: "Approve pending attendance?",
          action: { label: "Approve", onClick: () => toast.success("Approved!") },
        })}
        className="rounded-lg border border-[#9A6033] bg-[#fdf8f0] px-4 py-2.5 font-urbanist text-sm font-medium text-[#9A6033] hover:bg-[#f5ebd8]"
      >
        Toast with Action
      </button>
    </div>
  )
}

function SearchInteractive() {
  const [query, setQuery] = React.useState("")

  const children = [
    { name: "Emma Thompson", age: "4", room: "Sunshine" },
    { name: "Ethan Morales", age: "3", room: "Rainbow" },
    { name: "Lily Chen", age: "5", room: "Butterfly" },
    { name: "Aiden Okafor", age: "4", room: "Sunshine" },
    { name: "Sophia Kim", age: "3", room: "Rainbow" },
    { name: "Lucas Fernandez", age: "5", room: "Butterfly" },
  ]

  const filtered = query
    ? children.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    : children

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#9ca3af]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search children by name..."
          className="h-10 w-full rounded-full border border-[#d0d5dd] bg-white pl-10 pr-4 font-nunito text-sm text-[#2d1810] placeholder:text-[#9ca3af] outline-none focus:ring-2 focus:ring-[#c47b2c]"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280]">
            <X className="size-4" />
          </button>
        )}
      </div>
      <div className="rounded-lg border border-[#e6ebf3] bg-white max-h-48 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="px-4 py-6 text-center">
            <p className="text-sm font-nunito text-[#9ca3af]">No results for &ldquo;{query}&rdquo;</p>
          </div>
        ) : (
          filtered.map((child) => (
            <div key={child.name} className="flex items-center justify-between border-b border-[#eaecf0] last:border-b-0 px-4 py-2.5 hover:bg-[#faf2e1]">
              <div className="flex items-center gap-3">
                <Avatar className="size-7">
                  <AvatarFallback className="text-xs">{child.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="font-nunito text-sm font-medium text-[#2d1810]">{child.name}</span>
              </div>
              <span className="text-xs font-urbanist text-[#6b7280]">{child.room} · {child.age}y</span>
            </div>
          ))
        )}
      </div>
      <p className="text-caption">{filtered.length} of {children.length} children shown</p>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
   Main Page
   ──────────────────────────────────────────────────────────────────────────── */
export default function LibraryPage() {
  const [mobileNav, setMobileNav] = React.useState(false)

  return (
    <div className="min-h-screen bg-[#FAF2E1]">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-[#E8DFD0] bg-[#FAF2E1]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between py-4 sm:py-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setMobileNav(true)}
                className="flex size-9 items-center justify-center rounded-lg border border-[#d0d5dd] bg-white lg:hidden"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/" className="flex items-center gap-2">
                <img src="/Logo/CEVEN APP 1.svg" alt="CEven" className="h-7 sm:h-8 w-auto" />
              </Link>
              <span className="text-muted-text hidden sm:inline">/</span>
              <span className="text-ui font-medium text-heading hidden sm:inline">Library</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="hidden sm:inline-flex text-xs">v1.0</Badge>
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <span className="hidden sm:inline">Back to app</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav overlay */}
      {mobileNav && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileNav(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#eaecf0] px-4 py-4">
              <img src="/Logo/CEVEN APP 1.svg" alt="CEven" className="h-7 w-auto" />
              <button
                onClick={() => setMobileNav(false)}
                className="flex size-8 items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f3f4f6]"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav className="p-3">
              {NAV_GROUPS.map(({ group, items }) => (
                <div key={group} className="mb-3">
                  <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]/60">
                    {group}
                  </p>
                  <div className="space-y-0.5">
                    {items.map(({ id, label }) => (
                      <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          setMobileNav(false)
                          setTimeout(() => {
                            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
                          }, 100)
                        }}
                        className="block rounded-lg px-3 py-2 font-nunito text-sm font-semibold text-[#454B54] hover:bg-[#f5edd8] hover:text-[#3b2513]"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="border-b border-[#E8DFD0] bg-[#FAF2E1]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-overline text-brand-accent mb-3">Design System</p>
            <h1 className="font-mogra text-3xl sm:text-4xl lg:text-5xl text-brand-dark leading-[1.1]">
              CEven Component Library
            </h1>
            <p className="text-body-lg text-muted-text mt-3 sm:mt-4 max-w-xl">
              Design tokens, UI primitives, and composable patterns that power the
              CEven platform. Built on shadcn/ui, Base UI, and Tailwind CSS v4.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5 sm:mt-6">
              <Button
                className="h-11 border border-button-primary-border bg-button-primary-bg font-urbanist text-sm font-semibold text-brand-dark hover:bg-button-primary-border/80"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-16 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
          <aside className="hidden lg:block">
            <SidebarNav />
          </aside>

          <main className="min-w-0 space-y-14">
            <LogoShowcase />
            <Separator />
            {/* Colors, Typography, Avatars, Tooltips, Effects, Marketing — use existing Section wrapper */}
            <Section id="colors" title="Colors" description="Brand palette and semantic tokens.">
              <Showcase label="Brand">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {[
                    { name: "Brand Dark", hex: "#3B2513", cls: "bg-brand-dark", text: "text-white" },
                    { name: "Brand Accent", hex: "#9A6033", cls: "bg-brand-accent", text: "text-white" },
                    { name: "Button Primary", hex: "#E0BFA0", cls: "bg-button-primary-bg", text: "text-brand-dark" },
                    { name: "Button Border", hex: "#D4A67F", cls: "bg-button-primary-border", text: "text-brand-dark" },
                    { name: "Content BG", hex: "#FFF9F0", cls: "bg-content-bg", text: "text-heading" },
                    { name: "Success", hex: "#009061", cls: "bg-success", text: "text-white" },
                    { name: "Warning", hex: "#FF9A01", cls: "bg-warning", text: "text-white" },
                    { name: "Error", hex: "#CD3030", cls: "bg-error", text: "text-white" },
                  ].map((c) => (
                    <div key={c.name}>
                      <div className={cn("h-14 w-full flex items-end p-2 text-xs font-medium", c.cls, c.text)}>
                        {c.hex}
                      </div>
                      <p className="text-caption mt-1">{c.name}</p>
                    </div>
                  ))}
                </div>
              </Showcase>
            </Section>
            <Separator />
            <Section id="typography" title="Typography" description="Font families and type scale.">
              <Showcase label="Font Families">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="text-caption w-16 shrink-0">display</span>
                    <p style={{ fontFamily: "var(--font-mogra-import)" }} className="text-2xl sm:text-3xl text-heading break-words">Mogra — Logo & Display</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="text-caption w-16 shrink-0">heading</span>
                    <p style={{ fontFamily: "var(--font-merriweather-import)" }} className="text-xl sm:text-2xl font-bold text-heading break-words">Merriweather — Headings</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="text-caption w-16 shrink-0">ui</span>
                    <p style={{ fontFamily: "var(--font-urbanist-import)" }} className="text-xl sm:text-2xl font-semibold text-heading break-words">Urbanist — UI Labels</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                    <span className="text-caption w-16 shrink-0">body</span>
                    <p style={{ fontFamily: "var(--font-nunito-import)" }} className="text-xl sm:text-2xl text-heading break-words">Nunito — Body Text</p>
                  </div>
                </div>
              </Showcase>
            </Section>
            <Separator />
            <ButtonShowcase />
            <Separator />
            <IconShowcase />
            <Separator />
            <BadgeShowcase />
            <Separator />
            <FormShowcase />
            <Separator />
            <Section id="avatars" title="Avatars" description="User identity indicators.">
              <Showcase label="Sizes & Group">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
                    <Avatar><AvatarFallback>DF</AvatarFallback></Avatar>
                    <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
                    <Avatar><AvatarFallback>AB</AvatarFallback><AvatarBadge /></Avatar>
                  </div>
                  <AvatarGroup>
                    <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
                    <Avatar><AvatarFallback>CD</AvatarFallback></Avatar>
                    <Avatar><AvatarFallback>EF</AvatarFallback></Avatar>
                    <AvatarGroupCount>+5</AvatarGroupCount>
                  </AvatarGroup>
                </div>
              </Showcase>
            </Section>
            <Separator />
            <CardShowcase />
            <Separator />
            <TableShowcase />
            <Separator />
            <NavigationShowcase />
            <Separator />

            {/* Tags */}
            <Section id="tags" title="Tags" description="Removable and interactive tags.">
              <TagsInteractive />
            </Section>
            <Separator />

            {/* Tooltips */}
            <Section id="tooltips" title="Tooltips" description="Hover tooltips for additional context.">
              <Showcase label="Positions">
                <div className="flex flex-wrap gap-4">
                  <Tooltip>
                    <TooltipTrigger render={<button className="rounded-lg border border-[#d0d5dd] px-3 py-1.5 font-urbanist text-sm text-[#2d1810] hover:bg-[#f9fafb]" />}>
                      Top
                    </TooltipTrigger>
                    <TooltipContent side="top">Tooltip on top</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger render={<button className="rounded-lg border border-[#d0d5dd] px-3 py-1.5 font-urbanist text-sm text-[#2d1810] hover:bg-[#f9fafb]" />}>
                      Bottom
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger render={<button className="rounded-lg border border-[#d0d5dd] px-3 py-1.5 font-urbanist text-sm text-[#2d1810] hover:bg-[#f9fafb]" />}>
                      Left
                    </TooltipTrigger>
                    <TooltipContent side="left">Tooltip on left</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger render={<button className="rounded-lg border border-[#d0d5dd] px-3 py-1.5 font-urbanist text-sm text-[#2d1810] hover:bg-[#f9fafb]" />}>
                      Right
                    </TooltipTrigger>
                    <TooltipContent side="right">Tooltip on right</TooltipContent>
                  </Tooltip>
                </div>
              </Showcase>
            </Section>
            <Separator />

            {/* Toggles */}
            <Section id="toggles" title="Toggles & Switches" description="Boolean toggle controls.">
              <TogglesInteractive />
            </Section>
            <Separator />

            {/* Checkboxes */}
            <Section id="checkboxes" title="Checkboxes" description="Checkbox inputs and groups.">
              <CheckboxesInteractive />
            </Section>
            <Separator />

            {/* Sliders */}
            <Section id="sliders" title="Sliders" description="Range slider input control.">
              <Showcase label="Default slider">
                <div className="max-w-md space-y-2">
                  <Slider defaultValue={[50]} max={100} step={1} />
                  <p className="text-caption">Drag to adjust value</p>
                </div>
              </Showcase>
            </Section>
            <Separator />

            {/* Progress */}
            <Section id="progress" title="Progress" description="Progress bars and indicators.">
              <Showcase label="Progress bars">
                <div className="space-y-4 max-w-md">
                  <Progress value={65}>
                    <ProgressLabel>Loading...</ProgressLabel>
                    <ProgressValue />
                  </Progress>
                  <Progress value={30} />
                  <Progress value={85} />
                </div>
              </Showcase>
            </Section>
            <Separator />

            {/* Tabs */}
            <Section id="tabs" title="Tabs" description="Tabbed content navigation.">
              <Showcase label="Default tabs">
                <Tabs defaultValue="tab-1">
                  <TabsList>
                    <TabsTrigger value="tab-1">Overview</TabsTrigger>
                    <TabsTrigger value="tab-2">Details</TabsTrigger>
                    <TabsTrigger value="tab-3">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab-1" className="p-4 text-body-sm">Overview content goes here.</TabsContent>
                  <TabsContent value="tab-2" className="p-4 text-body-sm">Detailed information.</TabsContent>
                  <TabsContent value="tab-3" className="p-4 text-body-sm">Configuration options.</TabsContent>
                </Tabs>
              </Showcase>
              <Showcase label="Line variant tabs">
                <Tabs defaultValue="tab-1">
                  <TabsList variant="line">
                    <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
                    <TabsTrigger value="tab-2">Tab 2</TabsTrigger>
                    <TabsTrigger value="tab-3">Tab 3</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab-1" className="p-4 text-body-sm">Line variant content.</TabsContent>
                  <TabsContent value="tab-2" className="p-4 text-body-sm">Content 2.</TabsContent>
                  <TabsContent value="tab-3" className="p-4 text-body-sm">Content 3.</TabsContent>
                </Tabs>
              </Showcase>
            </Section>
            <Separator />

            {/* Modals */}
            <Section id="modals" title="Modals & Dialogs" description="Dialog, confirmation, and form modals.">
              <ModalsInteractive />
            </Section>
            <Separator />

            {/* Alerts */}
            <Section id="alerts" title="Alerts & Notifications" description="Alert banners and toast notifications.">
              <AlertsInteractive />
              <Showcase label="Toast notifications — click to trigger">
                <ToastDemo />
              </Showcase>
            </Section>
            <Separator />

            {/* Pagination */}
            <Section id="pagination" title="Pagination" description="Page navigation for lists and tables.">
              <PaginationInteractive />
            </Section>
            <Separator />

            {/* Empty States */}
            <Section id="empty-states" title="Empty States" description="Zero-data states with illustration and CTA.">
              <Showcase label="Empty state card">
                <div className="rounded-xl border border-[#e6ebf3] bg-white">
                  <EmptyState
                    icon={
                      <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    }
                    title="No children enrolled"
                    description="Get started by enrolling your first child."
                    action={
                      <button className="flex items-center gap-1.5 rounded-lg bg-[#3b2513] px-4 py-2.5 font-urbanist text-xs font-semibold text-[#faf2e1] hover:bg-[#2d1810]">
                        <Plus className="size-3" />
                        Enroll Child
                      </button>
                    }
                  />
                </div>
              </Showcase>
            </Section>
            <Separator />

            {/* Progress Steps */}
            <Section id="progress-steps" title="Progress Steps" description="Multi-step wizard progress indicator.">
              <Showcase label="Step states">
                <div className="space-y-6">
                  <ProgressSteps currentStep={1} totalSteps={4} />
                  <ProgressSteps currentStep={2} totalSteps={4} />
                  <ProgressSteps currentStep={4} totalSteps={4} />
                </div>
              </Showcase>
            </Section>
            <Separator />

            {/* File Upload */}
            <Section id="file-upload" title="File Upload" description="Drag-and-drop file upload zone.">
              <Showcase label="Upload zone">
                <FileUpload />
              </Showcase>
            </Section>
            <Separator />

            {/* Code Blocks */}
            <Section id="code-blocks" title="Code Blocks" description="Syntax-highlighted code snippets.">
              <Showcase label="TypeScript — component usage">
                <CodeBlock language="typescript" filename="components/child-card.tsx" showLineNumbers code={`import { Card, CardHeader, CardTitle } from "@ceven/ui"
import { Badge } from "@ceven/ui/badge"
import { Avatar, AvatarFallback } from "@ceven/ui/avatar"

interface ChildCardProps {
  name: string
  room: string
  age: string
  status: "active" | "inactive"
}

export function ChildCard({ name, room, age, status }: ChildCardProps) {
  return (
    <Card className="rounded-xl border-[#e6ebf3]">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{name}</CardTitle>
            <p className="text-sm text-muted">{room} · {age}</p>
          </div>
          <Badge variant={status === "active" ? "success" : "warning"}>
            {status}
          </Badge>
        </div>
      </CardHeader>
    </Card>
  )
}`} />
              </Showcase>
              <Showcase label="Bash — CLI commands">
                <CodeBlock language="bash" filename="terminal" showLineNumbers code={`# Install the CEven design system
npx shadcn@latest add https://ceven-ui.com/r/card.json
npx shadcn@latest add https://ceven-ui.com/r/badge.json

# Run the dev server
npm run dev

# Build for production
npm run build`} />
              </Showcase>
              <Showcase label="CSS — design tokens">
                <CodeBlock language="css" filename="globals.css" showLineNumbers code={`/* CEven Design System Tokens */
:root {
  --brand-dark: #3B2513;
  --brand-accent: #9A6033;
  --button-primary-bg: #E0BFA0;
  --button-primary-border: #D4A67F;
  --content-bg: #FFF9F0;
  --success: #009061;
  --warning: #FF9A01;
  --error: #CD3030;
  --gold-focus: #C47B2C;
}`} />
              </Showcase>
            </Section>
            <Separator />

            {/* Activity Feeds */}
            <Section id="activity-feeds" title="Activity Feeds" description="Timeline and activity log patterns.">
              <Showcase label="Activity feed">
                <ActivityFeed
                  items={[
                    { id: "1", icon: <CheckCircle2 className="size-4" />, title: "Enrollment approved", description: "Emma Thompson enrolled in Sunshine", timestamp: "2 min ago" },
                    { id: "2", icon: <Clock className="size-4" />, title: "Payment pending", description: "Invoice #1042 awaiting payment", timestamp: "1 hr ago" },
                    { id: "3", icon: <AlertTriangle className="size-4" />, title: "DBS check expiring", description: "3 staff checks due this month", timestamp: "3 hrs ago" },
                  ]}
                />
              </Showcase>
            </Section>
            <Separator />

            <Section id="marketing" title="Marketing" description="Reusable marketing section components.">
              <Showcase label="Feature Grid">
                <FeatureGrid title="Why Choose CEven" description="Everything you need to run a modern creche" columns={3}>
                  <FeatureCard icon={<Star className="size-5 text-brand-accent" />} title="Attendance Tracking" description="QR code check-in, real-time tracking, and automated reports." />
                  <FeatureCard icon={<Users className="size-5 text-brand-accent" />} title="Staff Management" description="Schedule shifts, track compliance, and manage payroll." />
                  <FeatureCard icon={<MessageSquare className="size-5 text-brand-accent" />} title="Parent Communication" description="Announcements, messaging, and photo sharing." />
                </FeatureGrid>
              </Showcase>
              <Showcase label="Pricing">
                <PricingGrid>
                  <PricingCard name="Starter" price="$29" period="month" description="For small creches" features={["Up to 30 children", "5 staff members", "Basic attendance", "Email support"]} action={<Button variant="outline" className="w-full">Choose Plan</Button>} />
                  <PricingCard name="Professional" price="$79" period="month" description="For growing creches" features={["Up to 100 children", "20 staff members", "Advanced attendance", "Priority support", "AI insights"]} highlighted action={<Button className="w-full h-9 rounded-lg bg-brand-dark font-urbanist text-xs font-semibold text-white">Choose Plan</Button>} />
                  <PricingCard name="Enterprise" price="$149" period="month" description="For multi-location creches" features={["Unlimited children", "Unlimited staff", "All features", "Dedicated support"]} action={<Button variant="outline" className="w-full">Contact Sales</Button>} />
                </PricingGrid>
              </Showcase>
              <Showcase label="Testimonials">
                <TestimonialGrid>
                  <TestimonialCard quote="CEven has transformed how we run our creche. The attendance tracking alone saves us hours every week." author="Sarah Johnson" role="Director, Little Stars Creche" />
                  <TestimonialCard quote="Parents love the transparency. They can see exactly what their child did during the day." author="Michael Chen" role="Manager, Happy Kids Center" />
                  <TestimonialCard quote="The AI insights help us identify patterns we never would have noticed. Highly recommended." author="Emma Williams" role="Owner, Sunshine Academy" />
                </TestimonialGrid>
              </Showcase>
              <Showcase label="CTA Banner">
                <CTABanner title="Ready to Get Started?" description="Join hundreds of creches already using CEven." actions={<Button className="h-11 border border-button-primary-border bg-button-primary-bg font-urbanist text-sm font-semibold text-brand-dark hover:bg-button-primary-border/80">Start Free Trial</Button>} />
              </Showcase>
            </Section>
            <div className="h-16" />
          </main>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="fixed bottom-0 inset-x-0 z-50 border-t border-[#E8DFD0] bg-white/95 backdrop-blur-sm lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {[
            { id: "logos", label: "Logo", icon: HomeIcon },
            { id: "buttons", label: "Buttons", icon: SparklesIcon },
            { id: "forms", label: "Forms", icon: ReportIcon },
            { id: "cards", label: "Cards", icon: ChatIcon },
            { id: "tables", label: "Tables", icon: SettingsIcon },
          ].map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="flex flex-col items-center gap-0.5 px-2 py-1"
            >
              <Icon className="size-5 text-[#6b7280]" />
              <span className="text-[10px] font-urbanist text-[#6b7280]">
                {label}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}

function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="mb-6 border-b border-[#E8DFD0] pb-4">
        <h2 className="font-merriweather text-2xl sm:text-3xl font-bold text-heading">{title}</h2>
        {description && <p className="text-body-sm text-muted-text mt-1">{description}</p>}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  )
}
