"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { ArrowRight, BarChart2, Target, Zap, Eye, Calendar } from "lucide-react";
import Image from "next/image";

// Import new components
import PlayerShowcase from '@/components/PlayerShowcase';
import TopMoversWidget from '@/components/TopMoversWidget';
import IntelligenceDashboard from '@/components/IntelligenceDashboard';

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
            Athlete Influence Intelligence<br/>
            <span className="text-4xl md:text-6xl">for Marketing Teams</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 font-medium"
          >
            What WAR was to RBIs and batting average, our algorithms are to likes, views, and impressions.
            <br className="hidden md:block"/>
            <span className="text-orange-400">Data-driven partnership decisions that maximize ROI.</span>
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
              <h3 className="font-semibold text-white mb-2">Identify Rising Talent</h3>
              <p className="text-gray-400 text-sm">Before your competition signs them</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <BarChart2 className="w-8 h-8 text-red-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Objective Influence Scores</h3>
              <p className="text-gray-400 text-sm">Beyond follower counts and vanity metrics</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
              <Zap className="w-8 h-8 text-amber-400 mb-3 mx-auto" />
              <h3 className="font-semibold text-white mb-2">Maximize Marketing ROI</h3>
              <p className="text-gray-400 text-sm">Data-driven sponsorship and partnership decisions</p>
            </div>
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/demo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-900/30 w-64 sm:w-auto"
              >
                <Eye size={20} /> Request Demo
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2 transition-colors w-64 sm:w-auto"
              >
                Learn More <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Live Intelligence Showcase */}
      <section className="relative w-full py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              This Week&apos;s Intelligence Report
            </h2>
            <div className="flex items-center justify-center text-gray-400 mb-6">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Data Accurate As Of: {formatPeriodLabel(currentPeriod)}</span>
            </div>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Real-time insights from our advanced analytics platform. Track narrative evolution, 
              identify trending storylines, and discover content opportunities before your competition.
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
            />
            <IntelligenceDashboard />
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
              Featured Player Intelligence
            </h3>
            <PlayerShowcase />
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
            <span className="text-orange-400">Ready to Optimize Your Athlete Marketing?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto"
          >
            Join marketing teams using HypeTorch to maximize ROI on athlete partnerships, 
            identify emerging talent, and make data-driven sponsorship decisions before your competition.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/demo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg shadow-lg shadow-orange-900/30"
              >
                Request Demo
              </motion.button>
            </Link>
            <a
              href="mailto:hypetorch@gmail.com?subject=HypeTorch%20Demo%20Request"
              className="px-10 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors"
            >
              Contact Sales
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
                  <li><Link href="/demo" className="hover:text-orange-400 transition-colors">Platform Demo</Link></li>
                  <li><Link href="/docs" className="hover:text-orange-400 transition-colors">API Docs</Link></li>
                  <li><Link href="/dashboard" className="hover:text-orange-400 transition-colors">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:text-orange-400 transition-colors">About</Link></li>
                  <li><a href="mailto:hypetorch@gmail.com" className="hover:text-orange-400 transition-colors">Contact</a></li>
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