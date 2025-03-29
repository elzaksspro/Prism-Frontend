import React from 'react';
import { BarChart2, PieChart, TrendingUp, Table, GitCompare, Map } from 'lucide-react';

export type PerformanceView = 'stats' | 'subjects' | 'trends' | 'table' | 'comparison' | 'heatmap';

interface ViewSelectorProps {
  activeView: PerformanceView;
  onViewChange: (view: PerformanceView) => void;
}

export const ViewSelector = ({ activeView, onViewChange }: ViewSelectorProps) => {
  const views = [
    { id: 'stats', label: 'Overview', icon: BarChart2 },
    { id: 'subjects', label: 'Subject Analysis', icon: PieChart },
    { id: 'trends', label: 'Performance Trends', icon: TrendingUp },
    { id: 'comparison', label: 'Compare & Analyze', icon: GitCompare },
    { id: 'heatmap', label: 'Heat Maps', icon: Map },
    { id: 'table', label: 'Detailed View', icon: Table }
  ] as const;

  return (
    <div className="flex space-x-2 bg-white rounded-lg shadow-sm p-1">
      {views.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onViewChange(id as any)}
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