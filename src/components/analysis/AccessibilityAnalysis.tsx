import React from 'react';
import { MapPin, Users, Clock, Bus } from 'lucide-react';

export const AccessibilityAnalysis = () => {
  const metrics = [
    {
      title: 'Average Distance',
      value: '2.5 km',
      change: '-0.3 km',
      icon: MapPin,
      trend: 'decrease'
    },
    {
      title: 'Population Coverage',
      value: '85%',
      change: '+5%',
      icon: Users,
      trend: 'increase'
    },
    {
      title: 'Travel Time',
      value: '25 min',
      change: '-3 min',
      icon: Clock,
      trend: 'decrease'
    },
    {
      title: 'Transport Access',
      value: '70%',
      change: '+10%',
      icon: Bus,
      trend: 'increase'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <metric.icon className="h-8 w-8 text-indigo-600" />
              <span className={`text-sm font-medium ${
                metric.trend === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="mt-1 text-sm text-gray-500">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distance Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distance Distribution</h3>
          <div className="space-y-4">
            {[
              { range: '0-1 km', percentage: 30 },
              { range: '1-2 km', percentage: 40 },
              { range: '2-3 km', percentage: 20 },
              { range: '3+ km', percentage: 10 }
            ].map(({ range, percentage }) => (
              <div key={range}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{range}</span>
                  <span>{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transport Coverage */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Transport Coverage</h3>
          <div className="space-y-4">
            {[
              { mode: 'Walking', coverage: 85 },
              { mode: 'Public Bus', coverage: 60 },
              { mode: 'School Bus', coverage: 40 },
              { mode: 'Private Vehicle', coverage: 30 }
            ].map(({ mode, coverage }) => (
              <div key={mode}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{mode}</span>
                  <span>{coverage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${coverage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Access Improvement Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'New School Locations',
              description: 'Identify areas with high population density and limited school access',
              priority: 'High'
            },
            {
              title: 'Transport Routes',
              description: 'Optimize school bus routes to improve coverage in underserved areas',
              priority: 'Medium'
            },
            {
              title: 'Infrastructure',
              description: 'Improve walking paths and road safety near schools',
              priority: 'High'
            }
          ].map((recommendation) => (
            <div key={recommendation.title} className="p-4 border rounded-lg">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  recommendation.priority === 'High'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {recommendation.priority}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">{recommendation.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};