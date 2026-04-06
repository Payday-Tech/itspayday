import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Payday',
  description: 'Payday is building responsible credit access for domestic workers across India.',
};

export default function About() {
  return (
    <main>
      <section className="hero">
        <span className="overline">About Payday</span>
        <h1>Responsible credit for India&apos;s everyday workforce.</h1>
        <p>Payday is a Lending Service Provider enabling wage-linked credit with regulated lending partners, consent-led operations, and clear communication in local languages.</p>
      </section>

      <section>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-card-icon">🎯</span>
            <h3>Mission</h3>
            <p>Expand fair access to short-tenor credit for domestic workers — without hidden terms or debt traps.</p>
          </div>
          <div className="feature-card">
            <span className="feature-card-icon">🤝</span>
            <h3>Operating principles</h3>
            <p>Consent first. Transparent fees. Dignified servicing. Strong compliance discipline.</p>
          </div>
          <div className="feature-card">
            <span className="feature-card-icon">🏛️</span>
            <h3>Partnership model</h3>
            <p>Regulated lenders issue loans. Payday manages onboarding, servicing, repayments, and grievance routing.</p>
          </div>
        </div>
      </section>

      <section className="section-alt" style={{ paddingTop: 72, paddingBottom: 72 }}>
        <h2>How Payday works</h2>
        <div className="steps" style={{ marginTop: 32, maxWidth: 640 }}>
          <div className="step">
            <span>1</span>
            <div>
              <strong>Worker consent and verification</strong>
              <p className="small">Users approve data use before eligibility checks begin. KYC and work data shared only with explicit consent.</p>
            </div>
          </div>
          <div className="step">
            <span>2</span>
            <div>
              <strong>Lender decisioning</strong>
              <p className="small">Regulated NBFC and bank partners approve credit limits and loan terms based on verified work signals.</p>
            </div>
          </div>
          <div className="step">
            <span>3</span>
            <div>
              <strong>Servicing and repayment</strong>
              <p className="small">Payday supports repayment reminders, multilingual communication, and grievance redressal on behalf of lenders.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
