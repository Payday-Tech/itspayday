import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Communities & Employers | Payday',
  description: 'Payday helps communities support domestic workers without taking on capital or risk, with reliable access and repayment.',
};

export default function ForCommunities() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">For communities &amp; employers</div>
          <h1>Support your house help without taking on risk.</h1>
          <p>Give workers access to capital when they need it while you stay free from capital allocation and repayment risk.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
            <a className="button primary" href="mailto:info@payday.in" rel="noopener noreferrer">Contact us</a>
            <Link className="button secondary" href="/trust">See trust framework</Link>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Community support illustration"
            width={960}
            height={640}
          />
          <div className="trust-box">
            <strong>Stability &amp; reliability</strong>
            <p className="small">Reliable access improves attendance, trust, and long-term stability.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>Zero capital burden</h3>
            <p className="small">Lender partners provide capital. You simply enable consent-based verification.</p>
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
        <p className="small">Payday only uses employment data with clear worker consent. Communities can support inclusion while respecting privacy.</p>
      </section>
    </main>
  );
}
