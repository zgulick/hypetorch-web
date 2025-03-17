"use client";

import { useState, useEffect } from 'react';
import { Copy, Trash2, Plus, RefreshCw } from 'lucide-react';
import api from '@/lib/api';

interface ApiKey {
  id: number;
  client_name: string;
  is_active: boolean;
  created_at: string;
  expires_at?: string;
}

export default function ApiKeyManagement() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedKeyId, setCopiedKeyId] = useState<number | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/keys');
      setApiKeys(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching API keys:", err);
      setError("Failed to load API keys");
    } finally {
      setLoading(false);
    }
  };

  const createApiKey = async () => {
    if (!newKeyName.trim()) {
      setError("Client name is required");
      return;
    }

    try {
      const response = await api.post('/admin/keys', { 
        client_name: newKeyName 
      });
      
      // Refresh keys list
      fetchApiKeys();
      
      // Reset input
      setNewKeyName('');
    } catch (err) {
      console.error("Error creating API key:", err);
      setError("Failed to create API key");
    }
  };

  const revokeApiKey = async (keyId: number) => {
    if (!window.confirm('Are you sure you want to revoke this API key?')) return;

    try {
      await api.delete(`/admin/keys/${keyId}`);
      fetchApiKeys();
    } catch (err) {
      console.error("Error revoking API key:", err);
      setError("Failed to revoke API key");
    }
  };

  const copyToClipboard = (keyId: number, key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKeyId(keyId);
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">API Key Management</h1>

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
                    className="text-red-500 hover:text-red-400 mr-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}