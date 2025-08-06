"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity, MessageCircle, Clock, User } from 'lucide-react';

// Import the unified data service
import { getFeaturedPlayers, EntityData } from '@/app/lib/dataService_unified';

interface PlayerShowcaseProps {
  className?: string;
}

export default function PlayerShowcase({ className = "" }: PlayerShowcaseProps) {
  const [players, setPlayers] = useState<EntityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFeaturedPlayers() {
      try {
        setLoading(true);
        const featuredData = await getFeaturedPlayers();
        setPlayers(featuredData);
      } catch (err) {
        console.error('Error loading featured players:', err);
        setError('Failed to load player data');
        // Fallback data for development/testing
        setPlayers([
          {
            name: 'Caitlin Clark',
            metrics: { hype_score: 89.2, rodmn_score: 34.1, mentions: 156, talk_time: 12.3 }
          },
          {
            name: 'Angel Reese',
            metrics: { hype_score: 78.5, rodmn_score: 42.8, mentions: 134, talk_time: 9.7 }
          },
          {
            name: 'Alyssa Thomas',
            metrics: { hype_score: 65.3, rodmn_score: 18.2, mentions: 89, talk_time: 7.1 }
          },
          {
            name: 'Allisha Gray',
            metrics: { hype_score: 58.7, rodmn_score: 25.6, mentions: 67, talk_time: 5.8 }
          },
          {
            name: 'Jackie Young',
            metrics: { hype_score: 52.4, rodmn_score: 21.3, mentions: 54, talk_time: 4.9 }
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedPlayers();
  }, []);

  const getScoreColor = (score: number, type: 'hype' | 'rodmn') => {
    if (type === 'hype') {
      if (score >= 80) return 'text-green-400';
      if (score >= 60) return 'text-yellow-400';
      return 'text-orange-400';
    } else {
      if (score >= 60) return 'text-red-400';
      if (score >= 40) return 'text-yellow-400';
      return 'text-green-400';
    }
  };

  const getTrendIcon = (score: number) => {
    if (score >= 60) return <TrendingUp className="w-4 h-4 text-green-400" />;
    return <TrendingDown className="w-4 h-4 text-red-400" />;
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ${className}`}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 ${className}`}>
      {players.map((player, index) => (
        <motion.div
          key={player.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
        >
          {/* Player Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="ml-3">
                <h3 className="font-semibold text-white text-sm">{player.name}</h3>
              </div>
            </div>
            {player.metrics?.hype_score && getTrendIcon(player.metrics.hype_score)}
          </div>

          {/* Metrics */}
          <div className="space-y-3">
            {/* HYPE Score */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-3 h-3 text-orange-400 mr-2" />
                <span className="text-xs text-gray-400">HYPE</span>
              </div>
              <span className={`font-bold text-sm ${getScoreColor(player.metrics?.hype_score || 0, 'hype')}`}>
                {player.metrics?.hype_score?.toFixed(1) || '0.0'}
              </span>
            </div>

            {/* RODMN Score */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-3 h-3 text-red-400 mr-2" />
                <span className="text-xs text-gray-400">RODMN</span>
              </div>
              <span className={`font-bold text-sm ${getScoreColor(player.metrics?.rodmn_score || 0, 'rodmn')}`}>
                {player.metrics?.rodmn_score?.toFixed(1) || '0.0'}
              </span>
            </div>

            {/* Mentions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageCircle className="w-3 h-3 text-blue-400 mr-2" />
                <span className="text-xs text-gray-400">Mentions</span>
              </div>
              <span className="font-bold text-sm text-blue-400">
                {player.metrics?.mentions || 0}
              </span>
            </div>

            {/* Talk Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-3 h-3 text-purple-400 mr-2" />
                <span className="text-xs text-gray-400">Minutes</span>
              </div>
              <span className="font-bold text-sm text-purple-400">
                {player.metrics?.talk_time?.toFixed(1) || '0.0'}
              </span>
            </div>
          </div>

          {/* Business Context */}
          <div className="mt-4 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-500">
              {player.metrics?.hype_score && player.metrics.hype_score > 70 
                ? "High engagement storyline" 
                : player.metrics?.hype_score && player.metrics.hype_score > 50 
                ? "Growing narrative potential" 
                : "Emerging opportunity"}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}