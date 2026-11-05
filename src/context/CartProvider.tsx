import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types';
import { CartContext } from './cartContext';

const STORAGE_KEY = 'cart';

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.key === 'string' &&
    typeof item.productId === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0
  );
}

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = saved ? JSON.parse(saved) : [];
    // Old or hand-edited data could be anything: keep only valid cart lines.
    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return []; // broken data or storage blocked: start with an empty cart
  }
}

// Wrap the app in this component, and every page inside can use the cart.
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  // Save the cart every time it changes, so it survives a page reload.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Derived values: calculated from items, never stored separately.
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addItem(newItem: Omit<CartItem, 'key'>) {
    const key = `${newItem.productId}-${newItem.colorName}-${newItem.size}`;

    setItems((current) => {
      const existing = current.find((item) => item.key === key);

      // Same shoe, colour and size already in the cart: only increase the quantity.
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + newItem.quantity } : item,
        );
      }
      return [...current, { ...newItem, key }];
    });
  }

  function changeQuantity(key: string, quantity: number) {
    setItems((current) => current.map((item) => (item.key === key ? { ...item, quantity } : item)));
  }

  function removeItem(key: string) {
    setItems((current) => current.filter((item) => item.key !== key));
  }

  // useCallback keeps the same function between renders,
  // so the order page can safely use it in a useEffect dependency list.
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider value={{ items, itemsCount, subtotal, addItem, changeQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
