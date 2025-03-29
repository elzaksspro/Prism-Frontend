import React, { useState } from 'react';
import { Download, ArrowUpDown } from 'lucide-react';
import { SchoolPerformanceData } from '@/types/performance';

interface PerformanceTableProps {
  data?: SchoolPerformanceData[];
}

export const PerformanceTable = ({ data = [] }: PerformanceTableProps) => {
  const [sortField, setSortField] = useState<keyof SchoolPerformanceData>('school_name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof SchoolPerformanceData) => {
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
      'Exam Type',
      'Total Students',
      'Pass Rate',
      'Average Score',
      'Year'
    ];

    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.school_name,
        row.exam_type,
        row.total_students,
        row.pass_rate,
        row.average_score,
        row.year
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'performance_data.csv';
    link.click();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">School Performance Data</h3>
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
                { key: 'exam_type', label: 'Exam' },
                { key: 'total_students', label: 'Students' },
                { key: 'pass_rate', label: 'Pass Rate' },
                { key: 'average_score', label: 'Avg Score' },
                { key: 'year', label: 'Year' }
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key as keyof SchoolPerformanceData)}
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
                  {row.exam_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.total_students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    row.pass_rate >= 70
                      ? 'bg-green-100 text-green-800'
                      : row.pass_rate >= 50
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {row.pass_rate}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.average_score}%
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