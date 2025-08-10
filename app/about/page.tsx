"use client";

import { useState } from "react";
import Navbar from "@/app/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ContactModal from '@/components/ContactModal';
import { 
  BarChart2, TrendingUp, 
  LineChart, Target, Database, Brain, Users, 
  Calendar, Eye, ChevronRight
} from "lucide-react";

export default function About() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image 
              src="/hypetorch-logo.svg" 
              alt="HypeTorch Logo" 
              width={60} 
              height={60} 
              className="mx-auto mb-6"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500"
          >
            The Analytics Evolution
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-300 max-w-4xl mx-auto mb-10"
          >
            Just as Bill James revolutionized baseball with sabermetrics, we&apos;re bringing 
            advanced analytics to sports media. <span className="text-orange-400">The next generation of sports intelligence is here.</span>
          </motion.p>
        </div>
      </section>

      {/* Three Generations of Sports Analytics */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Three Generations of Sports Analytics
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Each generation built on the last, pushing deeper into what really matters for performance and engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sports 1.0 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                  <BarChart2 className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sports 1.0</h3>
                  <p className="text-gray-400 text-sm">Traditional Stats Era</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-300 mb-3">Basic Metrics:</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>• Points, rebounds, assists</li>
                  <li>• Batting average, RBIs, home runs</li>
                  <li>• Win-loss records</li>
                  <li>• Basic counting stats</li>
                </ul>
              </div>
              <p className="text-gray-400 text-sm">
                Simple, surface-level metrics that missed the deeper story of player impact and value.
              </p>
            </motion.div>

            {/* Sports 2.0 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-8 rounded-xl border border-blue-600/30"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sports 2.0</h3>
                  <p className="text-blue-300 text-sm">Advanced Metrics Revolution</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-blue-200 mb-3">Revolutionary Metrics:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• WAR (Wins Above Replacement)</li>
                  <li>• PER (Player Efficiency Rating)</li>
                  <li>• True Shooting Percentage</li>
                  <li>• Expected Goals (xG)</li>
                </ul>
              </div>
              <p className="text-gray-300 text-sm">
                Context-aware analytics that revealed true player value beyond traditional stats.
              </p>
            </motion.div>

            {/* Sports 3.0 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-8 rounded-xl border border-orange-500/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mr-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Sports 3.0</h3>
                  <p className="text-orange-300 text-sm">Narrative Intelligence Era</p>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="font-semibold text-orange-200 mb-3">HypeTorch AI-Powered Analytics:</h4>
                <ul className="space-y-2 text-gray-200">
                  <li>• <strong>Semantic Entity Detection</strong> - AI understands context, not just keywords</li>
                  <li>• <strong>Enhanced JORDN Algorithm</strong> - Dynamic weights with interaction effects</li>
                  <li>• <strong>Advanced RODMN Score</strong> - Multi-component controversy analysis</li>
                  <li>• <strong>Vector-Based Intelligence</strong> - 50% better entity recognition accuracy</li>
                  <li>• <strong>Narrative Evolution AI</strong> - Real-time storyline momentum tracking</li>
                </ul>
              </div>
              <p className="text-gray-200 text-sm font-medium">
                <strong>Next-level intelligence:</strong> Our AI doesn't just count mentions—it understands context, identifies "the rookie from Iowa" as Caitlin Clark, and detects narrative patterns before they explode.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Identifying the Gap in Sports Media Analytics
              </h2>
              <div className="space-y-6 text-gray-300">
                <p className="leading-relaxed">
                  With a background in product management and data analytics, I witnessed firsthand how 
                  advanced metrics transformed decision-making in sports performance. Yet sports media 
                  remained stuck with basic social metrics—likes, views, and follower counts.
                </p>
                <p className="leading-relaxed">
                  <span className="text-orange-400 font-semibold">The problem was clear:</span> Sports media companies 
                  needed deeper intelligence to identify trending storylines, optimize content timing, 
                  and stay ahead of narrative cycles. Traditional metrics couldn&apos;t distinguish between 
                  viral moments and sustained influence.
                </p>
                <p className="leading-relaxed">
                  HypeTorch bridges this gap by applying the same advanced analytics approach that 
                  revolutionized player evaluation to the realm of sports media and cultural influence.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-orange-400 mr-3" />
                  <h3 className="text-xl font-bold text-white">The Vision</h3>
                </div>
                <blockquote className="text-lg text-gray-300 italic mb-6 leading-relaxed">
                  &quot;What if sports media companies could identify the next big storyline before it explodes? 
                  What if they could measure not just engagement, but influence and narrative momentum?&quot;
                </blockquote>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400 mb-1">37+</div>
                    <div className="text-xs text-gray-400">Players Tracked</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-red-400 mb-1">8</div>
                    <div className="text-xs text-gray-400">Advanced Metrics</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">5+</div>
                    <div className="text-xs text-gray-400">Data Sources</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">Weekly</div>
                    <div className="text-xs text-gray-400">Analysis Updates</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Advanced Analytics for Narrative Intelligence
            </h2>
            <p className="text-lg text-gray-400 max-w-4xl mx-auto">
              Just as advanced metrics revolutionized player evaluation, our algorithms are transforming sports media intelligence.
            </p>
          </motion.div>

          {/* Analogy Comparisons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          >
            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 p-8 rounded-xl border border-orange-500/20">
              <div className="flex items-center mb-4">
                <LineChart className="w-8 h-8 text-orange-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Enhanced JORDN Algorithm (HYPE 2.0)</h3>
              </div>
              <p className="text-lg text-orange-200 font-medium mb-4">
                &quot;What WAR was to RBIs, HRs, and Batting Average, Enhanced JORDN is to likes, views and impressions&quot;
              </p>
              <div className="space-y-3 mb-4">
                <div className="text-sm">
                  <span className="text-orange-300 font-semibold">Dynamic Weighting:</span>
                  <span className="text-gray-300"> Algorithm adapts weights based on data quality and information gain</span>
                </div>
                <div className="text-sm">
                  <span className="text-orange-300 font-semibold">Interaction Effects:</span>
                  <span className="text-gray-300"> Detects viral moments (talk + mentions), mainstream breakthroughs, and community debates</span>
                </div>
                <div className="text-sm">
                  <span className="text-orange-300 font-semibold">Commercial Consistency:</span>
                  <span className="text-gray-300"> Always averages 100 for reliable benchmarking across time periods</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Next-generation influence measurement that captures complex narrative dynamics and momentum patterns traditional metrics miss entirely.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-900/20 to-purple-900/20 p-8 rounded-xl border border-red-500/20">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 text-red-400 mr-3" />
                <h3 className="text-xl font-bold text-white">Advanced RODMN Algorithm (Controversy 2.0)</h3>
              </div>
              <p className="text-lg text-red-200 font-medium mb-4">
                &quot;What PER was to points, rebounds, and assists, Enhanced RODMN is to toxicity, controversy and sentiment&quot;
              </p>
              <div className="space-y-3 mb-4">
                <div className="text-sm">
                  <span className="text-red-300 font-semibold">Multi-Component Analysis:</span>
                  <span className="text-gray-300"> Polarization (35%), Volatility (25%), Intensity (20%), Disagreement (20%)</span>
                </div>
                <div className="text-sm">
                  <span className="text-red-300 font-semibold">Controversy-First Design:</span>
                  <span className="text-gray-300"> Independent from popularity—controversial unknowns can score 10/10</span>
                </div>
                <div className="text-sm">
                  <span className="text-red-300 font-semibold">JORDN Amplification:</span>
                  <span className="text-gray-300"> Formula: controversy_coefficient × (1 + JORDN/200) for context weighting</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Next-level controversy intelligence that identifies divisive topics and PR risks before they explode into public crises.
              </p>
            </div>
          </motion.div>

          {/* Current Capabilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700"
          >
            <div className="flex items-center mb-6">
              <Database className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">AI-Enhanced Capabilities</h3>
              <div className="ml-3 px-3 py-1 bg-orange-600/20 border border-orange-500/30 rounded-full">
                <span className="text-orange-300 text-sm font-semibold">50% Better Accuracy</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-8 h-8 text-orange-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Semantic Entity Detection</h4>
                <p className="text-sm text-gray-400">AI-powered context understanding with 384-dimensional embeddings</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-red-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Enhanced JORDN 2.0</h4>
                <p className="text-sm text-gray-400">Dynamic weighting with interaction effects and viral moment detection</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Advanced RODMN 2.0</h4>
                <p className="text-sm text-gray-400">4-component controversy analysis with polarization detection</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="font-semibold text-white mb-2">Vector-Based Intelligence</h4>
                <p className="text-sm text-gray-400">Sentence transformers with cosine similarity for contextual matching</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Forward Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              The AI Revolution is Just Getting Started
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Our semantic detection and enhanced algorithms represent Sports 3.0. We&apos;re already building the AI foundation for Sports 4.0—where predictive narrative intelligence meets real-time audience behavior modeling.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <ChevronRight className="w-6 h-6 text-orange-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Expanding Data Sources</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Integrating additional platforms and media sources to create the most comprehensive 
                sports influence database in the industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <ChevronRight className="w-6 h-6 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Predictive Capabilities</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Developing machine learning models to predict narrative timing and viral potential, 
                helping media companies optimize content strategy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <ChevronRight className="w-6 h-6 text-green-400 mr-2" />
                <h3 className="text-lg font-semibold text-white">Sports 4.0: Predictive AI</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Advanced transformer models for narrative forecasting, audience behavior prediction, 
                and real-time content optimization. The next evolution beyond our current semantic intelligence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-orange-900/20 to-red-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Ready to Join the <span className="text-orange-400">Analytics Evolution?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 mb-8 text-lg max-w-3xl mx-auto"
          >
            Join forward-thinking sports media companies using HypeTorch to identify trending storylines, 
            optimize content timing, and stay ahead of the narrative cycle.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={() => setDemoModalOpen(true)}
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-900/30 w-full sm:w-auto"
            >
              <Eye size={20} />
              Request Demo
            </button>
            
            <button 
              onClick={() => setPartnerModalOpen(true)}
              className="px-10 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
            >
              <Users size={20} />
              Partner With Us
            </button>
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
                  <li><Link href="/dashboard" className="hover:text-orange-400 transition-colors">Dashboard</Link></li>
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
      
      {/* Contact Modals */}
      <ContactModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        title="Request a Demo"
        subtitle="Experience our advanced analytics intelligence"
        inquiryType="demo"
      />
      
      <ContactModal
        isOpen={partnerModalOpen}
        onClose={() => setPartnerModalOpen(false)}
        title="Partnership Inquiry"
        subtitle="Explore partnership opportunities with HypeTorch"
        inquiryType="partnership"
      />
    </div>
  );
}