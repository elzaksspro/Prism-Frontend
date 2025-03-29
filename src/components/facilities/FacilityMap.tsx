import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { FacilityLocation } from '../../types/facilities';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface FacilityMapProps {
  facilities: FacilityLocation[] | undefined;
}

export const FacilityMap = ({ facilities }: FacilityMapProps) => {
  const center: [number, number] = [6.5244, 3.3792]; // Lagos coordinates

  return (
    <div className="h-[600px] w-full">
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {facilities?.map((facility) => (
          <Marker
            key={facility.id}
            position={[facility.latitude, facility.longitude]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{facility.name}</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    Water: {facility.has_water ? '✅' : '❌'}
                  </p>
                  <p>
                    Power: {facility.has_power ? '✅' : '❌'}
                  </p>
                  <p>
                    Internet: {facility.has_internet ? '✅' : '❌'}
                  </p>
                  <p>
                    Library: {facility.has_library ? '✅' : '❌'}
                  </p>
                  <p>
                    Sick Bay: {facility.has_sick_bay ? '✅' : '❌'}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};