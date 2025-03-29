import React from 'react';
import { SubjectPerformanceData } from '@/types/performance';

interface SubjectPerformanceProps {
  data?: SubjectPerformanceData[];
}

export const SubjectPerformance = ({ data = [] }: SubjectPerformanceProps) => {
  return (
    <div className="p-6">
      <div className="space-y-6">
        {data.map((subject) => (
          <div key={subject.name} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">{subject.name}</h3>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                subject.pass_rate >= 70
                  ? 'bg-green-100 text-green-800'
                  : subject.pass_rate >= 50
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {subject.pass_rate}% Pass Rate
              </span>
            </div>
            
            <div className="mt-4 space-y-4">
              {/* Grade Distribution Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Grade Distribution</span>
                  <span>Total Students: {subject.total_students}</span>
                </div>
                <div className="flex h-4 rounded-full overflow-hidden">
                  {Object.entries(subject.grade_distribution).map(([grade, percentage]) => (
                    <div
                      key={grade}
                      style={{ width: `${percentage}%` }}
                      className={`${
                        grade === 'A' ? 'bg-green-500' :
                        grade === 'B' ? 'bg-blue-500' :
                        grade === 'C' ? 'bg-yellow-500' :
                        grade === 'D' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      title={`${grade}: ${percentage}%`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  {Object.entries(subject.grade_distribution).map(([grade, percentage]) => (
                    <span key={grade}>{grade}: {percentage}%</span>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Average Score</div>
                  <div className="text-lg font-semibold">{subject.average_score}%</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Highest Score</div>
                  <div className="text-lg font-semibold">{subject.highest_score}%</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Lowest Score</div>
                  <div className="text-lg font-semibold">{subject.lowest_score}%</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};