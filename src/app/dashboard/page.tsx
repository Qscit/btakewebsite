"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookingChart from "@/component/Dashboard/BookingChart";
import Dashboard from "@/component/Dashboard/Dashboard";
import DetailsCountCard from "@/component/Dashboard/DetailsCountCard";
import ProtectedRoute from "@/component/ProtectedRoute";

import { fetchDashboard } from "@/features/dashboard/dashboardActions";
import { Dashboard as DashboardType } from "@/model/dashboard/dashboard.model";
import RoomOccupency from "@/component/Dashboard/RoomOccupency";
interface RootState {
  dashboard: {
    data: DashboardType | null;
    loading: boolean;
    error: boolean;
  };
}
export default function AdminDashboard() {
  const dispatch = useDispatch<any>();

  const { data, loading } = useSelector(
    (state: any) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboard());
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      {/* <div className="flex justify-evenly mt-30">
        <DetailsCountCard
          title="Total Booking"
          count={data?.totalBooking || 0}
        />

        <DetailsCountCard
          title="Total Rooms"
          count={data?.totalRoom || 0}
        />

        <DetailsCountCard
          title="Revenue"
          count={data?.totalRevenue || 0}
        />

        <DetailsCountCard
          title="Pending Payment"
          count={data?.pendingPayment || 0}
        />
      </div> */}
<div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:gap-5">
  <DetailsCountCard title="Total Bookings" count={1240} icon="📅" trend="up" />
  <DetailsCountCard title="Total Rooms"   count={87}   icon="🛏️" />
  <DetailsCountCard title="Revenue Today"   count={312}  icon="👥" trend="neutral" />
  <DetailsCountCard title="Pending"  count={12}   icon="❌" trend="down" />
</div>
      {/* <div className="flex items-stretch gap-5 mt-8 px-5 w-full"> */}
  
  {/* <div className="flex-1 min-w-0 flex flex-col"> */}
    <div className="m-10 space-y-8">
  <BookingChart
    data={
      data?.monthlyBookings?.map((item: { month: string; total: number }) => ({
        month: item.month,
        total: item.total,
      })) || []
    }
  />
  <RoomOccupency data={data?.roomOccupancies || []} />
</div>

    </ProtectedRoute>
  );
}