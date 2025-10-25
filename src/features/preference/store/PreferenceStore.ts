'use client';

import { createStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { PreferenceData } from '@/features/preference/types';

export type PreferenceStore = {
  data: PreferenceData;
  setField: <K extends keyof PreferenceData>(
    key: K,
    value: PreferenceData[K],
  ) => void;
  reset: () => void;
};

const INIT_DATA: PreferenceData = {
  goal: '',
  blood_pressure: '',
  cholesterol: '',
  blood_sugar: '',
};

export function createPreferenceStore() {
  const store = createStore<PreferenceStore>()(
    persist(
      set => ({
        data: { ...INIT_DATA },
        setField: (key, value) => {
          set(state => ({
            data: { ...state.data, [key]: value },
          }));
        },
        reset: () => set({ data: { ...INIT_DATA } }),
      }),
      {
        name: 'preference-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  );

  return store;
}
