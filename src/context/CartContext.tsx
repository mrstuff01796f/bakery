'use client';

import { createContext, useContext, ReactNode } from 'react';
import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  bakery: string;
  location: string;
  expiresAt: string;
  image: string;
  category: string;
}

interface CartStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (product) => {
    set((state) => ({
      items: [...state.items, product]
    }));
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter(item => item.id !== productId)
    }));
  },
  clearCart: () => {
    set({ items: [] });
  },
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price, 0);
  },
  getItemCount: () => {
    const { items } = get();
    return items.length;
  }
}));

const CartContext = createContext<CartStore | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider value={useCartStore()}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
