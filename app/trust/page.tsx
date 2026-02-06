import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Trust Hub | Payday',
  description: 'Payday trust hub: privacy, terms, grievance redressal, LSP disclosure, and security commitments.',
};

export default function Trust() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Trust Hub</div>
          <h1>Trust built through clear rules and accountable support.</h1>
          <p>From data consent to grievance timelines, Payday is designed so workers, communities, and lenders know exactly where they stand.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Trust illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>Grievance Redressal</h3>
            <p className="small">Clear escalation paths and timelines.</p>
            <Link className="button-link" href="/grievance-redressal">View policy &rarr;</Link>
          </div>
          <div className="card">
            <h3>Privacy Policy</h3>
            <p className="small">How we collect, use, and protect data.</p>
            <Link className="button-link" href="/privacy">View policy &rarr;</Link>
          </div>
          <div className="card">
            <h3>Terms &amp; Conditions</h3>
            <p className="small">Transparent terms for borrowers and partners.</p>
            <Link className="button-link" href="/terms">View terms &rarr;</Link>
          </div>
          <div className="card">
            <h3>LSP Disclosure</h3>
            <p className="small">Our role as a Lending Service Provider.</p>
            <Link className="button-link" href="/lsp-disclosure">View disclosure &rarr;</Link>
          </div>
          <div className="card">
            <h3>Security</h3>
            <p className="small">Technical and operational safeguards.</p>
            <Link className="button-link" href="/security">View security &rarr;</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
