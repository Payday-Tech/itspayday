import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Payday Team',
  description: 'Meet the Payday team building credit-first financial products for domestic and on-demand workers in India.',
};

const teamMembers = [
  {
    name: 'Ketan Jain',
    subheader: 'Operations and Business',
    image: '/team/ketan-jain.svg',
    alt: 'Portrait of Ketan Jain',
  },
  {
    name: 'Saksham Bansal',
    subheader: 'Business and Partnerships',
    image: '/team/saksham-bansal.svg',
    alt: 'Portrait of Saksham Bansal',
  },
  {
    name: 'Atreya Arun',
    subheader: 'Product and Design',
    image: '/team/atreya-arun.svg',
    alt: 'Portrait of Atreya Arun',
  },
  {
    name: 'Kaustav Banerjee',
    subheader: 'Engineering',
    image: '/team/kaustav-banerjee.svg',
    alt: 'Portrait of Kaustav Banerjee',
  },
];

export default function Team() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">Team</div>
          <h1>Operators building for the next 50 million workers.</h1>
          <p>Our team blends fintech, risk, field operations, and product design to serve workers with dignity and long-term financial resilience.</p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Team illustration"
            width={960}
            height={640}
          />
        </div>
      </section>

      <section>
        <div className="card-grid">
          {teamMembers.map((member) => (
            <div className="card" key={member.name}>
              <Image
                src={member.image}
                alt={member.alt}
                width={400}
                height={400}
                style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '16px' }}
              />
              <h3>{member.name}</h3>
              <p className="small">{member.subheader}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
