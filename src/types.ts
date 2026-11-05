export type Category = 'running' | 'casual' | 'basketball';

export type ColorOption = {
  id: string;
  name: string;
  hex: string;
  images: string[];
};

export type Review = {
  author: string;
  rating: number; // 1–5
  date: string; // "2026-09-14"
  text: string;
};

export type Product = {
  id: string; // also used in the URL: /product/runner-x
  title: string;
  category: Category;
  description: string;
  features: string[];
  price: number;
  discountPercent: number; // 0 = no discount
  isNew: boolean;
  colors: ColorOption[];
  sizes: number[];
  reviews: Review[];
};

export type CartItem = {
  key: string; // productId + color + size, so the same shoe in another size is a separate line
  productId: string;
  title: string;
  colorName: string;
  size: number;
  price: number;
  quantity: number;
  image: string;
};
