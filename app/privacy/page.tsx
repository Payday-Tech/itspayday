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
          <div className="badge">Privacy Policy</div>
          <h1>Your data is handled with care and consent.</h1>
          <p>Payday follows consent-led, privacy-forward practices aligned with RBI and partner lender requirements.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Privacy illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <h2>What we collect</h2>
        <ul className="small">
          <li>Identity and contact details you submit via WhatsApp or forms.</li>
          <li>Employment and wage data shared with your consent from community platforms.</li>
          <li>Transaction and repayment data linked to your wage access.</li>
        </ul>
      </section>

      <section className="section-alt">
        <h2>How we use data</h2>
        <ul className="small">
          <li>To assess eligibility, set wage-linked limits, and support repayment.</li>
          <li>To communicate in your preferred language and channel.</li>
          <li>To improve product safety and meet regulatory obligations.</li>
        </ul>
      </section>

      <section>
        <h2>Sharing &amp; retention</h2>
        <ul className="small">
          <li>Data is shared only with regulated partner lenders, payment partners, and verified service providers.</li>
          <li>We retain data only as long as required by law or for servicing your account.</li>
          <li>You can request access, correction, or deletion through privacy@payday.in.</li>
        </ul>
      </section>
    </main>
  );
}
