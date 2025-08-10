"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp } from 'lucide-react';

// Import the unified data service
import { getDashboardWidgets, DashboardWidgets } from '@/app/lib/dataService_unified';

// Define WNBA/Unrivaled entities - entities that should appear on the public website
const WNBA_UNRIVALED_ENTITIES = [
  // Core WNBA/Unrivaled players from entities.json "Unrivaled" subcategory
  'Satou Sabally', 'Dijonai Carrington', 'Caitlin Clark', 'Courtney Vandersloot',
  'Stefanie Dolson', 'Rae Burrell', 'Aaliyah Edwards', 'Rickea Jackson', 
  'Kahleah Copper', 'Jackie Young', 'Courtney Williams', 'Rhyne Howard',
  'Angel Reese', 'Kamilla Cardoso', 'Chelsea Gray', 'Lexie Hull', 'Marina Mabrey',
  'Shakira Austin', 'Jordin Canada', 'Katie Lou Samuelson', 'Allisha Gray', 
  'Aliyah Boston', 'Breanna Stewart', 'Dearica Hamby', 'Napheesa Collier',
  'Kayla Mcbride', 'Azura Stevens', 'Jewell Loyd', 'Brittney Griner', 'Alyssa Thomas'
  // Add other WNBA/Unrivaled entities as needed
];

// Filter function to check if entity should be displayed on public website  
const isWNBAUnrivaledEntity = (entityName: string): boolean => {
  return WNBA_UNRIVALED_ENTITIES.some(name => 
    name.toLowerCase() === entityName.toLowerCase() ||
    entityName.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(entityName.toLowerCase())
  );
};

interface IntelligenceDashboardProps {
  className?: string;
}

export default function IntelligenceDashboard({ className = "" }: IntelligenceDashboardProps) {
  const [widgets, setWidgets] = useState<DashboardWidgets | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardWidgets() {
      try {
        setLoading(true);
        const widgetData = await getDashboardWidgets();
        
        // Filter dashboard widgets to only show WNBA/Unrivaled entities
        const filteredWidgets: DashboardWidgets = {
          ...widgetData,
          top_movers: widgetData.top_movers.filter(mover => isWNBAUnrivaledEntity(mover.name)),
          narrative_alerts: widgetData.narrative_alerts.filter(alert => isWNBAUnrivaledEntity(alert.name))
        };
        
        setWidgets(filteredWidgets);
      } catch (err) {
        console.error('Error loading dashboard widgets:', err);
        setError('Failed to load dashboard data');
        // No fallback data - show error state
      } finally {
        setLoading(false);
      }
    }

    loadDashboardWidgets();
  }, []);

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  if (loading) {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
            <div className="h-6 bg-gray-700 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-16 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !widgets) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-6">
          <p className="text-red-400 font-medium mb-2">API Connection Issue</p>
          <p className="text-gray-400 text-sm">
            {error || 'Unable to load intelligence dashboard'}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Check API connection and refresh page
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`contents ${className}`}>
      {/* Top Movers Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 h-full flex flex-col"
      >
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Top Movers</h3>
        </div>
        <div className="space-y-3 flex-grow">
          {widgets.top_movers.slice(0, 3).map((mover) => (
            <div key={mover.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
              <div>
                <p className="font-medium text-white text-sm">{mover.name}</p>
                <p className="text-xs text-gray-400">HYPE Score: {mover.current_score.toFixed(1)}</p>
              </div>
              <div className={`flex items-center text-sm font-bold ${
                mover.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {mover.change > 0 ? '+' : ''}{mover.change.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Biggest percentage changes this period
        </p>
      </motion.div>

      {/* Narrative Alerts Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-700 h-full flex flex-col"
      >
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
          <h3 className="text-lg font-semibold text-white">Narrative Monitor</h3>
        </div>
        <div className="space-y-3 flex-grow">
          {widgets.narrative_alerts.slice(0, 5).map((alert) => (
            <div key={alert.name} className="flex items-start justify-between p-3 rounded-lg bg-gray-800/50">
              <div className="flex-1">
                <p className="font-medium text-white text-sm">{alert.name}</p>
                <p className="text-xs text-gray-400 mt-1">{alert.context}</p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-bold ${getAlertColor(alert.alert_level)}`}>
                {alert.rodmn_score.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Top RODMN scores this week - higher values indicate more controversy
        </p>
      </motion.div>
    </div>
  );
}