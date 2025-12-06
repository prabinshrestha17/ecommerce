"use client";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const data = [
  { name: 'Mon', sales: 4000, visitors: 2400 },
  { name: 'Tue', sales: 3000, visitors: 1398 },
  { name: 'Wed', sales: 2000, visitors: 9800 },
  { name: 'Thu', sales: 2780, visitors: 3908 },
  { name: 'Fri', sales: 1890, visitors: 4800 },
  { name: 'Sat', sales: 2390, visitors: 3800 },
  { name: 'Sun', sales: 3490, visitors: 4300 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Analytics</h1>
        <p className="text-slate-400 mt-1">Deep dive into your store performance</p>
      </div>

      {/* Main Revenue Chart */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-6">Revenue Overview</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                itemStyle={{ color: '#3b82f6' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-6">Visitor Traffic</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                <Bar dataKey="visitors" fill="#22c55e" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <MetricRow label="Conversion Rate" value="3.2%" change="+0.4%" isPositive />
            <MetricRow label="Avg. Order Value" value="$85.20" change="-1.2%" isPositive={false} />
            <MetricRow label="Bounce Rate" value="42.5%" change="-2.1%" isPositive />
            <MetricRow label="Total Sessions" value="24,592" change="+12.5%" isPositive />
          </div>
        </div>
      </div>
    </div>
  );
}

const MetricRow = ({ label, value, change, isPositive }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/50 border border-slate-800">
    <span className="text-slate-400 text-sm">{label}</span>
    <div className="text-right">
      <div className="text-slate-100 font-semibold">{value}</div>
      <div className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>{change}</div>
    </div>
  </div>
);