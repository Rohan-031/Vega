import React from "react";

export function Badge({ 
  children, 
  variant = "neutral" 
}) {
  const baseStyle = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium tracking-tight";
  
  const variants = {
    neutral: "bg-bg-muted text-ink-secondary border border-border-soft",
    primary: "bg-accent-primary/10 text-accent-primary border border-accent-primary/15",
    success: "bg-trend-spark/10 text-trend-spark border border-trend-spark/15",
    warning: "bg-amber-500/10 text-amber-600 border border-amber-500/15",
    danger: "bg-rose-500/10 text-rose-600 border border-rose-500/15"
  };

  return (
    <span className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </span>
  );
}
