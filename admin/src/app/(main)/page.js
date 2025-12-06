"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

// Components
import { GridBackground } from "@/components/ui/GridBackground";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FooterSection } from "@/components/landing/FooterSection";
import Link from "next/link";

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const [showLanding, setShowLanding] = useState(true);

  // Handle Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  if (showLanding) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-500/30">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
        <FooterSection />

        <div className="fixed bottom-8 right-8 z-50">
          <Link
            href={"/dashboard"}
            className="px-6 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors shadow-lg flex items-center gap-2"
          >
            View Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      <GridBackground />
      <Sidebar
        open={open}
        setOpen={setOpen}
        selected={selected}
        setSelected={setSelected}
      />
      <DashboardContent
        isDark={isDark}
        setIsDark={setIsDark}
        selected={selected}
      />

      <button
        onClick={() => setShowLanding(true)}
        className="fixed bottom-8 right-8 z-50 px-4 py-2 rounded-lg bg-slate-900/50 backdrop-blur-xl border border-slate-800 text-slate-300 font-medium hover:bg-slate-800/50 transition-colors shadow-lg"
      >
        Back to Landing
      </button>
    </div>
  );
}
