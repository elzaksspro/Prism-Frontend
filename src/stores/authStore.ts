import { create } from 'zustand';
import { AuthState, AuthStore } from '../types/auth';
import { mockApi } from '../lib/mockApi';

const initialState: AuthState = {
  user: {
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
    created_at: new Date().toISOString()
  },
  session: { access_token: 'mock_token' },
  loading: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  signIn: async (email: string, password: string) => {
    const { data, error } = await mockApi.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    set({ user: data.user, session: data.session });
  },

  signOut: async () => {
    await mockApi.auth.signOut();
    set({ user: null, session: null });
  },

  setSession: (session) => set({ session }),
  setUser: (user) => set({ user }),
}));