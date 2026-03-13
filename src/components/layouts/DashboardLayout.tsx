"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Zap, AlertTriangle } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { UserDropdown } from "../dashboard/UserDropdown";
import { cn } from "@/lib/utils";
import { useCredits } from "@/hooks/useCredits";

// Mapping paths to badges/titles
const routeNames: Record<string, { label: string; badge: string }> = {
  "/dashboard": { label: "Dashboard", badge: "DB" },
  "/library": { label: "Content Library", badge: "LIB" },
  "/hooks": { label: "Hook Generator", badge: "HK" },
  "/scripts": { label: "Script Generator", badge: "SC" },
  "/captions": { label: "Caption Generator", badge: "CP" },
  "/repurpose": { label: "Content Repurposer", badge: "RP" },
  "/campaigns": { label: "Campaigns", badge: "CM" },
  "/automation": { label: "Automation", badge: "AU" },
  "/listings": { label: "Listings", badge: "LS" },
  "/ecosystem/mailplanned": { label: "MailPlanned", badge: "MP" },
  "/ecosystem/xcriptex": { label: "Xcriptex AI", badge: "XA" },
  "/ecosystem/babble": { label: "Babble Chatbot", badge: "BC" },
  "/ecosystem/fansmonster": { label: "FansMonster Store", badge: "FM" },
  "/ecosystem/blog": { label: "Blog Engine", badge: "BE" },
  "/team": { label: "Team Management", badge: "TM" },
  "/settings": { label: "Settings", badge: "ST" },
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { credits, loading } = useCredits();
  
  // Find matching route or default
  const page = Object.entries(routeNames).find(([route]) => pathname.startsWith(route))?.[1] || { label: "Overview", badge: "CB" };
  
  const lowCredits = !loading && credits !== null && credits < 10;

  return (
    <div className="flex h-screen overflow-hidden bg-[#020811] text-white selection:bg-cyan-500/30">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      <main
        className={cn(
          "flex-1 h-screen overflow-y-auto transition-all duration-300 ease-in-out relative z-0 custom-scrollbar",
          sidebarCollapsed ? "md:ml-[76px]" : "md:ml-[276px]"
        )}
      >
        {/* Luxury Background Effects */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute inset-0 bg-[#020811]" />
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full" />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        {/* Topbar */}
        <div className="sticky top-0 z-30 flex items-center justify-between h-[68px] px-6 md:px-8 border-b border-white/[0.06] bg-[#020811]/80 backdrop-blur-xl shrink-0">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-[10px] font-bold text-cyan-300">
              {page.badge}
            </span>
            <div>
              <h1 className="text-sm font-bold text-white leading-none">{page.label}</h1>
              <p className="text-[11px] text-gray-500 mt-0.5 hidden sm:block">CreativeBase OS</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {lowCredits && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
                <AlertTriangle className="w-3 h-3" />
                Low Credits
              </div>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-gray-300">
              <Zap className={cn("w-3 h-3 fill-current", lowCredits ? "text-rose-400" : "text-amber-400")} />
              {loading ? "..." : `${credits} Credits`}
            </div>

            <UserDropdown />
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 p-4 md:p-8 max-w-[1400px] mx-auto min-h-[calc(100vh-68px)]">
          {children}
        </div>
      </main>
    </div>
  );
}
