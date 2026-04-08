"use client";
import { Card } from "@/components/ui/card";

export default function DetailsCountCard({
  title,
  count,
  icon,
  trend,
}: {
  title: string;
  count: number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}) {
  const trendConfig = {
    up:      { label: "Increasing", icon: "▲", className: "bg-emerald-50 text-emerald-600" },
    down:    { label: "Decreasing", icon: "▼", className: "bg-red-50 text-red-500" },
    neutral: { label: "Stable",     icon: "●", className: "bg-gray-100 text-gray-500" },
  };

  return (
    <Card className="relative overflow-hidden w-full p-4 sm:p-5 md:p-6 rounded-2xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default">

      {/* Left accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl bg-gradient-to-b from-emerald-400 to-emerald-600" />

      {/* Top glow */}
      <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

      <div className="flex flex-col gap-2 pl-2">

        {/* Title row */}
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-gray-400 truncate">
            {title}
          </p>
          {icon && (
            <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-50 text-emerald-600 text-sm sm:text-base flex-shrink-0">
              {icon}
            </div>
          )}
        </div>

        {/* Count */}
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-none tracking-tight">
          {count.toLocaleString()}
        </p>

        {/* Trend badge */}
        {trend && (
          <span className={`inline-flex items-center gap-1 w-fit text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${trendConfig[trend].className}`}>
            {trendConfig[trend].icon} {trendConfig[trend].label}
          </span>
        )}

      </div>
    </Card>
  );
}


/* ─── Wrapper grid (use this in your page) ────────────────────────────────────
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-5">
      <DetailsCountCard title="Total Bookings" count={1240} icon="📅" trend="up" />
      <DetailsCountCard title="Active Rooms"   count={87}   icon="🛏️" />
      <DetailsCountCard title="Guests Today"   count={312}  icon="👥" trend="neutral" />
      <DetailsCountCard title="Cancellations"  count={12}   icon="❌" trend="down" />
    </div>
──────────────────────────────────────────────────────────────────────────── */