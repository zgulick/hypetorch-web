"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../Navbar";
import { Star, BarChart3, ChevronDown, ChevronRight, Eye } from "lucide-react";
import ContactModal from '@/components/ContactModal';
import GetStartedButton from '@/components/GetStartedButton';

interface PricingTier {
  name: string;
  price: string;
  billing?: string;        // omitted for Free and Contact
  description: string;
  popular?: boolean;
  cta: string;
  ctaHref?: string;        // Link-based CTA (Live demo)
  ctaAction?: () => void;  // modal-based CTA
  hasApiDocs?: boolean;
}

export default function PricingPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'demo' | 'partnership' | 'api_access' | 'support' | 'sales'>('sales');
  const [modalTitle, setModalTitle] = useState('');
  const [modalSubtitle, setModalSubtitle] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const openContactModal = (type: 'demo' | 'partnership' | 'api_access' | 'support' | 'sales', title: string, subtitle: string) => {
    setModalType(type);
    setModalTitle(title);
    setModalSubtitle(subtitle);
    setContactModalOpen(true);
  };

  const pricingTiers: PricingTier[] = [
    {
      name: "Live demo",
      price: "Free",
      description: "Our population, our sources, weekly. Prove it works.",
      cta: "See the Live Demo",
      ctaHref: "/demo"
    },
    {
      name: "Pilot",
      price: "$2,500",
      billing: "one-time",
      description: "Your entity list, our sources, one-time report. Credits to annual.",
      cta: "Start a Pilot",
      ctaAction: () => openContactModal('sales', 'Pilot Request', 'Tell us which entities you want measured')
    },
    {
      name: "Standard",
      price: "$15,000",
      billing: "per year",
      description: "Your population, our sources, weekly, API access",
      popular: true,
      cta: "Get Standard",
      ctaAction: () => openContactModal('sales', 'Standard Plan Inquiry', 'Tell us about your population and how you want to consume the data'),
      hasApiDocs: true
    },
    {
      name: "Custom",
      price: "Contact",
      description: "Your population, your sources, your cadence, new verticals",
      cta: "Talk to Us",
      ctaAction: () => openContactModal('sales', 'Custom Engagement', 'Tell us about your sources, cadence, and vertical')
    }
  ];

  const faqItems = [
    {
      question: "What's the difference between the live demo and a pilot?",
      answer: "The live demo runs on our population and our sources, refreshed weekly. It costs nothing and exists to prove the methodology works before you spend anything. A pilot points the same engine at your entity list and delivers a one-time report on the entities you actually care about."
    },
    {
      question: "Does the pilot cost apply to an annual contract?",
      answer: "Yes. The $2,500 pilot fee credits in full toward Standard if you move to an annual contract. The pilot is designed as a first step, not a separate purchase."
    },
    {
      question: "What does \"your sources\" mean in Custom?",
      answer: "Standard runs on our source set — the podcasts and feeds we already ingest. Custom means we bring in sources you specify: your own shows, regional or niche feeds, or channels outside our current coverage. Custom also covers non-weekly cadences and standing up an entirely new vertical."
    },
    {
      question: "How quickly do I get my first pilot report?",
      answer: "Pilot reports are delivered in 5-7 business days from the time we have your entity list. Standard customers get their first weekly refresh within 24 hours of setup, with API access live immediately."
    },
    {
      question: "Is API access included?",
      answer: "Standard and Custom both include API access to your scores and historical data. The live demo and pilot are report-only. See the API documentation for endpoints and response formats."
    },
    {
      question: "What verticals do you cover, and can you do mine?",
      answer: "We've analyzed WNBA/Unrivaled (the live demo), NFL teams, cryptocurrency, and entertainment. The methodology works for any vertical where podcast conversations happen — if people talk about your entities on podcasts, we can measure their influence. Standing up a new vertical is a Custom engagement."
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
            Start free on our population. Scale to yours.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
          >
            See the live demo for free, pilot your own entity list, then move to an annual contract with API access
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => {
              const ctaClasses = `w-full py-4 rounded-lg font-semibold transition-all duration-200 ${
                tier.popular
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`;

              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col rounded-2xl p-8 ${
                    tier.popular
                      ? 'bg-gradient-to-b from-orange-900/20 to-red-900/20 border-2 border-orange-500/50'
                      : 'bg-gray-800/50 border border-gray-700'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-1 whitespace-nowrap">
                        <Star size={14} />
                        RECOMMENDED
                      </div>
                    </div>
                  )}

                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-white mb-3">{tier.name}</h3>
                    <p className="text-gray-400 mb-6 min-h-[4.5rem]">{tier.description}</p>
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-white">{tier.price}</span>
                      {tier.billing && (
                        <span className="text-gray-400 ml-2">/{tier.billing}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto space-y-3">
                    {tier.ctaHref ? (
                      <Link href={tier.ctaHref} className="block">
                        <button className={ctaClasses}>{tier.cta}</button>
                      </Link>
                    ) : (
                      <button onClick={tier.ctaAction} className={ctaClasses}>
                        {tier.cta}
                      </button>
                    )}
                    {tier.hasApiDocs && (
                      <Link href="/docs" className="block">
                        <button className="w-full py-3 bg-transparent border border-gray-600 hover:border-orange-500 rounded-lg text-gray-300 font-medium transition-colors flex items-center justify-center gap-2">
                          <BarChart3 size={16} />
                          API Docs
                        </button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
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
            Start with the free live demo. Pilot your own entity list for $2,500 — credited toward your annual.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GetStartedButton 
              size="lg"
              onClick={() => openContactModal('sales', 'Get Started', 'Tell us about your analytics needs and we\'ll create a custom solution')}
              href=""
            >
              Get Started Today
            </GetStartedButton>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title={modalTitle}
        subtitle={modalSubtitle}
        inquiryType={modalType}
      />
    </main>
  );
}