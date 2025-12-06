"use client";
import "../globals.css";
import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { GridBackground } from "@/components/ui/GridBackground";

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-blue-500/30">
        <div className="flex min-h-screen w-full relative">
          <GridBackground />
          {/* <Sidebar open={open} setOpen={setOpen} /> */}
          <main className="flex-1 overflow-auto p-6 md:p-8 relative z-10 h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
