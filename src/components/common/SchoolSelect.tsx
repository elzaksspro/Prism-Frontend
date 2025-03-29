import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { mockApi } from '@/lib/mockApi';

interface School {
  id: string;
  name: string;
}

interface SchoolSelectProps {
  value: string;
  onChange: (schoolId: string) => void;
  required?: boolean;
}

export const SchoolSelect = ({ value, onChange, required = false }: SchoolSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSchools = async (searchQuery: string, pageNum: number) => {
    setLoading(true);
    try {
      // In a real app, this would be paginated and filtered on the server
      const { data } = await mockApi.schools.list();
      const filteredData = data?.filter(school => 
        school.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
      
      const pageSize = 10;
      const start = (pageNum - 1) * pageSize;
      const paginatedData = filteredData.slice(start, start + pageSize);
      
      if (pageNum === 1) {
        setSchools(paginatedData);
      } else {
        setSchools(prev => [...prev, ...paginatedData]);
      }
      
      setHasMore(paginatedData.length === pageSize);
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value && !selectedSchool) {
      // Fetch selected school details if we have an ID but no school data
      const fetchSelectedSchool = async () => {
        try {
          const { data } = await mockApi.schools.getById(value);
          if (data) {
            setSelectedSchool(data);
          }
        } catch (error) {
          console.error('Error fetching selected school:', error);
        }
      };
      fetchSelectedSchool();
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setPage(1);
      fetchSchools(searchTerm, 1);
    }
  }, [searchTerm, isOpen]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchSchools(searchTerm, nextPage);
  };

  const handleSelect = (school: School) => {
    setSelectedSchool(school);
    onChange(school.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    setSelectedSchool(null);
    onChange('');
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Selected School Display / Search Input */}
      <div
        onClick={() => setIsOpen(true)}
        className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 cursor-pointer"
      >
        {selectedSchool ? (
          <div className="flex items-center justify-between">
            <span className="block truncate">{selectedSchool.name}</span>
            {!required && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X size={16} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500">
            <Search size={16} />
            <span>Search for a school...</span>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Type to search..."
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-60 overflow-auto">
            {schools.length === 0 ? (
              <div className="px-4 py-2 text-sm text-gray-500">
                {loading ? 'Loading...' : 'No schools found'}
              </div>
            ) : (
              <div>
                {schools.map((school) => (
                  <div
                    key={school.id}
                    onClick={() => handleSelect(school)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {school.name}
                  </div>
                ))}
                {hasMore && (
                  <button
                    onClick={handleLoadMore}
                    className="w-full px-4 py-2 text-sm text-indigo-600 hover:bg-gray-50 text-center"
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load more'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};