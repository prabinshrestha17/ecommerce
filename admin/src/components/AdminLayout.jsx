"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Settings } from "lucide-react";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    try {
      setShowSidebar(localStorage.getItem("adminAccepted") === "true");
    } catch (e) {
      setShowSidebar(false);
    }
  }, []);

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/categories", icon: FolderTree, label: "Categories" },
    { path: "/admin/products", icon: Package, label: "Products" },
    { path: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  const handleExitConsole = () => {
    try {
      localStorage.removeItem("adminAccepted");
    } catch (e) {}
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar — only render after user accepted */}
      {showSidebar && (
        <aside className="w-64 gradient-sidebar backdrop-glass border-r border-console-blue/20 console-glow">
          <div className="p-6 border-b border-console-blue/20">
            <h1 className="text-xl font-bold text-console-blue flex items-center gap-2">
              <span className="text-2xl">&gt;</span>
              <span>Admin Console</span>
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              E-Commerce Panel v1.0
            </p>
          </div>

          <nav className="p-4 space-y-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-console-blue/20 text-console-blue border border-console-blue/40 console-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-console-blue/20">
            <div className="text-xs text-muted-foreground">
              <button
                onClick={handleExitConsole}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Exit Console
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="border-b border-console-blue/20 backdrop-glass">
          <div className="px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
              <span className="text-console-blue">&gt;</span>
              <span>{pathname?.replace("/admin", "root") || "root"}</span>
            </div>
          </div>
        </div>

        <div className="p-8">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
