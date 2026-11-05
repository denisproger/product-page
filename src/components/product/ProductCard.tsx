import { Link } from 'react-router';
import { getAverageRating, getCategoryName } from '../../data/products';
import type { Product } from '../../types';
import { formatPrice, getFinalPrice } from '../../utils/formatPrice';
import Rating from '../ui/Rating';

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const finalPrice = getFinalPrice(product.price, product.discountPercent);
  const firstColor = product.colors[0];

  return (
    <li className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__image">
          <img src={firstColor.images[0]} alt={`${product.title}, ${firstColor.name}`} loading="lazy" />
          <div className="product-card__badges">
            {product.isNew && <span className="badge badge--dark">New</span>}
            {product.discountPercent > 0 && <span className="badge">-{product.discountPercent}%</span>}
          </div>
        </div>

        <div className="product-card__body">
          <p className="product-card__category">{getCategoryName(product.category)}</p>
          <h3 className="product-card__title">{product.title}</h3>
          <Rating value={getAverageRating(product)} count={product.reviews.length} />

          <div className="product-card__footer">
            <p className="product-card__price">
              {formatPrice(finalPrice)}
              {product.discountPercent > 0 && <s>{formatPrice(product.price)}</s>}
            </p>
            {/* Small dots show which colours exist */}
            <ul className="color-dots" aria-label={`${product.colors.length} colours`}>
              {product.colors.map((c) => (
                <li key={c.id} style={{ backgroundColor: c.hex }} title={c.name} />
              ))}
            </ul>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductCard;
