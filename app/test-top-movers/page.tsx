'use client';

import { useState } from 'react';
import TopMoversWidget from '@/components/TopMoversWidget';
import VerticalSelector from '@/components/VerticalSelector';

export default function TestTopMoversPage() {
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 p-12">
      <h1 className="text-white text-2xl mb-8">Top Movers Widget Test</h1>

      <div className="mb-8">
        <h2 className="text-white text-lg mb-4">Select Vertical:</h2>
        <VerticalSelector
          selected={selectedVertical}
          onChange={setSelectedVertical}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Test with current selection */}
        <div>
          <h3 className="text-white text-lg mb-4">
            Current Selection: {selectedVertical === null ? 'All Verticals' : selectedVertical}
          </h3>
          <TopMoversWidget
            subcategory={selectedVertical}
            limit={5}
            title={`Top 5 JORDN Scores${selectedVertical ? ` - ${selectedVertical}` : ' - All Verticals'}`}
          />
        </div>

        {/* Test with hardcoded Unrivaled */}
        <div>
          <h3 className="text-white text-lg mb-4">Hardcoded: Unrivaled</h3>
          <TopMoversWidget
            subcategory="Unrivaled"
            limit={5}
            title="Top 5 JORDN Scores - Unrivaled"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Test with hardcoded NBA */}
        <div>
          <h3 className="text-white text-lg mb-4">Hardcoded: NBA</h3>
          <TopMoversWidget
            subcategory="NBA"
            limit={5}
            title="Top 5 JORDN Scores - NBA"
          />
        </div>

        {/* Test with null (all verticals) */}
        <div>
          <h3 className="text-white text-lg mb-4">Hardcoded: All Verticals</h3>
          <TopMoversWidget
            subcategory={null}
            limit={5}
            title="Top 5 JORDN Scores - All Verticals"
          />
        </div>
      </div>

      <div className="mt-8 text-white">
        <h3 className="text-lg mb-2">Testing Notes:</h3>
        <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
          <li>Top widget uses the vertical selector state</li>
          <li>Other widgets test specific hardcoded values</li>
          <li>Component should load different data based on subcategory prop</li>
          <li>All widgets should show loading states, then data or errors</li>
          <li>No more hardcoded WNBA_UNRIVALED_ENTITIES filtering</li>
        </ul>
      </div>
    </div>
  );
}