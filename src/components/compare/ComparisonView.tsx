import React, { useState, useEffect } from 'react';
import { School, MapPin, Building, GitCompare, BarChart2, Users, Search, AlertTriangle, Droplet, Zap, Wifi, Library, ChevronFirst as FirstAid, GraduationCap, Award, UserCheck, Clock, Shield, Globe } from 'lucide-react';

interface ComparisonViewProps {
  domain: 'facilities' | 'performance' | 'demographics' | 'staff';
}

export const ComparisonView = ({ domain }: ComparisonViewProps) => {
  const [comparisonType, setComparisonType] = useState<'schools' | 'geo_zone' | 'senatorial' | 'state' | 'federal' | 'lga' | 'qa_zone'>('schools');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['pass_rate']);
  const [yearRange, setYearRange] = useState({ start: 2023, end: 2024 });
  const [searchTerm, setSearchTerm] = useState('');

  const getMetrics = () => {
    switch (domain) {
      case 'facilities':
        return [
          { id: 'water_availability', label: 'Water Availability', icon: Droplet },
          { id: 'power_supply', label: 'Power Supply', icon: Zap },
          { id: 'internet_access', label: 'Internet Access', icon: Wifi },
          { id: 'library_access', label: 'Library Access', icon: Library },
          { id: 'medical_facility', label: 'Medical Facility', icon: FirstAid }
        ];
      case 'performance':
        return [
          { id: 'pass_rate', label: 'Pass Rate', icon: Award },
          { id: 'average_score', label: 'Average Score', icon: BarChart2 },
          { id: 'completion_rate', label: 'Completion Rate', icon: GraduationCap }
        ];
      case 'demographics':
        return [
          { id: 'total_students', label: 'Total Students', icon: Users },
          { id: 'gender_ratio', label: 'Gender Ratio', icon: Users },
          { id: 'age_distribution', label: 'Age Distribution', icon: Users }
        ];
      case 'staff':
        return [
          { id: 'teacher_count', label: 'Teacher Count', icon: GraduationCap },
          { id: 'qualification_level', label: 'Qualification Level', icon: Award },
          { id: 'experience_years', label: 'Years of Experience', icon: Clock }
        ];
      default:
        return [];
    }
  };

  const renderComparisonSelector = () => (
    <div className="p-4 bg-white rounded-lg border">
      <h3 className="text-lg font-medium mb-4">Select Comparison Type</h3>
      <div className="grid grid-cols-7 gap-2">
        {[
          { id: 'schools', label: 'School', icon: School },
          { id: 'geo_zone', label: 'Geopolitical', icon: Globe },
          { id: 'senatorial', label: 'Senatorial', icon: Users },
          { id: 'state', label: 'State', icon: Building },
          { id: 'federal', label: 'Federal', icon: Building },
          { id: 'lga', label: 'LGA', icon: Building },
          { id: 'qa_zone', label: 'QA Zone', icon: Shield }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setComparisonType(id as typeof comparisonType)}
            className={`flex flex-col items-center justify-center gap-1 p-3 rounded-lg border transition-colors ${
              comparisonType === id
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Icon size={20} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderMetricSelector = () => (
    <div className="p-4 bg-white rounded-lg border">
      <h3 className="text-lg font-medium mb-4">Select Metrics</h3>
      <div className="grid grid-cols-3 gap-4">
        {getMetrics().map(metric => (
          <label key={metric.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedMetrics.includes(metric.id)}
              onChange={() => {
                setSelectedMetrics(prev =>
                  prev.includes(metric.id)
                    ? prev.filter(id => id !== metric.id)
                    : [...prev, metric.id]
                );
              }}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="flex items-center gap-2">
              <metric.icon size={16} />
              {metric.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderItemSelector = () => (
    <div className="p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${comparisonType}...`}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
        {/* Placeholder items - replace with actual data */}
        {['Item 1', 'Item 2', 'Item 3'].map((item) => (
          <button
            key={item}
            onClick={() => setSelectedItems(prev => 
              prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
            )}
            className={`p-2 text-left rounded-lg transition-colors ${
              selectedItems.includes(item)
                ? 'bg-indigo-100 text-indigo-700'
                : 'hover:bg-gray-100'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );

  const renderTimeRangeSelector = () => (
    <div className="p-4 bg-white rounded-lg border">
      <h3 className="text-lg font-medium mb-4">Select Time Range</h3>
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Year</label>
          <select
            value={yearRange.start}
            onChange={(e) => setYearRange(prev => ({ ...prev, start: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {Array.from({ length: 5 }, (_, i) => 2023 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Year</label>
          <select
            value={yearRange.end}
            onChange={(e) => setYearRange(prev => ({ ...prev, end: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {Array.from({ length: 5 }, (_, i) => 2023 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderComparisonResults = () => (
    <div className="p-4 bg-white rounded-lg border">
      {selectedItems.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Select items to compare
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                {selectedMetrics.map(metric => (
                  <th
                    key={metric}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {getMetrics().find(m => m.id === metric)?.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedItems.map(item => (
                <tr key={item}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item}
                  </td>
                  {selectedMetrics.map(metric => (
                    <td key={metric} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Placeholder - replace with actual data */}
                      -
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {renderComparisonSelector()}
      {renderMetricSelector()}
      {renderItemSelector()}
      {renderTimeRangeSelector()}
      {renderComparisonResults()}
    </div>
  );
};