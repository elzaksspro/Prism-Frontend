import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SchoolPerformanceData } from '@/types/performance';

interface PerformanceMapProps {
  data?: SchoolPerformanceData[];
  metric?: 'pass_rate' | 'average_score';
}

export const PerformanceMap = ({ data = [], metric = 'pass_rate' }: PerformanceMapProps) => {
  const mapRef = useRef<L.Map>(null);
  const center: [number, number] = [6.5244, 3.3792]; // Lagos coordinates

  // Calculate color based on performance value
  const getColor = (value: number) => {
    if (value >= 80) return '#22c55e'; // green-500
    if (value >= 60) return '#84cc16'; // lime-500
    if (value >= 40) return '#eab308'; // yellow-500
    if (value >= 20) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  // Calculate radius based on total students
  const getRadius = (totalStudents: number) => {
    const baseRadius = 500;
    const scale = Math.log(totalStudents) / Math.log(10);
    return baseRadius * scale;
  };

  useEffect(() => {
    if (mapRef.current && data.length > 0) {
      const bounds = L.latLngBounds(data.map(school => [school.latitude, school.longitude]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [data]);

  return (
    <div className="h-[600px] w-full">
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {data.map((school) => (
          <Circle
            key={school.id}
            center={[school.latitude, school.longitude]}
            radius={getRadius(school.total_students)}
            pathOptions={{
              color: getColor(metric === 'pass_rate' ? school.pass_rate : school.average_score),
              fillColor: getColor(metric === 'pass_rate' ? school.pass_rate : school.average_score),
              fillOpacity: 0.6
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{school.school_name}</h3>
                <p className="text-sm text-gray-600">
                  {metric === 'pass_rate' ? 'Pass Rate' : 'Average Score'}: {metric === 'pass_rate' ? school.pass_rate : school.average_score}%
                </p>
                <p className="text-sm text-gray-600">Total Students: {school.total_students}</p>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg z-[1000]">
        <h4 className="font-semibold mb-2">Performance Levels</h4>
        <div className="space-y-2">
          {[
            { range: '80-100%', color: '#22c55e' },
            { range: '60-79%', color: '#84cc16' },
            { range: '40-59%', color: '#eab308' },
            { range: '20-39%', color: '#f97316' },
            { range: '0-19%', color: '#ef4444' }
          ].map(({ range, color }) => (
            <div key={range} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-sm">{range}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};