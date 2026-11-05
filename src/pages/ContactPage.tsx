import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation } from 'react-router';
import Accordion from '../components/ui/Accordion';
import FormField from '../components/ui/FormField';
import PageHeader from '../components/ui/PageHeader';
import { FAQ, SHOP } from '../data/site';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { isBlank, isEmail } from '../utils/validation';

type ContactForm = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

// The same keys as the form, but each value is an error message.
type ContactErrors = Partial<Record<keyof ContactForm, string>>;

const EMPTY_FORM: ContactForm = { name: '', email: '', topic: 'order', message: '' };

function validate(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {};
  if (isBlank(form.name)) errors.name = 'Please enter your name';
  if (!isEmail(form.email)) errors.email = 'Please enter a valid email';
  if (form.message.trim().length < 10) errors.message = 'The message should be at least 10 characters';
  return errors;
}

function ContactPage() {
  useDocumentTitle('Contact');
  const location = useLocation();

  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSent, setIsSent] = useState(false);

  // The footer links to /contact#faq. Scroll to the FAQ when the address has that #.
  useEffect(() => {
    if (location.hash === '#faq') {
      document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  // One function for every field: "name" tells which field changed.
  function updateField(name: keyof ContactForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined })); // hide the error while typing
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = validate(form);
    setErrors(newErrors);

    // Object.keys(...).length === 0 → no errors → the form is valid
    if (Object.keys(newErrors).length === 0) {
      setIsSent(true);
      setForm(EMPTY_FORM);
    }
  }

  return (
    <div className="container page">
      <PageHeader title="Contact us" subtitle="Questions about sizes, orders or returns? We usually reply within one day." />

      <div className="contact">
        {/* ---------- Form ---------- */}
        <section className="card">
          {isSent ? (
            <div className="success" role="status">
              <p className="success__icon" aria-hidden="true">
                ✓
              </p>
              <h2>Message sent!</h2>
              <p className="muted">Thank you. We will get back to you by email soon.</p>
              <button className="button button--ghost" onClick={() => setIsSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 className="card__title">Send us a message</h2>
              <div className="form-row">
                <FormField
                  id="name"
                  label="Your name"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  error={errors.name}
                  autoComplete="name"
                />
                <FormField
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>

              <div className="field">
                <label htmlFor="topic" className="field__label">
                  Topic
                </label>
                <select
                  id="topic"
                  className="field__input"
                  value={form.topic}
                  onChange={(e) => updateField('topic', e.target.value)}
                >
                  <option value="order">My order</option>
                  <option value="sizes">Sizes and fit</option>
                  <option value="returns">Returns and exchanges</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="message" className="field__label">
                  Message
                </label>
                <textarea
                  id="message"
                  className="field__input"
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="field__error">
                    {errors.message}
                  </p>
                )}
              </div>

              <button type="submit" className="button button--primary button--large">
                Send message
              </button>
            </form>
          )}
        </section>

        {/* ---------- Shop info ---------- */}
        <aside className="contact__info">
          <div className="card">
            <h2 className="card__title">Visit our shop</h2>
            <p>{SHOP.address}</p>
            <dl className="hours">
              {SHOP.hours.map((row) => (
                <div key={row.days}>
                  <dt>{row.days}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card">
            <h2 className="card__title">Get in touch</h2>
            <p>
              Email: <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>
            </p>
            <p>
              Phone: <a href={`tel:${SHOP.phone.replaceAll(' ', '')}`}>{SHOP.phone}</a>
            </p>
          </div>
        </aside>
      </div>

      <section id="faq" className="section faq">
        <h2 className="section__title">Frequently asked questions</h2>
        <Accordion items={FAQ.map((item) => ({ title: item.question, content: <p>{item.answer}</p> }))} />
      </section>
    </div>
  );
}

export default ContactPage;
