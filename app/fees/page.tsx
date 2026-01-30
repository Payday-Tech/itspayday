import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fees | Payday',
  description: 'Transparent Payday fees: processing fee and monthly interest for earned wage access.',
};

export default function Fees() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Transparent pricing</div>
          <h1>Fees that are clear, fair, and easy to understand.</h1>
          <p>We show the processing fee and interest cost before you confirm any withdrawal.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Worker illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <table className="table">
          <thead>
            <tr>
              <th>Fee component</th>
              <th>Rate</th>
              <th>How it works</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Processing fee</td>
              <td>2% of principal</td>
              <td>Deducted from the principal at disbursal.</td>
            </tr>
            <tr>
              <td>Interest</td>
              <td>3% per month</td>
              <td>Applied for a 1-month repayment cycle.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section-alt">
        <h2>Example</h2>
        <div className="card">
          <p className="small">If you access &#8377;5,000:</p>
          <ul className="small">
            <li>Processing fee: &#8377;100 (2% of &#8377;5,000) deducted upfront.</li>
            <li>Amount received: &#8377;4,900.</li>
            <li>Interest for 1 month: &#8377;150 (3% of &#8377;5,000).</li>
            <li>Total repayment after 1 month: &#8377;5,150.</li>
          </ul>
        </div>
        <div className="notice" style={{ marginTop: '20px' }}>
          <strong>Important:</strong> For full terms, please review our{' '}
          <Link href="/terms">Terms &amp; Conditions</Link> and{' '}
          <Link href="/grievance-redressal">Grievance Redressal</Link> policy.
        </div>
      </section>
    </main>
  );
}
