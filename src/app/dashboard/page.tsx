"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookingChart from "@/component/Dashboard/BookingChart";
import DetailsCountCard from "@/component/Dashboard/DetailsCountCard";
import ProtectedRoute from "@/component/ProtectedRoute";
import RoomOccupency from "@/component/Dashboard/RoomOccupency";
import BookingTenantTable from "@/component/Dashboard/TenantCard";

import { fetchDashboard } from "@/features/dashboard/dashboardActions";
import SettlementChart from "@/component/Dashboard/Settlement";



// ── Loading Skeleton ─────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-100 rounded-2xl" />
        ))}
      </div>
      <div className="h-72 bg-gray-100 rounded-2xl" />
      <div className="h-72 bg-gray-100 rounded-2xl" />
      <div className="h-96 bg-gray-100 rounded-2xl" />
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const dispatch = useDispatch<any>();

  const { data, loading } = useSelector((state: any) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, []);

  if (loading) return <LoadingSkeleton />;

  return (
    <ProtectedRoute>
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-8 max-w-screen-xl mx-auto">

        {/* ── Page header ── */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-400 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">Welcome back — here's what's happening today.</p>
        </div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 xl:gap-5">
          <DetailsCountCard
            title="Total Bookings"
            count={data?.totalBooking ?? 1240}
            icon="📅"
            trend="up"
          />
          <DetailsCountCard
            title="Total Rooms"
            count={data?.totalRoom ?? 87}
            icon="🛏️"
            trend="neutral"
          />
          <DetailsCountCard
            title="Revenue"
            count={data?.totalRevenue ?? 312000}
            icon="💰"
            trend="up"
          />
          <DetailsCountCard
            title="Pending"
            count={data?.pendingPayment ?? 12}
            icon="⏳"
            trend="down"
          />
        </div>

        {/* ── Charts ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          
          <BookingChart
            data={
              data?.monthlyBookings?.map((item: { month: string; total: number }) => ({
                month: item.month,
                total: item.total,
              }))
            }
          />
           <SettlementChart />
          
        </div>
        <RoomOccupency
            data={
              data?.roomOccupancies 
            }
          />


        {/* ── Tenant bookings table ── */}
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Tenant Bookings</h2>
            <p className="text-xs text-gray-400 mt-0.5">All active and past tenant records</p>
          </div>
          <BookingTenantTable />
        </div>

      
      </div>
      
    </ProtectedRoute>
  );
}