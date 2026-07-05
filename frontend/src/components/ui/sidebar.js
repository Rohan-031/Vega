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
  FolderClosed,
  CheckCircle2,
  FileJson,
  Mic,
  FolderOpen,
  Clapperboard,
  FileSpreadsheet
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Sidebar({ activePath = "/", activeProject = null }) {
  const router = useRouter();

  // Mock menu items for Dashboard
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Generated Files", icon: FileVideo, path: "/files" },
    { name: "Logs", icon: FileText, path: "/logs" },
    { name: "Settings", icon: Sliders, path: "/settings" },
  ];

  // Storage section metrics
  const storageItems = [
    { name: "Projects", count: "14", icon: Folder },
    { name: "Videos", count: "14", icon: Video },
    { name: "Cache", count: "2.3 GB", icon: Database },
  ];

  // Project files list for active project (as in screenshot 2)
  const projectFiles = [
    { name: "research.md", type: "doc", status: "completed" },
    { name: "news.json", type: "json", status: "completed" },
    { name: "script.txt", type: "script", status: "completed" },
    { name: "voice.mp3", type: "audio", status: "in-progress" },
    { name: "storyboard.json", type: "json", status: "pending" },
    { name: "assets/", type: "folder", status: "pending" },
    { name: "captions.srt", type: "subtitle", status: "pending" },
    { name: "final.mp4", type: "video", status: "pending" }
  ];

  // Helper to render file icon based on file type and status
  const getFileIcon = (type, status) => {
    const isCompleted = status === "completed";
    const isInProgress = status === "in-progress";
    
    let colorClass = "text-ink-muted";
    if (isCompleted) colorClass = "text-trend-spark";
    if (isInProgress) colorClass = "text-accent-primary animate-pulse";

    switch (type) {
      case "doc":
      case "script":
        return <FileText className={`w-4 h-4 ${colorClass}`} />;
      case "json":
        return <FileJson className={`w-4 h-4 ${colorClass}`} />;
      case "audio":
        return <Mic className={`w-4 h-4 ${colorClass}`} />;
      case "folder":
        return <FolderOpen className={`w-4 h-4 ${colorClass}`} />;
      case "subtitle":
        return <FileSpreadsheet className={`w-4 h-4 ${colorClass}`} />;
      case "video":
        return <Clapperboard className={`w-4 h-4 ${colorClass}`} />;
      default:
        return <FileText className={`w-4 h-4 ${colorClass}`} />;
    }
  };

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
        {activeProject ? (
          <div className="p-3 rounded-xl border border-border-soft bg-bg-muted/40 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-bg-muted border border-border-soft overflow-hidden shrink-0">
                <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-xs font-bold text-ink-primary truncate leading-tight">
                  {activeProject.title}
                </span>
                <span className="block text-[10px] text-ink-muted truncate mt-0.5">Active Pipeline</span>
              </div>
            </div>
            <button
              onClick={() => router.push("/")}
              className="w-full py-1.5 px-3 rounded-lg text-[10px] font-bold bg-accent-primary text-white hover:bg-opacity-95 shadow-sm shadow-accent-primary/10 transition-all cursor-pointer text-center block"
            >
              Change Project
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-xl border border-border-soft bg-bg-muted/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-bg-muted border border-border-soft flex items-center justify-center text-ink-secondary shrink-0">
              <FolderClosed className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-semibold text-ink-primary truncate leading-tight">No Active Project</span>
              <span className="block text-[10px] text-ink-muted truncate mt-0.5">Select a trend to begin</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items (Menu vs Project Files) */}
      <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
        {activeProject ? (
          // RENDER PROJECT FILES SECTION
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-bold text-ink-muted uppercase tracking-wider px-3 mb-2">
                Project Files
              </div>
              <div className="space-y-0.5">
                {projectFiles.map((file) => {
                  const isCompleted = file.status === "completed";
                  const isInProgress = file.status === "in-progress";
                  const isPending = file.status === "pending";

                  return (
                    <div 
                      key={file.name}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all select-none ${
                        isInProgress 
                          ? "bg-accent-primary/5 text-accent-primary border border-accent-primary/10" 
                          : "text-ink-secondary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.type, file.status)}
                        <span className={isCompleted ? "text-ink-primary font-medium" : isPending ? "text-ink-muted" : "font-bold"}>
                          {file.name}
                        </span>
                      </div>
                      
                      {/* Right-side status tag/icon */}
                      <div>
                        {isCompleted && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-trend-spark fill-trend-spark/10" />
                        )}
                        {isInProgress && (
                          <span className="text-[9px] font-bold text-accent-primary uppercase tracking-wide animate-pulse">
                            In Progress
                          </span>
                        )}
                        {isPending && (
                          <span className="text-[9px] font-bold text-ink-muted uppercase tracking-wide">
                            Pending
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // RENDER DEFAULT MAIN MENU SECTION
          <div>
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
          </div>
        )}

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
