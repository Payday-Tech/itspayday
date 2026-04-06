'use client';

import { useState } from 'react';
import Image from 'next/image';
import GetStartedButton from '@/components/GetStartedButton';

const SUPPLY_PARTNERS = [
  { name: 'NBFCs', desc: 'Non-banking lenders' },
  { name: 'Banks', desc: 'Scheduled commercial banks' },
  { name: 'Regulated lenders', desc: 'RBI licensed' },
];

const FLOW_STEPS = [
  { num: '01', title: 'Basic Details',        desc: 'Name and phone number',                              icon: '👤' },
  { num: '02', title: 'KYC',                  desc: 'Identity verification',                              icon: '🪪' },
  { num: '03', title: 'Work Signals',         desc: 'Attendance, tenure, households served, earnings',    icon: '📊' },
  { num: '04', title: 'Bank Verification',    desc: 'Account details and statement check',                icon: '🏦' },
  { num: '05', title: 'Disbursal',            desc: 'Money in your bank within hours',                   icon: '💸' },
  { num: '06', title: 'Repayment',            desc: 'UPI AutoPay or eNACH on salary date',               icon: '🔄' },
];

const FAQS = [
  {
    q: 'What documents do I need?',
    a: 'Just your KYC documents (Aadhaar/PAN), bank account details, and your work history from your employer platform — no salary slips or lengthy paperwork.',
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
    a: 'Repayment is set up via UPI AutoPay or eNACH, automatically deducted on your salary date.',
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

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-text">
          <h1>Access what you&apos;ve<br />earned — before payday</h1>
          <p className="hero-sub">
            Domestic workers can access salary advances on a WhatsApp-based journey,
            underwritten through their work data.
          </p>
          <div className="hero-actions">
            <GetStartedButton />
            <a className="button secondary" href="mailto:partnerships@itspayday.in">
              Partner with us →
            </a>
          </div>
          <p className="hero-legal">
            Payday is a Lending Service Provider. Loans are issued by regulated partner lenders
            after consent and eligibility checks.
          </p>
        </div>

        <div className="hero-mockup">
          <div className="wa-phone">
            <div className="wa-statusbar">
              <span>9:41</span>
              <span className="wa-statusbar-icons">▲ ◼ ◼◼◼</span>
            </div>
            <div className="wa-header">
              <div className="wa-avatar">P</div>
              <div className="wa-header-info">
                <div className="wa-header-name">Payday</div>
                <div className="wa-header-status">● online</div>
              </div>
            </div>
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
                Repayment of ₹2,520 will be auto-deducted on your next salary date.
                <span className="wa-time">9:39 AM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section className="eco-section">
        <h2 className="section-title">How the ecosystem works</h2>
        <p className="section-sub">
          Payday connects work platforms with regulated lenders to serve India&apos;s domestic workforce.
        </p>

        <div className="ecosystem">
          <div className="eco-col eco-col-left">
            <div className="eco-col-header">
              <div className="eco-col-label">Work Platforms</div>
              <div className="eco-col-sublabel">Attendance · Earnings · Tenure</div>
            </div>
            <div className="eco-pill eco-pill-demand">
              <span className="eco-pill-name">Society Management Apps</span>
              <span className="eco-pill-desc">Housing society platforms</span>
            </div>
            <div className="eco-pill eco-pill-demand">
              <span className="eco-pill-name">Insta-Help Platforms</span>
              <span className="eco-pill-desc">On-demand home services</span>
            </div>
          </div>

          <div className="eco-center">
            <div className="eco-connector eco-connector-left">
              <div className="eco-arrow-label">work data</div>
              <div className="eco-arrow-line">
                <div className="eco-arrow-shaft" />
                <div className="eco-arrow-head">›</div>
              </div>
            </div>
            <div className="eco-hub">
              <Image src="/payday-logo.svg" alt="Payday" width={96} height={28}
                style={{ filter: 'brightness(0) invert(1)', marginBottom: 14 }} />
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

      {/* ── JOURNEY ── */}
      <section className="journey-section">
        <h2 className="section-title">The journey</h2>
        <p className="section-sub">From sign-up to money in your account — entirely on WhatsApp.</p>

        <div className="journey-grid">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} className="journey-step">
              <div className="journey-step-top">
                <span className="journey-icon">{step.icon}</span>
                {i < FLOW_STEPS.length - 1 && <div className="journey-connector" />}
              </div>
              <span className="journey-num">{step.num}</span>
              <strong className="journey-title">{step.title}</strong>
              <span className="journey-desc">{step.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <h2 className="section-title">Frequently asked questions</h2>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button
                className="faq-question"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                {faq.q}
                <span aria-hidden="true" className="faq-icon">
                  {openFaq === i ? '−' : '+'}
                </span>
              </button>
              {openFaq === i && <p className="faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
