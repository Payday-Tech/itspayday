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
          <div className="badge">Earned Wage Access</div>
          <h1>Credit that rewards consistent work behaviour.</h1>
          <p>Payday enables short-tenor credit with wage-linked limits, transparent pricing, and repayment journeys aligned to real income patterns.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
            <GetStartedButton />
            <Link className="button secondary" href="/fees">View fees</Link>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Worker with a phone illustration"
            width={960}
            height={640}
          />
          <div className="trust-box">
            <strong>Use cases</strong>
            <p className="small">School fees, medical bills, transport, or seasonal family needs.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>How limits work</h3>
            <p className="small">Limits are linked to earned wages and backed by consent-based data from platforms like Snabbit or MyGate. We never access data without clear worker consent.</p>
          </div>
          <div className="card">
            <h3>Fee transparency</h3>
            <p className="small">You see the processing fee and interest up front before you confirm. No hidden charges, no surprise deductions.</p>
          </div>
          <div className="card">
            <h3>Consent &amp; data usage</h3>
            <p className="small">We use minimum data necessary to verify eligibility, with clear consent, revocation options, and privacy-first practices.</p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>Responsible access safeguards</h2>
        <div className="steps">
          <div className="step">
            <span>&#10003;</span>
            <div>
              <strong>Wage-linked caps</strong>
              <p className="small">Caps prevent over-borrowing and encourage healthy usage.</p>
            </div>
          </div>
          <div className="step">
            <span>&#10003;</span>
            <div>
              <strong>Frequency limits</strong>
              <p className="small">Cooling-off periods reduce dependence and support planning.</p>
            </div>
          </div>
          <div className="step">
            <span>&#10003;</span>
            <div>
              <strong>Repayment reminders</strong>
              <p className="small">Friendly reminders and assistance keep repayment easy and predictable.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2>FAQ</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Is this a loan?</h3>
            <p className="small">Earned Wage Access is structured through partner lenders with Payday as the LSP. We ensure transparent pricing and consent.</p>
          </div>
          <div className="card">
            <h3>How do I repay?</h3>
            <p className="small">Repayments align with salary cycles, with reminders and support from your community platform.</p>
          </div>
          <div className="card">
            <h3>Can I opt out?</h3>
            <p className="small">Yes. You can revoke consent and opt out at any time without penalties.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
