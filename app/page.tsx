import Image from 'next/image';
import GetStartedButton from '@/components/GetStartedButton';

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">We are in beta &mdash; add your details to receive a loan offer</div>
          <h1>Short-term credit that respects how India&apos;s workers actually earn.</h1>
          <p>We design fair, wage-linked access for domestic and on-demand workers with irregular income and real-world cash flow needs.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
            <GetStartedButton />
            <a className="button secondary" href="mailto:info@payday.in" rel="noopener noreferrer">Partner with us</a>
          </div>
          <p className="helper-text" style={{ marginTop: '16px' }}>
            Transparent fees, clear grievance redressal, privacy-forward data use.
          </p>
        </div>
        <div className="hero-visual">
          <Image
            src="/hero-worker.svg"
            alt="Aspirational illustration of an Indian domestic worker using her phone"
            width={960}
            height={640}
          />
          <div className="trust-box">
            <strong>Goal-led support</strong>
            <p className="small">Plan for school fees, medical care, or emergencies with wage-linked limits and reminders.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="card-grid">
          <div className="card">
            <h3>How it works</h3>
            <div className="steps">
              <div className="step">
                <span>1</span>
                <div>
                  <strong>Consent first</strong>
                  <p className="small">Workers opt in via WhatsApp and verify employment details.</p>
                </div>
              </div>
              <div className="step">
                <span>2</span>
                <div>
                  <strong>Access earned wages</strong>
                  <p className="small">Withdraw within wage-linked limits powered by trusted community data.</p>
                </div>
              </div>
              <div className="step">
                <span>3</span>
                <div>
                  <strong>Repay seamlessly</strong>
                  <p className="small">Repayments align with salary cycles, with reminders and support.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3>Goal-led benefits</h3>
            <ul className="small">
              <li>Meet urgent needs without heavy fees.</li>
              <li>Build financial discipline and confidence.</li>
              <li>Stay in control with frequency caps and limit reminders.</li>
            </ul>
          </div>
          <div className="card">
            <h3>Safety rails</h3>
            <ul className="small">
              <li>Wage-linked caps with transparent pricing.</li>
              <li>Cooling-off windows between withdrawals.</li>
              <li>Consent-led data use, no hidden sharing.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>Built for responsible borrowing and repayment</h2>
        <div className="trust-strip" style={{ marginTop: '24px' }}>
          <div>Privacy-forward data usage</div>
          <div>Grievance escalation with timelines</div>
          <div>Transparent fees in plain language</div>
          <div>Partnered with regulated lenders</div>
        </div>
      </section>

      <section>
        <h2>Multilingual support</h2>
        <p className="small">We communicate in English, Hinglish, Kannada, and Hindi for dignity-first onboarding.</p>
        <div className="language-grid">
          <div className="language-card">
            <h4>English</h4>
            <p className="small">&ldquo;I can access my earned wages safely when I need it.&rdquo;</p>
          </div>
          <div className="language-card">
            <h4>Hinglish</h4>
            <p className="small">&ldquo;Jitna kamaaya hai, utna hi access &mdash; bina tension.&rdquo;</p>
          </div>
          <div className="language-card">
            <h4>&#3221;&#3240;&#3277;&#3240;&#3233;</h4>
            <p className="small">&ldquo;&#3240;&#3262;&#3240;&#3265; &#3223;&#3251;&#3263;&#3256;&#3263;&#3238; &#3253;&#3271;&#3236;&#3240;&#3253;&#3240;&#3277;&#3240;&#3265; &#3256;&#3265;&#3248;&#3221;&#3277;&#3255;&#3263;&#3236;&#3253;&#3262;&#3223;&#3263; &#3242;&#3233;&#3270;&#3247;&#3244;&#3257;&#3265;&#3238;&#3265;.&rdquo;</p>
          </div>
          <div className="language-card">
            <h4>&#2361;&#2367;&#2344;&#2381;&#2342;&#2368;</h4>
            <p className="small">&ldquo;&#2332;&#2379; &#2325;&#2350;&#2366;&#2351;&#2366; &#2361;&#2376;, &#2357;&#2361;&#2368; &#2360;&#2369;&#2352;&#2325;&#2381;&#2359;&#2367;&#2340; &#2340;&#2352;&#2368;&#2325;&#2375; &#2360;&#2375; &#2350;&#2367;&#2354; &#2360;&#2325;&#2340;&#2366; &#2361;&#2376;&#2404;&rdquo;</p>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <h2>Quick answers</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Is Payday a lender?</h3>
            <p className="small">Payday is a Lending Service Provider partnering with regulated lenders. We never lend directly.</p>
          </div>
          <div className="card">
            <h3>How much can I access?</h3>
            <p className="small">Limits are tied to earned wages and community data, with caps and reminders.</p>
          </div>
          <div className="card">
            <h3>How are fees shared?</h3>
            <p className="small">Fees are clearly shown before you confirm, with no hidden charges.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
