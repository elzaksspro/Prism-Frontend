import React from 'react';
import { Award, TrendingUp, Users, Percent } from 'lucide-react';
import { PerformanceStats as PerformanceStatsType } from '@/types/performance';

interface PerformanceStatsProps {
  stats: PerformanceStatsType;
}

export const PerformanceStats = ({ stats }: PerformanceStatsProps) => {
  const cards = [
    {
      title: 'Overall Pass Rate',
      icon: Percent,
      value: `${stats.overall_pass_rate}%`,
      details: [
        { label: 'Total Students', value: stats.total_students },
        { label: 'Passed Students', value: stats.passed_students }
      ]
    },
    {
      title: 'Top Performing Subjects',
      icon: Award,
      value: stats.top_subject,
      details: [
        { label: 'Average Score', value: `${stats.top_subject_score}%` },
        { label: 'Pass Rate', value: `${stats.top_subject_pass_rate}%` }
      ]
    },
    {
      title: 'Year-over-Year Growth',
      icon: TrendingUp,
      value: `${stats.yoy_growth}%`,
      details: [
        { label: 'Previous Year', value: `${stats.previous_year_rate}%` },
        { label: 'Current Year', value: `${stats.current_year_rate}%` }
      ]
    },
    {
      title: 'Student Demographics',
      icon: Users,
      value: stats.total_students,
      details: [
        { label: 'Male Students', value: stats.male_students },
        { label: 'Female Students', value: stats.female_students }
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
              <card.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-4">{card.value}</p>
            <div className="space-y-2">
              {card.details.map((detail) => (
                <div key={detail.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{detail.label}</span>
                  <span className="font-medium text-gray-900">{detail.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};