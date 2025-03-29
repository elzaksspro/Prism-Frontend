import { create } from 'zustand';
import { SchoolLocation, MapFilters, CatchmentArea, AccessibilityMetrics, DistanceMetrics } from '@/types/mapping';
import { mockApi } from '@/lib/mockApi';

interface MappingStore {
  schools: SchoolLocation[];
  loading: boolean;
  filters: MapFilters;
  selectedMetric: 'population' | 'distance' | 'accessibility' | 'catchment';
  selectedSchool: SchoolLocation | null;
  catchmentAreas: Record<string, CatchmentArea>;
  accessibilityMetrics: Record<string, AccessibilityMetrics>;
  distanceMetrics: Record<string, DistanceMetrics>;
  setFilter: (key: keyof MapFilters, value: any) => void;
  resetFilters: () => void;
  setSelectedMetric: (metric: 'population' | 'distance' | 'accessibility' | 'catchment') => void;
  setSelectedSchool: (school: SchoolLocation | null) => void;
  fetchSchools: () => Promise<void>;
  fetchCatchmentArea: (schoolId: string) => Promise<void>;
  fetchAccessibilityMetrics: (schoolId: string) => Promise<void>;
  fetchDistanceMetrics: (schoolId: string) => Promise<void>;
}

const initialFilters: MapFilters = {
  state: '',
  lga: '',
  school_type: '',
  school_ownership: '',
  population_min: '',
  population_max: '',
  distance_max: '',
  accessibility_min: '',
  has_water: false,
  has_power: false,
  has_internet: false
};

export const useMappingStore = create<MappingStore>((set, get) => ({
  schools: [],
  loading: false,
  filters: initialFilters,
  selectedMetric: 'population',
  selectedSchool: null,
  catchmentAreas: {},
  accessibilityMetrics: {},
  distanceMetrics: {},

  setFilter: (key, value) => {
    set(state => ({
      filters: {
        ...state.filters,
        [key]: value
      }
    }));
    get().fetchSchools();
  },

  resetFilters: () => {
    set({ filters: initialFilters });
    get().fetchSchools();
  },

  setSelectedMetric: (metric) => {
    set({ selectedMetric: metric });
  },

  setSelectedSchool: (school) => {
    set({ selectedSchool: school });
    if (school) {
      get().fetchCatchmentArea(school.id);
      get().fetchAccessibilityMetrics(school.id);
      get().fetchDistanceMetrics(school.id);
    }
  },

  fetchSchools: async () => {
    set({ loading: true });
    try {
      const { data } = await mockApi.schools.list();
      set({ schools: data });
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchCatchmentArea: async (schoolId: string) => {
    try {
      const { data } = await mockApi.schools.getCatchmentArea(schoolId);
      set(state => ({
        catchmentAreas: {
          ...state.catchmentAreas,
          [schoolId]: data
        }
      }));
    } catch (error) {
      console.error('Error fetching catchment area:', error);
    }
  },

  fetchAccessibilityMetrics: async (schoolId: string) => {
    try {
      const { data } = await mockApi.schools.getAccessibilityMetrics(schoolId);
      set(state => ({
        accessibilityMetrics: {
          ...state.accessibilityMetrics,
          [schoolId]: data
        }
      }));
    } catch (error) {
      console.error('Error fetching accessibility metrics:', error);
    }
  },

  fetchDistanceMetrics: async (schoolId: string) => {
    try {
      const { data } = await mockApi.schools.getDistanceMetrics(schoolId);
      set(state => ({
        distanceMetrics: {
          ...state.distanceMetrics,
          [schoolId]: data
        }
      }));
    } catch (error) {
      console.error('Error fetching distance metrics:', error);
    }
  }
}));