'use client';

import Image from 'next/image';
import { FormEvent, useState, useCallback } from 'react';
import GetStartedButton from '@/components/GetStartedButton';
import ReCaptcha from '@/components/ReCaptcha';
import { submitContactForm } from '@/lib/api';

// Sanitize input to prevent XSS
const sanitizeInput = (input: string, maxLength: number = 500): string => {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
};

// Validate name - letters, spaces, hyphens, apostrophes
const isValidName = (name: string): boolean => {
  return /^[a-zA-Z\s\-']+$/.test(name) && name.length >= 1 && name.length <= 100;
};

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  recaptcha?: string;
  submit?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: '',
  });
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleRecaptchaVerify = useCallback((token: string) => {
    setRecaptchaToken(token);
    setErrors(prev => ({ ...prev, recaptcha: undefined }));
  }, []);

  const handleRecaptchaExpire = useCallback(() => {
    setRecaptchaToken('');
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const newErrors: FormErrors = {};

    if (!isValidName(formData.name)) {
      newErrors.name = 'Please enter a valid name (letters only)';
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    if (!recaptchaToken) {
      newErrors.recaptcha = 'Please complete the reCAPTCHA verification';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
        <div>
          <div className="badge">Contact</div>
          <h1>Let&apos;s build responsible access together.</h1>
          <p>Reach out for worker onboarding, community rollouts, lender partnerships, or support in English, Hinglish, Kannada, and Hindi.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Contact support illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>WhatsApp onboarding</h3>
            <p className="small">Start your request with our WhatsApp form.</p>
            <GetStartedButton />
          </div>
          <div className="card">
            <h3>Email</h3>
            <p className="small">Write to us directly and we&apos;ll respond within 1 business day.</p>
            <a className="button secondary" href="mailto:info@payday.com" rel="noopener noreferrer">info@payday.com</a>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>Contact form</h2>
        {submitted ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'var(--brand-primary)', fontWeight: 600, fontSize: '1.1rem' }}>
              Thank you! We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form className="form-grid" onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: sanitizeInput(e.target.value, 100) })}
                maxLength={100}
                pattern="[a-zA-Z\s\-']+"
                title="Letters, spaces, hyphens, and apostrophes only"
                autoComplete="name"
                required
                disabled={submitting}
              />
              {errors.name && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.name}</div>}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: sanitizeInput(e.target.value, 254) })}
                maxLength={254}
                autoComplete="email"
                required
                disabled={submitting}
              />
              {errors.email && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.email}</div>}
            </div>
            <div>
              <label htmlFor="topic">Topic</label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                required
                disabled={submitting}
              >
                <option value="">Select a topic</option>
                <option value="earned-wage-access">Earned Wage Access</option>
                <option value="partnerships">Partnerships</option>
                <option value="support">Support</option>
                <option value="privacy-data">Privacy or Data</option>
              </select>
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: sanitizeInput(e.target.value, 2000) })}
                maxLength={2000}
                minLength={10}
                required
                disabled={submitting}
              />
              {errors.message && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.message}</div>}
            </div>
            <div>
              <ReCaptcha
                onVerify={handleRecaptchaVerify}
                onExpire={handleRecaptchaExpire}
              />
              {errors.recaptcha && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.recaptcha}</div>}
            </div>
            {errors.submit && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.submit}</div>}
            <button className="button primary" type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send message'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
