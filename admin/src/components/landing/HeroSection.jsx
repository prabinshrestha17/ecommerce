import React from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { Spotlight } from "@/components/ui/Spotlight";
import { GridBackground } from "@/components/ui/GridBackground";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      <GridBackground />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(59, 130, 246, 0.5)"
      />

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 backdrop-blur-xl text-sm text-slate-300">
            <Zap className="h-4 w-4 text-blue-400" />
            Modern E-Commerce Dashboard
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-b from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent"
        >
          Manage Your Store
          <br />
          With Confidence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto"
        >
          Complete e-commerce admin dashboard with user management, product
          catalog, and analytics. Built with modern technologies for the best
          experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button className="px-8 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
            Get Started
            <ArrowRight className="h-4 w-4" />
          </button>
          <button className="px-8 py-3 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-xl text-slate-300 font-medium hover:bg-slate-800/50 transition-colors">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};
