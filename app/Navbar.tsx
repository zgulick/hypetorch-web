"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, BarChart2, Activity, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';
import { isAuthenticated } from './lib/auth';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-gray-900 backdrop-blur-md shadow-lg border-b border-gray-700/50 py-3"
          : "bg-gray-900/90 backdrop-blur-md py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo-new-design.svg"
              alt="HypeTorch Logo"
              width={90}
              height={30}
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
              href="/dashboard" 
              className={`flex items-center space-x-2 font-medium text-sm tracking-wide transition-colors duration-200 ${
                isActiveRoute('/dashboard') 
                  ? 'text-orange-400 border-b-2 border-orange-400 pb-1' 
                  : 'text-gray-300 hover:text-orange-400'
              }`}
            >
              <BarChart2 size={16} />
              <span>Dashboard</span>
            </Link>
            <Link 
              href="/compare" 
              className={`flex items-center space-x-2 font-medium text-sm tracking-wide transition-colors duration-200 ${
                isActiveRoute('/compare') || pathname?.startsWith('/compare') 
                  ? 'text-orange-400 border-b-2 border-orange-400 pb-1' 
                  : 'text-gray-300 hover:text-orange-400'
              }`}
            >
              <TrendingUp size={16} />
              <span>Analysis</span>
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
            <a
              href="mailto:hypetorch@gmail.com?subject=HypeTorch%20Inquiry"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 hover:scale-105"
            >
              Contact
            </a>
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
            className="fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40 pt-16 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-4 text-lg">
              <Link 
                href="/dashboard" 
                onClick={() => setMobileMenuOpen(false)} 
                className={`flex items-center space-x-3 font-medium py-2 border-b border-gray-700 transition-colors ${
                  isActiveRoute('/dashboard') ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'
                }`}
              >
                <BarChart2 size={20} />
                <span>Dashboard</span>
              </Link>
              <Link 
                href="/compare" 
                onClick={() => setMobileMenuOpen(false)} 
                className={`flex items-center space-x-3 font-medium py-2 border-b border-gray-700 transition-colors ${
                  isActiveRoute('/compare') || pathname?.startsWith('/compare') ? 'text-orange-400' : 'text-gray-300 hover:text-orange-400'
                }`}
              >
                <TrendingUp size={20} />
                <span>Analysis</span>
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
              <a
                href="mailto:hypetorch@gmail.com?subject=HypeTorch%20Inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-center mt-2 hover:shadow-lg hover:shadow-orange-500/25 transition-all"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
