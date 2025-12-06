import React from "react";
import { cn } from "@/lib/utils";

export const GridBackground = ({ className }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full bg-slate-950 isolate",
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_20%,#000_100%)] pointer-events-none" />

      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]" />
    </div>
  );
};
