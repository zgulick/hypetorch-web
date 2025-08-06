"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

// Import the unified data service
import { getRecentMetrics, EntityData } from '@/app/lib/dataService_unified';

interface TopMoversWidgetProps {
  className?: string;
  limit?: number;
  title?: string;
}

export default function TopMoversWidget({ 
  className = "",
  limit = 5,
  title = "Top 5 JORDN Scores This Week"
}: TopMoversWidgetProps) {
  const [topScores, setTopScores] = useState<EntityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTopScores() {
      try {
        setLoading(true);
        const metricsData = await getRecentMetrics('current', undefined, ['hype_score'], 100);
        // Sort by hype_score and take top 5
        const sortedData = metricsData
          .filter(item => item.metrics?.hype_score !== undefined && item.metrics.hype_score !== null)
          .sort((a, b) => (b.metrics?.hype_score || 0) - (a.metrics?.hype_score || 0))
          .slice(0, limit);
        setTopScores(sortedData);
      } catch (err) {
        console.error('Error loading top scores:', err);
        setError('Failed to load JORDN scores');
        // No fallback data - show error state
      } finally {
        setLoading(false);
      }
    }

    loadTopScores();
  }, [limit]);


  if (loading) {
    return (
      <div className={`bg-gray-900 rounded-xl p-6 ${className}`}>
        <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
        <div className="space-y-4">
          {[...Array(limit)].map((_, i) => (
            <div key={i} className="flex items-center justify-between animate-pulse">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-700 rounded-full mr-3"></div>
                <div className="h-4 bg-gray-700 rounded w-24"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 bg-gray-700 rounded w-16 mr-2"></div>
                <div className="w-4 h-4 bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || topScores.length === 0) {
    return (
      <div className={`bg-red-900/20 border border-red-500/20 rounded-xl p-6 ${className}`}>
        <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
        <div className="text-center py-4">
          <p className="text-red-400 font-medium mb-2">API Connection Issue</p>
          <p className="text-gray-400 text-sm">
            {error || 'No trending data available'}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Check API connection and refresh page
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center text-orange-400">
          <TrendingUp className="w-5 h-5 mr-1" />
          <span className="text-sm">Live Data</span>
        </div>
      </div>

      {/* Top Scores List */}
      <div className="space-y-4">
        {topScores.map((player, index) => (
          <motion.div
            key={player.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
          >
            {/* Player Info */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-white text-sm">{player.name}</p>
                <p className="text-xs text-gray-400">
                  Current week leader
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center">
              <div className="text-right mr-3">
                <p className="font-bold text-white text-sm">
                  {(player.metrics?.hype_score || 0).toFixed(1)}
                </p>
                <p className="text-xs text-gray-400">
                  JORDN Score
                </p>
              </div>
              
              {/* Rank Indicator */}
              <div className="w-2 h-8 rounded-full bg-orange-400" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          Highest JORDN scores from current analysis period
        </p>
      </div>
    </motion.div>
  );
}