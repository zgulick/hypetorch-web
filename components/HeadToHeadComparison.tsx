"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  Eye, 
  BarChart3,
  Hash,
  Search,
  FileText
} from 'lucide-react';

// Import the unified data service
import { getRecentMetrics, EntityData } from '@/app/lib/dataService_unified';

interface HeadToHeadProps {
  playerOne: string;
  playerTwo: string;
}

interface MetricComparisonProps {
  icon: React.ReactNode;
  label: string;
  playerOneValue: number;
  playerTwoValue: number;
  playerOneName: string;
  playerTwoName: string;
  formatValue: (value: number) => string;
  color: string;
}

function MetricComparison({ 
  icon, 
  label, 
  playerOneValue, 
  playerTwoValue, 
  playerOneName, 
  playerTwoName, 
  formatValue,
  color 
}: MetricComparisonProps) {
  const total = playerOneValue + playerTwoValue;
  const playerOnePercent = total > 0 ? (playerOneValue / total) * 100 : 50;
  const playerTwoPercent = total > 0 ? (playerTwoValue / total) * 100 : 50;
  
  const leader = playerOneValue > playerTwoValue ? playerOneName : playerTwoName;
  const leadingValue = Math.max(playerOneValue, playerTwoValue);
  
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center mb-3">
        <div className={`text-${color}-400 mr-2`}>{icon}</div>
        <h4 className="text-white font-semibold text-sm">{label}</h4>
      </div>
      
      {/* Values */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="text-center">
          <div className="text-orange-400 font-bold text-lg">{formatValue(playerOneValue)}</div>
          <div className="text-xs text-gray-400">{playerOneName}</div>
        </div>
        <div className="text-center">
          <div className="text-blue-400 font-bold text-lg">{formatValue(playerTwoValue)}</div>
          <div className="text-xs text-gray-400">{playerTwoName}</div>
        </div>
      </div>
      
      {/* Visual comparison bar */}
      <div className="relative bg-gray-700 rounded-full h-3 mb-2">
        <div 
          className="absolute top-0 left-0 h-3 bg-gradient-to-r from-orange-500 to-orange-400 rounded-l-full"
          style={{ width: `${playerOnePercent}%` }}
        />
        <div 
          className="absolute top-0 right-0 h-3 bg-gradient-to-l from-blue-500 to-blue-400 rounded-r-full"
          style={{ width: `${playerTwoPercent}%` }}
        />
      </div>
      
      {/* Leader indicator */}
      <div className="text-center">
        <span className={`text-xs font-medium ${
          playerOneValue > playerTwoValue ? 'text-orange-400' : 'text-blue-400'
        }`}>
          {leader} leads with {formatValue(leadingValue)}
        </span>
      </div>
    </div>
  );
}

export default function HeadToHeadComparison({ 
  playerOne = "Caitlin Clark", 
  playerTwo = "Angel Reese" 
}: HeadToHeadProps) {
  const [playersData, setPlayersData] = useState<EntityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlayersData() {
      try {
        setLoading(true);
        setError(null);

        // Use entity names filter to get specific players
        const metricsData = await getRecentMetrics('current', [playerOne, playerTwo], [
          'hype_score',
          'rodmn_score',
          'mentions',
          'talk_time',
          'wikipedia_views',
          'reddit_mentions',
          'google_trends',
          'google_news_mentions'
        ], 50);

        console.log('HeadToHead: Loaded data for', playerOne, 'and', playerTwo, ':', metricsData);

        // Filter for our two players (case-insensitive)
        const filteredData = metricsData.filter(player =>
          player.name.toLowerCase() === playerOne.toLowerCase() ||
          player.name.toLowerCase() === playerTwo.toLowerCase()
        );

        if (filteredData.length < 2) {
          console.warn('HeadToHead: Only found', filteredData.length, 'players. Looking for:', playerOne, playerTwo);
        }

        setPlayersData(filteredData);
      } catch (err) {
        console.error('Error loading players data:', err);
        setError(`Failed to load data for ${playerOne} and ${playerTwo}`);
      } finally {
        setLoading(false);
      }
    }

    loadPlayersData();
  }, [playerOne, playerTwo]);

  // Helper functions
  const getPlayerData = (playerName: string): EntityData | undefined => {
    return playersData.find(p => p.name === playerName);
  };

  const formatScore = (value: number) => value.toFixed(1);
  const formatCount = (value: number) => value.toLocaleString();
  const formatTime = (value: number) => `${value.toFixed(1)}m`;
  const formatViews = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toLocaleString();
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="text-center mb-6">
          <div className="h-6 bg-gray-700 rounded w-64 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-800/50 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-3 w-20"></div>
              <div className="h-6 bg-gray-700 rounded mb-2 w-16"></div>
              <div className="h-3 bg-gray-700 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || playersData.length < 2) {
    return (
      <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-6">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-white mb-4">Head-to-Head Comparison</h4>
          <p className="text-red-400 font-medium mb-2">API Connection Issue</p>
          <p className="text-gray-400 text-sm">
            {error || 'Unable to load comparison data'}
          </p>
        </div>
      </div>
    );
  }

  const playerOneData = getPlayerData(playerOne);
  const playerTwoData = getPlayerData(playerTwo);

  if (!playerOneData || !playerTwoData) {
    return (
      <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-6">
        <div className="text-center">
          <h4 className="text-xl font-semibold text-white mb-4">Head-to-Head Comparison</h4>
          <p className="text-red-400 font-medium mb-2">Data Not Found</p>
          <p className="text-gray-400 text-sm">
            Could not find data for one or both players
          </p>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      label: "JORDN Score",
      playerOneValue: playerOneData.metrics?.hype_score || 0,
      playerTwoValue: playerTwoData.metrics?.hype_score || 0,
      formatValue: formatScore,
      color: 'orange'
    },
    {
      icon: <BarChart3 className="w-4 h-4" />,
      label: "RODMN Score",
      playerOneValue: playerOneData.metrics?.rodmn_score || 0,
      playerTwoValue: playerTwoData.metrics?.rodmn_score || 0,
      formatValue: formatScore,
      color: 'red'
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      label: "Mentions",
      playerOneValue: playerOneData.metrics?.mentions || 0,
      playerTwoValue: playerTwoData.metrics?.mentions || 0,
      formatValue: formatCount,
      color: 'blue'
    },
    {
      icon: <Clock className="w-4 h-4" />,
      label: "Talk Time",
      playerOneValue: playerOneData.metrics?.talk_time || 0,
      playerTwoValue: playerTwoData.metrics?.talk_time || 0,
      formatValue: formatTime,
      color: 'green'
    },
    {
      icon: <Eye className="w-4 h-4" />,
      label: "Wikipedia Views",
      playerOneValue: playerOneData.metrics?.wikipedia_views || 0,
      playerTwoValue: playerTwoData.metrics?.wikipedia_views || 0,
      formatValue: formatViews,
      color: 'purple'
    },
    {
      icon: <Hash className="w-4 h-4" />,
      label: "Reddit Mentions",
      playerOneValue: playerOneData.metrics?.reddit_mentions || 0,
      playerTwoValue: playerTwoData.metrics?.reddit_mentions || 0,
      formatValue: formatCount,
      color: 'indigo'
    },
    {
      icon: <Search className="w-4 h-4" />,
      label: "Google Trends",
      playerOneValue: playerOneData.metrics?.google_trends || 0,
      playerTwoValue: playerTwoData.metrics?.google_trends || 0,
      formatValue: formatCount,
      color: 'cyan'
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: "Google News",
      playerOneValue: playerOneData.metrics?.google_news_mentions || 0,
      playerTwoValue: playerTwoData.metrics?.google_news_mentions || 0,
      formatValue: formatCount,
      color: 'teal'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h4 className="text-xl font-semibold text-white mb-2">
          Head-to-Head: All 8 Analytics Dimensions
        </h4>
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-orange-400 font-medium">{playerOne}</span>
          </div>
          <span className="text-gray-400">vs</span>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-blue-400 font-medium">{playerTwo}</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <MetricComparison
              icon={metric.icon}
              label={metric.label}
              playerOneValue={metric.playerOneValue}
              playerTwoValue={metric.playerTwoValue}
              playerOneName={playerOne}
              playerTwoName={playerTwo}
              formatValue={metric.formatValue}
              color={metric.color}
            />
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/30 rounded-lg p-3">
            <h5 className="font-semibold text-orange-400 mb-1 text-sm">Rivalry Analysis</h5>
            <p className="text-xs text-gray-400">
              Direct performance comparison across all influence metrics reveals complementary strengths 
              and different audience engagement patterns.
            </p>
          </div>
          <div className="bg-gray-800/30 rounded-lg p-3">
            <h5 className="font-semibold text-blue-400 mb-1 text-sm">Marketing Insight</h5>
            <p className="text-xs text-gray-400">
              Use these metrics to determine optimal partnership strategies and content approaches 
              for each athlete&apos;s unique influence profile.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}