import React, { useState } from 'react';
import { Building, BarChart2, Users, GraduationCap } from 'lucide-react';
import { ComparisonView } from './ComparisonView';

type ComparisonDomain = 'facilities' | 'performance' | 'demographics' | 'staff';

export const CompareAnalyze = () => {
  const [domain, setDomain] = useState<ComparisonDomain>('facilities');
  
  const domainOptions = [
    { id: 'facilities', label: 'Infrastructure', icon: Building },
    { id: 'performance', label: 'Academic Performance', icon: BarChart2 },
    { id: 'demographics', label: 'Demographics', icon: Users },
    { id: 'staff', label: 'Staff & Personnel', icon: GraduationCap }
  ];

  return (
    <div className="space-y-6">
      {/* Domain Selector */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Select Analysis Domain</h2>
        <div className="flex space-x-4">
          {domainOptions.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setDomain(id as ComparisonDomain)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                domain === id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content View */}
      <div className="bg-white rounded-lg shadow-sm">
        <ComparisonView domain={domain} />
      </div>
    </div>
  );
};