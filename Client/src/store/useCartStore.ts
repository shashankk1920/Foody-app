import { create } from "zustand";
import {createJSONStorage, persist} from "zustand/middleware"

interface CartState {
  count: number;
  increment: () => void;
}

export const useCartStore = create<CartState>()(persist(
  (set) => ({
    count: 0,
    increment: () => {
      set((state) => ({ count: state.count + 1 }));
    },
  }),
  {
    name: 'cart-name',
    storage: createJSONStorage(() => localStorage),
  }
));
