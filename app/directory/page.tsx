import Link from "next/link";

type Screen = { label: string; href?: string };
type VersionBlock = {
  label: string;
  meta: string;
  href?: string;
  note?: string;
  rows: Screen[][];
};
type Summary = {
  what: string;
  entails: string;
  missing: string;
  improved: string;
};
type AppSection = {
  id: string;
  title: string;
  summary: Summary;
  versions: VersionBlock[];
};

const APP_SECTIONS: AppSection[] = [
  {
    id: "design-system",
    title: "Design System",
    summary: {
      what: "CEven's shared visual language — the source of truth for colors, type, and components used across every app.",
      entails: "Tokens (brand colors, fonts, spacing) plus live showcases for buttons, badges, cards, tables, modals, AI chat/messaging patterns, and marketing sections.",
      missing: "Not yet consumed as an actual shared package or theme — each app still hardcodes its own Tailwind classes rather than importing from here.",
      improved: "A single reference now exists instead of every app inventing its own button, card, and color treatment independently.",
    },
    versions: [
      {
        label: "CEven library — foundations & components",
        meta: "Next.js · /library",
        href: "/library",
        rows: [
          [
            { label: "Logos", href: "/library#logos" },
            { label: "Colors", href: "/library#colors" },
            { label: "Typography", href: "/library#typography" },
            { label: "Icons", href: "/library#icons" },
          ],
          [
            { label: "Buttons", href: "/library#buttons" },
            { label: "Badges", href: "/library#badges" },
            { label: "Tags", href: "/library#tags" },
            { label: "Inputs", href: "/library#input-fields" },
            { label: "Dropdowns", href: "/library#dropdown" },
            { label: "Switches", href: "/library#switches" },
            { label: "Checkboxes", href: "/library#checkbox" },
          ],
          [
            { label: "Cards", href: "/library#cards" },
            { label: "Tables", href: "/library#tables" },
            { label: "Tabs", href: "/library#tabs" },
            { label: "Modals", href: "/library#modals" },
            { label: "Alerts", href: "/library#alerts" },
            { label: "Empty States", href: "/library#empty-state" },
          ],
          [
            { label: "AI Chat", href: "/library#ai-chat" },
            { label: "Messaging", href: "/library#msg-thread-list" },
            { label: "Activity Feeds", href: "/library#activity-feeds" },
            { label: "Marketing", href: "/library#marketing" },
          ],
        ],
      },
      {
        label: "Vibrant preview",
        meta: "Next.js · /library/vibrant-preview",
        href: "/library/vibrant-preview",
        rows: [[{ label: "Alternate theme preview", href: "/library/vibrant-preview" }]],
      },
    ],
  },
  {
    id: "super-admin",
    title: "Super Admin",
    summary: {
      what: "CEven's own internal console — platform-operator oversight across every crèche on the platform, not a single crèche's view.",
      entails: "Dashboard, a crèche directory with per-crèche caregiver/child drill-down, enrollment oversight, subscriptions, and notifications.",
      missing: "Only one build exists (no v1/v2/v3 split yet), and it isn't linked from anywhere else in the product — reachable only by direct URL.",
      improved: "New area — first working version, not an iteration over a prior one.",
    },
    versions: [
      {
        label: "Platform console",
        meta: "Next.js · /super-admin",
        href: "/super-admin/dashboard",
        rows: [
          [
            { label: "Dashboard", href: "/super-admin/dashboard" },
            { label: "Crèches", href: "/super-admin/creches" },
            { label: "Enrollment", href: "/super-admin/enrollment" },
            { label: "Subscriptions", href: "/super-admin/subscriptions" },
            { label: "Notifications", href: "/super-admin/notifications" },
          ],
        ],
      },
    ],
  },
  {
    id: "creche-admin",
    title: "Crèche Admin",
    summary: {
      what: "The operator dashboard a crèche's own staff/owner uses day-to-day — attendance, billing, staff, compliance, and more, scoped to their one crèche.",
      entails: "v1 was the original build. v2 (this codebase's main build) is a full operating system with real logic for nearly every module. v3 is the CEO's own reimagining of the product — new visual direction and flatter navigation — currently being converted from a static prototype into real, working code.",
      missing: "v3: most pages still need porting to real Next.js with live data — only the exact-replica reference and the conversion-in-progress exist so far.",
      improved: "v2 added full feature breadth over v1 — payroll, compliance, AI Command Center, financial reports. v3 brings a cleaner, more distinctive visual language matching the CEO's original product vision.",
    },
    versions: [
      {
        label: "v1 — original crèche admin",
        meta: "Next.js · /admin/v1",
        href: "/admin/v1/dashboard",
        rows: [
          [
            { label: "Dashboard", href: "/admin/v1/dashboard" },
            { label: "Enrollment", href: "/admin/v1/enrollment" },
            { label: "Caregivers", href: "/admin/v1/caregivers" },
            { label: "Team Management", href: "/admin/v1/team-management" },
            { label: "Notifications", href: "/admin/v1/notifications" },
          ],
        ],
      },
      {
        label: "v2 — full operating system",
        meta: "Next.js · /admin/v2",
        href: "/admin/v2/dashboard",
        rows: [
          [
            { label: "Dashboard", href: "/admin/v2/dashboard" },
            { label: "Get Started", href: "/admin/v2/get-started" },
          ],
          [
            { label: "Children", href: "/admin/v2/children" },
            { label: "Enrolment & Waitlist", href: "/admin/v2/children?tab=enrolment-waitlist" },
            { label: "Caregivers", href: "/admin/v2/children?tab=caregivers" },
            { label: "Rooms & Classes", href: "/admin/v2/children?tab=rooms-classes" },
            { label: "Parents", href: "/admin/v2/children?tab=parents" },
          ],
          [
            { label: "Staff", href: "/admin/v2/staff" },
            { label: "Attendance Log", href: "/admin/v2/staff?tab=attendance-log" },
            { label: "Role Management", href: "/admin/v2/staff?tab=role-management" },
            { label: "Leaderboard", href: "/admin/v2/staff?tab=leaderboard" },
            { label: "Leave Management", href: "/admin/v2/staff?tab=leave-management" },
            { label: "Compliance & Safety", href: "/admin/v2/staff?tab=compliance-safety" },
          ],
          [
            { label: "Reception / QR", href: "/admin/v2/daily-operations" },
            { label: "Daily Logs", href: "/admin/v2/daily-operations?tab=daily-logs" },
            { label: "Health & Incidents", href: "/admin/v2/daily-operations?tab=health-incidents" },
            { label: "Medication", href: "/admin/v2/daily-operations?tab=medication" },
            { label: "Inventory & Supplies", href: "/admin/v2/daily-operations?tab=inventory-supplies" },
            { label: "Facilities", href: "/admin/v2/daily-operations?tab=facilities" },
            { label: "Tasks", href: "/admin/v2/daily-operations?tab=tasks" },
          ],
          [
            { label: "Wallet", href: "/admin/v2/finance" },
            { label: "Billing & Payments", href: "/admin/v2/finance?tab=billing-payments" },
            { label: "Expenses", href: "/admin/v2/finance?tab=expenses" },
            { label: "Payroll", href: "/admin/v2/finance?tab=payroll" },
            { label: "Financial Reports", href: "/admin/v2/finance?tab=financial-reports" },
          ],
          [
            { label: "Messages", href: "/admin/v2/communication" },
            { label: "Announcements", href: "/admin/v2/communication?tab=announcements" },
            { label: "Events Calendar", href: "/admin/v2/communication?tab=events-calendar" },
          ],
          [
            { label: "AI Command Center", href: "/admin/v2/intelligence" },
            { label: "Analytics", href: "/admin/v2/intelligence?tab=analytics" },
            { label: "Reports", href: "/admin/v2/intelligence?tab=reports" },
            { label: "Audit Trail", href: "/admin/v2/intelligence?tab=audit-trail" },
          ],
          [
            { label: "Plans & Access", href: "/admin/v2/account-setup" },
            { label: "Help & Training", href: "/admin/v2/account-setup?tab=help-training" },
            { label: "Settings", href: "/admin/v2/account-setup?tab=settings" },
          ],
        ],
      },
      {
        label: "v3 — CEO reimagining",
        meta: "Next.js (in progress) · /admin/v3",
        note: "Exact-replica reference kept at /admin/v3-reference",
        href: "/admin/v3",
        rows: [
          [
            { label: "Dashboard" },
            { label: "Children, Child Profile" },
            { label: "Parents" },
            { label: "Enrolment & Waitlist" },
            { label: "Child Development" },
          ],
          [
            { label: "Staff" },
            { label: "Payroll" },
            { label: "Leave Management" },
            { label: "Compliance & Safety" },
            { label: "Rooms & Classes" },
          ],
          [
            { label: "Reception / QR" },
            { label: "Daily Logs" },
            { label: "Health & Incidents" },
            { label: "Medication" },
            { label: "Inventory & Supplies" },
            { label: "Facilities" },
            { label: "Tasks" },
          ],
          [
            { label: "Billing & Payments" },
            { label: "Expenses" },
            { label: "Financial Reports" },
          ],
          [
            { label: "Messages" },
            { label: "Announcements" },
            { label: "Events Calendar" },
          ],
          [
            { label: "AI Command Center" },
            { label: "Analytics" },
            { label: "Reports" },
            { label: "Audit Trail" },
          ],
          [
            { label: "Plans & Access" },
            { label: "Help & Training" },
            { label: "Settings" },
            { label: "Notifications" },
          ],
        ],
      },
    ],
  },
  {
    id: "parent-app",
    title: "Parent App",
    summary: {
      what: "The family-facing mobile app parents use to track their child's day, message the crèche, and manage billing.",
      entails: "v1 is this codebase's main build, started when the current team joined. v2 is the newest direction — it reimagines the relationship as parent ↔ independent caregiver, not just parent ↔ crèche.",
      missing: "v2 currently has 4 screens built (home, chat, food timetable, calendar) — most of v1's breadth hasn't been re-imagined for the independent-caregiver model yet.",
      improved: "v1 added the CEvenAI assistant, richer settings, and health/growth/feeding tracking over the original production app.",
    },
    versions: [
      {
        label: "v1 — current build",
        meta: "Next.js · /parent",
        href: "/parent/home",
        rows: [
          [
            { label: "Home", href: "/parent/home" },
            { label: "Announcements", href: "/parent/announcements" },
            { label: "Attendance", href: "/parent/attendance" },
          ],
          [
            { label: "Login", href: "/parent/auth" },
            { label: "Sign Up", href: "/parent/auth/signup" },
            { label: "Verify Email", href: "/parent/auth/verify" },
            { label: "Forgot Password", href: "/parent/auth/forgot-password" },
          ],
          [
            { label: "CEvenAI", href: "/parent/cevenai" },
            { label: "Chat", href: "/parent/chat" },
            { label: "Family Chat", href: "/parent/chat/family" },
          ],
          [
            { label: "Children", href: "/parent/children" },
            { label: "Add Child", href: "/parent/child/add" },
            { label: "Child Development", href: "/parent/child/development" },
            { label: "Feeding", href: "/parent/child/feeding" },
            { label: "Growth", href: "/parent/child/growth" },
            { label: "Health", href: "/parent/child/health" },
          ],
          [
            { label: "Crèche", href: "/parent/creche" },
            { label: "Enrollments", href: "/parent/enrollments" },
            { label: "Events", href: "/parent/events" },
            { label: "Fees", href: "/parent/fees" },
            { label: "Gallery", href: "/parent/gallery" },
          ],
          [
            { label: "Incidents", href: "/parent/incidents" },
            { label: "Medication", href: "/parent/medication" },
            { label: "Moments", href: "/parent/moments" },
            { label: "Mood", href: "/parent/mood" },
            { label: "Notifications", href: "/parent/notifications" },
          ],
          [
            { label: "Rate Caregiver", href: "/parent/rate-caregiver" },
            { label: "Reports", href: "/parent/reports" },
            { label: "Scan", href: "/parent/scan" },
            { label: "Special Requests", href: "/parent/special-requests" },
          ],
          [
            { label: "Settings", href: "/parent/settings" },
            { label: "Account", href: "/parent/settings/account" },
            { label: "Billing", href: "/parent/settings/billing" },
            { label: "Payments", href: "/parent/settings/payments" },
            { label: "Pickups", href: "/parent/settings/pickups" },
            { label: "Profile", href: "/parent/settings/profile" },
          ],
        ],
      },
      {
        label: "v2 — parent ↔ independent caregiver",
        meta: "Next.js · /parentv2",
        href: "/parentv2/home",
        rows: [
          [
            { label: "Home", href: "/parentv2/home" },
            { label: "Chat", href: "/parentv2/chat" },
            { label: "Food Timetable", href: "/parentv2/food-timetable" },
            { label: "Calendar", href: "/parentv2/calendar" },
          ],
        ],
      },
    ],
  },
  {
    id: "caregiver-app",
    title: "Caregiver App",
    summary: {
      what: "The staff-facing mobile app caregivers use to log attendance, daily reports, and incidents — scoped to a single crèche.",
      entails: "v1 is the crèche-staff build from this codebase's main build. v2 is the reimagined version with a cleaner UI and richer daily workflows.",
      missing: "v2 currently has the core screens built (today, chat, daily report, calendar) — more modules are being expanded.",
      improved: "v1 added AI chat, ratings, and a fuller settings/onboarding flow over the original production app. v2 brings a modern visual direction matching the new product vision.",
    },
    versions: [
      {
        label: "v1 — current build",
        meta: "Next.js · /caregiver",
        href: "/caregiver/home",
        rows: [
          [
            { label: "Home", href: "/caregiver/home" },
            { label: "Splash", href: "/caregiver/splash" },
            { label: "Onboarding", href: "/caregiver/onboarding" },
          ],
          [
            { label: "Login", href: "/caregiver/auth" },
            { label: "PIN", href: "/caregiver/auth/pin" },
            { label: "Reset PIN", href: "/caregiver/auth/reset-pin" },
          ],
          [
            { label: "Children", href: "/caregiver/children" },
            { label: "Attendance", href: "/caregiver/attendance" },
            { label: "Scan", href: "/caregiver/scan" },
            { label: "Report", href: "/caregiver/report" },
            { label: "Tasks", href: "/caregiver/tasks" },
          ],
          [
            { label: "Announcements", href: "/caregiver/announcements" },
            { label: "Chat", href: "/caregiver/chat" },
            { label: "Events", href: "/caregiver/events" },
            { label: "Gallery", href: "/caregiver/gallery" },
            { label: "Notifications", href: "/caregiver/notifications" },
          ],
          [
            { label: "Fees", href: "/caregiver/fees" },
            { label: "Incidents", href: "/caregiver/incidents" },
            { label: "Medication", href: "/caregiver/medication" },
            { label: "Ratings", href: "/caregiver/ratings" },
          ],
          [
            { label: "Settings", href: "/caregiver/settings" },
            { label: "Profile", href: "/caregiver/settings/profile" },
            { label: "PIN Settings", href: "/caregiver/settings/pin" },
            { label: "Help", href: "/caregiver/settings/help" },
          ],
        ],
      },
      {
        label: "v2 — reimagined",
        meta: "Next.js · /caregiver",
        href: "/caregiver/today",
        rows: [
          [
            { label: "Today", href: "/caregiver/today" },
            { label: "Chat", href: "/caregiver/chat" },
            { label: "Daily Report", href: "/caregiver/daily-report" },
            { label: "Calendar", href: "/caregiver/calendar" },
          ],
        ],
      },
    ],
  },
  {
    id: "independent-caregiver-app",
    title: "Independent Caregiver App",
    summary: {
      what: "The mobile app for independent caregivers who work outside a single crèche — manages their own schedule, clients, and daily reports.",
      entails: "Separate app from the crèche-bound caregiver. v2 is the first build in this codebase. Users are routed here during sign-up or invite based on their role.",
      missing: "v2 is in early development — core screens being built out.",
      improved: "New app — first working version, purpose-built for independent caregivers.",
    },
    versions: [
      {
        label: "v2 — first build",
        meta: "Next.js · /independent-caregiver",
        href: "/independent-caregiver",
        rows: [
          [
            { label: "Role-based routing: sign-up or invite routes independent caregivers here" },
          ],
        ],
      },
    ],
  },
  {
    id: "independent-tutor-app",
    title: "Independent Tutor App",
    summary: {
      what: "The mobile app for independent tutors who provide one-on-one or small-group sessions — manages sessions, progress tracking, and parent communication.",
      entails: "Separate app from the crèche-bound caregiver. v2 is the first build in this codebase. Users are routed here during sign-up or invite based on their role.",
      missing: "v2 is in early development — core screens being built out.",
      improved: "New app — first working version, purpose-built for independent tutors.",
    },
    versions: [
      {
        label: "v2 — first build",
        meta: "Next.js · /independent-tutor",
        href: "/independent-tutor",
        rows: [
          [
            { label: "Role-based routing: sign-up or invite routes independent tutors here" },
          ],
        ],
      },
    ],
  },
  {
    id: "website",
    title: "Website",
    summary: {
      what: "CEven's public marketing site.",
      entails: "Home, audience-specific landing pages, company info, contact, and legal pages.",
      missing: "Single version — no v1/v2/v3 split for the website.",
      improved: "N/A — first and only build so far.",
    },
    versions: [
      {
        label: "Public site",
        meta: "Next.js · /",
        href: "/",
        rows: [
          [
            { label: "Home", href: "/" },
            { label: "For Parents", href: "/for-parents" },
            { label: "For Crèches", href: "/for-creches" },
            { label: "About", href: "/about" },
          ],
          [
            { label: "Contact", href: "/contact" },
            { label: "Data & Children", href: "/data-and-children" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Terms of Service", href: "/terms-of-service" },
          ],
        ],
      },
    ],
  },
];

const NAV_CARDS = [
  { id: "design-system", eyebrow: "Design System", desc: "Foundations & components · /library" },
  { id: "super-admin", eyebrow: "Super Admin", desc: "Platform console · /super-admin" },
  { id: "creche-admin", eyebrow: "Crèche Admin", desc: "Operator dashboard · v1, v2, v3" },
  { id: "parent-app", eyebrow: "Parent App", desc: "Family mobile app · v1, v2" },
  { id: "caregiver-app", eyebrow: "Caregiver App", desc: "Crèche staff app · v1, v2" },
  { id: "independent-caregiver-app", eyebrow: "Independent Caregiver", desc: "Independent caregiver app · v2" },
  { id: "independent-tutor-app", eyebrow: "Independent Tutor", desc: "Independent tutor app · v2" },
  { id: "website", eyebrow: "Website", desc: "Marketing site · public pages" },
];

function SummaryBlock({ summary }: { summary: Summary }) {
  const rows: { label: string; text: string }[] = [
    { label: "What", text: summary.what },
    { label: "Entails", text: summary.entails },
    { label: "Missing", text: summary.missing },
    { label: "Improved", text: summary.improved },
  ];
  return (
    <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-card-border bg-white p-5">
      {rows.map((row) => (
        <p key={row.label} className="text-sm leading-relaxed">
          <span className="font-bold text-brand-accent">{row.label}: </span>
          <span className="text-muted-text">{row.text}</span>
        </p>
      ))}
    </div>
  );
}

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-content-bg px-6 py-12 font-[family-name:var(--font-nunito)] text-heading sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <p className="font-[family-name:var(--font-mogra)] text-2xl text-brand-dark">CEven</p>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
          App versions
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-text">
          Every screen across the design system, super admin, crèche admin, parent, and caregiver
          apps, plus the marketing site — grouped by version, with a short summary of what each one
          is, what it covers, what&apos;s missing, and what improved over the last version.
          Versions that are live on the app store are not listed here.
        </p>

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-card-border bg-white px-4 py-3 text-sm">
          <span className="text-muted-text">Last updated:</span>
          <span className="font-bold text-heading">5 Aug 2026</span>
          <span className="text-muted-text">—</span>
          <span className="text-muted-text">
            Removed app-store v1s, renumbered v2→v1 &amp; v3→v2 for Parent &amp; Caregiver, added CTA buttons, split caregiver into 3 separate apps (caregiver, independent caregiver, independent tutor)
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_CARDS.map((card) => (
            <a
              key={card.id}
              href={`#${card.id}`}
              className="rounded-2xl border border-card-border bg-white p-5 transition-colors hover:border-brand-accent"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-brand-accent">
                {card.eyebrow}
              </p>
              <p className="mt-1.5 text-sm text-muted-text">{card.desc}</p>
            </a>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="border-b-2 border-brand-dark pb-3 text-2xl font-extrabold text-heading">
            Overview
          </h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-card-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-card-border bg-gray-50">
                  <th className="px-4 py-3 font-bold text-heading">App</th>
                  <th className="px-4 py-3 font-bold text-heading">Version</th>
                  <th className="px-4 py-3 font-bold text-heading">Description</th>
                  <th className="px-4 py-3 font-bold text-heading">CTA</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { app: "Super Admin", version: "v1", desc: "Platform console for internal operators", href: "/super-admin/dashboard" },
                  { app: "Crèche Admin", version: "v1", desc: "Original crèche operator dashboard", href: "/admin/v1/dashboard" },
                  { app: "Crèche Admin", version: "v2", desc: "Full operating system — payroll, compliance, AI, financials", href: "/admin/v2/dashboard" },
                  { app: "Crèche Admin", version: "v3", desc: "CEO reimagining — new visual direction", href: "/admin/v3" },
                  { app: "Parent App", version: "v1", desc: "Current build — AI assistant, settings, health/growth tracking", href: "/parent/home" },
                  { app: "Parent App", version: "v2", desc: "Parent ↔ independent caregiver reimagining", href: "/parentv2/home" },
                  { app: "Caregiver App", version: "v1", desc: "Crèche-staff build — daily workflows, ratings, settings", href: "/caregiver/home" },
                  { app: "Caregiver App", version: "v2", desc: "Reimagined caregiver experience", href: "/caregiver/today" },
                  { app: "Independent Caregiver", version: "v2", desc: "First build for independent caregivers", href: "/independent-caregiver" },
                  { app: "Independent Tutor", version: "v2", desc: "First build for independent tutors", href: "/independent-tutor" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-card-border last:border-0">
                    <td className="px-4 py-3 font-semibold text-heading">{row.app}</td>
                    <td className="px-4 py-3 text-muted-text">{row.version}</td>
                    <td className="px-4 py-3 text-muted-text">{row.desc}</td>
                    <td className="px-4 py-3">
                      <a
                        href={row.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-brand-dark px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand-accent"
                      >
                        Open →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {APP_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="mt-16 scroll-mt-8">
            <h2 className="border-b-2 border-brand-dark pb-3 text-2xl font-extrabold text-heading">
              {section.title}
            </h2>

            <SummaryBlock summary={section.summary} />

            <div className="mt-8 flex flex-col gap-10">
              {section.versions.map((version) => (
                <div key={version.label}>
                  <h3 className="text-lg font-bold text-brand-dark">
                    {version.href ? (
                      <Link href={version.href} className="hover:underline">
                        {version.label}
                      </Link>
                    ) : (
                      version.label
                    )}
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-text">{version.meta}</p>
                  {version.note && (
                    <p className="mt-0.5 text-xs italic text-muted-text">{version.note}</p>
                  )}

                  <div className="mt-4 flex flex-col gap-2.5">
                    {version.rows.map((row, i) => (
                      <p key={i} className="text-sm leading-relaxed">
                        {row.map((screen, j) => (
                          <span key={screen.label}>
                            {screen.href ? (
                              <Link
                                href={screen.href}
                                className="font-semibold text-heading hover:text-brand-accent hover:underline"
                              >
                                {screen.label}
                              </Link>
                            ) : (
                              <span className="text-muted-text">{screen.label}</span>
                            )}
                            {j < row.length - 1 && <span className="text-muted-text">, </span>}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>

                  {version.href && (
                    <a
                      href={version.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand-dark px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-accent"
                    >
                      Open {section.title} {version.label.split(" — ")[0]} →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
