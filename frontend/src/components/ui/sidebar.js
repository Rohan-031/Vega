"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Folder, 
  Video, 
  Database, 
  Sparkles, 
  ChevronDown,
  FileVideo,
  FileText,
  Sliders,
  FolderClosed
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Sidebar({ activePath = "/" }) {
  // Mock menu items from screenshot: Dashboard, Generated Files, Logs, Settings
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Generated Files", icon: FileVideo, path: "/files" },
    { name: "Logs", icon: FileText, path: "/logs" },
    { name: "Settings", icon: Sliders, path: "/settings" },
  ];

  // Storage section: Projects 14, Videos 14, Cache 2.3 GB
  const storageItems = [
    { name: "Projects", count: "14", icon: Folder },
    { name: "Videos", count: "14", icon: Video },
    { name: "Cache", count: "2.3 GB", icon: Database },
  ];

  return (
    <aside className="w-64 border-r border-border-soft bg-bg-surface flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Logo */}
      <div className="h-16 px-6 flex items-center gap-2.5 border-b border-border-soft shrink-0">
        <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center text-white shadow-sm shadow-accent-primary/20">
          <Sparkles className="w-4 h-4 fill-white" />
        </div>
        <div>
          <span className="font-sans font-bold text-base tracking-wider text-ink-primary">VEGA</span>
          <span className="text-[9px] block font-sans text-ink-muted leading-3 font-semibold uppercase tracking-wider">AI Video Generation Studio</span>
        </div>
      </div>

      {/* Current Project block */}
      <div className="px-4 pt-5 pb-3 shrink-0">
        <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider px-3 mb-2">
          Current Project
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border-soft bg-bg-muted/40 transition-colors">
          <div className="w-8 h-8 rounded-lg bg-bg-muted border border-border-soft flex items-center justify-center text-ink-secondary shrink-0">
            <FolderClosed className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <span className="block text-xs font-semibold text-ink-primary truncate leading-tight">No Active Project</span>
            <span className="block text-[10px] text-ink-muted truncate mt-0.5">Select a trend to begin</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider px-3 mb-2">
          Menu
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.path || (item.path === "/" && (activePath === "/dashboard" || activePath === "/"));
          
          return (
            <div key={item.name} className="relative">
              <Link
                href={item.path === "/" ? "/" : "#"}
                onClick={(e) => {
                  if (item.path !== "/") {
                    e.preventDefault();
                    alert(`${item.name} is a demo route. Please use the Dashboard.`);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all group ${
                  isActive 
                    ? "text-accent-primary bg-accent-primary/5 border border-accent-primary/10 shadow-sm font-bold" 
                    : "text-ink-secondary hover:text-ink-primary hover:bg-bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-accent-primary" : "text-ink-secondary group-hover:text-ink-primary"}`} />
                  <span>{item.name}</span>
                </div>
              </Link>
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute left-0 top-2 bottom-2 w-[3px] bg-accent-primary rounded-r"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </div>
          );
        })}

        {/* Storage Section */}
        <div className="pt-6">
          <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider px-3 mb-2">
            Storage
          </div>
          <div className="space-y-1">
            {storageItems.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.name}
                  className="flex items-center justify-between px-3 py-2 text-xs text-ink-secondary font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-ink-muted" />
                    <span>{item.name}</span>
                  </div>
                  <span className="text-[11px] font-bold text-ink-primary">{item.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer / Profile Section */}
      <div className="p-4 border-t border-border-soft shrink-0">
        {/* Profile Card */}
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border-soft">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-xs font-bold text-accent-primary shrink-0">
              R
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-bold text-ink-primary truncate leading-tight">Rohan</span>
              <span className="block text-[10px] text-ink-muted truncate mt-0.5">Creator</span>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-ink-muted" />
        </div>
      </div>
    </aside>
  );
}
