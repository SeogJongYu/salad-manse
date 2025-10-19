'use client';

import { createStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type PreferenceStore = {
  data: PreferenceData;
  setField: <K extends keyof PreferenceData>(
    key: K,
    value: PreferenceData[K],
  ) => void;
  reset: () => void;
};

type PreferenceData = {
  goal: string | null;
  blood_pressure: string | null;
  cholesterol: string | null;
  blood_sugar: string | null;
};

const INIT_DATA: PreferenceData = {
  goal: null,
  blood_pressure: null,
  cholesterol: null,
  blood_sugar: null,
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
