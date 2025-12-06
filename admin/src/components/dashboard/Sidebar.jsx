"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Package,
  Tag,
  DollarSign,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronDown,
  ShoppingCart,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = ({ open, setOpen }) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out z-20 flex flex-col",
        open ? "w-64" : "w-16",
        "border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-sm"
      )}
    >
      <div className="p-2 border-b border-slate-800 mb-6">
        <div className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-linear-to-br from-blue-500 to-blue-600 shadow-sm">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            {open && (
              <div className="transition-opacity duration-200">
                <span className="block text-sm font-semibold text-slate-100">
                  E-Commerce
                </span>
                <span className="block text-xs text-slate-400">
                  Admin Panel
                </span>
              </div>
            )}
          </div>
          {open && <ChevronDown className="h-4 w-4 text-slate-400" />}
        </div>
      </div>

      <div className="space-y-1 px-2 flex-1">
        <SidebarOption
          Icon={Home}
          title="Dashboard"
          href="/dashboard"
          isActive={pathname === "/"}
          open={open}
        />
        <SidebarOption
          Icon={Users}
          title="Users"
          href="/users"
          isActive={pathname === "/users"}
          open={open}
        />
        <SidebarOption
          Icon={Package}
          title="Products"
          href="/products"
          isActive={pathname === "/products"}
          open={open}
        />
        <SidebarOption
          Icon={Tag}
          title="Categories"
          href="/categories"
          isActive={pathname === "/categories"}
          open={open}
        />
        <SidebarOption
          Icon={DollarSign}
          title="Orders"
          href="/orders"
          isActive={pathname === "/orders"}
          open={open}
        />
        <SidebarOption
          Icon={BarChart3}
          title="Analytics"
          href="/analytics"
          isActive={pathname === "/analytics"}
          open={open}
        />
      </div>

      {open && (
        <div className="border-t border-slate-800 pt-4 pb-4 px-2 space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wide">
            Account
          </div>
          <SidebarOption
            Icon={Settings}
            title="Settings"
            href="/settings"
            isActive={pathname === "/settings"}
            open={open}
          />
          <SidebarOption
            Icon={HelpCircle}
            title="Help"
            href="/help"
            isActive={pathname === "/help"}
            open={open}
          />
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="border-t border-slate-800 p-3 hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center">
          <div className="grid size-10 place-content-center">
            <ChevronsRight
              className={cn(
                "h-4 w-4 text-slate-400 transition-transform",
                open && "rotate-180"
              )}
            />
          </div>
          {open && (
            <span className="text-sm font-medium text-slate-300 ml-2">
              Collapse
            </span>
          )}
        </div>
      </button>
    </nav>
  );
};

const SidebarOption = ({ Icon, title, href, isActive, open }) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex h-11 w-full items-center rounded-md transition-all duration-200",
        isActive
          ? "bg-blue-500/20 text-blue-400 shadow-sm border-l-2 border-blue-500"
          : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
      )}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      {open && (
        <span className="text-sm font-medium transition-opacity duration-200">
          {title}
        </span>
      )}
    </Link>
  );
};
