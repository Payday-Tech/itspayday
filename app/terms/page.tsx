import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Payday',
  description: 'Payday terms and conditions for earned wage access services and LSP disclosures.',
};

export default function Terms() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Terms &amp; Conditions</div>
          <h1>Clear, compliant, and easy to understand.</h1>
          <p>These terms govern Payday&apos;s role as a Lending Service Provider and your access to earned wage services.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Terms illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <h2>1. Our role</h2>
        <p className="small">Payday is a Lending Service Provider (LSP). Loans are provided by regulated partner lenders, and Payday facilitates onboarding, consent, and servicing in alignment with RBI guidelines.</p>
      </section>

      <section className="section-alt">
        <h2>2. Eligibility &amp; consent</h2>
        <ul className="small">
          <li>You must be employed or engaged with a verified community or gig platform.</li>
          <li>You provide explicit consent for data access and loan processing.</li>
          <li>You can revoke consent at any time, subject to outstanding repayment obligations.</li>
        </ul>
      </section>

      <section>
        <h2>3. Fees &amp; repayment</h2>
        <ul className="small">
          <li>Processing fees and interest are displayed before you confirm any disbursal.</li>
          <li>Repayment aligns with salary cycles or the schedule agreed with the lender.</li>
          <li>Late payments may incur charges as defined by the partner lender.</li>
        </ul>
      </section>

      <section className="section-alt">
        <h2>4. Data usage</h2>
        <ul className="small">
          <li>We collect only the data needed for underwriting, servicing, and compliance.</li>
          <li>We do not sell personal data and share it only with authorized partners.</li>
          <li>See our <Link href="/privacy">Privacy Policy</Link> for details.</li>
        </ul>
      </section>

      <section>
        <h2>5. Grievance redressal</h2>
        <p className="small">If you have complaints, follow our <Link href="/grievance-redressal">Grievance Redressal</Link> procedure for prompt resolution.</p>
      </section>

      <section className="section-alt">
        <h2>6. Updates</h2>
        <p className="small">We may update these terms with notice. Continued use indicates acceptance of revised terms.</p>
      </section>
    </main>
  );
}
