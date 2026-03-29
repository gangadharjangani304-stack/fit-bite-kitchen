import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string; name: string; price: number; quantity: number; imageUrl: string; unit: string; stockQuantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (p) => {
        const items = get().items;
        const existing = items.find((i) => i._id === p._id);
        if (existing) {
          set({ items: items.map((i) => i._id === p._id ? { ...i, quantity: i.quantity + 1 } : i) });
        } else {
          set({ items: [...items, { ...p, quantity: 1 }] });
        }
      },
      removeFromCart: (id) => set({ items: get().items.filter((i) => i._id !== id) }),
      updateQuantity: (id, q) => q > 0 && set({ items: get().items.map((i) => i._id === id ? { ...i, quantity: q } : i) }),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => get().items.reduce((t, i) => t + i.price * i.quantity, 0),
    }),
    { name: 'fit-bite-cart' }
  )
);