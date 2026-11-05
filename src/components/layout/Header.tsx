import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useCart } from '../../hooks/useCart';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemsCount } = useCart();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <button
          className="header__burger"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          ☰
        </button>

        <Link to="/" className="logo">
          stride<span>.</span>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Main">
          <button className="nav__close" onClick={closeMenu} aria-label="Close menu">
            ✕
          </button>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                {/* NavLink adds the "active" class when its page is open.
                    "end" on "/" means: active only on the home page itself. */}
                <NavLink to={link.to} end={link.to === '/'} className="nav__link" onClick={closeMenu}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        {isMenuOpen && <div className="overlay" onClick={closeMenu} />}

        <Link to="/cart" className="header__cart" aria-label={`Cart, ${itemsCount} items`}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6h15l-1.5 9h-12z" />
            <path d="M6 6 5 3H2" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>
          {itemsCount > 0 && <span className="header__badge">{itemsCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
