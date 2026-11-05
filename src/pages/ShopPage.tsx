import { useSearchParams } from 'react-router';
import ProductGrid from '../components/product/ProductGrid';
import PageHeader from '../components/ui/PageHeader';
import { CATEGORIES, getAverageRating, products } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Product } from '../types';
import { getFinalPrice } from '../utils/formatPrice';

type SortOption = 'rating' | 'price-asc' | 'price-desc' | 'new';

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'rating', label: 'Best rated' },
  { id: 'new', label: 'Newest' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
];

const finalPrice = (p: Product) => getFinalPrice(p.price, p.discountPercent);

// Search by shoe name or colour name: "run", "orange", "navy"…
function matchesSearch(product: Product, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (q === '') return true;
  return product.title.toLowerCase().includes(q) || product.colors.some((c) => c.name.toLowerCase().includes(q));
}

// One compare function for each sort option (used with toSorted).
const SORTERS: Record<SortOption, (a: Product, b: Product) => number> = {
  rating: (a, b) => getAverageRating(b) - getAverageRating(a),
  new: (a, b) => Number(b.isNew) - Number(a.isNew),
  'price-asc': (a, b) => finalPrice(a) - finalPrice(b),
  'price-desc': (a, b) => finalPrice(b) - finalPrice(a),
};

function ShopPage() {
  useDocumentTitle('Shop');

  // All filters live in the URL: /shop?category=running&sale=1&sort=price-asc&q=run
  // So links can open the shop already filtered, and the Back button remembers the filters.
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') ?? 'all';
  const onlySale = searchParams.get('sale') === '1';
  const sortParam = searchParams.get('sort');
  // Unknown values (e.g. a mistyped link) fall back to the default, so the select never shows a blank option.
  const sort: SortOption = SORT_OPTIONS.some((o) => o.id === sortParam) ? (sortParam as SortOption) : 'rating';
  const query = searchParams.get('q') ?? '';

  // Change one filter and keep the others. An empty value removes it from the URL.
  function updateFilter(name: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value === '') next.delete(name);
    else next.set(name, value);
    setSearchParams(next, { replace: true }); // replace: don't add a history step for every letter typed
  }

  function resetFilters() {
    setSearchParams({});
  }

  const visibleProducts = products
    .filter((p) => category === 'all' || p.category === category)
    .filter((p) => !onlySale || p.discountPercent > 0)
    .filter((p) => matchesSearch(p, query))
    .toSorted(SORTERS[sort]);

  const hasFilters = category !== 'all' || onlySale || query !== '';
  const title = CATEGORIES.find((c) => c.id === category)?.name ?? 'All shoes';

  return (
    <div className="container page">
      <PageHeader title={onlySale ? `${title} on sale` : title} subtitle={`${visibleProducts.length} products`} />

      <div className="shop">
        {/* ---------- Filters (left column on desktop) ---------- */}
        <aside className="filters" aria-label="Filters">
          <div className="filters__group">
            <label htmlFor="search" className="filters__title">
              Search
            </label>
            <input
              id="search"
              type="search"
              className="field__input"
              placeholder="Name or colour…"
              value={query}
              onChange={(e) => updateFilter('q', e.target.value)}
            />
          </div>

          <fieldset className="filters__group">
            <legend className="filters__title">Category</legend>
            {[{ id: 'all', name: 'All shoes' }, ...CATEGORIES].map((c) => (
              <label key={c.id} className="radio">
                <input
                  type="radio"
                  name="category"
                  checked={category === c.id}
                  onChange={() => updateFilter('category', c.id === 'all' ? '' : c.id)}
                />
                {c.name}
              </label>
            ))}
          </fieldset>

          <fieldset className="filters__group">
            <legend className="filters__title">Price</legend>
            <label className="checkbox">
              <input type="checkbox" checked={onlySale} onChange={(e) => updateFilter('sale', e.target.checked ? '1' : '')} />
              On sale only
            </label>
          </fieldset>

          {hasFilters && (
            <button className="button button--ghost button--block" onClick={resetFilters}>
              Clear filters
            </button>
          )}
        </aside>

        {/* ---------- Results ---------- */}
        <section className="shop__results" aria-label="Products">
          <div className="shop__toolbar">
            <p className="muted" aria-live="polite">
              Showing {visibleProducts.length} of {products.length}
            </p>
            <label className="sort">
              Sort by
              <select value={sort} onChange={(e) => updateFilter('sort', e.target.value)}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {visibleProducts.length > 0 ? (
            <ProductGrid products={visibleProducts} />
          ) : (
            <div className="empty">
              <p>No shoes match your filters.</p>
              <button className="button button--primary" onClick={resetFilters}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ShopPage;
