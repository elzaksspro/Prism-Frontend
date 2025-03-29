import React from 'react';
import { Users, School, TrendingUp, Map } from 'lucide-react';

export const CatchmentAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Population',
            value: '125,000',
            change: '+5.2%',
            icon: Users
          },
          {
            title: 'School-Age Children',
            value: '28,500',
            change: '+3.8%',
            icon: School
          },
          {
            title: 'Enrollment Rate',
            value: '92%',
            change: '+2.1%',
            icon: TrendingUp
          },
          {
            title: 'Coverage Area',
            value: '45 km²',
            change: '0%',
            icon: Map
          }
        ].map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <stat.icon className="h-8 w-8 text-indigo-600" />
              <span className="text-sm font-medium text-green-600">
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Demographic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Age Distribution</h3>
          <div className="space-y-4">
            {[
              { age: '5-10 years', count: 12500 },
              { age: '11-14 years', count: 8500 },
              { age: '15-18 years', count: 7500 }
            ].map(({ age, count }) => (
              <div key={age}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{age}</span>
                  <span>{count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${(count / 12500) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">School Capacity vs Demand</h3>
          <div className="space-y-4">
            {[
              { school: 'Primary Schools', capacity: 15000, enrollment: 14200 },
              { school: 'Junior Secondary', capacity: 10000, enrollment: 9800 },
              { school: 'Senior Secondary', capacity: 8000, enrollment: 7500 }
            ].map(({ school, capacity, enrollment }) => (
              <div key={school}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{school}</span>
                  <span>{Math.round((enrollment / capacity) * 100)}% Utilized</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      (enrollment / capacity) > 0.9 ? 'bg-red-600' : 'bg-green-600'
                    }`}
                    style={{ width: `${(enrollment / capacity) * 100}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {enrollment.toLocaleString()} / {capacity.toLocaleString()} students
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Future Projections */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">5-Year Growth Projections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              metric: 'Population Growth',
              current: '125,000',
              projected: '138,000',
              growth: '+10.4%'
            },
            {
              metric: 'School-Age Population',
              current: '28,500',
              projected: '32,000',
              growth: '+12.3%'
            },
            {
              metric: 'Required Capacity',
              current: '30,000',
              projected: '35,000',
              growth: '+16.7%'
            }
          ].map((projection) => (
            <div key={projection.metric} className="space-y-2">
              <h4 className="font-medium text-gray-900">{projection.metric}</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Current</span>
                <span className="font-medium">{projection.current}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Projected</span>
                <span className="font-medium">{projection.projected}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Growth</span>
                <span className="text-green-600 font-medium">{projection.growth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Planning Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Capacity Expansion',
              description: 'Plan for 15% capacity increase in high-growth areas',
              priority: 'High'
            },
            {
              title: 'New Facilities',
              description: 'Identify locations for 2 new primary schools by 2026',
              priority: 'Medium'
            },
            {
              title: 'Resource Allocation',
              description: 'Adjust staffing and resource distribution based on projected growth',
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