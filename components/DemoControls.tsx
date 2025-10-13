'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import VerticalSelector from './VerticalSelector';
import { TimePeriod } from '@/app/lib/dataService_unified';

interface DemoControlsProps {
  selectedVertical: string | null;
  onVerticalChange: (vertical: string | null) => void;
  selectedMetric: 'hype_score' | 'rodmn_score';
  onMetricChange: (metric: 'hype_score' | 'rodmn_score') => void;
  currentPeriod: TimePeriod | null;
  className?: string;
}

/**
 * Sticky Control Panel for Demo Page
 *
 * Consolidates all demo page controls into a single, always-accessible bar:
 * - Vertical selection (All/Unrivaled/NBA/Altcoins/Memecoins)
 * - Metric toggle (JORDN/RODMN)
 * - Current analysis period display
 *
 * Uses sticky positioning to stay visible while scrolling.
 */
export const DemoControls: React.FC<DemoControlsProps> = ({
  selectedVertical,
  onVerticalChange,
  selectedMetric,
  onMetricChange,
  currentPeriod,
  className = ''
}) => {
  const formatPeriodLabel = (period: TimePeriod | null) => {
    if (!period) return "Latest Period";
    return period.display_label;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-xl ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* Left: Vertical Selector */}
          <div className="flex-shrink-0">
            <div className="text-xs text-gray-400 mb-2 lg:mb-1 font-medium uppercase tracking-wide">
              Select Vertical
            </div>
            <VerticalSelector
              selected={selectedVertical}
              onChange={onVerticalChange}
              className="w-full"
            />
          </div>

          {/* Center: Metric Toggle */}
          <div className="flex-shrink-0">
            <div className="text-xs text-gray-400 mb-2 lg:mb-1 font-medium uppercase tracking-wide">
              Metric Type
            </div>
            <div className="bg-gray-800 rounded-lg p-1 border border-gray-700 inline-flex">
              <button
                onClick={() => onMetricChange('hype_score')}
                className={`px-4 sm:px-6 py-2 rounded-md font-semibold transition-all text-sm whitespace-nowrap flex items-center gap-2 ${
                  selectedMetric === 'hype_score'
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>JORDN</span>
              </button>
              <button
                onClick={() => onMetricChange('rodmn_score')}
                className={`px-4 sm:px-6 py-2 rounded-md font-semibold transition-all text-sm whitespace-nowrap flex items-center gap-2 ${
                  selectedMetric === 'rodmn_score'
                    ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>RODMN</span>
              </button>
            </div>
          </div>

          {/* Right: Analysis Period Badge */}
          <div className="flex-shrink-0">
            <div className="text-xs text-gray-400 mb-2 lg:mb-1 font-medium uppercase tracking-wide">
              Analysis Period
            </div>
            <div className="bg-gray-800/50 rounded-lg px-4 py-2 border border-gray-700 inline-flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-gray-300">
                {formatPeriodLabel(currentPeriod)}
              </span>
            </div>
          </div>
        </div>

        {/* Active Filters Indicator (Mobile only - shows what's selected) */}
        <div className="lg:hidden mt-3 pt-3 border-t border-gray-800">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-gray-500 font-medium">Active:</span>
            <div className="px-2 py-1 bg-orange-500/20 border border-orange-500/30 rounded text-xs text-orange-400">
              {selectedVertical || 'All Verticals'}
            </div>
            <div className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400">
              {selectedMetric === 'hype_score' ? 'JORDN Score' : 'RODMN Score'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoControls;
