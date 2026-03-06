'use client';

import { FormEvent, useState, useCallback } from 'react';
import ReCaptcha from './ReCaptcha';
import { submitContactForm } from '@/lib/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function Modal({ isOpen, onClose }: ModalProps) {
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

  if (!isOpen) return null;

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
        onClose();
      }, 3000);
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h3>Contact us</h3>
        <p className="small">Our team will respond shortly.</p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: 'var(--color-brand-700)', fontWeight: 600 }}>
              Thanks. Our team will respond shortly.
            </p>
          </div>
        ) : (
          <form className="form-grid" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="modal-name">Name</label>
              <input
                id="modal-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: sanitizeInput(e.target.value, 100) })}
                required
                disabled={submitting}
              />
              {errors.name && <div className="helper-text" style={{ color: 'var(--color-error)' }}>{errors.name}</div>}
            </div>
            <div>
              <label htmlFor="modal-email">Email</label>
              <input
                id="modal-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: sanitizeInput(e.target.value, 254) })}
                required
                disabled={submitting}
              />
              {errors.email && <div className="helper-text" style={{ color: 'var(--color-error)' }}>{errors.email}</div>}
            </div>
            <div>
              <label htmlFor="modal-topic">Topic</label>
              <select
                id="modal-topic"
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
              <label htmlFor="modal-message">Message</label>
              <textarea
                id="modal-message"
                rows={4}
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
    </div>
  );
}
