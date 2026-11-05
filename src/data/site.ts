// Content for the static pages (About, Contact, Home).
// Keeping text in one file makes the page components shorter and easier to read.

export const SHOP = {
  name: 'Stride Co.',
  email: 'hello@stride.example',
  phone: '+420 500 123 456',
  address: 'Masarykova 12, 602 00 Brno, Czech Republic',
  hours: [
    { days: 'Monday – Friday', time: '10:00 – 19:00' },
    { days: 'Saturday', time: '10:00 – 16:00' },
    { days: 'Sunday', time: 'Closed' },
  ],
};

export const FREE_SHIPPING_FROM = 150;

export const BENEFITS = [
  { icon: '🚚', title: 'Free shipping', text: `On all orders over €${FREE_SHIPPING_FROM}.` },
  { icon: '↩️', title: '30-day returns', text: 'Changed your mind? Send them back for free.' },
  { icon: '👟', title: 'Try in store', text: 'Visit our shop in Brno and find your size.' },
  { icon: '🌱', title: 'Made responsibly', text: 'Recycled materials in every new model.' },
];

// Used both in the FAQ and on every product page.
export const DELIVERY_TEXT =
  'Standard delivery takes 2–4 working days in the Czech Republic and 4–7 days to the rest of the EU. Express delivery arrives the next working day.';
export const RETURNS_TEXT = 'You have 30 days to return unworn shoes in the original box. Returns and exchanges are free.';

export const FAQ = [
  {
    question: 'How long does delivery take?',
    answer: DELIVERY_TEXT,
  },
  {
    question: 'How do I choose the right size?',
    answer: 'Our shoes use EU sizes. If you are between two sizes, choose the bigger one. You can also visit our shop in Brno and try them on.',
  },
  {
    question: 'Can I return or exchange shoes?',
    answer: `Yes. ${RETURNS_TEXT}`,
  },
  {
    question: 'Which payment methods do you accept?',
    answer: 'Card payment online, bank transfer and cash on delivery.',
  },
];

export const TEAM = [
  { name: 'Anna Novak', role: 'Founder & designer', initials: 'AN' },
  { name: 'Marek Dvořák', role: 'Head of product', initials: 'MD' },
  { name: 'Iryna Koval', role: 'Customer care', initials: 'IK' },
];

export const VALUES = [
  { title: 'Comfort first', text: 'Every model is tested by real runners and walkers for at least 300 km before it goes on sale.' },
  { title: 'Fair prices', text: 'We sell directly, without middlemen, so good shoes cost less.' },
  { title: 'Built to last', text: 'Strong materials and a free repair service for the first year.' },
];

export const STATS = [
  { value: '2019', label: 'Founded in Brno' },
  { value: '40 000+', label: 'Happy customers' },
  { value: '8', label: 'Models in the collection' },
  { value: '4.6 ★', label: 'Average rating' },
];
