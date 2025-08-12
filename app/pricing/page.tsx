"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../Navbar";
import { Check, Star, Zap, BarChart3, Crown, ChevronDown, ChevronRight, Eye } from "lucide-react";
import ContactModal from '@/components/ContactModal';

export default function PricingPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'demo' | 'partnership' | 'api_access' | 'support' | 'sales'>('sales');
  const [modalTitle, setModalTitle] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const openContactModal = (type: 'demo' | 'partnership' | 'api_access' | 'support' | 'sales', title: string) => {
    setModalType(type);
    setModalTitle(title);
    setContactModalOpen(true);
  };

  const pricingTiers = [
    {
      name: "Custom Report",
      price: "$500",
      billing: "One-time",
      description: "One-time YouTube-based analytics report",
      popular: false,
      features: [
        "One-time YouTube-based analytics report",
        "JORDN & RODMN scores for your entities",
        "Professional PDF with charts and insights",
        "5-7 business day delivery",
        "Raw data appendix"
      ],
      cta: "Get Started",
      ctaAction: () => window.open('/pricing/custom-report', '_blank')
    },
    {
      name: "Recurring Intelligence",
      price: "$1,500",
      billing: "per month",
      description: "Weekly automated reports plus API access",
      popular: true,
      features: [
        "Weekly automated reports",
        "Basic API access (500 calls/month)",
        "Email support",
        "Historical trend analysis",
        "Cancel anytime"
      ],
      cta: "Configure Intelligence",
      ctaAction: () => window.open('/pricing/recurring', '_blank')
    },
    {
      name: "Full Platform Access",
      price: "$3,500",
      billing: "per month",
      description: "Everything plus unlimited API and early access",
      popular: false,
      earlyAccess: true,
      features: [
        "Everything in Recurring Intelligence",
        "Unlimited API access",
        "Priority support & monthly consultation calls",
        "EARLY ACCESS: New metrics as we develop them",
        "BETA: RNALDO Score (Social + Traditional + JORDN hybrid)",
        "White-label options"
      ],
      cta: "Schedule Technical Demo",
      ctaAction: () => window.open('/pricing/demo', '_blank'),
      hasApiDocs: true
    }
  ];

  const faqItems = [
    {
      question: "What's included in each tier?",
      answer: "Each tier builds on the previous one. Custom Report gives you a one-time analysis, Monthly Intelligence adds ongoing reports and API access, and Full Platform Access includes everything plus unlimited API calls, priority support, and early access to new features."
    },
    {
      question: "How quickly can I get my first report?",
      answer: "Custom reports are delivered in 5-7 business days. Monthly Intelligence and Full Platform Access provide immediate API access, with your first automated report generated within 24 hours of setup."
    },
    {
      question: "Can I upgrade anytime?",
      answer: "Yes, you can upgrade or downgrade with 30 days notice. We'll pro-rate your billing accordingly. Custom Report customers get credit toward monthly plans."
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer: "Yes, we work with enterprise clients on custom data partnerships, white-label solutions, and industry-specific implementations. Contact us to discuss your specific needs."
    },
    {
      question: "What sports do you cover?",
      answer: "Currently focused on WNBA/Unrivaled with comprehensive coverage. NFL, NBA, and entertainment industry expansion coming soon. Full Platform Access customers get first access to new sports coverage."
    }
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center justify-center pt-32 pb-16 px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500 leading-tight mb-6"
          >
            Simple, Transparent Pricing
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-4 font-medium"
          >
            YouTube-based analytics for sports media and beyond
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Choose your analytics tier and get started immediately
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/reports">
              <button className="px-8 py-3 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold flex items-center gap-2 transition-colors">
                <Eye size={18} /> See How It Works
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative rounded-2xl p-8 ${
                  tier.popular 
                    ? 'bg-gradient-to-b from-orange-900/20 to-red-900/20 border-2 border-orange-500/50' 
                    : 'bg-gray-800/50 border border-gray-700'
                }`}
              >
                {tier.earlyAccess && (
                  <div className="absolute -top-4 -right-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                      <Crown size={14} />
                      EARLY ACCESS
                    </div>
                  </div>
                )}
                
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                      <Star size={14} />
                      RECOMMENDED
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-gray-400 mb-4">{tier.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-gray-400 ml-2">/{tier.billing}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check size={16} className="text-orange-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3">
                  <button
                    onClick={tier.ctaAction}
                    className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 ${
                      tier.popular
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {tier.cta}
                  </button>
                  {tier.hasApiDocs && (
                    <button
                      onClick={() => document.getElementById('api-docs')?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full py-3 bg-transparent border border-gray-600 hover:border-orange-500 rounded-lg text-gray-300 font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <BarChart3 size={16} />
                      View API Documentation
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Documentation Section */}
      <section id="api-docs" className="relative w-full px-6 py-16 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-white">API Documentation</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Access our analytics programmatically with RESTful APIs
            </p>
            <p className="text-orange-400 font-semibold">Available to Tier 3 customers only</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sample Endpoints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold text-white mb-4">Sample Endpoints</h3>
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded p-4 font-mono text-sm">
                  <div className="text-green-400">GET</div>
                  <div className="text-gray-300">/api/v1/entities/{"entity_id"}/scores</div>
                  <div className="text-gray-500 text-xs mt-2">Get JORDN and RODMN scores for an entity</div>
                </div>
                <div className="bg-gray-900/50 rounded p-4 font-mono text-sm">
                  <div className="text-blue-400">POST</div>
                  <div className="text-gray-300">/api/v1/reports/generate</div>
                  <div className="text-gray-500 text-xs mt-2">Generate custom report for specified entities</div>
                </div>
                <div className="bg-gray-900/50 rounded p-4 font-mono text-sm">
                  <div className="text-green-400">GET</div>
                  <div className="text-gray-300">/api/v1/trends/weekly</div>
                  <div className="text-gray-500 text-xs mt-2">Get weekly trending entities and scores</div>
                </div>
              </div>
            </motion.div>

            {/* Authentication & Limits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
            >
              <h3 className="text-xl font-bold text-white mb-4">Authentication & Limits</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">API Key Authentication</h4>
                  <div className="bg-gray-900/50 rounded p-3 font-mono text-sm text-gray-300">
                    Authorization: Bearer your_api_key_here
                  </div>
                </div>
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">Rate Limits</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Tier 2: 500 calls/month</li>
                    <li>• Tier 3: Unlimited calls</li>
                    <li>• Rate: 10 requests/second max</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-orange-400 font-semibold mb-2">Response Format</h4>
                  <div className="bg-gray-900/50 rounded p-3 font-mono text-xs text-gray-300">
                    {`{
  "status": "success",
  "data": {...},
  "timestamp": "2025-01-15T10:30:00Z"
}`}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Analytics Section */}
      <section className="relative w-full px-6 py-16 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            The Future of &quot;Athletes as Influencer&quot; Analytics
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-4xl mx-auto mb-12"
          >
            We&apos;re building the next generation of off-court performance analytics. While others focus on what happens during games, we measure influence, narrative power, and digital impact that drives modern sports business.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: <Zap className="w-8 h-8 text-orange-500" />,
                title: "RNALDO Score",
                description: "Combines social follower momentum, traditional performance metrics, and JORDN influence scores"
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-red-500" />,
                title: "Predictive Timing",
                description: "Algorithm that suggests optimal content release timing"
              },
              {
                icon: <Star className="w-8 h-8 text-amber-500" />,
                title: "Cross-Sport Expansion", 
                description: "NFL, NBA, entertainment industry applications"
              },
              {
                icon: <Crown className="w-8 h-8 text-orange-600" />,
                title: "Controversy Impact",
                description: "Advanced RODMN variants for crisis management"
              }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
              >
                <div className="mb-4">{metric.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{metric.title}</h3>
                <p className="text-gray-400 text-sm">{metric.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-lg p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Early Access Policy</h3>
            <p className="text-gray-300 text-lg">
              <strong className="text-orange-400">Tier 3</strong> customers get immediate access to new metrics. 
              <strong className="text-orange-400 ml-2">Tier 2</strong> gets access after 3 months. 
              <strong className="text-orange-400 ml-2">Tier 1</strong> reports include new metrics 6 months after release.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative w-full px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/30 transition-colors"
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-orange-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative w-full px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-8"
          >
            Advanced analytics starting at $500 for custom reports, scaling to full API access for enterprise needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => openContactModal('sales', 'Get Started - Custom Pricing')}
              className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 hover:scale-105"
            >
              Get Started Today
            </button>
            <Link href="/demo">
              <button className="px-10 py-4 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold text-lg transition-colors">
                View Demo First
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title={modalTitle}
        subtitle="Let's discuss your analytics needs"
        inquiryType={modalType}
      />
    </main>
  );
}