import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Communities & Employers | Payday',
  description: 'Payday helps communities support trusted workers with fair credit access without adding balance-sheet or repayment risk.',
};

export default function ForCommunities() {
  return (
    <main>
      <section className="hero">
        <span className="overline">For communities &amp; employers</span>
        <h1>Support your workers. Without becoming their lender.</h1>
        <p className="hero-sub">
          Payday helps your workforce access responsible credit while regulated lenders manage underwriting
          and disbursal. Your team stays focused on operations.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="mailto:partnerships@itspayday.in">Contact partnerships</a>
          <Link className="button secondary" href="/contact">Talk to us</Link>
        </div>
      </section>

      <section>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-card-icon">🛡️</span>
            <h3>No lending exposure</h3>
            <p>Partner lenders issue loans. Payday operates as LSP and servicing layer — your balance sheet is never at risk.</p>
          </div>
          <div className="feature-card">
            <span className="feature-card-icon">⚡</span>
            <h3>Low operational effort</h3>
            <p>Simple onboarding and repayment communication designed for large housing societies and on-demand platforms.</p>
          </div>
          <div className="feature-card">
            <span className="feature-card-icon">💚</span>
            <h3>Better worker outcomes</h3>
            <p>Transparent pricing and wage-linked limits improve financial wellbeing, trust, and worker retention.</p>
          </div>
        </div>
      </section>

      <section className="section-alt" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <span className="overline">Our commitment</span>
        <h2 className="section-title">Consent-first, always</h2>
        <div className="steps" style={{ marginTop: 32, maxWidth: 640 }}>
          <div className="step">
            <span>1</span>
            <div>
              <strong>Worker consent before anything</strong>
              <p className="small">No data is accessed or shared without explicit approval from the worker. Payday communicates key terms before any action is taken.</p>
            </div>
          </div>
          <div className="step">
            <span>2</span>
            <div>
              <strong>Fees disclosed upfront</strong>
              <p className="small">Interest rates, processing fees, and repayment schedules are communicated clearly in the worker&apos;s preferred language before disbursal.</p>
            </div>
          </div>
          <div className="step">
            <span>3</span>
            <div>
              <strong>Grievance channels available</strong>
              <p className="small">Workers have access to a dedicated grievance redressal channel. All complaints are logged and resolved within the RBI-mandated timeline.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
