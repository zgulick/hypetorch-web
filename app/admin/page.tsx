"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart2, Users, Upload, Clock, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEntities: 0,
    lastUpdated: '',
    dataPoints: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Replace the fetchStats function with this:
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch entity count
        const entitiesResponse = await api.get('/entities');
        if (!entitiesResponse.data) {
          throw new Error('Failed to fetch entities');
        }
        const entities = entitiesResponse.data;
    
        // Fetch last updated info
        const lastUpdatedResponse = await api.get('/last_updated');
        const lastUpdatedData = lastUpdatedResponse.data;
    
        // Set the stats
        setStats({
          totalEntities: entities.length,
          lastUpdated: new Date(lastUpdatedData.last_updated * 1000).toLocaleDateString(),
          dataPoints: entities.length * 5 // Approximate number of data points (metrics per entity)
        });
    
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard statistics. Please try again later.");
    
        // Set fallback data
        setStats({
          totalEntities: 112,
          lastUpdated: new Date().toLocaleDateString(),
          dataPoints: 58920
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 size={36} className="text-orange-500 animate-spin mr-2" />
          <span className="text-gray-300">Loading dashboard data...</span>
        </div>
      )}
      
      {/* Error message */}
      {error && !loading && (
        <div className="bg-red-900/30 border border-red-800 p-4 rounded-md text-red-200 mb-6">
          <p className="flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </p>
        </div>
      )}
      
      {/* Stats Cards */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-orange-500/10 mr-4">
                  <Users className="text-orange-500" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Entities</h2>
              </div>
              <p className="text-3xl font-bold mb-2">{stats.totalEntities}</p>
              <p className="text-gray-400 text-sm">Total tracked entities</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-red-500/10 mr-4">
                  <BarChart2 className="text-red-500" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Data Points</h2>
              </div>
              <p className="text-3xl font-bold mb-2">{stats.dataPoints.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Total analytics data points</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-amber-500/10 mr-4">
                  <Clock className="text-amber-500" size={24} />
                </div>
                <h2 className="text-xl font-semibold">Last Updated</h2>
              </div>
              <p className="text-3xl font-bold mb-2">{stats.lastUpdated}</p>
              <p className="text-gray-400 text-sm">Most recent data update</p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Link href="/admin/entities">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition-colors">
                <Users size={24} className="mb-4 text-orange-500" />
                <h3 className="font-semibold mb-2">Manage Entities</h3>
                <p className="text-gray-400 text-sm">Add, edit, or remove tracked entities</p>
              </div>
            </Link>
            
            <Link href="/admin/upload">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition-colors">
                <Upload size={24} className="mb-4 text-red-500" />
                <h3 className="font-semibold mb-2">Upload Data</h3>
                <p className="text-gray-400 text-sm">Process new transcript data</p>
              </div>
            </Link>
            
            <Link href="/admin/settings">
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-orange-500 transition-colors">
                <BarChart2 size={24} className="mb-4 text-amber-500" />
                <h3 className="font-semibold mb-2">Configure Dashboard</h3>
                <p className="text-gray-400 text-sm">Adjust dashboard settings</p>
              </div>
            </Link>
          </div>
          
          {/* System Status */}
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center mb-4">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <p className="font-medium">All systems operational</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">API</span>
                <span className="text-green-500">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Database</span>
                <span className="text-green-500">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Processing Engine</span>
                <span className="text-green-500">Online</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}