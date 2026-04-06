import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Communities & Employers | Payday',
  description: 'Payday helps communities support trusted workers with fair credit access without adding balance-sheet or repayment risk.',
};

export default function ForCommunities() {
  return (
    <main>
      <section className="hero">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center', maxWidth: 'var(--container)' }}>
          <div>
            <span className="overline">For communities &amp; employers</span>
            <h1>Support your workers. Without becoming their lender.</h1>
            <p>Payday helps your workforce access responsible credit while regulated lenders manage underwriting and disbursal. Your team stays focused on operations.</p>
            <div className="hero-actions">
              <a className="button primary" href="mailto:partnerships@itspayday.in">Contact partnerships</a>
              <Link className="button secondary" href="/security">Review security</Link>
            </div>
          </div>
          <div>
            <Image
              src="/forcommunities.png"
              alt="Two women in a kitchen smiling while looking at a phone"
              width={960}
              height={960}
              priority
              style={{ borderRadius: 20, width: '100%', height: 'auto' }}
            />
          </div>
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
        <h2>Consent-first, always</h2>
        <p style={{ maxWidth: 600, color: 'var(--color-ink-700)', marginBottom: 0, lineHeight: 1.7 }}>
          Worker consent is mandatory before any data is accessed or shared. Payday communicates key terms, fees, and grievance channels to every worker before disbursal — in their preferred language.
        </p>
      </section>
    </main>
  );
}
