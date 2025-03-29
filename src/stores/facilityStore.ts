import { create } from 'zustand';
import { FacilityStats } from '../types/facilities';
import { SchoolType, SchoolOwnership } from '../types/dashboard';
import { mockApi } from '../lib/mockApi';

interface FacilityFilters {
  state: string;
  lga: string;
  senatorial_district: string;
  federal_constituency: string;
  school_type: SchoolType | '';
  school_ownership: SchoolOwnership | '';
}

interface FacilityIndicators {
  water: boolean;
  power: boolean;
  internet: boolean;
  library: boolean;
  sickBay: boolean;
}

interface FacilityStore {
  stats: FacilityStats | null;
  loading: boolean;
  filters: FacilityFilters;
  indicators: FacilityIndicators;
  setFilter: (key: keyof FacilityFilters, value: any) => void;
  setIndicator: (key: keyof FacilityIndicators, value: boolean) => void;
  resetFilters: () => void;
  resetIndicators: () => void;
  fetchStats: () => Promise<void>;
}

const initialFilters: FacilityFilters = {
  state: '',
  lga: '',
  senatorial_district: '',
  federal_constituency: '',
  school_type: '',
  school_ownership: ''
};

const initialIndicators: FacilityIndicators = {
  water: true,
  power: true,
  internet: true,
  library: true,
  sickBay: true
};

// Create a simple debounce function
const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const useFacilityStore = create<FacilityStore>((set, get) => {
  // Create a debounced version of fetchStats
  const debouncedFetchStats = debounce(async () => {
    const { filters } = get();
    set({ loading: true });
    try {
      const { data } = await mockApi.facilities.getStats(filters.state, filters.lga);
      set({ stats: data });
    } catch (error) {
      console.error('Error fetching facility stats:', error);
    } finally {
      set({ loading: false });
    }
  }, 500); // 500ms delay

  return {
    stats: null,
    loading: false,
    filters: initialFilters,
    indicators: initialIndicators,

    setFilter: (key, value) => {
      set(state => ({
        filters: {
          ...state.filters,
          [key]: value
        }
      }));
      // Use the debounced version to fetch stats
      debouncedFetchStats();
    },

    setIndicator: (key, value) => {
      set(state => ({
        indicators: {
          ...state.indicators,
          [key]: value
        }
      }));
    },

    resetFilters: () => {
      set({ filters: initialFilters });
      debouncedFetchStats();
    },

    resetIndicators: () => {
      set({ indicators: initialIndicators });
    },

    fetchStats: async () => {
      const { filters } = get();
      set({ loading: true });
      try {
        const { data } = await mockApi.facilities.getStats(filters.state, filters.lga);
        set({ stats: data });
      } catch (error) {
        console.error('Error fetching facility stats:', error);
      } finally {
        set({ loading: false });
      }
    }
  };
});