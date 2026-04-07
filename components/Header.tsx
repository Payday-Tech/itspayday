'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useModal } from './ModalContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useModal();

  return (
    <header>
      <nav>
        <Link className="logo" href="/" aria-label="Payday home">
          <Image src="/payday-logo.svg" alt="Payday" width={176} height={58} priority />
        </Link>

        <div className="nav-links">
          <Link href="/for-communities">For Communities</Link>
          <Link href="/for-lenders">For Lenders</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="nav-actions">
          <button className="button primary" onClick={openModal}>Get Started</button>
        </div>

        <div className="mobile-nav">
          <button
            className="button secondary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            Menu
          </button>
          <button className="button primary" onClick={openModal}>Get Started</button>
        </div>
      </nav>

      <div className={`menu-panel ${menuOpen ? 'open' : ''}`}>
        <Link href="/for-communities" onClick={() => setMenuOpen(false)}>For Communities</Link>
        <Link href="/for-lenders" onClick={() => setMenuOpen(false)}>For Lenders</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
      </div>
    </header>
  );
}
