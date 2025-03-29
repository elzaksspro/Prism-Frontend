import { create } from 'zustand';
import { ComparisonFilters, PerformanceStats } from '@/types/performance';

interface PerformanceStore {
  stats: PerformanceStats | null;
  loading: boolean;
  filters: ComparisonFilters;
  setFilter: (key: keyof ComparisonFilters, value: string) => void;
  resetFilters: () => void;
  fetchStats: () => Promise<void>;
}

const initialFilters: ComparisonFilters = {
  state: '',
  exam_type: '',
  year: '',
  subject: '',
  school_type: '',
  school_ownership: ''
};

const mockStats: PerformanceStats = {
  overall_pass_rate: 75,
  total_students: 5000,
  passed_students: 3750,
  top_subject: 'Mathematics',
  top_subject_score: 82,
  top_subject_pass_rate: 85,
  yoy_growth: 5.2,
  previous_year_rate: 71,
  current_year_rate: 75,
  male_students: 2600,
  female_students: 2400,
  school_performance: [
    {
      school_name: 'Central High School',
      exam_type: 'WAEC',
      total_students: 250,
      pass_rate: 78,
      average_score: 72,
      year: 2023
    },
    // Add more mock data as needed
  ],
  subject_performance: [
    {
      name: 'Mathematics',
      pass_rate: 85,
      total_students: 5000,
      average_score: 82,
      highest_score: 98,
      lowest_score: 45,
      grade_distribution: {
        'A': 25,
        'B': 35,
        'C': 25,
        'D': 10,
        'F': 5
      }
    },
    // Add more subjects
  ],
  exam_trends: [
    {
      year: 2023,
      exam_type: 'WAEC',
      pass_rate: 75,
      total_students: 5000
    },
    // Add more trend data
  ]
};

export const usePerformanceStore = create<PerformanceStore>((set) => ({
  stats: null,
  loading: false,
  filters: initialFilters,

  setFilter: (key, value) => {
    set(state => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    }));
  },

  resetFilters: () => {
    set({ filters: initialFilters });
  },

  fetchStats: async () => {
    set({ loading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ stats: mockStats });
    } catch (error) {
      console.error('Error fetching performance stats:', error);
    } finally {
      set({ loading: false });
    }
  }
}));