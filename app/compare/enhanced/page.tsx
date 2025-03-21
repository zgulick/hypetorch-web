
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/app/Navbar";
import {
  BarChart2, 
  TrendingUp, 
  Shuffle, 
  Calendar, 
  HelpCircle, 
  Download, 
  Bookmark,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, 
  Legend, ResponsiveContainer, BarChart, Bar,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Radar, AreaChart, Area, TooltipProps
} from "recharts";

// Time period options for the UI
const TIME_PERIODS = [
  { value: "last_7_days", label: "Last 7 Days" },
  { value: "last_30_days", label: "Last 30 Days" },
  { value: "last_6_months", label: "Last 6 Months" },
];

// Metric configurations for the UI
const METRICS = [
  { key: "hype_score", label: "JORDN™ Score", color: "#f97316", description: "Overall influence score combining multiple factors" },
  { key: "rodmn_score", label: "RODMN™ Score", color: "#ef4444", description: "Controversy and divisiveness measurement" },
  { key: "talk_time", label: "Talk Time", color: "#eab308", description: "Minutes discussed in media" },
  { key: "mention", label: "Mentions", color: "#3b82f6", description: "Number of times explicitly mentioned" },
  { key: "sentiment", label: "Sentiment", color: "#10b981", description: "Positive/negative perception" },
  { key: "wikipedia_view", label: "Wikipedia Views", color: "#8b5cf6", description: "Wikipedia page traffic" },
  { key: "reddit_mention", label: "Reddit Mentions", color: "#f43f5e", description: "Mentions across Reddit" },
  { key: "google_trend", label: "Google Trends", color: "#06b6d4", description: "Google search interest" },
];

// Define proper interfaces
interface ChartDataItem {
  metric: string;
  metricKey: string;
  fullMark: number;
  [key: string]: string | number;
}

interface HistoryItem {
  timestamp: string;
  value: number;
  time_period?: string;
}

interface HistoryChartDataPoint {
    timestamp: string;
    [key: string]: number | string;
  }

interface HistoryData {
  [metric: string]: {
    entity1: HistoryItem[];
    entity2: HistoryItem[];
  };
}

interface EntityData {
    [key: string]: 
      | number 
      | number[] 
      | { [metric: string]: HistoryItem[] } 
      | undefined;
    hype_score?: number;
    mentions?: number;
    talk_time?: number;
    sentiment?: number[];
    rodmn_score?: number;
    google_trends?: number;
    wikipedia_views?: number;
    reddit_mentions?: number;
    history?: Record<string, HistoryItem[]>;
  }

interface ComparisonData {
  entities: {
    [key: string]: EntityData;
  };
  metadata: {
    timestamp: string;
    metrics_included: string[];
    filters: {
      start_date?: string;
      end_date?: string;
      time_period?: string;
    };
  };
}

// Custom Tooltip component for Recharts
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-lg">
        <p className="font-medium text-white mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm flex items-center">
            <span 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color || '#ccc' }}
            />
            <span className="font-medium">{entry.name || 'Unknown'}: </span>
            <span className="ml-1 text-gray-300">
              {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function EnhancedComparison() {
  // Router and search params
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State variables
  const [entityOne, setEntityOne] = useState<string | null>(null);
  const [entityTwo, setEntityTwo] = useState<string | null>(null);
  const [allEntities, setAllEntities] = useState<string[]>([]);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState("last_30_days");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(METRICS.map(m => m.key));
  const [chartType, setChartType] = useState<"radar" | "bar" | "line">("radar");
  const [includeHistory, setIncludeHistory] = useState(true);
  const [favoriteEntities, setFavoriteEntities] = useState<string[]>([]);
  
  // Load entities list on component mount
  useEffect(() => {
    async function fetchEntities() {
      try {
        const response = await api.get('/entities');
        setAllEntities(response.data);
        
        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem('favoriteEntities');
        if (savedFavorites) {
          setFavoriteEntities(JSON.parse(savedFavorites));
        }
      } catch (err) {
        console.error("Error fetching entities:", err);
        setError("Failed to load entities list");
      }
    }
    
    fetchEntities();
  }, []);
  
  // Initialize from URL parameters
  useEffect(() => {
    // Check URL parameters
    const entity1 = searchParams.get('entity1');
    const entity2 = searchParams.get('entity2');
    
    if (entity1) setEntityOne(decodeURIComponent(entity1));
    if (entity2) setEntityTwo(decodeURIComponent(entity2));
    
    // Check for other params
    const period = searchParams.get('period');
    if (period && TIME_PERIODS.some(p => p.value === period)) {
      setTimePeriod(period);
    }
    
    const chart = searchParams.get('chart') as "radar" | "bar" | "line" | null;
    if (chart && ["radar", "bar", "line"].includes(chart)) {
      setChartType(chart);
    }
    
    const metrics = searchParams.get('metrics');
    if (metrics) {
      setSelectedMetrics(metrics.split(','));
    }
    
    const history = searchParams.get('history');
    if (history === 'false') {
      setIncludeHistory(false);
    }
  }, [searchParams]);  
  
  // Fetch comparison data when entities or filters change
  useEffect(() => {
    async function fetchComparisonData() {
      if (!entityOne || !entityTwo) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch data for each entity separately
        const [entity1Data, entity2Data] = await Promise.all([
          api.get(`/entities/${encodeURIComponent(entityOne)}`),
          api.get(`/entities/${encodeURIComponent(entityTwo)}`)
        ]);
        
        // Fetch trending data for each entity
        const [entity1Trending, entity2Trending] = await Promise.all([
          api.get(`/entities/${encodeURIComponent(entityOne)}/trending`),
          api.get(`/entities/${encodeURIComponent(entityTwo)}/trending`)
        ]);
        
        // Combine into the format expected by the component
        const data: ComparisonData = {
          entities: {
            [entityOne]: {
              ...entity1Data.data,
              ...entity1Trending.data
            },
            [entityTwo]: {
              ...entity2Data.data,
              ...entity2Trending.data
            }
          },
          metadata: {
            timestamp: new Date().toISOString(),
            metrics_included: selectedMetrics,
            filters: {
              time_period: timePeriod
            }
          }
        };
        
        // If history is requested, fetch it
        if (includeHistory) {
          try {
            const [entity1History, entity2History] = await Promise.all([
              api.get(`/entities/${encodeURIComponent(entityOne)}/history`),
              api.get(`/entities/${encodeURIComponent(entityTwo)}/history`)
            ]);
            
            // Add history data
            if (!data.entities[entityOne].history) {
              data.entities[entityOne].history = {};
            }
            
            if (!data.entities[entityTwo].history) {
              data.entities[entityTwo].history = {};
            }
            
            if (data.entities[entityOne].history) {
              data.entities[entityOne].history["hype_score"] = entity1History.data.history || [];
            }
            
            if (data.entities[entityTwo].history) {
              data.entities[entityTwo].history["hype_score"] = entity2History.data.history || [];
            }
          } catch (historyErr) {
            console.error("Error fetching history data:", historyErr);
            // Continue without history data
          }
        }
        
        console.log("Comparison data received:", data);
        setComparisonData(data);
      } catch (err) {
        console.error("Error fetching comparison data:", err);
        setError("Failed to load comparison data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (entityOne && entityTwo) {
      fetchComparisonData();
      
      // Update URL parameters
      const params = new URLSearchParams();
      params.set('entity1', entityOne);
      params.set('entity2', entityTwo);
      params.set('period', timePeriod);
      params.set('chart', chartType);
      params.set('metrics', selectedMetrics.join(','));
      params.set('history', String(includeHistory));
      
      // Use replace to avoid adding to history stack
      router.replace(`/compare/enhanced?${params.toString()}`);
    }
  }, [entityOne, entityTwo, selectedMetrics, timePeriod, includeHistory, chartType, router]);
  
  // Toggle favorite status for an entity
  const toggleFavorite = (entity: string) => {
    let newFavorites;
    if (favoriteEntities.includes(entity)) {
      newFavorites = favoriteEntities.filter(e => e !== entity);
    } else {
      newFavorites = [...favoriteEntities, entity];
    }
    setFavoriteEntities(newFavorites);
    localStorage.setItem('favoriteEntities', JSON.stringify(newFavorites));
  };
  
  // Random entity selection
  const selectRandomEntities = () => {
    if (allEntities.length < 2) return;
    
    const availableEntities = allEntities.filter(e => 
      (!entityOne || e !== entityOne) && (!entityTwo || e !== entityTwo)
    );
    
    if (availableEntities.length === 0) return;
    
    const randomIndex1 = Math.floor(Math.random() * availableEntities.length);
    const randomEntity1 = availableEntities[randomIndex1];
    
    const filteredEntities = availableEntities.filter(e => e !== randomEntity1);
    const randomIndex2 = Math.floor(Math.random() * filteredEntities.length);
    const randomEntity2 = filteredEntities[randomIndex2];
    
    setEntityOne(randomEntity1);
    setEntityTwo(randomEntity2);
  };
  
  // Toggle metric selection
  const toggleMetric = (metricKey: string) => {
    if (selectedMetrics.includes(metricKey)) {
      // Don't allow deselecting all metrics
      if (selectedMetrics.length > 1) {
        setSelectedMetrics(selectedMetrics.filter(m => m !== metricKey));
      }
    } else {
      setSelectedMetrics([...selectedMetrics, metricKey]);
    }
  };
  
  // Filter entities by search term
  const [searchTerm, setSearchTerm] = useState("");
  const filteredEntities = useMemo(() => {
    if (!searchTerm.trim()) {
      return allEntities;
    }
    return allEntities.filter(entity => 
      entity.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allEntities, searchTerm]);
  
  // Prepare comparison data for charts
  const chartData = useMemo<ChartDataItem[]>(() => {
    if (!comparisonData || !entityOne || !entityTwo) return [];
    
    return selectedMetrics.map(metric => {
      const metricInfo = METRICS.find(m => m.key === metric);
      if (!metricInfo) return null;
      
      // Type guard to ensure we're working with numbers
      const entity1Value = typeof comparisonData.entities[entityOne]?.[metric] === 'number' 
        ? comparisonData.entities[entityOne]?.[metric] as number
        : 0;
        
      const entity2Value = typeof comparisonData.entities[entityTwo]?.[metric] === 'number'
        ? comparisonData.entities[entityTwo]?.[metric] as number
        : 0;
      
      return {
        metric: metricInfo.label,
        metricKey: metric,
        [entityOne]: entity1Value,
        [entityTwo]: entity2Value,
        fullMark: Math.max(entity1Value, entity2Value) * 1.2 // 20% buffer for radar chart
      };
    }).filter(Boolean) as ChartDataItem[];
  }, [comparisonData, entityOne, entityTwo, selectedMetrics]);
  
  // Get history data for line charts
  const historyData = useMemo<HistoryData>(() => {
    if (!comparisonData || !entityOne || !entityTwo || !includeHistory) return {} as HistoryData;
    
    const result: HistoryData = {};
    
    selectedMetrics.forEach(metric => {
      // Safe access to potentially undefined nested properties
      const entity1History = comparisonData.entities[entityOne]?.history?.[metric] || [];
      const entity2History = comparisonData.entities[entityTwo]?.history?.[metric] || [];
      
      result[metric] = {
        entity1: entity1History,
        entity2: entity2History
      };
    });
    
    return result;
  }, [comparisonData, entityOne, entityTwo, includeHistory, selectedMetrics]);
  
  // Export data as CSV
  const exportToCsv = () => {
    if (!comparisonData || !entityOne || !entityTwo) return;
    
    // Create CSV header
    let csv = "Metric," + entityOne + "," + entityTwo + "\n";
    
    // Add data rows
    chartData.forEach((item) => {
      csv += `${item.metric},${item[entityOne]},${item[entityTwo]}\n`;
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${entityOne}_vs_${entityTwo}_comparison.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
              Enhanced Entity Comparison
            </h1>
            <p className="text-gray-400 mt-1">
              Compare metrics across entities with advanced visualization
            </p>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-2">
            <button 
              onClick={selectRandomEntities}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 border border-gray-700"
            >
              <Shuffle size={16} /> Random Compare
            </button>
            
            <button 
              onClick={exportToCsv}
              disabled={!comparisonData}
              className={`px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 border border-gray-700 ${
                !comparisonData ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Download size={16} /> Export
            </button>
          </div>
        </div>
        
        {/* Entity Selection and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Select Entities to Compare</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Entity 1</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search entities..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 pl-8"
                  />
                  <Filter size={16} className="absolute left-2.5 top-3 text-gray-400" />
                </div>
                
                <div className="mt-2 max-h-40 overflow-y-auto bg-gray-700 rounded-lg">
                  {filteredEntities.length > 0 ? (
                    filteredEntities.map(entity => (
                      <div
                        key={entity}
                        className={`p-2 hover:bg-gray-600 cursor-pointer flex justify-between items-center ${
                          entity === entityOne ? 'bg-orange-900/30 text-orange-300' : ''
                        }`}
                        onClick={() => setEntityOne(entity)}
                      >
                        <span>{entity}</span>
                        <button
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            toggleFavorite(entity);
                          }}
                          className="text-gray-400 hover:text-yellow-400"
                        >
                          <Bookmark 
                            size={16}
                            fill={favoriteEntities.includes(entity) ? "#facc15" : "none"}
                            color={favoriteEntities.includes(entity) ? "#facc15" : "currentColor"}
                          />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-400">No entities found</div>
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Entity 2</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search entities..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 pl-8"
                  />
                  <Filter size={16} className="absolute left-2.5 top-3 text-gray-400" />
                </div>
                
                <div className="mt-2 max-h-40 overflow-y-auto bg-gray-700 rounded-lg">
                  {filteredEntities.length > 0 ? (
                    filteredEntities.map(entity => (
                      <div
                        key={entity}
                        className={`p-2 hover:bg-gray-600 cursor-pointer flex justify-between items-center ${
                          entity === entityTwo ? 'bg-blue-900/30 text-blue-300' : ''
                        }`}
                        onClick={() => setEntityTwo(entity)}
                      >
                        <span>{entity}</span>
                        <button
                          onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            toggleFavorite(entity);
                          }}
                          className="text-gray-400 hover:text-yellow-400"
                        >
                          <Bookmark 
                            size={16}
                            fill={favoriteEntities.includes(entity) ? "#facc15" : "none"}
                            color={favoriteEntities.includes(entity) ? "#facc15" : "currentColor"}
                          />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-400">No entities found</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Comparison Options</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Time Period</label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_PERIODS.map(period => (
                    <button
                      key={period.value}
                      className={`px-4 py-2 rounded-lg flex items-center justify-center gap-1 ${
                        timePeriod === period.value 
                          ? 'bg-orange-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setTimePeriod(period.value)}
                    >
                      <Calendar size={14} />
                      <span>{period.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Chart Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className={`px-4 py-2 rounded-lg flex items-center justify-center gap-1 ${
                      chartType === 'radar' 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setChartType('radar')}
                  >
                    <span>Radar</span>
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg flex items-center justify-center gap-1 ${
                      chartType === 'bar' 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setChartType('bar')}
                  >
                    <BarChart2 size={14} />
                    <span>Bar</span>
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg flex items-center justify-center gap-1 ${
                      chartType === 'line' 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setChartType('line')}
                  >
                    <TrendingUp size={14} />
                    <span>Line</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeHistory}
                    onChange={() => setIncludeHistory(!includeHistory)}
                    className="rounded border-gray-700 bg-gray-700 text-orange-600 mr-2"
                  />
                  <span>Include Historical Data</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Metrics</label>
                <div className="grid grid-cols-2 gap-2">
                  {METRICS.map(metric => (
                    <label key={metric.key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedMetrics.includes(metric.key)}
                        onChange={() => toggleMetric(metric.key)}
                        className="rounded border-gray-700 bg-gray-700 text-orange-600 mr-2"
                      />
                      <span>{metric.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {isLoading && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 flex justify-center items-center">
            <div className="animate-spin h-10 w-10 border-4 border-orange-500 rounded-full border-t-transparent"></div>
          </div>
        )}
        
        {/* Error State */}
        {error && !isLoading && (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-6 text-red-200">
            <h3 className="text-lg font-semibold mb-2">Error</h3>
            <p>{error}</p>
          </div>
        )}
        
        {/* No Selection State */}
        {!entityOne || !entityTwo ? (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Select two entities to compare</h3>
            <p className="text-gray-400">Use the selection boxes above to choose entities for comparison</p>
          </div>
        ) : (
          /* Main Visualization Area */
          !isLoading && !error && comparisonData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main Chart */}
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6">
                  {entityOne} vs {entityTwo}: Metrics Comparison
                </h2>
                
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'radar' ? (
                      <RadarChart outerRadius="80%" data={chartData}>
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="metric" tick={{ fill: '#9CA3AF' }} />
                        <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={{ fill: '#9CA3AF' }} />
                        <Radar 
                          name={entityOne} 
                          dataKey={entityOne} 
                          stroke="#f97316" 
                          fill="#f97316" 
                          fillOpacity={0.2} 
                        />
                        <Radar 
                          name={entityTwo} 
                          dataKey={entityTwo} 
                          stroke="#3b82f6" 
                          fill="#3b82f6" 
                          fillOpacity={0.2} 
                        />
                        <Legend />
                        <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                    ) : chartType === 'bar' ? (
                      <BarChart data={chartData} layout="vertical">
                        <XAxis type="number" stroke="#9CA3AF" />
                        <YAxis dataKey="metric" type="category" stroke="#9CA3AF" width={120} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey={entityOne} name={entityOne} fill="#f97316" radius={[0, 4, 4, 0]} />
                        <Bar dataKey={entityTwo} name={entityTwo} fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    ) : (
                      // Line chart for time comparison
                      <AreaChart data={selectedMetrics.map(metric => {
                        const metricInfo = METRICS.find(m => m.key === metric);
                        // Ensure we're working with numbers
                        const entity1Value = typeof comparisonData.entities[entityOne]?.[metric] === 'number'
                          ? comparisonData.entities[entityOne]?.[metric] as number
                          : 0;
                        
                        const entity2Value = typeof comparisonData.entities[entityTwo]?.[metric] === 'number'
                          ? comparisonData.entities[entityTwo]?.[metric] as number
                          : 0;
                          
                        return {
                          name: metricInfo?.label || metric,
                          [entityOne]: entity1Value,
                          [entityTwo]: entity2Value,
                        };
                      })}>
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey={entityOne} 
                          name={entityOne}
                          stroke="#f97316" 
                          fill="#f97316" 
                          fillOpacity={0.2} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey={entityTwo} 
                          name={entityTwo}
                          stroke="#3b82f6" 
                          fill="#3b82f6" 
                          fillOpacity={0.2} 
                        />
                      </AreaChart>
                    )}
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-center">
                  <div className="p-3 rounded-lg bg-orange-600/10 border border-orange-600/30">
                    <span className="text-orange-400 font-semibold">{entityOne}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-600/10 border border-blue-600/30">
                    <span className="text-blue-400 font-semibold">{entityTwo}</span>
                  </div>
                </div>
              </div>
              
              {/* Metrics Detail Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {selectedMetrics.map((metricKey, index) => {
                  const metric = METRICS.find(m => m.key === metricKey);
                  if (!metric) return null;
                  
                  // Ensure we're working with number values
                  const entity1Value = typeof comparisonData.entities[entityOne]?.[metricKey] === 'number'
                    ? comparisonData.entities[entityOne]?.[metricKey] as number
                    : 0;
                  
                  const entity2Value = typeof comparisonData.entities[entityTwo]?.[metricKey] === 'number'
                    ? comparisonData.entities[entityTwo]?.[metricKey] as number
                    : 0;
                  
                  const difference = entity1Value - entity2Value;
                  const percentDiff = entity2Value !== 0
                    ? (difference / Math.abs(entity2Value)) * 100
                    : difference * 100;
                  
                  return (
                    <div key={`${metricKey}-${index}`} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">{metric.label}</h3>
                        <div className="bg-gray-700 p-1 rounded-md text-xs text-gray-300 flex items-center gap-1">
                          <HelpCircle size={12} />
                          <span>{metric.description}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-orange-900/10 border border-orange-900/30 rounded-lg p-4">
                          <p className="text-sm text-gray-400">{entityOne}</p>
                          <p className="text-2xl font-bold">{entity1Value.toFixed(2)}</p>
                        </div>
                        
                        <div className="bg-blue-900/10 border border-blue-900/30 rounded-lg p-4">
                          <p className="text-sm text-gray-400">{entityTwo}</p>
                          <p className="text-2xl font-bold">{entity2Value.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-center">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          difference > 0 
                            ? 'bg-green-900/20 text-green-400' 
                            : difference < 0 
                              ? 'bg-red-900/20 text-red-400'
                              : 'bg-gray-700 text-gray-400'
                        }`}>
                          {difference > 0 ? (
                            <>
                              <TrendingUp size={14} className="mr-1" />
                              {entityOne} leads by {Math.abs(difference).toFixed(2)} ({Math.abs(percentDiff).toFixed(1)}%)
                            </>
                          ) : difference < 0 ? (
                            <>
                              <TrendingUp size={14} className="mr-1" />
                              {entityTwo} leads by {Math.abs(difference).toFixed(2)} ({Math.abs(percentDiff).toFixed(1)}%)
                            </>
                          ) : (
                            <>Identical values</>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Historical Charts Section */}
              {includeHistory && Object.keys(historyData).length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Historical Comparison</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {Object.entries(historyData).map(([metric, data]) => {
                        const metricInfo = METRICS.find(m => m.key === metric);
                        if (!metricInfo) return null;
    
                        const historyChartData: HistoryChartDataPoint[] = [];
    
                        // Create a map for quick lookups
                        const entity1Map = Object.fromEntries(
                        data.entity1.map(item => [item.timestamp, item.value])
                        );
                        const entity2Map = Object.fromEntries(
                        data.entity2.map(item => [item.timestamp, item.value])
                        );
    
                        // Prepare data for the line chart
                        const allTimestamps = new Set([
                        ...data.entity1.map(item => item.timestamp),
                        ...data.entity2.map(item => item.timestamp)
                        ]);

                        const sortedTimestamps = Array.from(allTimestamps)
                        .map(ts => new Date(ts))
                        .sort((a, b) => a.getTime() - b.getTime())
                        .map(date => date.toISOString());

                        // Then create the chart data
                        sortedTimestamps.forEach(timestamp => {
                        const dataPoint: HistoryChartDataPoint = {
                            timestamp: new Date(timestamp).toLocaleDateString(),
                        };

                        dataPoint[entityOne] = entity1Map[timestamp] ?? null;
                        dataPoint[entityTwo] = entity2Map[timestamp] ?? null;

                        historyChartData.push(dataPoint);
                      });                      
                      return (
                        <div key={metric} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                          <h3 className="text-lg font-semibold mb-4">{metricInfo.label} Over Time</h3>
                          <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={historyChartData}>
                                <XAxis dataKey="timestamp" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey={entityOne}
                                  name={entityOne}
                                  stroke="#f97316"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 6 }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey={entityTwo}
                                  name={entityTwo}
                                  stroke="#3b82f6"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                  activeDot={{ r: 6 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}