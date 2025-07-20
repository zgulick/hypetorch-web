"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { isAuthenticated } from './lib/auth';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200 py-3"
          : "bg-gray-50/95 backdrop-blur-sm py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo using /public/logo-new.svg */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo-icon.svg"
              alt="HypeTorch Logo"
              width={36}
              height={36}
              className="transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              HypeTorch
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/intelligence" className="text-gray-700 hover:text-amber-600 font-medium text-sm tracking-wide transition-colors">
              Intelligence Hub
            </Link>
            <Link href="/entities" className="text-gray-700 hover:text-amber-600 font-medium text-sm tracking-wide transition-colors">
              Entity Profiles
            </Link>
            <Link href="/analysis" className="text-gray-700 hover:text-amber-600 font-medium text-sm tracking-wide transition-colors">
              Market Analysis
            </Link>
            <Link href="/platform" className="text-gray-700 hover:text-amber-600 font-medium text-sm tracking-wide transition-colors">
              Platform
            </Link>
            {isAuthenticated() && (
              <Link href="/admin" className="text-gray-700 hover:text-amber-600 font-medium text-sm tracking-wide transition-colors">
                Admin
              </Link>
            )}
            <a
              href="mailto:hypetorch@gmail.com?subject=HypeTorch%20Inquiry"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-orange-700 rounded-lg text-white font-semibold text-sm hover:shadow-lg hover:shadow-amber-600/25 transition-all duration-200 hover:scale-105"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-amber-600 transition-colors"
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
            className="fixed inset-0 bg-white z-40 pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-lg">
              <Link href="/intelligence" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-amber-600 font-medium py-3 border-b border-gray-100">
                Intelligence Hub
              </Link>
              <Link href="/entities" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-amber-600 font-medium py-3 border-b border-gray-100">
                Entity Profiles
              </Link>
              <Link href="/analysis" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-amber-600 font-medium py-3 border-b border-gray-100">
                Market Analysis
              </Link>
              <Link href="/platform" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-amber-600 font-medium py-3 border-b border-gray-100">
                Platform
              </Link>
              {isAuthenticated() && (
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-amber-600 font-medium py-3 border-b border-gray-100">
                  Admin
                </Link>
              )}
              <a
                href="mailto:hypetorch@gmail.com?subject=HypeTorch%20Inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-700 rounded-lg text-white font-semibold text-center mt-4"
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
