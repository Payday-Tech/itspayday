'use client';

import Image from 'next/image';
import { FormEvent, useState, useCallback } from 'react';
import ReCaptcha from '@/components/ReCaptcha';
import { submitLenderPartnershipForm } from '@/lib/api';

// Sanitize input to prevent XSS
const sanitizeInput = (input: string, maxLength: number = 500): string => {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
};

// Sanitize phone - only digits
const sanitizePhone = (input: string): string => {
  return input.replace(/\D/g, '').slice(0, 15);
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
};

// Validate name - letters, spaces, hyphens, apostrophes
const isValidName = (name: string): boolean => {
  return /^[a-zA-Z\s\-']+$/.test(name) && name.length >= 1 && name.length <= 100;
};

// Validate phone - 10-15 digits
const isValidPhone = (phone: string): boolean => {
  return /^\d{10,15}$/.test(phone);
};

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  role?: string;
  city?: string;
  recaptcha?: string;
  submit?: string;
}

export default function ForLenders() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    role: '',
    city: '',
    notes: '',
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
    if (formData.company.length < 2 || formData.company.length > 100) {
      newErrors.company = 'Company name must be 2-100 characters';
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }
    if (!isValidName(formData.role)) {
      newErrors.role = 'Please enter a valid role (letters only)';
    }
    if (!isValidName(formData.city)) {
      newErrors.city = 'Please enter a valid city (letters only)';
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
      await submitLenderPartnershipForm({
        name: sanitizeInput(formData.name, 100),
        company: sanitizeInput(formData.company, 100),
        email: sanitizeInput(formData.email, 254),
        phone: sanitizePhone(formData.phone),
        role: sanitizeInput(formData.role, 100),
        city: sanitizeInput(formData.city, 100),
        notes: sanitizeInput(formData.notes, 1000) || undefined,
        recaptcha_token: recaptchaToken,
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', company: '', email: '', phone: '', role: '', city: '', notes: '' });
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
          <div className="badge">LSP partnership</div>
          <h1>Trusted sourcing and underwriting signals for lenders.</h1>
          <p>Payday helps lenders reach wage-linked workers with consent-based data, assisted repayment, and community support.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Lender partnership illustration"
            width={960}
            height={640}
          />
          <div className="trust-box">
            <strong>Signals you can trust</strong>
            <p className="small">Tenure, regularity, and consent-based data power reliable underwriting.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>Sourcing at scale</h3>
            <p className="small">Tier-1 gated communities and gig platforms with verified employment data.</p>
          </div>
          <div className="card">
            <h3>Underwriting insights</h3>
            <p className="small">Tenure, earnings regularity, consent-led data, and repayment history.</p>
          </div>
          <div className="card">
            <h3>Assisted collections</h3>
            <p className="small">Aligned repayment cycles, reminders, and collaboration with community partners.</p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>Partner with us</h2>
        {submitted ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: 'var(--brand-primary)', fontWeight: 600, fontSize: '1.1rem' }}>
              Thank you for your interest! We&apos;ll be in touch soon.
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
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: sanitizeInput(e.target.value, 100) })}
                maxLength={100}
                minLength={2}
                autoComplete="organization"
                required
                disabled={submitting}
              />
              {errors.company && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.company}</div>}
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
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: sanitizePhone(e.target.value) })}
                maxLength={15}
                pattern="[0-9]{10,15}"
                title="Enter 10-15 digit phone number"
                autoComplete="tel"
                required
                disabled={submitting}
              />
              {errors.phone && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.phone}</div>}
            </div>
            <div>
              <label htmlFor="role">Role</label>
              <input
                id="role"
                name="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: sanitizeInput(e.target.value, 100) })}
                maxLength={100}
                pattern="[a-zA-Z\s\-']+"
                title="Letters, spaces, hyphens, and apostrophes only"
                autoComplete="organization-title"
                required
                disabled={submitting}
              />
              {errors.role && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.role}</div>}
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: sanitizeInput(e.target.value, 100) })}
                maxLength={100}
                pattern="[a-zA-Z\s\-']+"
                title="Letters, spaces, hyphens, and apostrophes only"
                autoComplete="address-level2"
                required
                disabled={submitting}
              />
              {errors.city && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.city}</div>}
            </div>
            <div>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: sanitizeInput(e.target.value, 1000) })}
                maxLength={1000}
                disabled={submitting}
              />
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
              {submitting ? 'Submitting...' : 'Submit partnership interest'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
