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
          <Image src="/payday-logo.svg" alt="Payday" width={176} height={58} priority />
        </Link>
        <div className="nav-links">
          <Link href="/for-communities">For Communities</Link>
          <Link href="/for-lenders">For Lenders</Link>
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
          <label className="language-select-label" htmlFor="language-select">Language</label>
          <select
            id="language-select"
            className="language-select"
            value={language}
            onChange={(event) => setLanguage(event.target.value as typeof language)}
            aria-label="Select language"
          >
            {languageOptions.map((option) => (
              <option key={option.code} value={option.code}>{option.label}</option>
            ))}
          </select>
          <a className="button secondary" href="mailto:info@payday.in" rel="noopener noreferrer">
            {t('cta.partner')}
          </a>
          <button className="button primary" onClick={() => { setLanguage('hng'); onOpenModal(); }}>
            {t('cta.getStarted')}
          </button>
        </div>
      </nav>
      <div className={`menu-panel ${menuOpen ? 'open' : ''}`}>
        <Link href="/for-communities" onClick={() => setMenuOpen(false)}>For Communities</Link>
        <Link href="/for-lenders" onClick={() => setMenuOpen(false)}>For Lenders</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <a href="mailto:info@payday.in" rel="noopener noreferrer">{t('cta.partner')}</a>
        <select
          className="language-select"
          value={language}
          onChange={(event) => setLanguage(event.target.value as typeof language)}
          aria-label="Select language"
        >
          {languageOptions.map((option) => (
            <option key={option.code} value={option.code}>{option.label}</option>
          ))}
        </select>
      </div>
    </header>
  );
}
