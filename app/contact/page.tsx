"use client";

import React from 'react';
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "../Navbar";
import ContactForm from "@/components/ContactForm";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      {/* Header Section */}
      <section className="relative w-full pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Ready to transform your analytics? We&rsquo;re here to help with demos, partnerships, technical support, and custom solutions.
            </p>
            
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <MessageCircle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">General Inquiries</h3>
                <p className="text-sm text-gray-400">Business partnerships, demos, pricing</p>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <Phone className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Technical Support</h3>
                <p className="text-sm text-gray-400">API help, reports, account issues</p>
              </div>
              
              <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <MapPin className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Custom Projects</h3>
                <p className="text-sm text-gray-400">Enterprise solutions, integrations</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative w-full px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <ContactForm 
              title="Contact Us"
              subtitle="Tell us how we can help you"
              inquiryType="demo"
            />
          </motion.div>

          {/* Alternative Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
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
            <p className="text-sm text-gray-400 mt-2">
              We&rsquo;ll respond within 24 hours during business days
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 HypeTorch. All rights reserved. |{" "}
            <Link href="/privacy-policy" className="text-orange-400 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}