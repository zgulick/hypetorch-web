"use client";

import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine 
} from 'recharts';
import { TrendingUp, Calendar, Users, Info, BarChart3, Shuffle } from 'lucide-react';

// Import data service
import { getWeeklyEvolutionData, getTimePeriods, getEntitiesWithMetrics, TimePeriod } from '@/app/lib/dataService_unified';

interface WeeklyEvolutionChartProps {
  periods?: number;
  metric?: string;
  className?: string;
  title?: string;
  height?: number;
  subcategory?: string | null;
}

interface EvolutionDataPoint {
  time_period: string;
  display_label: string;
  [playerName: string]: string | number;
}

// Color palette for players
const PLAYER_COLORS = [
  '#f97316', // orange-500
  '#ef4444', // red-500  
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#8b5cf6', // violet-500
  '#f59e0b', // amber-500
  '#06b6d4', // cyan-500
  '#84cc16', // lime-500
];

export default function WeeklyEvolutionChart({
  periods = 5,
  metric = 'hype_score',
  className = "",
  title = "Weekly Evolution Tracker",
  height = 400,
  subcategory = null
}: WeeklyEvolutionChartProps) {
  const [data, setData] = useState<EvolutionDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const [, setAvailablePeriods] = useState<TimePeriod[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [allAvailablePlayers, setAllAvailablePlayers] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [randomizing, setRandomizing] = useState(false);

  // Function to select random players from available players
  const selectRandomPlayers = async (playerList?: string[]) => {
    try {
      // Use provided list or fetch from API
      const players = playerList || (await getEntitiesWithMetrics({ subcategory, limit: 50 })).map(e => e.name);

      // Randomly shuffle and pick 5
      const shuffled = [...players].sort(() => 0.5 - Math.random());
      const randomSelected = shuffled.slice(0, 5);

      setSelectedPlayers(randomSelected);
      setAllAvailablePlayers(players);

      return randomSelected;
    } catch (error) {
      console.error('Error selecting random players:', error);
      throw error;
    }
  };

  // Handler for randomize button
  const handleRandomizePlayers = async () => {
    try {
      setRandomizing(true);
      const newRandomPlayers = await selectRandomPlayers(allAvailablePlayers);

      // Load new evolution data for the random players
      const periodsData = await getTimePeriods();
      setAvailablePeriods(periodsData);

      const evolutionData = await getWeeklyEvolutionData(newRandomPlayers, periods, metric);
      setData(evolutionData);
    } catch (error) {
      console.error('Error randomizing players:', error);
    } finally {
      setRandomizing(false);
    }
  };

  useEffect(() => {
    async function loadEvolutionData() {
      try {
        setLoading(true);
        setError(null);

        // Get available periods first
        const periodsData = await getTimePeriods();
        setAvailablePeriods(periodsData);

        // Always select new random players when subcategory changes
        const playersToUse = await selectRandomPlayers();

        // Get evolution data
        const evolutionData = await getWeeklyEvolutionData(playersToUse, periods, metric);
        setData(evolutionData);
        
      } catch (err) {
        console.error('Error loading evolution data:', err);
        setError('Failed to load evolution data');
        
        // Fallback data for development/testing
        const fallbackData: EvolutionDataPoint[] = [
          {
            time_period: 'week_2025_06_22',
            display_label: 'Jun 22',
            'Caitlin Clark': 76.8,
            'Angel Reese': 82.3,
            'Alyssa Thomas': 67.8,
            'Allisha Gray': 45.2,
            'Jackie Young': 49.1
          },
          {
            time_period: 'week_2025_06_29',
            display_label: 'Jun 29',
            'Caitlin Clark': 81.2,
            'Angel Reese': 79.5,
            'Alyssa Thomas': 65.1,
            'Allisha Gray': 48.7,
            'Jackie Young': 51.3
          },
          {
            time_period: 'week_2025_07_06',
            display_label: 'Jul 06',
            'Caitlin Clark': 85.6,
            'Angel Reese': 75.2,
            'Alyssa Thomas': 68.4,
            'Allisha Gray': 52.1,
            'Jackie Young': 48.9
          },
          {
            time_period: 'week_2025_07_13',
            display_label: 'Jul 13',
            'Caitlin Clark': 87.3,
            'Angel Reese': 78.1,
            'Alyssa Thomas': 66.7,
            'Allisha Gray': 55.8,
            'Jackie Young': 50.2
          },
          {
            time_period: 'week_2025_07_20',
            display_label: 'Jul 20',
            'Caitlin Clark': 89.2,
            'Angel Reese': 78.5,
            'Alyssa Thomas': 65.3,
            'Allisha Gray': 58.7,
            'Jackie Young': 52.4
          }
        ];
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    loadEvolutionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periods, metric, subcategory]);

  // Ensure chart renders properly after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const getMetricLabel = (metricType: string) => {
    switch (metricType) {
      case 'hype_score': return 'HYPE Score';
      case 'rodmn_score': return 'RODMN Score';
      case 'mentions': return 'Mentions';
      case 'talk_time': return 'Talk Time (min)';
      default: return metricType;
    }
  };

  const getYAxisDomain = (metricType: string): [number | string, number | string] => {
    switch (metricType) {
      case 'hype_score':
        return [0, 100];
      case 'rodmn_score':
        return [0, 10];
      case 'mentions':
        return [0, 'dataMax + 50'];
      case 'talk_time':
        return [0, 'dataMax + 5'];
      default:
        return ['dataMin - 5', 'dataMax + 5'];
    }
  };

  const CustomTooltip = ({ active, payload, label }: { 
    active?: boolean; 
    payload?: Array<{ dataKey: string; value: number | string; color: string }>; 
    label?: string; 
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry, index: number) => (
            <div key={index} className="flex items-center justify-between mb-1">
              <span className="text-gray-300 mr-4">{entry.dataKey}:</span>
              <span className="font-bold" style={{ color: entry.color }}>
                {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const handlePlayerToggle = (player: string) => {
    if (selectedPlayers.includes(player)) {
      if (selectedPlayers.length > 1) {
        const newPlayers = selectedPlayers.filter(p => p !== player);
        setSelectedPlayers(newPlayers);
        // Reload data with updated player list
        getWeeklyEvolutionData(newPlayers, periods, metric).then(setData);
      }
    } else {
      const newPlayers = [...selectedPlayers, player];
      setSelectedPlayers(newPlayers);
      // Reload data with updated player list
      getWeeklyEvolutionData(newPlayers, periods, metric).then(setData);
    }
  };

  if (loading) {
    return (
      <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4 w-1/3"></div>
          <div className="h-64 bg-gray-700 rounded mb-4"></div>
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-700 rounded w-24"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Analysis Periods: {data.length > 0 ? `${data[0].display_label} through ${data[data.length - 1]?.display_label}` : 'Loading...'}</span>
          </div>
        </div>
        <div className="flex items-center text-orange-400">
          <TrendingUp className="w-6 h-6 mr-2" />
          <span className="font-semibold">{getMetricLabel(metric)}</span>
        </div>
      </div>

      {/* Chart */}
      <div className="mb-6">
        {isVisible && (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="display_label" 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={getYAxisDomain(metric)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            
            {/* Reference line for average */}
            {metric === 'hype_score' && (
              <ReferenceLine 
                y={50} 
                stroke="#6B7280" 
                strokeDasharray="2 2" 
                label={{ value: "Average", position: "top" }}
              />
            )}
            
            {/* Lines for each selected player */}
            {selectedPlayers.map((player, index) => (
              <Line
                key={player}
                type="monotone"
                dataKey={player}
                stroke={PLAYER_COLORS[index % PLAYER_COLORS.length]}
                strokeWidth={3}
                dot={{ 
                  fill: PLAYER_COLORS[index % PLAYER_COLORS.length], 
                  strokeWidth: 2,
                  r: 5 
                }}
                activeDot={{ 
                  r: 7, 
                  stroke: PLAYER_COLORS[index % PLAYER_COLORS.length],
                  strokeWidth: 2,
                  fill: '#1F2937'
                }}
                connectNulls={false}
              />
            ))}
            </LineChart>
          </ResponsiveContainer>
        )}
        {!isVisible && (
          <div className="bg-gray-700 rounded animate-pulse" style={{ height: height }}>
            <div className="flex items-center justify-center h-full text-gray-400">
              <BarChart3 className="w-8 h-8" />
            </div>
          </div>
        )}
      </div>

      {/* Player Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-400">Selected Players:</span>
          </div>
          <button
            onClick={handleRandomizePlayers}
            disabled={randomizing}
            className="flex items-center px-3 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            {randomizing ? 'Randomizing...' : 'Randomize Players'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedPlayers.map((player, index) => (
            <button
              key={player}
              onClick={() => handlePlayerToggle(player)}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white border-2"
              style={{
                backgroundColor: `${PLAYER_COLORS[index % PLAYER_COLORS.length]}20`,
                borderColor: PLAYER_COLORS[index % PLAYER_COLORS.length]
              }}
            >
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: PLAYER_COLORS[index % PLAYER_COLORS.length] }}
              />
              {player}
            </button>
          ))}
        </div>

        {/* Available Players to Add */}
        {allAvailablePlayers.length > selectedPlayers.length && (
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <span className="text-xs text-gray-500">Available Players (click to add):</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allAvailablePlayers
                .filter(player => !selectedPlayers.includes(player))
                .slice(0, 10) // Show max 10 available players
                .map((player) => (
                  <button
                    key={player}
                    onClick={() => handlePlayerToggle(player)}
                    className="px-2 py-1 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded text-xs transition-colors"
                  >
                    + {player}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Insights */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-white font-semibold mb-2">Key Insights</h4>
            <p className="text-gray-400 text-sm mb-2">
              Watch narratives evolve - spot the stories before your competition. 
              This chart reveals which players are gaining or losing momentum across analysis periods.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <BarChart3 className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-sm font-semibold text-green-400">Rising Trajectories</span>
                </div>
                <p className="text-xs text-gray-400">
                  Players showing consistent upward trends represent emerging storylines worth coverage
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="flex items-center mb-1">
                  <TrendingUp className="w-4 h-4 text-orange-400 mr-2" />
                  <span className="text-sm font-semibold text-orange-400">Volatility Signals</span>
                </div>
                <p className="text-xs text-gray-400">
                  Sharp changes indicate breaking news events or narrative shifts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Attribution */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          Data collected from 8 sources including podcasts, social media, news, and search trends
        </p>
      </div>
    </div>
  );
}