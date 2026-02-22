import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Payday',
  description: 'Payday is building credit-first financial access for domestic and on-demand workers in India&apos;s gated communities.',
};

export default function About() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">About Payday</div>
          <h1>We design responsible credit journeys for India&apos;s everyday workforce.</h1>
          <p>Payday is an LSP enabling wage-linked credit with regulated lending partners, consent-led operations, and clear communication in local languages.</p>
        </div>
        <div className="hero-visual">
          <Image src="/hero-worker.svg" alt="Payday mission illustration" width={960} height={640} />
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card"><h3>Mission</h3><p className="small">Expand fair access to short-tenor credit without hidden terms or debt traps.</p></div>
          <div className="card"><h3>Operating principles</h3><p className="small">Consent first. Transparent fees. Dignified servicing. Strong compliance discipline.</p></div>
          <div className="card"><h3>Partnership model</h3><p className="small">Lenders issue loans; Payday supports onboarding, servicing, repayments, and grievance routing.</p></div>
        </div>
      </section>

      <section className="section-alt">
        <h2>How Payday works</h2>
        <div className="steps">
          <div className="step"><span>1</span><div><strong>Worker consent and verification</strong><p className="small">Users approve data use before eligibility checks begin.</p></div></div>
          <div className="step"><span>2</span><div><strong>Lender decisioning</strong><p className="small">Regulated partner lenders approve limits and terms.</p></div></div>
          <div className="step"><span>3</span><div><strong>Servicing and repayment</strong><p className="small">Payday supports reminders, communication, and grievance redressal.</p></div></div>
        </div>
      </section>
    </main>
  );
}
