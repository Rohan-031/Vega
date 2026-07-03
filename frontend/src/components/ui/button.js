"use client";

import React from "react";
import { motion } from "framer-motion";

export function Button({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "", 
  disabled = false,
  icon: Icon
}) {
  const baseStyle = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-accent-primary text-white hover:bg-opacity-95 shadow-sm shadow-accent-primary/20 focus:ring-accent-primary",
    secondary: "bg-white border border-border-active text-ink-primary hover:bg-bg-muted focus:ring-border-active",
    ghost: "text-ink-secondary hover:bg-bg-muted hover:text-ink-primary focus:ring-bg-muted",
    glow: "bg-white border border-accent-primary/20 text-accent-primary hover:bg-accent-primary/5 hover:border-accent-primary/45 shadow-sm shadow-accent-primary/5 focus:ring-accent-primary"
  };

  return (
    <motion.button
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ y: 0, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
}
