import { Link } from 'react-router';
import ProductGrid from '../components/product/ProductGrid';
import { CATEGORIES, getAverageRating, products } from '../data/products';
import { BENEFITS } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

function HomePage() {
  useDocumentTitle('Comfortable sneakers from Brno');

  // Best sellers = the 4 products with the best rating.
  const bestSellers = products.toSorted((a, b) => getAverageRating(b) - getAverageRating(a)).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew);
  const biggestDiscount = Math.max(...products.map((p) => p.discountPercent));

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__text">
            <p className="eyebrow">Autumn collection 2026</p>
            <h1 className="hero__title">
              Shoes that keep up <span>with your day</span>
            </h1>
            <p className="hero__lead">
              Light, comfortable sneakers for running, the city and the court. Designed and tested in Brno.
            </p>
            <div className="hero__buttons">
              <Link to="/shop" className="button button--primary button--large">
                Shop now
              </Link>
              <Link to="/about" className="button button--ghost button--large">
                Our story
              </Link>
            </div>
          </div>
          <div className="hero__image">
            <img src={`${import.meta.env.BASE_URL}images/runner-x-orange-2.svg`} alt="Runner X sneaker in Sunset Orange" />
          </div>
        </div>
      </section>

      {/* ---------- Benefits ---------- */}
      <section className="container section--tight">
        <ul className="benefits">
          {BENEFITS.map((benefit) => (
            <li key={benefit.title} className="benefit">
              <span className="benefit__icon" aria-hidden="true">
                {benefit.icon}
              </span>
              <div>
                <h2 className="benefit__title">{benefit.title}</h2>
                <p className="muted">{benefit.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Categories ---------- */}
      <section className="container section">
        <div className="section__head">
          <h2 className="section__title">Shop by category</h2>
          <Link to="/shop" className="link-arrow">
            All shoes →
          </Link>
        </div>
        <ul className="categories">
          {CATEGORIES.map((category) => (
            <li key={category.id}>
              <Link to={`/shop?category=${category.id}`} className="category-card">
                <img src={category.image} alt="" />
                <div className="category-card__text">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Best sellers ---------- */}
      <section className="container section">
        <div className="section__head">
          <h2 className="section__title">Best sellers</h2>
          <Link to="/shop?sort=rating" className="link-arrow">
            See all →
          </Link>
        </div>
        <ProductGrid products={bestSellers} />
      </section>

      {/* ---------- Sale banner ---------- */}
      <section className="container section">
        <div className="promo">
          <div>
            <p className="eyebrow eyebrow--light">Autumn sale</p>
            <h2 className="promo__title">Up to {biggestDiscount}% off selected models</h2>
            <p>Only while sizes last. Free returns as always.</p>
          </div>
          <Link to="/shop?sale=1" className="button button--light button--large">
            Shop the sale
          </Link>
        </div>
      </section>

      {/* ---------- New arrivals ---------- */}
      <section className="container section">
        <div className="section__head">
          <h2 className="section__title">New arrivals</h2>
          <Link to="/shop?sort=new" className="link-arrow">
            See all →
          </Link>
        </div>
        <ProductGrid products={newArrivals} />
      </section>
    </>
  );
}

export default HomePage;
