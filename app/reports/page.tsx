"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../Navbar";
import { BarChart3, TrendingUp, Users, Calendar, Target } from "lucide-react";

// Import existing components
import DemoDashboard from '@/components/DemoDashboard';
import WeeklyEvolutionChart from '@/components/WeeklyEvolutionChart';
import HeadToHeadComparison from '@/components/HeadToHeadComparison';

// Import data service
import { getCurrentAnalysisPeriod, TimePeriod } from '@/app/lib/dataService_unified';

export default function ReportsPage() {
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod | null>(null);
  
  useEffect(() => {
    async function loadCurrentPeriod() {
      try {
        const period = await getCurrentAnalysisPeriod();
        setCurrentPeriod(period);
      } catch (error) {
        console.error('Error loading current period:', error);
      }
    }
    
    loadCurrentPeriod();
  }, []);

  const formatPeriodLabel = (period: TimePeriod | null) => {
    if (!period) return "Latest Analysis Period";
    return period.display_label;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Header Section */}
      <section className="relative w-full pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Analytics & Reports
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Explore comprehensive athlete influence data for {formatPeriodLabel(currentPeriod)}
            </p>
          </motion.div>

          {/* Key Metrics Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 text-center">
              <BarChart3 className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">500+</h3>
              <p className="text-gray-400 text-sm">Athletes Tracked</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">15M+</h3>
              <p className="text-gray-400 text-sm">Data Points</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">25+</h3>
              <p className="text-gray-400 text-sm">Sports Covered</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 text-center">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">Daily</h3>
              <p className="text-gray-400 text-sm">Updates</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Dashboard */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-full px-6 pb-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Interactive Analytics Dashboard
          </h2>
          <DemoDashboard />
        </div>
      </motion.section>

      {/* Weekly Evolution Chart */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative w-full px-6 pb-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Weekly Trend Analysis
          </h2>
          <WeeklyEvolutionChart />
        </div>
      </motion.section>

      {/* Head-to-Head Comparison */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative w-full px-6 pb-16"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Athlete Comparison Tool
          </h2>
          <HeadToHeadComparison />
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="relative w-full px-6 pb-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-12 border border-orange-500/30">
            <Target className="w-16 h-16 text-orange-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready for Custom Analytics?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get personalized reports, custom dashboards, and direct access to our analytics team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 hover:scale-105">
                  Get Started Today
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-8 py-4 bg-transparent border border-gray-600 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors">
                  Schedule Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}