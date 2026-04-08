"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import { RoomOccupancy } from "@/model/dashboard/dashboard.model";

interface Props {
  data: RoomOccupancy[];
}

export default function RoomOccupancyChart({ data }: Props) {
  return (
    <ChartCard title="Room Occupancy">

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="roomType" />

          <YAxis />

          <Tooltip />

          <Legend />

          <Bar
            dataKey="occupied"
            stackId="a"
            fill="#8884d8"
            name="Occupied"
          />

          <Bar
            dataKey="available"
            stackId="a"
            fill="#82ca9d"
            name="Available"
          />

        </BarChart>
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