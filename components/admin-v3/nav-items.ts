import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  Baby,
  Users,
  ClipboardList,
  Sprout,
  UserCog,
  Wallet,
  Palmtree,
  ShieldCheck,
  School,
  QrCode,
  ClipboardCheck,
  AlertTriangle,
  Pill,
  Package,
  Wrench,
  ListTodo,
  Banknote,
  Receipt,
  TrendingUp,
  MessageSquare,
  Megaphone,
  Calendar,
  Bot,
  BarChart3,
  FileText,
  Search,
  Gem,
  GraduationCap,
  Settings,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number | "Live";
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/admin/v3/dashboard", icon: LayoutGrid }],
  },
  {
    label: "Children & People",
    items: [
      { label: "Children", href: "/admin/v3/children", icon: Baby, badge: 42 },
      { label: "Parents", href: "/admin/v3/parents", icon: Users },
      { label: "Enrolment & Waitlist", href: "/admin/v3/enrolment", icon: ClipboardList, badge: 3 },
      { label: "Child Development", href: "/admin/v3/development", icon: Sprout },
      { label: "Staff", href: "/admin/v3/staff", icon: UserCog },
      { label: "Payroll", href: "/admin/v3/payroll", icon: Wallet },
      { label: "Leave Management", href: "/admin/v3/leave", icon: Palmtree },
      { label: "Compliance & Safety", href: "/admin/v3/compliance", icon: ShieldCheck },
      { label: "Rooms & Classes", href: "/admin/v3/rooms", icon: School },
    ],
  },
  {
    label: "Daily Operations",
    items: [
      { label: "Reception / QR", href: "/admin/v3/reception", icon: QrCode, badge: "Live" },
      { label: "Daily Logs", href: "/admin/v3/daily-logs", icon: ClipboardCheck, badge: 5 },
      { label: "Health & Incidents", href: "/admin/v3/health", icon: AlertTriangle, badge: 2 },
      { label: "Medication", href: "/admin/v3/medication", icon: Pill },
      { label: "Inventory & Supplies", href: "/admin/v3/inventory", icon: Package },
      { label: "Facilities", href: "/admin/v3/facilities", icon: Wrench },
      { label: "Tasks", href: "/admin/v3/tasks", icon: ListTodo, badge: 3 },
    ],
  },
  {
    label: "Finance",
    items: [
      { label: "Billing & Payments", href: "/admin/v3/billing", icon: Banknote, badge: 8 },
      { label: "Expenses", href: "/admin/v3/expenses", icon: Receipt },
      { label: "Financial Reports", href: "/admin/v3/financial-reports", icon: TrendingUp },
    ],
  },
  {
    label: "Communication",
    items: [
      { label: "Messages", href: "/admin/v3/messages", icon: MessageSquare, badge: 3 },
      { label: "Announcements", href: "/admin/v3/announcements", icon: Megaphone },
      { label: "Events Calendar", href: "/admin/v3/events", icon: Calendar },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { label: "Command Center", href: "/admin/v3/ai-command-center", icon: Bot, badge: 7 },
      { label: "Analytics", href: "/admin/v3/analytics", icon: BarChart3 },
      { label: "Reports", href: "/admin/v3/reports", icon: FileText },
      { label: "Audit Trail", href: "/admin/v3/audit-trail", icon: Search },
    ],
  },
  {
    label: "Account & Setup",
    items: [
      { label: "Plans & Access", href: "/admin/v3/plans", icon: Gem },
      { label: "Help & Training", href: "/admin/v3/help", icon: GraduationCap },
      { label: "Settings", href: "/admin/v3/settings", icon: Settings },
    ],
  },
];
