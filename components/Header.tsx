'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';

interface HeaderProps {
  onOpenModal: () => void;
}

const languageOptions = [
  { code: 'en' as const, label: 'English' },
  { code: 'hng' as const, label: 'Hinglish' },
  { code: 'kn' as const, label: 'ಕನ್ನಡ' },
  { code: 'hi' as const, label: 'हिन्दी' },
];

export default function Header({ onOpenModal }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <header>
      <nav>
        <Link className="logo" href="/" aria-label="Payday home">
          <Image src="/payday-logo.svg" alt="Payday" width={164} height={56} priority />
        </Link>
        <div className="nav-links">
          <Link href="/products/earned-wage-access">Earned Wage Access</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/for-communities">For Communities</Link>
          <Link href="/for-lenders">For Lenders</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="mobile-nav">
          <button
            className="button secondary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            Menu
          </button>
          <button className="button primary" onClick={() => { setLanguage('hng'); onOpenModal(); }}>
            {t('cta.getStarted')}
          </button>
        </div>
        <div className="nav-links nav-actions">
          <label className="language-select-wrap" aria-label="Select language">
            <span className="language-select-label">Language</span>
            <select
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as typeof language)}
              aria-label="Select language"
            >
              {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>{option.label}</option>
              ))}
            </select>
          </label>
          <a className="button secondary" href="mailto:info@payday.in" rel="noopener noreferrer">
            {t('cta.partner')}
          </a>
          <button className="button primary" onClick={() => { setLanguage('hng'); onOpenModal(); }}>
            {t('cta.getStarted')}
          </button>
        </div>
      </nav>
      <div className={`menu-panel ${menuOpen ? 'open' : ''}`}>
        <Link href="/products/earned-wage-access" onClick={() => setMenuOpen(false)}>Earned Wage Access</Link>
        <Link href="/how-it-works" onClick={() => setMenuOpen(false)}>How it works</Link>
        <Link href="/for-communities" onClick={() => setMenuOpen(false)}>For Communities</Link>
        <Link href="/for-lenders" onClick={() => setMenuOpen(false)}>For Lenders</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <a href="mailto:info@payday.in" rel="noopener noreferrer">{t('cta.partner')}</a>
        <div className="language-toggle" role="group" aria-label="Select language">
          {languageOptions.map((option) => (
            <button
              key={option.code}
              type="button"
              className={`language-chip ${language === option.code ? 'active' : ''}`}
              onClick={() => setLanguage(option.code)}
              aria-pressed={language === option.code}
              aria-label={`Set language to ${option.label}`}
            >
              {option.label}
            </button>
          ))}
        </div>

      </div>
    </header>
  );
}
