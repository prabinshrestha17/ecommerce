"use client";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  MoreHorizontal,
  DollarSign,
  Users,
  Activity,
  ShoppingBag,
} from "lucide-react";

// --- Mock Data ---
const revenueData = [
  { name: "Mon", revenue: 4000, profit: 2400 },
  { name: "Tue", revenue: 3000, profit: 1398 },
  { name: "Wed", revenue: 9800, profit: 2000 },
  { name: "Thu", revenue: 3908, profit: 2780 },
  { name: "Fri", revenue: 4800, profit: 1890 },
  { name: "Sat", revenue: 3800, profit: 2390 },
  { name: "Sun", revenue: 4300, profit: 3490 },
];

const trafficSourceData = [
  { name: "Direct", value: 400 },
  { name: "Social", value: 300 },
  { name: "Organic", value: 300 },
  { name: "Referral", value: 200 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Analytics Board</h1>
          <p className="text-slate-400 mt-1">Real-time data monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-900/50 border border-slate-800 rounded-lg p-1">
            {["24h", "7d", "30d", "90d"].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  timeRange === range
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      {/* --- KPI Cards Row --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Revenue"
          value="$54,239"
          change="+12.5%"
          isPositive={true}
          icon={DollarSign}
          color="blue"
        />
        <KPICard
          title="Active Users"
          value="2,543"
          change="+8.2%"
          isPositive={true}
          icon={Users}
          color="purple"
        />
        <KPICard
          title="Conversion Rate"
          value="3.42%"
          change="-1.1%"
          isPositive={false}
          icon={Activity}
          color="orange"
        />
        <KPICard
          title="Avg. Order Value"
          value="$124.50"
          change="+4.3%"
          isPositive={true}
          icon={ShoppingBag}
          color="green"
        />
      </div>

      {/* --- Main Chart Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Revenue Area Chart (Takes up 2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-100">
                Revenue vs Profit
              </h3>
              <p className="text-sm text-slate-400">
                Comparison over selected period
              </p>
            </div>
            <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={value => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    color: "#f1f5f9",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#22c55e"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                  name="Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Traffic Sources Donut (Takes up 1 col) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-100 mb-2">
            Traffic Sources
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Where your customers come from
          </p>

          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#1e293b",
                    borderRadius: "8px",
                  }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={value => (
                    <span className="text-slate-300 ml-1">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text in Donut */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-12 text-center pointer-events-none">
              <span className="text-2xl font-bold text-white">1.2k</span>
              <p className="text-xs text-slate-400">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Section: Demographics & Top Products --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-6">
            Visitors by Device
          </h3>
          <div className="space-y-4">
            <ProgressBar label="Mobile" value={65} color="bg-blue-500" />
            <ProgressBar label="Desktop" value={25} color="bg-purple-500" />
            <ProgressBar label="Tablet" value={10} color="bg-green-500" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-100">
              Top Products
            </h3>
            <button className="text-xs text-blue-400 hover:text-blue-300">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-800 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      Product Name {i}
                    </p>
                    <p className="text-xs text-slate-500">Category A</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-200">$1,20{i}</p>
                  <p className="text-xs text-green-400">5{i} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

const KPICard = ({ title, value, change, isPositive, icon: Icon, color }) => {
  const colorMap = {
    blue: "bg-blue-500/10 text-blue-500",
    purple: "bg-purple-500/10 text-purple-500",
    orange: "bg-orange-500/10 text-orange-500",
    green: "bg-green-500/10 text-green-500",
  };

  return (
    <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl hover:border-slate-700 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            isPositive
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-100">{value}</h3>
      </div>
    </div>
  );
};

const ProgressBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-slate-300">{label}</span>
      <span className="text-slate-400">{value}%</span>
    </div>
    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);
