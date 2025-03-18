"use client";

import React from 'react';
import { 
  Code, 
  Globe, 
  Key, 
  Lock, 
  CopyCheck, 
  AlertCircle, 
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { API_KEY } from '@/lib/api';

interface ParamType {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface EndpointProps {
  method: string;
  path: string;
  description: string;
  params?: ParamType[];
  response?: string;
  expanded?: boolean;
}

const ParamTable: React.FC<{params: ParamType[]}> = ({params}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full mb-4">
      <thead className="bg-gray-800">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Name</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Type</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Required</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-400">Description</th>
        </tr>
      </thead>
      <tbody>
        {params.map((param, index) => (
          <tr key={index} className="border-b border-gray-700">
            <td className="px-4 py-2 text-sm font-mono text-gray-300">{param.name}</td>
            <td className="px-4 py-2 text-sm text-gray-300">{param.type}</td>
            <td className="px-4 py-2 text-sm text-gray-300">
              {param.required ? (
                <span className="text-orange-500">Required</span>
              ) : (
                <span className="text-gray-500">Optional</span>
              )}
            </td>
            <td className="px-4 py-2 text-sm text-gray-300">{param.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Endpoint: React.FC<EndpointProps> = ({ 
  method, 
  path, 
  description, 
  params = [], 
  response,
  expanded = false 
}) => {
  const [isOpen, setIsOpen] = React.useState(expanded);
  
  const methodColors: Record<string, string> = {
    GET: 'bg-blue-600',
    POST: 'bg-green-600',
    PUT: 'bg-amber-600',
    DELETE: 'bg-red-600'
  };
  
  const methodColor = methodColors[method] || 'bg-gray-600';
  
  return (
    <div className="mb-6 border border-gray-700 rounded-lg overflow-hidden">
      <div 
        className="flex items-center p-4 bg-gray-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`${methodColor} text-white text-xs font-medium py-1 px-2 rounded mr-3`}>
          {method}
        </div>
        <code className="text-sm text-gray-300 mr-auto font-mono">{path}</code>
        <button className="text-gray-400">
          {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      {isOpen && (
        <div className="p-4 border-t border-gray-700 bg-gray-900">
          <p className="text-gray-300 mb-4">{description}</p>
          
          {params.length > 0 && (
            <>
              <h4 className="text-sm font-semibold mb-2 text-gray-200">Parameters</h4>
              <ParamTable params={params} />
            </>
          )}
          
          {response && (
            <>
              <h4 className="text-sm font-semibold mb-2 text-gray-200">Example Response</h4>
              <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-xs text-gray-300 font-mono">
                {response}
              </pre>
            </>
          )}
          
          <h4 className="text-sm font-semibold mt-4 mb-2 text-gray-200">Example Request</h4>
          <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <pre className="text-xs text-gray-300 font-mono">
{`// Using fetch
fetch("https://hypetorch-api.onrender.com${path}", {
  method: "${method}",
  headers: {
    "X-API-Key": "YOUR_API_KEY",
    "Content-Type": "application/json"
  }${method === 'POST' || method === 'PUT' ? `,
  body: JSON.stringify({
    // Request body data
  })` : ''}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

const CodeBlock: React.FC<{ code: string; language: string; title?: string }> = ({ 
  code, 
  language,
  title
}) => {
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="mb-6 rounded-lg overflow-hidden border border-gray-700">
      {title && (
        <div className="bg-gray-800 px-4 py-2 text-sm font-medium flex items-center justify-between">
          <span>{title}</span>
          <div className="flex items-center">
            <span className="text-xs text-gray-400 mr-2">{language}</span>
            <button 
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <CopyCheck size={16} className="text-green-500" /> : <Code size={16} />}
            </button>
          </div>
        </div>
      )}
      <pre className="bg-gray-900 p-4 overflow-x-auto text-sm text-gray-300 font-mono">
        {code}
      </pre>
    </div>
  );
};

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = React.useState('overview');
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">HypeTorch API Documentation</h1>
        <a 
          href="https://github.com/zgulick/hypetorch-api"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-sm bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded border border-gray-700"
        >
          <Globe size={16} className="mr-2" />
          View API Repository
        </a>
      </div>
      
      <div className="mb-8 bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h2 className="text-xl font-semibold mb-2 flex items-center">
          <Lock size={18} className="mr-2 text-orange-500" />
          Authentication
        </h2>
        <p className="text-gray-300 mb-4">
          All API requests require an API key. Include your API key in the request headers 
          using the <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">X-API-Key</code> header.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-grow">
            <h3 className="text-sm font-semibold mb-1">Your API Key:</h3>
            <code className="bg-gray-900 p-2 rounded block overflow-x-auto text-sm">
              {API_KEY || 'No API key found. Set NEXT_PUBLIC_API_KEY in your environment variables.'}
            </code>
          </div>
          <Link
            href="/admin/keys"
            className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center w-fit"
          >
            <Key size={16} className="mr-2" />
            Manage API Keys
          </Link>
        </div>
        
        <div className="mt-4 bg-yellow-900/30 border border-yellow-800 p-4 rounded text-yellow-200 flex items-start">
          <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">IMPORTANT</p>
            <p className="text-sm mt-1">
              Never expose your API key in client-side code that will be sent to browsers.
              For production applications, always make API requests from your server and
              keep your API key secure.
            </p>
          </div>
        </div>
      </div>
      
      {/* Documentation Tabs */}
      <div className="mb-6 border-b border-gray-700">
        <div className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'overview' 
                ? 'border-b-2 border-orange-500 text-orange-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('entities')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'entities' 
                ? 'border-b-2 border-orange-500 text-orange-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Entities
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'metrics' 
                ? 'border-b-2 border-orange-500 text-orange-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Metrics
          </button>
          <button
            onClick={() => setActiveTab('trending')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'trending' 
                ? 'border-b-2 border-orange-500 text-orange-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'history' 
                ? 'border-b-2 border-orange-500 text-orange-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'admin' 
                ? 'border-b-2 border-orange-500 text-orange-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setActiveTab('sdk')}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
              activeTab === 'sdk' 
                ? 'border-b-2 border-orange-500 text-orange-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Client SDK
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="mb-10">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">API Overview</h2>
            <p className="text-gray-300 mb-6">
              The HypeTorch API provides access to JORDN™ and RODMN™ scores, entity metrics, historical data, 
              and trending information. Use this API to integrate HypeTorch analytics into your applications.
            </p>
            
            <h3 className="text-lg font-semibold mb-3">Base URL</h3>
            <CodeBlock 
              code="https://hypetorch-api.onrender.com/api" 
              language="url" 
              title="Base URL"
            />
            
            <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
            <p className="text-gray-300 mb-4">
              To get started with the HypeTorch API, follow these steps:
            </p>
            <ol className="list-decimal pl-6 mb-6 text-gray-300 space-y-2">
              <li>
                <span className="font-medium">Request an API key</span> from the HypeTorch admin panel.
              </li>
              <li>
                <span className="font-medium">Include your API key</span> in all requests using the <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">X-API-Key</code> header.
              </li>
              <li>
                <span className="font-medium">Make requests</span> to the HypeTorch API endpoints.
              </li>
            </ol>
          </div>
        )}
        
        {/* Add other tab content here */}
      </div>
    </div>
  );
}