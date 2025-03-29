import { create } from 'zustand';
import { DemographicsStats, DemographicsFilters } from '@/types/demographics';

interface DemographicsStore {
  stats: DemographicsStats | null;
  loading: boolean;
  filters: DemographicsFilters;
  setFilter: (key: keyof DemographicsFilters, value: any) => void;
  resetFilters: () => void;
  fetchStats: () => Promise<void>;
}

const initialFilters: DemographicsFilters = {
  state: '',
  school_type: '',
  school_ownership: '',
  special_needs: false,
  gender_balance: false
};

const mockStats: DemographicsStats = {
  total_students: 25000,
  male_students: 12500,
  female_students: 12500,
  gender_ratio: 1,
  special_needs_students: 750,
  special_needs_staff: 50,
  total_schools: 100,
  average_class_size: 30,
  student_teacher_ratio: 20,
  school_demographics: [
    {
      school_id: '1',
      school_name: 'Central High School',
      total_students: 1200,
      male_students: 600,
      female_students: 600,
      special_needs_students: 30,
      average_age: 15,
      class_size: 30,
      teachers: 60,
      year: 2024
    }
    // Add more mock data as needed
  ]
};

export const useDemographicsStore = create<DemographicsStore>((set) => ({
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
      console.error('Error fetching demographics stats:', error);
    } finally {
      set({ loading: false });
    }
  }
}));