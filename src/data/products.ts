import type { Category, ColorOption, Product } from '../types';

// Builds the 4 image paths for one colour: /images/runner-x-blue-1.svg … -4.svg
function color(productId: string, id: string, name: string, hex: string): ColorOption {
  const images = [1, 2, 3, 4].map((i) => `${import.meta.env.BASE_URL}images/${productId}-${id}-${i}.svg`);
  return { id, name, hex, images };
}

const ALL_SIZES = [38, 39, 40, 41, 42, 43, 44, 45];

export const CATEGORIES: { id: Category; name: string; description: string; image: string }[] = [
  {
    id: 'running',
    name: 'Running',
    description: 'Light and springy shoes for every pace.',
    image: `${import.meta.env.BASE_URL}images/speed-pro-lime-1.svg`,
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Everyday pairs for the city.',
    image: `${import.meta.env.BASE_URL}images/city-classic-navy-1.svg`,
  },
  {
    id: 'basketball',
    name: 'Basketball',
    description: 'High-top support for the court.',
    image: `${import.meta.env.BASE_URL}images/court-king-red-1.svg`,
  },
];

export const products: Product[] = [
  {
    id: 'runner-x',
    title: 'Runner X',
    category: 'running',
    description:
      'Light, breathable sneakers for city walks and easy runs. A soft foam sole keeps you comfortable all day, and the rubber outsole grips well in any weather.',
    features: ['Breathable mesh upper', 'Soft foam midsole', 'Weight: 260 g (size 42)', 'Drop: 8 mm'],
    price: 250,
    discountPercent: 50,
    isNew: false,
    colors: [
      color('runner-x', 'orange', 'Sunset Orange', '#e85d2a'),
      color('runner-x', 'blue', 'Ocean Blue', '#2a5ae8'),
      color('runner-x', 'green', 'Forest Green', '#2f9e44'),
      color('runner-x', 'pink', 'Berry Pink', '#b8328f'),
    ],
    sizes: ALL_SIZES,
    reviews: [
      { author: 'Jana K.', rating: 5, date: '2026-09-14', text: 'Super light. I wear them every day to work and for weekend runs.' },
      { author: 'Tomáš P.', rating: 4, date: '2026-08-02', text: 'Very comfortable, but they run a bit small. Take half a size up.' },
      { author: 'Olena M.', rating: 5, date: '2026-07-21', text: 'Bought the blue ones on sale, best price I have ever paid for running shoes.' },
    ],
  },
  {
    id: 'speed-pro',
    title: 'Speed Pro',
    category: 'running',
    description:
      'Our fastest shoe. A carbon plate and springy foam give you energy back with every step. Made for race day and tempo runs.',
    features: ['Carbon fibre plate', 'Responsive foam', 'Weight: 210 g (size 42)', 'Drop: 6 mm'],
    price: 220,
    discountPercent: 0,
    isNew: true,
    colors: [color('speed-pro', 'lime', 'Electric Lime', '#8fbf1a'), color('speed-pro', 'black', 'Night Black', '#1b1c1f')],
    sizes: [40, 41, 42, 43, 44, 45],
    reviews: [
      { author: 'Martin S.', rating: 5, date: '2026-10-05', text: 'Ran my best half marathon in these. Worth every euro.' },
      { author: 'Petra V.', rating: 5, date: '2026-09-28', text: 'Fast and surprisingly stable for a race shoe.' },
    ],
  },
  {
    id: 'trail-blazer',
    title: 'Trail Blazer',
    category: 'running',
    description:
      'Built for forest paths and mountain trails. Deep lugs bite into mud, and a water-resistant upper keeps your feet dry.',
    features: ['Water-resistant upper', '5 mm lugs for grip', 'Rock plate protection', 'Weight: 310 g (size 42)'],
    price: 160,
    discountPercent: 20,
    isNew: false,
    colors: [color('trail-blazer', 'olive', 'Moss Olive', '#6b7a3a'), color('trail-blazer', 'gray', 'Stone Gray', '#7b818c')],
    sizes: ALL_SIZES,
    reviews: [
      { author: 'Lukáš D.', rating: 4, date: '2026-08-19', text: 'Great grip in the Beskydy mountains. A bit heavy on asphalt.' },
      { author: 'Ivana R.', rating: 5, date: '2026-06-30', text: 'My feet stayed dry after a whole day in the rain.' },
    ],
  },
  {
    id: 'cloud-walk',
    title: 'Cloud Walk',
    category: 'casual',
    description: 'Your everyday pair. Extra cushioning and a slip-on fit make it the shoe you grab without thinking.',
    features: ['Slip-on design', 'Memory foam insole', 'Machine washable', 'Recycled materials'],
    price: 110,
    discountPercent: 0,
    isNew: true,
    colors: [color('cloud-walk', 'sand', 'Desert Sand', '#c8a97e'), color('cloud-walk', 'black', 'Coal Black', '#26272b')],
    sizes: ALL_SIZES,
    reviews: [
      { author: 'Kateřina B.', rating: 4, date: '2026-10-11', text: 'Like walking on pillows. The sand colour gets dirty fast though.' },
      { author: 'Andrii H.', rating: 5, date: '2026-09-02', text: 'I bought a second pair in black.' },
    ],
  },
  {
    id: 'city-classic',
    title: 'City Classic',
    category: 'casual',
    description: 'A clean, timeless sneaker that goes with jeans, chinos and even a suit. Soft leather that gets better with age.',
    features: ['Full-grain leather', 'Cupsole construction', 'Cotton laces', 'Made in Portugal'],
    price: 130,
    discountPercent: 15,
    isNew: false,
    colors: [color('city-classic', 'navy', 'Deep Navy', '#1f2f5c'), color('city-classic', 'white', 'Pure White', '#f4f4f4')],
    sizes: ALL_SIZES,
    reviews: [
      { author: 'David N.', rating: 5, date: '2026-07-07', text: 'Wore them to a wedding with a suit. Lots of compliments.' },
      { author: 'Eva S.', rating: 4, date: '2026-06-15', text: 'Need a week to break in, then perfect.' },
    ],
  },
  {
    id: 'urban-flex',
    title: 'Urban Flex',
    category: 'casual',
    description: 'Flexible knit upper that moves with your foot. Bright colours for people who like to stand out.',
    features: ['Stretch knit upper', 'Flexible sole', 'Weight: 230 g (size 42)', 'Vegan materials'],
    price: 95,
    discountPercent: 0,
    isNew: false,
    colors: [color('urban-flex', 'teal', 'Lagoon Teal', '#11897c'), color('urban-flex', 'coral', 'Living Coral', '#f06a4f')],
    sizes: [38, 39, 40, 41, 42, 43],
    reviews: [
      { author: 'Sofia L.', rating: 4, date: '2026-09-09', text: 'Love the coral colour, very soft.' },
      { author: 'Jakub M.', rating: 4, date: '2026-08-12', text: 'Good value. Not for long walks, but great for the city.' },
    ],
  },
  {
    id: 'court-king',
    title: 'Court King',
    category: 'basketball',
    description: 'High-top support for hard landings and quick cuts. A grippy herringbone outsole holds the court.',
    features: ['High-top ankle support', 'Herringbone outsole', 'Impact-absorbing heel', 'Weight: 420 g (size 42)'],
    price: 180,
    discountPercent: 10,
    isNew: false,
    colors: [color('court-king', 'red', 'Fire Red', '#d6262f'), color('court-king', 'white', 'Arena White', '#f4f4f4')],
    sizes: [41, 42, 43, 44, 45],
    reviews: [
      { author: 'Filip T.', rating: 5, date: '2026-10-01', text: 'My ankles feel safe for the first time. Great on indoor courts.' },
      { author: 'Roman K.', rating: 4, date: '2026-08-25', text: 'Solid shoe. Takes a few games to feel natural.' },
    ],
  },
  {
    id: 'sky-jump',
    title: 'Sky Jump',
    category: 'basketball',
    description: 'Bouncy cushioning in the heel and forefoot for players who live above the rim.',
    features: ['Full-length cushioning', 'Breathable upper', 'Wide base for stability', 'Weight: 390 g (size 42)'],
    price: 200,
    discountPercent: 25,
    isNew: true,
    colors: [color('sky-jump', 'purple', 'Royal Purple', '#6c3fc7'), color('sky-jump', 'yellow', 'Gold Yellow', '#e8b100')],
    sizes: [40, 41, 42, 43, 44, 45],
    reviews: [
      { author: 'Matěj H.', rating: 4, date: '2026-09-17', text: 'Very bouncy. The yellow is even brighter in real life.' },
      { author: 'Daniel P.', rating: 3, date: '2026-07-30', text: 'Comfortable, but the size runs wide for my narrow feet.' },
    ],
  },
];

// Small helpers, so pages don't repeat the same code.
export function getProductById(id: string | undefined): Product | undefined {
  return products.find((p) => p.id === id);
}

// Average of all review ratings, rounded to one decimal: 4.666 → 4.7
export function getAverageRating(product: Product): number {
  if (product.reviews.length === 0) return 0;
  const sum = product.reviews.reduce((total, review) => total + review.rating, 0);
  return Math.round((sum / product.reviews.length) * 10) / 10;
}

export function getCategoryName(id: Category): string {
  return CATEGORIES.find((c) => c.id === id)?.name ?? id;
}
