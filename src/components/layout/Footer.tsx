import { Link } from 'react-router';
import { CATEGORIES } from '../../data/products';
import { SHOP } from '../../data/site';
import NewsletterForm from '../ui/NewsletterForm';

// Calculated once when the file loads, not on every render.
const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link to="/" className="logo logo--light">
            stride<span>.</span>
          </Link>
          <p className="footer__text">Comfortable sneakers designed in Brno. Free shipping on orders over €150.</p>
        </div>

        <div>
          <h2 className="footer__title">Shop</h2>
          <ul className="footer__links">
            <li>
              <Link to="/shop">All shoes</Link>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/shop?category=${c.id}`}>{c.name}</Link>
              </li>
            ))}
            <li>
              <Link to="/shop?sale=1">Sale</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Company</h2>
          <ul className="footer__links">
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/contact#faq">FAQ</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Newsletter</h2>
          <p className="footer__text">New models and sales, once a month. No spam.</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {YEAR} {SHOP.name} · {SHOP.address}
        </p>
        <p>Demo project built with React + TypeScript</p>
      </div>
    </footer>
  );
}

export default Footer;
