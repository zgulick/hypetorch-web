"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../Navbar";
import { ArrowLeft, RefreshCw, Send } from "lucide-react";

export default function RecurringSetupForm() {
  const [formData, setFormData] = useState({
    sport: '',
    entities: '',
    youtubeChannels: '',
    frequency: 'weekly',
    deliveryDay: 'Monday',
    apiAccess: 'yes',
    useCase: '',
    billingPreference: 'monthly',
    name: '',
    email: '',
    company: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
        <Navbar />
        
        <section className="relative w-full flex flex-col items-center justify-center pt-32 pb-16 px-6 min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-white">Setup Request Submitted!</h1>
            <p className="text-xl text-gray-300 mb-6">
              Thank you for your recurring intelligence setup request. We&apos;ll contact you within 24 hours to finalize 
              your subscription and set up your automated reporting.
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-8 text-left">
              <h3 className="text-lg font-semibold text-orange-400 mb-3">Next Steps:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• We&apos;ll review your requirements and suggest optimal reporting setup</li>
                <li>• You&apos;ll receive API credentials and documentation access</li>
                <li>• Your first automated report will be generated within 24 hours of setup</li>
                <li>• Billing will begin after your first report is delivered</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-105">
                  View Other Pricing Options
                </button>
              </Link>
              <Link href="/">
                <button className="px-8 py-3 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold transition-colors">
                  Back to Home
                </button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Header Section */}
      <section className="relative w-full pt-32 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/pricing" className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors mb-6">
            <ArrowLeft size={18} />
            Back to Pricing
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Recurring Intelligence - $1,500/month
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Weekly automated reports plus API access for ongoing analytics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative w-full px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-gray-800/50 rounded-lg p-8 border border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sport/Industry */}
              <div>
                <label htmlFor="sport" className="block text-sm font-medium text-gray-300 mb-2">
                  Sport/Industry *
                </label>
                <input
                  type="text"
                  id="sport"
                  name="sport"
                  required
                  value={formData.sport}
                  onChange={handleInputChange}
                  placeholder='e.g., "WNBA", "NFL Draft", "Entertainment"'
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Reporting Frequency */}
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-300 mb-2">
                  Reporting Frequency
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                </select>
              </div>

              {/* Delivery Day */}
              <div>
                <label htmlFor="deliveryDay" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Delivery Day
                </label>
                <select
                  id="deliveryDay"
                  name="deliveryDay"
                  value={formData.deliveryDay}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>

              {/* API Access */}
              <div>
                <label htmlFor="apiAccess" className="block text-sm font-medium text-gray-300 mb-2">
                  Need API Access?
                </label>
                <select
                  id="apiAccess"
                  name="apiAccess"
                  value={formData.apiAccess}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="yes">Yes (500 calls/month included)</option>
                  <option value="no">No, reports only</option>
                </select>
              </div>

              {/* Entities - Full Width */}
              <div className="md:col-span-2">
                <label htmlFor="entities" className="block text-sm font-medium text-gray-300 mb-2">
                  Entities to Track *
                </label>
                <textarea
                  id="entities"
                  name="entities"
                  required
                  rows={3}
                  value={formData.entities}
                  onChange={handleInputChange}
                  placeholder='e.g., "Caitlin Clark, Angel Reese, Alyssa Thomas"'
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>

              {/* YouTube Channels - Full Width */}
              <div className="md:col-span-2">
                <label htmlFor="youtubeChannels" className="block text-sm font-medium text-gray-300 mb-2">
                  YouTube Channels to Analyze *
                </label>
                <textarea
                  id="youtubeChannels"
                  name="youtubeChannels"
                  required
                  rows={4}
                  value={formData.youtubeChannels}
                  onChange={handleInputChange}
                  placeholder="Please provide specific YouTube channel URLs or names where these entities are discussed"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>

              {/* Use Case - Full Width */}
              <div className="md:col-span-2">
                <label htmlFor="useCase" className="block text-sm font-medium text-gray-300 mb-2">
                  Use Case & Integration Plans
                </label>
                <textarea
                  id="useCase"
                  name="useCase"
                  rows={3}
                  value={formData.useCase}
                  onChange={handleInputChange}
                  placeholder="How will you use the reports and API? Any specific integration requirements?"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>

              {/* Billing Preference */}
              <div className="md:col-span-2">
                <label htmlFor="billingPreference" className="block text-sm font-medium text-gray-300 mb-2">
                  Billing Preference
                </label>
                <select
                  id="billingPreference"
                  name="billingPreference"
                  value={formData.billingPreference}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="monthly">Monthly billing ($1,500/month)</option>
                  <option value="quarterly">Quarterly billing ($4,275 - 5% discount)</option>
                  <option value="annual">Annual billing ($15,300 - 15% discount)</option>
                </select>
              </div>

              {/* Contact Information Header */}
              <div className="md:col-span-2 mt-6">
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                  Contact Information
                </h3>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Recurring Setup Request
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </section>
    </main>
  );
}