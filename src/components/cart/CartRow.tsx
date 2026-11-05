import { Link } from 'react-router';
import { useCart } from '../../hooks/useCart';
import type { CartItem } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import QuantityPicker from '../ui/QuantityPicker';

type CartRowProps = {
  item: CartItem;
};

function CartRow({ item }: CartRowProps) {
  const { changeQuantity, removeItem } = useCart();

  return (
    <li className="cart-row">
      <Link to={`/product/${item.productId}`} className="cart-row__image">
        <img src={item.image} alt={item.title} />
      </Link>

      <div className="cart-row__info">
        <Link to={`/product/${item.productId}`} className="cart-row__title">
          {item.title}
        </Link>
        <p className="muted">
          {item.colorName} · Size {item.size}
        </p>
        <p className="muted">{formatPrice(item.price)} each</p>
      </div>

      <QuantityPicker value={item.quantity} onChange={(quantity) => changeQuantity(item.key, quantity)} />

      <p className="cart-row__subtotal">{formatPrice(item.price * item.quantity)}</p>

      <button className="cart-row__remove" onClick={() => removeItem(item.key)} aria-label={`Remove ${item.title}`}>
        ✕
      </button>
    </li>
  );
}

export default CartRow;
