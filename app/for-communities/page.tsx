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
          <div className="badge">For communities &amp; employers</div>
          <h1>Support your workforce without becoming the lender.</h1>
          <p>Enable timely financial support for domestic workers while Payday and regulated lenders handle underwriting, servicing, and collections.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
            <a className="button primary" href="mailto:info@payday.in" rel="noopener noreferrer">Contact us</a>
            <Link className="button secondary" href="/security">See security posture</Link>
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
          <div className="card">
            <h3>No money risk for you</h3>
            <p className="small">Partner lenders provide the funds. You only help workers access Payday.</p>
          </div>
          <div className="card">
            <h3>Minimal operations</h3>
            <p className="small">Easy onboarding and payroll-aligned repayments reduce admin work.</p>
          </div>
          <div className="card">
            <h3>Build financial discipline</h3>
            <p className="small">Workers gain structured access to financial services and build toward goals.</p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>Consent model</h2>
        <p className="small">We ask workers first. With their approval, we use relevant platform records or bank statements through consent-based authentication.</p>
      </section>
    </main>
  );
}
