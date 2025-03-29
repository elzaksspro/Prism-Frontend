import { create } from 'zustand';
import { FilterState, ViewState, School } from '../types/dashboard';
import { mockApi } from '../lib/mockApi';

interface DashboardStore extends FilterState, ViewState {
  schools: School[];
  loading: boolean;
  setFilter: (filter: Partial<FilterState>) => void;
  resetFilters: () => void;
  setView: (view: 'map' | 'table') => void;
  fetchSchools: () => Promise<void>;
}

const initialState: FilterState & ViewState = {
  lga: '',
  state: '',
  senatorial_district: '',
  federal_constituency: '',
  year: null,
  school_type: null,
  school_ownership: null,
  currentView: 'map'
};

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  ...initialState,
  schools: [],
  loading: false,

  setFilter: (filter) => {
    set((state) => ({ ...state, ...filter }));
    get().fetchSchools();
  },

  resetFilters: () => {
    set(initialState);
    get().fetchSchools();
  },

  setView: (view) => set({ currentView: view }),

  fetchSchools: async () => {
    set({ loading: true });
    try {
      const { data } = await mockApi.schools.list();
      const state = get();
      
      let filteredSchools = data;

      if (state.lga) {
        filteredSchools = filteredSchools.filter(s => s.lga.toLowerCase().includes(state.lga.toLowerCase()));
      }
      if (state.state) {
        filteredSchools = filteredSchools.filter(s => s.state.toLowerCase().includes(state.state.toLowerCase()));
      }
      if (state.senatorial_district) {
        filteredSchools = filteredSchools.filter(s => s.senatorial_district.toLowerCase().includes(state.senatorial_district.toLowerCase()));
      }
      if (state.federal_constituency) {
        filteredSchools = filteredSchools.filter(s => s.federal_constituency.toLowerCase().includes(state.federal_constituency.toLowerCase()));
      }
      if (state.school_type) {
        filteredSchools = filteredSchools.filter(s => s.type === state.school_type);
      }
      if (state.school_ownership) {
        filteredSchools = filteredSchools.filter(s => s.ownership === state.school_ownership);
      }

      set({ schools: filteredSchools });
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      set({ loading: false });
    }
  }
}));