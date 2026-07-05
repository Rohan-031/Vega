"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Folder, 
  Video, 
  Database, 
  RefreshCw, 
  ChevronRight, 
  Play, 
  FolderOpen, 
  MoreVertical, 
  Lightbulb,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [selectedTrend, setSelectedTrend] = useState(1); // Default Card 1 selected as in the screenshot
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 5 Top Trends from India (as in the screenshot)
  const topTrends = [
    {
      id: 1,
      title: "Samsung Galaxy Z Fold 6 Launch",
      articles: 5,
      image: "/samsung_fold_6.png"
    },
    {
      id: 2,
      title: "AI Agents Are Taking Over",
      articles: 12,
      image: "/ai_agents_trend.png"
    },
    {
      id: 3,
      title: "OpenAI New Model Rumors",
      articles: 8,
      image: "/openai_rumors.png"
    },
    {
      id: 4,
      title: "India Budget 2025 Highlights",
      articles: 7,
      image: "/india_budget.png"
    },
    {
      id: 5,
      title: "Tesla Robotaxi Update",
      articles: 6,
      image: "/tesla_robotaxi.png"
    }
  ];

  // Previous Projects list (from the screenshot)
  const previousProjects = [
    {
      id: 1,
      name: "Samsung AI Launch.mp4",
      trend: "Samsung Galaxy Z Fold 6 Launch",
      created: "2 days ago",
      duration: "00:34",
      status: "Completed",
      image: "/samsung_fold_6.png"
    },
    {
      id: 2,
      name: "Tesla Robotaxi Update.mp4",
      trend: "Tesla Robotaxi Update",
      created: "5 days ago",
      duration: "00:31",
      status: "Completed",
      image: "/tesla_robotaxi.png"
    },
    {
      id: 3,
      name: "OpenAI GPT-5 Rumors.mp4",
      trend: "OpenAI New Model Rumors",
      created: "1 week ago",
      duration: "00:29",
      status: "Completed",
      image: "/openai_rumors.png"
    },
    {
      id: 4,
      name: "India Budget 2025.mp4",
      trend: "India Budget 2025 Highlights",
      created: "1 week ago",
      duration: "00:28",
      status: "Completed",
      image: "/india_budget.png"
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleStartPipeline = (trendTitle) => {
    router.push("/workflow");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-ink-primary">
      {/* 1. Left Sidebar */}
      <Sidebar activePath="/" />

      {/* 2. Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#fafafb]">
        
        {/* Main Workspace Header */}
        <header className="px-8 py-6 flex items-center justify-between shrink-0 border-b border-border-soft bg-white">
          <div className="space-y-1">
            <span className="text-xs font-bold text-accent-primary tracking-wide uppercase">
              Step 1 of 3
            </span>
            <h1 className="text-2xl font-extrabold text-ink-primary tracking-tight">
              Select a Trend to Get Started
            </h1>
            <p className="text-xs text-ink-secondary">
              Choose a trending topic and let VEGA handle the rest
            </p>
          </div>

          {/* Three Small Stats cards on the right */}
          <div className="flex gap-4 select-none">
            <div className="flex items-center gap-3 bg-white border border-border-soft rounded-xl p-3.5 shadow-sm min-w-[140px]">
              <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                <Folder className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-base font-extrabold text-ink-primary leading-tight">14</div>
                <div className="text-[10px] text-ink-muted font-bold uppercase tracking-wider">Projects</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-border-soft rounded-xl p-3.5 shadow-sm min-w-[140px]">
              <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                <Video className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-base font-extrabold text-ink-primary leading-tight">14</div>
                <div className="text-[10px] text-ink-muted font-bold uppercase tracking-wider">Videos</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white border border-border-soft rounded-xl p-3.5 shadow-sm min-w-[170px]">
              <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary">
                <Database className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="text-base font-extrabold text-ink-primary leading-tight">2.3 GB</div>
                <div className="text-[10px] text-ink-muted font-bold uppercase tracking-wider">Storage Used</div>
              </div>
            </div>
          </div>
        </header>

        {/* Workstation Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          
          {/* Today's Top Trends (India) Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                  Today's Top Trends (India)
                </h2>
                <span className="text-[10px] font-semibold bg-bg-muted text-ink-secondary px-2 py-0.5 rounded-full border border-border-soft">
                  Updated: 10:30 AM
                </span>
              </div>
              <button 
                onClick={handleRefresh}
                className="flex items-center gap-1.5 text-xs text-ink-secondary hover:text-ink-primary font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {/* Horizontal scroll grid of cards */}
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto pb-4 pr-12 scrollbar-thin scroll-smooth no-scrollbar">
                {topTrends.map((trend) => {
                  const isSelected = selectedTrend === trend.id;
                  return (
                    <motion.div
                      key={trend.id}
                      onClick={() => setSelectedTrend(trend.id)}
                      className={`flex-none w-[220px] bg-white rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer select-none relative group ${
                        isSelected 
                          ? "border-accent-primary ring-2 ring-accent-primary/10 shadow-md scale-[1.01]" 
                          : "border-border-soft hover:border-border-active hover:shadow-sm"
                      }`}
                      whileHover={{ y: isSelected ? 0 : -2 }}
                    >
                      {/* Top Rank Badge */}
                      <div className="absolute top-3 left-3 z-10 w-6 h-6 rounded-full bg-accent-primary text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {trend.id}
                      </div>

                      {/* Image Thumbnail Container */}
                      <div className="h-[125px] relative bg-bg-muted overflow-hidden border-b border-border-soft">
                        <img 
                          src={trend.image} 
                          alt={trend.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>

                      {/* Content details */}
                      <div className="p-4 flex flex-col justify-between h-[135px]">
                        <div>
                          <h3 className="text-xs font-bold text-ink-primary leading-snug line-clamp-2 min-h-[32px] group-hover:text-accent-primary transition-colors">
                            {trend.title}
                          </h3>
                          <span className="text-[10px] text-ink-muted font-semibold block mt-1.5">
                            {trend.articles} Articles
                          </span>
                        </div>

                        {/* CTA button inside Card */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartPipeline(trend.title);
                          }}
                          className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-accent-primary text-white hover:bg-opacity-95 shadow-sm shadow-accent-primary/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          Generate
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Next button centered on the right edge */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                <button 
                  onClick={() => {
                    const scrollContainer = document.querySelector(".overflow-x-auto");
                    if (scrollContainer) {
                      scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-white border border-border-soft shadow-md hover:shadow-lg flex items-center justify-center text-ink-primary hover:text-accent-primary hover:border-accent-primary transition-all cursor-pointer mr-[-16px]"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Previous Projects Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-ink-primary uppercase tracking-wider">
                Previous Projects
              </h2>
              <button 
                onClick={() => alert("Redirecting to all projects...")}
                className="text-xs font-bold text-accent-primary hover:underline transition-all cursor-pointer"
              >
                View all
              </button>
            </div>

            {/* Light themed table design */}
            <div className="bg-white border border-border-soft rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bg-muted/40 border-b border-border-soft text-[10px] font-bold text-ink-muted uppercase tracking-wider select-none">
                    <th className="py-3.5 px-6 w-[60px]">#</th>
                    <th className="py-3.5 px-6">Project Name</th>
                    <th className="py-3.5 px-6">Trend</th>
                    <th className="py-3.5 px-6">Created On</th>
                    <th className="py-3.5 px-6 w-[120px]">Duration</th>
                    <th className="py-3.5 px-6 w-[130px]">Status</th>
                    <th className="py-3.5 px-6 w-[140px] text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft text-xs text-ink-secondary">
                  {previousProjects.map((project) => (
                    <tr 
                      key={project.id}
                      className="hover:bg-bg-muted/10 transition-colors"
                    >
                      {/* Row index */}
                      <td className="py-4 px-6 font-semibold text-ink-muted">
                        {project.id}
                      </td>

                      {/* Project Name with Thumbnail */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-7 rounded bg-bg-muted overflow-hidden border border-border-soft shrink-0">
                            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-bold text-ink-primary hover:text-accent-primary transition-colors cursor-pointer">
                            {project.name}
                          </span>
                        </div>
                      </td>

                      {/* Associated Trend */}
                      <td className="py-4 px-6 font-semibold text-ink-secondary">
                        {project.trend}
                      </td>

                      {/* Created date */}
                      <td className="py-4 px-6 text-ink-muted font-medium">
                        {project.created}
                      </td>

                      {/* Video duration */}
                      <td className="py-4 px-6 font-mono text-ink-secondary font-medium">
                        {project.duration}
                      </td>

                      {/* Status pill badge */}
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-trend-spark/10 text-trend-spark border border-trend-spark/15">
                          <span className="w-1.5 h-1.5 rounded-full bg-trend-spark animate-pulse" />
                          {project.status}
                        </span>
                      </td>

                      {/* Actions column */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2 justify-end">
                          {/* Play button icon */}
                          <button 
                            onClick={() => alert(`Playing project: ${project.name}`)}
                            className="p-1.5 border border-border-soft hover:border-accent-primary hover:bg-accent-primary/5 hover:text-accent-primary text-ink-secondary rounded-lg transition-all cursor-pointer"
                            title="Play Video"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>
                          {/* Folder/Editor icon */}
                          <button 
                            onClick={() => alert(`Opening editor for: ${project.name}`)}
                            className="p-1.5 border border-border-soft hover:border-accent-primary hover:bg-accent-primary/5 hover:text-accent-primary text-ink-secondary rounded-lg transition-all cursor-pointer"
                            title="Open File Folder"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                          </button>
                          {/* Overflow Menu */}
                          <button 
                            onClick={() => alert("More options...")}
                            className="p-1.5 border border-border-soft hover:bg-bg-muted text-ink-secondary rounded-lg transition-all cursor-pointer"
                            title="More Actions"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Prompt banner / status at bottom-most center */}
          <div className="flex items-center justify-center py-4 select-none shrink-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/5 border border-accent-primary/10 rounded-full text-xs font-bold text-accent-primary shadow-sm">
              <Lightbulb className="w-4 h-4 animate-bounce" />
              <span>Select a trend above to start the AI pipeline</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
