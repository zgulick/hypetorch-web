"use client";

import { useState } from 'react';
import { 
  Code, 
  Globe, 
  Key, 
  Lock, 
  CopyCheck, 
  AlertCircle, 
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { API_KEY } from '@/lib/api';
import ParametersTable from '@/components/ParametersTable';

interface EndpointProps {
  method: string;
  path: string;
  description: string;
  params?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  response?: string;
  expanded?: boolean;
}

const Endpoint: React.FC<EndpointProps> = ({ 
  method, 
  path, 
  description, 
  params = [], 
  response,
  expanded = false 
}) => {
  const [isOpen, setIsOpen] = useState(expanded);
  
  const methodColors = {
    GET: 'bg-blue-600',
    POST: 'bg-green-600',
    PUT: 'bg-amber-600',
    DELETE: 'bg-red-600'
  };
  
  const methodColor = methodColors[method as keyof typeof methodColors] || 'bg-gray-600';
  
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
              <ParametersTable params={params} />
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
          
          {/* Example Code Snippet */}
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
  const [copied, setCopied] = useState(false);
  
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
  const [activeTab, setActiveTab] = useState('overview');
  
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
            
            <h3 className="text-lg font-semibold mb-3">Example Integration</h3>
            <CodeBlock 
              code={`// Using JavaScript fetch
const apiKey = "YOUR_API_KEY";
const baseUrl = "https://hypetorch-api.onrender.com/api";

// Get all entities
async function getEntities() {
  try {
    const response = await fetch(\`\${baseUrl}/entities\`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching entities:', error);
    throw error;
  }
}

// Get HYPE scores for all entities
async function getHypeScores() {
  try {
    const response = await fetch(\`\${baseUrl}/hype_scores\`, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching HYPE scores:', error);
    throw error;
  }
}`} 
              language="javascript" 
              title="Basic JavaScript Integration"
            />
            
            <h3 className="text-lg font-semibold mb-3">Rate Limits</h3>
            <p className="text-gray-300 mb-4">
              The HypeTorch API implements rate limiting to ensure fair usage:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-300 space-y-2">
              <li>Standard API keys are limited to <span className="font-medium">100 requests per minute</span>.</li>
              <li>Excessive requests will return a <code className="bg-gray-700 px-1 py-0.5 rounded text-sm">429 Too Many Requests</code> response.</li>
              <li>Higher rate limits are available for enterprise clients.</li>
            </ul>
            
            <div className="bg-blue-900/30 border border-blue-800 p-4 rounded text-blue-200">
              <h4 className="font-medium mb-1">Best Practices</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Cache responses when possible to reduce API calls</li>
                <li>Implement exponential backoff for retry logic</li>
                <li>Use specific endpoints rather than fetching all data</li>
                <li>Consider using webhooks for real-time updates (coming soon)</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'entities' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Entities API</h2>
            <p className="text-gray-300 mb-6">
              Endpoints for retrieving information about tracked entities (players, teams, organizations, etc.).
            </p>
            
            <Endpoint 
              method="GET"
              path="/entities"
              description="Retrieves a list of all tracked entities."
              response={`[
  "Breanna Stewart",
  "Caitlin Clark",
  "Angel Reese",
  "Sabrina Ionescu",
  "WNBA",
  "Unrivaled"
]`}
              expanded={true}
            />
            
            <Endpoint 
              method="GET"
              path="/entities/{entity_id}"
              description="Retrieves detailed information about a specific entity."
              params={[
                {
                  name: "entity_id",
                  type: "string",
                  required: true,
                  description: "The name of the entity to retrieve, URL-encoded."
                }
              ]}
              response={`{
  "name": "Caitlin Clark",
  "type": "person",
  "category": "Sports",
  "subcategory": "Unrivaled",
  "hype_score": 98.7,
  "rodmn_score": 7.2,
  "mentions": 3452,
  "talk_time": 87.5,
  "sentiment": [0.32, 0.45, 0.67, 0.28, 0.51]
}`}
            />
            
            <Endpoint 
              method="GET"
              path="/entities/{entity_id}/metrics"
              description="Retrieves engagement metrics for a specific entity."
              params={[
                {
                  name: "entity_id",
                  type: "string",
                  required: true,
                  description: "The name of the entity to retrieve metrics for, URL-encoded."
                }
              ]}
              response={`{
  "mentions": 3452,
  "talk_time": 87.5,
  "sentiment": [0.32, 0.45, 0.67, 0.28, 0.51],
  "rodmn_score": 7.2
}`}
            />
            
            <Endpoint 
              method="GET"
              path="/entities/{entity_id}/trending"
              description="Retrieves trending data from external platforms for a specific entity."
              params={[
                {
                  name: "entity_id",
                  type: "string",
                  required: true,
                  description: "The name of the entity to retrieve trending data for, URL-encoded."
                }
              ]}
              response={`{
  "google_trends": 78,
  "wikipedia_views": 12450,
  "reddit_mentions": 342,
  "google_news_mentions": 56
}`}
            />
          </div>
        )}
        
        {activeTab === 'metrics' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Metrics API</h2>
            <p className="text-gray-300 mb-6">
              Endpoints for retrieving aggregate metrics and scores.
            </p>
            
            <Endpoint 
              method="GET"
              path="/hype_scores"
              description="Retrieves JORDN™ scores for all entities."
              response={`{
  "Caitlin Clark": 98.7,
  "Angel Reese": 92.5,
  "Sabrina Ionescu": 89.3,
  "Breanna Stewart": 88.1,
  "Unrivaled": 85.4
}`}
              expanded={true}
            />
            
            <Endpoint 
              method="GET"
              path="/rodmn_scores"
              description="Retrieves RODMN™ scores for all entities."
              response={`{
  "LeBron James": 8.4,
  "Angel Reese": 7.8,
  "Caitlin Clark": 7.2,
  "Sabrina Ionescu": 6.1,
  "Breanna Stewart": 5.3
}`}
            />
            
            <Endpoint 
              method="GET"
              path="/controversial"
              description="Retrieves entities sorted by RODMN™ score (most controversial first)."
              params={[
                {
                  name: "limit",
                  type: "integer",
                  required: false,
                  description: "Maximum number of entities to return. Default is 10."
                }
              ]}
              response={`[
  {
    "name": "LeBron James",
    "rodmn_score": 8.4
  },
  {
    "name": "Angel Reese",
    "rodmn_score": 7.8
  },
  {
    "name": "Caitlin Clark",
    "rodmn_score": 7.2
  }
]`}
            />
            
            <Endpoint 
              method="GET"
              path="/last_updated"
              description="Retrieves the timestamp when the data was last updated."
              response={`{
  "last_updated": 1710752400
}`}
            />
          </div>
        )}
        
        {activeTab === 'trending' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Trending API</h2>
            <p className="text-gray-300 mb-6">
              Endpoints for retrieving trending and changing metrics over time.
            </p>
            
            <Endpoint 
              method="GET"
              path="/trending"
              description="Retrieves trending entities based on recent changes in metrics."
              params={[
                {
                  name: "metric",
                  type: "string",
                  required: false,
                  description: "Metric to analyze for trending. Options: hype_scores, mentions, talk_time. Default is hype_scores."
                },
                {
                  name: "limit",
                  type: "integer",
                  required: false,
                  description: "Maximum number of entities to return. Default is 10."
                },
                {
                  name: "time_period",
                  type: "string",
                  required: false,
                  description: "Time period to analyze. Options: last_7_days, last_30_days, last_6_months. Default is last_30_days."
                },
                {
                  name: "category",
                  type: "string",
                  required: false,
                  description: "Filter by entity category (e.g., Sports)."
                },
                {
                  name: "subcategory",
                  type: "string",
                  required: false,
                  description: "Filter by entity subcategory (e.g., Unrivaled)."
                }
              ]}
              response={`{
  "trending": [
    {
      "entity_name": "Caitlin Clark",
      "current_value": 98.7,
      "current_timestamp": "2025-03-15T12:00:00Z",
      "previous_value": 85.2,
      "previous_timestamp": "2025-03-08T12:00:00Z",
      "percent_change": 15.8
    },
    {
      "entity_name": "Angel Reese",
      "current_value": 92.5,
      "current_timestamp": "2025-03-15T12:00:00Z",
      "previous_value": 82.1,
      "previous_timestamp": "2025-03-08T12:00:00Z",
      "percent_change": 12.7
    }
  ]
}`}
              expanded={true}
            />
          </div>
        )}
        
        {activeTab === 'history' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Historical Data API</h2>
            <p className="text-gray-300 mb-6">
              Endpoints for retrieving historical data and time series metrics.
            </p>
            
            <Endpoint 
              method="GET"
              path="/entities/{entity_id}/history"
              description="Retrieves historical JORDN™ score data for a specific entity."
              params={[
                {
                  name: "entity_id",
                  type: "string",
                  required: true,
                  description: "The name of the entity to retrieve history for, URL-encoded."
                },
                {
                  name: "limit",
                  type: "integer",
                  required: false,
                  description: "Maximum number of historical data points to return. Default is 30."
                },
                {
                  name: "start_date",
                  type: "string",
                  required: false,
                  description: "Start date for historical data (YYYY-MM-DD format)."
                },
                {
                  name: "end_date",
                  type: "string",
                  required: false,
                  description: "End date for historical data (YYYY-MM-DD format)."
                }
              ]}
              response={`{
  "name": "Caitlin Clark",
  "history": [
    {
      "score": 98.7,
      "timestamp": "2025-03-15T12:00:00Z",
      "time_period": "last_30_days"
    },
    {
      "score": 95.2,
      "timestamp": "2025-03-08T12:00:00Z",
      "time_period": "last_30_days"
    },
    {
      "score": 92.8,
      "timestamp": "2025-03-01T12:00:00Z",
      "time_period": "last_30_days"
    }
  ]
}`}
              expanded={true}
            />
            
            <Endpoint 
              method="GET"
              path="/entities/{entity_id}/metrics/{metric_type}/history"
              description="Retrieves historical metrics data for a specific entity and metric type."
              params={[
                {
                  name: "entity_id",
                  type: "string",
                  required: true,
                  description: "The name of the entity to retrieve metric history for, URL-encoded."
                },
                {
                  name: "metric_type",
                  type: "string",
                  required: true,
                  description: "The type of metric to retrieve history for (mentions, talk_time, etc.)."
                },
                {
                  name: "limit",
                  type: "integer",
                  required: false,
                  description: "Maximum number of historical data points to return. Default is 30."
                },
                {
                  name: "start_date",
                  type: "string",
                  required: false,
                  description: "Start date for historical data (YYYY-MM-DD format)."
                },
                {
                  name: "end_date",
                  type: "string",
                  required: false,
                  description: "End date for historical data (YYYY-MM-DD format)."
                }
              ]}
              response={`{
  "name": "Caitlin Clark",
  "metric": "mentions",
  "history": [
    {
      "value": 3452,
      "timestamp": "2025-03-15T12:00:00Z",
      "time_period": "last_30_days"
    },
    {
      "value": 3127,
      "timestamp": "2025-03-08T12:00:00Z",
      "time_period": "last_30_days"
    },
    {
      "value": 2985,
      "timestamp": "2025-03-01T12:00:00Z",
      "time_period": "last_30_days"
    }
  ]
}`}
            />
          </div>
        )}
        
        {activeTab === 'admin' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Admin API</h2>
            <p className="text-gray-300 mb-6">
              Administrative endpoints for managing entities and uploading data. These endpoints require special permissions.
            </p>
            
            <div className="bg-yellow-900/30 border border-yellow-800 p-4 rounded mb-6 text-yellow-200 flex items-start">
              <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">RESTRICTED ACCESS</p>
                <p className="text-sm mt-1">
                  The Admin API endpoints require administrative privileges and are not available to standard API users.
                  Contact HypeTorch administrators for access.
                </p>
              </div>
            </div>
            
            <Endpoint 
              method="POST"
              path="/upload_json"
              description="Uploads a new JSON file with entity data."
              params={[
                {
                  name: "file",
                  type: "file",
                  required: true,
                  description: "JSON file containing entity data."
                }
              ]}
              response={`{
  "message": "✅ File uploaded successfully!",
  "database_saved": true,
  "details": "Data saved successfully",
  "db_available": true
}`}
              expanded={true}
            />
            
            <Endpoint 
              method="PUT"
              path="/entities/{entity_id}"
              description="Updates information for a specific entity."
              params={[
                {
                  name: "entity_id",
                  type: "string",
                  required: true,
                  description: "The name of the entity to update, URL-encoded."
                },
                {
                  name: "name",
                  type: "string",
                  required: false,
                  description: "New name for the entity."
                },
                {
                  name: "type",
                  type: "string",
                  required: false,
                  description: "Entity type (person, non-person)."
                },
                {
                  name: "category",
                  type: "string",
                  required: false,
                  description: "Entity category (e.g., Sports)."
                },
                {
                  name: "subcategory",
                  type: "string",
                  required: false,
                  description: "Entity subcategory (e.g., Unrivaled)."
                }
              ]}
              response={`{
  "success": true,
  "message": "Entity 'Caitlin Clark' updated successfully"
}`}
            />
            
            <Endpoint 
              method="POST"
              path="/entities"
              description="Creates a new entity."
              params={[
                {
                  name: "name",
                  type: "string",
                  required: true,
                  description: "Name of the new entity."
                },
                {
                  name: "type",
                  type: "string",
                  required: false,
                  description: "Entity type (person, non-person). Default is 'person'."
                },
                {
                  name: "category",
                  type: "string",
                  required: false,
                  description: "Entity category (e.g., Sports). Default is 'Sports'."
                },
                {
                  name: "subcategory",
                  type: "string",
                  required: false,
                  description: "Entity subcategory (e.g., Unrivaled). Default is 'Unrivaled'."
                }
              ]}
              response={`{
  "success": true,
  "message": "Entity 'New Player Name' created successfully"
}`}
            />
            
            <Endpoint 
              method="DELETE"
              path="/entities/{entity_id}"
              description="Deletes a specific entity."
              params={[
                {
                  name: "entity_id",
                  type: "string",
                  required: true,
                  description: "The name of the entity to delete, URL-encoded."
                }
              ]}
              response={`{
  "success": true,
  "message": "Entity deleted successfully"
}`}
            />
          </div>
        )}
        
        {activeTab === 'sdk' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Client SDK</h2>
            <p className="text-gray-300 mb-6">
              To simplify integration with the HypeTorch API, we offer client SDKs for popular programming languages.
            </p>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <h3 className="text-lg font-semibold mb-4">JavaScript/TypeScript SDK</h3>
              <p className="text-gray-300 mb-4">
                The HypeTorch JavaScript SDK provides a simple interface for working with the HypeTorch API in browser and Node.js applications.
              </p>
              <CodeBlock 
                code={`npm install hypetorch-sdk`} 
                language="bash" 
                title="Installation"
              />
              <CodeBlock 
                code={`// Initialize the SDK with your API key
import { HypeTorch } from 'hypetorch-sdk';

// Create a new instance with your API key
const hype = new HypeTorch('YOUR_API_KEY');

// Get all entities
const entities = await hype.getEntities();

// Get HYPE scores for all entities
const hypeScores = await hype.getHypeScores();

// Get details for a specific entity
const clark = await hype.getEntity('Caitlin Clark');

// Get historical data for an entity
const history = await hype.getEntityHistory('Caitlin Clark', {
  limit: 10,
  startDate: '2025-01-01',
  endDate: '2025-03-18'
});

// Get trending entities
const trending = await hype.getTrending({
  metric: 'hype_scores',
  limit: 5,
  timePeriod: 'last_30_days'
});
`} 
                language="javascript" 
                title="JavaScript/TypeScript Usage"
              />
              <p className="text-yellow-500 mt-4">
                <em>Note: The JavaScript SDK is currently in development and will be available soon.</em>
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
              <h3 className="text-lg font-semibold mb-4">Python SDK</h3>
              <p className="text-gray-300 mb-4">
                The HypeTorch Python SDK makes it easy to integrate HypeTorch analytics into your Python applications.
              </p>
              <CodeBlock 
                code={`pip install hypetorch`} 
                language="bash" 
                title="Installation"
              />
              <CodeBlock 
                code={`# Initialize the SDK with your API key
from hypetorch import HypeTorch

# Create a new instance with your API key
hype = HypeTorch('YOUR_API_KEY')

# Get all entities
entities = hype.get_entities()

# Get HYPE scores for all entities
hype_scores = hype.get_hype_scores()

# Get details for a specific entity
clark = hype.get_entity('Caitlin Clark')

# Get historical data for an entity
history = hype.get_entity_history('Caitlin Clark', 
                                 limit=10, 
                                 start_date='2025-01-01', 
                                 end_date='2025-03-18')

# Get trending entities
trending = hype.get_trending(metric='hype_scores', 
                            limit=5, 
                            time_period='last_30_days')
`} 
                language="python" 
                title="Python Usage"
              />
              <p className="text-yellow-500 mt-4">
                <em>Note: The Python SDK is currently in development and will be available soon.</em>
              </p>
            </div>
            
            <div className="bg-blue-900/30 border border-blue-800 p-4 rounded text-blue-200">
              <h4 className="font-medium mb-1">SDK Roadmap</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>JavaScript/TypeScript SDK (Q2 2025)</li>
                <li>Python SDK (Q2 2025)</li>
                <li>React Hooks and Components Library (Q3 2025)</li>
                <li>PHP SDK (Q3 2025)</li>
                <li>Ruby SDK (Q4 2025)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}