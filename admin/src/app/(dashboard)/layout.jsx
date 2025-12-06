"use client";
import "../globals.css";
import React, { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { GridBackground } from "@/components/ui/GridBackground";
import { Spotlight } from "@/components/ui/Spotlight";

export default function RootLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-blue-500/30">
        <div className="flex min-h-screen w-full relative overflow-hidden">
          <div className="fixed inset-0 z-0 pointer-events-none">
            <GridBackground />

            <Spotlight
              className="-top-40 left-0 md:left-60 md:-top-20"
              fill="white"
            />

            <Spotlight
              className="top-0 left-full h-[80vh] w-[50vw] md:left-[60%]"
              fill="#a855f7"
            />
          </div>

          <Sidebar open={open} setOpen={setOpen} />

          <main className="flex-1 overflow-auto p-6 md:p-8 relative z-10 h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
