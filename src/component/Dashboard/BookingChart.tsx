"use client";

import { useState, useMemo } from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis, Legend,
} from "recharts";

export interface MonthlyBookingDTO {
  month: string;
  total: number;
}

type ChartType = "line" | "bar" | "area";

const CHART_OPTIONS: { type: ChartType; label: string; icon: React.ReactNode }[] = [
  {
    type: "line",
    label: "Trend",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="1,12 5,7 9,9 15,3" />
      </svg>
    ),
  },
  {
    type: "bar",
    label: "Compare",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
        <rect x="1" y="6" width="3" height="9" rx="1" />
        <rect x="6" y="3" width="3" height="12" rx="1" />
        <rect x="11" y="8" width="3" height="7" rx="1" />
      </svg>
    ),
  },
  {
    type: "area",
    label: "Volume",
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="1,12 5,6 9,8 15,2" />
        <polygon points="1,12 5,6 9,8 15,2 15,14 1,14" fill="currentColor" opacity="0.3" stroke="none" />
      </svg>
    ),
  },
];

const TOOLTIP_STYLE = {
  borderRadius: "12px",
  border: "none",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  fontSize: "13px",
  padding: "10px 14px",
};

export default function BookingChart({ data }: { data: MonthlyBookingDTO[] }) {
  const [chartType, setChartType] = useState<ChartType>("line");

  const formattedData = useMemo(
    () =>
      data?.map((item) => ({
        month: item.month,
        total: Number(item.total) ?? 0,
      })) || [],
    [data]
  );

  const total = useMemo(() => formattedData.reduce((s, d) => s + d.total, 0), [formattedData]);
  const peak  = useMemo(() => Math.max(...formattedData.map((d) => d.total)), [formattedData]);
  const avg   = useMemo(() =>
    formattedData.length ? Math.round(total / formattedData.length) : 0,
    [total, formattedData]
  );

  const commonAxisProps = {
    tick: { fontSize: 12, fill: "#9ca3af" },
    axisLine: false as const,
    tickLine: false as const,
  };

  const commonChart = {
    data: formattedData,
    margin: { top: 10, right: 10, left: -10, bottom: 0 },
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 w-full">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-none">
            Monthly Bookings
          </h3>
          <p className="text-xs text-gray-400 mt-1">Full year booking performance</p>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 self-start">
          {CHART_OPTIONS.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                chartType === type
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Stat pills ── */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        {[
          { label: "Total",    value: total.toLocaleString(), color: "bg-blue-50 text-blue-700" },
          { label: "Peak",     value: peak.toLocaleString(),  color: "bg-emerald-50 text-emerald-700" },
          { label: "Monthly avg", value: avg.toLocaleString(),  color: "bg-violet-50 text-violet-700" },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl px-3 py-2.5 text-center ${s.color}`}>
            <p className="text-[10px] font-medium uppercase tracking-wider opacity-70">{s.label}</p>
            <p className="text-base sm:text-lg font-bold mt-0.5 leading-none">{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Chart ── */}
      <ResponsiveContainer width="100%" height={300}>
        {chartType === "line" ? (
          <LineChart {...commonChart}>
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" {...commonAxisProps} />
            <YAxis allowDecimals={false} {...commonAxisProps} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Line
              type="monotone"
              dataKey="total"
              name="Bookings"
              stroke="url(#lineGrad)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#2563eb" }}
              isAnimationActive
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </LineChart>

        ) : chartType === "bar" ? (
          <BarChart {...commonChart} barCategoryGap="35%">
            <defs>
              <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
            <XAxis dataKey="month" {...commonAxisProps} />
            <YAxis allowDecimals={false} {...commonAxisProps} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "rgba(59,130,246,0.06)" }} />
            <Bar
              dataKey="total"
              name="Bookings"
              fill="url(#barGrad)"
              radius={[6, 6, 0, 0]}
              isAnimationActive
              animationDuration={900}
              animationEasing="ease-out"
            />
          </BarChart>

        ) : (
          <AreaChart {...commonChart}>
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="month" {...commonAxisProps} />
            <YAxis allowDecimals={false} {...commonAxisProps} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Area
              type="monotone"
              dataKey="total"
              name="Bookings"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#areaGrad)"
              dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#2563eb" }}
              isAnimationActive
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}