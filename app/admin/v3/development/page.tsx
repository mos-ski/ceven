"use client";

import { CheckCircle2, Eye, ShieldAlert, ClipboardList } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { CHILDREN } from "@/lib/mock-data/children";

// No v2 component or mock data exists for child development yet. Stats and per-child
// milestone focus below are derived deterministically from real CHILDREN fields
// (age, room, healthFlag) rather than invented outright — kept intentionally modest
// per the build brief, since there's no v2 precedent to reuse.

const MILESTONE_BY_AGE: Record<string, string> = {
  "2 years": "Says 50+ words · builds a 4-block tower",
  "3 years": "Uses 3-word sentences · follows 2-step instructions",
  "4 years": "Counts to 10 · hops on one foot",
  "5 years": "Prints some letters · catches a bounced ball",
};

type DevStatus = "On Track" | "Monitoring";

const DEVELOPMENT_ROWS = CHILDREN.map((child) => {
  const status: DevStatus = child.healthFlag ? "Monitoring" : "On Track";
  return {
    child,
    milestone: MILESTONE_BY_AGE[child.age] ?? "General development check-in",
    status,
  };
});

const ON_TRACK = DEVELOPMENT_ROWS.filter((r) => r.status === "On Track").length;
const MONITORING = DEVELOPMENT_ROWS.filter((r) => r.status === "Monitoring").length;
// No SEND (Special Educational Needs & Disabilities) flag exists anywhere in the mock
// data, so this is honestly reported as zero rather than fabricated.
const SEND_REVIEW = 0;
// "Observations this week" has no backing data source — approximated at 3 logged
// observations per enrolled child, mirroring CHILDREN_STATS.averageActivityLog's role
// on the Children page.
const OBSERVATIONS_THIS_WEEK = CHILDREN.length * 3;

const STATUS_BADGE_CLASS: Record<DevStatus, string> = {
  "On Track": "bg-[#2A8A52]/10 text-[#2A8A52]",
  Monitoring: "bg-[#C47B2C]/10 text-[#C47B2C]",
};

function StatCard({
  Icon,
  label,
  value,
  sub,
}: {
  Icon: typeof CheckCircle2;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <Card padding="compact" className="relative overflow-hidden">
      <p className="text-xs font-bold uppercase tracking-wide text-[#2D1810]/50">{label}</p>
      <p className="mt-1.5 font-[family-name:var(--font-merriweather)] text-[1.85rem] font-bold leading-none text-[#2D1810]">
        {value}
      </p>
      <p className="mt-1.5 text-[11px] text-[#2D1810]/60">{sub}</p>
      <Icon className="pointer-events-none absolute right-3 top-3 h-6 w-6 text-[#2D1810]/10" />
    </Card>
  );
}

export default function DevelopmentV3Page() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-[family-name:var(--font-merriweather)] text-2xl font-bold text-[#2D1810]">
          Child Development
        </h1>
        <p className="mt-1 text-sm text-[#2D1810]/60">
          Milestone tracking and observations across every enrolled child.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard Icon={CheckCircle2} label="On Track" value={String(ON_TRACK).padStart(2, "0")} sub="No flags raised" />
        <StatCard Icon={Eye} label="Monitoring" value={String(MONITORING).padStart(2, "0")} sub="Health flag on file" />
        <StatCard Icon={ShieldAlert} label="SEND Review" value={String(SEND_REVIEW).padStart(2, "0")} sub="No cases flagged" />
        <StatCard Icon={ClipboardList} label="Observations This Week" value={String(OBSERVATIONS_THIS_WEEK).padStart(2, "0")} sub="Logged by caregivers" />
      </div>

      <Card>
        <h2 className="mb-4 font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2D1810]">
          Milestones
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Child</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Milestone Focus</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEVELOPMENT_ROWS.map(({ child, milestone, status }) => (
              <TableRow key={child.id}>
                <TableCell className="font-semibold text-[#2D1810]">{child.name}</TableCell>
                <TableCell>{child.age}</TableCell>
                <TableCell>{child.room}</TableCell>
                <TableCell>{milestone}</TableCell>
                <TableCell>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE_CLASS[status]}`}>
                    {status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
