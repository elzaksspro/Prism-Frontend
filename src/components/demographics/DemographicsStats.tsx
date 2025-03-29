import React from 'react';
import { Users, UserCheck, Heart, School } from 'lucide-react';
import { DemographicsStats as DemographicsStatsType } from '@/types/demographics';

interface DemographicsStatsProps {
  stats: DemographicsStatsType;
}

export const DemographicsStats = ({ stats }: DemographicsStatsProps) => {
  const cards = [
    {
      title: 'Total Students',
      icon: Users,
      value: stats.total_students.toLocaleString(),
      details: [
        { label: 'Male Students', value: stats.male_students.toLocaleString() },
        { label: 'Female Students', value: stats.female_students.toLocaleString() }
      ]
    },
    {
      title: 'Gender Ratio',
      icon: UserCheck,
      value: `${stats.gender_ratio.toFixed(2)}:1`,
      details: [
        { label: 'Male %', value: `${((stats.male_students / stats.total_students) * 100).toFixed(1)}%` },
        { label: 'Female %', value: `${((stats.female_students / stats.total_students) * 100).toFixed(1)}%` }
      ]
    },
    {
      title: 'Special Needs',
      icon: Heart,
      value: stats.special_needs_students.toLocaleString(),
      details: [
        { label: 'Percentage', value: `${((stats.special_needs_students / stats.total_students) * 100).toFixed(1)}%` },
        { label: 'Support Staff', value: stats.special_needs_staff.toLocaleString() }
      ]
    },
    {
      title: 'School Distribution',
      icon: School,
      value: stats.total_schools.toLocaleString(),
      details: [
        { label: 'Average Class Size', value: stats.average_class_size.toFixed(0) },
        { label: 'Student-Teacher Ratio', value: `${stats.student_teacher_ratio}:1` }
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