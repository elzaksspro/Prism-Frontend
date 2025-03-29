import React from 'react';
import { MapPin, Building } from 'lucide-react';

interface FacilityFiltersProps {
  selectedState: string;
  selectedLGA: string;
  selectedFacilities: {
    water: boolean;
    power: boolean;
    internet: boolean;
    library: boolean;
    sickBay: boolean;
  };
  onStateChange: (state: string) => void;
  onLGAChange: (lga: string) => void;
  onFacilitiesChange: (facilities: any) => void;
}

export const FacilityFilters = ({
  selectedState,
  selectedLGA,
  selectedFacilities,
  onStateChange,
  onLGAChange,
  onFacilitiesChange,
}: FacilityFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              State
            </div>
          </label>
          <select
            value={selectedState}
            onChange={(e) => onStateChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All States</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <Building size={16} />
              LGA
            </div>
          </label>
          <select
            value={selectedLGA}
            onChange={(e) => onLGAChange(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All LGAs</option>
            <option value="Ikeja">Ikeja</option>
            <option value="Surulere">Surulere</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facility Indicators
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { key: 'water', label: 'Water' },
            { key: 'power', label: 'Power' },
            { key: 'internet', label: 'Internet' },
            { key: 'library', label: 'Library' },
            { key: 'sickBay', label: 'Sick Bay' }
          ].map(({ key, label }) => (
            <label
              key={key}
              className="inline-flex items-center"
            >
              <input
                type="checkbox"
                checked={selectedFacilities[key as keyof typeof selectedFacilities]}
                onChange={(e) =>
                  onFacilitiesChange({
                    ...selectedFacilities,
                    [key]: e.target.checked
                  })
                }
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};