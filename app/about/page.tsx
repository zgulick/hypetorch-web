"use client";

import Navbar from "@/app/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, Award, Zap, ArrowRight, CheckCircle, 
  BarChart2, TrendingUp
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
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
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500"
          >
            About HypeTorch
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto mb-10"
          >
            HypeTorch is leading the way in quantitative influence analytics, delivering powerful
            insights to organizations across sports, entertainment, and digital media.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              HypeTorch partners with industry leaders to deliver proprietary analytics solutions that 
              quantify influence and engagement. Through strategic data partnerships, we transform rich media 
              content into actionable intelligence for organizations across sports, entertainment, and digital media.
            </p>
            <p className="text-gray-300 leading-relaxed">
              While traditional metrics like followers and views offer basic insights, HypeTorch&apos;s JORDN™ and RODMN™ 
              scores provide deeper analytics that reveal the true impact of personalities, brands, and campaigns. 
              Our proprietary algorithms convert complex data into clear, actionable metrics that provide competitive 
              advantages for talent management, brand partnerships, and content strategy.
            </p>
          </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-orange-500/10 rounded-2xl -rotate-6"></div>
              <div className="absolute inset-0 bg-red-500/10 rounded-2xl rotate-3"></div>
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-orange-500/10 rounded-full">
                      <Trophy size={24} className="text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Industry Leadership</h3>
                      <p className="text-gray-400 text-sm">Setting the standard in influence analytics</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-500/10 rounded-full">
                      <Award size={24} className="text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Data Excellence</h3>
                      <p className="text-gray-400 text-sm">Multi-platform data collection and analysis</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-full">
                      <Zap size={24} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Actionable Insights</h3>
                      <p className="text-gray-400 text-sm">Converting data to strategic recommendations</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Industries Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Industries We Serve
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              HypeTorch delivers tailored analytics solutions across multiple industries, with plans to expand further.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors"
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <BarChart2 size={42} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sports</h3>
              <p className="text-gray-400 text-sm">
                Track athlete influence across leagues including WNBA, NBA, and more.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors"
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <TrendingUp size={42} className="text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Entertainment</h3>
              <p className="text-gray-400 text-sm">
                Measure star power for actors, musicians, and content creators.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors"
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <Zap size={42} className="text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Finance</h3>
              <p className="text-gray-400 text-sm">
                Track market sentiment for cryptocurrencies and financial brands.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors"
            >
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle size={42} className="text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Consumer Brands</h3>
              <p className="text-gray-400 text-sm">
                Measure product hype and endorsement impact in real-time.
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
            className="text-3xl font-bold mb-6 text-white"
          >
            Ready to leverage the power of <span className="text-orange-400">HYPE analytics?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 mb-8 text-lg max-w-3xl mx-auto"
          >
            Join leading organizations that use HypeTorch to gain competitive insights and make data-driven decisions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2 shadow-lg shadow-orange-900/30 w-full sm:w-auto">
                View Dashboard <ArrowRight size={20} />
              </button>
            </Link>
            
            <a 
              href="mailto:hypetorch@gmail.com?subject=Enterprise%20Inquiry"
              className="px-8 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg flex items-center justify-center gap-2 transition-colors w-full sm:w-auto"
            >
              Contact Sales
            </a>
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
    </div>
  );
}