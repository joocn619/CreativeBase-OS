"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  FolderOpen, 
  Settings, 
  Users, 
  Zap, 
  Video, 
  PenTool, 
  Type, 
  Repeat,
  Megaphone,
  Store,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  GitMerge,
  Mail,
  Bot,
  MessageSquare,
  ShoppingBag,
  FileText
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface SidebarItem {
  icon: any;
  label: string;
  href: string;
  isComingSoon?: boolean;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    title: "HOME",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: FolderOpen, label: "Content Library", href: "/library" },
    ]
  },
  {
    title: "CREATOR TOOLS",
    items: [
      { icon: Zap, label: "Hook Generator", href: "/hooks" },
      { icon: PenTool, label: "Script Generator", href: "/scripts" },
      { icon: Type, label: "Caption Generator", href: "/captions" },
      { icon: Repeat, label: "Content Repurposer", href: "/repurpose" },
    ]
  },
  {
    title: "MARKETING",
    items: [
      { icon: Megaphone, label: "Campaigns", href: "/campaigns" },
      { icon: GitMerge, label: "Automation", href: "/automation" },
    ]
  },
  {
    title: "COMMERCE",
    items: [
      { icon: Store, label: "Listings", href: "/listings" },
    ]
  },
  {
    title: "ECOSYSTEM",
    items: [
      { icon: Mail, label: "MailPlanned", href: "/ecosystem/mailplanned", isComingSoon: true },
      { icon: Bot, label: "Xcriptex AI", href: "/ecosystem/xcriptex", isComingSoon: true },
      { icon: MessageSquare, label: "Babble Chatbot", href: "/ecosystem/babble", isComingSoon: true },
      { icon: ShoppingBag, label: "FansMonster Store", href: "/ecosystem/fansmonster", isComingSoon: true },
      { icon: FileText, label: "Blog Engine", href: "/ecosystem/blog", isComingSoon: true },
    ]
  },
  {
    title: "WORKSPACE",
    items: [
      { icon: Users, label: "Team", href: "/team" },
      { icon: Settings, label: "Settings", href: "/settings" },
    ]
  }
];

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-white/10 bg-[#020811]/95 backdrop-blur-xl flex flex-col",
        collapsed ? "w-[76px]" : "w-[276px]"
      )}
    >
      <div className="flex h-[68px] items-center px-4 justify-between border-b border-white/5 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
            <Video className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <span className="text-sm font-bold tracking-tight text-white whitespace-nowrap">
              CreativeBase <span className="text-cyan-400">OS</span>
            </span>
          )}
        </Link>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors absolute -right-3 top-5 bg-[#020811] border border-white/10 z-50 flex items-center justify-center shadow-lg"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar flex flex-col gap-6">
        {sidebarSections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-1.5">
            {!collapsed && (
              <div className="px-3 mb-1">
                <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">{section.title}</span>
              </div>
            )}
            {collapsed && (
               <div className="w-full h-px bg-white/5 my-2" />
            )}
            
            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.label}
                    href={item.isComingSoon ? '#' : item.href}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200",
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <item.icon className={cn(
                        "h-[18px] w-[18px] shrink-0 transition-colors",
                        isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"
                      )} />
                      {!collapsed && (
                        <span className="text-sm font-medium tracking-wide">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {!collapsed && item.isComingSoon && (
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest border border-gray-700/50 rounded-md px-1.5 py-0.5 whitespace-nowrap bg-gray-800/20">
                        Soon
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade Callout */}
      {!collapsed && (
        <div className="p-4 mx-3 mb-4 mt-auto rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h4 className="text-sm font-bold text-white mb-1">CreativeBase Pro</h4>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Unlock unlimited AI credits and advanced features.
            </p>
            <button className="w-full py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors border border-white/5">
              Upgrade Plan
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
