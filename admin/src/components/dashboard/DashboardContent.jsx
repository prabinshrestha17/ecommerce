import React from "react";
import {
  Bell,
  Sun,
  Moon,
  User,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  Tag,
  Plus,
  BarChart3,
} from "lucide-react";
import { Spotlight } from "@/components/ui/Spotlight";
import { StatCard } from "@/components/dashboard/StatCard";
import { cn } from "@/lib/utils";

export const DashboardContent = ({ isDark, setIsDark, selected }) => {
  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-auto relative h-screen">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(59, 130, 246, 0.5)"
      />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">{selected}</h1>
          <p className="text-slate-400 mt-1">Manage your e-commerce platform</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg bg-slate-900/50 backdrop-blur-xl border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 transition-colors"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button className="p-2 rounded-lg bg-slate-900/50 backdrop-blur-xl border border-slate-800 text-slate-400 hover:text-slate-100 transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 relative z-10">
        <StatCard
          icon={DollarSign}
          title="Total Revenue"
          value="$124,567"
          change="+12.5%"
          color="blue"
        />
        <StatCard
          icon={Users}
          title="Active Users"
          value="8,234"
          change="+5.2%"
          color="green"
        />
        <StatCard
          icon={ShoppingCart}
          title="Total Orders"
          value="1,456"
          change="+8.1%"
          color="purple"
        />
        <StatCard
          icon={Package}
          title="Products"
          value="342"
          change="+3 new"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-100">
                Recent Activity
              </h3>
              <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  icon: DollarSign,
                  title: "New order received",
                  desc: "Order #1234 - $299.99",
                  time: "2 min ago",
                  color: "green",
                },
                {
                  icon: Users,
                  title: "New user registered",
                  desc: "john.doe@example.com",
                  time: "5 min ago",
                  color: "blue",
                },
                {
                  icon: Package,
                  title: "Product updated",
                  desc: "iPhone 15 Pro stock updated",
                  time: "10 min ago",
                  color: "purple",
                },
                {
                  icon: Tag,
                  title: "Category created",
                  desc: "New Electronics category",
                  time: "1 hour ago",
                  color: "orange",
                },
                {
                  icon: Bell,
                  title: "System notification",
                  desc: "Backup completed successfully",
                  time: "2 hours ago",
                  color: "red",
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div
                    className={cn(
                      "p-2 rounded-lg",
                      activity.color === "green" && "bg-green-500/20",
                      activity.color === "blue" && "bg-blue-500/20",
                      activity.color === "purple" && "bg-purple-500/20",
                      activity.color === "orange" && "bg-orange-500/20",
                      activity.color === "red" && "bg-red-500/20"
                    )}
                  >
                    <activity.icon
                      className={cn(
                        "h-4 w-4",
                        activity.color === "green" && "text-green-400",
                        activity.color === "blue" && "text-blue-400",
                        activity.color === "purple" && "text-purple-400",
                        activity.color === "orange" && "text-orange-400",
                        activity.color === "red" && "text-red-400"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-100 truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {activity.desc}
                    </p>
                  </div>
                  <div className="text-xs text-slate-500">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">Add Product</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-800 transition-colors">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">Manage Users</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 text-slate-300 hover:bg-slate-800 transition-colors">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm font-medium">View Reports</span>
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              Top Products
            </h3>
            <div className="space-y-3">
              {[
                "iPhone 15 Pro",
                "MacBook Air M2",
                "AirPods Pro",
                "iPad Air",
              ].map((product, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-400">{product}</span>
                  <span className="text-sm font-medium text-slate-100">
                    ${Math.floor(Math.random() * 1000 + 500)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
