"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield, LayoutDashboard, AlertTriangle, Search, MessageSquare,
  BarChart3, Bug, FileCheck, Fingerprint, FileText, GitBranch,
  Bot, Settings, Bell, ChevronLeft, ChevronRight, Menu, X, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { section: "OVERVIEW", items: [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
  ]},
  { section: "DETECTION", items: [
    { label: "Incidents", href: "/incidents", icon: AlertTriangle, badge: 15 },
    { label: "Alerts", href: "/alerts", icon: Bell, badge: 8 },
    { label: "Threat Intel", href: "/threats", icon: Search },
  ]},
  { section: "INVESTIGATION", items: [
    { label: "Security Copilot", href: "/copilot", icon: MessageSquare },
    { label: "Forensics", href: "/forensics", icon: Fingerprint },
  ]},
  { section: "MANAGEMENT", items: [
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
    { label: "Vulnerabilities", href: "/vulnerabilities", icon: Bug },
    { label: "Compliance", href: "/compliance", icon: FileCheck },
  ]},
  { section: "AUTOMATION", items: [
    { label: "Playbooks", href: "/playbooks", icon: GitBranch },
    { label: "AI Agents", href: "/agents", icon: Bot },
  ]},
  { section: "REPORTING", items: [
    { label: "Reports", href: "/reports", icon: FileText },
    { label: "Settings", href: "/settings", icon: Settings },
  ]},
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-50 h-full flex flex-col border-r border-sidebar-border bg-sidebar
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-[68px]" : "w-[260px]"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border shrink-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/15 shrink-0">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold text-gradient-cyan tracking-wide">SentinelAI</h1>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">SOC Platform</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto hidden md:flex h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden h-7 w-7"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-2">
          {navItems.map((group) => (
            <div key={group.section} className="mb-1">
              {!collapsed && (
                <p className="px-4 py-2 text-[10px] font-semibold text-muted-foreground/60 tracking-[0.15em] uppercase">
                  {group.section}
                </p>
              )}
              {collapsed && <Separator className="my-1 mx-3 bg-sidebar-border" />}
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive
                        ? "bg-primary/10 text-primary sidebar-active-indicator"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                      }
                      ${collapsed ? "justify-center px-0 mx-1" : ""}
                    `}
                  >
                    <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? "text-primary" : ""}`} />
                    {!collapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge variant="destructive" className="h-5 min-w-5 px-1.5 text-[10px] font-bold rounded-full">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3 shrink-0">
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
              AM
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">Alex Morgan</p>
                <p className="text-[10px] text-muted-foreground truncate">SOC Admin</p>
              </div>
            )}
            {!collapsed && (
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground shrink-0">
                <LogOut className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="flex items-center gap-4 h-14 px-4 md:px-6 border-b border-border bg-background/80 backdrop-blur-sm shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <div className="flex-1" />

          {/* Connection status */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-online" />
            <span className="hidden sm:inline">Connected</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative h-8 w-8">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-[9px] font-bold flex items-center justify-center text-white">
              8
            </span>
          </Button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
