"use client";

import React from "react";
import { motion } from "framer-motion";

export function Card({ 
  children, 
  className = "", 
  hoverable = true,
  dotGrid = false 
}) {
  return (
    <motion.div
      whileHover={hoverable ? { 
        y: -4, 
        borderColor: "var(--color-border-active)",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.04)"
      } : {}}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={`bg-bg-surface border border-border-soft rounded-xl p-5 relative overflow-hidden transition-colors ${
        dotGrid ? "dot-grid" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-base font-semibold text-ink-primary tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`text-sm text-ink-secondary ${className}`}>
      {children}
    </div>
  );
}
