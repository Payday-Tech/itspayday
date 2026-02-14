'use client';

import Image from 'next/image';
import { useState } from 'react';
import GetStartedButton from '@/components/GetStartedButton';
import { useLanguage } from '@/components/LanguageContext';

type Audience = 'worker' | 'community' | 'lender';

const audienceOrder: Audience[] = ['worker', 'community', 'lender'];

export default function Home() {
  const { t } = useLanguage();
  const [audience, setAudience] = useState<Audience>('worker');

  const audienceConfig = {
    worker: {
      title: t('home.hero.worker.title'),
      subtitle: t('home.hero.worker.subtitle'),
      ctaLabel: t('home.hero.worker.cta'),
      ctaHref: '',
      benefits: [t('home.hero.worker.benefit1'), t('home.hero.worker.benefit2'), t('home.hero.worker.benefit3')],
    },
    community: {
      title: t('home.hero.community.title'),
      subtitle: t('home.hero.community.subtitle'),
      ctaLabel: t('home.hero.community.cta'),
      ctaHref: '/for-communities',
      benefits: [t('home.hero.community.benefit1'), t('home.hero.community.benefit2'), t('home.hero.community.benefit3')],
    },
    lender: {
      title: t('home.hero.lender.title'),
      subtitle: t('home.hero.lender.subtitle'),
      ctaLabel: t('home.hero.lender.cta'),
      ctaHref: '/for-lenders',
      benefits: [t('home.hero.lender.benefit1'), t('home.hero.lender.benefit2'), t('home.hero.lender.benefit3')],
    },
  } as const;

  const selected = audienceConfig[audience];

  return (
    <main>
      <section className="hero">
        <div>
          <div className="badge">{t('home.badge')}</div>
          <div className="audience-switcher" role="tablist" aria-label="Select audience type">
            {audienceOrder.map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={audience === option}
                className={`audience-chip ${audience === option ? 'active' : ''}`}
                onClick={() => setAudience(option)}
              >
                {option === 'worker' ? t('home.audience.worker') : option === 'community' ? t('home.audience.community') : t('home.audience.lender')}
              </button>
            ))}
          </div>
          <h1>{selected.title}</h1>
          <p>{selected.subtitle}</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
            {audience === 'worker' ? (
              <GetStartedButton>{selected.ctaLabel}</GetStartedButton>
            ) : (
              <a className="button primary" href={selected.ctaHref}>{selected.ctaLabel}</a>
            )}
            <a className="button secondary" href="mailto:info@payday.in" rel="noopener noreferrer">{t('cta.partner')}</a>
          </div>
          <ul className="hero-benefits small">
            {selected.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <div className="trust-microcopy">
            <span>{t('microcopy.lsp')}</span>
            <span>{t('microcopy.fees')}</span>
            <span>{t('microcopy.consent')}</span>
            <span>{t('microcopy.grievance')}</span>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/homepagehero.svg"
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

      <section className="section-alt">
        <h2>{t('home.faqTitle')}</h2>
        <div className="card-grid">
          <div className="card">
            <h3>{t('home.faq.q1')}</h3>
            <p className="small">{t('home.faq.a1')}</p>
          </div>
          <div className="card">
            <h3>{t('home.faq.q2')}</h3>
            <p className="small">{t('home.faq.a2')}</p>
          </div>
          <div className="card">
            <h3>{t('home.faq.q3')}</h3>
            <p className="small">{t('home.faq.a3')}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
