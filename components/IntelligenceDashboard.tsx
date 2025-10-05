"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp } from 'lucide-react';

// Import the unified data service
import { getEntitiesWithMetrics, EntityData } from '@/app/lib/dataService_unified';


interface IntelligenceDashboardProps {
  className?: string;
  subcategory?: string | null;
}

export default function IntelligenceDashboard({
  className = "",
  subcategory = null
}: IntelligenceDashboardProps) {
  const [topMovers, setTopMovers] = useState<EntityData[]>([]);
  const [narrativeAlerts, setNarrativeAlerts] = useState<EntityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        // Get top movers (sorted by hype_score, descending) - get more to ensure proper sorting
        const topMoversData = await getEntitiesWithMetrics({
          subcategory,
          limit: 50,
          sort_by: "hype_score",
          sort_order: "desc"
        });

        // Get narrative alerts (sorted by rodmn_score, descending) - get more to ensure proper sorting
        const narrativeData = await getEntitiesWithMetrics({
          subcategory,
          limit: 50,
          sort_by: "rodmn_score",
          sort_order: "desc"
        });

        // Filter entities with valid metrics and apply client-side sorting as backup
        const topMoversList = topMoversData
          .filter(entity =>
            entity.metrics?.hype_score !== null &&
            entity.metrics?.hype_score !== undefined
          )
          .sort((a, b) => (b.metrics?.hype_score || 0) - (a.metrics?.hype_score || 0))
          .slice(0, 3);

        const narrativeAlertsList = narrativeData
          .filter(entity =>
            entity.metrics?.rodmn_score !== null &&
            entity.metrics?.rodmn_score !== undefined
          )
          .sort((a, b) => (b.metrics?.rodmn_score || 0) - (a.metrics?.rodmn_score || 0))
          .slice(0, 5);

        setTopMovers(topMoversList);
        setNarrativeAlerts(narrativeAlertsList);
        setError(null);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [subcategory]);

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-16 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-6">
          <p className="text-red-400 font-medium mb-2">API Connection Issue</p>
          <p className="text-gray-400 text-sm">
            {error || 'Unable to load intelligence dashboard'}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Check API connection and refresh page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`contents ${className}`}>
      {/* Top Movers Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 h-full flex flex-col"
      >
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Top Movers</h3>
        </div>
        <div className="space-y-3 flex-grow">
          {topMovers.slice(0, 3).map((mover) => (
            <div key={mover.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
              <div>
                <p className="font-medium text-white text-sm">{mover.name}</p>
                <p className="text-xs text-gray-400">HYPE Score: {(mover.metrics?.hype_score || 0).toFixed(1)}</p>
              </div>
              <div className="flex items-center text-sm font-bold text-green-400">
                <span className="text-orange-400">#{topMovers.indexOf(mover) + 1}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Highest HYPE scores this period
        </p>
      </motion.div>

      {/* Narrative Alerts Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 h-full flex flex-col"
      >
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Narrative Monitor</h3>
        </div>
        <div className="space-y-3 flex-grow">
          {narrativeAlerts.slice(0, 5).map((alert) => (
            <div key={alert.name} className="flex items-start justify-between p-3 rounded-lg bg-gray-800/50">
              <div className="flex-1">
                <p className="font-medium text-white text-sm">{alert.name}</p>
                <p className="text-xs text-gray-400 mt-1">High RODMN activity detected</p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-bold ${getAlertColor('medium')}`}>
                {(alert.metrics?.rodmn_score || 0).toFixed(1)}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Top RODMN scores this week - higher values indicate more controversy
        </p>
      </motion.div>
    </div>
  );
}