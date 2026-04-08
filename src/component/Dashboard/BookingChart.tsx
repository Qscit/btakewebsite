"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface MonthlyBookingDTO {
  month: string;
  total: number;
}

export default function BookingChart({ data }: { data: MonthlyBookingDTO[] }) {
  const formattedData =
    data?.map((item) => ({
      month: item.month,
      total: Number(item.total) ?? 0,
    })) || [];

  return (
    <ChartCard title="Monthly Bookings">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={formattedData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#e5e7eb" }}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />

          <Line
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#2563eb" }}
            isAnimationActive={true}        // ✅ animate on load
            animationDuration={1200}        // 1.2s smooth draw
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
 </ChartCard>
  );
}
function ChartCard({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: 20,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
}