"use client";

import React from "react";
import { Card } from "./card";
import { Badge } from "./badge";
import { Play, MoreVertical, Film, Clock, Eye } from "lucide-react";
import { motion } from "framer-motion";

export function ProjectCard({ 
  title, 
  status, 
  duration, 
  timestamp, 
  aspectRatio = "9:16", 
  gradientFrom = "from-indigo-50",
  gradientTo = "to-blue-50",
  views
}) {
  const getStatusVariant = (s) => {
    switch (s.toLowerCase()) {
      case "rendered":
      case "completed":
        return "success";
      case "rendering":
        return "primary";
      case "draft":
        return "neutral";
      default:
        return "danger";
    }
  };

  return (
    <Card className="flex flex-col h-[280px] p-0 overflow-hidden group">
      {/* Visual Thumbnail Area */}
      <div className="h-[150px] relative overflow-hidden bg-bg-muted border-b border-border-soft flex items-center justify-center">
        {/* Abstract gradient representation */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out`} />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 dot-grid opacity-30" />
        
        {/* Center overlay icon */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-ink-primary cursor-pointer hover:bg-opacity-95"
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </motion.div>
        </div>

        {/* Top Floating Badge Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <Badge variant={getStatusVariant(status)}>{status}</Badge>
          <span className="text-[10px] font-mono font-bold bg-white/95 text-ink-primary shadow-sm border border-border-soft px-1.5 py-0.5 rounded backdrop-blur-sm">
            {aspectRatio}
          </span>
        </div>
        
        {/* Bottom Floating duration tag */}
        <div className="absolute bottom-3 right-3 bg-ink-primary/80 backdrop-blur-md text-white text-[10px] font-mono px-1.5 py-0.5 rounded font-medium">
          {duration}
        </div>
      </div>

      {/* Meta Content Area */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-sm text-ink-primary group-hover:text-accent-primary transition-colors line-clamp-1">
              {title}
            </h4>
            <button className="text-ink-muted hover:text-ink-primary p-0.5 rounded transition-colors cursor-pointer">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-ink-muted">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {timestamp}
            </span>
            {views !== undefined && (
              <span className="flex items-center gap-1">
                <span className="w-1 h-1 bg-border-active rounded-full" />
                <Eye className="w-3.5 h-3.5" />
                {views} views
              </span>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-border-soft flex items-center justify-between text-[11px] font-medium text-ink-secondary">
          <span className="flex items-center gap-1">
            <Film className="w-3.5 h-3.5 text-accent-primary/60" />
            Shorts pipeline
          </span>
          <button className="text-accent-primary hover:underline cursor-pointer">
            Open editor
          </button>
        </div>
      </div>
    </Card>
  );
}
