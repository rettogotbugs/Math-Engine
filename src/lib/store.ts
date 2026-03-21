import { create } from "zustand";
import { persist } from "zustand/middleware";

type HistoryItem = {
  id: string;
  toolId: string;
  toolName: string;
  inputs: Record<string, string>;
  result: string;
  timestamp: number;
};

type AppState = {
  favorites: string[];
  history: HistoryItem[];
  toggleFavorite: (toolId: string) => void;
  addHistory: (item: Omit<HistoryItem, "id" | "timestamp">) => void;
  clearHistory: () => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      history: [],
      toggleFavorite: (toolId) =>
        set((state) => ({
          favorites: state.favorites.includes(toolId)
            ? state.favorites.filter((id) => id !== toolId)
            : [...state.favorites, toolId],
        })),
      addHistory: (item) =>
        set((state) => ({
          history: [
            {
              ...item,
              id: Math.random().toString(36).substring(7),
              timestamp: Date.now(),
            },
            ...state.history,
          ].slice(0, 50), // Keep last 50
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "math-engine-storage",
    },
  ),
);
