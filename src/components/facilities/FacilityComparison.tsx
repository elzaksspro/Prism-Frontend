import React, { useState, useMemo } from 'react';
import { School, MapPin, Building, GitCompare } from 'lucide-react';
import { FacilityStats } from '@/types/facilities';

interface FacilityComparisonProps {
  data: FacilityStats | null;
}

type ComparisonType = 'schools' | 'regions' | 'facilities';
type RegionType = 'state' | 'lga' | 'district';

export const FacilityComparison = ({ data }: FacilityComparisonProps) => {
  const [comparisonType, setComparisonType] = useState<ComparisonType>('schools');
  const [regionType, setRegionType] = useState<RegionType>('state');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['water', 'power', 'internet']);

  const metrics = [
    { id: 'water', label: 'Water Availability' },
    { id: 'power', label: 'Power Supply' },
    { id: 'internet', label: 'Internet Access' },
    { id: 'library', label: 'Library' },
    { id: 'sick_bay', label: 'Sick Bay' }
  ];

  const calculateMetrics = (itemId: string) => {
    if (!data?.facilities_location) return {};
    
    const facility = data.facilities_location.find(f => f.id === itemId);
    if (!facility) return {};

    return {
      water: facility.has_water ? 'Yes' : 'No',
      power: facility.has_power ? 'Yes' : 'No',
      internet: facility.has_internet ? 'Yes' : 'No',
      library: facility.has_library ? 'Yes' : 'No',
      sick_bay: facility.has_sick_bay ? 'Yes' : 'No'
    };
  };

  const renderComparisonTypeSelector = () => (
    <div className="flex space-x-2 p-4 bg-gray-50 rounded-lg">
      {[
        { id: 'schools', label: 'School-to-School', icon: School },
        { id: 'regions', label: 'Regional', icon: MapPin },
        { id: 'facilities', label: 'Facility Types', icon: Building }
      ].map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setComparisonType(id as ComparisonType)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            comparisonType === id
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );

  const renderMetricSelector = () => (
    <div className="p-4 bg-white rounded-lg border">
      <h3 className="text-lg font-medium mb-4">Facility Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map(metric => (
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
            <span>{metric.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderComparisonResults = () => {
    if (selectedItems.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          Select items to compare
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                School
              </th>
              {selectedMetrics.map(metric => (
                <th
                  key={metric}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {metrics.find(m => m.id === metric)?.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedItems.map(item => {
              const itemMetrics = calculateMetrics(item);
              const facility = data?.facilities_location?.find(f => f.id === item);
              
              return (
                <tr key={item}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {facility?.name}
                  </td>
                  {selectedMetrics.map(metric => (
                    <td key={metric} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {itemMetrics[metric] ?? '-'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {renderComparisonTypeSelector()}
      {renderMetricSelector()}
      {renderComparisonResults()}
    </div>
  );
};