"use client";

import React, { useState } from 'react';
import Navbar from "@/app/Navbar";
import { motion } from "framer-motion";
import { 
  Code2, Key, Zap, Shield, Clock, ArrowRight, 
  Copy, Check, AlertTriangle, Database, TrendingUp,
  BarChart3, Users, Mail, ExternalLink
} from "lucide-react";

export default function ApiDocs() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string>('');

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(''), 2000);
  };

  const endpoints = [
    {
      method: "GET",
      path: "/v2/entities",
      title: "Get All Entities",
      description: "Retrieve all entities with optional metrics and filtering",
      params: [
        { name: "include_metrics", type: "boolean", default: "false", description: "Include current metrics" },
        { name: "category", type: "string", optional: true, description: "Filter by category (Sports, Crypto)" },
        { name: "subcategory", type: "string", optional: true, description: "Filter by subcategory (NFL, WNBA)" }
      ],
      example: {
        request: "curl -X GET 'https://api.hypetorch.com/v2/entities?include_metrics=true&category=Sports' \\\n  -H 'X-API-Key: your-api-key'",
        response: {
          status: "success",
          data: [
            {
              id: 1,
              name: "Caitlin Clark",
              type: "person",
              category: "Sports",
              subcategory: "WNBA",
              metrics: {
                hype_score: 85.2,
                rodmn_score: 12.3,
                mentions: 156,
                talk_time: 45.7
              }
            }
          ]
        }
      }
    },
    {
      method: "GET",
      path: "/v2/entities/search",
      title: "Search Entities",
      description: "Search for entities by name or keyword",
      params: [
        { name: "q", type: "string", required: true, description: "Search query" },
        { name: "category", type: "string", optional: true, description: "Filter by category" },
        { name: "limit", type: "integer", default: "20", description: "Max results (1-100)" }
      ],
      example: {
        request: "curl -X GET 'https://api.hypetorch.com/v2/entities/search?q=Clark&limit=5' \\\n  -H 'X-API-Key: your-api-key'",
        response: {
          status: "success",
          data: [
            {
              id: 1,
              name: "Caitlin Clark",
              type: "person",
              category: "Sports",
              subcategory: "WNBA"
            }
          ]
        }
      }
    },
    {
      method: "POST",
      path: "/v2/entities/bulk",
      title: "Bulk Entity Query",
      description: "Get multiple entities with specific metrics and optional history",
      params: [],
      example: {
        request: "curl -X POST 'https://api.hypetorch.com/v2/entities/bulk' \\\n  -H 'X-API-Key: your-api-key' \\\n  -H 'Content-Type: application/json' \\\n  -d '{\n    \"entity_names\": [\"Caitlin Clark\", \"Angel Reese\"],\n    \"metrics\": [\"hype_score\", \"rodmn_score\", \"mentions\"],\n    \"include_history\": false\n  }'",
        response: {
          status: "success",
          data: [
            {
              name: "Caitlin Clark",
              metrics: {
                hype_score: 85.2,
                rodmn_score: 12.3,
                mentions: 156
              }
            },
            {
              name: "Angel Reese",
              metrics: {
                hype_score: 78.9,
                rodmn_score: 8.7,
                mentions: 143
              }
            }
          ]
        }
      }
    },
    {
      method: "GET",
      path: "/v2/trending",
      title: "Get Trending Entities",
      description: "Get entities with the biggest changes in metrics",
      params: [
        { name: "metric", type: "string", default: "hype_score", description: "Metric to analyze for trends" },
        { name: "limit", type: "integer", default: "10", description: "Max results (1-50)" },
        { name: "category", type: "string", optional: true, description: "Filter by category" }
      ],
      example: {
        request: "curl -X GET 'https://api.hypetorch.com/v2/trending?metric=hype_score&limit=5' \\\n  -H 'X-API-Key: your-api-key'",
        response: {
          status: "success",
          data: [
            {
              name: "Caitlin Clark",
              current_value: 85.2,
              previous_value: 72.1,
              percent_change: 18.2,
              trend_direction: "up"
            }
          ]
        }
      }
    },
    {
      method: "GET",
      path: "/v2/dashboard/widgets",
      title: "Dashboard Widgets",
      description: "Get pre-configured dashboard data for top movers, alerts, and opportunities",
      params: [],
      example: {
        request: "curl -X GET 'https://api.hypetorch.com/v2/dashboard/widgets' \\\n  -H 'X-API-Key: your-api-key'",
        response: {
          status: "success",
          data: {
            top_movers: [
              {
                name: "Caitlin Clark",
                current_score: 85.2,
                change: 15.2,
                trend: "up"
              }
            ],
            narrative_alerts: [
              {
                name: "Angel Reese",
                rodmn_score: 25.8,
                alert_level: "high",
                context: "High controversy detected in recent discussions"
              }
            ]
          }
        }
      }
    }
  ];

  const codeExamples = {
    javascript: `// Using fetch API
const response = await fetch('https://api.hypetorch.com/v2/entities?include_metrics=true', {
  method: 'GET',
  headers: {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`,

    python: `import requests

headers = {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
}

response = requests.get(
    'https://api.hypetorch.com/v2/entities',
    headers=headers,
    params={'include_metrics': True}
)

data = response.json()
print(data)`,

    curl: `curl -X GET 'https://api.hypetorch.com/v2/entities?include_metrics=true' \\
  -H 'X-API-Key: your-api-key' \\
  -H 'Content-Type: application/json'`
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-amber-500">
              API Documentation
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Integrate HypeTorch&apos;s advanced analytics into your applications. Access real-time influence scores, 
              controversy detection, and narrative intelligence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:hypetorch@gmail.com?subject=API%20Key%20Request"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-semibold text-lg flex items-center gap-2 shadow-lg shadow-orange-900/30 hover:shadow-xl hover:shadow-orange-900/40 transition-all hover:scale-105"
              >
                <Key size={20} />
                Get API Key
              </a>
              <div className="px-8 py-4 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-300 font-medium">
                <span className="text-orange-400 font-semibold">Base URL:</span> https://api.hypetorch.com
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 p-6 rounded-xl border border-orange-500/20">
              <Database className="w-8 h-8 text-orange-400 mb-3" />
              <div className="text-2xl font-bold text-white mb-1">45+</div>
              <div className="text-sm text-gray-400">Tracked Entities</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-6 rounded-xl border border-blue-500/20">
              <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
              <div className="text-2xl font-bold text-white mb-1">8</div>
              <div className="text-sm text-gray-400">Core Metrics</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-teal-900/20 p-6 rounded-xl border border-green-500/20">
              <BarChart3 className="w-8 h-8 text-green-400 mb-3" />
              <div className="text-2xl font-bold text-white mb-1">12+</div>
              <div className="text-sm text-gray-400">API Endpoints</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-purple-500/20">
              <Zap className="w-8 h-8 text-purple-400 mb-3" />
              <div className="text-2xl font-bold text-white mb-1">Weekly</div>
              <div className="text-sm text-gray-400">Data Updates</div>
            </div>
          </motion.div>

          {/* Getting Started */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
              <Code2 className="w-8 h-8 text-orange-400 mr-3" />
              Getting Started
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Key className="w-6 h-6 text-orange-400 mr-2" />
                  1. Get Your API Key
                </h3>
                <p className="text-gray-300 mb-4">
                  Contact our sales team to get your API key. Each key comes with rate limits and usage tracking.
                </p>
                <a
                  href="mailto:hypetorch@gmail.com?subject=API%20Key%20Request&body=Hello,%0A%0AI'm interested in getting an API key for HypeTorch.%0A%0APlease include:%0A- Your company name%0A- Use case description%0A- Expected request volume%0A%0AThank you!"
                  className="inline-flex items-center text-orange-400 hover:text-orange-300 font-medium"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Request API Key
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Shield className="w-6 h-6 text-blue-400 mr-2" />
                  2. Authenticate Requests
                </h3>
                <p className="text-gray-300 mb-4">
                  Include your API key in the request header for all endpoints (except health check).
                </p>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                  <code className="text-green-400 text-sm">
                    X-API-Key: your-api-key-here
                  </code>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Rate Limiting */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
              <Clock className="w-8 h-8 text-blue-400 mr-3" />
              Rate Limits
            </h2>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">60</div>
                  <div className="text-gray-300 mb-1">Requests per Minute</div>
                  <div className="text-sm text-gray-500">Standard endpoints</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">1,000</div>
                  <div className="text-gray-300 mb-1">Requests per Hour</div>
                  <div className="text-sm text-gray-500">Generous hourly limit</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">10,000</div>
                  <div className="text-gray-300 mb-1">Requests per Day</div>
                  <div className="text-sm text-gray-500">High daily allowance</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-amber-200 font-medium mb-1">Rate Limit Headers</p>
                    <p className="text-amber-100/80 text-sm">
                      All responses include rate limit information in headers: <code className="text-amber-300">X-RateLimit-Remaining-Minute</code>, 
                      <code className="text-amber-300"> X-RateLimit-Reset</code>, etc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Code Examples */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-white">Quick Examples</h2>
            
            <div className="space-y-6">
              {Object.entries(codeExamples).map(([language, code]) => (
                <div key={language} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 bg-gray-900/50 border-b border-gray-600">
                    <h3 className="font-bold text-white capitalize">{language}</h3>
                    <button
                      onClick={() => copyToClipboard(code, language)}
                      className="flex items-center space-x-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {copiedEndpoint === language ? <Check size={16} /> : <Copy size={16} />}
                      <span>{copiedEndpoint === language ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-6">
                    <pre className="text-gray-300 text-sm overflow-x-auto">
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* API Endpoints */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-white">API Endpoints</h2>
            
            <div className="space-y-8">
              {endpoints.map((endpoint, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 overflow-hidden">
                  {/* Endpoint Header */}
                  <div className="px-6 py-4 bg-gray-900/50 border-b border-gray-600">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        endpoint.method === 'GET' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-orange-400 font-mono">{endpoint.path}</code>
                      <h3 className="text-white font-bold">{endpoint.title}</h3>
                    </div>
                    <p className="text-gray-300 mt-2">{endpoint.description}</p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Parameters */}
                    {endpoint.params.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-white mb-4">Parameters</h4>
                        <div className="space-y-3">
                          {endpoint.params.map((param, paramIndex) => (
                            <div key={paramIndex} className="flex items-start space-x-4 p-4 bg-gray-900/30 rounded-lg">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center space-x-2">
                                  <code className="text-orange-400 font-mono text-sm">{param.name}</code>
                                  <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded">{param.type}</span>
                                  {param.required && (
                                    <span className="text-xs px-2 py-1 bg-red-600 text-white rounded">Required</span>
                                  )}
                                  {param.default && (
                                    <span className="text-xs text-gray-400">Default: {param.default}</span>
                                  )}
                                </div>
                                <p className="text-gray-300 text-sm mt-1">{param.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Example */}
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Example</h4>
                      <div className="space-y-4">
                        {/* Request */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-300">Request</h5>
                            <button
                              onClick={() => copyToClipboard(endpoint.example.request, `${endpoint.method}-${endpoint.path}-request`)}
                              className="flex items-center space-x-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 hover:text-white transition-colors"
                            >
                              {copiedEndpoint === `${endpoint.method}-${endpoint.path}-request` ? <Check size={12} /> : <Copy size={12} />}
                              <span>{copiedEndpoint === `${endpoint.method}-${endpoint.path}-request` ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                            <pre className="text-gray-300 text-sm overflow-x-auto">
                              <code>{endpoint.example.request}</code>
                            </pre>
                          </div>
                        </div>

                        {/* Response */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-300">Response</h5>
                            <button
                              onClick={() => copyToClipboard(JSON.stringify(endpoint.example.response, null, 2), `${endpoint.method}-${endpoint.path}-response`)}
                              className="flex items-center space-x-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 hover:text-white transition-colors"
                            >
                              {copiedEndpoint === `${endpoint.method}-${endpoint.path}-response` ? <Check size={12} /> : <Copy size={12} />}
                              <span>{copiedEndpoint === `${endpoint.method}-${endpoint.path}-response` ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                            <pre className="text-gray-300 text-sm overflow-x-auto">
                              <code>{JSON.stringify(endpoint.example.response, null, 2)}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Error Handling */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-400 mr-3" />
              Error Handling
            </h2>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700">
              <p className="text-gray-300 mb-6">
                The API uses standard HTTP response codes and returns detailed error information in a consistent format.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <h4 className="font-bold text-red-400 mb-2">Common Error Codes</h4>
                  <ul className="space-y-2 text-red-100">
                    <li><code className="text-red-300">401</code> - Missing or invalid API key</li>
                    <li><code className="text-red-300">404</code> - Entity not found</li>
                    <li><code className="text-red-300">429</code> - Rate limit exceeded</li>
                    <li><code className="text-red-300">500</code> - Internal server error</li>
                  </ul>
                </div>
                
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                  <h5 className="font-medium text-gray-300 mb-2">Error Response Format</h5>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
                    <code>{JSON.stringify({
                      status: "error",
                      error: {
                        message: "Invalid API key",
                        code: 401,
                        details: "Please check your API key and try again"
                      },
                      metadata: {
                        timestamp: 1234567890
                      }
                    }, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Support */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center justify-center">
              <Users className="w-8 h-8 text-green-400 mr-3" />
              Need Help?
            </h2>
            
            <div className="bg-gradient-to-br from-green-900/20 to-teal-900/20 p-8 rounded-xl border border-green-500/20 max-w-2xl mx-auto">
              <p className="text-gray-300 mb-6">
                Our team is here to help you integrate HypeTorch analytics into your applications. 
                Get your API key, ask technical questions, or discuss custom enterprise solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:hypetorch@gmail.com?subject=API%20Support%20Request"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg text-white font-semibold flex items-center gap-2 shadow-lg shadow-green-900/30 hover:shadow-xl hover:shadow-green-900/40 transition-all hover:scale-105"
                >
                  <Mail size={20} />
                  Contact Support
                </a>
                <a
                  href="mailto:hypetorch@gmail.com?subject=Enterprise%20API%20Solutions"
                  className="px-6 py-3 bg-transparent border border-gray-600 hover:border-green-500 rounded-lg text-gray-300 hover:text-white font-semibold flex items-center gap-2 transition-colors"
                >
                  <ArrowRight size={20} />
                  Enterprise Solutions
                </a>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}