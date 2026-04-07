import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Team | Payday',
  description: 'Meet the Payday team building credit-first financial products for domestic and on-demand workers in India.',
};

const TEAM = [
  { name: 'Ketan Jain',       role: 'Operations & Business', image: '/team/ketan-jain.svg',       linkedin: 'https://www.linkedin.com/in/iamketanjain' },
  { name: 'Saksham Bansal',   role: 'Partnerships',          image: '/team/saksham-bansal.svg',   linkedin: 'https://www.linkedin.com/in/saksham-bansal-49b629144/' },
  { name: 'Atreya Arun',      role: 'Product & Design',      image: '/team/atreya-arun.svg',      linkedin: 'https://www.linkedin.com/in/atreya-arun-52b807135/' },
  { name: 'Kaustav Banerjee', role: 'Engineering',           image: '/team/kaustav-banerjee.svg', linkedin: 'https://www.linkedin.com/in/kaustav-banerjee-4b5053119/' },
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
              <div style={{ padding: '20px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h3>{member.name}</h3>
                  <p className="small">{member.role}</p>
                </div>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}
                  style={{ color: 'var(--color-ink-500)', flexShrink: 0, marginLeft: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
