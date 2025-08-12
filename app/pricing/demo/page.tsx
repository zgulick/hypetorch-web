"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../../Navbar";
import { ArrowLeft, Crown, Calendar, CheckCircle } from "lucide-react";

export default function TechnicalDemoBooking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    teamSize: '',
    currentTools: '',
    apiUseCase: '',
    technicalRequirements: '',
    preferredDate: '',
    preferredTime: '',
    timezone: '',
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
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-white">Demo Request Submitted!</h1>
            <p className="text-xl text-gray-300 mb-6">
              Thank you for your interest in our Full Platform Access. We&apos;ll contact you within 24 hours 
              to schedule your technical demo and discuss your specific requirements.
            </p>
            
            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-orange-400 mb-3">Your Demo Will Include:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Live API demonstration with real data</li>
                <li>• Technical integration discussion</li>
                <li>• Custom entity setup walkthrough</li>
                <li>• Early access feature preview</li>
                <li>• Q&A session with our technical team</li>
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
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-orange-500" />
              <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                EARLY ACCESS
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Full Platform Access - $3,500/month
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Schedule a technical demo to explore our enterprise solution with unlimited API access
            </p>
          </motion.div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="relative w-full px-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-lg p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-orange-400 mb-4">Full Platform Access Includes:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-300">
                <li>• Everything in Recurring Intelligence</li>
                <li>• Unlimited API access</li>
                <li>• Priority support & monthly consultation calls</li>
                <li>• Early access to new metrics as we develop them</li>
              </ul>
              <ul className="space-y-2 text-gray-300">
                <li>• BETA: RNALDO Score (Social + Traditional + JORDN hybrid)</li>
                <li>• White-label report options</li>
                <li>• Custom entity tracking</li>
                <li>• Technical integration support</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Booking Form */}
      <section className="relative w-full px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-gray-800/50 rounded-lg p-8 border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Schedule Your Technical Demo
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
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

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Role *
                </label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g., CTO, Data Scientist, Marketing Director"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-gray-300 mb-2">
                  Team Size
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Select team size</option>
                  <option value="1-5">1-5 people</option>
                  <option value="6-15">6-15 people</option>
                  <option value="16-50">16-50 people</option>
                  <option value="50+">50+ people</option>
                </select>
              </div>

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

              {/* Current Tools */}
              <div className="md:col-span-2">
                <label htmlFor="currentTools" className="block text-sm font-medium text-gray-300 mb-2">
                  Current Analytics Tools
                </label>
                <textarea
                  id="currentTools"
                  name="currentTools"
                  rows={3}
                  value={formData.currentTools}
                  onChange={handleInputChange}
                  placeholder="What analytics tools or platforms does your team currently use?"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>

              {/* API Use Case */}
              <div className="md:col-span-2">
                <label htmlFor="apiUseCase" className="block text-sm font-medium text-gray-300 mb-2">
                  API Use Case *
                </label>
                <textarea
                  id="apiUseCase"
                  name="apiUseCase"
                  required
                  rows={3}
                  value={formData.apiUseCase}
                  onChange={handleInputChange}
                  placeholder="How do you plan to use our API? What kind of integration are you considering?"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>

              {/* Technical Requirements */}
              <div className="md:col-span-2">
                <label htmlFor="technicalRequirements" className="block text-sm font-medium text-gray-300 mb-2">
                  Technical Requirements & Questions
                </label>
                <textarea
                  id="technicalRequirements"
                  name="technicalRequirements"
                  rows={3}
                  value={formData.technicalRequirements}
                  onChange={handleInputChange}
                  placeholder="Any specific technical requirements, integration questions, or topics you&apos;d like to discuss?"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>

              {/* Scheduling Preferences Header */}
              <div className="md:col-span-2 mt-6">
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                  Scheduling Preferences
                </h3>
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Time
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Select time preference</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-2">
                  Timezone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none"
                >
                  <option value="">Select your timezone</option>
                  <option value="EST">Eastern Time (EST)</option>
                  <option value="CST">Central Time (CST)</option>
                  <option value="MST">Mountain Time (MST)</option>
                  <option value="PST">Pacific Time (PST)</option>
                  <option value="GMT">GMT</option>
                  <option value="CET">Central European Time (CET)</option>
                </select>
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
                    <Calendar size={20} />
                    Schedule Technical Demo
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