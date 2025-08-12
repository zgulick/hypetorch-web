"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../Navbar";
import { MessageCircle, Headphones, Building, Mail, Send } from "lucide-react";

export default function ContactPage() {
  const [activeForm, setActiveForm] = useState<'general' | 'support' | 'custom'>('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'general'
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

  const handleFormTypeChange = (type: 'general' | 'support' | 'custom') => {
    setActiveForm(type);
    setFormData(prev => ({
      ...prev,
      inquiryType: type
    }));
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
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-white">Message Sent!</h1>
            <p className="text-xl text-gray-300 mb-6">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-8 text-left">
              <h3 className="text-lg font-semibold text-orange-400 mb-3">What&apos;s Next:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• We&apos;ll review your message and respond within 24 hours</li>
                <li>• For urgent technical support, check your existing customer portal</li>
                <li>• You&apos;ll receive a confirmation email shortly</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {setSubmitted(false); setFormData({name: '', email: '', company: '', subject: '', message: '', inquiryType: 'general'});}}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-105"
              >
                Send Another Message
              </button>
              <Link href="/">
                <button className="px-8 py-3 bg-transparent border border-gray-700 hover:border-orange-500 rounded-lg text-white font-semibold transition-colors text-center">
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
      <section className="relative w-full pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the best way to reach us based on your needs
            </p>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {/* General Inquiries */}
            <div 
              className={`p-6 rounded-lg border cursor-pointer transition-all duration-200 ${
                activeForm === 'general' 
                  ? 'bg-gradient-to-b from-orange-900/20 to-red-900/20 border-orange-500/50' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-orange-500/30'
              }`}
              onClick={() => handleFormTypeChange('general')}
            >
              <MessageCircle className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">General Inquiries</h3>
              <p className="text-gray-300 text-sm mb-4">
                Questions about our platform, pricing, or how we can help your business
              </p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• Business partnerships</li>
                <li>• Media inquiries</li>
                <li>• General questions</li>
              </ul>
            </div>

            {/* Technical Support */}
            <div 
              className={`p-6 rounded-lg border cursor-pointer transition-all duration-200 ${
                activeForm === 'support' 
                  ? 'bg-gradient-to-b from-orange-900/20 to-red-900/20 border-orange-500/50' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-orange-500/30'
              }`}
              onClick={() => handleFormTypeChange('support')}
            >
              <Headphones className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Technical Support</h3>
              <p className="text-gray-300 text-sm mb-4">
                Help with APIs, reports, or technical issues for existing customers
              </p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• API troubleshooting</li>
                <li>• Report questions</li>
                <li>• Account issues</li>
              </ul>
            </div>

            {/* Custom Projects */}
            <div 
              className={`p-6 rounded-lg border cursor-pointer transition-all duration-200 ${
                activeForm === 'custom' 
                  ? 'bg-gradient-to-b from-orange-900/20 to-red-900/20 border-orange-500/50' 
                  : 'bg-gray-800/50 border-gray-700 hover:border-orange-500/30'
              }`}
              onClick={() => handleFormTypeChange('custom')}
            >
              <Building className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Custom Projects</h3>
              <p className="text-gray-300 text-sm mb-4">
                Enterprise solutions beyond our standard tiers
              </p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• White-label solutions</li>
                <li>• Custom data partnerships</li>
                <li>• Enterprise integrations</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative w-full px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="bg-gray-800/50 rounded-lg p-8 border border-gray-700"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {activeForm === 'general' && 'General Inquiry'}
                {activeForm === 'support' && 'Technical Support Request'}
                {activeForm === 'custom' && 'Custom Project Discussion'}
              </h2>
              <p className="text-gray-400">
                {activeForm === 'general' && 'We&apos;ll get back to you within 24 hours'}
                {activeForm === 'support' && 'Priority support for existing customers'}
                {activeForm === 'custom' && 'Let&apos;s discuss your enterprise needs'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div className="md:col-span-2">
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

              {/* Subject */}
              <div className="md:col-span-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={
                    activeForm === 'general' ? 'Brief description of your inquiry' :
                    activeForm === 'support' ? 'Describe your technical issue' :
                    'Custom project overview'
                  }
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Message */}
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={
                    activeForm === 'general' ? 'Tell us more about how we can help you...' :
                    activeForm === 'support' ? 'Please provide details about your technical issue, including any error messages...' :
                    'Describe your custom project requirements, timeline, and any specific needs...'
                  }
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Additional Info for Support */}
            {activeForm === 'support' && (
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2">For Faster Support:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Include your customer ID or email associated with your account</li>
                  <li>• Provide any error messages exactly as they appear</li>
                  <li>• Include screenshots if relevant</li>
                  <li>• Describe what you were trying to do when the issue occurred</li>
                </ul>
              </div>
            )}

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
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </motion.form>

          {/* Alternative Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Prefer Email?</h3>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <Mail className="w-5 h-5 text-orange-500" />
              <a 
                href="mailto:hypetorch@gmail.com" 
                className="text-orange-400 hover:text-orange-300 transition-colors"
              >
                hypetorch@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}