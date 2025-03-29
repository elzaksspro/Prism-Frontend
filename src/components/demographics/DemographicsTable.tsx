import React, { useState } from 'react';
import { Download, ArrowUpDown } from 'lucide-react';
import { SchoolDemographics } from '@/types/demographics';

interface DemographicsTableProps {
  data?: SchoolDemographics[];
}

export const DemographicsTable = ({ data = [] }: DemographicsTableProps) => {
  const [sortField, setSortField] = useState<keyof SchoolDemographics>('school_name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof SchoolDemographics) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction * (aValue - bValue);
    }
    return direction * String(aValue).localeCompare(String(bValue));
  });

  const exportToCSV = () => {
    if (!data.length) return;

    const headers = [
      'School Name',
      'Total Students',
      'Male Students',
      'Female Students',
      'Special Needs Students',
      'Average Age',
      'Class Size',
      'Teachers',
      'Year'
    ];

    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.school_name,
        row.total_students,
        row.male_students,
        row.female_students,
        row.special_needs_students,
        row.average_age,
        row.class_size,
        row.teachers,
        row.year
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'demographics_data.csv';
    link.click();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">School Demographics Data</h3>
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
                { key: 'school_name', label: 'School' },
                { key: 'total_students', label: 'Total Students' },
                { key: 'male_students', label: 'Male' },
                { key: 'female_students', label: 'Female' },
                { key: 'special_needs_students', label: 'Special Needs' },
                { key: 'average_age', label: 'Avg Age' },
                { key: 'class_size', label: 'Class Size' },
                { key: 'teachers', label: 'Teachers' },
                { key: 'year', label: 'Year' }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof SchoolDemographics)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-1">
                    {label}
                    <ArrowUpDown size={14} className="text-gray-400" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.school_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.total_students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.male_students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.female_students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.special_needs_students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.average_age}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.class_size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.teachers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};