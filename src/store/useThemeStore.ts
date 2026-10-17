import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { applyPaletteToDocument, type ThemeMode } from '@/theme/palette';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      setMode: (mode) => {
        applyPaletteToDocument(mode);
        set({ mode });
      },
      toggle: () => get().setMode(get().mode === 'light' ? 'dark' : 'light'),
    }),
    {
      name: 'sana-theme',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => applyPaletteToDocument(state?.mode ?? 'light'),
    },
  ),
);
