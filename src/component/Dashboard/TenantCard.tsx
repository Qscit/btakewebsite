"use client";

import { fetchActiveTenants } from "@/features/activeTenant/activeTenantThunk";
import { AppDispatch, RootState } from "@/store/store";
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// ── Types ──────────────────────────────────────────────────────────────────
export type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED";
export type BookingType   = "MONTHLY" | "DAILY";
export type TenantType    = "BOYS" | "GIRLS" | "FAMILY";
export type IncludeFood   = "YES" | "NO";

export interface BookingTenant {
  advanceDeposit: number;
  bookingId: string;
  bookingStatus: BookingStatus;
  bookingType: BookingType;
  checkInDate: string;
  checkOutDate: string | null;
  includeFood: IncludeFood;
  lastSixMonthsRent: string[];
  monthlyRent: number;
  occupiedBed: number;
  roomName: string;
  tenantType: TenantType;
  totalBed: number;
  userEmail: string;
  userName: string;
  userPhoneNumber: string;
}

// ── Config ─────────────────────────────────────────────────────────────────
const ROOMS_PER_PAGE   = 5;
const TENANTS_PER_PAGE = 8;

const STATUS_BADGE: Record<BookingStatus, string> = {
  CONFIRMED: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  PENDING:   "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  CANCELLED: "bg-red-50 text-red-600 ring-1 ring-red-200",
};

const STATUS_ACCENT: Record<BookingStatus, string> = {
  CONFIRMED: "bg-emerald-400",
  PENDING:   "bg-amber-400",
  CANCELLED: "bg-red-400",
};

const STATUS_DOT: Record<BookingStatus, string> = {
  CONFIRMED: "bg-emerald-500",
  PENDING:   "bg-amber-400",
  CANCELLED: "bg-red-400",
};

const TENANT_BADGE: Record<TenantType, string> = {
  BOYS:   "bg-blue-50 text-blue-700",
  GIRLS:  "bg-pink-50 text-pink-700",
  FAMILY: "bg-violet-50 text-violet-700",
};

const TYPE_BADGE: Record<BookingType, string> = {
  MONTHLY: "bg-teal-50 text-teal-700",
  DAILY:   "bg-gray-100 text-gray-500",
};

// ── Helpers ────────────────────────────────────────────────────────────────
const fmt = (date: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })
    : "Present";

const currency = (n: number) => "₹" + n.toLocaleString("en-IN");

// ── Pagination Controls ─────────────────────────────────────────────────────
interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
  totalItems: number;
  itemsPerPage: number;
  label?: string;
}

function Pagination({ page, totalPages, onChange, totalItems, itemsPerPage, label = "items" }: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * itemsPerPage + 1;
  const end   = Math.min(page * itemsPerPage, totalItems);

  // Page window: first, last, current ±1, ellipsis gaps
  const pages: (number | "…")[] = [];
  const addPage = (n: number) => { if (!pages.includes(n)) pages.push(n); };
  addPage(1);
  if (page - 2 > 2) pages.push("…");
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) addPage(i);
  if (page + 2 < totalPages - 1) pages.push("…");
  if (totalPages > 1) addPage(totalPages);

  return (
    <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
      <span className="text-[10px] text-gray-400">
        {start}–{end} of {totalItems} {label}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="w-6 h-6 flex items-center justify-center text-[10px] text-gray-300">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className={`w-6 h-6 flex items-center justify-center rounded text-[11px] font-medium transition-colors ${
                page === p
                  ? "bg-gray-900 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Tenant Row ──────────────────────────────────────────────────────────────
function TenantRow({ tenant }: { tenant: BookingTenant }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-100">
      <td className="px-3 py-2 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className={`w-0.5 h-8 rounded-full flex-shrink-0 ${STATUS_ACCENT[tenant.bookingStatus]}`} />
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-800 leading-none truncate max-w-[140px]">{tenant.userName}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{tenant.userPhoneNumber}</p>
          </div>
        </div>
      </td>

      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`inline-flex px-1.5 py-0.5 rounded-md text-[10px] font-semibold ${STATUS_BADGE[tenant.bookingStatus]}`}>
          {tenant.bookingStatus.charAt(0) + tenant.bookingStatus.slice(1).toLowerCase()}
        </span>
      </td>

      <td className="px-3 py-2 whitespace-nowrap">
        <div className="flex gap-1">
          <span className={`inline-flex px-1.5 py-0.5 rounded-md text-[10px] font-medium ${TENANT_BADGE[tenant.tenantType]}`}>
            {tenant.tenantType}
          </span>
          <span className={`inline-flex px-1.5 py-0.5 rounded-md text-[10px] font-medium ${TYPE_BADGE[tenant.bookingType]}`}>
            {tenant.bookingType}
          </span>
        </div>
      </td>

      <td className="px-3 py-2 whitespace-nowrap">
        <span className={`inline-flex px-1.5 py-0.5 rounded-md text-[10px] font-medium ${
          tenant.includeFood === "YES" ? "bg-teal-50 text-teal-700" : "bg-gray-100 text-gray-400"
        }`}>
          {tenant.includeFood === "YES" ? "Yes" : "No"}
        </span>
      </td>

      <td className="px-3 py-2 whitespace-nowrap text-[11px] text-gray-500">{fmt(tenant.checkInDate)}</td>
      <td className="px-3 py-2 whitespace-nowrap text-[11px] text-gray-500">{fmt(tenant.checkOutDate)}</td>

      <td className="px-3 py-2 whitespace-nowrap text-[11px] font-semibold text-gray-700 tabular-nums">
        {currency(tenant.monthlyRent)}
      </td>

      <td className="px-3 py-2 whitespace-nowrap text-[11px] text-gray-500 tabular-nums">
        {currency(tenant.advanceDeposit)}
      </td>

      <td className="px-3 py-2">
        {tenant.lastSixMonthsRent.length > 0 ? (
          <div className="flex gap-1 flex-wrap">
            {tenant.lastSixMonthsRent.map((m, i) => (
              <span key={i} title={m} className="w-2 h-2 rounded-full bg-blue-400 opacity-70 hover:opacity-100 cursor-default block" />
            ))}
          </div>
        ) : (
          <span className="text-[10px] text-gray-300">—</span>
        )}
      </td>

      <td className="px-3 py-2 whitespace-nowrap">
        <span className="font-mono text-[10px] text-gray-300">{tenant.bookingId}</span>
      </td>
    </tr>
  );
}

// ── Room Group ──────────────────────────────────────────────────────────────
function RoomGroup({
  roomName,
  tenants,
  forceOpen,
}: {
  roomName: string;
  tenants: BookingTenant[];
  forceOpen: boolean;
}) {
  const [collapsed, setCollapsed]   = useState(false);
  const [tenantPage, setTenantPage] = useState(1);

  const isOpen       = forceOpen || !collapsed;
  const totalPages   = Math.ceil(tenants.length / TENANTS_PER_PAGE);
  const pagedTenants = tenants.slice((tenantPage - 1) * TENANTS_PER_PAGE, tenantPage * TENANTS_PER_PAGE);

  const occupied  = tenants[0]?.occupiedBed ?? 0;
  const total     = tenants[0]?.totalBed    ?? 0;
  const pct       = total > 0 ? Math.round((occupied / total) * 100) : 0;
  const confirmed = tenants.filter((t) => t.bookingStatus === "CONFIRMED").length;
  const pending   = tenants.filter((t) => t.bookingStatus === "PENDING").length;
  const cancelled = tenants.filter((t) => t.bookingStatus === "CANCELLED").length;

  const barColor = pct >= 90 ? "bg-red-400" : pct >= 60 ? "bg-amber-400" : "bg-emerald-400";

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Room header */}
      <button
        onClick={() => { setCollapsed((c) => !c); setTenantPage(1); }}
        className="w-full flex items-center gap-3 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors text-left border-b border-gray-100"
      >
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>

        <span className="text-sm font-semibold text-gray-800 flex-1 text-left">{roomName}</span>

        <div className="flex items-center gap-3 text-[11px]">
          {confirmed > 0 && (
            <span className="flex items-center gap-1 text-emerald-600">
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT.CONFIRMED}`} />
              {confirmed}
            </span>
          )}
          {pending > 0 && (
            <span className="flex items-center gap-1 text-amber-600">
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT.PENDING}`} />
              {pending}
            </span>
          )}
          {cancelled > 0 && (
            <span className="flex items-center gap-1 text-red-500">
              <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT.CANCELLED}`} />
              {cancelled}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[10px] text-gray-400 w-10 text-right">{occupied}/{total} beds</span>
        </div>
      </button>

      {/* Tenant table */}
      {isOpen && (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {["Tenant", "Status", "Type", "Food", "Check-in", "Check-out", "Rent/mo", "Deposit", "Paid", "ID"].map((h) => (
                    <th key={h} className="px-3 py-1.5 text-left text-[10px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {pagedTenants.map((t) => (
                  <TenantRow key={t.bookingId} tenant={t} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Per-room tenant pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-2">
              <Pagination
                page={tenantPage}
                totalPages={totalPages}
                onChange={setTenantPage}
                totalItems={tenants.length}
                itemsPerPage={TENANTS_PER_PAGE}
                label="tenants"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────


export default function RoomWiseTenantView() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: bookingData,
    loading,
    totalPages,
  } = useSelector((state: RootState) => state.activeTenant);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] =
    useState<BookingStatus | "ALL">("ALL");

  const [roomPage, setRoomPage] = useState(1);
  const [allExpanded, setAllExpanded] = useState(true);

  useEffect(() => {
    dispatch(fetchActiveTenants(roomPage - 1));
  }, [roomPage, dispatch]);

  const grouped = useMemo(() => {
    const q = search.toLowerCase();

    const filtered = bookingData.filter((t) => {
      const matchSearch =
        !q ||
        t.userName.toLowerCase().includes(q) ||
        t.roomName.toLowerCase().includes(q) ||
        t.userEmail.toLowerCase().includes(q) ||
        t.userPhoneNumber.includes(q);

      const matchStatus =
        statusFilter === "ALL" ||
        t.bookingStatus === statusFilter;

      return matchSearch && matchStatus;
    });

    return filtered.reduce<Record<string, BookingTenant[]>>(
      (acc, t) => {
        if (!acc[t.roomName]) acc[t.roomName] = [];
        acc[t.roomName].push(t);
        return acc;
      },
      {}
    );
  }, [bookingData, search, statusFilter]);

  const sortedRooms = useMemo(
    () =>
      Object.entries(grouped).sort(([a], [b]) =>
        a.localeCompare(b)
      ),
    [grouped]
  );

  const tenantCount = Object.values(grouped).flat().length;

  const handleSearch = (v: string) => {
    setSearch(v);
    setRoomPage(1);
  };

  const handleStatus = (
    v: BookingStatus | "ALL"
  ) => {
    setStatus(v);
    setRoomPage(1);
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-400">
        Loading tenants...
      </div>
    );
  }

  return (
    <div className="space-y-3">

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <div className="relative w-full sm:w-64">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search name, room, email, phone…"
            value={search}
            onChange={(e) =>
              handleSearch(e.target.value)
            }
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-gray-200"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {(
            [
              "ALL",
              "CONFIRMED",
              "PENDING",
              "CANCELLED",
            ] as const
          ).map((s) => (
            <button
              key={s}
              onClick={() => handleStatus(s)}
              className={`px-2.5 py-1 rounded-md text-[11px] border ${
                statusFilter === s
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-500"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-[11px] text-gray-400">
        <span>
          <span className="font-medium text-gray-700">
            {sortedRooms.length}
          </span>{" "}
          rooms ·{" "}
          <span className="font-medium text-gray-700">
            {tenantCount}
          </span>{" "}
          tenants
        </span>

        <button
          onClick={() =>
            setAllExpanded((e) => !e)
          }
          className="text-blue-500"
        >
          {allExpanded
            ? "Collapse all"
            : "Expand all"}
        </button>
      </div>

      {/* Rooms */}
      {sortedRooms.length === 0 ? (
        <div className="py-14 text-center text-sm text-gray-400 bg-white rounded-xl border">
          No rooms found
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {sortedRooms.map(
              ([roomName, tenants]) => (
                <RoomGroup
                  key={roomName}
                  roomName={roomName}
                  tenants={tenants}
                  forceOpen={allExpanded}
                />
              )
            )}
          </div>

          {/* Pagination */}
          <Pagination
            page={roomPage}
            totalPages={totalPages}
            onChange={setRoomPage}
            totalItems={tenantCount}
            itemsPerPage={ROOMS_PER_PAGE}
            label="rooms"
          />
        </>
      )}
    </div>
  );
}