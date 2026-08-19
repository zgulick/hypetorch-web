"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Users } from 'lucide-react';

// Import components
import WeeklyEvolutionChart from '@/components/WeeklyEvolutionChart';
import DemoDashboard from '@/components/DemoDashboard';
import HeadToHeadComparison from '@/components/HeadToHeadComparison';
import DemoControls from '@/components/DemoControls';

// Import types and data fetching
import { TimePeriod, getCurrentAnalysisPeriod } from '@/app/lib/dataService_unified';

/**
 * DemoPageClient - Client Component for Interactive Demo Features
 *
 * Handles all interactivity client-side:
 * - Vertical/metric selection
 * - Chart randomization
 * - URL query parameter handling
 * - Data fetching for current period info
 */
export default function DemoPageClient() {
  const [selectedMetric, setSelectedMetric] = useState<'hype_score' | 'rodmn_score' | 'pipn_score'>('hype_score');
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod | null>(null);

  useEffect(() => {
    // Read vertical from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const verticalParam = urlParams.get('vertical');
    if (verticalParam) {
      setSelectedVertical(verticalParam);
    }

    // Fetch current period data
    async function loadPeriod() {
      try {
        const period = await getCurrentAnalysisPeriod();
        setCurrentPeriod(period);
      } catch (error) {
        console.error('Error loading current period:', error);
      }
    }
    loadPeriod();
  }, []);

  return (
    <>
      {/* Sticky Control Panel */}
      <DemoControls
        selectedVertical={selectedVertical}
        onVerticalChange={setSelectedVertical}
        selectedMetric={selectedMetric}
        onMetricChange={setSelectedMetric}
        currentPeriod={currentPeriod}
      />

      {/* Weekly Evolution Chart */}
      <section id="evolution-chart" className="py-12 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-3">
              <LineChart className="w-7 h-7 text-orange-400 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Weekly Evolution Tracker</h2>
            </div>
            <p className="text-base text-gray-400 max-w-2xl mx-auto">
              Track how player narratives evolve over time. Identify trending storylines before they become mainstream news.
            </p>
          </motion.div>

          {/* Chart Component */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <WeeklyEvolutionChart
              periods={5}
              metric={selectedMetric}
              height={450}
              subcategory={selectedVertical}
            />
          </motion.div>
        </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section id="metrics-dashboard" className="py-12 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <DemoDashboard subcategory={selectedVertical} />
        </div>
      </section>

      {/* Player Deep Dive Comparison */}
      <section id="player-comparison" className="py-12 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-3">
              <Users className="w-7 h-7 text-purple-400 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Head-to-Head Comparison</h2>
            </div>
            <p className="text-base text-gray-400 max-w-2xl mx-auto">
              Multi-dimensional analysis comparing top players side by side.
            </p>
          </motion.div>

          {/* Head-to-Head Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <HeadToHeadComparison
              playerOne={
                selectedVertical === 'NBA' ? 'LeBron James' :
                selectedVertical === 'Unrivaled' ? 'Caitlin Clark' :
                'Caitlin Clark' // Default for cross-vertical
              }
              playerTwo={
                selectedVertical === 'NBA' ? 'Stephen Curry' :
                selectedVertical === 'Unrivaled' ? 'Angel Reese' :
                'Angel Reese' // Default for cross-vertical
              }
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
