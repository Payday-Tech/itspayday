import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How Payday Works',
  description: "Understand Payday's consent-led earned wage access flow, safety rails, and repayment process.",
};

export default function HowItWorks() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">How it works</div>
          <h1>Consent-led access in three simple steps.</h1>
          <p>Payday keeps the process simple for workers, communities, and lenders while staying compliant.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="How it works illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <div className="steps">
          <div className="step">
            <span>1</span>
            <div>
              <strong>Opt-in via WhatsApp</strong>
              <p className="small">Workers submit details and consent to share employment data.</p>
            </div>
          </div>
          <div className="step">
            <span>2</span>
            <div>
              <strong>Verify &amp; set limits</strong>
              <p className="small">Community platforms confirm employment; wage-linked limits are set.</p>
            </div>
          </div>
          <div className="step">
            <span>3</span>
            <div>
              <strong>Disburse &amp; repay</strong>
              <p className="small">Funds are disbursed by partner lenders with transparent fees and reminders.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>Safety rails</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Caps &amp; limits</h3>
            <p className="small">Limits are tied to earned wages to prevent over-borrowing.</p>
          </div>
          <div className="card">
            <h3>Cooling-off</h3>
            <p className="small">Scheduled gaps between withdrawals encourage healthier usage.</p>
          </div>
          <div className="card">
            <h3>Transparent fees</h3>
            <p className="small">Every charge is shared in advance with clear examples.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
