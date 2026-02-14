import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Security | Payday',
  description: 'Payday security overview: encryption, access controls, and monitoring for sensitive data.',
};

export default function Security() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Security</div>
          <h1>Security designed for high-sensitivity financial journeys.</h1>
          <p>We use encryption, strict access controls, and continuous monitoring to safeguard worker and transaction data.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Security illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>Data encryption</h3>
            <p className="small">Sensitive data is encrypted at rest and in transit using industry standards.</p>
          </div>
          <div className="card">
            <h3>Access control</h3>
            <p className="small">Role-based permissions and audit logs restrict data access to authorized teams.</p>
          </div>
          <div className="card">
            <h3>Monitoring</h3>
            <p className="small">Continuous monitoring and periodic audits ensure compliance and safety.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
