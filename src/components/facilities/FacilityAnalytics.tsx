import React, { useEffect, useMemo } from 'react';
import { School, GraduationCap, BookOpen, Award, Users, Building } from 'lucide-react';
import { useFacilityStore } from '../../stores/facilityStore';
import { FilterPanel } from '../common/FilterPanel';
import { FacilityStats } from './FacilityStats';
import { FacilityMap } from './FacilityMap';
import { FacilityTable } from './FacilityTable';
import { FacilityComparison } from './FacilityComparison';
import { ViewSelector } from './ViewSelector';

export const FacilityAnalytics = () => {
  const {
    stats,
    loading,
    filters,
    indicators,
    setFilter,
    setIndicator,
    resetFilters,
    resetIndicators,
    fetchStats
  } = useFacilityStore();

  const [activeView, setActiveView] = React.useState<'stats' | 'map' | 'table' | 'comparison'>('map');

  useEffect(() => {
    fetchStats();
  }, []);

  const filterOptions = useMemo(() => [
    {
      key: 'state',
      label: 'State',
      type: 'select' as const,
      options: [
        { value: 'Lagos', label: 'Lagos' },
        { value: 'Abuja', label: 'Abuja' }
      ],
      icon: School
    },
    {
      key: 'lga',
      label: 'LGA',
      type: 'select' as const,
      options: [
        { value: 'Ikeja', label: 'Ikeja' },
        { value: 'Surulere', label: 'Surulere' }
      ],
      icon: Building
    },
    {
      key: 'school_type',
      label: 'School Type',
      type: 'select' as const,
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'tertiary', label: 'Tertiary' }
      ],
      icon: GraduationCap
    },
    {
      key: 'school_ownership',
      label: 'School Ownership',
      type: 'select' as const,
      options: [
        { value: 'federal', label: 'Federal' },
        { value: 'state', label: 'State' },
        { value: 'private', label: 'Private' }
      ],
      icon: Users
    }
  ], []);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <FilterPanel
        title="Overview Filters"
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={setFilter}
        onReset={resetFilters}
      />

      {/* View Selector */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <ViewSelector activeView={activeView} onViewChange={setActiveView} />
      </div>

      {/* Content Views */}
      <div className="bg-white rounded-lg shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : (
          <>
            {activeView === 'stats' && stats && <FacilityStats stats={stats} />}
            {activeView === 'map' && <FacilityMap facilities={stats?.facilities_location} />}
            {activeView === 'table' && <FacilityTable facilities={stats?.facilities_location} />}
            {activeView === 'comparison' && <FacilityComparison data={stats} />}
          </>
        )}
      </div>
    </div>
  );
};