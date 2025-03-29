import React, { useState, useMemo, useEffect } from 'react';
import { School, MapPin, Users, BookOpen, TrendingUp, Search } from 'lucide-react';
import { SchoolPerformanceData, SubjectPerformanceData } from '@/types/performance';

interface ComparisonViewProps {
  schoolData?: SchoolPerformanceData[];
  subjectData?: SubjectPerformanceData[];
}

type ComparisonLevel = 'schools' | 'regions' | 'subjects' | 'demographics';
type RegionType = 'state' | 'lga' | 'senatorial' | 'federal';

// Define metrics array
const metrics = [
  { id: 'pass_rate', label: 'Pass Rate', category: 'performance' },
  { id: 'average_score', label: 'Average Score', category: 'performance' },
  { id: 'total_students', label: 'Total Students', category: 'performance' },
  { id: 'gender_ratio', label: 'Gender Ratio', category: 'demographics' },
  { id: 'age_distribution', label: 'Age Distribution', category: 'demographics' },
  { id: 'special_needs_ratio', label: 'Special Needs Ratio', category: 'demographics' }
];

export const ComparisonView = ({ schoolData = [], subjectData = [] }: ComparisonViewProps) => {
  const [comparisonLevel, setComparisonLevel] = useState<ComparisonLevel>('schools');
  const [regionType, setRegionType] = useState<RegionType>('state');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['pass_rate']);
  const [yearRange, setYearRange] = useState({ start: 2023, end: 2023 });
  const [examTypes, setExamTypes] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [availableItems, setAvailableItems] = useState<Array<{id: string; name: string; type: string}>>([]);

  // Add new state for regions
  const [regions, setRegions] = useState<Record<RegionType, Set<string>>>({
    state: new Set(),
    lga: new Set(),
    senatorial: new Set(),
    federal: new Set()
  });

  // Initialize regions from school data
  useEffect(() => {
    const newRegions: Record<RegionType, Set<string>> = {
      state: new Set(),
      lga: new Set(),
      senatorial: new Set(),
      federal: new Set()
    };

    schoolData.forEach(school => {
      // Only add regions if the properties exist
      if (school.state) newRegions.state.add(school.state);
      if (school.lga) newRegions.lga.add(school.lga);
      if (school.senatorial_district) newRegions.senatorial.add(school.senatorial_district);
      if (school.federal_constituency) newRegions.federal.add(school.federal_constituency);
    });

    setRegions(newRegions);
  }, [schoolData]);

  // Calculate available items based on comparison level
  useEffect(() => {
    let items: Array<{id: string; name: string; type: string}> = [];
    
    switch (comparisonLevel) {
      case 'schools':
        items = schoolData
          .filter(school => school.school_name) // Only include schools with names
          .map(school => ({
            id: school.school_name,
            name: school.school_name,
            type: 'school'
          }));
        break;
      case 'regions':
        // Get regions based on selected type
        const selectedRegions = Array.from(regions[regionType] || []);
        items = selectedRegions.map(region => ({
          id: region,
          name: region,
          type: regionType
        }));
        break;
      case 'subjects':
        items = subjectData
          .filter(subject => subject.name) // Only include subjects with names
          .map(subject => ({
            id: subject.name,
            name: subject.name,
            type: 'subject'
          }));
        break;
      case 'demographics':
        items = [
          { id: 'gender', name: 'Gender Distribution', type: 'demographic' },
          { id: 'age', name: 'Age Groups', type: 'demographic' },
          { id: 'special_needs', name: 'Special Needs', type: 'demographic' }
        ];
        break;
    }
    setAvailableItems(items);
  }, [comparisonLevel, regionType, schoolData, subjectData, regions]);

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return availableItems;
    return availableItems.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableItems, searchTerm]);

  // Calculate metrics safely
  const calculateMetrics = (itemId: string) => {
    const metrics: Record<string, number | string> = {};
    
    if (comparisonLevel === 'schools') {
      const schoolMetrics = schoolData.find(s => s.school_name === itemId);
      if (schoolMetrics) {
        metrics.pass_rate = schoolMetrics.pass_rate || 0;
        metrics.average_score = schoolMetrics.average_score || 0;
        metrics.total_students = schoolMetrics.total_students || 0;
      }
    } else if (comparisonLevel === 'subjects') {
      const subjectMetrics = subjectData.find(s => s.name === itemId);
      if (subjectMetrics) {
        metrics.pass_rate = subjectMetrics.pass_rate || 0;
        metrics.average_score = subjectMetrics.average_score || 0;
        metrics.total_students = subjectMetrics.total_students || 0;
      }
    }

    return metrics;
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderComparisonLevelSelector = () => (
    <div className="flex space-x-2 p-4 bg-gray-50 rounded-lg">
      {[
        { id: 'schools', label: 'School-to-School', icon: School },
        { id: 'regions', label: 'Regional', icon: MapPin },
        { id: 'subjects', label: 'Subject Analysis', icon: BookOpen },
        { id: 'demographics', label: 'Demographics', icon: Users }
      ].map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setComparisonLevel(id as ComparisonLevel)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            comparisonLevel === id
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );

  const renderRegionTypeSelector = () => (
    comparisonLevel === 'regions' && (
      <div className="flex space-x-2 p-4 bg-white rounded-lg border">
        {[
          { id: 'state', label: 'State Level' },
          { id: 'lga', label: 'LGA Level' },
          { id: 'senatorial', label: 'Senatorial District' },
          { id: 'federal', label: 'Federal Constituency' }
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setRegionType(id as RegionType)}
            className={`px-4 py-2 rounded-lg ${
              regionType === id
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    )
  );

  const renderItemSelector = () => (
    <div className="p-4 bg-white rounded-lg border">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${comparisonLevel}...`}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemSelect(item.id)}
            className={`p-2 text-left rounded-lg transition-colors ${
              selectedItems.includes(item.id)
                ? 'bg-indigo-100 text-indigo-700'
                : 'hover:bg-gray-100'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );

  const renderMetricSelector = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-white rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Performance Metrics</h3>
        <div className="space-y-2">
          {metrics
            .filter(m => m.category === 'performance')
            .map(metric => (
              <label key={metric.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric.id)}
                  onChange={() => {
                    setSelectedMetrics(prev =>
                      prev.includes(metric.id)
                        ? prev.filter(id => id !== metric.id)
                        : [...prev, metric.id]
                    );
                  }}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{metric.label}</span>
              </label>
            ))}
        </div>
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <h3 className="text-lg font-medium mb-4">Demographic Metrics</h3>
        <div className="space-y-2">
          {metrics
            .filter(m => m.category === 'demographics')
            .map(metric => (
              <label key={metric.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric.id)}
                  onChange={() => {
                    setSelectedMetrics(prev =>
                      prev.includes(metric.id)
                        ? prev.filter(id => id !== metric.id)
                        : [...prev, metric.id]
                    );
                  }}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span>{metric.label}</span>
              </label>
            ))}
        </div>
      </div>
    </div>
  );

  const renderTimeRangeSelector = () => (
    <div className="p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Year</label>
          <select
            value={yearRange.start}
            onChange={(e) => setYearRange(prev => ({ ...prev, start: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {Array.from({ length: 5 }, (_, i) => 2023 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Year</label>
          <select
            value={yearRange.end}
            onChange={(e) => setYearRange(prev => ({ ...prev, end: Number(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {Array.from({ length: 5 }, (_, i) => 2023 - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderComparisonResults = () => {
    if (selectedItems.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          Select items to compare
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {comparisonLevel === 'schools' ? 'School' : 'Region'}
              </th>
              {selectedMetrics.map(metric => (
                <th
                  key={metric}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {metrics.find(m => m.id === metric)?.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedItems.map(item => {
              const itemMetrics = calculateMetrics(item);
              
              return (
                <tr key={item}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item}
                  </td>
                  {selectedMetrics.map(metric => (
                    <td key={metric} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {itemMetrics[metric] ?? '-'}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6">
      {renderComparisonLevelSelector()}
      {renderRegionTypeSelector()}
      {renderItemSelector()}
      {renderMetricSelector()}
      {renderTimeRangeSelector()}
      {renderComparisonResults()}
    </div>
  );
};