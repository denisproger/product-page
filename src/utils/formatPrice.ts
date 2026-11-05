// 125 → "€125.00"
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(value);
}

// Price after discount: 250 with 50% off → 125
export function getFinalPrice(price: number, discountPercent: number): number {
  return price * (1 - discountPercent / 100);
}

// "2026-09-14" → "14 Sep 2026"
// "2026-09-14" is parsed as UTC midnight, so format it in UTC too.
// Otherwise visitors west of UTC would see the previous day.
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
