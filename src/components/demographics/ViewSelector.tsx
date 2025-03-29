import React from 'react';
import { BarChart2, Table, PieChart } from 'lucide-react';

interface ViewSelectorProps {
  activeView: 'stats' | 'charts' | 'table';
  onViewChange: (view: 'stats' | 'charts' | 'table') => void;
}

export const ViewSelector = ({ activeView, onViewChange }: ViewSelectorProps) => {
  const views = [
    { id: 'stats', label: 'Overview', icon: BarChart2 },
    { id: 'charts', label: 'Analysis', icon: PieChart },
    { id: 'table', label: 'Detailed View', icon: Table }
  ] as const;

  return (
    <div className="flex space-x-2 bg-white rounded-lg shadow-sm p-1">
      {views.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeView === id
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );
};