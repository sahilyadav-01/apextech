import { create } from 'zustand';
import type { QuoteItem } from '../types';

interface CartState {
  items: QuoteItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (productId, quantity = 1) =>
    set((state) => {
      const existingIndex = state.items.findIndex((i) => i.productId === productId);
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += quantity;
        return { items: newItems };
      }
      return { items: [...state.items, { productId, quantity }] };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    })),
  clearCart: () => set({ items: [] }),
}));
