"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-orange-400 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-orange-400 transition-colors font-medium"
            >
              About
            </Link>
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
            className="fixed inset-0 bg-gray-950/98 z-40 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 text-lg">
              <Link
                href="/"
                className="text-white hover:text-orange-400 transition-colors w-full text-center py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="text-white hover:text-orange-400 transition-colors w-full text-center py-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
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