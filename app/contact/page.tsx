'use client';

import { FormEvent, useState, useCallback } from 'react';
import GetStartedButton from '@/components/GetStartedButton';
import ReCaptcha from '@/components/ReCaptcha';
import { submitContactForm } from '@/lib/api';

const sanitizeInput = (input: string, maxLength: number = 500): string =>
  input.replace(/[<>]/g, '').trim().slice(0, maxLength);
const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
const isValidName = (name: string): boolean =>
  /^[a-zA-Z\s\-']+$/.test(name) && name.length >= 1 && name.length <= 100;

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  recaptcha?: string;
  submit?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', topic: '', message: '' });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleRecaptchaVerify = useCallback((token: string) => {
    setRecaptchaToken(token);
    setErrors((prev) => ({ ...prev, recaptcha: undefined }));
  }, []);
  const handleRecaptchaExpire = useCallback(() => setRecaptchaToken(''), []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    if (!isValidName(formData.name)) newErrors.name = 'Please enter a valid name (letters only)';
    if (!isValidEmail(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    if (!recaptchaToken) newErrors.recaptcha = 'Please complete the reCAPTCHA verification';
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setErrors({});
    setSubmitting(true);
    try {
      await submitContactForm({
        name: sanitizeInput(formData.name, 100),
        email: sanitizeInput(formData.email, 254),
        topic: formData.topic,
        message: sanitizeInput(formData.message, 2000),
        recaptcha_token: recaptchaToken,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', topic: '', message: '' });
        setRecaptchaToken('');
      }, 3000);
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <section className="hero">
        <span className="overline">Contact</span>
        <h1>Talk to our team.</h1>
        <p className="hero-sub">
          For onboarding, partnerships, support, or compliance queries — reach us on WhatsApp, by email, or via the form below.
        </p>
      </section>

      <section>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-card-icon">💬</span>
            <div className="feature-card-body">
              <h3>WhatsApp</h3>
              <p>Start the onboarding journey directly on WhatsApp — no app download needed.</p>
            </div>
            <div style={{ marginTop: 16 }}>
              <GetStartedButton />
            </div>
          </div>
          <div className="feature-card">
            <span className="feature-card-icon">📬</span>
            <div className="feature-card-body">
              <h3>Email us</h3>
              <p><a href="mailto:contact@itspayday.in">contact@itspayday.in</a><br />
              <a href="mailto:grievance@itspayday.in">grievance@itspayday.in</a></p>
            </div>
          </div>
          <div className="feature-card">
            <span className="feature-card-icon">📞</span>
            <div className="feature-card-body">
              <h3>Phone</h3>
              <p>+91 85870 12908<br /><span style={{ color: 'var(--color-ink-500)', fontSize: '0.85rem' }}>Mon–Sat, 9 AM–6 PM</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <div style={{ maxWidth: 620 }}>
          <span className="overline">Write to us</span>
          <h2 className="section-title">Contact form</h2>
          {submitted ? (
            <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-brand-700)', fontWeight: 600 }}>
                Thanks. Our team will respond shortly.
              </p>
            </div>
          ) : (
            <form className="form-grid" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: sanitizeInput(e.target.value, 100) })}
                  required
                  disabled={submitting}
                />
                {errors.name && <div className="helper-text" style={{ color: 'var(--color-error)' }}>{errors.name}</div>}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: sanitizeInput(e.target.value, 254) })}
                  required
                  disabled={submitting}
                />
                {errors.email && <div className="helper-text" style={{ color: 'var(--color-error)' }}>{errors.email}</div>}
              </div>
              <div>
                <label htmlFor="topic">Topic</label>
                <select
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  disabled={submitting}
                >
                  <option value="">Select a topic</option>
                  <option value="support">Worker support</option>
                  <option value="partnerships">Partnerships</option>
                  <option value="lenders">Lender partnerships</option>
                  <option value="compliance">Compliance &amp; legal</option>
                </select>
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: sanitizeInput(e.target.value, 2000) })}
                  required
                  disabled={submitting}
                />
                {errors.message && <div className="helper-text" style={{ color: 'var(--color-error)' }}>{errors.message}</div>}
              </div>
              <div>
                <ReCaptcha onVerify={handleRecaptchaVerify} onExpire={handleRecaptchaExpire} />
                {errors.recaptcha && <div className="helper-text" style={{ color: 'var(--color-error)' }}>{errors.recaptcha}</div>}
              </div>
              {errors.submit && <div className="helper-text" style={{ color: 'var(--color-error)' }}>{errors.submit}</div>}
              <button className="button primary" type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
