import React, { useState } from 'react';
import { PageLayout } from '../components/layouts';
import { Code, Book, Key, Zap, CheckCircle, Copy, ExternalLink, Download, Play } from 'lucide-react';

interface APIEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  title: string;
  description: string;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  responses: Response[];
  example: {
    request: string;
    response: string;
  };
}

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface RequestBody {
  type: string;
  properties: { [key: string]: { type: string; description: string; required?: boolean } };
}

interface Response {
  status: number;
  description: string;
  schema?: string;
}

interface SDK {
  id: string;
  name: string;
  language: string;
  description: string;
  installCommand: string;
  exampleCode: string;
  documentation: string;
}

const ApiDocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'authentication' | 'endpoints' | 'sdks'>('overview');
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('rides-create');
  const [copiedCode, setCopiedCode] = useState<string>('');

  const apiEndpoints: APIEndpoint[] = [
    {
      id: 'rides-create',
      method: 'POST',
      path: '/api/v1/rides',
      title: 'Create Ride',
      description: 'Create a new ride request',
      requestBody: {
        type: 'object',
        properties: {
          pickup_location: { type: 'object', description: 'Pickup location coordinates and address', required: true },
          destination: { type: 'object', description: 'Destination coordinates and address', required: true },
          ride_type: { type: 'string', description: 'Type of ride (economy, premium, luxury)', required: true },
          scheduled_time: { type: 'string', description: 'ISO 8601 datetime for scheduled rides' },
          passengers: { type: 'number', description: 'Number of passengers (1-8)', required: true }
        }
      },
      responses: [
        { status: 201, description: 'Ride created successfully', schema: 'Ride' },
        { status: 400, description: 'Invalid request parameters' },
        { status: 401, description: 'Authentication required' }
      ],
      example: {
        request: `{
  "pickup_location": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "address": "123 Main St, San Francisco, CA"
  },
  "destination": {
    "latitude": 37.7849,
    "longitude": -122.4094,
    "address": "456 Market St, San Francisco, CA"
  },
  "ride_type": "economy",
  "passengers": 2
}`,
        response: `{
  "id": "ride_123456789",
  "status": "pending",
  "pickup_location": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "address": "123 Main St, San Francisco, CA"
  },
  "destination": {
    "latitude": 37.7849,
    "longitude": -122.4094,
    "address": "456 Market St, San Francisco, CA"
  },
  "ride_type": "economy",
  "passengers": 2,
  "estimated_fare": 15.50,
  "estimated_duration": 12,
  "created_at": "2024-01-15T10:30:00Z"
}`
      }
    },
    {
      id: 'rides-get',
      method: 'GET',
      path: '/api/v1/rides/{ride_id}',
      title: 'Get Ride Details',
      description: 'Retrieve details of a specific ride',
      parameters: [
        { name: 'ride_id', type: 'string', required: true, description: 'Unique identifier for the ride' }
      ],
      responses: [
        { status: 200, description: 'Ride details retrieved successfully', schema: 'Ride' },
        { status: 404, description: 'Ride not found' },
        { status: 401, description: 'Authentication required' }
      ],
      example: {
        request: 'GET /api/v1/rides/ride_123456789',
        response: `{
  "id": "ride_123456789",
  "status": "completed",
  "driver": {
    "id": "driver_987654321",
    "name": "John Doe",
    "rating": 4.8,
    "vehicle": {
      "make": "Toyota",
      "model": "Camry",
      "license_plate": "ABC123"
    }
  },
  "pickup_location": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "address": "123 Main St, San Francisco, CA"
  },
  "destination": {
    "latitude": 37.7849,
    "longitude": -122.4094,
    "address": "456 Market St, San Francisco, CA"
  },
  "ride_type": "economy",
  "passengers": 2,
  "fare": 15.50,
  "duration": 11,
  "distance": 2.3,
  "created_at": "2024-01-15T10:30:00Z",
  "completed_at": "2024-01-15T10:41:00Z"
}`
      }
    },
    {
      id: 'rides-cancel',
      method: 'DELETE',
      path: '/api/v1/rides/{ride_id}',
      title: 'Cancel Ride',
      description: 'Cancel an existing ride request',
      parameters: [
        { name: 'ride_id', type: 'string', required: true, description: 'Unique identifier for the ride' }
      ],
      responses: [
        { status: 200, description: 'Ride cancelled successfully' },
        { status: 404, description: 'Ride not found' },
        { status: 400, description: 'Ride cannot be cancelled' }
      ],
      example: {
        request: 'DELETE /api/v1/rides/ride_123456789',
        response: `{
  "message": "Ride cancelled successfully",
  "cancellation_fee": 0.00,
  "refund_amount": 15.50
}`
      }
    },
    {
      id: 'drivers-location',
      method: 'GET',
      path: '/api/v1/drivers/nearby',
      title: 'Get Nearby Drivers',
      description: 'Find available drivers near a location',
      parameters: [
        { name: 'latitude', type: 'number', required: true, description: 'Latitude coordinate' },
        { name: 'longitude', type: 'number', required: true, description: 'Longitude coordinate' },
        { name: 'radius', type: 'number', required: false, description: 'Search radius in kilometers (default: 5)' },
        { name: 'ride_type', type: 'string', required: false, description: 'Filter by ride type' }
      ],
      responses: [
        { status: 200, description: 'Nearby drivers retrieved successfully' },
        { status: 400, description: 'Invalid coordinates' }
      ],
      example: {
        request: 'GET /api/v1/drivers/nearby?latitude=37.7749&longitude=-122.4194&radius=3',
        response: `{
  "drivers": [
    {
      "id": "driver_987654321",
      "name": "John Doe",
      "rating": 4.8,
      "location": {
        "latitude": 37.7739,
        "longitude": -122.4184
      },
      "distance": 0.2,
      "eta": 3,
      "vehicle": {
        "make": "Toyota",
        "model": "Camry",
        "license_plate": "ABC123",
        "color": "Silver"
      }
    }
  ],
  "total_count": 1
}`
      }
    }
  ];

  const sdks: SDK[] = [
    {
      id: 'javascript',
      name: 'JavaScript SDK',
      language: 'JavaScript',
      description: 'Official JavaScript/Node.js SDK for MobiRides API',
      installCommand: 'npm install @mobirides/sdk',
      documentation: 'https://docs.mobirides.com/sdk/javascript',
      exampleCode: `import { MobiRides } from '@mobirides/sdk';

const client = new MobiRides({
  apiKey: 'your_api_key_here',
  environment: 'production' // or 'sandbox'
});

// Create a ride
const ride = await client.rides.create({
  pickup_location: {
    latitude: 37.7749,
    longitude: -122.4194,
    address: '123 Main St, San Francisco, CA'
  },
  destination: {
    latitude: 37.7849,
    longitude: -122.4094,
    address: '456 Market St, San Francisco, CA'
  },
  ride_type: 'economy',
  passengers: 2
});

console.log('Ride created:', ride.id);`
    },
    {
      id: 'python',
      name: 'Python SDK',
      language: 'Python',
      description: 'Official Python SDK for MobiRides API',
      installCommand: 'pip install mobirides-sdk',
      documentation: 'https://docs.mobirides.com/sdk/python',
      exampleCode: `from mobirides import MobiRides

client = MobiRides(
    api_key='your_api_key_here',
    environment='production'  # or 'sandbox'
)

# Create a ride
ride = client.rides.create(
    pickup_location={
        'latitude': 37.7749,
        'longitude': -122.4194,
        'address': '123 Main St, San Francisco, CA'
    },
    destination={
        'latitude': 37.7849,
        'longitude': -122.4094,
        'address': '456 Market St, San Francisco, CA'
    },
    ride_type='economy',
    passengers=2
)

print(f'Ride created: {ride.id}')`
    },
    {
      id: 'php',
      name: 'PHP SDK',
      language: 'PHP',
      description: 'Official PHP SDK for MobiRides API',
      installCommand: 'composer require mobirides/sdk',
      documentation: 'https://docs.mobirides.com/sdk/php',
      exampleCode: `<?php
require_once 'vendor/autoload.php';

use MobiRides\\Client;

$client = new Client([
    'api_key' => 'your_api_key_here',
    'environment' => 'production' // or 'sandbox'
]);

// Create a ride
$ride = $client->rides->create([
    'pickup_location' => [
        'latitude' => 37.7749,
        'longitude' => -122.4194,
        'address' => '123 Main St, San Francisco, CA'
    ],
    'destination' => [
        'latitude' => 37.7849,
        'longitude' => -122.4094,
        'address' => '456 Market St, San Francisco, CA'
    ],
    'ride_type' => 'economy',
    'passengers' => 2
]);

echo 'Ride created: ' . $ride->id;`
    },
    {
      id: 'curl',
      name: 'cURL Examples',
      language: 'Shell',
      description: 'Direct HTTP API calls using cURL',
      installCommand: '# cURL is pre-installed on most systems',
      documentation: 'https://docs.mobirides.com/api/curl',
      exampleCode: `# Create a ride
curl -X POST https://api.mobirides.com/v1/rides \
  -H "Authorization: Bearer your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "pickup_location": {
      "latitude": 37.7749,
      "longitude": -122.4194,
      "address": "123 Main St, San Francisco, CA"
    },
    "destination": {
      "latitude": 37.7849,
      "longitude": -122.4094,
      "address": "456 Market St, San Francisco, CA"
    },
    "ride_type": "economy",
    "passengers": 2
  }'`
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "API Documentation - MobiRides",
    "description": "Complete API documentation for MobiRides platform. Learn how to integrate ride-sharing services into your application.",
    "url": "https://mobirides.com/api-docs",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "MobiRides API",
      "description": "RESTful API for ride-sharing platform integration",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageLayout
        title="API Documentation | MobiRides"
        description="Complete API documentation for MobiRides platform. Learn how to integrate ride-sharing services into your application."
        keywords="API documentation, REST API, ride sharing API, developer tools, SDK, integration"
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-600 p-4 rounded-full">
                  <Code className="w-12 h-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                API Documentation
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Build amazing ride-sharing experiences with our comprehensive API. 
                Get started in minutes with our SDKs and detailed documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center">
                  <Key className="w-4 h-4 mr-2" />
                  Get API Key
                </button>
                <button className="border border-gray-400 text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Try Interactive Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8" aria-label="Tabs">
              {[
                { id: 'overview', label: 'Overview', icon: Book },
                { id: 'authentication', label: 'Authentication', icon: Key },
                { id: 'endpoints', label: 'API Endpoints', icon: Code },
                { id: 'sdks', label: 'SDKs & Libraries', icon: Zap }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as 'overview' | 'authentication' | 'endpoints' | 'sdks')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'overview' && (
              <div className="space-y-16">
                {/* Getting Started */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Getting Started with MobiRides API
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                    Our RESTful API allows you to integrate ride-sharing functionality into your applications. 
                    Build custom booking experiences, manage fleets, and access real-time data.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        step: '1',
                        title: 'Get API Key',
                        description: 'Sign up for a developer account and get your API credentials'
                      },
                      {
                        step: '2',
                        title: 'Choose SDK',
                        description: 'Use our official SDKs or make direct HTTP requests'
                      },
                      {
                        step: '3',
                        title: 'Start Building',
                        description: 'Create rides, track drivers, and manage your application'
                      }
                    ].map((step, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                          {step.step}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* API Features */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      API Features
                    </h2>
                    <p className="text-lg text-gray-600">
                      Everything you need to build powerful ride-sharing applications.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        icon: <Code className="w-6 h-6" />,
                        title: 'RESTful API',
                        description: 'Clean, predictable URLs and standard HTTP methods'
                      },
                      {
                        icon: <Key className="w-6 h-6" />,
                        title: 'Secure Authentication',
                        description: 'API key and OAuth 2.0 authentication options'
                      },
                      {
                        icon: <Zap className="w-6 h-6" />,
                        title: 'Real-time Updates',
                        description: 'WebSocket connections for live ride tracking'
                      },
                      {
                        icon: <CheckCircle className="w-6 h-6" />,
                        title: 'High Availability',
                        description: '99.9% uptime SLA with global infrastructure'
                      }
                    ].map((feature, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-3">
                          <div className="text-blue-600">{feature.icon}</div>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Base URL */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Base URL</h3>
                  <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                    <div className="flex items-center justify-between">
                      <span>https://api.mobirides.com/v1</span>
                      <button
                        onClick={() => copyToClipboard('https://api.mobirides.com/v1', 'base-url')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {copiedCode === 'base-url' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    All API requests should be made to this base URL. Use the sandbox environment 
                    <code className="bg-gray-100 px-1 rounded">https://sandbox-api.mobirides.com/v1</code> for testing.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'authentication' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Authentication
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    MobiRides API uses API keys for authentication. Include your API key in the Authorization header of every request.
                  </p>
                </div>
                
                {/* API Key Authentication */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">API Key Authentication</h3>
                  <p className="text-gray-600 mb-4">
                    Include your API key in the Authorization header using the Bearer token format:
                  </p>
                  
                  <div className="bg-gray-900 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">HTTP Header</span>
                      <button
                        onClick={() => copyToClipboard('Authorization: Bearer your_api_key_here', 'auth-header')}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {copiedCode === 'auth-header' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <code className="text-green-400 font-mono text-sm">
                      Authorization: Bearer your_api_key_here
                    </code>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Key className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Getting Your API Key</h4>
                        <p className="text-blue-800 text-sm">
                          Sign up for a developer account in the MobiRides Developer Portal to get your API key. 
                          You'll receive separate keys for sandbox and production environments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rate Limits */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate Limits</h3>
                  <p className="text-gray-600 mb-4">
                    API requests are rate limited to ensure fair usage and system stability:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Standard Plan</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• 1,000 requests per hour</li>
                        <li>• 10,000 requests per day</li>
                        <li>• Burst limit: 100 requests per minute</li>
                      </ul>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Enterprise Plan</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• 10,000 requests per hour</li>
                        <li>• 100,000 requests per day</li>
                        <li>• Burst limit: 1,000 requests per minute</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Rate Limit Headers:</strong> Each response includes headers showing your current rate limit status: 
                      <code className="bg-yellow-100 px-1 rounded">X-RateLimit-Limit</code>, 
                      <code className="bg-yellow-100 px-1 rounded">X-RateLimit-Remaining</code>, and 
                      <code className="bg-yellow-100 px-1 rounded">X-RateLimit-Reset</code>.
                    </p>
                  </div>
                </div>

                {/* Error Handling */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Error Handling</h3>
                  <p className="text-gray-600 mb-4">
                    The API uses standard HTTP status codes and returns detailed error information in JSON format:
                  </p>
                  
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">Error Response Format</span>
                      <button
                        onClick={() => copyToClipboard(`{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The pickup location is required",
    "details": {
      "field": "pickup_location",
      "reason": "missing_required_field"
    }
  }
}`, 'error-format')}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {copiedCode === 'error-format' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The pickup location is required",
    "details": {
      "field": "pickup_location",
      "reason": "missing_required_field"
    }
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'endpoints' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    API Endpoints
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Explore our comprehensive API endpoints for managing rides, drivers, and more.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-4 gap-6">
                  {/* Endpoint List */}
                  <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Endpoints</h3>
                      <nav className="space-y-2">
                        {apiEndpoints.map((endpoint) => (
                          <button
                            key={endpoint.id}
                            onClick={() => setSelectedEndpoint(endpoint.id)}
                            className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                              selectedEndpoint === endpoint.id
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                                endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                                endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {endpoint.method}
                              </span>
                            </div>
                            <div className="mt-1 font-medium">{endpoint.title}</div>
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                  
                  {/* Endpoint Details */}
                  <div className="lg:col-span-3">
                    {(() => {
                      const endpoint = apiEndpoints.find(e => e.id === selectedEndpoint);
                      if (!endpoint) return null;
                      
                      return (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            <span className={`px-3 py-1 rounded text-sm font-medium ${
                              endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                              endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                              endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {endpoint.method}
                            </span>
                            <code className="text-lg font-mono text-gray-900">{endpoint.path}</code>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{endpoint.title}</h3>
                          <p className="text-gray-600 mb-6">{endpoint.description}</p>
                          
                          {/* Parameters */}
                          {endpoint.parameters && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-900 mb-3">Parameters</h4>
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="border-b border-gray-200">
                                      <th className="text-left py-2 font-medium text-gray-900">Name</th>
                                      <th className="text-left py-2 font-medium text-gray-900">Type</th>
                                      <th className="text-left py-2 font-medium text-gray-900">Required</th>
                                      <th className="text-left py-2 font-medium text-gray-900">Description</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {endpoint.parameters.map((param, index) => (
                                      <tr key={index} className="border-b border-gray-100">
                                        <td className="py-2 font-mono text-blue-600">{param.name}</td>
                                        <td className="py-2 text-gray-600">{param.type}</td>
                                        <td className="py-2">
                                          <span className={`px-2 py-1 rounded text-xs ${
                                            param.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                                          }`}>
                                            {param.required ? 'Required' : 'Optional'}
                                          </span>
                                        </td>
                                        <td className="py-2 text-gray-600">{param.description}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                          
                          {/* Request Body */}
                          {endpoint.requestBody && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-900 mb-3">Request Body</h4>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-2">Content-Type: application/json</p>
                                <div className="space-y-2">
                                  {Object.entries(endpoint.requestBody.properties).map(([key, prop]) => (
                                    <div key={key} className="flex items-center space-x-2 text-sm">
                                      <code className="text-blue-600">{key}</code>
                                      <span className="text-gray-500">({prop.type})</span>
                                      {prop.required && <span className="text-red-600 text-xs">required</span>}
                                      <span className="text-gray-600">- {prop.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Example */}
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Example</h4>
                            <div className="grid lg:grid-cols-2 gap-4">
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-2">Request</h5>
                                <div className="bg-gray-900 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-400 text-xs">Example Request</span>
                                    <button
                                      onClick={() => copyToClipboard(endpoint.example.request, `request-${endpoint.id}`)}
                                      className="text-blue-400 hover:text-blue-300"
                                    >
                                      {copiedCode === `request-${endpoint.id}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                  </div>
                                  <pre className="text-green-400 font-mono text-xs overflow-x-auto">
                                    {endpoint.example.request}
                                  </pre>
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-2">Response</h5>
                                <div className="bg-gray-900 rounded-lg p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-400 text-xs">Example Response</span>
                                    <button
                                      onClick={() => copyToClipboard(endpoint.example.response, `response-${endpoint.id}`)}
                                      className="text-blue-400 hover:text-blue-300"
                                    >
                                      {copiedCode === `response-${endpoint.id}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                  </div>
                                  <pre className="text-green-400 font-mono text-xs overflow-x-auto">
                                    {endpoint.example.response}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sdks' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    SDKs & Libraries
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Use our official SDKs to integrate MobiRides API into your applications quickly and easily.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {sdks.map((sdk) => (
                    <div key={sdk.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{sdk.name}</h3>
                          <p className="text-gray-600">{sdk.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Installation */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Installation</h4>
                        <div className="bg-gray-900 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <code className="text-green-400 font-mono text-sm">{sdk.installCommand}</code>
                            <button
                              onClick={() => copyToClipboard(sdk.installCommand, `install-${sdk.id}`)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              {copiedCode === `install-${sdk.id}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Example Code */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Example Usage</h4>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-400 text-xs">{sdk.language}</span>
                            <button
                              onClick={() => copyToClipboard(sdk.exampleCode, `code-${sdk.id}`)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              {copiedCode === `code-${sdk.id}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                          <pre className="text-green-400 font-mono text-xs overflow-x-auto">
                            {sdk.exampleCode}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Support Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our developer support team is here to help you integrate MobiRides API successfully.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Book className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
                <p className="text-gray-600 text-sm mb-4">Comprehensive guides and API reference</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  View Docs
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Code className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Code Examples</h3>
                <p className="text-gray-600 text-sm mb-4">Ready-to-use code samples and tutorials</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Browse Examples
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Zap className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Developer Support</h3>
                <p className="text-gray-600 text-sm mb-4">Get help from our technical team</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default ApiDocsPage;