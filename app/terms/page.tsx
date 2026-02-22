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
          <div className="badge">Terms & conditions</div>
          <h1>Clear terms for transparent borrowing journeys.</h1>
          <p>These terms explain Payday&apos;s role as an LSP, how loans are issued by partner lenders, and what users can expect at each step.</p>
        </div>
        <div className="hero-visual"><Image src="/hero-worker.svg" alt="Terms illustration" width={960} height={640} /></div>
      </section>

      <section>
        <h2>1. Payday&apos;s role</h2>
        <p className="small">Payday is a Lending Service Provider. Loans are provided by regulated partner lenders. Payday assists with onboarding, communication, and servicing workflows.</p>
      </section>

      <section className="section-alt">
        <h2>2. Consent and eligibility</h2>
        <ul className="small"><li>User consent is required for processing and data sharing.</li><li>Eligibility is determined by partner lenders as per approved policy.</li><li>Consent revocation may be subject to active repayment obligations.</li></ul>
      </section>

      <section>
        <h2>3. Fees and repayment</h2>
        <ul className="small"><li>Fees, charges, and repayment amount are disclosed before confirmation.</li><li>Repayments follow approved schedules from the lender partner.</li><li>Delayed repayment may attract lender-defined charges.</li></ul>
      </section>

      <section className="section-alt">
        <h2>4. Complaints and escalation</h2>
        <p className="small">For support or complaints, please use our <Link href="/grievance-redressal">Grievance Redressal</Link> channels. For data practices, see <Link href="/privacy">Privacy Policy</Link>.</p>
      </section>
    </main>
  );
}
