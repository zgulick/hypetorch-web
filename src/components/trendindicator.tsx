"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface TrendIndicatorProps {
  value: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({ 
  value, 
  showValue = true,
  size = "sm" 
}) => {
  const isPositive = value >= 0;
  
  // Size classes
  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "text-base px-2.5 py-1.5"
  };
  
  return (
    <div className={`flex items-center rounded-full ${
      isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
    } font-medium ${sizeClasses[size]}`}>
      {isPositive ? 
        <ArrowUpRight size={size === "sm" ? 14 : size === "md" ? 16 : 18} /> : 
        <ArrowDownRight size={size === "sm" ? 14 : size === "md" ? 16 : 18} />
      }
      {showValue && <span>{isPositive ? "+" : ""}{value.toFixed(1)}%</span>}
    </div>
  );
};

export default TrendIndicator;