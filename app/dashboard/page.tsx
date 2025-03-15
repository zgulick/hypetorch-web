"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/Navbar";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  //LineChart, Line, , Legend
} from "recharts";
import axios from "axios";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, ArrowDownRight, TrendingUp, 
  Users, Activity, BarChart2
} from "lucide-react";
// import Image from "next/image";
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import ErrorBoundary from "@/components/errorboundary";
// import { useLoadingState } from "@/hooks/useLoadingState";
import { DashboardSkeleton } from "@/components/skeletonloader";
//import { useRouter } from "next/navigation";
//import TrendIndicator from "@/components/trendindicator";
// Add this hook call near the top of your component function
interface EntityData {
    name: string;
    hypeScore: number;
    mentions: number;
    sentiment: number;
    talkTime: number;
    changePercent: number;
  }

  export default function Dashboard() {
    const [data, setData] = useState<{
      hype: EntityData[];
      mentions: EntityData[];
      sentiment: EntityData[];
      talkTime: EntityData[];
    }>({
      hype: [],
      mentions: [],
      sentiment: [],
      talkTime: [],
    });

  const [error, setError] = useState<string | null>(null);
  const [highestHype, setHighestHype] = useState(0);
  const [topMentions, setTopMentions] = useState(0);
  const [bestSentiment, setBestSentiment] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  //const [compareQueue, setCompareQueue] = useState<string[]>([]);
  //const router = useRouter();
  
  // Trend indicator component
  const TrendIndicator = ({ value }: { value: number | string }) => {
    const numValue = parseFloat(value.toString());
    const isPositive = numValue >= 0;
    return (
      <div className={`flex items-center rounded-full ${
        isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
      } text-xs px-1.5 py-0.5 font-medium`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{isPositive ? "+" : ""}{numValue.toFixed(1)}%</span>
      </div>
    );
  };

  //const handleCompare = (entityName: string) => {
    //if (compareQueue.includes(entityName)) {
      //// Remove from queue if already selected
      //setCompareQueue(compareQueue.filter(name => name !== entityName));
    //} else if (compareQueue.length < 2) {
      //// Add to queue if less than 2 entities selected
      //const newQueue = [...compareQueue, entityName];
      //setCompareQueue(newQueue);
      
      //// If we have 2 entities, navigate to compare page
      //if (newQueue.length === 2) {
        //router.push(`/compare?entity1=${encodeURIComponent(newQueue[0])}&entity2=${encodeURIComponent(newQueue[1])}`);
        //// Clear queue after navigation
        //setTimeout(() => setCompareQueue([]), 100);
      //}
    //}
  //};
  
// Custom tooltip for charts
const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ 
  active, 
  payload, 
  label 
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-xl">
        <p className="font-medium text-white">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm">
            <span 
              className="font-medium" 
              style={{ color: entry.color }}
            >
              {entry.name}:
            </span>{" "}
            <span className="text-gray-300">
              {typeof entry.value === 'number' 
                ? entry.value.toFixed(2) 
                : String(entry.value)}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Add these state declarations at the top of your component, before useEffect
const [mentions, setMentions] = useState<{ [key: string]: number }>({});
const [talkTime, setTalkTime] = useState<{ [key: string]: number }>({});
const [sentimentScores, setSentimentScores] = useState<{ [key: string]: number }>({});
const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
        // Add this after setIsLoading(true);
        try {
          // Get last updated timestamp
          const timestampResponse = await axios.get("https://hypetorch-api.onrender.com/api/last_updated");
          if (timestampResponse.data.last_updated) {
            setLastUpdated(new Date(timestampResponse.data.last_updated * 1000));
          }
        // Fetch Hype Scores
        const hypeResponse = await axios.get("https://hypetorch-api.onrender.com/api/hype_scores");
        const hypeScores = hypeResponse.data;
        console.log("Raw HYPE scores:", hypeScores);

        // Prepare to collect metrics for each entity
        const newMentions: { [key: string]: number } = {};
        const newSentimentScores: { [key: string]: number } = {};
        const newTalkTime: { [key: string]: number } = {};
        
        // Create a list of promises to fetch data for each entity
        const promises = Object.keys(hypeScores).map(async (entity) => {
          try {
            const metricsResponse = await axios.get(
              `https://hypetorch-api.onrender.com/api/entities/${encodeURIComponent(entity)}/metrics`
            );
            
            // [NEW] Use type-safe object assignment
          // HIGHLIGHT START
          newMentions[entity] = metricsResponse.data.mentions || 0;
          newTalkTime[entity] = metricsResponse.data.talk_time || 0;
          
          // Calculate average sentiment if sentiment data exists
          if (metricsResponse.data.sentiment && metricsResponse.data.sentiment.length > 0) {
            newSentimentScores[entity] = metricsResponse.data.sentiment.reduce(
              // [NEW] Add type assertion to resolve reduce method typing
              (a: number, b: number) => a + b, 0
            ) / metricsResponse.data.sentiment.length;
          } else {
            newSentimentScores[entity] = 0;
          }
          // HIGHLIGHT END

            mentions[entity] = metricsResponse.data.mentions || 0;
            talkTime[entity] = metricsResponse.data.talk_time || 0;
            
            // Calculate average sentiment if sentiment data exists
            if (metricsResponse.data.sentiment && metricsResponse.data.sentiment.length > 0) {
                newSentimentScores[entity] = metricsResponse.data.sentiment.reduce((a: number, b: number) => a + b, 0) / metricsResponse.data.sentiment.length;
            } else {
              sentimentScores[entity] = 0;
            }
          } catch (err) {
            console.warn(`Could not fetch metrics for ${entity}:`, err);
            // HIGHLIGHT START
            newMentions[entity] = 0;
            newTalkTime[entity] = 0;
            newSentimentScores[entity] = 0;
            // HIGHLIGHT END
          }
        });

        // Wait for all API calls to complete
        await Promise.all(promises);

        // [NEW] Update state with the new objects
        // HIGHLIGHT START
        setMentions(newMentions);
        setTalkTime(newTalkTime);
        setSentimentScores(newSentimentScores);
        // HIGHLIGHT END

        console.log("Collected mentions:", mentions);
        console.log("Collected talk time:", talkTime);
        console.log("Collected sentiment scores:", sentimentScores);

        // Format entity names consistently
        const formatName = (name: string) =>
          name.toUpperCase() === "WNBA" || name.toUpperCase() === "NBA"
            ? name.toUpperCase()
            : name
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(" ");

        // Process data for display
        const processedData = Object.keys(hypeScores)
          .map((name) => ({
            name: formatName(name),
            hypeScore: hypeScores[name] || 0,
            // [NEW] Use new objects for metrics
            // HIGHLIGHT START
            mentions: newMentions[name] || 0,
            sentiment: newSentimentScores[name] || 0,
            talkTime: newTalkTime[name] || 0,
            // HIGHLIGHT END
            // Add some variation with random change percentages for UI (can be removed when you have real data)
            changePercent: Math.random() > 0.3 ? Math.random() * 15 : -Math.random() * 10
          }))
          .filter((item) => item.hypeScore > 0);

        // Sort data for different metrics
        const topHyped = [...processedData]
          .sort((a, b) => b.hypeScore - a.hypeScore)
          .slice(0, 8);
          
        const topMentioned = [...processedData]
          .sort((a, b) => b.mentions - a.mentions)
          .slice(0, 8);
          
        const sentimentData = [...processedData]
          .sort((a, b) => b.sentiment - a.sentiment)
          .slice(0, 10);

        const topTalkTime = [...processedData]
          .sort((a, b) => b.talkTime - a.talkTime)
          .slice(0, 8);

        // Set summary metrics for top cards
        setHighestHype(topHyped.length > 0 ? Number(topHyped[0].hypeScore.toFixed(2)) : 0);
        setTopMentions(topMentioned.length > 0 ? topMentioned[0].mentions : 0);
        setBestSentiment(sentimentData.length > 0 ? Number(sentimentData[0].sentiment.toFixed(2)) : 0);

        // Set data for charts
        setData({
          hype: topHyped,
          mentions: topMentioned,
          sentiment: sentimentData,
          talkTime: topTalkTime,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError((error as { message?: string })?.message || "An error occurred while fetching data");
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              HYPE Analytics Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Real-time influence tracking across platforms</p>
            {lastUpdated && (
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {lastUpdated.toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex mt-4 md:mt-0 space-x-2">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 border border-gray-700">
              <TrendingUp size={16} /> Weekly Report
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 border border-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                <path d="M16 21h5v-5"></path>
              </svg> 
              Refresh Data
            </button>
          </div>
        </div>
        
        <ErrorBoundary>
        {isLoading ? (
          // Loading state
          <DashboardSkeleton />
        ) : error ? (
          // Error state
          <div className="bg-red-900/20 border border-red-900 text-red-200 p-6 rounded-lg my-8">
            <h3 className="text-xl font-bold mb-2">Error Loading Data</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Main metrics cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Highest HYPE Score</p>
                    <h3 className="text-2xl font-bold mt-1 text-white">
                      {highestHype}
                    </h3>
                  </div>
                  <div className="p-2 rounded-full bg-orange-500/10">
                    <TrendingUp size={22} className="text-orange-500" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-300">
                    {data.hype[0]?.name || "No data"}
                  </p>
                  {data.hype[0] && <TrendIndicator value={data.hype[0].changePercent} />}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Most Mentioned</p>
                    <h3 className="text-2xl font-bold mt-1 text-white">
                      {topMentions}
                    </h3>
                  </div>
                  <div className="p-2 rounded-full bg-red-500/10">
                    <Users size={22} className="text-red-500" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-300">
                    {data.mentions[0]?.name || "No data"}
                  </p>
                  {data.mentions[0] && <TrendIndicator value={data.mentions[0].changePercent} />}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Best Sentiment</p>
                    <h3 className="text-2xl font-bold mt-1 text-white">
                      {bestSentiment}
                    </h3>
                  </div>
                  <div className="p-2 rounded-full bg-amber-500/10">
                    <Activity size={22} className="text-amber-500" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-300">
                    {data.sentiment[0]?.name || "No data"}
                  </p>
                  {data.sentiment[0] && <TrendIndicator value={data.sentiment[0].changePercent} />}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-400 text-sm">Talk Time</p>
                    <h3 className="text-2xl font-bold mt-1 text-white">
                      {data.talkTime[0]?.talkTime.toFixed(1) || "0"} min
                    </h3>
                  </div>
                  <div className="p-2 rounded-full bg-yellow-500/10">
                    <BarChart2 size={22} className="text-yellow-500" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-300">
                    {data.talkTime[0]?.name || "No data"}
                  </p>
                  {data.talkTime[0] && <TrendIndicator value={data.talkTime[0].changePercent} />}
                </div>
              </motion.div>
            </div>

            {/* HYPE Scores Bar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-800 mb-6"
            >
              <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                <TrendingUp size={20} className="mr-2 text-orange-500" />
                Top HYPE Scores
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.hype} layout="vertical">
                    <XAxis type="number" stroke="#9CA3AF" />
                    <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="hypeScore" 
                      fill="url(#hypeGradient)" 
                      radius={[0, 4, 4, 0]} 
                      name="HYPE Score"
                    />
                    <defs>
                      <linearGradient id="hypeGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Two-column charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Mentions Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-800"
              >
                <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                  <Users size={20} className="mr-2 text-red-500" />
                  Top Mentions
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.mentions} layout="vertical">
                      <XAxis type="number" stroke="#9CA3AF" />
                      <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="mentions" 
                        fill="url(#mentionsGradient)" 
                        radius={[0, 4, 4, 0]} 
                        name="Mentions"
                      />
                      <defs>
                        <linearGradient id="mentionsGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#dc2626" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Talk Time Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-800"
              >
                <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                  <BarChart2 size={20} className="mr-2 text-yellow-500" />
                  Talk Time (Minutes)
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.talkTime} layout="vertical">
                      <XAxis type="number" stroke="#9CA3AF" />
                      <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="talkTime" 
                        fill="url(#talkTimeGradient)" 
                        radius={[0, 4, 4, 0]} 
                        name="Minutes"
                      />
                      <defs>
                        <linearGradient id="talkTimeGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Sentiment Chart - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-xl border border-gray-800 mb-6"
            >
              <h3 className="text-xl font-bold mb-6 text-white flex items-center">
                <Activity size={20} className="mr-2 text-amber-500" />
                Sentiment Analysis
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.sentiment}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="sentiment" 
                      name="Sentiment Score"
                      radius={[4, 4, 0, 0]}
                      fill="url(#hypeGradient)"                  />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </>
        )}
      </ErrorBoundary>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} HypeTorch. Enterprise-grade influence analytics.</p>
        </div>
      </footer>
    </div>
  );
}