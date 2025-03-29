import React from 'react';
import { FacilityStats as FacilityStatsType } from '../../types/facilities';
import { Droplet, Zap, Wifi, Library, ChevronFirst as FirstAid } from 'lucide-react';

interface FacilityStatsProps {
  stats: FacilityStatsType;
}

export const FacilityStats = ({ stats }: FacilityStatsProps) => {
  const cards = [
    {
      title: 'Water Availability',
      icon: Droplet,
      value: `${stats.water_availability.total}%`,
      details: [
        { label: 'Municipal', value: stats.water_availability.by_source.municipal },
        { label: 'Borehole', value: stats.water_availability.by_source.borehole },
        { label: 'Well', value: stats.water_availability.by_source.well }
      ]
    },
    {
      title: 'Power Supply',
      icon: Zap,
      value: `${stats.power_availability.total}%`,
      details: [
        { label: 'Grid', value: stats.power_availability.by_source.grid },
        { label: 'Solar', value: stats.power_availability.by_source.solar },
        { label: 'Generator', value: stats.power_availability.by_source.generator }
      ]
    },
    {
      title: 'Internet Access',
      icon: Wifi,
      value: `${stats.internet_availability.total}%`,
      details: [
        { label: 'Fiber', value: stats.internet_availability.by_type.fiber },
        { label: 'Satellite', value: stats.internet_availability.by_type.satellite },
        { label: 'Mobile', value: stats.internet_availability.by_type.mobile }
      ]
    },
    {
      title: 'Libraries',
      icon: Library,
      value: stats.facilities.libraries,
      details: [
        { label: 'Total Schools', value: stats.total_schools },
        { label: 'Coverage', value: `${Math.round((stats.facilities.libraries / stats.total_schools) * 100)}%` }
      ]
    },
    {
      title: 'Sick Bays',
      icon: FirstAid,
      value: stats.facilities.sick_bays,
      details: [
        { label: 'Total Schools', value: stats.total_schools },
        { label: 'Coverage', value: `${Math.round((stats.facilities.sick_bays / stats.total_schools) * 100)}%` }
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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