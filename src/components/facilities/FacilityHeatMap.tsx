import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FacilityLocation } from '@/types/facilities';

interface FacilityHeatMapProps {
  facilities?: FacilityLocation[];
  metric?: 'water' | 'power' | 'internet' | 'library' | 'sick_bay' | 'all';
}

export const FacilityHeatMap = ({ facilities = [], metric = 'all' }: FacilityHeatMapProps) => {
  const mapRef = useRef<L.Map>(null);
  const center: [number, number] = [6.5244, 3.3792]; // Lagos coordinates

  // Calculate facility score based on selected metric
  const getFacilityScore = (facility: FacilityLocation) => {
    if (metric === 'all') {
      let score = 0;
      if (facility.has_water) score += 20;
      if (facility.has_power) score += 20;
      if (facility.has_internet) score += 20;
      if (facility.has_library) score += 20;
      if (facility.has_sick_bay) score += 20;
      return score;
    }

    const metricMap = {
      water: 'has_water',
      power: 'has_power',
      internet: 'has_internet',
      library: 'has_library',
      sick_bay: 'has_sick_bay'
    };

    return facility[metricMap[metric]] ? 100 : 0;
  };

  // Get color based on facility score
  const getColor = (score: number) => {
    if (score >= 80) return '#22c55e'; // green-500
    if (score >= 60) return '#84cc16'; // lime-500
    if (score >= 40) return '#eab308'; // yellow-500
    if (score >= 20) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  useEffect(() => {
    if (mapRef.current && facilities.length > 0) {
      const bounds = L.latLngBounds(facilities.map(f => [f.latitude, f.longitude]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [facilities]);

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
        {facilities.map((facility) => {
          const score = getFacilityScore(facility);
          return (
            <Circle
              key={facility.id}
              center={[facility.latitude, facility.longitude]}
              radius={500}
              pathOptions={{
                color: getColor(score),
                fillColor: getColor(score),
                fillOpacity: 0.6
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{facility.name}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Water: {facility.has_water ? '✅' : '❌'}</p>
                    <p>Power: {facility.has_power ? '✅' : '❌'}</p>
                    <p>Internet: {facility.has_internet ? '✅' : '❌'}</p>
                    <p>Library: {facility.has_library ? '✅' : '❌'}</p>
                    <p>Sick Bay: {facility.has_sick_bay ? '✅' : '❌'}</p>
                  </div>
                </div>
              </Popup>
            </Circle>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-8 right-8 bg-white p-4 rounded-lg shadow-lg z-[1000]">
        <h4 className="font-semibold mb-2">
          {metric === 'all' ? 'Overall Facility Score' : `${metric.replace('_', ' ').toUpperCase()} Coverage`}
        </h4>
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