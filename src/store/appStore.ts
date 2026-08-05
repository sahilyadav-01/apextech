import { create } from 'zustand';
import type { Product, QuoteRequest } from '../types';
import { mockProducts } from '../data/mockData';

interface AppState {
  customProducts: Product[];
  quotes: QuoteRequest[];
  products: Product[]; // Cached merged array
  searchQuery: string;
  addCustomProduct: (product: Product) => void;
  deleteCustomProduct: (id: string) => void;
  addQuoteRequest: (quote: Omit<QuoteRequest, 'id' | 'date' | 'status'>) => void;
  setSearchQuery: (query: string) => void;
  getAllProducts: () => Product[];
}

// Load initial states from LocalStorage safely
const getLocalData = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const initialCustom = getLocalData<Product[]>('is_custom_products', []);

const mergeProducts = (custom: Product[]): Product[] => {
  const merged = [...mockProducts];
  custom.forEach((cp) => {
    const idx = merged.findIndex((p) => p.id === cp.id);
    if (idx > -1) {
      merged[idx] = cp;
    } else {
      merged.push(cp);
    }
  });
  return merged;
};

export const useAppStore = create<AppState>((set, get) => ({
  customProducts: initialCustom,
  quotes: getLocalData<QuoteRequest[]>('is_quotes', []),
  products: mergeProducts(initialCustom),
  searchQuery: '',

  addCustomProduct: (product) =>
    set((state) => {
      const updatedCustom = [...state.customProducts, product];
      localStorage.setItem('is_custom_products', JSON.stringify(updatedCustom));
      return { 
        customProducts: updatedCustom,
        products: mergeProducts(updatedCustom)
      };
    }),

  deleteCustomProduct: (id) =>
    set((state) => {
      const updatedCustom = state.customProducts.filter((p) => p.id !== id);
      localStorage.setItem('is_custom_products', JSON.stringify(updatedCustom));
      return { 
        customProducts: updatedCustom,
        products: mergeProducts(updatedCustom)
      };
    }),

  addQuoteRequest: (quoteData) =>
    set((state) => {
      const newQuote: QuoteRequest = {
        ...quoteData,
        id: `RFQ-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
      };
      const updated = [newQuote, ...state.quotes];
      localStorage.setItem('is_quotes', JSON.stringify(updated));
      return { quotes: updated };
    }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),

  getAllProducts: () => get().products,
}));
