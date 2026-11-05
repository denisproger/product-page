import { FREE_SHIPPING_FROM } from '../data/site';

export type DeliveryMethod = 'standard' | 'express';

export const DELIVERY_OPTIONS: { id: DeliveryMethod; name: string; time: string }[] = [
  { id: 'standard', name: 'Standard delivery', time: '2–4 working days' },
  { id: 'express', name: 'Express delivery', time: 'Next working day' },
];

// Standard is free from €150, otherwise €4.90. Express always costs €14.90.
export function getShippingPrice(subtotal: number, method: DeliveryMethod): number {
  if (method === 'express') return 14.9;
  return subtotal >= FREE_SHIPPING_FROM ? 0 : 4.9;
}
