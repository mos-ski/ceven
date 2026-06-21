import { ChevronDown, Trophy } from "lucide-react";

import { LEADERBOARD } from "@/lib/mock-data/staff";

function RankBadge({ rank }: { rank: number }) {
  const medalColors: Record<number, string> = {
    1: "bg-[#fff6e6] text-[#cc8000] border border-[#cc8000]",
    2: "bg-[#f3f4f6] text-[#6b7280] border border-[#9ca3af]",
    3: "bg-[#fdf1e8] text-[#c47b2c] border border-[#c47b2c]",
  };
  const style = medalColors[rank];

  if (style) {
    return (
      <span
        className={`flex size-7 items-center justify-center rounded-full font-[family-name:var(--font-urbanist)] text-xs font-bold ${style}`}
      >
        {rank}
      </span>
    );
  }

  return (
    <span className="flex size-7 items-center justify-center rounded-full bg-[#f9fafb] font-[family-name:var(--font-urbanist)] text-xs font-bold text-[#6b7280]">
      {rank}
    </span>
  );
}

function ComplianceBar({ value }: { value: number }) {
  const color = value >= 80 ? "#009061" : value >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 rounded-full bg-[#f3f4f6]">
        <div
          className="h-1.5 rounded-full"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="font-[family-name:var(--font-nunito)] text-xs font-semibold" style={{ color }}>
        {value}%
      </span>
    </div>
  );
}

export function LeaderboardTab() {
  const topThree = LEADERBOARD.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Top 3 highlight cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {topThree.map((entry) => (
          <div
            key={entry.rank}
            className="rounded-xl border border-[#e6ebf3] bg-white p-4"
          >
            <div className="flex items-center justify-between">
              <RankBadge rank={entry.rank} />
              <Trophy className="size-4 text-[#c47b2c]" />
            </div>
            <p className="mt-3 font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#2d1810]">
              {entry.name}
            </p>
            <p className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">{entry.role}</p>
            <p className="mt-2 font-[family-name:var(--font-merriweather)] text-xl font-bold text-[#3b2513]">
              {entry.points}
              <span className="ml-1 font-[family-name:var(--font-nunito)] text-xs font-normal text-[#6b7280]">
                pts
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-[family-name:var(--font-merriweather)] text-lg font-bold text-[#2d1810]">
          Full Ranking
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs font-[family-name:var(--font-nunito)] text-[#6b7280]">
            Filter by:
          </span>
          <button className="flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-3 py-1.5 font-[family-name:var(--font-nunito)] text-xs">
            This Month
            <ChevronDown className="size-3" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#edd9c0]">
                {[
                  "Rank",
                  "Staff",
                  "Log Compliance",
                  "Attendance",
                  "Incidents Logged",
                  "Parent Rating",
                  "Points",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-xs font-semibold font-[family-name:var(--font-nunito)] text-[#2d1810]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaecf0]">
              {LEADERBOARD.map((entry) => (
                <tr key={entry.rank} className="hover:bg-[#faf9f7]">
                  <td className="px-4 py-3">
                    <RankBadge rank={entry.rank} />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                      {entry.name}
                    </p>
                    <p className="text-[10px] text-[#858c98]">{entry.role}</p>
                  </td>
                  <td className="px-4 py-3">
                    <ComplianceBar value={entry.logCompliance} />
                  </td>
                  <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                    {entry.attendanceScore}%
                  </td>
                  <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                    {entry.incidentsLogged}
                  </td>
                  <td className="px-4 py-3 text-sm font-[family-name:var(--font-nunito)] text-[#454b54]">
                    ★ {entry.parentRating}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold font-[family-name:var(--font-nunito)] text-[#3b2513]">
                    {entry.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile card list */}
        <div className="flex flex-col gap-2 p-4 lg:hidden">
          {LEADERBOARD.map((entry) => (
            <div key={entry.rank} className="rounded-xl border border-[#eaecf0] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RankBadge rank={entry.rank} />
                  <div>
                    <p className="text-sm font-bold font-[family-name:var(--font-nunito)] text-[#2d1810]">
                      {entry.name}
                    </p>
                    <p className="text-[10px] text-[#858c98]">{entry.role}</p>
                  </div>
                </div>
                <p className="font-[family-name:var(--font-merriweather)] text-sm font-bold text-[#3b2513]">
                  {entry.points} pts
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <ComplianceBar value={entry.logCompliance} />
                <span className="font-[family-name:var(--font-nunito)] text-xs text-[#6b7280]">
                  ★ {entry.parentRating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
