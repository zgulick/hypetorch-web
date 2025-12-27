'use client';

import React, { useState, useEffect } from 'react';
import { getAvailableVerticals, Vertical } from '@/app/lib/verticals';

interface VerticalSelectorProps {
  selected: string | null;
  onChange: (subcategory: string | null) => void;
  className?: string;
}

/**
 * Vertical Selector Component
 *
 * Displays a tab-style selector for choosing different verticals (leagues/categories).
 * Fetches available verticals from the API and renders them as clickable buttons.
 *
 * The "All Verticals" option passes null to the onChange callback, which tells
 * data-fetching functions to return unfiltered results.
 *
 * @param selected - Currently selected vertical key or null for "All"
 * @param onChange - Callback fired when user selects a different vertical
 * @param className - Optional additional CSS classes
 *
 * @example
 * const [vertical, setVertical] = useState<string | null>(null);
 * <VerticalSelector selected={vertical} onChange={setVertical} />
 */
export const VerticalSelector: React.FC<VerticalSelectorProps> = ({
  selected,
  onChange,
  className = ''
}) => {
  const [verticals, setVerticals] = useState<Vertical[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch available verticals on component mount
  useEffect(() => {
    async function loadVerticals() {
      try {
        setLoading(true);
        setError(null);
        const data = await getAvailableVerticals();
        console.log('🔍 Verticals loaded:', data);
        console.log('📊 Verticals with recent data:', data.filter(v => v.has_recent_data).length);
        console.log('⚠️ Verticals without recent data:', data.filter(v => !v.has_recent_data).map(v => v.key));
        setVerticals(data);
      } catch (err) {
        console.error('Error loading verticals:', err);
        setError('Failed to load verticals');
      } finally {
        setLoading(false);
      }
    }

    loadVerticals();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className={`flex flex-wrap justify-center rounded-lg bg-gray-800 p-1 gap-1 ${className}`}>
        {/* Loading skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="px-6 py-3 rounded-md bg-gray-700 animate-pulse"
            style={{ width: '120px', height: '44px' }}
          />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`text-red-400 text-sm ${className}`}>
        {error}
      </div>
    );
  }

  // No verticals available
  if (verticals.length === 0) {
    return (
      <div className={`text-gray-400 text-sm ${className}`}>
        No verticals available
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap justify-center rounded-lg bg-gray-800 p-1 gap-1 ${className}`}>
      {/* "All Verticals" button */}
      <button
        onClick={() => onChange(null)}
        className={`px-4 sm:px-6 py-3 rounded-md font-semibold transition-all text-sm sm:text-base whitespace-nowrap ${
          selected === null
            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-900/50'
            : 'text-gray-400 hover:text-white hover:bg-gray-700'
        }`}
      >
        All Verticals
      </button>

      {/* Dynamic vertical buttons from API - only show verticals with recent data */}
      {verticals
        .filter(v => v.has_recent_data)
        .map((vertical) => (
          <button
            key={vertical.key}
            onClick={() => onChange(vertical.key)}
            className={`px-4 sm:px-6 py-3 rounded-md font-semibold transition-all text-sm sm:text-base whitespace-nowrap ${
              selected === vertical.key
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-900/50'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {vertical.label}
          </button>
        ))
      }
    </div>
  );
};

export default VerticalSelector;