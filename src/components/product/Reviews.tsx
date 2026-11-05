import { getAverageRating } from '../../data/products';
import type { Product } from '../../types';
import { formatDate } from '../../utils/formatPrice';
import Rating from '../ui/Rating';

type ReviewsProps = {
  product: Product;
};

function Reviews({ product }: ReviewsProps) {
  const average = getAverageRating(product);

  // Newest first. toSorted returns a copy, so product.reviews stays as it was.
  const sortedReviews = product.reviews.toSorted((a, b) => b.date.localeCompare(a.date));

  return (
    <section id="reviews" className="reviews">
      <div className="reviews__summary">
        <h2>Customer reviews</h2>
        <p className="reviews__average">{average.toFixed(1)}</p>
        <Rating value={average} />
        <p className="reviews__count">Based on {product.reviews.length} reviews</p>
      </div>

      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <li key={review.author + review.date} className="review">
            <div className="review__head">
              <span className="avatar" aria-hidden="true">
                {review.author[0]}
              </span>
              <div>
                <p className="review__author">{review.author}</p>
                <p className="review__date">{formatDate(review.date)}</p>
              </div>
              <Rating value={review.rating} />
            </div>
            <p className="review__text">{review.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Reviews;
