"use client";
import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

const bookingData = [
  { month: "Jan", bookings: 30 },
  { month: "Feb", bookings: 45 },
  { month: "Mar", bookings: 60 },
  { month: "Apr", bookings: 40 },
  { month: "May", bookings: 80 }
];

const occupancyData = [
  { room: "Single", occupied: 20 },
  { room: "Double", occupied: 35 },
  { room: "Triple", occupied: 15 },
  { room: "Dorm", occupied: 25 }
];

const paymentData = [
  { name: "Paid", value: 80 },
  { name: "Pending", value: 20 }
];

const COLORS = ["#00C49F", "#FF8042"];

export default function Dashboard() {
  return (
    <div style={{ padding: 60 }}>
      
      {/* Top Cards */}
      {/* <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
        <Card title="Total Tenants" value="120" />
        <Card title="Total Rooms" value="45" />
        <Card title="Revenue" value="₹2,40,000" />
        <Card title="Pending Payment" value="₹40,000" />
      </div> */}

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        
        {/* Booking Chart */}
        {/* <ChartCard title="Monthly Bookings">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard> */}

        {/* Room Occupancy */}
        <ChartCard title="Room Occupancy">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="room" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="occupied" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Payment Pie */}
        <ChartCard title="Payment Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {paymentData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}

/* Card Component */
function Card({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        flex: 1,
        padding: 20,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

/* Chart Card */
function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
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