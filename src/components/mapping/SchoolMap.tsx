import React, { useState, useCallback } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap, Polyline } from 'react-leaflet';
import { School, Users, MapPin, Ruler, Map as MapIcon, GitCompare, Building, BookOpen, Award } from 'lucide-react';
import { FilterPanel } from '../common/FilterPanel';
import 'leaflet/dist/leaflet.css';

interface SchoolMapProps {
  schools?: any[];
  showCatchment?: boolean;
  showAccessibility?: boolean;
  showDistanceMetrics?: boolean;
}

// Control component for updating map view
const MapControls = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView(position, 12);
  }, [position]);
  return null;
};

export const SchoolMap = ({
  schools = [],
  showCatchment = false,
  showAccessibility = false,
  showDistanceMetrics = false
}: SchoolMapProps) => {
  const [center] = useState<[number, number]>([6.5244, 3.3792]); // Lagos coordinates
  const [selectedMetric, setSelectedMetric] = useState<'population' | 'distance' | 'accessibility' | 'catchment'>('population');
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [filters, setFilters] = useState({
    state: '',
    lga: '',
    school_type: '',
    school_ownership: '',
    population_min: '',
    population_max: '',
    distance_max: '',
    accessibility_min: '',
    has_water: false,
    has_power: false,
    has_internet: false
  });

  const filterOptions = [
    {
      key: 'state',
      label: 'State',
      type: 'select' as const,
      options: [
        { value: 'Lagos', label: 'Lagos' },
        { value: 'Abuja', label: 'Abuja' }
      ],
      icon: Building
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
      icon: School
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
      key: 'population_min',
      label: 'Min Population',
      type: 'text' as const,
      icon: Users
    },
    {
      key: 'population_max',
      label: 'Max Population',
      type: 'text' as const,
      icon: Users
    },
    {
      key: 'distance_max',
      label: 'Max Distance (km)',
      type: 'text' as const,
      icon: Ruler
    },
    {
      key: 'accessibility_min',
      label: 'Min Accessibility Score',
      type: 'text' as const,
      icon: Award
    },
    {
      key: 'has_water',
      label: 'Has Water Supply',
      type: 'checkbox' as const,
      icon: Building
    },
    {
      key: 'has_power',
      label: 'Has Power Supply',
      type: 'checkbox' as const,
      icon: Building
    },
    {
      key: 'has_internet',
      label: 'Has Internet Access',
      type: 'checkbox' as const,
      icon: Building
    }
  ];

  const getColor = useCallback((value: number) => {
    if (value >= 80) return '#22c55e';
    if (value >= 60) return '#84cc16';
    if (value >= 40) return '#eab308';
    if (value >= 20) return '#f97316';
    return '#ef4444';
  }, []);

  const getRadius = useCallback((value: number) => {
    const baseRadius = 500;
    const scale = Math.log(value) / Math.log(10);
    return baseRadius * scale;
  }, []);

  const getMetricValue = useCallback((school: any) => {
    switch (selectedMetric) {
      case 'population':
        return school.total_students || 0;
      case 'distance':
        return school.average_distance || 0;
      case 'accessibility':
        return school.accessibility_score || 0;
      case 'catchment':
        return school.catchment_coverage || 0;
      default:
        return 0;
    }
  }, [selectedMetric]);

  const filteredSchools = schools.filter(school => {
    if (filters.state && school.state !== filters.state) return false;
    if (filters.lga && school.lga !== filters.lga) return false;
    if (filters.school_type && school.type !== filters.school_type) return false;
    if (filters.school_ownership && school.ownership !== filters.school_ownership) return false;
    if (filters.population_min && school.total_students < parseInt(filters.population_min)) return false;
    if (filters.population_max && school.total_students > parseInt(filters.population_max)) return false;
    if (filters.distance_max && school.average_distance > parseInt(filters.distance_max)) return false;
    if (filters.accessibility_min && school.accessibility_score < parseInt(filters.accessibility_min)) return false;
    if (filters.has_water && !school.has_water) return false;
    if (filters.has_power && !school.has_power) return false;
    if (filters.has_internet && !school.has_internet) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Metric Selector */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setSelectedMetric('population')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              selectedMetric === 'population'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users size={16} />
            Population Density
          </button>
          <button
            onClick={() => setSelectedMetric('distance')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              selectedMetric === 'distance'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Ruler size={16} />
            Distance Analysis
          </button>
          <button
            onClick={() => setSelectedMetric('accessibility')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              selectedMetric === 'accessibility'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MapPin size={16} />
            Accessibility
          </button>
          <button
            onClick={() => setSelectedMetric('catchment')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              selectedMetric === 'catchment'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <MapIcon size={16} />
            Catchment Areas
          </button>
        </div>
      </div>

      {/* Filters */}
      <FilterPanel
        title="Map Filters"
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
        onReset={() => setFilters({
          state: '',
          lga: '',
          school_type: '',
          school_ownership: '',
          population_min: '',
          population_max: '',
          distance_max: '',
          accessibility_min: '',
          has_water: false,
          has_power: false,
          has_internet: false
        })}
      />

      {/* Map View */}
      <div className="h-[600px] bg-white rounded-lg shadow-sm border">
        <MapContainer
          center={center}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <MapControls position={center} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          
          {filteredSchools.map((school: any) => (
            <React.Fragment key={school.id}>
              {/* School Location */}
              <Circle
                center={[school.latitude, school.longitude]}
                radius={getRadius(getMetricValue(school))}
                pathOptions={{
                  color: getColor(getMetricValue(school)),
                  fillColor: getColor(getMetricValue(school)),
                  fillOpacity: 0.6
                }}
                eventHandlers={{
                  click: () => setSelectedSchool(school)
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold">{school.name}</h3>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>Total Students: {school.total_students}</p>
                      <p>Accessibility Score: {school.accessibility_score}%</p>
                      <p>Average Distance: {school.average_distance}km</p>
                      <p>Catchment Coverage: {school.catchment_coverage}%</p>
                    </div>
                  </div>
                </Popup>
              </Circle>

              {/* Catchment Area */}
              {selectedMetric === 'catchment' && (
                <Circle
                  center={[school.latitude, school.longitude]}
                  radius={5000} // 5km radius
                  pathOptions={{
                    color: '#6366f1',
                    fillColor: '#6366f1',
                    fillOpacity: 0.1,
                    weight: 1,
                    dashArray: '5, 5'
                  }}
                />
              )}

              {/* Distance Lines */}
              {selectedMetric === 'distance' && selectedSchool?.id === school.id && (
                <Polyline
                  positions={[
                    [school.latitude, school.longitude],
                    [school.latitude + 0.01, school.longitude + 0.01] // Example route
                  ]}
                  pathOptions={{
                    color: '#6366f1',
                    weight: 3,
                    dashArray: '5, 10'
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Population Density</h3>
            <div className="space-y-1">
              {[
                { range: 'High (1000+)', color: '#22c55e' },
                { range: 'Medium (500-1000)', color: '#84cc16' },
                { range: 'Low (0-500)', color: '#ef4444' }
              ].map(({ range, color }) => (
                <div key={range} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm text-gray-600">{range}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Accessibility Score</h3>
            <div className="space-y-1">
              {[
                { range: 'Excellent (80-100%)', color: '#22c55e' },
                { range: 'Good (60-79%)', color: '#84cc16' },
                { range: 'Poor (0-59%)', color: '#ef4444' }
              ].map(({ range, color }) => (
                <div key={range} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm text-gray-600">{range}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Distance Metrics</h3>
            <div className="space-y-1">
              {[
                { label: 'Catchment Area', style: 'dashed' },
                { label: 'Walking Distance (1km)', style: 'solid' },
                { label: 'Transport Route', style: 'dotted' }
              ].map(({ label, style }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-4 h-0 border-2 border-indigo-600 ${
                    style === 'dashed' ? 'border-dashed' : 
                    style === 'dotted' ? 'border-dotted' : ''
                  }`} />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Catchment Coverage</h3>
            <div className="space-y-1">
              {[
                { range: 'High Coverage (80-100%)', color: '#22c55e' },
                { range: 'Medium Coverage (40-79%)', color: '#eab308' },
                { range: 'Low Coverage (0-39%)', color: '#ef4444' }
              ].map(({ range, color }) => (
                <div key={range} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm text-gray-600">{range}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};