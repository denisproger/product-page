import { useState } from 'react';
import { Link } from 'react-router';
import { useCart } from '../../hooks/useCart';
import { getAverageRating } from '../../data/products';
import { FREE_SHIPPING_FROM } from '../../data/site';
import type { ColorOption, Product } from '../../types';
import { formatPrice, getFinalPrice } from '../../utils/formatPrice';
import QuantityPicker from '../ui/QuantityPicker';
import Rating from '../ui/Rating';

type ProductInfoProps = {
  product: Product;
  selectedColor: ColorOption;
  onColorChange: (color: ColorOption) => void;
};

function ProductInfo({ product, selectedColor, onColorChange }: ProductInfoProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const finalPrice = getFinalPrice(product.price, product.discountPercent);

  function handleAddToCart() {
    // Simple validation: the user must pick a size first.
    if (selectedSize === null) {
      setError('Please choose a size');
      return;
    }

    addItem({
      productId: product.id,
      title: product.title,
      colorName: selectedColor.name,
      size: selectedSize,
      price: finalPrice,
      quantity,
      image: selectedColor.images[0],
    });

    setQuantity(1);
    setJustAdded(true);
  }

  return (
    <section className="info">
      <div className="info__badges">
        {product.isNew && <span className="badge badge--dark">New</span>}
        {product.discountPercent > 0 && <span className="badge">Sale</span>}
      </div>
      <h1 className="info__title">{product.title}</h1>
      <a href="#reviews" className="info__rating">
        <Rating value={getAverageRating(product)} count={product.reviews.length} />
      </a>

      <div className="price">
        <span className="price__final">{formatPrice(finalPrice)}</span>
        {product.discountPercent > 0 && (
          <>
            <s className="price__old">{formatPrice(product.price)}</s>
            <span className="price__save">You save {formatPrice(product.price - finalPrice)}</span>
          </>
        )}
      </div>

      <p className="info__description">{product.description}</p>

      <fieldset className="options">
        <legend>
          Colour: <strong>{selectedColor.name}</strong>
        </legend>
        <div className="swatches">
          {product.colors.map((color) => (
            <button
              key={color.id}
              className={`swatch ${color.id === selectedColor.id ? 'is-active' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => onColorChange(color)}
              aria-label={color.name}
              aria-pressed={color.id === selectedColor.id}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="options">
        <legend>Size (EU)</legend>
        <div className="sizes">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`size ${size === selectedSize ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedSize(size);
                setError('');
                setJustAdded(false);
              }}
              aria-pressed={size === selectedSize}
            >
              {size}
            </button>
          ))}
        </div>
        {error && (
          <p className="field__error" role="alert">
            {error}
          </p>
        )}
      </fieldset>

      <div className="info__actions">
        <QuantityPicker value={quantity} onChange={setQuantity} />
        <button className="button button--primary button--block" onClick={handleAddToCart}>
          Add to cart · {formatPrice(finalPrice * quantity)}
        </button>
      </div>

      {justAdded && (
        <div className="added-message" role="status">
          ✓ Added to your cart. <Link to="/cart">View cart</Link>
        </div>
      )}

      <ul className="info__perks">
        <li>🚚 Free delivery over {formatPrice(FREE_SHIPPING_FROM)}</li>
        <li>↩️ 30-day free returns</li>
      </ul>
    </section>
  );
}

export default ProductInfo;
