import { useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { useCart } from '../hooks/useCart';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice } from '../utils/formatPrice';
import type { OrderConfirmation } from './CheckoutPage';

function OrderSuccessPage() {
  useDocumentTitle('Thank you');

  // The checkout page sent the order details in "state" when it navigated here.
  const location = useLocation();
  const order = location.state as OrderConfirmation | null;
  const { clearCart } = useCart();

  // The order is placed, so empty the cart when this page opens.
  useEffect(() => {
    if (order) clearCart();
  }, [order, clearCart]);

  // Someone opened /order-success directly, without ordering → go home.
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const firstName = order.fullName.split(' ')[0];

  return (
    <div className="container page empty">
      <p className="success__icon success__icon--large" aria-hidden="true">
        ✓
      </p>
      <h1>Thank you, {firstName}!</h1>
      <p className="muted">
        Your order <strong>{order.orderNumber}</strong> for {formatPrice(order.total)} has been received.
      </p>
      <p className="muted">
        We sent a confirmation to <strong>{order.email}</strong>.
      </p>
      <Link to="/shop" className="button button--primary button--large">
        Continue shopping
      </Link>
    </div>
  );
}

export default OrderSuccessPage;
