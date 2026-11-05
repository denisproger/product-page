import type { ReactNode } from 'react';
import { formatPrice } from '../../utils/formatPrice';

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  children?: ReactNode; // buttons or notes under the total
};

// The box with Subtotal / Shipping / Total. Used on the cart and checkout pages.
function OrderSummary({ subtotal, shipping, children }: OrderSummaryProps) {
  return (
    <aside className="summary" aria-label="Order summary">
      <h2 className="summary__title">Order summary</h2>
      <dl className="summary__list">
        <div>
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
        </div>
        <div className="summary__total">
          <dt>Total</dt>
          <dd>{formatPrice(subtotal + shipping)}</dd>
        </div>
      </dl>
      {children}
    </aside>
  );
}

export default OrderSummary;
