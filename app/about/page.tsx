import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Payday',
  description: 'Payday is a Lending Service Provider dedicated to responsible earned wage access for workers in Tier-1 Indian cities.',
};

export default function About() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">About Payday</div>
          <h1>We help workers access what they&apos;ve already earned.</h1>
          <p>Payday is a Lending Service Provider focused on responsible Earned Wage Access for workers in gated communities across Tier-1 Indian cities.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Payday mission illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>Mission</h3>
            <p className="small">Enable dignified, transparent wage access that helps workers meet goals without debt traps.</p>
          </div>
          <div className="card">
            <h3>Principles</h3>
            <p className="small">Consent-led, privacy-forward, and simple enough to explain in one WhatsApp message.</p>
          </div>
          <div className="card">
            <h3>Partnerships</h3>
            <p className="small">We partner with regulated lenders and community platforms to ensure safe access.</p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <div>
              <strong>Consent &amp; verification</strong>
              <p className="small">Workers opt in and confirm employment through their community platform.</p>
            </div>
          </div>
          <div className="step">
            <span>2</span>
            <div>
              <strong>Wage-linked access</strong>
              <p className="small">Limits are based on earned wages with clear reminders and caps.</p>
            </div>
          </div>
          <div className="step">
            <span>3</span>
            <div>
              <strong>Repay with ease</strong>
              <p className="small">Repayment aligns with payroll cycles to keep things predictable.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>Responsible Access</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Caps &amp; reminders</h3>
            <p className="small">We cap withdrawals and nudge users to avoid over-dependence.</p>
          </div>
          <div className="card">
            <h3>Cooling-off periods</h3>
            <p className="small">Mandatory gaps between withdrawals prevent cyclical borrowing.</p>
          </div>
          <div className="card">
            <h3>Clear data rights</h3>
            <p className="small">Consent can be revoked at any time. Data use is minimal and documented.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
