import { createContext } from 'react';
import type { CartItem } from '../types';

// Everything the rest of the app can do with the cart.
export type CartContextValue = {
  items: CartItem[];
  itemsCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, 'key'>) => void;
  changeQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

// The "box" that holds the cart. It is empty (null) until CartProvider fills it.
export const CartContext = createContext<CartContextValue | null>(null);
