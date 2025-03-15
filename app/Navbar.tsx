"use client";

import Link from "next/link";
import { useState, useEffect, useRef, MouseEvent } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { isAuthenticated } from './lib/auth';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsDropdownOpen, setSportsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (event: MouseEvent | TouchEvent | Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSportsDropdownOpen(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside as EventListener);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-950/90 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="HypeTorch Logo" 
              width={36} 
              height={36} 
              className="h-9 w-9" 
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              HypeTorch
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-orange-400 transition-colors font-medium"
            >
              Home
            </Link>
            
            {/* Sports Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setSportsDropdownOpen(!sportsDropdownOpen)}
                className="text-gray-300 hover:text-orange-400 transition-colors font-medium flex items-center gap-1"
              >
                Sports <ChevronDown size={16} className={`transition-transform duration-200 ${sportsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              <AnimatePresence>
                {sportsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-40 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-orange-400 transition-colors"
                      onClick={() => setSportsDropdownOpen(false)}
                    >
                      Unrivaled
                    </Link>
                    {/* Add more sports categories here as needed */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/compare"
              className="text-gray-300 hover:text-orange-400 transition-colors font-medium"
            >
              Compare
            </Link>

            <Link
              href="/about"
              className="text-gray-300 hover:text-orange-400 transition-colors font-medium"
            >
              About
            </Link>
            {/* Only show Admin link if authenticated */}
            {isAuthenticated() && (
              <Link
                href="/admin"
                className="text-gray-300 hover:text-orange-400 transition-colors font-medium"
              >
                Admin
              </Link>
            )}
            <Link
              href="mailto:hypetorch@gmail.com?subject=HypeTorch%20Inquiry"
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-orange-900/20 transition-shadow"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-950 z-40 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-lg">
              <Link
                href="/"
                className="text-white hover:text-orange-400 transition-colors w-full text-center py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Sports Dropdown */}
              <div className="w-full">
                <button
                  onClick={() => setSportsDropdownOpen(!sportsDropdownOpen)}
                  className="text-white hover:text-orange-400 transition-colors w-full text-center py-3 flex items-center justify-center gap-1"
                >
                  Sports <ChevronDown size={16} className={`transition-transform duration-200 ${sportsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {sportsDropdownOpen && (
                  <div className="w-full bg-gray-800/30 rounded-lg mt-2">
                    <Link
                      href="/dashboard"
                      className="text-gray-200 hover:text-orange-400 transition-colors w-full text-center py-3 block"
                      onClick={() => {
                        setSportsDropdownOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Unrivaled
                    </Link>
                    {/* Add more sports categories here as needed */}
                  </div>
                )}
              </div>
              
              <Link
                href="/compare"
                className="text-white hover:text-orange-400 transition-colors w-full text-center py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Compare
              </Link>

              <Link
                href="/about"
                className="text-white hover:text-orange-400 transition-colors w-full text-center py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="mailto:hypetorch@gmail.com?subject=HypeTorch%20Inquiry"
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-medium w-full text-center mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}