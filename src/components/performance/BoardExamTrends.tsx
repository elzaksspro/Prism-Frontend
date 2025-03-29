import React from 'react';
import { ExamTrendData } from '@/types/performance';

interface BoardExamTrendsProps {
  data?: ExamTrendData[];
}

export const BoardExamTrends = ({ data = [] }: BoardExamTrendsProps) => {
  const years = [...new Set(data.map(d => d.year))].sort();
  const examTypes = [...new Set(data.map(d => d.exam_type))];

  return (
    <div className="p-6">
      <div className="space-y-8">
        {examTypes.map(examType => (
          <div key={examType} className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">{examType} Performance Trends</h3>
            
            {/* Trend Chart */}
            <div className="relative h-80">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-600">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              {/* Chart grid */}
              <div className="absolute left-12 right-0 top-0 bottom-0">
                <div className="h-full flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} className="border-b border-gray-200 h-1/4" />
                  ))}
                </div>
              </div>

              {/* Bars */}
              <div className="absolute left-12 right-0 top-0 bottom-0 flex items-end justify-around px-4">
                {data
                  .filter(d => d.exam_type === examType)
                  .sort((a, b) => a.year - b.year)
                  .map((item) => (
                    <div
                      key={item.year}
                      className="relative flex flex-col items-center group"
                      style={{ width: '60px' }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2">
                        <div>Pass Rate: {item.pass_rate}%</div>
                        <div>Students: {item.total_students}</div>
                      </div>

                      {/* Bar */}
                      <div className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t transition-all duration-300 hover:bg-indigo-500"
                           style={{ height: `${item.pass_rate}%` }}>
                      </div>

                      {/* Year Label */}
                      <div className="mt-2 text-sm text-gray-600">{item.year}</div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Average Pass Rate</div>
                <div className="text-lg font-semibold">
                  {Math.round(
                    data
                      .filter(d => d.exam_type === examType)
                      .reduce((acc, curr) => acc + curr.pass_rate, 0) /
                    data.filter(d => d.exam_type === examType).length
                  )}%
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Highest Pass Rate</div>
                <div className="text-lg font-semibold">
                  {Math.max(
                    ...data
                      .filter(d => d.exam_type === examType)
                      .map(d => d.pass_rate)
                  )}%
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Latest Pass Rate</div>
                <div className="text-lg font-semibold">
                  {data
                    .filter(d => d.exam_type === examType)
                    .sort((a, b) => b.year - a.year)[0]?.pass_rate}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};