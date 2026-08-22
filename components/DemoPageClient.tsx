"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LineChart, Users, ArrowRight } from 'lucide-react';

// recharts (~94 KB gzipped) was the single largest contributor to this route's
// bundle. The chart's own `isVisible` gate means it never rendered during SSR
// anyway, so splitting it out costs nothing visually and takes recharts off the
// initial download. Its data arrives via props, so it paints as soon as the
// chunk loads - no network request.
const WeeklyEvolutionChart = dynamic(() => import('@/components/WeeklyEvolutionChart'), {
  ssr: false,
  loading: () => (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="h-6 w-1/3 mb-4 rounded bg-gray-700 animate-pulse" />
      <div className="h-[450px] rounded bg-gray-700/60 animate-pulse" />
    </div>
  )
});

// Import components
import DemoDashboard from '@/components/DemoDashboard';
import HeadToHeadComparison from '@/components/HeadToHeadComparison';
import DemoControls from '@/components/DemoControls';

// Import types and data fetching
import { TimePeriod, getCurrentAnalysisPeriod } from '@/app/lib/dataService_unified';
import type { DemoInitialData } from '@/app/lib/demoData.server';

interface DemoPageClientProps {
  /** Everything the page needs, fetched and cached on the server. */
  initialData: DemoInitialData;
}

/**
 * DemoPageClient - Client Component for Interactive Demo Features
 *
 * Receives server-prefetched data and passes it down so the charts and
 * dashboard paint with real numbers on first render instead of mounting empty
 * and each firing their own request chain.
 *
 * Handles all interactivity client-side:
 * - Vertical/metric selection
 * - Chart randomization
 * - URL query parameter handling
 */
export default function DemoPageClient({ initialData }: DemoPageClientProps) {
  const [selectedMetric, setSelectedMetric] = useState<'hype_score' | 'rodmn_score' | 'pipn_score'>('hype_score');
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod | null>(initialData.currentPeriod);

  useEffect(() => {
    // Read vertical from URL query parameter. The page is statically rendered
    // for the default view, so a deep link like ?vertical=NBA is applied here
    // and the children refetch for that vertical.
    const urlParams = new URLSearchParams(window.location.search);
    const verticalParam = urlParams.get('vertical');
    if (verticalParam) {
      setSelectedVertical(verticalParam);
    }

    // Only fetch the period if the server couldn't supply it.
    if (initialData.currentPeriod) return;

    async function loadPeriod() {
      try {
        const period = await getCurrentAnalysisPeriod();
        setCurrentPeriod(period);
      } catch (error) {
        console.error('Error loading current period:', error);
      }
    }
    loadPeriod();
  }, [initialData.currentPeriod]);

  // Server data describes the default view only; once a vertical is picked the
  // children fetch for themselves.
  const serverViewActive = !selectedVertical;
  const availablePlayerNames = initialData.entities.map(e => e.name);

  return (
    <>
      {/* Sticky Control Panel */}
      <DemoControls
        selectedVertical={selectedVertical}
        onVerticalChange={setSelectedVertical}
        selectedMetric={selectedMetric}
        onMetricChange={setSelectedMetric}
        currentPeriod={currentPeriod}
        initialVerticals={initialData.verticals}
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
              initialData={serverViewActive ? initialData.evolutionData : undefined}
              initialPlayers={serverViewActive ? initialData.playerNames : undefined}
              initialAvailablePlayers={availablePlayerNames}
            />
          </motion.div>
        </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section id="metrics-dashboard" className="py-12 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-4">
            <Link
              href="/methodology"
              className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-orange-400 transition-colors"
            >
              How these are calculated <ArrowRight size={14} />
            </Link>
          </div>
          <DemoDashboard
            subcategory={selectedVertical}
            initialData={serverViewActive ? initialData.dashboardMetrics : undefined}
            initialVerticals={initialData.verticals}
          />
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
              initialData={serverViewActive ? initialData.comparisonMetrics : undefined}
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
