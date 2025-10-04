'use client';

import { useState } from 'react';
import VerticalSelector from '@/components/VerticalSelector';
import TopMoversWidget from '@/components/TopMoversWidget';
import DemoDashboard from '@/components/DemoDashboard';
import IntelligenceDashboard from '@/components/IntelligenceDashboard';
import PlayerShowcase from '@/components/PlayerShowcase';
import WeeklyEvolutionChart from '@/components/WeeklyEvolutionChart';

export default function TestAllComponentsPage() {
  const [selectedVertical, setSelectedVertical] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 p-12">
      <h1 className="text-white text-3xl mb-8">All Components Test - Chunk 08</h1>

      <VerticalSelector
        selected={selectedVertical}
        onChange={setSelectedVertical}
        className="mb-8"
      />

      <div className="text-white mb-8">
        Current filter: <strong>{selectedVertical || 'All Verticals'}</strong>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-white text-2xl mb-4">TopMoversWidget</h2>
          <TopMoversWidget subcategory={selectedVertical} />
        </section>

        <section>
          <h2 className="text-white text-2xl mb-4">DemoDashboard</h2>
          <DemoDashboard subcategory={selectedVertical} />
        </section>

        <section>
          <h2 className="text-white text-2xl mb-4">IntelligenceDashboard</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <IntelligenceDashboard subcategory={selectedVertical} />
          </div>
        </section>

        <section>
          <h2 className="text-white text-2xl mb-4">PlayerShowcase</h2>
          <PlayerShowcase subcategory={selectedVertical} />
        </section>

        <section>
          <h2 className="text-white text-2xl mb-4">WeeklyEvolutionChart</h2>
          <WeeklyEvolutionChart subcategory={selectedVertical} />
        </section>
      </div>

      {/* Testing Instructions */}
      <div className="mt-12 bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white text-lg mb-4">Testing Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-green-400 font-semibold mb-2">✅ Test Scenario A: All Verticals</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Select &quot;All Verticals&quot;</li>
              <li>• Each component shows mixed data</li>
              <li>• No errors in console</li>
              <li>• Data loads across all components</li>
            </ul>
          </div>

          <div>
            <h4 className="text-blue-400 font-semibold mb-2">🏀 Test Scenario B: NBA Filter</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Select &quot;NBA&quot;</li>
              <li>• All components show ONLY NBA entities</li>
              <li>• Data updates across all components</li>
              <li>• Network tab: API calls include subcategory=NBA</li>
            </ul>
          </div>

          <div>
            <h4 className="text-orange-400 font-semibold mb-2">🏀 Test Scenario C: Unrivaled Filter</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Select &quot;Unrivaled&quot;</li>
              <li>• All components show ONLY Unrivaled entities</li>
              <li>• Data updates across all components</li>
              <li>• Network tab: API calls include subcategory=Unrivaled</li>
            </ul>
          </div>

          <div>
            <h4 className="text-purple-400 font-semibold mb-2">🔄 Test Scenario D: Component Independence</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Each component fetches its own data</li>
              <li>• Loading states work independently</li>
              <li>• Error in one component doesn&apos;t break others</li>
              <li>• WeeklyEvolutionChart randomize button works</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg">
          <h4 className="text-yellow-400 font-semibold mb-2">🛠️ DevTools Verification</h4>
          <p className="text-sm text-gray-300 mb-2">Open Browser DevTools → Network tab and verify:</p>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• API calls include subcategory parameter when filtering</li>
            <li>• Responses contain only filtered entities</li>
            <li>• No unnecessary duplicate requests</li>
            <li>• No client-side filtering in Sources/Debugger</li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🎯 Success Criteria: All components accept subcategory prop, use API filtering, no hardcoded entity lists, TypeScript compiles without errors
          </p>
        </div>
      </div>
    </div>
  );
}