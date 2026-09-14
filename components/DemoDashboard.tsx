"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, MessageSquare, Clock, BarChart3, AlertTriangle } from 'lucide-react';

// Import the unified data service
import { getRecentMetrics, EntityData } from '@/app/lib/dataService_unified';
import { Vertical, getAvailableVerticals } from '@/app/lib/verticals';

interface PIPNTileProps {
  data: EntityData[];
  loading: boolean;
  error: string | null;
  subcategory: string | null;
  verticals: Vertical[];
}

function PIPNTile({ data, loading, subcategory, verticals }: PIPNTileProps) {
  // Get vertical metadata from verticals array
  const currentVertical = verticals.find(v => v.key === subcategory);
  // PIPN is attention percentile minus reach percentile, so what gates it is
  // whether we have follower counts - not whether the entities are people. A
  // hotel brand has an Instagram account and a meaningful attention-per-
  // follower score. Falls back to the old person check when the deployed API
  // predates has_reach_data, so an API/web version skew degrades to the
  // previous behaviour rather than hiding the tile everywhere.
  const hasReachData = currentVertical?.has_reach_data ?? currentVertical?.has_person_entities;
  const missingReachData = currentVertical && !hasReachData;

  if (missingReachData) {
    return (
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700/50 opacity-50">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 text-gray-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-500">Attention Efficiency</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">No social reach data for this vertical</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-700 rounded w-32"></div>
          <div className="h-3 bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    );
  }

  // Get undervalued (positive PIPN)
  const undervalued = data
    .filter(item => {
      const pipn = item.metrics?.pipn_score;
      return pipn !== null && pipn !== undefined && pipn > 0;
    })
    .sort((a, b) => (b.metrics?.pipn_score || 0) - (a.metrics?.pipn_score || 0))
    .slice(0, 3);

  // Get overvalued (negative PIPN)
  const overvalued = data
    .filter(item => {
      const pipn = item.metrics?.pipn_score;
      return pipn !== null && pipn !== undefined && pipn < 0;
    })
    .sort((a, b) => (a.metrics?.pipn_score || 0) - (b.metrics?.pipn_score || 0))
    .slice(0, 3);

  // Debug logging
  if (typeof window !== 'undefined' && data.length > 0) {
    console.log('PIPN Tile Debug:', {
      totalEntities: data.length,
      entitiesWithPIPN: data.filter(item => item.metrics?.pipn_score !== null && item.metrics?.pipn_score !== undefined).length,
      undervaluedCount: undervalued.length,
      overvaluedCount: overvalued.length,
      sampleEntity: data[0],
      subcategory
    });
  }

  // Partial data quality warning icon (only used in PIPN tile)
  const PartialDataIcon = () => (
    <AlertTriangle className="w-3 h-3 text-yellow-500 ml-1" />
  );

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <BarChart3 className="w-5 h-5 text-cyan-400 mr-2" />
        <Link href="/methodology#pipn" title="How this is calculated">
          <h3 className="text-lg font-semibold text-white hover:text-orange-400 transition-colors">💎 Attention Efficiency</h3>
        </Link>
      </div>

      {/* Rising Stars Section - Mobile: stacks vertically */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center">
          ▲ RISING STARS (Undervalued)
        </h4>
        <div className="space-y-2">
          {undervalued.length > 0 ? (
            undervalued.map((player, index) => (
              <div
                key={player.name}
                className="flex items-center justify-between p-2 rounded-lg bg-cyan-900/20 hover:bg-cyan-900/30 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-cyan-400 font-bold text-xs mr-2">{index + 1}.</span>
                  <span className="text-white text-sm">{player.name}</span>
                  {player.metrics?.social_data_quality === 'partial' && <PartialDataIcon />}
                </div>
                <span className="font-bold text-cyan-400 text-sm">
                  +{player.metrics?.pipn_score?.toFixed(0)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center py-2">No data available</p>
          )}
        </div>
      </div>

      {/* Overexposed Section */}
      <div>
        <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center">
          ▼ OVEREXPOSED (Overvalued)
        </h4>
        <div className="space-y-2">
          {overvalued.length > 0 ? (
            overvalued.map((player, index) => (
              <div
                key={player.name}
                className="flex items-center justify-between p-2 rounded-lg bg-red-900/20 hover:bg-red-900/30 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-red-400 font-bold text-xs mr-2">{index + 1}.</span>
                  <span className="text-white text-sm">{player.name}</span>
                  {player.metrics?.social_data_quality === 'partial' && <PartialDataIcon />}
                </div>
                <span className="font-bold text-red-400 text-sm">
                  {player.metrics?.pipn_score?.toFixed(0)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center py-2">No data available</p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          Attention efficiency relative to social reach
        </p>
      </div>
    </div>
  );
}

interface MetricTileProps {
  title: string;
  icon: React.ReactNode;
  data: EntityData[];
  formatValue: (value: number) => string;
  valueKey: keyof NonNullable<EntityData['metrics']>;
  color: string;
  loading: boolean;
  error: string | null;
  /** Anchor on /methodology explaining this metric. Omitted for metrics with no section. */
  methodologyAnchor?: string;
}

/**
 * Renders a tile heading, linking to the methodology page when that metric has a
 * documented section. The link wraps the rendered heading rather than altering the
 * `title` string, because sibling components use label strings as control flow.
 */
function TileHeading({ title, methodologyAnchor }: { title: string; methodologyAnchor?: string }) {
  const heading = <h3 className="text-lg font-semibold text-white ml-2">{title}</h3>;
  if (!methodologyAnchor) return heading;
  return (
    <Link
      href={methodologyAnchor}
      className="ml-2 hover:text-orange-400 transition-colors"
      title="How this is calculated"
    >
      <h3 className="text-lg font-semibold text-white hover:text-orange-400 transition-colors">{title}</h3>
    </Link>
  );
}

function MetricTile({ title, icon, data, formatValue, valueKey, color, loading, error, methodologyAnchor }: MetricTileProps) {
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
          <TileHeading title={title} methodologyAnchor={methodologyAnchor} />
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
        <TileHeading title={title} methodologyAnchor={methodologyAnchor} />
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
                {formatValue(Number(player.metrics?.[valueKey] || 0))}
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

interface DemoDashboardProps {
  className?: string;
  subcategory?: string | null;
  /** Metrics prefetched on the server for the default (no-vertical) view. */
  initialData?: EntityData[];
  /** Verticals prefetched on the server. */
  initialVerticals?: Vertical[];
}

export default function DemoDashboard({
  className = '',
  subcategory = null,
  initialData,
  initialVerticals
}: DemoDashboardProps) {
  // Server-provided data covers the initial (no-subcategory) render. Anything
  // else - a vertical the server didn't prefetch - still loads client-side.
  const hasServerData = Boolean(initialData?.length) && !subcategory;

  const [allData, setAllData] = useState<EntityData[]>(initialData || []);
  const [loading, setLoading] = useState(!hasServerData);
  const [error, setError] = useState<string | null>(null);
  const [verticals, setVerticals] = useState<Vertical[]>(initialVerticals || []);

  // Load verticals data on mount (skipped when the server already sent them)
  useEffect(() => {
    if (initialVerticals?.length) return;

    async function loadVerticals() {
      try {
        const verticalsData = await getAvailableVerticals();
        setVerticals(verticalsData);
      } catch (err) {
        console.error('Error loading verticals:', err);
      }
    }
    loadVerticals();
  }, [initialVerticals]);

  useEffect(() => {
    // Don't refetch what the server already rendered.
    if (hasServerData) {
      setAllData(initialData || []);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadAllMetrics() {
      try {
        setLoading(true);
        // Use getRecentMetrics instead to get PIPN data. The subcategory filter
        // is applied by the API now - it returns `subcategory` on each row, but
        // filtering server-side avoids shipping the other verticals entirely.
        const metricsData = await getRecentMetrics(
          'current',
          undefined, // Get all entities
          [
            'hype_score',
            'rodmn_score',
            'pipn_score',
            'reach_score',
            'mentions',
            'talk_time',
            'wikipedia_views'
          ],
          100,
          'Sports',
          subcategory
        );

        if (cancelled) return;
        setAllData(metricsData);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.error('Error loading all metrics:', err);
        setError('Failed to load metrics data');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAllMetrics();
    return () => { cancelled = true; };
  }, [subcategory, hasServerData, initialData]);

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

  const tiles: Omit<MetricTileProps, 'loading' | 'error'>[] = [
    {
      title: "Top 5 JORDN Scores",
      icon: <TrendingUp className="w-5 h-5" />,
      data: getTopByMetric('hype_score'),
      formatValue: formatScore,
      valueKey: 'hype_score' as const,
      color: 'orange',
      methodologyAnchor: '/methodology#jordn'
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
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`space-y-8 ${className}`}
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
                methodologyAnchor={tile.methodologyAnchor}
                loading={loading}
                error={error}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom row - 2 tiles: Talk Time and PIPN */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ width: 'calc(66.666667% + 0.75rem)' }}>
            {/* Talk Time Tile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MetricTile
                title={tiles[3].title}
                icon={tiles[3].icon}
                data={tiles[3].data}
                formatValue={tiles[3].formatValue}
                valueKey={tiles[3].valueKey}
                color={tiles[3].color}
                loading={loading}
                error={error}
              />
            </motion.div>

            {/* PIPN Tile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <PIPNTile
                data={allData}
                loading={loading}
                error={error}
                subcategory={subcategory}
                verticals={verticals}
              />
            </motion.div>
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