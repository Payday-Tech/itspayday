import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Payday Team',
  description: 'Meet the Payday team building credit-first financial products for domestic and on-demand workers in India.',
};

const teamMembers = [
  { name: 'Ketan Jain', subheader: 'Operations & Business', image: '/team/ketan-jain.svg', alt: 'Portrait of Ketan Jain' },
  { name: 'Saksham Bansal', subheader: 'Partnerships', image: '/team/saksham-bansal.svg', alt: 'Portrait of Saksham Bansal' },
  { name: 'Atreya Arun', subheader: 'Product & Design', image: '/team/atreya-arun.svg', alt: 'Portrait of Atreya Arun' },
  { name: 'Kaustav Banerjee', subheader: 'Engineering', image: '/team/kaustav-banerjee.svg', alt: 'Portrait of Kaustav Banerjee' },
];

export default function Team() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Team</div>
          <h1>A cross-functional team building trust-first fintech infrastructure.</h1>
          <p>We combine field operations, product, risk, and engineering to serve workers and lending partners with reliability.</p>
        </div>
        <div className="hero-visual"><Image src="/hero-worker.svg" alt="Team illustration" width={960} height={640} /></div>
      </section>

      <section>
        <div className="card-grid">
          {teamMembers.map((member) => (
            <div className="card" key={member.name}>
              <Image src={member.image} alt={member.alt} width={400} height={400} style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '12px' }} />
              <h3>{member.name}</h3>
              <p className="small">{member.subheader}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
