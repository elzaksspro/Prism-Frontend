import React from 'react';
import { DemographicsStats } from '@/types/demographics';

interface DemographicsChartsProps {
  data?: DemographicsStats;
}

export const DemographicsCharts = ({ data }: DemographicsChartsProps) => {
  if (!data) return null;

  const genderData = {
    male: data.male_students,
    female: data.female_students
  };

  const specialNeedsData = {
    specialNeeds: data.special_needs_students,
    regular: data.total_students - data.special_needs_students
  };

  return (
    <div className="p-6 space-y-8">
      {/* Gender Distribution Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gender Distribution</h3>
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-blue-500"
            style={{ width: `${(genderData.male / data.total_students) * 100}%` }}
          />
          <div
            className="absolute h-full bg-pink-500"
            style={{
              left: `${(genderData.male / data.total_students) * 100}%`,
              width: `${(genderData.female / data.total_students) * 100}%`
            }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
            <span>Male ({((genderData.male / data.total_students) * 100).toFixed(1)}%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-pink-500 rounded-full mr-2" />
            <span>Female ({((genderData.female / data.total_students) * 100).toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      {/* Special Needs Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Special Needs Distribution</h3>
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-purple-500"
            style={{ width: `${(specialNeedsData.specialNeeds / data.total_students) * 100}%` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
            <span>
              Special Needs ({((specialNeedsData.specialNeeds / data.total_students) * 100).toFixed(1)}%)
            </span>
          </div>
          <span>{specialNeedsData.specialNeeds} students</span>
        </div>
      </div>

      {/* Class Size Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Class Size & Teacher Ratio</h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Average Class Size</p>
            <div className="flex items-end space-x-2">
              <div
                className="bg-indigo-500 rounded-t"
                style={{ height: `${Math.min(data.average_class_size * 2, 100)}px`, width: '60px' }}
              />
              <span className="text-2xl font-bold text-gray-900">{data.average_class_size}</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Student-Teacher Ratio</p>
            <div className="flex items-end space-x-2">
              <div
                className="bg-green-500 rounded-t"
                style={{ height: `${Math.min(data.student_teacher_ratio * 3, 100)}px`, width: '60px' }}
              />
              <span className="text-2xl font-bold text-gray-900">{data.student_teacher_ratio}:1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};