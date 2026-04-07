import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Team | Payday',
  description: 'Meet the Payday team building credit-first financial products for domestic and on-demand workers in India.',
};

const TEAM = [
  { name: 'Ketan Jain',       role: 'Operations & Business', image: '/team/ketan-jain.svg' },
  { name: 'Saksham Bansal',   role: 'Partnerships',          image: '/team/saksham-bansal.svg' },
  { name: 'Atreya Arun',      role: 'Product & Design',      image: '/team/atreya-arun.svg' },
  { name: 'Kaustav Banerjee', role: 'Engineering',           image: '/team/kaustav-banerjee.svg' },
];

export default function Team() {
  return (
    <main>
      <section className="hero">
        <span className="overline">Team</span>
        <h1>A cross-functional team building trust-first fintech.</h1>
        <p className="hero-sub">
          We combine field operations, product, risk, and engineering to serve workers
          and lending partners with reliability.
        </p>
      </section>

      <section>
        <div className="card-grid">
          {TEAM.map((member) => (
            <div className="card" key={member.name} style={{ padding: 0, overflow: 'hidden' }}>
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ padding: '20px 24px 24px' }}>
                <h3>{member.name}</h3>
                <p className="small">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
