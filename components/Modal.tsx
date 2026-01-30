'use client';

import { FormEvent, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Sanitize input to prevent XSS - removes potential script injections
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .slice(0, 100); // Limit length
};

// Validate name field - only letters, spaces, hyphens, apostrophes
const isValidName = (name: string): boolean => {
  return /^[a-zA-Z\s\-']+$/.test(name) && name.length >= 1 && name.length <= 50;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string }>({});

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const newErrors: { firstName?: string; lastName?: string } = {};

    if (!isValidName(firstName)) {
      newErrors.firstName = 'Please enter a valid first name (letters only)';
    }
    if (!isValidName(lastName)) {
      newErrors.lastName = 'Please enter a valid last name (letters only)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Sanitize before submission
    const sanitizedData = {
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      occupation,
    };

    // Mock form submission - will be replaced with API call later
    console.log('Form submitted:', sanitizedData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFirstName('');
      setLastName('');
      setOccupation('');
      onClose();
    }, 2000);
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
        <h3>We are in beta &mdash; share your details</h3>
        <p className="small">We will get back to you with your loan offer on WhatsApp.</p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
              Thank you! We&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form className="form-grid" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first-name">First name</label>
              <input
                id="first-name"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(sanitizeInput(e.target.value))}
                maxLength={50}
                pattern="[a-zA-Z\s\-']+"
                title="Letters, spaces, hyphens, and apostrophes only"
                autoComplete="given-name"
                required
              />
              {errors.firstName && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.firstName}</div>}
            </div>
            <div>
              <label htmlFor="last-name">Last name</label>
              <input
                id="last-name"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(sanitizeInput(e.target.value))}
                maxLength={50}
                pattern="[a-zA-Z\s\-']+"
                title="Letters, spaces, hyphens, and apostrophes only"
                autoComplete="family-name"
                required
              />
              {errors.lastName && <div className="helper-text" style={{ color: 'var(--status-error)' }}>{errors.lastName}</div>}
            </div>
            <div>
              <label htmlFor="occupation">Occupation</label>
              <select
                id="occupation"
                name="occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                required
              >
                <option value="">Select an option</option>
                <option value="maid">Bai/House help/Maid</option>
                <option value="gig-worker">Gig worker (urban company)</option>
                <option value="nanny">Nanny</option>
                <option value="aaipronto">AaiPronto</option>
                <option value="cook">Cook</option>
                <option value="driver">Driver</option>
                <option value="gardener">Gardener</option>
              </select>
              <div className="helper-text">Choose the role that fits you best.</div>
            </div>
            <button className="button primary" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
