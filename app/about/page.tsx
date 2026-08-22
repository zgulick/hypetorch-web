"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../Navbar";
import { ArrowRight } from "lucide-react";

const metrics = [
  {
    name: "JORDN",
    measures: "Attention — who is being talked about right now",
    scale: "Population mean = 100"
  },
  {
    name: "PIPN",
    measures: "Attention efficiency — over- or under-valued relative to social reach",
    scale: "−100 to +100 (0 = fairly valued)"
  },
  {
    name: "RODMN",
    measures: "Divisiveness of coverage",
    scale: "0–10"
  }
];

const dataSources = [
  {
    lead: "Public RSS feeds only.",
    body: "No scraping behind logins, no terms-of-service violations."
  },
  {
    lead: "Audio is transcribed and discarded.",
    body: "Source recordings are never retained or redistributed."
  },
  {
    lead: "Transcripts stay private.",
    body: "They are retained in an internal store used for deduplication and re-scoring, and are never published or redistributed. What powers the scores is derived data — entity, timestamp, talk time, context."
  },
  {
    lead: "Output is factual.",
    body: "Counts, durations, and scores. No source content is republished."
  }
];

const limitations = [
  "Podcasts and public web signals only. Not TikTok, Instagram, X, or Twitch.",
  "English-language sources.",
  "Measures attention, not brand sentiment.",
  "Descriptive, not predictive. It tells you what's being said now, not what will happen next.",
  "Coverage is bounded by the source panel. An entity discussed only on shows we don't index won't appear."
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Why HypeTorch exists */}
      <section className="relative w-full px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500 leading-tight mb-8"
          >
            Why HypeTorch exists
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="space-y-6 text-lg text-gray-300 leading-relaxed"
          >
            <p>
              I&apos;ve spent my career in product management and data analytics, watching advanced
              metrics change how teams evaluate players. WAR, PER, expected goals — context-aware
              numbers that replaced counting stats.
            </p>
            <p>
              Sports media never got that upgrade. Decisions about which athletes to sign, feature,
              or pay still run on follower counts and impressions. Those measure audience size. They
              don&apos;t measure influence.
            </p>
            <p className="text-2xl font-semibold text-white">
              HypeTorch measures what people actually say.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What it does */}
      <section className="relative w-full px-6 py-16 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            What it does
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 leading-relaxed mb-8"
          >
            Every week, HypeTorch ingests podcast episodes, transcribes them, and identifies which
            entities were discussed, for how long, and in what context. Those signals become three
            scores:
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg divide-y divide-gray-700 mb-6"
          >
            {metrics.map((metric) => (
              <div key={metric.name} className="px-6 py-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <span className="text-lg font-bold text-orange-400">{metric.name}</span>
                  <span className="text-sm text-gray-500 font-mono">{metric.scale}</span>
                </div>
                <p className="text-gray-300">{metric.measures}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Link
              href="/methodology"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              Full methodology <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 leading-relaxed"
          >
            Podcasts are the most honest long-form discussion available. Nobody optimises a two-hour
            conversation for engagement. What gets talked about is what people genuinely care about —
            and it shows up there before it shows up anywhere else.
          </motion.p>
        </div>
      </section>

      {/* Where the data comes from */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            Where the data comes from
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg text-gray-300 mb-8"
          >
            If you&apos;re licensing this, you should know exactly what&apos;s underneath it.
          </motion.p>

          <div className="space-y-4">
            {dataSources.map((item, index) => (
              <motion.div
                key={item.lead}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg px-6 py-5"
              >
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-white">{item.lead}</strong> {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What it doesn't do */}
      <section className="relative w-full px-6 py-16 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            What it doesn&apos;t do
          </motion.h2>

          <ul className="space-y-4">
            {limitations.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 text-lg text-gray-300 leading-relaxed"
              >
                <span className="text-orange-500 mt-1 flex-shrink-0">—</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Coverage */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            Coverage
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-gray-300 leading-relaxed"
          >
            <p>
              Currently running weekly across <strong className="text-white">Unrivaled</strong> and{' '}
              <strong className="text-white">NBA</strong>.
            </p>
            <p>
              New populations and new source panels are configuration, not development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who's behind it */}
      <section className="relative w-full px-6 py-16 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            Who&apos;s behind it
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 text-lg text-gray-300 leading-relaxed"
          >
            <p>
              HypeTorch is built and run by <strong className="text-white">Zach Burma</strong>.
            </p>
            <p>
              The pipeline has run unattended every week since{' '}
              <strong className="text-white">January 2026</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Get in touch */}
      <section className="relative w-full px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-8"
          >
            Get in touch
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105">
                Contact
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-8 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors">
                See the live demo
              </button>
            </Link>
            <Link href="/pricing">
              <button className="px-8 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors">
                Pricing
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-gray-950 border-t border-gray-800 text-gray-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <Image
                  src="/hypetorch-logo.svg"
                  alt="HypeTorch Logo"
                  width={32}
                  height={32}
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
                  <li><Link href="/pricing" className="hover:text-orange-400 transition-colors">Pricing</Link></li>
                  <li><Link href="/methodology" className="hover:text-orange-400 transition-colors">Methodology</Link></li>
                  <li><Link href="/docs" className="hover:text-orange-400 transition-colors">API Docs</Link></li>
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
            <p>© {new Date().getFullYear()} HypeTorch. Pioneering the next generation of sports media analytics.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
