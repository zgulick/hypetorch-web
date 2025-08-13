"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Activity, BarChart3, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';
import { isAuthenticated } from './lib/auth';
import ContactModal from '@/components/ContactModal';
import GetStartedButton from '@/components/GetStartedButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to check if a route is active
  const isActiveRoute = (route: string) => pathname === route;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled
          ? "bg-gray-900 backdrop-blur-md shadow-lg border-b border-gray-700/50 py-3"
          : "bg-gray-900/90 backdrop-blur-md py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/hypetorch-logo.svg"
              alt="HypeTorch Logo"
              width={32}
              height={32}
              className="transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <span className="text-xl font-bold text-white tracking-tight">
              HypeTorch
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/reports" 
              className={`flex items-center space-x-2 font-medium text-sm tracking-wide transition-colors duration-200 ${
                isActiveRoute('/reports') 
                  ? 'text-orange-400 border-b-2 border-orange-400 pb-1' 
                  : 'text-gray-300 hover:text-orange-400'
              }`}
            >
              <BarChart3 size={16} />
              <span>Reports & Analytics</span>
            </Link>
            <Link 
              href="/contact" 
              className={`flex items-center space-x-2 font-medium text-sm tracking-wide transition-colors duration-200 ${
                isActiveRoute('/contact') 
                  ? 'text-orange-400 border-b-2 border-orange-400 pb-1' 
                  : 'text-gray-300 hover:text-orange-400'
              }`}
            >
              <MessageCircle size={16} />
              <span>Contact</span>
            </Link>
            {isAuthenticated() && (
              <Link 
                href="/admin" 
                className={`flex items-center space-x-2 font-medium text-sm tracking-wide transition-colors duration-200 ${
                  isActiveRoute('/admin') || pathname?.startsWith('/admin') 
                    ? 'text-orange-400 border-b-2 border-orange-400 pb-1' 
                    : 'text-gray-300 hover:text-orange-400'
                }`}
              >
                <Activity size={16} />
                <span>Admin</span>
              </Link>
            )}
            <GetStartedButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-orange-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-md z-50 pt-20 px-6 md:hidden"
          >
            {/* Close button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-orange-400 transition-colors"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-4 text-lg">
              <Link 
                href="/reports" 
                onClick={() => setMobileMenuOpen(false)} 
                className={`flex items-center space-x-3 font-medium py-2 border-b border-gray-700 transition-colors ${
                  isActiveRoute('/reports') ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'
                }`}
              >
                <BarChart3 size={20} />
                <span>Reports & Analytics</span>
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)} 
                className={`flex items-center space-x-3 font-medium py-2 border-b border-gray-700 transition-colors ${
                  isActiveRoute('/contact') ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'
                }`}
              >
                <MessageCircle size={20} />
                <span>Contact</span>
              </Link>
              {isAuthenticated() && (
                <Link 
                  href="/admin" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className={`flex items-center space-x-3 font-medium py-2 border-b border-gray-700 transition-colors ${
                    isActiveRoute('/admin') || pathname?.startsWith('/admin') ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'
                  }`}
                >
                  <Activity size={20} />
                  <span>Admin</span>
                </Link>
              )}
              <div onClick={() => setMobileMenuOpen(false)}>
                <GetStartedButton fullWidth className="mt-2" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contact Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title="Contact Sales"
        subtitle="Get a custom quote for your specific needs"
        inquiryType="sales"
      />
    </>
  );
}
