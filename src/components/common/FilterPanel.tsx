import React from 'react';
import { FilterX } from 'lucide-react';

interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'checkbox';
  options?: { value: string; label: string }[];
  icon?: React.ElementType;
}

interface FilterPanelProps {
  title?: string;
  filters: Record<string, any>;
  filterOptions: FilterOption[];
  onFilterChange: (key: string, value: any) => void;
  onReset: () => void;
  className?: string;
}

export const FilterPanel = ({
  title = 'Filters',
  filters,
  filterOptions,
  onFilterChange,
  onReset,
  className = ''
}: FilterPanelProps) => {
  const renderFilterInput = (option: FilterOption) => {
    switch (option.type) {
      case 'select':
        return (
          <select
            value={filters[option.key] || ''}
            onChange={(e) => onFilterChange(option.key, e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All {option.label}s</option>
            {option.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={filters[option.key]}
              onChange={(e) => onFilterChange(option.key, e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">{option.label}</span>
          </div>
        );
      
      default:
        return (
          <input
            type="text"
            value={filters[option.key] || ''}
            onChange={(e) => onFilterChange(option.key, e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder={`Enter ${option.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          onClick={onReset}
          className="text-gray-600 hover:text-gray-800 flex items-center gap-1"
        >
          <FilterX size={16} />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterOptions.map((option) => (
          option.type === 'checkbox' ? (
            <div key={option.key}>
              {renderFilterInput(option)}
            </div>
          ) : (
            <div key={option.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center gap-2">
                  {option.icon && <option.icon size={16} />}
                  {option.label}
                </div>
              </label>
              {renderFilterInput(option)}
            </div>
          )
        ))}
      </div>
    </div>
  );
};