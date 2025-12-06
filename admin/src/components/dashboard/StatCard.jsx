import React from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const StatCard = ({ icon: Icon, title, value, change, color }) => {
  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div
          className={cn(
            "p-2 rounded-lg",
            color === "blue" && "bg-blue-500/20",
            color === "green" && "bg-green-500/20",
            color === "purple" && "bg-purple-500/20",
            color === "orange" && "bg-orange-500/20"
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5",
              color === "blue" && "text-blue-400",
              color === "green" && "text-green-400",
              color === "purple" && "text-purple-400",
              color === "orange" && "text-orange-400"
            )}
          />
        </div>
        <TrendingUp className="h-4 w-4 text-green-400" />
      </div>
      <h3 className="font-medium text-slate-400 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-slate-100">{value}</p>
      <p className="text-sm text-green-400 mt-1">{change}</p>
    </div>
  );
};
