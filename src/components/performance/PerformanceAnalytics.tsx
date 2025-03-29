import React, { useState, useEffect, useMemo } from 'react';
import { School, GraduationCap, BookOpen, Award, Users, Building } from 'lucide-react';
import { usePerformanceStore } from '@/stores/performanceStore';
import { FilterPanel } from '@/components/common/FilterPanel';
import { PerformanceStats } from './PerformanceStats';
import { PerformanceTable } from './PerformanceTable';
import { ViewSelector, PerformanceView } from './ViewSelector';
import { SubjectPerformance } from './SubjectPerformance';
import { BoardExamTrends } from './BoardExamTrends';
import { ComparisonView } from './ComparisonView';
import { PerformanceMap } from './PerformanceMap';
import { FacilityHeatMap } from '../facilities/FacilityHeatMap';

export const PerformanceAnalytics = () => {
  const {
    stats,
    loading,
    filters,
    setFilter,
    resetFilters,
    fetchStats
  } = usePerformanceStore();

  const [activeView, setActiveView] = useState<PerformanceView>('stats');
  const [metric, setMetric] = useState<'pass_rate' | 'average_score'>('pass_rate');
  const [facilityMetric, setFacilityMetric] = useState<'water' | 'power' | 'internet' | 'library' | 'sick_bay' | 'all'>('all');

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
      key: 'exam_type',
      label: 'Board Exam',
      type: 'select' as const,
      options: [
        { value: 'WAEC', label: 'WAEC' },
        { value: 'NECO', label: 'NECO' },
        { value: 'JAMB', label: 'JAMB' }
      ],
      icon: GraduationCap
    },
    {
      key: 'year',
      label: 'Year',
      type: 'select' as const,
      options: [
        { value: '2023', label: '2023' },
        { value: '2022', label: '2022' },
        { value: '2021', label: '2021' }
      ],
      icon: BookOpen
    },
    {
      key: 'subject',
      label: 'Subject',
      type: 'select' as const,
      options: [
        { value: 'Mathematics', label: 'Mathematics' },
        { value: 'English', label: 'English' },
        { value: 'Physics', label: 'Physics' },
        { value: 'Chemistry', label: 'Chemistry' },
        { value: 'Biology', label: 'Biology' }
      ],
      icon: Award
    },
    {
      key: 'school_type',
      label: 'School Type',
      type: 'select' as const,
      options: [
        { value: 'public', label: 'Public' },
        { value: 'private', label: 'Private' }
      ],
      icon: Users
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
    }
  ], []);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <FilterPanel
        title="Performance Filters"
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={(key, value) => setFilter(key, value)}
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
            {activeView === 'stats' && stats && <PerformanceStats stats={stats} />}
            {activeView === 'subjects' && <SubjectPerformance data={stats?.subject_performance} />}
            {activeView === 'trends' && <BoardExamTrends data={stats?.exam_trends} />}
            {activeView === 'comparison' && (
              <ComparisonView 
                schoolData={stats?.school_performance}
                subjectData={stats?.subject_performance}
              />
            )}
            {activeView === 'table' && <PerformanceTable data={stats?.school_performance} />}
            {activeView === 'heatmap' && (
              <div className="space-y-6 p-6">
                {/* Heat Map Controls */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Academic Performance Heat Map</h3>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setMetric('pass_rate')}
                        className={`px-4 py-2 rounded ${
                          metric === 'pass_rate' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
                        }`}
                      >
                        Pass Rate
                      </button>
                      <button
                        onClick={() => setMetric('average_score')}
                        className={`px-4 py-2 rounded ${
                          metric === 'average_score' ? 'bg-indigo-600 text-white' : 'bg-gray-100'
                        }`}
                      >
                        Average Score
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-3">Infrastructure Coverage Heat Map</h3>
                    <div className="flex space-x-4">
                      {[
                        { id: 'all', label: 'Overall' },
                        { id: 'water', label: 'Water' },
                        { id: 'power', label: 'Power' },
                        { id: 'internet', label: 'Internet' },
                        { id: 'library', label: 'Library' },
                        { id: 'sick_bay', label: 'Sick Bay' }
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() => setFacilityMetric(option.id as typeof facilityMetric)}
                          className={`px-4 py-2 rounded ${
                            facilityMetric === option.id ? 'bg-indigo-600 text-white' : 'bg-gray-100'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Heat Maps */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Academic Performance Distribution</h3>
                    <PerformanceMap metric={metric} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Infrastructure Coverage</h3>
                    <FacilityHeatMap metric={facilityMetric} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};