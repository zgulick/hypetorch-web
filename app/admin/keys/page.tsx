"use client";

import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';
import api from '@/lib/api';

interface ApiKey {
  id: number;
  client_name: string;
  is_active: boolean;
  created_at: string;
  expires_at?: string;
  api_key?: string;  // Optional field for newly created keys
}

export default function ApiKeyManagement() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newGeneratedKey, setNewGeneratedKey] = useState<string | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  // Change these API calls
const fetchApiKeys = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/admin/keys', {
        params: { admin_key: process.env.NEXT_PUBLIC_ADMIN_SECRET }
      });
      setApiKeys(response.data);
      setErrorMessage(null);
    } catch (err) {
      console.error("Error fetching API keys:", err);
      setErrorMessage("Failed to load API keys");
    } finally {
      setIsLoading(false);
    }
  };
  
  const createApiKey = async () => {
    if (!newKeyName.trim()) {
      setErrorMessage("Client name is required");
      return;
    }

    try {
        const response = await api.post('/admin/keys', { 
          client_name: newKeyName 
        }, {
          params: { admin_key: process.env.NEXT_PUBLIC_ADMIN_SECRET }
        });
      
      // If the response includes the new API key, store it temporarily
      if (response.data.api_key) {
        setNewGeneratedKey(response.data.api_key);
      }
      
      // Refresh keys list
      fetchApiKeys();
      
      // Reset input
      setNewKeyName('');
    } catch (err) {
      console.error("Error creating API key:", err);
      setErrorMessage("Failed to create API key");
    }
  };


  const revokeApiKey = async (keyId: number) => {
    if (!window.confirm('Are you sure you want to revoke this API key?')) return;
  
    try {
      await api.delete(`/admin/keys/${keyId}`, {
        params: { admin_key: process.env.NEXT_PUBLIC_ADMIN_SECRET }
      });
      fetchApiKeys();
    } catch (err) {
      console.error("Error revoking API key:", err);
      setErrorMessage("Failed to revoke API key");
    }
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    // Optionally, you could add a temporary visual indicator
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">API Key Management</h1>
  
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
          <span className="ml-3 text-gray-300">Loading API keys...</span>
        </div>
      )}
  
      {/* Only show content when not loading */}
      {!isLoading && (
        <>
          {/* New Key Generation Popup */}
          {newGeneratedKey && (
            <div className="bg-green-900/30 border border-green-800 p-4 rounded-md mb-4">
              <h3 className="font-semibold mb-2">New API Key Generated</h3>
              <div className="flex items-center justify-between">
                <code className="bg-gray-800 p-2 rounded">{newGeneratedKey}</code>
                <button 
                  onClick={() => {
                    copyToClipboard(newGeneratedKey);
                    setNewGeneratedKey(null);
                  }} 
                  className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-yellow-200 mt-2">
                Please save this key. It will only be shown once.
              </p>
            </div>
          )}
  
          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-900/30 border border-red-800 p-4 rounded-md mb-4">
              {errorMessage}
            </div>
          )}
  
          {/* Create New Key Section */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h2 className="text-xl font-semibold mb-4">Create New API Key</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="Enter client name"
                className="flex-grow bg-gray-700 border border-gray-600 rounded p-2"
              />
              <button
                onClick={createApiKey}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded flex items-center"
              >
                <Plus size={18} className="mr-2" /> Create Key
              </button>
            </div>
          </div>
  
          {/* API Keys List */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{key.client_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        key.is_active 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {key.is_active ? 'Active' : 'Revoked'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(key.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => revokeApiKey(key.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}  