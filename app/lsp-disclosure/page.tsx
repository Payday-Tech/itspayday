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
          <div className="badge">LSP disclosure</div>
          <h1>What Payday does, and what regulated lenders do.</h1>
          <p>Payday is a Lending Service Provider. Lender partners make credit decisions and issue loans.</p>
        </div>
        <div className="hero-visual"><Image src="/hero-worker.svg" alt="LSP disclosure illustration" width={960} height={640} /></div>
      </section>

      <section>
        <h2>Key disclosures</h2>
        <ul className="small">
          <li>Payday does not issue loans or accept deposits.</li>
          <li>Loans are issued by RBI-regulated partner lenders.</li>
          <li>All loan terms and fees are shown before loan acceptance.</li>
          <li>Payday may receive service fees from lender partners for facilitation.</li>
        </ul>
      </section>
    </main>
  );
}
