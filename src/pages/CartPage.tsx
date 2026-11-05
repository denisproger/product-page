import { Link } from 'react-router';
import CartRow from '../components/cart/CartRow';
import OrderSummary from '../components/cart/OrderSummary';
import PageHeader from '../components/ui/PageHeader';
import { useCart } from '../hooks/useCart';
import { FREE_SHIPPING_FROM } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice } from '../utils/formatPrice';
import { getShippingPrice } from '../utils/shipping';

function CartPage() {
  useDocumentTitle('Cart');
  const { items, itemsCount, subtotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container page empty">
        <p className="empty__icon" aria-hidden="true">
          🛒
        </p>
        <h1>Your cart is empty</h1>
        <p className="muted">Find a pair you like in our shop.</p>
        <Link to="/shop" className="button button--primary button--large">
          Go to the shop
        </Link>
      </div>
    );
  }

  const shipping = getShippingPrice(subtotal, 'standard');
  const leftForFreeShipping = FREE_SHIPPING_FROM - subtotal;
  // Progress bar: how close we are to free shipping, never more than 100%.
  const progress = Math.min((subtotal / FREE_SHIPPING_FROM) * 100, 100);

  return (
    <div className="container page">
      <PageHeader title="Your cart" subtitle={`${itemsCount} ${itemsCount === 1 ? 'item' : 'items'}`} />

      <div className="checkout-layout">
        <div>
          <div className="shipping-progress">
            <p>
              {leftForFreeShipping > 0 ? (
                <>
                  Add <strong>{formatPrice(leftForFreeShipping)}</strong> more for free shipping
                </>
              ) : (
                <strong>🎉 You get free shipping!</strong>
              )}
            </p>
            <div className="progress" role="progressbar" aria-label="Progress to free shipping" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress__bar" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <ul className="cart-list">
            {items.map((item) => (
              <CartRow key={item.key} item={item} />
            ))}
          </ul>

          <div className="cart-actions">
            <Link to="/shop" className="link-arrow">
              ← Continue shopping
            </Link>
            <button className="text-button" onClick={clearCart}>
              Remove all
            </button>
          </div>
        </div>

        <OrderSummary subtotal={subtotal} shipping={shipping}>
          <Link to="/checkout" className="button button--primary button--block button--large">
            Go to checkout
          </Link>
          <p className="summary__note">Taxes included. Express delivery can be chosen at checkout.</p>
        </OrderSummary>
      </div>
    </div>
  );
}

export default CartPage;
