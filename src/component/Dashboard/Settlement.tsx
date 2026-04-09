"use client";

import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

import { useEffect, useMemo, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchMonthlySettlement } from "@/features/settlement/settlementThunk";
import { setSelectedMonth } from "@/features/settlement/settlementSlice";

// ── Constants ──────────────────────────────────────────────────────────────
const MONTHS = [
  { value: 1,  label: "Jan" }, { value: 2,  label: "Feb" },
  { value: 3,  label: "Mar" }, { value: 4,  label: "Apr" },
  { value: 5,  label: "May" }, { value: 6,  label: "Jun" },
  { value: 7,  label: "Jul" }, { value: 8,  label: "Aug" },
  { value: 9,  label: "Sep" }, { value: 10, label: "Oct" },
  { value: 11, label: "Nov" }, { value: 12, label: "Dec" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

const COLORS = {
  amount: "#6366f1",
  fees:   "#f59e0b",
  tax:    "#f87171",
  net:    "#34d399",
};

const PIE_KEYS = [
  { key: "amount", label: "Total",  color: COLORS.amount },
  { key: "fees",   label: "Fees",   color: COLORS.fees   },
  { key: "tax",    label: "Tax",    color: COLORS.tax    },
  { key: "net",    label: "Net",    color: COLORS.net    },
];

const currency = (v: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);

const shortCurrency = (v: number) =>
  v >= 100000 ? `₹${(v / 100000).toFixed(1)}L`
  : v >= 1000  ? `₹${v.toLocaleString('en-IN')}`  // exact number with comma
  : `₹${v}`;

type ChartView = "pie" | "bar";

// ── Bar Tooltip ────────────────────────────────────────────────────────────
const BarTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-lg p-2 text-[10px] min-w-[120px]">
      <p className="font-semibold text-gray-600 mb-1 pb-1 border-b border-gray-100">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-3 py-0.5">
          <span className="flex items-center gap-1 text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: entry.fill }} />
            {entry.name}
          </span>
          <span className="font-semibold text-gray-700">{currency(entry.value)}</span>
        </div>
      ))}
    </div>
  );
};

// ── Skeleton ───────────────────────────────────────────────────────────────
function ChartSkeleton() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="grid grid-cols-2 gap-1.5">
        {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-100 rounded-lg" />)}
      </div>
      <div className="h-[160px] bg-gray-100 rounded-lg" />
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
const SettlementChart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [view, setView] = useState<ChartView>("pie");
  const [activeIndex, setActiveIndex] = useState(0);

  const { settlements, loading, selectedMonth, selectedYear } = useSelector(
    (state: RootState) => state.settlement
  );

  useEffect(() => {
    dispatch(fetchMonthlySettlement(selectedYear, selectedMonth));
  }, [dispatch, selectedMonth, selectedYear]);

  const handleMonthChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch(setSelectedMonth({ month: Number(e.target.value), year: selectedYear })),
    [dispatch, selectedYear]
  );

  const handleYearChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) =>
      dispatch(setSelectedMonth({ month: selectedMonth, year: Number(e.target.value) })),
    [dispatch, selectedMonth]
  );

  const chartData = useMemo(() => {
    if (!settlements?.length) return [];
    return settlements.map((item) => ({
      date:   new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      amount: item.amount / 100,
      fees:   item.fees   / 100,
      tax:    item.tax    / 100,
      net:    (item.amount - item.fees - item.tax) / 100,
    }));
  }, [settlements]);

  const totals = useMemo(() =>
    chartData.reduce(
      (acc, d) => ({ amount: acc.amount + d.amount, fees: acc.fees + d.fees, tax: acc.tax + d.tax, net: acc.net + d.net }),
      { amount: 0, fees: 0, tax: 0, net: 0 }
    ), [chartData]
  );
console.log('Original totals:', totals);
  const pieData = PIE_KEYS
    .map((k) => ({ name: k.label, value: totals[k.key as keyof typeof totals], color: k.color }))
    .filter((d) => d.value > 0);

console.log('Mapped pieData:', pieData);
  const monthLabel = MONTHS.find((m) => m.value === selectedMonth)?.label ?? "";

  // ── Fix 1: avoid activeIndex/activeShape prop on <Pie> ─────────────────
  // Use a custom label render instead, since activeIndex isn't in the type
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    if (percent < 0.05) return null;
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={9} fontWeight={600}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // ── Fix 2: type-safe tooltip formatter ────────────────────────────────
    const tooltipFormatter = (
    value: ValueType | undefined,
    name: NameType | undefined
    ): [string, string] => {
    return [
        currency(typeof value === "number" ? value : 0),
        name ? String(name) : ""
    ];
    };



  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 w-full h-full flex flex-col gap-2">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-xs font-semibold text-gray-800 leading-none truncate">Payments</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">{monthLabel} {selectedYear}</p>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Pie / Bar toggle */}
          <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
            {([
              { type: "pie" as ChartView, icon: (
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a7 7 0 1 0 7 7H8V1z" opacity=".4"/>
                  <path d="M9 1.07V8h6.93A7.004 7.004 0 0 0 9 1.07z"/>
                </svg>
              )},
              { type: "bar" as ChartView, icon: (
                <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="6" width="3" height="9" rx="1"/>
                  <rect x="6" y="3" width="3" height="12" rx="1"/>
                  <rect x="11" y="8" width="3" height="7" rx="1"/>
                </svg>
              )},
            ]).map(({ type, icon }) => (
              <button
                key={type}
                onClick={() => setView(type)}
                className={`p-1 rounded-md transition-all ${
                  view === type ? "bg-white text-indigo-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>

          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="text-[10px] border border-gray-200 rounded-lg px-1.5 py-1 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-400/30 cursor-pointer"
          >
            {MONTHS.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>

          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="text-[10px] border border-gray-200 rounded-lg px-1.5 py-1 bg-white text-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-400/30 cursor-pointer"
          >
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {loading ? <ChartSkeleton /> : (
        <>
          {/* ── Summary pills — 2×2 grid to save width ── */}
          <div className="grid grid-cols-2 gap-1">
            {PIE_KEYS.map((k) => (
              <div key={k.key} className="bg-gray-50 rounded-lg px-2 py-1.5 min-w-0">
                <p className="text-[9px] uppercase tracking-wide text-gray-400 font-medium leading-none">{k.label}</p>
                <p className="text-[11px] font-bold truncate mt-0.5" style={{ color: k.color }}>
                  {shortCurrency(totals[k.key as keyof typeof totals])}
                </p>
              </div>
            ))}
          </div>

          {chartData.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-[11px] bg-gray-50 rounded-lg">
              No data for this period.
            </div>
          ) : view === "pie" ? (
            /* ── Pie view ── */
            <div className="flex items-center gap-2 flex-1 min-h-0">
              <ResponsiveContainer width="55%" height={160}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={62}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                    isAnimationActive
                    animationDuration={800}
                    onMouseEnter={(_, i) => setActiveIndex(i)}
                  >
                    {pieData.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={entry.color}
                        stroke="none"
                        opacity={activeIndex === i ? 1 : 0.75}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={tooltipFormatter} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", fontSize: "11px" }} />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                {pieData.map((entry, i) => {
                  const total = pieData.reduce((s, d) => s + d.value, 0);
                  return (
                    <button
                      key={entry.name}
                      onClick={() => setActiveIndex(i)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all text-left w-full ${
                        activeIndex === i ? "bg-gray-50 ring-1 ring-gray-200" : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: entry.color }} />
                      <span className="text-[10px] text-gray-600 flex-1 truncate">{entry.name}</span>
                      <span className="text-[10px] font-bold flex-shrink-0" style={{ color: entry.color }}>
                        {total > 0 ? `${((entry.value / total) * 100).toFixed(0)}%` : "0%"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          ) : (
            /* ── Bar view ── */
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={chartData} barCategoryGap="35%" margin={{ top: 2, right: 2, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                  <YAxis
                    tickFormatter={shortCurrency}
                    tick={{ fontSize: 9, fill: "#9ca3af" }}
                    axisLine={false} tickLine={false}
                  />
                  <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(99,102,241,0.05)" }} />
                  <Legend wrapperStyle={{ fontSize: "9px", paddingTop: "4px" }} iconType="circle" iconSize={6} />
                  <Bar dataKey="amount" name="Total"  fill={COLORS.amount} radius={[3,3,0,0]} isAnimationActive animationDuration={700} />
                  <Bar dataKey="fees"   name="Fees"   fill={COLORS.fees}   radius={[3,3,0,0]} isAnimationActive animationDuration={800} />
                  <Bar dataKey="tax"    name="Tax"    fill={COLORS.tax}    radius={[3,3,0,0]} isAnimationActive animationDuration={900} />
                  <Bar dataKey="net"    name="Net"    fill={COLORS.net}    radius={[3,3,0,0]} isAnimationActive animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SettlementChart;