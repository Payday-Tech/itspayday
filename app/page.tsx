'use client';

import Image from 'next/image';
import { useState } from 'react';
import GetStartedButton from '@/components/GetStartedButton';

const DEMAND_PARTNERS = [
  { name: 'MyGate', desc: 'Housing societies' },
  { name: 'Snabbit', desc: 'On-demand home help' },
  { name: 'Pronto', desc: 'On-demand home help' },
  { name: '+ more platforms', desc: '' },
];

const SUPPLY_PARTNERS = [
  { name: 'NBFCs', desc: 'Non-banking lenders' },
  { name: 'Banks', desc: 'Scheduled commercial banks' },
  { name: 'Regulated lenders', desc: 'RBI licensed' },
];


const FAQS = [
  {
    q: 'Do I need a CIBIL score?',
    a: 'No. We use your work history and earnings from your employer platform to assess eligibility — not credit bureau scores.',
  },
  {
    q: 'How fast can I get the money?',
    a: 'Once eligible, funds are disbursed within hours directly to your bank account.',
  },
  {
    q: 'How do I apply?',
    a: 'The entire journey happens on WhatsApp. No app download, no branch visit needed.',
  },
  {
    q: 'How do I repay?',
    a: 'Repayment is aligned with your salary cycle — automatic and transparent.',
  },
  {
    q: 'Who actually lends the money?',
    a: 'Payday is a Lending Service Provider (LSP). Loans are issued by our regulated NBFC and bank partners after consent and eligibility checks.',
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero">
        <div>
          <span className="badge">Salary Advances · Domestic Workers</span>
          <h1>Access what you&apos;ve earned —<br />before payday</h1>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.65, marginTop: 14, maxWidth: 500, color: 'var(--color-ink-700)' }}>
            Domestic workers can access salary advances or credit on a WhatsApp-based journey — verified through their work data. No CIBIL score. No branch visits.
          </p>

          <div className="hero-actions">
            <GetStartedButton />
            <a className="button secondary" href="mailto:partnerships@itspayday.in">
              Partner with us →
            </a>
          </div>
          <p style={{ marginTop: 16, fontSize: '0.82rem', color: 'var(--color-ink-500)' }}>
            Payday is a Lending Service Provider. Loans are issued by regulated partner lenders after consent and eligibility checks.
          </p>
        </div>

        {/* WhatsApp mockup */}
        <div className="hero-visual" style={{ background: 'linear-gradient(140deg, #e8f5e2 0%, #d4ece9 100%)', border: '1px solid #c3ddd8' }}>
          <div className="wa-phone">
            {/* Status bar */}
            <div className="wa-statusbar">
              <span>9:41</span>
              <span className="wa-statusbar-icons">▲ ◼ ◼◼◼</span>
            </div>
            {/* Chat header */}
            <div className="wa-header">
              <div className="wa-avatar">P</div>
              <div className="wa-header-info">
                <div className="wa-header-name">Payday</div>
                <div className="wa-header-status">● online</div>
              </div>
            </div>
            {/* Messages */}
            <div className="wa-messages">
              <div className="wa-date-chip">Today</div>

              <div className="wa-bubble wa-received">
                <span className="wa-bubble-sender">Payday</span>
                Namaste Rekha 👋 You&apos;ve worked 18 days this month with Sunflower Society.<br /><br />
                You can access <strong>₹2,400</strong> right now — straight to your bank.
                <span className="wa-time">9:38 AM</span>
              </div>

              <div className="wa-quick-replies">
                <button className="wa-reply-btn">Yes, send ₹2,400 ✓</button>
                <button className="wa-reply-btn wa-reply-ghost">Not now</button>
              </div>

              <div className="wa-bubble wa-sent">
                Yes, send ₹2,400 ✓
                <span className="wa-time">9:39 AM ✓✓</span>
              </div>

              <div className="wa-bubble wa-received">
                ✅ <strong>₹2,400 sent!</strong> It will reach your account ending <strong>4521</strong> within minutes.<br /><br />
                Repayment of ₹2,520 will be auto-deducted on your salary date.
                <span className="wa-time">9:39 AM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ecosystem Infographic ── */}
      <section className="section-alt eco-section">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <h2 style={{ marginBottom: 8 }}>How the ecosystem works</h2>
          <p className="small">
            Payday sits at the centre — connecting work platforms with regulated lenders to serve India&apos;s domestic workforce.
          </p>
        </div>

        <div className="ecosystem">
          {/* Left: Demand Partners */}
          <div className="eco-col eco-col-left">
            <div className="eco-col-header">
              <div className="eco-col-label">Work Platforms</div>
              <div className="eco-col-sublabel">Attendance · Earnings · Tenure</div>
            </div>
            {DEMAND_PARTNERS.map((p) => (
              <div key={p.name} className="eco-pill eco-pill-demand">
                <span className="eco-pill-name">{p.name}</span>
                {p.desc && <span className="eco-pill-desc">{p.desc}</span>}
              </div>
            ))}
          </div>

          {/* Center: PayDay Hub */}
          <div className="eco-center">
            <div className="eco-connector eco-connector-left">
              <div className="eco-arrow-label">work data</div>
              <div className="eco-arrow-line">
                <div className="eco-arrow-shaft" />
                <div className="eco-arrow-head">›</div>
              </div>
            </div>

            <div className="eco-hub">
              <Image
                src="/payday-logo.svg"
                alt="Payday"
                width={96}
                height={28}
                style={{ filter: 'brightness(0) invert(1)', marginBottom: 14 }}
              />
              <div className="eco-hub-tags">
                <span className="eco-hub-tag">AI underwriting</span>
                <span className="eco-hub-tag">WhatsApp journey</span>
                <span className="eco-hub-tag">Instant disbursal</span>
              </div>
              <div className="eco-hub-worker">
                <span>🏠</span>
                <span>50M+ domestic workers</span>
              </div>
            </div>

            <div className="eco-connector eco-connector-right">
              <div className="eco-arrow-line">
                <div className="eco-arrow-head">›</div>
                <div className="eco-arrow-shaft" />
              </div>
              <div className="eco-arrow-label">loan capital</div>
            </div>
          </div>

          {/* Right: Supply Partners */}
          <div className="eco-col eco-col-right">
            <div className="eco-col-header">
              <div className="eco-col-label">Lending Partners</div>
              <div className="eco-col-sublabel">RBI-regulated capital</div>
            </div>
            {SUPPLY_PARTNERS.map((p) => (
              <div key={p.name} className="eco-pill eco-pill-supply">
                <span className="eco-pill-name">{p.name}</span>
                {p.desc && <span className="eco-pill-desc">{p.desc}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section>
        <h2>How it works</h2>
        <p className="small" style={{ marginBottom: 28 }}>Three steps. Fully on WhatsApp. No paperwork.</p>
        <div className="how-it-works-row">
          <div className="step">
            <span>1</span>
            <div>
              <strong>Work verified</strong>
              <p style={{ margin: '6px 0 0', fontSize: '0.9rem', color: 'var(--color-ink-500)' }}>
                Your employer platform — MyGate, Snabbit, or Pronto — shares your attendance and earnings with your consent.
              </p>
            </div>
          </div>
          <div className="step">
            <span>2</span>
            <div>
              <strong>Instant decision on WhatsApp</strong>
              <p style={{ margin: '6px 0 0', fontSize: '0.9rem', color: 'var(--color-ink-500)' }}>
                Our AI engine reviews your eligibility in minutes. No branch visit, no forms, no waiting.
              </p>
            </div>
          </div>
          <div className="step">
            <span>3</span>
            <div>
              <strong>Money in. Repay on salary day.</strong>
              <p style={{ margin: '6px 0 0', fontSize: '0.9rem', color: 'var(--color-ink-500)' }}>
                Funds hit your bank account within hours. Repayment is deducted on your salary date — simple and transparent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-alt">
        <h2>Frequently asked questions</h2>
        <div className="steps" style={{ marginTop: 24 }}>
          {FAQS.map((faq, i) => (
            <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <button
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '18px 24px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontWeight: 600,
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  color: 'var(--color-ink-900)',
                }}
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                {faq.q}
                <span aria-hidden="true" style={{ fontSize: '1.2rem', color: 'var(--color-ink-500)', marginLeft: 12, flexShrink: 0 }}>
                  {openFaq === i ? '−' : '+'}
                </span>
              </button>
              {openFaq === i && (
                <p style={{ margin: 0, padding: '0 24px 20px', color: 'var(--color-ink-700)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
