import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Payday Products | Earned Wage Access',
  description: 'Explore Payday products starting with earned wage access, then banking, savings, and credit-shield pathways.',
};

export default function Products() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Products built for dignity-first access</div>
          <h1>A product journey that matches real financial needs</h1>
          <p>We start with credit to solve urgent liquidity, then layer stability products like banking rails, savings, and protection.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Illustration of a worker using a phone"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>Earned Wage Access</h3>
            <p className="small">Active now. Access earned wages with transparent fees and consent-led data use.</p>
            <Link className="button-link" href="/products/earned-wage-access">
              Explore &rarr;
            </Link>
          </div>
          <div className="card">
            <h3>Savings</h3>
            <p className="small">Coming soon. Goal-based savings nudges for essentials and aspirations.</p>
          </div>
          <div className="card">
            <h3>Insurance</h3>
            <p className="small">Coming soon. Simple, affordable protection designed for everyday risks.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
