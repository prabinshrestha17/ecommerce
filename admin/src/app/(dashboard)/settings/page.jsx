"use client";
import React from "react";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your store preferences</p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8 space-y-8">
        {/* Profile Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-2">
            Store Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Store Name</label>
              <input
                type="text"
                defaultValue="My E-Commerce"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Support Email</label>
              <input
                type="email"
                defaultValue="support@example.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-2">
            Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-200 font-medium">
                  Email Notifications
                </p>
                <p className="text-sm text-slate-500">
                  Receive daily summaries
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-200 font-medium">Dark Mode Default</p>
                <p className="text-sm text-slate-500">
                  Force dark mode for admin users
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </section>

        <div className="pt-4">
          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Save className="h-4 w-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
