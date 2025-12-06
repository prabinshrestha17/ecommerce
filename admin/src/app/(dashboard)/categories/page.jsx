"use client";
import React from "react";
import { Edit2, Trash, Folder } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    { name: "Electronics", count: 120 },
    { name: "Clothing", count: 85 },
    { name: "Home & Garden", count: 45 },
    { name: "Sports", count: 32 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-100">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-6 rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-800/50 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                <Folder className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">
                  {cat.name}
                </h3>
                <p className="text-sm text-slate-400">{cat.count} products</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 hover:text-blue-400">
                <Edit2 className="h-4 w-4" />
              </button>
              <button className="p-2 hover:text-red-400">
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {/* Add Category Card */}
        <button className="flex flex-col items-center justify-center p-6 rounded-xl border border-dashed border-slate-700 bg-transparent hover:bg-slate-900/30 transition-colors text-slate-400 hover:text-blue-400 hover:border-blue-500/50">
          <Plus className="h-8 w-8 mb-2" />
          <span className="font-medium">Create Category</span>
        </button>
      </div>
    </div>
  );
}

// Helper icon
import { Plus } from "lucide-react";
