"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MessageSquare, Clock, Eye, BarChart3 } from 'lucide-react';

// Import the unified data service
import { getRecentMetrics, EntityData } from '@/app/lib/dataService_unified';

interface MetricTileProps {
  title: string;
  icon: React.ReactNode;
  data: EntityData[];
  formatValue: (value: number) => string;
  valueKey: keyof NonNullable<EntityData['metrics']>;
  color: string;
  loading: boolean;
  error: string | null;
}

function MetricTile({ title, icon, data, formatValue, valueKey, color, loading, error }: MetricTileProps) {
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center mb-4">
          <div className="animate-pulse">
            <div className="w-5 h-5 bg-gray-700 rounded mr-2"></div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between animate-pulse">
              <div className="h-3 bg-gray-700 rounded w-20"></div>
              <div className="h-3 bg-gray-700 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-6">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="text-lg font-semibold text-white ml-2">{title}</h3>
        </div>
        <div className="text-center py-4">
          <p className="text-red-400 font-medium mb-2">API Connection Issue</p>
          <p className="text-gray-400 text-sm">
            {error || 'No data available'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <div className={`text-${color}-400`}>{icon}</div>
        <h3 className="text-lg font-semibold text-white ml-2">{title}</h3>
      </div>
      <div className="space-y-3 flex-grow">
        {data.map((player, index) => (
          <motion.div
            key={player.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 bg-gradient-to-r from-${color}-400 to-${color}-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3`}>
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-white text-sm">{player.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold text-${color}-400 text-sm`}>
                {formatValue(player.metrics?.[valueKey] || 0)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          Top performers in current analysis period
        </p>
      </div>
    </div>
  );
}

export default function DemoDashboard() {
  const [allData, setAllData] = useState<EntityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAllMetrics() {
      try {
        setLoading(true);
        const metricsData = await getRecentMetrics('current', undefined, [
          'hype_score', 
          'rodmn_score', 
          'mentions', 
          'talk_time', 
          'wikipedia_views'
        ], 100);
        setAllData(metricsData);
      } catch (err) {
        console.error('Error loading all metrics:', err);
        setError('Failed to load metrics data');
      } finally {
        setLoading(false);
      }
    }

    loadAllMetrics();
  }, []);

  // Helper functions for data processing
  const getTopByMetric = (metric: keyof NonNullable<EntityData['metrics']>, limit: number = 5): EntityData[] => {
    return allData
      .filter(item => item.metrics?.[metric] !== undefined && item.metrics?.[metric] !== null && item.metrics?.[metric] !== 0)
      .sort((a, b) => (Number(b.metrics?.[metric]) || 0) - (Number(a.metrics?.[metric]) || 0))
      .slice(0, limit);
  };

  // Formatting functions
  const formatScore = (value: number) => value.toFixed(1);
  const formatCount = (value: number) => value.toLocaleString();
  const formatTime = (value: number) => `${value.toFixed(1)}m`;
  const formatViews = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  const tiles = [
    {
      title: "Top 5 JORDN Scores",
      icon: <TrendingUp className="w-5 h-5" />,
      data: getTopByMetric('hype_score'),
      formatValue: formatScore,
      valueKey: 'hype_score' as const,
      color: 'orange'
    },
    {
      title: "Top 5 RODMN Scores", 
      icon: <BarChart3 className="w-5 h-5" />,
      data: getTopByMetric('rodmn_score'),
      formatValue: formatScore,
      valueKey: 'rodmn_score' as const,
      color: 'red'
    },
    {
      title: "Top 5 Mentions",
      icon: <MessageSquare className="w-5 h-5" />,
      data: getTopByMetric('mentions'),
      formatValue: formatCount,
      valueKey: 'mentions' as const,
      color: 'blue'
    },
    {
      title: "Top 5 Talk Time",
      icon: <Clock className="w-5 h-5" />,
      data: getTopByMetric('talk_time'),
      formatValue: formatTime,
      valueKey: 'talk_time' as const,
      color: 'green'
    },
    {
      title: "Top 5 Wikipedia Views",
      icon: <Eye className="w-5 h-5" />,
      data: getTopByMetric('wikipedia_views'),
      formatValue: formatViews,
      valueKey: 'wikipedia_views' as const,
      color: 'purple'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <BarChart3 className="w-8 h-8 text-blue-400 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">Key Metrics Dashboard</h2>
        </div>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">
          Real-time leaderboards across all major influence metrics. 
          See which athletes dominate in conversation volume, search interest, and overall narrative impact.
        </p>
      </div>

      {/* Metrics Grid - Pyramid Layout */}
      <div className="space-y-6">
        {/* Top row - 3 tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiles.slice(0, 3).map((tile, index) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <MetricTile
                title={tile.title}
                icon={tile.icon}
                data={tile.data}
                formatValue={tile.formatValue}
                valueKey={tile.valueKey}
                color={tile.color}
                loading={loading}
                error={error}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Bottom row - 2 tiles centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ width: 'calc(66.666667% + 0.75rem)' }}>
          {tiles.slice(3, 5).map((tile, index) => (
            <motion.div
              key={tile.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
            >
              <MetricTile
                title={tile.title}
                icon={tile.icon}
                data={tile.data}
                formatValue={tile.formatValue}
                valueKey={tile.valueKey}
                color={tile.color}
                loading={loading}
                error={error}
              />
            </motion.div>
          ))}
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4 text-center">Analytics Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400 mb-2">Multi-Metric</div>
            <div className="text-sm text-gray-400">Cross-reference performance across all dimensions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">Real-Time</div>
            <div className="text-sm text-gray-400">Updated weekly with latest conversation data</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">Actionable</div>
            <div className="text-sm text-gray-400">Identify trending athletes for strategic partnerships</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}