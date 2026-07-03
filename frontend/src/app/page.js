"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { StatCard, StatsGrid } from "@/components/ui/stats";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Search, 
  Bell, 
  Plus, 
  Flame, 
  Cpu, 
  Video, 
  Users, 
  Activity,
  ArrowRight,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [isSearching, setIsSearching] = useState(false);

  // Stagger variants for page load entry
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 28 }
    }
  };

  // Indian Trends Data for the Right Panel
  const indianTrends = [
    { name: "#IPL2026Auction", spike: "+240%", source: "Twitter India", category: "Sports" },
    { name: "Chandrayaan-4 Launch", spike: "+185%", source: "Google Trends", category: "Science" },
    { name: "Tax Slab Changes 2026", spike: "+120%", source: "Google Trends", category: "Finance" },
    { name: "AI Coding Studio Startup", spike: "+95%", source: "Twitter India", category: "Tech" },
    { name: "Taj Mahal Restoration", spike: "+45%", source: "News India", category: "Culture" },
  ];

  // Project List
  const projects = [
    {
      title: "#Chandrayaan4Launch: India's Next Moon Journey",
      status: "Completed",
      duration: "0:35",
      timestamp: "2 hours ago",
      aspectRatio: "9:16",
      gradientFrom: "from-blue-100",
      gradientTo: "to-indigo-150",
      views: "12.4K",
      tab: "completed"
    },
    {
      title: "#Budget2026: Tax Reform Highlights Simplified",
      status: "Rendering",
      duration: "0:58",
      timestamp: "5 mins ago",
      aspectRatio: "9:16",
      gradientFrom: "from-amber-100",
      gradientTo: "to-orange-100",
      views: 0,
      tab: "rendering"
    },
    {
      title: "#CricketVictory: IND vs AUS Historic Over",
      status: "Completed",
      duration: "0:45",
      timestamp: "1 day ago",
      aspectRatio: "9:16",
      gradientFrom: "from-emerald-100",
      gradientTo: "to-teal-150",
      views: "42.1K",
      tab: "completed"
    },
    {
      title: "Indian AI Startup Ecosystem Boom Explainer",
      status: "Draft",
      duration: "1:02",
      timestamp: "3 days ago",
      aspectRatio: "16:9",
      gradientFrom: "from-purple-100",
      gradientTo: "to-fuchsia-100",
      views: 0,
      tab: "drafts"
    }
  ];

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(p => p.tab === activeTab);

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      {/* 1. Collapsible Left Sidebar */}
      <Sidebar activePath="/dashboard" />

      {/* 2. Main Dashboard Window */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-border-soft bg-bg-surface px-8 flex items-center justify-between shrink-0">
          {/* Left: Breadcrumbs or Project Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Workspace</span>
            <span className="text-xs text-border-active">/</span>
            <span className="text-sm font-semibold text-ink-primary">Main Dashboard</span>
          </div>

          {/* Right: Search + Action Control panel */}
          <div className="flex items-center gap-4">
            {/* Search command bar layout */}
            <div className={`relative flex items-center border rounded-lg transition-all ${
              isSearching ? "w-64 border-accent-primary ring-1 ring-accent-primary/20" : "w-48 border-border-soft"
            } bg-bg-muted/50 px-3 py-1.5`}>
              <Search className="w-3.5 h-3.5 text-ink-muted shrink-0 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                onFocus={() => setIsSearching(true)}
                onBlur={() => setIsSearching(false)}
                className="w-full text-xs font-medium text-ink-primary bg-transparent focus:outline-none placeholder-ink-muted"
              />
              <span className="text-[10px] font-mono font-bold bg-white text-ink-muted border border-border-soft px-1 rounded shadow-sm select-none pointer-events-none shrink-0">
                ⌘K
              </span>
            </div>

            {/* Notification triggers */}
            <button className="relative p-2 hover:bg-bg-muted rounded-lg text-ink-secondary hover:text-ink-primary transition-colors cursor-pointer">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent-primary rounded-full" />
            </button>

            {/* Primary CTA: Start Vega */}
            <Button variant="primary" icon={Sparkles}>
              Start Vega
            </Button>
          </div>
        </header>

        {/* Dashboard Workstation Scroll Context */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          
          {/* Welcome Area Section */}
          <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-xl border border-border-soft bg-bg-surface relative overflow-hidden dot-grid"
          >
            {/* Soft backdrop radial light reflection */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-primary/[0.015] rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-1.5 relative z-10 max-w-xl">
              <h2 className="text-xl font-bold text-ink-primary tracking-tight font-sans flex items-center gap-2">
                Good morning, Creator
                <motion.span 
                  animate={{ rotate: [0, 15, -10, 15, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 5, duration: 1.5 }}
                >
                  👋
                </motion.span>
              </h2>
              <p className="text-xs text-ink-secondary leading-relaxed">
                VEGA is active and scraping Indian trends. We've detected <span className="text-trend-spark font-bold">3 viral breakouts</span> in the last hour. Let the agents compose a video on the latest trends automatically.
              </p>
            </div>

            <div className="mt-4 md:mt-0 relative z-10">
              <Button variant="glow" icon={Plus}>
                Create Custom Project
              </Button>
            </div>
          </motion.section>

          {/* Dummy Statistics Grid */}
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
              Workspace Performance Metrics
            </div>
            
            <StatsGrid>
              <motion.div variants={itemVariants}>
                <StatCard 
                  title="Scraped Trends" 
                  value="42" 
                  change="+12% today" 
                  isPositive={true}
                  icon={Flame}
                  description="Updated 2 mins ago"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StatCard 
                  title="AI Video Outputs" 
                  value="18" 
                  change="2 in progress" 
                  isPositive={true}
                  icon={Video}
                  description="Total renders this week"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StatCard 
                  title="Combined Social Reach" 
                  value="148.5K" 
                  change="+32.4% vs lw" 
                  isPositive={true}
                  icon={Users}
                  description="YouTube & Reels metrics"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <StatCard 
                  title="Pipeline Efficiency" 
                  value="99.8%" 
                  change="-0.2%" 
                  isPositive={false}
                  icon={Activity}
                  description="Average API response 1.2s"
                />
              </motion.div>
            </StatsGrid>
          </motion.section>

          {/* Action Trigger Card & Projects Panel Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left side: Project Grid Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                  Recent Generation Projects
                </div>
                
                {/* Visual tabs controls */}
                <div className="flex bg-bg-muted p-0.5 rounded-lg border border-border-soft">
                  {["all", "completed", "rendering", "drafts"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveTab(t)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md capitalize transition-all cursor-pointer ${
                        activeTab === t 
                          ? "bg-bg-surface text-ink-primary shadow-sm" 
                          : "text-ink-secondary hover:text-ink-primary"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Projects Grid with exit/enter transitions */}
              {filteredProjects.length === 0 ? (
                <div className="border border-dashed border-border-soft rounded-xl p-12 text-center text-ink-muted bg-bg-surface/50">
                  No projects in this category.
                </div>
              ) : (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ProjectCard {...project} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Right side: Trends Ticker Panel */}
            <div className="space-y-4">
              <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-accent-primary" />
                Active Indian Trends (Real-time)
              </div>

              <Card className="p-4 space-y-3" hoverable={false}>
                <div className="space-y-3 divide-y divide-border-soft">
                  {indianTrends.map((trend, i) => (
                    <div 
                      key={trend.name} 
                      className={`pt-3 first:pt-0 flex items-start justify-between group/item`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-ink-primary group-hover/item:text-accent-primary transition-colors">
                            {trend.name}
                          </span>
                          <span className="text-[9px] font-semibold bg-trend-spark/10 text-trend-spark px-1.5 py-0.2 rounded-md">
                            {trend.spike}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] text-ink-muted">
                          <span>{trend.source}</span>
                          <span>•</span>
                          <span>{trend.category}</span>
                        </div>
                      </div>
                      
                      <button className="text-ink-muted group-hover/item:text-accent-primary p-1 hover:bg-bg-muted rounded-md transition-all cursor-pointer">
                        <ArrowRight className="w-3.5 h-3.5 group-hover/item:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border-soft text-center">
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent-primary hover:underline"
                  >
                    Open Trend Radar
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </Card>

              {/* Start Vega Quick-Launch Banner */}
              <div className="bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border border-accent-primary/10 rounded-xl p-5 relative overflow-hidden flex flex-col gap-3 group/banner dot-grid">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/15 shadow-sm">
                  <Cpu className="w-4 h-4" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-semibold text-xs text-ink-primary">
                    Launch Trend-to-Video pipeline
                  </h4>
                  <p className="text-[10px] text-ink-secondary leading-relaxed">
                    Automatically crawl breaking topics, research sources, script narration, generate visuals, and mix assets into finished Reels.
                  </p>
                </div>
                
                <Button 
                  variant="primary" 
                  className="w-full text-xs font-semibold bg-accent-primary hover:bg-opacity-95 shadow-sm mt-1 py-2"
                  icon={Sparkles}
                >
                  Start Vega AI Pipeline
                </Button>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
