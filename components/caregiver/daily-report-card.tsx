import type { DailyReport } from "@/lib/caregiver/mock-data";
import { CalendarDays, Heart, UtensilsCrossed, Moon, Droplets, AlertTriangle, Pill } from "lucide-react";

type Props = { report: DailyReport };

type RowProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
  children: React.ReactNode;
};

function ReportRow({ icon, label, color, children }: RowProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl p-3" style={{ backgroundColor: color }}>
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <div className="mt-0.5 text-sm font-semibold text-cg-brand">{children}</div>
      </div>
    </div>
  );
}

export function DailyReportCard({ report }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {/* Date header */}
      <div className="flex items-center gap-2 rounded-xl bg-cg-brand px-4 py-3">
        <CalendarDays size={16} className="text-white" />
        <p className="text-sm font-semibold text-white">{report.date}</p>
      </div>

      <ReportRow icon={<Heart size={16} className="text-pink-400" />} label="Mood" color="#FFF0F8">
        <span>{report.mood.join("  ")}</span>
      </ReportRow>

      <ReportRow icon={<UtensilsCrossed size={16} className="text-amber-500" />} label="Meals" color="#FFF8EC">
        <span>{report.meals}</span>
      </ReportRow>

      <ReportRow icon={<Moon size={16} className="text-indigo-400" />} label="Nap Time" color="#F3F0FF">
        <div className="flex flex-col gap-1">
          {report.naps.map((nap, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <span>{nap.start} – {nap.end}</span>
              <span className="text-gray-400">≈</span>
              <span>{nap.duration}</span>
            </div>
          ))}
        </div>
      </ReportRow>

      <ReportRow icon={<Droplets size={16} className="text-teal-400" />} label="Hygiene" color="#EDFAF8">
        <span>{report.hygiene}</span>
      </ReportRow>

      <ReportRow icon={<AlertTriangle size={16} className="text-orange-400" />} label="Health &amp; Safety" color="#FFF6EC">
        <span>{report.healthSafety}</span>
      </ReportRow>

      <ReportRow icon={<Pill size={16} className="text-purple-400" />} label="Medications" color="#F8F0FF">
        <span>{report.medications}</span>
      </ReportRow>

      {/* Photos */}
      {report.photos.map((photo, i) => (
        <div key={i} className="overflow-hidden rounded-xl">
          <div className="relative h-44 w-full bg-gray-200">
            <div className="absolute left-2 top-2 rounded-md bg-cg-brand px-2 py-0.5 text-xs font-semibold text-white">
              {photo.label}
            </div>
            {/* Placeholder image area */}
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              📸 Playtime photo
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">{photo.caption}</p>
        </div>
      ))}
    </div>
  );
}
