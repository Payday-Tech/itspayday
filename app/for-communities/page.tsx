import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const communitiesHeroImageUrl =
  'https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?auto=format&fit=crop&w=1600&q=90';

export const metadata: Metadata = {
  title: 'For Communities & Employers | Payday',
  description: 'Payday helps communities support trusted workers with fair credit access without adding balance-sheet or repayment risk.',
};

export default function ForCommunities() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">For communities & employers</div>
          <h1>Offer better financial support without becoming the lender.</h1>
          <p>
            Payday helps your workforce access responsible credit while regulated lenders manage underwriting and loan disbursal.
            Your team stays focused on operations.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="mailto:partnerships@itspayday.in" rel="noopener noreferrer">Contact partnerships</a>
            <Link className="button secondary" href="/security">Review security</Link>
          </div>
        </div>

        <div className="hero-visual">
          <Image
            src={communitiesHeroImageUrl}
            alt="Two women in a kitchen smiling while looking at a phone"
            width={960}
            height={640}
            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '16px' }}
          />
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card"><h3>No lending exposure</h3><p className="small">Partner lenders issue loans. Payday operates as LSP and servicing layer.</p></div>
          <div className="card"><h3>Low operational effort</h3><p className="small">Simple onboarding and repayment communication designed for large communities.</p></div>
          <div className="card"><h3>Better worker outcomes</h3><p className="small">Transparent pricing and wage-linked limits improve trust and retention.</p></div>
        </div>
      </section>

      <section className="section-alt">
        <h2>Consent-first model</h2>
        <p className="small">
          Worker consent is mandatory before data use. Payday shares key terms, fees, and grievance channels before any disbursal.
        </p>
      </section>
    </main>
  );
}
