"use client";

import Link from "next/link";
// import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { ArrowRight, BarChart2, TrendingUp, LineChart, Zap } from "lucide-react";
import Image from "next/image";
import RotatingText from './components/rotatingtext';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white flex flex-col items-center overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center min-h-screen px-6 py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-500 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-red-600 blur-3xl"></div>
          <div className="absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-amber-500 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500 leading-tight mb-6"
          >
            Advanced Analytics for<br/><RotatingText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Our proprietary JORDN™ and RODMN™ scoring systems provide actionable insights on
            audience engagement, media presence, and influence potential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-900/30 w-64 sm:w-auto"
              >
                <BarChart2 size={20} /> View Dashboard
              </motion.button>
            </Link>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2 transition-colors w-64 sm:w-auto"
              >
                Learn More <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 flex flex-wrap gap-10 justify-center items-center text-gray-400"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500">99.8%</div>
              <div className="text-sm uppercase tracking-wider mt-1">Data Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-500">12+</div>
              <div className="text-sm uppercase tracking-wider mt-1">Data Sources</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-500">Real-Time</div>
              <div className="text-sm uppercase tracking-wider mt-1">Analytics</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-3 bg-orange-500 rounded-full mt-1"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative w-full py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">Enterprise-Grade Analytics</h2>
            <p className="text-gray-400 max-w-3xl mx-auto">Our proprietary algorithms deliver actionable insights through a comprehensive, multi-source approach to influence tracking.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl"
            >
              <div className="bg-orange-600/20 p-3 rounded-lg w-fit mb-5">
                <LineChart className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">JORDN™ Score System</h3>
              <p className="text-gray-400">
                Our flagship metric combines multiple influence factors into a single, comparable score.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl"
            >
              <div className="bg-red-600/20 p-3 rounded-lg w-fit mb-5">
                <TrendingUp className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Multi-Source Analysis</h3>
              <p className="text-gray-400">
                Comprehensive data collection across media platforms for a complete influence profile.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl"
            >
              <div className="bg-amber-600/20 p-3 rounded-lg w-fit mb-5">
                <Zap className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Contextual Intelligence</h3>
              <p className="text-gray-400">
                Advanced algorithms that understand how and where entities are being discussed.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative w-full py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            <span className="text-orange-400">Discover how HypeTorch metrics can enhance your business intelligence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mb-10 text-lg"
          >
            Whether you&apos;re managing talent, building brands, or tracking competitors, 
            HypeTorch provides the analytics foundation for strategic decision-making.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:hypetorch@gmail.com?subject=Partnership%20Inquiry"
            className="inline-block px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg shadow-lg shadow-orange-900/30"
          >
            Explore Partnership Options
          </motion.a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="HypeTorch Logo" 
                  width={40} 
                  height={40} 
                  className="mr-3"
                />
                <span className="text-xl font-bold text-white">HypeTorch</span>
              </div>
              <p className="mt-2 text-sm">Illuminating influence through data</p>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h4 className="font-semibold mb-3 text-white">Product</h4>
                <ul className="space-y-2">
                  <li><Link href="/dashboard" className="hover:text-orange-400 transition-colors">Dashboard</Link></li>
                  <li><Link href="/about" className="hover:text-orange-400 transition-colors">About</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-white">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
                  <li><a href="mailto:hypetorch@gmail.com" className="hover:text-orange-400 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© {new Date().getFullYear()} HypeTorch. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}