"use client";
import React from "react";
import { Eye, Download } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    {
      id: "#ORD-7754",
      customer: "John Doe",
      amount: "$120.50",
      status: "Completed",
      date: "Oct 24, 2024",
      items: 3,
    },
    {
      id: "#ORD-7753",
      customer: "Jane Smith",
      amount: "$850.00",
      status: "Processing",
      date: "Oct 24, 2024",
      items: 1,
    },
    {
      id: "#ORD-7752",
      customer: "Robert Fox",
      amount: "$35.00",
      status: "Pending",
      date: "Oct 23, 2024",
      items: 2,
    },
    {
      id: "#ORD-7751",
      customer: "Emily Davis",
      amount: "$210.25",
      status: "Cancelled",
      date: "Oct 23, 2024",
      items: 4,
    },
  ];

  const getStatusColor = status => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Processing":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-100">Orders</h1>
        <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm border border-slate-700 transition-colors">
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950/50 text-slate-200 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {orders.map(order => (
              <tr
                key={order.id}
                className="hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-200">
                  {order.id}
                </td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4 text-slate-200">{order.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-blue-400 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
