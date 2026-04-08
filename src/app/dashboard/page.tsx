"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BookingChart from "@/component/Dashboard/BookingChart";
import DetailsCountCard from "@/component/Dashboard/DetailsCountCard";
import ProtectedRoute from "@/component/ProtectedRoute";
import RoomOccupency from "@/component/Dashboard/RoomOccupency";
import BookingTenantTable from "@/component/Dashboard/TenantCard";

import { fetchDashboard } from "@/features/dashboard/dashboardActions";
import { BookingTenant } from "@/model/dashboard/bookingtenent.model";
import SettlementChart from "@/component/Dashboard/Settlement";

// ── Sample Data ─────────────────────────────────────────────────────────────
// const SAMPLE_TENANTS: BookingTenant[] = [
//   {
//     bookingId: "BK-001",
//     userName: "Arjun Sharma",
//     userEmail: "arjun.sharma@email.com",
//     userPhoneNumber: "9876543210",
//     roomName: "Room 101",
//     bookingStatus: "CONFIRMED",
//     bookingType: "MONTHLY",
//     tenantType: "BOYS",
//     checkInDate: "2024-01-01",
//     checkOutDate: null,
//     includeFood: "YES",
//     monthlyRent: 8000,
//     advanceDeposit: 16000,
//     occupiedBed: 2,
//     totalBed: 4,
//     lastSixMonthsRent: ["Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024", "Jun-2024"],
//   },
//   {
//     bookingId: "BK-002",
//     userName: "Priya Mehta",
//     userEmail: "priya.mehta@email.com",
//     userPhoneNumber: "9123456780",
//     roomName: "Room 202",
//     bookingStatus: "CONFIRMED",
//     bookingType: "MONTHLY",
//     tenantType: "GIRLS",
//     checkInDate: "2024-02-15",
//     checkOutDate: null,
//     includeFood: "NO",
//     monthlyRent: 7500,
//     advanceDeposit: 15000,
//     occupiedBed: 1,
//     totalBed: 2,
//     lastSixMonthsRent: ["Feb-2024", "Mar-2024", "Apr-2024", "May-2024", "Jun-2024"],
//   },
//   {
//     bookingId: "BK-003",
//     userName: "Ramesh & Family",
//     userEmail: "ramesh.family@email.com",
//     userPhoneNumber: "9988776655",
//     roomName: "Room 305",
//     bookingStatus: "PENDING",
//     bookingType: "MONTHLY",
//     tenantType: "FAMILY",
//     checkInDate: "2024-03-01",
//     checkOutDate: null,
//     includeFood: "YES",
//     monthlyRent: 12000,
//     advanceDeposit: 24000,
//     occupiedBed: 3,
//     totalBed: 3,
//     lastSixMonthsRent: ["Mar-2024", "Apr-2024", "May-2024"],
//   },
//   {
//     bookingId: "BK-004",
//     userName: "Kiran Patel",
//     userEmail: "kiran.patel@email.com",
//     userPhoneNumber: "9765432109",
//     roomName: "Room 104",
//     bookingStatus: "CANCELLED",
//     bookingType: "DAILY",
//     tenantType: "BOYS",
//     checkInDate: "2024-04-10",
//     checkOutDate: "2024-04-20",
//     includeFood: "NO",
//     monthlyRent: 500,
//     advanceDeposit: 2000,
//     occupiedBed: 1,
//     totalBed: 4,
//     lastSixMonthsRent: [],
//   },
//   {
//     bookingId: "BK-005",
//     userName: "Sneha Iyer",
//     userEmail: "sneha.iyer@email.com",
//     userPhoneNumber: "9654321098",
//     roomName: "Room 210",
//     bookingStatus: "CONFIRMED",
//     bookingType: "MONTHLY",
//     tenantType: "GIRLS",
//     checkInDate: "2024-01-15",
//     checkOutDate: null,
//     includeFood: "YES",
//     monthlyRent: 9000,
//     advanceDeposit: 18000,
//     occupiedBed: 2,
//     totalBed: 2,
//     lastSixMonthsRent: ["Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024", "Jun-2024"],
//   },
//   {
//     bookingId: "BK-006",
//     userName: "Deepak Verma",
//     userEmail: "deepak.verma@email.com",
//     userPhoneNumber: "9543210987",
//     roomName: "Room 108",
//     bookingStatus: "CONFIRMED",
//     bookingType: "MONTHLY",
//     tenantType: "BOYS",
//     checkInDate: "2024-05-01",
//     checkOutDate: null,
//     includeFood: "NO",
//     monthlyRent: 6500,
//     advanceDeposit: 13000,
//     occupiedBed: 1,
//     totalBed: 3,
//     lastSixMonthsRent: ["May-2024", "Jun-2024"],
//   },
//   {
//     bookingId: "BK-007",
//     userName: "Anita & Family",
//     userEmail: "anita.family@email.com",
//     userPhoneNumber: "9432109876",
//     roomName: "Room 401",
//     bookingStatus: "PENDING",
//     bookingType: "MONTHLY",
//     tenantType: "FAMILY",
//     checkInDate: "2024-06-01",
//     checkOutDate: null,
//     includeFood: "YES",
//     monthlyRent: 14000,
//     advanceDeposit: 28000,
//     occupiedBed: 4,
//     totalBed: 4,
//     lastSixMonthsRent: ["Jun-2024"],
//   },
//   {
//     bookingId: "BK-008",
//     userName: "Vikram Singh",
//     userEmail: "vikram.singh@email.com",
//     userPhoneNumber: "9321098765",
//     roomName: "Room 203",
//     bookingStatus: "CONFIRMED",
//     bookingType: "DAILY",
//     tenantType: "BOYS",
//     checkInDate: "2024-06-10",
//     checkOutDate: "2024-06-20",
//     includeFood: "NO",
//     monthlyRent: 600,
//     advanceDeposit: 3000,
//     occupiedBed: 1,
//     totalBed: 2,
//     lastSixMonthsRent: [],
//   },
//   {
//     bookingId: "BK-009",
//     userName: "Meera Nair",
//     userEmail: "meera.nair@email.com",
//     userPhoneNumber: "9210987654",
//     roomName: "Room 312",
//     bookingStatus: "CONFIRMED",
//     bookingType: "MONTHLY",
//     tenantType: "GIRLS",
//     checkInDate: "2024-03-15",
//     checkOutDate: null,
//     includeFood: "YES",
//     monthlyRent: 8500,
//     advanceDeposit: 17000,
//     occupiedBed: 1,
//     totalBed: 2,
//     lastSixMonthsRent: ["Mar-2024", "Apr-2024", "May-2024", "Jun-2024"],
//   },
//   {
//     bookingId: "BK-010",
//     userName: "Suresh Kumar",
//     userEmail: "suresh.kumar@email.com",
//     userPhoneNumber: "9109876543",
//     roomName: "Room 115",
//     bookingStatus: "CANCELLED",
//     bookingType: "MONTHLY",
//     tenantType: "BOYS",
//     checkInDate: "2024-02-01",
//     checkOutDate: "2024-04-30",
//     includeFood: "NO",
//     monthlyRent: 7000,
//     advanceDeposit: 14000,
//     occupiedBed: 0,
//     totalBed: 3,
//     lastSixMonthsRent: ["Feb-2024", "Mar-2024", "Apr-2024"],
//   },
//   {
//     bookingId: "BK-011",
//     userName: "Pooja Gupta",
//     userEmail: "pooja.gupta@email.com",
//     userPhoneNumber: "9098765432",
//     roomName: "Room 220",
//     bookingStatus: "CONFIRMED",
//     bookingType: "MONTHLY",
//     tenantType: "GIRLS",
//     checkInDate: "2024-04-01",
//     checkOutDate: null,
//     includeFood: "YES",
//     monthlyRent: 9500,
//     advanceDeposit: 19000,
//     occupiedBed: 2,
//     totalBed: 3,
//     lastSixMonthsRent: ["Apr-2024", "May-2024", "Jun-2024"],
//   },
//   {
//     bookingId: "BK-012",
//     userName: "Rahul & Family",
//     userEmail: "rahul.family@email.com",
//     userPhoneNumber: "9987654321",
//     roomName: "Room 502",
//     bookingStatus: "CONFIRMED",
//     bookingType: "MONTHLY",
//     tenantType: "FAMILY",
//     checkInDate: "2024-01-20",
//     checkOutDate: null,
//     includeFood: "YES",
//     monthlyRent: 15000,
//     advanceDeposit: 30000,
//     occupiedBed: 3,
//     totalBed: 4,
//     lastSixMonthsRent: ["Jan-2024", "Feb-2024", "Mar-2024", "Apr-2024", "May-2024", "Jun-2024"],
//   },
// ];

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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
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

        <div className="flex gap-6">
              <SettlementChart />
              <SettlementChart />
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
          <RoomOccupency
            data={
              data?.roomOccupancies 
            }
          />
        </div>

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