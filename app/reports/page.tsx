"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../Navbar";
import { BarChart3, TrendingUp, Users, Calendar, Target, Zap, Eye } from "lucide-react";

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
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center pt-32 pb-16 px-6">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500 leading-tight mb-6"
          >
            Advanced Analytics for Sports Media
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-4 font-medium"
          >
            JORDN & RODMN scores derived from YouTube podcast analysis
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-lg text-gray-400 max-w-3xl mx-auto mb-8"
          >
            See what we track and how our analytics work with real data from YouTube sports discussions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/pricing">
              <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 hover:scale-105">
                <Target size={18} /> Get Your Report
              </button>
            </Link>
            <Link href="/pricing#api-docs">
              <button className="px-8 py-3 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold flex items-center gap-2 transition-colors">
                <BarChart3 size={18} /> View API Docs
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Current Data Accuracy Banner */}
      <section className="relative w-full px-6 py-4 bg-orange-900/10 border-y border-orange-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-2 text-orange-400"
          >
            <Calendar size={16} />
            <span className="text-sm font-medium">
              Data Accurate As Of: {formatPeriodLabel(currentPeriod)}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Live Dashboard Section */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Live WNBA/Unrivaled Analytics
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Real JORDN (influence) and RODMN (controversy) scores from YouTube podcast transcript analysis
            </p>
          </motion.div>

          {/* Current Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <DemoDashboard />
          </motion.div>
        </div>
      </section>

      {/* Analytics Capabilities */}
      <section className="relative w-full px-6 py-16 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Our Analytics Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              How we transform YouTube discussions into actionable sports media insights
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users className="w-8 h-8 text-orange-500" />,
                title: "YouTube Analysis",
                description: "We analyze transcripts from sports podcasts and YouTube discussions to track entity mentions and sentiment"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-red-500" />,
                title: "JORDN Scoring",
                description: "Our proprietary algorithm measures influence and relevance based on discussion patterns and audience engagement"
              },
              {
                icon: <Zap className="w-8 h-8 text-amber-500" />,
                title: "RODMN Detection",
                description: "Advanced controversy scoring that identifies polarizing narratives and divisive discussions"
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
                title: "Professional Reports",
                description: "Custom PDF reports with charts, insights, and actionable recommendations for your specific needs"
              }
            ].map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-orange-500/30 transition-colors"
              >
                <div className="mb-4">{capability.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{capability.title}</h3>
                <p className="text-gray-400 text-sm">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Reports Section */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">What You Get</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional reports with actionable insights derived from real YouTube data analysis
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Report ($500)",
                description: "One-time analysis with JORDN/RODMN scores",
                features: [
                  "5-7 day delivery",
                  "Professional PDF format",
                  "Charts and visualizations",
                  "Raw data appendix",
                  "Custom entity tracking"
                ],
                cta: "Order Custom Report",
                link: "/pricing"
              },
              {
                title: "Recurring Intelligence ($1,500/mo)",
                description: "Weekly automated reports plus API access",
                features: [
                  "Weekly report delivery",
                  "Historical trend analysis",
                  "500 API calls/month",
                  "Email support",
                  "Cancel anytime"
                ],
                cta: "Start Recurring Reports",
                link: "/pricing",
                popular: true
              },
              {
                title: "Full Platform Access ($3,500/mo)",
                description: "Everything plus unlimited API and early access",
                features: [
                  "Unlimited API access",
                  "Priority support",
                  "Monthly consultation calls",
                  "Early access to new metrics",
                  "White-label options"
                ],
                cta: "Get Full Access",
                link: "/pricing"
              }
            ].map((report, index) => (
              <motion.div
                key={report.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`bg-gray-800/50 rounded-lg p-6 border ${
                  report.popular 
                    ? 'border-orange-500/50 bg-gradient-to-b from-orange-900/10 to-red-900/10' 
                    : 'border-gray-700'
                } hover:border-orange-500/30 transition-all duration-200`}
              >
                {report.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-white mb-2">{report.title}</h3>
                <p className="text-gray-400 mb-4">{report.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {report.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href={report.link}>
                  <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                    report.popular
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/25'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}>
                    {report.cta}
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Examples Section */}
      <section className="relative w-full px-6 py-16 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Live Data Examples</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See our analytics in action with real trending data and comparisons
            </p>
          </motion.div>

          {/* Weekly Evolution Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <WeeklyEvolutionChart />
          </motion.div>

          {/* Head to Head Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <HeadToHeadComparison playerOne="Caitlin Clark" playerTwo="Angel Reese" />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative w-full px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Get Your Analytics Report?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-8"
          >
            YouTube-based analytics starting at $500. Custom reports delivered in 5-7 business days.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/pricing">
              <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 hover:scale-105 flex items-center gap-2">
                <Target size={20} />
                Get Started Today
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-10 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors flex items-center gap-2">
                <Eye size={20} />
                Ask Questions First
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}