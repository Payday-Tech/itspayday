import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Privacy Policy | Payday',
  description: 'Payday privacy policy explaining data collection, usage, sharing, and user rights.',
};

export default function Privacy() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Privacy policy</div>
          <h1>Data is collected only for defined financial and compliance purposes.</h1>
          <p>Payday follows consent-led data handling aligned with lender partner requirements and applicable regulation.</p>
        </div>
        <div className="hero-visual"><Image src="/hero-worker.svg" alt="Privacy illustration" width={960} height={640} /></div>
      </section>

      <section>
        <h2>What we collect</h2>
        <ul className="small">
          <li>Identity and contact details shared through form or WhatsApp onboarding.</li>
          <li>Employment and wage information shared with user consent.</li>
          <li>Transaction, repayment, and support interaction records.</li>
        </ul>
      </section>

      <section className="section-alt">
        <h2>How data is used</h2>
        <ul className="small">
          <li>Eligibility checks, servicing operations, and repayment communications.</li>
          <li>Fraud prevention, dispute resolution, and regulatory reporting.</li>
          <li>Product performance monitoring and quality improvements.</li>
        </ul>
      </section>

      <section>
        <h2>Sharing and rights</h2>
        <ul className="small">
          <li>Data is shared only with regulated lenders and authorized processors.</li>
          <li>Data retention follows legal, audit, and servicing requirements.</li>
          <li>For data requests, write to privacy@itspayday.in.</li>
        </ul>
      </section>
    </main>
  );
}
