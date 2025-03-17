"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/Navbar";
import EntitySelector from "@/components/entityselector";
import ComparisonCard from "@/components/comparisoncard";
import ComparisonChart from "@/components/comparisonchart";
import api, { API_KEY }  from '@/lib/api';
import { motion } from "framer-motion";
import { BarChart2, Activity, Globe } from "lucide-react";


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
  
    // Add this near the top of your component, after the useState declarations
  useEffect(() => {
    // Check URL parameters
    const params = new URLSearchParams(window.location.search);
    const entity1 = params.get('entity1');
    const entity2 = params.get('entity2');
    
    if (entity1) setEntityOne(decodeURIComponent(entity1));
    if (entity2) setEntityTwo(decodeURIComponent(entity2));
  }, []);

  useEffect(() => {
    async function fetchEntityData() {
      if (!entityOne || !entityTwo) return;
      
      setIsLoading(true);
      
      try {
        // 🚨 EXPLICIT DEBUGGING
        console.log('🔍 DEBUG: Fetch Start');
        console.log('🔑 Env API Key:', process.env.NEXT_PUBLIC_API_KEY);
        console.log('🔑 Hardcoded API Key:', API_KEY);  // from your api.ts
        
        // Log exactly what you're about to request
        console.log('🌐 Requesting Entity:', entityOne);
        console.log('🌐 Encoded Entity:', encodeURIComponent(entityOne));
  
        // Explicit try/catch for EACH request
        let entityOneResponse, entityOneTrending;
        let entityTwoResponse, entityTwoTrending;
        
        try {
          entityOneResponse = await api.get(`/entities/${encodeURIComponent(entityOne)}`);
          console.log('✅ Entity One Response:', entityOneResponse);
        } catch (specificError) {
          console.error('❌ Entity One Fetch Error:', {
            message: (specificError as Error).message,
            name: (specificError as Error).name,
            stack: (specificError as Error).stack
          });
          throw specificError;  // Re-throw to be caught by outer catch
        }
  
        try {
          entityOneTrending = await api.get(`/entities/${encodeURIComponent(entityOne)}/trending`);
          console.log('✅ Entity One Trending Response:', entityOneTrending);
        } catch (specificError) {
          console.error('❌ Entity One Trending Error:', {
            message: (specificError as Error).message,
            name: (specificError as Error).name,
            stack: (specificError as Error).stack
          });
          throw specificError;
        }
        try {
          entityTwoResponse = await api.get(`/entities/${encodeURIComponent(entityTwo)}`);
          console.log('✅ Entity Two Response:', entityTwoResponse);
        } catch (specificError) {
          console.error('❌ Entity Two Fetch Error:', {
            message: (specificError as Error).message,
            name: (specificError as Error).name,
            stack: (specificError as Error).stack
          });
          throw specificError;  // Re-throw to be caught by outer catch
        }
  
        try {
          entityTwoTrending = await api.get(`/entities/${encodeURIComponent(entityTwo)}/trending`);
          console.log('✅ Entity Two Trending Response:', entityTwoTrending);
        } catch (specificError) {
          console.error('❌ Entity Two Trending Error:', {
            message: (specificError as Error).message,
            name: (specificError as Error).name,
            stack: (specificError as Error).stack
          });
          throw specificError;
        }
        
        // Combine the data
        setEntityOneData({
          ...entityOneResponse.data,
          ...entityOneTrending.data
        });
        
        setEntityTwoData({
          ...entityTwoResponse.data,
          ...entityTwoTrending.data
        });
              
      } catch (error: unknown) {
        console.error("🚨 FULL FETCH ERROR:", {
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          errorType: error instanceof Error ? error.name : 'Unknown type'
        });
      } finally {
        setIsLoading(false);
  
      }
    }
    
    fetchEntityData();
  }, [entityOne, entityTwo]);
  
  // Calculate average sentiment
  const getAverageSentiment = (sentimentArray: number[]) => {
    if (!sentimentArray || sentimentArray.length === 0) return 0;
    return sentimentArray.reduce((a, b) => a + b, 0) / sentimentArray.length;
  };
  
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
              
              <ComparisonCard 
                title="RODMN™ Score"
                entityOne={{
                  name: entityOne,
                  value: entityOneData.rodmn_score || 0
                }}
                entityTwo={{
                  name: entityTwo,
                  value: entityTwoData.rodmn_score || 0
                }}
                higherIsBetter={false}
              />
              
              <ComparisonCard 
                title="Mentions"
                entityOne={{
                  name: entityOne,
                  value: entityOneData.mentions || 0
                }}
                entityTwo={{
                  name: entityTwo,
                  value: entityTwoData.mentions || 0
                }}
                formatValue={(value) => Math.round(value).toLocaleString()}
              />
              
              <ComparisonCard 
                title="Talk Time (Minutes)"
                entityOne={{
                  name: entityOne,
                  value: entityOneData.talk_time || 0
                }}
                entityTwo={{
                  name: entityTwo,
                  value: entityTwoData.talk_time || 0
                }}
                formatValue={(value) => value.toFixed(1)}
              />
            </div>
            
            <div className="mb-8">
              <ComparisonChart 
                entityOne={{
                  name: entityOne,
                  color: "#f97316", // orange-500
                  data: {
                    hype_score: entityOneData.hype_score || 0,
                    mentions: entityOneData.mentions || 0,
                    talk_time: entityOneData.talk_time || 0,
                    sentiment: getAverageSentiment(entityOneData.sentiment || []),
                    rodmn_score: entityOneData.rodmn_score || 0
                  }
                }}
                entityTwo={{
                  name: entityTwo,
                  color: "#3b82f6", // blue-500
                  data: {
                    hype_score: entityTwoData.hype_score || 0,
                    mentions: entityTwoData.mentions || 0,
                    talk_time: entityTwoData.talk_time || 0,
                    sentiment: getAverageSentiment(entityTwoData.sentiment || []),
                    rodmn_score: entityTwoData.rodmn_score || 0
                  }
                }}
                metrics={[
                  { key: "hype_score", label: "JORDN™ Score" },
                  { key: "mentions", label: "Mentions" },
                  { key: "talk_time", label: "Talk Time" },
                  { key: "sentiment", label: "Sentiment" },
                  { key: "rodmn_score", label: "RODMN™ Score" }
                ]}
                title="Core Metrics Comparison"
              />
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">External Platforms Comparison</h3>
              <ComparisonChart 
                entityOne={{
                  name: entityOne,
                  color: "#f97316", // orange-500
                  data: {
                    google_trends: entityOneData.google_trends || 0,
                    wikipedia_views: entityOneData.wikipedia_views || 0,
                    reddit_mentions: entityOneData.reddit_mentions || 0,
                  }
                }}
                entityTwo={{
                  name: entityTwo,
                  color: "#3b82f6", // blue-500
                  data: {
                    google_trends: entityTwoData.google_trends || 0,
                    wikipedia_views: entityTwoData.wikipedia_views || 0,
                    reddit_mentions: entityTwoData.reddit_mentions || 0,
                  }
                }}
                metrics={[
                  { key: "google_trends", label: "Google Trends" },
                  { key: "wikipedia_views", label: "Wikipedia Views" },
                  { key: "reddit_mentions", label: "Reddit Mentions" }
                ]}
                title="External Platforms"
              />
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Insights</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-orange-500/10 mt-1">
                    <BarChart2 size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">JORDN™ Score Comparison</h4>
                    <p className="text-gray-300">
                      {entityOneData.hype_score > entityTwoData.hype_score 
                        ? `${entityOne} has a ${((entityOneData.hype_score / entityTwoData.hype_score - 1) * 100).toFixed(1)}% higher JORDN™ score than ${entityTwo}, indicating stronger overall influence.`
                        : entityTwoData.hype_score > entityOneData.hype_score
                        ? `${entityTwo} has a ${((entityTwoData.hype_score / entityOneData.hype_score - 1) * 100).toFixed(1)}% higher JORDN™ score than ${entityOne}, indicating stronger overall influence.`
                        : `${entityOne} and ${entityTwo} have identical JORDN™ scores, suggesting similar levels of influence.`
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-500/10 mt-1">
                    <Activity size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Engagement Analysis</h4>
                    <p className="text-gray-300">
                      {entityOneData.mentions > entityTwoData.mentions
                        ? `${entityOne} is mentioned ${Math.round(entityOneData.mentions - entityTwoData.mentions)} more times than ${entityTwo}.`
                        : entityTwoData.mentions > entityOneData.mentions
                        ? `${entityTwo} is mentioned ${Math.round(entityTwoData.mentions - entityOneData.mentions)} more times than ${entityOne}.`
                        : `Both entities have similar mention counts.`
                      }
                      {entityOneData.talk_time > entityTwoData.talk_time
                        ? ` ${entityOne} also has ${(entityOneData.talk_time - entityTwoData.talk_time).toFixed(1)} minutes more talk time.`
                        : entityTwoData.talk_time > entityOneData.talk_time
                        ? ` ${entityTwo} also has ${(entityTwoData.talk_time - entityOneData.talk_time).toFixed(1)} minutes more talk time.`
                        : ` Both have similar talk time minutes.`
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-green-500/10 mt-1">
                    <Globe size={20} className="text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">External Platform Presence</h4>
                    <p className="text-gray-300">
                      {(entityOneData.google_trends || 0) + (entityOneData.wikipedia_views || 0) + (entityOneData.reddit_mentions || 0) > 
                       (entityTwoData.google_trends || 0) + (entityTwoData.wikipedia_views || 0) + (entityTwoData.reddit_mentions || 0)
                        ? `${entityOne} has a stronger presence on external platforms compared to ${entityTwo}.`
                        : `${entityTwo} has a stronger presence on external platforms compared to ${entityOne}.`
                      }
                      {entityOneData.wikipedia_views || 0 > (entityTwoData.wikipedia_views || 0) * 1.5
                        ? ` ${entityOne}'s Wikipedia views are notably higher, suggesting greater public interest.`
                        : entityTwoData.wikipedia_views || 0 > (entityOneData.wikipedia_views || 0) * 1.5
                        ? ` ${entityTwo}'s Wikipedia views are notably higher, suggesting greater public interest.`
                        : ''
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}