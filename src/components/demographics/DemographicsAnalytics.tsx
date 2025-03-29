import React, { useEffect, useMemo } from 'react';
import { School, Users, GraduationCap, Building, Heart } from 'lucide-react';
import { useDemographicsStore } from '@/stores/demographicsStore';
import { FilterPanel } from '@/components/common/FilterPanel';
import { DemographicsStats } from './DemographicsStats';
import { DemographicsTable } from './DemographicsTable';
import { DemographicsCharts } from './DemographicsCharts';
import { ViewSelector } from './ViewSelector';

export const DemographicsAnalytics = () => {
  const {
    stats,
    loading,
    filters,
    setFilter,
    resetFilters,
    fetchStats
  } = useDemographicsStore();

  const [activeView, setActiveView] = React.useState<'stats' | 'charts' | 'table'>('stats');

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
      icon: Building
    },
    {
      key: 'special_needs',
      label: 'Special Needs',
      type: 'checkbox' as const,
      icon: Heart
    },
    {
      key: 'gender_balance',
      label: 'Gender Balance',
      type: 'checkbox' as const,
      icon: Users
    }
  ], []);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <FilterPanel
        title="Demographics Filters"
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
            {activeView === 'stats' && stats && <DemographicsStats stats={stats} />}
            {activeView === 'charts' && <DemographicsCharts data={stats} />}
            {activeView === 'table' && <DemographicsTable data={stats?.school_demographics} />}
          </>
        )}
      </div>
    </div>
  );
};