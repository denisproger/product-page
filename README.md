# Stride Co. — Sneaker Shop

A multi-page sneaker shop built with **React 19, TypeScript, React Router and Vite**.

**Live demo:** https://denisproger.github.io/product-page/

## Features
- **Catalogue**: search, category and sale filters, sorting. Filters are stored in the URL, so a filtered view can be shared or bookmarked.
- **Product page**: image gallery with lightbox, colour and size selection, reviews, related products
- **Cart**: global state with the Context API, persisted in `localStorage`, quantity controls, free-shipping progress bar
- **Checkout and contact forms**: client-side validation with accessible error messages
- **Responsive**: mobile-first layout with a slide-in menu
- **Accessibility**: semantic HTML, ARIA attributes, keyboard support, visible focus states, `prefers-reduced-motion`

## Pages
| Route | Page |
| --- | --- |
| `/` | Home: hero, benefits, categories, best sellers, sale banner, new arrivals |
| `/shop` | Shop with search, filters and sorting |
| `/product/:id` | Product details |
| `/about` | Story, numbers, values, team |
| `/contact` | Contact form, shop info, FAQ |
| `/cart` | Cart |
| `/checkout` | Checkout with delivery and payment options |
| `/order-success` | Order confirmation |
| `*` | 404 page |

## Tech stack
- React 19 + TypeScript
- React Router (nested routes with a shared layout via `<Outlet />`)
- Vite
- oxlint
- Plain CSS, no UI library

## Project structure
```
src/
  components/   layout, product, cart and reusable UI components
  context/      cart context and provider
  data/         product catalogue and site content
  hooks/        useCart, useDocumentTitle
  pages/        one component per route
  utils/        price formatting, shipping rules, form validation
```

## Run locally
```bash
npm install
npm run dev
```

Production build: `npm run build`

## Deployment
Each push to `main` builds the site with GitHub Actions and deploys it to GitHub Pages. The `vercel.json` and `public/_redirects` files add SPA routing on Vercel and Netlify.
