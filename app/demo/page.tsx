"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Users,
  LineChart,
  Database,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../Navbar';
import ContactModal from '@/components/ContactModal';
import GetStartedButton from '@/components/GetStartedButton';

// Import components
import WeeklyEvolutionChart from '@/components/WeeklyEvolutionChart';
import DemoDashboard from '@/components/DemoDashboard';
import HeadToHeadComparison from '@/components/HeadToHeadComparison';
import DemoControls from '@/components/DemoControls';

// Import data service
import { getCurrentAnalysisPeriod, TimePeriod } from '@/app/lib/dataService_unified';

export default function PlatformDemo() {
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'hype_score' | 'rodmn_score' | 'pipn_score'>('hype_score');
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  
  useEffect(() => {
    async function loadDemoData() {
      try {
        // Load current period
        const period = await getCurrentAnalysisPeriod();
        setCurrentPeriod(period);
      } catch (error) {
        console.error('Error loading demo data:', error);
      }
    }
    
    loadDemoData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section - Simplified */}
      <section className="relative pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500">
              Platform Demo
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience HypeTorch&apos;s advanced analytics intelligence in action.
              Use the controls below to explore different verticals and metrics.
            </p>
          </motion.div>
        </div>
      </section>

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

      {/* API Preview Section */}
      <section id="api-preview" className="py-16 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Database className="w-8 h-8 text-green-400 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Built for Marketing Teams</h2>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Designed for marketing agencies and athlete representatives. Our API provides programmatic access to all influence data, 
              enabling seamless integration with your existing campaign management and CRM systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sample API Response */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Sample JSON Response</h3>
              <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <pre className="text-green-400">
{`{
  "status": "success",
  "data": {
    "name": "Caitlin Clark",
    "metrics": {
      "hype_score": 89.2,
      "rodmn_score": 34.1,
      "pipn_score": 12.5,
      "reach_score": 28.3,
      "mentions": 156,
      "talk_time": 12.3,
      "wikipedia_views": 45230,
      "reddit_mentions": 89,
      "google_trends": 78,
      "google_news_mentions": 234
    },
    "time_period": "week_2025_07_27",
    "last_updated": "2025-08-05T14:05:40Z"
  },
  "metadata": {
    "processing_time_ms": 23.4
  }
}`}
                </pre>
              </div>
            </motion.div>

            {/* Integration Examples */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Marketing Use Cases</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-orange-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">Campaign Dashboards</h4>
                      <p className="text-sm text-gray-400">Real-time ROI tracking for athlete partnerships</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">Partnership Alerts</h4>
                      <p className="text-sm text-gray-400">Automated notifications when athletes trend upward</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <ChevronRight className="w-5 h-5 text-green-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white">Client Portfolio Management</h4>
                      <p className="text-sm text-gray-400">Track representation value and market positioning</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-xl p-6 border border-orange-500/20">
                <h3 className="text-lg font-semibold text-orange-400 mb-2">Coming Soon: Predictive ROI Models</h3>
                <p className="text-gray-300 mb-4">
                  We&apos;re developing predictive models for partnership timing, helping you anticipate 
                  when athlete influence will peak for maximum marketing ROI and brand exposure.
                </p>
                <div className="flex items-center text-sm text-gray-400">
                  <Zap className="w-4 h-4 mr-2" />
                  <span>Advanced ML models for partnership optimization</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Call to Action */}
      <section className="relative w-full py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            <span className="text-orange-400">Ready to Optimize Your Campaign?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto"
          >
            This demo showcases just a fraction of HypeTorch&apos;s capabilities. 
            See how our complete analytics intelligence platform can transform your sports media coverage.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GetStartedButton size="lg" animated>
              Get Started
            </GetStartedButton>
            <button 
              onClick={() => setDemoModalOpen(true)}
              className="px-10 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Image 
                  src="/hypetorch-logo.svg" 
                  alt="HypeTorch Logo" 
                  width={40} 
                  height={40} 
                  className="mr-3"
                />
                <span className="text-xl font-bold text-white">HypeTorch</span>
              </div>
              <p className="mt-2 text-sm">Advanced Analytics Intelligence for Sports Media</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-white">Platform</h4>
                <ul className="space-y-2">
                  <li><Link href="/reports" className="hover:text-orange-400 transition-colors">Reports & Analytics</Link></li>
                  <li><Link href="/pricing" className="hover:text-orange-400 transition-colors">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/contact" className="hover:text-orange-400 transition-colors">Contact</Link></li>
                  <li><a href="mailto:hypetorch@gmail.com" className="hover:text-orange-400 transition-colors">Email</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© {new Date().getFullYear()} HypeTorch. Professional sports media analytics platform.</p>
          </div>
        </div>
      </footer>
      
      {/* Contact Modals */}
      <ContactModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        title="Schedule Full Demo"
        subtitle="See the complete HypeTorch platform in action"
        inquiryType="demo"
      />
      
      <ContactModal
        isOpen={apiModalOpen}
        onClose={() => setApiModalOpen(false)}
        title="Request API Access"
        subtitle="Get started with HypeTorch API integration"
        inquiryType="api_access"
      />
    </main>
  );
}