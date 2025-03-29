import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { FacilityLocation } from '../../types/facilities';

interface FacilityTableProps {
  facilities: FacilityLocation[] | undefined;
}

export const FacilityTable = ({ facilities }: FacilityTableProps) => {
  const [sortField, setSortField] = useState<keyof FacilityLocation>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof FacilityLocation) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedFacilities = facilities?.slice().sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;

    if (typeof aValue === 'boolean') {
      return direction * (aValue === bValue ? 0 : aValue ? -1 : 1);
    }
    
    if (typeof aValue === 'string') {
      return direction * aValue.localeCompare(bValue as string);
    }

    return direction * ((aValue as number) - (bValue as number));
  });

  const exportToCSV = () => {
    if (!facilities?.length) return;

    const headers = [
      'Name',
      'Latitude',
      'Longitude',
      'Water',
      'Power',
      'Internet',
      'Library',
      'Sick Bay',
      'All Facilities'
    ];

    const csvContent = [
      headers.join(','),
      ...facilities.map(f => [
        `"${f.name}"`,
        f.latitude,
        f.longitude,
        f.has_water,
        f.has_power,
        f.has_internet,
        f.has_library,
        f.has_sick_bay,
        f.has_all_facilities
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'facility_data.csv';
    link.click();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Facility Data</h3>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: 'name', label: 'Name' },
                { key: 'latitude', label: 'Latitude' },
                { key: 'longitude', label: 'Longitude' },
                { key: 'has_water', label: 'Water' },
                { key: 'has_power', label: 'Power' },
                { key: 'has_internet', label: 'Internet' },
                { key: 'has_library', label: 'Library' },
                { key: 'has_sick_bay', label: 'Sick Bay' }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof FacilityLocation)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    {label}
                    {sortField === key && (
                      <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedFacilities?.map((facility) => (
              <tr key={facility.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {facility.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {facility.latitude.toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {facility.longitude.toFixed(4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {facility.has_water ? '✅' : '❌'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {facility.has_power ? '✅' : '❌'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {facility.has_internet ? '✅' : '❌'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {facility.has_library ? '✅' : '❌'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {facility.has_sick_bay ? '✅' : '❌'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};