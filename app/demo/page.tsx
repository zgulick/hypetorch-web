"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Calendar,
  Zap,
  Target,
  Users,
  Activity,
  LineChart,
  Database,
  ChevronRight,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '../Navbar';
import ContactModal from '@/components/ContactModal';
import GetStartedButton from '@/components/GetStartedButton';

// Import components
import WeeklyEvolutionChart from '@/components/WeeklyEvolutionChart';
import DemoDashboard from '@/components/DemoDashboard';
import HeadToHeadComparison from '@/components/HeadToHeadComparison';

// Import data service
import { getCurrentAnalysisPeriod, TimePeriod } from '@/app/lib/dataService_unified';

export default function PlatformDemo() {
  const [currentPeriod, setCurrentPeriod] = useState<TimePeriod | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'hype_score' | 'rodmn_score'>('hype_score');
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

  const formatPeriodLabel = (period: TimePeriod | null) => {
    if (!period) return "Latest Analysis Period";
    return period.display_label;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500">
              Platform Demo
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Experience HypeTorch&apos;s advanced analytics intelligence in action. 
              See how we transform raw data into actionable sports media insights.
            </p>
            <div className="flex items-center justify-center text-gray-400 mb-8">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Current Analysis Period: {formatPeriodLabel(currentPeriod)}</span>
            </div>
            
            {/* Demo Navigation */}
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#evolution-chart" className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors">
                Weekly Evolution
              </a>
              <a href="#metrics-dashboard" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
                Key Metrics Dashboard  
              </a>
              <a href="#player-comparison" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
                Player Comparison
              </a>
              <a href="#api-preview" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
                API Integration
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weekly Evolution Chart - Signature Feature */}
      <section id="evolution-chart" className="py-16 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <LineChart className="w-8 h-8 text-orange-400 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Weekly Evolution Tracker</h2>
            </div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Our signature feature reveals how player narratives evolve over time. 
              Watch HYPE scores change as storylines develop, helping you identify trending players before they become mainstream news.
            </p>
            
            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <Target className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Spot Trends Early</h3>
                <p className="text-sm text-gray-400">Identify rising storylines before competitors</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <Activity className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Multi-Player Tracking</h3>
                <p className="text-sm text-gray-400">Compare up to 5 players simultaneously</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <Database className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Historical Context</h3>
                <p className="text-sm text-gray-400">5+ weeks of narrative evolution data</p>
              </div>
            </div>
          </motion.div>

          {/* Metric Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="bg-gray-800 rounded-lg p-2 border border-gray-700">
              <button
                onClick={() => setSelectedMetric('hype_score')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedMetric === 'hype_score' 
                    ? 'bg-orange-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                JORDN Score Evolution
              </button>
              <button
                onClick={() => setSelectedMetric('rodmn_score')}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedMetric === 'rodmn_score' 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                RODMN Score Evolution
              </button>
            </div>
          </motion.div>

          {/* Chart Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <WeeklyEvolutionChart 
              players={['Caitlin Clark', 'Angel Reese', 'Alyssa Thomas', 'Allisha Gray', 'Jackie Young']}
              periods={5}
              metric={selectedMetric}
              height={450}
            />
          </motion.div>
        </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section id="metrics-dashboard" className="py-16 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <DemoDashboard />
        </div>
      </section>

      {/* Player Deep Dive Comparison */}
      <section id="player-comparison" className="py-16 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-purple-400 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Player Intelligence Comparison</h2>
            </div>
            <h3 className="text-2xl text-orange-400 mb-4">Caitlin Clark vs Angel Reese: The Data Behind the Rivalry</h3>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Deep-dive analysis comparing two of the most talked-about players. 
              Our multi-dimensional metrics reveal the full story behind the headlines.
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
              playerOne="Caitlin Clark"
              playerTwo="Angel Reese"
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

          {/* API Access CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-8 border border-gray-600">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Optimize Your Campaigns?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Get access to our comprehensive API documentation and start building 
                athlete influence intelligence into your marketing operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/docs">
                  <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold hover:shadow-lg transition-all">
                    View API Documentation
                  </button>
                </Link>
                <button 
                  onClick={() => setApiModalOpen(true)}
                  className="px-8 py-3 border border-gray-600 hover:border-orange-500 rounded-lg text-white font-semibold transition-colors"
                >
                  Request API Access
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              <span className="text-orange-400">Experience the Full Platform</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              This demo showcases just a fraction of HypeTorch&apos;s capabilities. 
              See how our complete analytics intelligence platform can transform your sports media coverage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GetStartedButton size="lg" className="shadow-lg hover:shadow-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Get Started - See Pricing
              </GetStartedButton>
              <button 
                onClick={() => setDemoModalOpen(true)}
                className="px-10 py-4 border border-gray-600 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors flex items-center justify-center"
              >
                <Eye className="w-5 h-5 mr-2" />
                Schedule Full Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
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