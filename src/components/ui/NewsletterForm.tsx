import { useState } from 'react';
import type { FormEvent } from 'react';
import { isEmail } from '../../utils/validation';

// A small form with one field. Nothing is sent anywhere: it only shows a thank-you message.
function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // stop the browser from reloading the page

    if (!isEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsSubscribed(true);
  }

  if (isSubscribed) {
    return <p className="newsletter__success">Thanks! Check your inbox to confirm.</p>;
  }

  return (
    <form className="newsletter" onSubmit={handleSubmit} noValidate>
      <label htmlFor="newsletter-email" className="visually-hidden">
        Email
      </label>
      <div className="newsletter__row">
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          aria-invalid={error !== ''}
          aria-describedby={error ? 'newsletter-error' : undefined}
        />
        <button type="submit" className="button button--primary">
          Subscribe
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="field__error">
          {error}
        </p>
      )}
    </form>
  );
}

export default NewsletterForm;
