"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Search, 
  Sparkles, 
  ArrowRight, 
  RefreshCw, 
  WifiOff, 
  CheckCircle2, 
  Info,
  Calendar,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 10 High-Quality Indian Trends for Fallback
const FALLBACK_TRENDS = [
  { title: "#IPL2026Auction: Mega Cricket Transfers", published: "Fri, 03 Jul 2026 00:10:00 +0530", link: "https://trends.google.com", category: "Sports", volume: "+310% Vol", summary: "Indian Premier League mega player auction schedules spark viral discussions and fantasy leagues nationwide." },
  { title: "Chandrayaan-4 Mission: ISRO Moon Launch", published: "Thu, 02 Jul 2026 23:45:00 +0530", link: "https://trends.google.com", category: "Science", volume: "+225% Vol", summary: "ISRO unveils technical blueprints for the lunar sample return spacecraft, aiming for a 2028 takeoff." },
  { title: "Budget 2026: New Income Tax Slabs", published: "Thu, 02 Jul 2026 22:30:00 +0530", link: "https://trends.google.com", category: "Finance", volume: "+180% Vol", summary: "Revised direct tax tables trigger computational analysis, financial summaries, and middle-class reactions." },
  { title: "AI Coding Studio Startup Boom", published: "Thu, 02 Jul 2026 21:15:00 +0530", link: "https://trends.google.com", category: "Tech", volume: "+145% Vol", summary: "India becomes the global hub for generative AI engineering as dozens of tool-building firms close seed rounds." },
  { title: "Monsoon Alerts: Mumbai Local Travel Warnings", published: "Thu, 02 Jul 2026 20:00:00 +0530", link: "https://trends.google.com", category: "Weather", volume: "+115% Vol", summary: "IMD issues orange alerts for high precipitation across western coasts, causing transit updates in city hubs." },
  { title: "Bollywood Film Gala 2026 Nominations", published: "Thu, 02 Jul 2026 18:45:00 +0530", link: "https://trends.google.com", category: "Cinema", volume: "+90% Vol", summary: "Stellar indie releases dominate national categories, challenging traditional blockbuster entries." },
  { title: "Electric Vehicle Battery Subsidies Extended", published: "Thu, 02 Jul 2026 17:30:00 +0530", link: "https://trends.google.com", category: "Auto & Tech", volume: "+80% Vol", summary: "FAME-IV policy drafts highlight massive support for localization of lithium processing factories." },
  { title: "UPI Offline Payments: RBI New Feature Update", published: "Thu, 02 Jul 2026 16:15:00 +0530", link: "https://trends.google.com", category: "Finance", volume: "+70% Vol", summary: "Reserve Bank enables smart voice-prompt payments without cellular connection, expanding rural fintech." },
  { title: "Taj Mahal Conservation: Restoration Efforts", published: "Thu, 02 Jul 2026 15:00:00 +0530", link: "https://trends.google.com", category: "Culture", volume: "+55% Vol", summary: "Archeological survey adopts premium zero-chemical clay packs to treat discolored outer dome sections." },
  { title: "Millets Export Contracts Surge 40%", published: "Thu, 02 Jul 2026 13:45:00 +0530", link: "https://trends.google.com", category: "Agri-Business", volume: "+35% Vol", summary: "Indian ancient grains capture European and American organic markets, establishing record trading scales." }
];

export default function TrendSelection() {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Stagger entry animations
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 350, damping: 28 }
    }
  };

  useEffect(() => {
    async function fetchTrends() {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/trends");
        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }
        const data = await response.json();
        
        if (data.status === "success" && Array.isArray(data.trends)) {
          // Normalize API data — augment with fallback mock fields for display
          const apiTrends = data.trends.map((item, index) => {
            const fallbackMatch = FALLBACK_TRENDS[index % FALLBACK_TRENDS.length];
            // Format the raw traffic number (e.g. "10000+" → "+10,000 searches")
            const rawTraffic = item.traffic || "";
            const formattedVolume = rawTraffic
              ? `+${Number(rawTraffic.replace(/[^0-9]/g, "")).toLocaleString("en-IN")}+ searches`
              : fallbackMatch.volume;

            return {
              title: item.title,
              published: item.published || new Date().toISOString(),
              link: item.link || "#",
              // Use live API category hint from news_source or fallback
              category: item.news_source || fallbackMatch.category,
              volume: formattedVolume,
              // Use live news headline as summary if available
              summary: item.news_title || fallbackMatch.summary,
              picture: item.picture || "",
            };
          });
          
          setTrends(apiTrends.slice(0, 10)); // Take top 10 trends
          setIsOffline(false);
          setError(null);
        } else {
          throw new Error("Invalid API format");
        }
      } catch (err) {
        console.warn("FastAPI offline or failed. Loading premium mockup trend data.", err);
        setTrends(FALLBACK_TRENDS);
        setIsOffline(true);
      } finally {
        setLoading(false);
      }
    }

    fetchTrends();
  }, [refreshKey]);

  // Filter trends based on search query
  const filteredTrends = trends.filter(trend => 
    trend.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    trend.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (trend.summary && trend.summary.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectTrend = (trend) => {
    if (selectedTrend?.title === trend.title) {
      setSelectedTrend(null); // Toggle off
    } else {
      setSelectedTrend(trend);
    }
  };

  // Helper to format date
  const formatPublishedDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base">
      {/* 1. Navigation Sidebar */}
      <Sidebar activePath="/trends" />

      {/* 2. Page Workstation Context */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Navigation Header */}
        <header className="h-16 border-b border-border-soft bg-bg-surface px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">Pipeline</span>
            <span className="text-xs text-border-active">/</span>
            <span className="text-sm font-semibold text-ink-primary flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-accent-primary" />
              Trend Selection
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh list buttons */}
            <button 
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="p-2 border border-border-soft hover:bg-bg-muted hover:text-ink-primary rounded-lg text-ink-secondary transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              disabled={loading}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </header>

        {/* Content View Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 relative">
          
          {/* Header Description */}
          <div className="space-y-1.5">
            <h1 className="text-xl font-bold text-ink-primary tracking-tight font-sans flex items-center gap-2">
              Indian Trend Radar
              <span className="text-xs font-bold bg-accent-primary/10 text-accent-primary border border-accent-primary/15 px-2 py-0.5 rounded-full">
                Active geo: India
              </span>
            </h1>
            <p className="text-xs text-ink-secondary max-w-2xl leading-relaxed">
              Select one of the top 10 trending queries identified in India over the past 24 hours. Our multi-agent AI pipeline will perform news analysis, draft scripts, synthesize voiceovers, and assemble final video assets for this topic.
            </p>
          </div>

          {/* Offline Warning Notice */}
          {isOffline && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-amber-500/10 border border-amber-500/15 rounded-lg flex items-center justify-between text-xs text-amber-700 max-w-4xl"
            >
              <div className="flex items-center gap-2 font-medium">
                <WifiOff className="w-4 h-4 text-amber-600" />
                <span>FastAPI backend offline at port 8000. Running with premium local trend database.</span>
              </div>
              <Badge variant="warning">Offline Sandbox</Badge>
            </motion.div>
          )}

          {/* Search Toolbar */}
          <div className="flex items-center gap-4 max-w-md">
            <div className="relative flex items-center border border-border-soft rounded-lg flex-1 bg-bg-surface px-3 py-2">
              <Search className="w-4 h-4 text-ink-muted shrink-0 mr-2.5" />
              <input 
                type="text" 
                placeholder="Search trends by topic, keyword, or category..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-medium text-ink-primary bg-transparent focus:outline-none placeholder-ink-muted"
              />
            </div>
          </div>

          {/* Core Content Area */}
          <div className="max-w-6xl">
            {loading ? (
              /* Loading Skeletons */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-bg-surface border border-border-soft rounded-xl p-5 space-y-4 animate-pulse">
                    <div className="flex items-center justify-between">
                      <div className="h-4 bg-bg-muted rounded w-1/4" />
                      <div className="h-4 bg-bg-muted rounded w-1/6" />
                    </div>
                    <div className="h-6 bg-bg-muted rounded w-3/4" />
                    <div className="h-10 bg-bg-muted rounded w-full" />
                    <div className="h-4 bg-bg-muted rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : filteredTrends.length === 0 ? (
              <div className="border border-dashed border-border-soft rounded-xl p-12 text-center text-ink-muted bg-bg-surface/50 max-w-4xl">
                No trends match your search criteria. Try a different query.
              </div>
            ) : (
              /* Trend Cards List Grid */
              <motion.div 
                variants={listVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {filteredTrends.map((trend) => {
                  const isSelected = selectedTrend?.title === trend.title;
                  return (
                    <motion.div 
                      key={trend.title}
                      variants={cardVariants}
                      onClick={() => handleSelectTrend(trend)}
                      className="cursor-pointer"
                    >
                      <Card 
                        className={`h-full border transition-all duration-300 relative ${
                          isSelected 
                            ? "border-accent-primary ring-1 ring-accent-primary/25 bg-accent-primary/[0.01]" 
                            : "border-border-soft hover:border-border-active bg-bg-surface"
                        }`}
                        hoverable={!isSelected}
                      >
                        {/* Selector check indicator */}
                        {isSelected && (
                          <div className="absolute top-4 right-4 text-accent-primary">
                            <CheckCircle2 className="w-5 h-5 fill-accent-primary/10" />
                          </div>
                        )}

                        <div className="space-y-3">
                          {/* Row 1: Badges & Volume */}
                          <div className="flex items-center gap-2">
                            <Badge variant={isSelected ? "primary" : "neutral"}>
                              {trend.category}
                            </Badge>
                            <span className="text-[10px] font-bold text-trend-spark flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3" />
                              {trend.volume}
                            </span>
                          </div>

                          {/* Row 2: Headline */}
                          <h3 className={`text-base font-bold tracking-tight pr-6 transition-colors ${
                            isSelected ? "text-accent-primary" : "text-ink-primary"
                          }`}>
                            {trend.title}
                          </h3>

                          {/* Row 3: AI Description */}
                          {trend.summary && (
                            <p className="text-xs text-ink-secondary leading-relaxed">
                              {trend.summary}
                            </p>
                          )}

                          {/* Row 4: Metas (Date & RSS Links) */}
                          <div className="pt-3 border-t border-border-soft flex items-center justify-between text-[10px] text-ink-muted font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatPublishedDate(trend.published)}
                            </span>
                            
                            <a 
                              href={trend.link} 
                              target="_blank" 
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()} // Prevent card selection on link click
                              className="hover:text-ink-primary inline-flex items-center gap-0.5"
                            >
                              Google Source
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Generous spacer for floating footer */}
          <div className="h-24" />

        </div>

        {/* Floating Continue Bar */}
        <AnimatePresence>
          {selectedTrend && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="absolute bottom-0 left-64 right-0 h-20 bg-bg-surface/85 backdrop-blur-md border-t border-border-soft px-8 flex items-center justify-between z-40 shadow-lg shadow-black/[0.02]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent-primary/10 border border-accent-primary/15 flex items-center justify-center text-accent-primary shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-ink-muted uppercase block leading-3 tracking-wider">Selected Topic</span>
                  <span className="text-sm font-bold text-ink-primary truncate max-w-md block">
                    {selectedTrend.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => setSelectedTrend(null)} 
                  variant="secondary"
                  className="px-4"
                >
                  Clear Selection
                </Button>
                <Button 
                  variant="primary" 
                  icon={ArrowRight}
                  className="bg-accent-primary text-white hover:bg-opacity-95 shadow-sm px-6 py-2.5"
                  onClick={() => {
                    alert(`Starting pipeline workflow for topic: ${selectedTrend.title}. Moving to AI script generation stage...`);
                  }}
                >
                  Continue to Workflow
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
