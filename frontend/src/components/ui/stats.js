"use client";

import React from "react";
import { Card } from "./card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export function StatCard({ 
  title, 
  value, 
  change, 
  isPositive = true, 
  icon: Icon,
  description,
  delay = 0 
}) {
  return (
    <Card className="flex flex-col justify-between overflow-hidden group">
      {/* Background radial gradient glow on hover */}
      <div className="absolute inset-0 bg-radial-gradient from-accent-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-500" />
      
      <div>
        <div className="flex items-center justify-between text-ink-muted mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
          {Icon && (
            <div className="p-2 bg-bg-muted rounded-lg text-ink-secondary group-hover:text-accent-primary group-hover:bg-accent-primary/5 transition-colors">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>
        
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-sans tracking-tight text-ink-primary">
            {value}
          </span>
          {change && (
            <span className={`flex items-center gap-0.5 text-xs font-bold ${
              isPositive ? "text-trend-spark" : "text-rose-500"
            }`}>
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {change}
            </span>
          )}
        </div>
      </div>
      
      {description && (
        <div className="mt-4 pt-3 border-t border-border-soft flex items-center justify-between">
          <span className="text-xs text-ink-muted">{description}</span>
        </div>
      )}
    </Card>
  );
}

export function StatsGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}
