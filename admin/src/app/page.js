import { Button } from "@/components/ui/button";
import Link from "next/link";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="mb-4 text-4xl font-bold text-console-blue font-mono">
          <span className="text-5xl">&gt;</span> E-Commerce Admin
        </h1>
        <p className="text-xl text-muted-foreground font-mono">
          Console-style Management Panel
        </p>
        <Link href="/admin">
          <Button className="bg-console-blue hover:bg-console-blue-glow text-black font-bold console-glow">
            Enter Admin Console
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
