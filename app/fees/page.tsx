import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fees | Payday',
  description: 'Transparent Payday pricing with upfront processing fees, interest disclosure, and no hidden charges.',
};

export default function Fees() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Fees and charges</div>
          <h1>Transparent fees, disclosed before every transaction.</h1>
          <p>Payday displays fee components and repayment obligations upfront. No hidden deductions.</p>
        </div>
        <div className="hero-visual"><Image src="/hero-worker.svg" alt="Worker illustration" width={960} height={640} /></div>
      </section>

      <section>
        <table className="table">
          <thead><tr><th>Fee component</th><th>Rate</th><th>How it applies</th></tr></thead>
          <tbody>
            <tr><td>Processing fee</td><td>2% of principal</td><td>Deducted at disbursal and shown in advance.</td></tr>
            <tr><td>Interest</td><td>3% per month</td><td>Applied as per approved tenor from lender partner.</td></tr>
          </tbody>
        </table>
      </section>

      <section className="section-alt">
        <h2>Illustrative example</h2>
        <div className="card">
          <ul className="small">
            <li>Principal approved: ₹5,000</li>
            <li>Processing fee (2%): ₹100</li>
            <li>Amount disbursed: ₹4,900</li>
            <li>Interest for one month (3%): ₹150</li>
            <li>Total repayment: ₹5,150</li>
          </ul>
        </div>
        <div className="notice" style={{ marginTop: '14px' }}>
          <strong>Disclosure:</strong> Payday is an LSP. Final terms are issued by partner lenders in the Key Fact Statement.
          Please review <Link href="/terms">Terms</Link>, <Link href="/lsp-disclosure">LSP Disclosure</Link>, and <Link href="/grievance-redressal">Grievance Redressal</Link>.
        </div>
      </section>
    </main>
  );
}
