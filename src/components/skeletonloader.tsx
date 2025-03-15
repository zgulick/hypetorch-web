"use client";

import React from "react";

export const SkeletonCard = () => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-800 animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div>
        <div className="h-4 w-32 bg-gray-700 rounded mb-2"></div>
        <div className="h-6 w-20 bg-gray-700 rounded"></div>
      </div>
      <div className="p-2 rounded-full bg-gray-700 h-8 w-8"></div>
    </div>
    <div className="h-4 w-24 bg-gray-700 rounded"></div>
  </div>
);

export const SkeletonChart = () => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-800 animate-pulse">
    <div className="h-6 w-48 bg-gray-700 rounded mb-6"></div>
    <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center">
      <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
        ></path>
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 12h16M12 4v16"
        ></path>
      </svg>
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    {/* Metrics row skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={`metric-${i}`} />
      ))}
    </div>
    
    {/* Main chart skeleton */}
    <SkeletonChart />
    
    {/* Two column charts skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SkeletonChart />
      <SkeletonChart />
    </div>
    
    {/* Full width chart skeleton */}
    <SkeletonChart />
  </div>
);