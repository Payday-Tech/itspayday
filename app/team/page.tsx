import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Payday Team',
  description: 'Meet the Payday team building credit-first financial products for domestic and on-demand workers in India.',
};

export default function Team() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Team</div>
          <h1>Operators building for the next 50 million workers.</h1>
          <p>Our team blends fintech, risk, field operations, and product design to serve workers with dignity and long-term financial resilience.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Team illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>Ananya Rao</h3>
            <p className="small">CEO &amp; Co-founder &mdash; Former fintech operator focused on inclusive credit.</p>
          </div>
          <div className="card">
            <h3>Rahul Mehta</h3>
            <p className="small">COO &mdash; Community partnerships and operations in Tier-1 cities.</p>
          </div>
          <div className="card">
            <h3>Priya Nair</h3>
            <p className="small">Head of Product &mdash; Consent-first workflows and multilingual UX.</p>
          </div>
          <div className="card">
            <h3>Vikram Singh</h3>
            <p className="small">Risk &amp; Compliance &mdash; Responsible lending practices and safeguards.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
