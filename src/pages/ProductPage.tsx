import { useState } from 'react';
import { Link, useParams } from 'react-router';
import Gallery from '../components/product/Gallery';
import ProductGrid from '../components/product/ProductGrid';
import ProductInfo from '../components/product/ProductInfo';
import Reviews from '../components/product/Reviews';
import Accordion from '../components/ui/Accordion';
import BackButton from '../components/ui/BackButton';
import { getCategoryName, getProductById, products } from '../data/products';
import { DELIVERY_TEXT, RETURNS_TEXT } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import type { Product } from '../types';
import NotFoundPage from './NotFoundPage';

function ProductPage() {
  // useParams reads the ":id" part of the address /product/:id
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) {
    return <NotFoundPage message="We couldn't find this product. It may have been removed." />;
  }

  // key={product.id}: when you open another product, its state starts fresh (first colour, no size).
  return <ProductDetails key={product.id} product={product} />;
}

// A separate component, because hooks (useState) can't be called after the "if (!product) return" above.
function ProductDetails({ product }: { product: Product }) {
  useDocumentTitle(product.title);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  // "You may also like": other shoes from the same category.
  const related = products.filter((p) => p.category === product.category && p.id !== product.id);

  return (
    <div className="container page">
      <div className="product-top">
        <BackButton fallback="/shop" label="Back to shop" />
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/shop">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/shop?category=${product.category}`}>{getCategoryName(product.category)}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.title}</span>
        </nav>
      </div>

      <div className="product">
        {/* key: when the colour changes, the gallery starts again from photo 1 */}
        <Gallery key={selectedColor.id} images={selectedColor.images} alt={`${product.title}, ${selectedColor.name}`} />
        <div>
          <ProductInfo product={product} selectedColor={selectedColor} onColorChange={setSelectedColor} />
          <Accordion
            items={[
              {
                title: 'Product details',
                content: (
                  <ul className="check-list">
                    {product.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                ),
              },
              { title: 'Delivery', content: <p>{DELIVERY_TEXT}</p> },
              { title: 'Returns', content: <p>{RETURNS_TEXT}</p> },
            ]}
          />
        </div>
      </div>

      <Reviews product={product} />

      {related.length > 0 && (
        <section className="section">
          <h2 className="section__title">You may also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}

export default ProductPage;
