import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'LSP Disclosure | Payday',
  description: 'Payday LSP disclosure describing role, partner lender responsibilities, and user rights.',
};

export default function LSPDisclosure() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">LSP Disclosure</div>
          <h1>Exactly what Payday does—and what it doesn&apos;t.</h1>
          <p>Payday handles onboarding, consent, and servicing; regulated lenders make credit decisions and issue loans.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="LSP disclosure illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <h2>Key disclosures</h2>
        <ul className="small">
          <li>Payday does not provide loans directly and does not take deposits.</li>
          <li>All loans are issued by RBI-regulated partner lenders.</li>
          <li>We receive a service fee from partner lenders for facilitating services.</li>
          <li>Loan terms, interest, and repayment schedules are shared prior to disbursal.</li>
        </ul>
      </section>

      <section className="section-alt">
        <h2>Your rights</h2>
        <ul className="small">
          <li>Receive a Key Fact Statement before confirmation.</li>
          <li>Access grievance redressal channels and escalation paths.</li>
          <li>Opt out of data sharing except where required for servicing.</li>
        </ul>
      </section>
    </main>
  );
}
