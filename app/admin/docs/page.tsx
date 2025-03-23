"use client";

import { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, Code, FileText, Lock } from 'lucide-react';
import { API_KEY } from '@/lib/api';

export default function ApiDocs() {
  const [expandedSection, setExpandedSection] = useState<string | null>("authentication");
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);
  
  const baseUrl = "https://hypetorch-api.onrender.com/api";
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => {
      setCopiedEndpoint(null);
    }, 2000);
  };
  
  const endpoints = [
    {
      id: "entities-list",
      name: "List All Entities",
      method: "GET",
      path: "/v1/entities",
      description: "Returns a list of all tracked entities (players, teams, organizations, etc.).",
      response: `["Breanna Stewart", "Caitlin Clark", "Angel Reese", "Sabrina Ionescu", ...]`,
      code: `fetch("${baseUrl}/v1/entities", {
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`
    },
    {
      id: "entity-details",
      name: "Get Entity Details",
      method: "GET",
      path: "/v1/entities/{entity_id}",
      description: "Returns detailed information for a specific entity, including HYPE (JORDN™) and RODMN™ scores.",
      params: [
        {
          name: "entity_id",
          type: "path",
          description: "The name of the entity (URL-encoded)"
        }
      ],
      response: `{
  "name": "Caitlin Clark",
  "type": "person",
  "category": "Sports",
  "subcategory": "Unrivaled",
  "hype_score": 167.25,
  "rodmn_score": 8.4,
  "mentions": 2843,
  "talk_time": 42.5,
  "sentiment": [0.28, 0.42, 0.36, ...]
}`,
      code: `fetch("${baseUrl}/v1/entities/Caitlin%20Clark", {
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`
    },
    {
      id: "hype-scores",
      name: "Get All JORDN™ Scores",
      method: "GET",
      path: "/hype_scores",
      description: "Returns JORDN™ scores for all tracked entities.",
      response: `{
  "Caitlin Clark": 167.25,
  "Angel Reese": 152.13,
  "Sabrina Ionescu": 143.76,
  ...
}`,
      code: `fetch("${baseUrl}/hype_scores", {
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`
    },
    {
      id: "rodmn-scores",
      name: "Get All RODMN™ Scores",
      method: "GET",
      path: "/rodmn_scores",
      description: "Returns RODMN™ scores for all tracked entities. Higher scores indicate more controversial reception.",
      response: `{
  "Entity Name 1": 8.4,
  "Entity Name 2": 7.2,
  "Entity Name 3": 6.5,
  ...
}`,
      code: `fetch("${baseUrl}/rodmn_scores", {
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`
    },
    {
      id: "entity-metrics",
      name: "Get Entity Metrics",
      method: "GET",
      path: "/v1/entities/{entity_id}/metrics",
      description: "Returns engagement metrics for a specific entity (mentions, talk time, sentiment).",
      params: [
        {
          name: "entity_id",
          type: "path",
          description: "The name of the entity (URL-encoded)"
        }
      ],
      response: `{
  "mentions": 2843,
  "talk_time": 42.5,
  "sentiment": [0.28, 0.42, 0.36, ...],
  "rodmn_score": 8.4
}`,
      code: `fetch("${baseUrl}/v1/entities/Caitlin%20Clark/metrics", {
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`
    },
    {
      id: "entity-trending",
      name: "Get Entity Trending Data",
      method: "GET",
      path: "/v1/entities/{entity_id}/trending",
      description: "Returns trending data from external platforms for a specific entity.",
      params: [
        {
          name: "entity_id",
          type: "path",
          description: "The name of the entity (URL-encoded)"
        }
      ],
      response: `{
  "google_trends": 85,
  "wikipedia_views": 12453,
  "reddit_mentions": 437,
  "google_news_mentions": 324
}`,
      code: `fetch("${baseUrl}/v1/entities/Caitlin%20Clark/trending", {
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`
    },
    {
      id: "controversial",
      name: "Get Most Controversial Entities",
      method: "GET",
      path: "/controversial",
      description: "Returns entities sorted by RODMN™ score (most controversial first).",
      params: [
        {
          name: "limit",
          type: "query",
          description: "Maximum number of entities to return (default: 10)"
        }
      ],
      response: `[
  {"name": "Entity Name 1", "rodmn_score": 8.4},
  {"name": "Entity Name 2", "rodmn_score": 7.2},
  ...
]`,
      code: `fetch("${baseUrl}/controversial?limit=5", {
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`
    },
    {
      id: "entity-history",
      name: "Get Entity History",
      method: "GET",
      path: "/v1/entities/{entity_id}/history",
      description: "Returns historical JORDN™ score data for a specific entity.",
      params: [
        {
          name: "entity_id",
          type: "path",
          description: "The name of the entity (URL-encoded)"
        },
        {
          name: "limit",
          type: "query",
          description: "Maximum number of history records to return (default: 30)"
        }
      ],
      response: `{
  "name": "Caitlin Clark",
  "history": [
    {
      "timestamp": "2025-03-14T12:00:00",
      "score": 167.25,
      "time_period": "last_30_days"
    },
    ...
  ]
}`,
      code: `fetch("${baseUrl}/v1/entities/Caitlin%20Clark/history?limit=10", {
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`
    },
    {
      id: "entity-metric-history",
      name: "Get Entity Metric History",
      method: "GET",
      path: "/v1/entities/{entity_id}/metrics/{metric_type}/history",
      description: "Returns historical metric data for a specific entity and metric type.",
      params: [
        {
          name: "entity_id",
          type: "path",
          description: "The name of the entity (URL-encoded)"
        },
        {
          name: "metric_type",
          type: "path",
          description: "The metric type (e.g., talk_time_counts, mentions)"
        },
        {
          name: "limit",
          type: "query",
          description: "Maximum number of history records to return (default: 30)"
        }
      ],
      response: `{
  "name": "Caitlin Clark",
  "metric": "talk_time_counts",
  "history": [
    {
      "timestamp": "2025-03-14T12:00:00",
      "value": 42.5,
      "time_period": "last_30_days"
    },
    ...
  ]
}`,
      code: `fetch("${baseUrl}/v1/entities/Caitlin%20Clark/metrics/talk_time_counts/history", {
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`
    },
    {
      id: "trending",
      name: "Get Trending Entities",
      method: "GET",
      path: "/trending",
      description: "Returns trending entities based on recent changes in metrics.",
      params: [
        {
          name: "metric",
          type: "query",
          description: "Metric to analyze (default: hype_scores)"
        },
        {
          name: "limit",
          type: "query",
          description: "Maximum number of entities to return (default: 10)"
        },
        {
          name: "time_period",
          type: "query",
          description: "Filter by time period (e.g., last_7_days, last_30_days)"
        }
      ],
      response: `{
  "trending": [
    {
      "entity_name": "Caitlin Clark",
      "current_value": 167.25,
      "previous_value": 145.38,
      "percent_change": 15.04
    },
    ...
  ]
}`,
      code: `fetch("${baseUrl}/trending?metric=hype_scores&limit=5&time_period=last_30_days", {
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));`
    }
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 mb-8">
        <div 
          className="p-6 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("authentication")}
        >
          <div className="flex items-center">
            <Lock size={20} className="mr-3 text-orange-500" />
            <h2 className="text-xl font-semibold">Authentication</h2>
          </div>
          {expandedSection === "authentication" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSection === "authentication" && (
          <div className="p-6 pt-0 border-t border-gray-700">
            <p className="mb-4">All API requests require an API key to be sent in the <code className="bg-gray-700 px-1 py-0.5 rounded">X-API-Key</code> header.</p>
            
            <div className="bg-gray-900 rounded-md p-4 mb-4">
              <p className="font-mono text-sm mb-2 text-gray-300">Example:</p>
              <div className="flex justify-between items-center">
                <code className="font-mono text-sm">X-API-Key: {API_KEY || 'YOUR_API_KEY'}</code>
                <button 
                  onClick={() => copyToClipboard(`X-API-Key: ${API_KEY || 'YOUR_API_KEY'}`, "auth-header")}
                  className="text-gray-400 hover:text-white"
                >
                  {copiedEndpoint === "auth-header" ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm">
              To request an API key, please contact us at <a href="mailto:hypetorch@gmail.com" className="text-orange-500 hover:underline">hypetorch@gmail.com</a>.
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 mb-8">
        <div 
          className="p-6 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("basics")}
        >
          <div className="flex items-center">
            <FileText size={20} className="mr-3 text-orange-500" />
            <h2 className="text-xl font-semibold">API Basics</h2>
          </div>
          {expandedSection === "basics" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        
        {expandedSection === "basics" && (
          <div className="p-6 pt-0 border-t border-gray-700">
            <h3 className="font-semibold mb-2">Base URL</h3>
            <div className="bg-gray-900 rounded-md p-4 mb-4 flex justify-between items-center">
              <code className="font-mono text-sm">{baseUrl}</code>
              <button 
                onClick={() => copyToClipboard(baseUrl, "base-url")}
                className="text-gray-400 hover:text-white"
              >
                {copiedEndpoint === "base-url" ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            
            <h3 className="font-semibold mb-2">Response Format</h3>
            <p className="mb-4">All API responses are returned in JSON format.</p>
            
            <h3 className="font-semibold mb-2">Error Handling</h3>
            <p className="mb-2">The API returns standard HTTP status codes to indicate the success or failure of a request:</p>
            <ul className="list-disc list-inside mb-4 text-gray-300">
              <li><span className="font-semibold">200 OK</span> - The request was successful</li>
              <li><span className="font-semibold">400 Bad Request</span> - The request was invalid</li>
              <li><span className="font-semibold">401 Unauthorized</span> - Missing or invalid API key</li>
              <li><span className="font-semibold">404 Not Found</span> - The requested resource was not found</li>
              <li><span className="font-semibold">500 Server Error</span> - An error occurred on the server</li>
            </ul>
            
            <p className="text-gray-400 text-sm">
              For detailed error information, check the response body for a <code className="bg-gray-700 px-1 py-0.5 rounded">detail</code> field.
            </p>
          </div>
        )}
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
      
      {endpoints.map((endpoint) => (
        <div key={endpoint.id} className="bg-gray-800 rounded-lg border border-gray-700 mb-4">
          <div 
            className="p-6 flex justify-between items-center cursor-pointer"
            onClick={() => toggleSection(endpoint.id)}
          >
            <div className="flex items-center">
              <Code size={20} className="mr-3 text-orange-500" />
              <div>
                <h3 className="font-semibold">{endpoint.name}</h3>
                <div className="flex items-center mt-1">
                  <span className={`px-2 py-0.5 text-xs rounded mr-2 ${
                    endpoint.method === "GET" ? "bg-blue-900/50 text-blue-400" :
                    endpoint.method === "POST" ? "bg-green-900/50 text-green-400" :
                    endpoint.method === "PUT" ? "bg-yellow-900/50 text-yellow-400" :
                    "bg-red-900/50 text-red-400"
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-gray-400">{endpoint.path}</code>
                </div>
              </div>
            </div>
            {expandedSection === endpoint.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {expandedSection === endpoint.id && (
            <div className="p-6 pt-0 border-t border-gray-700">
              <p className="mb-4">{endpoint.description}</p>
              
              {endpoint.params && endpoint.params.length > 0 && (
                <>
                  <h4 className="font-semibold mb-2">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm mb-4">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="px-4 py-2 text-left">Name</th>
                          <th className="px-4 py-2 text-left">Location</th>
                          <th className="px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {endpoint.params.map((param, index) => (
                          <tr key={index} className="divide-x divide-gray-700">
                            <td className="px-4 py-2 font-mono">{param.name}</td>
                            <td className="px-4 py-2">{param.type}</td>
                            <td className="px-4 py-2">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
              
              <h4 className="font-semibold mb-2">Example Response</h4>
              <div className="bg-gray-900 rounded-md p-4 mb-4 overflow-x-auto">
                <pre className="font-mono text-sm">{endpoint.response}</pre>
              </div>
              
              <h4 className="font-semibold mb-2">Example Request</h4>
              <div className="bg-gray-900 rounded-md p-4 mb-2 relative">
                <pre className="font-mono text-sm whitespace-pre-wrap">{endpoint.code}</pre>
                <button 
                  onClick={() => copyToClipboard(endpoint.code, endpoint.id)}
                  className="absolute top-2 right-2 bg-gray-800 p-1 rounded text-gray-400 hover:text-white"
                >
                  {copiedEndpoint === endpoint.id ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="font-semibold mb-2">Full Endpoint URL</h4>
                <div className="bg-gray-900 rounded-md p-4 flex justify-between items-center">
                  <code className="font-mono text-sm break-all">{baseUrl + endpoint.path.replace(/{([^}]+)}/g, '...')}</code>
                  <button 
                    onClick={() => copyToClipboard(baseUrl + endpoint.path.replace(/{([^}]+)}/g, '...'), `${endpoint.id}-url`)}
                    className="text-gray-400 hover:text-white ml-2 flex-shrink-0"
                  >
                    {copiedEndpoint === `${endpoint.id}-url` ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Rate Limits</h2>
        <p className="mb-4">
          Our API currently has the following rate limits:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-300">
          <li>100 requests per minute</li>
          <li>5,000 requests per day</li>
        </ul>
        <p className="text-gray-400 text-sm">
          If you need higher rate limits, please contact us to discuss enterprise options.
        </p>
      </div>
      
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
        <p className="mb-4">
          If you have any questions or need assistance with our API, please don&apos;t hesitate to reach out.
        </p>
        <p className="text-gray-300">
          Contact us at <a href="mailto:hypetorch@gmail.com" className="text-orange-500 hover:underline">hypetorch@gmail.com</a>
        </p>
      </div>
    </div>
  );
}