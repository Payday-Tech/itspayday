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
  {
    num: '01',
    title: 'Basic Details',
    desc: 'Name and phone number',
    icon: '👤',
  },
  {
    num: '02',
    title: 'KYC',
    desc: 'Identity verification',
    icon: '🪪',
  },
  {
    num: '03',
    title: 'Work Signals',
    desc: 'Attendance, tenure, households served, earnings',
    icon: '📊',
  },
  {
    num: '04',
    title: 'Bank Verification',
    desc: 'Account details and statement check',
    icon: '🏦',
  },
  {
    num: '05',
    title: 'Disbursal',
    desc: 'Money in your bank within hours',
    icon: '💸',
  },
  {
    num: '06',
    title: 'Repayment',
    desc: 'UPI AutoPay or eNACH on salary date',
    icon: '🔄',
  },
];

const FAQS = [
  {
    q: 'What documents do I need?',
    a: 'Just your basic KYC documents (Aadhaar/PAN), bank account details, and your work history from your employer platform — no salary slips or lengthy paperwork.',
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
      {/* ── Hero ── */}
      <section className="hero">
        <div>
          <h1>Access what you&apos;ve earned —<br />before payday</h1>
          <p style={{ fontSize: '1.08rem', lineHeight: 1.7, marginTop: 16, maxWidth: 480, color: 'var(--color-ink-700)' }}>
            Domestic workers can access salary advances or credit on a WhatsApp-based journey — verified through their work data. No branch visits.
          </p>
          <div className="hero-actions">
            <GetStartedButton />
            <a className="button secondary" href="mailto:partnerships@itspayday.in">
              Partner with us →
            </a>
          </div>
          <p style={{ marginTop: 18, fontSize: '0.82rem', color: 'var(--color-ink-500)', lineHeight: 1.5 }}>
            Payday is a Lending Service Provider. Loans are issued by regulated partner lenders after consent and eligibility checks.
          </p>
        </div>

        {/* WhatsApp mockup */}
        <div className="hero-visual" style={{ background: 'linear-gradient(140deg, #e8f5e2 0%, #d4ece9 100%)', border: '1px solid #c3ddd8' }}>
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

      {/* ── Journey Flow Diagram ── */}
      <section className="flow-section">
        <h2>The journey</h2>
        <p className="small" style={{ marginBottom: 40 }}>From sign-up to money in your account — entirely on WhatsApp.</p>
        <div className="flow-diagram">
          {FLOW_STEPS.map((step, i) => (
            <div key={step.num} className="flow-row">
              <div className="flow-step">
                <div className="flow-icon">{step.icon}</div>
                <div className="flow-step-body">
                  <span className="flow-step-num">{step.num}</span>
                  <strong className="flow-step-title">{step.title}</strong>
                  <span className="flow-step-desc">{step.desc}</span>
                </div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <div className="flow-arrow">↓</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Ecosystem ── */}
      <section className="section-alt eco-section">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <h2 style={{ marginBottom: 8 }}>How the ecosystem works</h2>
          <p className="small">
            Payday sits at the centre — connecting work platforms with regulated lenders to serve India&apos;s domestic workforce.
          </p>
        </div>

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
      <section className="how-section">
        <div className="how-intro">
          <h2>How it works</h2>
          <p className="small">Three steps. Fully on WhatsApp. No paperwork.</p>
        </div>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-num">01</div>
            <div className="how-step-body">
              <strong>Work verified</strong>
              <p>Your employer platform shares attendance and earnings data with your consent.</p>
            </div>
          </div>
          <div className="how-step-divider" />
          <div className="how-step">
            <div className="how-step-num">02</div>
            <div className="how-step-body">
              <strong>Instant decision on WhatsApp</strong>
              <p>Our AI reviews your eligibility in minutes. No branch visit, no forms.</p>
            </div>
          </div>
          <div className="how-step-divider" />
          <div className="how-step">
            <div className="how-step-num">03</div>
            <div className="how-step-body">
              <strong>Money in. Repay on salary day.</strong>
              <p>Funds in your account within hours. Repayment aligned to your salary date.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <h2>Frequently asked questions</h2>
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
              {openFaq === i && (
                <p className="faq-answer">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
