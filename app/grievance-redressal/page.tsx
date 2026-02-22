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
          <div className="badge">Grievance redressal</div>
          <h1>Every complaint has a clear owner and timeline.</h1>
          <p>Our grievance process is designed for accountability across Payday and partner lenders.</p>
        </div>
        <div className="hero-visual"><Image src="/hero-worker.svg" alt="Support illustration" width={960} height={640} /></div>
      </section>

      <section>
        <div className="notice">
          <strong>Primary contact:</strong> grievance@itspayday.in · +91 85870 12908 (Mon–Sat, 9:00 AM–6:00 PM)
        </div>
      </section>

      <section className="section-alt">
        <h2>Escalation levels</h2>
        <div className="timeline">
          <div className="timeline-item"><div><strong>Level 1: Support team</strong><p className="small">Email grievance@itspayday.in. Response within 2 business days.</p></div></div>
          <div className="timeline-item"><div><strong>Level 2: Nodal officer</strong><p className="small">If unresolved, escalate to nodal.officer@itspayday.in within 5 business days.</p></div></div>
          <div className="timeline-item"><div><strong>Level 3: Partner lender desk</strong><p className="small">If still unresolved, we route the complaint to lender grievance channels within 7 business days.</p></div></div>
        </div>
      </section>
    </main>
  );
}
