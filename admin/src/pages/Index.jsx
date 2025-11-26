"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const Index = () => {
  const router = useRouter();

  const handleContinue = () => {
    try {
      localStorage.setItem("adminAccepted", "true");
    } catch (e) {
      /* ignore */
    }
    router.push("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="mb-4 text-4xl font-bold text-console-blue font-mono">
          <span className="text-5xl">&gt;</span> E-Commerce Admin
        </h1>
        <p className="text-xl text-muted-foreground font-mono">
          Console-style Management Panel
        </p>
        <Button
          onClick={handleContinue}
          className="bg-console-blue hover:bg-console-blue-glow text-black font-bold console-glow"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Index;
