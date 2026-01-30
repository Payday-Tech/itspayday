import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Grievance Redressal | Payday',
  description: 'Payday grievance redressal policy with escalation levels, timelines, and contact details.',
};

export default function GrievanceRedressal() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Grievance Redressal</div>
          <h1>We take complaints seriously and respond quickly.</h1>
          <p>Payday provides clear escalation levels, transparent timelines, and dedicated officers for support.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Support illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <div className="notice">
          <strong>Primary contact:</strong> grievance@payday.in &middot; +91-00000-00000 (Mon&ndash;Sat, 9am&ndash;6pm)
        </div>
      </section>

      <section className="section-alt">
        <h2>Escalation levels</h2>
        <div className="timeline">
          <div className="timeline-item">
            <strong>Level 1: Support team</strong>
            <p className="small">Write to grievance@payday.in or call. Response within 2 business days.</p>
          </div>
          <div className="timeline-item">
            <strong>Level 2: Nodal officer</strong>
            <p className="small">If unresolved, escalate to nodal.officer@payday.in within 5 business days.</p>
          </div>
          <div className="timeline-item">
            <strong>Level 3: Partner lender escalation</strong>
            <p className="small">If still unresolved, we connect you with the partner lender&apos;s grievance officer within 7 business days.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Important details</h2>
        <ul className="small">
          <li>Provide your registered mobile number, transaction date, and issue summary.</li>
          <li>We log every complaint and share a tracking ID.</li>
          <li>All grievances follow RBI and partner lender requirements.</li>
        </ul>
      </section>
    </main>
  );
}
