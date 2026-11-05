import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

// Custom hook: any component calls useCart() and gets the cart.
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return context;
}
