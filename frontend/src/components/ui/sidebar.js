"use client";

import React from "react";
import { LayoutDashboard, TrendingUp, Cpu, FolderHeart, Settings, Sparkles, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

import Link from "next/link";

export function Sidebar({ activePath = "/" }) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/", label: "", disabled: false },
    { name: "Trending Topics", icon: TrendingUp, path: "/trends", label: "India", disabled: false },
    { name: "AI Workflow", icon: Cpu, path: "/workflow", disabled: true },
    { name: "Gallery", icon: FolderHeart, path: "/gallery", disabled: true },
  ];

  return (
    <aside className="w-64 border-r border-border-soft bg-bg-surface flex flex-col h-screen sticky top-0 shrink-0">
      {/* Brand Logo */}
      <div className="h-16 px-6 flex items-center gap-2.5 border-b border-border-soft">
        <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center text-white shadow-sm shadow-accent-primary/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <span className="font-sans font-bold text-base tracking-wider text-ink-primary">VEGA</span>
          <span className="text-[10px] block font-mono text-ink-muted leading-3 font-semibold">STUDIO</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider px-3 mb-3">
          Workspace
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.path || (item.path === "/" && activePath === "/dashboard");
          
          if (item.disabled) {
            return (
              <div key={item.name} className="relative opacity-50 cursor-not-allowed">
                <div
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-ink-secondary"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-ink-secondary" />
                    <span>{item.name}</span>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={item.name} className="relative">
              <Link
                href={item.path}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group ${
                  isActive 
                    ? "text-accent-primary bg-accent-primary/5" 
                    : "text-ink-secondary hover:text-ink-primary hover:bg-bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-accent-primary" : "text-ink-secondary group-hover:text-ink-primary"}`} />
                  <span>{item.name}</span>
                </div>
                {item.label && (
                  <span className="text-[10px] font-bold bg-trend-spark/10 text-trend-spark border border-trend-spark/15 px-1.5 py-0.5 rounded-md">
                    {item.label}
                  </span>
                )}
              </Link>
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-accent-primary rounded-r"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer / Profile Section */}
      <div className="p-4 border-t border-border-soft space-y-4">
        {/* Quick Settings */}
        <div className="flex items-center justify-between px-2 text-ink-secondary">
          <button className="p-1.5 hover:bg-bg-muted hover:text-ink-primary rounded-lg transition-colors cursor-pointer">
            <Settings className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1 bg-bg-muted p-0.5 rounded-lg border border-border-soft">
            <button className="p-1 text-ink-primary bg-bg-surface shadow-sm rounded-md transition-all cursor-pointer">
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 text-ink-muted hover:text-ink-primary rounded-md transition-all cursor-not-allowed" disabled>
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-bg-muted/50 transition-colors">
          <div className="w-9 h-9 rounded-full bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center text-xs font-semibold text-accent-primary">
            PM
          </div>
          <div className="overflow-hidden">
            <span className="block text-sm font-semibold text-ink-primary truncate">Product Manager</span>
            <span className="block text-[11px] text-ink-muted truncate">creator@vega.ai</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
