"use client";

import { useState, useEffect } from 'react';
import { Save, Info } from 'lucide-react';
import api from '@/lib/api';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    dashboardTitle: 'HYPE Analytics Dashboard',
    featuredEntities: 'Caitlin Clark, Angel Reese, Breanna Stewart, Sabrina Ionescu, WNBA',
    defaultTimeframe: 'last_30_days',
    enableRodmnScore: true,
    enableSentimentAnalysis: true,
    enableTalkTimeMetric: true,
    enableWikipediaViews: true,
    enableRedditMentions: true,
    enableGoogleTrends: true,
    minEntityDisplayCount: 5,
    maxEntityDisplayCount: 10,
    refreshInterval: 0, // 0 means manual refresh only
    publicDashboard: true,
  });

  const [saveStatus, setSaveStatus] = useState<null | {success: boolean, message: string}>(null);
  const [loading, setLoading] = useState(true);

  // Fetch settings when component mounts
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await api.get('/admin/settings');
        if (response.data) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        // Keep default settings if fetch fails
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSave = async () => {
    try {
      setSaveStatus({ success: false, message: 'Saving settings...' });
      
      // Call API to save settings
      await api.post('/admin/settings', settings);
      
      setSaveStatus({
        success: true,
        message: 'Settings saved successfully!'
      });
      
      // Hide the status message after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveStatus({
        success: false,
        message: 'Error saving settings. Please try again.'
      });
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Settings</h1>
      
      {saveStatus && (
        <div className={`mb-6 p-4 rounded-md ${
          saveStatus.success ? 'bg-green-900/30 border border-green-800' : 'bg-red-900/30 border border-red-800'
        }`}>
          <div className="flex items-center">
            {saveStatus.success ? (
              <Save size={18} className="text-green-500 mr-2" />
            ) : (
              <Info size={18} className="text-red-500 mr-2" />
            )}
            <p className={saveStatus.success ? 'text-green-200' : 'text-red-200'}>
              {saveStatus.message}
            </p>
          </div>
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Dashboard Title
            </label>
            <input
              type="text"
              name="dashboardTitle"
              value={settings.dashboardTitle}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Default Timeframe
            </label>
            <select
              name="defaultTimeframe"
              value={settings.defaultTimeframe}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2"
            >
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_6_months">Last 6 Months</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Featured Entities (comma-separated)
          </label>
          <textarea
            name="featuredEntities"
            value={settings.featuredEntities}
            onChange={handleChange}
            rows={3}
            className="w-full bg-gray-700 border border-gray-600 rounded p-2"
          />
          <p className="text-gray-400 text-sm mt-1">
            These entities will be highlighted on the dashboard.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Minimum Entities to Display
            </label>
            <input
              type="number"
              name="minEntityDisplayCount"
              value={settings.minEntityDisplayCount}
              onChange={handleChange}
              min={1}
              max={20}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Maximum Entities to Display
            </label>
            <input
              type="number"
              name="maxEntityDisplayCount"
              value={settings.maxEntityDisplayCount}
              onChange={handleChange}
              min={5}
              max={50}
              className="w-full bg-gray-700 border border-gray-600 rounded p-2"
            />
          </div>
        </div>
        
        <div className="mb-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="publicDashboard"
              checked={settings.publicDashboard}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-orange-600 focus:ring-orange-500"
            />
            <span>Make Dashboard Publicly Accessible</span>
          </label>
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-4">Metrics Settings</h2>
        <p className="text-gray-400 mb-6">
          Enable or disable specific metrics shown on the dashboard.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="enableRodmnScore"
              checked={settings.enableRodmnScore}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-orange-600 focus:ring-orange-500"
            />
            <span>RODMN Score</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="enableSentimentAnalysis"
              checked={settings.enableSentimentAnalysis}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-orange-600 focus:ring-orange-500"
            />
            <span>Sentiment Analysis</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="enableTalkTimeMetric"
              checked={settings.enableTalkTimeMetric}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-orange-600 focus:ring-orange-500"
            />
            <span>Talk Time Analysis</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="enableWikipediaViews"
              checked={settings.enableWikipediaViews}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-orange-600 focus:ring-orange-500"
            />
            <span>Wikipedia Views</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="enableRedditMentions"
              checked={settings.enableRedditMentions}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-orange-600 focus:ring-orange-500"
            />
            <span>Reddit Mentions</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="enableGoogleTrends"
              checked={settings.enableGoogleTrends}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 bg-gray-700 text-orange-600 focus:ring-orange-500"
            />
            <span>Google Trends</span>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-md flex items-center"
        >
          <Save size={18} className="mr-2" />
          Save Settings
        </button>
      </div>
    </div>
  );
}