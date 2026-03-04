"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HelpCircle,
  Zap,
  Users,
  BarChart3,
  TrendingUp,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "5 Porqués",
    icon: HelpCircle,
    href: "/fivewhys",
    badge: "Nuevo",
  },
  {
    title: "Acciones",
    icon: Zap,
    href: "/acciones",
    notifications: 3,
  },
];

const adminItems = [
  {
    title: "Usuarios",
    icon: Users,
    href: "/usuarios",
  },
  {
    title: "Análisis",
    icon: BarChart3,
    href: "/analisis",
  },
  {
    title: "Indicadores",
    icon: TrendingUp,
    href: "/indicadores",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        data-tour="sidebar"
        className={`fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-out ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <div className="flex h-full flex-col navy-gradient text-white shadow-2xl">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className={`flex items-center gap-3 ${collapsed ? "hidden" : "flex"}`}>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg">
                  <span className="text-xl font-bold text-navy-900">K</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-navy-700" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Kopp</h1>
                <p className="text-xs text-white/60">Bavaria</p>
              </div>
            </div>
            {collapsed && (
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg mx-auto">
                <span className="text-xl font-bold text-navy-900">K</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 text-yellow-400 shadow-lg shadow-yellow-500/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon
                        className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                          isActive(item.href) ? "text-yellow-400" : ""
                        }`}
                      />
                      {!collapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge className="ml-auto bg-yellow-500 text-navy-900 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          {item.notifications && (
                            <span className="ml-auto w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                              {item.notifications}
                            </span>
                          )}
                        </>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right" className="bg-navy-800 text-white border-navy-700">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </div>

            <div className="pt-4">
              <p className={`text-xs text-white/40 uppercase tracking-wider mb-2 px-4 ${collapsed ? "hidden" : ""}`}>
                Administración
              </p>
              {adminItems.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 text-yellow-400"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right" className="bg-navy-800 text-white border-navy-700">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-white/10">
            <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
              <Avatar className="w-10 h-10 ring-2 ring-yellow-500/30">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bavaria" />
                <AvatarFallback className="bg-yellow-500 text-navy-900">GV</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Gerson Vanegas</p>
                  <p className="text-xs text-white/50 truncate">gerson.vanegas@bavaria.co</p>
                </div>
              )}
              {!collapsed && (
                <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/10">
                  <LogOut className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-yellow-500 text-navy-900 shadow-lg flex items-center justify-center hover:bg-yellow-400 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
