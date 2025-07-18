import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Theme = "dark" | "light";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  loadThemeFromStorage: (storageKey: string, defaultTheme: Theme) => void;
  resetToDefault: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light", // Default to light theme for all users
      setTheme: (theme: Theme) => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("vite-ui-theme", theme);
        set({ theme });
      },
      loadThemeFromStorage: (storageKey: string, defaultTheme: Theme) => {
        const storedTheme = (localStorage.getItem(storageKey) as Theme) || defaultTheme;
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(storedTheme);
        set({ theme: storedTheme });
      },
      resetToDefault: () => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add("light");
        localStorage.setItem("vite-ui-theme", "light");
        set({ theme: "light" });
      },
    }),
    {
      name: "theme-store", // Name of the storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
      onRehydrateStorage: () => (state) => {
        // Ensure theme is applied when store is rehydrated
        if (state?.theme) {
          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(state.theme);
        }
      },
    }
  )
);
