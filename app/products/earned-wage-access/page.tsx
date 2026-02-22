import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import GetStartedButton from '@/components/GetStartedButton';

export const metadata: Metadata = {
  title: 'Earned Wage Access | Payday',
  description: "Learn how Payday&apos;s earned wage access product uses work-behaviour signals, wage-linked caps, and transparent repayment safeguards.",
};

export default function EarnedWageAccess() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Earned wage access</div>
          <h1>Short-tenor credit designed around earned income.</h1>
          <p>Payday helps workers access funds for urgent needs with clear fee disclosure, consent-led processing, and lender-issued loans.</p>
          <div className="hero-actions"><GetStartedButton /><Link className="button secondary" href="/fees">View fee schedule</Link></div>
        </div>
        <div className="hero-visual"><Image src="/hero-worker.svg" alt="Worker with a phone illustration" width={960} height={640} /></div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card"><h3>Eligibility and limits</h3><p className="small">Borrowing limits are linked to earned wages and consent-based work signals.</p></div>
          <div className="card"><h3>Transparent pricing</h3><p className="small">All fees, interest, and repayment amount are shown before confirmation.</p></div>
          <div className="card"><h3>LSP disclosure</h3><p className="small">Payday is an LSP. Loans are issued by regulated partner lenders.</p></div>
        </div>
      </section>
    </main>
  );
}
