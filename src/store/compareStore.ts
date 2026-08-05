import { create } from 'zustand';

interface CompareState {
  selectedIds: string[];
  addItem: (productId: string) => boolean; // returns success
  removeItem: (productId: string) => void;
  clear: () => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  selectedIds: [],
  addItem: (productId) => {
    const { selectedIds } = get();
    if (selectedIds.includes(productId)) return true;
    if (selectedIds.length >= 4) return false;
    set({ selectedIds: [...selectedIds, productId] });
    return true;
  },
  removeItem: (productId) =>
    set((state) => ({
      selectedIds: state.selectedIds.filter((id) => id !== productId),
    })),
  clear: () => set({ selectedIds: [] }),
}));
