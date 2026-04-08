"use client";

import { useState } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";

import { RoomOccupancy } from "@/model/dashboard/dashboard.model";

interface Props {
  data: RoomOccupancy[];
}

export default function RoomOccupancyChart({ data }: Props) {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  return (
    <ChartCard
      title="Room Occupancy"
      chartType={chartType}
      onToggle={setChartType}
    >
      <ResponsiveContainer width="100%" height={350}>
        {chartType === "bar" ? (
          <BarChart data={data} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="roomType"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                fontSize: "13px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "13px", paddingTop: "12px" }} />
            <Bar dataKey="occupied"  stackId="a" fill="#6366f1" name="Occupied"  radius={[0, 0, 0, 0]} />
            <Bar dataKey="available" stackId="a" fill="#a5f3a0" name="Available" radius={[6, 6, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="roomType"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                fontSize: "13px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "13px", paddingTop: "12px" }} />
            <Line
              type="monotone"
              dataKey="occupied"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
              activeDot={{ r: 7 }}
              name="Occupied"
            />
            <Line
              type="monotone"
              dataKey="available"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={{ r: 5, fill: "#22c55e", strokeWidth: 0 }}
              activeDot={{ r: 7 }}
              name="Available"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ChartCard({
  title,
  chartType,
  onToggle,
  children,
}: {
  title: string;
  chartType: "bar" | "line";
  onToggle: (type: "bar" | "line") => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 w-full">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-none">
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Occupied vs Available rooms</p>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => onToggle("bar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              chartType === "bar"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {/* Bar icon */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="6" width="3" height="9" rx="1"/>
              <rect x="6" y="3" width="3" height="12" rx="1"/>
              <rect x="11" y="8" width="3" height="7" rx="1"/>
            </svg>
            Bar
          </button>

          <button
            onClick={() => onToggle("line")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              chartType === "line"
                ? "bg-white text-indigo-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {/* Line icon */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="1,12 5,7 9,9 15,3"/>
            </svg>
            Line
          </button>
        </div>
      </div>

      {children}
    </div>
  );
}