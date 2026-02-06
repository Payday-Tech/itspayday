import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';

export const metadata: Metadata = {
  title: 'For Workers | Payday',
  description: 'Payday for workers: fair, wage-linked credit with transparent pricing, clear limits, and multilingual support.',
};

export default function ForWorkers() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">For workers</div>
          <h1>Credit support that fits your real cash-flow cycle.</h1>
          <p>Borrow within wage-linked limits, see all charges upfront, and repay on schedules aligned to your earnings.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
            <GetStartedButton>WhatsApp Get Started</GetStartedButton>
            <Link className="button secondary" href="/fees">See fees</Link>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Worker illustration"
            width={960}
            height={640}
          />
          <div className="trust-box">
            <strong>Respectful support</strong>
            <p className="small">Friendly guidance in English, Hinglish, Kannada, and Hindi.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>Simple benefits</h3>
            <p className="small">Access your earned wages for urgent needs while staying in control of your budget.</p>
          </div>
          <div className="card">
            <h3>Safe limits</h3>
            <p className="small">Caps and reminders ensure you never borrow beyond what you&apos;ve already earned.</p>
          </div>
          <div className="card">
            <h3>Privacy-first</h3>
            <p className="small">We only use data you consent to, and you can revoke access anytime.</p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>FAQs</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Who can apply?</h3>
            <p className="small">Workers in gated communities and gig platforms across Tier-1 cities.</p>
          </div>
          <div className="card">
            <h3>Do I need a credit score?</h3>
            <p className="small">No. We rely on wage and consent-based data rather than traditional scores.</p>
          </div>
          <div className="card">
            <h3>How do I get support?</h3>
            <p className="small">Our team supports you via WhatsApp, phone, and in your preferred language.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
