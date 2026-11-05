type RatingProps = {
  value: number; // 0–5
  count?: number; // number of reviews
};

// Shows 4.6 as ★★★★★ with the right part filled, plus the number.
function Rating({ value, count }: RatingProps) {
  const percent = (value / 5) * 100;

  return (
    <span className="rating" aria-label={`Rated ${value} out of 5`}>
      <span className="rating__stars" aria-hidden="true">
        ★★★★★
        <span className="rating__fill" style={{ width: `${percent}%` }}>
          ★★★★★
        </span>
      </span>
      <span className="rating__value" aria-hidden="true">
        {value.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </span>
  );
}

export default Rating;
