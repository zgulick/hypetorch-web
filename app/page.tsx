"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { BarChart2, Target, Zap, Eye, Calendar } from "lucide-react";
import Image from "next/image";

// Import new components
import PlayerShowcase from '@/components/PlayerShowcase';
import TopMoversWidget from '@/components/TopMoversWidget';
import IntelligenceDashboard from '@/components/IntelligenceDashboard';
import GetStartedButton from '@/components/GetStartedButton';

// Import data service
import { getCurrentAnalysisPeriod, TimePeriod } from '@/app/lib/dataService_unified';

export default function Home() {
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
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white flex flex-col items-center overflow-hidden">
      <Navbar />

      {/* Hero Section - Professional B2B Messaging */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-screen px-6 py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-500 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-red-600 blur-3xl"></div>
          <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-amber-500 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500 leading-tight mb-6"
          >
            Welcome to HypeTorch:<br/>
            <span className="text-4xl md:text-6xl">Moneyball for Off-Court Performance</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 font-medium"
          >
            Stop overpaying for athletes. Find undervalued talent before the market does.
          </motion.h2>

          {/* Three Value Propositions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <Target className="w-8 h-8 text-orange-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Identify Rising Influence</h3>
              <p className="text-gray-400 text-sm">Spot trending entities before mainstream coverage</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <BarChart2 className="w-8 h-8 text-red-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Objective Influence Scores</h3>
              <p className="text-gray-400 text-sm">Beyond follower counts and vanity metrics</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <Zap className="w-8 h-8 text-amber-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Strategic Intelligence</h3>
              <p className="text-gray-400 text-sm">Data-driven decisions across any industry vertical</p>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#live-demos">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all w-64 sm:w-auto"
              >
                <Eye size={20} /> See It Live
              </motion.button>
            </a>
            <a
              href="/reports/customer-intelligence-report.pdf"
              download="HypeTorch_Sample_Intelligence_Report.pdf"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors w-64 sm:w-auto"
              >
                Download Sample Report
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* What We Measure Section */}
      <section id="what-we-measure" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white text-center mb-4">
              What We Measure
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700"
          >

            {/* JORDN */}
            <div className="mb-6 pb-6 border-b border-gray-700">
              <h5 className="text-xl font-bold text-orange-400 mb-2">
                JORDN - Judge Of Relevance & Digital Notability
              </h5>
              <p className="text-gray-300 mb-2">
                Measures who&apos;s getting talked about right now. Combines podcast mentions,
                talk time, social signals, and search interest into a single popularity score.
              </p>
              <p className="text-sm text-gray-500">
                Scale: 0-200+ (100 = average)
              </p>
            </div>

            {/* RODMN */}
            <div className="mb-6 pb-6 border-b border-gray-700">
              <h5 className="text-xl font-bold text-red-400 mb-2">
                RODMN - Rating Of Divisive Media Narratives
              </h5>
              <p className="text-gray-300 mb-2">
                Measures who&apos;s generating controversy and polarizing opinions.
                Identifies athletes driving heated debate.
              </p>
              <p className="text-sm text-gray-500">
                Scale: 0-10 (higher = more divisive)
              </p>
            </div>

            {/* PIPN */}
            <div>
              <h5 className="text-xl font-bold text-cyan-400 mb-2">
                PIPN - Popularity Index Per Network
              </h5>
              <p className="text-gray-300 mb-2">
                Measures attention efficiency - who&apos;s over or undervalued relative to
                their social media reach. Find the bargains and spot the overexposed.
              </p>
              <p className="text-sm text-gray-500">
                Scale: -100 to +100 (0 = fairly valued)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Demos Section */}
      <section id="live-demos" className="w-full py-20 bg-black">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white text-center mb-4">
              Live Demos
            </h2>
            <p className="text-center text-gray-400 mb-12 text-lg">
              See our algorithms in action across different leagues
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Unrivaled Live Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 p-6 rounded-lg border border-orange-600"
            >
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-green-400 text-sm font-semibold">LIVE TRACKING</span>
              </div>
              <h3 className="text-orange-400 text-xl font-semibold mb-4">Unrivaled League</h3>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li>• Live player buzz tracking</li>
                <li>• Real-time JORDN, RODMN & PIPN scores</li>
                <li>• Weekly narrative momentum analysis</li>
                <li>• Attention efficiency rankings</li>
              </ul>
              <a
                href="/demo?vertical=Unrivaled"
                className="w-full bg-orange-600 text-white py-2 rounded font-semibold inline-block text-center hover:bg-orange-700 transition-colors"
              >
                View Unrivaled Dashboard →
              </a>
            </motion.div>

            {/* NBA Live Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 p-6 rounded-lg border border-blue-600"
            >
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span className="text-green-400 text-sm font-semibold">LIVE TRACKING</span>
              </div>
              <h3 className="text-blue-400 text-xl font-semibold mb-4">NBA</h3>
              <ul className="text-gray-300 text-sm space-y-1 mb-4">
                <li>• League-wide player tracking</li>
                <li>• Real-time JORDN, RODMN & PIPN scores</li>
                <li>• Cross-team buzz comparisons</li>
                <li>• Emerging storyline detection</li>
              </ul>
              <a
                href="/demo?vertical=NBA"
                className="w-full bg-blue-600 text-white py-2 rounded font-semibold inline-block text-center hover:bg-blue-700 transition-colors"
              >
                View NBA Dashboard →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sample Report Section */}
      <section className="w-full py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white text-center mb-4">
              Sample Client Report
            </h2>
            <p className="text-center text-gray-400 text-lg">
              See what a HypeTorch deliverable looks like
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-blue-400 text-sm font-semibold">SAMPLE REPORT</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">NFL: Chicago Bears Team Analysis</h3>
              <p className="text-gray-300 mb-6">
                Custom team report showing our analytics in action. This 2-week deep dive demonstrates
                how we track narrative evolution, player buzz, and controversy across coaching staff and roster.
              </p>
              <ul className="text-gray-300 text-sm space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>14 players + coaching staff tracked</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>65+ podcast episodes analyzed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>5.7M video views processed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  <span>2-week narrative analysis window</span>
                </li>
              </ul>
              <a
                href="/reports/customer-intelligence-report.pdf"
                download="HypeTorch_Sample_Intelligence_Report.pdf"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded font-semibold inline-block text-center hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Download Sample PDF →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Intelligence Showcase */}
      <section className="relative w-full py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Top Performers This Week
            </h2>
            <div className="flex items-center justify-center text-gray-400 mb-6">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Data Accurate As Of: {formatPeriodLabel(currentPeriod)}</span>
            </div>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Track narrative evolution, identify trending storylines, and discover rising athletes before the market catches up.
            </p>
          </motion.div>

          {/* Intelligence Dashboard - All Tiles Equal Height */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12"
          >
            <TopMoversWidget
              title="Most Hype This Week"
              limit={5}
              subcategory={null}
            />
            <IntelligenceDashboard subcategory={null} />
          </motion.div>

          {/* Featured Players Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-white">
              Top Performers Across All Verticals
            </h3>
            <PlayerShowcase subcategory={null} />
          </motion.div>

          {/* Platform Capabilities Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 border border-gray-700"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Built for Scale & Flexibility</h3>
              <p className="text-gray-400 mb-8 max-w-3xl mx-auto">
                Our platform tracks audio mentions and talk time across podcasts, creating objective influence scores 
                that work across any sport or league. Compare WNBA to NBA, Rugby to Premier League, or discover 
                emerging narratives before traditional metrics catch up.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">Multi-Sport</div>
                  <div className="text-sm text-gray-400 mb-3">Cross-League Analysis</div>
                  <p className="text-xs text-gray-500">Compare influence across different sports and leagues with unified scoring</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">Audio-First</div>
                  <div className="text-sm text-gray-400 mb-3">Talk Time & Mentions</div>
                  <p className="text-xs text-gray-500">Track conversation volume and context from podcast transcripts</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">Scalable</div>
                  <div className="text-sm text-gray-400 mb-3">Industry Agnostic</div>
                  <p className="text-xs text-gray-500">Built to expand beyond sports to any industry with narrative influence</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Positioning */}
      <section className="relative w-full py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">
              Why Marketing Teams Choose HypeTorch
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6 bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl border border-orange-500/20">
              <h3 className="font-bold text-lg text-orange-400 mb-3">They track followers</h3>
              <p className="text-gray-300 font-bold">We measure marketing ROI</p>
              <p className="text-gray-500 text-sm mt-2">Data-driven athlete partnership decisions</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-500/20">
              <h3 className="font-bold text-lg text-blue-400 mb-3">They guess who&apos;s popular</h3>
              <p className="text-gray-300 font-bold">We show who&apos;s trending</p>
              <p className="text-gray-500 text-sm mt-2">Identify rising stars before your competition</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-900/20 to-teal-900/20 rounded-xl border border-green-500/20">
              <h3 className="font-bold text-lg text-green-400 mb-3">Vanity metrics</h3>
              <p className="text-gray-300 font-bold">Influence intelligence</p>
              <p className="text-gray-500 text-sm mt-2">Optimize marketing spend with objective influence scores</p>
            </div>
          </motion.div>
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
            <span className="text-white">Want a custom report for your</span><br/>
            <span className="text-orange-400">league, team, or talent roster?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto"
          >
            License HypeTorch&apos;s analytics platform to track off-court performance, identify undervalued talent,
            and make data-driven decisions before the market catches up.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold text-lg transition-all hover:from-orange-600 hover:to-red-700">
                Contact Us
              </button>
            </Link>
            <a href="mailto:hypetorch@gmail.com">
              <button className="px-10 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors">
                Email Us
              </button>
            </a>
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
    </main>
  );
}