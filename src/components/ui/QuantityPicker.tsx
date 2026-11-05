type QuantityPickerProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

// A "controlled" component: it keeps no state, the parent owns the number.
function QuantityPicker({ value, onChange, min = 1, max = 10 }: QuantityPickerProps) {
  return (
    <div className="quantity">
      <button onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        −
      </button>
      <span aria-live="polite" aria-label={`Quantity ${value}`}>
        {value}
      </span>
      <button onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}

export default QuantityPicker;
