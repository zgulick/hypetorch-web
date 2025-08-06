"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb, Eye, TrendingUp } from 'lucide-react';

// Import the unified data service
import { getDashboardWidgets, DashboardWidgets } from '@/app/lib/dataService_unified';

interface IntelligenceDashboardProps {
  className?: string;
}

export default function IntelligenceDashboard({ className = "" }: IntelligenceDashboardProps) {
  const [widgets, setWidgets] = useState<DashboardWidgets | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardWidgets() {
      try {
        setLoading(true);
        const widgetData = await getDashboardWidgets();
        setWidgets(widgetData);
      } catch (err) {
        console.error('Error loading dashboard widgets:', err);
        setError('Failed to load dashboard data');
        // Fallback data for development/testing
        setWidgets({
          top_movers: [
            { name: 'Caitlin Clark', current_score: 89.2, change: 16.1, trend: 'up' },
            { name: 'Allisha Gray', current_score: 58.7, change: 29.9, trend: 'up' },
            { name: 'Angel Reese', current_score: 78.5, change: -4.6, trend: 'down' }
          ],
          narrative_alerts: [
            { name: 'Angel Reese', rodmn_score: 68.3, alert_level: 'medium', context: 'Rising controversy metrics' },
            { name: 'Diana Taurasi', rodmn_score: 55.7, alert_level: 'medium', context: 'Polarizing discussions detected' }
          ],
          story_opportunities: [
            { name: 'Jackie Young', hype_score: 52.4, mentions: 67, talk_time: 4.9, angle: 'Emerging storyline' },
            { name: 'Alyssa Thomas', hype_score: 65.3, mentions: 89, talk_time: 7.1, angle: 'Veteran presence growing' },
            { name: 'Kelsey Plum', hype_score: 48.2, mentions: 45, talk_time: 3.8, angle: 'Under the radar momentum' }
          ]
        });
      } finally {
        setLoading(false);
      }
    }

    loadDashboardWidgets();
  }, []);

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

  if (!widgets) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-400">Unable to load intelligence dashboard</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
      {/* Top Movers Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Top Movers</h3>
        </div>
        <div className="space-y-3">
          {widgets.top_movers.slice(0, 3).map((mover) => (
            <div key={mover.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
              <div>
                <p className="font-medium text-white text-sm">{mover.name}</p>
                <p className="text-xs text-gray-400">HYPE Score: {mover.current_score.toFixed(1)}</p>
              </div>
              <div className={`flex items-center text-sm font-bold ${
                mover.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {mover.change > 0 ? '+' : ''}{mover.change.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Biggest percentage changes this period
        </p>
      </motion.div>

      {/* Narrative Alerts Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Narrative Monitor</h3>
        </div>
        <div className="space-y-3">
          {widgets.narrative_alerts.slice(0, 3).map((alert) => (
            <div key={alert.name} className="flex items-start justify-between p-3 rounded-lg bg-gray-800/50">
              <div className="flex-1">
                <p className="font-medium text-white text-sm">{alert.name}</p>
                <p className="text-xs text-gray-400 mt-1">{alert.context}</p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-bold ${getAlertColor(alert.alert_level)}`}>
                {alert.rodmn_score.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          High RODMN scores indicate controversial discussions
        </p>
      </motion.div>

      {/* Story Opportunities Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700"
      >
        <div className="flex items-center mb-4">
          <Lightbulb className="w-5 h-5 text-blue-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Story Opportunities</h3>
        </div>
        <div className="space-y-3">
          {widgets.story_opportunities.slice(0, 3).map((story) => (
            <div key={story.name} className="p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-white text-sm">{story.name}</p>
                <div className="flex items-center text-xs text-blue-400">
                  <Eye className="w-3 h-3 mr-1" />
                  {story.hype_score.toFixed(1)}
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-2">{story.angle}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{story.mentions} mentions</span>
                <span>{story.talk_time.toFixed(1)} min talk time</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Data-backed angles ready for coverage
        </p>
      </motion.div>
    </div>
  );
}