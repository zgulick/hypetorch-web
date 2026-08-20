import React from 'react';

/**
 * Route-level loading UI for /demo.
 *
 * The page itself is statically rendered, so this mostly shows during
 * client-side navigation from another route while the RSC payload streams,
 * and on the first request after the cache revalidates.
 *
 * Deliberately plain markup (no 'use client') so it costs no JavaScript.
 */
export default function DemoLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <section className="relative pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-12 md:h-16 w-72 md:w-96 mx-auto rounded-lg bg-gray-800 animate-pulse" />
          <div className="mt-6 h-6 w-full max-w-3xl mx-auto rounded bg-gray-800/70 animate-pulse" />
        </div>
      </section>

      {/* Controls bar */}
      <div className="px-6">
        <div className="max-w-7xl mx-auto h-16 rounded-xl bg-gray-800/60 animate-pulse" />
      </div>

      {/* Evolution chart */}
      <section className="py-12 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-64 mx-auto mb-8 rounded bg-gray-800 animate-pulse" />
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="h-6 w-1/3 mb-4 rounded bg-gray-700 animate-pulse" />
            <div className="h-[450px] rounded bg-gray-700/60 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Metrics dashboard */}
      <section className="py-12 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-xl bg-gray-800/70 border border-gray-700 animate-pulse"
            />
          ))}
        </div>
      </section>

      <span className="sr-only">Loading demo data…</span>
    </main>
  );
}
