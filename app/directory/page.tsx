import Link from "next/link";

type Screen = { label: string; href?: string };
type VersionBlock = {
  label: string;
  meta: string;
  href: string;
  rows: Screen[][];
};
type AppSection = {
  id: string;
  title: string;
  versions: VersionBlock[];
};

const APP_SECTIONS: AppSection[] = [
  {
    id: "admin",
    title: "Admin",
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
        label: "v3 — CEO reimagining (static prototype)",
        meta: "Standalone HTML · /admin/v3",
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
    id: "parent",
    title: "Parent",
    versions: [
      {
        label: "Current",
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
        label: "v3 — reimagined family app",
        meta: "Next.js · /parentv3",
        href: "/parentv3/home",
        rows: [
          [
            { label: "Home", href: "/parentv3/home" },
            { label: "Chat", href: "/parentv3/chat" },
            { label: "Food Timetable", href: "/parentv3/food-timetable" },
            { label: "Calendar", href: "/parentv3/calendar" },
          ],
        ],
      },
    ],
  },
  {
    id: "caregiver",
    title: "Caregiver",
    versions: [
      {
        label: "Current",
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
        label: "v3 — reimagined staff app",
        meta: "Next.js · /caregiverv3",
        href: "/caregiverv3/today",
        rows: [
          [
            { label: "Today", href: "/caregiverv3/today" },
            { label: "Chat", href: "/caregiverv3/chat" },
            { label: "Daily Report", href: "/caregiverv3/daily-report" },
            { label: "Calendar", href: "/caregiverv3/calendar" },
          ],
        ],
      },
    ],
  },
  {
    id: "design-system",
    title: "Design System",
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
    id: "website",
    title: "Marketing Website",
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
  { id: "admin", eyebrow: "Admin", desc: "Crèche operator dashboard · v1, v2, v3" },
  { id: "parent", eyebrow: "Parent", desc: "Family mobile app · current + v3" },
  { id: "caregiver", eyebrow: "Caregiver", desc: "Staff mobile app · current + v3" },
  { id: "design-system", eyebrow: "Design System", desc: "Foundations & components · /library" },
  { id: "website", eyebrow: "Website", desc: "Marketing site · public pages" },
];

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-content-bg px-6 py-12 font-[family-name:var(--font-nunito)] text-heading sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <p className="font-[family-name:var(--font-mogra)] text-2xl text-brand-dark">CEven</p>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
          App versions, v1–v3
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-text">
          Every screen across the admin, parent, and caregiver apps, grouped by version, plus the
          design system and marketing site. Built screens link out below; the rest are listed as
          reference.
        </p>

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

        {APP_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="mt-16 scroll-mt-8">
            <h2 className="border-b-2 border-brand-dark pb-3 text-2xl font-extrabold text-heading">
              {section.title}
            </h2>

            <div className="mt-8 flex flex-col gap-10">
              {section.versions.map((version) => (
                <div key={version.label}>
                  <h3 className="text-lg font-bold text-brand-dark">
                    <Link href={version.href} className="hover:underline">
                      {version.label}
                    </Link>
                  </h3>
                  <p className="mt-0.5 text-xs text-muted-text">{version.meta}</p>

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
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
