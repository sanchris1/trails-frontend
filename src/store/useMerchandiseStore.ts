import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartType {
  id: string;
  image: string;
  price: string;
  category: string;
  slug: string;
  name: string;
  quantity: number;
}

interface ShopCartContextType {
  items: CartType[];
  addToCart: (
    merchandise: Omit<CartType, "quantity">,
    quantity: number,
  ) => void;
  removeFromCart: (merchandiseId: string) => void;
  clearCart: () => void;
  increaseQuantity: (merchandiseId: string) => void;
  decreaseQuantity: (merchandiseId: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<ShopCartContextType>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (merchandise) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === merchandise.id,
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === merchandise.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          } else {
            return {
              items: [...state.items, { ...merchandise, quantity: 1 }],
            };
          }
        });
      },

      removeFromCart: (merchandiseId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== merchandiseId),
        }));
      },
      increaseQuantity: (merchandiseId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === merchandiseId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }));
      },

      decreaseQuantity: (merchandiseId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === merchandiseId
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item,
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },
      isCartOpen: false,
      setIsCartOpen: (isOpen: boolean) => set({ isCartOpen: isOpen }),
    }),
    { name: "cart-storage" },
  ),
);
