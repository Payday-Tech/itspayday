'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav>
        <Link className="logo" href="/">
          <span>P</span> Payday
        </Link>
        <div className="nav-links">
          <Link href="/products">Products</Link>
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
          >
            Menu
          </button>
          <button
            className="button primary"
            onClick={onOpenModal}
          >
            Get Started
          </button>
        </div>
        <div className="nav-links">
          <a className="button secondary" href="mailto:info@payday.in" rel="noopener noreferrer">
            Partner with us
          </a>
          <button
            className="button primary"
            onClick={onOpenModal}
          >
            Get Started
          </button>
        </div>
      </nav>
      <div className={`menu-panel ${menuOpen ? 'open' : ''}`}>
        <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link href="/how-it-works" onClick={() => setMenuOpen(false)}>How it works</Link>
        <Link href="/for-communities" onClick={() => setMenuOpen(false)}>For Communities</Link>
        <Link href="/for-lenders" onClick={() => setMenuOpen(false)}>For Lenders</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <a href="mailto:info@payday.in" rel="noopener noreferrer">Partner with us</a>
      </div>
    </header>
  );
}
