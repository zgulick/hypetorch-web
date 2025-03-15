// components/CookieBanner.tsx
"use client";

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookiesAccepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 px-6 z-50 shadow-lg border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm">
            This website uses necessary cookies to ensure you get the best experience. 
            We don't use cookies for tracking or marketing purposes.{" "}
            <a href="/privacy-policy" className="text-orange-400 hover:underline">
                Learn more
            </a>
        </div>
        <button
          onClick={acceptCookies}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded text-white font-medium text-sm whitespace-nowrap"
        >
          I understand
        </button>
      </div>
    </div>
  );
}