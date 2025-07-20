// File: app/compare/page.tsx

"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/Navbar";
import EntitySelector from "@/components/entityselector";
import ComparisonCard from "@/components/comparisoncard";
import { compareEntities } from '@/lib/dataService';

import { motion } from "framer-motion";

interface EntityData {
  name: string;
  hype_score: number;
  mentions: number;
  talk_time: number;
  sentiment: number[];
  rodmn_score: number;
  google_trends?: number;
  wikipedia_views?: number;
  reddit_mentions?: number;
}

export default function ComparePage() {
  const [entityOne, setEntityOne] = useState<string | null>(null);
  const [entityTwo, setEntityTwo] = useState<string | null>(null);
  const [entityOneData, setEntityOneData] = useState<EntityData | null>(null);
  const [entityTwoData, setEntityTwoData] = useState<EntityData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  // Load entities from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const entity1 = params.get('entity1');
    const entity2 = params.get('entity2');

    if (entity1) setEntityOne(decodeURIComponent(entity1));
    if (entity2) setEntityTwo(decodeURIComponent(entity2));
  }, []);

  // Fetch comparison data when entities change
  // In app/compare/page.tsx - update the entity data extraction

  useEffect(() => {
    async function fetchEntityData() {
      if (!entityOne || !entityTwo) return;

      setIsLoading(true);
      setError(null);

      try {
        console.log('🔍 DEBUG: Fetch Start using compareEntities');
        console.log('🌐 Comparing Entities:', entityOne, entityTwo);

        // Use the compareEntities function which calls the /compare endpoint
        const comparisonData = await compareEntities(
          [entityOne, entityTwo],
          true,  // includeHistory
          'last_30_days',  // timePeriod
          ["hype_score", "rodmn_score", "mentions", "talk_time", "sentiment", "wikipedia_views", "reddit_mentions", "google_trends"]  // metrics
        );

        console.log('✅ Comparison Data:', comparisonData);

        // Extract entity data from the comparison result
        const entity1Data = comparisonData.entities[entityOne];
        const entity2Data = comparisonData.entities[entityTwo];

        // Set the data
        setEntityOneData({
          name: entityOne,
          hype_score: entity1Data.hype_score || 0,
          mentions: entity1Data.mentions || 0,
          talk_time: entity1Data.talk_time || 0,
          sentiment: entity1Data.sentiment || [],
          rodmn_score: entity1Data.rodmn_score || 0,
          wikipedia_views: entity1Data.wikipedia_views || 0,
          reddit_mentions: entity1Data.reddit_mentions || 0,
          google_trends: entity1Data.google_trends || 0
        });

        setEntityTwoData({
          name: entityTwo,
          hype_score: entity2Data.hype_score || 0,
          mentions: entity2Data.mentions || 0,
          talk_time: entity2Data.talk_time || 0,
          sentiment: entity2Data.sentiment || [],
          rodmn_score: entity2Data.rodmn_score || 0,
          wikipedia_views: entity2Data.wikipedia_views || 0,
          reddit_mentions: entity2Data.reddit_mentions || 0,
          google_trends: entity2Data.google_trends || 0
        });
      } catch (error: unknown) {
        console.error("🚨 FULL FETCH ERROR:", {
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          errorType: error instanceof Error ? error.name : 'Unknown type'
        });
        setError("Failed to load entity data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchEntityData();
  }, [entityOne, entityTwo]);

  // Calculate average sentiment - currently unused but kept for future use
  // const getAverageSentiment = (sentimentArray: number[]) => {
  //   if (!sentimentArray || sentimentArray.length === 0) return 0;
  //   return sentimentArray.reduce((a, b) => a + b, 0) / sentimentArray.length;
  // };

  // The rest of your component remains the same...

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mb-6 mt-8">
          Compare Entities
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Entity 1</h2>
            <EntitySelector
              selectedEntity={entityOne}
              onSelectEntity={setEntityOne}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Entity 2</h2>
            <EntitySelector
              selectedEntity={entityTwo}
              onSelectEntity={setEntityTwo}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 rounded-full border-t-4 border-orange-500 border-r-4 border-gray-300 animate-spin"></div>
          </div>
        ) : (!entityOne || !entityTwo || !entityOneData || !entityTwoData) ? (
          <div className="text-center text-gray-400 p-12 border border-gray-800 rounded-xl">
            Select two entities to compare their metrics and influence
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* The rest of your comparison UI stays the same */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ComparisonCard
                title="JORDN™ Score"
                entityOne={{
                  name: entityOne,
                  value: entityOneData.hype_score || 0
                }}
                entityTwo={{
                  name: entityTwo,
                  value: entityTwoData.hype_score || 0
                }}
                higherIsBetter={true}
              />

              {/* ... other comparison cards ... */}
            </div>

            {/* ... rest of your UI ... */}
          </motion.div>
        )}
      </div>
    </div>
  );
}