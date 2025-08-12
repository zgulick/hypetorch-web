"use client";

import { useState, useEffect } from 'react';
import { X, Settings, Info, Check } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('hypetorch-cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      const savedPrefs = JSON.parse(consent);
      setPreferences(savedPrefs);
    }
  }, []);

  const acceptAll = () => {
    const newPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    
    savePreferences(newPreferences);
    setShowBanner(false);
  };

  const acceptEssential = () => {
    const newPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    
    savePreferences(newPreferences);
    setShowBanner(false);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
    setShowSettings(false);
    setShowBanner(false);
  };

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('hypetorch-cookie-consent', JSON.stringify(prefs));
    setPreferences(prefs);
    
    // Here you would typically initialize/disable tracking services
    // based on the user's preferences
    if (prefs.analytics) {
      // Initialize analytics (e.g., Google Analytics)
      console.log('Analytics enabled');
    }
    
    if (prefs.marketing) {
      // Initialize marketing cookies
      console.log('Marketing cookies enabled');
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur border-t border-gray-700 p-4 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium text-sm mb-1">
                    We value your privacy
                  </h3>
                  <p className="text-gray-300 text-sm">
                    We use essential cookies to make our website function properly. We would also like to use 
                    optional cookies for analytics to improve our service. You can choose which cookies to accept.{" "}
                    <Link href="/privacy-policy" className="text-orange-400 hover:underline">
                      Learn more
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={acceptEssential}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm"
              >
                Essential Only
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors text-sm flex items-center gap-1"
              >
                <Settings className="w-4 h-4" />
                Customize
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-colors text-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur z-60 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-700 p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Cookie Preferences</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">Essential Cookies</h3>
                  <div className="flex items-center gap-1">
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">Always Active</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  These cookies are necessary for the website to function and cannot be switched off. 
                  They are usually only set in response to actions made by you.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">Analytics Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-400">
                  These cookies help us understand how visitors interact with our website by collecting 
                  information anonymously. This helps us improve our service.
                </p>
              </div>

              {/* Marketing Cookies */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">Marketing Cookies</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-400">
                  These cookies are used to deliver personalized advertisements and track the effectiveness 
                  of our advertising campaigns.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveCustomPreferences}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500 text-center">
                <Link href="/privacy-policy" className="text-orange-400 hover:underline">
                  Read our Privacy Policy
                </Link>{" "}
                for more information about how we handle your data.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}