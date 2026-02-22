import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Security | Payday',
  description: 'Payday security overview: encryption, access controls, and monitoring for sensitive data.',
};

export default function Security() {
  return (
    <main>
      <section className="hero section-trust-dark">
        <div>
          <div className="badge">Security</div>
          <h1>Security controls built for financial workflows.</h1>
          <p>Payday applies encryption, access controls, and monitoring to protect worker, lender, and transaction data.</p>
        </div>
        <div className="hero-visual"><Image src="/hero-worker.svg" alt="Security illustration" width={960} height={640} /></div>
      </section>

      <section className="section-trust-dark">
        <div className="card-grid">
          <div className="card trust-card"><h3>Encryption</h3><p className="small">Sensitive data is encrypted in transit and at rest.</p></div>
          <div className="card trust-card"><h3>Access governance</h3><p className="small">Role-based controls and logs restrict who can access operational systems.</p></div>
          <div className="card trust-card"><h3>Monitoring</h3><p className="small">Continuous monitoring and periodic audits support secure operations.</p></div>
        </div>
      </section>
    </main>
  );
}
