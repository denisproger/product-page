import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router';
import OrderSummary from '../components/cart/OrderSummary';
import FormField from '../components/ui/FormField';
import PageHeader from '../components/ui/PageHeader';
import { useCart } from '../hooks/useCart';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatPrice } from '../utils/formatPrice';
import { DELIVERY_OPTIONS, getShippingPrice } from '../utils/shipping';
import type { DeliveryMethod } from '../utils/shipping';
import { isBlank, isEmail, isPostalCode } from '../utils/validation';

type CheckoutForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  delivery: DeliveryMethod;
  payment: 'card' | 'cash';
};

type CheckoutErrors = Partial<Record<keyof CheckoutForm, string>>;

// What we pass to the "thank you" page.
export type OrderConfirmation = {
  orderNumber: string;
  fullName: string;
  email: string;
  total: number;
};

const INITIAL_FORM: CheckoutForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  delivery: 'standard',
  payment: 'card',
};

function validate(form: CheckoutForm): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (isBlank(form.fullName)) errors.fullName = 'Please enter your full name';
  if (!isEmail(form.email)) errors.email = 'Please enter a valid email';
  if (isBlank(form.address)) errors.address = 'Please enter your street and house number';
  if (isBlank(form.city)) errors.city = 'Please enter your city';
  if (!isPostalCode(form.postalCode)) errors.postalCode = 'Use 5 digits, e.g. 602 00';
  return errors;
}

function CheckoutPage() {
  useDocumentTitle('Checkout');
  const navigate = useNavigate();
  const { items, subtotal } = useCart();

  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<CheckoutErrors>({});

  // Nothing to buy → send the user back to the cart page.
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const shipping = getShippingPrice(subtotal, form.delivery);
  const total = subtotal + shipping;

  // Generic setter: works for every field because the field name is passed in.
  function updateField<K extends keyof CheckoutForm>(name: K, value: CheckoutForm[K]) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Move the keyboard focus to the first field with an error, so the user sees it.
      const firstField = Object.keys(newErrors)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    const confirmation: OrderConfirmation = {
      orderNumber: `ST-${Date.now().toString().slice(-6)}`, // a fake order number from the current time
      fullName: form.fullName,
      email: form.email,
      total,
    };

    // "state" sends data to the next page without putting it in the URL.
    // The cart is emptied on the next page. If we emptied it here, this page would
    // re-render with an empty cart and redirect to /cart before the navigation finishes.
    navigate('/order-success', { state: confirmation, replace: true });
  }

  return (
    <div className="container page">
      <PageHeader title="Checkout">
        <Link to="/cart" className="link-arrow">
          ← Back to cart
        </Link>
      </PageHeader>

      <form className="checkout-layout" onSubmit={handleSubmit} noValidate>
        <div className="checkout-form">
          <section className="card">
            <h2 className="card__title">1. Contact details</h2>
            <FormField
              id="fullName"
              label="Full name"
              value={form.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              error={errors.fullName}
              autoComplete="name"
            />
            <div className="form-row">
              <FormField
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={errors.email}
                autoComplete="email"
              />
              <FormField
                id="phone"
                label="Phone (optional)"
                type="tel"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                autoComplete="tel"
              />
            </div>
          </section>

          <section className="card">
            <h2 className="card__title">2. Delivery address</h2>
            <FormField
              id="address"
              label="Street and house number"
              value={form.address}
              onChange={(e) => updateField('address', e.target.value)}
              error={errors.address}
              autoComplete="street-address"
            />
            <div className="form-row">
              <FormField
                id="city"
                label="City"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
                error={errors.city}
                autoComplete="address-level2"
              />
              <FormField
                id="postalCode"
                label="Postal code"
                value={form.postalCode}
                onChange={(e) => updateField('postalCode', e.target.value)}
                error={errors.postalCode}
                autoComplete="postal-code"
                inputMode="numeric"
              />
            </div>
          </section>

          <section className="card">
            <fieldset>
              <legend className="card__title">3. Delivery method</legend>
              {DELIVERY_OPTIONS.map((option) => (
                <label key={option.id} className={`choice ${form.delivery === option.id ? 'is-active' : ''}`}>
                  <input
                    type="radio"
                    name="delivery"
                    checked={form.delivery === option.id}
                    onChange={() => updateField('delivery', option.id)}
                  />
                  <span className="choice__text">
                    <strong>{option.name}</strong>
                    <span className="muted">{option.time}</span>
                  </span>
                  <span className="choice__price">
                    {getShippingPrice(subtotal, option.id) === 0 ? 'Free' : formatPrice(getShippingPrice(subtotal, option.id))}
                  </span>
                </label>
              ))}
            </fieldset>
          </section>

          <section className="card">
            <fieldset>
              <legend className="card__title">4. Payment</legend>
              <label className={`choice ${form.payment === 'card' ? 'is-active' : ''}`}>
                <input type="radio" name="payment" checked={form.payment === 'card'} onChange={() => updateField('payment', 'card')} />
                <span className="choice__text">
                  <strong>Card on delivery</strong>
                  <span className="muted">Pay with your card when the courier arrives</span>
                </span>
              </label>
              <label className={`choice ${form.payment === 'cash' ? 'is-active' : ''}`}>
                <input type="radio" name="payment" checked={form.payment === 'cash'} onChange={() => updateField('payment', 'cash')} />
                <span className="choice__text">
                  <strong>Cash on delivery</strong>
                  <span className="muted">Pay in cash when the courier arrives</span>
                </span>
              </label>
            </fieldset>
          </section>
        </div>

        <OrderSummary subtotal={subtotal} shipping={shipping}>
          <ul className="summary__items">
            {items.map((item) => (
              <li key={item.key}>
                <img src={item.image} alt="" />
                <span>
                  {item.title} × {item.quantity}
                  <span className="muted">
                    {item.colorName}, size {item.size}
                  </span>
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <button type="submit" className="button button--primary button--block button--large">
            Place order · {formatPrice(total)}
          </button>
          <p className="summary__note">This is a demo shop. No real order is made and nothing is charged.</p>
        </OrderSummary>
      </form>
    </div>
  );
}

export default CheckoutPage;
